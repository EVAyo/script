/*
�ر�������
���ű������� https://github.com/whyour/hundun/blob/master/quanx/jx_nc.js
��л @whyour ����

��ϲũ��:�ű����µ�ַ https://jdsharedresourcescdn.azureedge.net/jdresource/jd_jxnc.js
����ʱ�䣺2021-01-10 22:47:51
���ڣ���ϲAPP�ҵ�-��ϲũ��
����ũ������ӣ�https://wqsh.jd.com/sns/201912/12/jxnc/detail.html?ptag=7155.9.32&smp=b47f4790d7b2a024e75279f55f6249b9&active=jdnc_1_chelizi1205_2
��֧��IOS˫�����˺�,Node.js֧��N�������˺�
�����Ͻű�����: QuantumultX, Surge, Loon, JSBox, Node.js
������shareCode�����ֶ����нű��鿴��ӡ�ɿ���

hostname = wq.jd.com

==========================Quantumultx=========================
[task_local]
0 9,12,18 * * * https://jdsharedresourcescdn.azureedge.net/jdresource/jd_jxnc.js, tag=��ϲũ��, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jxnc.png, enabled=true
[rewrite_local]
# ��ϲũ��APP����Token
^https\:\/\/wq\.jd\.com\/cubeactive\/farm\/dotask url script-request-header https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_tokens.js
=========================Loon=============================
[Script]
http-request ^https\:\/\/wq\.jd\.com\/cubeactive\/farm\/dotask script-path=https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_tokens.js, requires-body=false, timeout=3600, tag=��ϲũ��cookie
cron "0 9,12,18 * * *" script-path=https://jdsharedresourcescdn.azureedge.net/jdresource/jd_jxnc.js,tag=��ϲũ��

=========================Surge============================
��ϲũ�� = type=cron,cronexp="0 9,12,18 * * *",timeout=3600,script-path=https://jdsharedresourcescdn.azureedge.net/jdresource/jd_jxnc.js
��ϲũ��cookie = type=http-request,pattern=^https\:\/\/wq\.jd\.com\/cubeactive\/farm\/dotask,requires-body=0,max-size=0,script-path= https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_tokens.js
 
=========================С���===========================
��ϲũ�� = type=cron,script-path=https://jdsharedresourcescdn.azureedge.net/jdresource/jd_jxnc.js, cronexpr="0 9,12,18 * * *", timeout=3600, enable=true
��ϲũ��APP����cookie = type=http-request,script-path=https://raw.githubusercontent.com/whyour/hundun/master/quanx/jx_tokens.js,pattern=^https\:\/\/wq\.jd\.com\/cubeactive\/farm\/dotask,max-size=131072,timeout=3600,enable=true

�ر�˵����
�ű����б�����д����token��iOS�û�ʹ�ô������ֱ�ӻ�ȡ��Android�û���Ҫץ����ȡ����token���ֶ�����ϲũ���������񼴿ɻ�ȡ����token���Ƽ�ʹ��elecV2P��ʹ����������iOS�û��Ĵ������������HttpCanary�������ؼ���"farm_jstoken"��token����{"farm_jstoken":"xxx","timestamp":"xxx","phoneid":"xxx-xxx"}��ʽ��д����

*/

