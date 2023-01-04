---
title: 数组挖掘
tags: JavaScript
categories: JS系统学习
abbrlink: 89c247af
date: 2020-12-22 00:00:00
---

## 数组引用类型分析

{% note info no-icon %}
利用<code>console.table()</code>可以在控制台以表格的形式打印出数组
{% endnote %}

```js
let a = [
  { title: "标题1", name: "数氺哦速度符合速度符合哦" },
  { title: "天文一号上天", name: "数氺哦速度符合速度符合哦" },
  { title: "杭州赖女士失踪", name: "数氺哦速度符合速度符合哦" },
  { title: "牛市来临", name: "数氺哦速度符合速度符合哦" },
  { title: "中美关系紧张", name: "数氺哦速度符合速度符合哦" },
];
console.log(a);
// 在控制台打印表格信息
console.table(a);
```

## 数组的创建

{% note info no-icon %}
<code>new Array(6)</code>是往一个数组中放进 6 个空值，数组的长度变成 6，<code>Array.of(6)</code>是将数字 6 放进数组中，数字的长度是 1。
{% endnote %}

```js
const newdate = new Array(6);
console.log(newdate); // (6) [empty × 6]
console.log(newdate.length); // 6

const data = Array.of(6);
console.log(data); // [6]
console.log(data.length); // 1
```

## 类型检测和转换

{% note info no-icon %}

- <code>obj instanceof Array</code>判断一个数据是否是数组
- <code>join(",")</code>将一个数组以某个字符串拼接
- <code>toString()</code>将数组转为字符串
- <code>split("/")</code>以某个字符分隔字符串使之变成数组
- <code>Array.from(str)</code>Array.from 只能将有 length 属性的元素转为数组
  {% endnote %}

```js
let obj = [1, 2, 3];
console.log(obj);
// 检测数据类型
console.log(obj instanceof Array); // true

// 数组转换为字符串
// join 数组内容拼接
console.log(obj.join("")); // 123

// toString 方法将数组转为字符串
console.log(obj.toString()); // 1,2,3

// 字符串转为数组
let str = "songzheng";
// split 按照某个字符串分隔字符串变成数组
console.log(str.split("")); // ["s", "o", "n", "g", "z", "h", "e", "n", "g"]

// Array.from 只能将有 length 属性的元素转为数组
console.log(Array.from(str)); // ["s", "o", "n", "g", "z", "h", "e", "n", "g"]

let objs = {
  0: "张三",
  1: "6",
  length: 2,
};
console.log(Array.from(objs)); // ["张三", "6"]
```

## 展开语法

{% note info no-icon %}
展开语法以<code>...</code>的形式使用。效果是将一个数组展开放进一个新的数组中，如果在一个字符串前加上展开语法，可以将这个字符串变成同等长度的数组。
{% endnote %}

```js
// 利用展开语法合并两个数组
let arr1 = [45, 65, 84];
let arr2 = ["song", "zheng"];
// 将两个数组合并成一个新数组
console.log([...arr1, ...arr2]); // [45, 65, 84, "song", "zheng"]

// 展开语法求和
function count(...arguments) {
  // 接收到所有参数放进一个数组中
  console.log(arguments); // [15, 46, 78, 98, 87, 65]
  return arguments.reduce((s, v) => {
    return (s += v);
  }, 0);
}
console.log(count(15, 46, 78, 98, 87, 65));
```

## 点语法操作 DOM 节点

{% note info no-icon %}

- <code>document.querySelector()</code>获取单个元素
- <code>document.querySelectorAll()</code>获取全部的某个元素
  {% endnote %}

```html
<div>song</div>
<div>zheng</div>
```

```js
const divs = document.querySelectorAll("div");
console.log(...divs);

Array.from(divs).map(function(item) {
  item.style.fontSize = "50px";
});
```

## 解构语法

{% note info no-icon %}
destructuring：百度百科的意思是结构分解，ES6 中允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）
{% endnote %}

