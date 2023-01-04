---
title: 探索 JS 中的对象
tags: JavaScript
categories: JS系统学习
abbrlink: b35be3d8
date: 2021-01-09 00:00:00
---

{% note info no-icon %}

#### 什么是面向对象

- 面向对象不是新的东西，它只是过程式代码的一种高度封装，目的在于提高代码的开发效率和可维护性。

#### 面向对象的特性

- 封装性
- 继承性
- 多态性
{% endnote %}

## 函数编程与面向对象对比

```js
// 例子：求出李四的成绩的平均数

// 方式一：函数编程
let name = "李四";
let grade = [
  {
    name: "js",
    score: 99,
  },
  {
    name: "css",
    score: 69,
  },
];
function average(name, grade) {
  let count = grade.reduce((o, l) => o + l.score, 0);
  return `${name}的平均分是${count / grade.length}`;
}
console.log(average(name, grade));

// 方式二：面向对象编程
// 优点：代码结构清晰明了，便于维护；减少参数传递，更精简。
let user = {
  name: "李四",
  grade: [
    {
      name: "js",
      score: 99,
    },
    {
      name: "css",
      score: 69,
    },
  ],
  average() {
    let count = this.grade.reduce((o, l) => o + l.score, 0);
    return `${this.name}的平均分是${count / this.grade.length}`;
  },
};
console.log(user.average());
```

## 属性的基本操作方法

```js
let user = {
  name: "李四",
  height: 188,
  18: "18岁",
};
// 读
console.log(user.name);
// or
console.log(user["name"]);
// 中括号的读取
console.log(user[18], "读取数字");

// for in 遍历
for (const key in user) {
  console.log(user[key]);
}

// 增
user.age = 18;
user.getname = function() {
  return this.name;
};
console.log(user.getname());

// 删
delete user.name;
```

## 对象的引用传址

```js
// 对象传址
let user = {
  name: "李四",
};
function getuser(a) {
  a.age = "8";
}
// 传递对象时传递对象的内存地址，在方法中拿到的是对象的地址
// 所以在函数中操作对象的内存地址会该改变原来的对象数据
getuser(user);

// 打印的是被方法处理后的对象数据
console.log(user); // {age: "8",name: "李四"}

// 数值传值
let name = "张三";
function updatename(name) {
  // 在方法内部相当于是重新声明了一个函数，是另一的新的内存地址
  // 方法内部改变不会影响到外面的变量。
  name = "李四";
  console.log(name); // 李四
}
// 数值传递是值
updatename(name);
console.log(name); //张三
```

## 使用展开语法完成参数合并

```js
let user = {
  name: "李四",
  age: "18",
};
// 展开语法合并两个对象
let newuser = { ...user, height: 175, weight: 55 };
console.log(newuser); // {name: "李四", age: "18", height: 175, weight: 55}

function updatefile(config) {
  let type = {
    type: "*.jpg,*.png",
    size: 10000,
  };
  type = { ...type, ...config };
  return type;
}
// 对象中同名参数后面的会覆盖前面的

// {type: "*.png", size: 999}
console.log(updatefile({ size: 999, type: "*.png" }));
```

## 结构赋值新增操作

```js
let user = {
  name: "李四",
  age: 18,
};
// 对象解构，可以分解获取对象的部分数据
let { name: a, age: g } = user;
console.log(a); // 李四
console.log(g); // 18

let info = {
  title: "实践是检验真理的唯一标准",
  count: 99,
};
// 如果声明的变量名称和对象里面的名称同名可以简写
let { title, count } = info;
console.log(title); // 实践是检验真理的唯一标准
console.log(count); // 99

let { random, floor } = Math;
console.log(floor(random() * 10));
```

## 严格模式中解构语法的差异

{% note info no-icon %}
在 js 代码的第一行声明 <code>"use strict";</code>表示严格模式
{% endnote %}

```js
// 严格模式下，变量必须有声明操作，不能直接调用
"use strict";
let { name, age } = { name: "李四", age: 15 };
console.log(name);
console.log(age);
```

## 解构操作的简写形式与变量解构

