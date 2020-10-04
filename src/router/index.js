import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    // 首页
    path: '/',
    name: 'Discover',
    component: () => import("@/views/Discover"),
  },
  {
    // 首页
    path: '/discover',
    component: () => import("@/views/Discover"),
    children: [
      {
        // 歌单详情
        path: ':id',
        component: () => import("@/views/SongsDetail")
      },
    ]
  },
  {
    // 个人中心
    path: '/profile',
    name: 'Profile',
    component: () => import("@/views/Profile")
  },
  {
    // 排行榜
    path: '/rank',
    component: () => import("@/views/Rank"),
    children: [
      {
        // 歌单详情
        path: ':id',
        component: () => import("@/views/SongsDetail")
      },
    ]
  },
  {
    // 搜索
    path: '/search',
    component: () => import("@/views/Search")
  },

  //  歌单列表
  {
    path: '/songs',
    component: () => import("@/views/Songs"),
    children: [
      {
        // 歌单详情
        path: ':id',
        component: () => import("@/views/SongsDetail")
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 解决点击同一路由报错
VueRouter.prototype.replace = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalReplace.call(this, location).catch(err => err)
}




export default router
