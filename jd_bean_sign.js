/*
 * @Author: LXK9301 https://github.com/LXK9301
 */
/*
浜眴绛惧埌,鑷敤,鍙疦涓含涓滆处鍙�
娲诲姩鍏ュ彛锛氬悇澶勭殑绛惧埌姹囨��
Node.JS涓撶敤
IOS杞欢鐢ㄦ埛璇蜂娇鐢� https://raw.githubusercontent.com/NobyDa/Script/master/JD-DailyBonus/JD_DailyBonus.js
鏇存柊鏃堕棿锛�2021-1-19
Modified From github https://github.com/ruicky/jd_sign_bot
 */
const $ = new Env('浜眴绛惧埌');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js鐢ㄦ埛璇峰湪jdCookie.js澶勫～鍐欎含涓渃k;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const exec = require('child_process').execSync
const fs = require('fs')
const download = require('download');
let resultPath = "./result.txt";
let JD_DailyBonusPath = "./JD_DailyBonus.js";
let outPutUrl = './';
let NodeSet = 'CookieSet.json';
let cookiesArr = [], cookie = '';

if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
}
!(async() => {
  if (!cookiesArr[0]) {
    $.msg($.name, '銆愭彁绀恒�戣鍏堣幏鍙朿ookie\n鐩存帴浣跨敤NobyDa鐨勪含涓滅鍒拌幏鍙�', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
    return;
  }
  await requireConfig();
  // 涓嬭浇鏈�鏂颁唬鐮�
  await downFile();
  const content = await fs.readFileSync(JD_DailyBonusPath, 'utf8')
  for (let i =0; i < cookiesArr.length; i++) {
    cookie = cookiesArr[i];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1])
      $.index = i + 1;
      $.nickName = '';
      await TotalBean();
      console.log(`*****************寮�濮嬩含涓滆处鍙�${$.index} ${$.nickName || $.UserName}浜眴绛惧埌*******************\n`);
      console.log(`鈿狅笍鈿狅笍鈿狅笍鈿狅笍鐩墠Bark APP鎺ㄩ�侀�氱煡娑堟伅瀵规帹閫佸唴瀹归暱搴︽湁闄愬埗锛屽鎺ㄩ�侀�氱煡涓寘鍚鎺ㄩ�佹柟寮忚剼鏈細榛樿杞崲鎴愮畝娲佸唴瀹规帹閫� 鈿狅笍鈿狅笍鈿狅笍鈿狅笍\n`)
      await changeFile(content);
      await execSign();
    }
  }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())