```js
// 对象解构，如果定义的变量名称和对象名称一样可以简写
let user = {
  name: "Lisi",
  age: 18,
};
let { name, age } = user;
console.log(name);
console.log(age);

// 将变量转为对象,可以简写
let height = 188;
weight = 56;
let hobj = { height, weight };
console.log(hobj);
```

## 多层对象解构操作

```js
let obj = {
  name: "lisi",
  info: {
    height: "188",
    weight: "56",
  },
};
// 多层解构方法，相当于把info对象里面的height解构赋值给height变量。例子如下
// let {height} = {height:"188"}

let {
  name,
  info: { height },
} = obj;
console.log(height);
```

## 解构默认值实现配置项合并

{% note info no-icon %}
参数后面跟上等号表示默认值
{% endnote %}

```js
function createelement(setting = {}) {
  // 解构里面的参数后面加上等号是默认值
  let { width = 200, height = 100, backgroundColor = "red" } = setting;
  const div = document.createElement("div");
  div.style.width = width + "px";
  div.style.height = height + "px";
  div.style.backgroundColor = backgroundColor;
  document.body.appendChild(div);
}
createelement({ width: 30, height: 60 });
```

## 函数参数的解构特性使用技巧

```js
function getuserinfo(name, { sex, age }) {
  // 利用解构语法，同名直接取值
  console.log(name); // lisi
  console.log(sex); // men
  console.log(age); // 18
}
getuserinfo("lisi", { sex: "men", age: 18 });
```

## 对象属性增删改查

{% note info no-icon %}
<code>Obj.hasOwnProperty(key)</code>判断对象中某元素是否存在，存在返回 true，不存在返回 false。

- 注意：<code>Obj.hasOwnProperty(key)</code>只判断对象本身有的元素，不会判断原型链上的内容
  {% endnote %}

```js
let user = {
  name: "lisi",
};
// 点名称增加
user.age = 18;
// 中括号增加
user["sex"] = "男";
console.log(user);

// 删除
delete user.name;
console.log(user);

// 判断属性是否存在
console.log(user.hasOwnProperty("sex")); // true
console.log(user.hasOwnProperty("sdfsdfsdf")); // false
```

## 对象与原型链检测实例

{% note info no-icon %}
使用 <code>key in obj</code>可以判断某个属性是否在这个对象中以及它的原型链上。
{% endnote %}

```js
let user = {
  name: "lisi",
};
let newuser = {
  age: "18",
};
// user继承newuser
user.__proto__ = newuser;
console.log(user);
// hasOwnProperty只检测对象自己的元素，不检测原型链上的东西
console.log(user.hasOwnProperty("name")); // true
console.log(user.hasOwnProperty("toString")); // false
console.log(user.hasOwnProperty("age")); // false

// xxx in obj 可以检测对象自己和原型链上的东西
console.log("name" in user); // true
// toString是user原型链上的一个属性，使用 in 来查询返回true
console.log("toString" in user); // true
console.log("age" in user); // true
```

## 计算属性和 assign 合并两个对象

{% note info no-icon %}
<code>Object.assing(obj1,obj2)</code>可以合并对象 obj1 和对象 obj2
{% endnote %}

```js
let user = {
  name: "lisi",
};
let info = {
  age: 18,
  ght: {
    height: 188,
  },
};
// Object.assign 合并两个队形
user = Object.assign(user, info);
console.log(user);
console.log(JSON.stringify(user, null, 2));

let userinfo = [
  {
    name: "css",
    desc: "美化页面",
  },
  {
    name: "js",
    desc: "使页面动态化",
  },
  {
    name: "html",
    desc: "页面的核心部分",
  },
];

let res = userinfo.reduce((obj, cul, index, data) => {
  // obj：每次循环后返回的值
  // cul：遍历的每个值
  // index：遍历的下标
  // data：遍历的数组
  obj[`${cul.name}-${index + 1}`] = cul;
  return obj;
}, {});
console.log(JSON.stringify(res, null, 2));
```

## 对象的几种遍历操作，keys、values、entries

{% note info no-icon %}

