<template>
  <div class="streamArchives">
    <div class="saBGWrapper">
      <div class="saMainWrapper">
        <!--  不同类别视频-->
        <div class="saClassesWrapper">
          <div @click="jump(saClass.link)" v-for="saClass in classes" class="saClasses" :key="saClass.url">
            <img class="saClassesImages" :src="saClass.url" :alt="saClass.text"/>
            <p class="saClassTexts">{{ saClass.text }}</p>
          </div>
        </div>
        <!--    不同类别切片-->
        <div class="saTypesWrapper">
          <div @click="jump(saType.link)" v-for="saType in types" class="saTypes" :key="saType.url">
            <img class="saTypesImages" :src="saType.url" :alt="saType.text"/>
            <p class="saTypesTexts">{{ saType.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'streamArchives',
  components: {},
  data() {
    return {
      classes: [
        {
          url: require('../../assets/img/streamArchives/1.png'),
          text: "单人直播",
          link: "https://space.bilibili.com/393396916/favlist"
        },
        {
          url: require('../../assets/img/streamArchives/2.png'),
          text: "游戏室",
          link: "https://space.bilibili.com/1442421278/favlist?fid=1331326978"
        },
        {
          url: require('../../assets/img/streamArchives/3.png'),
          text: "夜谈",
          link: "https://space.bilibili.com/1442421278/favlist?fid=1331514678"
        },
        {
          url: require('../../assets/img/streamArchives/4.png'),
          text: "生日会",
          link: "https://space.bilibili.com/1442421278/favlist?fid=1331195378"
        },
        {
          url: require('../../assets/img/streamArchives/5.png'),
          text: "小剧场",
          link: "https://space.bilibili.com/1442421278/favlist?fid=1331327278"
        },
        {
          url: require('../../assets/img/streamArchives/6.png'),
          text: "线下",
          link: "https://space.bilibili.com/1442421278/favlist?fid=1331250478"
        },
      ],
      types: [
        {
          url: require('../../assets/img/streamArchives/dances.png'),
          text: "舞蹈",
          link: "https://space.bilibili.com/1442421278/favlist?fid=1331424678"
        },
        {
          url: require('../../assets/img/streamArchives/musics.png'),
          text: "音乐",
          link: "https://space.bilibili.com/1442421278/favlist?fid=1331250578"
        }
      ]
    }
  },
  methods: {
    jump(str) {
      window.open(str);
    }
  }
}
</script>
<style lang="less" scoped>
.streamArchives {
  background-color: #282828;
  position: absolute;
  left: 0;
  min-height: 100vh;
  display: flex;
  width: 100vw;
  align-items: center;
  justify-content: flex-end;
}

.saBGWrapper {
  background-color: #282828;
  height: 100%;
  display: flex;
  width: calc(100% - 18.5vh);
}

.saMainWrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 60vw;
}

.saClassesWrapper {
  display: flex;
  width: 60vw;
  margin-top: 60px;
  flex-wrap: wrap;
  justify-content: center;
}

.saClassTexts {
  position: absolute;
  z-index: 2;
  right: 0;
  color: white;
  font-size: 26px;
  margin-right: 1vw;
}

@-webkit-keyframes saCI {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}

@keyframes saCI {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}

@keyframes saCIAfter {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@-webkit-keyframes saCIAfter {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.saClasses {
  width: 30vw;
  min-width: 300px;
  position: relative;
  display: flex;
  align-items: center;
  box-shadow: -3px 0 5px #111111;
  overflow: hidden;
  cursor: pointer;
  z-index: 1;
}

.saClasses:hover {
  -webkit-animation: saCI 1s forwards;
  animation: saCI 0.4s forwards;
  z-index: 2;
}

.saClasses:hover::after {
  -webkit-animation: saCIAfter 1s forwards;
  animation: saCIAfter 1s forwards;
}

.saClasses::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  z-index: 1;
}

.saClassesImages {
  width: 100%;
  border: 10px;
  z-index: 1;
}

.saClassesImages:hover {
  filter: brightness(1);
}

@media screen and (orientation: portrait) {
  .saClasses {
    width: 60vw;
  }

  .saClassesImages {
    width: 100%;
  }

  .saClassTexts {
    font-size: 20px;
  }
  .saBGWrapper{
    width: 100%;
  }
}

.saTypesWrapper {
  display: flex;
  margin-top: 30px;
  width: 50vw;
  // wrap-option: nowrap;
  justify-content: space-around;

}

.saTypes {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
}

.saTypesImages {
  width: 5vw;
  height: 5vw;
  margin-right: 1vw;
}

.saTypesTexts {
  color: white;
  font-size: 26px;
}
</style>