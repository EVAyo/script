<!--
 * @Author: maggot-code
 * @Date: 2021-07-24 18:53:38
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-07-24 19:43:02
 * @Description: file content
-->
<template>
    <h3 class="a-soul-fan-search-empty" v-if="hasList">没有关注过VUP捏~</h3>

    <ul class="a-soul-fan-search-content" v-else>
        <template v-for="cell in list">
            <search-content-cell
                :key="cell.uid"
                :cell="cell"
                @cellClick="handlerCell"
            ></search-content-cell>
        </template>
    </ul>
</template>

<script>
import SearchContentCell from "./search-content-cell.vue";
export default {
    name: "a-soul-fan-search-content",
    mixins: [],
    components: {
        SearchContentCell,
    },
    props: {
        list: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        //这里存放数据
        return {
            initLoad: false,
        };
    },
    //监听属性 类似于data概念
    computed: {
        hasList() {
            return this.list.length <= 0;
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        handlerCell(cell) {
            this.$emit("cellClick", cell);
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
@import "./search-content.less";
</style>