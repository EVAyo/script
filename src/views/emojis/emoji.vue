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
    <el-container>
 <!-- 侧边栏 -->
   
      <!-- <el-aside :width="isCollapse ? '64px' : '200px'">
      </el-aside> -->

      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <!-- <router-view></router-view> -->
      
      <div class="waterfall">
        <!-- <div v-for="item in listone" :key="item.id">
            <img :src="item.url" alt="" style="width:20px;height:20px">
        </div> -->
          <my-waterfall :data="listone"></my-waterfall>
        </div>
      
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import myWaterfall from "@/components/mywaterfall";

export default {
  components: { myWaterfall },

  data() {
    return {
      listone: [ ],
      // 当前页
      currentPage:1,
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
        this.$closeLoading();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  position: relative;
  // height: 100%;
  // width: 100%;
  background: #6d25a7 ;
  background-size: 100% 100%;/*按比例缩放*/
}
.el-header {
 
  background: #6d25a7 ;
  display: flex;
  justify-content: space-between;
  padding-left: 100;
  align-items: center;
  color: #fff;
  font-size: 30px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 20px;
    }
  }
}

.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #6d2a94;
  background:url("../../assets/img/emoji/bgp.png");
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
}
@import "./emoji.less";
</style>