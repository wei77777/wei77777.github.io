---
title: Vue+ElementUI 搭建后台管理系统
tags:
  - Vue
  - ElementUI
categories: 项目搭建
abbrlink: a4a3e1b2
date: 2021-11-25 09:38:45
---

本文档记录了该系统从零配置的完整过程

项目源码请访问：https://gitee.com/szxio/vue2Admin，如果感觉对你有帮助，请点一个小星星，O(∩_∩)O

## 新建项目

```shell
vue create vueadmin
```

## 安装 less-loader

安装

这里是一个小坑，安装 `less-loader` 时推荐安装指定版本，如果安装默认高版本会导致项目出错

```shell
cnpm i less-loader@6.0.0 -D
```

使用

```html
<style lang="less" scoped>
div{
  b{
    span{
      color: red;
    }
  }
}
</style>
```

## 引入 ElementUI

安装

```shell
cnpm i element-ui -S
```

配置

```js
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
```

使用

```html
<template>
  <div>
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
  </div>
</template>
```

## 配置 VueRouter

### npm安装

1. 安装

```shell
npm install vue-router
```

2. 新建 `scr/router/index.js`，并添加如下代码

```js
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "首页",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 前置路由拦截器
router.beforeEach((to, from, next) => {
  // 设置当前页签名称
  document.title = to.name;
  next();
});

export default router;
```

配置前置路由拦截器动态设置每个页面的浏览器页签名称

3. 修改 `main.js`

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

4. 修改 `App.vue`

```html
<template>
  <div id="app">
    <router-view />
  </div>
</template>
```

5. 重启项目，分别访问如下地址可以查看页面效果

- http://localhost:8080/
- http://localhost:8080/about

### VueCli安装

如果项目是使用vue-cli创建的，则可以使用下面的命令直接生成上述代码及两个示例路由。**它也会覆盖你的 `App.vue`**，因此请确保在项目中运行以下命令之前备份这个文件

```shell
vue add router
```

## 动态生成左侧菜单

### 添加layout组件

1. 修改路由文件

首先我们要创建好 `router` 路由，修改 `src\router\index.js` 文件

```js
import Vue from "vue";
import VueRouter from "vue-router";
import Layouts from "../layouts";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "home",
    component: Layouts,
    children: [
      {
        path: "/home",
        meta: { title: "首页", icon: "el-icon-s-home" },
        component: () => import("../views/home"),
      },
      {
        path: "system",
        meta: { title: "系统管理", icon: "el-icon-s-home" },
        component: Layouts,
        children: [
          {
            path: "item1",
            meta: { title: "用户管理", icon: "el-icon-s-home" },
            component: () => import("../views/system/item1"),
          },
          {
            path: "item2",
            meta: { title: "产品管理", icon: "el-icon-s-home" },
            component: () => import("../views/system/item2"),
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 前置路由拦截器
router.beforeEach((to, from, next) => {
  // 设置当前页签名称
  document.title = to.meta.title;
  next();
});

export default router;
```

代码说明：

- path：路由地址
- redirect：重定向到指定路由
- component：页面对应的组件
- children：设置子路由，二级菜单
- meta：页面的补充，用来声明页面的名称和图标等

我们将所有的页面都放在根路由的 children 下面，如果下面的菜单没有配置 children 属性，则表示该菜单是一级菜单，如果设置了则表示二级菜单，可以多级嵌套。上面的路由对应的修改`views` 文件夹下的文件结构：

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vue2admin/1.png)



2. 新建`src\layouts\index.vue`

这个文件用来配置项目页面的外壳，左侧的菜单和顶部的面包屑都会在该文件夹中

页面结构分成三大部分：

- 左侧菜单
- 顶部面包屑
- 内容展示区域

对应成代码结构如下

```html
<template>
  <div>
    <div>左侧菜单</div>
    <div>
      <div>头部面包屑</div>
      <div>内容展示区</div>
    </div>
  </div>
</template>
```

我们既然要将页面在内容展示区显示，所以我们对应的创建专门用来展示页面的组件。

所以接下来新建 `src\layouts\components\AppContent.vue` 组件。组件代码如下

```html
<template>
    <div>
        <router-view/>
    </div>
</template>
```

没有看错，很简单，只要放置一个 `router-view` 标签即可。然后将 `AppContent` 组件注册到 `layouts\index.vue` 中

```html
<template>
  <div>
    <div>左侧菜单</div>
    <div>
      <div>头部面包屑</div>
      <div>
        <AppContent />
      </div>
    </div>
  </div>
</template>

<script>
import AppContent from "./components/AppContent.vue";
export default {
  components: {
    AppContent,
  },
};
</script>
```

3. 修改 `App.vue` 

