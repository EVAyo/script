#!/bin/bash
source /root/fclone_shell_bot/myfc_config.ini
# ★★★开启sa服务-已完成★★★
open_sa_server() {
    echo "▂▃▄▅▆▇█▓▒░ 开启|服务░▒▓█▇▆▅▄▃▂"
    sumsa=0
    for saf_id in $(sort -u $safolder/invalid/*.json | grep "project_id" | awk '{print $2}' | tr -d ',"')
    do
    cd /root/AutoRclone && python3 gen_sa_accounts.py --enable-services $saf_id
    sumsa=$((sumsa+1))
    echo -e "已开启 第"$sumsa"个sa；共"$xsa_sum"个sa"
    done
}

stty erase '^H'
echo 读取myfc_config.ini,注意你的CPU负载！
echo -e "你的remote:$fclone_name"
echo -e "你的sa保存目录:$safolder"
echo -e "你的sa检测目标文件夹id:$fsa_id"
echo -e "开启sa服务所需的gen_sa_accounts.py文件所在目录：$pyfolder,请确认该目录有权限文件"
echo -e "以上如需修改，请打开ini文件修改"fclone_name\safolder\pyfolder\fsa_id"数值"
echo -e "检测NG.文件目录：$safolder/invalid"
echo -e "检测ok文件将移至：/root/AutoRclone/$fclone_name，如需更改，请修改本脚本相应目录行即可\n"
mkdir -p $safolder/invalid
sa1_sum=$(ls -l $safolder|grep "^-"| wc -l)
echo -e "█║▌║▌║待检测sa $sa1_sum 个，开始检测║▌║▌║█\n"
find $safolder -type f -name "*.json" | xargs -I {} -n 1 -P 10 bash -c 'fclone lsd '$fclone_name':{'$fsa_id'} --drive-service-account-file={} --drive-service-account-file-path=""  &> /dev/null || mv {} '$safolder'/invalid '
xsa_sum=$(ls -l $safolder/invalid|grep "^-"| wc -l)
sa_sum=$(ls -l $safolder|grep "^-"| wc -l)
if [ x$xsa_sum = x0 ];then
echo -e "█║▌║▌║恭喜你！你的sa[$sa_sum],全部检测ok║▌║▌║█"
mv -f $safolder/*.json /root/AutoRclone/"$fclone_name"
ok_sum=$(ls -l /root/AutoRclone/$fclone_name|grep "^-"| wc -l)
echo -e "检测ok sa已移至/root/AutoRclone/$fclone_name,现$fclone_name文件夹共有$ok_sum个sa"
elif [ x$sa_sum = x0 ];then
echo -e "█║▌║▌║非常遗憾，你的sa[$sa_sum],全部检测NG.║▌║▌║█\n"
open_sa_server
else
mv -f $safolder/*.json /root/AutoRclone/"$fclone_name"
ok_sum=$(ls -l /root/AutoRclone/$fclone_name|grep "^-"| wc -l)
echo -e "检测ok sa $sa_sum 个，已移至/root/AutoRclone/$fclone_name,现$fclone_name文件夹共有$ok_sum个sa"
echo -e "█║▌║▌║检测NG sa $xsa_sum 个║▌║▌║█\n"
open_sa_server
fi
echo -e "done！！！"
