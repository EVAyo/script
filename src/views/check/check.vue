<!-- 枝网查重 -->
<template>
  <div>
      <div class="div">
          <div class="logo">
              <img src="../../assets/img/logo.png" alt="">
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
                      <li class="li_bottom">总复制占比：<span v-if="result.rate">{{toPercent(result.rate)}}</span></li>
                    </ul>
                    <ul class="right">
                      <li class="content_length">{{search.length}}/1000字</li>
                      <li>
                        <button class="input_but" @click="submit">提交</button>
                      </li>
                    </ul>
                  </div>
                  <!-- 文本框里面的配置结束 -->
                  
                </div>
                <!-- 查询结果 -->
                <div v-for="(item,index) in result.related" :key="index" v-if="result.related.length > 0">
                  <resultInput :result="item"  v-if="item"></resultInput>
                </div>
                     
            </div>
            <!-- 左边输入文本框 end -->   

            <div class="content_right">
              <ul>
                <li class="intro">
                  枝网查重系统介绍
                </li>
                <li>
                  <p class="pink">比对库范围</p>
                  <p>B站动态视频评论区</p>
                </li>
                <li>
                  <p class="pink">参考文献</p>
                  <div>
                      [1]李旭.基于串匹配方法的文档复制 检测系统研究[D].燕山大学
                  </div>
                </li>
                <li>
                  <p class="pink">开源地址</p>
                  <div class="violet" @click="toUrl('https://github.com/ASoulCnki')">ASoulCnki</div>
                </li>
                <li>
                  <p class="pink">问题反馈戳这里↓</p>
                  <div class="violet" @click="toUrl('https://space.bilibili.com/1442421278')">ProjectASF</div>
                </li>
                <li>
                  <div><img src="../" alt=""></div>
                </li>
              </ul>
            </div>
          </div>



          


      </div>
  </div>
</template>
<script>
import resultInput from './result-input.vue';
import request from '@/assets/js/request';
import { parseTime } from "@/utils/time";
export default {
  name: "ASoulFanCheck",
  data() {
    return {
        search: '嘉然小姐嘉然小姐嘉然小姐',
        result:[],
    }
  },
  components: {
    resultInput,
  },
  computed: {
    
  },

  mounted() {},

  methods: {
    //提交
    async submit(){
//         fetch(`https://asoulcnki.asia/v1/api/check`, {
//  　       method:"POST",
//  　       mode: 'cors',
// 　　      headers: {
// 　　　　    'Content-Type': 'application/json'
// 　　      },
//       　　body:JSON.stringify({
//       　　    'text' : this.search
//       　　})
// 　　    })
//       .then(response => response.json())
//       .then(data => {
//           console.log(data.data.related);
//           this.result = data.data.related;
//           console.log(this.result[0]);
//       })
        // this.$loading();
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
                res.related.forEach((item) =>{
                    item.reply.createTime = parseTime(item.reply.ctime, '{y}/{m}/{d} {h}:{i}')
                })
                this.result = res;
                console.log(1);
            })
        } catch (error) {
          console.log(error);
        } finally{}
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
.div{
    width:100vw;
    min-height:100vh;
    background-color: #1d1d1d;
    color: #fff;
    padding:54px 90px 50px 100px;
    box-sizing:border-box;
    .logo{
        width: 486px;
        height: 121px;
        img{
            width:100%;
            height:100%;
            
        }
    }
    .content{
        margin-top:40px;
        width: 1073px;
        height: 280px;
        padding:27px 17px 10px 18px;
        border: 3px solid #f2f2f2;
        box-sizing: border-box;
        .search-input{
            width: 100%;
            height: 174px;
            background: #1d1d1d;
            border: none;
            box-sizing:border-box;
            color: #f2f2f2;
            font-size: 25px;
            outline: none;
            resize:none
        }
        // .search-input:fo
    }
}
// 文本框下面的div样式
.textBottom{
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  ul {
    // height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
.li_bottom{
  color: #c678d0;
  font-size: 16px;
}
.content_length{
  margin-bottom:5px;
}
.input_but{
  background: #943fef;
  color: #fff;
  height: 40px;
  width: 120px;
  outline: none;
  border: none;
}
.input_but:hover{
  cursor: pointer;
}
.left{
  height: 50px;
};
.right{
  margin-bottom:5px;
  li{
    text-align: center
  }
}

.BigContent{
  display: flex;
  .content_right{
    flex: 1;
    padding-left: 55px;
    box-sizing: border-box;
    margin-top: 50px;
    .intro{
      font-size:25px;
    }
    ul>li{
        margin-bottom: 50px;
        line-height:1.2;
        font-size: 20px;
        width:400px;
      p{
        height: 32px;
        font-size:22px;
      }
    }
  }
}
.pink{
  color: #c678d0;
}
.violet{
  color: #943fef;
  cursor: pointer;
}
</style>