async function execSign() {
  console.log(`\n寮�濮嬫墽琛岃剼鏈鍒帮紝璇风◢绛塦)
  try {
    // if (notify.SCKEY || notify.BARK_PUSH || notify.DD_BOT_TOKEN || (notify.TG_BOT_TOKEN && notify.TG_USER_ID) || notify.IGOT_PUSH_KEY || notify.QQ_SKEY) {
    //   await exec(`${process.execPath} ${JD_DailyBonusPath} >> ${resultPath}`);
    //   const notifyContent = await fs.readFileSync(resultPath, "utf8");
    //   console.log(`馃憞馃憞馃憞馃憞馃憞馃憞馃憞馃憞馃憞馃憞馃憞LOG璁板綍馃憞馃憞馃憞馃憞馃憞馃憞馃憞馃憞馃憞馃憞馃憞\n${notifyContent}\n馃憜馃憜馃憜馃憜馃憜馃憜馃憜馃憜馃憜LOG璁板綍馃憜馃憜馃憜馃憜馃憜馃憜馃憜馃憜馃憜馃憜馃憜`);
    // } else {
    //   console.log('娌℃湁鎻愪緵閫氱煡鎺ㄩ�侊紝鍒欐墦鍗拌剼鏈墽琛屾棩蹇�')
    //   await exec(`${process.execPath} ${JD_DailyBonusPath}`, { stdio: "inherit" });
    // }
    await exec(`${process.execPath} ${JD_DailyBonusPath} >> ${resultPath}`);
    const notifyContent = await fs.readFileSync(resultPath, "utf8");
    console.log(`馃憞馃憞馃憞馃憞馃憞馃憞馃憞馃憞馃憞馃憞馃憞LOG璁板綍馃憞馃憞馃憞馃憞馃憞馃憞馃憞馃憞馃憞馃憞馃憞\n${notifyContent}\n馃憜馃憜馃憜馃憜馃憜馃憜馃憜馃憜馃憜LOG璁板綍馃憜馃憜馃憜馃憜馃憜馃憜馃憜馃憜馃憜馃憜馃憜`);
    // await exec("node JD_DailyBonus.js", { stdio: "inherit" });
    // console.log('鎵ц瀹屾瘯', new Date(new Date().getTime() + 8 * 3600000).toLocaleDateString())
    //鍙戦�侀�氱煡
    if ($.isNode()) {
      let notifyContent = "";
      let BarkContent = '';
      if (fs.existsSync(resultPath)) {
        notifyContent = await fs.readFileSync(resultPath, "utf8");
        const barkContentStart = notifyContent.indexOf('銆愮鍒版瑙堛��')
        const barkContentEnd = notifyContent.length;
        if (process.env.JD_BEAN_SIGN_STOP_NOTIFY === 'true') return
        if (process.env.BARK_PUSH || notify.BARK_PUSH) process.env.JD_BEAN_SIGN_NOTIFY_SIMPLE = 'true';
        if (process.env.JD_BEAN_SIGN_NOTIFY_SIMPLE === 'true') {
          if (barkContentStart > -1 && barkContentEnd > -1) {
            BarkContent = notifyContent.substring(barkContentStart, barkContentEnd);
          }
          BarkContent = BarkContent.split('\n\n')[0];
        } else {
          if (barkContentStart > -1 && barkContentEnd > -1) {
            BarkContent = notifyContent.substring(barkContentStart, barkContentEnd);
          }
        }
      }
      //涓嶇鍝釜鏃跺尯,杩欓噷寰楀埌鐨勯兘鏄寳浜椂闂寸殑鏃堕棿鎴�;
      const UTC8 = new Date().getTime() + new Date().getTimezoneOffset()*60000 + 28800000;
      $.beanSignTime = timeFormat(UTC8);
      console.log(`鑴氭湰鎵ц瀹屾瘯鏃堕棿锛�${$.beanSignTime}`)
      if (BarkContent) {
        await notify.sendNotify(`浜眴绛惧埌 - 璐﹀彿${$.index} - ${$.nickName || $.UserName}`, `銆愮鍒板彿 ${$.index}銆�: ${$.nickName || $.UserName}\n銆愮鍒版椂闂淬��:  ${$.beanSignTime}\n${BarkContent}`);
      }
    }
    //杩愯瀹屾垚鍚庯紝鍒犻櫎涓嬭浇鐨勬枃浠�
    console.log('杩愯瀹屾垚鍚庯紝鍒犻櫎涓嬭浇鐨勬枃浠禱n')
    await deleteFile(resultPath);//鍒犻櫎result.txt
    await deleteFile(JD_DailyBonusPath);//鍒犻櫎JD_DailyBonus.js
    console.log(`*****************浜笢璐﹀彿${$.index} ${$.nickName || $.UserName}浜眴绛惧埌瀹屾垚*******************\n`);
  } catch (e) {
    console.log("浜笢绛惧埌鑴氭湰鎵ц寮傚父:" + e);
  }
}
async function downFile () {
  let url = '';
  // if (process.env.CDN_JD_DAILYBONUS) {
  //   url = 'https://cdn.jsdelivr.net/gh/NobyDa/Script@master/JD-DailyBonus/JD_DailyBonus.js';
  // } else if (process.env.JD_COOKIE) {
  //   url = 'https://raw.githubusercontent.com/NobyDa/Script/master/JD-DailyBonus/JD_DailyBonus.js';
  // } else {
  //   url = 'https://cdn.jsdelivr.net/gh/NobyDa/Script@master/JD-DailyBonus/JD_DailyBonus.js';
  // }
  await downloadUrl();
  if ($.body) {
    url = 'https://raw.githubusercontent.com/NobyDa/Script/master/JD-DailyBonus/JD_DailyBonus.js';
  } else {
    url = 'https://cdn.jsdelivr.net/gh/NobyDa/Script@master/JD-DailyBonus/JD_DailyBonus.js';
  }
  try {
    const options = {}
    if (process.env.TG_PROXY_HOST && process.env.TG_PROXY_PORT) {
      const tunnel = require("tunnel");
      const agent = {
        https: tunnel.httpsOverHttp({
          proxy: {
            host: process.env.TG_PROXY_HOST,
            port: process.env.TG_PROXY_PORT * 1
          }
        })
      }
      Object.assign(options, { agent })
    }
    await download(url, outPutUrl, options);
    console.log('鏂囦欢涓嬭浇瀹屾瘯');
  } catch (e) {
    console.log("鏂囦欢涓嬭浇寮傚父:" + e);
  }
}

async function changeFile (content) {
  console.log(`寮�濮嬫浛鎹㈠彉閲廯)
  let newContent = content.replace(/var Key = ''/, `var Key = '${cookie}'`);
  newContent = newContent.replace(/const NodeSet = 'CookieSet.json'/, `const NodeSet = '${NodeSet}'`)
  if (process.env.JD_BEAN_STOP && process.env.JD_BEAN_STOP !== '0') {
    newContent = newContent.replace(/var stop = '0'/, `var stop = '${process.env.JD_BEAN_STOP}'`);
  }
  const zone = new Date().getTimezoneOffset();
  if (zone === 0) {
    //姝ゅ閽堝UTC-0鏃跺尯鐢ㄦ埛鍋氱殑
    newContent = newContent.replace(/tm\s=.*/, `tm = new Date(new Date().toLocaleDateString()).getTime() - 28800000;`);
  }
  try {
    await fs.writeFileSync(JD_DailyBonusPath, newContent, 'utf8');
    console.log('鏇挎崲鍙橀噺瀹屾瘯');
  } catch (e) {
    console.log("浜笢绛惧埌鍐欏叆鏂囦欢寮傚父:" + e);
  }
}
async function deleteFile(path) {
  // 鏌ョ湅鏂囦欢result.txt鏄惁瀛樺湪,濡傛灉瀛樺湪,鍏堝垹闄�
  const fileExists = await fs.existsSync(path);
  // console.log('fileExists', fileExists);
  if (fileExists) {
    const unlinkRes = await fs.unlinkSync(path);
    // console.log('unlinkRes', unlinkRes)
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
      }
    }
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API璇锋眰澶辫触锛岃妫�鏌ョ綉璺噸璇昤)
        } else {
          if (data) {
            data = JSON.parse(data);
            if (data['retcode'] === 13) {
              $.isLogin = false; //cookie杩囨湡
              return
            }
            if (data['retcode'] === 0) {
              $.nickName = data['base'].nickname;
            } else {
              $.nickName = $.UserName
            }
          } else {
            console.log(`浜笢鏈嶅姟鍣ㄨ繑鍥炵┖鏁版嵁`)
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
function downloadUrl(url = 'https://raw.githubusercontent.com/NobyDa/Script/master/JD-DailyBonus/JD_DailyBonus.js') {
  return new Promise(resolve => {
    const options = { url };
    if ($.isNode() && process.env.TG_PROXY_HOST && process.env.TG_PROXY_PORT) {
      const tunnel = require("tunnel");
      const agent = {
        https: tunnel.httpsOverHttp({
          proxy: {
            host: process.env.TG_PROXY_HOST,
            port: process.env.TG_PROXY_PORT * 1
          }
        })
      }
      Object.assign(options, { agent })
    }
    $.get(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`妫�娴嬪埌鎮ㄤ笉鑳借闂缃�,灏嗕娇鐢–DN涓嬭浇JD_DailyBonus.js鏂囦欢`)
        } else {
          $.body = data;
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
function requireConfig() {
  return new Promise(resolve => {
    const file = 'jd_bean_sign.js';
    fs.access(file, fs.constants.W_OK, (err) => {
      resultPath = err ? '/tmp/result.txt' : resultPath;
      JD_DailyBonusPath = err ? '/tmp/JD_DailyBonus.js' : JD_DailyBonusPath;
      outPutUrl = err ? '/tmp/' : outPutUrl;
      NodeSet = err ? '/tmp/CookieSet.json' : NodeSet;
      resolve()
    });
  })
}
function timeFormat(time) {
  let date;
  if (time) {
    date = new Date(time)
  } else {
    date = new Date();
  }
  return date.getFullYear() + '-' + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '-' + (date.getDate() >= 10 ? date.getDate() : '0' + date.getDate());
}
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GIT_HUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`馃敂${this.name}, 寮�濮�!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============馃摚绯荤粺閫氱煡馃摚=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`鉂楋笍${this.name}, 閿欒!`,t.stack):this.log("",`鉂楋笍${this.name}, 閿欒!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`馃敂${this.name}, 缁撴潫! 馃暃 ${s} 绉抈),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