```js
// 使用解构赋值交换变量
let a = 1;
let b = 2;
[b, a] = [a, b];
console.log(a); // 2
console.log(b); // 1

// 使用解构获取数组的某个值,逗号表示一个值
let [, wname] = ["李四", "王五"];
console.log(wname); // 王五

// 使用解构拿到数组里面的值
let [_name, year] = ["song", 2020];
console.log(_name, year); // song 2020

// 使用...将数组中多余的元素都放到一个变量中
let [user, ...args] = ["song", 2020, "zheng"];
console.log(user); // song
console.log(args); // [2020, "zheng"]

// 使用解构如果右侧是字符串会将字符串展开变成数组
let [name1, name2, ...str] = "xiang";
console.log(name1, name2, str); // x i ["a", "n", "g"]
```

## 添加元素的多种操作技巧

{% note info no-icon %}

- <code>push()</code>，往数组里面追加元素，追加的元素排在最后一位
- <code>pop()</code>，删除数组最后一个元素
- <code>unshift()</code>，从数组开始处添加元素，效果与 push 相反
- <code>shift()</code>，删除数组第一个元素
- <code>fill(val,startindex,endindex)</code>，使数组内容都变成某个值。这个方法接收三个参数，<code>val</code>：替换的内容；<code>startindex</code>：从哪个下标开始；<code>endindex</code>：截止到哪个下标，结束下标不替换
- <code>splice(delindex,delnumber,updateval)</code>，删除元素。这个方法接收三个参数，<code>delindex</code>：要删除元素的下标；<code>delnumber</code>：删除的个数；<code>updateval(可选)</code>：删除后替换的值
  {% endnote %}

```js
// 从最后添加
arr.push(15);
console.log(arr);

// pop 删除数组最后一个元素
arr.pop();
console.log(arr);

// 从数组开始处添加
arr.unshift("从第一个添加");
console.log(arr);

// 删除数组第一个元素
arr.shift();
console.log(arr);

// fill 使数组内容都变成某个值
let filldata = [1, 2, 3, 4, 5, 6, 7, 8];
// 从下标1开始替换，截止到下标4结束，下标4不替换
filldata.fill("5", 1, 4);
console.log(filldata); // [1, "5", "5", "5", 5, 6, 7, 8]

// splice 删除元素
let splicedata = [1, 2, 3, 4, 5, 6, 7, 8];
// 删除0下标，删除1个，并添加一个新的值为“开始”
splicedata.splice(0, 1, "开始");
console.log(splicedata); // ["开始", 2, 3, 4, 5, 6, 7, 8]
```

## 数组移动示例

{% note info no-icon %}
<code>splice</code>如果删除的个数为 0 时，并且有替换的元素则会在这个位置新增数据，数组长度加 1，原有数据保留。
{% endnote %}

```js
let arr = [1, 2, 3, 4];
function move(arr, from, to) {
  const newarr = [...arr];
  // 获取到被删除的数据
  let item = newarr.splice(from, 1);
  console.log(newarr); // [1, 3, 4]
  // 将目标下标替换为刚才删除的数据完成移动
  newarr.splice(to, 0, ...item);
  return newarr;
}
// 将arr数组中下标为1的元素移动到下标2中
console.table(move(arr, 1, 2));
```

## 清空数组的多个方法

```js
// arr = [] 方式清空数组
// arr 等于一个空的数组时相当于又指向了一个新的引用空间，
// 原有的引用空间不会变，所以nerarr不会被清空
let arr = [1, 2, 3, 4, 5];
let newarr = arr;
arr = [];
console.log(arr);
console.log(newarr);

// 使用length = 0这种方式清空数组时因为他们指向的都是同一个引用空间，
// length 直接改变了原本的引用空间，所以用length 清空数组后，
// 所有指向这一引用空间的数组都将被清空
let len = [1, 2, 3, 4, 5];
let newlen = len;
newlen.length = 0;
console.log(len);
console.log(newlen);
```

## includes 判断元素是否在数组内

{% note info no-icon %}

