<template>
  <div class="index">
    <div class="index-tools">
      <img src="/image/tools.png"/>
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
@media only screen and (min-width: 1170px) {
 .index {
     margin-left: -18.5vh;
}
}
.index {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
  background-size: cover;
  animation: clipCircleIn 0.45s;
}
.index-tools {
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  margin-top: 140px;
  img {
    max-height: 22vh;
  }
}

@keyframes clipCircleIn {
  0% {
    // clip-path: circle(0 at 50% 50%);
  }
  100% {
    // clip-path: circle(100vh at 50% 50%);
  }
}
</style>
