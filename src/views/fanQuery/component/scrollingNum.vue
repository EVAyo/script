<template>
	<div class="number-grow-warp">
		<span ref="numberGrow" :data-time="time" class="number-grow" :data-value="value">
      加载中
    </span>
	</div>
</template>
 
<script>
export default {
  props: {
    time: {
      type: Number,
      default: 1
    },
    value: {
      type: Number,
      default: 0
    }
  },
  watch:{
    value() {
      this.numberGrow(this.$refs.numberGrow) 
      }
  },
  methods: {
    numberGrow (ele) {
      let step =Math.floor((this.value * 10) / (this.time * 1000))  
      let current = 0
      let start = 0
      let t = setInterval(() =>{
        start += step
        if (start > this.value) {
          clearInterval(t)
          start = this.value
          t = null
        }
        if (current === start) {
          return
        }
        current = start
        // console.log(current);
        // debugger
        ele.innerHTML = current
      }, 10)
    }
  },
  // mounted () {
  //   this.numberGrow(this.$refs.numberGrow)
  // }
}
</script>
 
<style>
.number-grow-warp{
  transform: translateZ(0);
}
.number-grow {
  /* font-family: Arial-BoldMT; */
  font-size: 18px;
  /* color: #ffaf00; */
  letter-spacing: 2.67px;
  /* margin:110px 0 20px; */
  display: block;
  /* line-height:64px; */
}
</style>
