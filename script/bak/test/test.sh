#!/bin/bash
for x in /root/AutoRclone/test/*.json ; 
do
echo $x
proj_name=$(cat $x | grep "project_id" | awk '{print $2}'| tr -d ',"')
echo $proj_name
sa_name=$(cat $x | grep "client_email" | awk '{print $2}'| tr -d ',"' | cut -d@ -f1)
echo $sa_name
done