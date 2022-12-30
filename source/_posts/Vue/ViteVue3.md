---
title: vite 快速上手
tags: Vue
categories: vite
abbrlink: 5a643c63
date: 2021-03-05 00:00:00
---

## 使用 vite 创建 vue3 项目
通过在终端中运行以下命令，可以使用 Vite 快速构建 Vue 项目。
```
$ npm init vite-app <project-name>
$ cd <project-name>
$ npm install
$ npm run dev
```
或者 yarn：

```
$ yarn create vite-app <project-name>
$ cd <project-name>
$ yarn
$ yarn dev
```

## vue3.0入门
* `setup()` 函数,接收两个参数，分别是 props，context,该函数是页面的入口函数，返回页面中用到的响应式数据

* `ref` 用来声明一个响应式的普通值类型。包含：`string、number、Boolean、null、undefined`等
```js
import {ref} from "vue";
setup(){
    const msg = ref("hello world")
    return{
        msg
    }
}
```
* `reactive` 用来声明响应式的引用类型。包含：`object、array`等
```js
import {reactive} from "vue";
setup(){
    const msg = reactive({
        title:"Hello World"
    })
    return{
        msg
    }
}
```
* `onMounted` 页面加载时触发
```js
setup(){
    // 页面加载触发
    onMounted(() => {
        timer.value = setInterval(() => {
        data.counter++;
        }, 1000);
    });
}
```
* `onUnmounted` 页面销毁时触发
```js
setup(){
    // 页面销毁
    onUnmounted(() => {
        clearInterval(timer.value);
    });
}
```
* `computed` 计算属性,当数据更改时自定触发计算方法
```js
setup(){
    // 当data.counter发生变化时，自动触发计算属性使 data.doubleCounter的值是data.counter的2倍
    const data = reactive({    
        counter:1,   
        doubleCounter: computed(() => data.counter * 2),
    });
    return{
        data
    }
}
```

* `toRefs` 将响应式对象转换为普通对象，在解构响应式的引用类型是不会丢失响应式
```js 
setup(){
    const state = reactive({
        foo:1,
        bar:2
    })
    // 如果不加toRefs，则解构后响应式会丢失
    const {foo,bar} = toRefs(state)
    return{
        foo,
        bar
    }
}
```

* `watch` 监听数据变化并触发方法
  * watch 函数接收两个参数
  * 第一个参数时要监听的数据
  * 第二个是一个函数，函数有两个参数，第一个参数是最新的值，* 第二个是修改前的值
  * 监听的数据发生变化后执行函数里面的方法
```js
setup(){
    const tagP = ref("");
    const counter = ref("")
    /*
        watch 函数接收两个参数
        第一个参数时要监听的数据
        第二个是一个函数，函数有两个参数，第一个参数是最新的值，第二个是修改前的值
        监听的数据发生变化后执行函数里面的方法
    */
    watch(counter, (newVal, oldVal) => {
        tagP.value.innerHTML = `from ${oldVal} to ${newVal}`;
    });
    return {
        tagP
    };
}
```
## 设置全局组件
在 main.js 中引入设置的组件地址
``` js
import libComponent from "./view/libComponent.vue"
import libComponent2 from "./view/libComponent2.vue"
```
然后更改 createApp
```js
createApp(App)
    // myDiv 是全局组件名称,h 是从vue中导出的函数
    .component("myDiv", {
        render: () => {
            return h(libComponent)
        }
    })
    .component("myDiv2", {
        render: () => {
            return h(libComponent2)
        }
    })
    .mount('#app')
```
然后在页面中使用 `myDiv` 标签即可显示全局组件，声明多个公共组件时，写多个`component` 即可

公共组件接收参数:组件页面利用`props`接收参数
```js
<template>
    <div>
        页面标题：{{title}}
    </div>
</template>
<script>
export default {
    props:["title"]
}
</script>
```
使用组件时传入参数
  * `myDiv` 已经声明成了全局组件，所以在页面中无需 `components` 注册
