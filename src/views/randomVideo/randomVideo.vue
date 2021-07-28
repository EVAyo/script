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
      <div class="random-button"></div>
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
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  min-width: 600px;
  min-height: 300px;
  //object-fit: cover;
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
  opacity: 1;
  background-color: #333;
  width: 50px;
  padding-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  background: url("../../assets/img/random/random-button.jpg") no-repeat center /cover;
}
.random-button:hover{
  background: url("../../assets/img/random/random-button-on.png") no-repeat center /cover;
}
.random-button:active{
  background: url("../../assets/img/random/random-button-click.png") no-repeat center /cover;
}
</style>