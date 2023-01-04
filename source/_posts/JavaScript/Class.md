---
title: JS 中的类
tags: JavaScript
categories: JS系统学习
abbrlink: b439886f
date: 2021-01-11 00:00:00
---

{% note info no-icon %}
在 ES6 规范中，引入了 class 的概念。使得 JS 开发者终于告别了，直接使用原型对象模仿面向对象中的类和类继承时代。<br>

但是 JS 中并没有一个真正的 class 原始类型， class 仅仅只是对原型对象运用语法糖。所以，只有理解如何使用原型对象实现类和类继承，才能真正地用好 class。<br>

通过类来创建对象，使得开发者不必写重复的代码，以达到代码复用的目的。它基于的逻辑是，两个或多个对象的结构功能类似，可以抽象出一个模板，依照模板复制出多个相似的对象。就像自行车制造商一遍一遍地复用相同的蓝图来制造大量的自行车。
{% endnote %}

## class 声明类的语法

```js
// 声明类
class User {
  // 类中自执行函数，可以用来传参
  constructor(title) {
    this.title = title;
  }
  // 声明多个方法时不需要添加逗号
  getTitle(name) {
    return name + this.title;
  }
}
console.log(typeof User); // function
let us = new User("李四");
console.log(us.getTitle("你好"));
```

## 类的工作机制就是原型机制

{% note info no-icon %}
- <code>Object.getOwnPropertyNames()</code>, 方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括 Symbol 值作为名称的属性）组成的数组
- <code>Object.keys()</code>, 返回的是所有可枚举属性  
{% endnote %}

```js
class User {}
// 打印类的结构
console.dir(User);
// 对比这User构造函数是否等于他的prorotype里面的constructor
console.log(User === User.prototype.constructor); // true

function getName() {}
// 打印方法的结构
console.dir(getName);
// 给类添加一个show方法
class Name {
  show() {}
}
console.dir(Name);
// 给方法的原型添加一个show方法
function getuser() {}
getuser.prototype.show = function() {};
console.dir(getuser);
// 对比发现给类添加方法后就是往原型中添加的方法
// 打印对象的所有自身属性的属性名（包括不可枚举的属性）
console.log(Object.getOwnPropertyNames(Name));
console.log(Object.getOwnPropertyNames(getuser));
```

## 对象属性的声明

```js
class user {
  age = 10;
  constructor(val) {
    this.name = val;
  }
  chageage(newage) {
    this.age = newage;
  }
  getinfo() {
    return this.age + this.name;
  }
}
let u = new user("lisi");

console.log(u);
u.chageage(60);
console.log(u.getinfo()); // 60lisi
```

## class 中声明的方法不能被遍历

```js
class user {
  constructor(name) {
    this.name = name;
  }
  age = 10;
  show() {}
}

let u = new user();
console.dir(user);

for (const key in u) {
  console.log(key); // name age
}
// enumerable: false 不能遍历
console.log(Object.getOwnPropertyDescriptor(user.prototype, "show"));

function hide() {}
hide.prototype.show = function() {};
let h = new hide();
for (const key in h) {
  console.log(key); // show
}
// 查看普通方法这个show的属性发现enumerable: true
console.log(Object.getOwnPropertyDescriptor(hide.prototype, "show"));
```

## 严格模式下运行的 class

```js
"use strict";
function show() {
  // 非严格模式下指向window
  console.log(this); // undefined
}
show();

class user {
  name = "555";
  show() {
    function test() {
      console.log(this); // undefined
    }
    test();
  }
}
let u = new user();
// 不是严格模式下this也是undefined
u.show();
```

## 静态属性：static 的使用

{% note info no-icon %}
在类中属性前面加上 static 表示声明了静态属性，静态属性在类外面无法使用，是能在类内部使用
{% endnote %}

