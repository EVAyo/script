/*
 * @Author: LXK9301 https://github.com/LXK9301
 * @Date: 2020-12-06 18:19:21
 * @Last Modified by: LXK9301
 * @Last Modified time: 2020-12-26 22:58:02
 */
/*
�������������Ǿ�ϲ����
���ڣ�����APP��ҳ-�������-��������
��Ѳ����ĵ���(10��1��������500����������5000�뵽���޲���������������84���Ӵﵽ����)
�ʽ���1Сʱ����һ��
����Ա�����ȥ������ҳ����������������Ŀǰδ��
����ÿ�����нű���Ͷ�����
ֻ�е����ǵ���Ʒ���ڣ������ռ������ĵ������㵱ǰ��Ʒ�����������Ͷ��
��֧��IOS˫�����˺�,Node.js֧��N�������˺�
�ű�����: QuantumultX, Surge, Loon, JSBox, Node.js
============Quantumultx===============
[task_local]
#��������
10 * * * * https://jdsharedresourcescdn.azureedge.net/jdresource/jd_jdfactory.js, tag=��������, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jd_factory.png, enabled=true

================Loon==============
[Script]
cron "10 * * * *" script-path=https://jdsharedresourcescdn.azureedge.net/jdresource/jd_jdfactory.js,tag=��������

===============Surge=================
�������� = type=cron,cronexp="10 * * * *",wake-system=1,timeout=3600,script-path=https://jdsharedresourcescdn.azureedge.net/jdresource/jd_jdfactory.js

============С���=========
�������� = type=cron,script-path=https://jdsharedresourcescdn.azureedge.net/jdresource/jd_jdfactory.js, cronexpr="10 * * * *", timeout=3600, enable=true
 */
const $ = new Env('��������');

const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js�û�����jdCookie.js����д����ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let jdNotify = true;//�Ƿ�ر�֪ͨ��false��֪ͨ���ͣ�true�ر�֪ͨ����
const randomCount = $.isNode() ? 20 : 5;
//IOS���û�ֱ����NobyDa��jd cookie
let cookiesArr = [], cookie = '', message;
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
  if (process.env.JDFACTORY_FORBID_ACCOUNT) process.env.JDFACTORY_FORBID_ACCOUNT.split('&').map((item, index) => Number(item) === 0 ? cookiesArr = [] : cookiesArr.splice(Number(item) - 1 - index, 1))
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
let wantProduct = ``;//������Ʒ����
const JD_API_HOST = 'https://api.m.jd.com/client.action';
const inviteCodes = [`P04z54XCjVWnYaS5u2ak7ZCdan1Bdd2GGiWvC6_uERj`, 'P04z54XCjVWnYaS5m9cZ2ariXVJwHf0bgkG7Uo'];
!(async () => {
  await requireConfig();
  if (!cookiesArr[0]) {
    $.msg($.name, '����ʾ�����Ȼ�ȡ�����˺�һcookie\nֱ��ʹ��NobyDa�ľ���ǩ����ȡ', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
    return;
  }
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
      cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1])
      $.index = i + 1;
      $.isLogin = true;
      $.nickName = '';
      message = '';
      await TotalBean();
      console.log(`\n******��ʼ�������˺�${$.index}��${$.nickName || $.UserName}*********\n`);
      if (!$.isLogin) {
        $.msg($.name, `����ʾ��cookie��ʧЧ`, `�����˺�${$.index} ${$.nickName || $.UserName}\n�����µ�¼��ȡ\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});

        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie��ʧЧ - ${$.UserName}`, `�����˺�${$.index} ${$.UserName}\n�����µ�¼��ȡcookie`);
        }
        continue
      }
      await shareCodesFormat();
      await jdFactory()
    }
  }
})()
    .catch((e) => {
      $.log('', `? ${$.name}, ʧ��! ԭ��: ${e}!`, '')
    })
    .finally(() => {
      $.done();
    })