- <code>Object.keys(object)</code>遍历对象的所有键名，返回一个数组
- <code>Object.values(object)</code>遍历对象的所有键值，返回一个数组
- <code>Object.entries(object)</code>遍历对象的键名和键值，返回一个二维数组
  {% endnote %}

```js
let user = {
  name: "lisi",
  age: 18,
  sex: "男",
  height: 188,
};

// Object.keys() 获取对象中的所有键名
console.log(Object.keys(user)); // ["name", "age", "sex", "height"]

// Object.values() 获取对象中所有的值
console.log(Object.values(user)); // ["name", "age", "sex", "height"]

// Object.entries() 获取队形的键名和值
console.log(Object.entries(user));
// [["name","lisi"],["age",18],["sex","男"],["height",188]]

// for in 获取对象的值
for (const key in user) {
  console.log(user[key]);
}
// for of 获取键和值
for (const [key, value] of Object.entries(user)) {
  console.log(`${key}:${value}`);
}
```

## 对象浅拷贝的几种方式

{% note info no-icon %}

- 浅拷贝：可以理解为一个新的对象只是简单的复制了原有对象的内存地址
  新旧对象指向的都是同一个引用地址

* 深拷贝：完全开辟出的一个新空间来存放和旧对象中一模一样的数据，两者只是内容一样而已,
  改变原有对象，新复制出来的对象不会受到任何影响
  {% endnote %}

```js
let user = {
  name: "lisi",
  age: 18,
};

// 方式一，解构语法
let newuser1 = { ...user };
newuser1.name = "wangwu";
console.log(newuser1, "newuser1"); // {name: "wangwu", age: 18}
console.log(user, "user"); // {name: "lisi", age: 18}

// 方式二,巧用对象合并 assign
let newuser2 = Object.assign({}, user);
newuser2.name = "zhaoliu";
console.log(newuser2); // {name: "zhaoliu", age: 18}
console.log(user); // {name: "lisi", age: 18}

// 方式三，for in 循环赋值
let newuser3 = {};
for (const key in user) {
  newuser3[key] = user[key];
}
newuser3.name = "maqi";
console.log(newuser3);
console.log(user);
```

## 深拷贝多层次分析

```js
// 场景一，要拷贝的目标中都由对象组成
let user = {
  name: "lisi",
  obj: {
    height: "188",
    age: "18",
  },
};
function copy1(obj) {
  let res = {};
  for (const key in obj) {
    // 此处用到递归
    // 如果循环到对象里面还是对象，就循环里面的对象，层层深入，一直循环到没有对象为止
    res[key] = typeof obj[key] === "object" ? copy1(obj[key]) : obj[key];
  }
  return res;
}
let newuser1 = copy1(user);
newuser1.obj.age = 19;
console.log(JSON.stringify(newuser1, null, 2), "拷贝后");
console.log(JSON.stringify(user, null, 2), "拷贝前");

// 场景二，拷贝的目标中既包含对象也包含数组
let arrdata = {
  name: "lisi",
  info: {
    age: "18",
    height: "188",
  },
  data: [
    {
      id: "1",
      title: "css",
    },
  ],
};
function copy2(obj) {
  // 先判断拷贝目标是对象还是数组，用instanceof判断原型是Array还是Object
  let res = obj instanceof Array ? [] : {};
  for (const [key, value] of Object.entries(obj)) {
    res[key] = typeof value === "object" ? copy2(value) : value;
  }
  return res;
}
let newarrdata = copy2(arrdata);
newarrdata.data[0].title = "6666";
console.log(JSON.stringify(newarrdata, null, 2), "拷贝后");
console.log(JSON.stringify(arrdata, null, 2), "拷贝源");

// 深拷贝的暴力方法
function deelClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
let obj1 = {
  name: "张三",
  age: 16,
  obj: {
    sex: "男",
    height: 188,
  },
  data: [
    {
      name: "sdfsdf",
    },
  ],
};
let obj2 = deelClone(obj1);
obj1.age = 30;
obj2.obj.sex = "女";
// {"name":"张三","age":30,"obj":{"sex":"男","height":188}}
console.log(obj1);
// {"name":"张三","age":16,"obj":{"sex":"女","height":188}}
console.log(obj2);
```

