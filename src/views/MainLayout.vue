<template>
  <!-- 1、顶部通栏 -->
  <AppNavbar />
  <!-- 2、头部组件 -->
  <AppHeader />

  <!-- 3、内容容器 -->
  <div class="app-body">
    <!-- 二级路由 -->
    <router-view></router-view>
  </div>
  <!-- 4、底部组件   -->
  <AppFooter />
</template>

<script>
import AppNavbar from '@/components/app-topnav'
import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'

export default {
  name: 'MainLayout',
  components: {
    AppNavbar,
    AppHeader,
    AppFooter
  }
}
</script>

<style lang="less" scoped>
.app-body {
  min-height: 600px;
}
</style>
