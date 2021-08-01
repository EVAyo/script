<template>
  <div class="emoji">
		<div class="waterfall" ref="waterfallBox">
      <div v-for="(bigItem,index) in imgList" :key="index" class="column">
        <div v-for="img in bigItem" :key="img.id" class="column-item fadeInUp"  :style="{'padding-top':img.paddingTop+'%'}">

          <a :href="img.url" target="_blank" rel="noopener noreferrer">
              <img :src="img.url" alt="" class="column-item-img" >
          </a>
			  </div>
      </div>
		</div>
     <!-- 数据来源 -->
      <div class="data-souce" @click="toUpSpace">
          数据来源:B站洛骑塔
      </div>
     
  </div>

</template>
<script>

export default {

  data() {
    return {
      // 当前获取的所有数据的一维数组
      cacheList:[],
      imgList: [],
      // 当前页
      currentPage:1,
      pageSize:20,
      count: 0,
      screenWidth: document.body.clientWidth,
      columnNum:3,
    };
  },
  created() {
        
  },
  mounted(){
        this.listensBoxScroll()
        this.columnNum= Math.floor((document.body.clientWidth*0.8)/340)
        console.log(Math.floor((document.body.clientWidth*0.8)/340));
        debugger
        window.onresize = () => {
                    this.screenWidth = document.body.clientWidth
            }
    this.imgList = Array.from(Array(this.columnNum), () => new Array(0))
    this.GetLIstImg();
  },
  watch:{

    screenWidth (val) {
                if (!this.timer) {
                    this.screenWidth = val
                    this.timer = true
                    // let that = this
                    setTimeout(()=> {
                      let tempColumn = Math.floor((this.screenWidth*0.8)/340)
                      if(this.columnNum!=tempColumn){
                          this.columnNum = tempColumn;
                          this.setListIndex()
                      }
                        this.timer = false
                    }, 500)
                }
            }
  },

  methods: {
    // 重置展示数组列数
    setListIndex(){
      const cacheList = [...this.cacheList]
      const column  = this.columnNum
      let tempList = Array.from(Array(column),() => new Array())
      // this.imgList
      cacheList.forEach((ele,index)=>{
          let temp = index % column
          console.log(temp);
          tempList[temp].push(ele)
      })
      this.imgList = tempList
    },
    // 监听waterfallBox的scroll事件
    listensBoxScroll(){
      this.$refs.waterfallBox.onscroll  = (e) => {
          if (!this.timeBoxScroll) {
                    this.timeBoxScroll = true
                    setTimeout(async()=> {
                      // 目前窗口底部离容器顶部的距离
                      let  TopOffsetHeight = this.$refs.waterfallBox.scrollTop +this.$refs.waterfallBox.offsetHeight
                      let scrollHeight  = this.$refs.waterfallBox.scrollHeight
                      // 离底部50px触发翻页
                      if(TopOffsetHeight +50 >= scrollHeight){
                        this.currentPage++;
                        await this.GetLIstImg()
                      }
                        this.timeBoxScroll = false
                    }, 400)
                }
      }
    },
    async GetLIstImg() {
      try {
        this.$loading();
        // const res = await this.$request({
        //   url: `http://124.156.217.253:8000/?page=${this.currentPage}&limit=${pageSize}`,
        // });
        const res = await this.$request({
          url: `emoji/?page=${this.currentPage}&limit=${this.pageSize}`,
        });

        let tempList =  [...this.imgList]

        res.forEach((ele,index)=>{
            ele.paddingTop=ele.height/ ele.width *100
            ele.url = 'https://'+ ele.url
        })
        // 排序 解决某列高度过长问题
        res.sort((obj1, obj2)=>{
          return    obj1.paddingTop < obj2.paddingTop ? -1 : (obj1.paddingTop > obj2.paddingTop?1 :0)
        })
        res.forEach((ele,index)=>{
            let i = (index+ ((this.currentPage-1)*this.pageSize))%this.columnNum
            tempList[i].push(ele)
            this.cacheList.push(ele)
        })
        this.imgList = [...tempList]
      } catch (error) {
        this.$message({message:error})
        console.log(error);
      } finally {
      this.$closeLoading();
      }
    },
    
    toUpSpace(){
      window.open('https://space.bilibili.com/15073186')
    }
  },
};
</script>



<style lang="less" scoped>
.emoji{
  position: relative;
  height: 100%;
  padding-left: 18.5vh;
  background-image:url('../../assets/img/emoji/bgp.png');
  background-size: cover;
  background-color: #000;
  display: flex;
  justify-content: center;
}

.waterfall{
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-wrap: wrap;
  width: 70%;
  min-width: 340px;
  justify-content: center;
  height: 100vh;
  overflow-y: auto;
}
.column{
  // max-width: 00px ;
  width: 20% ;
  min-width: 100px;
  // background-color: blue;
  margin: 0 20px;

}
.column-item {
  display: block;
  position: relative;
  width: 100%;
  height: 0;
  // height: 50px;
  // padding: 50%;
  margin: 20px 0 ;
  background-color: rgba(255, 255, 255);
  // border-radius: 4px;
  // transition: transform 0.5s ease-in;
  // transition: height 0.5s ;
  transform: scale(0.95,0.95);
    -moz-transition: transform 0.3s ease-out,background-color 0.3s ease-out; /* Firefox 4 */
  -webkit-transition: transform 0.3s ease-out,background-color 0.3s ease-out; /* Safari 和 Chrome */
  -o-transition: transform 0.3s ease-out,background-color 0.3s ease-out; /* Opera */
  transition: transform 0.3s ease-out,background-color 0.3s ease-out;
}
// .ftco-animate {
//     opacity: 0;
//     visibility: hidden;
// }

.column-item:hover {
  transform: scale(1.05,1.05);
  background-color: rgba(255, 255, 255,0);
  // margin: 20px;
  // width: 110%;
  // height: auto;
}
.column-item-img{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  // border-radius: 4px;
}
.data-souce{
    position: absolute;
    color: #f1f2f3;
    right: 0;
    bottom: 0;
    font-size: 12px;
    margin: 0 20px 20px 0;
    width: 80px;
    cursor: pointer;
    transition: font-size .5s;
    -moz-transition: font-size .5s; /* Firefox 4 */
    -webkit-transition: font-size .5s; /* Safari 和 Chrome */
    -o-transition: font-size .5s; /* Opera */
}
.data-souce:hover{
  font-size: 13px;
}
</style>