async function jdFactory() {
  await jdfactory_getHomeData();
  await helpFriends();
  // $.newUser !==1 && $.haveProduct === 2�����û���δѡ����Ʒ
  // $.newUser === 1���û�
  if ($.newUser === 1) return
  await jdfactory_collectElectricity();//�ռ������ĵ���
  await jdfactory_getTaskDetail();
  await doTask();
  await algorithm();//Ͷ������߼�
  await showMsg();
}
function showMsg() {
  return new Promise(resolve => {
    if (!jdNotify) {
      $.msg($.name, '', `${message}`);
    } else {
      $.log(`�����˺�${$.index}${$.nickName}\n${message}`);
    }
    if (new Date().getHours() === 12) {
      $.msg($.name, '', `${message}`);
    }
    resolve()
  })
}
async function algorithm() {
  // �����ǵ���Ʒ���ڣ������ռ������ĵ������㵱ǰ��Ʒ���裬��Ͷ��
  return new Promise(resolve => {
    $.post(taskPostUrl('jdfactory_getHomeData'), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API����ʧ�ܣ�������·����`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.data.bizCode === 0) {
              $.haveProduct = data.data.result.haveProduct;
              $.userName = data.data.result.userName;
              $.newUser = data.data.result.newUser;
              wantProduct = $.isNode() ? (process.env.FACTORAY_WANTPRODUCT_NAME ? process.env.FACTORAY_WANTPRODUCT_NAME : wantProduct) : ($.getdata('FACTORAY_WANTPRODUCT_NAME') ? $.getdata('FACTORAY_WANTPRODUCT_NAME') : wantProduct);
              if (data.data.result.factoryInfo) {
                let { totalScore, useScore, produceScore, remainScore, couponCount, name } = data.data.result.factoryInfo
                console.log(`\n��ѡ��Ʒ��${name}`);
                console.log(`��ǰ��Ͷ�����/���������${useScore}/${totalScore}`);
                console.log(`��ѡ��Ʒʣ������${couponCount}`);
                console.log(`��ǰ�ܵ�����${remainScore * 1 + useScore * 1}`);
                console.log(`��ǰ��ɶȣ�${((remainScore * 1 + useScore * 1)/(totalScore * 1)).toFixed(2) * 100}%\n`);
                message += `�����˺�${$.index} ${$.nickName}\n`;
                message += `��ѡ��Ʒ��${name}\n`;
                message += `��ǰ��Ͷ�����/���������${useScore}/${totalScore}\n`;
                message += `��ѡ��Ʒʣ������${couponCount}\n`;
                message += `��ǰ�ܵ�����${remainScore * 1 + useScore * 1}\n`;
                message += `��ǰ��ɶȣ�${((remainScore * 1 + useScore * 1)/(totalScore * 1)).toFixed(2) * 100}%\n`;
                if (wantProduct) {
                  console.log(`BoxJs�򻷾������ṩ��������Ʒ��${wantProduct}\n`);
                  await jdfactory_getProductList(true);
                  let wantProductSkuId = '';
                  for (let item of $.canMakeList) {
                    if (item.name.indexOf(wantProduct) > - 1) {
                      totalScore = item['fullScore'] * 1;
                      couponCount = item.couponCount;
                      name = item.name;
                    }
                    if (item.name.indexOf(wantProduct) > - 1 && item.couponCount > 0) {
                      wantProductSkuId = item.skuId;
                    }
                  }
                  // console.log(`\n��������Ʒ${name}\n��ǰ����Ϊ��${couponCount}\n�һ��������Ϊ��${totalScore}\n����ǰ�ܵ���Ϊ��${remainScore * 1 + useScore * 1}\n`);
                  if (wantProductSkuId && ((remainScore * 1 + useScore * 1) >= (totalScore * 1 + 100000))) {
                    console.log(`\n�ṩ��������Ʒ${name}Ŀǰ������${couponCount}���ҵ�ǰ�ܵ���Ϊ��${remainScore * 1 + useScore * 1}�������㡿�һ�����Ʒ�����ܵ�����${totalScore + 100000}`);
                    console.log(`��ȥ�ҳ�������������Ʒ���ֶ�Ͷ������һ�\n`);
                    $.msg($.name, '', `�����˺�${$.index}${$.nickName}\n���ṩ��������Ʒ${name}Ŀǰ������${couponCount}\n��ǰ�ܵ���Ϊ��${remainScore * 1 + useScore * 1}\n�����㡿�һ�����Ʒ�����ܵ�����${totalScore}\n��������ֱ��ҳ��\n������������Ʒ���ֶ�Ͷ������һ�`, {'open-url': 'openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/2uSsV2wHEkySvompfjB43nuKkcHp/index.html%22%20%7D'});
                    if ($.isNode()) await notify.sendNotify(`${$.name} - �˺�${$.index} - ${$.nickName}`, `�������˺�${$.index}��${$.nickName}\n���ṩ��������Ʒ${name}Ŀǰ������${couponCount}\n��ǰ�ܵ���Ϊ��${remainScore * 1 + useScore * 1}\n�����㡿�һ�����Ʒ�����ܵ�����${totalScore}\n��ȥ�ҳ�������������Ʒ���ֶ�Ͷ������һ�`);
                  } else {
                    console.log(`��������Ʒ${name}\n��ǰ����Ϊ��${couponCount}\n�һ��������Ϊ��${totalScore}\n����ǰ�ܵ���Ϊ��${remainScore * 1 + useScore * 1}\n������һ�������Ʒ������\n`)
                  }
                } else {
                  console.log(`BoxJs�򻷾�������δ�ṩ������Ʒ\n����һ�������Ʒ�����ṩ������Ʒ���ƣ����������������Ϊ���һ���ǰ��ѡ��Ʒ��${name}\n`);
                  if (((remainScore * 1 + useScore * 1) >= totalScore * 1 + 100000) && (couponCount * 1 > 0)) {
                    console.log(`\n��ѡ��Ʒ${name}Ŀǰ������${couponCount}���ҵ�ǰ�ܵ���Ϊ��${remainScore * 1 + useScore * 1}�������㡿�һ�����Ʒ�����ܵ�����${totalScore}`);
                    console.log(`BoxJs�򻷾�������δ�ṩ������Ʒ������Ϊ��Ŀǰѡ��${name} ������ʾ֪ͨ\n`);
                    // await jdfactory_addEnergy();
                    $.msg($.name, '', `�����˺�${$.index}${$.nickName}\n����ѡ��Ʒ${name}Ŀǰ������${couponCount}\n��ǰ�ܵ���Ϊ��${remainScore * 1 + useScore * 1}\n�����㡿�һ�����Ʒ�����ܵ�����${totalScore}\n��������ֱ��ҳ��鿴`, {'open-url': 'openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/2uSsV2wHEkySvompfjB43nuKkcHp/index.html%22%20%7D'});
                    if ($.isNode()) await notify.sendNotify(`${$.name} - �˺�${$.index} - ${$.nickName}`, `�������˺�${$.index}��${$.nickName}\n��ѡ��Ʒ${name}Ŀǰ������${couponCount}\n��ǰ�ܵ���Ϊ��${remainScore * 1 + useScore * 1}\n�����㡿�һ�����Ʒ�����ܵ�����${totalScore}\n����ȥ�ҳ��鿴`);
                  } else {
                    console.log(`\n��ѡ��Ʒ${name}Ŀǰ������${couponCount}���ҵ�ǰ�ܵ���Ϊ��${remainScore * 1 + useScore * 1}���������㡿�һ�����Ʒ�����ܵ�����${totalScore}`)
                    console.log(`�ʲ�һ����Ͷ�������һֱ�ŵ������ۼ�\n`);
                  }
                }
              } else {
                console.log(`\n���˺�${$.index}${$.nickName}��δѡ����Ʒ\n`);
                message += `�����˺�${$.index} ${$.nickName}\n`;
                message += `��ѡ��Ʒ������\n`;
                message += `������Ʒ��${wantProduct ? wantProduct : '����'}\n`;
                if (wantProduct) {
                  console.log(`BoxJs�򻷾������ṩ��������Ʒ��${wantProduct}\n`);
                  await jdfactory_getProductList(true);
                  let wantProductSkuId = '', name, totalScore, couponCount, remainScore;
                  for (let item of $.canMakeList) {
                    if (item.name.indexOf(wantProduct) > - 1) {
                      totalScore = item['fullScore'] * 1;
                      couponCount = item.couponCount;
                      name = item.name;
                    }
                    if (item.name.indexOf(wantProduct) > - 1 && item.couponCount > 0) {
                      wantProductSkuId = item.skuId;
                    }
                  }
                  if (totalScore) {
                    // �����������õ�������Ʒ
                    message += `������Ʒ������${couponCount}\n`;
                    message += `������Ʒ���������${totalScore}\n`;
                    message += `����ǰ�ܵ�����${$.batteryValue * 1}\n`;
                    if (wantProductSkuId && (($.batteryValue * 1) >= (totalScore))) {
                      console.log(`\n�ṩ��������Ʒ${name}Ŀǰ������${couponCount}���ҵ�ǰ�ܵ���Ϊ��${$.batteryValue * 1}�������㡿�һ�����Ʒ�����ܵ�����${totalScore}`);
                      console.log(`��ȥ�ҳ��ѡ��������Ʒ���ֶ�Ͷ������һ�\n`);
                      $.msg($.name, '', `�����˺�${$.index}${$.nickName}\n���ṩ��������Ʒ${name}Ŀǰ������${couponCount}\n��ǰ�ܵ���Ϊ��${$.batteryValue * 1}\n�����㡿�һ�����Ʒ�����ܵ�����${totalScore}\n��������ֱ��ҳ��\nѡ���������Ʒ���ֶ�Ͷ������һ�`, {'open-url': 'openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/2uSsV2wHEkySvompfjB43nuKkcHp/index.html%22%20%7D'});
                      if ($.isNode()) await notify.sendNotify(`${$.name} - �˺�${$.index} - ${$.nickName}`, `�������˺�${$.index}��${$.nickName}\n���ṩ��������Ʒ${name}Ŀǰ������${couponCount}\n��ǰ�ܵ���Ϊ��${$.batteryValue * 1}\n�����㡿�һ�����Ʒ�����ܵ�����${totalScore}\n��ȥ�ҳ��ѡ���������Ʒ���ֶ�Ͷ������һ�`);
                    } else {
                      console.log(`��������Ʒ${name}\n��ǰ����Ϊ��${couponCount}\n�һ��������Ϊ��${totalScore}\n����ǰ�ܵ���Ϊ��${$.batteryValue * 1}\n������һ�������Ʒ������\n`)
                    }
                  } else {
                    message += `Ŀǰ��棺���������õ�������Ʒ\n`;
                  }
                } else {
                  console.log(`BoxJs�򻷾�������δ�ṩ������Ʒ\n����һ�������Ʒ�����ṩ������Ʒ����\n`);
                  await jdfactory_getProductList(true);
                  message += `��ǰʣ�������Ʒ��${$.canMakeList[0] && $.canMakeList[0].name}\n`;
                  message += `�һ����������${$.canMakeList[0] && $.canMakeList[0].fullScore}\n`;
                  message += `����ǰ�ܵ�����${$.batteryValue * 1}\n`;
                  if ($.canMakeList[0] && $.canMakeList[0].couponCount > 0 && $.batteryValue * 1 >= $.canMakeList[0] && $.canMakeList[0].fullScore) {
                    let nowTimes = new Date(new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000);
                    if (new Date(nowTimes).getHours() === 12) {
                      $.msg($.name, '', `�����˺�${$.index}${$.nickName}\n${message}�����㡿�һ�${$.canMakeList[0] && $.canMakeList[0] && [0].name}�����ܵ�����${$.canMakeList[0] && $.canMakeList[0].fullScore}\n��������ֱ��ҳ��\nѡ���������Ʒ���ֶ�Ͷ������һ�`, {'open-url': 'openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/2uSsV2wHEkySvompfjB43nuKkcHp/index.html%22%20%7D'});
                      if ($.isNode()) await notify.sendNotify(`${$.name} - �˺�${$.index} - ${$.nickName}`, `�������˺�${$.index}��${$.nickName}\n${message}�����㡿�һ�${$.canMakeList[0] && $.canMakeList[0].name}�����ܵ�����${$.canMakeList[0].fullScore}\n����ȥ�ҳ��鿴`);
                    }
                  } else {
                    console.log(`\nĿǰ����${$.batteryValue * 1},������һ� ${$.canMakeList[0] && $.canMakeList[0].name}����� ${$.canMakeList[0] && $.canMakeList[0].fullScore}����\n`)
                  }
                }
              }
            } else {
              console.log(`�쳣��${JSON.stringify(data)}`)
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
async function helpFriends() {
  for (let code of $.newShareCodes) {
    if (!code) continue
    const helpRes = await jdfactory_collectScore(code);
    if (helpRes.code === 0 && helpRes.data.bizCode === -7) {
      console.log(`���������Ѻľ�������`);
      break
    }
  }
}
async function doTask() {
  if ($.taskVos && $.taskVos.length > 0) {
    for (let item of $.taskVos) {
      if (item.taskType === 1) {
        //��ע��������
        if (item.status === 1) {
          console.log(`׼����������${item.taskName}`);
          for (let task of item.followShopVo) {
            if (task.status === 1) {
              await jdfactory_collectScore(task.taskToken);
            }
          }
        } else {
          console.log(`${item.taskName}������`)
        }
      }
      if (item.taskType === 2) {
        //������Ʒ����
        if (item.status === 1) {
          console.log(`׼����������${item.taskName}`);
          for (let task of item.productInfoVos) {
            if (task.status === 1) {
              await jdfactory_collectScore(task.taskToken);
            }
          }
        } else {
          console.log(`${item.taskName}������`)
        }
      }
      if (item.taskType === 3) {
        //��᳡����
        if (item.status === 1) {
          console.log(`׼����������${item.taskName}`);
          for (let task of item.shoppingActivityVos) {
            if (task.status === 1) {
              await jdfactory_collectScore(task.taskToken);
            }
          }
        } else {
          console.log(`${item.taskName}������`)
        }
      }
      if (item.taskType === 10) {
        if (item.status === 1) {
          if (item.threeMealInfoVos[0].status === 1) {
            //������������
            console.log(`׼����������${item.taskName}`);
            await jdfactory_collectScore(item.threeMealInfoVos[0].taskToken);
          } else if (item.threeMealInfoVos[0].status === 0) {
            console.log(`${item.taskName} �����Ѵ��ʱ��`)
          }
        } else if (item.status === 2){
          console.log(`${item.taskName}�����`);
        }
      }
      if (item.taskType === 21) {
        //��ͨ��Ա����
        if (item.status === 1) {
          console.log(`������${item.taskName}������`);
          // for (let task of item.brandMemberVos) {
          //   if (task.status === 1) {
          //     await jdfactory_collectScore(task.taskToken);
          //   }
          // }
        } else {
          console.log(`${item.taskName}������`)
        }
      }
      if (item.taskType === 13) {
        //ÿ�մ�
        if (item.status === 1) {
          console.log(`׼����������${item.taskName}`);
          await jdfactory_collectScore(item.simpleRecordInfoVo.taskToken);
        } else {
          console.log(`${item.taskName}�����`);
        }
      }
      if (item.taskType === 14) {
        //��������
        if (item.status === 1) {
          console.log(`׼����������${item.taskName}`);
          // await jdfactory_collectScore(item.simpleRecordInfoVo.taskToken);
        } else {
          console.log(`${item.taskName}�����`);
        }
      }
      if (item.taskType === 23) {
        //�����������ҳ����
        if (item.status === 1) {
          console.log(`׼����������${item.taskName}`);
          await queryVkComponent();
          await jdfactory_collectScore(item.simpleRecordInfoVo.taskToken);
        } else {
          console.log(`${item.taskName}�����`);
        }
      }
    }
  }
}

//��ȡ��������Ľ���
function jdfactory_collectScore(taskToken) {
  return new Promise(async resolve => {
    await $.wait(1000);
    $.post(taskPostUrl("jdfactory_collectScore", { taskToken }, "jdfactory_collectScore"), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API����ʧ�ܣ�������·����`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.data.bizCode === 0) {
              $.taskVos = data.data.result.taskVos;//�����б�
              console.log(`��ȡ��������Ľ�����${JSON.stringify(data.data.result)}`);
            } else {
              console.log(JSON.stringify(data))
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
//����ƷͶ�����
function jdfactory_addEnergy() {
  return new Promise(resolve => {
    $.post(taskPostUrl("jdfactory_addEnergy"), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API����ʧ�ܣ�������·����`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.data.bizCode === 0) {
              console.log(`����ƷͶ�������${JSON.stringify(data.data.result)}`)
              // $.taskConfigVos = data.data.result.taskConfigVos;
              // $.exchangeGiftConfigs = data.data.result.exchangeGiftConfigs;
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}

//�ռ�����
function jdfactory_collectElectricity() {
  return new Promise(resolve => {
    $.post(taskPostUrl("jdfactory_collectElectricity"), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API����ʧ�ܣ�������·����`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.data.bizCode === 0) {
              console.log(`�ɹ��ռ�${data.data.result.electricityValue}��������ǰ�����ܵ�����${data.data.result.batteryValue}\n`);
              $.batteryValue = data.data.result.batteryValue;
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
  })
}
//��ȡ�����б�
function jdfactory_getTaskDetail() {
  return new Promise(resolve => {
    $.post(taskPostUrl("jdfactory_getTaskDetail", {}, "jdfactory_getTaskDetail"), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API����ʧ�ܣ�������·����`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.data.bizCode === 0) {
              $.taskVos = data.data.result.taskVos;//�����б�
              $.taskVos.map(item => {
                if (item.taskType === 14) {
                  console.log(`\n�������˺�${$.index}��${$.nickName || $.UserName}����${$.name}���ѻ����롿${item.assistTaskDetailVo.taskToken}\n`)
                }
              })
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
//ѡ��һ����Ʒ��ֻ���� $.newUser !== 1 && $.haveProduct === 2 ���� sellOut === 0��ʱ�����
function jdfactory_makeProduct(skuId) {
  return new Promise(resolve => {
    $.post(taskPostUrl('jdfactory_makeProduct', { skuId }), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API����ʧ�ܣ�������·����`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.data.bizCode === 0) {
              console.log(`ѡ����Ʒ�ɹ���${JSON.stringify(data)}`);
            } else {
              console.log(`�쳣��${JSON.stringify(data)}`)
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
function queryVkComponent() {
  return new Promise(resolve => {
    const options = {
      "url": `https://api.m.jd.com/client.action?functionId=queryVkComponent`,
      "body": `adid=0E38E9F1-4B4C-40A4-A479-DD15E58A5623&area=19_1601_50258_51885&body={"componentId":"4f953e59a3af4b63b4d7c24f172db3c3","taskParam":"{\\"actId\\":\\"8tHNdJLcqwqhkLNA8hqwNRaNu5f\\"}","cpUid":"8tHNdJLcqwqhkLNA8hqwNRaNu5f","taskSDKVersion":"1.0.3","businessId":"babel"}&build=167436&client=apple&clientVersion=9.2.5&d_brand=apple&d_model=iPhone11,8&eid=eidIf12a8121eas2urxgGc+zS5+UYGu1Nbed7bq8YY+gPd0Q0t+iviZdQsxnK/HTA7AxZzZBrtu1ulwEviYSV3QUuw2XHHC+PFHdNYx1A/3Zt8xYR+d3&isBackground=N&joycious=228&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=88732f840b77821b345bf07fd71f609e6ff12f43&osVersion=14.2&partner=TF&rfs=0000&scope=11&screen=828*1792&sign=792d92f78cc893f43c32a4f0b2203a41&st=1606533009673&sv=122&uts=0f31TVRjBSsqndu4/jgUPz6uymy50MQJFKw5SxNDrZGH4Sllq/CDN8uyMr2EAv+1xp60Q9gVAW42IfViu/SFHwjfGAvRI6iMot04FU965+8UfAPZTG6MDwxmIWN7YaTL1ACcfUTG3gtkru+D4w9yowDUIzSuB+u+eoLwM7uynPMJMmGspVGyFIgDXC/tmNibL2k6wYgS249Pa2w5xFnYHQ==&uuid=hjudwgohxzVu96krv/T6Hg==&wifiBssid=1b5809fb84adffec2a397007cc235c03`,
      "headers":  {
        "Cookie": cookie,
        "Accept": `*/*`,
        "Connection": `keep-alive`,
        "Content-Type": `application/x-www-form-urlencoded`,
        "Accept-Encoding": `gzip, deflate, br`,
        "Host": `api.m.jd.com`,
        "User-Agent": "jdapp;iPhone;9.3.4;14.3;88732f840b77821b345bf07fd71f609e6ff12f43;network/4g;ADID/1C141FDD-C62F-425B-8033-9AAB7E4AE6A3;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone11,8;addressid/2005183373;supportBestPay/0;appBuild/167502;jdSupportDarkMode/0;pv/414.19;apprpd/Babel_Native;ref/TTTChannelViewContoller;psq/5;ads/;psn/88732f840b77821b345bf07fd71f609e6ff12f43|1701;jdv/0|iosapp|t_335139774|appshare|CopyURL|1610885480412|1610885486;adk/;app_device/IOS;pap/JA2015_311210|9.3.4|IOS 14.3;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
        "Accept-Language": `zh-Hans-CN;q=1, en-CN;q=0.9`,
      },
      "timeout": 10000,
    }
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API����ʧ�ܣ�������·����`)
        } else {
          // console.log('queryVkComponent', data)
          if (safeGet(data)) {
            data = JSON.parse(data);
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
//��ѯ��ǰ��Ʒ�б�
function jdfactory_getProductList(flag = false) {
  return new Promise(resolve => {
    $.post(taskPostUrl('jdfactory_getProductList'), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API����ʧ�ܣ�������·����`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.data.bizCode === 0) {
              $.canMakeList = [];
              $.canMakeList = data.data.result.canMakeList;//��ǰ��ѡ��Ʒ�б� sellOut:1Ϊ�����⣬0ΪĿǰ��ѡ��
              if ($.canMakeList && $.canMakeList.length > 0) {
                $.canMakeList.sort(sortCouponCount);
                console.log(`��Ʒ����       ��ѡ״̬    ʣ����`)
                for (let item of $.canMakeList) {
                  console.log(`${item.name.slice(-4)}         ${item.sellOut === 1 ? '������':'�� ѡ'}      ${item.couponCount}`);
                }
                if (!flag) {
                  for (let item of $.canMakeList) {
                    if (item.name.indexOf(wantProduct) > -1 && item.couponCount > 0 && item.sellOut === 0) {
                      await jdfactory_makeProduct(item.skuId);
                      break
                    }
                  }
                }
              }
            } else {
              console.log(`�쳣��${JSON.stringify(data)}`)
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
function sortCouponCount(a, b) {
  return b['couponCount'] - a['couponCount']
}
function jdfactory_getHomeData() {
  return new Promise(resolve => {
    $.post(taskPostUrl('jdfactory_getHomeData'), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API����ʧ�ܣ�������·����`)
        } else {
          if (safeGet(data)) {
            // console.log(data);
            data = JSON.parse(data);
            if (data.data.bizCode === 0) {
              $.haveProduct = data.data.result.haveProduct;
              $.userName = data.data.result.userName;
              $.newUser = data.data.result.newUser;
              if (data.data.result.factoryInfo) {
                $.totalScore = data.data.result.factoryInfo.totalScore;//ѡ�е���Ʒ��һ����Ҫ�ĵ���
                $.userScore = data.data.result.factoryInfo.userScore;//��ʹ�õ���
                $.produceScore = data.data.result.factoryInfo.produceScore;//����Ʒ��Ͷ�����
                $.remainScore = data.data.result.factoryInfo.remainScore;//��ǰ���ص���
                $.couponCount = data.data.result.factoryInfo.couponCount;//��ѡ����Ʒ��ǰʣ����
                $.hasProduceName = data.data.result.factoryInfo.name;//��ѡ����Ʒ��ǰʣ����
              }
              if ($.newUser === 1) {
                //���û�
                console.log(`�˾����˺�${$.index}${$.nickName}Ϊ���û���δ����${$.name}�\n����Ϊ���ӿ����������������ѡ��һ��Ʒ`);
                if ($.haveProduct === 2) {
                  await jdfactory_getProductList();//ѡ����Ʒ
                }
                // $.msg($.name, '��δ�����', `�����˺�${$.index}${$.nickName}��δ����${$.name}�\n��ȥ����APP->����'��һ��'->��������->����\n�����������ɵ���${$.name}�`, {'open-url': 'openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/2uSsV2wHEkySvompfjB43nuKkcHp/index.html%22%20%7D'});
              }
              if ($.newUser !== 1 && $.haveProduct === 2) {
                console.log(`�˾����˺�${$.index}${$.nickName}��δѡ����Ʒ\n����Ҳ��Ϊ����������ռ���ѵ���`);
                // $.msg($.name, '��δѡ����Ʒ', `�����˺�${$.index}${$.nickName}��δѡ����Ʒ\n��ȥ����APP->����'��һ��'->��������->ѡ��һ����Ʒ\n�����������ɵ���${$.name}�`, {'open-url': 'openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/2uSsV2wHEkySvompfjB43nuKkcHp/index.html%22%20%7D'});
                // await jdfactory_getProductList();//ѡ����Ʒ
              }
            } else {
              console.log(`�쳣��${JSON.stringify(data)}`)
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
function readShareCode() {
  console.log(`��ʼ`)
  return new Promise(async resolve => {
    $.get({url: `http://jd.turinglabs.net/api/v2/jd/ddfactory/read/${randomCount}/`, timeout: 10000}, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API����ʧ�ܣ�������·����`)
        } else {
          if (data) {
            console.log(`���ȡ${randomCount}����ŵ����̶��Ļ��������(��Ӱ�����й̶�����)`)
            data = JSON.parse(data);
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data);
      }
    })
    await $.wait(10000);
    resolve()
  })
}
//��ʽ��������
function shareCodesFormat() {
  return new Promise(async resolve => {
    // console.log(`��${$.index}�������˺ŵ�������:::${$.shareCodesArr[$.index - 1]}`)
    $.newShareCodes = [];
    if ($.shareCodesArr[$.index - 1]) {
      $.newShareCodes = $.shareCodesArr[$.index - 1].split('@');
    } else {
      console.log(`��������${$.index}�������˺�δ�ṩshareCode,�����ɱ��ű��Դ���������\n`)
      const tempIndex = $.index > inviteCodes.length ? (inviteCodes.length - 1) : ($.index - 1);
      $.newShareCodes = inviteCodes[tempIndex].split('@');
    }
    const readShareCodeRes = await readShareCode();
    if (readShareCodeRes && readShareCodeRes.code === 200) {
      $.newShareCodes = [...new Set([...$.newShareCodes, ...(readShareCodeRes.data || [])])];
    }
    console.log(`��${$.index}�������˺Ž�Ҫ�����ĺ���${JSON.stringify($.newShareCodes)}`)
    resolve();
  })
}
function requireConfig() {
  return new Promise(resolve => {
    console.log(`��ʼ��ȡ${$.name}�����ļ�\n`);
    //Node.js�û�����jdCookie.js����д����ck;
    const shareCodes = $.isNode() ? require('./jdFactoryShareCodes.js') : '';
    console.log(`��${cookiesArr.length}�������˺�\n`);
    $.shareCodesArr = [];
    if ($.isNode()) {
      Object.keys(shareCodes).forEach((item) => {
        if (shareCodes[item]) {
          $.shareCodesArr.push(shareCodes[item])
        }
      })
    }
    // console.log(`\n�ֶ��ö�������::${JSON.stringify($.shareCodesArr)}`);
    console.log(`���ṩ��${$.shareCodesArr.length}���˺ŵ�${$.name}������\n`);
    resolve()
  })
}
function taskPostUrl(function_id, body = {}, function_id2) {
  let url = `${JD_API_HOST}`;
  if (function_id2) {
    url += `?functionId=${function_id2}`;
  }
  return {
    url,
    body: `functionId=${function_id}&body=${escape(JSON.stringify(body))}&client=wh5&clientVersion=1.1.0`,
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": cookie,
      "Host": "api.m.jd.com",
      "Origin": "https://h5.m.jd.com",
      "Referer": "https://h5.m.jd.com/babelDiy/Zeus/2uSsV2wHEkySvompfjB43nuKkcHp/index.html",
      "User-Agent": "jdapp;iPhone;9.3.4;14.3;88732f840b77821b345bf07fd71f609e6ff12f43;network/4g;ADID/1C141FDD-C62F-425B-8033-9AAB7E4AE6A3;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone11,8;addressid/2005183373;supportBestPay/0;appBuild/167502;jdSupportDarkMode/0;pv/414.19;apprpd/Babel_Native;ref/TTTChannelViewContoller;psq/5;ads/;psn/88732f840b77821b345bf07fd71f609e6ff12f43|1701;jdv/0|iosapp|t_335139774|appshare|CopyURL|1610885480412|1610885486;adk/;app_device/IOS;pap/JA2015_311210|9.3.4|IOS 14.3;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
    },
    timeout: 10000,
  }
}
function TotalBean() {
  return new Promise(async resolve => {
    const options = {
      "url": `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
      "headers": {
        "Accept": "application/json,text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
        "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0")
      },
      "timeout": 10000,
    }
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API����ʧ�ܣ�������·����`)
        } else {
          if (data) {
            data = JSON.parse(data);
            if (data['retcode'] === 13) {
              $.isLogin = false; //cookie����
              return
            }
            $.nickName = data['base'].nickname;
          } else {
            console.log(`�������������ؿ�����`)
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
function safeGet(data) {
  try {
    if (typeof JSON.parse(data) == "object") {
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log(`������������������Ϊ�գ����������豸�������`);
    return false;
  }
}
function jsonParse(str) {
  if (typeof str == "string") {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.log(e);
      $.msg($.name, '', '����������BoxJs������޸�����\n����ͨ���ű�ȥ��ȡcookie')
      return [];
    }
  }
}
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GIT_HUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`?${this.name}, ��ʼ!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============?ϵͳ֪ͨ?=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`??${this.name}, ����!`,t.stack):this.log("",`??${this.name}, ����!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`?${this.name}, ����! ? ${s} ��`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
