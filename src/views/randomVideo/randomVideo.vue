<template>
  <div class="random-video">
    <img src="../../assets/img/random/random-background.png" alt="" class="background-img" >
    <!-- <iframe src="" frameborder="0"></iframe> -->
    <div class="iframe-box">
      <iframe 
      class="iframe-class"
    :src="iframeSrc" 
    scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true">
      </iframe>
      <img src="../../assets/img/random/random-button.jpg" class="random-button">
    </div>
    
    <!-- <img src="../assets/img/BackGround.gif" class="index-bg"> -->
  </div>
</template>

<script>
export default {
  name: 'randomVideo',
  components: {
  },
  data(){
    return {
      iframeSrc:"",
    }
  },
  created(){
    // this.getRandomVideo()
    this.iframeSrc ="//player.bilibili.com/player.html?bvid=BV1f54y1j7X8"
  },
  methods:{
    async getRandomVideo(){
    const res =  await  this.$request('api/stroll/random')
      console.log(res);
      // debugger
    }
  }
}
</script>

<style lang="less" scoped>
.random-video{
  position: relative;
  // width: 100%;
  height: 100vh;
  overflow: scroll;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  // background-color: black;
  // background-image: url('../../assets/img/ramdon-background.png');
}
.background-img{
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
  min-width: 600px;
  min-height: 300px;
}
.iframe-box{
  // border: 10px solid #c343dc;
  display: flex;
  flex-direction: column;
  width: 40vw;
  height: 30vw;
  min-width: 600px;
  min-height: 450px;
  align-items: center;
  justify-content: center;
}
.iframe-class{
  // width: 40vw;
  // height: 30vw;
  width: 100%;
  height: 100%;
  border: 5px solid #c343dc;
}
.random-button{
  opacity: 0.5;
    width: 50px;
    background-color: #333;
    color: #c242db;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    border-radius: 20%;
    margin-top: 20px;
}
.random-button:hover{
  opacity: 1;
}
</style>