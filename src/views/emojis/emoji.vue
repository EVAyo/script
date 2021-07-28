   <template>
<main class="main">
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
</main>
   
</template>

<script>

import myWaterfall from "@/components/mywaterfall";


export default {
  components: { myWaterfall },
  
  data() {

    return {

 listone:[

{
          imgSrc: require("../../assets/img/emoji/A.png"),
          avatar: require("../../assets/img/emoji/colorOfficial.png"),
          user: "a",
          id: 999,
          title: "Noice cancelling is a secret",
        },
      
        {
          imgSrc: require("../../assets/img/emoji/A.png"),
          avatar: require("../../assets/img/emoji/colorOfficial.png"),
          user: "Lewis",
          id: 999,
          title: "",
        },
        {
          imgSrc: require("../../assets/img/emoji/B.png"),
          avatar: require("../../assets/img/emoji/colorOfficial.png"),
          user: "Lewis",
          id: 999,
          title: "New Sneaker has just arrived",
        },


 ],
}},

  
    //方法
 methods:{
 GetLIstImg(){

    this.axios.get('https://meme-api.asoulfan.cn/?page=1&limit=5')
    .then(response=>{
      this.listone==response.data.data.listone;
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