```js
// myDiv 已经声明成了全局组件，所以在页面中无需 components 注册
<myDiv title="引入标题"></myDiv>
```

## API 可做摇树优化
* `vue2.0` 的 `nextTick` 写法,挂载到了 Vue 上,无论用到与否，都会挂载到全局上，就会形成所谓的 dead code(死代码),这种 dead code 无法被 webpack 的 tree-shaking 排除掉。
```js
import Vue from "vue"

export default {
    mounted(){
        Vue.nextTick(()=>{
            // code
        })
    }
}
```

* 在 vue3.0 中做出相应优化，将他们抽离成为独立的函数，这样打包工具的摇树优化可以将这些 dead code 排除掉
```js
import { nextTick } from "vue"

export default {
    setup(){
        nextTick(()=>{
            // code
        })
    }
}
```
* 受影响的api
  * Vue.nextTick
  * Vue.observable (`Vue3.0中替换为 ：reactive`)
  * Vue.version
  * Vue.compile 
  * Vue.set 
  * Vue.delete 


## v-model 修饰符，子组件修改传入参数并实时响应
* vue3.0 中删除了 `v-model` 和 `v-bind` 的 `sync` 修饰符，取而代之的是在 `v-model` 后加上参数来使用

首先在组件中接收父组件传递过来的参数，并且点击div使对参数进行修改，修改的数据做到子父组件双向绑定
```html
<template>
  <div @click="$emit('update:conten', conten + 1)">
    点我++ ： {{ conten }}
  </div>
</template>
<script>
export default {
  props: ["conten"],
};
</script>
```
  
vue3.0的写法,直接在v-model后面跟上冒号和子组件接收的参数字段，并且传入一个初始数据
```js
<ModelTest v-model:conten="modelcounter"></ModelTest>

import { ref } from "vue"
import ModelTest from "./ModelTest.vue"
setup(){
    let modelcounter = ref(0);
    return{
        modelcounter
    }
}
```
**注意：如果v-model后没有参数时，在子组件内部接收的参数名为默认值：modelValue**

举例如下：

父组件
```js
<ModelTest v-model="counter"></ModelTest>

import { ref } from "vue"
import ModelTest from "./ModelTest.vue"
setup(){
    let counter = ref(0);
    return{
        counter
    }
}
```
子组件
```html
<template>
  <div @click="$emit('update:modelValue', modelValue + 1)">
    点我++ ： {{ modelValue }}
  </div>
</template>
<script>
export default {
  props: ["modelValue"],
};
</script>
```


vue2.0的写法,需要手动添加 update:conten 方法，并且在方法内编写数据修改逻辑
```html
<template>
    <ModelTest :conten="modelcounter" @update:conten="modelcounter = $event"></ModelTest>
</template>
```

## 渲染函数 render 以及插槽 slot 的基本使用方法
vue3.0中 `render` 函数不在接收 `h` 函数，改用手动导入 `h` 的方式,使用 `components` 注册一个自定义组件，使用`render` 渲染自定义组件内容，`setup` 函数返回的数据会挂载到 `ctx` 参数上，`render` 函数接收一个 `ctx` 参数，`render` 返回一个 `h` 函数，`h` 函数声明自定义组件的内容以及逻辑。

* h 函数接收三个参数
  * 第一个参数是元素标签
  * 第二个参数时元素的属性以及元素方法
  * 第三个参数时元素的值

```js
components: {   
    RenderTest: {
      props: ["renderMsg"],
      // setup 的第二个参数可以解构为 emit slots attrs
      setup(props, { emit, slots }) {
        // 更新父组件值的方法
        const changePros = () => {
          emit("update:renderMsg", props.renderMsg + 1);
        };
        // 获取插槽
        const headerSlot = slots.header();
        return {
          changePros,
          headerSlot,
        };
      },
      render(ctx) {
        const renderMsg = this.renderMsg;
        return h("div", [
          h(
            "div",
            {
              onClick: ctx.changePros,
            },
            `点我++ ： ${renderMsg}`,          
            // this.$slots.header(),
            // 等同于以上写法
            ctx.headerSlot
          ),
        ]);
      },
    },
  },
```

