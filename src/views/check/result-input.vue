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
 .result-input{
     margin-top: 13px;
     padding: 15px;
     box-sizing: border-box;
     width: 1073px;
    //  height: 125px;
     border: 3px solid #f2f2f2;
     .result-input_ul{
         display: flex;
         flex-wrap:nowrap;
         font-size: 16px;
         margin-bottom:15px;
         li{
             margin-right: 15px;
             white-space:nowrap;
         }
         .li_1{
            //  width: 180px;
         }
         .li_2{
             color: #c678d0;
            //  width: 140px;
         }
         .li_3{
            //  width: 250px;
         }
         .li_4{
             flex: 1;
             color: #943fef;
             cursor: pointer;
         }
     }
    .result_content{
        font-size:15px;
        line-height: 1.6;
    }
 }
</style>
