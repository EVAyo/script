#!/bin/bash
source /root/fclone_shell_bot/myfc_config.ini

# ★★★sa生成&下载服务-已完成★★★
sa_creat() {
    echo "▂▃▄▅▆▇█▓▒░ sa|生成下载 ░▒▓█▇▆▅▄▃▂"
    echo 
}

# ★★★sa检查-已完成★★★
sa_check() {
    echo "▂▃▄▅▆▇█▓▒░ sa|执行检测 ░▒▓█▇▆▅▄▃▂"
    if [ -a /root/fclone_shell_bot/myfc_config.ini];then
    else
    read -p "请输入sa保存地址" safolder
    read -p "请输入用于sa检测的fclone账号名，即remote" fclone_name
    read -p "请输入用于sa检测的团队盘id,为了检测速度，请尽量选择文件较少的团队盘，但不能选择空盘" fsa_id
    read -p "请输入gen_sa_accounts.py所在地址" pyfolder
    fi
    stty erase '^H'
    echo "注意：请先将credentials.json和token.pickle文件放至gen_sa_accounts.py文件所在目录"
    echo 读取myfc_config.ini,注意你的CPU负载！
    echo -e "你的remote:$fclone_name"
    echo -e "你的sa保存目录:$safolder"
    echo -e "你的sa检测目标文件夹id:$fsa_id"
    echo -e "开启sa服务所需的gen_sa_accounts.py文件所在目录：$pyfolder,请确认该目录有权限文件"
    echo -e "以上如需修改，请打开ini文件修改fclone_name、safolder、pyfolder、fsa_id数值"
    echo -e "检测NG.文件目录：$safolder/invalid"
    echo -e "检测ok文件将移至：/root/AutoRclone/$fclone_name，如需更改，请修改本脚本相应目录行即可\n"
    mkdir -p $safolder/invalid
    sa1_sum=$(ls -l $safolder|grep "^-"| wc -l)
    echo -e "█║▌║▌║待检测sa $sa1_sum 个，开始检测║▌║▌║█\n"
    find $safolder -type f -name "*.json" | xargs -I {} -n 1 -P 10 bash -c 'fclone lsd '$fclone_name':{'$fsa_id'} --drive-service-account-file={} --drive-service-account-file-path=""  &> /dev/null || mv {} '$safolder'/invalid '
    xsa_sum=$(ls -l $safolder/invalid|grep "^-"| wc -l)
    sa_sum=$(ls -l $safolder|grep "^-"| wc -l)
    if [ x$xsa_sum = x0 ];then
    echo -e "█║▌║▌║恭喜你！你的sa[$sa_sum],全部检测ok║▌║▌║█"
    mv -f $safolder/*.json /root/AutoRclone/"$fclone_name"
    ok_sum=$(ls -l /root/AutoRclone/$fclone_name|grep "^-"| wc -l)
    echo -e "检测ok sa已移至/root/AutoRclone/$fclone_name,现$fclone_name文件夹共有$ok_sum个sa"
    exit
    elif [ x$sa_sum = x0 ];then
    echo -e "█║▌║▌║非常遗憾，你的sa[$sa_sum],全部检测NG.║▌║▌║█\n"
    sa_openserver
    else
    mv -f $safolder/*.json /root/AutoRclone/"$fclone_name"
    ok_sum=$(ls -l /root/AutoRclone/$fclone_name|grep "^-"| wc -l)
    echo -e "检测ok sa $sa_sum 个，已移至/root/AutoRclone/$fclone_name,现$fclone_name文件夹共有$ok_sum个sa"
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
    $install_commend install wget curl screen git sudo python3-distutils -y
    $install_commend install python3 python3-pip -y
    curl "https://bootstrap.pypa.io/get-pip.py" -o "get-pip.py"
    python3 get-pip.py
    echo 步骤一：2.安装autorclone
    cd ~
    git clone https://github.com/xyou365/AutoRclone && cd AutoRclone && sudo pip3 install -r requirements.txt
    echo 步骤一：3.安装test2.1


    elif [ x"$sa_Foreplay_needs" == x"n" ];then
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
 0.  全新账号&空白VPS
 ———————————————————————
 1.  sa_生成&下载
 2.  sa_检测
 3.  sa_批量提取csv
 4.  sa_安装环境和软件
 ———————————————————————
 5.  退出脚本" && echo 
read -e -p " 请输入数字 [0-4]:" chose_num
case "$chose_num" in
0)
    exit
    ;;
1)
    install_exp
    ;;
2)
    install_shellbot
    ;;
3)
    install_clone
    ;;
4)
    install_script
    ;;
5)
    exit
    ;;
*)
    echo
    echo -e " ${Error} 请输入正确的数字"
    ;;
esac