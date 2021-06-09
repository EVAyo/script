#!/usr/bin/env bash

## 路径
ShellDir=${JD_DIR:-$(cd $(dirname $0); pwd)}
[[ ${JD_DIR} ]] && HelpJd=jd || HelpJd=jd.sh
[[ ${JD_DIR} ]] && ShellJd=jd || ShellJd=${ShellDir}/jd.sh
ScriptsDir=${ShellDir}/scripts
ConfigDir=${ShellDir}/config
FileConf=${ConfigDir}/config.sh
FileConfSample=${ShellDir}/sample/config.sh.sample
LogDir=${ShellDir}/log
ListScripts=($(cd ${ScriptsDir}; ls *.js | grep -E "j[drx]_"))
ListCron=${ConfigDir}/crontab.list
ListCronLxk=${ScriptsDir}/docker/crontab_list.sh
ListJs=${LogDir}/js.list

## 导入config.sh
function Import_Conf {
  if [ -f ${FileConf} ]
  then
    . ${FileConf}
    if [ -z "${Cookie1}" ]; then
      echo -e "请先在config.sh中配置好Cookie...\n"
      exit 1
    fi
  else
    echo -e "配置文件 ${FileConf} 不存在，请先按教程配置好该文件...\n"
    exit 1
  fi
}

## 更新crontab
function Detect_Cron {
  if [[ $(cat ${ListCron}) != $(crontab -l) ]]; then
    crontab ${ListCron}
  fi
}

## 用户数量UserSum
function Count_UserSum {
  for ((i=1; i<=${SUM:-$((3000 * 10))}; i++)); do
    Tmp=Cookie$i
    CookieTmp=${!Tmp}
    [[ ${CookieTmp} ]] && UserSum=$i || break
  done
}

## 组合Cookie和互助码子程序
function Combin_Sub {
  CombinAll=""
  for ((i=1; i<=${UserSum}; i++)); do
    for num in ${TempBlockCookie}; do
      if [[ $i -eq $num ]]; then
        continue 2
      fi
    done
    Tmp1=$1$i
    Tmp2=${!Tmp1}
    case $# in
      1)
        CombinAll="${CombinAll}&${Tmp2}"
        ;;
      2)
        CombinAll="${CombinAll}&${Tmp2}@$2"
        ;;
      3)
        if [ $(($i % 2)) -eq 1 ]; then
          CombinAll="${CombinAll}&${Tmp2}@$2"
        else
          CombinAll="${CombinAll}&${Tmp2}@$3"
        fi
        ;;
      4)
        case $(($i % 3)) in
          1)
            CombinAll="${CombinAll}&${Tmp2}@$2"
            ;;
          2)
            CombinAll="${CombinAll}&${Tmp2}@$3"
            ;;
          0)
            CombinAll="${CombinAll}&${Tmp2}@$4"
            ;;
        esac
        ;;
    esac
  done
  echo ${CombinAll} | perl -pe "{s|^&||; s|^@+||; s|&@|&|g; s|@+|@|g}"
}

