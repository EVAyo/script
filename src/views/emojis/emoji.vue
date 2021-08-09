<template>
  <div class="emoji">
		<!-- <div class="waterfall" ref="waterfallBox"> -->
      <div v-for="(bigItem,index) in imgList" :key="index" class="column" :style="{'width': columnNumWidth+'%'}" ref="imgBox">
        <div v-for="img in bigItem" :key="img.id"  class="column-item fadeInUp"   :style="{'padding-top':img.paddingTop+'%'}">

          <a :href="img.url" target="_blank" rel="noopener noreferrer">
              <img  alt="" :data-src="img.url" class="column-item-img" >
          </a>
			  </div>
      </div>
      <div class="last-page" v-if="isLastPage">
      ---------已经是最后一页啦---------
    </div>
		<!-- </div> -->
    
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
      pageSize:100,
      count: 0,
      screenWidth: document.body.clientWidth,
      columnNum:4,
      columnNumWidth:25,
      lazyCurrentList:[],
      isLastPage : false,
    };
  },
  created() {
        
  },
 async mounted(){
        this.listensBoxScroll()
        
        this.columnNum= Math.floor((document.body.clientWidth*0.8)/240)>4? 4 : Math.floor((this.screenWidth*0.8)/240)
        this.columnNumWidth = 100/this.columnNum - 5

        window.onresize = () => {
                    this.screenWidth = document.body.clientWidth
            }
    this.imgList = Array.from(Array(this.columnNum), () => new Array(0))
    await this.GetLIstImg();
    this.lazyLoadimg()
  },
  watch:{

    screenWidth (val) {
                if (!this.timer) {
                    this.screenWidth = val
                    this.timer = true
                    // let that = this
                    setTimeout(()=> {
                      let tempColumn = Math.floor((this.screenWidth*0.8)/240) >4? 4 : Math.floor((this.screenWidth*0.8)/240)
                      if(this.columnNum!=tempColumn){
                          this.columnNum = tempColumn ;
                          this.columnNumWidth = 100/this.columnNum - 5
                          this.setListIndex()
                          this.$nextTick(()=>{
                            this.lazyLoadimg()
                          })
                      }
                        this.timer = false
                    }, 400)
                }
            }
  },

  methods: {
    // 重置展示数组列数
    setListIndex(){
      const cacheList = [...this.cacheList]
      const column  = this.columnNum
      let tempList = Array.from(Array(column),() => new Array())
      cacheList.forEach((ele,index)=>{
          let temp = index % column
          // console.log(temp);
          tempList[temp].push(ele)
      })
      this.imgList = tempList
    },
    // 监听scroll事件
    listensBoxScroll(){
      window.onscroll  = (e) => {
        // 最后一页 不再滚动
        if(this.isLastPage){
          return
        }
          if (!this.timeBoxScroll) {
                    this.timeBoxScroll = true
                    setTimeout(async()=> {
                      this.lazyLoadimg()
                      // console.log(window.documentElement.scrollTop);
                      
                      // 目前窗口底部离容器顶部的距离
                      let  TopOffsetHeight = document.documentElement.scrollTop +document.documentElement.offsetHeight
                      let scrollHeight  = document.documentElement.scrollHeight
                      // console.log(TopOffsetHeight,'TopOffsetHeight');
                      // console.log(scrollHeight,'scrollHeight');
                      // 离底部50px触发翻页
                      if(TopOffsetHeight +50 >= scrollHeight){
                        this.currentPage++;
                        await this.GetLIstImg()
                        // this.lazyLoadimg()
                      }
                        this.timeBoxScroll = false
                    }, 400)
                }
      }
    },
    // 获取图片
    async GetLIstImg() {
      try {
        this.$loading();
        const res = await this.$request({
          url: `emoji/?page=${this.currentPage}&limit=${this.pageSize}`,
        });
        if(res.length<this.pageSize){
            this.isLastPage =true
        }
        let tempList =  [...this.imgList]

        res.forEach((ele,index)=>{
            ele.paddingTop=ele.height/ ele.width *100
            ele.url = 'https://'+ ele.url
        })
        
        // 排序 解决某列高度过长问题
        if(this.currentPage%2==0){
          res.sort((obj1, obj2)=>{
                      return    obj1.paddingTop < obj2.paddingTop ? -1 : (obj1.paddingTop > obj2.paddingTop?1 :0)
                  })
        }else{
            res.sort((obj1, obj2)=>{
                      return    obj1.paddingTop < obj2.paddingTop ? 1 : (obj1.paddingTop > obj2.paddingTop?-1 :0)
                  })
        }
        
        res.forEach((ele,index)=>{
            let i = (index+ ((this.currentPage-1)*this.pageSize))%this.columnNum
            this.imgList[i].push(ele)
            this.cacheList.push(ele)
        })
        // this.imgList = [...tempList]
      } catch (error) {
        this.$message({message:error,type: 'error'})
      } finally {
      this.$closeLoading();
      }
    },
    
    toUpSpace(){
      window.open('https://space.bilibili.com/15073186')
    },
    // 懒加载
    lazyLoadimg(){
        
        let list = this.$refs.imgBox
        for(let i =0;i<list.length;i++){
        let tempList =  list[i].querySelectorAll('.column-item-img')
          tempList.forEach((item,index)=>{

            if(!item.src&&((window.innerHeight - item.getBoundingClientRect().top) >0)){
                  item.src = item.getAttribute('data-src')
            }
          })
        }
    }
  },
};
</script>



<style lang="less" scoped>
.emoji{
  position: relative;
  // height: 100%;
  padding-left: 18.5vh;
  // background-image:url('../../assets/img/emoji/bgp.webp');
  background-size: cover;
  background-color: #2B343A;
  display: flex;
  justify-content: center;
}

.waterfall{
  position: relative;
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
  // min-width: 300px;
  min-width: 100px;
  max-width: 200px;
  // width: calc(100%/var(--columns));;
  margin: 0 20px;

}
.column-item {
  display: block;
  position: relative;
  width: 100%;
  height: 0;
  margin: 20px 0 ;
  border-radius: 4px;
  background-color: rgba(255, 255, 255);
  transform: scale(0.95,0.95);
  -moz-transition: transform 0.3s ease-out,background-color 0.3s ease-out; /* Firefox 4 */
  -webkit-transition: transform 0.3s ease-out,background-color 0.3s ease-out; /* Safari 和 Chrome */
  -o-transition: transform 0.3s ease-out,background-color 0.3s ease-out; /* Opera */
  transition: transform 0.3s ease-out,background-color 0.3s ease-out;
}

.column-item:hover {
  transform: scale(1.05,1.05);
  background-color: rgba(255, 255, 255,0);
}
.column-item-img{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  border-radius: 4px;
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
.last-page{

  // right: 0;
  color: #f1f2f3;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  width: 100%;
}
</style>
