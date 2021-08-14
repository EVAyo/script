<!-- 枝网查重 -->
<template>
<div class="div">
    <div class="logo">
      <img src="~@/assets/img/checkArticle/logo.png" alt="">
    </div>
    
    <div class="BigContent">
      <!-- 左边输入文本框 start -->
      <div class="content_left">
        
          <div class="content">
            <!-- 文本框 -->
            <textarea type="text"
                v-model="search"
                placeholder="内容字数不少于10字，不多于1000字，输入信息后，点击下方按钮提交进行查重！"
                class="search-input">
            </textarea>

            <!-- 文本框里面的配置 -->
            <div class="textBottom">
              <ul class="left">
                <!-- <li>种类：</li> -->
                <li class="copy" @click="handlerCopyText" v-if="this.result.related">复制查询结果</li>
                <li class="li_bottom">总复制占比：<span v-if="result.rate">{{toPercent(result.rate)}}</span></li>
              </ul>
              <ul class="right">
                <li class="content_length">{{search.length}}/{{maxSearchLength}}字</li>
                <li>
                  <button class="input_but" @click="submit">提交</button>
                </li>
              </ul>
            </div>
            <!-- 文本框里面的配置结束 -->
            
          </div>
          <!-- 查询结果 -->
          <div v-if="result.related && result.related.length > 0" style="width: 100%;">
                <div v-for="(item,index) in result.related" :key="index" >
                    <result :result="item"  v-if="item"></result>
                </div>
          </div>
        
                
      </div>
      <!-- 左边输入文本框 end -->   

      <div class="content_right">
        <ul>
          <li class="intro">
            枝网查重系统介绍
          </li>
          <!-- rewite by ch3cknull -->
          <li v-for="i in intro" :key="i.key">
            <p>
              <span class="pink">{{ i.key }}</span>
              <span v-if="i.type == 'text'">{{i.value}}</span>
              <span v-else>
                <a target="_blank" :href="i.value.href">{{i.value.text}}</a>
              </span>
            </p>
          </li>
          <div class="exhibition" @click="toUrl('https://asoulcnki.asia/rank')">
            <img src="~@/assets/img/checkArticle/exhibition.png" alt="">
          </div>
        </ul>
      </div>
    </div>
</div>


</template>
<script>
const description = [
  {key: '比对库范围：', value: 'b站动态、视频评论区', type: 'text'},
  {key: '参考文献：', value: `[1]李旭.基于串匹配方法的文档复制检测系统研究[D].燕山大学.`, type: 'text'},
  {key: '开源地址：', value: {text: 'ASoulCnki', href: 'https://github.com/ASoulCnki'}, type: 'link'},
  {key: '反馈地址：', value: {text: 'ASoulCnki_Official', href: 'https://t.bilibili.com/542031663106174238'}, type: 'link'},
  {key: '官方API文档：', value: {text: 'GitHub', href: 'https://github.com/ASoulCnki/ASoulCnkiBackend/blob/master/api.md'}, type: 'link'},
]

import result from './components/result';
import { parseTime } from "@/utils/time";
function copy(text) {
    const fakeElem = document.body.appendChild(
        document.createElement("textarea")
    );
    fakeElem.style.position = "absolute";
    fakeElem.style.left = "-9999px";
    fakeElem.setAttribute("readonly", "");
    fakeElem.value = text;
    fakeElem.select();
    try {
        return document.execCommand("copy");
    } catch (err) {
        return false;
    } finally {
        fakeElem.parentNode.removeChild(fakeElem);
    }
}
export default {
  name: "ASoulFanCheck",
  data() {
    return {
      search: '',
      result:[],
      maxSearchLength: 1000,
      intro: description
    }
  },
  components: {
    result,
  },
  computed: {
    
  },
  watch:{
    search(val){
        if(val.length > this.maxSearchLength) {
            this.$message({message: `最多${this.maxSearchLength}个字捏`, type: 'warning'});
            this.search = String(this.search).slice(0, this.maxSearchLength);
        }
    },
  },

  mounted() {},

  methods: {
    //一键复制
    handlerCopyText() {
        let tmp = '';   //复制文字
        let rate = this.toPercent(this.result.rate);  //总文字复制比
        let selectTime = parseTime(new Date(), "{y}-{m}-{d} {h}:{i}:{s}");   //查重时间
        //没有重复小作文
        if(this.result.related.length == 0) {
          tmp = `@ProJectASF × 枝网文本复制检测报告[简洁]\r\n查重时间：${selectTime}\r\n总文字复制比：${rate}\r\n\r\n查重结果仅作参考，请注意辨别是否为原创`
        }
        else {
          let createTime = parseTime(this.result.related[0].reply.ctime, "{y}-{m}-{d} {h}:{i}:{s}");  //发布时间
          tmp = `@ProJectASF × 枝网文本复制检测报告[简洁]\r\n查重时间：${selectTime}\r\n总文字复制比：${rate}\r\n相似小作文：${this.result.related[0].reply_url}\r\n作者：${this.result.related[0].reply.m_name}\r\n发表时间：${createTime}\r\n\r\n查重结果仅作参考，请注意辨别是否为原创`
        }
        copy(tmp) &&
            this.$message({
                message: "收到收到收到，复制成功了捏",
                type: "success",
            });
    },
    //提交
    async submit(){
        if(this.search.length < 10) {
          this.$message({message: '至少十个字捏', type: 'warning'});
          return;
        }
        this.$loading();
        try {
            const res = await this.$request({
                baseURL: 'https://asoulcnki.asia/v1/api/check',
                method: 'post',
                headers: {
      　　　　    'Content-Type': 'application/json'
      　　      },
                data: {text: this.search}
            })
            this.$nextTick(() =>{
                if(res.related.length == 0) {
                    this.$message({message: '没有重复的小作文捏', type: 'success'});
                }
                else {
                    res.related.forEach((item) =>{
                        item.reply.createTime = parseTime(item.reply.ctime, '{y}/{m}/{d} {h}:{i}')
                    })
                }
                this.result = res;
                console.log(this.result);
            })
        } catch (error) {
          this.$message({message: error, type: 'error'});
        } finally{
          this.$closeLoading();
        }
    },
    toPercent(point){
        var str=Number(point*100).toFixed(2);
        str+="%";
        return str;
    },
    toUrl(url){
        window.open(url, '_blank') // 新窗口打开外链接
    },
  }
}
</script>

<style lang="less" scoped>
@import "./checkArticle.less";
</style>

