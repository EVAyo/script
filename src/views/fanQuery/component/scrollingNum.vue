<template class="scrollingNum">
<div class="scrollingNumBox">
  <div class="animBox" :style="{top:(-1*nowNum*40)+'px'}" >
    <div class="scNumber" v-for="cntNum in 10" :key="cntNum">{{cntNum-1}}</div>
  </div>
</div>
</template>

<script>
export default {
  name:"scrollingNum",
  props: ['nowNum'],
}
</script>

<style lang="less" scoped>
.scrollingNumBox{
  display: inline-block;
  position: relative;
  color:white;
  font-size: 30px;
  width:18px;
  height:38px;
  overflow: hidden;
}
.animBox{
  position:absolute;
  text-align:center;
  transform-origin: 0 0;
  transition: top 0.8s;
}
.scNumber{
  line-height: 40px;
}
</style>