只保留 `router-view`

```html
<template>
  <div>
    <router-view/>
  </div>
</template>
```

现在我们打开页面看到如下效果

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vue2admin/3.png)

### 修改页面样式

我们首页虽然已经展示到了 `appcontent` 组件中，但是样式并不是我们想要的效果。现在去修改`src\layouts\index.vue`文件，添加如下代码

```html
<template>
    <div class="app-wrapper">
      <div class="sidebar-container">
          左侧菜单
      </div>
      <div class="main-container">
          <div class="header-main">头部面包屑</div>
          <AppContent class="app-main" />
      </div>
    </div>
</template>

<script>
import AppContent from "./components/AppContent.vue";
export default {
  components: {
    AppContent,
  }
}
</script>

<style lang="less" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  .sidebar-container {
    -webkit-transition: width 0.28s;
    transition: width 0.28s;
    width: 200px !important;
    background-color: #304156;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    -webkit-box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
    box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
    & > div {
      width: 211px !important;
    }
  }
  .main-container {
    min-height: 100%;
    -webkit-transition: margin-left 0.28s;
    transition: margin-left 0.28s;
    margin-left: 200px;
    position: relative;
  }
  .main-container {
    -webkit-transition: margin-left 0.28s;
    transition: margin-left 0.28s;
    position: fixed;
    width: calc(100vw - 210px);
    top: 50px;
    right: 0;
    bottom: 0;
    left: 0;
    .header-main {
      position: fixed;
      height: 50px;
      width: calc(100% - 200px);
      right: 0;
      top: 0;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ddd;
      padding-left: 15px;
      box-sizing: border-box;
    }
    .app-main {
      min-height: 100%;
      width: 100%;
      position: relative;
      overflow: hidden;
    }
  }
}
</style>

```

效果展示

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vue2admin/4.png)

### 引入左侧菜单

1. 新建 `src\layouts\components\ElMenu\index.vue` 组件，初始化代码

```html
<template>
  <div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <!-- 可展开菜单 -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
      </el-submenu>
      <!-- 点击菜单 -->
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
```

2. 注册 `ElMenu` 组件添加到 `src\layouts\index.vue` 中

```html
<template>
  <div class="app-wrapper">
    <!-- 左侧菜单 -->
    <ElMenu class="sidebar-container"/>
    <!-- 右侧操作区域 -->
    <div class="main-container">
      <!-- 头部面包屑 -->
      <div class="header-main">头部面包屑</div>
      <!-- 内容展示区 -->
      <AppContent class="app-main" />
    </div>
  </div>
</template>

<script>
import AppContent from "./components/AppContent.vue";
import ElMenu from "./components/ElMenu/index.vue";
export default {
  components: {
    AppContent,
    ElMenu,
  },
};
</script>

<style lang="less" scoped>
...和上面一样，这里省略
</style>
```

3. 此时打开页面可以看到左侧菜单

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vue2admin/5.png)

### 递归菜单组件

目前我们看到的只是一个写死的菜单，我们想要的是根据 `router` 文件自动生成对应的菜单，那么应该怎么做呢？

首先左侧菜单的每一项都可以当做一个组件，然后获取到 `router` 中的所有菜单，循环展示每一项菜单即可，那么就开始做吧！

新建 `src\layouts\components\ElMenu\MenuItem.vue` 组件，用来展示每一项的菜单名称

修改 `src\layouts\components\ElMenu\index.vue` 页面，引入 `router.js` 获取定义的路由数据，并且引入 `MenuItem` 组件去循环展示每一项菜单

```html
<template>
  <div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <MenuItem
        v-for="(route, index) in routersList"
        :key="index"
        :item="route"
        :fatherPath="route.path"
      ></MenuItem>
    </el-menu>
  </div>
</template>

<script>
import routers from "../../../router";
import MenuItem from "./MenuItem.vue";
export default {
  components: {
    MenuItem,
  },
  data() {
    return {
      routersList: [],
    };
  },
  mounted() {
    // 获取所有定义的一级菜单和多级菜单
    this.routersList = routers.options.routes[0].children;
  }
};
</script>

```

代码说明：

在`el-menu` 标签中我们定义了 `:default-active="$route.path"` ，这个含义表示默认选中当前路由菜单，如果是子级菜单会自动展开并选中，这是因为下面的代码中我们会将每一个页面的 `path` 作为菜单的 `index` 。

另外代码中我们遍历 `MenuItem` 组件时传递了每个菜单的对象 `item`  和每个菜单的路径  `fatherPaht` ，现在我们要到 `MenuItem` 组件去根据这个两个属性做递归展示根菜单和多级菜单结构。来到 `MenuItem` 组件中，编写如下代码

