/*
�����ȳ� ���µ�ַ�� https://jdsharedresourcescdn.azureedge.net/jdresource/jd_pet.js
����ʱ�䣺2021-01-19
���ڣ�����APP�ҵ�-���๤��-�����ȳ�
��֧��IOS˫�����˺�,Node.js֧��N�������˺�
�ű�����: QuantumultX, Surge, Loon, JSBox, Node.js

������shareCode�����ֶ����нű��鿴��ӡ�ɿ���
һ��ֻ�ܰ���5���ˡ��������������Ч

=================================Quantumultx=========================
[task_local]
#�����ȳ�
15 6-18/6 * * * https://jdsharedresourcescdn.azureedge.net/jdresource/jd_pet.js, tag=�����ȳ�, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jdmc.png, enabled=true

=================================Loon===================================
[Script]
cron "15 6-18/6 * * *" script-path=https://jdsharedresourcescdn.azureedge.net/jdresource/jd_pet.js,tag=�����ȳ�

===================================Surge================================
�����ȳ� = type=cron,cronexp="15 6-18/6 * * *",wake-system=1,timeout=3600,script-path=https://jdsharedresourcescdn.azureedge.net/jdresource/jd_pet.js

====================================С���=============================
�����ȳ� = type=cron,script-path=https://jdsharedresourcescdn.azureedge.net/jdresource/jd_pet.js, cronexpr="15 6-18/6 * * *", timeout=3600, enable=true

*/
const $ = new Env('�����ȳ�');
let cookiesArr = [], cookie = '', jdPetShareArr = [], isBox = false, notify, newShareCodes;
//�������ѷ�����(���5��,������������ʧ��),ԭ��:����ũ��ÿ��ÿ��ֻ���Ĵ���������
//�˴�������IOS�û����ؽű�������ʹ�ã���д������ĵط���ͬһ�����˺ŵĺ��ѻ�������ʹ��@���Ÿ�����
//������������˺ŵ���дʾ����iOSֻ֧��2�������˺ţ�
let shareCodes = [ // IOS���ؽű��û�����б�������Ҫ�����ĺ��ѵ�shareCode
   //�˺�һ�ĺ���shareCode,��ͬ���ѵ�shareCode�м���@���Ÿ���
  'MTAxODc2NTEzNTAwMDAwMDAwMjg3MDg2MA==@MTAxODc2NTEzMzAwMDAwMDAyNzUwMDA4MQ==@MTAxODc2NTEzMjAwMDAwMDAzMDI3MTMyOQ==@MTAxODc2NTEzNDAwMDAwMDAzMDI2MDI4MQ==@MTAxODcxOTI2NTAwMDAwMDAxOTQ3MjkzMw==',
  //�˺Ŷ��ĺ���shareCode,��ͬ���ѵ�shareCode�м���@���Ÿ���
  'MTAxODc2NTEzMjAwMDAwMDAzMDI3MTMyOQ==@MTAxODcxOTI2NTAwMDAwMDAyNjA4ODQyMQ==@MTAxODc2NTEzOTAwMDAwMDAyNzE2MDY2NQ==@MTE1NDUyMjEwMDAwMDAwNDI0MDM2MDc=@MTAxODc2NTEzMjAwMDAwMDAwNDA5MzAzMw==',
]
let message = '', subTitle = '', option = {};
let jdNotify = false;//�Ƿ�ر�֪ͨ��false��֪ͨ���ͣ�true�ر�֪ͨ����
const JD_API_HOST = 'https://api.m.jd.com/client.action';
let goodsUrl = '', taskInfoKey = [];
let randomCount = $.isNode() ? 20 : 5;
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
      await TotalBean();
      console.log(`\n��ʼ�������˺�${$.index}��${$.nickName || $.UserName}\n`);
      if (!$.isLogin) {
        $.msg($.name, `����ʾ��cookie��ʧЧ`, `�����˺�${$.index} ${$.nickName || $.UserName}\n�����µ�¼��ȡ\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});

        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie��ʧЧ - ${$.UserName}`, `�����˺�${$.index} ${$.UserName}\n�����µ�¼��ȡcookie`);
        }
        continue
      }
      message = '';
      subTitle = '';
      goodsUrl = '';
      taskInfoKey = [];
      option = {};
      await shareCodesFormat();
      await jdPet();
    }
  }
})()
    .catch((e) => {
      $.log('', `? ${$.name}, ʧ��! ԭ��: ${e}!`, '')
    })
    .finally(() => {
      $.done();
    })
