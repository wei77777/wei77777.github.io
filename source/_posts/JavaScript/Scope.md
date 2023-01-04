---
title: 闭包和作用域
tags: JavaScript
categories: JS系统学习
abbrlink: 3efab17
date: 2020-12-24 00:00:00
---

# 闭包和作用域

{% note info no-icon %}

- 闭包就是能够读取其他函数部变量的函数。由于在 Javascript 语言中，只有函数内部的子函数才能读取局部变量，容因此可以把闭包简单理解成"定义在一个函数内部的函数"。所以，在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。
- 作用域被分为 全局作用域、函数作用域、块级作用域，全局作用域定义的变量全局可以访问，函数作用域只有在函数内部可以使用，块级作用域用大括号包起来的范围被称为块级作用域，每个作用域可以访问自己父级作用域的函数或者变量，而父级作用域不能访问自己子级作用域的变量和函数。
{% endnote %}

## 环境和作用域

{% note info no-icon %}

- 环境：代码运行所依赖的东西称之为环境
- 环境存在的价值：被需要才会体现出价值
- 作用域：全局作用域只有一个，每个函数都有自己的作用域
- 1：编译器运行时会将变量定义在所在的作用域
- 2：使用变量时会从当前作用域查找变量，没有时会层层网上找
- 3：作用域就像攀亲戚，晚辈可以向长辈要东西，但是长辈不能向晚辈要东西
{% endnote %}

下面代码中 show 方法被定义在全局作用域中，因而在外部可以使用 show(),但是 show2 方法被定义在 show 方法内部，所以在 show 方法中可以使用，但是在全局环境下不能使用。

```js
let name = "李四";
function show() {
  function show2() {
    console.log(name);
  }
  show2();
}
show();
```

## 函数的环境和函数的作用域

函数执行多次，里面的内存地址也会被声明多个内存地址，执行完一次后，里面的内存地址被清理掉

```js
let name = "李四";
function show() {
  let age = "18";
  function getname() {
    let height = ",188cm";
    console.log(name + age + height);
  }
  getname();
  // 此行代码会报错 height is not defined；因为height变量属于getname函数里面声明的一个变量
  // 也就是在getname函数的作用于中，外部获取不到里面作用于的变量
  // console.log(height);
}
// 函数执行多次，里面的内存地址也会被声明多个内存地址，执行完一次后，里面的内存地址被清理掉
// 用吃鸡游戏来比喻，每次开局都是全新的地图，上局游戏和本局游戏无关。
show();
show();
show();
```

## 延伸函数环境生命周期

```js
// 函数被执行完毕后，会吧当前的引用地址删掉，下次调用时会重新创建
function sum() {
  let n = 1;
  function show() {
    console.log(++n);
  }
  show();
}
// 因此多次调用sum函数都会打印 2
sum();
sum();
sum();
sum();

console.warn("分割线");

// 利用return将结果返回出来
function sum2() {
  let a = 1;
  return () => {
    console.log(++a);
  };
}
// 利用常量接收函数，因为常量定义后不会被删除，所以函数处于一直被引用的状态
// 因此执行一次后不会删除函数里面的引用地址，打印结果为累加
// a2常量接收到了sum2方法返回的一个函数，频繁调用累加第一次的1，所以打印结果累加
const a2 = sum2();
a2();
a2();
a2();
a2();

console.warn("分割线");

// 这个函数中a会被累加，m不会被累加
function sum3() {
  let a = 1;
  return () => {
    let m = 1;
    function addm() {
      // a 会累加
      console.log(`a:${++a}`);
      // m 不会累加
      console.log(`m:${++m}`);
    }
    addm();
  };
}
// 解析：sum3函数被addsum常量引用，引用后有开辟了一个新的空间，里面有m
// m以及addm函数所在的环境都没有被外界引用，没有被引用的内存地址会被自动回收掉
// 相当于执行完了一次sunm3后，addm()函数所在的内存地址被回收掉了
// 再次执行sum3函数后，addm的内存地址被重新赋值，m 又会从1开始计算，所以m不会被累加
const addsum = sum3();
addsum();
addsum();
addsum();
addsum();
```

## 构造函数中的作用域的使用形态

