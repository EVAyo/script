#!/bin/bash
read -p "请输入需要改名sa所在目录路径:" sa_path
read -p "请输入想要分割项目名和sa名的符号:" sa_name_mark
for x in $sa_path/*.json ;
do
proj_name=$(cat $x | grep "project_id" | awk '{print $2}'| tr -d ',"')
sa_name=$(cat $x | grep "client_email" | awk '{print $2}'| tr -d ',"' | cut -d@ -f1)
mv $x "$sa_path"/"$proj_name""$sa_name_mark""$sa_name".json
done