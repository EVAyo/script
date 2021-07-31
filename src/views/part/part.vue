<!--
 * @Author: maggot-code
 * @Date: 2021-07-24 16:59:06
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-07-31 15:04:01
 * @Description: file content
-->
<template>
    <main class="a-soul-fan-part">
        <section class="part-body">
            <div class="body-search">
                <input
                    class="search-input"
                    type="text"
                    placeholder="输入用户名"
                    v-model="searchValue"
                    :disabled="loading"
                    @keydown.enter="handlerSearch"
                />
                <div
                    class="search-submit"
                    :class="submitDisable"
                    @click="handlerSearch"
                ></div>
            </div>

            <div
                class="body-content"
                v-loading="loading"
                element-loading-text="成分姬在努力分析捏~"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
            >
                <p>他 / 她 / 它关注的VUP有:</p>
                <search-content
                    v-show="searchLoad"
                    :list="searchList"
                    @cellClick="handlerCell"
                ></search-content>
            </div>

            <p class="body-support">Bilibili@成分姬Official</p>
        </section>

        <section class="part-footer">
            <!-- <p>TOOLS V1.0.0 BY GH-X-ST</p> -->
        </section>
    </main>
</template>

<script>
import { default as SearchContent } from "./components/search-content";
export default {
    name: "a-soul-fan-part",
    mixins: [],
    components: {
        SearchContent,
    },
    props: {},
    data() {
        //这里存放数据
        return {
            loading: false,
            searchLoad: false,
            searchValue: "",
            searchList: [],
        };
    },
    //监听属性 类似于data概念
    computed: {
        submitDisable() {
            return this.loading ? "search-submit-disable" : "";
        },
        hasContent() {
            return this.searchValue.length <= 0;
        },
    },
    //监控data中的数据变化
    watch: {
        searchValue() {
            if (this.searchLoad) this.searchLoad = false;
        },
    },
    //方法集合
    methods: {
        handlerSearch() {
            if (this.loading || this.hasContent) {
                this.$message({
                    message: "成分姬想知道你在找什么捏~",
                    type: "warning",
                });

                return false;
            }

            this.loading = true;

            this.searchList = [];

            this.$request({
                url: `http://ilovemiku.cn:7123/cfj/uid=${this.searchValue}`,
                methods: "GET",
            })
                .then(this.setSearchReady)
                .then(this.setSearchResponse)
                .catch(this.searchError);
        },
        handlerCell(cell) {
            const { mid } = cell;
            window.open(`https://space.bilibili.com/${mid}`);
        },
        setSearchReady(success) {
            setTimeout(() => {
                this.searchLoad = true;

                this.loading = false;
            }, 1000);

            return success;
        },
        setSearchResponse(response) {
            const { list } = response;

            this.searchList = list;
        },
        searchError(error) {
            console.log(error);
            this.$message.error("成分姬有点累了捏~");
            this.searchLoad = true;
            this.loading = false;
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
@import "./part.less";
</style>