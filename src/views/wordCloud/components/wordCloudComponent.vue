<!--
 * @Author: maggot-code
 * @Date: 2021-07-31 03:50:04
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-07-31 04:36:49
 * @Description: file content
-->
<template>
    <div class="a-soul-fan-word-cloud" ref="mask"></div>
</template>

<script>
import { default as CreateWordcloud } from "./word-cloud";
export default {
    name: "a-soul-fan-word-cloud",
    mixins: [],
    components: {},
    props: {
        options: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        //这里存放数据
        return {};
    },
    //监听属性 类似于data概念
    computed: {
        wordCloudOptions() {
            return { refs: this.$refs.mask, ...this.options };
        },
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        setCanvas(canvas) {
            this.$refs.mask.appendChild(canvas);
        },
        createError(error) {
            console.log(error);
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.$nextTick(() => {
            CreateWordcloud({ ...this.wordCloudOptions })
                .then(this.setCanvas)
                .catch(this.createError);
        });
    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='css' scoped>
.a-soul-fan-word-cloud {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>