**setup 的第二个参数可以解构为 emit slots attrs**

自定义完组件后再dem中使用,并且给自定义组件传递参数。同时利用插槽插入元素
```html
<template>
    <RenderTest v-model:renderMsg="modelcounter">
        <template v-slot:header>
            <div>具名插槽 slots.header() 获取值</div>
        </template>
    </RenderTest>
</template>
```

## 函数式组件的声明方式(不推荐，仅了解)，推荐使用状态组件

首先创建 Functional.vue ，编写如下代码
```html
<script>
import { h } from "vue";

const Heading = (props, context) => {
  return h(`h${props.level}`, context.attrs, context.slots);
};

Heading.props = ["level"];

export default Heading;
</script>
```
接着在页面中注册并传递参数
```html
<!-- 函数式组件的声明方式 -->
<Functional :level="modelcounter">动态h元素</Functional>

<script>
import Functional from "./Functional.vue";
import { ref } from "vue";
export default {
    components:{
        Functional
    },
    setup(){
        const modelcounter = ref(1);
        return{
            modelcounter
        }
    }
}
</script>

```

## defineAsyncComponent 异步加载组件
声明异步组件时用 `defineAsyncComponent` 函数包起来，和函数式组件区分开来

```html
<template>
    <!-- 异步组件 -->
    <AsyncPage></AsyncPage>
</template>
<script>
import { defineAsyncComponent } from "vue";
components:{
    AsyncPage: defineAsyncComponent(() => import("./NextPage.vue"))
}
</script>
```
## 使用 directive 自定义指令
* 使用 `directive` 函数自定义指令，`directive` 接收两个参数，分别如下：
    * 第一个参数声明指令名称，在使用时前面要加上 `v-`
    * 第二个参数是一个对象，里面添加指令的触发时机，具体如下：
        * created: 元素创建时
        * beforeMount: 元素插入视图之前
        * mounted: 元素插入视图之后
        * beforeUpdate: 元素更新之前
        * updated: 元素插入视图之后
        * beforeUnmount: 元素销毁前
        * unmounted: 元素销毁后
        * 
**每个声明周期函数都有三个参数，el（元素本身）、binding（自定义指令等于的值）、vnode（虚拟dom描述），具体使用方法：**

在 `main.js` 中的 `createApp(App)` 方法后链式调用 `directive` 方法，编写自定义指令，`bgColor` 为自定义指令名称

**方式一：链式调用**
```js
createApp(App)   
    .directive("bgColor",{
        // 组件加载前
        beforeMount(el,binding,vnode){  
            el.style.backgroundColor = binding.value;           
        }
    })
    .mount('#app')
```

**方式二：分开调用**
``` js
let app = createApp(App)
app.directive('bgColor', {
    // 组件加载前
    beforeMount(el,binding,vnode){  
        el.style.backgroundColor = binding.value;           
    }
})
```
在全局中采用 `v-<createName>='xxx'` 的方式使用

```html
<template>
    <p v-bgColor="'red'">使用自定义命令改变背景色</p>
</template>
```

### 也可以在单个组件中设置自定义指令
``` js
export default {
    // 自定义 test 命令, 可以自定义多个命令
    directives: {
        "test": {
            beforeMount(el, binding) {               
                el.style.fontSize = binding.value;
            },
        },
        "test2": {
            beforeMount(el, binding) {
               // ...
            },
        },
    },
}
```
在组件内部使用
``` html
<template>
    <!-- 内部自定义命令 -->
    <div v-test="'30px'">组件内部自定义命令</div>
    <!-- 全局自定义命令和内部自定义命令同时使用 -->
    <b v-bgColor="'green'" v-test="'30px'">使用自定义指令</b>
</template>
```
## vueCompilerOptions 设置自定义组件白名单
有时候利用 render 函数自定义渲染容器时声明了一些自定义组件名，页面中可以正常使用，但是控制台会报一些警告信息，此时在 vite.config.js 文件中使用 vueCompilerOptions 声明自定义组件白名单。
``` js
module.exports = {
    vueCompilerOptions: {
        // piechart 为自己定义的组件名
        isCustomElement: tag => tag === 'piechart'
    }
}
```
设置完毕后重新启动便不再有警告信息。

