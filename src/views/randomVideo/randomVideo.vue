<template>
  <div class="random-video">
    <img src="../../assets/img/random/random-background.png" alt="" class="background-img" >
    <!-- <iframe src="" frameborder="0"></iframe> -->
    <div class="iframe-box">
      <iframe
      class="iframe-class"
    :src="iframeSrc"
     STYLE="background-color: #fff"
    scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true">
      </iframe>
      <div class="random-button" @click="getRandomVideo"></div>
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
    this.getRandomVideo()
  },
  methods:{
    async getRandomVideo(){
      try {
        this.$loading()
        const res =  await  this.$request('api/stroll/random')
        this.iframeSrc = res.play_url
      } catch (error) {
        console.log(error);
      }finally{
        this.$closeLoading()
      }

    }
  }
}
</script>

<style lang="less" scoped>
.random-video{
  position: relative;
  height: 100vh;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
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
  display: flex;

  align-items: flex-end;
  justify-content: center;
}
.iframe-class{
  width: 40vw;
  height: 30vw;
  min-width: 600px;
  min-height: 450px;
  border: 5px solid #c343dc;
}
.random-button{
  background-color: #333;
  cursor: pointer;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  background: #943fef;
  outline: 1px solid;
  outline-color: rgba(148,63,239, 1);
  background: url("../../assets/img/random/random-button.jpg") no-repeat center /cover;
  -webkit-transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
  transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
  -moz-transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1); /* Firefox 4 */
  -webkit-transition:all 1250ms cubic-bezier(0.19, 1, 0.22, 1); /* Safari 和 Chrome */
  -o-transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1); /* Opera */
}
.random-button:hover{
  border: 1 solid;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.2);
  outline: 5px solid;
  outline-color: rgba(148,63,239, 0);
  outline-offset: 20px;
  text-shadow: 1px 1px 2px #427388;
}
</style>
