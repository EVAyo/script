<template>
  <div class="temp">
    <waterfall :col="col" :data="data">
      <!--  @loadmore="loadmore"
          @scroll="scroll" -->
      <template>
        <div class="cell-item" v-for="(item, index) in data" :key="index">
          <img :src="item.url" alt="加载错误" />
        </div>
      </template>
    </waterfall>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      col: 4,
    };
  },
  methods: {},
};
</script>



<style lang="scss" scoped>
.cell-item {
  width: 96%;
  margin-bottom: 7px;
  background: #ffffff;
  border: 5px solid #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
  box-sizing: border-box;
  img {
    width: 90%;
    height: auto;
    display: block;
  }
}
</style>