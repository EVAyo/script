#!/usr/bin/env bash

## 判断环境
dir_shell=$(dirname $(readlink -f "$0"))
dir_root=$dir_shell
dir_panel=$dir_root/panel

## 增加环境变量
export PS1="\u@\h:\w $ "

## copy ttyd
if [ ! -f /usr/local/bin/ttyd ]; then
    cp -f "$dir_panel/ttyd/ttyd.$(uname -m)" /usr/local/bin/ttyd
    ttyd_status=$?
    [[ $ttyd_status -ne 0 ]] && echo -e "CPU架构暂不支持，无法正常使用终端面板！\n"
fi
[ ! -x /usr/local/bin/ttyd ] && chmod +x /usr/local/bin/ttyd

## 运行ttyd和控制面板
cd $dir_panel
if type pm2 >/dev/null 2>&1; then
    [[ $ttyd_status -eq 0 ]] && pm2 start /usr/local/bin/ttyd --name="ttyd" -- -t fontSize=14 -t disableLeaveAlert=true -t rendererType=webgl bash
    pm2 start ecosystem.config.js
else
    [[ $ttyd_status -eq 0 ]] && nohup /usr/local/bin/ttyd -t fontSize=14 -t disableLeaveAlert=true -t rendererType=webgl bash >/dev/null 2>&1 &
    nohup node server.js >/dev/null 2>&1 &
fi

echo -e "控制面板启动成功...\n"
