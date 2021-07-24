<!--
 * @Author: maggot-code
 * @Date: 2021-07-24 16:44:50
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-07-24 17:03:43
 * @Description: file content
-->
<template>
    <div class="contain">
        <div class="index-nav">
            <!-- 粉丝数实时查询 -->
            <router-link to="/">
                <div class="nav-item-noclick first"></div>
            </router-link>
            <router-link to="/tools/fanQuery">
                <div class="nav-item-noclick">粉丝数实时查询</div>
            </router-link>

            <div class="nav-item-noclick">知网查重</div>
            <router-link to="/tools/part">
                <div class="nav-item-noclick">成分姬</div>
            </router-link>
            <div class="nav-item-noclick">词云</div>
            <div class="nav-item-noclick">大事件时间线</div>
            <div class="nav-item-noclick">随机溜冰</div>
            <div class="nav-item-noclick">表情包合集</div>
        </div>

        <router-view />
    </div>
</template>

<script>
export default {
    name: "Nav",
};
</script>

<style scoped lang="less">
.contain {
    display: flex;
    .index-nav {
        //   background-color: grey;
        width: 20vw;
        height: 56.26vw;
        background-image: url("../assets/img/nav.png");
        background-size: cover;
        color: #fff;
        .first {
            height: 6vw !important;
        }
        .nav-item-noclick {
            height: 8.83vw;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding-right: 1.62vw;
        }
        :hover {
            animation-name: example;
            animation-duration: 2s;
        }
    }
}

@keyframes example {
    100% {
        background-color: chocolate;
    }
}
</style>