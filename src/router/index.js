import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['../pages/Login.vue'], resolve)
    },
    {
      path: '/Home',
      component: resolve => require(['../components/Home.vue'], resolve),
      children:[
        {
          path:'/Info',
          component: resolve =>require(['../pages/Infopage.vue'],resolve)
        },
        {
          path:'/Consumer',
          component: resolve =>require(['../pages/Consumerpage.vue'],resolve)
        },
        {
          path:'/Singer',
          component: resolve =>require(['../pages/Singerpage.vue'],resolve)
        },
        {
          path:'/SongList',
          component: resolve =>require(['../pages/SongListpage.vue'],resolve)
        },
        {
          path:'/Song',
          component: resolve =>require(['../pages/Songpage.vue'],resolve)
        },
      ]
    },

  ]
})