```html
<template>
  <div>
    <!-- 根菜单 -->
    <router-link tag="span" :to="resolvePath()" v-if="!item.children">
      <el-menu-item :index="resolvePath()">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </router-link>

    <!-- 可展开菜单 -->
    <el-submenu :index="resolvePath()" v-else>
      <template slot="title">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </template>
      <!-- 这里递归去展示多级菜单 -->
      <menu-item
        v-for="(route, index) in item.children"
        :key="index"
        :item="route"
        :fatherPath="resolvePath(route.path)"
      >
      </menu-item>
    </el-submenu>
  </div>
</template>

<script>
// 引入path用来处理路径
import path from "path";

export default {
  // 做组件递归时必须定义一个name。然后递归时的组件名就是这里的name值
  name: "MenuItem",
  props: {
    // 上一级的路由信息
    item: {
      type: Object,
      default: null,
    },
    // 上一级的路径
    fatherPath: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    resolvePath(routePath = "") {
      return path.resolve(this.fatherPath, routePath);
    },
  },
};
</script>
```

代码说明

- 在做组件递归时，必须要在递归组件内声明 `name` 属性，属性值就是当前组件的名称，这样才能实现多级嵌套循环效果。

另外在ElementUI 中的菜单分成两种类型,分别如下

```html
<el-menu-item index="4">
    <i class="el-icon-setting"></i>
    <span slot="title">导航四</span>
</el-menu-item>
```

- 这种的表示根菜单

```html
<el-submenu index="1">
    <template slot="title">
        <i class="el-icon-location"></i>
        <span>导航一</span>
    </template>
    <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
    </el-menu-item>
</el-submenu>
```

- 这种的表示一个可展开的菜单，我们根据路由有没有 `children` 来判断这个菜单是否有子菜单

在根菜单外层添加了一个 `router-link` 实现了点击菜单跳转到不同页面

现在我们来查看效果

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vue2admin/6.png)

菜单上出现了一个根菜单和一个二级菜单

### 添加路由自动完成菜单嵌套

现在我们已经完成了一个二级菜单的展示，那么我们添加一个三级路由会不会自动出现三级菜单呢？

首先新建一个测试页面，在文件夹 `item2` 下面新建一个 `item2-1`，并且在里面添加一个 `index.vue` 文件，如下图:

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vue2admin/7.png)

然后去 `src\router\index.js` 添加这个页面的路由

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vue2admin/8.png)

添加完成后可以发现产品管理菜单自动变成了一个可展开的菜单，展开后里面有一个类别列表菜单

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vue2admin/9.png)

## 添加头部面包屑

### 基础用法

我们想要在头部添加一个如下的效果,可以很清晰的知道当前浏览的是哪个页面

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vue2admin/10.png)

1. 在`layouts` 文件夹添加 `HeaderNav` 组件，组件地址： `src\layouts\components\HeaderNav.vue`，添加如下初始代码

```html
<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
```

2. 然后再 `src\layouts\index.vue` 文件中引入 `HeaderNav` 组件

```html
<template>
  <div>
    <div class="app-wrapper">
      <!-- 左侧菜单 -->
      <ElMenu class="sidebar-container" />
      <!-- 右侧操作区域 -->
      <div class="main-container">
        <!-- 头部面包屑 -->
        <HeaderNav class="header-main" />
        <!-- 内容展示区 -->
        <AppContent class="app-main" />
      </div>
    </div>
  </div>
</template>

<script>
import AppContent from "./components/AppContent.vue";
import ElMenu from "./components/ElMenu/index.vue";
import HeaderNav from "./components/HeaderNav.vue";
export default {
  components: {
    AppContent,
    ElMenu,
    HeaderNav,
  }
};
</script>

<style lang="less" scoped>
样式省略。。。
</style>
```

3. 此时我们的页面效果是这样的

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vue2admin/11.png)

是不是有点感觉了呢

4. 接下只需要监听页面的变化去实时获取最新的路由信息即可，然后循环遍历显示

实现代码：

```html
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(route, index) in breadcrumbItems"
        :key="index"
      >
        <i :class="route.icon"></i>
        <span>{{ route.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbItems: [],
    };
  },
  mounted() {
    this.geBreadcrumbItems(this.$route);
  },
  methods: {
    geBreadcrumbItems(route) {
      // 获取当前页面的路由组
      this.breadcrumbItems = route.matched;
      // 从下标为1的位置开始获取路由，去除了最外层定义的根路由信息，并且获取到的数组里面只有meta数据，方便我们取值
      this.breadcrumbItems = this.breadcrumbItems
        .map((item) => item.meta)
        .splice(1);
    },
  },
  watch: {
    $route: function (newVal) {
      this.geBreadcrumbItems(newVal);
    },
  },
};
</script>
```

