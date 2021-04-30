#!/usr/bin/env python3
# _*_ coding:utf-8 _*_
#0.3 版本不再区分ql、V3、V4
# author：   https://github.com/SuMaiKaDe

from jdbot import jdbot, chat_id, logger,newloop,_jdbot
from jdbot.utils import load_diy,new_loop
import threading
import os
version = 'version:0.3'
botlog = '''
2021年4月30日
    ** 为您带来全新的0.3版本 **
    1、 重构文件，新增支持自定义功能（欢迎各路大佬PR）
        将你的py文件放在/jd/config/jdbot/diy下，重启机器人自动添加
    2、 新增支持后台运行完发送文件，采用自建反代，每天10W次额度。
        针对上述反代，我自己账号申请的，免费的，大家也可以申请，后续看情况改
    3、 新增/edit 与/getfile 参数支持
        - 例如/edit /jd/config/bot.json，则直接编辑bot.json
        - 例如/edit /jd/config 则进入config选择文件
    4、 每次有更新会发送通知
    5、 不再区分V4，V3与青龙，加入了判断，如不能使用，请及时联系我
'''
_uplog = _jdbot +'/up.log'
botpath = _jdbot + "/bot/"
diypath = _jdbot + "/diy/"
logger.info('loading bot module...')
load_diy('bot',botpath)
logger.info('loading diy module...')
load_diy('diy',diypath)

async def hello():
    if os.path.exists(_uplog):
        isnew = False
        with open(_uplog,'r',encoding='utf-8') as f:
            logs = f.readlines()
        for log in logs:
            if version in log:
                isnew = True
                return
        if not isnew:
            with open(_uplog,'a',encoding='utf-8') as f:
                f.writelines([version,botlog])
            await jdbot.send_message(chat_id,'[机器人上新了](https://github.com/SuMaiKaDe/jddockerbot/tree/master)\n'+botlog,link_preview=False)
    else:
        with open(_uplog,'w+',encoding='utf-8') as f:
            f.writelines([version,botlog])
        await jdbot.send_message(chat_id, '[机器人上新了](https://github.com/SuMaiKaDe/jddockerbot/tree/master)\n'+botlog,link_preview=False)
if __name__ == "__main__":
    with jdbot:
        jdbot.loop.create_task(hello())
        threading.Thread(target=new_loop,args=(newloop,)).start()
        jdbot.loop.run_forever()
