<!--
 * @Author: maggot-code
 * @Date: 2021-07-28 22:26:22
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-07-31 04:37:01
 * @Description: file content
-->
<template>
  <div class="main">
    <template v-for="item in list">
      <div class="canvas-main" :keys="item.id">
        <word-cloud :options="item" />
      </div>
    </template>
    <!--      <div style="display: flex;justify-content: center;width: 100%;height: 100%;align-items: center">-->
    <!--        <p style="color: white;font-size: 70px;">敬请期待</p>-->
    <!--      </div>-->
  </div>
</template>

<script>
import WordCloud from './components/wordCloudComponent.vue'

import TestData from './assets/test-data.json'

import XWimg from '../../assets/img/wordCloud/xw-mask1_03.png'
import BLimg from '../../assets/img/wordCloud/bl-mask1_03.png'
import JLimg from '../../assets/img/wordCloud/jl-mask1_03.png'
import JRimg from '../../assets/img/wordCloud/jr-mask1_03.png'
import NLimg from '../../assets/img/wordCloud/nl-mask1_03.png'

const setList = (base) => {
  const data = []
  for (const key in base) {
    // data.push([key, Math.sqrt(base[key])]);
    if (base.hasOwnProperty(key)) {
      data.push({ name: key, value: Math.sqrt(base[key]) })
    }
  }
  return data
}

const data = setList(TestData)

export default {
  components: { WordCloud },
  data () {
    return {
      list: Object.freeze([
        {
          id: 'XW',
          src: XWimg,
          data,
          fontColor: '#9AC8E2',
        },
        {
          id: 'BL',
          src: BLimg,
          data,
          fontColor: '#DB7D74',
        },
        {
          id: 'JL',
          src: JLimg,
          data,
          fontColor: '#B8A6D9',
        },
        {
          id: 'JR',
          src: JRimg,
          data,
          fontColor: '#E799B0',
        },
        {
          id: 'NL',
          src: NLimg,
          data,
          fontColor: '#576690',
        },
      ])
    }
  },
  methods: {},
  created () {
    // const data = setList(TestData)
    // const list =
    // list.forEach((i, idx) => {
    //   setTimeout(() => {
    //     this.list.push(i)
    //   }, idx*100)
    // })
  }
}
</script>

<style>
.main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  background-color: #333;
  /* padding-left: 18.5vh; */
  height: 100%;
  min-height: 100vh;
}

.canvas-main {
  width: 33%;
  min-width: 400px;
  box-sizing: border-box;
  overflow: hidden;
  line-height: 0;
  align-self: center;
}

@media only screen and (max-width: 1170px) {
  .main {
    display: block;
    padding-left: 0;
  }

  .canvas-main {
    width: 100%;
    min-height: 500px;
    min-width: inherit;
  }
}
</style>
