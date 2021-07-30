<template>
  <div class="fanQuery">
    <div class="pages">

      <div class="cell-33 ">
        <div class="displayCard">
          <div
            class="cardLayout0"
            style="margin-left: -1.5rem; margin-top: 1.8rem"
          >
            <img
              src="../../assets/img/fansQuery/ava.png"
              style="max-width: 180px"
              alt=""
            />
          </div>
        </div>
        <div class="displayCard fansNumDiv">
          <br /><br /><br /><br /><br />
          <p>
            <img
              src="../../assets/img/fansQuery/bilibili.png"
              style="width: 35%"
              alt=""
            /><span >&nbsp;<scrolling-num-box v-for="(cnt,index) in BzhanFans.ava" :key=index :nowNum="cnt"></scrolling-num-box></span>
          </p>
          <br /><br /><br />
          <p>
            <img
              src="../../assets/img/fansQuery/douyin.png"
              style="width: 15%"
              alt=""
            /><span >&nbsp;<scrolling-num-box v-for="(cnt,index) in douyinFans.ava" :key=index :nowNum="cnt"></scrolling-num-box></span>
          </p>
        </div>
      </div>

      <div class="cell-33 ">
        <div class="displayCard">
          <div class="cardLayout0" style="margin-left: 1.8rem">
            <img
              src="../../assets/img/fansQuery/carol.png"
              style="max-width: 130px"
              alt=""
            />
          </div>
        </div>
        <div class="displayCard fansNumDiv">
          <br /><br /><br /><br /><br />
          <p>
            <img
              src="../../assets/img/fansQuery/bilibili.png"
              style="width: 35%"
              alt=""
            /><span >&nbsp;<scrolling-num-box v-for="(cnt,index) in BzhanFans.carol" :key=index :nowNum="cnt"></scrolling-num-box></span>
          </p>
          <br /><br /><br />
          <p>
            <img
              src="../../assets/img/fansQuery/douyin.png"
              style="width: 15%"
              alt=""
            /><span >&nbsp;<scrolling-num-box v-for="(cnt,index) in douyinFans.carol" :key=index :nowNum="cnt"></scrolling-num-box></span>
          </p>
        </div>
      </div>

      <div class="cell-33 ">
        <div class="displayCard">
          <div
            class="cardLayout0"
            style="margin-left: 1.8rem; margin-top: 1.8rem"
          >
            <img
              src="../../assets/img/fansQuery/eileen.png"
              style="max-width: 130px"
              alt=""
            />
          </div>
        </div>
        <div class="displayCard fansNumDiv">
          <br /><br /><br /><br /><br />
          <p>
            <img
              src="../../assets/img/fansQuery/bilibili.png"
              style="width: 35%"
              alt=""
            /><span >&nbsp;<scrolling-num-box v-for="(cnt,index) in BzhanFans.eileen" :key=index :nowNum="cnt"></scrolling-num-box></span>
          </p>
          <br /><br /><br />
          <p>
            <img
              src="../../assets/img/fansQuery/douyin.png"
              style="width: 15%"
              alt=""
            /><span >&nbsp;<scrolling-num-box v-for="(cnt,index) in douyinFans.eileen" :key=index :nowNum="cnt"></scrolling-num-box></span>
          </p>
        </div>
      </div>

      <div class="cell-33 ">
        <div class="displayCard">
          <div
            class="cardLayout0"
            style="margin-left: 1.7rem; margin-top: 0.5rem"
          >
            <img
              src="../../assets/img/fansQuery/bella.png"
              style="max-width: 155px"
              alt=""
            />
          </div>
        </div>
        <div class="displayCard fansNumDiv">
          <br /><br /><br /><br /><br />
          <p>
            <img
              src="../../assets/img/fansQuery/bilibili.png"
              style="width: 35%"
              alt=""
            /><span >&nbsp;<scrolling-num-box v-for="(cnt,index) in BzhanFans.bella" :key=index :nowNum="cnt"></scrolling-num-box></span>
          </p>
          <br /><br /><br />
          <p>
            <img
              src="../../assets/img/fansQuery/douyin.png"
              style="width: 15%"
              alt=""
            /><span >&nbsp;<scrolling-num-box v-for="(cnt,index) in douyinFans.bella" :key=index :nowNum="cnt"></scrolling-num-box></span>
          </p>
        </div>
      </div>

      <div class="cell-33 ">
        <div class="displayCard">
          <div
            class="cardLayout0"
            style="margin-left: 1.9rem; margin-top: 1.2rem"
          >
            <img
              src="../../assets/img/fansQuery/diana.png"
              style="max-width: 140px"
              alt=""
            />
          </div>
        </div>
        <div class="displayCard fansNumDiv">
          <br /><br /><br /><br /><br />
          <p>
            <img
              src="../../assets/img/fansQuery/bilibili.png"
              style="width: 35%"
              alt=""
            /><span >&nbsp;<scrolling-num-box v-for="(cnt,index) in BzhanFans.diana" :key=index :nowNum="cnt"></scrolling-num-box></span>
          </p>
          <br /><br /><br />
          <p>
            <img
              src="../../assets/img/fansQuery/douyin.png"
              style="width: 15%"
              alt=""
            /><span >&nbsp;<scrolling-num-box v-for="(cnt,index) in douyinFans.diana" :key=index :nowNum="cnt"></scrolling-num-box></span>
          </p>
        </div>
      </div>

      <div class="cell-33 ">
        <div class="displayCard">
          <div
            class="cardLayout0"
            style="margin-left: -1.7rem; margin-top: 1.2rem"
          >
            <img
              src="../../assets/img/fansQuery/official.png"
              style="max-width: 175px"
              alt=""
            />
          </div>
        </div>
        <div class="displayCard fansNumDiv">
          <br /><br /><br /><br /><br />
          <p>
            <img
              src="../../assets/img/fansQuery/bilibili.png"
              style="width: 35%"
              alt=""
            /><span >&nbsp;<scrolling-num-box v-for="(cnt,index) in BzhanFans.official" :key=index :nowNum="cnt"></scrolling-num-box></span>
          </p>
          <br /><br /><br />
          <p>
            <img
              src="../../assets/img/fansQuery/douyin.png"
              style="width: 15%"
              alt=""
            /><span >&nbsp;<scrolling-num-box v-for="(cnt,index) in douyinFans.official" :key=index :nowNum="cnt"></scrolling-num-box></span>
          </p>
        </div>
      
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import scrollingNumBox from "./component/scrollingNum.vue"
export default {
  name: "fanQuery",
  data: function () {
    return {
      BzhanFans: {
        ava: [2,0,0,0,0,0,0,0],
        bella: [0,0,0,0,0,0],
        carol: [0,0,0,0,0,0],
        diana: [0,0,0,0,0,0],
        eileen: [0,0,0,0,0,0],
        official: [0,0,0,0,0,0],
      },
      douyinFans: {
        ava: [0,0,0,0,0,0],
        bella: [0,0,0,0,0,0],
        carol: [0,0,0,0,0,0],
        diana: [0,0,0,0,0,0],
        eileen: [0,0,0,0,0,0],
        official: [0,0,0,0,0,0],
      },
      // 六个人的B站uid
      BzhanUid: [
        {
          name: "ava",
          uid: 672346917,
        },
        {
          name: "bella",
          uid: 672353429,
        },
        {
          name: "carol",
          uid: 351609538,
        },
        {
          name: "diana",
          uid: 672328094,
        },
        {
          name: "eileen",
          uid: 672342685,
        },
        {
          name: "official",
          uid: 703007996,
        },
      ],
      // 六个人的抖音uid
      douyinUid:[
        {
          name: "ava",
          uid: 'MS4wLjABAAAAxOXMMwlShWjp4DONMwfEEfloRYiC1rXwQ64eydoZ0ORPFVGysZEd4zMt8AjsTbyt',
        },
        {
          name: "bella",
          uid: "MS4wLjABAAAAlpnJ0bXVDV6BNgbHUYVWnnIagRqeeZyNyXB84JXTqAS5tgGjAtw0ZZkv0KSHYyhP",
        },
        {
          name: "carol",
          uid:  "MS4wLjABAAAAuZHC7vwqRhPzdeTb24HS7So91u9ucl9c8JjpOS2CPK-9Kg2D32Sj7-mZYvUCJCya",
        },
        {
          name: "diana",
          uid:  "MS4wLjABAAAA5ZrIrbgva_HMeHuNn64goOD2XYnk4ItSypgRHlbSh1c",
        },
        {
          name: "eileen",
          uid:  "MS4wLjABAAAAxCiIYlaaKaMz_J1QaIAmHGgc3bTerIpgTzZjm0na8w5t2KTPrCz4bm_5M5EMPy92",
        },
        {
          name: "official",
          uid:  "MS4wLjABAAAAflgvVQ5O1K4RfgUu3k0A2erAZSK7RsdiqPAvxcObn93x2vk4SKk1eUb6l_D4MX-n",
        },
      ]
    };
  },
  components: {
    scrollingNumBox
  },
  async created() {
    this.BzhanUid.forEach((item) => {
      this.getBibiliFans(item.uid, item.name);
    });
    this.douyinUid.forEach((item)=>{
      this.getDouyinFans(item.uid, item.name);
    })
    // this.getDouyinFans();
  },
  methods: {
    // transform num to num array.
    tranNum:function(num){
      let tmp=[];
      let numstr=num.toString();
      for(let i=0;i<numstr.length;i++){
        tmp.push(parseInt(numstr[i]));
      }
      return tmp;
    },
    // 获取B站粉丝数
    async getBibiliFans(uid, name) {
      try {
        const res = await this.$request(`bilibili/x/relation/stat?vmid=${uid}`);
        this.BzhanFans[name] = this.tranNum(res.follower);
      } catch (error) {
      }
    },
  // 获取抖音粉丝数
async getDouyinFans(uid,name) {
  try {
    const res = await axios.get(
          `douyin/web/api/v2/user/info/?sec_uid=${uid}`
        );
        this.douyinFans[name] = this.tranNum(res.data.user_info.follower_count)
  } catch (error) {
    
  }
},

    // 获取哔哩哔哩粉丝数
    // async getBibiliFans() {
    //   try {
    //     const resAvA = await this.$request(
    //       `bilibili/x/relation/stat?vmid=672346917`
    //     );
    //     const resBella = await this.$request(
    //       `bilibili/x/relation/stat?vmid=672353429`
    //     );
    //     const resCarol = await this.$request(
    //       `bilibili/x/relation/stat?vmid=351609538`
    //     );
    //     const resDiana = await this.$request(
    //       `bilibili/x/relation/stat?vmid=672328094`
    //     );
    //     const resEileen = await this.$request(
    //       `bilibili/x/relation/stat?vmid=672342685`
    //     );
    //     const resOfficial = await this.$request(
    //       `bilibili/x/relation/stat?vmid=703007996`
    //     );
    //     this.BzhanFans = {
    //       ava: resAvA.follower,
    //       bella: resBella.follower,
    //       carol: resCarol.follower,
    //       diana: resDiana.follower,
    //       eileen: resEileen.follower,
    //       official: resOfficial.follower,
    //     };
    //     // this.BzhanFans.Name = res.follower
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // 获取抖音粉丝数
    // async getDouyinFans() {
    //   try {
    //     const resAvA = await axios.get(
    //       "douyin/web/api/v2/user/info/?sec_uid=MS4wLjABAAAAxOXMMwlShWjp4DONMwfEEfloRYiC1rXwQ64eydoZ0ORPFVGysZEd4zMt8AjsTbyt"
    //     );
    //     const resBella = await axios.get(
    //       "douyin/web/api/v2/user/info/?sec_uid=MS4wLjABAAAAlpnJ0bXVDV6BNgbHUYVWnnIagRqeeZyNyXB84JXTqAS5tgGjAtw0ZZkv0KSHYyhP"
    //     );
    //     const resCarol = await axios.get(
    //       "douyin/web/api/v2/user/info/?sec_uid=MS4wLjABAAAAuZHC7vwqRhPzdeTb24HS7So91u9ucl9c8JjpOS2CPK-9Kg2D32Sj7-mZYvUCJCya"
    //     );
    //     const resDiana = await axios.get(
    //       "douyin/web/api/v2/user/info/?sec_uid=MS4wLjABAAAA5ZrIrbgva_HMeHuNn64goOD2XYnk4ItSypgRHlbSh1c"
    //     );
    //     const resEileen = await axios.get(
    //       "douyin/web/api/v2/user/info/?sec_uid=MS4wLjABAAAAxCiIYlaaKaMz_J1QaIAmHGgc3bTerIpgTzZjm0na8w5t2KTPrCz4bm_5M5EMPy92"
    //     );
    //     const resOfficial = await axios.get(
    //       "douyin/web/api/v2/user/info/?sec_uid=MS4wLjABAAAAflgvVQ5O1K4RfgUu3k0A2erAZSK7RsdiqPAvxcObn93x2vk4SKk1eUb6l_D4MX-n"
    //     );
    //     this.douyinFans = {
    //       ava: resAvA.data.user_info.follower_count,
    //       bella: resBella.data.user_info.follower_count,
    //       carol: resCarol.data.user_info.follower_count,
    //       diana: resDiana.data.user_info.follower_count,
    //       eileen: resEileen.data.user_info.follower_count,
    //       official: resOfficial.data.user_info.follower_count,
    //     };
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.fanQuery {
  background-color: #1d1d1d;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.pages {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: space-around;
  
}
.cell-33 {
  flex: 0 0 33%;
}

.displayCard {
  position: relative;
  width: 180px;
}
.backgroundImg {
  max-width: 100px;
}
.cardLayout0 {
  position: absolute;
  z-index: 0;
  overflow: hidden;
}
.cardLayout1 {
  position: absolute;
  z-index: -1;
}
.cardLayout2 {
  position: absolute;
}
.fansNumDiv {
  margin-top: 3rem;
  margin-left: 17rem;
}
.fansNumDiv p {
  width: 20rem;
}
.fontConfig {
  margin-left: 8px;
  font-weight: 600;
  font-size: 1.5rem;
  color: white;
}
</style>
