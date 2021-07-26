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
  width: 100%;
  height: 100vh;
  z-index: 0;
}
.index-bg{
    width: 100%;
    height: 100vh;
    filter: blur(20px);
    object-fit: cover

}
</style>