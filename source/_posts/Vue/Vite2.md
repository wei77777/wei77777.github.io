---
title: vite2+Vue3实践
tags: Vue
categories: vite
abbrlink: 8571948f
date: 2021-05-04 00:00:00
---

## 创建Vite2项目

[Vite官方文档](https://vitejs.dev/)

### 安装

```shell
$ npm init @vitejs/app
or
$ yarn create @vitejs/app
```

然后按照提示进行操作即可创建出来一个Vite项目。

### 使用

```shell
npm install
npm run dev
```

启动后可以看到如下图



![image-20210425100205454](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vite/1.png)

## Vite2的主要变化

### 起别名

在 vite.config.js 文件中设置 alias 对象，前面key为别名，后面为对应的地址

```js
import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  alias: {
    "@": path.resolve(__dirname, 'src'),
    "comp": path.resolve(__dirname, 'src/components'),
    'public': path.resolve(__dirname, 'public'),
  },
  plugins: [vue()]
})
```

## Strap setup 详解

### 直接导入组件

在 script 标签里添加 setup 属性，然后在里面直接导入要使用的组件即可在页面中使用，无需注册

```js
<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <Comp></Comp>
</template>

<script setup>
import HelloWorld from "comp/HelloWorld.vue";
// 直接引用组件，无需注册
import Comp from "comp/Compon.vue";
</script>
```

### 获取外界的全部输入

在子组件中使用 defineProps 方法接收父组件定义的属性，等价于 Vue2 中的 props，在页面中即可展示

```js
<template>
  <h1>{{ msg }}</h1>
  <h3>{{ title }}</h3>
</template>

<script setup>
import { defineProps, reactive } from "vue";
// 外界的输入集合，外界所有的输入都可以通过 props 获取到
const props =  defineProps({
  msg: String,
  title: String,
});
console.log(props.msg); //=> Hello Vue 3 + Vite
</script>
```

对比 Vue2

```js
<template>
  <div>{{title}}</div>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

```

父组件用这个组件并定义属性值

```js
<template>
  <HelloWorld msg="Hello Vue 3 + Vite" title='你好 Vue3 + Vite'/>
</template>

<script setup>
// 直接引用组件，无需注册
import HelloWorld from "comp/HelloWorld.vue";
</script>
```

### 子组件调用父组件

在子组件中使用 `defineEmit` 方法，这个方法接收一个数组，数组里面定义了要派发的事件名称,这个方法返回一个`emit`

```js
<template>
  <!-- 点击子组件里面的按钮触发父组件的方法 -->
  <button @click="onclick">子调父方法</button>
</template>

<script setup>
import { defineProps, reactive, defineEmit } from "vue";
const emit = defineEmit(["hwclick"]);
// 点击子组件里面的按钮派发一个 hwclick 方法
const onclick = () => {
  emit("hwclick");
};
</script>
```

父组件接收这个事件名，并触发一个方法

```js
<template>
  <HelloWorld
    msg="Hello Vue 3 + Vite"
    title="你好 Vue3 + Vite"
    @hwclick="appclick"
  />
</template>

<script setup>
const appclick = () => {
  console.log("子组件调用了父组件");
};
</script>
```

代码效果

![image-20210425110826272](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vite/2.png)

### 获取上下文 useContext

从 vue 中导出 useContext 方法，这个方法返回一个上下文实例

```js
<script setup>
import { defineProps, reactive, defineEmit, useContext } from "vue";
// 导出方法集合
const emit = defineEmit(["hwclick"]);
// 获取上下文
const ctx = useContext();
// 子组件的点击方法
function onclick() {
  // console.dir(ctx);
  // emit("hwclick");
    
  // 也可以用这种方法调用父组件方法
  ctx.emit("hwclick")
}
</script>
```

### 父组件调用子组件

在上面使用 useContext 方法可以获取一个上下文，用 ctx 来接收，上下文中有一个 expose 方法，用来导出属性或者方法，外界使用这个组件时可以访问到此组件导出的内容

首先在子组件中定义导出的内容，可以是方法，也可以是值

```js
import { defineProps, reactive, defineEmit, useContext } from "vue";

// 获取上下文
const ctx = useContext();
// 使用上下文中的 expose 导出内容
ctx.expose({
  hwexposefun() {
    console.log("这段话是父组件调用子组件打印出来的");
  },
  name: "我是helloworld子组件",
});
```

在父组件内使用子组件导出的方法,使用 ref 等于 一个变量，然后在 js 中对这个变量进行初始化处理

```js
<template>
  <HelloWorld
    msg="Hello Vue 3 + Vite"
    title="你好 Vue3 + Vite"
    @hwclick="appclick"
    ref="hw"
  />
  <button @click="fatherBtn">我是父组件的按钮</button>
</template>
<script setup>
import HelloWorld from "comp/HelloWorld.vue";
import { ref } from "vue"; // 从 vue 中导出用到的方法
let hw = ref(null); // 初始化

function fatherBtn() { 
  hw.value.hwexposefun();  // 调用子组件的 hwexposefun 方法
  console.log(hw.value.name); // => 我是helloworld子组件
}
</script>
```

效果

![image-20210425132034894](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vite/3.png)

## Vue JSX支持

首先安装插件

下面的插件只在 vue 单文件文件中生效

```shell
npm install @vitejs/plugin-vue-jsx
```

修改 Compon.vue 文件为 jsx 写法

### 原始写法

```js
<script lang="jsx">
export default {
  data() {
    return {
      count:0
    }
  },
  methods: {
    onclick(){
      this.count++
    }
  },
  render(h) {
    return (
      <>
      <h2>compon</h2>
      <p onClick={this.onclick}>{this.count}</p>
      </>
    )
  }
};
</script>
```

### vue3写法

```js
<script lang="jsx">
import {ref} from 'vue'
// vue3格式写法
export default{
  setup() {
    let count = ref(0)
    let onclick = ()=>{
      count.value++
    }
    return () => (
      <>
      <h2>compon</h2>
      <p onClick={onclick}>{count.value}</p>
      </>
    )
  }
}
</script>
```

## Mock数据

[github源码地址](https://github.com/anncwb/vite-plugin-mock)

### 安装

`--save` 表示运行时依赖，`-D` 开发时依赖

```shell
npm install mockjs --save
```

```shell
npm install vite-plugin-mock cross-env -D
```

### 配置

在 `vite.config.js` 文件中引入 `vite-plugin-mock`，然后在 `plugins` 数组中添加 `mock` 服务，如果不使用 `ts` 要将 `supporTs` 关掉

```js
import { viteMockServe } from 'vite-plugin-mock';

plugins: [
    vue(),
    vuejsx(),
    viteMockServe({
        supportTs: false
    })
]
```

同时注意要修改一下 package.json 文件里面的 dev 环境变量

```js
"dev": "cross-env NODE_ENV=development vite",
```

### 使用

项目根目录新建 `mock/role.js`

```js
export default [{
        url: '/api/getRoleById',
        method: 'get',
        response: () => {
            return {
                code: 0,
                message: 'ok',
                data: [{
                    roleName: 'admin',
                }, {
                    roleValue: 'admin',
                }],
            };
        },
    },
    {
        url: '/api/getUsers',
        method: 'get',
        response: ({
            query
        }) => {
            // 结构出 query ，用来获取请求中携带的参数
            console.log('quert>>>>>' + query.id);
            return {
                code: 0,
                message: 'ok',
                data: [
                    'tome', 'jarey'
                ]
            }
        }
    }
];
```

使用 axios 请求 `/api/getRoleById` 接口

```js
// 不携带参数
http.get("/api/getRoleById").then((res) => {
    console.log(res.data);
});
// 携带参数
http.get("/api/getUsers?id=123").then((res) => {
    console.log(res.data);
});
```

重启项目点击按钮查看结果

![image-20210425151941543](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vite/4.png)

携带参数请求时查看命令行输出

![image-20210425152954672](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vite/5.png)

## 安装使用 vue-router4.0 和 vuex4.0

### 安装

```shell
npm install vue-router@next vuex@next --save
```

![image-20210425154636367](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vite/6.png)

### 使用 router

新建 `src/router/index.js` 文件，配置路径

```js
// 导入路由相关方法
import { createRouter, createWebHashHistory } from 'vue-router';

// 工厂函数创建router实例
const router = createRouter({
    history: createWebHashHistory(),
    routes: [{
        path: "/",
        // 动态加载路由
        component: () => import('../views/home.vue')
    }]
})
export default router
```

然后在 `main.js` 中引入 `router` 

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index"

createApp(App).use(router).mount('#app')
```

新建 `src/views/home.vue`  文件，来作为首页页面，可以将之前写在 `App.vue`  文件中的代码拿过来

```js
<template>
  <div>
    <HelloWorld
      msg="Hello Vue 3 + Vite"
      title="你好 Vue3 + Vite"
      @hwclick="appclick"
      ref="hw"
    />
    <button @click="fatherBtn">我是父组件的按钮</button>
  </div>
</template>

<script setup>
import HelloWorld from "comp/HelloWorld.vue";
// 从 vue 中导出用到的方法
import { ref } from "vue";

let hw = ref(null);

const appclick = () => {
  console.log("子组件调用了父组件");
};

function fatherBtn() {
  // 调用子组件的 hwexposefun 方法
  hw.value.hwexposefun();
  console.log(hw.value.name); // => 我是helloworld子组件
}
</script>
```

修改 `App.vue` ,添加 `router-view`

```js
<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <router-view></router-view>
</template>
```

刷新页面查看

![image-20210425161327363](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vite/7.png)

### 使用 vuex

新建 `scr/store/index.js`  文件

```js
import {
    createStore
} from 'vuex'

const store = createStore({
    state: {
        count: 0
    },
    mutations:{
        // 第二个值为参数
        add(state,age){
            state.count+=age
        }
    }
})

export default store
```

在 `main.js`  中导入 `store/index.js`  文件

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index"
import store from "./store/index"

createApp(App).use(router).use(store).mount('#app')
```

如果只在 html 中使用 vuex 则使用方式为 `$store.state.XXX` ，调用 vuex 中的方法则使用 `$store.commit('方法名')`，这种使用方法不需要在 js  中引入 vuex

```html
<!-- vuex中的数据 -->
<div>
    这是vuex中的数据
    <!-- 行内使用 -->
    <span @click="$store.commit('add',5)">{{ $store.state.count }}</span>
</div>
```

在 js 中使用 vuex

```js
// 导入 vuex 并使用 useStore 方法
import { useStore } from "vuex";
// useStore 方法返回一个对象，对象中包含 vuex 中的数据
let store = useStore();
// 调用 vuex 中定义的方法,第二个为参数
store.commit("add", 10);
// 读取 veux 中的属性值
console.log(store.state.count,'js中打印的vuex中的值'); // => 10
```

![image-20210425164628659](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vite/8.png)

## 全局样式管理

### 安装

```shell
npm install sass -D
```

### 使用

新建 `src/style.index.scss` 文件作为全局样式文件，将 `App.vue` 文件中的样式剪切到 `index.scss` 文件中

```scss
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;

    h1 {
        color: #41b883;
    }
}
```

在 `main.js` 中导入全局样式

```js
import { createApp } from 'vue'
import App from './App.vue'
// 路由
import router from "./router/index"
// vuex
import store from "./store/index"
// 全局样式
import 'style/index.scss'

createApp(App).use(router).use(store).mount('#app')
```

## 使用element UI

搭配 Vue3 使用的 elementui 有多个版本，每个版本的使用方法一样，但是安装命令不同

### element3

#### 安装

```shell
npm install element3 --save
```

#### 完整引入

在 main.js 中引入 element3 

```js
// 导入 element3
import element3 from 'element3'
// 引入 element3 样式
import 'element3/lib/theme-chalk/index.css'
// 挂载 element3
createApp(App).use(element3).mount('#app')
```

#### 按需引入

新建 `src/plugins/element3.js`  文件

```js
// 按需导入 button 和 input
import { ElButton, ElInput } from 'element3'
// 加载 button 和 input 的 css 样式
import 'element3/lib/theme-chalk/button.css'
import 'element3/lib/theme-chalk/input.css'

export default function (app) {
    app.use(ElButton)
    app.use(ElInput)
}
```

在 `main.js` 文件中导入使用,里的 @ 已经在 vite.config,js 中配置过别名

```js
import { createApp } from 'vue'
import App from './App.vue'
// 从自定义的插件文件中导入element3
import element3 from '@/plugins/element3'
const app = createApp(App)
app.use(element3)
app.mount('#app') // 这行代码一定要放在最后面
```

### element-plus

[element-plus官方文档](https://element-plus.gitee.io/#/zh-CN)

#### 安装

```shell
npm install element-plus --save
```

####  完整引入

 在 main.js 中写入以下内容 

```js
import { createApp } from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
```

#### 按需引入

新建  `src/plugin/element-plus.js`  文件

```js
import { ElInput, ElButton } from 'element-plus'
import 'element-plus/packages/theme-chalk/src/button.scss'
import 'element-plus/packages/theme-chalk/src/input.scss'

export default function (app) {
    app.use(ElInput)
    app.use(ElButton)
}
```

在 `main.js`  中引入,这里的 @ 已经在 vite.config,js 中配置过别名

```js
import { createApp } from 'vue'
import ElementPlus from '@/plugins/element-plus';
import App from './App.vue';

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
```

###  完整组件列表

 完整组件列表和引入方式（完整组件列表以 [reference](https://github.com/element-plus/element-plus/tree/dev/packages) 为准），下面这个配置对以上两个版本的 element 通用

```js
import {
  ElAlert,
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBacktop,
  ElBadge,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElButton,
  ElButtonGroup,
  ElCalendar,
  ElCard,
  ElCarousel,
  ElCarouselItem,
  ElCascader,
  ElCascaderPanel,
  ElCheckbox,
  ElCheckboxButton,
  ElCheckboxGroup,
  ElCol,
  ElCollapse,
  ElCollapseItem,
  ElCollapseTransition,
  ElColorPicker,
  ElContainer,
  ElDatePicker,
  ElDialog,
  ElDivider,
  ElDrawer,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElFooter,
  ElForm,
  ElFormItem,
  ElHeader,
  ElIcon,
  ElImage,
  ElInput,
  ElInputNumber,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElOption,
  ElOptionGroup,
  ElPageHeader,
  ElPagination,
  ElPopconfirm,
  ElPopover,
  ElPopper,
  ElProgress,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElRate,
  ElRow,
  ElScrollbar,
  ElSelect,
  ElSlider,
  ElStep,
  ElSteps,
  ElSubmenu,
  ElSwitch,
  ElTabPane,
  ElTable,
  ElTableColumn,
  ElTabs,
  ElTag,
  ElTimePicker,
  ElTimeSelect,
  ElTimeline,
  ElTimelineItem,
  ElTooltip,
  ElTransfer,
  ElTree,
  ElUpload,
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
} from 'element-plus';
```

## 封装Axios

### 安装

```shell
npm install axios --save
```

### 封装

-  `axios.create` 表示创建一个新的 `axios` 来发送请求，我们可以对这个新创建的 axios 进行封装
  - `baseURL` 可以设置请求地址的前缀，在多个环境下开发时可以根据不同请求前缀请求不同环境的接口地址，设置有 `baseURL`  参数后，我们进行请求时设置的 `url` 地址就不要在携带前缀了，否则会出错
  - `timeout:5000` 表示接口超时时间，超过 5 秒不返回接口表示接口超时
- `service.interceptors.request.use(req,err)` 表示请求拦截器，表示在发送请求前做的事情
  - 接收两个参数，第一个表示成功时进来的方法，可以设置请求头等信息，最后一定要返回接收的参数名
  - 第二个表示请求失败
- `service.interceptors.response.use(res,err)` 表示响应拦截器，接口请求成功后做的事情
  - 第一个参数表示响应成功时执行的方法，可以对接口返回的数据进行判断
  - 第二个参数表示响应失败时执行的方法，可以进行统一的错误处理
- 最后别忘了将我们创建出来的 `axios` 导出。也就是下面代码中的 `service`

```js
import axios from "axios";
import { Message, Msgbox } from "element3";
import store from "@/store"; // 使用 Vuex

// 创建axios实例
const service = axios.create({
  // 在请求地址前面加上baseURL
  baseURL: import.meta.env.VITE_BASE_API,
  // 当发送跨域请求时携带cookie
  // withCredentials: true,
  timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 指定请求令牌
    // if (store.getters.token) {
    // // 自定义令牌的字段名为X-Token，根据咱们后台再做修改
    // config.headers["X-Token"] = store.getters.token;
    // }
    config.headers["X-Token"] = "my token";
    return config;
  },
  (error) => {
    // 请求错误的统一处理
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * 通过判断状态码统一处理响应，根据情况修改
   * 同时也可以通过HTTP状态码判断请求结果
   */
  (response) => {
    // response.data 是接口返回的数据结果
    const res = response.data;

    // 如果状态码不是20000则认为有错误
    if (res.code !== 20000) {
      Message.error({
        message: res.message || "Error",
        duration: 5 * 1000,
      });

      // 50008: 非法令牌; 50012: 其他客户端已登入; 50014: 令牌过期;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 重新登录
        Msgbox.confirm("您已登出, 请重新登录", "确认", {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          store.dispatch("user/resetToken").then(() => {
            location.reload();
          });
        });
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;

```

### 使用

```js
import request from "utils/request";

return request({
    // 设置请求的地址，无需再添加 baseURL 前缀
    url: "/getUsers",
    method: "get",
    // get请求的参数可以这样传递
    params: {
      page: 1,
      limit: 5,
    },
}).then(({ data, total }) => { // 使用解构直接获取数据
    // 设置列表数据
    state.list = data;
    state.total = total;
}).finally(() => {
    state.loading = false;
});
```

## script 标签中的 setup 属性

封装 `testServer.js` 方法

```js
import request from "utils/request.js";

const getUsers = async () => {
  return await request("getusers");
};

export { getUsers };

```

### 使用 setup 属性

导入 `testServer.js` 并使用

```vue
<template>
  <div>
    <div>学生姓名</div>
    <div v-for="item in userlist">
      {{ item.name }}
    </div>
    <el-button @click="getStudent">点击获取学生</el-button>
  </div>
</template>

<script setup>
// script 并且添加 setup 属性后，js 里面声明的响应式变量不需要在添加 return 返回
import { reactive, ref, toRefs, onMounted } from "vue";
import { getUsers } from "./testServer";
const userlist = ref(null);
const getStudent = async () => {
  userlist.value = (await getUsers()).data;
};
</script>
```

### 不使用 setup 属性

```vue
<template>
  <div>
    <div>学生姓名</div>
    <div v-for="item in userlist">
      {{ item.name }}
    </div>
    <el-button @click="getStudent">点击获取学生</el-button>
  </div>
</template>

<script>
import { reactive, ref, toRefs, onMounted } from "vue";
import { getUsers } from "./testServer";
export default {
  setup(props) {
    const userlist = ref(null);
    const getStudent = async () => {
      userlist.value = (await getUsers()).data;
    };
    // 需要在 setup 方法底部返回页面中用到的变量和方法
    return {
      userlist,
      getStudent,
    };
  },
};
</script>
```

页面效果相同

![image-20210428092316437](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vite/10.png)

## 配置多级路由

首先文件目录结构如下

![image-20210428093524320](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vite/11.png)

`twoPage.vue` 文件只有一个 `router-view` 标签

![image-20210428093622258](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vite/12.png)

设置 `router/index.js` 文件

```js
{
    path: "/testSystem",
    component: Layout,
    redirect: "/testSystem/promise",
    meta: { title: "系统测试", icon: "el-icon-s-home" },
    children: [
      {
        path: "promise",
        component: () => import("views/testSystem/promise.vue"),
        meta: { title: "promise语法糖", icon: "el-icon-s-home" },
      },
      {
        path: "pages",
        // 点击 二级菜单 面包屑时重定向到 三级菜单1
        redirect: "/testSystem/pages/item1",
        component: () => import("views/testSystem/twoPage.vue"),
        meta: { title: "二级菜单", icon: "el-icon-s-home" },
        // 根目录下添加 children 数组，里面添加对应的子菜单
        children: [
          {
            path: "item1",
            component: () => import("views/testSystem/therePage/item1.vue"),
            meta: { title: "三级菜单1", icon: "el-icon-s-home" },
          },
          {
            path: "item2",
            component: () => import("views/testSystem/therePage/item2.vue"),
            meta: { title: "三级菜单2", icon: "el-icon-s-home" },
          },
        ],
      },
    ],
 },
```

效果展示

![image-20210428093952845](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vite/13.png)

## watch 和 watchEffect

### 解决警告信息

记录一次因为使用 watch 不当造成的警告，首先看下图发生的警告

![image-20210428104012351](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vite/14.png)

造成警告的代码

```js
// 根据 router 动态生成面包屑
getBreadcrumb();
// 监听router，只要router发生变化就执行一次当前面包屑的方法
watch(route, getBreadcrumb);
```

警告内容

```js
[Vue warn]: Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.

[Vue警告]：避免依赖于枚举组件实例上的键的应用程序逻辑。在生产模式下，这些键将为空，以避免性能开销。
```

上网查询答案找到了 **尤大大** 的亲自解答，下面是解答链接

https://www.gitmemory.com/issue/vuejs/vue-next/2027/685247838

一番看下来原来 `watch(route)`是隐式的`deep: true`，它遍历任意深的属性。因此，从技术上讲，这是预期的行为。另外，仅关心几个属性时深度遍历复杂的对象也是浪费的。所以在必须使用观察者的情况下，仅仅是想监听几个属性的变化，则还应该使用`watchEffect`并避免深入观察：

解决办法

```js
// 使用 watchEffect 监听路由变化，不需要传入要监听的内容，只要发生变化就会执行
watchEffect(() => {
  getBreadcrumb();
});
```

`getBreadcrumb` 方法是用来遍历 `router` 的变化来动态生成面包屑，使用 `watchEffect` 观察 `getBreadcrumb` 方法会在页面加载时自动执行一次，可以自动获取到要监听的那些属性。以后如果这些被监听的属性发生了变化，则会从新调用 `getBreadcrumb` 方法。从而避免了深层次遍历监听，节省性能。

### 两者区别

#### watch

- ​	调用方式 `watch(source,callback,option[可选])` 
  - `source` 可以是表达式，函数，也可以是指定的监听依赖对象
  - `callback` 监听到变化时的回调函数
  - `option` 可选参数，可选参数有
    - `deep` ，是否进行深度监听，如果我们监听的是一个数组，则每个数组值的变化都可以被监听到，但是如果监听的是一个对象，则对象内容属性的变化时不能被监听到的，此时可以将 deep 设置为 true，这表示为对象的每个属性都添加一个观察者，只要有属性发生变化就会执行回调
    - `immediate` ,是否立即执行一次监听。简单说就是页面加载后是否自动执行一次。默认页面加载后不会自动执行，只有被监听的依赖发生变化时才会执行回调。如果想在页面加载后就执行一次回调则可以将 `immediate` 设置为 true

**监听 ref 类型的数据**

```js
import { ref, watch } from "vue";

// watch 监听 ref 类型的数据
let name = ref(null);

// 倒计时1秒改变name的值
setTimeout(() => {
  name.value = "Lisi";
}, 1000);

// 监听 name 变量
watch(name, (newval, oldval) => {
  // 倒计时1秒后执行下面的打印
  console.log(oldval, "变化前的值"); // => null
  console.log(newval, "变化后的值"); // => Lisi
});
```

**监听 reactive 类型的数据**

```js
import { ref, watch, reactive } from "vue";

// 初始化 reactive 类型的数据
const userinfo = reactive({
  name: "张三",
  age: 18,
});

// 倒计时1秒改变name值
setTimeout(() => {
  userinfo.name = "李四";
}, 1000);

// 添加一个方法用来返回要监听的依赖
const watchname = () => {
  return userinfo;
};

// 监听 userinfo 里面的 name 方法
watch(
  watchname,
  (newval, oldval) => {
    // 倒计时1秒后执行下面的打印
    console.log(oldval, "变化前的值"); // => Proxy {name: "李四", age: 18} "变化前的值"
    console.log(newval, "变化后的值"); // => Proxy {name: "李四", age: 18} "变化后的值"
  },
  {
    // 设置 deep 为 true，表示只要 userinfo 对象中的任意属性发生变化都会执行回调
    deep: true,
    // 将 immediate 设置为 true 表示立即执行监听，页面加载后就会触发回调，此时第一次的回调参数为 变化前的值为 null，变化后的值是我们初始化的值
    immediate: true,
  }
);
```

上面代码中我们监听了整个 userinfo 对象，所以回调函数返回的是一个对象类型

如果我们只想监听对象的**某一个**属性，则可以这样写。由于我们只是监听的一个具体的属性，所以不需要再设置 deep 值为 true

```js
import { ref, watch, reactive } from "vue";

// 初始化 reactive 类型的数据
const userinfo = reactive({
  name: "张三",
  age: 18,
});

// 倒计时1秒改变name值
setTimeout(() => {
  userinfo.name = "李四";
}, 1000);

// 添加一个方法用来返回要监听的依赖
const watchname = () => {
  return userinfo.name;
};

// 监听 userinfo 里面的 name 方法
watch(watchname, (newval, oldval) => {
  // 倒计时1秒后执行下面的打印
  console.log(oldval, "变化前的值"); // => 张三 "变化前的值"
  console.log(newval, "变化后的值"); // => 李四 "变化后的值"
});
```

#### watcheffect

- 使用方法 `watchEffect( () => callback )` 不需要传入依赖
- 使用 `watchEffect` 监听会在页面加载时自动执行一遍并且自动获取要监听的依赖
- 如果依赖发生变化执行内部回调

使用方法

```vue
<template>
  <div>{{ newuser }}</div>
  <div>
    <el-button type="success" @click="changeName"> 点击改变姓名 </el-button>
  </div>
</template>

<script setup>
import { ref, watch, reactive, watchEffect } from "vue";

// 使用 watchEffect 监听数据
const userinfo = reactive({
  name: "李四",
  info: {
    age: 18,
    height: 180,
  },
});
let newuser = ref('');

// 点击按钮改变对象值
const changeName = () => {
  userinfo.info.age++;
};

// 根据 userinfo 对象的值拼接字符串
const printUser = () => {
  newuser.value += `${userinfo.name}今年${userinfo.info.age}岁 \n`;
};

// 使用 watchEffect 进行数据监听
watchEffect(() => {
  console.log('监听到变化');
  // 自动调用方法并获取依赖
  // 依赖发生变化后执行方法
  printUser();
});
</script>
```

![image-20210428165735232](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vite/15.png)



点击按钮 age ++ ，同时 watcheffect 监听到了 age 变化，执行追加方法显示在页面中

## vite2设置数据代理

设置好代理后，当请求以下面配置的开头时，实际上访问的是代理设置的接口地址

```js
export default {
  server: {
    proxy: {
      // 简写形式
      '/foo': 'http://localhost:4567/foo',
      // 可配置属性
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        // secure: false,  // 如果是https接口，需要配置这个参数,不是的话不用配置
      },
      // 使用正则匹配路径
      '^/fallback/.*': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, '')
      }
    }
  }
}
```

## axios发送文件，使用node接受并保存

首先编写发送文件的代码

```vue
<template>
  <div>
    <input type="file" style="display: none" id="fileinput" />
    <el-button type="success" @click="selectFile">选择文件</el-button>
    <span>{{ file ? file.name : "" }}</span>
    <div class="image-style">
      <img :src="imgurl" alt="" />
    </div>
    <p v-show="imgurl">图片地址：{{ imgurl }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import http from "axios";
// 文件选择框
let fileinput = ref(null);
// 存放文件
let file = ref(null);
// 图片地址
let imgurl = ref(null);

// 选择文件方法
function selectFile() {
  fileinput.value = document.getElementById("fileinput");
  fileinput.value.click();
  // 文件选中时触发
  fileinput.value.addEventListener("change", () => {
    // 获取到选择的文件
    file.value = fileinput.value.files[0];
    // 执行上传方法
    uploadFile(file.value);
  });
}
// 执行上传方法
function uploadFile(file) {
  console.log(file);
  const forms = new FormData();
  forms.append("file", file);
  const configs = {
    baseURL: "/nodeapi",
    headers: { "Content-Type": "multipart/form-data" },
  };
  http.post("/uploadfile", forms, configs).then((res) => {
    console.log(res);
    imgurl.value = res.data.url
  });
}
</script>

<style lang="scss">
.image-style {
  width: 500px;
  img {
    width: 100%;
  }
}
</style>
```

接下来重点，我们新建一个 node 项目,[源码地址](https://gitee.com/szxio/nodejs-learning/tree/master/node%E6%8E%A5%E6%94%B6%E6%96%87%E4%BB%B6%E5%B9%B6%E4%BF%9D%E5%AD%98)，编写一个接受文件的接口

首先新建一个文件夹

```js
npm init -y
```

然后安装 express 和 multiparty，

```shell
npm install express multiparty --save
```

multiparty 可以解析具有content-type的http请求`multipart/form-data`，也称为文件上传。 

下面为文件的读取和保存方法

```js
const fs = require('fs')
const path = require('path')

function savefile(file) {
    return new Promise((resolve, reject) => {
        try {
            // 定义文件存储地址
            let savepath = path.resolve(__dirname, `../public/${file.originalFilename}`)
            // 获取文件来源地址
            let sourcepath = file.path

            // 创建读写流
            let readStream = fs.createReadStream(sourcepath)
            // 将读取到的文件流写入到要保存的目录中
            let writeStream = fs.createWriteStream(savepath)

            // 开始读取来源文件
            readStream.pipe(writeStream)

            // 监听读取完成事件
            readStream.on('end', () => {
                // 读取完成后释放资源
                fs.unlinkSync(sourcepath)
                // 返回成功响应
                resolve({
                    code: 0,
                    message: '文件上传成功',
                    url: `http://127.0.0.1:4000/${file.originalFilename}`
                })
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    savefile
}
```

生成接口

```js
const express = require('express')
const app = express()
const path = require('path')
const multiparty = require('multiparty')
const { savefile } = require('./util/saveFile')
app.use(express.static(path.join(__dirname, 'public')))

// 接收文件的方法
app.post('/uploadfile', (req, res) => {
    let form = new multiparty.Form();
    form.parse(req, async function (err, fields, files) {
        // 这里的files是接收到的文件列表，相当于FileList
        // 对于上传单个文件，取数组里面的第一项
        let file = files.file[0];
        let result = await savefile(file)
        res.status(200).json(result)
    });
})


app.listen(4000, () => {
    console.log("running 127.0.0.1:4000");
})
```

执行效果

![1620037966820](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vite/16.png)