const $ = new Env('��ϲũ��');
let notify = ''; // nodejs ����֪ͨ�ű�
let notifyLevel = $.isNode() ? process.env.JXNC_NOTIFY_LEVEL || 3 : 3; // ֪ͨ���� 0=ֻ֪ͨ����;1=���λ��ˮ��>0;2=����ִ��;3=����ִ��+δ��ֲ����;
let notifyBool = true; // �����ڲ�ʹ�ã������Ƿ�֪ͨ
let cookieArr = []; // �û� cookie ����
let currentCookie = ''; // ��ǰ�û� cookie
let tokenNull = {'farm_jstoken': '', 'phoneid': '', 'timestamp': ''}; // ����һ�ݿյ� token
let tokenArr = []; // �û� token ����
let currentToken = {}; // ��ǰ�û� token
let shareCode = ''; // ����������
let jxncShareCodeArr = []; // �û� ������ ����
let currentShareCode = []; // ��ǰ�û� Ҫ������������
const openUrl = `openjd://virtual?params=${encodeURIComponent('{ "category": "jump", "des": "m", "url": "https://wqsh.jd.com/sns/201912/12/jxnc/detail.html?ptag=7155.9.32&smp=b47f4790d7b2a024e75279f55f6249b9&active=jdnc_1_chelizi1205_2"}',)}`; // �򿪾�ϲũ��
let subTitle = '', message = '', option = {'open-url': openUrl}; // ��Ϣ�����⣬��Ϣ���ģ���Ϣ��չ����
const JXNC_API_HOST = 'https://wq.jd.com/';

$.detail = []; // ������ϸ�б�
$.helpTask = null;
$.allTask = []; // �����б�
$.info = {}; // �û���Ϣ
$.answer = 3;
$.drip = 0;
$.maxHelpNum = $.isNode() ? 8 : 4; // ����������ִ�д���
$.helpNum = 0; // ��ǰ�˺� �����������
let assistUserShareCode = 0; // ��������û� share code