async function jdPet() {
  try {
    //��ѯjd������Ϣ
    const initPetTownRes = await request('initPetTown');
    message = `�������˺�${$.index}��${$.nickName}\n`;
    if (initPetTownRes.code === '0' && initPetTownRes.resultCode === '0' && initPetTownRes.message === 'success') {
      $.petInfo = initPetTownRes.result;
      if ($.petInfo.userStatus === 0) {
        // $.msg($.name, '', `����ʾ�������˺�${$.index}${$.nickName}\n�ȳ�δ����\n���ֶ�ȥ����APP�����\n��ڣ��ҵ�->��Ϸ�뻥��->�鿴���࿪��`, { "open-url": "openapp.jdmoble://" });
        await slaveHelp();//��������
        $.log($.name, '', `����ʾ�������˺�${$.index}${$.nickName}\n�ȳ�δ����\n���ֶ�ȥ����APP�����\n��ڣ��ҵ�->��Ϸ�뻥��->�鿴���࿪��`);
        return
      }
      if (!$.petInfo.goodsInfo) {
        $.msg($.name, '', `����ʾ�������˺�${$.index}${$.nickName}\n��δѡ���µ���Ʒ`, { "open-url": "openapp.jdmoble://" });
        if ($.isNode()) await notify.sendNotify(`${$.name} - ${$.index} - ${$.nickName}`, `����ʾ�������˺�${$.index}${$.nickName}\n��δѡ���µ���Ʒ`);
        return
      }
      goodsUrl = $.petInfo.goodsInfo && $.petInfo.goodsInfo.goodsUrl;
      // option['media-url'] = goodsUrl;
      // console.log(`��ʼ���ȳ���Ϣ���: ${JSON.stringify(petInfo)}`);
      if ($.petInfo.petStatus === 5) {
        await slaveHelp();//���Զһ���û��ȥ�һ�,Ҳ�ܼ�����������
        option['open-url'] = "openApp.jdMobile://";
        $.msg($.name, `������?��${$.petInfo.goodsInfo.goodsName}�ѿ���ȡ`, '��ȥ����APP��΢��С����鿴', option);
        if ($.isNode()) {
          await notify.sendNotify(`${$.name} - �˺�${$.index} - ${$.nickName || $.UserName}��Ʒ�ѿ���ȡ`, `�����˺�${$.index} ${$.nickName}\n${$.petInfo.goodsInfo.goodsName}�ѿ���ȡ`);
        }
        return
      } else if ($.petInfo.petStatus === 6) {
        await slaveHelp();//����ȡ���,��δ�����µ�,Ҳ�ܼ�����������
        option['open-url'] = "openApp.jdMobile://";
        $.msg($.name, `������?������ȡ���,��δ���������µ���Ʒ`, '��ȥ����APP��΢��С�����������', option);
        if ($.isNode()) {
          await notify.sendNotify(`${$.name} - �˺�${$.index} - ${$.nickName || $.UserName}��Ʒ�ѿ���ȡ`, `�����˺�${$.index} ${$.nickName}\n����ȡ���,��δ���������µ���Ʒ`);
        }
        return
      }
      console.log(`\n�������˺�${$.index}��${$.nickName || $.UserName}����${$.name}���ѻ����롿${$.petInfo.shareCode}\n`);
      await taskInit();
      if ($.taskInit.resultCode === '9999' || !$.taskInit.result) {
        console.log('��ʼ�������쳣, ���Ժ�����');
        return
      }
      $.taskInfo = $.taskInit.result;

      await petSport();//����
      await slaveHelp();//��������
      await masterHelpInit();//��ȡ��������Ϣ
      await doTask();//���ճ�����
      await feedPetsAgain();//�ٴ�Ͷʳ
      await energyCollect();//�ռ��øж�
      await showMsg();
      console.log('ȫ���������, ��������������Ե���?STAR������һ��, �����~');
    } else if (initPetTownRes.code === '0'){
      console.log(`��ʼ���ȳ�ʧ��:  ${initPetTownRes.message}`);
    }
  } catch (e) {
    $.logErr(e)
  }
}
// ��ȡ���кøж�
async function energyCollect() {
  console.log('��ʼ��ȡ�������øж�');
  let function_id = arguments.callee.name.toString();
  const response = await request(function_id);
  // console.log(`��ȡ�������øж����:${JSON.stringify(response)}`);
  if (response.resultCode === '0') {
    message += `����${response.result.medalNum + 1}��ѫ����ɽ��ȡ�${response.result.medalPercent}%�������ռ�${response.result.needCollectEnergy}�ø�\n`;
    message += `���ѻ��ѫ�¡�${response.result.medalNum}�飬�����ռ�${response.result.needCollectMedalNum}�鼴�ɶһ���Ʒ��${$.petInfo.goodsInfo.goodsName}��\n`;
  }
}
//�ٴ�Ͷʳ
async function feedPetsAgain() {
  const response = await request('initPetTown');//�ٴγ�ʼ���ȳ�
  if (response.code === '0' && response.resultCode === '0' && response.message === 'success') {
    $.petInfo = response.result;
    let foodAmount = $.petInfo.foodAmount; //ʣ�๷��
    if (foodAmount - 100 >= 10) {
      for (let i = 0; i < parseInt((foodAmount - 100) / 10); i++) {
        const feedPetRes = await request('feedPets');
        console.log(`ͶʳfeedPetRes`);
        if (feedPetRes.resultCode == 0 && feedPetRes.code == 0) {
          console.log('Ͷʳ�ɹ�')
        }
      }
      const response2 = await request('initPetTown');
      $.petInfo = response2.result;
      subTitle = $.petInfo.goodsInfo.goodsName;
      // message += `���밮����ʶ��${$.petInfo.meetDays}��\n`;
      // message += `��ʣ�๷����${$.petInfo.foodAmount}g\n`;
    } else {
      console.log("Ŀǰʣ�๷������" + foodAmount + "��g,���ټ���Ͷʳ,�������ֹ���������ɵڶ�������");
      subTitle = $.petInfo.goodsInfo && $.petInfo.goodsInfo.goodsName;
      // message += `���밮����ʶ��${$.petInfo.meetDays}��\n`;
      // message += `��ʣ�๷����${$.petInfo.foodAmount}g\n`;
    }
  } else {
    console.log(`��ʼ���ȳ�ʧ��:  ${JSON.stringify($.petInfo)}`);
  }
}


