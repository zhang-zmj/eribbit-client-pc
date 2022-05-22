<template>
  <!-- vue2.0需要分元素，Vue3.0可以是代码片段 Fragment -->
  <div class="container">
    App
    <button @click="fn">测试request工具函数</button>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'App',
  setup() {
    const fn = () => {
      console.log('获取的是多少？？-------------')
      // 测试网络请求
      request('/member/profile', 'post', { a: 10 })
    }
    return {
      fn
    }
  }
}
</script>
