#!/bin/bash
#=============================================================
# https://github.com/cgkings/fclone_shell_bot
# File Name: fpcopy.sh
# Author: cgking
# Created Time : 2020.9.11
# Description:点对点转存
# System Required: Debian/Ubuntu
# Version: final
#=============================================================

source /root/fclone_shell_bot/myfc_config.ini
: > /root/fclone_shell_bot/log/fpcopy.log
: > /root/fclone_shell_bot/log/fpsync.log
: > /root/fclone_shell_bot/log/invalid_list.log

read -p "【点对点模式】请输入from ID==>" link1
link1=${link1#*id=};link1=${link1#*folders/};link1=${link1#*d/};link1=${link1%?usp*}
if [ -z "$link1" ] ; then
echo "不允许输入为空" && exit ;
fi
read -p "请输入copy to ID==>" link2
link2=${link2#*id=};link2=${link2#*folders/};link2=${link2#*d/};link2=${link2%?usp*}
if [ -z "$link2" ] ; then
echo "不允许输入为空" && exit ;
fi
echo -e "▣▣▣▣▣▣执行转存▣▣▣▣▣▣"
fclone copy "$fclone_name1":{$link1} "$fclone_name1":{$link2} --drive-server-side-across-configs --stats=1s --stats-one-line -P --checkers="$fp_chercker" --transfers="$fp_transfer" --drive-pacer-min-sleep="$fp_min_sleep"ms --drive-pacer-burst="$fp_BURST" --min-size "$fp_min_size"M --check-first --ignore-existing --log-level="$fp_log_level" --log-file=/root/fclone_shell_bot/log/fpcopy.log
echo -e "|▉▉▉▉▉▉▉▉▉▉▉▉|100%  拷贝完毕"
echo -e "▣▣▣▣▣▣执行同步▣▣▣▣▣▣"
fclone sync "$fclone_name1":{$link1} "$fclone_name1":{$link2} --drive-server-side-across-configs --drive-use-trash=false --stats=1s --stats-one-line -P --checkers="$fb_chercker" --transfers="$fb_transfer" --drive-pacer-min-sleep="$fb_min_sleep"ms --drive-pacer-burst="$fb_BURST" --min-size "$fb_min_size"M --check-first --log-level="$fp_log_level" --log-file=/root/fclone_shell_bot/log/fpsync.log
echo -e "|▉▉▉▉▉▉▉▉▉▉▉▉|100%  补缺完毕"
cat /root/fclone_shell_bot/log/fpcopy.log | grep "Changing Service Account File from" | awk '{print $10}' >> /root/fclone_shell_bot/log/invalid_list.log
cat /root/fclone_shell_bot/log/fpsync.log | grep "Changing Service Account File from" | awk '{print $10}' >> /root/fclone_shell_bot/log/invalid_list.log
if [ -s /root/fclone_shell_bot/log/invalid_list.log ] ; then
sa_invalid_num=$(sed -n '$=' /root/fclone_shell_bot/log/invalid_list.log)
mkdir -p /root/AutoRclone/"$fclone_name1"/invalid
echo -e "本次转存阵亡"$sa_invalid_num"个sa，即将把阵亡sa转入/root/AutoRclone/"$fclone_name1"/invalid"
for sa_invalid in $(cat /root/fclone_shell_bot/log/invalid_list.log)
do
mv -f "$sa_invalid" /root/AutoRclone/"$fclone_name1"/invalid
done
invalid_sum=$(ls -l /root/AutoRclone/"$fclone_name1"/invalid|grep "^-"| wc -l)
echo -e "阵亡文件夹中有"$invalid_sum"个sa，过24h自动转回"
else
echo -e "转存太轻松，没有阵亡的sa"
exit
fi
exit