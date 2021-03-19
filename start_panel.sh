#!/usr/bin/env bash

## 判断环境
ShellDir=${JD_DIR:-$(cd $(dirname $0); pwd)}
PanelDir=${ShellDir}/panel

## 启动ttyd
case "$(uname -m)" in
x86_64)
    echo -e "CPU架构:x86_64\n"
    wget -O /usr/local/bin/ttyd https://github.com/tsl0922/ttyd/releases/download/1.6.3/ttyd.x86_64 && chmod +x /usr/local/bin/ttyd
    nohup ttyd -t fontSize=14 -t disableLeaveAlert=true -t rendererType=webgl sh >/dev/null 2>&1 &
    ;;
aarch64)
    echo -e "CPU架构:aarch64\n"
    wget -O /usr/local/bin/ttyd https://github.com/tsl0922/ttyd/releases/download/1.6.3/ttyd.aarch64 && chmod +x /usr/local/bin/ttyd
    ttyd -t fontSize=14 -t disableLeaveAlert=true -t rendererType=webgl sh >/dev/null 2>&1 &
    ;;
armv7l)
    echo -e "CPU架构:armv7l\n"
    wget -O /usr/local/bin/ttyd https://github.com/tsl0922/ttyd/releases/download/1.6.3/ttyd.arm && chmod +x /usr/local/bin/ttyd
    nohup ttyd -t fontSize=14 -t disableLeaveAlert=true -t rendererType=webgl sh >/dev/null 2>&1 &
    ;;
*)
    echo -e "CPU架构暂不支持，无法正常使用终端面板！\n"
    ;;
esac


## 启动panel
cd ${PanelDir}
if type pm2 >/dev/null 2>&1; then
    pm2 start ecosystem.config.js
else
    nohup node server.js >/dev/null 2>&1 &
fi
