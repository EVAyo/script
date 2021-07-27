<template>
  <div class="contain">
    <div class="nav-common" :class="[isLongNav ? 'nav-long' : 'nav-short']">
      <!--  -->
      <!--  -->
      <router-link title="小工具首页" to="/">
        <div
          class="nav-item-common"
          :class="[isLongNav ? 'nav-item-long' : 'nav-item-short']"
        >
          <img
            v-show="isLongNav"
            class="img"
            src="../assets/img/contents/index-long.png"
            alt=""
          />
          <img
            v-show="!isLongNav"
            class="img"
            src="../assets/img/contents/index-short.png"
            alt=""
          />
          <div v-if="currentPageName!=='Index'" class="nav-mask"></div>
        </div>
      </router-link>
      <router-link
        v-for="(item, index) in routeList"
        :title="item.titleName"
        :key="index"
        :to="item.route"
        class="nav-item-common"
        :class="[true ? 'nav-item-long' : 'nav-item-short']"
      >
        <img v-show="isLongNav" class="img" :src="item.imgLong" alt="" />
        <img v-show="!isLongNav" class="img" :src="item.imgShort" alt="" />
        <div v-if="currentPageName!==item.routeName" class="nav-mask" ></div>
      </router-link>
    </div>
    <div class="route-view-class">
      <transition :name="transitionName">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      transitionName: "slide-left",
      isLongNav: this.$route.name == "Index" ? true : false,
      currentPageName: this.$route.name,
      routeList: [
        {
          imgShort: require("../assets/img/contents/zhiNet-short.png"),
          imgLong: require("../assets/img/contents/zhiNet-long.png"),
          routeName: "",
          titleName:"知网查重",
          route: "",
        },
        {
          imgShort: require("../assets/img/contents/component-short.png"),
          imgLong: require("../assets/img/contents/component-long.png"),
          routeName: "part",
          titleName:"成分姬",
          route: "/tools/part",
        },
        {
          imgShort: require("../assets/img/contents/WordCloud-short.png"),
          imgLong: require("../assets/img/contents/WordCloud-long.png"),
          routeName: "wordCloud",
          titleName:"词云",
          route: "/tools/wordCloud",
        },
        {
          imgShort: require("../assets/img/contents/event-short.png"),
          imgLong: require("../assets/img/contents/event-long.png"),
          routeName: "",
          titleName:"大事件时间线",
          route: "",
        },
        {
          imgShort: require("../assets/img/contents/fansQuery-short.png"),
          imgLong: require("../assets/img/contents/fansQuery-long.png"),
          routeName: "fanQuery",
          titleName:"粉丝实时查询",
          route: "/tools/fanQuery",
        },
        {
          imgShort: require("../assets/img/contents/meme-short.png"),
          imgLong: require("../assets/img/contents/meme-long.png"),
          routeName: "emoji",
          titleName:"表情包收集",
          route: "/tools/emoji",
        },
        {
          imgShort: require("../assets/img/contents/liveFile-short.png"),
          imgLong: require("../assets/img/contents/liveFile-long.png"),
          routeName: "",
          titleName:"直播内容归档",
          route: "",
        },

        {
          imgShort: require("../assets/img/contents/random-short.png"),
          imgLong: require("../assets/img/contents/random-long.png"),
          routeName: "randomVideo",
          titleName:"随机溜冰",
          route: "/tools/randomVideo",
        },
      ],
    };
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        console.log(val,oldVal);
        debugger
        this.currentPageName = val.name;
        if (val.name == "Index") {
          this.isLongNav = true;
        } else if (val.name != "Index" && this.isLongNav == true) {
          this.isLongNav = false;
        }
      },
      // 深度观察监听
      deep: true,
    },
  },
  computed: {},
  beforeCreate() {},
  created() {
    this.$route.name;
  },
  methods: {},
};
</script>

<style scoped lang="less">
@import "./transition.less";

// 页面容器
.contain {
  display: flex;
  overflow: hidden;
  max-height: 100vh;
}
// 导航栏最外层
.nav-common {
  // float: left;
  position: relative;
  z-index: 10000;
  // max-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: black;
  overflow: hidden;
}
.nav-long {
  width: 37vh;
  max-width: 370px;
  min-width: 185px;
}
.nav-short {
  width: 18.5vh;
  max-width: 185px;
  min-width: 92.5px;
}

// 导航栏item
.nav-item-common {
  margin-bottom: 1px;
  height: 11.1vh;
  max-height: 222px;
  min-height: 55.5px;
  display: flex;
  width: 100%;
  position: relative;
}
.nav-item-long {
  // height: 11.1vh;
}
.nav-item-short {
}
// 遮罩层
.nav-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  transition: all 0.5s linear;
  -moz-transition: all 0.5s linear; /* Firefox 4 */
  -webkit-transition: all 0.5s linear; /* Safari 和 Chrome */
  -o-transition: all 0.5s linear; /* Opera */
  background-color: rgba(0, 0, 0, 0.5);
}
.nav-mask:hover {
  // background-color: rgba(0, 0, 0, 0);
  opacity: 0;
}

.temp {
  animation: Yui 3s cubic-bezier(0, 1, 0, 1) 1s infinite;
}
@keyframes Yui {
  0% {
    transform: translateX(0px);
  }
  33% {
    transform: translateX(-960px);
  }
  66% {
    transform: translateX(-1920px);
  }
  100% {
    transform: translateX(0px);
  }
}
.route-view-class {
  position: relative;
  flex: auto;
  // width: 100%;
  height: 100vh;
  // overflow: scroll;
  overflow-y: scroll;
  scrollbar-width: thin;
}

.img {
  width: 100%;
  height: 100%;
  z-index: 0;
}
//   .img-leave{
//     transform: translateX(0);
//   }
// .img-leave-to{
//   transform: translateX(-100%);
// }
// .img-enter-active,.img-leave-active{
//   transition: 10s;

// }
</style>