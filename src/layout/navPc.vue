<!--
 * @Author: maggot-code
 * @Date: 2021-07-24 16:44:50
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-07-24 17:03:43
 * @Description: file content
-->
<template>
  <div class="contain">
    <div :class="[isLongNav ? 'index-nav-long' : 'index-nav']">
      <router-link to="/">
        <div class="first" :class="[isLongNav ? 'nav-item-long' : 'nav-item']">
          <img
            v-show="isLongNav"
            class="img"
            src="../assets/img/contents/index-long.png"
            alt=""
          />
          <img
            v-show="!isLongNav"
            src="../assets/img/contents/index-short.png"
            alt=""
          />
          <div class="nav-cover"></div>
        </div>
      </router-link>

      <router-link v-for="item in routeList" :key="item.Name" :to="item.route">
        <div :class="[isLongNav ? 'nav-item-long' : 'nav-item']">
          <img v-show="isLongNav" class="img" :src="item.imgLong" alt="" />
          <img v-show="!isLongNav" class="img" :src="item.imgShort" alt="" />
          <!--  <div v-if="isLongNav" class="text">{{ item.Name }}</div> -->
          <div v-if="isLongNav" class="text">
            {{ item.Name }}
          </div>
          <div class="nav-cover"></div>
        </div>
      </router-link>
    </div>
    <!-- <div class="route-view-class"> -->
    <!-- <transition name="turn-down"> -->
      <!-- <div class="route-view-class" >

        </div> -->
      <router-view />
    <!-- </transition> -->
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      tempCss: "turn-down",
      isLongNav: this.$route.name == "Index" ? true : false,
      routeList: [
        {
          imgShort: require("../assets/img/contents/fansQuery-short.png"),
          imgLong: require("../assets/img/contents/fansQuery-long.png"),
          Name: "粉丝数实时查询",
          route: "/tools/fanQuery",
        },
        {
          imgShort:require("../assets/img/contents/zhiNet-short.png"),
          imgLong:require("../assets/img/contents/zhiNet-long.png"),
          Name: "知网查重",
          route: "",
        },
        {
          imgShort:require("../assets/img/contents/component-short.png"),
          imgLong: require("../assets/img/contents/component-long.png"),
          Name: "成分姬",
          route: "/tools/part",
        },
        {
          imgShort:require("../assets/img/contents/WordCloud-short.png"),
          imgLong: require("../assets/img/contents/WordCloud-long.png"),
          Name: "词云",
          route: "",
        },
        {
          imgShort:require("../assets/img/contents/event-short.png"),
          imgLong:require("../assets/img/contents/event-long.png"),
          Name: "大事件时间线",
          route: "",
        },
        {
           imgShort:require("../assets/img/contents/event-short.png"),
          imgLong:require("../assets/img/contents/event-long.png"),
          Name: "随机溜冰",
          route: "",
        },
        {
          imgShort:require("../assets/img/contents/event-short.png"),
          imgLong:require("../assets/img/contents/event-long.png"),
          Name: "表情包合集",
          route: "",
        },
        {
          imgShort:require("../assets/img/contents/event-short.png"),
          imgLong:require("../assets/img/contents/event-long.png"),
          Name: "直播归档",
          route: "",
        },
      ],
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
  computed: {},
  beforeCreate() {},
  created() {
  },
  methods: {
  },
};
</script>

<style scoped lang="less">
@import "./transition.less";

.contain {
  .index-nav-long {
    max-height: 100vh;
    overflow: auto;
    width: 20vw;
    min-width: 200px;
    scrollbar-width: none;
  }
  .index-nav {
    max-height: 100vh;
    overflow: auto;
    width: 10vw;
    min-width: 100px;
    scrollbar-width: none;
  }

  display: flex;
  .nav-item-long {
    width: 100%;
    // min-width: 387px;
    position: relative;
    height: 8vw;
    // min-height: 160.98px;
    color: #fff;
    display: flex;
    justify-content: flex-start;
    // align-items: flex-start;
    flex-direction: column;
    // animation: toLong  1s linear 0s 1;
    // animation-fill-mode: forwards;
  }
  // @keyframes toLong {
  //   0%{width: 10vw; min-width: 193.5px; opacity: 1;}
  //   100%{width: 20vw; min-width: 387px; opacity: 1;}
  // }

  .nav-item {
    position: relative;
    width: 10vw;
    // min-width: 200px;
    // min-height: 160.98px;
    height: 8vw;
    color: #fff;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;

    // animation:myfirst 1s linear 0s 1 ;
    // animation-fill-mode: forwards;
    //  animation-play-state: paused;
  }
  @keyframes myfirst {
    0% {
      width: 20vw;
      opacity: 1;
    }
    // 50%  { width: 15vw;  opacity: 0.5;}
    100% {
      width: 10vw;
      opacity: 1;
    }
  }
  // 遮罩层
  .nav-cover {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    transition: all 1s linear;
    -moz-transition: all 1s linear; /* Firefox 4 */
    -webkit-transition: all 1s linear; /* Safari 和 Chrome */
    -o-transition: all 1s linear; /* Opera */
    background-color: rgba(0, 0, 0, 0.5);
  }
  .nav-cover:hover {
    background-color: rgba(0, 0, 0, 0);
  }

  .first {
    height: 6vw !important;
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
    font-size: 1.1vw;
  }
  .img {
    height: 100%;
    width: 100%;
    z-index: -100;
  }
}
.route-view-class {
  position: relative;
  width: 100%;
  // height: 100%;
}
</style>