## 使用工厂函数创建对象

{% note info no-icon %}
所谓工厂函数可以理解为一个加工厂，传入参数，返回加工好的对象，对象中还可以包含方法等
{% endnote %}

```js
// 声明工厂对象
function libuser(name, age) {
  return {
    name,
    age,
    showname() {
      return `名字是${this.name}`;
    },
    showage() {
      return `年龄是${this.age}`;
    },
  };
}

let zs = libuser("张三", "18");
console.log(zs); // {name: "张三", age: "18", showname: ƒ, showage: ƒ}
console.log(zs.showname());
console.log(zs.showage());

let ls = libuser("lisi", "22");
console.log(ls); // {name: "lisi", age: "22", showname: ƒ, showage: ƒ}
console.log(ls.showname());
console.log(ls.showage());
```

## 构造函数创建函数的方式

{% note info no-icon %}
声明构造函数时首字母要大写
{% endnote %}

```js
// 创建构造函数时函数首字母大写
function User(msg) {
  this.name = msg;
  this.show = () => {
    console.log(this.name);
  };
}

let use = new User("李四");
use.show(); // 李四
```

## 数据也可以通过构造函数创建

```js
let name = new String("李四");
console.log(name.valueOf()); // 李四

let bool = new Boolean(false);
console.log(bool.valueOf()); // false
console.log(bool.toString()); // 'false'
console.log(typeof bool.toString()); // string
console.log(typeof bool.valueOf()); // boolean

let age = new Number(2);
console.log(age.toString() + 3); // 23
console.log(age.valueOf() + 3); // 5
```

## 面向对象的封装和抽象

```js
// 构造函数中的变量使用let进行封装，外部就不会对构造函数内数据造成影响
function User(name, age) {
  let data = { name, age };
  let info = () => {
    return data.age > 50 ? "中年" : "青年";
  };
  this.show = () => {
    console.log(data.name + info());
  };
}

let use = new User("李四", 18);
use.show(); // 李四青年

console.log(use.info); // undefined
```

## 对象的属性特征

{% note info no-icon %}

- <code>Object.getOwnPropertyDescriptor(obj,key)</code> 可以读取对象里面某个值得属性
- <code>value</code> 属性值
- <code>writable</code> 是否可写
- <code>enumerable</code> 是否可以被遍历
- <code>configurable</code> 是否可以被删除获取重新被配置

* <code>Object.getOwnPropertyDescriptors(obj)</code> 读取对象里面的所有属性
  {% endnote %}

```js
let user = {
  name: "lisi",
  age: "18",
};

// Object.getOwnPropertyDescriptor(obj,key)可以读取对象里面某个值得属性
// 读取到的结果
/*
            {
                value: "lisi"        属性值
                writable: true       是否可写
                enumerable: true     是否可以被遍历           
                configurable: true   是否可以被删除获取重新被配置
            }
        */
// 读取对象的单个值属性
console.log(Object.getOwnPropertyDescriptor(user, "name"));

// 读取队形里面所有值得属性
console.log(JSON.stringify(Object.getOwnPropertyDescriptors(user), null, 2));
```

## 灵活控制属性

{% note info no-icon %}

- <code>Object.defineProperty(obj,key)</code>表示设置 obj 对象的键名 key 的属性
- <code> writable: false</code>false 不可写，不能被修改
- <code>enumerable: false</code>不能被遍历
- <code>configurable: true</code>不能被二次配置
  {% endnote %}

```js
let user = {
  name: "lisi",
};
// 查看name的各项属性
console.log(
  JSON.stringify(Object.getOwnPropertyDescriptor(user, "name"), null, 2)
);

// Object.defineProperty 设置对象属性的值
Object.defineProperty(user, "name", {
  writable: false, // false 不可写，不能被修改
  enumerable: false, // 不能被遍历
  configurable: true, // 不能被二次配置
});
// 由于设置了name属性enumerable为false，表示不可被遍历，所以打印 {}
for (const key in user) {
  console.log(key); // {}
}
// 设置了name属性 writable 为 false，即不可被修改
user.name = "999";
console.log(user.name); // lisi

user.age = "18";
// 设置user对象中的age属性
Object.defineProperty(user, "age", {
  writable: true, // 可以被修改
  enumerable: true, // 可以被遍历
});
for (const key in user) {
  console.log(key); // age
}
user.age = 19;
console.log(user.age); // 19
```

