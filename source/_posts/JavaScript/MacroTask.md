---
title: 宏任务和微任务
tags: JavaScript
categories: JS系统学习
abbrlink: e9e40021
date: 2020-12-21 00:00:00
---


{% note info no-icon %}
执行顺序：同步任务 > 宏任务 > 微任务
{% endnote %}
js 编译代码是先执行同步任务，遇到 settimeout、setInterval 等宏任务时会进入到宏任务队列中等待同步任务执行完毕后，在去宏任务队列中获取任务来执行。

```js
setTimeout(() => {
  console.log("宏任务");
}, 0);
Promise.resolve().then((res) => {
  console.log("微任务");
});
console.log("同步任务");
// 返回的打印顺序为： 同步任务  微任务  宏任务
```

## 定时器的任务编排

{% note info no-icon %}
下面代码执行结果为：等待 10000 循环完毕后同时打印出： 倒计时，倒计时 2，倒计时 1
{% endnote %}

```js
// 浏览器在正常解析式遇到定时器会把定时器放在定时器的队列中去开始计时
// 等待倒计时结束后会把任务放在宏任务队列中
// 等待同步任务执行完毕后直接调用宏任务队列中的方法执行
// 如果有多个倒计时，则那个倒计时先计时完毕会先优先进入宏任务队列中
setTimeout(() => {
  console.log("倒计时1");
}, 2000);
setTimeout(() => {
  console.log("倒计时2");
}, 1000);
// 倒计时会有一个最短计时，即使设置为0毫秒后执行，js也会默认给上一个4毫秒的延迟在执行
// 所以0毫秒的倒计时不是真正的0毫秒倒计时
setTimeout(() => {
  console.log("倒计时");
}, 0);
for (let a = 0; a < 10000; a++) {
  console.log("");
}
// 执行后可以看到等待10000次循环完毕后不是再等待2秒打印结果，而是同时打印出倒计时2和倒计时1
// 并且倒计时2是在倒计时1之前先出来
// 这是因为js在解析代码过程中遇到定时器后会把定时器放进定时器模块中开始倒计时
// 这是代码会继续往下执行同步任务，等待同步任务执行完毕后去宏任务队列中找可以执行的代码
// 如果宏任务队列中有等待执行的代码就拿过来执行,否则就进行休眠等待下一次解析
```

## promise 微任务处理

{% note info no-icon %}
运行结果:promise --> 同步任务 --> then --> settimeout
{% endnote %}

```js
setTimeout(() => {
  console.log("settimeout");
}, 0);
new Promise((resolve, reject) => {
  // new promise 方法中属于同步任务
  console.log("promise");
  resolve();
}).then((res) => {
  console.log("then");
});
console.log("同步任务");
// 分析：代码解析式遇到settimeout则开始倒计时，倒计时完毕后吧任务放在宏任务队列中
// promise中属于同步任务，所以先打印出promise
// 然后遇到then，promise返回状态后进入微任务队列，同样等待同步任务执行
// 紧接着遇到同步任务打印出同步任务
// 同步任务执行完毕后执行微任务打印then
// 微任务执行完毕后执行宏任务打印settimeout
```

## DOM 渲染任务

{% note info no-icon %}
一般要把 js 放在页面底部处理,这样不会因为等待 js 执行而导致页面白屏等待
{% endnote %}

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <!-- 如果js放在DOM前面，则会等待js业务逻辑处理完毕后再去渲染DOM
会导致页面在js处理期间显示白屏，造成体验不友好，所以通常把js模块放在页面底部
-->
  <!-- <script src="./js/1.js"></script> -->
  <body>
    <h2>hello,world</h2>
  </body>
  <script src="./js/1.js"></script>
</html>
```

## 任务共享内存

{% note info no-icon %}
运行结果：经过一秒后打印出 1 和 2
{% endnote %}

```js
let i = 0;
setTimeout(() => {
  console.log(++i);
}, 1000);
setTimeout(() => {
  console.log(++i);
}, 1000);
// 解析：js解析到第一个计时器后会把第一个计时器放在宏任务队列中，然后接着把第二个计时器放在
// 宏任务队列中，同步任务执行完毕后去宏任务队列获取任务
// 第一个任务执行完毕后改变了i的值，此时i的值变成了1
// 然后执行第二个任务，经过上个任务的处理，i的值已经是1，在经过++变成2
// 所以打印结果为倒计时1秒后打印出 1  2
```

## 进度条体验任务轮询

```css
.progressBar {
  height: 30px;
  background-color: aquamarine;
  position: absolute;
  text-align: center;
}
```

```html
<div class="progressBar"></div>
```

```js
function progre() {
  let i = 0;
  let div = document.querySelector(".progressBar");
  (function run() {
    if (++i <= 100) {
      div.innerHTML = i;
      div.style.width = i + "%";
      setTimeout(run, 10);
    }
  })();
}
progre();

// 代码解析：先执行progre方法，方法内部存在自执行函数run，run方法会产生一个计时器放在
// 定时器会生成宏任务进入到宏任务队列中，计时器调用run方法重复生成新的宏任务
// 循环往复会产生多个宏任务，if判断i的值小于等于100时不再产生新的宏任务
```

## 任务拆分成多个子任务

```css
.box {
  width: 300px;
  height: 20px;
  position: relative;
  border: 1px solid;
}

.progre {
  position: absolute;
  height: 100%;
  width: 0%;
  background-color: #09c;
}
```

```html
<div class="box">
  <div class="progre"></div>
</div>
<div class="progretext">0</div>
<button onclick="hd()">开始下载</button>
```

```js
let num = 984755554;
let nums = 984755554;
let count = 0;
let progrediv = document.querySelector(".progre");
let progretext = document.querySelector(".progretext");
function hd() {
  // 每次先循环一部分
  for (let i = 0; i < 1000000; i++) {
    if (num <= 0) break;
    count = num--;
  }
  // 循环完后判断是否还有值未参与循环
  // 如果大于0表示该有值未参与循环，则放到宏任务中执行后续循环
  // 不影响下面的同步任务继续执行
  if (num > 0) {
    setTimeout(hd);
  }
  let progrs = (100 - (num / nums) * 100).toFixed(2) + "%";
  progrediv.style.width = progrs;
  progretext.innerHTML = progrs;
  if (num === 0) {
    progrediv.style.background = "#5edc63";
  }
  console.log(progrs);
}
```

## promisec 微任务处理复杂任务

```js
// 利用异步执行先执行完同步任务后再去执行微任务
async function hd(num) {
  let res = await Promise.resolve().then((_) => {
    let count = 0;
    for (let i = 0; i < num; i++) {
      count += num--;
    }
    return count;
  });
  console.log(res);
}
hd(456845789);
console.log("同步任务");
// 打印结果
// 同步任务   78265528430191060
```