## transition类名变更
vue3.0 中的 transition 动画类型发生了一些变化，更加语义化
* v-enter → v-enter-from
* v-leave → v-leave-from

**完整示例：点击按钮控制元素隐藏和显示，同时显示过度动画**
``` html
<template>
  <div>
    <button @click="show = !show">Taggle</button>
    <transition appear name="fade">
      <div v-if="show" class="fade">点击上面按钮查看动画</div>
    </transition>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    const show = ref(true);   
    return {
      show,
    };
  },
};
</script>

<style scoped>
.fade {
  font-size: 20px;
  font-weight: 700;
  color: tomato;
}

/* 
fade-leave-to : 动画结束后的样式，原有样式 -->  结束样式
 解释：从原来的20大小，放大到50大小，并且把透明度设置为0，然后隐藏

fade-enter-from : 动画开始的样式，开始样式 -->  原有样式
 解释：从 50 大小并且透明为0的情况下，变回原来的20大小，然后显示出来
 */
.fade-leave-to,
.fade-enter-from {
  opacity: 0;
  font-size: 50px;
}

/* 
动画开始和结束的过度时间
 */
.fade-enter-active,
.fade-leave-active {     
  transition: 0.4s ease;
}

</style>
```

## keyCode 作为 v-on 修饰符被移除

vue3.0中的keyCode作为修饰符被移除，改用具体的按键名代替
```html
<!-- vue3.0写法 -->
<input type="text" v-model="inputText" v-on:keyup.enter="alertInputText">

<!-- vue2.0写法 -->
<input type="text" v-model="inputText" v-on:keyup.13="alertInputText">
```
```js
import { ref } from "vue"

setup(){
    let inputText = ref("")
    // 输入框按下回车是弹出输入框的值
    const alertInputText = ()=>{
        alert(inputText.value)
    }
    return{
        inputText,
        alertInputText
    }
}
```

## 使用 mitt 完成事件派发和监听
* 首先安装 mitt
```
npm intall mitt -D
```
* 安装完成后在 util -> mitt.js 文件中进行初始化并导出
``` js
import mitt from "mitt"

const emitter = mitt();
export default emitter
```

* 使用 emitter.emit() 完成事件的派发  
```js 
import emitter from "../util/mitt.js";

emitter.emit("helloPageEmitFun", inputText.value);
```
* 使用 emitter.on() 监听事件
```js 
import emitter from "../util/mitt.js";
import { onMounted } from "vue";
export default {
  setup() {
    // 页面挂载完毕后监听事件
    onMounted(() => {
      // 监听事件,接收参数并触发
      emitter.on("helloPageEmitFun", (value) => {
        console.log(value);
      });
    });
  },
};
```
* 使用 emitter.off() 关闭事件监听
  
首先将监听触发的事件封装成一个单独的函数
```html
 <button @click="unsubHandler">关闭事件监听
```
```js
import emitter from "../util/mitt.js";
import { onMounted } from "vue";
export default {
  setup() {
    // 封装独立的函数
    const watchHandler = (value) => {
      console.log("组件件监听触发！" + value);
    };
    // 页面加载完成后监听事件
    onMounted(() => {
      emitter.on("helloPageEmitFun", watchHandler);
    });
    // 点击按钮取消监听
    const unsubHandler = () => {
      emitter.off("helloPageEmitFun", watchHandler);
    };
    return {
      unsubHandler,
    };
  },
};
```

## vue3 中如何引如 router，以及 vue-router 4 的用法

首先安装 `router`
```
npm install vue-router@next
```
在 `App.vue` 文件中添加 `router-view` 标签

