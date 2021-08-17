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
        import( /*webpackChunkname: "Index" */ '../layout/navPc.vue'),
    children: [
        // 工具栏首页
        {
            path: '/tools/index',
            name: "Index",
            meta: {
                pageIndex: 1
            },
            component: () =>
                import( /*webpackChunkname: "tools/Index" */ '../views/Index.vue')
        },
        // 枝网查重
        {
            path: '/tools/checkArticle',
            name: "checkArticle",
            meta: {
                pageIndex: 2
            },
            component: () =>
                import( /*webpackChunkname: "tools/checkArticle" */ '../views/checkArticle/checkArticle.vue')
        },
        // 成分姬
        {
            path: '/tools/part',
            name: "part",
            meta: {
                pageIndex: 3
            },
            component: () =>
                import( /*webpackChunkname: "tools/part" */ '../views/part/part.vue')
        },
        // 词云
        {
            path: '/tools/wordCloud',
            name: 'wordCloud',
            meta: {
                pageIndex: 4
            },
            component: () =>
                import( /*webpackChunkname: "tools/part" */ '../views/wordCloud/wordCloud.vue')
        },
        // 时间线
        {
            path: '/tools/timeline',
            name: 'timeline',
            meta: {
                pageIndex: 5
            },
            component: () =>
                import( /*webpackChunkname: "tools/timeline" */ '../views/Timeline/Timeline')
        },
        // 粉丝查询
        {
            path: '/tools/fanQuery',
            name: "fanQuery",
            meta: {
                pageIndex: 6
            },
            component: () =>
                import( /*webpackChunkname: "tools/fanQuery" */ '../views/fanQuery/fanQuery.vue')
        },
        //表情包合集
        {
            path: '/tools/emoji',
            name: "emoji",
            meta: {
                pageIndex: 7
            },
            component: () =>
                import( /*webpackChunkname: "tools/emoji" */ '../views/emojis/emoji.vue')
        },
        //直播歸檔
        {
            path: '/tools/streamArchives',
            name: 'streamArchives',
            meta: {
                pageIndex: 8
            },
            component: () =>
                import( /*webpackChunkname: "tools/streamArcives" */ '../views/streamArchives/streamArchives.vue')
        },

        // 随机溜冰
        {
            path: '/tools/randomVideo',
            name: 'randomVideo',
            meta: {
                pageIndex: 9
            },
            component: () =>
                import( /*webpackChunkname: "tools/randomVideo" */ '../views/randomVideo/randomVideo.vue')
        },




    ]
}]

const router = new VueRouter({
    routes
})

export default router