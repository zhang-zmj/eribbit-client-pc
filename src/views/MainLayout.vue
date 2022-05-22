<template>
  <!-- 1、顶部通栏 -->
  <nav>顶部通栏</nav>
  <!-- 2、头部组件 -->
  <header>头部组件</header>
  <!-- 3、内容容器 -->
  <div class="main">
    <!-- 二级路由 -->
    <router-view></router-view>
  </div>
  <!-- 4、底部组件   -->
  <footer>底部组件</footer>
</template>

<script>
export default {
  name: 'MainLayout'
}
</script>

<style lang="less" scoped></style>
