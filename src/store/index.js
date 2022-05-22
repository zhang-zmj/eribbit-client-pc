import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import cart from './modules/car'
import category from './modules/category'
import user from './modules/user'

export default createStore({
  modules: {
    cart,
    user,
    category
  },
  // 配置插件
  plugins: [createPersistedState({
    // 本地存储的名字s
    key: 'erabbit-client-pc',
    paths: ['user', 'cart']
  })]
})