效果展示

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vue2admin/1.gif)



### 添加首页快速入口

我们已经实现了基本效果，但是我们还想在面包屑的首位添加首页的连接，点击首页文字快速跳转到到首页

修改  `src\layouts\components\HeaderNav.vue` 代码为如下

```html
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(route, index) in breadcrumbItems"
        :key="index"
      >
        <!-- 判断面包屑是否有path属性，如果有则显示router-link标签 -->
        <router-link v-if="route.path" :to="route.path">
          <i :class="route.icon"></i>
          <span>{{ route.title }}</span>
        </router-link>
        <!-- 如果没有path属性则不跳转 -->
        <template v-else>
          <i :class="route.icon"></i>
          <span>{{ route.title }}</span>
        </template>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbItems: [],
    };
  },
  mounted() {
    this.geBreadcrumbItems(this.$route);
  },
  methods: {
    geBreadcrumbItems(route) {
      // 获取当前页面的路由组
      this.breadcrumbItems = route.matched;
      // 从下标为1的位置开始获取路由，去除了最外层定义的根路由信息，并且获取到的数组里面只有meta数据，方便我们取值
      this.breadcrumbItems = this.breadcrumbItems
        .map((item) => item.meta)
        .splice(1);

      // 判断当前页面是否已经是首页
      let nowPath = route.path;
      // 如果当前页面不是首页，则在面包屑的首位置添加一个首页链接
      if (nowPath !== "/home") {
        this.breadcrumbItems.unshift({
          title: "首页",
          icon: "el-icon-s-home",
          path: "/home",
        });
      }
    },
  },
  watch: {
    $route: function (newVal) {
      this.geBreadcrumbItems(newVal);
    },
  },
};
</script>
```

修改之后页面效果是当我们进入非首页页面时，面包屑前面会有一个首页的快速入口，当进入首页时不会展示首页连接

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vue2admin/2.gif)

## 个性化菜单配置

### 配置独立页面

现在我们看到的页面都嵌套在左侧菜单和面包屑下面，但是有些页面时不能在这个嵌套页面的，例如登录页面。那么我们怎么通过配置路由来实现这样的效果呢？

首先添加登录页面，新建 `src\views\login\index.vue`，编写如下代码

```html
<template>
    <div>
        登录页面
    </div>
</template>
```

添加完登录页面后前往 `src\router\index.js` 文件添加路由信息，如下图

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vue2admin/12.png)

我们在登录页面的路由信息中的增加一个 `oneself:true` 的标识，用来标识这个页面时独自打开的，不需要嵌套在菜单下

添加完路由后找到 `src\layouts\index.vue` 页面修改为如下代码

```html
<template>
  <div>
    <!-- 判断是否在空白页打开 -->
    <template v-if="!isOneself">
      <div class="app-wrapper">
        <div class="sidebar-container">
          <ElMenu />
        </div>
        <div class="main-container">
          <HeaderNav class="header-main" />
          <AppContent class="app-main" />
        </div>
      </div>
    </template>
    <!-- 如果在空白页打开则不显示框架 -->
    <template v-else>
      <AppContent />
    </template>
  </div>
</template>

<script>
import AppContent from "./components/AppContent.vue";
import ElMenu from "./components/ElMenu/index.vue";
import HeaderNav from "./components/HeaderNav.vue";
export default {
  components: {
    AppContent,
    ElMenu,
    HeaderNav,
  },
  data() {
    return {
      isOneself: false,
    };
  },
  mounted() {
    // 获取当前路由是否是独自打开的
    this.isOneself = this.$route.meta.oneself;
  },
  watch: {
    // 监听路由变化，实时获取路由信息
    $route: function (newVal) {
      this.isOneself = newVal.meta.oneself;
    },
  },
};
</script>

<style lang="less" scoped>
css省略。。。
</style>
```

修改完成后查看页面效果

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vue2admin/3.gif)

效果很明显，点击了登录后左侧的菜单和面包屑都没有了，浏览器只会展示登录页面信息。

到这里我们会发现登录页面作为了一个菜单项显示到了左侧菜单中，这个问题怎么解决呢？

### 配置隐藏菜单

找到 `src\router\index.js` 文件，为登录页面添加一个 `hide:true` ，如下图，这个属性用来表示这个页面不在左侧菜单中显示

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vue2admin/13.png)

添加完成后找到 `src\layouts\components\ElMenu\MenuItem.vue` 文件，在根标签上添加一个 `v-if` 判断，用来判断当前菜单是否需要被渲染

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vue2admin/18.png)

