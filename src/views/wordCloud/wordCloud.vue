<!--
 * @Author: maggot-code
 * @Date: 2021-07-28 22:26:22
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-07-31 04:37:01
 * @Description: file content
-->
<template>
    <div class="main">
<!--        <template v-for="item in list">
            <div class="canvas-main" :id="item.id" :keys="item.id">
                <word-cloud :options="item"> </word-cloud>
            </div>
        </template>-->
      <div style="display: flex;justify-content: center;width: 100%;height: 100%;align-items: center">
        <p style="color: white;font-size: 70px;">敬请期待</p>
      </div>
    </div>
</template>

<script>
import WordCloud from "./components/wordCloudComponent.vue";

import TestData from "./assets/test-data.json";

import XWimg from "../../assets/img/wordCloud/xw-mask1_03.png";
import BLimg from "../../assets/img/wordCloud/bl-mask1_03.png";
import JLimg from "../../assets/img/wordCloud/jl-mask1_03.png";
import JRimg from "../../assets/img/wordCloud/jr-mask1_03.png";
import NLimg from "../../assets/img/wordCloud/nl-mask1_03.png";

const setList = (base) => {
    const data = [];
    for (const key in base) {
        data.push([key, Math.sqrt(base[key])]);
    }
    return data;
};

export default {
    components: { WordCloud },
    data() {
        return {
            /*list: Object.freeze([
                {
                    id: "XW",
                    src: XWimg,
                    data: setList(TestData),
                    fontColor: "#9AC8E2",
                },
                {
                    id: "BL",
                    src: BLimg,
                    data: setList(TestData),
                    fontColor: "#DB7D74",
                },
                {
                    id: "JL",
                    src: JLimg,
                    data: setList(TestData),
                    fontColor: "#B8A6D9",
                },
                {
                    id: "JR",
                    src: JRimg,
                    data: setList(TestData),
                    fontColor: "#E799B0",
                },
                {
                    id: "NL",
                    src: NLimg,
                    data: setList(TestData),
                    fontColor: "#576690",
                },
            ]),*/
        };
    },
    methods: {},
    mounted() {},
};
</script>

<style>
.main {
    display: flex;
    flex-wrap:wrap;
    justify-content: space-between;
    background-color: #333;
    padding-left: 18.5vh;
    widows: 100%;
    height: 100%;
    overflow: hidden;
}
.canvas-main {
    align-self: center;
    flex: 1;
    height: 60%;
    margin: 0 10px;
    box-sizing: border-box;
    overflow: hidden;
    min-width: 200px;
}
</style>