## 不允许往对象添加属性 API

{% note info no-icon %}

- <code>Object.preventExtensions(obj)</code>不允许再往此对象中添加数据
- <code>Object.isExtensible(obj)</code>查看是否可以往对象中添加数据
  {% endnote %}

```js
let user = {
  name: "李四",
  age: "18",
};
// Object.preventExtensions() 里面放入对象名称，表示不能再往此对象中添加属性
Object.preventExtensions(user);

// 判断是否能往对象中添加属性
console.log(Object.isExtensible(user)); // false 表示不能添加； true 表示可以添加
console.log(user); //{name: "李四", age: "18"}
user.size = "666";
console.log(user); // {name: "李四", age: "18"}
```

## 封闭对象 API

{% note info no-icon %}

- <code>Object.seal(obj)</code>封闭对象，即不能删除已有属性，但可以修改已有属性的值，不能添加新的属性
- <code>Object.isSealed(obj)</code>查看对象是否被封闭，已封闭返回 true，未封闭返回 false
  {% endnote %}

```js
let user = {
  name: "lisi",
  age: 18,
};
// Object.seal() 封闭对象
Object.seal(user);
// 已封闭返回true，未封闭返回false
console.log(Object.isSealed(user));

/*
    {
    "name": {
        "value": "lisi",
        "writable": true,
        "enumerable": true,
        "configurable": false  封闭后的对象可配置变成false
    },
    "age": {
        "value": 18,
        "writable": true,
        "enumerable": true,
        "configurable": false
    }
    }
*/
console.log(JSON.stringify(Object.getOwnPropertyDescriptors(user), null, 2));

// 由于已经封闭了对象，所以不能对对象里面的值进行删除和添加
delete user.name;
user.height = "188";
console.log(user); // {name: "lisi", age: 18}
```

## 冻结对象 API

{% note info no-icon %}

- <code>Object.freeze(obj)</code>冻结对象，冻结后值不可被修改、属性不可重复修改、可以被遍历
- <code>Object.isFrozen(obj)</code>查看对象是否被冻结，是返回 true，不是返回 false
  {% endnote %}

```js
// "use strict"
let user = {
  name: "lisi",
  age: 18,
};

// 冻结对象API Object.freeze()
Object.freeze(user); // true

// 判断是否被冻结  true 被冻结； false 没有冻结
console.log(Object.isFrozen(user));

// 查看冻结后的对象属性
let userProDesc = Object.getOwnPropertyDescriptor(user, "name");
console.log(JSON.stringify(userProDesc, null, 2));
/*
  {
      "value": "lisi",
      "writable": false, // 值不可被修改
      "enumerable": true, // 可以被遍历
      "configurable": false // 不能被重新配置属性
  }
*/
// 尝试修改属性更改值
Object.defineProperty(user, "name", {
  writable: true,
});
user.name = "66666";
// 打印报错如下：Cannot redefine property: name，
// 因为已经被冻结，不允许重新修改配置后更改对象里面的值
// console.log(user);

// 对象被冻结的时候只可以调用，但是不能更改里面的值
for (const key in user) {
  console.log(key);
  // 下面的代码在严格模式下会报错，非严格模式代码无效
  user[key] = "666";
}
console.log(user);
```

## 使用访问器访问数据

```js
let user = {
  name: "李四",
  age: 18,
};
// 不设置访问器的时候可以随意更改对象中属性的值
// 当我们要控制对象里面的值不能被随意更改，需要一定规则限制的时候可以用对象的访问器来实现
user.age = 19999;

// 对象的访问器，相当于品控开关
let userdata = {
  data: {
    name: "lisi",
    age: 19,
  },
  // 方法前面加上 set 表示设置属性值
  set age(val) {
    if (typeof val === "number" && val > 10 && val < 100) {
      this.data.age = val;
    } else {
      console.error("设置的age不符合规范");
    }
  },
  get age() {
    return this.data.age;
  },
};

// 加上构造器后如果不符合要求会报错
// userdata.age = 105; // 设置的age不符合规范
userdata.age = 16;
console.log(userdata.age); // 16
```

