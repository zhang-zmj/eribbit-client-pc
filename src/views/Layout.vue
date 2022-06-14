<template>
  <!-- 1、顶部通栏 -->
  <AppTopnav />
  <!-- 2、头部组件 -->
  <AppHeader />

  <!-- 吸顶头部 -->
  <AppHeaderSticky />

  <!-- 3、内容容器 -->
  <div class="app-body">
    <!-- 二级路由 -->
    <router-view></router-view>
  </div>
  <!-- 4、底部组件   -->
  <AppFooter />
</template>

<script>
import AppTopnav from '@/components/app-topnav'
import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'
import AppHeaderSticky from '@/components/app-header-sticky'
import { useStore } from 'vuex'

export default {
  name: 'xtx-layout',
  components: {
    AppTopnav,
    AppHeader,
    AppFooter,
    AppHeaderSticky
  },
  // 获取下分类数据
  setup() {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>

<style lang="less" scoped>
.app-body {
  min-height: 600px;
}
</style>
