   <template>





<el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="logo.png" alt="">
        <span>表情包合集</span>
      </div>
      <el-button type="info" >图片</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
 <!-- 侧边栏 -->
       <el-image 
       :src="'require(../../assets/img/coca.jpg)'"
      ></el-image>
      <el-aside :width="isCollapse ? '64px' : '200px'">
      </el-aside>

      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      
      <div class="waterfall">
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
      listone: [
    
          {
            
      
          imgSrc: "emoji/?page=${page}&limit=${pageSize}",
          avatar: require("../../assets/img/emoji/colorOfficial.png"),
          user: "a",
          vote_num: 999,
          title: "Noice cancelling is a secret",
        }
        
      ],
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
           responseType: 'blob'
        });
        console.log(res);
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
  height: 100%;
  width: 100%;
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
  background:url("../assets/emoji/bgp.png");
  background-color: #6d2a94;
  width: 100%;


      position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
 
    height: 100vh;
   
    overflow: hidden;
 
}

@import "./emoji.less";
</style>