async function doTask() {
  const { signInit, threeMealInit, firstFeedInit, feedReachInit, inviteFriendsInit, browseShopsInit, taskList } = $.taskInfo;
  for (let item of taskList) {
    if ($.taskInfo[item].finished) {
      console.log(`���� ${item} �����`)
    }
  }
  //ÿ��ǩ��
  if (signInit && !signInit.finished) {
    await signInitFun();
  }
  // �״�ιʳ
  if (firstFeedInit && !firstFeedInit.finished) {
    await firstFeedInitFun();
  }
  // ����
  if (threeMealInit && !threeMealInit.finished) {
    if (threeMealInit.timeRange === -1) {
      console.log(`δ������ʱ��`);
    } else {
      await threeMealInitFun();
    }
  }
  if (browseShopsInit && !browseShopsInit.finished) {
    await browseShopsInitFun();
  }
  let browseSingleShopInitList = [];
  taskList.map((item) => {
    if (item.indexOf('browseSingleShopInit') > -1) {
      browseSingleShopInitList.push(item);
    }
  });
  // ȥ���û��᳡
  for (let item of browseSingleShopInitList) {
    const browseSingleShopInitTask = $.taskInfo[item];
    if (browseSingleShopInitTask && !browseSingleShopInitTask.finished) {
      await browseSingleShopInit(browseSingleShopInitTask);
    }
  }
  if (inviteFriendsInit && !inviteFriendsInit.finished) {
    await inviteFriendsInitFun();
  }
  // Ͷʳ10��
  if (feedReachInit && !feedReachInit.finished) {
    await feedReachInitFun();
  }
}
// ����������Ϣ
async function masterHelpInit() {
  let res = await request(arguments.callee.name.toString());
  // console.log(`������Ϣ: ${JSON.stringify(res)}`);
  if (res.code === '0' && res.resultCode === '0') {
    if (res.result.masterHelpPeoples && res.result.masterHelpPeoples.length >= 5) {
      if(!res.result.addedBonusFlag) {
        console.log("��ʼ��ȡ���⽱��");
        let getHelpAddedBonusResult = await request('getHelpAddedBonus');
        if (getHelpAddedBonusResult.resultCode === '0') {
          message += `�����⽱��${getHelpAddedBonusResult.result.reward}��ȡ��${getHelpAddedBonusResult.message}\n`;
        }
        console.log(`��ȡ30g���⽱���������${getHelpAddedBonusResult.message}��`);
      } else {
        console.log("�Ѿ���ȡ��5�����������⽱��");
        message += `�����⽱��������ȡ\n`;
      }
    } else {
      console.log("��������δ�ﵽ5��")
      message += `�����⽱������ȡʧ�ܣ�ԭ�򣺸�����������δ��5��\n`;
    }
    if (res.result.masterHelpPeoples && res.result.masterHelpPeoples.length > 0) {
      console.log('���������ĺ��ѵ�������ʼ')
      let str = '';
      res.result.masterHelpPeoples.map((item, index) => {
        if (index === (res.result.masterHelpPeoples.length - 1)) {
          str += item.nickName || "�����û�";
        } else {
          str += (item.nickName || "�����û�") + '��';
        }
      })
      message += `���������ĺ��ѡ�${str}\n`;
    }
  }
}
/**
 * ��������, ��ʱ֧��һ������, ��Ҫ�õ�shareCode
 * shareCodeΪ��Ҫ�����ĺ��ѵ�
 * ���нű�ʱ���Լ���shareCode���ڿ���̨���, ���Խ�����������
 */
