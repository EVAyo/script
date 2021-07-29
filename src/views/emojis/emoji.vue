<template>
<!-- <el-container class="home-container"> -->
<!-- <el-header>
    </el-header> -->
      <div class="waterfall">
        <!-- <div v-for="item in listone" :key="item.id">
            <img :src="item.url" alt="" style="width:20px;height:20px">
        </div> -->
          <my-waterfall :imgArr="listone"></my-waterfall>
        </div>
     
<!--     
 <el-footer>
	<img src="..\..\assets\img\emoji\note.png" width="90%">
</el-footer> -->
<!-- </el-container> -->
</template>
<script>
import myWaterfall from "@/components/mywaterfall";

export default {
  components: { myWaterfall },

  data() {
    return {
      listone: [],
      // 当前页
      currentPage:1,
      count: 0,
    };
  },
  async created() {
  await  this.GetLIstImg(this.currentPage, 10);
  },

  methods: {
    async GetLIstImg(page, pageSize) {
      try {
        this.$loading();
        const res = await this.$request({
          url: `emoji/?page=${page}&limit=${pageSize}`,
          //  responseType: 'blob'
        });
        let tempList = [...this.listone]
        res.forEach((ele)=>{
            tempList.push({
              id:ele.id,
              url: 'https://'+ ele.url
            })
        })
        this.listone = [...tempList]
        console.log(this.listone);
        debugger
      } catch (error) {
        console.log(error);
      } finally {
        //console.log(res);
      this.$closeLoading();
      }
    },


//  load () {
//         this.count += 2
//       }


  },
};
</script>



<style lang="less" scoped>



.waterfall{
  position: relative;
  background-image:"../../assets/img/emoji/bgp.png";
}
@import "./emoji.less";
</style>