```html
<template>
  <router-view></router-view>
</template>
```
新建 **router -> index.js** 文件，初始化如下，主要变化有两点，应该从 `vue-router` 中导出 `createRouter` 和 `createWebHashhistory` ,并且将 `router` 作为一个实例导出

``` js
import { createRouter, createWebHashHistory } from "vue-router"
import Home from "../components/Home.vue"
import TodoMvc from "../components/todos/index.vue"

const router = createRouter({
    history:createWebHashHistory(),
    routes: [
        {
            path:"/",
            component:Home
        },
        {
            path:"/todomvc",
            component:TodoMvc
        }
    ]
})

export default router
```
在 `main.js` 文件中导入并使用,使用方法就是直接在 `createApp` 方法后面继续调用 `use` 方法，传入`router` 实例
```js
import router from "./router/index"

createApp(App).use(router)
```
最后在页面中完成使用
```html
<ul>
  <li><router-link to="/">首頁</router-link></li>
  <li><router-link to="/todomvc">待辦列表</router-link></li>
</ul>
```
## vue3.0 中 router 的一些新特性

### 1. router.addRoute()添加路由
在 `router -> index.js` 文件中，导出 `router` 之前，可以使用`router.addRoute()`来添加路由，该函数接收两个参数，第一个参数是父页面的name，第二参数是路由，第一个参数可以不写

不声明父页面
``` js
router.addRoute({
    path: "/about",
    name: "about",
    component: About
})
```
页面路径： http://localhost:3000/#/about


声明父页面
``` js
router.addRoute("home",{
    path: "/home/about",
    name: "about",
    component: About
})
```
页面路径： http://localhost:3000/#/home/about

### 2. 点击按钮完成页面跳转

页面跳转并传递参数 
```js
// 从 vue-router 中导出 useRouter
import { useRouter } from "vue-router";

export default {
  setup() {
    // 获取 useRouter 实例
    const router = useRouter();
   
    function goToInfo() {     
      router.push("/about/info?id=123456");
    }
    
    return {
      goToInfo,
    };
  },
};
```

子页面接收路由参数

  * 从 vue-touter 中导出 useRoute，注意要和 useRouter 区分开
```js
// 从 vue-touter 中导出 useRoute
import { useRoute } from "vue-router";
export default {
  setup() {   
    // 获取路由实例
    const route = useRoute();
    // 获取路由参数
    console.log(route.query);    
  },
};

```

### 3. 页面离开之前和路由参数更新后触发函数
```js
import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";
export default {
  setup() { 
    // 路由更新之前触发
    onBeforeRouteUpdate(() => {
      console.log("页面参数已更新")
    });

    // 页面离开之前触发，返回false取消离开
    onBeforeRouteLeave(()=>{
      const isConfirm = window.confirm("是否要离开当前页面");
      if (!isConfirm) {
        return false;
      }
    })
  },
};

```
## router4.0 中的一些变化 （一）
### 1.实例创建方式, history 选项替代了 mode 选项，取而代之的是：
  * createWebHashHistory() 路径后面会携带 # 
  * createMemoryHistory() 服务端渲染用
  * createWebHistory() 路径后面不会携带 # ,便于摇树优化掉无用的 history   
  * base选项移至createWebHashHistory()等方法中作为参数使用
```js
const router = createRouter({
  // 加上参数后可以在所有路径前增加前缀
  history: createWebHistory("/addUrl"),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,           
    },
  ]
})
```

### 2.通配符 `*` 被移除，导航到404页面，使用正则匹配路径，当所有页面匹配不成功时进入404页面

