/**
*
    Name: ��ϲ�Ƹ���
    Address: ��ϲApp ====>>>> ȫ��׬��Ǯ
    Update: 2021/1/13 10:30
    Thanks:
      whyour����
      TG: https://t.me/joinchat/O1WgnBbM18YjQQVFQ_D86w
      GitHub: https://github.com/whyour

      ���û�ǩ�����ⷴ���ߣ�https://github.com/NanjolnoRing

    ��ȡToken��ʽ��
      �򿪡�??��ϲũ��??�����ֶ��������<��������>��<ǩ������>��<���Ƴ�������>һ���ʾ��ȡcookie�ɹ����ɣ�Ȼ���˳�������ű�

    ??????Ѱ����������: ����app����������ʹ��������ʽ��ȡToken����

    hostname = wq.jd.com

    Quantumult X:
    [task_local]
    0 * * * * https://raw.githubusercontent.com/MoPoQAQ/Script/main/Me/jx_cfd.js, tag=��ϲ�Ƹ���, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jxcfd.png, enabled=true
    [rewrite_local]
    ^https\:\/\/wq\.jd\.com\/cubeactive\/farm\/dotask url script-request-header https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_nc.cookie.js

    Loon:
    [Script]
    http-request ^https\:\/\/wq\.jd\.com\/cubeactive\/farm\/dotask script-path=https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_nc.cookie.js, requires-body=false, timeout=10, tag=��ϲũ��cookie
    cron "0 * * * *" script-path=https://raw.githubusercontent.com/MoPoQAQ/Script/main/Me/jx_cfd.js,tag=��ϲ�Ƹ���

    Surge:
    ��ϲ�Ƹ��� = type=cron,cronexp="0 * * * *",wake-system=1,timeout=20,script-path=https://raw.githubusercontent.com/MoPoQAQ/Script/main/Me/jx_cfd.js
    ��ϲũ��cookie = type=http-request,pattern=^https\:\/\/wq\.jd\.com\/cubeactive\/farm\/dotask,requires-body=0,max-size=0,script-path=https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_nc.cookie.js

    Shadowrocket:
    [Script]
    ��ϲ�Ƹ��� = type=cron,script-path=https://raw.githubusercontent.com/MoPoQAQ/Script/main/Me/jx_cfd.js,cronexpr="0 * * * *",timeout=120,enable=true
    ��ϲũ��Cookie = type=http-request,script-path=https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_nc.cookie.js,pattern=^https\:\/\/wq\.jd\.com\/cubeactive\/farm\/dotask,max-size=131072,timeout=10,enable=true

    BoxJS����
    https://raw.githubusercontent.com/whyour/hundun/master/quanx/whyour.boxjs.json

    Docker��
      1.�ϴ�jx_cfd.js�ļ���scripts�ļ�����

      2.�޸�������������

      ################################## �Ƿ����DIY�ű���ѡ� ##################################
      ## ������Լ���дshell�ű�������ϣ����ÿ��git_pull.sh����ű�����ʱ�������������DIY�ű����븳ֵΪ "true"
      ## ͬʱ������ؽ���Ľű�����Ϊ diy.sh (ֻ�ܽ�����ļ���)������ config Ŀ¼��
      ## ���Ѷ���õı������������ֱ��ʹ�ã����Բο����ֿ��� git_pull.sh �ļ�
      EnableExtraShell="true"

      ################################## ���復ϲũ��TOKEN��ѡ� ##################################
      ## ���ĳ��Cookie���˺���ֲ����app���ӣ������������Ч��TOKEN������ֲ��app��������ҪTOKEN
      ## TOKEN����ʽ��{"farm_jstoken":"749a90f871adsfads8ffda7bf3b1576760","timestamp":"1610165423873","phoneid":"42c7e3dadfadsfdsaac-18f0e4f4a0cf"}
      ## ��TOKEN�д���˫���ţ���ˣ�����ֵ���������һ�Ե�����������
      ## TOKEN��λ�ȡ���Ķ������ļ���ע�ͣ�https://github.com/lxk0301/jd_scripts/blob/master/jd_jxnc.js
      TokenJxnc1='{"farm_jstoken":"xxx","phoneid":"xxx","timestamp":"xxx"}'
      TokenJxnc2=''
      TokenJxnc3=''
      TokenJxnc4=''
      TokenJxnc5=''
      TokenJxnc6=''

      Docker֪ͨ���ͣ�
      ################################## ��ϲ�Ƹ����Ƿ�Ĭ���� ##################################
      ## Ĭ��Ϊ "false"����Ĭ������������֪ͨ��Ϣ�������յ�֪ͨ�����޸�Ϊ "true"
      ## ����㲻����ȫ�رջ�����ȫ����֪ͨ��ֻ�����ض���ʱ�䷢��֪ͨ�����Բο�������ġ����嶫���ȳ��Ƿ�Ĭ���С����֣��趨����if�ж�����
      export CFD_NOTIFY_CONTROL=""
*
**/

