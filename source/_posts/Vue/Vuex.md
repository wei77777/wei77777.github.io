---
title: Vuex 使用和进阶
tags: Vue
categories: vue杂谈
abbrlink: 95492cca
date: 2022-03-27 16:23:26
---
## Vuex 使用和进阶

### 安装

```shell
npm install vuex -S
```

在根目录添加 `store/index.js`

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```

在 `main.js` 中引入

```js
import Vue from 'vue'
import App from './App.vue'
import store from './store'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
```

### 运行原理

首先来看一下vuex的运行原理图

![Snipaste_2022-03-24_11-04-59.png](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-03-24_11-04-59.png)



- Vue Components 使我们的组件，组件会触发（dispatch）一些事件或动作（Actions）
- 我们在组件中触发动作肯定是想获取Vuex中数据或者改变Vuex中的数据，但是数据是集中管理的，不能直接被修改。所以我们把这个动作提交（Commit）到Mutations 中
- 然后 Mutations 去修改（Mutate）State 中的数据
- 当 State 中的数据发生变化时会重新渲染（Render） 组件

### 核心方法

Vuex的核心是 store（仓库），相当于一个容器。一个 Store 的实例中有如下几个属性：

- state：定义属性（状态、数据）
- getters：用来获取数据
- actions：用来定义动作，动作中编写了如何改变state中的数据
- commit：提交变化，处理状态的改变
- mutations：定义变化，处理数据的改变
- mapGetters：用来获取数据
- mapActions：用来获取方法

### 读取数据

首先编写数据，往 `store/index.js` 中写入代码

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 定义数据
const state = {
  name: '张三'
}

// 导出vuex的实例
export default new Vuex.Store({
  state
})
```

#### 方式一：

直接通过 `this.$roter.state.name` 来获取

```html
<template>
  <div>
    // 页面渲染出来是 张三
    {{ $store.state.name }}
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    console.log(this.$store.state.name) //=> 张三
  }
}
</script>
```

#### 方式二：

通过vuex提供的 `mapGetters` 来获取数据。在 `store/index.js` 中编写 `getters` 并导出

![Snipaste_2022-03-24_13-15-35.png](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-03-24_13-15-35.png)

然后再页面中使用

```html
<template>
  <div>
    <div>{{ $store.state.name }}</div>
    <div>{{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['name'])
  },
  mounted() {
    console.log(this.$store.state.name) //=> 张三
  }
}
</script>
```

### 修改数据

这里我们使用是在 actions 中通过 commit 的方式来修改数据，这是为了更好的追踪状态变化。也是官方推荐的做法

在 `store/index.js` 中添加如下代码

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 定义数据
const state = {
  count: 0
}

// 定义获取数据的方法
const getters = {
  count(state) {
    return state.count
  }
}

// 声明所有的方法
const actions = {
  addCount({ commit }) {
    // 这里的 addCountFun 对应 mutations 中的方法
    commit("addCountFun")
  }
}

// 真正操作state数据
const mutations = {
  addCountFun(state) {
    state.count++
  }
}

// 导出vuex的实例
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
```

然后再页面中使用

```html
<template>
  <div>
    <div>{{ count }} - {{ $store.state.count }}</div>
    <el-button type="success" @click="addCount">增加</el-button>
  </div>
</template>

<script>
// 从vuex中导出mapGetters, mapActions两个方法
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['count'])
  },
  methods: {
    // addCount 对应 actions 中定义的方法
    ...mapActions(['addCount'])
  }
}
</script>
```

### 在 actions 中添加逻辑判断

现在我们要添加一个count--的方法，但是当count小于5时不能在减

添加如下代码

```js
// 声明所有的方法
const actions = {
  subCount({ commit, state }) {
    if (state.count > 5) {
      commit("subCountFun")
    }
  }
}

// 提交所有的方法
const mutations = {
  subCountFun(state) {
    state.count--
  }
}
```

效果演示

![newcrm3.gif](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/newcrm3.gif)

### 在 actions 中添加异步事件

在 actions 中添加如下方法

```js
// 声明所有的方法
const actions = {
  asyncAddCount({ commit }) {
    let addcount = new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
    addcount.then(() => {
      commit("addCountFun")
    })
  }
}
```

效果演示

![newcrm4.gif](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/newcrm4.gif)

### 读取数据状态

通过在 getters 中添加代码的方式

```js
// 定义数据
const state = {
  evenOrOdd:''
}

