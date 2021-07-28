<template>
  <div class="index">
    <div class="index-tools" >
      <img src="../assets/img/Index/tools.png"  class="img" alt="" >
      <img src="../assets/img/Index/tools.png"  alt="" >
      <img src="../assets/img/Index/tools.png"  alt="" >
      <img src="../assets/img/Index/tools.png"  alt="" >
    </div>
    <img src="../assets/img/Index/BackGround.gif" class="index-bg">
  </div>
</template>

<script>
export default {
  name: 'Index',
  components: {
  }
}
</script>

<style lang="less" scoped>
.index{
  position: relative;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  overflow: scroll;
  z-index: 0;
}
.index-bg{
  position: absolute;
    width: 100%;
    height: 100vh;
    filter: blur(20px);
    object-fit: cover
}
.index-tools{
  width: 60vw;
  right: 0;
  position: absolute;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-right: 40px;
  // background-image: url('../assets/img/Index/tools.png');
  img{
    width: 69vw;
    height: 14vw;
    max-height: 22vh;
    // position: relative;
    // right: 0;
    // height: 20%;
    // width: 98.5%;
    margin:10px;
  } 
}
</style>