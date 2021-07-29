<template>
	<div class="waterfull">
		<div class="v-waterfall-content" id="v-waterfall">
			<div v-for="img in waterfallList" :key="img.id" class="v-waterfall-item" :style="{top:img.top+'px',left:img.left+'px',width:waterfallImgWidth+'px',height:img.height}">
				<img :src="img.src" alt="" >
			</div>
		</div>
    	<!-- <div class="v-waterfall-content" id="v-waterfall" ref="test">
			<div v-for="img in waterfallList" :key="img.id"  class="v-waterfall-item"
      >
				<img :src="img.src" alt="" >
			</div>
		</div> -->
      <!-- <div class="v-waterfall-content" v-infinite-scroll="load" infinite-scroll-immediate="false">
        <div v-for="img in waterfallList" :key="img.id" class="v-waterfall-item" 
        :style="{top:img.top+'px',left:img.left+'px',width:waterfallImgWidth+'px',height:img.height}">
				<img :src="img.src" alt="加载中">
        </div>
      </div> -->
	</div>
</template>

<script>
export default {
  name: "v-waterfall",
  props: {
    imgArr: {
      type: Array,
    },
  },
  data() {
    return {
      waterfallList: [],
      // imgArr: [
      // ],
      // waterfallImgWidth: 100,
      waterfallImgWidth: 200, // 每个盒子的宽度
      waterfallImgCol: 4, // 瀑布流的列数
      waterfallImgRight: 10, // 每个盒子的右padding
      waterfallImgBottom: 10, // 每个盒子的下padding
      waterfallDeviationHeight: [],
      imgList: [],

      fallHeight:"",
    };
  },
  watch: {
    imgArr: function (e) {
      for (let i = 0; i < this.imgArr.length; i++) {
        this.imgList.push(this.imgArr[i]);
      }
      // this.imgPreloading()
      this.calculationWidth();
    },
  },

  // },
  mounted() {

    // document.getElementById("v-waterfall").addEventListener('scroll',this.load )
    // this.fallHeight =   document.getElementById("v-waterfall").offsetHeight;
    // console.log(this.$refs.test.scrollHeight);
    // this.$nextTick(()=>{
    //   if(this.$refs.test.scrollHeight <= document.getElementById("v-waterfall").offsetHeight){
    //     console.log('还没到容器高度');
    //   }
    // })

  },  
  methods: {
    //计算每个图片的宽度或者是列数
    calculationWidth() {
      // let domWidth = document.getElementById("v-waterfall").offsetWidth;
      // if (!this.waterfallImgWidth && this.waterfallImgCol) {
      // 	this.waterfallImgWidth = (domWidth - this.waterfallImgRight * this.waterfallImgCol) / this.waterfallImgCol;

      // } else if (this.waterfallImgWidth && !this.waterfallImgCol) {
      // 	this.waterfallImgCol = Math.floor(domWidth / (this.waterfallImgWidth + this.waterfallImgRight))
      // }

      //初始化偏移高度数组
      this.waterfallDeviationHeight = new Array(this.waterfallImgCol);
      for (let i = 0; i < this.waterfallDeviationHeight.length; i++) {
        this.waterfallDeviationHeight[i] = 0;
      }
      this.imgPreloading();
    },

    //图片预加载
    imgPreloading() {
      for (let i = 0; i < this.imgList.length; i++) {
        let aImg = new Image();
        aImg.src = this.imgList[i].url;
        aImg.onload = aImg.onerror = (e) => {
          let imgData = {};
          imgData.height = (this.waterfallImgWidth / aImg.width) * aImg.height;
          imgData.src = this.imgList[i].url;
          imgData.id = this.imgList[i].id;
          // this.rankImg(imgData);
          this.waterfallList.push(imgData);
        };
      }

    //   this.$nextTick(() => {
    //     console.log(document.getElementById("v-waterfall").scrollHeigh,'正文高度');
    
    // });
    // if()
    
    },
    //瀑布流布局
    rankImg(imgData) {
      let {
        waterfallImgWidth,
        waterfallImgRight,
        waterfallImgBottom,
        waterfallDeviationHeight,
      } = this;
      let minIndex = this.filterMin();
      imgData.top = waterfallDeviationHeight[minIndex];
      imgData.left = minIndex * (waterfallImgRight + waterfallImgWidth);
      waterfallDeviationHeight[minIndex] += imgData.height + waterfallImgBottom; // 不加文字的盒子高度
    },
    /**
     * 找到最短的列并返回下标
     * @returns {number} 下标
     */
    filterMin() {
      const min = Math.min.apply(null, this.waterfallDeviationHeight);
      console.log(this.waterfallDeviationHeight);
      return this.waterfallDeviationHeight.indexOf(min);
    },
      load () {
        console.log('load');
        // debugger
      }
  },
};
</script>

<style scoped>
.waterfull {
  width: 100%;
  display: flex;
  justify-content: center;
}
.v-waterfall-content {
  /* 主要 */
  width: 60vw;
  min-width: 400px;
  max-width: 1000px;
  height: 100vh;
  max-height: 100vh;
  position: relative;
  /* 次要：设置滚动条，要求固定高度 */
  overflow-y: auto;
  /* display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center; */
  background-color: rgba(0, 0, 0, 0.3);
}

.v-waterfall-item {
  /* 主要 */
  float: left;
  position: absolute;
  /* display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  padding: 10px; */
}

 img {
  /* 主要 */
  /* width: auto;height: auto; */
  width: 90%;
  height: auto;
  /* max-height: 100%; */
  /* 次要 */
  border-radius: 6px;
}
</style>

