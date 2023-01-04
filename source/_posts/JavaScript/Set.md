---
title: Set 和 WeakSet
tags: JavaScript
categories: JS系统学习
abbrlink: 1f38ba3f
date: 2020-12-21 00:00:00
---

# Set 和 WeakSet

{% note info no-icon %}
Set 对象是值的集合，你可以按照插入的顺序迭代它的元素。 Set 中的元素只会出现一次，即 Set 中的元素是唯一的
{% endnote %}

## Set 类型与 Object 与 Array 类型对比分析

```js
// Object类型的声明和赋值
let obj = {};
obj.name = "张三";
console.log(obj.name);

// Array类型的声明和赋值
let arr = [];
arr.push(1, 2, 3, 4, 4, 3, 2, 1);
console.log(arr);

// Set类型的声明和赋值,其中set里面的值不会重复
let set = new Set();
set.add(1);
set.add(1);
set.add(2);
console.log(set);
```

## Set 的增删改查

声明<code>set</code>类型

```js
let set = new Set();
```

<code>set</code>增加方法

```js
set.add(1);
set.add(2);
```

<code>set</code>增加方法，单个删除,返回布尔类型,清空整个 set 数组,没有返回值

```js
// 单个删除
set.delete(1);
// 清空全部
set.clear();
```

查询方法

```js
// 查询set里面的元素个数
console.log(set.size); // 2

// 展开语法查看set
console.log([...set]); // [1,2]

// 判断某个元素是否存在,返回布尔类型
console.log(set.has(1)); // true
```

## Set 和 Array 类型互帮互助

案例一：筛选 set 中大于 5 的值

```js
let set = new Set("123456789");
set = new Set([...set].filter((item) => item > 5));
console.log(set);
// 可以使用展开语法把set变成数组
console.log([...set]);
// 或者使用Array.from()把set变成数组
console.log(Array.from(set));
```

案例二：利用 set 特性去除数组中的重复值

```js
let arr = [1, 2, 3, 1, 5, 4, 2, 1, 4, 5, 1];
arr = [...new Set(arr)];
// 利用 sort 排序
console.log(
  arr.sort((a, b) => {
    return a - b;
  })
);
```

## Set 的遍历方法

forEach 遍历 set 时的下标和值都是一样的

```js
let set = new Set("321");
set.forEach((item, index) => {
  console.log(item, index);
  /*
    3  3
    2  2 
    1  1
    */
});
```

forEach 遍历数组时的下标是正确的下标

```js
let setarr = [...set];
setarr.forEach((item, index) => {
  console.log(item, index);
});
```

使用 for of 遍历也可以直接遍历到 set 里面的值

```js
for (let val of set) {
  console.log(val);
}
```

## Set 存储唯一名称实例

```html
<input type="text" name="input" />
<ul></ul>
```

```js
let obj = {
  data: new Set(),
  setvalue(val) {
    this.data.add(val);
  },
  showdata() {
    let ul = document.querySelector("ul");
    ul.innerHTML = "";
    this.data.forEach((item) => {
      ul.innerHTML += `<li>${item}</li>`;
    });
  },
};
let input = document.querySelector("[name='input']");
input.addEventListener("keyup", (e) => {
  // 按下回车是添加输入框的名称
  if (e.keyCode == 13) {
    if (input.value) {
      obj.setvalue(input.value);
      obj.showdata();
      input.value = "";
    }
  }
});
```

## 利用 Set 取元素的并集，交集，差集

取并集

```js
let set1 = [1, 2, 3, 4];
let set2 = [3, 4, 5, 6];

// 并集,利用set的去重特性非常方便的取到并集
let bingji = new Set([...set1, ...set2]);
console.table([...bingji]);
```

取交集

```js
// 交集，利用filter过滤其中一个数组中包含另外一个数组的值，返回交集
let jiaoji = set1.filter((item) => {
  return set2.includes(item);
});
console.log([...jiaoji]);
```

取差集

```js
// 差集，先合并两个数组在过滤两个数组中数组1不包含数组2的，和数组2 不包含数组1的
let chaji = [...new Set([...set1, ...set2])].filter((item) => {
  return !set1.includes(item) || !set2.includes(item);
});
console.log(chaji);
```

## 引用类型的垃圾回收原理

```js
let obj = {
  name: "李四",
};

// 此处obj赋值给obj1并不是真正的把自己的值给到obj1,只是引用了同一个内存地址
let obj1 = obj;

// 如果吧obj置为空，则obj1仍然引用原本的内存地址，所以obj1的值不会改变
obj = null;

// 如果把两个值都置为null，则表示这两个值都切断了自己和内存地址的联系，
// 这时内存中的值没有被任何变量引用，会被自动作为垃圾回收
obj1 = null;

console.log(obj);
console.log(obj1);

let a1 = 666;
let a2 = a1;
a1 = 999;
console.log(a1, a2); // 666 999

let b1 = (b2 = 999);
b2 = 666;

console.log(b1, b2); // 666 999
// 解析：js赋值语句从右往左进行逐级赋值，先让b2等于了999，然后b1等于b2
// 此时 b2 = 999，b1 = 999
// 之后改变了b2的值为666，但是b1的值没有发生改变，所以b1还是999
```

## WeakSet 弱引用类型

{% note info no-icon %}
WeakSet 对象允许你将弱保持对象存储在一个集合中。
{% endnote %}

```js
let foo = {};
let bar = {};
// 声明weakSet
let weakset = new WeakSet();
weakset.add(foo);
weakset.add(bar);

// delete删除
weakset.delete(foo);
// has判断是否存在
console.log(weakset.has(foo)); // false
console.log(weakset.has(bar)); // true

console.log(weakset);
```

## TODO 任务列表点击删除功能 -- 示例

```css
ul {
  list-style: none;
}

li {
  padding: 3px;
  border: 2px solid #0703d6;
  margin: 2px;
  width: 200px;
  color: #0703d6;
  transition: 0.5s;
}

.remove {
  color: grey;
  transition: 0.5s;
  border-color: grey;
}
```

```html
<div>
  <ul>
    <li>xiaomi10</li>
    <li>xiaomi9</li>
    <li>xiaomi6</li>
  </ul>
</div>
```

```js
// 声明一个类
class TODE {
  constructor() {
    // 声明一个WeakSet变量
    this.weakset = new WeakSet();
    // 获取到所有的li元素
    this.lis = document.querySelectorAll("li");
    // 循环遍历所有的li元素
    this.lis.forEach((item) => {
      // 循环往weakset中添加元素
      this.weakset.add(item);
    });
  }
  run() {
    // 遍历所有的li元素
    this.lis.forEach((item) => {
      // 给li添加点击事件
      item.addEventListener("click", () => {
        // 利用has判断weakset中是否存在点击的当前元素
        if (this.weakset.has(item)) {
          // 如果存在则删除weakset中的此元素
          this.weakset.delete(item);
          // 给当前的li添加remove类样式
          item.classList.add("remove");
        } else {
          this.weakset.add(item);
          item.classList.remove("remove");
        }
      });
    });
  }
}
// new上面的类，会自动执行类中的constructor方法
new TODE().run();
```
