<!--
 * @Author: maggot-code
 * @Date: 2021-07-24 19:00:42
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-07-24 19:35:16
 * @Description: file content
-->
<template>
    <li class="a-soul-fan-search-content-cell" @click="cellClick">
        <h3>{{ name }}</h3>
        <p>主页：{{ address }}</p>
    </li>
</template>

<script>
export default {
    name: "a-soul-fan-search-content-cell",
    mixins: [],
    components: {},
    props: {
        cell: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {
        name() {
            const { name } = this.cell;
            return name;
        },
        address() {
            const { address } = this.cell;
            return address || "无法获取！";
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        cellClick() {
            this.$emit("cellClick", this.cell);
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
@import "./search-content-cell.less";
</style>