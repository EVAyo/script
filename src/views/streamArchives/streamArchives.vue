<template>
  <div class="streamArchives">
    <div class="saMainWrapper">
      <!--  不同类别视频-->
      <div class="saClassesWrapper">
        <div v-for="saClass in classes" class="saClasses">
          <img class="saClassesImages" :src="saClass.url" :alt="saClass.text"/>
          <p class="saClassTexts">{{saClass.text}}</p>
        </div>
      </div>
      <!--    不同类别切片-->
      <div class="saTypesWrapper">
        <div v-for="saType in types" class="saTypes">
          <img class="saTypesImages" :src="saType.url" :alt="saType.text"/>
          <p class="saTypesTexts">{{saType.text}}</p>
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
          text: "单人直播"
        },
        {
          url: require('../../assets/img/streamArchives/2.png'),
          text: "游戏室"
        },
        {
          url: require('../../assets/img/streamArchives/3.png'),
          text: "夜谈"
        },
        {
          url: require('../../assets/img/streamArchives/4.png'),
          text: "生日会"
        },
        {
          url: require('../../assets/img/streamArchives/5.png'),
          text: "小剧场"
        },
        {
          url: require('../../assets/img/streamArchives/6.png'),
          text: "线下"
        },
      ],
      types: [
        {
          url: require('../../assets/img/streamArchives/dances.png'),
          text:"舞蹈"
        },
        {
          url: require('../../assets/img/streamArchives/clips.png'),
          text:"切片"
        },
        {
          url: require('../../assets/img/streamArchives/musics.png'),
          text:"音乐"
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.saMainWrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
  width:50vw;
}

.streamArchives {
  background-color: #2B343A;
  height: 100%;
}

.saClassesWrapper {
  margin-top: 100px;
  display: flex;
  width: 50vw;
  flex-wrap: wrap;
  justify-content: center;
}
.saClassTexts{
  position: absolute;
  z-index:2;
  right:0;
  top:50%;
  transform: translate(0, -50%);
  bottom: 0;
  float: right;
  color: white;
  font-size: 30px;
}
.saClasses{
  width: 25vw;
  position: relative;
}
.saClassesImages {
  width: 30vw;
  border: 10px;
  z-index: 1;
}
.saTypesWrapper{
  display: flex;
  margin-top: 30px;
  width:50vw;
  wrap-option: nowrap;
  justify-content: space-around;
}
.saTypes{
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
}
.saTypesImages{
  width: 5vw;
  height:5vw;
}
.saTypesTexts{
  color: white;
  font-size: 30px;
}
</style>