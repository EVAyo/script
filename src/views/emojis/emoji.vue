<template>
  <div class="emoji">
        <!-- <div v-for="item in listone" :key="item.id">
            <img :src="item.url" alt="" style="width:20px;height:20px">
        </div> -->
          <my-waterfall  :imgArr="listone"></my-waterfall>
  </div>

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
  created() {
    this.GetLIstImg(this.currentPage);
  },
 
  methods: {
    async GetLIstImg(page, pageSize=20) {
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
  background-color: #000
}
</style>