```js
const router = createRouter({
  // 加上参数后可以在所有路径前增加前缀
  history: createWebHistory("/addUrl"),
  routes: [
    // 配置首页，默认进入 / 页面
    {
      path: "/",
      name: "home",
      component: Home,           
    },
    // 设置404页面
    {
      path: "/:pathMath(.*)*",
      name: "not-found",
      component: NotFound
    }
  ]
})
```
### 3.页面跳转完后触发 `router.isReady()`，触发时机在 `onMounted` 之后
```js
// 页面跳转完后触发
router
  .isReady()
  .then((onSuccess) => {
    console.log("页面加载完回调1");
  })
  .catch((onError) => {
    console.log(onError);
  });
```
### 4.scrollBehavior变化，第三个参数记录页面的滚动位置，页面跳转在返回时会重新回到上次的滚动位置。
  * vue2.0 中第三个参数的返回值为 { x:10 , y:10 }
  * vue3.0 中第三个参数的返回值为 { left:10 , top:10 }
```js
const router = createRouter({
    // 加上参数后可以在所有路径前增加前缀
    history: createWebHistory("/addUrl"),
    routes: [
      {
        // ........
      }
    ],
    // 页面跳转页面再返回是，重新回到上次的滚动位置
    scrollBehavior(to, from, position) {
        console.log(position, "页面位置信息");
        if (position) {
            return position;
        } else {
            return {
                top: 0,
                left: 0
            }
        }
    }
})
```
## router4.0 中的一些变化 （二）
### 1.keep-alive 必须写在 vouter-view 标签内部。
  * keep-alive 是作用是缓存组件，例如，商品列表进入详情页时，在返回还是保持上次查询结果
```html
<router-view v-slot="{Component}">
  <keep-alive>
    <component :is="Component"/>
  </keep-alive>
</router-view>
```

### 2.`router-link` 标签上删除了 `tag`、`event`属性，改用如下方式替代，使用插槽的方式，可以自定义跳转的样式，替代默认的a标签

{% note info no-icon %}

需要自定义标签替换a链接时，需要添加 `v-slot="{ navigate }"`，并且添加 `custom` 属性，`to` 属性可加可不加

{% endnote %}

```html
<router-link to="/" v-slot="{ navigate }" custom>
  <h2 @click="goToHome" class="titleColor">首页</h2>
</router-link>
```

## vue3.0中使用vuex
首先安装 vuex4.0 版本
```
npm install vuex@next
```

新建 store -> index.js 文件，初始化代码如下

代码中有两个存储数据 count 和 userName，以及两个方法，addCount（接收参数追加count），setUserName（接收到一个新的名称改变全局存储的userName）
```js
// 从 vuex 中导出 createStore 函数
import { createStore } from "vuex"

const store = createStore({
    // 将全局存储的数据放在 state 函数的返回值中
    state() {
        return {
            count: 0,
            userName: "李四"
        }
    },
    // 存放修改state值的方法，第一个参数是上下文中的state，第二个参数是方法调用时传递过来的参数
    mutations: {
        // 修改 count
        addCount(state, count) {
            state.count += count
        },
        // 修改 userName
        setUserName(state,newUserName) {
            state.userName = newUserName
        }
    }
})

// 导出 store 实例
export default store
```

在 main.js 文件中引入 store/index.js 文件，并挂载到 vue 全局中

```js
import store from "./store/index"

createApp(App).use(store)
```

在页面中使用
```html
<!-- 使用vuex -->
<div>{{ count }} - {{ userName }}</div>
<button @click="add">+10</button>
```

```js
// 从 vuex 中导出 useStore 函数
import { useStore } from "vuex";

export default {
  name: "App", 
  setup() {
    // 获取vuex实例
    const store = useStore();

    // 点击按钮追加count，并修改 userName
    function add() {
      // 使用 store.commit 函数来调用vuex中的值，第一个参数是要调用的方法名，第二参数是传递过去的参数
      store.commit("addCount", 10);
      store.commit("setUserName", "张三");
      console.log(store.state.userName);
    }
    return {
      // 展开 store.state
      ...toRefs(store.state),
      add,
    };
  },
};
```

## 代码规范和格式化 eslint + prettier 规范代码

我们借助eslint规范项目代码，通过prettier做代码格式化。

