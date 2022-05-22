<center> <h2>一、项目配基础配置 </h2></center>

####  01、项目创建

```
1、vue create eribbit-client-pc  创建项目
2、配置相关需求
```

#### 02、配置Vuex

```
1、配置Vuex相关模块
2、安装 vuex-persistedstate 实现部分模块数据的持久化
```

#### 03、配置网络请求

```
1、安装axios：
		npm i axios
2、网络请求工具的安装：
```

<center> <h2>二、首页模块 </h2></center>



#### 01-首页-路由与组件

> **目的：** 搭建页面架子，便于接下来进行页面布局组件编写。

- 根组件下定义一级路由组件出口 `src/App.vue`

- 一级路由布局容器 `src/views/MainLayout.vue`

- 二级路由首页组件 `src/views/home/index.vue`

- 配置路由规则 `src/router/index.js`

**总结：** 配置首页的路由规则，由MainLayout和首页组件组成。



#### 02-首页-less的自动化导入

> **目的：** 准备常用less变量，混入代码，完成自动导入。

**1）准备要用的变量和混入代码**

- 变量 `src/assets/styles/variables.less`

- 混入 `src/assets/styles/mixins.less`

**2）完成自动注入公用变量和混入**

**遇到问题：** 每次使用公用的变量和mixin的时候需要单独引入到文件中。

![lesss手动引入](/Users/zmj/Desktop/eribbit-client-pc/images/lesss手动引入.png)

**解决方法：** 使用vuecli的style-resoures-loader插件来完成自动注入到每个less文件或者vue组件中style标签中。

- 在当前项目下执行一下命令`vue add style-resources-loader`，添加一个vuecli的插件

- 安装完毕后会在`vue.config.js`中自动添加一些配置

- 把你需要注入的文件配置一下后，重启服务即可。

**总结：** 知道如何定义less变量和混入代码并使用他们，通过vue-resources-loader完成代码注入再每个less文件和vue组件中。

## [#](http://zhoushugang.gitee.io/erabbit-client-pc-document/guide/03-home.html#_03-首页-样式重置与公用)03-首页-样式重置与公用

> **目的：** 准备网站所需的重置样式代码，以及一些公用样式代码。

- 重置样式

执行 `npm i normalize.css` 安装重置样式的包，然后在 `main.js` 导入 `normalize.css` 即可。

```diff
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

+import 'normalize.css'

createApp(App).use(store).use(router).mount('#app')
```

- 公用样式

新建文件 `src/assets/styles/common.less` 在该文件写入常用的样式，然后在 `main.js` 导入即可。

```
src/assets/styles/common.less
// 重置样式
* {
  box-sizing: border-box;
 }
 
 html {
   height: 100%;
   font-size: 14px;
 }
 body {
   height: 100%;
   color: #333;
   min-width: 1240px;
   font: 1em/1.4 'Microsoft Yahei', 'PingFang SC', 'Avenir', 'Segoe UI', 'Hiragino Sans GB', 'STHeiti', 'Microsoft Sans Serif', 'WenQuanYi Micro Hei', sans-serif
 }
 
 ul,
 h1,
 h3,
 h4,
 p,
 dl,
 dd {
   padding: 0;
   margin: 0;
 }
 
 a {
   text-decoration: none;
   color: #333;
   outline: none;
 }
 
 i {
   font-style: normal;
 }
 
 input[type="text"],
 input[type="search"],
 input[type="password"], 
 input[type="checkbox"]{
   padding: 0;
   outline: none;
   border: none;
   -webkit-appearance: none;
   &::placeholder{
     color: #ccc;
   }
 }
 
 img {
   max-width: 100%;
   max-height: 100%;
   vertical-align: middle;
 }
 
 ul {
   list-style: none;
 }
 
 #app {
   background: #f5f5f5;
   user-select: none;
 }
 
 .container {
   width: 1240px;
   margin: 0 auto;
   position: relative;
 }
 
 .ellipsis {
   white-space: nowrap;
   text-overflow: ellipsis;
   overflow: hidden;
 }
 
 .ellipsis-2 {
   word-break: break-all;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 2;
   overflow: hidden;
 }
 
 .fl {
   float: left;
 }
 
 .fr {
   float: right;
 }
 
 .clearfix:after {
   content: ".";
   display: block;
   visibility: hidden;
   height: 0;
   line-height: 0;
   clear: both;
 }
src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css'
+import '@/assets/styles/common.less'

createApp(App).use(store).use(router).mount('#app')
```

**总结：** 重置样式使用normalize.css，项目公用样式common.less

## [#](http://zhoushugang.gitee.io/erabbit-client-pc-document/guide/03-home.html#_04-首页-顶部通栏布局)04-首页-顶部通栏布局

> **目的：** 完成顶部通栏组件。

![1616335492457](data:image/png;base64,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)

大致步骤：

1）在 `public/index.html` 引入字体图标文件。

```diff
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
+    <link rel="stylesheet" href="//at.alicdn.com/t/font_2143783_iq6z4ey5vu.css">
    <title><%= htmlWebpackPlugin.options.title %></title>
```

2）在 `src/components/` 下新建 `app-topnav.vue` 组件，基础布局如下：

```vue
<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <li><a href="javascript:;"><i class="iconfont icon-user"></i>周杰伦</a></li>
        <li><a href="javascript:;">退出登录</a></li>
        <li><a href="javascript:;">请先登录</a></li>
        <li><a href="javascript:;">免费注册</a></li>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li><a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a></li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'AppTopnav'
}
</script>
<style scoped lang="less">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
```

3）在 `src/views/Layout.vue` 中导入使用。

```diff
<template>
+  <AppTopnav/>
  <header>头部</header>
  <main>
    <!-- 二级路由 -->
    <router-view></router-view>
  </main>
  <footer>底部</footer>
</template>

<script>
+import AppTopnav from '@/components/app-topnav'
export default {
  name: 'XtxLayout',
+  components: { AppTopnav }
}
</script>

<style scoped lang='less'></style>
```

4）根据当前的登录状态显示 用户名和退出登录

```vue
<script>
import { useStore } from 'vuex'
import { computed } from 'vue'    
export default {
  name: 'AppTopnav',
  setup () {
      const store = useStore()
      const profile = computed(()=>{
          return store.state.user.profile
      })
      return { profile }
  }
}
</script>
        <template v-if="profile.token">
          <li><a href="javascript:;"><i class="iconfont icon-user"></i>{{profile.account}}</a></li>
          <li><a href="javascript:;">退出登录</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;">请先登录</a></li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
```

**总结：** 完成基础布局，根据用户信息动态展示导航菜单。

## [#](http://zhoushugang.gitee.io/erabbit-client-pc-document/guide/03-home.html#_05-首页-头部布局)05-首页-头部布局

> **目的：** 完成首页头部布局，了解结构。

