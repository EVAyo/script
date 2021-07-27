<template>
  <div>
    <waterfall :col="col" :data="data">
      <!--  @loadmore="loadmore"
          @scroll="scroll" -->
      <template>
        <div class="cell-item" v-for="(item, index) in data" :key="index">
          <img :src="item.url" alt="加载错误" />
          <div class="item-body">
            <div class="item-desc">{{ item.title }}</div>
            <div class="item-footer">
              <div class="footer-left">
                <img :src="item.avatar" alt="" srcset="" />
                <div class="name">{{ item.id }}</div>
              </div>
              <div class="like">
                <div class="like-total">{{ item.id }}</div>
              </div>
            </div>
          </div>
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
.item-body {
  margin: 15px;
  .item-desc {
    text-align: left;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 30px;
    color: #000000;
  }
  .item-footer {
    display: flex;
    justify-content: space-between;
    .footer-left {
      display: flex;
      align-items: center;
      font-family: SF Pro Display;
      font-style: normal;
      font-weight: normal;
      font-size: 10px;
      line-height: 10px;
      color: rgba(0, 0, 0, 0.6);
      img {
        border-radius: 100%;
        width: 22px;
        height: 22px;
        margin-right: 5px;
      }
    }
    .like {
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: SF Pro Display;
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      line-height: 14px;
      color: rgba(85, 85, 85, 0.4);
      img{
          margin-right: 4px;
      }
    }
  }
}
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