```js
class user {
  // staic 声明静态属性
  static host = "http://www.baidu.com";
  url = "http://taobao.com";
  api(url) {
    return user.host + `/${url}`;
  }
}
let u = new user();
let u2 = new user();
// 类的静态属性外界获取不到
console.log(u.host); // undefined
console.log(u.api("userList")); // http://www.baidu.com/userList
// 打印user类的结构可以看到静态属性host
console.dir(user);
// 设置对象属性
u.url = "http://jingdong.com";
console.log(u.url); // http://jingdong.com
// 不会随着其他对象属性的改变而改变
console.log(u2.url); // http://taobao.com
```

## 静态方法实现原理

{% note info no-icon %}
类中的静态方法声明和静态属性声明方式一样，在方法前添加 static 即为静态方法，通过 “类名.方法名” 的方式调用
{% endnote %}

```js
// 普通方法声明静态方法的方法
function user() {}
user.show = function() {
  console.log("方法的静态方法");
};
user.prototype.show = function() {
  console.log("构造函数的方法");
};

// 把方法作为对象添加的方法为静态方法
user.show(); //方法的静态方法

let u = new user();
u.show(); //构造函数的方法

// 类声明静态方法
class host {
  show() {
    // 这里面的this指向构造函数的对象
    console.log(this === h); // true
    console.log("构造函数方法");
  }
  static show() {
    // 这里面的this指向类本身
    console.log(this === host); // true
    console.log("静态方法");
  }
}
// 静态方法
host.show();

// 构造函数方法
let h = new host();
h.show();

console.dir(host);
console.dir(u);

// 例子
class createName {
  constructor(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
  }
  static create(...args) {
    // this相当于createName这个类
    return new this(...args);
  }
}

let zs = createName.create("张三", "18", "男");

console.log(zs);
for (const key in zs) {
  console.log(key + ":" + zs[key]);
}
```

## 静态属性练习课程管理

```js
const batchdata = [
  { name: "js", price: 300 },
  { name: "vue.js", price: 212 },
  { name: "python", price: 98 },
];
class Lesson {
  constructor(data) {
    this.model = data;
  }
  get name() {
    return this.model.name;
  }
  get price() {
    return this.model.price;
  }
  // 静态方法拿到上面定义的课程数组
  static createBatch(batchdata) {
    // this指向上面的constructor
    return batchdata.map((item) => new this(item));
  }
  // 获取最贵的课程价格
  static maxPrice(data) {
    return data.sort((a, b) => b.price - a.price)[0];
  }
}
// 返回三个lesson
let lesson = Lesson.createBatch(batchdata);
/*
0: Lesson
    model: {name: "js", price: 300}
    __proto__: Object
1: Lesson
    model: {name: "vue.js", price: 212}
    __proto__: Object
2: Lesson
    model: {name: "python", price: 98}
    __proto__: Object
*/
console.log(lesson);

// 返回最贵价格
console.log(Lesson.maxPrice(lesson).name); // js
console.log(Lesson.maxPrice(lesson).price); // 300
```

## 类中使用访问器

```js
class user {
  constructor() {
    this.data = {};
  }
  // set 表示赋值
  set host(url) {
    if (!/^http?:\/\//i.test(url)) {
      throw new Error("地址格式错误");
    }
    this.data.host = url;
  }
  // get 表示读取值
  get host() {
    return this.data.host;
  }
}
let u = new user();
u.host = "http://baidu.com";
console.log(u.host); // http://baidu.com
```

## 使用 Symbol 定义 protected 属性

{% note info no-icon %}
子类继承父类时在子类的 constructor 中必须声明 super()方法
{% endnote %}

```js
// 使用Symbol保护属性
const protecteds = Symbol();
// 设置父类
class userFather {
  // [host] = 'http://baidu.com'
  constructor() {
    // 父类中先定义一个Symbol对象
    this[protecteds] = {};
  }
  // 访问器设置host
  set host(url) {
    if (!/http:\/\//i.test(url)) {
      throw new Error("地址错误");
    }
    this[protecteds].host = url;
  }
  get host() {
    return this[protecteds].host;
  }
}
// user子类继承父类
class user extends userFather {
  constructor() {
    // 必须有super()
    super();
  }
}

let u = new user();
u.host = "http://sdfsdf";
console.log(u);
console.log(u.host);
```

