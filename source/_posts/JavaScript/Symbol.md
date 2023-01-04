---
title: Symbol 类型
tags: JavaScript
categories: JS系统学习
abbrlink: 51b24745
date: 2020-12-21 00:00:00
---

# Symbol 类型

{% note info no-icon %}

- ES6 引入了一种新的原始数据类型 Symbol ，表示独一无二的值，最大的用法是用来定义对象的唯一属性名。
- ES6 数据类型除了 Number 、 String 、 Boolean 、 Objec t、 null 和 undefined ，还新增了 Symbol 。
- 
{% endnote %}

## Symbol 定义方式

```js
let sy = Symbol("这是第一个symbol");
let newsy = Symbol();
console.log(typeof sy); // symbol

console.log(sy.toString()); // Symbol(这是第一个symbol)

// 提取symbol的描述信息
console.log(sy.description); // 这是第一个symbol

let hd = Symbol.for("Symbol for 的方式定义symbol");

console.log(Symbol.keyFor(hd));
```

## Symbol 解决数据重复覆盖问题

{% note info no-icon %}
在对象中如果 key 名重复，后面的 key 会把前面的 key 覆盖掉，使用 symbol 类型定义唯一值，可以避免覆盖问题
{% endnote %}

```js
let user1 = {
  name: "李四",
  key: Symbol(),
};
let user2 = {
  name: "李四",
  key: Symbol(),
};
let grade = {
  [user1.key]: { js: 99, css: 89 },
  [user2.key]: { js: 56, css: 100 },
};
console.log(grade[user2.key]); // { js: 56, css: 100 }
```

## Symbol 在缓存器中的使用

```js
class Cache {
  static data = {};
  static set(name, value) {
    this.data[name] = value;
  }
  static get(name) {
    return this.data[name];
  }
}

let user = {
  name: "xiaomi",
  key: Symbol(),
};
let cart = {
  name: "xiaomi",
  key: Symbol(),
};

Cache.set(user.key, user);
Cache.set(cart.key, cart);
console.log(Cache.get(user.key));
```

## 扩展特性与对象属性保护

{% note info no-icon %}
使用 <code>symbol</code> 定义 key 时不会被 <code>for in</code> 遍历到，通过 <code>for of Reflect.ownKeys()</code>可以遍历到对象里面的 symbol 属性
{% endnote %}

```js
let symbol = Symbol();
let obj = {
  name: "李四",
  [symbol]: "张三",
};
// 普通遍历遍历不到 symbol 属性
for (let key in obj) {
  console.log(key);
}

// 通过for of Reflect.ownKeys()可以遍历到对象里面的 symbol 属性
for (let key of Reflect.ownKeys(obj)) {
  console.log(key);
}

let site = Symbol();
class User {
  constructor(name) {
    this.name = name;
    this[site] = "songzheng";
  }
  getName() {
    return `${this.name} ${this[site]}`;
  }
}

let newuser = new User("6666");
console.log(newuser.getName()); // 666 songzheng

// 不能获取到symbol属性
for (let key in newuser) {
  console.log(newuser[key]); // 666
}
```
