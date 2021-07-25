<template>
  <div class="fanQuery">
      <div class="row">
        <div class="leftImg">
          <div class="displayCard">
            <div class="cardLayout0"><img src="../../assets/img/fansQuery/ava.png" style="max-width:250px;" alt="" ></div>
            <div class="cardLayout1"><img class="backgroundImg" src="../../assets/img/fansQuery/colorAva.png" alt=""></div>
            <div class="cardLayout2"><img class="backgroundImg" src="../../assets/img/fansQuery/A.png" alt=""></div>
          </div>
          <div class="displayCard fansNumDiv">
            <br><br><br><br>
            <p><img src="../../assets/img/fansQuery/bilibili.png" style="width:40%;" alt=""><span class="fontConfig">{{ avaBFans}}</span></p>
            <br><br><br>
            <p><img src="../../assets/img/fansQuery/douyin.png" style="width:18%;" alt=""><span class="fontConfig">{{ avaDFans}}</span></p>
          </div>
        </div>

        <div class="rightImg">
          <div class="displayCard">
            <div class="cardLayout0"><img src="../../assets/img/fansQuery/bella.png" style="max-width:250px;" alt="" ></div>
            <div class="cardLayout1"><img class="backgroundImg" src="../../assets/img/fansQuery/colorBella.png" alt=""></div>
            <div class="cardLayout2"><img class="backgroundImg" src="../../assets/img/fansQuery/B.png" alt=""></div>
          </div>
          <div class="displayCard fansNumDiv">
            <br><br><br><br>
            <p><img src="../../assets/img/fansQuery/bilibili.png" style="width:40%;" alt=""><span class="fontConfig">{{bellaBFans}}</span></p>
            <br><br><br>
            <p><img src="../../assets/img/fansQuery/douyin.png" style="width:18%;" alt=""><span class="fontConfig">{{bellaDFans}}</span></p>
          </div>
        </div>
      </div>
      <div class="row">
        
        <div class="leftImg">
          <div class="displayCard">
            <div class="cardLayout0"><img src="../../assets/img/fansQuery/carol.png" style="max-width:250px;" alt="" ></div>
            <div class="cardLayout1"><img class="backgroundImg" src="../../assets/img/fansQuery/colorCarol.png" alt=""></div>
            <div class="cardLayout2"><img class="backgroundImg" src="../../assets/img/fansQuery/C.png" alt=""></div>
          </div>
          <div class="displayCard fansNumDiv">
            <br><br><br><br>
            <p><img src="../../assets/img/fansQuery/bilibili.png" style="width:40%;" alt=""><span class="fontConfig">{{carolBFans}}</span></p>
            <br><br><br>
            <p><img src="../../assets/img/fansQuery/douyin.png" style="width:18%;" alt=""><span class="fontConfig" >{{carolDFans}}</span></p>
          </div>
          
          
        </div>



        <div class="rightImg">
          <div class="displayCard">
            <div class="cardLayout0"><img src="../../assets/img/fansQuery/diana.png" style="max-width:250px;" alt="" ></div>
            <div class="cardLayout1"><img class="backgroundImg" src="../../assets/img/fansQuery/colorDiana.png" alt=""></div>
            <div class="cardLayout2"><img class="backgroundImg" src="../../assets/img/fansQuery/D.png" alt=""></div>
          </div>
          <div class="displayCard fansNumDiv">
            <br><br><br><br>
            <p><img src="../../assets/img/fansQuery/bilibili.png" style="width:40%;" alt=""><span class="fontConfig">{{dianaBFans}}</span></p>
            <br><br><br>
            <p><img src="../../assets/img/fansQuery/douyin.png" style="width:18%;" alt=""><span class="fontConfig">{{dianaDFans}}</span></p>
          </div>
          
          
        </div>
      </div>
      <div class="row">
        
        <div class="leftImg">
          <div class="displayCard">
            <div class="cardLayout0"><img src="../../assets/img/fansQuery/eileen.png" style="max-width:250px;" alt="" ></div>
            <div class="cardLayout1"><img class="backgroundImg" src="../../assets/img/fansQuery/colorEileen.png" alt=""></div>
            <div class="cardLayout2"><img class="backgroundImg" src="../../assets/img/fansQuery/E.png" alt=""></div>
          </div>
          <div class="displayCard fansNumDiv">
            <br><br><br><br>
            <p><img src="../../assets/img/fansQuery/bilibili.png" style="width:40%;" alt=""><span class="fontConfig">{{eileenBFans}}</span></p>
            <br><br><br>
            <p><img src="../../assets/img/fansQuery/douyin.png" style="width:18%;" alt=""><span class="fontConfig">{{eileenDFans}}</span></p>
          </div>
          
          
        </div>



        <div class="rightImg">
          <div class="displayCard">
            <div class="cardLayout0 cardAcao0"><img src="../../assets/img/fansQuery/acao.png" style="max-width:180px;" alt="" ></div>
            <div class="cardLayout1 cardAcao1"><img class="backgroundImg" src="../../assets/img/fansQuery/colorOfficial.png" alt=""></div>
            <div class="cardLayout2 cardAcao2"><img class="backgroundImg" src="../../assets/img/fansQuery/official.png" alt=""></div>
          </div>
          <div class="displayCard fansNumDiv">
            <br><br><br><br>
            <p><img src="../../assets/img/fansQuery/bilibili.png" style="width:40%;" alt=""><span class="fontConfig">{{officialBFans}}</span></p>
            <br><br><br>
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
  z-index: -9;
  width: 100%;
}
.leftImg{
  margin-left:7vw;
  margin-top:40px;
  width:42%;
  float:left;
  padding-bottom: 20px;;
}
.rightImg{
  margin-right: 5vw;
  width:42%;
  float:right;
  margin-top:40px;
  padding-bottom: 20px;
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
  top:-3rem;
  left:-2.5rem;
  overflow: hidden;
  height:14.77rem;
}
.cardLayout1{
  position: absolute;
  z-index: -1;
  top:5rem;
  left:24%;
}
.cardLayout2{
  position: absolute;
  z-index: -1;
  top:5.5rem;
  left:24%;
}
.fansNumDiv{
  margin-top:0rem;
  margin-left:10rem;
}
.fansNumDiv p{
  width:12rem;
}
.cardAcao0{
  width: 100%;
  top:2.5rem;
  left:-1.4rem;
}
.cardAcao1{
  top:0rem;
}
.cardAcao2{
  top:0rem;
  opacity: 0.5;
  overflow: hidden;
  height:12rem;
}
.fontConfig{
  margin-left: 8px;
  font-weight:600;
  font-size:1.5rem;
  color:white;
}
</style>