## 使用 WeakMap 保护属性

```js
const host = new WeakMap();

class userFather {
  constructor() {
    host.set(this, "http://baidu.com");
    console.log(this); // 这里的this指向user
    console.log(host); // user => "http://baidu.com"
  }
  set host(url) {
    host.set(this, url);
  }
  get host() {
    return host.get(this);
  }
}
class user extends userFather {
  constructor(name) {
    super();
    this.name = name;
  }
}
let u = new user("form-user");
u.host = "55555";
console.log(u.host); // 55555
console.log(u.name); // form-user

let x = new user();
x.host = "66666";
console.log(x.host); // 66666
```

## 类的私有属性

{% note info no-icon %}

- 私有属性 ：只能在自己的类中使用，父类也无法继承使用
- 在属性前添加 # 号完成私有设置
  
{% endnote %}

```js
class user {
  // 私有属性
  #host = "http://baodu.com";
  constructor() {}
  set host(name) {
    // 类内部使用私有属性
    this.#host = name;
  }
  get host() {
    return this.#host;
  }
  // 私有方法
  #gethsot() {
    return this.#host + "私有方法";
  }
  gethost() {
    // 类内部使用私有方法
    return this.#gethsot();
  }
}

let u = new user();
u.host = "555";
console.log(u.host);
console.log(u.gethost());

// u.#gethsot() 运行报错
```

## class 属性继承

{% note info no-icon %}
super()会自动执行 User 类的 constructor()方法
{% endnote %}

```js
// 普通方法继承
function user() {}
user.prototype.show = function() {
  return this.name;
};
function admin(name) {
  this.name = name;
}
// admin 继承 user
admin.prototype = Object.create(user.prototype);
let ad = new admin("555");
console.log(ad); // {name: "555"}
console.log(ad.show()); // 555

// 类实现继承
class User {
  constructor(name) {
    console.log(name + "这是User类"); // 李四_这是User类
  }
}
// Admin继承了User
class Admin extends User {
  constructor(name) {
    // super()会自动执行User类的constructor()方法
    super(name);
    console.log(name + "这是Admin类"); // 李四_这是Admin类
  }
}
// 构造函数是会自动执行类中的constructor方法
let a = new Admin("李四_");
```

## 类中的方法继承

{% note info no-icon %}
extends 关键字继承， A extends B 表示 A 继承 B
{% endnote %}

```js
class user {
  show() {
    console.log("我来自user方法");
  }
}
// 类之间的继承
class admin extends user {}

// 通过继承后打印admin的构造函数对象
let ad = new admin();
// 发现user类的show方法存在admin类的原型中
console.dir(ad);
ad.show(); // 我来自user方法
```

## super 原理解析

```js
// class中使用super
class user {
  classname = "user";
  show() {
    // this指向的是admin不是user
    console.log(this); // admin
    console.log(this.name); // lisi
  }
}
class admin extends user {
  classname = "admin";
  constructor(name) {
    super();
    this.name = name;
  }
}
let ad = new admin("lisi");
// 用到user里面的show方法
ad.show();

// 原理解析
let User = {
  name: "user",
  show() {
    console.log("user的方法");
    // 经过下面改变this指向后this指向Admin
    console.log(this.name); // admin
  },
};
let Admin = {
  __proto__: User,
  name: "admin",
  show() {
    console.dir(this); // Admin
    // this.__proto__ 指的就是User
    console.log(this.__proto__ === User); // true;
    // 改变调用User的show接口的this指向
    this.__proto__.show.call(this);
    console.log("admin的方法");
  },
};
Admin.show();
```

## 多重继承中 super 的魅力

{% note info no-icon %}
super 只用来做原型攀升，和 this 指向无关
{% endnote %}

