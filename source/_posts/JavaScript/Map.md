---
title: Map 和 WeakMap
tags: JavaScript
categories: JS系统学习
abbrlink: 1a8557ef
date: 2020-12-21 00:00:00
---


{% note info no-icon %}
Map 对象保存键值对，并且能够记住键的原始插入顺序。任何值(对象或者原始值) 都可以作为一个键或一个值
{% endnote %}

## Map 和 Object 的区别

|          |                                      Map                                       | Object                                                                                                                                                                         |
| :------: | :----------------------------------------------------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 意外的键 |                  Map 默认情况不包含任何键。只包含显式插入的键                  | 一个 Object 有一个原型, 原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。                                                                                             |
| 键的类型 |           一个 Map 的键可以是任意值，包括函数、对象或任意基本类型。            | 一个 Object 的键必须是一个 String 或是 Symbol                                                                                                                                  |
| 键的顺序 | Map 中的 key 是有序的。因此，当迭代的时候，一个 Map 对象以插入的顺序返回键值。 | 一个 Object 的键是无序的 <code>注意：自 ECMAScript 2015 规范以来，对象确实保留了字符串和 Symbol 键的创建顺序； 因此，在只有字符串键的对象上进行迭代将按插入顺序产生键。</code> |
|   Size   |                  Map 的键值对个数可以轻易地通过 size 属性获取                  | Object 的键值对个数只能手动计算                                                                                                                                                |
|   迭代   |                     Map 是 iterable 的，所以可以直接被迭代                     | 迭代一个 Object 需要以某种方式获取它的键然后才能迭代。                                                                                                                         |
|   性能   |                       在频繁增删键值对的场景下表现更好。                       | 在频繁添加和删除键值对的场景下未作出优化。                                                                                                                                     |

## Map 类型特点和创建方式

```js
// map类型和obj类型的区别:对象的键只能是字符串类型，map的键名可以是各种类型
let obj = {
  1: "李四",
  "1": "张三",
};
console.log(obj); // 张三

// 声明Map类型
let map = new Map();
// 键名为字符串
map.set("name", "李四");
// 键名为数字
map.set(1, "数字");
// 键名为方法
map.set(function() {}, "方法作为键名");
// 对象键名
map.set({}, "对象键名");
console.log(map);
```

## Map 类型的增删改查

{% note info no-icon %}

- <code>map.set</code>增加
- <code>map.delete(key)</code>删除单个
- <code>map.clear()</code>删除全部
- <code>map.get(key)</code>查询单个
  {% endnote %}

```js
let map = new Map();
// 增
map.set("name", "李四");
map.set("age", "10");

// 删除
// 单个删除，返回布尔值
console.log(map.delete("age"));
// 全部删除，没有返回值
// map.clear()

// 查询
console.log(map.get("name")); // 李四

console.log(map);
```

## 遍历 Map 类型

```js
let map = new Map();
map.set("name", "李四");
map.set("age", "15");

// 遍历所有的key
console.log(map.keys());

// 遍历所有的值
console.log(map.values());

// 遍历值和键
console.log(map.entries());

// for of 遍历键名
for (let key of map.keys()) {
  console.log(key);
}

// for of 遍历值
for (let val of map.values()) {
  console.log(val);
}

// 对象同时接收键和值
for (let [key, val] of map.entries()) {
  console.log(key, val);
}

// forEach 遍历 map,第一个值是键值，第二个值是键名
map.forEach((item, key) => {
  console.log(item, key);
});
```

## Map 类型转换

```js
let map = new Map();
map.set("name", "李四");
map.set("age", "18");

// 通过展开语法吧map变成数组
console.log([...map]);

let newmap = [...map];
// filter过滤map中的键值为李四的值
let newarr = newmap.filter((item) => {
  return item[1].includes("李四");
});
// 再用map接收过滤后的值
let map2 = new Map(newarr);
// 通过展开语法得到对应的key值
console.log(...map2.keys());
```

## Map 类型操作 DOM 节点

```html
<div name="非常棒">songzhengxiang</div>
<div name="这都被你发现了">千万别点我</div>
```

```js
// 声明map变量
let map = new Map();
// 遍历所有div元素
let divs = document.querySelectorAll("div");

divs.forEach((item) => {
  map.set(item, {
    name: item.getAttribute("name"),
  });
});

// 第一个是键值，第二个是键名
map.forEach((content, divitem) => {
  divitem.addEventListener("click", () => {
    alert(content.name);
  });
});
console.log(map);
```

## Map 控制表单提交

