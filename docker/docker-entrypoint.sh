#!/bin/bash
set -e

echo -e "\n======================== 1. 检测文件夹 ========================\n"
if [ ! -d $JD_DIR/config ]; then
    echo -e "没有映射config配置目录给本容器，在容器内创建该文件夹\n"
    mkdir -p /jd/config
fi
if [ ! -d $JD_DIR/log ]; then
    echo -e "没有映射log日志目录给本容器，在容器内创建该文件夹\n"
    mkdir -p /jd/log
fi
if [ ! -d $JD_DIR/own ]; then
    echo -e "没有映射own脚本目录给本容器，在容器内创建该文件夹\n"
    mkdir -p /jd/own
fi

echo -e "\n======================== 2. 更新源代码 ========================\n"
jup
echo

echo -e "======================== 3. 检测配置文件 ========================\n"
if [ -s ${JD_DIR}/config/crontab.list ]
then
    echo -e "检测到config配置目录下存在crontab.list，自动导入定时任务...\n"
    perl -i -pe "{s|CMD_UPDATE|jup|g; s|ROOT_DIR|/jd|g; s|CMD_RMLOG|jlog|g; s|CMD_CODE|jcode|g; s|CMD_MTASK|mtask|g; s|CMD_JTASK|jtask|g}" ${JD_DIR}/config/crontab.list
    crontab ${JD_DIR}/config/crontab.list
    echo -e "成功添加定时任务...\n"
else
    echo -e "检测到config配置目录下不存在crontab.list，从示例文件复制一份用于初始化...\n"
    cp -fv ${JD_DIR}/sample/crontab.sample.list ${JD_DIR}/config/crontab.list
    perl -i -pe "{s|CMD_UPDATE|jup|g; s|ROOT_DIR|/jd|g; s|CMD_RMLOG|jlog|g; s|CMD_CODE|jcode|g; s|CMD_MTASK|mtask|g; s|CMD_JTASK|jtask|g}" ${JD_DIR}/config/crontab.list
    echo
    crontab ${JD_DIR}/config/crontab.list
    echo -e "成功添加定时任务...\n"
fi

if [ ! -s ${JD_DIR}/config/config.sh ]; then
    echo -e "检测到config配置目录下不存在config.sh，从示例文件复制一份用于初始化...\n"
    cp -fv ${JD_DIR}/sample/config.sample.sh ${JD_DIR}/config/config.sh
    echo
fi

if [ ! -s ${JD_DIR}/config/auth.json ]; then
    echo -e "检测到config配置目录下不存在auth.json，从示例文件复制一份用于初始化...\n"
    cp -fv ${JD_DIR}/sample/auth.sample.json ${JD_DIR}/config/auth.json
    echo
fi

echo -e "======================== 4. 启动网页终端 ========================\n"
rm -rf /root/.pm2/logs/* 2>/dev/null  # 清空pm2日志
if [[ $ENABLE_WEB_PANEL == true ]]; then
    if [[ $ENABLE_TTYD == true ]]; then
        ## 增加环境变量
        export PS1="\u@\h:\w $ "

        pm2 start ttyd --name="ttyd" -- -t fontSize=14 -t disableLeaveAlert=true -t rendererType=webgl bash
        if [[ $? -eq 0 ]]; then
            echo -e "网页终端启动成功...\n"
        else
            echo -e "网页终端启动失败，但容器将继续启动...\n"
        fi
    elif [[ $ENABLE_TTYD == false ]]; then
        echo -e "已设置为不自动启动网页终端，跳过...\n"
    fi
else
    echo -e "已设置为不自动启动控制面板，因此也不启动网页终端...\n"
fi

echo -e "======================== 5. 启动控制面板 ========================\n"
if [[ $ENABLE_WEB_PANEL == true ]]; then
    cd ${JD_DIR}/panel
    pm2 start ecosystem.config.js
    if [[ $? -eq 0 ]]; then
        echo -e "控制面板启动成功...\n"
        echo -e "如未修改用户名密码，则初始用户名为：admin，初始密码为：adminadmin\n"
        echo -e "请访问 http://<ip>:5678 登陆并修改配置...\n"
    else
        echo -e "控制面板启动失败，但容器将继续启动...\n"
    fi
elif [[ $ENABLE_WEB_PANEL == false ]]; then
    echo -e "已设置为不自动启动控制面板，跳过...\n"
fi

echo -e "======================== 6. 启动挂机程序 ========================\n"
if [[ $ENABLE_HANGUP == true ]]; then
    . $JD_DIR/config/config.sh
    if [[ $Cookie1 ]]; then
        jtask hangup 2>/dev/null
        echo -e "挂机程序启动成功...\n"
    else
        echo -e "config.sh中还未填入有效的Cookie，可能是首次部署容器，因此不启动挂机程序...\n"
    fi
elif [[ ${ENABLE_HANGUP} == false ]]; then
    echo -e "已设置为不自动启动挂机程序，跳过...\n"
fi

echo -e "容器启动成功...\n"

crond -f

exec "$@"
