---
title: 类型判断
tags: JavaScript
categories: JS系统学习
abbrlink: '48748001'
date: 2020-12-16 00:00:00
---

## 类型判断

{% note info no-icon %}
typeof 用来显示该字段为什么类型,instanceof 判断字段是否为某种类型
{% endnote %}

```js
let data = {};
console.log(typeof data); // object
console.log(data instanceof Object); // true

let array = [];
console.log(typeof array); // object
console.log(data instanceof Array); // true
console.log(data instanceof Object); // false

let name;
console.log(typeof name); // undefined

let num = 5;
console.log(typeof num); // number

let text = "文字";
console.log(typeof text); // string
```

## 字符串转义和模板字面量

```js
// 转义符 \
let text = '我的名字叫"顺溜"';
document.write(text);
document.write("<br>");

// \t 制表符
let arr = "转义斜杠加t为\t制表符";
document.write(arr);
document.write("<br>");

// 转义斜杠
let gang = "斜杠青年\\";
document.write(gang);
document.write("<br>");

// 模板字面量
let content = `你是${gang},嘿嘿`;
document.write(content);
```

## 模板字面量嵌套

```js
let data = [
  {
    title: "shoshfioshdfioshdf",
  },
  {
    title: "奥为哈佛为哦哦谁金佛is点击佛",
  },
  {
    title: "熊师傅欧师傅山东你发货",
  },
];
console.log(data.map((item) => item.title).join(" "));
function show() {
  return `<ul>${data.map((item) => `<li>${item.title}</li>`).join(" ")}</ul>`;
}
document.write(`${show()}`);
```

## 字符串函数基本使用

```html
<input type="text" name="password" /> <span id="error"></span>
```

```js
let string = "SongZhengXiang";
// 转为大写
console.log(string.toUpperCase()); // SONGZHENGXIANG

// 转为小写
console.log(string.toLowerCase()); // songzhengxiang

let pas = document.querySelector("[name = 'password']");
let span = document.querySelector("#error");
pas.addEventListener("keyup", function() {
  // 去除空格
  this.value = this.value.trim();
  if (this.value.length < 5) {
    span.innerHTML = "密码小于5位数";
  } else {
    span.innerHTML = "";
  }
});

// 设置字体大小一次递增
for (let i = 0; i < string.length; i++) {
  let span = document.createElement("span");
  span.innerHTML = string[i];
  span.style.fontSize = (i + 1) * 5 + "px";
  document.body.append(span);
}
```

## 字符串截取

```js
let string = "songzhengxiang";
// 截取从下标为1的到下标为5的
console.log(string.slice(1, 5));

// 截取从下标为1往后5位数的字符串
console.log(string.substr(1, 5));

// 截取从下标为1的到下标为5的
console.log(string.substring(1, 5));
```

## 字符串检索的几种技巧

```js
let string = "songzhengxiang";

// idnexOf 查找，有则返回下标，没有则返回-1
// 第二个参数表示从第几个下标开始查找，负数代表从后面第几个开始往前查找
if (string.indexOf("z", 2) !== -1) {
  console.log("indexOf找到了");
} else {
  console.log("indexOf没找到");
}

// includes 查找，有则返回true，没有则返回false
if (string.includes("s")) {
  console.log("includes找到了");
} else {
  console.log("includes没找到");
}

// lastIndexOf 返回元素的下标
console.log(string.lastIndexOf("n"), "lasIndexOf");

// 判断是否为开头
console.log(string.startsWith("s"));

// 判断是否为结尾
console.log(string.endsWith("g"));

// 判断字符串中是否包含关键字
let guanjian = ["关键词1", "关键词2"];
let content = "这是由关键词和关键词2组合成的句子";
let state = guanjian.some((item) => {
  return content.includes(item);
});
if (state) {
  console.log("包含关键词");
} else {
  console.log("不包含关键词");
}
```

## 字符串替换关键字

```js
// 判断字符串中是否包含关键字
let guanjian = ["关键词1", "关键词2"];
let content = "这是由关键词1和关键词2组合成的句子";

content = content.replace("关键词", `66666`);
console.log(content);
document.write(content);
```

