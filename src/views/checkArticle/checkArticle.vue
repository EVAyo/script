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
          :maxlength="maxSearchLength"
          class="search-input">
        </textarea>

        <!-- 文本框里面的配置 -->
        <div class="textBottom">
          <ul class="left">
            <!-- <li>种类：</li> -->
            <!-- <li class="copy" @click="handlerCopyText" v-if="result.related">复制查询结果</li> -->
            <li class="li_bottom">总复制占比：<span>{{toPercent(result.rate)}}</span></li>
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
      <Article
        v-for="(item, index) in alike" 
        :key="index" 
        :result="item"
      />
    </div>
    <!-- 左边输入文本框 end -->   

    <RightContent/>
  </div>
</div>


</template>

<script>


import Article from './components/result';
import RightContent from './components/right'
import { parseTime } from "@/utils/time";
import axios from 'axios'
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
      alike:[],
      maxSearchLength: 1000,
    }
  },
  components: {
    Article,
    RightContent
  },
  mounted() {
    this.result = {
      related: false,
      rate: 0
    }
    this.alike = []
  },
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
      const status = copy(tmp)
      if (status) {
        this.$message({ message: "复制成功,适度玩梗捏", type: "success"});
      } else {
        this.$message({ message: "复制失败", type: "error"});
      }
    },
    //提交
    submit(){
      if(this.search.length < 10) {
        this.$message({message: '至少十个字捏', type: 'warning'});
        return;
      }

      this.$loading();
      axios.post('https://asoulcnki.asia/v1/api/check', {text: this.search})
        .then(res => {
          const data = res.data.data
          if (res.data.code) {
            this.$message({message: data.message, type: 'error'})
            return
          }
          if (data.related.length == 0) {
            this.$message({message: '没有重复的小作文捏', type: 'success'});
            return
          }
          data.related.forEach(s => {
            s.reply.createTime = parseTime(s.reply.ctime, '{y}/{m}/{d} {h}:{i}')
          });
          this.result = data
          this.alike = data.related
        })
        .catch(err => {
          this.$message({message: err, type: 'error'})
        })
        .finally(() => {
          this.$closeLoading();
        })
    },
    toPercent(){
      const point = this.result.rate
      return Number(point * 100).toFixed(2) + '%';
    }
  }
}
</script>

<style lang="less" scoped>
@import "./checkArticle.less";
</style>