const $ = new Env("��ϲ�Ƹ���");
const JD_API_HOST = "https://m.jingxi.com/";
const notify = $.isNode() ? require('./sendNotify') : '';
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
const jdTokenNode = $.isNode() ? require('./jdJxncTokens.js') : '';
$.showLog = $.getdata("cfd_showLog") ? $.getdata("cfd_showLog") === "true" : false;
$.notifyTime = $.getdata("cfd_notifyTime");
$.result = [];
$.cookieArr = [];
$.currentCookie = '';
$.tokenArr = [];
$.currentToken = {};
$.allTask = [];
$.info = {};

!(async () => {
  if (!getCookies()) return;
  if (!getTokens()) return;
  for (let i = 0; i < $.cookieArr.length; i++) {
    $.currentCookie = $.cookieArr[i];
    $.currentToken = $.tokenArr[i];
    if ($.currentCookie) {
      $.userName = decodeURIComponent($.currentCookie.match(/pt_pin=(.+?);/) && $.currentCookie.match(/pt_pin=(.+?);/)[1]);
      $.index = i + 1;
      $.nickName = '';

      $.log(`\n��ʼ�������˺�${i + 1}��${$.userName}`);

      const beginInfo = await getUserInfo();

      await $.wait(500);
      await querySignList();

      await $.wait(500);
      await getMoney();

      //�ճ�����
      await $.wait(500);
      await getTaskList(0);
      await $.wait(500);
      await browserTask(0);

      //Ѱ��
      await $.wait(500);
      await treasureHunt();

      //͵�Ƹ�
      await $.wait(500);
      await friendCircle();

      //�ɾ�����
      await $.wait(500);
      await getTaskList(1);
      await $.wait(500);
      await browserTask(1);

      //�齱
      await $.wait(500);
      await funCenterState();

      //��ȡѰ������
      await $.wait(500);
      await openPeriodBox();

      const endInfo = await getUserInfo();
      $.result.push(
        `��?�Ƹ�ֵ������ǰ: ${beginInfo.ddwMoney}\n��?�Ƹ�ֵ�������: ${endInfo.ddwMoney}`,
        `��?�Ƹ�ֵ������ֵ: ${endInfo.ddwMoney - beginInfo.ddwMoney}`
      );

      //����Ѱ������ս
      await $.wait(500);
      await submitGroupId();
      await $.wait(500);
      await joinGroup();
      //�ύ������
      await $.wait(500);
      await submitInviteId($.userName);
      //��������
      await $.wait(500);
      await createSuperAssistUser();
      //��ͨ����
      await $.wait(500);
      await createAssistUser();
    }
  }
  await $.wait(500);
  await showMsg();
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done());


function getUserInfo() {
  return new Promise(async (resolve) => {
    $.get(taskUrl(`user/QueryUserInfo`), (err, resp, data) => {
      try {
        const {
          iret,
          SceneList = {},
          XbStatus: { XBDetail = [], dwXBRemainCnt } = {},
          ddwMoney,
          dwIsNewUser,
          sErrMsg,
          strMyShareId,
          strPin,
        } = JSON.parse(data);
        $.log(`\n��ȡ�û���Ϣ��${sErrMsg}\n${$.showLog ? data : ""}`);
        $.info = {
          ...$.info,
          SceneList,
          XBDetail,
          dwXBRemainCnt,
          ddwMoney,
          dwIsNewUser,
          strMyShareId,
          strPin,
        };
        resolve({
          SceneList,
          XBDetail,
          dwXBRemainCnt,
          ddwMoney,
          dwIsNewUser,
          strMyShareId,
          strPin,
        });
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

//ǩ���б�
function querySignList() {
  return new Promise(async (resolve) => {
    $.get(taskUrl(`task/QuerySignListV2`), async (err, resp, data) => {
      try {
        const { iRet, sData: { Sign = [{}], dwUserFlag }, sErrMsg } = JSON.parse(data);
        $.log(`\nǩ���б�${sErrMsg}\n${$.showLog ? data : ""}`);
        const [{ dwStatus, ddwMoney }] = Sign.filter(x => x.dwShowFlag === 1);
        if (dwStatus === 0) {
          await userSignReward(dwUserFlag, ddwMoney);
        } else {
          $.log(`\n?ǩ�����������ǩ������������������`);
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

//ǩ��
async function userSignReward(dwUserFlag,ddwMoney) {
  return new Promise(async (resolve) => {
    $.get(
      taskUrl(
        `task/UserSignRewardV2`,
        `dwReqUserFlag=${dwUserFlag}&ddwMoney=${ddwMoney}`
      ),
      async (err, resp, data) => {
        try {
          //$.log(data)
          const { iRet, sData: { ddwMoney }, sErrMsg } = JSON.parse(data);
          $.log(`\n?ǩ����${sErrMsg}����òƸ� ? ${ddwMoney || 0}\n${$.showLog ? data : ""}`);
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve();
        }
      }
    );
  });
}

//��ȡ�Ƹ�ֵ
//dwSource=[1,2,3]  1:�����Բ��Ƹ� 2:��ͨ�����Ƹ� 3:���������Ƹ�
function getMoney() {
  return new Promise(async (resolve) => {
    const sceneList = $.info.SceneList;
    for (var _key of Object.keys($.info.SceneList)) {
      try {
        //��ȡ�Բ��Ƹ�
        await $.wait(500);
        await getMoney_dwSource_1( _key, sceneList );
        //��ȡ��ͨ�����ĲƸ�
        const employeeList = eval('('+ JSON.stringify(sceneList[_key].EmployeeList) +')');
        if(employeeList !== ""){
          for( var key of Object.keys(employeeList) ) {
            await $.wait(500);
            await getMoney_dwSource_2( _key, sceneList, key );
          }
        }
        //��ȡ���������Ƹ�
        await $.wait(500);
        await getMoney_dwSource_3( _key, sceneList );
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    }
  });
}

//��ȡ�Բ��Ƹ�
function getMoney_dwSource_1( _key, sceneList ) {
  return new Promise(async (resolve) => {
    $.get(
      taskUrl(`user/GetMoney`,`dwSceneId=${_key}&strEmployeeId=undefined&dwSource=1`),
      async (err, resp, data) => {
        try {
          const { iRet, dwMoney, sErrMsg } = JSON.parse(data);
          $.log(`\n��${sceneList[_key].strSceneName}��?���� : ${ sErrMsg == 'success' ? `��ȡ�Ƹ�ֵ��? ${dwMoney || 0}` : sErrMsg } \n${$.showLog ? data : ""}`);
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve();
        }
      }
    );
  });
}

//��ȡ��ͨ�����ĲƸ�
function getMoney_dwSource_2( _key, sceneList, key ) {
  return new Promise(async (resolve) => {
    $.get(
      taskUrl(`user/GetMoney`, `dwSceneId=${_key}&strEmployeeId=${key}&dwSource=2`),
      async (err, resp, data) => {
        try {
          const { dwMoney, iRet, sErrMsg, strPin } = JSON.parse(data);
          $.log(`\n��${sceneList[_key].strSceneName}��?����: ${ sErrMsg == 'success' ? `��ȡ��ͨ�����Ƹ�ֵ��? ${dwMoney || 0}` : sErrMsg } \n${$.showLog ? data : ""}`);
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve();
        }
      }
    );
  });
}

//��ȡ���������Ƹ�
function getMoney_dwSource_3( _key, sceneList ) {
  return new Promise(async (resolve) => {
    $.get(
      taskUrl(`user/GetMoney`,`dwSceneId=${_key}&strEmployeeId=&dwSource=3&strPgtimestamp=${$.currentToken['timestamp']}&strPhoneID=${$.currentToken['phoneid']}&strPgUUNum=${$.currentToken['farm_jstoken']}`),
      async (err, resp, data) => {
        try {
          const { iRet, dwMoney, sErrMsg, strPin } = JSON.parse(data);
          $.log(`\n��${sceneList[_key].strSceneName}��?����: ${ sErrMsg == 'success' ? `��ȡ���������Ƹ�ֵ��? ${dwMoney || 0}` : sErrMsg } \n${$.showLog ? data : ""}`);
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve();
        }
      }
    );
  });
}

//����Ȧ͵�Ƹ�
function friendCircle() {
  return new Promise(async (resolve) => {
    $.get(taskUrl(`user/FriendCircle`, `dwPageIndex=1&dwPageSize=20`), async(err, resp, data) => {
      try {
        //$.log(`\n����Ȧ�б�\n${data}`);
        const {MomentList = [],iRet,sErrMsg,strShareId} = JSON.parse(data);
        for (moment of MomentList) {
          if (moment.strShareId !== strShareId && moment.dwAccessMoney > 0) {
            await queryFriendIsland(moment.strShareId);
            await $.wait(500);
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

//��ȡ������Ϣ
function queryFriendIsland(strShareId,){
  return new Promise(async (resolve) => {
    $.get(taskUrl(`user/QueryFriendIsland`, `strShareId=${strShareId}&sceneval=2`),
      async(err, resp, data) => {
        try {
          //$.log(`\n��ȡ������Ϣ\n${data}`);
          const {SceneList = {},dwStealMoney,sErrMsg,strFriendNick} = JSON.parse(data);
          if (sErrMsg === "success") {
            const sceneList = eval('(' + JSON.stringify(SceneList) + ')');
            const sceneIds = Object.keys(SceneList);
            for (sceneId of sceneIds) {
              await stealMoney(strShareId,sceneId,strFriendNick,sceneList[sceneId].strSceneName);
              await $.wait(500);
            }
          }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve();
        }
    });
  });
}

//͵�Ƹ�
function stealMoney(strShareId, sceneId, strFriendNick, strSceneName){
  return new Promise(async (resolve) =>{
    $.get(taskUrl(`user/StealMoney`, `strFriendId=${strShareId}&dwSceneId=${sceneId}&sceneval=2`), async(err, resp, data) => {
      try {
        //$.log(data);
        const {dwGetMoney,iRet,sErrMsg} = JSON.parse(data);
        $.log(`\n?͵ȡ���ѡ�${strFriendNick}����${strSceneName}���Ƹ�ֵ��? ${dwGetMoney ? dwGetMoney : sErrMsg}\n${$.showLog ? data: ""}`);
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

//Ѱ��
async function treasureHunt() {
  if($.info.dwXBRemainCnt > 0) {
    const xbDetail = $.info.XBDetail;
    for (let i = 0; i < xbDetail.length; i++) {
      const { ddwColdEndTm, strIndex }= xbDetail[i];
      const currentTm = Math.round(new Date() / 1000);
      if( currentTm > ddwColdEndTm ) {
        await doTreasureHunt(strIndex);
        await $.wait(3000);
      } else {
        $.log(`\n?Ѱ����������ȴ�У���ȴ���ȴ���`);
      }
    }
  } else {
    $.log(`\n?Ѱ����Ѱ����������`);
  }
}

function doTreasureHunt(place) {
  return new Promise(async (resolve) => {
    $.get(
      taskUrl(`consume/TreasureHunt`, `strIndex=${place}&dwIsShare=0`),
      async (err, resp, data) => {
        try {
          //$.log(data);
          const { iRet, dwExpericnce, sErrMsg } = JSON.parse(data);
          $.log(`\n��${place}��?Ѱ����${sErrMsg} ����ȡ���������? ${dwExpericnce || 0} \n${$.showLog ? data : ""}`);
          resolve(iRet)
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve();
        }
      }
    );
  });
}

//����׬�Ƹ�
function getTaskList(taskType) {
  return new Promise(async (resolve) => {
    switch (taskType){
      case 0: //�ճ�����
        $.get(taskListUrl("GetUserTaskStatusList"), async (err, resp, data) => {
          try {
            const { ret, data: { userTaskStatusList = [] } = {}, msg } = JSON.parse(data);
            $.allTask = userTaskStatusList.filter((x) => x.awardStatus !== 1);
            $.log(`\n��ȡ��?�ճ������б� ${msg}���ܹ�${$.allTask.length}������\n${$.showLog ? data : ""}`);
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve();
          }
        });
        break;
      case 1: //�ɾ�����
        $.get(taskUrl("consume/AchieveInfo"), async (err, resp, data) => {
          try{
            const { iRet, sErrMsg, taskinfo = [] } = JSON.parse(data);
            $.allTask = taskinfo.filter((x) => x.dwAwardStatus === 1);
            $.log(`\n��ȡ��?�ɾ������б� ${sErrMsg}���ܹ�${$.allTask.length}������\n${$.showLog ? data : ""}`);
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve();
          }
        });
        break;
      default:
        break;
    }
  });
}

//������� + ������ + ��ȡ����
function browserTask(taskType) {
  return new Promise(async (resolve) => {
    switch (taskType) {
      case 0://�ճ�����
        const times = Math.max(...[...$.allTask].map((x) => x.configTargetTimes));
        for (let i = 0; i < $.allTask.length; i++) {
          const taskinfo = $.allTask[i];
          $.log(`\n��ʼ��${i + 1}����?�ճ����񡿣�${taskinfo.taskName}`);
          const status = [true, true];
          for (let i = 0; i < times; i++) {
            await $.wait(500);
            if (status[0]) {
              //������
              status[0] = await doTask(taskinfo);
            }
            await $.wait(500);
            if (status[1]) {
              //��ȡ����
              status[1] = await awardTask(0, taskinfo);
            }
            if (!status[0] && !status[1]) {
              break;
            }
          }
          $.log(`\n������${i + 1}����?�ճ����񡿣�${taskinfo.taskName}\n`);
        }
        break;
      case 1://�ɾ�����
        for (let i = 0; i < $.allTask.length; i++) {
          const taskinfo = $.allTask[i];
          $.log(`\n��ʼ��${i + 1}����?�ɾ����񡿣�${taskinfo.strTaskDescr}`);
          if(taskinfo.dwAwardStatus === "0"){
            $.log(`\n${taskinfo.strTaskDescr}����ɾͽ��������óɾ�����δ�ﵽ�ż�}`);
          } else {
            await $.wait(500);
            //�콱��
            await awardTask(1, taskinfo);
          }
          $.log(`\n������${i + 1}����?�ɾ����񡿣�${taskinfo.strTaskDescr}\n`);
        }
        break;
      default:
        break;
    }
    resolve();
  });
}

//������
function doTask(taskinfo) {
  return new Promise(async (resolve) => {
    const { taskId, completedTimes, configTargetTimes, taskName } = taskinfo;
    if (parseInt(completedTimes) >= parseInt(configTargetTimes)) {
      resolve(false);
      $.log(`\n${taskName}�����ճ����񡿣� mission success`);
      return;
    }
    $.get(taskListUrl(`DoTask`, `taskId=${taskId}`), (err, resp, data) => {
      try {
        //$.log(`taskId:${taskId},data:${data}`);
        const { msg, ret } = JSON.parse(data);
        $.log(`\n${taskName}�����ճ����񡿣�${msg.indexOf("�̫����") !== -1 ? "��������л���δ������ʱ��" : msg }\n${$.showLog ? data : ""}`);
        resolve(ret === 0);
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

//��ȡ����
function awardTask( taskType, taskinfo) {
  return new Promise((resolve) => {
    switch (taskType) {
      case 0://�ճ�����
        const { taskId, taskName } = taskinfo;
        $.get(taskListUrl(`Award`, `taskId=${taskId}`), (err, resp, data) => {
          try {
            const { msg, ret, data: { prizeInfo = '' } = {} } = JSON.parse(data);
            let str = '';
            if (msg.indexOf('�̫����') !== -1) {
              str = '����Ϊ�ɾ��������δ������ʱ��';
            } else {
              str = msg + prizeInfo ? ` ��òƸ�ֵ ? ${JSON.parse(prizeInfo).ddwMoney}` : '';
            }
            $.log(`\n${taskName}�����ճ���������${str}\n${$.showLog ? data : ''}`);
            resolve(ret === 0);
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve();
          }
        });
        break
      case 1://�ɾͽ���
        const { strTaskIndex, strTaskDescr } = taskinfo;
        $.get(taskUrl(`consume/AchieveAward`, `strTaskIndex=${strTaskIndex}`), (err, resp, data) => {
          try {
            const { iRet, sErrMsg, dwExpericnce } = JSON.parse(data);
            $.log(`\n${strTaskDescr}����ɾͽ������� success ��òƸ�ֵ��? ${dwExpericnce}\n${ $.showLog ? data : '' }`);
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve();
          }
        });
        break
      default:
        break
    }
  });
}

//��������
function funCenterState() {
  return new Promise(resolve => {
    $.get(taskUrl(`consume/FunCenterState`, `strType=1`), async(err, resp, data) => {
      try {
        const {  SlotMachine: { ddwConfVersion, dwFreeCount, strCouponPool, strGoodsPool } = {}, iRet, sErrMsg } = JSON.parse(data);
        if(dwFreeCount == 1) {
          await $.wait(500);
          await soltMachine(strCouponPool,strGoodsPool,ddwConfVersion);
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

//�齱��
function soltMachine(strCouponPool,strGoodsPool,ddwConfVersion) {
  return new Promise(resolve => {
    $.get(taskUrl(`consume/SlotMachine`,`strCouponPool=${strCouponPool}&strGoodsPool=${strGoodsPool}&ddwConfVersion=${ddwConfVersion}`), async(err, resp, data) => {
      try {
        const { iRet, sErrMsg, strAwardPoolName } = JSON.parse(data);
        $.log(`\n���齱�����? ${strAwardPoolName != "" ? "δ�н�" : strAwardPoolName} \n${ $.showLog ? data : '' }`);
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

//�ύ������
function submitInviteId(userName) {
  return new Promise(resolve => {
    if (!$.info || !$.info.strMyShareId) {
      resolve();
      return;
    }
    $.log('\n��?��������Ļ�����: ' + $.info.strMyShareId);
    $.post(
      {
        url: `https://api.ninesix.cc/api/jx-cfd/${$.info.strMyShareId}/${encodeURIComponent(userName)}`,
      },
      async (err, resp, _data) => {
        try {
          const { data = {}, code } = JSON.parse(_data);
          $.log(`\n��?�������������ύ��${code}\n${$.showLog ? _data : ''}`);
          if (data.value) {
            $.result.push('��?�������������ύ�ɹ���');
          }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve();
        }
      },
    );
  });
}

//���������������
function createSuperAssistUser() {
  return new Promise(resolve => {
    const sceneIds = Object.keys($.info.SceneList);
    const sceneId = Math.min(...sceneIds);
    $.get({ url: 'https://api.ninesix.cc/api/jx-cfd' }, async (err, resp, _data) => {
      try {
        const { data = {} } = JSON.parse(_data);
        $.log(`\n��??�������������������룺${data.value}\n${$.showLog ? _data : ''}`);
        $.get(taskUrl('user/JoinScene', `strPgtimestamp=${$.currentToken['timestamp']}&strPhoneID=${$.currentToken['phoneid']}&strPgUUNum=${$.currentToken['farm_jstoken']}&strShareId=${escape(data.value)}&dwSceneId=${sceneId}&dwType=2`), async (err, resp, data) => {
          try {
            const { sErrMsg, data: { rewardMoney = 0 } = {} } = JSON.parse(data);
            $.log(`\n��??��������������������${sErrMsg}\n${$.showLog ? data : ''}`);
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve();
          }
        });
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

//�����������
function createAssistUser() {
  return new Promise(resolve => {
    const sceneIds = Object.keys($.info.SceneList);
    const sceneId = Math.min(...sceneIds);
    $.get({ url: 'https://api.ninesix.cc/api/jx-cfd' }, async (err, resp, _data) => {
      try {
        const { data = {} } = JSON.parse(_data);
        $.log(`\n��?��ͨ��������ͨ�����룺${data.value}\n${$.showLog ? _data : ''}`);
        $.get(taskUrl('user/JoinScene', `strShareId=${escape(data.value)}&dwSceneId=${sceneId}`), async (err, resp, data) => {
          try {
            const { sErrMsg, data: { rewardMoney = 0 } = {} } = JSON.parse(data);
            $.log(`\n��?��ͨ������������${sErrMsg}\n${$.showLog ? data : ''}`);
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve();
          }
        });
      } catch (e) {
        $.logErr(e, resp);
      } finally {
      	resolve();
      }
    });
  });
}

//�ύ������
function submitGroupId() {
  return new Promise(resolve => {
    $.get(taskUrl(`user/GatherForture`), async (err, resp, g_data) => {
      try {
        const { GroupInfo:{ strGroupId }, strPin } = JSON.parse(g_data);
        if(!strGroupId) {
          const status = await openGroup();
          if(status === 0) {
            await submitGroupId();
          } else {
            resolve();
            return;
          }
        } else {
          $.log('��ġ�?Ѱ������ս��������: ' + strGroupId);
          $.post(
            {url: `https://api.ninesix.cc/api/jx-cfd-group/${strGroupId}/${encodeURIComponent(strPin)}`},
            async (err, resp, _data) => {
              try {
                const { data = {}, code } = JSON.parse(_data);
                $.log(`\n��?Ѱ������ս���������ύ��${code}\n${$.showLog ? _data : ''}`);
                if (data.value) {
                  $.result.push('��?Ѱ������ս���������ύ�ɹ���');
                }
              } catch (e) {
                $.logErr(e, resp);
              } finally {
                resolve();
              }
            }
          );
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

//����Ѱ������ս
function openGroup() {
  return new Promise( async (resolve) => {
    $.get(taskUrl(`user/OpenGroup`, `dwIsNewUser=${$.info.dwIsNewUser}`), async (err, resp, data) => {
      try {
        const { sErrMsg } = JSON.parse(data);
        $.log(`\n��?Ѱ������ս��${sErrMsg}\n${$.showLog ? data : ''}`);
        resolve(0);
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

//��������Ѱ������ս
function joinGroup() {
  return new Promise( async (resolve) => {
    $.get({ url: 'https://api.ninesix.cc/api/jx-cfd-group' }, (err, resp, _data) => {
      try {
        const { data = {} } = JSON.parse(_data);
        $.log(`\n��?Ѱ������ս����������룺${data.value}\n${$.showLog ? _data : ''}`);
        $.get(taskUrl(`user/JoinGroup`, `strGroupId=${data.value}&dwIsNewUser=${$.info.dwIsNewUser}&pgtimestamp=${$.currentToken['timestamp']}&phoneID=${$.currentToken['phoneid']}&pgUUNum=${$.currentToken['farm_jstoken']}`), (err, resp, data) => {
          try {
            const { sErrMsg } = JSON.parse(data);
            $.log(`\n��?Ѱ������ս��������${sErrMsg}\n${$.showLog ? data : ''}`);
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve();
          }
        });
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

//Ѱ������ս������
function openPeriodBox() {
  return new Promise( async (resolve) => {
    $.get(taskUrl(`user/GatherForture`), async (err, resp, data) => {
      try {
        const { PeriodBox = [{}] } = JSON.parse(data);
        for (var i = 0; i < PeriodBox.length ; i++) {
          const { dwStatus, dwSeq, strBrandName } = PeriodBox[i];
          //1:δ������ 2:�ɿ��� 3:�ѿ���
          if (dwStatus == 2) {
            await $.wait(1000);
            await $.get(taskUrl(`user/OpenPeriodBox`, `dwSeq=${dwSeq}`), async (err, resp, data) => {
              try {
                const { dwMoney, iRet, sErrMsg } = JSON.parse(data)
                $.log(`\n��?Ѱ������ս����${strBrandName}�������䣺${sErrMsg == 'success' ? ` ��òƸ�ֵ ? ${dwMoney}` : sErrMsg }\n${$.showLog ? data : ''}`);
              } catch (e) {
                $.logErr(e, resp);
              } finally {
                resolve();
              }
            });
          } else if (dwStatus == 3) {
            $.log(`\n��?Ѱ������ս����${strBrandName}�������䣺�����ѿ�������`);
          } else {
            $.log(`\n��?Ѱ������ս����${strBrandName}�������䣺δ�ﵽ���俪����������ȥ������������ɣ�`);
            resolve();
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}

function getCookies() {
  if ($.isNode()) {
    $.cookieArr = Object.values(jdCookieNode);
  } else {
    $.cookieArr = [$.getdata("CookieJD") || "", $.getdata("CookieJD2") || ""];
  }
  if (!$.cookieArr[0]) {
    $.msg(
      $.name,
      "��?��ʾ�����Ȼ�ȡ�����˺�һcookie\nֱ��ʹ��NobyDa�ľ���ǩ����ȡ",
      "https://bean.m.jd.com/",
      { "open-url": "https://bean.m.jd.com/", }
    );
    return false;
  }
  return true;
}

function getTokens() {
  if ($.isNode()) {
    Object.keys(jdTokenNode).forEach((item) => {
      $.tokenArr.push(jdTokenNode[item] ? JSON.parse(jdTokenNode[item]) : '{}');
    })
  } else {
    $.tokenArr = [$.getdata('jxnc_token1') || '{}', $.getdata('jxnc_token2') || '{}'];
  }
  if (!$.tokenArr[0]) {
    $.msg(
      $.name,
      "��?��ʾ�����Ȼ�ȡ��ϲToken\n��ȡ��ʽ���ű�˵��"
    );
    return false;
  }
  return true;
}

function taskUrl(function_path, body) {
  return {
    url: `${JD_API_HOST}jxcfd/${function_path}?strZone=jxcfd&bizCode=jxcfd&source=jxcfd&dwEnv=7&_cfd_t=${Date.now()}&ptag=138631.26.55&${body}&_ste=1&_=${Date.now()}&sceneval=2&g_login_type=1&g_ty=ls`,
    headers: {
      Cookie: $.currentCookie,
      Accept: "*/*",
      Connection: "keep-alive",
      Referer:"https://st.jingxi.com/fortune_island/index.html?ptag=138631.26.55",
      "Accept-Encoding": "gzip, deflate, br",
      Host: "m.jingxi.com",
      "User-Agent":`jdpingou;iPhone;3.15.2;14.2.1;ea00763447803eb0f32045dcba629c248ea53bb3;network/wifi;model/iPhone13,2;appBuild/100365;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/${Math.random * 98 + 1};pap/JA2015_311210;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`,
      "Accept-Language": "zh-cn",
    },
  };
}

function taskListUrl(function_path, body) {
  return {
    url: `${JD_API_HOST}newtasksys/newtasksys_front/${function_path}?strZone=jxcfd&bizCode=jxcfd&source=jxcfd&dwEnv=7&_cfd_t=${Date.now()}&ptag=138631.26.55&${body}&_ste=1&_=${Date.now()}&sceneval=2&g_login_type=1&g_ty=ls`,
    headers: {
      Cookie: $.currentCookie,
      Accept: "*/*",
      Connection: "keep-alive",
      Referer:"https://st.jingxi.com/fortune_island/index.html?ptag=138631.26.55",
      "Accept-Encoding": "gzip, deflate, br",
      Host: "m.jingxi.com",
      "User-Agent":`jdpingou;iPhone;3.15.2;14.2.1;ea00763447803eb0f32045dcba629c248ea53bb3;network/wifi;model/iPhone13,2;appBuild/100365;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/${Math.random * 98 + 1};pap/JA2015_311210;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`,
      "Accept-Language": "zh-cn",
    },
  };
}

function showMsg() {
  return new Promise(async (resolve) => {
    if ($.notifyTime) {
      const notifyTimes = $.notifyTime.split(",").map((x) => x.split(":"));
      const now = $.time("HH:mm").split(":");
      $.log(`\n${JSON.stringify(notifyTimes)}`);
      $.log(`\n${JSON.stringify(now)}`);
      if ( notifyTimes.some((x) => x[0] === now[0] && (!x[1] || x[1] === now[1])) ) {
        $.msg($.name, "", `\n${$.result.join("\n")}`);
      }
    } else {
      $.msg($.name, "", `\n${$.result.join("\n")}`);
    }

    if ($.isNode() && process.env.CFD_NOTIFY_CONTROL)
      await notify.sendNotify(`${$.name} - �˺�${$.index} - ${$.nickName}`, `�˺�${$.index}��${$.nickName || $.userName}\n${$.result.join("\n")}`);

    resolve();
  });
}

// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}