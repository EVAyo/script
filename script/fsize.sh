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

#三种模式，在myfc_config.ini中选择size_mode
#其中：1#模式，文件数模式，2#模式，size基础模式,3#size列表模式
read -p "请输入查询链接==>" link
link=${link#*id=};link=${link#*folders/};link=${link#*d/};link=${link%?usp*}
rootname=$(fclone lsd "$fclone_name3":{$link} --dump bodies -vv 2>&1 | awk 'BEGIN{FS="\""}/^{"id/{print $8}')
if [ -z "$link" ] ; then
echo "不允许输入为空" && exit ;
fi
#1号，文件数模式
size_mode_num() {
    file_num0=$(fclone ls "$fclone_name3":{$link} --checkers="$fs_chercker" | wc -l)
    file_num1=$(fclone ls "$fclone_name3":{$link} --include *.{avi,mpeg,wmv,mp4,mkv,rm,rmvb,3gp,mov,flv,vob} --ignore-case --checkers="$fs_chercker" | wc -l)
    file_num2=$(fclone ls "$fclone_name3":{$link} --include *.{png,jpg,jpeg,gif,webp,tif} --ignore-case --checkers="$fs_chercker" | wc -l)
    file_num3=$(fclone ls "$fclone_name3":{$link} --include *.{html,htm,txt,pdf} --ignore-case --checkers="$fs_chercker" | wc -l)
    echo -e "资源名称："$rootname"\n"
    echo -e "——————————————————————"
    echo -e "| 类型 |    文件数    |"
    echo -e "├——————+—————————————|"
    echo -e "├ 视频 + "$file_num1"|"
    echo -e "| 图片 + "$file_num2"|"
    echo -e "| 文本 + "$file_num3"|"
    echo -e "├——————+—————————————|"
    echo -e "| 总计 + "$file_num0"|"
    echo -e "——————————————————————"
}
#2号，size基础模式
size_mode_simple() {
    size_info=`fclone size "$fclone_name3":{$link} --checkers="$fs_chercker"`
    file_num=$(echo "$size_info" | awk 'BEGIN{FS=" "}/^Total objects/{print $3}')
    file_size=$(echo "$size_info" | awk 'BEGIN{FS=" "}/^Total size/{print $3,$4}')
    echo -e "▣▣▣▣▣▣▣▣查询信息▣▣▣▣▣▣▣▣\n" 
    echo -e "┋资源名称┋:$rootName \n"
    echo -e "┋资源数量┋:$file_num \n"
    echo -e "┋资源大小┋:$file_size \n"
}
#3号，size列表模式
size_mode_fully() {
    size_info0=`fclone size "$fclone_name3":{$link} --checkers="$fs_chercker"`
    file_num0=$(echo "$size_info0" | awk 'BEGIN{FS=" "}/^Total objects/{print $3}')
    file_size0=$(echo "$size_info0" | awk 'BEGIN{FS=" "}/^Total size/{print $3,$4}')
    size_info1=`fclone size "$fclone_name3":{$link} --include *.{avi,mpeg,wmv,mp4,mkv,rm,rmvb,3gp,mov,flv,vob} --ignore-case --checkers="$fs_chercker"`
    file_num1=$(echo "$size_info1" | awk 'BEGIN{FS=" "}/^Total objects/{print $3}')
    file_size1=$(echo "$size_info1" | awk 'BEGIN{FS=" "}/^Total size/{print $3,$4}')
    size_info2=`fclone size "$fclone_name3":{$link} --include *.{png,jpg,jpeg,gif,webp,tif} --ignore-case --checkers="$fs_chercker"`
    file_num2=$(echo "$size_info2" | awk 'BEGIN{FS=" "}/^Total objects/{print $3}')
    file_size2=$(echo "$size_info2" | awk 'BEGIN{FS=" "}/^Total size/{print $3,$4}')
    size_info3=`fclone size "$fclone_name3":{$link} --include *.{png,jpg,jpeg,gif,webp} --ignore-case --checkers="$fs_chercker"`
    file_num3=$(echo "$size_info3" | awk 'BEGIN{FS=" "}/^Total objects/{print $3}')
    file_size3=$(echo "$size_info3" | awk 'BEGIN{FS=" "}/^Total size/{print $3,$4}')
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
}
if [ x"$size_mode" == x"1" ];then
echo -e "读取myfc_config.ini,size_mode为1，文件数模式"
size_mode_num
exit
elif [ x"$size_mode" == x"2" ];then
echo -e "读取myfc_config.ini,size_mode为2，size基础模式"
size_mode_simple
exit
elif [ x"$size_mode" == x"3" ];then
echo -e "读取myfc_config.ini,size_mode为3，size列表模式"
size_mode_fully
exit
elif [ x"$size_mode" == x"4" ];then
echo -e "读取myfc_config.ini,size_mode为4，调试模式"
size_mode_num
size_mode_simple
size_mode_fully
exit
else
echo -e "请检查myfc_config.ini,size_mode读取错误，无法选择模式"
exit
fi