#!/bin/bash
for x in /root/AutoRclone/test/*.json ; 
do
echo $x
proj_name=$(cat /root/AutoRclone/test/66edfbdabf44edb7bbe0bb9a35b2126eedc70ded.json | grep "project_id" | awk '{print $2}'| tr -d ',"')
echo $proj_name
done