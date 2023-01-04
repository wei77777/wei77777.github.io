---
title: JS 模块开发
tags: JavaScript
categories: JS系统学习
abbrlink: 3c29fde1
date: 2021-01-12 00:00:00
---


{% note info no-icon %}

- 模块就是把多个功能分隔成独立的文件，一个模块负责一部分功能，减低代码耦合度
- 模块可以给不同的文件划分独立作用域，多个文件中重名的变量不会相互影响
- 模块可以开放部分功能给外部
{% endnote %}

## 模块的基本使用

{% note info no-icon %}
在 js 中使用 export 导出想要导出的内容
{% endnote %}

- 导出方法：

```js
let title = "title";
let url = "url";

function show() {
  console.log("show");
}
// 导出
export { title, url, show };
```

- 导入方法

```js
// 通过import引入
import { title, url, show } from "./js/2.js";
console.log(title); // title
console.log(url); // url
show(); // show
```

## 模块延迟解析和严格模式

在代码中使用导入时要在 script 标签上声明 type = "module",表示延迟解析，等待所有依赖加载完毕后再往下执行代码

```html
<!-- 
    不添加 type="module" 会打印 null
    程序自上而下运行时先打印不会去找button
    但是module模块默认等待所有模块加载完成后再去执行代码，因为模块中会有各种依赖关系
    所以module也是延迟解析
-->
<script type="module">
  console.log(document.querySelector("button"));
  import { stit } from "./js/3.js";
  console.log(stit);
</script>

<body>
  <button>按钮</button>
</body>
```

## 作用域在模块中的体现

{% note info no-icon %}
每个模块都有自己独立的作用域，自己模块中获取不到其他模块作用域的数据
{% endnote %}

```html
<script>
  // 非模块定义在其他模块可以使用
  let url = "定义外部变量";
</script>

<script type="module">
  let title = "标题";
  console.log(title); // 标题
  console.log(url); // 定义外部变量
</script>

<script type="module">
  // 每个模块都有自己的作用域,其他模块拿不到其他模块定义的变量
  // console.log(title); title is not defined
  console.log(url); // 定义外部变量
</script>
```

## 预解析的重要性

{% note info no-icon %}
通过预解析正确处理多个 js 之间的相互引用关系，防止未引入先使用导致错误
{% endnote %}

在页面中导入两个 js 模块

```html
<script type="module">
  import { lesobj } from "./js/5.js";
  console.log(lesobj.get());
  // 0: {name: "js", price: 999}
  // 1: {name: "vue", price: 56}

  // 5_1引入5.js
  import { count } from "./js/5_1.js";
  console.log(count); // 2
</script>
```

5.js 导出 lesobj

```js
class lessos {
  data = [];
  init() {
    this.data = [
      {
        name: "js",
        price: 999,
      },
      {
        name: "vue",
        price: 56,
      },
    ];
  }
  get() {
    return this.data;
  }
}
let lesobj = new lessos();
lesobj.init();
export { lesobj };
```

5_1.js 使用 5.js 导出的 lesobj

```js
import { lesobj } from "./5.js";
let count = lesobj.get().length;

export { count };
```

## 模块的具名导出和导入

{% note info no-icon %}
根据具体的名字导入叫做具名导入,导出具体的名字称为具名导出。
{% endnote %}

```html
<script type="module">
  // 根据具体的名字导入叫做具名导入
  import { title, url, user, show } from "./js/6.js";
  console.log(title, url, user.data, show());
</script>
```

```js
let title = "标题";
let url = "路径";
class User {
  data = "user.data";
}
let user = new User();

function show() {
  return "show";
}
// 有具体的名字导出叫做具名导出
export { title, url, user, show };
```

## 批量导入

{% note info no-icon %}
使用 \* as 别名可以批量导入,但是打包时会认为我们要用到这个模块里面的所有内容，
导致打包文件的体积过大，建议使用具名导入,打包是只会打包我们用到的一些文件
{% endnote %}

```js
// 批量导入
import * as api from "./js/6.js";
console.log(api);
// 具名导入(推荐)
import { title } from "./js/6.js";
```

## 使用别名导出和导入

{% note info no-icon %}
使用别名导入后原来的名字便无法使用
{% endnote %}

```js
// 使用 as 别名
import { title as t } from "./js/6.js";
console.log(t);
// 使用别后原来的名字不可用
// console.log(title); title is not defined
```

## default 默认导出

{% note info no-icon %}
使用 default 默认导出是不用{}来接收，{}表示导入多个
{% endnote %}

默认导出多个

```js
export default {
  name: "李四",
  age: "18",
};
```

默认导出后，导入使定义一个变量接收导出的数据

```js
import api from "./js/9.js";
console.log(api); // {name: "李四", age: "18"}
```

## 混合导入导出的使用

{% note info no-icon %}
默认导出和单个导出可以同时使用
{% endnote %}

导出方式

```js
// 混合导出
export default {
  name: "李四",
  age: "18",
};

function show() {
  console.log("单个导出");
}
export { show };
```

导入方式

```js
// 混合导入
import api, { show } from "./js/10.js";
console.log(api); // {name: "李四", age: "18"}
show(); // 单个导出
```

## 模块的合并导出

{% note info no-icon %}
合并导出概念：通过一个模块引入其他多个模块，导入时只导入一个总的模块
{% endnote %}
合并导出方式

```js
import * as m121 from "./12.1.js";
import * as m122 from "./12.2.js";

// 通过index文件批量导出
export { m121, m122 };
```

导入方式

```js
import * as api from "./js/12.index.js";
console.log(api);
console.log(api.m121.title);
// 使用默认导出的类里面的静态方法
console.log(api.m122.default.show());
```

## 按需动态加载模块

{% note info no-icon %}
通过请求的方式加载某个模块
{% endnote %}

```html
<button>动态加载</button>
```

```js
document.querySelector("button").addEventListener("click", () => {
  // import()函数返回的是一个promise函数
  import("./js/6.js").then(({ title, url }) => {
    console.log(title, url);
  });
});
```
