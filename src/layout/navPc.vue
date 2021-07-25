<!--
 * @Author: maggot-code
 * @Date: 2021-07-24 16:44:50
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-07-24 17:03:43
 * @Description: file content
-->
<template>
  <div class="contain">
    <div class="index-nav" 
    :class="[isLongNav ? 'index-nav-long' : 'index-nav']"
    >
    <!-- 首页 -->
      <router-link to="/">
        <div
          class="first"
          :class="[isLongNav ? 'nav-item-long' : 'nav-item']"
        >
          <img class="img" :src="imgUrl.index" alt="" />
          <div class="nav-cover"></div>
          <!-- <div class="text"></div> -->
        </div>
      </router-link>

      <router-link to="/tools/fanQuery">
        <div :class="[isLongNav ? 'nav-item-long' : 'nav-item']">
          <img class="img" :src="imgUrl.fansQuery" alt="" />
          <div v-if="isLongNav" class="text">粉丝数实时查询</div>
        </div>
      </router-link>

      <div :class="[isLongNav ? 'nav-item-long' : 'nav-item']">
        <img class="img" :src="imgUrl.zhiNet" alt="" />
        <div v-if="isLongNav" class="text">知网查重</div>
      </div>

      <router-link to="/tools/part">
        <div :class="[isLongNav ? 'nav-item-long' : 'nav-item']">
          <img class="img" :src="imgUrl.component" alt="" />
          <div v-if="isLongNav" class="text">成分姬</div>
          <div class="nav-cover"></div>
        </div>
      </router-link>
      <div :class="[isLongNav ? 'nav-item-long' : 'nav-item']">
        <img class="img" :src="imgUrl.wordCloud" alt="" />
        <div v-if="isLongNav" class="text">词云</div>
      </div>
      <div :class="[isLongNav ? 'nav-item-long' : 'nav-item']">
        <img class="img" :src="imgUrl.event" alt="" />
        <div v-if="isLongNav" class="text">大事件时间线</div>
      </div>
      <div :class="[isLongNav ? 'nav-item-long' : 'nav-item']">
        <img class="img" :src="imgUrl.fansQuery" alt="" />
        <div v-if="isLongNav" class="text">随机溜冰</div>
      </div>
      <div :class="[isLongNav ? 'nav-item-long' : 'nav-item']">
        <img class="img" :src="imgUrl.fansQuery" alt="" />
        <div v-if="isLongNav" class="text">表情包合集</div>
      </div>
      <div :class="[isLongNav ? 'nav-item-long' : 'nav-item']">
        <img class="img" :src="imgUrl.fansQuery" alt="" />
        <div v-if="isLongNav" class="text">直播归档</div>
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      imgUrl: {
        index: require("../assets/img/contents/index-long.png"),
        fansQuery: require("../assets/img/contents/fansQuery-long.png"),
        zhiNet: require("../assets/img/contents/zhiNet-long.png"),
        component: require("../assets/img/contents/component-long.png"),
        wordCloud: require("../assets/img/contents/WordCloud-long.png"),
        event: require("../assets/img/contents/event-long.png"),
      },
      longImgUrl: {
        index: require("../assets/img/contents/index-long.png"),
        fansQuery: require("../assets/img/contents/fansQuery-long.png"),
        zhiNet: require("../assets/img/contents/zhiNet-long.png"),
        component: require("../assets/img/contents/component-long.png"),
        wordCloud: require("../assets/img/contents/WordCloud-long.png"),
        event: require("../assets/img/contents/event-long.png"),
      },
      shortImgUrl: {
        index: require("../assets/img/contents/index-short.png"),
        fansQuery: require("../assets/img/contents/fansQuery-short.png"),
        zhiNet: require("../assets/img/contents/zhiNet-short.png"),
        component: require("../assets/img/contents/component-short.png"),
        wordCloud: require("../assets/img/contents/WordCloud-short.png"),
        event: require("../assets/img/contents/event-short.png"),
      },
      isLongNav: true,
    };
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        if (val.name == "Index") {
          this.isLongNav = true;
          this.setImgurl("long");
        } else if (val.name != "Index" && this.isLongNav == true) {
          this.isLongNav = false;
          this.setImgurl();
        }
      },
      // 深度观察监听
      deep: true,
    },
  },
  methods: {
    setImgurl(type) {
      if (type == "long") {
        this.imgUrl = this.longImgUrl;
      } else {
        this.imgUrl = this.shortImgUrl;
      }
    },
  },
};
</script>