async function slaveHelp() {
  //$.log(`\n��1.6�պ��������������ߡ�����ʱ����\n`)
  //return
  let helpPeoples = '';
  for (let code of newShareCodes) {
    console.log(`��ʼ���������˺�${$.index} - ${$.nickName}�ĺ���: ${code}`);
    if (!code) continue;
    let response = await request(arguments.callee.name.toString(), {'shareCode': code});
    if (response.code === '0' && response.resultCode === '0') {
      if (response.result.helpStatus === 0) {
        console.log('�Ѹ�����: ��' + response.result.masterNickName + '�������ɹ�');
        helpPeoples += response.result.masterNickName + '��';
      } else if (response.result.helpStatus === 1) {
        // ������������������
        console.log(`��������${response.result.masterNickName}ʧ�ܣ�������������������`);
        break;
      } else if (response.result.helpStatus === 2) {
        //�ú�������5���������������ٴ�����
        console.log(`�ú���${response.result.masterNickName}����5���������������ٴ�����`);
      } else {
        console.log(`�������������${JSON.stringify(response)}`);
      }
    } else {
      console.log(`�������ѽ��: ${response.message}`);
    }
  }
  if (helpPeoples && helpPeoples.length > 0) {
    message += `���������ĺ��ѡ�${helpPeoples.substr(0, helpPeoples.length - 1)}\n`;
  }
}
// �޹�, ÿ���������10��, ���������, ÿ���޹����������getSportReward��ȡ����, ���ܽ�����һ���޹�
async function petSport() {
  console.log('��ʼ����');
  let times = 1
  const code = 0
  let resultCode = 0
  do {
    let response = await request(arguments.callee.name.toString())
    console.log(`��${times}���޹����: ${JSON.stringify(response)}`);
    resultCode = response.resultCode;
    if (resultCode == 0) {
      let sportRevardResult = await request('getSportReward');
      console.log(`��ȡ�޹��������: ${JSON.stringify(sportRevardResult)}`);
    }
    times++;
  } while (resultCode == 0 && code == 0)
  if (times > 1) {
    // message += '��ʮ���޹��������\n';
  }
}
// ��ʼ������, �ɲ�ѯ����������
async function taskInit() {
  console.log('��ʼ�����ʼ��');
  $.taskInit = await request(arguments.callee.name.toString(), {"version":1});
}
// ÿ��ǩ��, ÿ��һ��
async function signInitFun() {
  console.log('׼��ÿ��ǩ��');
  const response = await request("getSignReward");
  console.log(`ÿ��ǩ�����: ${JSON.stringify(response)}`);
  if (response.code === '0' && response.resultCode === '0') {
    console.log(`��ÿ��ǩ���ɹ�������${response.result.signReward}g����\n`);
    // message += `��ÿ��ǩ���ɹ�������${response.result.signReward}g����\n`;
  } else {
    console.log(`��ÿ��ǩ����${response.message}\n`);
    // message += `��ÿ��ǩ����${response.message}\n`;
  }
}