```js
// 声明show函数，show函数中有sum方法，打印++a
function show() {
  this.a = 1;
  this.sum = () => {
    console.log(++this.a);
  };
}
// 构造show给变量a，因为函数被a引用，所以执行完一次后不回收内存地址
let a = new show();
console.log(a);
a.sum();
a.sum();
a.sum();

console.warn("分割线");

// 下面的写法和上面的构造函数返回的结果相同
function show2() {
  let a = 1;
  sum = () => {
    console.log(++a);
  };
  return {
    a,
    sum,
  };
}
let a1 = show2();
console.log(a1);
// 核心都是内存被引用就不会被回收
a1.sum();
a1.sum();
a1.sum();
```

## 块级作用域

{% note info no-icon %}

- es6 新增 let const
- 两者都是块级作用域，可以理解为一个大括号就是一个块级作用域
- 不同点：let 定义的变量的值可以被更改，const 定义的变量不可以被更改，
  但是改变相同引用地址里免的值可以被更改
  {% endnote %}

```js
var a = "这是全局a";
{
  let b = 1;
}
{
  let b = 1;
}

console.log(a); // 这是全局a

// 此处打印 b 会报错，因为上面两个 a 都属于块机作用域，在作用域外拿不里面的a
console.log(b); // b is not defined
```

## let 和 var 在 for 循环中的不同反应

```js
for (var i = 1; i <= 3; i++) {
  // 因为var是全局作用域，每次循环都是把上次的结果改变，倒计时1秒后已经循环完毕，循环完毕的结果就是4
  // 因为循环了三次，所以打印出3个4
  // 结果为4的原因是第四循环时已经把i变成了4，但是没有通过 i <= 3的判断条件
  // 但此时i的值已经变成了4，所以打印结果就是4
  setTimeout(() => {
    console.log(i); // 三个4
  }, 1000);
}

for (let a = 1; a <= 3; a++) {
  // 因为let是块级元素，每次循环都会产生一个新的块级作用域，每个作用域里面存着每次循环的结果
  // 倒计时1秒后吧每个块里面的元素打印出来，所以就是 1 2 3
  setTimeout(() => {
    console.log(a); // 1 2 3
  }, 1000);
}
```

## 利用自执行函数将 var 变成伪块级作用域

```js
for (var a = 0; a <= 5; a++) {
  // 自执行函数，每次循环都产生一个新的函数作用域，每个函数作用域存着这次循环的结果
  // 倒计时1秒后打印出每个函数作用域里面的值
  (function(a) {
    setTimeout(() => {
      console.log(a);
    }, 1000);
  })(a);
}
```

## 闭包内存泄漏的解决办法

```html
<div name="张三">zhangsan</div>
<div name="李四">lisi</div>
```

```js
let div = document.querySelectorAll("div");
div.forEach((item) => {
  // 先获取到要获取的name值
  let desc = item.getAttribute("name");
  item.addEventListener("click", () => {
    // 点击div后只是单纯的为了获取它身上的name值，所以在外边清空了不必要的item
    console.log(desc);
    console.log(item);
  });
  // 定义item为null，是为了防止内存泄漏，避免不必要的性能浪费
  item = null;
});
```

## this 在闭包中的历史遗留问题

```js
let obj = {
  state: "lisi",
  // 方法里面套方法
  get: function() {
    // 这个this属于get方法，get属于obj对象的元素，所以this指向obj
    console.log(this);
    // 调用get方法返回下面的函数，因为返回的函数没有调用者，所以指向window
    return function() {
      // 此时是this指向window
      console.log(this);
      return this.state;
    };
  },
};
// 第一步返回get方法里面的函数,赋值给a
let a = obj.get();
// a()调用返回的函数,由于该函数没有变量声明，所以this指向window
console.log(a());

console.warn("----分隔线----");
// 解决办法，利用箭头函数声明
let user = {
  name: "李四",
  getname: function() {
    return () => {
      return this;
    };
  },
};
console.log(user.getname()());
```

## 多级作用域嵌套原理

```js
let arr = [];
// let 在循环中每次循环都会产生一个新的作用域，每个作用域都存放每一次循环的结果
// 每循环一个往arr中push一个作用域，所以用arr下标的方式调用方法时会出现不同的结果
for (let a = 1; a <= 5; a++) {
  arr.push(() => {
    return a;
  });
}
console.log(arr[4]()); // 5

let arr2 = [];
// var 不存在块级作用域，因此每次push时先在本次循环的作用域中找a，没有找到会往上继续找，
// 最终找到了定义在window中的a，因为没有作用域的概念所以每次执行数组中的函数是都会打印循环结束后的值
for (var a = 1; a <= 5; a++) {
  arr2.push(() => {
    return a;
  });
}
console.log(arr2[4]()); // 6
```