## 正常依次运行时，组合所有账号的Cookie与互助码
function Combin_All {
  export JD_COOKIE=$(Combin_Sub Cookie)
  #东东农场(jd_fruit.js)
  export FRUITSHARECODES=$(Combin_Sub ForOtherFruit "96fccb20b0e24deeab6b13457c593e3c@9353ac4c60e84596b9cfc5e3fe515f30@f8128854bccb47c092e35444aa921fa9@4fc147a47a2b45f2ac7e31c3e1315976")
  #东东萌宠(jd_pet.js)
  export PETSHARECODES=$(Combin_Sub ForOtherPet "MTAxODcxOTI2NTAwMDAwMDAzMTExODEyMw==@MTE1NDAxNzgwMDAwMDAwMzYxNjUwOTk=@MTEzMzI0OTE0NTAwMDAwMDA0Mzc2ODgwMQ==@MTAxODc2NTEzNTAwMDAwMDAwMDAwMzA3Nw==")
  #种豆得豆(jd_plantBean.js)
  export PLANT_BEAN_SHARECODES=$(Combin_Sub ForOtherBean "lc7eqgnugkdtwp2qlnvggt2bj7xxnwaayh5essa@uwgpfl3hsfqp3img4qkteo5oicqmyqcumye2jhy@cbagzqdyjhmq32xxyd2qn475eu@w5twvmn6thlgvgffr5mmzvaojsqttperzjydn2q")
  #京喜工厂(jd_dreamFactory.js)
  export DREAM_FACTORY_SHARE_CODES=$(Combin_Sub ForOtherDreamFactory "XOR3A1bQDLLlTvR5WzR3bg==@SmMbqc8FwQ0Zqml8FIJQ7w==@0f51WgzYHydCEESfms3PTg==@RsjljNAAYotorAKjJjTGHg==")
  #东东工厂(jd_jdfactory.js)
  export DDFACTORY_SHARECODES=$(Combin_Sub ForOtherJdFactory "T022u_x3QRke_EnVIR_wnPEIcQCjVWnYaS5kRrbA@T012a1zrlZeWI-dHCjVWnYaS5kRrbA")
  #京东赚赚(jd_jdzz.js)
  export JDZZ_SHARECODES=$(Combin_Sub ForOtherJdzz "Su_x3QRke_EnVIR_wnPEIcQ@S5KkcHkJujwKkXXy9wK9N@Sa1zrlZeWI-dH@ATlpQnf6SyD0PWjH_i3Uc")
  #crazyJoy(jd_crazy_joy.js)
  export JDJOY_SHARECODES=$(Combin_Sub ForOtherJoy "JaCqOT9JcivS6ROt9tZf5at9zd5YaBeE@gLa0u-JLETe_b7Y0-JE-oA==")
  #惊喜农场(jd_jxnc.js)
  export JXNC_SHARECODES=$(Combin_Sub ForOtherJxnc)
  #口袋书店(jd_bookshop.js)
  export BOOKSHOP_SHARECODES=$(Combin_Sub ForOtherBookShop "6b7d17c29d4e4f49a6335ee80157c455@c858f02a64094665ad7552721794ba2b@234f539da0824491befb23529dcdaa59")
  #签到领现金(jd_cash.js)
  export JD_CASH_SHARECODES=$(Combin_Sub ForOtherCash "Jhozbeu1b-Ek8GvRw3UR0w@eU9YMrDFHKpVjAicnytU@9rqvuWU9sE-2@eBozZO-zYP4j8WY@ZnQxbr-wY_Qhoz_SnXpF")
  #闪购盲盒(jd_sgmh.js)
  export JDSGMH_SHARECODES=$(Combin_Sub ForOtherSgmh "T022u_x3QRke_EnVIR_wnPEIcQCjVQmoaT5kRrbA@T0205KkcHkJujwKkXXy9wK9NCjVQmoaT5kRrbA@T012a1zrlZeWI-dHCjVQmoaT5kRrbA")
  #惊喜财富岛(jd_cfd.js)
  export JDCFD_SHARECODES=$(Combin_Sub ForOtherJdcfd "401DA52935EB84F3BDAC92C458E6B53043E59FCFB64E82CF43BDB57227EB24CE@F9C04F9AD0B414C6DC29EE25E71E86B0E0536B91BC393BA420F9E2358CFC1087@A6F67E22586A210AE6887B3DD522736630C9DBF062A66168B2C5315F99D1ABD7@D0B8B8ECA098E7B19850BB90DFA24CD426FA7D28C89B0F506745BA17099ED5E4")
  #东东健康社区(jd_health.js)
  export JDHEALTH_SHARECODES=$(Combin_Sub ForOtherHealth "T022u_x3QRke_EnVIR_wnPEIcQCjVfnoaW5kRrbA@T012a1zrlZeWI-dHCjVfnoaW5kRrbA@T0205KkcHkJujwKkXXy9wK9NCjVfnoaW5kRrbA")
  #手机狂欢城(jd_carnivalcity.js)
  export JD818_SHARECODES=$(Combin_Sub ForOtherCarni)
}

## 并发运行时，直接申明每个账号的Cookie与互助码
function Combin_One {
  for ((i=0; i<${#EnvName[*]}; i++)); do
    Tmp=${VarName[i]}$1
    export ${EnvName[i]}=${!Tmp}
  done
}

## 转换JD_BEAN_SIGN_STOP_NOTIFY或JD_BEAN_SIGN_NOTIFY_SIMPLE
function Trans_JD_BEAN_SIGN_NOTIFY {
  case ${NotifyBeanSign} in
    0)
      export JD_BEAN_SIGN_STOP_NOTIFY="true"
      ;;
    1)
      export JD_BEAN_SIGN_NOTIFY_SIMPLE="true"
      ;;
    2)
      export JD_BEAN_SIGN_NOTIFY_SIMPLE="false"
      ;;
  esac
}