// ����ǩ��, ÿ������ǩ��ʱ��
async function threeMealInitFun() {
  console.log('׼������ǩ��');
  const response = await request("getThreeMealReward");
  console.log(`����ǩ�����: ${JSON.stringify(response)}`);
  if (response.code === '0' && response.resultCode === '0') {
    console.log(`����ʱ�칷�������${response.result.threeMealReward}g\n`);
    // message += `����ʱ�칷�������${response.result.threeMealReward}g\n`;
  } else {
    console.log(`����ʱ�칷����${response.message}\n`);
    // message += `����ʱ�칷����${response.message}\n`;
  }
}

// ���ָ������ ����
async function browseSingleShopInit(item) {
  console.log(`��ʼ�� ${item.title} ���� ${item.desc}`);
  const body = {"index": item['index'], "version":1, "type":1};
  const body2 = {"index": item['index'], "version":1, "type":2};
  const response = await request("getSingleShopReward", body);
  // console.log(`�����ȥresponse::${JSON.stringify(response)}`);
  if (response.code === '0' && response.resultCode === '0') {
    const response2 = await request("getSingleShopReward", body2);
    // console.log(`��������ȡ����:response2::${JSON.stringify(response2)}`);
    if (response2.code === '0' && response2.resultCode === '0') {
      console.log(`�����ָ�����̡���ȡ${response2.result.reward}g\n`);
      // message += `�����ָ�����̡���ȡ${response2.result.reward}g\n`;
    }
  }
}

// �����������, �������Ϊ���? Ŀǰֻ��һ��
async function browseShopsInitFun() {
  console.log('��ʼ�����������');
  let times = 0;
  let resultCode = 0;
  let code = 0;
  do {
    let response = await request("getBrowseShopsReward");
    console.log(`��${times}��������̽��: ${JSON.stringify(response)}`);
    code = response.code;
    resultCode = response.resultCode;
    times++;
  } while (resultCode == 0 && code == 0 && times < 5)
  console.log('��������������');
}
// �״�Ͷʳ ����
function firstFeedInitFun() {
  console.log('�״�Ͷʳ����ϲ���10��ιʳ������\n');
}

