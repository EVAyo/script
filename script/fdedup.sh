#!/bin/bash
# =============================================================
# https://github.com/cgkings/fclone_shell_bot
# File Name: fdedup.sh Author: cgking
# Created Time : 2020.9.2
# Description:定向查重
# System Required: Debian/Ubuntu Version: final
# =============================================================
source /root/fclone_shell_bot/myfc_config.ini
: > /root/fclone_shell_bot/log/fdedupe.log
read -p "请输入要查重的链接==>" link
if [ -z "$link" ] ; then
echo "不允许输入为空" && exit
else
link=${link#*id=};link=${link#*folders/};link=${link#*d/};link=${link%?usp*}
fi
echo -e "▣▣▣▣▣▣正在执行查重▣▣▣▣▣▣"
fclone dedupe smallest "$fclone_name2":{$link} --drive-server-side-across-configs --drive-use-trash=false --checkers="$fs_chercker" --transfers="$fs_transfer" --drive-pacer-min-sleep=1ms --drive-pacer-burst=500 --log-level=DEBUG --log-file=/root/fclone_shell_bot/log/fdedupe.log --check-first
echo "|▉▉▉▉▉▉▉▉▉▉▉▉|100%  查重完毕"
echo -e "▣▣▣▣▣▣正在执行删空▣▣▣▣▣▣"
fclone rmdirs "$fclone_name2":{$link} --drive-use-trash=false -vvP --checkers="$fs_chercker" --transfers="$fs_transfer" --drive-pacer-min-sleep=1ms --drive-pacer-burst=500 --check-first
echo "|▉▉▉▉▉▉▉▉▉▉▉▉|100%  删空完毕"