- <code>indexOf()</code>，查找到元素后返回元素的下标，否则返回-1
- <code>includes()</code>,如果元素在数组内就返回 true，不在返回 false
  {% endnote %}

```js
let arr = [1, 2, 3, 4, 5];
// indexOf 返回元素在数组内的下标，没有返回 -1
console.log(arr.indexOf(2));

// includes 如果元素在数组内就返回true，不在返回 false
console.log(arr.includes(2));
```

## find 查找元素

{% note info no-icon %}

- <code>find()</code>,返回找到的元素本身，找到就不会继续往下找,找不到返回[]
- <code>findIndex()</code>,返回要找元素的下标,找到就不会继续往下找,找不到返回-1
  {% endnote %}

```js
let findarr = [
  {
    name: "css",
    money: "999",
  },
  {
    name: "js",
    money: "899",
  },
  {
    name: "html",
    money: "699",
  },
];
// find 可以返回查找到的元素的
let data = findarr.find((item) => {
  return item.name == "js";
});
// findIndex 返回查找到的元素的下标
let dataidnex = findarr.findIndex((item) => {
  return item.name == "jssss";
});
console.log(data);
console.log(dataidnex);
```

## 数组排序的方法

{% note info no-icon %}
<code>sort()</code>,a -b 从小到大， b -a 从大到小
{% endnote %}

```js
let arr = [
  {
    name: "小米10",
    money: 3999,
  },
  {
    name: "小米10青春版",
    money: 2399,
  },
  {
    name: "小米9",
    money: 2999,
  },
];
// sort排序，a -b 从小到大， b -a 从大到小
arr.sort((a, b) => {
  return a.money - b.money;
});
console.table(arr);
```

## sort 实现原理

```js
let arr = [4, 3, 6, 9, 4, 2, 0];

function sorts(array, callback) {
  let arrlength = array.length;
  for (let i = 0; i < arrlength; i++) {
    for (let m = 0; m < arrlength; m++) {
      if (callback(array[i], array[m]) > 0) {
        let temp = array[i];
        array[i] = array[m];
        array[m] = temp;
      }
    }
  }
  return array;
}
arr = sorts(arr, function(a, b) {
  return b - a;
});
console.table(arr);
```

## for of 和 for in 循环

{% note info no-icon %}

- <code>for of</code>如果数组内是数值类型，fon of 不能改变原数组。
- 如果数组内元素是引用类型是 for of 可以改变原数组
- <code>for in</code>利用 for in 遍历下标，通过下标可以直接改变原数组
  {% endnote %}

```js
let arr = [1, 2, 3, 4, 5];

// 如果数组内是数值类型，fon of 不能改变原数组
for (let newarr of arr) {
  newarr++;
}
console.table(arr);

// 利用 for in 遍历下标，通过下标可以直接改变原数组
for (let newarr in arr) {
  arr[newarr]++;
}
console.table(arr);

let yinyongarr = [
  {
    name: "小米10",
    money: 3999,
  },
  {
    name: "小米10青春版",
    money: 2399,
  },
  {
    name: "小米9",
    money: 2999,
  },
];

// 如果数组内元素是引用类型是for of 可以改变原数组
for (let newarr of yinyongarr) {
  newarr.name = `XiaoMi${newarr.name}`;
}
console.table(yinyongarr);

// 对象同时接收键和值
for (let [key, val] of array.entries()) {
  console.log(key, val);
}
```

## forEach 操作 DOM 元素

{% note info no-icon %}

- <code>element.addEventListener("click",()=>{})</code>可以给某个元素添加不同事件
  {% endnote %}

```css
ul {
  list-style: none;
}

.tagglecolor {
  color: rgb(218, 20, 20);
  text-decoration: line-through;
}
```

```html
<ul>
  <li>css</li>
  <li>js</li>
</ul>
```

```js
let lis = document.querySelectorAll("li");
lis.forEach((item) => {
  console.log(item);
  item.style.fontSize = "30px";
  item.addEventListener("click", function() {
    this.classList.toggle("tagglecolor");
  });
});
```