!(async () => {
    await requireConfig();
    if (!cookieArr[0]) {
        $.msg($.name, '����ʾ�����Ȼ�ȡ�����˺�һcookie\nֱ��ʹ��NobyDa�ľ���ǩ����ȡ', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
        return;
    }

    for (let i = 0; i < cookieArr.length; i++) {
        if (cookieArr[i]) {
            currentCookie = cookieArr[i];
            $.UserName = decodeURIComponent(currentCookie.match(/pt_pin=(.+?);/) && currentCookie.match(/pt_pin=(.+?);/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            $.log(`\n************* ��顾�����˺�${$.index}��${$.UserName} cookie �Ƿ���Ч *************`);
            await TotalBean();
            $.log(`��ʼ�������˺�${$.index}��${$.nickName || $.UserName}\n`);
            if (!$.isLogin) {
                $.msg($.name, `����ʾ��cookie��ʧЧ`, `�����˺�${$.index} ${$.nickName || $.UserName}\n�����µ�¼��ȡ\nhttps://bean.m.jd.com/`, {"open-url": "https://bean.m.jd.com/"});
                if ($.isNode()) {
                    await notify.sendNotify(`${$.name}cookie��ʧЧ - ${$.UserName}`, `�����˺�${$.index} ${$.UserName}\n�����µ�¼��ȡcookie`);
                }
                continue
            }
            subTitle = '';
            message = '';
            option = {};
            $.answer = 3;
            $.helpNum = 0;
            notifyBool = notifyLevel > 0; // ��ʼ���Ƿ�����
            await tokenFormat(); // ����ǰ�˺� token
            await shareCodesFormat(); // ����ǰ�˺� ������
            await jdJXNC(); // ִ�е�ǰ�˺� ����������
        }
    }
})()
    .catch((e) => {
        $.log('', `? ${$.name}, ʧ��! ԭ��: ${e}!`, '')
        console.log(e);
    })
    .finally(() => {
        $.done();
    })

// ��黥�����ʽ�Ƿ�Ϊ json
// �ɹ����� json ����ʧ�ܷ��� ''
function changeShareCodeJson(code) {
    try {
        let json = code && JSON.parse(code);
        return json['smp'] && json['active'] && json['joinnum'] ? json : '';
    } catch (e) {
        return '';
    }
}

// �������� cookie token shareCode
function requireConfig() {
    return new Promise(async resolve => {
        $.log('��ʼ��ȡ�����ļ�\n')
        notify = $.isNode() ? require('./sendNotify') : '';
        //Node.js�û�����jdCookie.js����д����ck;
        const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
        const jdTokenNode = $.isNode() ? require('./jdJxncTokens.js') : '';
        const jdJxncShareCodeNode = $.isNode() ? require('./jdJxncShareCodes.js') : '';
        //IOS���û�ֱ����NobyDa��jd cookie
        if ($.isNode()) {
            Object.keys(jdCookieNode).forEach((item) => {
                if (jdCookieNode[item]) {
                    cookieArr.push(jdCookieNode[item]);
                }
            })
            if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {
            };
        } else {
            cookieArr.push(...[$.getdata('CookieJD'), $.getdata('CookieJD2')]);
        }

        $.log(`��${cookieArr.length}�������˺�\n`);

        if ($.isNode()) {
            Object.keys(jdTokenNode).forEach((item) => {
                tokenArr.push(jdTokenNode[item] ? JSON.parse(jdTokenNode[item]) : tokenNull)
            })
        } else {
            let tmpTokens = JSON.parse($.getdata('jx_tokens') || '[]');
            tokenArr.push(...tmpTokens)
        }

        if ($.isNode()) {
            Object.keys(jdJxncShareCodeNode).forEach((item) => {
                if (jdJxncShareCodeNode[item]) {
                    jxncShareCodeArr.push(jdJxncShareCodeNode[item])
                } else {
                    jxncShareCodeArr.push('');
                }
            })
        }

        // ��黥�����Ƿ�Ϊ json [smp,active,joinnum] ��ʽ���������֪ͨ
        for (let i = 0; i < jxncShareCodeArr.length; i++) {
            if (jxncShareCodeArr[i]) {
                let tmpJxncShareStr = jxncShareCodeArr[i];
                let tmpjsonShareCodeArr = tmpJxncShareStr.split('@');
                if (!changeShareCodeJson(tmpjsonShareCodeArr[0])) {
                    $.log('�������ʽ�ѱ������������д������');
                    $.msg($.name, '�������ʽ���֪ͨ', '�������ʽ�������������д ????', option);
                    if ($.isNode()) {
                        await notify.sendNotify(`${$.name}`, `�������ʽ�������������д ????`);
                    }
                }
                break;
            }
        }

        // console.log(`jdFruitShareArr::${JSON.stringify(jxncShareCodeArr)}`)
        // console.log(`jdFruitShareArr�˺ų���::${jxncShareCodeArr.length}`)
        $.log(`���ṩ��${jxncShareCodeArr.length}���˺ŵľ�ϲũ��������`);

        try {
            let options = {
                "url": `https://gitee.com/guyuexuan/jd_share_code/raw/master/share_code/jxnc.json`,
                "headers": {
                    "Accept": "application/json,text/plain, */*",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "zh-cn",
                    "Connection": "keep-alive",
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36"
                },
                "timeout": 10000,
            }
            $.get(options, (err, resp, data) => { // ��ʼ�����ñ���
                if (!err) {
                    shareCode = data;
                }
            });
        } catch (e) {
            // ��ȡ����������ʧ��
        }
        resolve()
    })
}

// ��ѯ�����˻���Ϣ����� cookie �Ƿ���Ч��
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
                "Cookie": currentCookie,
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

// ����ǰ�˺�token
function tokenFormat() {
    return new Promise(async resolve => {
        if (tokenArr[$.index - 1] && tokenArr[$.index - 1].farm_jstoken) {
            currentToken = tokenArr[$.index - 1];
        } else {
            currentToken = tokenNull;
        }
        resolve();
    })
}

// ����ǰ�˺�������
function shareCodesFormat() {
    return new Promise(async resolve => {
        // console.log(`��${$.index}�������˺ŵ�������:::${jdFruitShareArr[$.index - 1]}`)
        if (jxncShareCodeArr[$.index - 1]) {
            currentShareCode = jxncShareCodeArr[$.index - 1].split('@');
            currentShareCode.push(...(shareCode.split('@')));
        } else {
            $.log(`��������${$.index}�������˺�δ�ṩshareCode,�����ɱ��ű��Դ���������`)
            currentShareCode = shareCode.split('@');
        }
        $.log(`��${$.index}�������˺Ž�Ҫ�����ĺ���${JSON.stringify(currentShareCode)}`)
        resolve();
    })
}

async function jdJXNC() {
    subTitle = `�������˺�${$.index}��${$.nickName}`;
    $.log(`��ȡ�û���Ϣ & �����б�`);
    const startInfo = await getTaskList();
    if (startInfo) {
        message += `��ˮ�����ơ�${startInfo.prizename}\n`;
        if (startInfo.target <= startInfo.score) { // ˮ������
            if (startInfo.activestatus === 2) { // ����δ��ȡ
                notifyBool = true;
                $.log(`�����졿ˮ���ѳ����뼰ʱ��ȡ��activestatus��${startInfo.activestatus}\n`);
                message += `�����졿ˮ���ѳ����뼰ʱ��ȡ��activestatus��${startInfo.activestatus}\n`;
            } else if (startInfo.activestatus === 0) { // δ��ֲ����������ȡ��
                $.log('�˺�δѡ�����ӣ�����ȥ��ϲũ��ѡ�����ӡ�\n���ѡ�� APP ר�����ӣ������ṩ token��');
                message += '�˺�δѡ�����ӣ�����ȥ��ϲũ��ѡ�����ӡ�\n���ѡ�� APP ר�����ӣ������ṩ token��\n';
                notifyBool = notifyBool && notifyLevel >= 3;
            }
        } else {
            let shareCodeJson = {
                "smp": $.info.smp,
                "active": $.info.active,
                "joinnum": $.info.joinnum,
            };
            $.log(`�������˺�${$.index}��${$.nickName || $.UserName}����${$.name}���ѻ����롿` + JSON.stringify(shareCodeJson));
            await $.wait(500);
            const isOk = await browserTask();
            if (isOk) {
                await $.wait(500);
                await answerTask();
                await $.wait(500);
                const endInfo = await getTaskList();
                getMessage(endInfo, startInfo);
                await submitInviteId($.UserName);
                await $.wait(500);
                let next = await helpFriends();
                if (next) {
                    while ($.helpNum < $.maxHelpNum) {
                        $.helpNum++;
                        assistUserShareCodeJson = await getAssistUser();
                        if (assistUserShareCodeJson) {
                            await $.wait(500);
                            next = await helpShareCode(assistUserShareCodeJson['smp'], assistUserShareCodeJson['active'], assistUserShareCodeJson['joinnum']);
                            if (next) {
                                await $.wait(1000);
                                continue;
                            }
                        }
                        break;
                    }
                }
            }
        }
    }
    await showMsg()
}

// ��ȡ�����б����û���Ϣ
function getTaskList() {
    return new Promise(async resolve => {
        $.get(taskUrl('query', `type=1`), async (err, resp, data) => {
            try {
                const res = data.match(/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/)[1];
                const {detail, msg, task = [], retmsg, ...other} = JSON.parse(res);
                $.detail = detail;
                $.helpTask = task.filter(x => x.tasktype === 2)[0] || {eachtimeget: 0, limit: 0};
                $.allTask = task.filter(x => x.tasktype !== 3 && x.tasktype !== 2 && parseInt(x.left) > 0);
                $.info = other;
                $.log(`��ȡ�����б� ${retmsg} �ܹ�${$.allTask.length}������`);
                if (!$.info.active) {
                    $.log('�˺�δѡ�����ӣ�����ȥ��ϲũ��ѡ�����ӡ�\n���ѡ�� APP ר�����ӣ������ṩ token��');
                    message += '�˺�δѡ�����ӣ�����ȥ��ϲũ��ѡ�����ӡ�\n���ѡ�� APP ר�����ӣ������ṩ token��\n';
                    notifyBool = notifyBool && notifyLevel >= 3;
                    resolve(false);
                }
                resolve(other);
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(true);
            }
        });
    });
}

function browserTask() {
    return new Promise(async resolve => {
        const tasks = $.allTask.filter(x => x.tasklevel !== 6);
        const times = Math.max(...[...tasks].map(x => x.limit));
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            $.log(`��ʼ��${i + 1}������${task.taskname}`);
            const status = [0];
            for (let i = 0; i < times; i++) {
                const random = Math.random() * 3;
                await $.wait(random * 1000);
                if (status[0] === 0) {
                    status[0] = await doTask(task);
                }
                if (status[0] !== 0) {
                    break;
                }
            }
            if (status[0] === 1017) { // ret:1017 retmsg:"score full" ˮ����������ʵ���죬������������
                $.log('ˮ����������ʵ���죬������������');
                resolve(true);
                break;
            }
            if (status[0] === 1032) {
                $.log('����ִ��ʧ�ܣ���ֲ�� APP ר�����ӣ����ṩ token ����ֲ�� APP ����');
                message += '����ִ��ʧ�ܣ���ֲ�� APP ר�����ӣ����ṩ token ����ֲ�� APP ����\n';
                notifyBool = notifyBool && notifyLevel >= 2;
                resolve(false);
                return;
            }

            $.log(`������${i + 1}������${task.taskname}`);
        }
        resolve(true);
    });
}

function answerTask() {
    const _answerTask = $.allTask.filter(x => x.tasklevel === 6);
    if (!_answerTask || !_answerTask[0]) return;
    const {tasklevel, left, taskname, eachtimeget} = _answerTask[0];
    $.log(`׼������������${taskname}`);
    return new Promise(async resolve => {
        if (parseInt(left) <= 0) {
            resolve(false);
            $.log(`${taskname}[������]�� ��������ɣ�����`);
            return;
        }
        $.get(
            taskUrl(
                'dotask',
                `active=${$.info.active}&answer=${$.info.indexday}:${['A', 'B', 'C', 'D'][$.answer]}:0&joinnum=${
                    $.info.joinnum
                }&tasklevel=${tasklevel}`,
            ),
            async (err, resp, data) => {
                try {
                    const res = data.match(/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/)[1];
                    let {ret, retmsg, right} = JSON.parse(res);
                    retmsg = retmsg !== '' ? retmsg : '�ɹ�';
                    $.log(`${taskname}[������]��ret:${ret} retmsg:"${retmsg.indexOf('�̫����') !== -1 ? '��������л���δ������ʱ��' : retmsg}"`);
                    if (ret === 0 && right === 1) {
                        $.drip += eachtimeget;
                    }
                    // ret:1017 retmsg:"score full" ˮ����������ʵ���죬��������
                    // ret:1012 retmsg:"has complte" ����ɣ���������
                    if (ret === 1017 || ret === 1012) {
                        resolve();
                        return;
                    }
                    if (((ret !== 0 && ret !== 1029) || retmsg === 'ans err') && $.answer > 0) {
                        $.answer--;
                        await $.wait(1000);
                        await answerTask();
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

function getMessage(endInfo, startInfo) {
    const need = endInfo.target - endInfo.score;
    const get = endInfo.modifyscore; // ���α�����ˮ��
    const leaveGet = startInfo.modifyscore; // �뿪ʱ���ˮ��
    let dayGet = 0; // ���չ���ȡˮ����
    if ($.detail) {
        let dayTime = new Date(new Date().toLocaleDateString()).getTime() / 1000; // ���� 0 ��ʱ�����10λ����
        $.detail.forEach(function (item, index) {
            if (item.time >= dayTime && item.score) {
                dayGet += item.score;
            }
        });
    }
    message += `��ˮ�Ρ����λ��${get} ���߻��${leaveGet} ���ջ��${dayGet} ����ˮ��${need}\n`;
    if (need <= 0) {
        notifyBool = true;
        message += `�����졿ˮ���ѳ����뼰ʱ��ȡ��deliverState��${endInfo.deliverState}\n`;
        return;
    }
    if (get > 0 || leaveGet > 0 || dayGet > 0) {
        const day = Math.ceil(need / (dayGet > 0 ? dayGet : (get + leaveGet)));
        message += `��Ԥ�⡿���� ${day} ��\n`;
    }
    if (get > 0 || leaveGet > 0) { // ���� �� ���� ��ˮ��
        notifyBool = notifyBool && notifyLevel >= 1;
    } else {
        notifyBool = notifyBool && notifyLevel >= 2;
    }
}

// �ύ������
function submitInviteId(userName) {
    return new Promise(resolve => {
        if (!$.info || !$.info.smp) {
            resolve();
            return;
        }
        try {
            $.post(
                {
                    url: `https://api.ninesix.cc/api/jx-nc/${$.info.smp}/${encodeURIComponent(userName)}?active=${$.info.active}&joinnum=${$.info.joinnum}`,
                    timeout: 10000
                },
                (err, resp, _data) => {
                    try {
                        const {code, data = {}} = JSON.parse(_data);
                        $.log(`�������ύ��${code}`);
                        if (data.value) {
                            message += '�������롿�ύ�ɹ���\n';
                        }
                    } catch (e) {
                        // $.logErr(e, resp);
                        $.log('�������ύʧ�� API �����쳣');
                    } finally {
                        resolve();
                    }
                },
            );
        } catch (e) {
            // $.logErr(e, resp);
            resolve();
        }
    });
}

function getAssistUser() {
    return new Promise(resolve => {
        try {
            $.get({url: `https://api.ninesix.cc/api/jx-nc?active=${$.info.active}`, timeout: 10000}, async (err, resp, _data) => {
                try {
                    const {code, data: {value, extra = {}} = {}} = JSON.parse(_data);
                    if (value && extra.active) { //  && extra.joinnum ��ֹ 2021-01-22 16:39:09 API ���ϻ�δ�����µ� joinnum �������룬��ʱĬ�� 1 ����
                        let shareCodeJson = {
                            'smp': value,
                            'active': extra.active,
                            'joinnum': extra.joinnum || 1
                        };
                        $.log(`��ȡ���������ɹ� ` + JSON.stringify(shareCodeJson));
                        resolve(shareCodeJson);
                        return;
                    } else {
                        $.log(`��ȡ���������ʧ�� ${code}`);
                    }
                } catch (e) {
                    // $.logErr(e, resp);
                    $.log('��ȡ���������ʧ�� API �����쳣');
                } finally {
                    resolve(false);
                }
            });
        } catch (e) {
            // $.logErr(e, resp);
            resolve(false);
        }
    });
}

// Ϊ�������� return true ��������  false ��������
async function helpFriends() {
    for (let code of currentShareCode) {
        if (!code) {
            continue
        }
        let tmpShareCodeJson = changeShareCodeJson(code);
        if (!tmpShareCodeJson) { //�� json ��ʽ����
            console.log('������� json ��ʽ������')
            continue;
        }
        const next = await helpShareCode(tmpShareCodeJson['smp'], tmpShareCodeJson['active'], tmpShareCodeJson['joinnum']);
        if (!next) {
            return false;
        }
        await $.wait(1000);
    }
    return true;
}

// ִ������ return true ��������  false ��������
function helpShareCode(smp, active, joinnum) {
    return new Promise(async resolve => {
        if (smp === $.info.smp) { // �Լ��������룬����������ִ��
            $.log('�������뵱ǰ�˺���ͬ������������׼��������һ������');
            resolve(true);
        }
        $.log(`�������� share {"smp":"${smp}","active":"${active}","joinnum":"${joinnum}"}`);
        $.get(
            taskUrl('help', `active=${active}&joinnum=${joinnum}&smp=${smp}`),
            async (err, resp, data) => {
                try {
                    const res = data.match(/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/)[1];
                    const {ret, retmsg = ''} = JSON.parse(res);
                    $.log(`���������ret=${ret} retmsg="${retmsg ? retmsg : 'OK'}"`);
                    // ret=0 �����ɹ�
                    // ret=1011 active ��ͬ
                    // ret=1012 has complete �����
                    // ret=1013 retmsg="has expired" �ѹ���
                    // ret=1009 retmsg="today has help p2p" ������������
                    // ret=1021 cannot help self ���������Լ�
                    // ret=1032 retmsg="err operate env" ��������Ϊ APP ר�����ӣ���ǰ�����˺�δ���� TOKEN
                    // if (ret === 0 || ret === 1009 || ret === 1011 || ret === 1012 || ret === 1021 || ret === 1032) {
                    //     resolve(true);
                    //     return;
                    // }
                    // ret 1016 ��ǰ�˺Ŵﵽ��������
                    // ret 147 filter ��ǰ�˺źں���
                    if (ret === 147 || ret === 1016) {
                        if (ret === 147) {
                            $.log(`\n\n  !!!!!!!!   ��ǰ�˺źں���  !!!!!!!!  \n\n`);
                        }
                        resolve(false);
                        return;
                    }
                    resolve(true);
                    return;
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve(false);
                }
            },
        );
    });
}


function doTask({tasklevel, left, taskname, eachtimeget}) {
    return new Promise(async resolve => {
        if (parseInt(left) <= 0) {
            $.log(`${taskname}[������]�� ��������ɣ�����`);
            resolve(false);
        }
        $.get(
            taskUrl(
                'dotask',
                `active=${$.info.active}&answer=${$.info.indexday}:D:0&joinnum=${$.info.joinnum}&tasklevel=${tasklevel}`,
            ),
            (err, resp, data) => {
                try {
                    const res = data.match(/try\{whyour\(([\s\S]*)\)\;\}catch\(e\)\{\}/)[1];
                    let {ret, retmsg} = JSON.parse(res);
                    retmsg = retmsg !== '' ? retmsg : '�ɹ�';
                    $.log(`${taskname}[������]��ret:${ret} retmsg:"${retmsg.indexOf('�̫����') !== -1 ? '��������л���δ������ʱ��' : retmsg}"`);
                    if (ret === 0) {
                        $.drip += eachtimeget;
                    }
                    resolve(ret);
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve();
                }
            },
        );
    });
}

function taskUrl(function_path, body) {
    return {
        url: `${JXNC_API_HOST}cubeactive/farm/${function_path}?${body}&farm_jstoken=${currentToken['farm_jstoken']}&phoneid=${currentToken['phoneid']}&timestamp=${currentToken['timestamp']}&sceneval=2&g_login_type=1&callback=whyour&_=${Date.now()}&g_ty=ls`,
        headers: {
            Cookie: currentCookie,
            Accept: `*/*`,
            Connection: `keep-alive`,
            Referer: `https://st.jingxi.com/pingou/dream_factory/index.html`,
            'Accept-Encoding': `gzip, deflate, br`,
            Host: `wq.jd.com`,
            'Accept-Language': `zh-cn`,
        },
        timeout: 10000,
    };
}

async function showMsg() {
    if (notifyBool) {
        $.msg($.name, subTitle, message, option);
        if ($.isNode()) {
            await notify.sendNotify(`${$.name} - �˺�${$.index} - ${$.nickName}`, `${subTitle}\n${message}`);
        }
    } else {
        $.log(`${$.name} - notify ֪ͨ�ѹر�\n�˺�${$.index} - ${$.nickName}\n${subTitle}\n${message}`);
    }
}

// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GIT_HUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`?${this.name}, ��ʼ!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============?ϵͳ֪ͨ?=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`??${this.name}, ����!`,t.stack):this.log("",`??${this.name}, ����!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`?${this.name}, ����! ? ${s} ��`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
