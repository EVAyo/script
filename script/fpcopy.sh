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
: > /root/fclone_shell_bot/log/fpcopy.log
: > /root/fclone_shell_bot/log/fpsync.log
: > /root/fclone_shell_bot/log/fdedupe.log
: > /root/fclone_shell_bot/log/fcleanup.log

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
fclone copy "$fclone_name":{$link1} "$fclone_name":{$link2} --drive-server-side-across-configs --stats=1s --stats-one-line -P --checkers="$fp_chercker" --transfers="$fp_transfer" --drive-pacer-min-sleep="$fp_min_sleep"ms --drive-pacer-burst="$fp_BURST" --min-size "$fp_min_size"M --check-first --ignore-existing --log-level=DEBUG --log-file=/root/fclone_shell_bot/log/fpcopy.log
echo -e "|▉▉▉▉▉▉▉▉▉▉▉▉|100%  拷贝完毕"
echo -e "▣▣▣▣▣▣执行同步▣▣▣▣▣▣"
fclone sync "$fclone_name":{$link1} "$fclone_name":{$link2} --drive-server-side-across-configs --drive-use-trash=false --stats=1s --stats-one-line -P --checkers="$fb_chercker" --transfers="$fb_transfer" --drive-pacer-min-sleep="$fb_min_sleep"ms --drive-pacer-burst="$fb_BURST" --min-size "$fb_min_size"M --check-first --log-level=DEBUG --log-file=/root/fclone_shell_bot/log/fpsync.log
echo -e "|▉▉▉▉▉▉▉▉▉▉▉▉|100%  补缺完毕"
echo -e "▣▣▣▣▣▣正在执行查重▣▣▣▣▣▣"
fclone dedupe smallest "$fclone_name":{$link2} --drive-server-side-across-configs --drive-use-trash=false --checkers="$fs_chercker" --transfers="$fs_transfer" --drive-pacer-min-sleep="$fs_min_sleep"ms --drive-pacer-burst="$fs_BURST" --log-level=DEBUG --log-file=/root/fclone_shell_bot/log/fdedupe.log --check-first
echo "|▉▉▉▉▉▉▉▉▉▉▉▉|100%  查重完毕"
echo -e "▣▣▣▣▣▣正在执行删空▣▣▣▣▣▣"
fclone rmdirs "$fclone_name":{$link2} --drive-use-trash=false -vvP --checkers="$fs_chercker" --transfers="$fs_transfer" --drive-pacer-min-sleep="$fs_min_sleep"ms --drive-pacer-burst="$fs_BURST" --log-level=DEBUG --log-file=/root/fclone_shell_bot/log/fcleanup.log --check-first
echo "|▉▉▉▉▉▉▉▉▉▉▉▉|100%  删空完毕"
exit