## 电话号模糊处理

```js
function muhu(phone) {
  return String(phone).replace(String(phone).slice(3, 7), "****");
}
console.log(muhu(17655544884)); // 176****4884
```

## Boolean 值隐式转换

```js
let array = [];
// 空数组转换为数值为0
console.log(Number(array));
console.log(Boolean(array)); // true

// false转换为数值为 0
console.log(Number(false));

// false转换为数值为 1
console.log(Number(true));

let object = {};
console.log(Boolean(object)); // true
```

## 显示转换 Boolean 类型

```js
let number = 0;
// 两个感叹号，先转换为布尔类型，然后取两次反得到布尔类型
console.log(!!number); // false
console.log(Boolean(number)); // false
```

## Number 类型声明和基本函数使用

```js
let count = 99.5;
console.log(typeof count); // number

// 转换为字符串类型
console.log(typeof count.toString()); // string

// 四舍五入保留两位小数点
console.log(count.toFixed(2)); // 99.40

// 判断是否为整数
console.log(Number.isInteger(count)); // false
```

## 判断 NaN 类型

```js
let string = "songzheng";
console.log(2 / string); // NaN

console.log(Number.isNaN(2 / string)); // true
```

## Math 数学计算

```js
let gard = [1, 15, 54, 98, 5, 43];
// 取最大值
console.log(Math.max(...gard)); // 98

// 取最小值
console.log(Math.min(...gard)); // 1

// 向上取整
console.log(Math.ceil(5.005)); // 6

// 向下取整
console.log(Math.floor(5.999)); // 5

// 四舍五入
console.log(Math.round(5.52)); // 6
```

## Math.random 随机点名

```js
let namearray = ["张三", "李四", "王五", "赵六", "马奇"];

// 随机获取大于0小于5的一个随机数
console.log(Math.random() * 5);

// 随机 0 到 某个值得随机数  >=0 ~ <= 某个值
// 公式 Math.floor(Math.random() * (max + 1))
console.log(Math.floor(Math.random() * (5 + 1)));

// 随机某个区间的随机数
// min + Math.floor(Math.random() * (max + 1 - min))
console.log(2 + Math.floor(Math.random() * (5 + 1 - 2)));

let index = Math.floor(Math.random() * namearray.length);
console.log(namearray[index]);

let a = Math.floor(1 + Math.random() * (3 + 1 - 1));
console.log(namearray[a]);

function random(arr, start = 1, end) {
  end = end ? end : arr.length;
  start--;
  let index = Math.floor(start + Math.random() * (end - start));
  return arr[index];
}
// 只在第三个和第四个中间随机点名
console.log(random(namearray, 3, 4));
```

## 日期时间戳计算脚本执行时间

```js
let start = Date.now();
for (let a = 0; a < 10; a++) {
  console.log(a);
}
let end = Date.now();
console.log(end - start + "ms");

console.time("sss");
for (let a = 0; a < 100; a++) {}
console.timeEnd("sss");
```

## 封装日期格式化函数

```js
let date = new Date();
// 年
console.log(date.getFullYear());
// 月
console.log(date.getMonth() + 1);
// 日
console.log(date.getDate());
// 时
console.log(date.getHours());
// 分
console.log(date.getMinutes());
// 秒
console.log(date.getSeconds());

function dateFormat(date, format = "YYYY-MM-DD HH:mm:ss") {
  const config = {
    YYYY: date.getFullYear(),
    MM:
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1,
    DD: date.getDate(),
    HH: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds(),
  };
  for (let key in config) {
    format = format.replace(key, config[key]);
  }
  return format;
}
console.log(dateFormat(date, "YYYY-MM-DD HH:mm:ss"));
```

## 使用 moment

```js
<script src="http://cdn.staticfile.org/moment.js/2.24.0/moment.js"></script>;
console.log(moment().format("YYYY-MM-DD HH:mm:ss dddd"));
console.log(moment().format("LLLL"));
```
