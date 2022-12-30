---
title: Vue3.2 新特性
tags: vue3.0
categories: vite
abbrlink: b71be7d0
date: 2022-06-27 11:38:18
---

## 创建项目

执行命令

```sh
npm create vite
```

在命令行中输入项目名称然后cd到项目根目录下

```sh
npm install
npm run dev
```

查看vue版本

![Snipaste_2022-06-27_10-25-15.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-06-27_10-25-15.png)

启动后首页

![Snipaste_2022-06-27_08-58-37.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-06-27_08-58-37.png)

## setup简介

起初 vue3.0 暴露变量必须 return 出来，template 中才能使用。这样会导致在页面上的变量会出现很多次。vue3.2 只需要在 script 标签中添加 setup 可以帮助我们解决这个问题：

组件只需引入，不用注册。属性和方法不用返回，也不用写setup函数，也不用写 export default。甚至是自定义指令也可以在我们的 template 中自动获得

## 变量，方法不需要return

```vue
<template>
  <div>
    显示的值：{{ flag }}
    <button @click="changeFlag">改变值</button>
  </div>
</template>
<script setup>
import { ref } from 'vue'

// 初始化声明变量
let flag = ref('第一次循环')

function changeFlag() {
  // 改变ref的值需要跟上 .value
  flag.value = '第二次循环'
}
</script>
```

![VeryCapture_20220627101640.gif](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/VeryCapture_20220627101640.gif)

## 组件无需注册

组件内容

```vue
<template>
    <h4>你好，我是肖鹤云</h4>
</template>
```

使用

```vue
<template>
  <div>
    <!-- 使用驼峰形式使用组件 -->
    <test-comp></test-comp>
  </div>
</template>
<script setup>
// 直接引入组件，无需注册
import TestComp from "./components/TestComp.vue"
</script>
```

![Snipaste_2022-06-27_10-23-03.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-06-27_10-23-03.png)

## defineProps

defineProps 用来处理父子组件传值问题

父组件传值给子组件

```vue
<template>
  <div>
    <!-- 使用驼峰形式使用组件 -->
    <test-comp :msg="msg" time="42分钟"></test-comp>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// 直接引入组件，无需注册
import TestComp from "./components/TestComp.vue"

// 初始化声明变量
let msg = ref("公交车爆炸时间")
</script>
```

子组件接收值

```vue
<template>
  <h4>
    {{msg}} - {{time}}
  </h4>
</template>

<script setup>
// 从 vue 中导出 defineProps 函数接收
import { defineProps } from 'vue'
// defineProps 函数接收一个字符串数组
defineProps(['msg', 'time'])
</script>
```

![Snipaste_2022-06-27_10-31-46.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-06-27_10-31-46.png)

defineProps 也可以传入一个对象，可以设置当父组件传递进来的值为空时设置默认值

```vue
<template>
  <h4>{{ msg }} - {{ time }}</h4>
</template>
<script setup>
import { defineProps } from 'vue'
defineProps({
  msg: {
    type: String,
    default: '李诗晴'
  },
  time: {
    type: String,
    default: '42分钟'
  }
})
</script>
```

## defineEmits

defineEmits 用来处理子组件往父组件抛出事件

首先在子组件抛出事件

```vue
<template>
  <h4>{{ msg }} - {{ time }}</h4>
  <button @click="bao">爆炸</button>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue'
// 将子组件要抛出的方法名称用一个字符串数组，以参数的方式传递给defineEmits函数，并用一个变量名接收
let $emit = defineEmits(['bao'])

// 接收父组件传递进来的参数
defineProps({
  msg: {
    type: String,
    default: '李诗晴'
  },
  time: {
    type: String,
    default: '42分钟'
  }
})

function bao() {
  $emit('bao', '子组件触发')
}
</script>
```

在父组件中定义 bao 方法

```vue
<template>
  <div>
    <!-- 使用驼峰形式使用组件 -->
    <test-comp :msg="msg" time="42分钟" @bao="bao"></test-comp>
  </div>
</template>
<script setup>
import { ref } from 'vue'
// 直接引入组件，无需注册
import TestComp from "./components/TestComp.vue"

let msg = ref("公交车爆炸时间")

// 父组件执行由子组件触发的方法
function bao(res){
  console.log(res,'来自子组件的值');
}
</script>
```

![Snipaste_2022-06-27_10-43-01.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-06-27_10-43-01.png)

## defineExpose 

defindExpose 方法用来暴露子组件中的属性和方法

在子组件中使用

```vue
<template>
  <h4>{{ msg }} - {{ time }}</h4>
  <button @click="bao">爆炸</button>
</template>
<script setup>
import { ref, reactive, defineProps, defineEmits, defineExpose } from 'vue'
// 接收父组件传递进来的参数
defineProps({
  msg: {
    type: String,
    default: '李诗晴'
  },
  time: {
    type: String,
    default: '42分钟'
  }
})
// 将子组件要抛出的方法名称用一个字符串数组，以参数的方式传递给defineEmits函数，并用一个变量名接收
let $emit = defineEmits(['bao'])

let info = reactive({
  name: '李诗晴',
  msg: '喜欢'
})

let notmsg = ref("test")


function bao() {
  $emit('bao', '子组件触发')
}

function police() {
  return '肖鹤云报警'
}

// 对外暴露属性和方法
defineExpose({
  info,
  police
})
</script>
```

在父组件中获取

```vue
<template>
  <div>
    <!-- 使用驼峰形式使用组件 -->
    <test-comp :msg="msg" time="42分钟" @bao="bao" ref="testComp"></test-comp>
    <!-- 获取子组件的值 -->
    <button @click="getTestCompVal">获取子组件的值</button>
  </div>
</template>
<script setup>
import { ref } from 'vue'
// 直接引入组件，无需注册
import TestComp from './components/TestComp.vue'

// 初始化声明变量
let msg = ref('公交车爆炸时间')

// 获取子组件实例，名称要和组件上定义的 ref 名称一致
let testComp = ref()

// 父组件执行由子组件触发的方法
function bao(res) {
  console.log(res, '来自子组件的值')
}

function getTestCompVal() {
  let info = testComp.value.info
  console.log(info) //=> Proxy {name: '李诗晴', msg: '喜欢'}
  let resmsg = testComp.value.police()
  console.log(resmsg) //=> 肖鹤云报警

  // 如果直接使用子组件中没有导出的内容则获取到的值是 undefined
  console.log(testComp.value.notmsg); //=> undefined
}
</script>
```

## style v-bind

可以在 style 中使用变量

```vue
<template>
  <h4 class="color">{{ msg }} - {{ time }}</h4>
  <button @click="changeColor">变色</button>
</template>
<script setup>
import { ref, reactive, defineProps, defineEmits, defineExpose } from 'vue'
// 接收父组件传递进来的参数
defineProps({
  msg: {
    type: String,
    default: '李诗晴'
  },
  time: {
    type: String,
    default: '42分钟'
  }
})

// 定义颜色变量
let stateStyle = reactive({
  color: 'red',
  fontSize: '20px'
})

function changeColor() {
  stateStyle.color = 'blue'
  stateStyle.fontSize = '30px'
}
</script>

<style scoped>
.color {
  color: v-bind('stateStyle.color');
  font-size: v-bind('stateStyle.fontSize');
}
</style>
```

![VeryCapture_20220627111843.gif](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/VeryCapture_20220627111843.gif)



