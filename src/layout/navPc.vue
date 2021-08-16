<template>
    <div>
        <div class="nav-contain">
            <div class="box item-Index" @click="toAsoulFan">
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
            transitionName: "slide-down",
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
        };
    },
    watch: {
        $route: {
            handler: function (val, oldVal) {
                if(val.meta.pageIndex >oldVal.meta.pageIndex){
                    this.transitionName = "slide-down"
                }else{
                    this.transitionName = "slide-up"
                }
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
    mounted() {
    },
    methods: {
        toAsoulFan() {
            window.location.href = "https://www.asoulfan.cn/"
        },
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
</style>
