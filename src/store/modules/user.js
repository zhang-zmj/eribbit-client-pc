// 用户模块
export default {
  namespaced: true,
  state () {
    return {
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        acount: '',
        mobile: '',
        token: ''
      }
    }
  },
  mutations: {
    // 修改用户信息
    setUser(state, payload) {
      state.profile = payload
    }
  }
}
