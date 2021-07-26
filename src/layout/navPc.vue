<!--
 * @Author: maggot-code
 * @Date: 2021-07-24 16:44:50
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-07-24 17:03:43
 * @Description: file content
-->
<template>
  <div class="contain">
    <div 
    class="nav-common"
    :class="[isLongNav ? 'nav-long' : 'nav-short']"
    >
    <!--  -->
    <!--  -->
      <router-link to="/">
        <div class="nav-item-common" 
        :class="[isLongNav ? 'nav-item-long' : 'nav-item-short']">
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
          <div class="nav-cover"></div>
        </div>
      </router-link>
        <router-link title="test" v-for="item in routeList" :key="item.Name" :to="item.route" 
        class="nav-item-common"
        :class="[true ? 'nav-item-long' : 'nav-item-short']">
          <img v-show="isLongNav" class="img" :src="item.imgLong" alt="" />
          <img v-show="!isLongNav" class="img" :src="item.imgShort" alt="" />
          <!--  <div v-if="isLongNav" class="text">{{ item.Name }}</div> -->
          <!-- <div v-if="isLongNav" class="text">
            {{ item.Name }}
          </div> -->
          <div class="nav-cover" title="test"></div>
      </router-link>
    </div>
    <!-- <div class="route-view-class"> -->
    <transition :name="tempCss">
      <!-- <div class="route-view-class" >

        </div> -->
      <router-view />
    </transition>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      tempCss: "slide-right",
      isLongNav: this.$route.name == "Index" ? true : false,
      routeList: [
          {
          imgShort:require("../assets/img/contents/zhiNet-short.png"),
          imgLong:require("../assets/img/contents/zhiNet-long.png"),
          // Name: "知网查重",
          route: "",
        },
         {
          imgShort:require("../assets/img/contents/component-short.png"),
          imgLong: require("../assets/img/contents/component-long.png"),
          // Name: "成分姬",
          route: "/tools/part",
        },
         {
          imgShort:require("../assets/img/contents/WordCloud-short.png"),
          imgLong: require("../assets/img/contents/WordCloud-long.png"),
          // Name: "词云",
          route: "",
        },
         
        {
          imgShort:require("../assets/img/contents/event-short.png"),
          imgLong:require("../assets/img/contents/event-long.png"),
          // Name: "大事件时间线",
          route: "",
        },
        {
          imgShort: require("../assets/img/contents/fansQuery-short.png"),
          imgLong: require("../assets/img/contents/fansQuery-long.png"),
          // Name: "粉丝数实时查询",
          route: "/tools/fanQuery",
        },
        {
          imgShort:require("../assets/img/contents/meme-short.png"),
          imgLong:require("../assets/img/contents/meme-long.png"),
          // Name: "表情包合集",
          route: "",
        },
         {
          imgShort:require("../assets/img/contents/liveFile-short.png"),
          imgLong:require("../assets/img/contents/liveFile-long.png"),
          // Name: "直播归档",
          route: "",
        },
      
        {
           imgShort:require("../assets/img/contents/random-short.png"),
          imgLong:require("../assets/img/contents/random-long.png"),
          // Name: "随机溜冰",
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
  },
  methods: {
  },
};
</script>

<style scoped lang="less">
@import "./transition.less";

// 页面容器
.contain {
  display: flex;
  // overflow: scroll;
  max-height: 100vh;
}
// 导航栏最外层
  .nav-common{
    // float: left;
    position: relative;
    z-index: 10000;
    // max-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: black;
    overflow: hidden;
    
  };
  .nav-long {
    width: 37vh;
    max-width: 370px;
    min-width: 185px;
  }
  .nav-short {
    width: 18.5vh;
    max-width: 185px;
    min-width: 92.5px
  }

// 导航栏item 
  .nav-item-common{
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
  .nav-cover {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    transition: all 0.5s linear;
    -moz-transition: all 0.5s linear; /* Firefox 4 */
    -webkit-transition: all 0.5s linear; /* Safari 和 Chrome */
    -o-transition: all 0.5s linear; /* Opera */
    background-color: rgba(40, 40, 40, 0.5);
  }
  .nav-cover:hover {
    background-color: rgba(40, 40, 40, 0);
  }

.route-view-class {
  position: relative;
  width: 100%;
  // height: 100%;
}

  .img {
    width: 100%;
    height: 100%;
    z-index: 0;
  }
</style>