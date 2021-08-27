<template>
  <div class="fanQuery">
    <div class="contain-lg">
      <div
          v-for="(item, index) in Asoul"
          :key="index"
          class="contain-item">
        <img :src="item.drawing" class="drawing" alt=""/>
        <div class="fans-area">
          <!-- icon-->
          <div class="img-box">
            <div class="height-30 img-item" @click="toSpace('B',item.BzhanUid)">
              <img
                  src="../../assets/img/fansQuery/bilibili.webp"
                  alt=""
                  class="b-icon">
            </div>
            <div class="height-30 img-item" @click="toSpace('D',item.douyinUid)">
              <img
                  src="../../assets/img/fansQuery/douyin.webp"
                  alt=""
                  class="d-icon">
            </div>
          </div>
          <!-- fansNum -->
          <div class="img-box" :style="'color:' + item.color">
            <div class="height-30">
              <scrolling-num-box
                  :value="BzhanFans[item.name]"></scrolling-num-box>
            </div>
            <div class="height-30">
              <scrolling-num-box
                  :value="douyinFans[item.name]"></scrolling-num-box>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="contain-sm">
      <el-carousel
          direction="vertical"
          ref="slideCarousel"
          arrow="always"
          :autoplay="false"
          style="height: 100vh; width: 100%;">
        <el-carousel-item
            v-for="(item, index) in Asoul"
            :key="index"
            style="height: 100vh; width: 100%;">
          <div
              class="contain-item-sm"
              :style="{'background-color': item.color}">
            <!--    使用背景来控制图片易于控制    -->
            <div class="drawing-sm" :style="{'background-image': `url(${item.drawing})`}"></div>
            <div class="fans-wrapper">
              <div class="bilibili-fans" @click="toSpace('B',item.BzhanUid)">
                <div class="bilibili-icon">
                  <img src="../../assets/img/fansQuery/bilibili.webp" alt="">
                </div>
                <scrolling-num-box
                    :value="BzhanFans[item.name]"
                    class="bilibili-fans-num"></scrolling-num-box>
              </div>
              <div class="douyin-fans" @click="toSpace('D',item.douyinUid)">
                <div class="douyin-icon">
                  <img src="../../assets/img/fansQuery/douyin.webp" alt="">
                </div>
                <scrolling-num-box
                    :value="douyinFans[item.name]"
                    class="douyin-fans-num"></scrolling-num-box>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import scrollingNumBox from "./component/scrollingNum.vue";
import {Carousel, CarouselItem} from 'element-ui';

