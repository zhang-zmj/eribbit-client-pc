<template>
  <!-- vue2.0需要分元素，Vue3.0可以是代码片段 Fragment -->
  <div class="container">
    App {{ $store.state.user.profile.acount }}
    <button @click="$store.commit('user/setUser', { acount: 'zhangmj' })">
      设置用户信息
    </button>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