由于这个功能所添加的代码极少，所以就不贴代码了。修改完之后查看页面

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vue2admin/4.gif)

通过动画可以看到登录页面已经不在菜单中展示，修改页面地址也会正常的在新页面中打开。

### 配置外部连接

现在我们配置的地址只能配置我们项目中的地址，那么我需要点击菜单直接打开百度怎么做呢？

首先添加路由信息如下

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vue2admin/14.png)

此时我们点击菜单并不能正常的打开百度

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vue2admin/5.gif)

这是因为我们并没有判断页面的 `path` 类型。

接下来新建 `src\layouts\components\ElMenu\MenuLink.vue`，编写如下代码

下面代码的含义是定义了一个动态组件，根据父组件传递过来的路径类型显示不同的组件

```html
<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    // 接收从父组件传递过来的页面地址
    to: {
      type: String,
      required: true,
    },
  },
  computed: {
    isExternal() {
      return /^(https?:|mailto:|tel:)/.test(this.to);
    },
    type() {
      // 根据路径判断组件类型，如果是外部连接则用a标签
      if (this.isExternal) {
        return "a";
      }
      // 如果不是外部连接则用router-link组件包裹
      return "router-link";
    },
  },
  methods: {
    // 绑定组件属性
    linkProps(to) {
      // 如果是外部连接则设置a标签的href地址为传递过来的地址，并且设置在新标签打开
      if (this.isExternal) {
        return {
          href: to,
          target: "_blank",
          style: {
            "text-decoration": "none",
          },
        };
      }
      // 如果是内部地址则设置router-link的to属性值，以及tag属性值为span
      return {
        to: to,
        tag: "span",
      };
    },
  },
};
</script>
```

然后找到 `src\layouts\components\ElMenu\MenuItem.vue` 文件，引入刚刚新建 `MenuLink` 组件

修改代码如下

```html
<template>
  <!-- 判断当前页面是否显示，如果hide为true，则不渲染该菜单 -->
  <div v-if="!item.meta.hide">
    <!-- 根菜单 -->
    <MenuLink :to="resolvePath()" v-if="!item.children">
      <el-menu-item :index="resolvePath()">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </MenuLink>

    <!-- 可展开菜单 -->
    <el-submenu :index="resolvePath()" v-else>
      <template slot="title">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </template>
      <!-- 这里递归去展示多级菜单 -->
      <menu-item
        v-for="(route, index) in item.children"
        :key="index"
        :item="route"
        :fatherPath="resolvePath(route.path)"
      >
      </menu-item>
    </el-submenu>
  </div>
</template>

<script>
// 引入path用来处理路径
import path from "path";
import MenuLink from "./MenuLink.vue";

export default {
  // 做组件递归时必须定义一个name。然后递归时的组件名就是这里的name值
  name: "MenuItem",
  components: {
    MenuLink,
  },
  props: {
    // 上一级的路由信息
    item: {
      type: Object,
      default: null,
    },
    // 上一级的路径
    fatherPath: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    // 判断路径是否是外部地址
    isExternal(path) {
      return /^(https?:|mailto:|tel:)/.test(path);
    },
    // 解析页面地址
    resolvePath(routePath = "") {
      // 判断当前页面地址是否为外部地址
      if (this.isExternal(routePath)) {
        return routePath;
      }
      // 判断从父组件传递过来的地址是否为外部地址
      if (this.isExternal(this.fatherPath)) {
        return this.fatherPath;
      }
      // 格式化页面地址
      return path.resolve(this.fatherPath, routePath);
    },
  },
};
</script>
```

图片说明修改点

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vue2admin/16.png)

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vue2admin/15.png)

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vue2admin/17.png)

修改完成后查看页面效果

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vue2admin/6.gif)

现在可以看到点击百度搜索菜单后在新页签打开了百度。

## 配置多环境地址

首先安装 `cross-env`

```shell
npm i --save-dev cross-env
```

然后修改 `package.json` 文件中的 `scripts` 对象

```json
{
  ......省略其他
    
  "scripts": {
    "serve": "cross-env VUE_APP_ENV=dev vue-cli-service serve",
    "build": "cross-env VUE_APP_ENV=production vue-cli-service build",
    "lint": "vue-cli-service lint"
  },

  ......省略其他
}
```

我们在启动命令和打包命令前添加 `cross-env` 关键字，然后使用键值对的方式对一个变量赋值 `VUE_APP_ENV=dev`

然后新建`src\utils\baseurl.js` 文件，编写如下代码

```js
// 封装公共的请求api
const apiConfig = {
    // 开发环境
    dev: {
        fayongApi: "https://192.168.199.100"
    },
    // 生产环境
    production: {
        fayongApi: "https://appsh.yikongenomics.com"
    },
};

// 根据全局全局变量自动切换请求地址前缀
export default apiConfig[process.env.VUE_APP_ENV];
```