<style scoped lang="less">
.contain {
  .index-nav{
    min-height: 1080px;
  }

  display: flex;
  .nav-item-long {
    width: 20vw;
    min-width: 387px;
    position: relative;
    height: 15vh;
    min-height: 160.98px;
    color: #fff;
    display: flex;
    justify-content: flex-start;
    // align-items: flex-start;
    flex-direction: column;
  }
  .nav-item{
  position: relative;
  width: 20vw;
  min-width: 387px;
  min-height: 160.98px;
  height: 15vh;
	color: #fff;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
	animation:myfirst 1s linear 0s 1 ;
  animation-fill-mode: forwards;
  }
@keyframes myfirst
{
	0%   {  width: 20vw; min-width: 387px; opacity: 1;}
  50%  { width: 15vw;  min-width: 290.25px; opacity: 0.5;}
	100% { width: 10vw; min-width: 193.5px; opacity: 1;}
}
// 遮罩层
.nav-cover{
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  //  background-color: rgba(0, 0, 0, 0.7);
  // opacity: 0;
  // animation: disappear 1s linear 0s 1;
transition: all 1s linear;
-moz-transition: all 1s linear; /* Firefox 4 */
-webkit-transition:all 1s linear; /* Safari 和 Chrome */
-o-transition: all 1s linear; /* Opera */
}
.nav-cover:hover{
  background-color: rgba(0, 0, 0, 0.7); 
}

  .first {
    height: 6vw !important;
    min-height: 115.5px !important;
  }

  // .nav-item-long:hover {
  //   animation-name: example;
  //   animation-duration: 2s;
  // }
  .text {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1.62vw;
    z-index: 2;
    font-size: 28px;
  }
  .img {
    height: 100%;
    width: 100%;
    z-index: -100;
  }
 
  .nav-item {
    width: 10vw;
    min-width: 192px;
  }
}

// @keyframes example {
//   100% {
//     background-color: rgba(12, 2, 88, 0.9);
//   }
// }
// // 背景图片
// // 首页
// .index-short{
//   background-image: url('../assets/img/contents/index-short.png');
//   }
// .index-long{
//   background-image: url('/src/assets/img/contents/index-long.png');
// }
// // 粉丝查询
// .fanQuery-short{
//   background-image: url('../assets/img/contents/fansQuery-short.png')
// }
// .fanQuery-long{
//   background-image: url('../assets/img/contents/fansQuery-long.png');
// }
// // 知网查重
// .zhiNet-short{
//   background-image: url('../assets/img/contents/zhiNet-short.png');
// }
// .zhiNet-long{
//   background-image: url('../assets/img/contents/zhiNet-long.png');
// }
// // 成分姬
// .component-long{
//     background-image: url('../assets/img/contents/component-long.png');
// }
// .component-short{
//     background-image: url('../assets/img/contents/component-short.png');
// }
// // 词云
// .wordCloud-long{
//     background-image: url('../assets/img/contents/WordCloud-long.png');
// }
// .wordCloud-short{
//     background-image: url('../assets/img/contents/WordCloud-short.png');
// }
// // 大事件
// .event-long{
//     background-image: url('../assets/img/contents/event-long.png');
// }
// .event-short{
//     background-image: url('../assets/img/contents/event-short.png');
// }
</style>