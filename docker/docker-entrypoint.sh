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

echo -e "======================== 4. 启动挂机程序 ========================\n"
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