**关键代码**：`process.env.VUE_APP_ENV` 通过这个可以获取到输入不同命令式设置的不同值。

最后我们在页面中引入 `baseurl` 来查看当前获取的环境地址

```html
<template>
    <div>
        首页
    </div>
</template>

<script>
import env from "../../utils/baseurl"
export default {
    data() {
      return{

      }  
    },
    mounted(){
        console.log(env.fayongApi);  //=> https://192.168.199.100
    }
}
</script>
```

此时获取到的就是本地的一个地址，当我们打包后，这里就会自动变成线上地址，从而实现了多套环境的搭建和根据打包命令自动切换的功能。

## 配置代理和publicPath

在项目根目录新建 `vue.config.js`。配置代码如下

```js
module.exports = {
    publicPath: "./",
    devServer: {
        disableHostCheck: true, //禁用主机检查 
        proxy: {
            "/fayong": { // 设置以什么前缀开头的请求用来代理
                target: "http://w79f7c.natappfree.cc/index", //要访问的跨域的域名
                secure: false, // 使用的是http协议则设置为false，https协议则设置为true
                changOrigin: true, //开启代理
                pathRewrite: {
                    "^/fayong": "",
                },
            }
        },
    },
};
```

然后重启项目生效

## 配置地址别名访问

在 `vue.config.js` 文件中添加如下配置文件

```js
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: '/',
    devServer: {
        ......省略代理方法
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src'),
                "@http": resolve("src/utils/http.js"),
                "@api": resolve("src/utils/baseurl.js")
            }
        }
    }
};
```

## 简单封装一下 axios

首先安装 `axios`

```shell
npm i axios --save
```

然后新建 `src\utils\http.js`，编写如下代码

```js
// 引入axiox
import axios from 'axios'
// 创建axios实例
const service = axios.create()

// 请求拦截器
axios.interceptors.request.use(function (config) {
    // 在这里可以添加请求头，请求token等信息
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 响应拦截器
service.interceptors.response.use(function (result) {
    // 判断成功
    const { status, data } = result
    // 判断接口返回状态
    if (status === 200) {
        // 如果接口正常则返回接口给的数据
        return data
    } else {
        // 如果不正常则返回一个错误信息
        return Promise.reject('系统未知错误，请反馈给管理员')
    }
}, function (error) {
    // 返回错误信息
    return Promise.reject(error)
})

export default service
```

最后来使用一下

```js
import http from '../../utils/http'

export default {
  data() {
    return {}
  },
  methods: {
    test() {
      http
        .get(`node/search/users?q=songzx`)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
```

查看控制台拿到的数据就是接口直接返回的数据

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vue2admin/19.png)

## 封装全局Loading方法

在 `main.js` 中添加如下方法

```js
/**
 * 配置全局loading提示框
 * 显示loading this.showLoading()
 * 关闭loading this.hideLoading()
 */
Vue.prototype.loading = null
Vue.prototype.showLoading = function (msg = 'Loading') {
  Vue.prototype.loading = this.$loading({
    lock: true,
    text: msg,
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
}
Vue.prototype.hideLoading = function(){
  Vue.prototype.loading.close();
}
```

## 全局修改ElementUI样式

在 `main.js` 中，添加配置代码

```js
//全局修改弹窗黑幕点击关闭弹窗默认组件的配置
ElementUI.Dialog.props.appendToBody.default = true

//设置ElementUI组件的默认大小
Vue.use(ElementUI, {
  size: 'medium'
})
```

## 改变后台布局

首先修改 `src\layouts\index.vue` 文件的样式如下

```css
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  .sidebar-container {
    -webkit-transition: width 0.28s;
    transition: width 0.28s;
    width: 200px !important;
    background-color: #304156;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 50px;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    -webkit-box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
    box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
    & > div {
      width: 211px !important;
    }
  }
  .main-container {
    min-height: 100%;
    -webkit-transition: margin-left 0.28s;
    transition: margin-left 0.28s;
    margin-left: 200px;
    position: relative;
  }
  .main-container {
    -webkit-transition: margin-left 0.28s;
    transition: margin-left 0.28s;
    position: fixed;
    width: calc(100vw - 210px);
    top: 50px;
    right: 0;
    bottom: 0;
    left: 0;
    .header-main {
      position: fixed;
      height: 50px;
      width: 100%;
      left: 0;
      right: 0;
      top: 0;
      display: flex;
      align-items: center;
      padding-left: 15px;
      box-sizing: border-box;
      background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    .app-main {
      min-height: 100%;
      width: 100%;
      position: relative;
      overflow: hidden;
    }
  }
}
```