```js
// show方法中的this指向commit
let user = {
  name: "user",
  show() {
    // this永远执行调用者，因为是commit调用的，所以指向commit
    console.log("user的方法，" + this.name);
  },
};

let admin = {
  __proto__: user,
  name: "admin",
  show() {
    // 这里面的this执行admin，会出现死循环
    // this.__proto__.show.call(this)

    // 采用super()解决多重继承的问题，super只用来做原型攀升
    super.show();
    console.log("admin的方法，" + this.name);
  },
};

let commit = {
  __proto__: admin,
  name: "commit",
  show() {
    // 此时this指向admin
    // this.__proto__.show.call(this)

    // 采用super()解决多重继承的问题，super只用来做原型攀升
    super.show();
    console.log("commit的方法，" + this.name);
  },
};

commit.show();
```

## 为什么子类的 constructor 中使用 super

{% note info no-icon %}
子类使用 super()表示要改变父类 this 指向，指向子类
{% endnote %}

```js
// 普通方法继承
function user(name) {
  this.name = name;
}
function admin(name) {
  // 不加这一行代码下面的a打印出来是没有内容的，相当于super,必须先执行以下父类的代码
  user.call(this, name);
}
let a = new admin("Lisi");
console.log(a);

// 类中实例
class User {
  constructor(name) {
    this.name = name;
  }
}
class Admin extends User {
  constructor(name) {
    // super必须放到子类的constructor的this之前
    super(name);
    // 子类的优先级要比父类优先级高，子类可以覆盖父类的同名属性
    this.name = "new name";
  }
}
let ad = new Admin("ss");
console.log(ad);
```

## 使用 super 访问父类方法

```js
// 公共方法类
class controller {
  // 求出总和
  sum() {
    return this.data.reduce((o, n) => o + n.price, 0);
  }
}
// commt继承conlltroller
class commit extends controller {}
// 继承commit类
class Lesson extends commit {
  constructor(data) {
    super();
    this.data = data;
  }
  sumPrice() {
    return {
      // super.父类方法名,先去找commit里面是否有sum方法，没有的话在找commit的原型里面是否有sum
      // 由于commit继承了controller，所以就找到了sum方法
      priceCount: super.sum(),
      data: this.data,
    };
  }
}
let data = [
  {
    name: "js",
    price: 50,
  },
  {
    name: "vue",
    price: 68,
  },
  {
    name: "jquery",
    price: 99,
  },
];

let less = new Lesson(data);

console.log(less.sumPrice()); // {priceCount: 217, data: Array(3)}
```

## 方法重写

{% note info no-icon %}
使用 super.父类方法名即可调用父类方法
{% endnote %}

```js
class commit {
  getByKey(key) {
    // 获取包含关键词的数据
    return this.data.filter((item) => item.name.includes(key));
  }
}
class Lesson extends commit {
  constructor(data) {
    super();
    this.data = data;
  }
  // 子类方法重写，先去执行父类方法，再执行子类方法返回课程名称
  getByKey(key) {
    return super.getByKey(key).map((item) => item.name);
  }
}
let data = [
  {
    name: "js",
    price: 50,
  },
  {
    name: "vue.js",
    price: 68,
  },
  {
    name: "jquery",
    price: 99,
  },
];

let les = new Lesson(data);
console.log(les.getByKey("js"));
```

## 静态继承原理

```js
// 普通方法实现原理
function user() {}
user.size = "user.size";
user.show = () => {
  console.log(user.size);
};
user.show(); // user.size

function admin() {}
// admin方法继承user的静态方法
admin.__proto__ = user;
// 通过打印看到admin的__proto__的原型里面有了user的方法
console.dir(admin);
// 继承之后用admin也可以访问user里面的方法
admin.show(); // user.size

// 通过类实现静态继承
class User {
  static size = "Class.User.size";
  static show() {
    console.log(this.size); // Class.User.size
    console.dir(this); // User
  }
}
// Admin类继承了User类
class Admin extends User {}
// 通过Admin调用了User类的静态方法
Admin.show();
```

## 使用 instanceof 检测对象

{% note info no-icon %}
a instanceof b,检测 a 是否属于 b
{% endnote %}

