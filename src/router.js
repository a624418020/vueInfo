import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router);

export default new Router({
    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    },
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: path('market'),
      name: 'home',
      component: Home,
        meta: {
            title: '寻医问道',
        },
    },
      {
          path: path('home'),
          name: 'home',
          component: Home,
          meta: {
              title: '寻医问道',
          },
      },
    {
      path:path('about'),
      name: 'about',
      component: () => import('./views/About.vue'),
        meta: {
            title: '寻医问道',
        },
    },
      {
          path:path('entry'),
          name: 'entry',
          component: () => import('./views/Entry.vue'),
          meta: {
              title: '慢病开方',
              keepAlive:true
          },
      },
      {
          path:path('pay'),
          name: 'pay',
          component: () => import('./views/Pay.vue'),
          meta: {
              title: '慢病开方',
          },
      },
      {
          path:path('bill'),
          name: 'bill',
          component: () => import('./views/Bill.vue'),
          meta: {
              title: '电子处方单',
          },
      },
      {
          path:path('Notification'),
          name: 'Notification',
          component: () => import('./views/Notification.vue'),
          meta: {
              title: '协议书',
          },
      },
      {
          path: '**',
          name: 'home',
          component: Home,
          meta: {
              title: '寻医问道',
          },
      },
  ]
})

// 拼装
export function path(url) {//拼接上二级域名
    return '/market/' + url;
}