## every 和 some 的用法

{% note info no-icon %}

- <code>some</code>，只要有一个或者多个满足条件就返回 true，否则返回 false
- <code>every</code>，必须所有的都满足条件才会返回 true，否则返回 false
  {% endnote %}

```js
let arr = [
  {
    name: "张三",
    fraction: 56,
  },
  {
    name: "李四",
    fraction: 79,
  },
  {
    name: "王五",
    fraction: 89,
  },
];

// some 只要有分数大于60的就返回 true
let someres = arr.some((item) => {
  return item.fraction > 60;
});
console.log(someres); // true

// every 必须所有人的成绩都大于 60 才会返回true,否则返回false
let everyres = arr.every((item) => {
  return item.fraction > 60;
});
console.log(everyres); // false
```

## filter 过滤函数

{% note info no-icon %}
<code>filter</code>筛选出满足条件的数据返回一个新数组，没有的话返回 []
{% endnote %}

```js
let arr = [
  {
    name: "小米10",
    money: 3999,
  },
  {
    name: "小米10青春版",
    money: 2399,
  },
  {
    name: "小米9",
    money: 2999,
  },
];
// filter 过滤函数，筛选出价格小于3000的元素
let newarr = arr.filter((item) => {
  return item.money < 3000;
});
console.table(newarr);

// 自定义filter函数
function filter(array, callback) {
  let newarr = [];
  for (let val of array) {
    if (callback(val)) {
      newarr.push(val);
    }
  }
  return newarr;
}

let newfilter = filter(arr, (val) => {
  return val.money < 3000;
});
console.table(newfilter);
```

## map 映射数组与引用类型处理技巧

{% note info no-icon %}
<code>map</code>会改变原来的数组，<span style="color:red">如果数组里面的元素是数值类型通过 map 处理不会改变原数组</span>
{% endnote %}

```js
let arr = [
  {
    name: "小米10",
    money: 3999,
  },
  {
    name: "小米10青春版",
    money: 2399,
  },
  {
    name: "小米9",
    money: 2999,
  },
];
// 改变原数组
// arr.map(item => {
//     return item.money -= 200
// })
console.table(arr);

// 不改变原数组
let newarr = arr.map((item) => {
  return Object.assign(item, { money: (item.money -= 200) });
});
console.table(newarr);

// 如果数组里面的元素是数值类型通过 map 处理不会改变原数组
let numdata = [1, 2, 3, 4, 5];
let newnumdata = numdata.map((item) => {
  return item * 5;
});
console.table(numdata);
console.table(newnumdata);
```

## reduce 函数的妙用

```js
let arr = [1, 2, 1, 1, 5, 6, 1, 6];
// pre:第一次为数组的第一个值，第二次循环是reduce的返回值
// val 为数组的值
// arr.reduce((pre, val, index, arr) => {
//     console.log(pre)
//     console.log(val)
// })

// 计算某个值在数组中出现的次数
function total(array, val) {
  return array.reduce((count, value) => {
    count += value == val ? 1 : 0;
    return count;
  }, 0);
}
console.log(total(arr, 6));

// 通过reduce计算数字中元素最大值
let maxarr = [1, 45, 2, 98, 65, 45];
function countMaxArr(arr) {
  return arr.reduce((pre, val) => {
    pre = pre > val ? pre : val;
    return pre;
  });
}
console.log(countMaxArr(maxarr));
console.log(Math.max(...maxarr));

// 去除数组中的重复值
let cart = [
  {
    name: "miaomi10",
    price: 3999,
  },
  {
    name: "miaomi9",
    price: 3799,
  },
  {
    name: "miaomi10",
    price: 3999,
  },
  {
    name: "miaomi8",
    price: 2799,
  },
];
function filtercart(arr) {
  return arr.reduce((pre, val) => {
    let finds = pre.find((item) => {
      return item.name == val.name;
    });
    if (!finds) {
      pre.push(val);
    }
    return pre;
  }, []);
}
console.log(filtercart(cart));
```