```js
// 普通方法实现
function user() {}
user.prototype.show = () => {
  console.log("object");
};
function admin() {}
// admin 继承 user
admin.prototype = Object.create(user.prototype);
// 实例化admin生成ad对象
let ad = new admin();
ad.show(); // object
console.dir(ad);
// 判断admin是否在ad的原型链上
console.log(ad instanceof admin); // true
console.log(ad instanceof user); // true
// 相当于
console.dir(user);
console.log(ad.__proto__ === admin.prototype); // true
console.log(ad.__proto__.__proto__ === user.prototype); // true

// 递归模拟 instanceof 判断
function newinstan(obj, fun) {
  if (!obj.__proto__) {
    return false;
  }
  if (obj.__proto__ === fun.prototype) {
    return true;
  }
  // 执行一遍没有返回结果就拿这个对象的原型继续判断一遍
  return newinstan(obj.__proto__, fun);
}
console.log(newinstan(ad, user)); // true

// 类中实现
class User {}
class Admin extends User {}
let adm = new Admin();
console.log(adm instanceof Admin); // true
console.log(adm instanceof User); // true
```

## isPrototypeOf 检测继承关系

{% note info no-icon %}
a.isPrototypeOf(b)，检测 a 是否在 b 的原型链上
{% endnote %}

```js
let a = {
  name: "55",
};
// b对象继承a对象
let b = {
  __proto__: a,
};
let c = {
  __proto__: b,
};
console.dir(b);
// a 是否在 b 的原型链上
console.log(a.isPrototypeOf(b)); // true
console.log(a.isPrototypeOf(c)); // true

class User {}
class Admin extends User {}
let ad = new Admin();
// Admin的prototype是否在ad的原型链上
console.dir(Admin.prototype.isPrototypeOf(ad)); // true
```

## 内置类继承原理实现

```js
function myArr(...arg) {
  console.log(arg);
  arg.forEach((item) => {
    this.push(item);
  });
  this.oneNumber = () => {
    return this[0];
  };
  this.maxNumber = () => {
    return this.sort((a, b) => b - a)[0];
  };
}
// 使普通的方法拥有Array内置类的属性
myArr.prototype = Object.create(Array.prototype);
console.dir(myArr);

let m = new myArr(100, 5, 48, 4, 86, 48, 468, 4, 54, 8, 8, 65);
console.log(m);
console.log(m.maxNumber());
console.log(m.oneNumber());
```

## mixin 混合模式使用技巧

```js
// 创建几个提供帮助的对象,可以理解为一个工具类，不是针对于某一个类使用
let libObj = {
  max(key) {
    return this.data.sort((a, b) => b[key] - a[key])[0];
  },
  min(key) {
    return this.data.sort((a, b) => a[key] - b[key])[0];
  },
  count(key) {
    return this.data.reduce((l, f) => l + f[key], 0);
  },
};
// 课程数据
let lessondata = [
  {
    name: "js",
    price: 50,
  },
  {
    name: "vue",
    price: 68,
  },
  {
    name: "jquery",
    price: 99,
  },
];

// 创建一个类，接收课程数据
class lesson {
  constructor(data) {
    this.less = data;
  }
  // 访问器设置读取data时返回这个类的less数组
  get data() {
    return this.less;
  }
}
// 使用Object.assign是lesson的原型上有工具对象的一些方法
Object.assign(lesson.prototype, libObj);
console.dir(lesson);
// 构造函数
let les = new lesson(lessondata);
// 查看最高价格
console.log(les.max("price")); // {name: "jquery", price: 99}
// 最小价格
console.log(les.min("price")); // {name: "js", price: 50}
// 价格总和
console.log(les.count("price")); // 217

console.warn("创建第二个类");

// 创建第二个类
class Admin {
  constructor(data) {
    this.userinfo = data;
  }
  get data() {
    return this.userinfo;
  }
}
// 人员数据
let userdata = [
  { name: "张三", age: 20 },
  { name: "李四", age: 32 },
  { name: "王五", age: 18 },
];
// 使用mixin
Object.assign(Admin.prototype, libObj);

let ad = new Admin(userdata);
// 求出最大年龄
console.log(ad.max("age")); // {name: "李四", age: 32}
// 年龄总和
console.log(ad.count("age")); // 70
```