## 使用访问器伪造属性

```js
let lesson = {
  list: [
    { name: "css", price: 60 },
    { name: "js", price: 70 },
    { name: "html", price: 80 },
    { name: "jquery", price: 90 },
    { name: "vue", price: 100 },
  ],
  // 可以利用访问器实现特定方法
  get total() {
    return this.list.reduce((v, l) => v + l.price, 0);
  },
  get namecount() {
    return `当前课程数量${this.list.length}`;
  },
  // 传入参数加到每个对象的name中
  set changename(val) {
    this.list.forEach((item) => {
      item.name = item.name + val;
    });
  },
  get changename() {
    return this.list;
  },
};
console.log(lesson.total); // 400
console.log(lesson.namecount); // 当前课程数量5
lesson.changename = "_火爆售卖中";
//   {"name":"css_火爆售卖中","price":60},{.....}
console.table(lesson.changename);
```

## 使用访问器批量设置属性

```js
let web = {
  name: "lisi",
  url: "www.baidu.com",
  set site(val) {
    [this.name, this.url] = val.split(",");
  },
  get site() {
    return `${this.name}的网址是${this.url}`;
  },
};
web.site = "张三,www.baidu.com";
console.log(web.site); // 张三的网址是www.baidu.com
```

## 访问器读写 tonken

```js
let user = {
  set tonken(val) {
    // 写
    localStorage.setItem("tonken", val);
  },
  set removetonken(data) {
    // 删
    localStorage.removeItem(data);
  },
  get tonken() {
    // 读
    let tonken = localStorage.getItem("tonken");
    return tonken ? tonken : alert("请登录");
  },
};

user.tonken = "保存的tonken";
// user.removetonken = "tonken";
console.log(user.tonken); // 保存的tonken
```

## JS 的三种缓存机制

### JS 的三种缓存机制分别是

- <code>cookie</code>
- <code>localStorage</code>
- <code>sessionStorage</code>

### 相同点

都是用来本地缓存数据，保存在浏览器端，同源的

### 不同点

##### 1.存储大小不同

- cookie 存储大小只有 4k
- localStorage 和 sessionStorage 存储大小为 5M 左右

##### 2.传递方式不同

- cookie 会在同源的 http 请求中自动传递给服务器端(即使不需要)，即 cookie 在浏览器和服务器端来回传递
- localStorage 和 sessionStorage 会一直存储在本地

##### 3.数据有效期不同

- sessionStorage 会在页面关闭后就自动注销
- cookie 有一个过期时间，时间可以自己设置，即使关闭页面和浏览器也会存在，但是过了时间后自动失效
- localStorage 始终有效，即使关闭页面和浏览器

##### 4.作用域不同

- sessionStorage 只在当前页面有效，即使是同一个网址不同的窗口也不会共享
- localStorage 在所有的同源窗口中有效，即域名前缀是一样的窗口都会共享
- cookie 和 localStorage 作用域相同

### 使用方法

#### sessionStorage 和 localStorage 存储方式

```js
sessionStorage.setItem("name", "张三");
localStorage.setItem("name", "张三");
```

#### sessionStorage 和 localStorage 读取方法

```js
// 读取sessionStorage
console.log(sessionStorage.getItem("name")); // 张三
// 读取localStorage
console.log(localStorage.getItem("name")); //  张三
```

#### sessionStorage 和 localStorage 删除方法

```js
// 删除sessionStorage
sessionStorage.removeItem("name");
// // 删除localStorage
localStorage.removeItem("name");
```

#### cookie 增删查

```js
// cookies保存数据语法：
function setCookie(name, value) {
  var Days = 3;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie =
    name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
// cookies读取数据语法：
function getCookie(name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return null;
}

// cookies删除数据语法：
function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
```

