# 每3天的23:50分清理一次日志(互助码不清理，proc_file.sh对该文件进行了去重)
50 23 */3 * * find /scripts/logs -name '*.log' | grep -v 'sharecodeCollection' | xargs rm -rf
#收集助力码
30 * * * * sh +x /scripts/docker/auto_help.sh collect >> /scripts/logs/auto_help_collect.log 2>&1

##############短期活动##############
# 内容鉴赏官 2021年09月1日-2021年09月30
35 1,5 * * * node /scripts/jd_connoisseur.js >> /scripts/logs/jd_connoisseur.log 2>&1
# 众筹许愿池 2021年08月1日-2021年12月31日
19 7,13 * * * node /scripts/jd_wish.js >> /scripts/logs/jd_wish.log 2>&1
# 女装盲盒
13 0,12 * * * node /scripts/jd_nzmh.js >> /scripts/logs/jd_nzmh.log 2>&1
# 5G超级盲盒(活动时间：2021-8-2到2021-10-29)
0 0,1-23/3 * * * node /scripts/jd_mohe.js >> /scripts/logs/jd_mohe.log 2>&1
#特务Z
34 12,16,18 * * * node /scripts/jd_productZ4Brand.js >> /scripts/logs/jd_productZ4Brand.log 2>&1
#极速版发财大赢家 2021-07-15到2021-08-15
20,40 0-23/1 * * * node /scripts/jd_big_winner.js >> /scripts/logs/jd_big_winner.log 2>&1
#京东极速版红包(活动时间：2021-5-5至2021-5-31)
45 0,23 * * * node /scripts/jd_speed_redpocke.js >> /scripts/logs/jd_speed_redpocke.log 2>&1
#每日抽奖(活动时间：2021-05-01至2021-05-31)
13 1,22,23 * * * node /scripts/jd_daily_lottery.js >> /scripts/logs/jd_daily_lottery.log 2>&1
#金榜创造营 活动时间：2021-05-21至2021-12-31
0 1,22 * * * node /scripts/jd_gold_creator.js >> /scripts/logs/jd_gold_creator.log 2>&1
# 酷跑零食街 活动时间：2021-06-20至2021-12-31
18 7,12,20 * * * node /scripts/jd_foodRunning.js >> /scripts/logs/jd_foodRunning.log 2>&1
# 东东农场集勋章
11 5,16 * * * node /scripts/jd_medal.js >> /scripts/logs/jd_medal.log 2>&1
# 京喜签到-喜豆
10 7,17 * * * node /scripts/jx_sign_xd.js >> /scripts/logs/jx_sign_xd.log 2>&1
# 京车会签到
35 7,19 * * * node /scripts/jd_jchsign.js >> /scripts/logs/jd_jchsign.log 2>&1
# 东东世界兑换
1 0,12,20 * * * node /scripts/jd_ddworld_exchange.js >> /scripts/logs/jd_ddworld_exchange.log 2>&1
# 京享红包
0 0,10,20,22 * * * node /scripts/jd_nhRedEnvelope.js >> /scripts/logs/jd_nhRedEnvelope.log 2>&1

