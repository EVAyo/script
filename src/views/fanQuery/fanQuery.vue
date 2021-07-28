<template>
  <div class="fanQuery">

    <div class="pages">

        <div class="cell-33">
          <div class="displayCard">
            <div class="cardLayout0" style="margin-left:-1.5rem;margin-top:1.8rem"><img src="../../assets/img/fansQuery/ava.png" style="max-width:180px;" alt="" ></div>
          </div>
          <div class="displayCard fansNumDiv">
            <br><br><br><br><br>
            <p><img src="../../assets/img/fansQuery/bilibili.png" style="width:50%;" alt=""><span class="fontConfig">{{ avaBFans}}</span></p>
            <br><br><br><br>
            <p><img src="../../assets/img/fansQuery/douyin.png" style="width:18%;" alt=""><span class="fontConfig">{{ avaDFans}}</span></p>
          </div>
        </div>

        <div class="cell-33">
          <div class="displayCard">
            <div class="cardLayout0" style="margin-left:1.8rem;"><img src="../../assets/img/fansQuery/carol.png" style="max-width:130px;" alt="" ></div>
          </div>
          <div class="displayCard fansNumDiv">
            <br><br><br><br><br>
            <p><img src="../../assets/img/fansQuery/bilibili.png" style="width:40%;" alt=""><span class="fontConfig">{{carolBFans}}</span></p>
            <br><br><br><br>
            <p><img src="../../assets/img/fansQuery/douyin.png" style="width:18%;" alt=""><span class="fontConfig" >{{carolDFans}}</span></p>
          </div>
        </div>


        <div class="cell-33">
          <div class="displayCard">
            <div class="cardLayout0" style="margin-left:1.8rem;margin-top:1.8rem;"><img src="../../assets/img/fansQuery/eileen.png" style="max-width:130px;" alt="" ></div>
          </div>
          <div class="displayCard fansNumDiv">
            <br><br><br><br><br>
            <p><img src="../../assets/img/fansQuery/bilibili.png" style="width:40%;" alt=""><span class="fontConfig">{{eileenBFans}}</span></p>
            <br><br><br><br>
            <p><img src="../../assets/img/fansQuery/douyin.png" style="width:18%;" alt=""><span class="fontConfig">{{eileenDFans}}</span></p>
          </div>
        </div>

        <div class="cell-33">
          <div class="displayCard">
            <div class="cardLayout0" style="margin-left:1.7rem;margin-top:0.5rem;"><img src="../../assets/img/fansQuery/bella.png" style="max-width:155px;" alt="" ></div>
          </div>
          <div class="displayCard fansNumDiv">
            <br><br><br><br><br>
            <p><img src="../../assets/img/fansQuery/bilibili.png" style="width:40%;" alt=""><span class="fontConfig">{{bellaBFans}}</span></p>
            <br><br><br><br>
            <p><img src="../../assets/img/fansQuery/douyin.png" style="width:18%;" alt=""><span class="fontConfig">{{bellaDFans}}</span></p>
          </div>
        </div>
        
        <div class="cell-33">
          <div class="displayCard">
            <div class="cardLayout0" style="margin-left:1.9rem;margin-top:1.2rem;"><img src="../../assets/img/fansQuery/diana.png" style="max-width:140px;" alt="" ></div>
          </div>
          <div class="displayCard fansNumDiv">
            <br><br><br><br><br>
            <p><img src="../../assets/img/fansQuery/bilibili.png" style="width:40%;" alt=""><span class="fontConfig">{{dianaBFans}}</span></p>
            <br><br><br><br>
            <p><img src="../../assets/img/fansQuery/douyin.png" style="width:18%;" alt=""><span class="fontConfig">{{dianaDFans}}</span></p>
          </div>
        </div>

        <div class="cell-33">
          <div class="displayCard">
            <div class="cardLayout0" style="margin-left:-1.7rem;margin-top:1.2rem;"><img src="../../assets/img/fansQuery/official.png" style="max-width:175px;" alt="" ></div>
          </div>
          <div class="displayCard fansNumDiv">
            <br><br><br><br><br>
            <p><img src="../../assets/img/fansQuery/bilibili.png" style="width:40%;" alt=""><span class="fontConfig">{{officialBFans}}</span></p>
            <br><br><br><br>
            <p><img src="../../assets/img/fansQuery/douyin.png" style="width:18%;" alt=""><span class="fontConfig">{{officialDFans}}</span></p>
          </div>
        </div>

    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'fanQuery',
  data: function(){
    return {
      avaBFans:0,
      avaDFans:0,
      bellaBFans:0,
      bellaDFans:0,
      carolBFans:0,
      carolDFans:0,
      dianaBFans:0,
      dianaDFans:0,
      eileenBFans:0,
      eileenDFans:0,
      officialBFans:0,
      officialDFans:0
    }
  },
  components: {

  },
  mounted(){

    axios.get('api/x/relation/stat?vmid=672346917').then((dat)=>{
      this.avaBFans=dat.data.data.follower;
    },(err)=>{
      console.log(err);
    })
    axios.get('api/x/relation/stat?vmid=672353429').then((dat)=>{
      this.bellaBFans=dat.data.data.follower;
    },(err)=>{
      console.log(err);
    })
    axios.get('api/x/relation/stat?vmid=351609538').then((dat)=>{
      this.carolBFans=dat.data.data.follower;
    },(err)=>{
      console.log(err);
    })
    axios.get('api/x/relation/stat?vmid=672328094').then((dat)=>{
      this.dianaBFans=dat.data.data.follower;
    },(err)=>{
      console.log(err);
    })
    axios.get('api/x/relation/stat?vmid=672342685').then((dat)=>{
      this.eileenBFans=dat.data.data.follower;
    },(err)=>{
      console.log(err);
    })
    axios.get('api/x/relation/stat?vmid=703007996').then((dat)=>{
      this.officialBFans=dat.data.data.follower;
    },(err)=>{
      console.log(err);
    })
    axios.get('douyin/web/api/v2/user/info/?sec_uid=MS4wLjABAAAAxOXMMwlShWjp4DONMwfEEfloRYiC1rXwQ64eydoZ0ORPFVGysZEd4zMt8AjsTbyt').then((dat)=>{
      this.avaDFans=dat.data.user_info.follower_count;
    })
    axios.get('douyin/web/api/v2/user/info/?sec_uid=MS4wLjABAAAAlpnJ0bXVDV6BNgbHUYVWnnIagRqeeZyNyXB84JXTqAS5tgGjAtw0ZZkv0KSHYyhP').then((dat)=>{
      this.bellaDFans=dat.data.user_info.follower_count;
    })
    axios.get('douyin/web/api/v2/user/info/?sec_uid=MS4wLjABAAAAuZHC7vwqRhPzdeTb24HS7So91u9ucl9c8JjpOS2CPK-9Kg2D32Sj7-mZYvUCJCya').then((dat)=>{
      this.carolDFans=dat.data.user_info.follower_count;
    })
    axios.get('douyin/web/api/v2/user/info/?sec_uid=MS4wLjABAAAA5ZrIrbgva_HMeHuNn64goOD2XYnk4ItSypgRHlbSh1c').then((dat)=>{
      this.dianaDFans=dat.data.user_info.follower_count;
    })
    axios.get('douyin/web/api/v2/user/info/?sec_uid=MS4wLjABAAAAxCiIYlaaKaMz_J1QaIAmHGgc3bTerIpgTzZjm0na8w5t2KTPrCz4bm_5M5EMPy92').then((dat)=>{
      this.eileenDFans=dat.data.user_info.follower_count;
    })
    axios.get('douyin/web/api/v2/user/info/?sec_uid=MS4wLjABAAAAflgvVQ5O1K4RfgUu3k0A2erAZSK7RsdiqPAvxcObn93x2vk4SKk1eUb6l_D4MX-n').then((dat)=>{
      this.officialDFans=dat.data.user_info.follower_count;
    })
  }
}
</script>

<style lang="less" scoped>

*{
  margin:0;
  padding:0;
}

.fanQuery{
  background-color:#1d1d1d;
  width: 100%;
  height:100vh;
  overflow: hidden;
}
.pages{
  height:100%;
  display:flex;
  flex-direction: column;
  flex-wrap:wrap;
  align-content: space-around;
  justify-content:space-around;
}
.cell-33{
  flex:0 0 33%;
}

.displayCard{
  position: relative;
  width: 160px;
}
.backgroundImg{
  max-width: 100px;
}
.cardLayout0{
  position: absolute;
  z-index: 0;
  overflow: hidden;
}
.cardLayout1{
  position: absolute;
  z-index: -1;
}
.cardLayout2{
  position: absolute;
}
.fansNumDiv{
  margin-top:3rem;
  margin-left:16rem;
}
.fansNumDiv p{
  width:13rem;
}
.fontConfig{
  margin-left: 8px;
  font-weight:600;
  font-size:1.5rem;
  color:white;
}
</style>
