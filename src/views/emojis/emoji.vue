   <template>

 <container class="home-container">
    <!-- 头部区域 -->
    <header>
      <div>
        <img src="logo.png" alt="">
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

 listone:[],
}},

  
    //方法
 methods:{
 GetLIstImg(){

    this.axios.get('https://meme-api.asoulfan.cn/?page=1&limit=5')
    .then(response=>{
      this.listone==response.data.data.url;
    },(err)=>{
      console.log(this.url);
    })
    axios.get('emoji/').then((dat)=>{
      this.listone=response.data.data.listone;
    },(err)=>{
      console.log(this.id);
    })
    
 
 }
}
}

</script>

<style lang="less" scoped>
.home-container {
  height: 80%;
  width: 90%;
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

.el-main {
  background-color: #6d2a94;
  width: 100%;
}



@import "./emoji.less";
</style>