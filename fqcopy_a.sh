#!/bin/bash
#=============================================================
# https://github.com/cgkings/fclone_shell_bot
# File Name: fqcopy_a.sh
# Author: cgking
# Created Time : 2020.7.8
# Description:极速版-多任务版
# System Required: Debian/Ubuntu
# Version: final
#=============================================================

# 基础信息变量：
fclone_name="cgking1"
sa_folder="/root/AutoRclone/cgking1"
gd_id="1Y13Na3HeqVDu7xdEecr0UTThqz9v0dfJ"
jav_id="0AHhmaoIan8U6Uk9PVA"
mdv_id="0AIw8vn3JYQS4Uk9PVA"
book_id="0AMYnicB_St0lUk9PVA"
fq_chercker="320"
fq_transfer="800"
fq_min_size="0"
fq_min_sleep="1"
fq_BURST="1000"
fq_log_level="DEBUG"

# 字体格式变量：
Green_font_prefix="\033[32m"
Red_font_prefix="\033[31m"
Green_background_prefix="\033[42;37m"
Red_background_prefix="\033[41;37m"
Font_color_suffix="\033[0m"
Info="[${Green_font_prefix}信息${Font_color_suffix}]"
Error="[${Red_font_prefix}错误${Font_color_suffix}]"
Tip="[${Green_font_prefix}注意${Font_color_suffix}]"

# 清空日志
: > /root/fqcopy.log

# 极速转存模块
fqcopy_mode() {
    
}

# 监控满750G配额sa
750sa_check() {
    cat /root/fqcopy.log | grep "Changing Service Account File from" | awk '{print $10}' >> /root/invalid_list.log
    if [ -s /root/invalid_list.log ] ; then
    sa_invalid_num=$(sed -n '$=' /root/invalid_list.log)
    mkdir -p "$sa_folder"/invalid
    echo -e "本次转存阵亡"$sa_invalid_num"个sa，即将把阵亡sa转入"$sa_folder"/invalid"
    for sa_invalid in $(cat /root/fclone_shell_bot/log/invalid_list.log)
    do
    mv -f "$sa_invalid" /root/AutoRclone/"$fclone_name1"/invalid
    done
    invalid_sum=$(ls -l "$sa_folder"/invalid | grep "^-" | wc -l)
    echo -e "阵亡文件夹中有"$invalid_sum"个sa，过24h自动转回"
    else
    echo -e "转存太轻松，没有阵亡的sa"
    exit
    fi
}

clear
echo && echo -e " gd一键脚本 ${Red_font_prefix}[v3]${Font_color_suffix} by \033[1;35mcgkings王大锤\033[0m
 
 ${Green_font_prefix} 0.${Font_color_suffix}  sa   脚本
 ———————————————————————
 ${Green_font_prefix} 1.${Font_color_suffix}  定向 同步
 ${Green_font_prefix} 2.${Font_color_suffix}  自定 同步
 ${Green_font_prefix} 3.${Font_color_suffix}  执行 查询
 ${Green_font_prefix} 4.${Font_color_suffix}  执行 查重
 ${Green_font_prefix} 5.${Font_color_suffix}  执行 比对
 ${Green_font_prefix} 6.${Font_color_suffix}  执行 删除
 ${Green_font_prefix} 7.${Font_color_suffix}  执行 清空 
 ———————————————————————
 ${Green_font_prefix} 8.${Font_color_suffix}  执行 挂载（by why大佬） 
 ———————————————————————
 ${Green_font_prefix} 注${Font_color_suffix}  直接输入分享链接，将启动【极速自动分段转存计划模式】
 ———————————————————————" && echo
read -e -p " 请输入数字[0-5]或分享链接:" num
case "$num" in
8)
    bash <(curl -s -L https://git.io/11plus.sh)
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
    run_bot
    ;;
6)
    stop_bot
    ;;





read -p "【一键转存脚本】  by cgkings-王大锤
1. 进入多功能选项[sa/size/];
2. 
直接输入分享链接，即进入极速转存功能（

请输入分享链接任务，任务序号【01】==>" link






