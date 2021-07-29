<template>
<el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <!-- <img src="logo.png" alt=""> -->
        <span>表情包合集</span>
      </div>
      <el-button type="info" >图片</el-button>

    </el-header>
    <!-- 页面主体区域 -->

<el-row :gutter="5" >
  <el-col :span="5" :offset="0"><el-image src="../../assets/img/emoji/ava.png"></el-image></el-col>
  <el-col :span="5" :offset="1"><el-image src="../../assets/img/emoji/bella.png"></el-image></el-col>
  <el-col :span="5" :offset="2"><el-image src="../../assets/img/emoji/carol.png"></el-image></el-col>
  <el-col :span="5" :offset="3"><el-image src="../../assets/img/emoji/diana.png"></el-image></el-col>
  <el-col :span="5" :offset="4"><el-image src="../../assets/img/emoji/eileen.png"></el-image></el-col>
</el-row>


<ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
    <li v-for="item in listone" :key="item.id" class="infinite-list-item">{{ item }}</li>
  </ul>


      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <!--<router-view></router-view>-->
      


      </el-main>
         
 <el-header>
    </el-header>
      <div class="waterfall">
        <!-- <div v-for="item in listone" :key="item.id">
            <img :src="item.url" alt="" style="width:20px;height:20px">
        </div> -->
          <my-waterfall :data="listone"></my-waterfall>
        </div>
     
    
 <el-footer>
	<img src="..\..\assets\img\emoji\note.png" width="90%">
</el-footer>



<link rel="stylesheet" href="https://unpkg.com/element-ui@1.4/lib/theme-default/index.css">

</el-container>
</template>

<script src="https://unpkg.com/element-ui@1.4/lib/index.js"></script>

<script>
import myWaterfall from "@/components/mywaterfall";

export default {
  components: { myWaterfall },

  data() {
    return {
      listone: [],
      // 当前页
      currentPage:1,

       count: 0,
    };
  },
  created() {
    this.GetLIstImg(this.currentPage, 10);
  },

  methods: {
    async GetLIstImg(page, pageSize) {
      try {
        this.$loading();
        const res = await this.$request({
          url: `emoji/?page=${page}&limit=${pageSize}`,
          //  responseType: 'blob'
        });
        let tempList = [...this.listone]
        res.forEach((ele)=>{
            tempList.push({
              id:ele.id,
              url: 'https://'+ ele.url
            })
        })
        this.listone = [...tempList]
      } catch (error) {
        console.log(error);
      } finally {
        //console.log(res);
      this.$closeLoading();
      }
    },


 load () {
        this.count += 2
      }


  },
};
</script>



<style lang="less" scoped>
.home-container {
  padding-left: 100;
  height: 300%;
  width: 100%;
  left:30px;
  background: #1d1d1d ;
 background-size: 100% 100%;/*按比例缩放*/
}
.el-header {
  width: 100%;
   left:10%;
  background: #6d25a7 ;
  display: flex;
  justify-content: space-between;
  padding-left: 10;
  align-items: center;
  color: #fff;
  font-size: 30px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 30px;
    }
  }
}


 .el-row {
    margin-bottom: 100px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 40px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

.el-main {
  background-image: url("../../assets/img/emoji/bgp.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #1d1d1d;
  width: 100%;


    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
 
    height: 100vh;
   
    overflow: hidden;
 
}
.el-main2 {
  
  background-color: #1d1d1d;
  width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
   overflow: hidden;
 
}


.waterfall{
  position: relative;
  background-image:"../../assets/img/emoji/bgp.png";
}


.el-footer {
 
 width: 100%;
  display: flex;
  justify-content: space-between;
 
  align-items: center;

  font-size: 10px;
background-size :10%;
background-color:#1d1d1d
  }


@import "./emoji.less";
</style>