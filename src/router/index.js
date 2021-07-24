import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../layout/navPc.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    alias:"/tools",
    redirect: '/tools/index',
    // component: Home
    component: ()=>
      import (/*webpackChunkname: "Index" */ '../layout/navPc.vue')
    ,
    children:[
      // 工具栏首页
      {
        path:'/tools/index',
        name:"Index",
        component: ()=>
              import (/*webpackChunkname: "tools/Index" */ '../views/Index.vue')
      },
      // 粉丝查询
      {
        path:'/tools/fanQuery',
        name:"fanQuery",
        component: ()=>
        import (/*webpackChunkname: "tools/fanQuery" */ '../views/fanQuery/fanQuery.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
