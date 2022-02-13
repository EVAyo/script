#!/bin/bash
source /root/fclone_shell_bot/myfc_config.ini

# ★★★sa生成&下载服务-已完成★★★
sa_creat() {
    echo "▂▃▄▅▆▇█▓▒░ sa|生成下载 ░▒▓█▇▆▅▄▃▂"
    echo "https://developers.google.com/drive/api/v3/quickstart/python"
    echo "在网页开启DRIVER API，并下载credentials.json文件"
    echo "在vps输入rz上传credentials.json"
    echo && echo -e "
    说明：本脚本基于test2.1.py!
    0.  退出脚本
    ———————————————————————
    1.  sa_首次/增量生成
    2.  sa_覆盖重新生成（没写完）
    3.  sa_删除项目(没写完)
    ———————————————————————" && echo
    read -e -p " 请输入数字 [0-3]:" chose_creat_num
    case "$chose_creat_num" in
    0)
        exit
        ;;
    1)
        echo 注意1：首次生成，需要网页授权生成token文件，并网页开启项目的api服务
        echo 注意2：请确保test2.1py和cred、token权限文件目录在/root/AutoRclone
        echo 注意3：sa名称一般按邮箱命名，本脚本默认采为项目-邮箱前缀命名方式
        read -p "请输入单位项目sa数量：（即sa/proj，建议10）：" sa_proj_per
        echo -e "一次创建项目数量，建议少于50，杜甫随意"
        read -p "请输入创建项目数量：" sa_proj_num
        echo -e "sa名称默认为sa邮箱名称，如sa_name3@project_name1.iam.gserviceaccount.com.json"
        echo -e "project_name要求：可以包含小写字母、数字或连字符，必须以小写字母开头并以字母或数字结尾，6-30字符之间，不得与其他项目同名"
        read -p "请输入自定义项目前缀名称(project_name)：" sa_proj_name
        echo -e "项目序号说明：增量生成注意不可与之前重复，如设置为2，生成2个项目，则为project_name2,project_name3,累加"
        read -p "请输入自定义项目前缀起始序号：" sa_proj_name_num
        echo -e "sa_name要求：必须以小写字母开头，后跟一个或多个小写字母、数字字符（可使用连字符分隔），6-30字符之间"
        read -p "请输入自定义sa邮箱前缀名称（sa_name）：" sa_name
        echo -e "sa序号说明：增量生成注意不可与之前重复，如设置为2，如生成2个项目，1sa/proj，则为sa_name2,sa_name3,跨项目累加"
        read -p "请输入自定义sa邮箱前缀起始序号（增量生成注意不可与之前重复）：" sa_name_num
        cd /root/AutoRclone
        python3 test2.1.py --new-only --quick-setup "$sa_proj_num" --sa-quantity "$sa_proj_per" --project-prefix "$sa_proj_name" --sa-prefix $sa_name -n "$sa_proj_name_num" -x $sa_name_num --max-projects 9999 --email-name 3
        ;;
    2)
        exit
        ;;
    3)
        exit
        ;;
    *)
        echo
        echo -e " ${Error} 请输入正确的数字"
        ;;
    esac
}
# ★★★sa提取服务-已完成★★★
sa_csv() {
    echo "▂▃▄▅▆▇█▓▒░ sa|提取 ░▒▓█▇▆▅▄▃▂"
    echo && echo -e " 
    说明：本脚本使用test2.1.py! 
    ———————————————————————
    1.  普通用户  提取邮件列表
    2.  Gsuit用户 提取上传用csv
    ———————————————————————
    0.  退出" && echo
    read -e -p " 请输入数字 [0-2]:" chose_creat_num
    case "$chose_creat_num" in
    0)
        exit
        ;;
    1)
        read -p "请输入sa文件夹路径：" sa_path
        echo 下面将$sa_path内json文件的sa_email信息提取至~/sa_email.txt
        cat $sa_path/*.json | grep "client_email" | awk '{print $2}'| tr -d ',"' | sed 'N;N;N;N;N;N;N;N;N;/^$/d;G' > ~/sa_email.txt
        echo done！！！
        ;;
    2)
        read -p "请输入sa文件夹路径：" sa_path
        read -p "请输入要添加到的群组邮箱地址：" group_email
        echo 下面将$sa_path内json文件的sa_email信息提取至~/sa_members.csv
        cat $sa_path/*.json | grep "client_email" | awk '{print $2}'| tr -d ',"' > ~/sa_email.txt && sed '/./{s/^/$group_email,/;s/$/,USER,MEMBER/}' sa_email.txt >> sa_members.csv && sed -i '1i\"Group email [Required]","Member Email","Member Type","Member Role"' sa_members.csv
        rm -f ~/sa_email.txt
        echo done！！！
        ;;
    *)
        echo
        echo -e " ${Error} 请输入正确的数字"
        ;;
    esac
}
# ★★★sa检查-已完成★★★
sa_check() {
    echo "▂▃▄▅▆▇█▓▒░ sa|执行检测 ░▒▓█▇▆▅▄▃▂"
    if [ -a /root/fclone_shell_bot/myfc_config.ini ];then
    echo 加载myfc_config.ini
    else
    read -p "请输入sa保存地址" safolder
    read -p "请输入用于sa检测的fclone账号名，即remote" fclone_name1
    read -p "请输入用于sa检测的团队盘id,为了检测速度，请尽量选择文件较少的团队盘，但不能选择空盘" fsa_id
    read -p "请输入gen_sa_accounts.py所在地址" pyfolder
    fi
    stty erase '^H'
    echo "注意：请先将credentials.json和token.pickle文件放至gen_sa_accounts.py文件所在目录"
    echo 读取myfc_config.ini,注意你的CPU负载！
    echo -e "你的remote:$fclone_name1"
    echo -e "你的sa保存目录:$safolder"
    echo -e "你的sa检测目标文件夹id:$fsa_id"
    echo -e "开启sa服务所需的gen_sa_accounts.py文件所在目录：$pyfolder,请确认该目录有权限文件"
    echo -e "以上如需修改，请打开ini文件修改fclone_name、safolder、pyfolder、fsa_id数值"
    echo -e "检测NG.文件目录：$safolder/invalid"
    echo -e "检测ok文件将移至：/root/AutoRclone/ok，如需更改，请修改本脚本相应目录行即可\n"
    mkdir -p "$safolder"/invalid
    mkdir -p "$safolder"/ok
    sa1_sum=$(ls -l "$safolder"|grep "^-"| wc -l)
    echo -e "█║▌║▌║待检测sa $sa1_sum 个，开始检测║▌║▌║█\n"
    find $safolder -type f -name "*.json" | xargs -I {} -n 1 -P 10 bash -c 'fclone lsd '$fclone_name1':{'$fsa_id'} --drive-service-account-file={} --drive-service-account-file-path=""  &> /dev/null || mv {} '$safolder'/invalid '
    xsa_sum=$(ls -l $safolder/invalid|grep "^-"| wc -l)
    sa_sum=$(ls -l $safolder|grep "^-"| wc -l)
    if [ x$xsa_sum = x0 ];then
    echo -e "█║▌║▌║恭喜你！你的sa[$sa_sum],全部检测ok║▌║▌║█"
    mv -f $safolder/*.json /root/AutoRclone/test/ok
    ok_sum=$(ls -l /root/AutoRclone/test/ok|grep "^-"| wc -l)
    echo -e "检测ok sa已移至/root/AutoRclone/test/ok,现ok文件夹共有$ok_sum个sa"
    exit
    elif [ x$sa_sum = x0 ];then
    echo -e "█║▌║▌║非常遗憾，你的sa[$sa_sum],全部检测NG.║▌║▌║█\n"
    sa_openserver
    else
    mv -f $safolder/*.json /root/AutoRclone/test/ok
    ok_sum=$(ls -l /root/AutoRclone/test/ok|grep "^-"| wc -l)
    echo -e "检测ok sa $sa_sum 个，已移至/root/AutoRclone/test/ok,现ok文件夹共有$ok_sum个sa"
    echo -e "█║▌║▌║检测NG sa $xsa_sum 个║▌║▌║█\n"
    sa_openserver
    fi
    echo -e "done！！！"
    exit
}
# ★★★开启sa服务-已完成★★★
sa_openserver() {
    echo "▂▃▄▅▆▇█▓▒░ sa|开启服务 ░▒▓█▇▆▅▄▃▂"
    sumsa=0
    for saf_id in $(sort -u $safolder/invalid/*.json | grep "project_id" | awk '{print $2}' | tr -d ',"')
    do
    cd /root/AutoRclone && python3 gen_sa_accounts.py --enable-services $saf_id
    sumsa=$((sumsa+1))
    echo -e "已开启 第"$sumsa"个sa；共"$xsa_sum"个sa"
    done
    mv -f $safolder/invalid/*.json $safolder
    echo "开启服务已运行完毕，invalid内json文件已移回$safolder！"
    sa_check
}
# ★★★安装环境及软件-已完成★★★
sa_Foreplay_install() {
    echo 步骤一：安装依赖环境及软件（请使用root账户）
    read -e -p "请确认是否需要安装依赖环境及软件(Python/autorclone/test2.1):[y/n]" sa_Foreplay_needs
    if [ x"$sa_Foreplay_needs" == x"y" ];then
    read -e -p "请输入vps系统：1.debian&ubuntu 2.centos" system_stats
        if [ x"$system_stats" == x"1" ];then
        install_commend="apt"
        apt update -y &&　apt upgrade -y
        elif [ x"$system_stats" == x"2" ];then
        install_commend="yum"
        yum update -y
        else
        echo 请输入1或者2！
        exit
        fi
    echo 步骤一：1.安装python
    $install_commend install wget curl lrzsz tree vim nano tmux unzip htop screen git sudo python3-distutils -y
    $install_commend install python3 python3-pip -y
    curl "https://bootstrap.pypa.io/get-pip.py" -o "get-pip.py"
    python3 get-pip.py
    echo 步骤一：2.安装autorclone
    cd ~
    git clone https://github.com/xyou365/AutoRclone && cd AutoRclone && pip3 install -r requirements.txt
    echo 步骤一：3.安装test2.1
    cd AutoRclone && wget -N https://raw.githubusercontent.com/cgkings/fclone_shell_bot/master/script/py/test2.1.py
    elif [ x"$sa_Foreplay_needs" == x"n" ];then
    echo -e "\n"
    else
    echo "请输入y或者n!"
    exit
    fi
}

# ★★★完全安装-已完成★★★
sa_full_install() {
    sa_Foreplay_install
}

# ★★★主目录-已完成★★★
echo && echo -e " fclone sa mangement [v 1.0] by cgkings

说明：本脚本基于test2.1.py! 
 0.  全新账号&空白VPS(未完成)
 ———————————————————————
 1.  sa_生成&下载
 2.  sa_检测
 3.  sa_定向开启服务(未完成)
 4.  sa_批量提取csv
 5.  sa_安装环境和软件
 6.  sa_列表功能
 ———————————————————————
 5.  退出脚本" && echo 
read -e -p " 请输入数字 [0-4]:" chose_num
case "$chose_num" in
0)
    sa_full_install
    exit
    ;;
1)
    sa_creat
    exit
    ;;
2)
    sa_check
    exit
    ;;
3)
    exit
    ;;
4)
    sa_csv
    exit
    ;;
5)
    sa_Foreplay_install
    exit
    ;;
6)
    echo "▂▃▄▅▆▇█▓▒░ sa|查询列表 ░▒▓█▇▆▅▄▃▂"
    if [ -a /root/AutoRclone/credentials.json ];then
    echo "/root/AutoRclone/credentials.json确认Ok"
    else
    echo /root/AutoRclone/credentials.json不存在
    exit
    fi
    if [ -a /root/AutoRclone/token.pickle ];then
    echo "/root/AutoRclone/token.pickle确认Ok"
    else
    echo /root/AutoRclone/token.pickle不存在
    exit
    fi
    cd /root/AutoRclone
    : > /root/AutoRclone/sa_list.csv
    python3 test2.1.py --list-projects > /root/AutoRclone/sa_account_list.csv
    for i in $(sort /root/AutoRclone/sa_account_list.csv)
    do
    sa_list=$(python3 test2.1.py --list-sas $i)
    printf "%-s;\t;%-s;\n" "$i" "$sa_list" >> /root/AutoRclone/sa_list.csv
    done
    rm -f /root/AutoRclone/sa_account_list.csv
    exit
    ;;
*)
    echo
    echo -e " ${Error} 请输入正确的数字"
    exit
    ;;
esac