#!/usr/bin/env bash

## 判断环境
ShellDir=${JD_DIR:-$(cd $(dirname $0); pwd)}
PanelDir=${ShellDir}/panel

Terminal="ttyd"
RunParam="-t fontSize=14 -t disableLeaveAlert=true -t rendererType=webgl bash"

export PS1="\u@\h:\w $ "

## copy ttyd
function Copy_TTyd {
    cp -f ${PanelDir}/ttyd/ttyd.$1 /usr/local/bin/ttyd && chmod +x /usr/local/bin/ttyd
}

## Run TTyd
function Run_TTyd {
    if type pm2 >/dev/null 2>&1; then
        pm2 start $1 --name="$1" -- $2
    else
        nohup $1 $2 >/dev/null 2>&1 &
    fi

    echo -e "Terminal启动成功\n"
}

## 启动Terminal
function Run_Terminal {
    case "$(uname -m)" in
    x86_64)
        echo -e "CPU架构:x86_64\n"
        Copy_TTyd "x86_64"
        Run_TTyd ${Terminal} "${RunParam}"
        ;;
    aarch64)
        echo -e "CPU架构:aarch64\n"
        Copy_TTyd "aarch64"
        Run_TTyd ${Terminal} "${RunParam}"
        ;;
    armv7l)
        echo -e "CPU架构:armv7l\n"
        Copy_TTyd "armv7l"
        Run_TTyd ${Terminal} "${RunParam}"
        ;;
    *)
        echo -e "CPU架构暂不支持，无法正常使用终端面板！\n"
        ;;
    esac
}


## 启动panel
function Run_Panel {
    cd ${PanelDir}
    if type pm2 >/dev/null 2>&1; then
        pm2 start ecosystem.config.js
    else
        nohup node server.js >/dev/null 2>&1 &
    fi
}

## 运行
Run_Terminal
Run_Panel