##############长期活动##############
# 签到
7 0,17 * * * cd /scripts && node jd_bean_sign.js >> /scripts/logs/jd_bean_sign.log 2>&1
# 东东超市兑换奖品
0,30 0 * * * node /scripts/jd_blueCoin.js >> /scripts/logs/jd_blueCoin.log 2>&1
# 摇京豆
6 0,23 * * * node /scripts/jd_club_lottery.js >> /scripts/logs/jd_club_lottery.log 2>&1
# 东东农场
15 6-18/6 * * * node /scripts/jd_fruit.js >> /scripts/logs/jd_fruit.log 2>&1
# 摇钱树
23 */2 * * * node /scripts/jd_moneyTree.js >> /scripts/logs/jd_moneyTree.log 2>&1
# 东东萌宠
35 6-18/6 * * * node /scripts/jd_pet.js >> /scripts/logs/jd_pet.log 2>&1
# 京东种豆得豆
10 7-22/1 * * * node /scripts/jd_plantBean.js >> /scripts/logs/jd_plantBean.log 2>&1
# 进店领豆
6 0 * * * node /scripts/jd_shop.js >> /scripts/logs/jd_shop.log 2>&1
# 东东超市
31 0,1-23/2 * * * node /scripts/jd_superMarket.js >> /scripts/logs/jd_superMarket.log 2>&1
# 取关京东店铺商品
45 23 * * * node /scripts/jd_unsubscribe.js >> /scripts/logs/jd_unsubscribe.log 2>&1
# 京豆变动通知
20 10 * * * node /scripts/jd_bean_change.js >> /scripts/logs/jd_bean_change.log 2>&1
# 京东排行榜
21 9 * * * node /scripts/jd_rankingList.js >> /scripts/logs/jd_rankingList.log 2>&1
# 天天提鹅
28 * * * * node /scripts/jd_daily_egg.js >> /scripts/logs/jd_daily_egg.log 2>&1
# 金融养猪
32 0-23/6 * * * node /scripts/jd_pigPet.js >> /scripts/logs/jd_pigPet.log 2>&1
# 京喜工厂
50 * * * * node /scripts/jd_dreamFactory.js >> /scripts/logs/jd_dreamFactory.log 2>&1
# 东东工厂
26 * * * * node /scripts/jd_jdfactory.js >> /scripts/logs/jd_jdfactory.log 2>&1
# 京东快递签到
47 1 * * * node /scripts/jd_kd.js >> /scripts/logs/jd_kd.log 2>&1
# 京东汽车(签到满500赛点可兑换500京豆)
0 0 * * * node /scripts/jd_car.js >> /scripts/logs/jd_car.log 2>&1
# 领京豆额外奖励(每日可获得3京豆)
23 1,12,22 * * * node /scripts/jd_bean_home.js >> /scripts/logs/jd_bean_home.log 2>&1
# 微信小程序京东赚赚
6 0-5/1,11 * * * node /scripts/jd_jdzz.js >> /scripts/logs/jd_jdzz.log 2>&1
# crazyJoy自动每日任务
30 7,23 * * * node /scripts/jd_crazy_joy.js >> /scripts/logs/jd_crazy_joy.log 2>&1
# 京东汽车旅程赛点兑换金豆
0 0 * * * node /scripts/jd_car_exchange.js >> /scripts/logs/jd_car_exchange.log 2>&1
# 导到所有互助码
23 7 * * * node /scripts/jd_get_share_code.js >> /scripts/logs/jd_get_share_code.log 2>&1
# 口袋书店
38 8,12,18 * * * node /scripts/jd_bookshop.js >> /scripts/logs/jd_bookshop.log 2>&1
# 签到领现金
10 */4 * * * node /scripts/jd_cash.js >> /scripts/logs/jd_cash.log 2>&1
# 闪购盲盒
47 8,22 * * * node /scripts/jd_sgmh.js >> /scripts/logs/jd_sgmh.log 2>&1
# 京东秒秒币
10 6,21 * * * node /scripts/jd_ms.js >> /scripts/logs/jd_ms.log 2>&1
#美丽研究院
41 7,12,19 * * * node /scripts/jd_beauty.js >> /scripts/logs/jd_beauty.log 2>&1
#京东极速版签到+赚现金任务
21 1,6 * * * node /scripts/jd_speed_sign.js >> /scripts/logs/jd_speed_sign.log 2>&1
# 删除优惠券(默认注释，如需要自己开启，如有误删，已删除的券可以在回收站中还原，慎用)
#20 9 * * 6 node /scripts/jd_delCoupon.js >> /scripts/logs/jd_delCoupon.log 2>&1
#家庭号
10 6,7 * * * node /scripts/jd_family.js >> /scripts/logs/jd_family.log 2>&1
#京东直播（又回来了）
30-50/5 12,23 * * * node /scripts/jd_live.js >> /scripts/logs/jd_live.log 2>&1
#京东健康社区
13 1,6,22 * * * node /scripts/jd_health.js >> /scripts/logs/jd_health.log 2>&1
#京东健康社区收集健康能量
5-45/20 * * * * node /scripts/jd_health_collect.js >> /scripts/logs/jd_health_collect.log 2>&1
# 幸运大转盘
10 10,23 * * * node /scripts/jd_market_lottery.js >> /scripts/logs/jd_market_lottery.log 2>&1
# 领金贴
5 0 * * * node /scripts/jd_jin_tie.js >> /scripts/logs/jd_jin_tie.log 2>&1
# 跳跳乐瓜分京豆
15 0,12,22 * * * node /scripts/jd_jump.js >> /scripts/logs/jd_jump.log 2>&1
#京喜牧场
15 0-23/3 * * * node /scripts/jd_jxmc.js >> /scripts/logs/jd_jxmc.log 2>&1
#京东试用
#10 1,8,20 * * * node /scripts/jd_try.js >> /scripts/logs/jd_try.log 2>&1
#天天加速
25 9 * * * node /scripts/jd_speed.js >> /scripts/logs/jd_speed.log 2>&1
# 京喜财富岛
5 * * * * node /scripts/jd_cfd.js >> /scripts/logs/jd_cfd.log 2>&1
# 京喜财富岛合成月饼
5 * * * * node /scripts/jd_cfd_mooncake.js >> /scripts/logs/jd_cfd_mooncake.log 2>&1
# 电竞经理
30 3,12,22 * * * node /scripts/jd_esManager.js >> /scripts/logs/jd_esManager.log 2>&1
# 图形验证签到
35 0,9 * * * node /scripts/jd_sign.js >> /scripts/logs/jd_sign.log 2>&1
# 升级赚京豆
41 1,9 * * * node /scripts/jd_mmdou.js >> /scripts/logs/jd_mmdou.log 2>&1
# 京喜签到
17 1,21 * * * node /scripts/jx_sign.js >> /scripts/logs/jx_sign.log 2>&1
# 积分换话费
33 7,19 * * * node /scripts/jd_dwapp.js >> /scripts/logs/jd_dwapp.log 2>&1
# 领券中心签到
35 0,21 * * * node /scripts/jd_ccSign.js >> /scripts/logs/jd_ccSign.log 2>&1
# 保价
31 3,16 * * * node /scripts/jd_priceProtect.js >> /scripts/logs/jd_priceProtect.log 2>&1
# 送豆得豆
46 1,13 * * * node /scripts/jd_sendBeans.js >> /scripts/logs/jd_sendBeans.log 2>&1
# 京东到家鲜豆任务
13 1,9 * * * node /scripts/jd_jddj_bean.js >> /scripts/logs/jd_jddj_bean.log 2>&1
# 京东到家领取水滴,自动浇水
17 0,3,8,11,17 * * * node /scripts/jd_jddj_fruit.js >> /scripts/logs/jd_jddj_fruit.log 2>&1
# 京东到家庄园水滴
11 */1 * * * node /scripts/jd_jddj_getPoints.js >> /scripts/logs/jd_jddj_getPoints.log 2>&1
# 京东到家自动浇水
16 2,10 * * * node /scripts/jd_jddj_plantBeans.js >> /scripts/logs/jd_jddj_plantBeans.log 2>&1
# 自动领取果园水车水滴
13 */1 * * * node /scripts/jd_jddj_fruit_collectWater.js >> /scripts/logs/jd_jddj_fruit_collectWater.log 2>&1
# 过期京豆兑换为喜豆
17 10 * * * node /scripts/jd_exchangejxbeans.js >> /scripts/logs/jd_exchangejxbeans.log 2>&1