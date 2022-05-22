import { createRouter, createWebHashHistory } from 'vue-router'

const MainLayout = () => import('@/views/MainLayout')
const Home = () => import('@/views/home')

// 路由规则
const routes = [
  // 一级路由布局容器
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '/', component: Home }
    ]
  }
]

// vue2.0 new VueRouter({}) 创建路由实例
// Vue3.0 createRouter({}) 创建路由实例
const router = createRouter({
  // 使用hash的路由模式
  history: createWebHashHistory(),
  routes
})

export default router
