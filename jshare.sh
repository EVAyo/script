## 目录
dir_panel=$dir_root/panel
dir_config=$dir_root/config
dir_scripts=$dir_root/scripts
dir_own=$dir_root/own
dir_raw=$dir_own/raw
dir_sample=$dir_root/sample
dir_log=$dir_root/log
dir_list_tmp=$dir_log/.tmp
dir_scripts_node_modules=$dir_scripts/node_modules

## 文件
file_config_sample=$dir_sample/config.sample.sh
file_cookie=$dir_config/cookie.sh
file_config_user=$dir_config/config.sh
file_auth_sample=$dir_sample/auth.json
file_auth_user=$dir_config/auth.json
file_diy_shell=$dir_config/diy.sh

## 清单文件
list_crontab_user=$dir_config/crontab.list
list_crontab_sample=$dir_sample/crontab.sample.list
list_crontab_jd_scripts=$dir_scripts/docker/crontab_list.sh
list_task_jd_scripts=$dir_list_tmp/task_scripts.list
list_task_user=$dir_list_tmp/task_user.list
list_task_add=$dir_list_tmp/task_add.list
list_task_drop=$dir_list_tmp/task_drop.list
list_own_scripts=$dir_list_tmp/own_scripts.list
list_own_user=$dir_list_tmp/own_user.list
list_own_add=$dir_list_tmp/own_add.list
list_own_drop=$dir_list_tmp/own_drop.list

## 需组合的环境变量列表，env_name需要和var_name一一对应
env_name=(
    JD_COOKIE
    FRUITSHARECODES
    PETSHARECODES
    PLANT_BEAN_SHARECODES
    DREAM_FACTORY_SHARE_CODES
    DDFACTORY_SHARECODES
    JDZZ_SHARECODES
    JDJOY_SHARECODES
    JXNC_SHARECODES
    BOOKSHOP_SHARECODES
    JD_CASH_SHARECODES
    JDSGMH_SHARECODES
    JDCFD_SHARECODES
    JDGLOBAL_SHARECODES
)
var_name=(
    Cookie
    ForOtherFruit
    ForOtherPet
    ForOtherBean
    ForOtherDreamFactory
    ForOtherJdFactory
    ForOtherJdzz
    ForOtherJoy
    ForOtherJxnc
    ForOtherBookShop
    ForOtherCash
    ForOtherSgmh
    ForOtherCfd
    ForOtherGlobal
)

## 所有有互助码的活动，把脚本名称列在 name_js 中，对应 config.sh 中互助码后缀列在 name_config 中，中文名称列在 name_chinese 中。
## name_js、name_config 和 name_chinese 中的三个名称必须一一对应。
name_js=(
    jd_fruit
    jd_pet
    jd_plantBean
    jd_dreamFactory
    jd_jdfactory
    jd_crazy_joy
    jd_jdzz
    jd_jxnc
    jd_bookshop
    jd_cash
    jd_sgmh
    jd_cfd
    jd_global
)
name_config=(
    Fruit
    Pet
    Bean
    DreamFactory
    JdFactory
    Joy
    Jdzz
    Jxnc
    BookShop
    Cash
    Sgmh
    Cfd
    Global
)
name_chinese=(
    东东农场
    东东萌宠
    京东种豆得豆
    京喜工厂
    东东工厂
    crazyJoy任务
    京东赚赚
    京喜农场
    口袋书店
    签到领现金
    闪购盲盒
    京喜财富岛
    环球挑战赛
)


## 导入配置文件并校验，$1：任务名称
import_config_and_check () {
    if [ -f $file_cookie ]; then
        . $file_cookie
    fi
    if [ -f $file_config_user ]; then
        . $file_config_user
        if [[ -z ${Cookie1} ]]; then
            echo -e "请先在 $file_config_user 中配置好Cookie...\n"
            exit 1
        fi
    else
        echo -e "配置文件 $file_config_user 不存在，请先按教程配置好该文件...\n"
        exit 1
    fi
}

