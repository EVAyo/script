<template>
  <div class="emoji">
		<div class="waterfall" ref="waterfallBox">
      <div v-for="(bigItem,index) in imgList" :key="index" class="column">
        <div v-for="img in bigItem" :key="img.id" class="column-item"  :style="{'padding-top':img.paddingTop+'%'}">
				  <img :src="img.url" alt="" class="column-item-img" >
			  </div>
      </div>
		</div>
  </div>

</template>
<script>

export default {

  data() {
    return {
      imgList: [
        [{
          paddingTop:"",
          width:"",
          id:"1"
        }],
        [{
          paddingTop:"",
          width:"",
          id:"0"
        }],[{
          paddingTop:"",
          width:"",
          id:"2"
        }],
      ],
      // imgList: Array.from(Array(this.columnNum), () => new Array(0)),
      // 当前页
      currentPage:1,
      count: 0,
      // 瀑布盒子高度
      boxHeight:0,
      screenWidth: document.body.clientWidth,
      columnNum:4,
    };
  },
  created() {
    this.imgList = Array.from(Array(this.columnNum), () => new Array(0))
    this.GetLIstImg();
  },
  mounted(){
          this.listensBoxScroll()
          // debugger
            window.onresize = () => {
                // return (() => {
                    window.screenWidth = document.body.clientWidth
                    this.screenWidth = window.screenWidth
                    // console.log(this.screenWidth);
                // })()
            }
  },
  watch:{
    
    screenWidth (val) {
                 if (!this.timer) {
                    this.screenWidth = val
                    this.timer = true
                    // let that = this
                    setTimeout(()=> {
                      let tempColumn = Math.floor((this.screenWidth*0.8)/320)
                      // if(this.columnNum!=tempColumn){
                      //     this.columnNum = tempColumn;
                      //     this.setListIndex()
                      // }
                       
                    // console.log(      );  
                        // that.screenWidth = that.$store.state.canvasWidth
                        console.log(this.screenWidth,'this.screenWidth')
                        // this.init()
                        this.timer = false
                    }, 500)
                }
            }
  },
 
  methods: {
    // 设置数组列数
    setListIndex(){
      return 
      const imgList = [...this.imgList]
      // [[],[],[],[]]
      // [[][][][][]]  row =  2
      // [[][][][][]]  male = 5
      let List = []
      let index = 0;
      let tempList = Array.from(Array(this.columnNum),() => new Array())
      // this.imgList 
      let maxLength = imgList[0].length
      let Row = imgList.length
      for(let i=0;i<maxLength;i++){
        for(let row = 0;row<Row;row++){
          if(!imgList[i][row]){
            break
          }
          index++
          tempList[index%this.columnNum].push(imgList[i][row])
        }
      }
      this.imgList = tempList
      // console.log(tempList);
      // debugger
    },
    // 监听waterfallBox的scroll事件
    listensBoxScroll(){
      this.$refs.waterfallBox.onscroll  = (e) => {
           if (!this.timeBoxScroll) {
                    this.timeBoxScroll = true
                    setTimeout(async()=> {
                      // 触底
                      if(this.$refs.waterfallBox.scrollTop
                      +this.$refs.waterfallBox.offsetHeight
                      >=this.$refs.waterfallBox.scrollHeight ){
                        this.currentPage++;
                        await this.GetLIstImg()
                      }
                        this.timeBoxScroll = false
                    }, 400)
                }
      }
    },
    async GetLIstImg(pageSize=10) {
      try {
        this.$loading();
        const res = await this.$request({
          url: `http://124.156.217.253:8000/?page=${this.currentPage}&limit=${pageSize}`,
        });
        // const res = await this.$request({
        //   url: `emoji/?page=${this.currentPage}&limit=${pageSize}`,
        // });

        let tempList =  [...this.imgList]
        // console.log(tempList);
        // debugger
        res.forEach((ele,index)=>{
            let i = (index+ ((this.currentPage-1)*10))%this.columnNum
            console.log(i);
            ele.paddingTop=ele.height/ ele.width *100
            // let temp = Math.floor(Math.random()*100*2)
            // ele.paddingTop= temp>20&&temp<160 ? temp : '100'
            ele.url = 'https://'+ ele.url
            tempList[i].push(ele)
            // this.imgList[i].push(ele)
            // tempList.push({
            //   id:ele.id,
            //   url: 'https://'+ ele.url
            // })
        })
        this.imgList = [...tempList]  
      } catch (error) {
        console.log(error);
      } finally {
        //console.log(res);
      this.$closeLoading();
      }
    },  

  },
};
</script>



<style lang="less" scoped>



.emoji{
  position: relative;
  width: 100%;
  height: 100%;
  background-image:url('../../assets/img/emoji/bgp.png');
  background-size: cover;
  background-color: #000;
   display: flex;
  justify-content: center;
}

.waterfall{
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  width: 80%;
  min-width: 700px;
  justify-content: center;
  height: 100vh;
  overflow-y: auto;
}
.column{
  width: 300px;
  // background-color: blue;
  margin: 0 10px;

}
.column-item {
  position: relative;
  width: 100%;
  height: 0;
  // height: 50px;
  // padding: 50%;
  margin: 10px 0 ;
  background-color: rgba(255, 255, 255);
}
.column-item-img{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    
}
//  img {
//   position: absolute;
//   /* 主要 */
//   /* width: auto;height: auto; */
//   // width: 90%;
//   // height: auto;
//   /* max-height: 100%; */
//   /* 次要 */
//   border-radius: 6px;
// }
</style>