```html
<form action="" onsubmit="return post()">
  服务协议
  <input type="checkbox" error="请勾选协议" />
  权限管理
  <input type="checkbox" error="请勾选权限管理" />

  <input type="submit" value="提交" />
</form>
```

```js
function post() {
  // 获取所有多选款
  let error = document.querySelectorAll("[error]");
  let map = new Map();
  error.forEach((item) => {
    map.set(item, {
      error: item.getAttribute("error"),
      state: item.checked,
    });
  });
  let newmap = [...map];
  // every判断数组中的元素是否全部符合条件，全部符合返回true，有一个不符合返回false
  return newmap.every(
    ([div, checkbox]) => checkbox.state || alert(checkbox.error)
  );
}
```

## WeakMap 的使用

{% note info no-icon %}
WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的
{% endnote %}

```js
let weakmap = new WeakMap();
const o1 = {};
const o2 = function() {};
weakmap.set(o1, "37");
weakmap.set(o2, undefined);
// weakmap.set("name","李四") // 报错
console.log(weakmap);
```

## WeakMap 弱引用类型体验

```js
let obj = {
  name: "lisi",
};
let weakmap = new WeakMap();
weakmap.set(obj, "lisi");
// 打印出结果可以看到里面有值，但是点开里面是没有值得
console.log(weakmap);
obj = null;

console.log(weakmap);

setTimeout(() => {
  // 倒计时一秒后再打印结果为空
  console.log(weakmap);
}, 1000);
```

## 使用 Map 开发选课组件

```css
.kecheng {
  width: 300px;
  float: left;
}

.xuanran {
  width: 300px;
  float: left;
  margin-top: 11px;
}

ul {
  list-style: none;
}

ul > li {
  border: 2px solid red;
  margin: 2px;
  width: 200px;
  padding: 5px;
  position: relative;
}

li > a {
  text-decoration: none;
  position: absolute;
  right: 15px;
  background-color: green;
  color: white;
  width: 21px;
  text-align: center;
  border-radius: 3px;
}
.plck {
  padding-left: -5px;
  padding-top: 20px;
}
.plck > span {
  background-color: green;
  color: white;
  padding: 3px;
  border-radius: 2px;
  margin: 5px;
}
```

```html
<div class="main">
  <!-- 课程区域 -->
  <div class="kecheng">
    <ul>
      <li><span>css</span> <a href="javascript:;">+</a></li>
      <li><span>html</span> <a href="javascript:;">+</a></li>
      <li><span>js</span> <a href="javascript:;">+</a></li>
      <li><span>vue</span> <a href="javascript:;">+</a></li>
      <li><span>小程序</span> <a href="javascript:;">+</a></li>
    </ul>
  </div>
  <!-- 渲染区域 -->
  <div class="xuanran">
    <div class="info">当前一共选择了0门课程</div>
    <div class="plck"></div>
  </div>
</div>
```

```js
class todo {
  constructor() {
    // 创建map元素
    this.map = new Map();
    // 获取所有的li元素
    this.lis = document.querySelectorAll("li");
    // 获取info信息
    this.info = document.querySelector(".info");
    // 获取pick信息
    this.plck = document.querySelector(".plck");
  }
  run() {
    this.lis.forEach((item) => {
      item.querySelector("a").addEventListener("click", (event) => {
        // 如果没有有select的值，表示没有选中
        if (!item.getAttribute("select")) {
          // 向li元素添加select属性，并赋予初始值true
          item.setAttribute("select", true);
          // 向map添加键值，键是当前li元素，值为li里面span的值
          this.map.set(item, {
            name: item.querySelector("span").innerHTML,
          });
          // 改变a标签的背景色是红色
          event.target.style.backgroundColor = "red";
          // 改变a标签的值是-
          event.target.innerHTML = "-";
          event.target.style.transition = "0.5s";
        } else {
          // 如果已经有select属性，则删除select属性
          item.removeAttribute("select");
          // 在map中删除当前节点
          this.map.delete(item);
          // 吧a标签的背景色换为绿色
          event.target.style.backgroundColor = "green";
          // 内容换为+
          event.target.innerHTML = "+";
          event.target.style.transition = "0.5s";
        }
        // 获取到info文字
        let infohtml = document.querySelector(".info");
        // 动态获取当前map的个数
        infohtml.innerHTML = `当前一共选择了${this.map.size}门课程`;
        // 获取下面的div
        let plck = document.querySelector(".plck");
        plck.innerHTML = "";
        // 遍历追加选中的课程
        this.map.forEach((name, lis) => {
          plck.innerHTML += `<span>${name.name}</span>`;
        });
      });
    });
  }
}
new todo().run();
```