然后修改顶部导航样式，`src\layouts\components\HeaderNav.vue`

```html
<template>
  <div>
    <!-- 后台标题 -->
    <div class="header-title">
      <div class="img">
        <img src="../../assets/logo.png" alt="" srcset="" />
      </div>
      <div class="title">XXX后台关系系统</div>
    </div>
    <!-- 面包屑展示 -->
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="(route, index) in breadcrumbItems"
          :key="index"
        >
          <!-- 判断面包屑是否有path属性，如果有则显示router-link标签 -->
          <router-link v-if="route.path" :to="route.path">
            <el-tag type="success">
              <i :class="route.icon"></i>
              <span>{{ route.title }}</span>
            </el-tag>
          </router-link>
          <!-- 如果没有path属性则不跳转 -->
          <template v-else>
            <el-tag>
              <i :class="route.icon"></i>
              <span>{{ route.title }}</span>
            </el-tag>
          </template>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbItems: [],
    }
  },
  mounted() {
    this.geBreadcrumbItems(this.$route)
  },
  methods: {
    geBreadcrumbItems(route) {
      // 获取当前页面的路由组
      this.breadcrumbItems = route.matched
      // 从下标为1的位置开始获取路由，去除了最外层定义的根路由信息，并且获取到的数组里面只有meta数据，方便我们取值
      this.breadcrumbItems = this.breadcrumbItems
        .map((item) => item.meta)
        .splice(1)

      // 判断当前页面是否已经是首页
      let nowPath = route.path
      // 如果当前页面不是首页，则在面包屑的首位置添加一个首页链接
      if (nowPath !== '/home') {
        this.breadcrumbItems.unshift({
          title: '首页',
          icon: 'el-icon-s-home',
          path: '/home',
        })
      }
    },
  },
  watch: {
    $route: function (newVal) {
      this.geBreadcrumbItems(newVal)
    },
  },
}
</script>

<style lang="less" scoped>
.header-title {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  font-weight: 700;
  font-size: 17px;
  margin-right: 30px;
  .img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
```

修改后的布局

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vue2admin/20.png)
## 添加全局搜索功能

安装 `fuse.js`

```shell
npm i fuse.js --save
```

封装全局搜索菜单组件

```html
<template>
  <div>
    <el-select
      ref="headerSearchSelect"
      v-model="selectVal"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="Search"
      class="header-search-select"
      @change="onChangeSelect"
    >
      <el-option
        v-for="option in selectList"
        :key="option.item.path"
        :value="option.item.path"
        :label="option.item.title"
      />
    </el-select>
  </div>
</template>

<script>
import Fuse from 'fuse.js'
import path from 'path'
export default {
  name: 'HeaderSearch',
  data() {
    return {
      // fuse配置信息
      fuse: null,
      // 输入框绑定值
      selectVal: '',
      // 下拉框列表
      selectList: [],
      // 用于存放模糊搜索的路由数据
      allRouter: [],
    }
  },
  mounted() {
    // 获取全部的路由数据
    let allRouter = this.$router.options.routes[0].children
    this.resolvePath('/', '', allRouter)
    this.initFuse(this.allRouter)
  },
  methods: {
    // 递归初始化path
    resolvePath(basePath = '/', baseName = '', routers) {
      routers.forEach((route) => {
        let routeName = path.resolve(baseName, route.meta.title).slice(1)
        let routePath = path.resolve(basePath, route.path)
        if (!route.children) {
          // 页面不是隐藏的才会push到数据中
          !route.meta.hide &&
            this.allRouter.push({
              title: routeName,
              path: routePath,
            })
        } else {
          // 递归调用获取嵌套数据
          this.resolvePath(routePath, routeName, route.children)
        }
      })
    },
    // 初始化配置Fuse
    initFuse(list) {
      this.fuse = new Fuse(list, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          {
            name: 'title',
            weight: 0.7,
          },
          {
            name: 'path',
            weight: 0.3,
          },
        ],
      })
    },
    // 模糊搜索路径
    querySearch(query) {
      if (query !== '') {
        console.log(this.fuse.search(query))
        this.selectList = this.fuse.search(query)
      } else {
        this.selectList = []
      }
    },
    // 选中某一项时触发
    onChangeSelect(path) {
      this.$router.push(path)
    },
    // 判断是否是外部连接
    ishttp(url) {
      return url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1
    },
  },
}
</script>
```

这里面有两个方法

第一个是 `new Fuse` ，传入我们要搜索的数据。然后通过 `this.fuse.search` 完成搜索。

## 添加路由守卫

判断用户是否已经登录，否则强制跳转到登录页面,在 `src\router\index.js` 中添加如下代码

