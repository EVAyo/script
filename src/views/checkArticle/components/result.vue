<!-- 查重返回结果 -->
<template>
  <div class="result-input" v-if="data!=null">
      <ul class="result-input_ul" >
          <li class="li_1">发表时间：<span>{{data.reply.createTime}}</span></li>
          <li class="li_2">重复率：{{toPercent(data.rate)}}</li>
          <li class="li_3">作者：{{data.reply.m_name}}</li>
          <li class="li_4" @click="toUrl">原文地址</li>
      </ul>
      <div class="result_content">
          {{data.reply.content}}
      </div>
  </div>
</template>
<script>
export default {
props:{
    result: {
        type: Object,
        // default: () => {}
    }
},
  name: "app",
  data() {
    return {
        data: null,
    }
  },
  components: {
  },
  computed: {
    //   checkData(){
    //       return this.result;
    //   },
  },
  watch:{
    //   checkData(val) {
    //      this.data = val;
    //      console.log(this.data);
    //   }
    result:function (newVal,oldVal) {
        // console.log(newVal);
        this.data=newVal;
    }
  },

  mounted() {
      this.getDate()
  },
  
  methods: {
      getDate(){
          this.data=this.result
      },
      toPercent(point){
        var str=Number(point*100).toFixed(2);
        str+="%";
        return str;
      },
      toUrl(){
          window.open(this.data.reply_url, '_blank') // 新窗口打开外链接
      },
  }
}
</script>

<style lang="less" scoped>
@import "./result.less";
</style>
