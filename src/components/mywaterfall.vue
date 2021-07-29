<template>
	<div class="waterfull">
		<h2>瀑布流布局</h2>
		<div class="v-waterfall-content" id="v-waterfall">
			<div v-for="(img, index) in waterfallList" :key="index" class="v-waterfall-item" :style="{top:img.top+'px',left:img.left+'px',width:waterfallImgWidth+'px',height:img.height}">
				<img :src="img.src" alt="">
				<!-- // 说明文字
				<p style="font-size: small;color: #666;margin: 4px;">{{img.title}}</p>
				<p style="font-size: x-small;color: #9e9e9e;margin: 4px;padding-bottom: 6px;">{{img.info}}</p> -->
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "v-waterfall",
    props:{
        imgArr:{
            type:Array
        }
    },
		data() {
			return {
				waterfallList: [],
				// imgArr: [
				// ],
				// waterfallImgWidth: 100,
				waterfallImgWidth: 200,// 每个盒子的宽度
				waterfallImgCol: 3,// 瀑布流的列数
				waterfallImgRight: 10,// 每个盒子的右padding
				waterfallImgBottom: 10,// 每个盒子的下padding
				waterfallDeviationHeight: [],
				imgList: []
			}
		},
    watch:{
        imgArr: function(e){
          for (let i = 0; i < this.imgArr.length; i++) {
				// this.imgList.push(this.imgArr[Math.round(Math.random() * 8)]);// 图片随机显示
				this.imgList.push(this.imgArr[i]);
        console.log(this.imgList);
        debugger
			}
      this.calculationWidth();
        }
    },
		// mounted() {
		// 	// 触发入口
	
    //   debugger
		// },
		// mounted() {
		
		// },
		methods: {
			//计算每个图片的宽度或者是列数
			calculationWidth() {
				let domWidth = document.getElementById("v-waterfall").offsetWidth;
        console.log(domWidth);
        debugger
				if (!this.waterfallImgWidth && this.waterfallImgCol) {
					this.waterfallImgWidth = (domWidth - this.waterfallImgRight * this.waterfallImgCol) / this.waterfallImgCol;
				} else if (this.waterfallImgWidth && !this.waterfallImgCol) {
					this.waterfallImgCol = Math.floor(domWidth / (this.waterfallImgWidth + this.waterfallImgRight))
				}
        console.log(this.waterfallImgCol,'this.waterfallImgCol',); 
        console.log(this.waterfallImgWidth,'this.waterfallImgWidth');
        debugger
				//初始化偏移高度数组
				this.waterfallDeviationHeight = new Array(this.waterfallImgCol);
				for (let i = 0; i < this.waterfallDeviationHeight.length; i++) {
					this.waterfallDeviationHeight[i] = 0;
				}
				this.imgPreloading()
			},

			//图片预加载
			imgPreloading() {
				for (let i = 0; i < this.imgList.length; i++) {
					let aImg = new Image();
					aImg.src = this.imgList[i];
					aImg.onload = aImg.onerror = (e) => {
						let imgData = {};
						imgData.height = this.waterfallImgWidth / aImg.width * aImg.height;
						imgData.src = this.imgList[i];
						// imgData.title = '标题';// 说明文字（也可以自己写数组，或者封装json数据，都可以，但是前提是你会相关操作，这里不赘述）
						// imgData.info = '详情说明：啦啦啦啦啦';// 说明文字
						this.waterfallList.push(imgData);
						this.rankImg(imgData);
					}
				}
			},
			//瀑布流布局
			rankImg(imgData) {
				let {
					waterfallImgWidth,
					waterfallImgRight,
					waterfallImgBottom,
					waterfallDeviationHeight,
					waterfallImgCol
				} = this;
				let minIndex = this.filterMin();
				imgData.top = waterfallDeviationHeight[minIndex];
				imgData.left = minIndex * (waterfallImgRight + waterfallImgWidth);
				// waterfallDeviationHeight[minIndex] += imgData.height + waterfallImgBottom;// 不加文字的盒子高度
				waterfallDeviationHeight[minIndex] += imgData.height + waterfallImgBottom + 56;// 加了文字的盒子高度，留出文字的地方（这里设置56px）
				console.log(imgData);
			},
			/**
			 * 找到最短的列并返回下标
			 * @returns {number} 下标
			 */
			filterMin() {
				const min = Math.min.apply(null, this.waterfallDeviationHeight);
        console.log(this.waterfallDeviationHeight.indexOf(min));
        debugger
				return this.waterfallDeviationHeight.indexOf(min);
			}
		}
	}
</script>

<style scoped>
	.waterfull{
		width: 100%;
	}
	.v-waterfall-content {
		/* 主要 */
		width: 100%;height: 400px;position: relative;
		/* 次要：设置滚动条，要求固定高度 */
		overflow-y: auto;
	}

	.v-waterfall-item {
		/* 主要 */
		float: left;position: absolute;
	}

	.v-waterfall-item img {
		/* 主要 */
		/* width: auto;height: auto; */
		width: 90%;height: auto;
		/* 次要 */
		border-radius: 6px;
	}
</style>