## 访问器的优先级

```js
const data = Symbol();
// 访问器的优先级高
let user = {
  [data]: {
    name: "",
  },
  age: 18,
  set name(val) {
    this[data].name = val;
  },
  get name() {
    return this[data].name;
  },
};

user.name = "zhangsan";

console.log(user.name);
```

## 构造函数和 Class 语法糖使用访问器

```js
// 定义构造函数
let user = function(name, age) {
  let data = { name, age };
  Object.defineProperties(this, {
    name: {
      get() {
        return data.name + "555";
      },
      set(val) {
        data.name = val;
      },
    },
    age: {
      get() {
        return data.age;
      },
      set(val) {
        val > 10 && val < 100
          ? (data.age = val)
          : console.error("age格式不正确");
      },
    },
  });
};

let use = new user("lisi", 18);
use.name = "李四";
use.age = "50";
console.log(use);

// Class 语法糖

//使用Symbol设置唯一值，外界不能直接改变类里面的值
const DATA = Symbol();
class User {
  constructor(name, val) {
    this[DATA] = { name, val };
  }
  get name() {
    return this[DATA].name;
  }
  set name(val) {
    this[DATA].name = val;
  }
}

let newuse = new User("lisi", 18);
newuse.name = "999";

console.log(newuse);
```

## 什么是 proxy 代理

```js
let user = { name: "lisi", age: 18 };

// Proxy 设置代理,代理对象user
const pxy = new Proxy(user, {
  // get 第一个参数是对象本身，第二个参数时读取某个属性的属性名
  get(obj, key) {
    return obj[key];
  },
  // set 第一个参数时代理的对象本身，第二个参数时设置的键名，第三个参数时要修改的值
  set(obj, key, val) {
    obj[key] = val;
    return obj[key];
  },
});
pxy.name = "wangwu";
console.log(pxy.name);
```

## 使用 Proxy 代理控制函数

```js
function factorial(num) {
  return num == 1 ? num : num * factorial(num - 1);
}

// console.log(factorial(5));
const proxy = new Proxy(factorial, {
  // 第一个参数时函数本身，obj指上下文的this, args 传递的值
  apply(func, obj, args) {
    console.log(func(args));
    return func(args);
  },
});
proxy.apply(this, [5]); // 120
```

## 使用代理对数组进行拦截

```js
let data = [
  {
    name: "李四是一个非常好的人",
    desc: "简介简介简介简介",
  },
  {
    name: "王五是一个热爱生活，追求时尚的人",
    desc: "简介简介简介简介",
  },
  {
    name: "赵柳是一个很幽默，非常搞笑的人",
    desc: "简介简介简介简介",
  },
];

// 声明代理
const proxy_data = new Proxy(data, {
  // 第一个参数时数组本身，第二个参数时读取数组的下标
  get(arr, key) {
    // 数组的全部内容
    console.log(arr);
    // 读取数组的下标
    console.log(key);
    // 当前读取的数据
    console.log(arr[key]);
    // 当前数据里面的name
    const name = arr[key].name;
    // 设置长度限制
    const len = 5;
    arr[key].name =
      name.length > len ? name.substr(0, len) + ".".repeat(3) : name;
    // 返回加工后的数据
    return arr[key];
  },
});
console.log(JSON.stringify(proxy_data[1], null, 2));
```

## 表单验证组件代理工厂

```html
<div class="form">
  账号：
  <input type="text" validate rule="max:12,min:3" />
  密码：
  <input type="number" validate rule="max:3" />
</div>
```

