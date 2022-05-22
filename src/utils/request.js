// 1、创建一个新的axios实例
// 2、请求拦截器，如果有token进行头部携带
// 3、响应拦截器： 1、剥离无效数据 2、处理token失效
// 4、导出一个函数，调用当前的axios实例发送请求，返回值promise

import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 导出基准地址，原因：其他地方不是通过axios发送请求的地方用上基准地址
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
  // axios的一些配置，baseURL， timeout
  baseURL,
  timeout: 5000
})

// 请求头 拦截业务逻辑
instance.interceptors.request.use(config => {
  // 1、获取用户信息对象
  const { profile } = store.state.user
  // 2、判断是否有token
  if (profile.token) {
    // 3、设置token
    config.headers.Authorization = `Bearer ${profile.token}`
  }

  return config
}, err => {
  return Promise.reject(err)
})

// 响应体 拦截业务逻辑
instance.interceptors.response.use(res => res.data, err => {
  // 401 状态码，筋肉该函数
  if (err.response && err.response.status === 401) {
    // 1、清空无效用户信息
    store.commit('user/setUser', {})
    // 2、当前路由地址
    // 在组件里头：$route.path === /user $route.fullPath === `/user?a=10`
    // js模块中：router.currentRoute.fullPath 就是当前路由地址，是ref响应式数据
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    // 2、跳转到登录页面 及当前路由地址的获取
    router.push('/login?redirectUrrl=' + fullPath)
  }
  return Promise.reject(err)
})

// 请求工具函数
const request = (url, method, submitData) => {
  return instance({
    url,
    method,
    // 1、如果是get请求，需要使用Params传递submitData   ?a=10&c=10
    // 2、如果不是get请求，需要哦使用data传递submitData  请求体传参
    // [] 设置一个动态的Key const a = {name:100} a.name  a[10>9?'name':'age']
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

export default request