首先在项目安装如下依赖,在 `package.json` 文件夹下
```js
{
  "scripts": {
    "lint": "eslint \"src/**/*.{js,vue}\""
  },
  "devDependencies": {
    "@vue/eslint-config-prettier": "^6.0.0",
    "babel-eslint": "^10.1.0",
    "eslint": "^6.7.2",
    "eslint-plugin-prettier": "^3.1.3",
    "eslint-plugin-vue": "^7.0.0-0",
    "prettier": "^1.19.1"
  }
}

```
接着在项目根目录添加 `.eslintrc.js` 文件，进行如下配置
```js
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": [
      "warn",
      {
        // singleQuote: none,
        // semi: false,
        trailingComma: "es5",
      },
    ],
  },
};

```
然后继续在根目录添加 `prettier.config.js` 文件，内容如下
```js
module.exports = {
  printWidth: 80, // 每行代码长度（默认80）
  tabWidth: 2, // 每个tab相当于多少个空格（默认2）
  useTabs: false, // 是否使用tab进行缩进（默认false）
  singleQuote: false, // 使用单引号（默认false）
  semi: true, // 声明结尾使用分号(默认true)
  trailingComma: 'es5', // 多行使用拖尾逗号（默认none）
  bracketSpacing: true, // 对象字面量的大括号间使用空格（默认true）
  jsxBracketSameLine: false, // 多行JSX中的>放置在最后一行的结尾，而不是另起一行（默认false）
  arrowParens: "avoid", // 只有一个参数的箭头函数的参数是否带圆括号（默认avoid）
};

```
然后 `npm install` 安装一下新增的依赖，安装成功后重启项目。打开任意文件，格式化之后查看配置项是否生效，运行 `npm run lint` 检查错误项

## 测试环境
利用jest和@vue/test-utils测试组件

安装依赖
```js
"jest": "^24.0.0",
"vue-jest": "^5.0.0-alpha.3",
"babel-jest": "^26.1.0",
"@babel/preset-env": "^7.10.4",
"@vue/test-utils": "^2.0.0-beta.9"
```
配置 `babel.config.js`

```js
module.exports = {
  presets: [
    [
      "@babel/preset-env", { 
        targets: { 
          node: "current" 
        } 
      }
    ]
  ],
};
```

配置 `jest.config.js`
```js
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\js$": "babel-jest",
  },
  moduleFileExtensions: ["vue", "js", "json", "jsx", "ts", "tsx", "node"],
  testMatch: ["**/tests/**/*.spec.js", "**/__tests__/**/*.spec.js"],
  moduleNameMapper: {
    "^main(.*)$": "<rootDir>/src$1",
  },
};
```

设置启动命令 
```js
"test": "jest --runInBand"
```

新建测试代码 `tests/example.spec.js`
```js
import HelloWorld from "main/components/HelloWorld.vue";
import { shallowMount } from "@vue/test-utils";

describe("aaa", () => {
  test("should ", () => {
    const wrapper = shallowMount(HelloWorld, {
      props: {
        msg: "hello,vue3",
      },
    });
    expect(wrapper.text()).toMatch("hello,vue3");
  });
});

```

lint配置添加jest环境，要不然会有错误提示：
```js
module.exports = {
  env: {
    jest: true
  },
}
```

将`lint、test`和`git`挂钩
```js
npm i lint-staged yorkie -D
```
```js
"gitHooks": {
  "pre-commit": "lint-staged",
  "pre-push": "npm run test"
},
"lint-staged": {
  "*.{js,vue}": "eslint"
},
```

## 使用ts
vite可直接导入 .ts 文件，在 `script` 标签中通过 `<script lang="ts">` 使用

范例
```html
<template>
  <div>
    {{ userName }}
    <ul>
      <li v-for="item in state" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
// 从 vue 中导出 defineComponent
import { defineComponent, ref } from "vue";

// 添加数组类型约束
interface Course {
  id: number;
  name: string;
}

export default defineComponent({
  setup() {
    // 限制对象类型
    const state = ref<Course[]>([]);
    // 限制单个值的数据类型
    const userName = ref<string>("");
    setTimeout(() => {
      // userName.value = 5;  赋值类型和约定的类型不符时报错
      userName.value = "李四";
      state.value.push({
        id: 1,
        name: "李四",
      });
    }, 1000);
    return {
      state,
      userName,
    };
  },
});
</script>
```

