/*
 * @Author: maggot-code
 * @Date: 2021-07-24 16:44:50
 * @LastEditors: maggot-code
 * @LastEditTime: 2021-07-24 17:02:59
 * @Description: file content
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../layout/navPc.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'index',
    alias: "/tools",
    redirect: '/tools/index',
    // component: Home
    component: () =>
        import ( /*webpackChunkname: "Index" */ '../layout/navPc.vue'),
    children: [
        // 工具栏首页
        {
            path: '/tools/index',
            name: "Index",
            component: () =>
                import ( /*webpackChunkname: "tools/Index" */ '../views/Index.vue')
        },
        // 枝网查重
        {
            path: '/tools/checkArticle',
            name: "checkArticle",
            component: () =>
                import ( /*webpackChunkname: "tools/checkArticle" */ '../views/checkArticle/checkArticle.vue')
        },
        // 粉丝查询
        {
            path: '/tools/fanQuery',
            name: "fanQuery",
            component: () =>
                import ( /*webpackChunkname: "tools/fanQuery" */ '../views/fanQuery/fanQuery.vue')
        },
        // 成分姬
        {
            path: '/tools/part',
            name: "part",
            component: () =>
                import ( /*webpackChunkname: "tools/part" */ '../views/part/part.vue')
        },
        // 词云
        {
            path: '/tools/wordCloud',
            name: 'wordCloud',
            component: () =>
                import ( /*webpackChunkname: "tools/part" */ '../views/wordCloud/wordCloud.vue')
        },
        // 随机溜冰
        {
            path: '/tools/randomVideo',
            name: 'randomVideo',
            component: () =>
                import ( /*webpackChunkname: "tools/randomVideo" */ '../views/randomVideo/randomVideo.vue')
        },
        //表情包合集
        {
            path: '/tools/emoji',
            name: "emoji",
            component: () =>
                import ( /*webpackChunkname: "tools/emoji" */ '../views/emojis/emoji.vue')
        },
        // 时间线
        {
            path: '/tools/timeline',
            name: 'timeline',
            component: () =>
                import ( /*webpackChunkname: "tools/timeline" */ '../views/Timeline/Timeline')
        },
        //表情包合集
        {
            path: '/tools/emoji',
            name: "emoji",
            component: () =>
                import ( /*webpackChunkname: "tools/emoji" */ '../views/emojis/emoji.vue')
        },
        //直播歸檔
        {
            path: '/tools/streamArchives',
            name: 'streamArchives',
            component: () =>
                import ( /*webpackChunkname: "tools/streamArcives" */ '../views/streamArchives/streamArchives.vue')
        }


    ]
}]

const router = new VueRouter({
    routes
})

export default router