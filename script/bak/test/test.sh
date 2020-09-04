#!/bin/bash
for x in /root/AutoRclone/test/*.json ; 
do
proj_name=$(cat $x | grep "project_id" | awk '{print $2}'| tr -d ',"')
sa_name=$(cat $x | grep "client_email" | awk '{print $2}'| tr -d ',"' | cut -d@ -f1)
mv $x /root/AutoRclone/test/"$proj_name"_"$sa_name".json
done