![1616335520936](http://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1616335520936.0e870693.png)

大致步骤：

- 1）在 `src/components/` 下新建 `app-header.vue` 组件，基础布局如下：

```vue
<template>
  <header class='app-header'>
    <div class="container">
      <h1 class="logo"><RouterLink to="/">小兔鲜</RouterLink></h1>
      <ul class="navs">
        <li class="home"><RouterLink to="/">首页</RouterLink></li>
        <li><a href="#">美食</a></li>
        <li><a href="#">餐厨</a></li>
        <li><a href="#">艺术</a></li>
        <li><a href="#">电器</a></li>
        <li><a href="#">居家</a></li>
        <li><a href="#">洗护</a></li>
        <li><a href="#">孕婴</a></li>
        <li><a href="#">服装</a></li>
        <li><a href="#">杂货</a></li>
      </ul>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜">
      </div>
      <div class="cart">
        <a class="curr" href="#">
          <i class="iconfont icon-cart"></i><em>2</em>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped lang='less'>
.app-header {
  background: #fff;
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url(../assets/images/logo.png) no-repeat center 18px / contain;
    }
  }
  .navs {
    width: 820px;
    display: flex;
    justify-content: space-around;
    padding-left: 40px;
    li {
      margin-right: 40px;
      width: 38px;
      text-align: center;
      a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;
      }
      &:hover {
        a {
          color: @xtxColor;
          border-bottom: 1px solid @xtxColor;
        }
      }
    }
  }
  .search {
    width: 170px;
    height: 32px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;
    .icon-search {
      font-size: 18px;
      margin-left: 5px;
    }
    input {
      width: 140px;
      padding-left: 5px;
      color: #666;
    }
  }
  .cart {
    width: 50px;
    .curr {
      height: 32px;
      line-height: 32px;
      text-align: center;
      position: relative;
      display: block;
      .icon-cart{
        font-size: 22px;
      }
      em {
        font-style: normal;
        position: absolute;
        right: 0;
        top: 0;
        padding: 1px 6px;
        line-height: 1;
        background: @helpColor;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
        font-family: Arial;
      }
    }
  }
}
</style>
```

- 2）在 `src/views/Layout.vue` 中导入使用。

```diff
<template>
  <AppTopnav/>
+  <AppHeader/>
  <main>
    <!-- 二级路由 -->
    <router-view></router-view>
  </main>
  <footer>底部</footer>
</template>

<script>
import AppTopnav from '@/components/app-topnav'
+import AppHeader from '@/components/app-header'
export default {
  name: 'XtxLayout',
+  components: { AppTopnav, AppHeader }
}
</script>

<style scoped lang='less'></style>
```

**总结：** 准备了一个静态的头部组件，了解其结构。

## [#](http://zhoushugang.gitee.io/erabbit-client-pc-document/guide/03-home.html#_06-首页-底部布局)06-首页-底部布局

> **目的：** 完成首页底部布局。

![1616335541641](http://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1616335541641.31a11f9f.png)

首先，在 `src/components/` 下新建 `app-footer.vue` 组件，基础布局如下：

```vue
<template>
  <footer class="app-footer">
    <!-- 联系我们 -->
    <div class="contact">
      <div class="container">
        <dl>
          <dt>客户服务</dt>
          <dd><i class="iconfont icon-kefu"></i> 在线客服</dd>
          <dd><i class="iconfont icon-question"></i> 问题反馈</dd>
        </dl>
        <dl>
          <dt>关注我们</dt>
          <dd><i class="iconfont icon-weixin"></i> 公众号</dd>
          <dd><i class="iconfont icon-weibo"></i> 微博</dd>
        </dl>
        <dl>
          <dt>下载APP</dt>
          <dd class="qrcode"><img src="../assets/images/qrcode.jpg" /></dd>
          <dd class="download">
            <span>扫描二维码</span>
            <span>立马下载APP</span>
            <a href="javascript:;">下载页面</a>
          </dd>
        </dl>
        <dl>
          <dt>服务热线</dt>
          <dd class="hotline">400-0000-000 <small>周一至周日 8:00-18:00</small></dd>
        </dl>
      </div>
    </div>
    <!-- 其它 -->
    <div class="extra">
      <div class="container">
        <div class="slogan">
          <a href="javascript:;">
            <i class="iconfont icon-footer01"></i>
            <span>价格亲民</span>
          </a>
          <a href="javascript:;">
            <i class="iconfont icon-footer02"></i>
            <span>物流快捷</span>
          </a>
          <a href="javascript:;">
            <i class="iconfont icon-footer03"></i>
            <span>品质新鲜</span>
          </a>
        </div>
        <!-- 版权信息 -->
        <div class="copyright">
          <p>
            <a href="javascript:;">关于我们</a>
            <a href="javascript:;">帮助中心</a>
            <a href="javascript:;">售后服务</a>
            <a href="javascript:;">配送与验收</a>
            <a href="javascript:;">商务合作</a>
            <a href="javascript:;">搜索推荐</a>
            <a href="javascript:;">友情链接</a>
          </p>
          <p>CopyRight © 小兔鲜儿</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped lang='less'>
.app-footer {
  overflow: hidden;
  background-color: #f5f5f5;
  padding-top: 20px;
  .contact {
    background: #fff;
    .container {
      padding: 60px 0 40px 25px;
      display: flex;
    }
    dl {
      height: 190px;
      text-align: center;
      padding: 0 72px;
      border-right: 1px solid #f2f2f2;
      color: #999;
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        border-right: none;
        padding-right: 0;
      }
    }
    dt {
      line-height: 1;
      font-size: 18px;
    }
    dd {
      margin: 36px 12px 0 0;
      float: left;
      width: 92px;
      height: 92px;
      padding-top: 10px;
      border: 1px solid #ededed;
      .iconfont {
        font-size: 36px;
        display: block;
        color: #666;
      }
      &:hover {
        .iconfont {
          color: @xtxColor;
        }
      }
      &:last-child {
        margin-right: 0;
      }
    }
    .qrcode {
      width: 92px;
      height: 92px;
      padding: 7px;
      border: 1px solid #ededed;
    }
    .download {
      padding-top: 5px;
      font-size: 14px;
      width: auto;
      height: auto;
      border: none;
      span {
        display: block;
      }
      a {
        display: block;
        line-height: 1;
        padding: 10px 25px;
        margin-top: 5px;
        color: #fff;
        border-radius: 2px;
        background-color: @xtxColor;
      }
    }
    .hotline {
      padding-top: 20px;
      font-size: 22px;
      color: #666;
      width: auto;
      height: auto;
      border: none;
      small {
        display: block;
        font-size: 15px;
        color: #999;
      }
    }
  }
  .extra {
    background-color: #333;
  }
  .slogan {
    height: 178px;
    line-height: 58px;
    padding: 60px 100px;
    border-bottom: 1px solid #434343;
    display: flex;
    justify-content: space-between;
    a {
      height: 58px;
      line-height: 58px;
      color: #fff;
      font-size: 28px;
      i {
        font-size: 50px;
        vertical-align: middle;
        margin-right: 10px;
        font-weight: 100;
      }
      span {
        vertical-align: middle;
        text-shadow: 0 0 1px #333;
      }
    }
  }
  .copyright {
    height: 170px;
    padding-top: 40px;
    text-align: center;
    color: #999;
    font-size: 15px;
    p {
      line-height: 1;
      margin-bottom: 20px;
    }
    a {
      color: #999;
      line-height: 1;
      padding: 0 10px;
      border-right: 1px solid #999;
      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>
```

最后，在 `src/views/Layout.vue` 中导入使用。

```diff
<template>
  <AppTopnav/>
  <AppHeader/>
  <main class="app-body">
    <!-- 二级路由 -->
    <router-view></router-view>
  </main>
+  <AppFooter/>
</template>

<script>
import AppTopnav from '@/components/app-topnav'
import AppHeader from '@/components/app-header'
+import AppFooter from '@/components/app-footer'
export default {
  name: 'XtxLayout',
+  components: { AppTopnav, AppHeader, AppFooter }
}
</script>

<style scoped lang='less'>
+.app-body {
+  min-height: 600px;
+}
</style>
```

## [#](http://zhoushugang.gitee.io/erabbit-client-pc-document/guide/03-home.html#_07-首页-头部分类导航组件)07-首页-头部分类导航组件

> **目的：** 提取头部分类导航组件，提供给头部，和将来的吸顶头部使用。

![1616335569363](http://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1616335569363.6f17f458.png)

第一步：提取头部导航为一个组件

- 新建`src/components/app-header-nav.vue` 组件。

```vue
<template>
  <ul class="app-header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <li><a href="#">美食</a></li>
    <li><a href="#">餐厨</a></li>
    <li><a href="#">艺术</a></li>
    <li><a href="#">电器</a></li>
    <li><a href="#">居家</a></li>
    <li><a href="#">洗护</a></li>
    <li><a href="#">孕婴</a></li>
    <li><a href="#">服装</a></li>
    <li><a href="#">杂货</a></li>
  </ul>
</template>

<script>
export default {
  name: 'AppHeaderNav'
}
</script>

<style scoped lang='less'>
.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
    }
  }
}
</style>
```

- 在 `app-header.vue` 中使用组件。注意，删除结构和样式。

```diff
<template>
  <header class='app-header'>
    <div class="container">
      <h1 class="logo"><RouterLink to="/">小兔鲜</RouterLink></h1>
+      <AppHeaderNav />
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜">
      </div>
      <div class="cart">
        <a class="curr" href="#">
          <i class="iconfont icon-cart"></i><em>2</em>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
+import AppHeaderNav from './app-header-nav'
export default {
  name: 'AppHeader',
+  components: { AppHeaderNav }
}
</script>
```

第二步：完善子级分类布局 `src/components/app-header-nav.vue`

```vue
<template>
  <ul class="app-header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <li>
      <a href="#">美食</a>
      <div class="layer">
        <ul>
          <li v-for="i in 10" :key="i">
            <a href="#">
              <img src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(4).png" alt="">
              <p>果干</p>
            </a>
          </li>
        </ul>
      </div>
    </li>
    <li><a href="#">餐厨</a></li>
    <li><a href="#">艺术</a></li>
    <li><a href="#">电器</a></li>
    <li><a href="#">居家</a></li>
    <li><a href="#">洗护</a></li>
    <li><a href="#">孕婴</a></li>
    <li><a href="#">服装</a></li>
    <li><a href="#">杂货</a></li>
  </ul>
</template>

<script>
export default {
  name: 'AppHeaderNav'
}
</script>

<style scoped lang='less'>
.app-header-nav {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative; 
  z-index: 998;  
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center; 
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {  
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
      > .layer {
        height: 132px;
        opacity: 1;
      }
    }
  }
}
.layer {
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all .2s .1s;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
```

## [#](http://zhoushugang.gitee.io/erabbit-client-pc-document/guide/03-home.html#_08-首页-头部分类导航渲染)08-首页-头部分类导航渲染

> **目的：** 实现头部一级分类和二级分类渲染。

**基本步骤：**

- 定义一个常量数据和后台保持一致（约定好9大分类），这样不请求后台就能展示一级分类，不至于白屏。
- 在API目录定义接口函数
- 在vuex中的category模块，基于常量数据定义state数据，定义修改分类列表函数，定义获取数据函数。
- 在Layout组件获取调用actions获取数据，在头部导航组件渲染即可。

**落地代码：**

- 定义九个分类常量数据 `src/api/constants.js`

```js
// 顶级分类
export const topCategory = [
  '居家',
  '美食',
  '服饰',
  '母婴',
  '个护',
  '严选',
  '数码',
  '运动',
  '杂货'
]
```

- 定义API函数 `src/api/category.js`

```js
// 定义首页需要的接口函数
import request from '@/utils/request'

/**
 * 获取首页头部分类数据
 */
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}
```

- vuex在category模块，来存储分类数据，提供修改和获取的函数。 `src/store/modules/category.js`

```js
// 存储的分类数据
import { topCategory } from '@/api/constants'
import { findAllCategory } from '@/api/category'

export default {
  namespaced: true,
  state: () => {
    return {
      // 如果默认是[]数组，看不见默认的9个分类，等你数据加载完毕才会看到。
      // 所以：根据常量数据来生成一个默认的顶级分类数据，不会出现空白（没数据的情况）
      list: topCategory.map(item => ({ name: item }))
    }
  },
  // 加载数据成功后需要修改list所以需要mutations函数
  mutations: {
    setList (state, headCategory) {
      state.list = headCategory
    }
  },
  // 需要向后台加载数据，所以需要actions函数获取数据
  actions: {
    async getList ({ commit }) {
      const { result } = await findAllCategory()
      // 获取数据成功，提交mutations进行数据修改
      commit('setCategory', result)
    }
  }
}
```

- 获取数据在 `src/views/Layout.vue` 初始化的时候

```diff
export default {
  name: 'Layout',
  components: {
    AppTopnav,
    AppHeader,
    AppFooter
  },
+  // 获取下分类数据
+  setup () {
+    const store = useStore()
+    store.dispatch('category/getList')
+  }
}
```

- 在头部导航组件渲染 `src/compotents/app-header-nav.vue`

```js
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'AppHeaderNav',
  setup () {
    const store = useStore()  
    const list = computed(()=>{
      return store.state.category.list
    })
    return { list }
  }  
}
  <ul class="app-header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <li v-for="item in list" :key="item.id">
      <RouterLink to="/">{{item.name}}</RouterLink>
      <div class="layer">
        <ul>
          <li v-for="sub in item.children" :key="sub.id">
            <RouterLink to="/">
              <img :src="sub.picture" alt="">
              <p>{{sub.name}}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </li>
  </ul>
```

**总结：** 数据在vuex中管理，然后再组件使用数据进行渲染。

## [#](http://zhoushugang.gitee.io/erabbit-client-pc-document/guide/03-home.html#_09-首页-头部分类导航交互)09-首页-头部分类导航交互

> 目的：实现点击的时候跳转，且能关闭二级分类弹窗。

描述：由于是单页面路由跳转不会刷新页面，css的hover一直触发无法关闭分类弹窗。

大致逻辑：

- 配置路由组件支持分类跳转
- 鼠标进入一级分类展示对应的二级分类弹窗
- 点击一级分类，二级分类，隐藏二级分类弹窗
- 离开一级分类，二级分类，隐藏二级分类弹窗

落地代码：

**1) 配置路由和组件实现跳转**

- 配置路由规则 `src/router/index.js`

```diff
+import TopCategory from '@/views/category'
+import SubCategory from '@/views/category/sub'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
+      { path: '/category/:id', component: TopCategory },
+      { path: '/category/sub/:id', component: SubCategory }
    ]
  }
]
```

- 创建分类组件 `src/views/category/index.vue`

```vue
<template>
  <div>Top-Category</div>
</template>
<script>
export default {
  name: 'TopCategory'
}
</script>
<style scoped lang="less"></style>
src/views/category/sub.vue
<template>
  <div>Sub-Category</div>
</template>
<script>
export default {
  name: 'SubCategory'
}
</script>
<style scoped lang="less"></style>
```

**2）跳转后关闭二级分类弹窗**

- 给每一个一级分类定义控制显示隐藏的数据，`open` 布尔类型，通过open设置类名控制显示隐藏。
- 当进入一级分类的时候，将open改为true
- 当离开一级分类的时候，将open改为false
- 点击一级分类，二级分类，将open改为false

在vuex种给一级分类加open数据 `src/store/modules/category.js`

```diff
    async getCategory ({ commit }) {
      const { result } = await findHeadCategory()
      // 给一级分类加上一个控制二级分类显示隐藏的数据open
+      result.forEach(item => {
+        item.open = false
+      })
      // 获取数据成功，提交mutations进行数据修改
      commit('setCategory', result)
    }
```

添加了 show hide vuex的mutations函数修改 open `src/store/modules/category.js`

```js
    // 修改当前一级分类下的open数据为true
    show (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = true
    },
    // 修改当前一级分类下的open数据为false
    hide (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = false
    }
```

再 头部导航组件 实现显示和隐藏 `src/components/app-header-nav.vue`

```diff
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: 'AppHeaderNav',
  setup () {
    const store = useStore()
    const list = computed(()=>{
      return store.state.category.list
    })
+    const show = (item) => {
+      store.commit('category/show', item)
+    }
+    const hide = (item) => {
+      store.commit('category/hide', item)
+    }
+    return { list, show, hide}
  }
}
+    <li v-for="item in list" :key="item.id" @mouseenter="show(item)" @mouseleave="hide(item)">
+      <RouterLink :to="`/category/${item.id}`" @click="hide(item)">{{item.name}}</RouterLink>
      <div class="layer" :class="{open:item.open}">
        <ul>
          <li v-for="sub in item.children" :key="sub.id">
+            <RouterLink :to="`/category/sub/${sub.id}`" @click="hide(item)">
              <img :src="sub.picture" alt="">
              <p>{{sub.name}}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </li>
-      // > .layer {
-      //   height: 132px;
-      //   opacity: 1;
-      // }
    }
  }
}
.layer {
+  &.open {
+    height: 132px;
+    opacity: 1;
+  }
```

**总结：** 再组件中调用vuex的mutation函数控制每个一级分类下二级分类的显示隐藏。

## [#](http://zhoushugang.gitee.io/erabbit-client-pc-document/guide/03-home.html#_10-首页-吸顶头部组件-传统实现)10-首页-吸顶头部组件-传统实现

> **目的：** 完成吸顶头部

大致步骤：

- 准备吸顶组件基础布局
- 页面滚动到78px以上，显示吸顶组件。

落地代码：

- 新建 `src/components/app-header-sticky.vue` 组件完成布局

```vue
<template>
  <div class="app-header-sticky">
    <div class="container">
      <RouterLink class="logo" to="/" />
      <AppHeaderNav />
      <div class="right">
        <RouterLink to="/" >品牌</RouterLink>
        <RouterLink to="/" >专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeaderNav from './app-header-nav'
export default {
  name: 'AppHeaderSticky',
  components: { AppHeaderNav }
}
</script>

<style scoped lang='less'>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url(../assets/images/logo.png) no-repeat  right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>
```

- 在滚动到78px完成显示效果，需要滑出动画。

第一步：默认移出顶部且完全透明，定义一个类回到默认吸顶位置完全显示。

```diff
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
+  transform: translateY(-100%);
+  opacity: 0;
+  &.show {
+    transition: all 0.3s linear;
+    transform: none;
+    opacity: 1;
+  }
```

第二步：组件渲染后，监听滚动距离超过78px隐藏

```diff
import AppHeaderNav from './app-header-nav'
+import { onMounted, ref } from 'vue'
export default {
  name: 'AppHeaderSticky',
  components: { AppHeaderNav },
+  setup () {
+    const y = ref(0)
+    onMounted(()=>{
+      window.onscroll = () => {
+        const scrollTop = document.documentElement.scrollTop
+        y.value = scrollTop
+      }
+    })
+    return { y }
+  }
}
+  <div class="app-header-sticky" :class="{show:y>=78}">
```

第三步：v-show使用，为了吸顶头部的内容不遮住不吸顶的头部。

```diff
+    <div class="container" v-show="y>=78">
```

## [#](http://zhoushugang.gitee.io/erabbit-client-pc-document/guide/03-home.html#_11-首页-吸顶头部组件-组合api)11-首页-吸顶头部组件-组合API

> **目的：** 体验基于组合API的@vueuse/core工具库

安装：@vueuse/core 包，它封装了常见的一些交互逻辑。

```bash
npm i @vueuse/core@4.9.0
```

使用：`src/components/app-header-sticky.vue` 组件

```vue
<template>
  <div class="app-header-sticky" :class="{show:y>=78}">
    <div class="container" v-show="y>=78">
      <RouterLink class="logo" to="/" />
      <AppHeaderNav />
      <div class="left">
        <RouterLink to="/" >品牌</RouterLink>
        <RouterLink to="/" >专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeaderNav from './app-header-nav'
import { useWindowScroll } from '@vueuse/core'
export default {
  name: 'AppHeaderSticky',
  components: { AppHeaderNav },
  setup () {
    const { y } = useWindowScroll()
    return { y }
  }
}
</script>
```

**总结：**

- useWindowScroll() 是@vueuse/core提供的api可返回当前页面滚动时候蜷曲的距离。x横向，y纵向
- vue3.0组合API提供了更多逻辑代码封装的能力。@vueuse/core 基于组合API封装好用的工具函数。

## [#](http://zhoushugang.gitee.io/erabbit-client-pc-document/guide/03-home.html#_12-首页主体-左侧分类-结构渲染)12-首页主体-左侧分类-结构渲染

> **目的：** 实现首页主体内容-左侧分类

大致步骤：

- 准备左侧分类组件和基础布局
- 从vuex中拿出9个分类数据，且值需要两个子分类，但是左侧是10个，需要补充一个品牌数据。
  - 使用计算属性完成上面逻辑
- 渲染组件

落地代码：

- 准备组件：`src/views/home/components/home-category.vue`

```vue
<template>
  <div class='home-category'>
    <ul class="menu">
      <li v-for="i in 10" :key="i">
        <RouterLink to="/">居家</RouterLink>
        <RouterLink to="/">洗漱</RouterLink>
        <RouterLink to="/">清洁</RouterLink>  
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomeCategory'
}
</script>

<style scoped lang='less'></style>
```

- 预览组件：`src/views/home/index.vue`

```vue
<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
      </div>
    </div>
  </div>
</template>
<script>
import HomeCategory from './components/home-category'
export default {
  name: 'PageHome',
  components: { HomeCategory }
}
</script>
<style scoped lang="less"></style>
```

- 从vuex中拿出分类，取出子分类中的前两项。给一级分类追加一项品牌，进行渲染。

```vue
<template>
  <div class='home-category'>
    <ul class="menu">
      <li v-for="item in menuList" :key="item.id">
        <RouterLink :to="`/category/${item.id}`">{{item.name}}</RouterLink>
        <template v-if="item.children">
          <RouterLink
            v-for="sub in item.children"
            :key="sub.id"
            :to="`/category/sub/${sub.id}`">
            {{sub.name}}
          </RouterLink>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, computed } from 'vue'   
export default {
  name: 'HomeCategory',
  // 1. 获取vuex的一级分类，并且只需要两个二级分类
  // 2. 需要在组件内部，定义一个品牌数据
  // 3. 根据vuex的分类数据和组件中定义品牌数据，得到左侧分类完整数据(9分类+1品牌)数组
  // 4. 进行渲染即可
  setup () {  
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [{ id: 'brand-chilren', name: '品牌推荐' }]
    })
    
    const store = useStore()
    const menuList = computed(() {
      const list = store.state.category.list.map(item => {
        return {
          id: item.id,
          name: item.name,
          // 防止初始化没有children的时候调用slice函数报错
          children: item.children && item.children.slice(0, 2)
        }
      })
      list.push(brand)
      return list
    })
    return { menuList }
  }
}
</script>

<style scoped lang='less'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0,0,0,0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
```

## [#](http://zhoushugang.gitee.io/erabbit-client-pc-document/guide/03-home.html#_13-首页主体-左侧分类-弹层展示)13-首页主体-左侧分类-弹层展示

> **目的：** 实现首页主体内容-左侧分类-鼠标进入弹出

大致步骤：

- 准备布局
- 得到数据
  - 鼠标经过记录ID
  - 通过ID得到分类推荐商品，使用计算属性
  - 完成渲染

落地代码：

1. 准备布局：`src/views/home/components/home-category.vue`

```html
    <!-- 弹层 -->
    <div class="layer">
      <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <ul>
        <li v-for="i in 9" :key="i">
          <RouterLink to="/">
            <img src="https://yanxuan-item.nosdn.127.net/5a115da8f2f6489d8c71925de69fe7b8.png" alt="">
            <div class="info">
              <p class="name ellipsis-2">【定金购】严选零食大礼包（12件）</p>
              <p class="desc ellipsis">超值组合装，满足馋嘴欲</p>
              <p class="price"><i>¥</i>100.00</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255,255,255,0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
              width: 95px;
              height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
		    width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
```

1. 渲染逻辑：`src/views/home/components/home-category.vue`

- 定义一个数据记录当前鼠标经过分类的ID，使用计算属性得到当前的分类推荐商品数据

```diff
    <ul class="menu">
+      <li v-for="item in menuList" :key="item.id" @mouseenter="categoryId=item.id">
import { useStore } from 'vuex'
import { reactive, computed, ref } from 'vue'
export default {
  name: 'HomeCategory',
  setup () {
  	// 组织所有数据逻辑
  	// 1. 获取vuex的一级分类，并且只需要两个二级分类
  	// 2. 需要在组件内部，定义一个品牌数据
  	// 3. 根据vuex的分类数据和组件中定义品牌数据，得到左侧分类完整数据(9分类+1品牌)数组
  	// 4. 进行渲染即可
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [{ id: 'brand-chilren', name: '品牌推荐' }]
    })
    const store = useStore()
    const menuList = computed(() {
      const list = store.state.category.list.map(item => {
        return {
          id: item.id,
          name: item.name,
          // 防止初始化没有children的时候调用slice函数报错
          children: item.children && item.children.slice(0, 2),
+          goods: item.goods
        }
      })
      list.push(brand)
      return list
    })
+    // 获取当前分类逻辑
+    const categoryId = ref(null)
+    const currCategory = computed(()=>{
+      return menuList.value.find(item => item.id === category.value)
+    })
+    return { menuList, categoryId, currCategory }
  }
}
```

- 渲染模版

```vue
    <!-- 弹层 -->
    <div class="layer">
      <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <ul v-if="currCategory && currCategory.goods && currCategory.goods.length">
        <li v-for="item in currCategory.goods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="">
            <div class="info">
              <p class="name ellipsis-2">{{item.name}}</p>
              <p class="desc ellipsis">{{item.desc}}</p>
              <p class="price"><i>¥</i>{{item.price}}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
```

## [#](http://zhoushugang.gitee.io/erabbit-client-pc-document/guide/03-home.html#_14-首页主体-左侧分类-处理品牌)14-首页主体-左侧分类-处理品牌

> **目的：** 品牌展示特殊，需要额外获取数据和额外的布局。

大致步骤：

- 定义API接口，在 `home-category.vue` 组件获取数据。
- 完成基础布局，根据数据进行渲染。
- 处理左侧分类激活显示。

落地代码：

1. 定义API接口，在 `home-category.vue` 组件获取数据。

```
src/api/home.js
export const findBrand = (limit) => {
  return request('/home/brand', 'get', {limit})
}
src/views/home/components/home-category.vue
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [{ id: 'brand-children', name: '品牌推荐' }],
+      brands: []
    })
+import { findBrand } from '@/api/home.js'
// ... 省略代码
setup () {
    // ... 省略代码
+    findBrand().then(data=>{
+        brand.brands = data.result
+    })
    return { menuList, categoryId, currCategory }
}
```

1. 进行渲染：`src/views/home/components/home-category.vue`

- 布局样式

```vue
<ul>
  <li class="brand" v-for="i in 6" :key="i">
    <RouterLink to="/">
      <img src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/brand_goods_1.jpg" alt="">
      <div class="info">
        <p class="place"><i class="iconfont icon-dingwei"></i>北京</p>
        <p class="name ellipsis">DW</p>
        <p class="desc ellipsis-2">DW品牌闪购</p>
      </div>
    </RouterLink>
  </li>
</ul>
      li.brand {
        height: 180px;
        a {
          align-items: flex-start;
          img {
            width: 120px;
            height: 160px;
          }
          .info {
            p {
              margin-top: 8px;
            }
            .place {
              color: #999;
            }
          }
        }
      }
```

- 进行渲染

```diff
    <!-- 弹层 -->
    <div class="layer">
+      <h4 v-if="currCategory">{{currCategory.id==='brand'?'品牌':'分类'}}推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <ul v-if="currCategory && currCategory.goods && currCategory.goods.length">
        <li v-for="item in currCategory.goods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="">
            <div class="info">
              <p class="name ellipsis-2">{{item.name}}</p>
              <p class="desc ellipsis">{{item.desc}}</p>
              <p class="price"><i>¥</i>{{item.price}}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
+      <ul v-if="currCategory && currCategory.brands && currCategory.brands.length">
+        <li class="brand" v-for="item in currCategory.brands" :key="item.id">
+          <RouterLink to="/">
+            <img :src="item.picture" alt="">
+            <div class="info">
+              <p class="place"><i class="iconfont icon-dingwei"></i>{{item.place}}</p>
+              <p class="name ellipsis">{{item.name}}</p>
+              <p class="desc ellipsis-2">{{item.desc}}</p>
+            </div>
+          </RouterLink>
+        </li>
+      </ul>
    </div>
```

1. 处理左侧分类激活显示 `src/views/home/components/home-category.vue`

- 激活类active

```diff
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
+      &:hover,&.active {
        background: @xtxColor;
      }
```

- 绑定类

```diff
   <ul class="menu">
+      <li :class="{active:categoryId===item.id}"
```

- 移除类

```diff
+  <div class='home-category' @mouseleave="categoryId=null">
    <ul class="menu">
```

**总结：** 品牌数据需要请求后台，再汇总到所有数据中，然后渲染，然后激活当前的分类。

## [#](http://zhoushugang.gitee.io/erabbit-client-pc-document/guide/03-home.html#_15-首页主体-左侧分类-骨架效果)15-首页主体-左侧分类-骨架效果

> **目的：** 为了在加载的过程中等待效果更好，封装一个骨架屏组件。

大致步骤：

- 需要一个组件，做占位使用。这个占位组件有个专业术语：骨架屏组件。
  - 暴露一些属性：高，宽，背景，是否有闪动画。
- 这是一个公用组件，需要全局注册，将来这样的组件建议再vue插件中定义。
- 使用组件完成左侧分类骨架效果。

落的代码：

1. 封装组件：`src/components/library/xtx-skeleton.vue`

```vue
<template>
  <div class="xtx-skeleton" :style="{width,height}" :class="{shan:animated}">
    <!-- 1 盒子-->
    <div class="block" :style="{backgroundColor:bg}"></div>
    <!-- 2 闪效果 xtx-skeleton 伪元素 --->
  </div>
</template>
<script>
export default {
  name: 'XtxSkeleton',
  // 使用的时候需要动态设置 高度，宽度，背景颜色，是否闪下
  props: {
    bg: {
      type: String,
      default: '#efefef'
    },
    width: {
      type: String,
      default: '100px'
    },
    height: {
      type: String,
      default: '100px'
    },
    animated: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped lang="less">
.xtx-skeleton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  .block {
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
}
.shan {
  &::after {
    content: "";
    position: absolute;
    animation: shan 1.5s ease 0s infinite;
    top: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-45deg);
  }
}
@keyframes shan {
  0% {
    left: -100%;
  }
  100% {
    left: 120%;
  }
}
</style>
```

1. 封装插件：插件定义 `src/componets/library/index.js` 使用插件 `src/main.js`

```js
// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器。
// 这就是插件
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展

import XtxSkeleton from './xtx-skeleton.vue'

export default {
  install (app) {
    // 在app上进行扩展，app提供 component directive 函数
    // 如果要挂载原型 app.config.globalProperties 方式
    app.component(XtxSkeleton.name, XtxSkeleton)
  }
}
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './mock'
+import ui from './components/library'

import 'normalize.css'
import '@/assets/styles/common.less'
+// 插件的使用，在main.js使用app.use(插件)
+createApp(App).use(store).use(router).use(ui).mount('#app')
```

1. 最后使用组件完成左侧分类骨架效果： `src/views/home/components/home-category.vue`

```diff
    <ul class="menu">
      <li :class="{active:categoryId===item.id}" v-for="item in menuList" :key="item.id" @mouseenter="categoryId=item.id">
        <RouterLink to="/">{{item.name}}</RouterLink>
        <template v-if="item.children">
          <RouterLink to="/" v-for="sub in item.children" :key="sub.id">{{sub.name}}</RouterLink>
        </template>
+        <span v-else>
+          <XtxSkeleton width="60px" height="18px" style="margin-right:5px" bg="rgba(255,255,255,0.2)" />
+          <XtxSkeleton width="50px" height="18px" bg="rgba(255,255,255,0.2)" />
+        </span>
      </li>
    </ul>
.xtx-skeleton {
  animation: fade 1s linear infinite alternate;
}
@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
```

## [#](http://zhoushugang.gitee.io/erabbit-client-pc-document/guide/03-home.html#_16-首页主体-轮播图-基础布局)16-首页主体-轮播图-基础布局

> **目的：** 封装小兔鲜轮播图组件，第一步：基础结构的使用。

**大致步骤：**

- 准备xtx-carousel组件基础布局，全局注册
- 准备home-banner组件，使用xtx-carousel组件，再首页注册使用。
- 深度作用xtx-carousel组件的默认样式

**落的代码：**

- 轮播图基础结构 `src/components/library/xtx-carousel.vue`

```vue
<template>
  <div class='xtx-carousel'>
    <ul class="carousel-body">
      <li class="carousel-item fade">
        <RouterLink to="/">
          <img src="http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-15/1ba86bcc-ae71-42a3-bc3e-37b662f7f07e.jpg" alt="">
        </RouterLink>
      </li>
    </ul>
    <a href="javascript:;" class="carousel-btn prev"><i class="iconfont icon-angle-left"></i></a>
    <a href="javascript:;" class="carousel-btn next"><i class="iconfont icon-angle-right"></i></a>
    <div class="carousel-indicator">
      <span v-for="i in 5" :key="i"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XtxCarousel'
}
</script>
<style scoped lang="less">
.xtx-carousel{
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel{
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0,0,0,0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background:  #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0,0,0,.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev{
        left: 20px;
      }
      &.next{
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
```

- 全局注册轮播图 `src/components/library/index.js`

```diff
import XtxSkeleton from './xtx-skeleton.vue'
+import XtxCarousel from './xtx-carousel.vue'

export default {
  install (app) {
    app.component(XtxSkeleton.name, XtxSkeleton)
+    app.component(XtxCarousel.name, XtxCarousel)
  }
}
```

- 首页广告组件基础结构 `src/views/home/components/home-banner.vue`

```vue
<template>
  <div class="home-banner">
    <XtxCarousel />
  </div>
</template>
<script>
export default {
  name: 'HomeBanner'
}
</script>
<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98
}
</style>
```

- 首页使用广告组件

```diff
<template>
+  <!-- 首页入口 -->
+  <div class="home-entry">
+    <div class="container">
      <!-- 左侧分类 -->
      <HomeCategory />
      <!-- 轮播图 -->
      <HomeBanner />
    </div>
  </div>
</template>
<script>
import HomeCategory from './components/home-category'
+import HomeBanner from './components/home-banner'
export default {
  name: 'HomePage',
  components: {
+    HomeCategory,
    HomeBanner
  }
}
</script>
<style scoped lang="less"></style>
```

- 覆盖轮播图组件样式 `src/views/home/components/home-banner.vue`

```less
.xtx-carousel {
  ::v-deep .carousel-btn.prev {
    left: 270px;
  }
  ::v-deep .carousel-indicator {
    padding-left: 250px;
  }
}
```

**总结：** 需要注意要覆盖样式，首页轮播图特殊些。

## [#](http://zhoushugang.gitee.io/erabbit-client-pc-document/guide/03-home.html#_17-首页主体-轮播图-渲染结构)17-首页主体-轮播图-渲染结构

> **目的：** 封装小兔鲜轮播图组件，第二步：动态渲染结构。

**大致步骤：**

- 定义获取广告图API函数
- 在home-banner组件获取轮播图数据，传递给xtx-carousel组件
- 在xtx-carousel组件完成渲染

**落的代码：**

- API函数 `src/api/home.js`

```js
/**
 * 获取广告图
 * @returns Promise
 */
export const findBanner = () => {
  return request('/home/banner', 'get')
}
```

- 广告组件获取数据，传给轮播图 `src/views/home/components/home-banner.vue`

```diff
<template>
  <div class="home-banner">
+    <XtxCarousel :sliders="sliders" />
  </div>
</template>
<script>
import { ref } from 'vue'
import { findBanner } from '@/api/home'
export default {
  name: 'HomeBanner',
+  setup () {
+    const sliders = ref([])
+    findBanner().then(data => {
+      sliders.value = data.result
+    })
+    return { sliders }
+  }
}
</script>
```

- 完成轮播图结构渲染 `src/components/library/xtx-carousel.vue`

```diff
<template>
  <div class='xtx-carousel'>
    <ul class="carousel-body">
+      <li class="carousel-item" v-for="(item,i) in sliders" :key="i" :class="{fade:index===i}">
        <RouterLink to="/">
+          <img :src="item.imgUrl" alt="">
        </RouterLink>
      </li>
    </ul>
    <a href="javascript:;" class="carousel-btn prev"><i class="iconfont icon-angle-left"></i></a>
    <a href="javascript:;" class="carousel-btn next"><i class="iconfont icon-angle-right"></i></a>
    <div class="carousel-indicator">
+      <span v-for="(item,i) in sliders" :key="i" :class="{active:index===i}"></span>
    </div>
  </div>
</template>

<script>
+import { ref } from 'vue'
export default {
  name: 'XtxCarousel',
+  props: {
+    sliders: {
+      type: Array,
+      default: () => []
+    }
+  },
+  setup () {
+    // 默认显示的图片的索引
+    const index = ref(0)
+    return { index }
+  }
}
</script>
```

**总结：** fade是控制显示那张图片的，需要一个默认索引数据，渲染第一张图和激活第一个点。

## [#](http://zhoushugang.gitee.io/erabbit-client-pc-document/guide/03-home.html#_18-首页主体-轮播图-逻辑封装)18-首页主体-轮播图-逻辑封装

> **目的：** 封装小兔鲜轮播图组件，第三步：逻辑功能实现。

**大致步骤：**

- 自动播放，暴露自动轮播属性，设置了就自动轮播
- 如果有自动播放，鼠标进入离开，暂停，开启
- 指示器切换，上一张，下一张
- 销毁组件，清理定时器

**落地代码：** `src/components/library/xtx-carousel.vue`

- 自动轮播实现

```diff
+import { ref, watch } from 'vue'
export default {
  name: 'XtxCarousel',
  props: {
    sliders: {
      type: Array,
      default: () => []
    },
+    duration: {
+      type: Number,
+      default: 3000
+    },
+    autoPlay: {
+      type: Boolean,
+      default: false
+    }
  },
  setup (props) {
    // 默认显示的图片的索引
    const index = ref(0)
+    // 自动播放
+    let timer = null
+    const autoPlayFn = () => {
+      clearInterval(timer)
+      timer = setInterval(() => {
+        index.value++
+        if (index.value >= props.sliders.length) {
+          index.value = 0
+        }
+      }, props.duration)
+    }
+    watch(() => props.sliders, (newVal) => {
+      // 有数据&开启自动播放，才调用自动播放函数
+      if (newVal.length && props.autoPlay) {
+        index.value = 0
+        autoPlayFn()
+      }
+    }, { immediate: true })
+
    return { index }
  }
}
```

- 如果有自动播放，鼠标进入离开，暂停，开启

```js
    // 鼠标进入停止，移出开启自动，前提条件：autoPlay为true
    const stop = () => {
      if (timer) clearInterval(timer)
    }
    const start = () => {
      if (props.sliders.length && props.autoPlay) {
        autoPlayFn()
      }
    }

    return { index, stop, start }
+  <div class='xtx-carousel' @mouseenter="stop()" @mouseleave="start()">
```

使用需要加 auto-play `<XtxCarousel auto-play :sliders="sliders" />`

- 指示器切换，上一张，下一张

```js
    // 上一张下一张
    const toggle = (step) => {
      const newIndex = index.value + step
      if (newIndex >= props.sliders.length) {
        index.value = 0
        return
      }
      if (newIndex < 0) {
        index.value = props.sliders.length - 1
        return
      }
      index.value = newIndex
    }

    return { index, stop, start, toggle }
```

- 销毁组件，清理定时器

```js
    // 组件消耗，清理定时器
    onUnmounted(() => {
      clearInterval(timer)
    })
```

**总结：** 按照思路步骤，一步步实现即可。

## [#](http://zhoushugang.gitee.io/erabbit-client-pc-document/guide/03-home.html#_19-首页主体-面板封装)19-首页主体-面板封装

> **目的：** 提取首页的公用面板进行复用

大致思路：

- 头部
  - 标题和副标题由props传入
  - 右侧内容由插槽传入
    - 查看更多使用次数多封装成全局组件
- 主体
  - 全部由插槽传入

![1606296832501](data:image/png;base64,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)

实现步骤：

- 查看更多全局组件实现

`src/components/library/xtx-more.vue` 定义

```vue
<template>
  <RouterLink :to="path" class="xtx-more">
    <span>查看全部</span>
    <i class="iconfont icon-angle-right"></i>
  </RouterLink>
</template>

<script>
export default {
  name: 'XtxMore',
  props: {
    path: {
      type: String,
      default: '/'
    }
  }
}
</script>

<style scoped lang='less'>
.xtx-more {
  margin-bottom: 2px;
  span {
    font-size: 16px;
    vertical-align: middle;
    margin-right: 4px;
    color: #999;
  }
  i {
    font-size: 14px;
    vertical-align: middle;
    position: relative;
    top: 2px;
    color: #ccc;
  }
  &:hover {
    span,i {
      color: @xtxColor;
    }
  }
}
</style>
```

`src/components/library/index.js` 注册

```diff
import XtxSkeleton from './xtx-skeleton.vue'
import XtxCarousel from './xtx-carousel.vue'
+import XtxMore from './xtx-more.vue'

export default {
  install (app) {
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
+    app.component(XtxMore.name, XtxMore)
  }
}
```

- 定义首页需要的面板组件

```vue
<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
        <h3>{{ title }}<small>{{ subTitle }}</small></h3>
        <slot name="right" />
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePanel',
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang='less'>
.home-panel {
  background-color: #fff;
  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;
    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;
      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>
```

## [#](http://zhoushugang.gitee.io/erabbit-client-pc-document/guide/03-home.html#_20-首页主体-新鲜好物)20-首页主体-新鲜好物

> **目的：** 使用面板组件完成新鲜好物模块。

大致步骤：

- 封装API调用接口
- 进行组件基础布局
- 调用接口渲染组件

落地代码：

```
src/api/home.js
export const findNew = () => {
  return request('home/new', 'get')
}
<template>
  <div class="home-new">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right><XtxMore path="/" /></template>
      <!-- 面板内容 -->
      <ul class="goods-list">
        <li v-for="item in goods" :key="item.id">
          <RouterLink :to="`/product/${item.id}`">
            <img :src="item.picture" alt="">
            <p class="name ellipsis">{{item.name}}</p>
            <p class="price">&yen;{{item.price}}</p>
          </RouterLink>
        </li>
      </ul>
    </HomePanel>
  </div>
</template>
<script>
import { ref } from 'vue'
import HomePanel from './home-panel'
import { findNew } from '@/api/home'
export default {
  name: 'HomeNew',
  components: { HomePanel },
  setup () {
    const goods = ref([])
    findNew().then(data => {
      goods.value = data.result
    })
    return { goods }
  }
}
</script>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
src/views/home/index.vue
    <!-- 新鲜好物 -->
+    <HomeNew />
  </div>
</template>

<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
+import HomeNew from './components/home-new'
export default {
  name: 'xtx-home-page',
+  components: { HomeCategory, HomeBanner, HomeNew }
}
</script>
```

**总结：** vue3.0中 只支持v-slot指令，所以需要配合template来使用。

## [#](http://zhoushugang.gitee.io/erabbit-client-pc-document/guide/03-home.html#_21-首页主体-人气推荐)21-首页主体-人气推荐

> 目的： 完成人气推荐模块

大致步骤：

- 定义API函数
- 定义组件且完成渲染
- 在首页组件中导入使用

落地代码：

```
src/api/home.js
export const findHot = () => {
  return request('home/hot', 'get')
}
src/views/home/components/home-hot.vue
<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <ul ref="pannel" class="goods-list">
      <li v-for="item in goods" :key="item.id">
        <RouterLink to="/">
          <img :src="item.picture" alt="">
          <p class="name">{{item.title}}</p>
          <p class="desc">{{item.alt}}</p>
        </RouterLink>
      </li>
    </ul>
  </HomePanel>
</template>

<script>
import { ref } from 'vue'
import HomePanel from './home-panel'
import { findHot } from '@/api/home'
export default {
  name: 'HomeNew',
  components: { HomePanel },
  setup () {
    const goods = ref([])
    findHot().then(data => {
      goods.value = data.result
    })
    return { goods }
  }
}
</script>

<style scoped lang='less'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
src/views/home/index.vue
    <!-- 新鲜好物 -->
    <HomeNew />
    <!-- 人气推荐 -->
+    <HomeHot />
  </div>
</template>

<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
import HomeNew from './components/home-new'
+import HomeHot from './components/home-hot'
export default {
  name: 'xtx-home-page',
+  components: { HomeCategory, HomeBanner, HomeNew, HomeHot }
}
</script>
```

## [#](http://zhoushugang.gitee.io/erabbit-client-pc-document/guide/03-home.html#_22-首页主体-补充-vue动画)22-首页主体-补充-vue动画

> **目标：** 知道vue中如何使用动画，知道Transition组件使用。

当vue中，显示隐藏，创建移除，一个元素或者一个组件的时候，可以通过transition实现动画。

![1616576876892](http://zhoushugang.gitee.io/erabbit-client-pc-document/assets/img/1616576876892.c417f529.png)

如果元素或组件离开，完成一个淡出效果：

```vue
<transition name="fade">
  <p v-if="show">100</p>
</transition>
.fade-leave {
    opacity: 1
}
.fade-leave-active {
    transition: all 1s;
}
.fade-leave-to {
    opcaity: 0
}
```

- 进入（显示，创建）
  - v-enter 进入前 （vue3.0 v-enter-from）
  - v-enter-active 进入中
  - v-enter-to 进入后
- 离开（隐藏，移除）
  - v-leave 进入前 （vue3.0 v-leave-from）
  - v-leave-active 进入中
  - v-leave-to 进入后

多个transition使用不同动画，可以添加nam属性，name属性的值替换v即可。

## [#](http://zhoushugang.gitee.io/erabbit-client-pc-document/guide/03-home.html#_23-首页主体-面板骨架效果)23-首页主体-面板骨架效果

> **目的：** 加上面板的骨架加载效果

定义一个骨架布局组件：

```
src/views/home/components/home-skeleton.vue
<template>
  <div class='home-skeleton'>
    <div class="item" v-for="i in 4" :key="i" :style="{backgroundColor:bg}">
      <XtxSkeleton bg="#e4e4e4" width="306px" height="306px" animated />
      <XtxSkeleton bg="#e4e4e4" width="160px" height="24px" animated />
      <XtxSkeleton bg="#e4e4e4" width="120px" height="24px" animated />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeSkeleton',
  props: {
    bg: {
      type: String,
      default: '#fff'
    }
  }
}
</script>

<style scoped lang='less'>
.home-skeleton {
  width: 1240px;
  height: 406px;
  display: flex;
  justify-content: space-between;
  .item {
    width: 306px;
    .xtx-skeleton ~ .xtx-skeleton{
      display: block;
      margin: 16px auto 0;
    }
  }
}
</style>
```

在 `home-hot` `home-new` 组件分别使用

```diff
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
+    <div style="position: relative;height: 426px;">
+      <Transition name="fade">
+        <ul v-if="goods.length" ref="pannel" class="goods-list">
          <li v-for="item in goods" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="">
              <p class="name">{{item.title}}</p>
              <p class="desc">{{item.alt}}</p>
            </RouterLink>
          </li>
        </ul>
+         <HomeSkeleton v-else />
+      </Transition>
+    </div>
  </HomePanel>
<template>
  <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <template v-slot:right><XtxMore /></template>
+    <div style="position: relative;height: 406px;">
+      <Transition name="fade">
+        <ul v-if="goods.length" ref="pannel" class="goods-list">
          <li v-for="item in goods" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="">
              <p class="name">{{item.name}}</p>
              <p class="price">&yen;{{item.price}}</p>
            </RouterLink>
          </li>
        </ul>
+        <HomeSkeleton bg="#f0f9f4" v-else />
+      </Transition>
+    </div>
  </HomePanel>
</template>
```

在 `src/assets/styles/common.less` 定义动画

```less
.fade{
  &-leave {
    &-active {
      position: absolute;
      width: 100%;
      transition: opacity .5s .2s;
      z-index: 1;
    }
    &-to {
      opacity: 0;
    }
  }
}
```

注意：

- 动画的父容器需要是定位，防止定位跑偏。

## [#](http://zhoushugang.gitee.io/erabbit-client-pc-document/guide/03-home.html#_24-首页主体-组件数据懒加载)24-首页主体-组件数据懒加载

> **目的：** 实现当组件进入可视区域在加载数据。

我们可以使用 `@vueuse/core` 中的 `useIntersectionObserver` 来实现监听进入可视区域行为，但是必须配合vue3.0的组合API的方式才能实现。

**大致步骤：**

- 理解 `useIntersectionObserver` 的使用，各个参数的含义
- 改造 home-new 组件成为数据懒加载，掌握 `useIntersectionObserver` 函数的用法
- 封装 `useLazyData` 函数，作为数据懒加载公用函数
- 把 `home-new` 和 `home-hot` 改造成懒加载方式

**落的代码：**

1. 先分析下这个`useIntersectionObserver` 函数：

```js
// stop 是停止观察是否进入或移出可视区域的行为    
const { stop } = useIntersectionObserver(
  // target 是观察的目标dom容器，必须是dom容器，而且是vue3.0方式绑定的dom对象
  target,
  // isIntersecting 是否进入可视区域，true是进入 false是移出
  // observerElement 被观察的dom
  ([{ isIntersecting }], observerElement) => {
    // 在此处可根据isIntersecting来判断，然后做业务
  },
)
```

1. 开始改造 `home-new` 组件：`rc/views/home/components/home-new.vue`

- 进入可视区后获取数据

```html
<div ref="box" style="position: relative;height: 406px;">
// 省略。。。
<script>
import HomePanel from './home-panel'
import HomeSkeleton from './home-skeleton'
import { findNew } from '@/api/home'
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
export default {
  name: 'HomeNew',
  components: { HomePanel, HomeSkeleton },
  setup () {
    const goods = ref([])
    const box = ref(null)
    const { stop } = useIntersectionObserver(
      box,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          stop()
          findNew().then(data => {
            goods.value = data.result
          })
        }
      }
    )
    return { goods, box }
  }
}
</script>
```

1. 由于首页面板数据加载都需要实现懒数据加载，所以封装一个钩子函数，得到数据。

```
src/hooks/index.js
// hooks 封装逻辑，提供响应式数据。
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
// 数据懒加载函数
export const useLazyData = (apiFn) => {
  // 需要
  // 1. 被观察的对象
  // 2. 不同的API函数
  const target = ref(null)
  const result = ref([])
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        stop()
        // 调用API获取数据
        apiFn().then(data => {
          result.value = data.result
        })
      }
    }
  )
  // 返回--->数据（dom,后台数据）
  return { target, result }
}
```

1. 再次改造 `home-new` 组件：`rc/views/home/components/home-new.vue`

```diff
import { findNew } from '@/api/home'
+import { useLazyData } from '@/hooks'
export default {
  name: 'HomeNew',
  components: { HomePanel, HomeSkeleton },
  setup () {
+    const { target, result } = useLazyData(findNew)
+    return { goods: result, target }
  }
}
+ <div ref="target" style="position: relative;height: 426px;">
```

1. 然后改造 `home-hot` 组件：`src/views/home/components/home-hot.vue`

```diff
+  <div ref="target" style="position: relative;height: 426px;">
import { findHot } from '@/api/home'
import HomePanel from './home-panel'
import HomeSkeleton from './home-skeleton'
+import { useLazyData } from '@/hooks'
export default {
  name: 'HomeHot',
  components: { HomePanel, HomeSkeleton },
  setup () {
+    const { target, result } = useLazyData(findHot)
+    return { target, list: result }
  }
}
```

## [#](http://zhoushugang.gitee.io/erabbit-client-pc-document/guide/03-home.html#_25-首页主体-热门品牌)25-首页主体-热门品牌

> **目的：** 实现品牌的展示，和切换品牌效果。

**基本步骤：**

- 准备基础布局组件
- 获取数据实现渲染，完成切换效果
- 加上骨架效果和数据懒加载

**落的代码：**

1. 基础结构：`src/views/home/components/home-brand.vue`

```vue
<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <a href="javascript:;" class="iconfont icon-angle-left prev"></a>
      <a href="javascript:;" class="iconfont icon-angle-right next"></a>
    </template>
    <div class="box" ref="box">
      <ul class="list" >
        <li v-for="i in 10" :key="i">
          <RouterLink to="/">
            <img src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/brand_goods_1.jpg" alt="">
          </RouterLink>
        </li>
      </ul>
    </div>
  </HomePanel>
</template>

<script>
import HomePanel from './home-panel'
export default {
  name: 'HomeBrand',
  components: { HomePanel }
}
</script>

<style scoped lang='less'>
.home-panel {
  background:#f5f5f5
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>
```

- 使用组件：`src/views/home/index.vue`

```diff
    <!-- 人气推荐 -->
    <HomeHot />
    <!-- 热门品牌 -->
+    <HomeBrand />
+import HomeBrand from './components/home-brand'
export default {
  name: 'xtx-home-page',
+  components: { HomeCategory, HomeBanner, HomeNew, HomeHot, HomeBrand }
}
```

1. 获取数据和切换效果：

- 由于最后会使用到数据懒加载，那么我们也会使用组合API实现。
- 业务上，只有两页数据切换，0--->1 或者 1--->0 的方式。

```js
<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <a @click="toggle(-1)" :class="{disabled:index===0}" href="javascript:;" class="iconfont icon-angle-left prev"></a>
      <a @click="toggle(1)" :class="{disabled:index===1}" href="javascript:;" class="iconfont icon-angle-right next"></a>
    </template>
    <div class="box">
        <ul v-if="brands.length" class="list" :style="{transform:`translateX(${-index*1240}px)`}">
          <li v-for="item in brands" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="">
            </RouterLink>
          </li>
        </ul>
    </div>
  </HomePanel>
</template>

<script>
import { ref } from 'vue'
import HomePanel from './home-panel'
import { findBrand } from '@/api/home'
import { useLazyData } from '@/hooks'
export default {
  name: 'HomeBrand',
  components: { HomePanel },
  setup () {
    // 获取数据
     const brands = ref([])
     findBrand(10).then(data => {
       brands.value = data.result
     })

    // 切换效果，前提只有 0 1 两页
    const index = ref(0)
    // 1. 点击上一页
    // 2. 点击下一页
    const toggle = (step) => {
      const newIndex = index.value + step
      if (newIndex < 0 || newIndex > 1) return
      index.value = newIndex
    }
    return { brands, toggle, index }
  }
}
</script>
```

1. 加上数据懒加载和骨架效果

```diff
<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <a @click="toggle(-1)" :class="{disabled:index===0}" href="javascript:;" class="iconfont icon-angle-left prev"></a>
      <a @click="toggle(1)" :class="{disabled:index===1}" href="javascript:;" class="iconfont icon-angle-right next"></a>
    </template>
+    <div ref="target" class="box">
+      <Transition name="fade">
+        <ul v-if="brands.length" class="list" :style="{transform:`translateX(${-index*1240}px)`}">
          <li v-for="item in brands" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="">
            </RouterLink>
          </li>
        </ul>
+        <div v-else class="skeleton">
+          <XtxSkeleton class="item" v-for="i in 5" :key="i" animated bg="#e4e4e4" width="240px" height="305px"/>
+        </div>
+      </Transition>
    </div>
  </HomePanel>
</template>

<script>
import { ref } from 'vue'
import HomePanel from './home-panel'
import { findBrand } from '@/api/home'
+import { useLazyData } from '@/hooks'
export default {
  name: 'HomeBrand',
  components: { HomePanel },
  setup () {
    // 获取数据
    // const brands = ref([])
    // findBrand(10).then(data => {
    //   brands.value = data.result
    // })
+    // 注意：useLazyData需要的是API函数，如果遇到要传参的情况，自己写函数再函数中调用API
+    const { target, result } = useLazyData(() => findBrand(10))

    // 切换效果，前提只有 0 1 两页
    const index = ref(0)
    // 1. 点击上一页
    // 2. 点击下一页
    const toggle = (step) => {
      const newIndex = index.value + step
      if (newIndex < 0 || newIndex > 1) return
      index.value = newIndex
    }
+    return { brands: result, toggle, index, target }
  }
}
</script>
  .skeleton {
    width: 100%;
    display: flex;
    .item {
      margin-right: 10px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
```

**总结：** 注意下useLazyData传参的情况。

## [#](http://zhoushugang.gitee.io/erabbit-client-pc-document/guide/03-home.html#_26-首页主体-商品区块)26-首页主体-商品区块

> **目的：** 完成商品区域展示。

**大致步骤：**

- 准备一个商品盒子组件 `home-goods` 展示单个商品
- 定义产品区块组件 `home-product` 使用 `home-goods` 完成基础布局
- 在首页中使用 `home-product` 组件
- 定义API函数，获取数据，进行渲染
- 处理板块需要进入可视区太多内容才能加载数据问题。

**落地代码：**

1. 单个商品组件：`src/views/home/components/home-goods.vue`

```vue
<template>
  <div class="goods-item">
    <RouterLink to="/" class="image">
      <img src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/fresh_goods_1.jpg" alt="" />
    </RouterLink>
    <p class="name ellipsis-2">美威 智利原味三文鱼排 240g/袋 4片装</p>
    <p class="desc">海鲜年货</p>
    <p class="price">&yen;108.00</p>
    <div class="extra">
      <RouterLink to="/">
        <span>找相似</span>
        <span>发现现多宝贝 &gt;</span>
      </RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeGoods'
}
</script>

<style scoped lang='less'>
.goods-item {
  width: 240px;
  height: 300px;
  padding: 10px 30px;
  position: relative;
  overflow: hidden;
  border: 1px solid transparent;
  transition: all .5s;
  .image {
    display: block;
    width: 160px;
    height: 160px;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  p {
    margin-top: 6px;
    font-size: 16px;
    &.name {
      height: 44px;
    }
    &.desc {
      color: #666;
      height: 22px;
    }
    &.price {
      margin-top: 10px;
      font-size: 20px;
      color: @priceColor;
    }
  }
  .extra {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 86px;
    width: 100%;
    background: @xtxColor;
    text-align: center;
    transform: translate3d(0,100%,0);
    transition: all .5s;
    span {
      display: block;
      color: #fff;
      width: 120px;
      margin: 0 auto;
      line-height: 30px;
      &:first-child {
        font-size: 18px;
        border-bottom:1px solid #fff;
        line-height: 40px;
        margin-top: 5px;
      }
    }
  }
  &:hover {
    border-color: @xtxColor;
    .extra {
      transform: none;
    }
  }
}
</style>
```

1. 产品区块组件：`src/views/home/components/home-product.vue`

```vue
<template>
  <div class="home-product">
    <HomePanel title="生鲜" v-for="i in 4" :key="i">
      <template v-slot:right>
        <div class="sub">
          <RouterLink to="/">海鲜</RouterLink>
          <RouterLink to="/">水果</RouterLink>
          <RouterLink to="/">蔬菜</RouterLink>
          <RouterLink to="/">水产</RouterLink>
          <RouterLink to="/">禽肉</RouterLink>
        </div>
        <XtxMore />
      </template>
      <div class="box">
        <RouterLink class="cover" to="/">
          <img src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/fresh_goods_cover.jpg" alt="">
          <strong class="label">
            <span>生鲜馆</span>
            <span>全场3件7折</span>
          </strong>
        </RouterLink>
        <ul class="goods-list">
          <li v-for="i in 8" :key="i">
            <HomeGoods />
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from './home-panel'
import HomeGoods from './home-goods'
export default {
  name: 'HomeProduct',
  components: { HomePanel, HomeGoods }
}
</script>

<style scoped lang='less'>
.home-product {
  background: #fff;
  height: 2900px;
  .sub {
    margin-bottom: 2px;
    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;
      &:hover {
        background: @xtxColor;
        color: #fff;
      }
      &:last-child {
        margin-right: 80px;
      }
    }
  }
  .box {
    display: flex;
    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0,-50%,0);
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0,0,0,.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0,0,0,.7);
          }
        }
      }
    }
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-last-child(-n+4) {
          margin-bottom: 0;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
```

1. 使用组件：`src/views/home/index.vue`

```diff
    <!-- 人气推荐 -->
    <HomeHot />
    <!-- 热门品牌 -->
    <HomeBrand />
    <!-- 商品区域 -->
+    <HomeProduct />
+import HomeProduct from './components/home-product'
export default {
  name: 'xtx-home-page',
+  components: { HomeCategory, HomeBanner, HomeNew, HomeHot, HomeBrand, HomeProduct }
}
```

1. 获取数据渲染：

- 定义API `src/api/home.js`

```js
export const findGoods = () => {
  return request('home/goods', 'get')
}
```

- 进行渲染

```
src/views/home/components/home-product.vue
<template>
  <div class="home-product" ref="target">
+    <HomePanel :title="cate.name" v-for="cate in list" :key="cate.id">
      <template v-slot:right>
        <div class="sub">
+          <RouterLink v-for="sub in cate.children" :key="sub.id" to="/">{{sub.name}}</RouterLink>
        </div>
        <XtxMore />
      </template>
      <div class="box">
        <RouterLink class="cover" to="/">
+          <img :src="cate.picture" alt="">
          <strong class="label">
+            <span>{{cate.name}}馆</span>
+            <span>{{cate.saleInfo}}</span>
          </strong>
        </RouterLink>
        <ul class="goods-list">
+          <li v-for="item in cate.goods" :key="item.id">
+            <HomeGoods :goods="item" />
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from './home-panel'
import HomeGoods from './home-goods'
+import { findGoods } from '@/api/home'
+import { useLazyData } from '@/hooks'
export default {
  name: 'HomeProduct',
  components: { HomePanel, HomeGoods },
+  setup () {
+    const { target, result } = useLazyData(findGoods)
+    return { target, list: result }
+  }
}
</script>
src/views/home/components/home-goods.vue
<template>
  <div class="goods-item">
    <RouterLink to="/" class="image">
+      <img :src="goods.picture" alt="" />
    </RouterLink>
+    <p class="name ellipsis-2">{{goods.name}}</p>
+    <p class="desc">{{goods.tag}}</p>
+    <p class="price">&yen;{{goods.price}}</p>
    <div class="extra">
      <RouterLink to="/">
        <span>找相似</span>
        <span>发现现多宝贝 &gt;</span>
      </RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeGoods',
+  props: {
+    goods: {
+      type: Object,
+      default: () => {}
+    }
+  }
}
</script>
```

1. 处理问题：

- 产品区域需要滚动比较多才能去加载数据。

```diff
  const { stop } = useIntersectionObserver(
    container,
    ([{ isIntersecting }], dom) => {
      if (isIntersecting) {
        stop()
        apiFn && apiFn().then(({ result }) => {
          data.value = result
        })
      }
+    }, {
+      threshold: 0
+    }
  )  
```

- threshold 容器和可视区交叉的占比（进入的面积/容器完整面试） 取值，0-1 之间，默认比0大，所以需要滚动较多才能触发进入可视区域事件。

## [#](http://zhoushugang.gitee.io/erabbit-client-pc-document/guide/03-home.html#_27-首页主体-最新专题)27-首页主体-最新专题

> **目的：** 完成最新专题展示。

基础布局：`src/views/home/components/home-special.vue`

```vue
<template>
  <HomePanel title="最新专题">
    <template v-slot:right><XtxMore /></template>
    <div class="special-list" ref="homeSpecial">
      <div class="special-item" v-for="i in 3" :key="i">
        <RouterLink to="/">
          <img src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/topic_goods_1.jpg" alt />
          <div class="meta">
            <p class="title">
              <span class="top ellipsis">看到撒娇的撒娇的凯撒就</span>
              <span class="sub ellipsis">倒萨倒萨倒萨</span>
            </p>
            <span class="price">&yen;19.99起</span>
          </div>
        </RouterLink>
        <div class="foot">
          <span class="like"><i class="iconfont icon-hart1"></i>100</span>
          <span class="view"><i class="iconfont icon-see"></i>100</span>
          <span class="reply"><i class="iconfont icon-message"></i>100</span>
        </div>
      </div>
    </div>
  </HomePanel>
</template>

<script>
import HomePanel from './home-panel'
export default {
  name: 'HomeSpecial',
  components: { HomePanel }
}
</script>

<style scoped lang='less'>
.home-panel {
  background: #f5f5f5;
}
.special-list {
  height: 380px;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  .special-item {
    width: 404px;
    background: #fff;
    .hoverShadow();
    a {
      display: block;
      width: 100%;
      height: 288px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .meta {
        background-image: linear-gradient(to top,rgba(0, 0, 0, 0.8),transparent 50%);
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 288px;
        .title {
          position: absolute;
          bottom: 0px;
          left: 0;
          padding-left: 16px;
          width: 70%;
          height: 70px;
          .top {
            color: #fff;
            font-size: 22px;
            display: block;
          }
          .sub {
            display: block;
            font-size: 19px;
            color: #999;
          }
        }
        .price {
          position: absolute;
          bottom: 25px;
          right: 16px;
          line-height: 1;
          padding: 4px 8px 4px 7px;
          color: @priceColor;
          font-size: 17px;
          background-color: #fff;
          border-radius: 2px;
        }
      }
    }
    .foot {
      height: 72px;
      line-height: 72px;
      padding: 0 20px;
      font-size: 16px;

      i {
        display: inline-block;
        width: 15px;
        height: 14px;
        margin-right: 5px;
        color: #999;
      }
      .like,
      .view {
        float: left;
        margin-right: 25px;
        vertical-align: middle;
      }
      .reply {
        float: right;
        vertical-align: middle;
      }
    }
  }
}
</style>
```

使用组件：`src/views/home/index.vue`

```diff
    <!-- 商品区域 -->
    <HomeProduct />
    <!-- 最新专题 -->
+    <HomeSpecial />
+import HomeSpecial from './components/home-special'
export default {
  name: 'xtx-home-page',
+  components: { HomeCategory, HomeBanner, HomeNew, HomeHot, HomeBrand, HomeProduct, HomeSpecial }
}
```

获取数据：

- 定义API `src/api/home.js`

```js
export const findSpecial = () => {
  return request('home/special', 'get')
}
```

- 渲染组件 `src/views/home/components/home-speical.vue`

```diff
<template>
  <HomePanel title="最新专题">
    <template v-slot:right><XtxMore /></template>
    <div class="special-list" ref="homeSpecial">
+      <div class="special-item" v-for="item in list" :key="item.id">
        <RouterLink to="/">
+          <img :src="item.cover" alt />
          <div class="meta">
+            <p class="title">{{item.title}}<small>{{item.summary}}</small></p>
+            <span class="price">&yen;{{item.lowestPrice}}起</span>
          </div>
        </RouterLink>
        <div class="foot">
+          <span class="like"><i class="iconfont icon-hart1"></i>{{item.collectNum}}</span>
+          <span class="view"><i class="iconfont icon-see"></i>{{item.viewNum}}</span>
+          <span class="reply"><i class="iconfont icon-message"></i>{{item.replyNum}}</span>
        </div>
      </div>
    </div>
  </HomePanel>
</template>

<script>
import HomePanel from './home-panel'
+import { findSpecial } from '@/api/home'
+import { useLazyData } from '@/hooks'
export default {
  name: 'HomeSpecial',
  components: { HomePanel },
+  setup () {
+    const { container, data } = useLazyData(findSpecial)
+    return { homeSpecial: container, list: data }
+  }
}
</script>
```

## [#](http://zhoushugang.gitee.io/erabbit-client-pc-document/guide/03-home.html#_28-首页主体-图片懒加载)28-首页主体-图片懒加载

> **目的：** 当图片进入可视区域内去加载图片，且处理加载失败，封装成指令。

介绍一个webAPI：[IntersectionObserver(opens new window)](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver)

```js
// 创建观察对象实例
const observer = new IntersectionObserver(callback[, options])
// callback 被观察dom进入可视区离开可视区都会触发
// - 两个回调参数 entries , observer
// - entries 被观察的元素信息对象的数组 [{元素信息},{}]，信息中isIntersecting判断进入或离开
// - observer 就是观察实例
// options 配置参数
// - 三个配置属性 root rootMargin threshold
// - root 基于的滚动容器，默认是document
// - rootMargin 容器有没有外边距
// - threshold 交叉的比例

// 实例提供两个方法
// observe(dom) 观察哪个dom
// unobserve(dom) 停止观察那个dom
```

基于vue3.0和IntersectionObserver封装懒加载指令

```
src/components/library/index.js
export default {
  install (app) {
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name, XtxMore)
+    defineDirective(app)
  }
}
import defaultImg from '@/assets/images/200.png'
// 指令
const defineDirective = (app) => {
  // 图片懒加载指令
  app.directive('lazyload', {
    mounted (el, binding) {
      const observer = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          observer.unobserve(el)
          el.onerror = () => {
              el.src = defaultImg
          }  
          el.src = binding.value
        }
      }, {
        threshold: 0.01
      })
      observer.observe(el)
    }
  })
}
```

使用指令：

```
src/views/home/component/home-product.vue
        <RouterLink class="cover" to="/">
+          <img alt="" v-lazyload="cate.picture">
          <strong class="label">
            <span>{{cate.name}}馆</span>
            <span>{{cate.saleInfo}}</span>
          </strong>
        </RouterLink>
src/views/home/component/home-goods.vue
    <RouterLink to="/" class="image">
+      <img alt="" v-lazyload="goods.picture" />
    </RouterLink>
`src/views/home/component/home-product.vue
        <RouterLink class="cover" to="/">
+          <img v-lazyload="item.picture" alt="">
          <strong class="label">
            <span>{{item.name}}馆</span>
            <span>{{item.saleInfo}}</span>
          </strong>
        </RouterLink>
```

**总结：**

- 在img上使用使用v-lazyload值为图片地址，不设置src属性。