```js
// 前置路由拦截器
router.beforeEach((to, from, next) => {
  // 设置当前页签名称
  document.title = to.meta.title;
  // 没有登录并且要去的页面不是登录页面，在强制跳转到登录
  if (to.path === "/login") {
    localStorage.removeItem('userInfo')
    next()
  } else if (!localStorage.getItem('userInfo')) {
    next('/login')
  } else {
    next()
  }
});
```

## 修改重复点击菜单控制台报错

在 `src\router\index.js` 中添加如下代码

```js
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法，取消路由重复的报错
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// 要在实例化 VueRouter 前添加上述代码
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
```

## 一个优雅的图片裁剪插件

安装,[vue-cropper - npm (npmjs.com)](https://www.npmjs.com/package/vue-cropper)

```shell
npm install vue-cropper --save
```

组件内引入

```js
import { VueCropper }  from 'vue-cropper' 
components: {
  VueCropper
}
```

封装成组件

```html
<template>
  <div>
    <div class="user-info-head" @click="editCropper()">
      <img :src="options.img" title="点击上传头像" />
    </div>
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-row>
        <!-- 左侧编辑图片区域 -->
        <el-col :md="12" :style="{ height: '350px' }">
          <vue-cropper
            ref="cropper"
            :img="options.img"
            :info="true"
            :autoCrop="options.autoCrop"
            :autoCropWidth="options.autoCropWidth"
            :autoCropHeight="options.autoCropHeight"
            :fixedBox="options.fixedBox"
            @realTime="realTime"
          />
        </el-col>

        <!-- 右侧实时预览区域 -->
        <el-col :md="12" :style="{ height: '350px' }">
          <div class="avatar-upload-preview">
            <img :src="previews.url" :style="previews.img" />
          </div>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :lg="2" :md="2">
          <el-upload action="#" :auto-upload="false" :show-file-list="false">
            <el-button size="small">
              选择
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-upload>
        </el-col>
        <el-col :lg="{ span: 1, offset: 2 }" :md="2">
          <!-- 放大按钮 -->
          <el-button
            icon="el-icon-plus"
            size="small"
            @click="changeScale(1)"
          ></el-button>
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <!-- 缩小按钮 -->
          <el-button
            icon="el-icon-minus"
            size="small"
            @click="changeScale(-1)"
          ></el-button>
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <!-- 往左翻转 -->
          <el-button
            icon="el-icon-refresh-left"
            size="small"
            @click="rotateLeft()"
          ></el-button>
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <!-- 往右翻转 -->
          <el-button
            icon="el-icon-refresh-right"
            size="small"
            @click="rotateRight()"
          ></el-button>
        </el-col>
        <el-col :lg="{ span: 2, offset: 6 }" :md="2">
          <!-- 提交 -->
          <el-button type="primary" size="small" @click="uploadImg()">
            提 交
          </el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: { VueCropper },
  data() {
    return {
      // 是否显示弹出层
      open: false,
      // 弹出层标题
      title: '修改头像',
      options: {
        img: require('../../assets/loginbg2.jpg'), //裁剪图片的地址
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
      },
      previews: {},
    }
  },
  methods: {
    // 编辑头像
    editCropper() {
      this.open = true
    },
    // 向左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    // 向右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },
    // 图片缩放
    changeScale(num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    // 上传图片
    uploadImg() {
      this.$refs.cropper.getCropBlob((data) => {
        // 这里获取到的data是一个blob类型
        console.log(data)
        // let formData = new FormData()
        // formData.append('avatarfile', data)
        // console.log(formData)
        this.options.img = this.createMiniQrcode(data)
        this.open = false
      })
    },
    // 实时预览
    realTime(data) {
      console.log(data)
      this.previews = data
    },
    // blob转换成base64
    getBase64(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
    },
    // blob转换成图片地址
    createMiniQrcode(blob) {
      return window.URL.createObjectURL(blob)
    },
  },
}
</script>

<style scoped>
.user-info-head {
  position: relative;
  display: inline-block;
  height: 110px;
  width: 110px;
  border-radius: 55px;
  overflow: hidden;
  border: 1px solid #ddd;
}
.user-info-head img {
  width: 100%;
  height: 100%;
}

.user-info-head:hover:after {
  content: '+';
  position: absolute;
  height: 110px;
  width: 110px;
  text-align: center;
  font-size: 25px;
  line-height: 110px;
  border-radius: 50%;
  cursor: pointer;
  color: #eee;
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 24px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.avatar-upload-preview {
  position: absolute;
  top: 50%;
  transform: translate(50%, -50%);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;
}
</style>
```

使用时直接引入注册即可。

示例

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vue2admin/21.png)





