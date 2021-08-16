<template>
  <div>
    <div :class="{ device: !device, 'expand-main': expand }" class="nav-contain">
      <div v-if="device" class="box item-Index" @click="toAsoulFan">
        <div v-if="currentPageName !== 'Index'" class="nav-mask"></div>
      </div>

      <router-link
          v-for="(item, index) in routeList"
          :key="index"
          :to="item.route"
          :title="item.titleName"
          class="box"
          :class="'item-' + item.routeName"
      >
        <div
            v-if="currentPageName !== item.routeName"
            class="nav-mask"
        ></div>
      </router-link>
    </div>
    <div v-if="!device" class="nav-btn" :class="{ expand }" @click="openMain">
      <i class="nav-btn-icon">
        <span />
        <span />
        <span />
      </i>
    </div>

    <div class="route-view-class" id="myRouteView" ref="myRouteView">
      <transition :name="transitionName">
        <keep-alive>
          <router-view />
        </keep-alive>
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
                // {
                //     imgShort: require("../assets/img/contents/index-short.png"),
                //     imgLong: require("../assets/img/contents/zhiNet-long.png"),
                //     routeName: "Index",
                //     titleName: "首页",
                //     route: "/",
                // },
                {
                    imgShort: require("../assets/img/contents/zhiNet-short.png"),
                    imgLong: require("../assets/img/contents/zhiNet-long.png"),
                    routeName: "checkArticle",
                    titleName: "枝网查重",
                    route: "/tools/checkArticle",
                },
                {
                    imgShort: require("../assets/img/contents/component-short.png"),
                    imgLong: require("../assets/img/contents/component-long.png"),
                    routeName: "part",
                    titleName: "成分姬",
                    route: "/tools/part",
                },
                // {
                //   imgShort: require("../assets/img/contents/WordCloud-short.png"),
                //   imgLong: require("../assets/img/contents/WordCloud-long.png"),
                //   routeName: "wordCloud",
                //   titleName:"词云",
                //   route: "/tools/wordCloud",
                // },
                {
                    imgShort: require("../assets/img/contents/event-short.png"),
                    imgLong: require("../assets/img/contents/event-long.png"),
                    routeName: "timeline",
                    titleName: "大事件时间线",
                    route: "/tools/timeline",
                },
                {
                    imgShort: require("../assets/img/contents/fansQuery-short.png"),
                    imgLong: require("../assets/img/contents/fansQuery-long.png"),
                    routeName: "fanQuery",
                    titleName: "粉丝实时查询",
                    route: "/tools/fanQuery",
                },
                {
                    imgShort: require("../assets/img/contents/meme-short.png"),
                    imgLong: require("../assets/img/contents/meme-long.png"),
                    routeName: "emoji",
                    titleName: "表情包收集",
                    route: "/tools/emoji",
                },
                {
                    imgShort: require("../assets/img/contents/liveFile-short.png"),
                    imgLong: require("../assets/img/contents/liveFile-long.png"),
                    routeName: "streamArchives",
                    titleName: "直播内容归档",
                    route: "/tools/streamArchives",
                },

                {
                    imgShort: require("../assets/img/contents/random-short.png"),
                    imgLong: require("../assets/img/contents/random-long.png"),
                    routeName: "randomVideo",
                    titleName: "随机溜冰",
                    route: "/tools/randomVideo",
                },
            ],
            expand: false
        };
    },
    watch: {
        $route: {
            handler: function (val, oldVal) {
                this.expand = false
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
    computed: {
        device () {
            return document.body.clientWidth > 1170
        }
    },
    created() {
        this.$route.name;
    },
    mounted() {
    },
    methods: {
        toAsoulFan() {
            window.location.href = "https://www.asoulfan.cn/"
        },
        openMain() {
            this.expand = !this.expand
        }
    },
};
</script>

<style scoped lang="less">
@import "./transition.less";

.nav-contain {
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
.box {
    cursor: pointer;
    position: relative;
    margin-top: 10px;
    width: 18.5vh;
    height: 11vh;
    min-width: 75px;
    min-height: 45px;
    border-radius: 4px;
    // background-image: url("../assets/img/contents/zhiNet-short.png");
    transition: width 0.5s, background-image 0.2s, min-width 0.5s;
    background-repeat: no-repeat;
    background-size: 100%;
}
.box:hover {
    width: 37vh;
    min-width: 150px;
    // background-image: url("../assets/img/contents/zhiNet-long.png");
}
.item-Index {
    background-image: url("../assets/img/contents/index-short.png");
}
.item-Index:hover {
    background-image: url("../assets/img/contents/index-long.png");
}

// 查重
.item-checkArticle {
    background-image: url("../assets/img/contents/zhiNet-short.png");
}
.item-checkArticle:hover {
    background-image: url("../assets/img/contents/zhiNet-long.png");
}

.item-part {
    background-image: url("../assets/img/contents/component-short.png");
}
.item-part:hover {
    background-image: url("../assets/img/contents/component-long.png");
}

.item-wordCloud {
    background-image: url("../assets/img/contents/WordCloud-short.png");
}
.item-wordCloud:hover {
    background-image: url("../assets/img/contents/WordCloud-long.png");
}

.item-timeline {
    background-image: url("../assets/img/contents/event-short.png");
}
.item-timeline:hover {
    background-image: url("../assets/img/contents/event-long.png");
}

.item-fanQuery {
    background-image: url("../assets/img/contents/fansQuery-short.png");
}
.item-fanQuery:hover {
    background-image: url("../assets/img/contents/fansQuery-long.png");
}
.item-emoji {
    background-image: url("../assets/img/contents/meme-short.png");
}
.item-emoji:hover {
    background-image: url("../assets/img/contents/meme-long.png");
}

.item-streamArchives {
    background-image: url("../assets/img/contents/liveFile-short.png");
}
.item-streamArchives:hover {
    background-image: url("../assets/img/contents/liveFile-long.png");
}

.item-randomVideo {
    background-image: url("../assets/img/contents/random-short.png");
}
.item-randomVideo:hover {
    background-image: url("../assets/img/contents/random-long.png");
}
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
    border-radius: 4px;
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


.mobile-box {
  position: fixed;
  top: 10px;
  left: 10px;
  width: 8vh;
  height: 8vh;
  border-radius: 50%;
  cursor: pointer;
  background-image: url("../assets/img/contents/index-short.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: 4;
}

.nav-btn {
  display: block;
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 5px;
  z-index: 100001;
  transition: transform ease-in-out 0.3s;
}

.nav-btn.expand {
  transform: translate(calc(100vw - 80px), 0);
}

.nav-btn-icon {
  display: block;
  position: relative;
  width: 30px;
  height: 30px;
  z-index: 100002;
}
.nav-btn-icon span {
  position: absolute;
  top: 50%;
  width: 100%;
  height: 3px;
  background-color: #ddd;
  transition: transform ease-in-out 0.3s;
}
.nav-btn-icon span:nth-child(1) {
  transform: translate(0, -350%);
}
.nav-btn-icon span:nth-child(2) {
  transform: translate(0, -50%);
}
.nav-btn-icon span:nth-child(3) {
  right: 0;
  transform: translate(0, 250%);
}
.expand .nav-btn-icon span:nth-child(1) {
  transform: rotateZ(45deg) scaleX(0.5) translate(-50%);
}
.expand .nav-btn-icon span:nth-child(2) {
  transform: rotateZ(-45deg);
}
.expand .nav-btn-icon span:nth-child(3) {
  transform: rotateZ(45deg) scaleX(0.5) translate(50%);
}

.device {
  width: 100%;
  background: rgba(0,0,0,0.5);
  transform: translate(-100%);
  transition: transform ease-in-out 0.3s;
}
.expand-main {
  transform: translate(0);
}
</style>
