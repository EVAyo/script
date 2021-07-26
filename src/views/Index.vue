<template>
  <div class="index">
    <img src="../assets/img/BackGround.gif" class="index-bg">
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
  // width: 100%;
  // height: 100%;
  width: calc(100% - 20vw);
  height: 100vh;
}
.index-bg{
    width: 100%;
    height: 100vh;
    object-fit: cover
}
</style>