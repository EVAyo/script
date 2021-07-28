   <template>
  <container class="home-container">
    <!-- 头部区域 -->
    <header>
      <div>
        <img src="logo.png" alt="" />
        <span>表情包合集</span>
      </div>
      <button type="info"></button>
    </header>

    <!-- 页面主体区域 -->
    <container>
      <!-- 右侧内容主体 -->
      <!-- 路由占位符 -->
      <router-view></router-view>
      <!--  卡片视图区域 -->
      <card>
        <row>
          <button type="primary">添加图片</button>
        </row>
      </card>

      <div class="block">
        <span class="demonstration">默认</span>
      </div>

      <div class="container">
        <div class="waterfall">
          <my-waterfall :data="listone"></my-waterfall>
        </div>
      </div>
    </container>
  </container>
</template>

<script>
import myWaterfall from "@/components/mywaterfall";

export default {
  components: { myWaterfall },

  data() {
    return {
      listone: [],
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
  height: 80%;
  width: 90%;
   background: #282828 url('~@/assets/img/emoji/bgp.png')
    repeat 250px 50px;
      background-size: 100% 100%;/*按比例缩放*/
}
.header {
  background-color: #6d25a7;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
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

.aside {
  background-color: #403f8d;
  .menu {
    border-right: none;
  }
}

.main {
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