## 转换UN_SUBSCRIBES
function Trans_UN_SUBSCRIBES {
  export UN_SUBSCRIBES="${goodPageSize}\n${shopPageSize}\n${jdUnsubscribeStopGoods}\n${jdUnsubscribeStopShop}"
}

## 申明全部变量
function Set_Env {
  [[ $1 == all ]] && Combin_All || Combin_One $1
  Trans_JD_BEAN_SIGN_NOTIFY
  Trans_UN_SUBSCRIBES
}

## 随机延迟
function Random_Delay {
  if [[ -n ${RandomDelay} ]] && [[ ${RandomDelay} -gt 0 ]]; then
    CurMin=$(date "+%-M")
    if [[ ${CurMin} -gt 2 && ${CurMin} -lt 30 ]] || [[ ${CurMin} -gt 31 && ${CurMin} -lt 59 ]]; then
      CurDelay=$((${RANDOM} % ${RandomDelay} + 1))
      echo -e "\n命令未添加 \"now\"，随机延迟 ${CurDelay} 秒后再执行任务，如需立即终止，请按 CTRL+C...\n"
      sleep ${CurDelay}
    fi
  fi
}

## 使用说明
function Help {
  echo -e "本脚本的用法为："
  echo -e "1.bash ${HelpJd} <js_name>       # 依次执行，如果设置了随机延迟并且当时时间不在0-2、30-31、59分内，将随机延迟一定秒数"
  echo -e "2.bash ${HelpJd} <js_name> now   # 依次执行，无论是否设置了随机延迟，均立即运行，前台会输出日志，同时记录在日志文件中"
  echo -e "3.bash ${HelpJd} <js_name> conc  # 并发执行，无论是否设置了随机延迟，均立即运行，前台不产生日志，直接记录在日志文件中，如果是容器，运行的进程无法完全释放，建议使用此功能后经常重启容器，如果是物理机，建议经常杀进程" 
  echo -e "4.bash ${HelpJd} runall          # 依次运行所有非挂机脚本，非常耗时"
  echo -e "5.bash ${HelpJd} hangup          # 重启挂机程序"
  echo -e "6.bash ${HelpJd} resetpwd        # 重置控制面板用户名和密码"
  echo -e "\n针对用法1-3中的\"<js_name>\"，可以不输入后缀\".js\"，另外，如果前缀是\"jd_\"的话前缀也可以省略。"
  echo -e "当前有以下脚本可以运行（仅列出以jd_、jr_、jx_开头的脚本）："
  cd ${ScriptsDir}
  for ((i=0; i<${#ListScripts[*]}; i++)); do
    Name=$(grep "new Env" ${ListScripts[i]} | awk -F "'|\"" '{print $2}')
    echo -e "$(($i + 1)).${Name}：${ListScripts[i]}"
  done
}

## nohup
function Run_Nohup {
  nohup node $1.js 2>&1 > ${LogFile} &
}

## 查找脚本路径与准确的文件名
function Find_FileDir {
  FileNameTmp1=$(echo $1 | perl -pe "s|\.js||")
  FileNameTmp2=$(echo $1 | perl -pe "{s|jd_||; s|\.js||; s|^|jd_|}")
  SeekDir="${ScriptsDir} ${ScriptsDir}/backUp ${ConfigDir}"
  FileName=""
  WhichDir=""

  for dir in ${SeekDir}
  do
    if [ -f ${dir}/${FileNameTmp1}.js ]; then
      FileName=${FileNameTmp1}
      WhichDir=${dir}
      break
    elif [ -f ${dir}/${FileNameTmp2}.js ]; then
      FileName=${FileNameTmp2}
      WhichDir=${dir}
      break
    fi
  done
}

## 运行挂机脚本
function Run_HangUp {
  HangUpJs="jd_crazy_joy_coin"
  cd ${ScriptsDir}
  for js in ${HangUpJs}; do
    Import_Conf ${js}
    Count_UserSum
    Set_Env all
    if type pm2 >/dev/null 2>&1; then
      pm2 stop ${js}.js 2>/dev/null
      pm2 flush
      pm2 start -a ${js}.js --watch "${ScriptsDir}/${js}.js" --name="${js}"
    else
      if [[ $(ps -ef | grep "${js}" | grep -v "grep") != "" ]]; then
        ps -ef | grep "${js}" | grep -v "grep" | awk '{print $2}' | xargs kill -9
      fi
      [ ! -d ${LogDir}/${js} ] && mkdir -p ${LogDir}/${js}
      LogTime=$(date "+%Y-%m-%d-%H-%M-%S")
      LogFile="${LogDir}/${js}/${LogTime}.log"
      Run_Nohup ${js} >/dev/null 2>&1
    fi
  done
}

## 重置密码
function Reset_Pwd {
  cp -f ${ShellDir}/sample/auth.json ${ConfigDir}/auth.json
  echo -e "控制面板重置成功，用户名：admin，密码：adminadmin\n"
}

## 一次性运行所有脚本
function Run_All {
  if [ ! -f ${ListJs} ]; then
    cat ${ListCronLxk} | grep -E "j[drx]_\w+\.js" | perl -pe "s|.+(j[drx]_\w+)\.js.+|\1|" | sort -u > ${ListJs}
  fi
  echo -e "\n==================== 开始运行所有非挂机脚本 ====================\n"
  echo -e "请注意：本过程将非常非常耗时，一个账号可能长达几小时，账号越多耗时越长，如果是手动运行，退出终端也将终止运行。\n"
  echo -e "倒计时5秒...\n"
  for ((sec=5; sec>0; sec--)); do
    echo -e "$sec...\n"
    sleep 1
  done
  for file in $(cat ${ListJs}); do
    echo -e "==================== 运行 $file.js 脚本 ====================\n"
    bash ${ShellJd} $file now
  done
}

## 正常运行单个脚本
function Run_Normal {
  Find_FileDir $1
  if [[ ${FileName} ]] && [[ ${WhichDir} ]]
  then
    Import_Conf "${FileName}"
    Detect_Cron
    Count_UserSum
    Set_Env all
    [ $# -eq 1 ] && Random_Delay
    LogTime=$(date "+%Y-%m-%d-%H-%M-%S")
    LogFile="${LogDir}/${FileName}/${LogTime}.log"
    [ ! -d ${LogDir}/${FileName} ] && mkdir -p ${LogDir}/${FileName}
    cd ${WhichDir}
    node ${FileName}.js 2>&1 | tee ${LogFile}
  else
    echo -e "\n在${ScriptsDir}、${ScriptsDir}/backUp、${ConfigDir}三个目录下均未检测到 $1 脚本的存在，请确认...\n"
    Help
  fi
}

## 并发执行，因为是并发，所以日志只能直接记录在日志文件中（日志文件以Cookie编号结尾），前台执行并发跑时不会输出日志
## 并发执行时，设定的 RandomDelay 不会生效，即所有任务立即执行
function Run_Concurrent {
  Find_FileDir $1
  if [[ ${FileName} ]] && [[ ${WhichDir} ]]
  then
    Import_Conf "${FileName}"
    Detect_Cron
    Count_UserSum
    [ ! -d ${LogDir}/${FileName} ] && mkdir -p ${LogDir}/${FileName}
    LogTime=$(date "+%Y-%m-%d-%H-%M-%S")
    echo -e "\n各账号间已经在后台开始并发执行，前台不输入日志，日志直接写入文件中。\n\n并发执行不会释放进程，如果是容器，请经常重启容器，如果是物理机，请经常杀多余的node进程。\n"
    for ((user_num=1; user_num<=${UserSum}; user_num++)); do
      for num in ${TempBlockCookie}; do
        [[ $user_num -eq $num ]] && continue 2
      done
      Set_Env $user_num
      LogFile="${LogDir}/${FileName}/${LogTime}_$user_num.log"
      cd ${WhichDir}
      Run_Nohup ${FileName} >/dev/null 2>&1
    done
  else
    echo -e "\n在${ScriptsDir}、${ScriptsDir}/backUp、${ConfigDir}三个目录下均未检测到 $1 脚本的存在，请确认...\n"
    Help
  fi
}

## 命令检测
case $# in
  0)
    echo
    Help
    ;;
  1)
    case $1 in
      hangup)
        Run_HangUp
        ;;
      resetpwd)
        Reset_Pwd
        ;;
      runall)
        Run_All
        ;;
      *)
        Run_Normal $1
        ;;
    esac
    ;;
  2)
    case $2 in
      now)
        Run_Normal $1 $2
        ;;
      conc)
        Run_Concurrent $1 $2
        ;;
      *)
        echo -e "\n命令输入错误...\n"
        Help
        ;;
    esac
    ;;
  *)
    echo -e "\n命令过多...\n"
    Help
    ;;
esac
