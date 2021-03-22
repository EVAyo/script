#!/usr/bin/env bash

## 文件路径、脚本网址
dir_root=${JD_DIR:-$(cd $(dirname $0); pwd)}
dir_shell=$dir_root
url_shell=${JD_SHELL_URL:-git@jd_shell_gitee:evine/jd_shell.git}
url_scripts=${JD_SCRIPTS_URL:-git@jd_scripts_gitee:lxk0301/jd_scripts.git}
send_mark=$dir_shell/send_mark

## 命令识别
if [[ $JD_DIR ]]; then
    cmd_task=task
    cmd_own=own
else
    ln -sf $dir_shell/task.sh $dir_shell/own.sh
    cmd_task="bash $dir_shell/task.sh"
    cmd_own="bash $dir_shell/own.sh"
fi

## 导入通用变量与函数
. $dir_shell/share.sh

## 更新crontab，gitee服务器同一时间限制5个链接，因此每个人更新代码必须错开时间，每次执行git_pull随机生成。
## 每天次数随机，更新时间随机，更新秒数随机，至少6次，至多12次，大部分为8-10次，符合正态分布。
random_update_cron () {
    if [[ $(date "+%-H") -le 2 ]] && [ -f $list_crontab_user ]; then
        local random_min=$(gen_random_num 60)
        local random_sleep=$(gen_random_num 56)
        local random_hour_array[0]=$(gen_random_num 3)
        local random_hour=${random_hour_array[0]}
        local i j tmp

        for ((i=1; i<14; i++)); do
            j=$(($i - 1))
            tmp=$(($(gen_random_num 3) + ${random_hour_array[j]} + 2))
            [[ $tmp -lt 24 ]] && random_hour_array[i]=${tmp} || break
        done

        for ((i=1; i<${#random_hour_array[*]}; i++)); do
            random_hour="$random_hour,${random_hour_array[i]}"
        done

        perl -i -pe "s|.+(update.+update.+log.*)|$random_min $random_hour \* \* \* sleep $random_sleep && \1|" $list_crontab_user
        crontab $list_crontab_user
    fi
}

## 重置仓库remote url，docker专用，$1：要重置的目录，$2：要重置为的网址
reset_romote_url () {
    local dir_current=$(pwd)
    local dir_work=$1
    local url=$2

    if [ -d "$dir/.git" ]; then
        cd $dir_work
        git remote set-url origin $url
        git reset --hard
        cd $dir_current
    fi
}

## 克隆脚本，$1：仓库地址，$2：仓库保存路径，$3：分支（可省略）
git_clone_scripts () {
    local url=$1
    local dir=$2
    local branch=$3
    [[ $branch ]] && local cmd="-b $branch "
    echo -e "克隆仓库 $url 到 $dir\n"
    git clone $cmd $url $dir
    exit_status=$?
}

## 更新脚本，$1：仓库保存路径
git_pull_scripts () {
    local dir_current=$(pwd)
    local dir_work=$1
    cd $dir_work
    echo -e "更新脚本：$dir_work\n"
    git fetch --all
    exit_status=$?
    git reset --hard
    git pull
    cd $dir_current
}

## 生成 jd_scripts task 清单
gen_list_task () {
    make_log_dir $dir_list_tmp
    grep -E "node.+j[drx]_\w+\.js" $list_crontab_jd_scripts | perl -pe "s|.+(j[drx]_\w+)\.js.+|\1|" | sort -u > $list_task_jd_scripts
    grep -E "task(\.sh)? j[drx]_\w+" $list_crontab_user | perl -pe "s|.+ (j[drx]_\w+).*|\1|" | sort -u > $list_task_user
}

## 生成 own 清单
gen_list_own () {
    local dir_current=$(pwd)
    rm -f $dir_list_tmp/own*.list >/dev/null 2>&1
    for ((i=0; i<${#OwnRepoUrl[*]}; i++)); do
        cd $dir_own/${array_own_repo_dir_specify[i]}
        for file in $(ls *.js); do
            if [ -f $file ]; then
                perl -ne "{
                    print if /.*([\d\*]*[\*-\/,\d]*[\d\*] ){5}.*$file/
                }" $file | \
                perl -pe "{
                    s|.*(([\d\*]*[\*-\/,\d]*[\d\*] ){5}).*/?$file.*|$file|g;
                    s|\.js||;
                    s|^(.+)|${array_own_repo_dir_specify[i]}/\1|
                }" | \
                head -1 >> $list_own_scripts
            fi
        done
    done
    grep -E "own(\.sh)? " $list_crontab_user | perl -pe "s|.*own(\.sh)? ([\w-\/]+\w+).*|\2|" | sort -u > $list_own_user
    cd $dir_current
}

## 检测cron的差异，$1：脚本清单文件路径，$2：cron任务清单文件路径，$3：增加任务清单文件路径，$4：删除任务清单文件路径
diff_cron () {
    make_log_dir $dir_list_tmp
    local list_scripts="$1"
    local list_task="$2"
    local list_add="$3"
    local list_drop="$4"
    if [ -s $list_task ]; then
        grep -vwf $list_task $list_scripts > $list_add
    else
        cp -f $list_scripts $list_add
    fi
    if [ -s $list_scripts ]; then
        grep -vwf $list_scripts $list_task > $list_drop
    else
        cp -f $list_task $list_drop
    fi
}


## 更新docker-entrypoint，docker专用
update_docker_entrypoint () {
    if [[ $(cat $dir_root/docker/docker-entrypoint.sh) != $(cat /usr/local/bin/docker-entrypoint.sh) ]]; then
        cp -f $dir_root/docker/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
        chmod 777 /usr/local/bin/docker-entrypoint.sh
    fi
}

## 检测配置文件版本
detect_config_version () {
    ## 识别出两个文件的版本号
    ver_config_sample=$(grep " Version: " $file_config_sample | perl -pe "s|.+v((\d+\.?){3})|\1|")
    [ -f $file_config_user ] && ver_config_user=$(grep " Version: " $file_config_user | perl -pe "s|.+v((\d+\.?){3})|\1|")

    ## 删除旧的发送记录文件
    [ -f $send_mark ] && [[ $(cat $send_mark) != $ver_config_sample ]] && rm -f $send_mark

    ## 识别出更新日期和更新内容
    update_date=$(grep " Date: " $file_config_sample | awk -F ": " '{print $2}')
    update_content=$(grep " Update Content: " $file_config_sample | awk -F ": " '{print $2}')

    ## 如果是今天，并且版本号不一致，则发送通知
    if [ -f $file_config_user ] && [[ $ver_config_user != $ver_config_sample ]] && [[ $update_date == $(date "+%Y-%m-%d") ]]; then
        if [ ! -f $send_mark ]; then
            local notify_title="配置文件更新通知"
            local notify_content="更新日期: $update_date\n用户版本: $ver_config_user\n新的版本: $ver_config_sample\n更新内容: $update_content\n更新说明: 如需使用新功能请对照config.sample.sh，将相关新参数手动增加到你自己的config.sh中，否则请无视本消息。本消息只在该新版本配置文件更新当天发送一次。\n"
            echo -e $notify_content
            notify "$notify_title" "$notify_content"
            [[ $? -eq 0 ]] && echo $ver_config_sample > $send_mark
        fi
    else
        [ -f $send_mark ] && rm -f $send_mark
    fi
}

## npm install 子程序，判断是否为安卓，判断是否安装有yarn
npm_install_sub () {
    if [[ $(detect_termux) -eq 1 ]]; then
        npm install --no-bin-links --registry=https://registry.npm.taobao.org || npm install --no-bin-links
    elif type yarn >/dev/null 2>&1; then
        echo -e "检测到本机安装了 yarn，使用 yarn 替代 npm...\n"
        yarn install --registry=https://registry.npm.taobao.org || yarn install
    else
        npm install --registry=https://registry.npm.taobao.org || npm install
    fi
}

## npm install，$1：package.json文件所在路径
npm_install_1 () {
    local dir=$1
    echo -e "运行 npm install...\n"
    npm_install_sub
    [[ $? -ne 0 ]] && echo -e "\nnpm install 运行不成功，请进入 $dir 目录后手动运行 npm install...\n"
}

npm_install_2 () {
    local dir=$1
    echo -e "检测到 $dir 的依赖包有变化，运行 npm install...\n"
    npm_install_sub
    [[ $? -ne 0 ]] && echo -e "\n安装 $dir 的依赖包运行不成功，再次尝试一遍...\n"
    npm_install_1 $dir
}

## 输出是否有新的或失效的定时任务，$1：新的或失效的任务清单文件路径，$2：新/失效
output_list_add_drop () {
    local list=$1
    local type=$2
    if [ -s $list ]; then
        echo -e "检测到有$type的定时任务：\n"
        cat $list
        echo
    fi
}

## 自动删除失效的脚本与定时任务，需要：1.AutoDelCron 设置为 true；2.正常更新js脚本，没有报错；3.存在失效任务；4.crontab.list存在并且不为空
## $1：失效任务清单文件路径，$2：task/own
del_cron () {
    local list_drop=$1
    local type=$2
    local detail type2 detail2
    if [[ ${AutoDelCron} == true ]] && [ -s $list_drop ] && [ -s $list_crontab_user ]; then
        detail=$(cat $list_drop)
        [[ $type == task ]] && type2="scipts脚本" || type2="DIY脚本"
        
        echo -e "开始尝试自动删除定时任务...\n"
        for cron in $detail; do
            perl -i -ne "{print unless /$type.+$cron( |$)/}" $list_crontab_user
        done
        crontab $list_crontab_user
        detail2=$(echo $detail | perl -pe "s| |\\\n|g")
        echo -e "成功删除失效的脚本与定时任务...\n"
        notify "删除失效任务通知" "成功删除以下失效的定时任务（$type2）：\n$detail2"
    fi
}

## 自动增加jd_scripts新的定时任务，需要：1.AutoAddCron 设置为 true；2.正常更新js脚本，没有报错；3.存在新任务；4.crontab.list存在并且不为空
## $1：新任务清单文件路径
add_cron_jd_scripts () {
    local list_add=$1
    if [[ ${AutoAddCron} == true ]] && [ -s $list_add ] && [ -s $list_crontab_user ]; then
        echo -e "开始尝试自动添加 jd_scipts 定时任务...\n"
        local detail=$(cat $list_add)
        for cron in $detail; do
            if [[ $cron == jd_bean_sign ]]; then
                echo "4 0,9 * * * $cmd_task $cron" >> $list_crontab_user
            else
                cat $list_crontab_jd_scripts | grep -E "\/$cron\." | perl -pe "s|(^.+)node */scripts/(j[drx]_\w+)\.js.+|\1cmd_task \2|" >> $list_crontab_user
            fi
        done
        exit_status=$?
    fi
}

## 自动增加自己额外的脚本的定时任务，需要：1.AutoAddCron 设置为 true；2.正常更新js脚本，没有报错；3.存在新任务；4.crontab.list存在并且不为空
## $1：新任务清单文件路径，$2：脚本文件所在的绝对路径
add_cron_own () {
    local list_add=$1
    local list_crontab_own_tmp=$dir_list_tmp/crontab_own.list

    [ -f $list_crontab_own_tmp ] && rm -f $list_crontab_own_tmp

    if [[ ${AutoAddCron} == true ]] && [ -s $list_add ] && [ -s $list_crontab_user ]; then
        echo -e "开始尝试自动添加 own 脚本定时任务...\n"
        local detail=$(cat $list_add)
        for cron in $detail; do
            local file_full_path=$dir_own/$cron.js
            local file_name=$(echo $file_full_path | awk -F "/" '{print $NF}')
            if [ -f $file_full_path ]; then
                perl -ne "{
                    print if /.*([\d\*]*[\*-\/,\d]*[\d\*] ){5}.*$file_name/
                }" $file_full_path | \
                perl -pe "{
                    s|.*(([\d\*]*[\*-\/,\d]*[\d\*] ){5}).*/$file_name.*|\1 $cmd_own $file_name|g;
                    s|  | |g;
                    s|$file_name|$cron|
                }" | \
                head -1 >> $list_crontab_own_tmp
            fi
        done
        crontab_tmp="$(cat $list_crontab_own_tmp)"
        perl -i -pe "s|(# 自有任务结束.+)|$crontab_tmp\n\1|" $list_crontab_user
        exit_status=$?
    fi

    [ -f $list_crontab_own_tmp ] && rm -f $list_crontab_own_tmp
}

## 向系统添加定时任务以及通知，$1：写入crontab.list时的exit状态，$2：新增清单文件路径，$3：scripts脚本/DIY脚本
add_cron_notify () {
    local status_code=$1
    local list_add=$2
    local tmp=$(echo $(cat $list_add))
    local detail=$(echo $tmp | perl -pe "s| |\\\n|g")
    local type=$3
    if [[ $status_code -eq 0 ]]; then
        crontab $list_crontab_user
        echo -e "成功添加新的定时任务...\n"
        notify "新增任务通知" "成功添加新的定时任务（$type）：\n$detail"
    else
        echo -e "添加新的定时任务出错，请手动添加...\n"
        notify "新任务添加失败通知" "尝试自动添加以下新的定时任务出错，请手动添加（$type）：\n$detail"
    fi
}

#################################################################################################################################

## 在日志中记录时间与路径
echo "
--------------------------------------------------------------

系统时间：$(date "+%Y-%m-%d %H:%M:%S")

脚本根目录：$dir_root

jd_scripts目录：$dir_scripts

DIY脚本目录：$dir_own

--------------------------------------------------------------
"

## 导入配置文件并检验
import_config_no_check update

## 更新update任务的cron
random_update_cron

## 重置仓库romote url
reset_romote_url $dir_shell $url_shell
reset_romote_url $dir_scripts $url_scripts

## 更新shell
[ -f $dir_panel/package.json ] && panel_depend_old=$(cat $dir_panel/package.json)
git_pull_scripts $dir_shell
if [[ $exit_status -eq 0 ]]; then
    echo -e "\n更新$dir_shell成功...\n"
    [ -f $dir_panel/package.json ] && panel_depend_new=$(cat $dir_panel/package.json)
    if [[ "$panel_depend_old" != "$panel_depend_new" ]]; then
        cd $dir_panel
        npm_install_2 $dir_panel
    fi
    cp -f $file_config_sample $dir_config/config.sample.sh
    update_docker_entrypoint
    detect_config_version
else
    echo -e "\n更新$dir_shell失败，请检查原因...\n"
fi

## 更新scripts
[ -f $dir_scripts/package.json ] && scripts_depend_old=$(cat $dir_scripts/package.json)
[ -d $dir_scripts/.git ] && git_pull_scripts $dir_scripts || git_clone_scripts $url_scripts $dir_scripts
if [[ $exit_status -eq 0 ]]; then
    echo -e "\n更新$dir_scripts成功...\n"
    [ -f $dir_scripts/package.json ] && scripts_depend_new=$(cat $dir_scripts/package.json)
    if [[ "$scripts_depend_old" != "$scripts_depend_new" ]]; then
        cd $dir_scripts
        npm_install_2 $dir_scripts
    fi
    gen_list_task
    diff_cron $list_task_jd_scripts $list_task_user $list_task_add $list_task_drop
    if [ -s $list_task_drop ]; then
        output_list_add_drop $list_task_drop "失效"
        del_cron $list_task_drop task
    fi
    if [ -s $list_task_add ]; then
        output_list_add_drop $list_task_add "新"
        add_cron_jd_scripts $list_task_add
        add_cron_notify $exit_status $list_task_add "scripts脚本"
    fi
else
    echo -e "\n更新$dir_scripts失败，请检查原因...\n"
fi

## 更新own脚本
if [[ ${#OwnRepoUrl[*]} -gt 0 ]]; then
    gen_own_dir_list
    for ((i=0; i<${#OwnRepoUrl[*]}; i++)); do
        [ -d ${array_own_repo_path[i]}/.git ] && git_pull_scripts ${array_own_repo_path[i]} || git_clone_scripts ${OwnRepoUrl[i]} ${array_own_repo_path[i]}
        [[ $exit_status -eq 0 ]] && echo -e "\n更新${array_own_repo_path[i]}成功...\n" || echo -e "\n更新${array_own_repo_path[i]}失败，请检查原因...\n"
    done
    gen_list_own
    diff_cron $list_own_scripts $list_own_user $list_own_add $list_own_drop

    echo -e "开始复制指定脚本（不含jd_scripts项目中已经存在的同名文件）...\n"
    for ((i=0; i<${#OwnRepoUrl[*]}; i++)); do
        for file in $(grep -E "${array_own_repo_dir_specify[i]}/" $list_own_scripts); do
            file_name=$(cat $dir_own/$file.js | awk -F "/" '{print $NF}')
            if [[ $(grep -E "^$file_name$" $list_task_jd_scripts) ]]; then
                continue
            else
                cp -fv $dir_own/$file.js $dir_scripts
            fi
        done
    done

    if [ -s $list_own_drop ]; then
        output_list_add_drop $list_own_drop "失效"
        del_cron $list_own_drop own
    fi
    if [ -s $list_own_add ]; then
        output_list_add_drop $list_own_add "新"
        add_cron_own $list_own_add
        add_cron_notify $exit_status $list_own_add "own脚本"
    fi
else
    perl -i -ne "{print unless /own(\.sh)? /}" $list_crontab_user
fi



## 调用用户自定义的diy.sh
if [[ ${EnableExtraShell} == true ]]; then
  if [ -f $file_diy_shell ]
  then
    . $file_diy_shell
  else
    echo -e "$file_diy_shell文件不存在，跳过执行DIY脚本...\n"
  fi
fi