export default {
  name: "fanQuery",
  data: function () {
    return {
      //  Asoul偶像团体和臭羊驼的信息
      Asoul: [
        {
          name: "ava",
          drawing: require("../../assets/img/fansQuery/ava.webp"),
          color: "#9ac8e2",
          BzhanUid: 672346917,
          douyinUid:
              "MS4wLjABAAAAxOXMMwlShWjp4DONMwfEEfloRYiC1rXwQ64eydoZ0ORPFVGysZEd4zMt8AjsTbyt",
        },
        {
          name: "bella",
          drawing: require("../../assets/img/fansQuery/bella.webp"),
          color: "#db7d74",
          BzhanUid: 672353429,
          douyinUid:
              "MS4wLjABAAAAlpnJ0bXVDV6BNgbHUYVWnnIagRqeeZyNyXB84JXTqAS5tgGjAtw0ZZkv0KSHYyhP",
        },
        {
          name: "carol",
          drawing: require("../../assets/img/fansQuery/carol.webp"),
          color: "#b8a6d9",
          BzhanUid: 351609538,
          douyinUid:
              "MS4wLjABAAAAuZHC7vwqRhPzdeTb24HS7So91u9ucl9c8JjpOS2CPK-9Kg2D32Sj7-mZYvUCJCya",
        },
        {
          name: "diana",
          drawing: require("../../assets/img/fansQuery/diana.webp"),
          color: "#e799b0",
          BzhanUid: 672328094,
          douyinUid:
              "MS4wLjABAAAA5ZrIrbgva_HMeHuNn64goOD2XYnk4ItSypgRHlbSh1c",
        },
        {
          name: "eileen",
          drawing: require("../../assets/img/fansQuery/eileen.webp"),
          color: "#576690",
          BzhanUid: 672342685,
          douyinUid:
              "MS4wLjABAAAAxCiIYlaaKaMz_J1QaIAmHGgc3bTerIpgTzZjm0na8w5t2KTPrCz4bm_5M5EMPy92",
        },
        {
          name: "official",
          drawing: require("../../assets/img/fansQuery/official.webp"),
          color: "#fff",
          BzhanUid: 703007996,
          douyinUid:
              "MS4wLjABAAAAflgvVQ5O1K4RfgUu3k0A2erAZSK7RsdiqPAvxcObn93x2vk4SKk1eUb6l_D4MX-n",
        },
      ],
      //B站粉丝数
      BzhanFans: {
        ava: 0,
        bella: 0,
        carol: 0,
        diana: 0,
        eileen: 0,
        official: 0,
      },
      // 抖音粉丝数
      douyinFans: {
        ava: 0,
        bella: 0,
        carol: 0,
        diana: 0,
        eileen: 0,
        official: 0,
      },
    };
  },
  components: {
    scrollingNumBox,
    Carousel,
    CarouselItem
  },
  async created() {
    this.Asoul.forEach((ele) => {
      this.getBibiliFans(ele.BzhanUid, ele.name);
      this.getDouyinFans(ele.douyinUid, ele.name);
    });
  },
  mounted() {
    this.slideBanner()
  },
  methods: {
    // 获取B站粉丝数
    async getBibiliFans(uid, name) {
      try {
        const res = await this.$request(
            `/api/px/bilibili/x/relation/stat?vmid=${uid}`
        );
        this.BzhanFans[name] = res.follower;
      } catch (error) {
        this.$message({message: error, type: "error"});
      }
    },
    // 获取抖音粉丝数
    async getDouyinFans(uid, name) {
      try {
        const res = await axios.get(
            `/api/px/douyin/web/api/v2/user/info/?sec_uid=${uid}`
        );
        this.douyinFans[name] = res.data.user_info.follower_count;
      } catch (error) {
      }
    },
    // 去B站个人空间
    toSpace(type, uid) {
      let url = ''
      if (type === 'B') {
        url = 'https://space.bilibili.com/' + uid
      } else {
        url = 'https://www.douyin.com/user/' + uid
      }
      window.open(url)
    },
    slideBanner() {
      //选中的轮播图
      var box = document.querySelector('.fanQuery .el-carousel__container');
      var startPoint = 0;
      var stopPoint = 0;
      //重置坐标
      var resetPoint = function () {
        startPoint = 0;
        stopPoint = 0;
      }
      //手指按下
      box.addEventListener("touchstart", function (e) {
        //手指点击位置的X坐标
        startPoint = e.changedTouches[0].pageY;
      });
      //手指滑动
      box.addEventListener("touchmove", function (e) {
        //手指滑动后终点位置X的坐标
        stopPoint = e.changedTouches[0].pageY;
      });
      //当手指抬起的时候，判断图片滚动离左右的距离
      let that = this
      box.addEventListener("touchend", () => {
        if (stopPoint === 0 || startPoint - stopPoint === 0) {
          resetPoint();
          return;
        }
        if (startPoint - stopPoint > 0) {
          resetPoint();
          that.$refs.slideCarousel.next();
          return;
        }
        if (startPoint - stopPoint < 0) {
          resetPoint();
          that.$refs.slideCarousel.prev();
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.fanQuery {
  background-color: #2B343A;
  height: 100vh;
  overflow-y: scroll;
}


@media screen and (min-width: 1170px) {
  .contain-lg {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .contain-item {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    min-width: 300px;
    max-height: 400px;
    width: 40%;
    min-height: 200px;
  }

  .drawing {
    min-width: 200px;
    min-height: 200px;
    width: auto;
    height: 100%;
  }

  .fans-area {
    display: flex;
    height: 50%;
    width: 300px;
    justify-content: space-evenly;

    .fans {
      display: flex;
      align-items: center;
    }

    .b-icon {
      width: 50px;
      height: 21px;
    }

    .d-icon {
      width: 21px;
      height: 25px;
    }
  }

  .img-box {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-left: 30px;
    justify-content: flex-end;
  }

  .height-30 {
    height: 30%;
  }

  .img-item {
    cursor: pointer;
    transition: transform 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.68);
  }

  .img-item:hover {
    transform: scale(1.2);
  }

  .contain-sm {
    display: none;
  }
}


@media screen and (max-width: 1170px) {
  .contain-sm {
    width: 100%;
    height: 100%;
    position: fixed;
  }

  .contain-item-sm {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;

    .drawing-sm {
      display: flex;
      align-items: center;
      height: 65%;

      background-size: contain;
      background-repeat: no-repeat;
    }

    .fans-wrapper {
      align-self: flex-end;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 15%;
      width: 75%;
      max-width: 450px;
      user-select: none;
      cursor: pointer;

      & > div {
        height: 50px;
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        box-shadow: -1px 2px 5px rgba(0, 0, 0, .6);
      }

      .bilibili-fans {
        background-color: #f87393;

        .bilibili-icon {
          height: 25px;
          width: 60px;
          margin: 10px;

          img {
            height: 100%;
          }
        }

        .bilibili-fans-num {
          flex: 1;
          text-align: center;
        }
      }

      .douyin-fans {
        background-color: #140b18;

        .douyin-icon {
          height: 25px;
          width: 60px;
          margin: 10px;

          img {
            height: 100%;
          }
        }

        .douyin-fans-num {
          flex: 1;
          text-align: center;
        }
      }
    }
  }

  .contain-lg {
    display: none;
  }

}

// @media only screen and (min-width: 1170px) {
//   .fanQuery{
//     padding-left: 18.5vh;
//   }
// }
</style>