// 定义获取数据的方法
const getters = {
  evenOrOdd(state){
    return state.count % 2 === 0 ? '偶数' : '奇数' 
  }
}
```

效果演示

![newcrm5.gif](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/newcrm5.gif)

### 使用模块化

当我们项目比较复杂时，把所有的数据都写在一个文件中是一件很痛苦的事情。我们可以吧不同的逻辑数据分到不同的文件中去，然后由 index 来统一管理。这样日常的使用和维护都会好很多。

先来一张官方推荐的项目结构

![Snipaste_2022-03-26_14-43-49.png](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-03-26_14-43-49.png)

我们按照上图所示，修改现有的文件结构，我们只保留一个 index.js 和 getters.js 文件

![Snipaste_2022-03-26_15-53-50.png](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-03-26_15-53-50.png)

- index.js 用来做文件整合并导出 store 实例
- getters.js 用来导出各个 modules 中定义的属性，这样避免 modules 中的属性定义重名问题

首先编写 user.js 

```js
// 定义数据
const state = {
    name: '张三',
    count: 0,
}

// 声明所有的方法
const actions = {
    addCount({ commit }, arg) {
        commit("addCountFun", arg)
    },
    subCount({ commit, state }) {
        if (state.count > 5) {
            commit("subCountFun")
        }
    },
    asyncAddCount({ commit }) {
        let addcount = new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, 1000)
        })
        addcount.then(() => {
            commit("addCountFun", 1)
        })
    }
}

// 提交所有的方法
const mutations = {
    addCountFun(state, arg) {
        state.count += arg
    },
    subCountFun(state) {
        state.count--
    }
}

// 将所有内容放在一个对象中导出
export default {
    // 将 namespaced 设置为 true，可以将不同的模块定义在不同的命名空间中，避免命名冲突
    namespaced: true,
    state,
    actions,
    mutations
}
```

order.js

```js
const state = {
    count: 1241434123213
}

export default {
    namespaced:true,
    state
}
```

 getters.js

```js
export default {
    name: state => state.user.name,
    count: state => state.user.count,
    evenOrOdd: state => state.user.count % 2 === 0 ? '偶数' : '奇数',
    o_count:state=>state.order.count
}
```

index.js

```js
import Vue from "vue"
import Vuex from "vuex"
import getters from "./getters"
import user from "./modules/user"
import order from "./modules/order"
Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    user,
    order
  }
})
```

在页面中使用方法

```html
<template>
  <div>
    <div>{{ $store.state.user.count }}</div>
    <div>{{ count }} - {{ evenOrOdd }} - {{ name }}</div>
    <div>order : {{ o_count }}</div>
    <el-button type="success" @click="addCount"> 增加 </el-button>
    <el-button type="warning" @click="subCount">减少</el-button>
    <el-button type="info" @click="asyncAdd">异步增加</el-button>
    <el-button type="primary" @click="changeOrder">
      改变order中的count
    </el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '../store'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['evenOrOdd', 'count', 'name', 'o_count'])
  },
  mounted() {
    console.log(this.$store.state.user.name) //=> 张三
  },
  methods: {
    addCount() {
      store.dispatch('user/addCount', 20)
    },
    subCount() {
      store.dispatch('user/subCount')
    },
    asyncAdd() {
      store.dispatch('user/asyncAddCount')
    },
    changeOrder() {
      store.dispatch('order/setCount', 123456)
    }
  }
}
</script>
```

- `store.dispatch` 派发一个方法，第一个参数为要调用的方法名，第二个参数为要传递的数据
- `this.$store.state.模块名.属性名` 也可以直接使用这种方式读取模块中的数据

最后来查看效果

![newcrm6.gif](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/newcrm6.gif)

### 持久化保存vuex数据

默认 vuex 中的数据刷新页面后会重置，我们想要刷新页面不丢失数据怎么做呢？这里使用 vuex-persistedstate 来实现

安装

```sh
npm install --save vuex-persistedstate
```

使用，在 `store/index.js` 中使用

![Snipaste_2022-03-27_15-10-17.png](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-03-27_15-10-17.png)

配置完成后，数据默认会以 localStorage 缓存起来。我们可以打开页面查看 localStorage ，缓存的 key 是 vuex

![Snipaste_2022-03-27_15-11-55.png](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-03-27_15-11-55.png)

效果演示，刷新页面后数据不会丢失

![newcrm7.gif](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/newcrm7.gif)

如果确实想重置vuex数据，可以通过清理缓存的方式来处理

```js
localStorage.removeItem("vuex")
```