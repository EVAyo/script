## 创建
**从v3升级到v4请务必不保留配置文件，只保存好必要的信息之后全新安装。**
```
version: "2.0"
services:
  jd:
    image: nevinee/jd:v4
    container_name: jd
    restart: always
    tty: true
    network_mode: bridge
    hostname: jd
    volumes:
      - ./config:/jd/config
      - ./log:/jd/log
      - ./own:/jd/own             # own脚本目录，如需使用，建议映射
      #- ./scripts:/jd/scripts    # 如果想要看到lxk0301大佬的js脚本，可以解除本行注释
    ports:
      - 5678:5678
    environment: 
      - ENABLE_TTYD=false             # 是否在启动容器时自动启动网页终端，当ENABLE_WEB_PANEL=true时此项设置才生效
      - ENABLE_WEB_PANEL=true         # 是否在启动容器时自动启动控制面板
      - ENABLE_HANGUP=true            # 是否在启动容器时自动启动挂机程序
```
创建好后请阅读映射的config目录下的的config.sh，并根据注释修改。
## 命令
jtask mtask otask链接的都是同一个脚本，m=my，o=own，j=jd。三者区分仅用在crontab.list中，以区别不同类型任务，手动运行直接jtask即可。
```
docker exec -it jd jtask   # 运行jd_scripts脚本，类似于v3版本的jd命令
docker exec -it jd otask   # 运行own脚本，详见配置文件说明
docker exec -it jd mtask   # 运行你自己的脚本
docker exec -it jd jlog    # 删除旧日志，类似于v3版本的rm_log命令
docker exec -it jd jup     # 更新所有脚本，包括jd_scripts脚本和own脚本，自动增删定时任务，类似于v3版本的git_pull命令，但更强大
docker exec -it jd jcode   # 导出所有互助码，可以准确识别没有码的ID，比v3版本的export_sharecode命令更智能
docker exec -it jd jcsv    # 记录豆豆变化情况，在log目录下存为csv文件
```

## 非Docker用户
linux、macos、android termux用户自行安装依赖：`perl nodejs npm yarn perl wget git crond ssh-client`以及node包`pm2`，自行解决ssh key的问题，并备份好自己的crontab以后，再进行下列操作：
```
git clone git@<你设置的HOST>:nevinee/jd_shell.git jd
cd jd
./jup.sh
```
配置好`config/config.sh`，之后请根据`config/crontab.list`中的命令来使用即可，大概率是任意路径全局可用命令`jup jtask mtask otask jlog jcsv jcode`，含义同docker说明，而无需输入完整路径。如需要面板，直接输入`jpanel`即可。