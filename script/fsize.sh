#!/bin/bash
#=============================================================
# https://github.com/cgkings/fclone_shell_bot
# File Name: fsize.sh
# Author: cgking
# Created Time : 2020.8.28
# Description:size查询
# System Required: Debian/Ubuntu
# Version: 3.0
#=============================================================

source /root/fclone_shell_bot/myfc_config.ini

#五种模式，在myfc_config.ini中选择size_mode
#其中：1#，ls基础模式，2#，ls列表模式，3#，size基础模式,4#，size列表模式,5#，极速查询模式
read -p "请输入查询链接==>" link
link=${link#*id=};link=${link#*folders/};link=${link#*d/};link=${link%?usp*}
rootname=$(fclone lsd "$fclone_name2":{$link} --disable listR --dump bodies -vv 2>&1 | awk 'BEGIN{FS="\""}/^{"id/{print $8}')
if [ -z "$link" ] ; then
echo "不允许输入为空" && exit ;
fi
#1号，ls基础模式
size_mode_num_simple() {
    file_num=$(fclone ls "$fclone_name2":{$link} --disable listR --checkers="$fs_chercker" | wc -l)
    folder_num=$(fclone lsd "$fclone_name2":{$link} --disable listR -R --checkers="$fs_chercker" | wc -l)
    echo -e "▣▣▣▣▣▣▣▣查询信息▣▣▣▣▣▣▣▣\n" 
    echo -e "┋ name  ┋:$rootname \n"
    echo -e "┋ file  ┋:$file_num \n"
    echo -e "┋ folder┋:$folder_num \n"
    echo -e "┋ total ┋:$[file_num+folder_num] \n"
}
#2号，ls列表模式
size_mode_num() {
    file_num0=$(fclone ls "$fclone_name2":{$link} --disable listR --checkers="$fs_chercker" | wc -l)
    file_num1=$(fclone ls "$fclone_name2":{$link} --include "*.{avi,mpeg,wmv,mp4,mkv,rm,rmvb,3gp,mov,flv,vob}" --ignore-case --disable listR --checkers="$fs_chercker" | wc -l)
    file_num2=$(fclone ls "$fclone_name2":{$link} --include "*.{png,jpg,jpeg,gif,webp,tif}" --ignore-case --disable listR --checkers="$fs_chercker" | wc -l)
    file_num3=$(fclone ls "$fclone_name2":{$link} --include "*.{html,htm,txt,pdf,nfo}" --ignore-case --disable listR --checkers="$fs_chercker" | wc -l)
    echo -e "资源名称："$rootname""
    echo -e "--------------"
    printf "|%-5s|%-8s|\n" 类型 文件数量
    echo -e "--------------"
    printf "|%-5s|%-8s|\n" 视频 "$file_num1"
    echo -e "--------------"
    printf "|%-5s|%-8s|\n" 图片 "$file_num2"
    echo -e "--------------"
    printf "|%-5s|%-8s|\n" 文本 "$file_num3"
    echo -e "--------------"
    printf "|%-5s|%-8s|\n" 合计 "$file_num0"
    echo -e "--------------"
}
#3号，size基础模式
size_mode_simple() {
    size_info=`fclone size "$fclone_name2":{$link} --disable listR --checkers="$fs_chercker"`
    file_num=$(echo "$size_info" | awk 'BEGIN{FS=" "}/^Total objects/{print $3}')
    file_size=$(echo "$size_info" | awk 'BEGIN{FS=" "}/^Total size/{print $3,$4}')
    echo -e "▣▣▣▣▣▣▣▣查询信息▣▣▣▣▣▣▣▣\n" 
    echo -e "┋资源名称┋:$rootname \n"
    echo -e "┋资源数量┋:$file_num \n"
    echo -e "┋资源大小┋:$file_size \n"
}
#4号，size列表模式
size_mode_fully() {
    size_info0=`fclone size "$fclone_name2":{$link} --disable listR --checkers="$fs_chercker"`
    file_num0=$(echo "$size_info0" | awk 'BEGIN{FS=" "}/^Total objects/{print $3}')
    file_size0=$(echo "$size_info0" | awk 'BEGIN{FS=" "}/^Total size/{print $3,$4}')
    size_info1=`fclone size "$fclone_name2":{$link} --include "*.{avi,mpeg,wmv,mp4,mkv,rm,rmvb,3gp,mov,flv,vob}" --ignore-case --disable listR --checkers="$fs_chercker"`
    file_num1=$(echo "$size_info1" | awk 'BEGIN{FS=" "}/^Total objects/{print $3}')
    file_size1=$(echo "$size_info1" | awk 'BEGIN{FS=" "}/^Total size/{print $3,$4}')
    size_info2=`fclone size "$fclone_name2":{$link} --include "*.{png,jpg,jpeg,gif,webp,tif}" --ignore-case --disable listR --checkers="$fs_chercker"`
    file_num2=$(echo "$size_info2" | awk 'BEGIN{FS=" "}/^Total objects/{print $3}')
    file_size2=$(echo "$size_info2" | awk 'BEGIN{FS=" "}/^Total size/{print $3,$4}')
    size_info3=`fclone size "$fclone_name2":{$link} --include "*.{html,htm,txt,pdf,nfo}" --ignore-case --disable listR --checkers="$fs_chercker"`
    file_num3=$(echo "$size_info3" | awk 'BEGIN{FS=" "}/^Total objects/{print $3}')
    file_size3=$(echo "$size_info3" | awk 'BEGIN{FS=" "}/^Total size/{print $3,$4}')
    echo -e "资源名称："$rootname""
    echo -e "----------------------------------"
    printf "|%-5s|%-8s|%-18s|\n" 类型 文件数量 文件大小
    echo -e "----------------------------------"
    printf "|%-5s|%-8s|%-18s|\n" 视频 "$file_num1" "$file_size1"
    echo -e "----------------------------------"
    printf "|%-5s|%-8s|%-18s|\n" 图片 "$file_num2" "$file_size2"
    echo -e "----------------------------------"
    printf "|%-5s|%-8s|%-18s|\n" 文本 "$file_num3" "$file_size3"
    echo -e "----------------------------------"
    printf "|%-5s|%-8s|%-18s|\n" 合计 "$file_num0" "$file_size0"
    echo -e "----------------------------------"
}
#5号，大文件极速查询模式
size_mode_quick() {
    fclone copy "$fclone_name2":{$link} "$fclone_name2":{$myid} --drive-server-side-across-configs --stats=1s -P --checkers="$fb_chercker" --transfers="$fb_transfer" --drive-pacer-min-sleep="$fb_min_sleep"ms --drive-pacer-burst="$fb_BURST" --min-size "$fb_min_size"M --check-first --ignore-existing --log-level=INFO --log-file=/root/fclone_shell_bot/log/fbcopy.log &
    for ((;;))
    do
    i=$(cat /root/fclone_shell_bot/log/fbcopy.log)
    if ( $i =~ *"Pre-creating directories before transfers"* ); then
    echo 查询完毕
    exit
    else
    sleep 5s
    continue
    fi
    done
}
echo -e " 选择模式
[1]. ls基础模式
[2]. ls列表模式
[3]. size基础模式
[4]. size列表模式
[5]. 极速模式"
read -p "请输入数字 [1-5]:" num
case "$num" in
1)
    echo -e "你的选择，ls基础模式"
    size_mode_num_simple
    exit
    ;;
2)
    echo -e "你的选择，ls列表模式"
    size_mode_num
    exit
    ;;
3)
    echo -e "你的选择，size基础模式"
    size_mode_simple
    exit
    ;;
4)
    echo -e "你的选择，size列表模式"
    size_mode_fully
    exit
    ;;
5)
    echo -e "你的选择，极速查询模式"
    size_mode_quick
    exit
    ;;


*)
    echo -e "请输入正确的数字"
    exit
    ;;
esac