## 导入配置文件不校验
import_config_no_check () {
    [ -f $file_cookie ] && . $file_cookie
    [ -f $file_config_user ] && . $file_config_user
}

## 发送通知，依赖于import_config_and_check或import_config_no_check，$1：标题，$2：内容
notify () {
    local title=$(echo $1 | perl -pe 's|-|_|g')
    local msg="$(echo -e $2)"
    if [ -d $dir_scripts_node_modules ]; then
        node $dir_root/notify.js "$title" "$msg"
    fi
}

## 统计用户数量
count_user_sum () {
    for ((i=1; i<=${SUM:-$((3 * 4))}; i++)); do
        local tmp1=Cookie$i
        local tmp2=${!tmp1}
        [[ $tmp2 ]] && user_sum=$i || break
    done
}

## 创建日志目录，$1：目录的绝对路径
make_dir () {
    local dir=$1
    [ ! -d $dir ] && mkdir -p $dir
}

## 检测termux
detect_termux () {
    if [[ ${ANDROID_RUNTIME_ROOT}${ANDROID_ROOT} ]] || [[ $PATH == *com.termux* ]]; then
        is_termux=1
    else
        is_termux=0
    fi
}

## 检测macos
detect_macos () {
    [[ $(uname -s) == Darwin ]] && is_macos=1 || is_macos=0
}

## 生成随机数，$1：用来求余的数字
gen_random_num () {
    local divi=$1
    echo $((${RANDOM} % $divi))
}

## 创建软连接的子函数，$1：软连接文件路径，$2：要连接的对象
link_shell_sub () {
    local link_path="$1"
    local original_path="$2"
    if [ ! -L $link_path ] || [[ $(readlink -f $link_path) != $original_path ]]; then
        rm -f $link_path 2>/dev/null
        ln -sf $original_path $link_path
    fi
}

## 创建软连接
link_shell () {
    if [[ $is_termux -eq 1 ]]; then
        link_shell_sub "/data/data/com.termux/files/usr/bin/jtask" "$dir_shell/jtask.sh"
        link_shell_sub "/data/data/com.termux/files/usr/bin/otask" "$dir_shell/jtask.sh"
        link_shell_sub "/data/data/com.termux/files/usr/bin/jcsv" "$dir_shell/jcsv.sh"
        link_shell_sub "/data/data/com.termux/files/usr/bin/jlog" "$dir_shell/jlog.sh"
        link_shell_sub "/data/data/com.termux/files/usr/bin/jpanel" "$dir_shell/jpanel.sh"
        link_shell_sub "/data/data/com.termux/files/usr/bin/jup" "$dir_shell/jup.sh"
    elif [[ $PATH == */usr/local/bin* ]] && [ -d /usr/local/bin ]; then
        link_shell_sub "/usr/local/bin/jtask" "$dir_shell/jtask.sh"
        link_shell_sub "/usr/local/bin/otask" "$dir_shell/jtask.sh"
        link_shell_sub "/usr/local/bin/jcsv" "$dir_shell/jcsv.sh"
        link_shell_sub "/usr/local/bin/jlog" "$dir_shell/jlog.sh"
        link_shell_sub "/usr/local/bin/jpanel" "$dir_shell/jpanel.sh"
        link_shell_sub "/usr/local/bin/jup" "$dir_shell/jup.sh"
    else
        echo -e "脚本功能受限，请自行添加命令的软连接...\n"
    fi
}

## 定义各命令
define_cmd () {
    if type jtask >/dev/null 2>&1; then
        if [ -x "$dir_shell/jtask.sh" ]; then
            cmd_jtask=jtask
            cmd_otask=otask
        else
            cmd_jtask="bash jtask"
            cmd_otask="bash otask"
        fi
    else
        if [ -x "$dir_shell/jtask.sh" ]; then
            cmd_jtask="$dir_shell/jtask.sh"
            cmd_otask="$dir_shell/otask.sh"
        else
            cmd_jtask="bash $dir_shell/jtask.sh"
            cmd_otask="bash $dir_shell/otask.sh"
        fi
    fi
}