link=${link#*id=};link=${link#*folders/};link=${link#*d/};link=${link%?usp*}
rootname=$(fclone lsd "$fclone_name":{$link} --dump bodies -vv 2>&1 | awk 'BEGIN{FS="\""}/^{"id/{print $8}')
if [ -z "$link" ] ; then
echo "不允许输入为空" && exit ;
elif [ -z "$rootname" ] ; then
echo -e "读取文件夹名称出错，请反馈问题给作者,如果是全盘请用fb,此模式读不了盘名!"
break
else
echo "$link" > /root/fclone_shell_bot/log/fqtask.txt
fi
suma=1
while [ $link!=[0] ];do
    suma=$((suma+1))
    echo -e "队列任务模式,任务序号【$suma】"
    read -p "请继续输入分享链接任务，如需终止添加队列则回复"0"==>" link
    link=${link#*id=};link=${link#*folders/};link=${link#*d/};link=${link%?usp*}
    rootname=$(fclone lsd "$fclone_name":{$link} --dump bodies -vv 2>&1 | awk 'BEGIN{FS="\""}/^{"id/{print $8}')
    if [ x"$link" == x"0" ];then
    echo -e "总共添加了【$suma】项任务,队列任务即将执行"
    break;
    elif [ -z "$link" ] ; then
    echo -e "不允许输入为空\n"
    echo -e "再给你一次机会选择！"
    continue;
    elif [ -z "$rootname" ];then
    echo -e "读取文件夹名称出错，请反馈问题给作者,如果是全盘请用fb,此模式读不了盘名!\n"
    echo -e "再给你一次机会选择！"
    continue;
    else
    echo -e "$link" >> /root/fclone_shell_bot/log/fqtask.txt
    fi
done
if [ -s /root/fclone_shell_bot/log/fqtask.txt ];then
IFS=$'\n'
sumb=0
sumh=$(grep -n '' /root/fclone_shell_bot/log/fqtask.txt | awk -F : 'END{print $1}')
for input_id in $(cat ~/fclone_shell_bot/log/fqtask.txt)
do
sumb=$((sumb+1))
rootname=$(fclone lsd "$fclone_name":{$input_id} --dump bodies -vv 2>&1 | awk 'BEGIN{FS="\""}/^{"id/{print $8}')
echo -e "▣▣▣▣▣▣▣任务信息▣▣▣▣▣▣▣\n"
echo -e "┋资源名称┋:"$rootname"\n"
echo -e "┋资源地址┋:"$input_id"\n"
echo -e "┋任务信息┋:第"$sumb"项/共"$sumh"项\n"
echo -e "▣▣▣▣▣▣执行转存▣▣▣▣▣▣"
fclone copy "$fclone_name":{$input_id} "$fclone_name":{$gd_id}/"$rootname" --drive-server-side-across-configs --stats=1s --stats-one-line -P --checkers="$fq_chercker" --transfers="$fq_transfer" --drive-pacer-min-sleep="$fq_min_sleep"ms --drive-pacer-burst="$fq_BURST" --min-size "$fq_min_size"M --check-first --log-level=DEBUG --log-file=/root/fclone_shell_bot/log/fqcopy1.log
echo "|▉▉▉▉▉▉▉▉▉▉▉▉|100%  拷贝完毕"
echo -e "▣▣▣▣▣▣查漏补缺▣▣▣▣▣▣"
fclone copy "$fclone_name":{$input_id} "$fclone_name":{$gd_id}/"$rootname" --drive-server-side-across-configs --stats=1s --stats-one-line -P --checkers="$fq_chercker" --transfers="$fq_transfer" --drive-pacer-min-sleep="$fq_min_sleep"ms --drive-pacer-burst="$fq_BURST" --min-size "$fq_min_size"M --check-first --log-level=DEBUG --log-file=/root/fclone_shell_bot/log/fqcopy2.log
echo "|▉▉▉▉▉▉▉▉▉▉▉▉|100%  补缺完毕"
done
: > /root/fclone_shell_bot/log/fqtask.txt
exit
else
echo "/root/fclone_shell_bot/log/fqtask.txt为空，即将退出" && exit ;
fi
