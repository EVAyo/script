<!--
 * @Author: maggot-code
 * @Date: 2021-07-31 03:50:04
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-07-31 04:36:49
 * @Description: file content
-->
<template>
  <img v-if="src" :src="src" width="100%" alt="">
  <div v-else class="a-soul-fan-word-cloud" :style="style" ref="mask" />
</template>

<script>
import * as echarts from 'echarts'
import 'echarts-wordcloud'

export default {
  name: 'a-soul-fan-word-cloud',
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  data () {
    //这里存放数据
    return {
      show: false,
      src: '',
      style: {}
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {
    const { src, data, fontColor } = this.options
    this.$nextTick(() => {
      const chart = echarts.init(this.$refs.mask)
      this.style = { transform: `scale(${this.$refs.mask.parentNode.clientWidth / 750})` }
      const maskImage = new Image()
      maskImage.src = src
      maskImage.onload = () => {
        this.$nextTick(() => {
          const options = {
            series: [{
              type: 'wordCloud',
              maskImage,
              sizeRange: [5, 40],
              rotationRange: [0, 0],
              width: '100%',
              height: '100%',
              textPadding: 0,
              textStyle: {
                fontFamily: 'sans-serif',
                color: fontColor
              },
              data
            }]
          }
          chart.setOption(options)
          chart.on('finished', () => {
            // chart.appendData({
            //   seriesIndex: 0,
            //   data
            // })
            this.src = chart.getDataURL({
              pixelRatio: 2,
              backgroundColor: '#333'
            })
            chart.dispose()
          })
        })
      }
    })
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {},
  beforeCreate () {}, //生命周期 - 创建之前
  beforeMount () {}, //生命周期 - 挂载之前
  beforeUpdate () {}, //生命周期 - 更新之前
  updated () {}, //生命周期 - 更新之后
  beforeDestroy () {}, //生命周期 - 销毁之前
  destroyed () {}, //生命周期 - 销毁完成
  activated () {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='css' scoped>
.a-soul-fan-word-cloud {
  position: absolute;
  width: 750px;
  height: 1140px;
  transform-origin: 0 0;
  overflow: hidden;
}
</style>
