<template>
  <div class="fanQuery">
    <div class="pages">
      <div class="cell-33">
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
              style="width: 50%"
              alt=""
            /><span class="fontConfig">{{ bilibiliFans.ava }}</span>
          </p>
          <br /><br /><br /><br />
          <p>
            <img
              src="../../assets/img/fansQuery/douyin.png"
              style="width: 18%"
              alt=""
            /><span class="fontConfig">{{ douyinFans.ava }}</span>
          </p>
        </div>
      </div>

      <div class="cell-33">
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
              style="width: 40%"
              alt=""
            /><span class="fontConfig">{{ bilibiliFans.carol }}</span>
          </p>
          <br /><br /><br /><br />
          <p>
            <img
              src="../../assets/img/fansQuery/douyin.png"
              style="width: 18%"
              alt=""
            /><span class="fontConfig">{{ douyinFans.carol }}</span>
          </p>
        </div>
      </div>

      <div class="cell-33">
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
              style="width: 40%"
              alt=""
            /><span class="fontConfig">{{ bilibiliFans.eileen }}</span>
          </p>
          <br /><br /><br /><br />
          <p>
            <img
              src="../../assets/img/fansQuery/douyin.png"
              style="width: 18%"
              alt=""
            /><span class="fontConfig">{{ douyinFans.eileen }}</span>
          </p>
        </div>
      </div>

      <div class="cell-33">
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
              style="width: 40%"
              alt=""
            /><span class="fontConfig">{{ bilibiliFans.bella }}</span>
          </p>
          <br /><br /><br /><br />
          <p>
            <img
              src="../../assets/img/fansQuery/douyin.png"
              style="width: 18%"
              alt=""
            /><span class="fontConfig">{{ douyinFans.bella }}</span>
          </p>
        </div>
      </div>

      <div class="cell-33">
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
              style="width: 40%"
              alt=""
            /><span class="fontConfig">{{ bilibiliFans.diana }}</span>
          </p>
          <br /><br /><br /><br />
          <p>
            <img
              src="../../assets/img/fansQuery/douyin.png"
              style="width: 18%"
              alt=""
            /><span class="fontConfig">{{ douyinFans.diana }}</span>
          </p>
        </div>
      </div>

      <div class="cell-33">
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
              style="width: 40%"
              alt=""
            /><span class="fontConfig">{{ bilibiliFans.official }}</span>
          </p>
          <br /><br /><br /><br />
          <p>
            <img
              src="../../assets/img/fansQuery/douyin.png"
              style="width: 18%"
              alt=""
            /><span class="fontConfig">{{ douyinFans.official }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "fanQuery",
  data: function () {
    return {
      bilibiliFans: {
        ava: 0,
        bella: 0,
        carol: 0,
        diana: 0,
        eileen: 0,
        official: 0,
      },
      douyinFans: {
        ava: 0,
        bella: 0,
        carol: 0,
        diana: 0,
        eileen: 0,
        official: 0,
      }
    };
  },
  components: {},
  created() {
    this.getBibiliFans();

    this.getDouyinFans();
  },
  methods: {
    // 获取哔哩哔哩粉丝数
    async getBibiliFans() {
      try {
        this.$loading();
        const resAvA = await this.$request(
          `bilibili/x/relation/stat?vmid=672346917`
        );
        const resBella = await this.$request(
          `bilibili/x/relation/stat?vmid=672353429`
        );
        const resCarol = await this.$request(
          `bilibili/x/relation/stat?vmid=351609538`
        );
        const resDiana = await this.$request(
          `bilibili/x/relation/stat?vmid=672328094`
        );
        const resEileen = await this.$request(
          `bilibili/x/relation/stat?vmid=672342685`
        );
        const resOfficial = await this.$request(
          `bilibili/x/relation/stat?vmid=703007996`
        );
        this.bilibiliFans = {
          ava: resAvA.follower,
          bella: resBella.follower,
          carol: resCarol.follower,
          diana: resDiana.follower,
          eileen: resEileen.follower,
          official: resOfficial.follower,
        };
        // this.bilibiliFans.Name = res.follower
      } catch (error) {
        console.log(error);
      } finally {
        this.$closeLoading();
      }
    },
    // 获取抖音粉丝数
    async getDouyinFans() {
        try {
            this.$loading();
          const resAvA = await axios.get(
          "douyin/web/api/v2/user/info/?sec_uid=MS4wLjABAAAAxOXMMwlShWjp4DONMwfEEfloRYiC1rXwQ64eydoZ0ORPFVGysZEd4zMt8AjsTbyt"
          );
          const resBella = await axios.get(
          "douyin/web/api/v2/user/info/?sec_uid=MS4wLjABAAAAlpnJ0bXVDV6BNgbHUYVWnnIagRqeeZyNyXB84JXTqAS5tgGjAtw0ZZkv0KSHYyhP"
          );
          const resCarol = await axios.get(
          "douyin/web/api/v2/user/info/?sec_uid=MS4wLjABAAAAuZHC7vwqRhPzdeTb24HS7So91u9ucl9c8JjpOS2CPK-9Kg2D32Sj7-mZYvUCJCya"
          );
          const resDiana = await axios.get(
          "douyin/web/api/v2/user/info/?sec_uid=MS4wLjABAAAA5ZrIrbgva_HMeHuNn64goOD2XYnk4ItSypgRHlbSh1c"
          );
          const resEileen = await axios.get(
          "douyin/web/api/v2/user/info/?sec_uid=MS4wLjABAAAAxCiIYlaaKaMz_J1QaIAmHGgc3bTerIpgTzZjm0na8w5t2KTPrCz4bm_5M5EMPy92"
          );
          const resOfficial= await axios.get(
        "douyin/web/api/v2/user/info/?sec_uid=MS4wLjABAAAAflgvVQ5O1K4RfgUu3k0A2erAZSK7RsdiqPAvxcObn93x2vk4SKk1eUb6l_D4MX-n"
          );
          this.douyinFans = {
          ava: resAvA.data.user_info.follower_count,
          bella: resBella.data.user_info.follower_count,
          carol: resCarol.data.user_info.follower_count,
          diana: resDiana.data.user_info.follower_count,
          eileen: resEileen.data.user_info.follower_count,
          official: resOfficial.data.user_info.follower_count,
        };

        } catch (error) {
          console.log(error);
        }finally {
        this.$closeLoading();
      }
    },
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
  width: 160px;
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
  margin-left: 16rem;
}
.fansNumDiv p {
  width: 13rem;
}
.fontConfig {
  margin-left: 8px;
  font-weight: 600;
  font-size: 1.5rem;
  color: white;
}
</style>