此外，还应该在 `package.json` 中声明 `ts` 的版本 
```js
"devDependencies": {    
  "typescript": "^3.9.7"
}
```
然后在根目录新建 `tsconfig.json` 文件作为 `ts` 的配置文件
```js
{
    "compilerOptions": {
        "target": "esnext",
        "module": "esnext",
        "moduleResolution": "node",
        "isolatedModules": true,
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "experimentalDecorators": true,
        "lib": [
            "dom",
            "esnext"
        ]
    },
    "exclude": [
        "node_modules",
        "dist"
    ]
}
```

## vite 项目配置
首先应该在根目录新建 `vite.config.js`
### 1. 给导入文件的路径起别名
起别名可以避免出现大量的嵌套导入

`vite.config.js` 文件中配置如下信息
```js
const path = require("path")
module.exports = { 
    // 给导入的地址起别名，避免出现大量的嵌套引入
    alias: {
        // 路径映射必须以 / 开头和结尾
        "/comp/": path.resolve(__dirname, "src/components")
    }
}
```
配置完之后重启项目

在页面中使用
```js
// 使用具体地址导入
import HelloWorld from "./components/HelloWorld.vue";

// 使用别名导入
import HelloWorld from "/comp/HelloWorld.vue";

```

### 2. 设置代理
```js
export default {
  proxy: {
    '/api': {
      target: 'http://jsonplaceholder.typicode.com',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    }
  }
}
```
使用
```js
fetch("/api/users")
  .then(response => response.json())
  .then(json => console.log(json));
```
### 扩展： `fetch` 理解
* fetch是全局量window的一个方法，第一个参数为URL。
* url参数是必须要填写的，option可选，设置fetch调用时的Request对象，如method、headers等
  * method - 支持 GET, POST, PUT, DELETE, HEAD
  * url - 请求的 URL
  * headers - 对应的 Headers 对象
  * body - 请求参数（JSON.stringify 过的字符串或’name=jim\u0026age=22’ 格式) 
 * fetch()方法与XMLHttpRequest类似，fetch也可以发起ajax请求，但是与XMLHttpRequest不同的是，fetch方式使用Promise，相比较XMLHttpRequest更加的简洁。
 * fetch方法的then会接收一个Response实例，值得注意的是fetch方法的第二个then接收的才是后台传过来的真正的数据，一般第一个then对数据进行处理等。

post 请求方法
```js
  fetch("/users.json", {
    method: "POST",
    body: JSON.stringify({
      email: "huang@163.com",
      name: "jim",
    }),
  })
  .then(response => response.json())
  .then(res=>{
    console.log(res)
  });
```

get 请求方法
```js
fetch("/api/users")
  .then(response => response.json())
  .then(json => {
    console.log(json);
  });
```

### 3. 数据mock
安装依赖
```js
npm i mockjs -S  
npm i vite-plugin-mock cross-env -D
```

引入插件，`vite.config.js`
```js
plugins: [
  createMockServer({
    // 默认支持ts，由于我们是js环境，所以设置为false
    supportTs: false,
  }),
],
```

需要注意一点，使用mock时要设置环境变量 `package.json`,否则运行不起来 mock
```js
"dev": "cross-env NODE_ENV=development vite"
```
创建 `mock` 文件，`mock/test.js`
```js
export default [
  {
    url: "/api/users",
    method: "get",
    response: req => {
      return {
        code: 0,
        data: [
          {
            name: "tom",
          },
          {
            name: "jerry",
          },
        ],
      };
    },
  },
  {
    url: "/api/post",
    method: "post",
    timeout: 2000,
    response: {
      code: 0,
      data: {
        name: "vben",
      },
    },
  },
];
```