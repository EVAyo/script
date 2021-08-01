<template>
  <div class="index">
    <div class="index-tools">
      <img src="/image/tools.png" class="img" alt />
      <img src="/image/tools.png" alt />
      <img src="/image/tools.png" alt />
      <img src="/image/tools.png" alt />
    </div>
    <div
      class="index-bg"
      :style="{ '--index-bgi': `url(${bgi}` }"
      v-if="bgiLoaded"
    />
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      bgi: "/image/BackGround.gif",
      bgiLoaded: false,
    };
  },
  components: {},
  mounted() {
    const _img = new Image();
    _img.src = this.bgi;
    _img.onload = () => (this.bgiLoaded = true);
  },
};
</script>

<style lang="less" scoped>
.index {
  position: relative;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  //overflow: scroll;
  overflow: hidden;
  z-index: 0;
}
.index-bg {
  position: absolute;
  width: 100vw;
  height: 100vh;
  filter: blur(20px);
  object-fit: cover;
  background-image: var(--index-bgi);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  animation: clipCircleIn 2s;
}
.index-tools {
  width: 60vw;
  right: 0;
  position: absolute;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-right: 40px;
  // background-image: url('../assets/img/Index/tools.png');
  img {
    width: 60vw;
    height: 14vw;
    max-height: 22vh;
    // position: relative;
    // right: 0;
    // height: 20%;
    // width: 98.5%;
    margin: 10px;
  }
}

@keyframes clipCircleIn {
  0% {
    clip-path: circle(0 at 50% 50%);
  }
  100% {
    clip-path: circle(100vh at 50% 50%);
  }
}
</style>