```js
// 公共验证类
class Validate {
  // 最小值
  min(val, len) {
    return val.length >= len;
  }
  // 最小值
  max(val, len) {
    return val.length <= len;
  }
  // 是否是数字
  isNumber(val) {
    console.log(typeof val);
    return typeof val === "number";
  }
}
const validate = new Validate();
// 调用类里面的方法
// console.log(validate.max("fsdfssdf", 5));
// console.log(validate.min("sdfsdfsdfsdfsdfsd", 9));
// console.log(validate.isNumber(1));

function proxyFun(target) {
  return new Proxy(target, {
    get(val, key) {
      // 循环遍历的时候调用了读取方法，返回整个元素数据
      return val[key];
    },
    set(val, key, elm) {
      // 输入内容时获取到rule属性里面的规则，用逗号分开
      const ruledata = elm.getAttribute("rule").split(",");
      // 遍历所有的规则，every只要有一个返回false就不再继续执行
      const state = ruledata.every((item) => {
        const ruledata = item.split(":");
        // 引用上面的公共验证类，校验输入内容是否符合要求
        return validate[ruledata[0]](elm.value, ruledata[1]);
      });
      // 验证失败添加error类
      elm.classList[state ? "remove" : "add"]("error");
      // 验证成功添加success类
      elm.classList[!state ? "remove" : "add"]("success");
      return true;
    },
  });
}
const els = proxyFun(document.querySelectorAll("[validate]"));
els.forEach((item, index) => {
  item.addEventListener("keyup", function() {
    els[index] = this;
  });
});
```

## JSON 自定义和 JSON 序列化

```js
let obj = {
  name: "lisi",
  title: "xuliehua",
  toJSON: function() {
    return {
      newname: this.name,
    };
  },
};
// 第二个参数可以定义只返回那些数据
console.log(JSON.stringify(obj, null, 2));
```

## JSON 转换为 js 可操作类型

```js
let obj = {
  name: "lisi",
  age: 18,
};
let stringify = JSON.stringify(obj);

let objparse = JSON.parse(stringify, (key, val) => {
  return key === "name" ? (val = "wangwu" + val) : val;
});
console.log(objparse);
```

## 解决面向对象内存占用问题

```js
// 1.普通构造函数内存占用问题
function user(name, age) {
  this.name = name;
  this.age = age;
  this.props = () => {
    return `${this.name}今年${this.age}`;
  };
}
let p1 = new user("张三", "18");
let p2 = new user("李四", "30");
console.log(p1.props()); // 张三今年18
console.log(p2.props()); // 李四今年30
// 通过打印可以看到虽然名字是一样的，但是两个并不相等
// 因为每次实例化构造函数是都会重新开辟一个引用地址，但是完成的功能时相同的
// 无疑会造成性能浪费
console.log(p1.props === p2.props); // false

// 2.将具体方法放到外面解决内存占用问题
function props() {
  return `${this.name}今年${this.age}`;
}
function user2(name, age) {
  this.name = name;
  this.age = age;
  this.props = props;
}
let a1 = new user2("张三", "18");
let a2 = new user2("李四", "30");
console.log(a1.props());
console.log(a2.props());
// 吧方法抽出来之后可以看到两个实例化出来的props是相等的
// 这表明这种写法是引用的相同的引用地址，不会造成内存浪费的问题
// 但是如果一个对象中有多个呢，请看下面
console.log(a1.props === a2.props); // true

// 3.多个方法封装在外部
let funs = {
  props: function() {
    return `${this.name}今年${this.age}`;
  },
  age: function() {
    return `ta今年${this.age}了`;
  },
};
function user3(name, age) {
  this.name = name;
  this.age = age;
  this.props = funs.props;
  this.getage = funs.age;
}
let c1 = new user3("张三", 18);
let c2 = new user3("李四", 20);
console.log(c1.props());
console.log(c2.getage());
// 虽然这样写解决了多个方法的问题，但是方法还是定义在外面，
// 乍一看和我们这个构造函数没什么关联，我们可以采用原型链的相关写法
console.log(c1.props === c2.props); // true

// 4.使用原型链解决面向对象内存占用问题
function user4(name, age) {
  this.name = name;
  this.age = age;
}
user4.prototype.props = function() {
  return `${this.name}今年${this.age}`;
};
let d1 = new user4("张三", 18);
let d2 = new user4("李四", 20);
console.log(d1.props());
console.log(d2.props());
// 原型链上的方法在当做构造函数的普通方法来使用
// 被实例化之后引用的还是构造函数原型上的方法，所以引用的是同一个地址
console.log(d1.props === d2.props); // true
```