// �������û�
async function inviteFriendsInitFun() {
  console.log('�������û�����δʵ��');
  if ($.taskInfo.inviteFriendsInit.status == 1 && $.taskInfo.inviteFriendsInit.inviteFriendsNum > 0) {
    // �������������û�,�Զ���ȡ60gg����
    const res = await request('getInviteFriendsReward');
    if (res.code == 0 && res.resultCode == 0) {
      console.log(`��ȡ�������û������ɹ�,��ù������й���${$.taskInfo.inviteFriendsInit.reward}g��${res.result.foodAmount}g`);
      message += `���������û�����ȡ����${$.taskInfo.inviteFriendsInit.reward}g\n`;
    }
  }
}

/**
 * Ͷʳ10�� ����
 */
async function feedReachInitFun() {
  console.log('Ͷʳ����ʼ...');
  let finishedTimes = $.taskInfo.feedReachInit.hadFeedAmount / 10; //�Ѿ�ι���˼���
  let needFeedTimes = 10 - finishedTimes; //����Ҫ����
  let tryTimes = 20; //���Դ���
  do {
    console.log(`����ҪͶʳ${needFeedTimes}��`);
    const response = await request('feedPets');
    console.log(`����Ͷʳ���: ${JSON.stringify(response)}`);
    if (response.resultCode == 0 && response.code == 0) {
      needFeedTimes--;
    }
    if (response.resultCode == 3003 && response.code == 0) {
      console.log('ʣ�๷������, Ͷʳ����');
      needFeedTimes = 0;
    }
    tryTimes--;
  } while (needFeedTimes > 0 && tryTimes > 0)
  console.log('Ͷʳ�������...\n');
}
async function showMsg() {
  let ctrTemp;
  if ($.isNode() && process.env.PET_NOTIFY_CONTROL) {
    ctrTemp = `${process.env.PET_NOTIFY_CONTROL}` === 'false';
  } else if ($.getdata('jdPetNotify')) {
    ctrTemp = $.getdata('jdPetNotify') === 'false';
  } else {
    ctrTemp = `${jdNotify}` === 'false';
  }
  // jdNotify = `${notify.petNotifyControl}` === 'false' && `${jdNotify}` === 'false' && $.getdata('jdPetNotify') === 'false';
  if (ctrTemp) {
    $.msg($.name, subTitle, message, option);
    if ($.isNode()) {
      await notify.sendNotify(`${$.name} - �˺�${$.index} - ${$.nickName}`, `${subTitle}\n${message}`);
    }
  } else {
    $.log(`\n${message}\n`);
  }
}
function readShareCode() {
  return new Promise(async resolve => {
    $.get({url: `http://jd.turinglabs.net/api/v2/jd/pet/read/${randomCount}/`, 'timeout': 10000}, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API����ʧ�ܣ�������·����`)
        } else {
          if (data) {
            console.log(`���ȡ��${randomCount}��ŵ����̶��Ļ��������(��Ӱ�����й̶�����)`)
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
function shareCodesFormat() {
  return new Promise(async resolve => {
    // console.log(`��${$.index}�������˺ŵ�������:::${jdPetShareArr[$.index - 1]}`)
    newShareCodes = [];
    if (jdPetShareArr[$.index - 1]) {
      newShareCodes = jdPetShareArr[$.index - 1].split('@');
    } else {
      console.log(`��������${$.index}�������˺�δ�ṩshareCode,�����ɱ��ű��Դ���������\n`)
      const tempIndex = $.index > shareCodes.length ? (shareCodes.length - 1) : ($.index - 1);
      newShareCodes = shareCodes[tempIndex].split('@');
    }
    //����������������ߡ�����ʱ����
    const readShareCodeRes = await readShareCode();
    //const readShareCodeRes = null;
    if (readShareCodeRes && readShareCodeRes.code === 200) {
      newShareCodes = [...new Set([...newShareCodes, ...(readShareCodeRes.data || [])])];
    }
    console.log(`��${$.index}�������˺Ž�Ҫ�����ĺ���${JSON.stringify(newShareCodes)}`)
    resolve();
  })
}
function requireConfig() {
  return new Promise(resolve => {
    console.log('��ʼ��ȡ�����ȳ������ļ�\n')
    notify = $.isNode() ? require('./sendNotify') : '';
    //Node.js�û�����jdCookie.js����д����ck;
    const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
    const jdPetShareCodes = $.isNode() ? require('./jdPetShareCodes.js') : '';
    //IOS���û�ֱ����NobyDa��jd cookie
    if ($.isNode()) {
      Object.keys(jdCookieNode).forEach((item) => {
        if (jdCookieNode[item]) {
          cookiesArr.push(jdCookieNode[item])
        }
      })
      if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
    } else {
      cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
    }
    console.log(`��${cookiesArr.length}�������˺�\n`)
    if ($.isNode()) {
      Object.keys(jdPetShareCodes).forEach((item) => {
        if (jdPetShareCodes[item]) {
          jdPetShareArr.push(jdPetShareCodes[item])
        }
      })
    } else {
      const boxShareCodeArr = ['jd_pet1', 'jd_pet2', 'jd_pet3', 'jd_pet4', 'jd_pet5'];
      const boxShareCodeArr2 = ['jd2_pet1', 'jd2_pet2', 'jd2_pet3', 'jd2_pet4', 'jd2_pet5'];
      const isBox1 = boxShareCodeArr.some((item) => {
        const boxShareCode = $.getdata(item);
        return (boxShareCode !== undefined && boxShareCode !== null && boxShareCode !== '');
      });
      const isBox2 = boxShareCodeArr2.some((item) => {
        const boxShareCode = $.getdata(item);
        return (boxShareCode !== undefined && boxShareCode !== null && boxShareCode !== '');
      });
      isBox = isBox1 ? isBox1 : isBox2;
      if (isBox1) {
        let temp = [];
        for (const item of boxShareCodeArr) {
          if ($.getdata(item)) {
            temp.push($.getdata(item))
          }
        }
        jdPetShareArr.push(temp.join('@'));
      }
      if (isBox2) {
        let temp = [];
        for (const item of boxShareCodeArr2) {
          if ($.getdata(item)) {
            temp.push($.getdata(item))
          }
        }
        jdPetShareArr.push(temp.join('@'));
      }
    }
    // console.log(`jdPetShareArr::${JSON.stringify(jdPetShareArr)}`)
    // console.log(`jdPetShareArr�˺ų���::${jdPetShareArr.length}`)
    console.log(`���ṩ��${jdPetShareArr.length}���˺ŵĶ����ȳ�������\n`);
    resolve()
  })
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
      }
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
// ����
async function request(function_id, body = {}) {
  await $.wait(3000); //Ъ������, ��Ȼ�ᱨ����Ƶ��
  return new Promise((resolve, reject) => {
    $.post(taskUrl(function_id, body), (err, resp, data) => {
      try {
        if (err) {
          console.log('\n�����ȳ�: API��ѯ����ʧ�� ????');
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          data = JSON.parse(data);
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve(data)
      }
    })
  })
}
// function taskUrl(function_id, body = {}) {
//   return {
//     url: `${JD_API_HOST}?functionId=${function_id}&appid=wh5&loginWQBiz=pet-town&body=${escape(JSON.stringify(body))}`,
//     headers: {
//       Cookie: cookie,
//       UserAgent: $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0"),
//     }
//   };
// }
function taskUrl(function_id, body = {}) {
  body["version"] = 2;
  body["channel"] = 'app';
  return {
    url: `${JD_API_HOST}?functionId=${function_id}`,
    body: `body=${escape(JSON.stringify(body))}&appid=wh5&loginWQBiz=pet-town&clientVersion=9.0.4`,
    headers: {
      'Cookie': cookie,
      'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.2.2;14.2;%E4%BA%AC%E4%B8%9C/9.2.2 CFNetwork/1206 Darwin/20.1.0"),
      'Host': 'api.m.jd.com',
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  };
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
