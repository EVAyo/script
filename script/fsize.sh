#!/bin/bash
#=============================================================
# https://github.com/cgkings/fclone_shell_bot
# File Name: fsize.sh
# Author: cgking
# Created Time : 2020.7.8
# Description:size查询
# System Required: Debian/Ubuntu
# Version: final
#=============================================================

source /root/fclone_shell_bot/myfc_config.ini
clear
read -p "请输入查询链接==>" link
link=${link#*id=};link=${link#*folders/};link=${link#*d/};link=${link%?usp*}
rootname=$(fclone lsd "$fclone_nameb":{$link} --dump bodies -vv 2>&1 | awk 'BEGIN{FS="\""}/^{"id/{print $8}')
if [ -z "$link" ] ; then
echo "不允许输入为空" && exit ;
else
size_info=`fclone size "$fclone_nameb":{$link} --checkers="$fs_chercker"`
file_num=$(echo "$size_info" | awk 'BEGIN{FS=" "}/^Total objects/{print $3}')
file_size=$(echo "$size_info" | awk 'BEGIN{FS=" "}/^Total size/{print $3,$4}')
echo -e "资源名称："$rootname"\n"
echo -e "——————————————————————————————————————"
echo -e "| 类型 |    文件数    |    文件大小    |"
echo -e "├——————+—————————————+————————————————|"
echo -e "├ 视频 + "$file_num1" + "$file_size1" |"
echo -e "| 图片 + "$file_num2" + "$file_size2" |"
echo -e "| 文本 + "$file_num3" + "$file_size3" |"
echo -e "├——————+——————————————+———————————————|"
echo -e "| 总计 + "$file_num0" + "$file_size0" |"
echo -e "——————————————————————————————————————"
fi
exit