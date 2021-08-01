<template>
  <!-- <div class="contain"> -->
    <!-- <div class="nav-common" :class="[isLongNav ? 'nav-long' : 'nav-short']">
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

      >
      <div  class="nav-item-common"
        >
        <img v-show="isLongNav" class="img" :src="item.imgLong" alt="" />
        <img v-show="!isLongNav" class="img" :src="item.imgShort" alt="" />
        <div v-if="currentPageName!==item.routeName" class="nav-mask" ></div>

      </div>
      </router-link>
    </div> -->
    <!--  -->
    <div  >
      <div class="nav-contain">
        <router-link v-for="(item, index) in routeList" :key="index"
        :to="item.route"
        :title="item.titleName"
        class="box" :class="'item-'+item.routeName"
        >
        <div v-if="currentPageName!==item.routeName" class="nav-mask"></div>
        </router-link >
      </div>

    <div class="route-view-class" id="myRouteView" ref="myRouteView">
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
          imgShort: require("../assets/img/contents/index-short.png"),
          imgLong: require("../assets/img/contents/zhiNet-long.png"),
          routeName: "Index",
          titleName:"首页",
          route: "/",
        },
        {
          imgShort: require("../assets/img/contents/zhiNet-short.png"),
          imgLong: require("../assets/img/contents/zhiNet-long.png"),
          routeName: "checkArticle",
          titleName:"知网查重",
          route: "/tools/checkArticle",
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
          routeName: "timeline",
          titleName:"大事件时间线",
          route: "/tools/timeline",
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
          routeName: "streamArchives",
          titleName:"直播内容归档",
          route: "/tools/streamArchives",
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
  created() {
    this.$route.name;
  },
  mounted(){
      // 监听这个dom的scroll事件
      this.$refs.myRouteView.onscroll  = (e) => {
        console.log('on scroll')
          if (!this.routeViewScroll) {
            this.routeViewScroll = true
              setTimeout(async()=> {

                  this.temp(e)

                 this.routeViewScroll = false
              }, 400)
          }

      }

  },
  methods: {
      // 临时函数 可删
      temp(e){
       console.log(this.$refs.myRouteView.scrollTop);
       console.log(this.$refs.myRouteView.scrollHeight);
       console.log(this.$refs.myRouteView.offsetHeight);
    },
  },
};
</script>

<style scoped lang="less">
@import "./transition.less";

.nav-contain{
    position: fixed;
    z-index: 100000;
    display: flex;
    height: 100vh;
    flex-direction: column;
    justify-content: flex-start;
    padding: 10px 0;
    width: 18.5vh;
    background-color: transparent;
}
.box{
    position: relative;
    margin-top: 10px;
    width: 18.5vh;
    height: 11vh;
    min-width: 75px;
    min-height: 45px;
    border-radius: 4px;
    // background-image: url("../assets/img/contents/zhiNet-short.png");
    transition:width 0.5s ,background-image .2s,min-width 0.5s;
    background-repeat: no-repeat;
    background-size: 100%;
}
.box:hover{
    width: 37vh;
    min-width: 150px;
    // background-image: url("../assets/img/contents/zhiNet-long.png");
}
.item-Index{
background-image: url("../assets/img/contents/index-short.png");
}
.item-Index:hover{
    background-image: url("../assets/img/contents/index-long.png");
}

// 查重
.item-checkArticle{
background-image: url("../assets/img/contents/zhiNet-short.png");
}
.item-checkArticle:hover{
    background-image: url("../assets/img/contents/zhiNet-long.png");
}

.item-part{
background-image: url("../assets/img/contents/component-short.png");
}
.item-part:hover{
    background-image: url("../assets/img/contents/component-long.png");
}

.item-wordCloud{
background-image: url("../assets/img/contents/WordCloud-short.png");
}
.item-wordCloud:hover{
    background-image: url("../assets/img/contents/WordCloud-long.png");
}

.item-timeline{
background-image: url("../assets/img/contents/event-short.png");
}
.item-timeline:hover{
    background-image: url("../assets/img/contents/event-long.png");
}

.item-fanQuery{
background-image: url("../assets/img/contents/fansQuery-short.png");
}
.item-fanQuery:hover{
    background-image: url("../assets/img/contents/fansQuery-long.png");
}
.item-emoji{
background-image: url("../assets/img/contents/meme-short.png");
}
.item-emoji:hover{
    background-image: url("../assets/img/contents/meme-long.png");
}

.item-streamArchives{
background-image: url("../assets/img/contents/liveFile-short.png");
}
.item-streamArchives:hover{
    background-image: url("../assets/img/contents/liveFile-long.png");
}

.item-randomVideo{
background-image: url("../assets/img/contents/random-short.png");
}
.item-randomVideo:hover{
    background-image: url("../assets/img/contents/random-long.png");
}

/////////////////////////////////////////////////////////////////////

// // 页面容器
// .contain {
//   display: flex;
//   overflow: hidden;
//   max-height: 100vh;
// }
// // 导航栏最外层
// .nav-common {
//   // float: left;
//   position: fixed;
//   z-index: 10000;
//   // max-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   background-color: black;
//   overflow: hidden;
// }
// .nav-long {
//   width: 37vh;
//   max-width: 370px;
//   min-width: 185px;
// }
// .nav-short {
//   width: 18.5vh;
//   max-width: 185px;
//   min-width: 92.5px;
// }

// // 导航栏item
// .nav-item-common {
//   margin-bottom: 1px;
//   height: 11.1vh;
//   max-height: 222px;
//   min-height: 55.5px;
//   display: flex;
//   width: 100%;
//   position: relative;
// }
// .nav-item-long {
//   // height: 11.1vh;
// }
// .nav-item-short {
// }
// // 遮罩层
.nav-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  transition: opacity 0.5s;
  -moz-transition: opacity 0.5s; /* Firefox 4 */
  -webkit-transition: opacity 0.5s; /* Safari 和 Chrome */
  -o-transition: opacity 0.5s; /* Opera */
  background-color: rgba(0, 0, 0, 0.5);
}
.nav-mask:hover {
  // background-color: rgba(0, 0, 0, 0);
  opacity: 0;
}
.route-view-class {
  position: relative;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background: #2B343A;
}


</style>
