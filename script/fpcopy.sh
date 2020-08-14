#!/bin/bash
#=============================================================
# https://github.com/cgkings/fclone_shell_bot
# File Name: fpcopy.sh
# Author: cgking
# Created Time : 2020.7.8
# Description:点对点转存
# System Required: Debian/Ubuntu
# Version: final
#=============================================================

source /root/fclone_shell_bot/myfc_config.ini
clear
read -p "【点对点模式】请输入from ID==>" link1
link1=${link1#*id=};link1=${link1#*folders/};link1=${link1#*d/};link1=${link1%?usp*}
if [ -z "$link1" ] ; then
echo "不允许输入为空" && exit ;
else
size_info1=`fclone size "$fclone_nameb":{$link1} --checkers="$fs_chercker"`
file_num1=$(echo "$size_info1" | awk 'BEGIN{FS=" "}/^Total objects/{print $3}')
file_size1=$(echo "$size_info1" | awk 'BEGIN{FS=" "}/^Total size/{print $3,$4}')
fi
read -p "请输入copy to ID==>" link2
link2=${link2#*id=};link2=${link2#*folders/};link2=${link2#*d/};link2=${link2%?usp*}
if [ -z "$link2" ] ; then
echo "不允许输入为空" && exit ;
else
size_info2=`fclone size "$fclone_nameb":{$link2} --checkers="$fs_chercker"`
file_num2=$(echo "$size_info2" | awk 'BEGIN{FS=" "}/^Total objects/{print $3}')
file_size2=$(echo "$size_info2" | awk 'BEGIN{FS=" "}/^Total size/{print $3,$4}')
fi
file_num=$(file_num1+file_num2)
if [ $file_num > $file_limit ];then
echo 源数据可能导致团队盘文件数超过警戒值($file_limit),拷贝完成后文件将达到$file_num，可能会报错中断！
read -p "你是否仍要继续[Y/N]" contiue_chose
    if [ $contiue_chose = N ];then
    exit
    fi
fi
echo -e "▣▣▣▣▣▣任务信息▣▣▣▣▣▣\n"
echo -e "┋fromid数量┋:"$file_num1"\n"
echo -e "┋fromid大小┋:"$file_size1"\n"
echo -e "┋copyto数量┋:"$file_num1"\n"
echo -e "┋copyto大小┋:"$file_size1"\n"
echo -e "┋转存后数量 ┋:"$file_num"\n"
echo -e "▣▣▣▣▣▣执行转存▣▣▣▣▣▣"
fclone copy "$fclone_name":{$link1} "$fclone_name":{$link2} --drive-server-side-across-configs --stats=1s --stats-one-line -P --checkers="$fp_chercker" --transfers="$fp_transfer" --drive-pacer-min-sleep="$fp_min_sleep"ms --drive-pacer-burst="$fp_BURST" --min-size "$fp_min_size"M --check-first --ignore-existing --log-level=ERROR --log-file=/root/fclone_shell_bot/log/fpcopy1.log
echo -e "|▉▉▉▉▉▉▉▉▉▉▉▉|100%  拷贝完毕"
echo -e "▣▣▣▣▣▣执行补缺▣▣▣▣▣▣"
fclone copy "$fclone_name":{$link1} "$fclone_name":{$link2} --drive-server-side-across-configs --stats=1s --stats-one-line -P --checkers="$fp_chercker" --transfers="$fp_transfer" --drive-pacer-min-sleep="$fp_min_sleep"ms --drive-pacer-burst="$fp_BURST" --min-size "$fp_min_size"M --check-first --ignore-existing --log-level=ERROR --log-file=/root/fclone_shell_bot/log/fpcopy2.log
echo -e "|▉▉▉▉▉▉▉▉▉▉▉▉|100%  补缺完毕"
echo -e "▣▣▣▣▣▣执行查重▣▣▣▣▣▣"
fclone dedupe newest "$fclone_name":{$link2} --fast-list --size-only --drive-use-trash=false --no-traverse --checkers="$fs_chercker" --transfers="$fs_transfer" -q --log-level=ERROR --log-file=/root/fclone_shell_bot/log/fdedupe.log
echo -e "|▉▉▉▉▉▉▉▉▉▉▉▉|100%  查重完毕"
exit