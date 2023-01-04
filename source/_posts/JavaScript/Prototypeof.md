---
title: 原型初步认识
tags: JavaScript
categories: JS系统学习
abbrlink: 6a1474d3
date: 2021-01-11 00:00:00
---
## 原型初步认识

```js
let arr = ["lisi"];
// 打印出arr数组
// 通过控制台发现它有__proto__属性，吧这个属性称之为它的原型
// 点开原型后发现原型里面还有__proto__原型，一共是三级的关系
// 我们吧这三级称之为原型链
console.log(arr);

let obj = {};
// 打印对象看他的原型发现只有一级__proto__
// 因此对象和数组的原型不一样
console.log(obj);

let obj2 = {};
// Object.getPrototypeOf(obj) 此方法可以获取到元素的原型
console.log(Object.getPrototypeOf(obj));

// true
console.log(Object.getPrototypeOf(obj2) === Object.getPrototypeOf(obj)); // true
```

## 没有原型的对象也是存在的

```js
let div = document.quer;
let hd = {
  name: "李四",
};
console.log(hd);
console.log(hd.__proto__);

// Object.create方式创建的元素不会有原型
let newhd = Object.create(null, {
  name: {
    value: "李四",
  },
});
console.log(newhd);
console.log(newhd.__proto__); // undefined
```

## 原型方法与对象方法的优先级

如果对象本身的方法名和原型上的方法名相同，则会使用对象上的方法名

```js
// 如果对象自己没有的方法，但是父亲有，也可以正常使用
let obj = {
  name: "666",
};
console.log(obj.valueOf()); // 不会报错
console.log(obj);

// 如果使用了对象本身和父亲都没有的方法时会报错
let obj2 = {};
// obj2.show();  // obj2.show is not a function

// 我们给对象自己和原型都创建一个一样的方法
let obj3 = {
  show() {
    console.log("obj3 from function");
  },
};

obj3.__proto__.show = function() {
  console.log("__proto__方法");
};
// 可以看到如果原型和对象本身都有同一个方法时，只会执行对象本身的方法
obj3.show(); // obj3 from function
```

## 函数拥有多个长辈

函数有两个原型，分别是<code>\_\_proto\_\_</code>和<code>prototype</code>，其中<code>\_\_proto\_\_</code>可以理解为函数自己的原型，<code>prototype</code>是这个函数作为构造
函数时实例化函数的原型<code>\_\_proto\_\_</code>等于函数的<code>prototype</code>。

- 首先声明一个函数,并且使用 dir 打印函数结构

```js
function User() {}
console.dir(User);
/*
prototype: {show: ƒ, constructor: ƒ}
__proto__: ƒ ()
*/
```

会发现函数有<code>\_\_proto\_\_</code>和<code>prototype</code>两个原型，<code>\_\_proto\_\_</code>可以理解为这个函数自己本身的原型，prototype 是另一个方法的原型，两个原型各司其责。

- 接着把 User 作为构造函数使用

```js
let use = new User();
console.dir(use);
// __proto__: Object
```

通过打印 use 发现 use 也有一个 proto 的原型，点开查看后可以发现和上面 User 的 prototype 里面的内容是一样的。于是总结出：当一个变量 new 一个构造函数后，这个构造函数会把自己的 prototype 给到这个变量，这个变量吧构造函数的 prototype 当做自己的 proto 原型来使用。

- 为了验证上面的说法，可以对比 use 的 proto 和 User 的 prototype 是否相同

```js
console.log(use.__proto__ == User.prototype); // true
```

打印显示 true，说明它们两个是一样的。

- 接着往 User 构造函数的 prototype 原型上添加 show 方法

```js
User.prototype.show = function() {
  console.log("来自User的prototype原型");
};
```

- 使用 use 调用 show 方法

```js
use.show(); // 来自User的prototype原型
```

结果是可以运行。因此如果调用方法时，会先找自己有没有这个方法，没有的话会往原型链上找，原型链上有的话就调用原型链上的方法。

- 接着往构造函数的 proto 原型上添加 getname 方法

```js
User.__proto__.getname = function() {
  console.log("来自User的__proto__原型");
};
```

- 使用 use 调用 getname 方法

```js
use.getname(); // use.getname is not a function
```

控制台会报错，所以构造函数只会把自己的 prototype 原型给变量，不会吧 proto 给变量

## 原型关系详解和属性的继承实例

在 js 中有很多东西都可以 new 出来,比如 new String() new Number new Object
它们都可以被作为构造函数来使用，现在我们先看一下 Object 这个构造函数的原型

- 首先 new 一下 Object

```js
let aaa = new Object();
console.dir(aaa);
/*
prototype: {show: ƒ, constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, 
__proto__: ƒ ()
*/
```

打印出 aaa 的结构,通过分析发现 aaa 也有 **proto** 和 prototype 两个原型,我们已经知道 **proto** 原型是自己独立使用时的原型,prototype 原型被作为构造函数时会用到

- 我们往 Object 的 prototype 原型中添加一个 show 方法

```js
Object.prototype.show = function() {
  console.log("来自Object的prototype原型里面的show方法");
};
```

- 使用 aaa 调用 Object 原型上的 show 方法

```js
aaa.show(); // 来自Object的prototype原型里面的show方法
```

- 既然 Object 作为一个类型存在，直接声明一个 function 来看一下它的原型是什么样子的

```js
function User() {}
console.dir(User);
console.log(User.__proto__.__proto__ === Object.prototype); // true
console.log(User.__proto__.__proto__ === User.prototype.__proto__); // true
```

通过分析发现 User 的 **proto** 原型和 prototype 原型都有一个 **proto** 父级
并且这个**proto**父级都有 show 方法,在反观 Object 的 prototype 原型并没有 **proto** 父级

- 我们用 User.show()看能否执行 29 行的代码

```js
User.show(); // 来自Object的prototype原型里面的show方法
```

结果正常打印，那么 User 作为构造函数时，构造函数能够也可以用 show 方法吗？

- 实例化构造函数

```js
let newuse = new User();
newuse.show(); // 来自Object的prototype原型里面的show方法
console.dir(newuse);
```

结果也是可以的，打印发现 show 方法存在于 newuse 的 proto 原型的父级 proto 原型上，通过层层对比结果如下

```js
console.log(newuse.__proto__.__proto__ === User.prototype.__proto__); // true
console.log(User.prototype.__proto__ === User.__proto__.__proto__); // true
console.log(User.__proto__.__proto__ === Object.prototype); // true
console.log(Object.prototype === newuse.__proto__.__proto__); // true
```

总结：
newuse 的原型来自 User 的 prototype 原型,User 的 prototype 原型里面包含有**proto**父级，这个父级来自 Object 的 prototype,Object 的 prototype 原型中存在 show 方法
流程图大致如下：

- newuse.**proto** <br>
  ↓
- User.prototype.**proto** <br>
  ↓
- Object.prototype

## 系统构造函数的体现

```js
// 使用字面量的形式声明数字时相当于 new Number()
// 当 Number()被实例化对象时，Number的prototype会给到实例化对象的__proto__
let number = 55; // new Number();
console.log(number.__proto__ == Number.prototype);

let obj = {}; // new Object()
console.log(obj.__proto__ == Object.prototype);

let arr = [];
console.log(arr.__proto__ == Array.prototype);

let str = "";
console.log(str.__proto__ == String.prototype);

let bol = true;
console.log(bol.__proto__ == Boolean.prototype);
```

## 自定义对象的原型设置

{% note info no-icon %}

- 设置对象原型 Object.setPrototypeOf()
- 读取对象原型 Object.getPrototypeOf()
  {% endnote %}

```js
// 定义两个对象，现需要吧obj的父级原型设置为 objparent
let obj = {
  name: "lisi",
};

let objparent = {
  name: "张三",
  show() {
    console.log(this.name);
  },
};
// 可以通过 Object.setPrototypeOf
// Object.setPrototypeOf接收两个参数，第一个是被设置的对象，第二是个要设置的对象
Object.setPrototypeOf(obj, objparent);
// 通过上面的设置后打印出obj的结构发现它的父级原型变成了objparent
console.dir(obj);
/*       
            __proto__:
                name: "张三"
                show: ƒ show()
            __proto__: Object
        */
// 利用原型的特点,obj可以使用原型中的方法
obj.show(); // lisi
// 还可以利用 Object.getPrototypeOf(查看的对象名称)查看原型;
console.log(Object.getPrototypeOf(obj));
// {name: "张三", show: ƒ}
```

## 原型中的 constructor 引用

{% note info no-icon %}
函数的 prototype 原型里面的 constructor 等于这个函数本身

- User.prorotype.constructor === User
  {% endnote %}

```js
// 首先声明一个函数
function User(name) {
  this.name = name;
}
// 通过打印发现User的prototype原型中有一个constructor属性
console.dir(User);

// 打印出 constructor 发现结果是这个函数本身
console.log(User.prototype.constructor);

// 返回结果为true,所以说通过 prototype.constructor可以反找到函数本身
console.log(User.prototype.constructor == User); // true

// 利用这一特性可以声明一个构造函数
let use = new User.prototype.constructor("李四");

// 打印结果正常返回 李四
console.log(use.name);

// 现在需要给User的原型上添加一个方法
/*
            以下方法只适合一次添加一个方法
        */
// User.prototype.show = function () {
//     console.log(this.name);
// }
// 正常执行show方法
// use.show()

// 需要同时添加多个方法时怎么办呢？？？？
User.prototype = {
  // 使用constructor指向一个函数
  constructor: User,
  show() {
    console.log("this.show");
  },
  getname() {
    console.log("this.getname");
  },
};
User.prototype.show();
```

## 给我一个对象还你一个世界

{% note info no-icon %}
构造函数实例化出来的对象的 proto 的 constructor 等于构造函数
{% endnote %}

```js
let time = new Date();
console.log(time.__proto__.constructor === Date); // true
```

下面例子使用对象创建一个新的对象

```js
//  首先声明函数
function User(...name) {
  this.name = [...name];
  this.show = function() {
    console.log(this.name);
  };
}
// 实例化这个函数，得到一个新的对象
let hd = new User("lisi", "wangwu");
// 通过方法创建另一个对象
function createobj(obj, ...arg) {
  // 先用Object.getPrototype获取到父级原型
  // 然后利用constructor获取实例化的函数本身
  const cont = Object.getPrototypeOf(obj).constructor;
  // 返回实例化之后的函数，并传递参数
  return new cont(...arg);
}
let zs = createobj(hd, "张三", "李四");
zs.show();
hd.show();
```

## 原型链总结

{% note info no-icon %}

- Object 的 prototype 原型就是 User 函数的 \_\_proto\_\_ 原型的父级
- 构造函数的 \_\_proto\_\_ 等于构造函数的 prototype
- 构造函数的 \_\_proto\_\_ 的父级等于 Object 的 prototype
  {% endnote %}

```js
function User() {}
console.dir(User);
console.dir(Object);
// Object的prototype原型就是User函数的__proto__原型的父级
console.log(User.__proto__.__proto__ == Object.prototype);

let a = new User();
console.dir(a);
// 构造函数的实例的原型等于构造函数的prototype
console.log(a.__proto__ == User.prototype);

// 构造函数的实例原型的父级等于Object的prototype
console.log(a.__proto__.__proto__ == Object.prototype);
```

## 原型链检测之 instanceof

{% note info no-icon %}
instanceof 检测一个对象的 proto 是否属于某个对象
{% endnote %}

```js
let arr = {};
console.log(arr instanceof Object); // true
console.log(arr.__proto__ == Object.prototype); // true
```

```js
function A() {}
function B() {}
function C() {}
let c = new C();
// 设置B函数的原型等于c
B.prototype = c;
let b = new B();
// A函数的原型等于b
A.prototype = b;
let a = new A();

console.dir(a);
console.dir(C);
/*
    a的原型来自A的prototype，
    A的Prototype等于b，
    b的原型等于B的Prototype
*/
console.log(a instanceof B); // true
console.log(a instanceof C); // true
```

## Object.isPrototypeOf 原型检测

{% note info no-icon %}

- Object.isPrototypeOf 检测一个对象原型是否是一个对象的原型长辈

* 简单理解，就是一个对象是否是另一个对象的父亲
  {% endnote %}

```js
let a = {};
let b = {};
// Object.isPrototypeOf 检测一个对象原型是否是一个对象的原型长辈
console.log(b.isPrototypeOf(a)); // false
// 设置a的原型等于b的原型,相当于a的父亲等于了b
Object.setPrototypeOf(a, b);
console.log(b.isPrototypeOf(a)); // true
```

```js
// 重新声明两个对象
let c = {};
let d = {};
let e = {};
/*
    通过Object.setPrototypeOf改变c的原型为d
    然后把d的原型变为e
    c --> d --> e
*/
Object.setPrototypeOf(c, d);
Object.setPrototypeOf(d, e);
console.log(e.isPrototypeOf(d));
console.log(e.isPrototypeOf(c));
console.log(d.isPrototypeOf(c));
```

## in 和 hasOwnProperty 的属性检测差异

{% note info no-icon %}

- in 语法检测一个属性是否在这个对象上或者在这个对象的原型链上
- hasOwnProperty 值检测一个属性是否在这个对象上，不会检测原型链上的内容

{% endnote %}

```js
let a = { name: "李四" };
let b = { age: "19" };
// in 语法检测的是一个元素是否在对象上并且还会检测是否在对象的原型链上
console.log("age" in a); // false
// 通过 Object.setPrototypeOf 设置a的原型为b
Object.setPrototypeOf(a, b);
// 这个时候回返回true
console.log("age" in a); // true
// hasOwnProperty只会检测当前元素，不会检测原型上面的东西
console.log(a.hasOwnProperty("age")); // false
for (const key in a) {
  // 使用 for in 时加上Object.hasOwnProperty(key) 可以只遍历对象本身的元素
  if (a.hasOwnProperty(key)) {
    console.log(key); // name
  }
  // 没有hasOwnProperty会遍历对象本身的元素以及原型上的元素
  console.log("没加" + key); // name age
}
```

## 使用 call 或者 apply 借用原型链

```js
// 定义user对象
let user = {
  data: [1, 65, 48, 5, 4, 12, 4, 5, 65, 9, 25],
};
// 通过setPrototypeOf设置user的prototype为max方法
Object.setPrototypeOf(user, {
  max() {
    return this.data.sort((a, b) => b - a)[0];
  },
});
// 利用原型上的max方法求出最大值
console.log(user.max()); // 65

let ls = {
  lesson: {
    js: 95,
    css: 85,
    html: 100,
  },
  // get访问器 返回value值组成的数组
  get data() {
    // 读取对象的所有值
    return Object.values(this.lesson);
  },
};
console.log(ls.data); // 95 85 100
// ls利用apply借用user对象中的max方法求出最大值
// 将max中的this指向ls
console.log(user.max.call(ls)); // 100
console.log(user.max.apply(ls)); // 100
console.log(user.max.bind(ls)()); // 100
```

## DOM 节点借用 Array 数组方法

```js
let btns = document.querySelectorAll("button");
console.log(btns);
// DOM节点的数组并没有filter方法，因此要借用数组的filter方法
console.log(btns.filter);
// 首先看一下filter在数组中的位置
/*
            分析结果得出filter在数组的位置 Array.prototype.filter,
            此外还知道filter要传入一个数组参数
        */
console.dir(Array);
// 清空按钮
document.body.innerHTML = "";
// 借用数组的filter方法过滤包含color属性的按钮
// btns = Array.prototype.filter.call(btns, item => {
//     return item.hasAttribute("color")
// })
// 利用原型链特征，直接利用一个空数组的filter也是可以的,使用call改变
// filter的this指向使之指向btns，过滤出含有color属性的DOM
btns = [].filter.call(btns, (item) => {
  return item.hasAttribute("color");
});
// 遍历过滤后的按钮到页面
console.log(btns);
btns.forEach((item) => {
  document.body.appendChild(item);
});
```

## 合理的构造函数方法使用

```js
// 首先声明构造函数
function User(name) {
  this.name = name;
  this.show = function() {
    console.log(this.name);
  };
}

// 实例化构造函数
let a = new User("李四");
let b = new User("王五");
a.show();
b.show();

// 打印 a 和 b
/*
            打印发现a和b中都存在这show方法
            都存在相同的show方法意味着开辟了两个内存空间存放同一个数据
            显然不合理，所以我们把方法放到构造函数的原型中去
        */
console.log(a);
console.log(b);

// 优化上面的代码
// 声明构造函数
function Show(name) {
  this.name = name;
}
// 将公共方法放入原型当中
Show.prototype = {
  // constructor指向一个函数
  constructor: Show,
  getname() {
    console.log(this.name);
  },
};
// 实例化Show方法
let d = new Show("lisi");
let e = new Show("wangwu");
// 打印d和e发现里面只剩下name，不包含方法
console.dir(d);
console.dir(e);
// 由于Show方法的原型中存在getname方法，所以实例化的变量也可以使用
d.getname(); // lisi
e.getname(); // wangwu
```

## this 和原型没有关系

```js
// 首先声明对象
let hd = {
  name: "李四",
};
// 声明第二个对象
let User = {
  name: "张三",
  show() {
    console.log(this); // {name: "李四"}
    console.log(this.name);
  },
};

// 改变hd的原型
Object.setPrototypeOf(hd, User);
// this只会指向调用者本身，打印的結果仍然是hd对象里面的李四
hd.show(); // 李四
```

## 不要滥用原型

{% note info no-icon %}
禁止在 Object 的原型上添加内容
{% endnote %}

```html
<button onclick="this.hide()">按钮</button>
```

```js
// 实际操作后确实非常方便
// 但是：强烈不推荐这样做！！！！
// Object作为一个顶层元素，如果往顶层添加一个方法后会影响全局
// 如果引入的第三方库中也存在着相同方法，怎程序会出错
// 因此这样的写法是非常不稳定的。
Object.prototype.hide = function() {
  console.log(this);
  this.style.display = "none";
};
```

## Object.create 与\_\_proto\_\_

{% note info no-icon %}
Object.create 给变量定义原型，这个方法不能用于获取原型
{% endnote %}

```js
// 定义一个初始对象
let User = {
  show() {
    console.log(this.name);
  },
};
// Object.create给变量定义原型，这个方法不能用于获取原型
let use = Object.create(User);
// 给use对象设置name值
use.name = "李四";
console.log(use);
// 使用原型中的show方法
use.show();

// 利用__proto__设置原型
let newuse = {
  name: "王五",
};
// 如果__proto__后面跟上了等于的值，表示设置原型
newuse.__proto__ = User;
// 如果__proto__后面没有值表示读取原型
console.log(newuse.__proto__);
newuse.show();
```

## 使用 setPrototypeOf 替代\_\_proto\_\_

{% note info no-icon %}
Object.setPrototypeOf()设置对象原型
{% endnote %}

```js
// 定义一个初始对象
let User = {
  show() {
    console.log(this.name);
  },
};

// Object.setPrototypeOf()设置对象原型
let use = {
  name: "李四",
};
Object.setPrototypeOf(use, User);
use.show();

// Object.getPrototypeOf()查看对象原型
console.log(Object.getPrototypeOf(use));
```

## \_\_proto\_\_是属性访问器

{% note info no-icon %}
设置一个对象的\_\_proto\_\_时必须使其等于一个对象，否则不会被赋值
{% endnote %}

```js
// 声明初始对象
let use = {
  name: "李四",
};
// 设置use的__proto__原型为一个对象，里面包含show方法
use.__proto__ = {
  show() {
    console.log(this.name);
  },
};
// 多次为__proto__赋值时会覆盖前面定义的方法
use.__proto__ = {
  getname() {
    console.log(this.name);
  },
};
// 设置used的__proto__为一个具体的值
use.__proto__ = "王五";

// 经过两次设置后正常情况下__proto__的值应该为王五才对
// 但是运行后show方法仍然可以执行
// use.show();
use.getname(); // 李四
// 打印分析后发现__proto__有get和set两个属性
// 所以 __proto__不是一个具体的属性，而是一个属性访问器
// 当set __proto__ 值的时候会判断所赋值是不是object，如果是的话就进行赋值不是的话不会赋值
console.log(use);

// 原理实例
let newuse = {
  active: {
    name: "lisi",
  },
  // 使用构造器声明proto
  get proto() {
    return this.active;
  },
  set proto(obj) {
    // 给__protp__赋值的时候判断值的类型
    if (obj instanceof Object) {
      this.active = obj;
    }
    return true;
  },
};
// 设置newuse的proto值为对象类型的数据
newuse.proto = {
  age: 18,
  height: 188,
};
// 设置newuse的proto值为具体的值
newuse.proto = "wangwu";

// 打印结果发现值为对象，自动过滤了不是对象类型的赋值
console.log(newuse.proto);
```

## 改变构造函数的原型不是继承

```js
// 原型的继承，不是改变构造函数的继承
function User() {}
User.prototype.name = function() {
  console.log("User methed name");
};
// 此种方法只是构造函数的原型被改变
let use = new User();

function Admin() {}
// 新的函数的原型等于User函数的原型
Admin.prototype = User.prototype;
// 此时Admin的原型和User的原型是同一个
// 因此在Admin中改变name方法时User方法中的name也会受到影响
Admin.prototype.name = function() {
  console.log("admin methed name");
};

let admin = new Admin();

use.name(); // admin methed name
admin.name(); // admin methed name
```

## 继承是原型的继承

{% note info no-icon %}

- Object.create 是重新创建一个原型，在实例化之后对函数进行 Object.create 操作不会改变实例化变量的原型指向
- 使用 prototype.\_\_proto\_\_ = User 表示改变构造函数的原型指向，所以尽管在实例化之后改变构造函数的原型指向，实例化出来的变量也会受到影响。
  {% endnote %}

```js
// 初始化对象，在prototype原型上定义show方法
function User() {}
User.prototype.show = function() {
  console.log("user-metheds-show");
};

// 定义Age方法
function Age() {}
// 默认方法的prototype里面的__proto__指向Object.prototype
console.log(Age.prototype.__proto__ == Object.prototype); // true
// 改变Age的prototype的父级原型指向
/*
  改变原型的父级指向称之为继承
  好处是保留了自己本身的原型，同时又继承了其他原型
*/
Age.prototype.__proto__ = User.prototype;
console.dir(Age);
// 这个是候往Age的原型上添加方法不会影响User的原型
Age.prototype.ageshow = function() {
  console.log("Age-metheds-show");
};

// 实例化两个构造函数
let u = new User();
let a = new Age();

// u可以正常使用User原型中的show方法
u.show(); // user-metheds-show
// u.ageshow(); 此行代码报错，因为User没有继承Age的原型，所以不存在ageshow方法
/*
  由于原型继承了User的原型，所以用show方法没有问题
  同时自己的原型上的方法没有受到影响是，所以也可以用ageshow方法
*/
a.show(); // user-metheds-show
a.ageshow(); // Age-metheds-show

// 使用Object.create()也可以继承其他方法的原型
function Info() {}
let i = new Info();
/*
    使用Object.create()继承原型前就实例化的构造函数，会导致实例化指向的原型还是继承之前的原型
    继承之前原型中不包含show方法，所以i.show()会报错
    但是使用Info.prototype.__proto__ = User.prototype之前实例化不会报错
    因为Info.prototype.__proto__ = User.prototype是改变原型的指向，
    Object.create是重新创建一个原型
*/
// Info.prototype = Object.create(User.prototype);
Info.prototype.__proto__ = User.prototype; // 改变原型指向，
i.show(); // user-metheds-show
console.dir(Info);
```

## Object.create()继承造成的影响

- 影响一：constructor 归属问题

```js
// 声明User构造函数
function User() {}
// 给User的原型添加show方法
User.prototype.show = function() {
  console.log("User show");
};

// 声明Info构造函数
function Info() {}
// 使用Object.create()方法继承User的原型
Info.prototype = Object.create(User.prototype);
// 再打印User的结构
console.log(User.prototype); // {show: ƒ, constructor: ƒ}
// 这个时候打印Info的结构
console.log(Info.prototype); // {}
```

上面代码中 Info 的 prototype 原型中的 constructor 没有了，就是因为使用 Object.create 过程中吧 Info 的 constructor 弄丢了，此时去实例化两个构造函数，分别打印出实例化变量的 constructor，发现打印的结果都是 User

```js
// 在实例化上面两个构造函数
let u = new User();
let i = new Info();
// u 打印的结果为User
console.log(u.constructor); // User
// i 正常情况下应该打印Info,但是是由于Object.create继承时没有指定constructor，导致没有正确打印
console.log(i.constructor); // User
```

通过手动指定 Info 的 constructor 为 Info

```js
// 分析情况后给Info添加constructor = Info
Info.prototype.constructor = Info;
// 再次打印现在正确返回
console.log(i.constructor); // Info
```

- 影响二：constructor 可被遍历问题

```js
// 使用 for in 遍历 i
/*
    由于for in 的特点可以遍历到原型中的数据
    但是我们发现遍历i的时候吧constructor也给遍历了出来
    为了不遍历constructor，可以在设置constructor的时候吧它设置为不可遍历
*/
for (const key in i) {
  console.log(key);
  // constructor
  // show
}
// 先查看一下Info的属性
/*
    分析发现Info.prototype.constructor的enumerable属性为true
    意思为可被遍历
    那么可以在设置这个值得时候直接设置为不可遍历
*/
console.log(
  JSON.stringify(Object.getOwnPropertyDescriptors(Info.prototype), null, 2)
);

// 修改如下
Object.defineProperty(Info.prototype, "constructor", {
  // 设置值
  value: Info,
  // 设置不可遍历
  enumerable: false,
});
// 再次for in
/*
    结果不在打印constructor，设置成功
*/
for (const key in i) {
  console.log(key); // show
}
```

## 方法重写和父级属性访问

```js
// 定义基础函数
function User() {}
User.prototype.show = function() {
  console.log("User-show");
};
User.prototype.site = function() {
  return "User-site";
};

// 定义Info继承User
function Info() {}
Info.prototype.__proto__ = User.prototype;

// 实例化Info
let i = new Info();
// 这个时候调用show方法来自User的原型
i.show(); // User-show

// 在Info中重写show方法
Info.prototype.show = function() {
  //使用 User.prototype.site() 调用继承的函数中的方法
  console.log(User.prototype.site() + "Info-show"); // User-siteInfo-show
};
// 重写完成后调用show方法变成了Info原型中的方法
i.show();
```

## 面向对象的多态

{% note info no-icon %}
多态：根据不同的状态响应出不同的结果
{% endnote %}

```js
function User() {}
User.prototype.show = function() {
  // 多态：根据不同的状态响应出不同的结果
  console.log(this.getName());
};

function student() {}
student.prototype.__proto__ = User.prototype;
student.prototype.getName = function() {
  return "学生";
};

function headmaster() {}
headmaster.prototype.__proto__ = User.prototype;
headmaster.prototype.getName = function() {
  return "班主任";
};

function HeadOfDepartment() {}
HeadOfDepartment.prototype.__proto__ = User.prototype;
HeadOfDepartment.prototype.getName = function() {
  return "系主任";
};

for (const obj of [new student(), new headmaster(), new HeadOfDepartment()]) {
  obj.show(); // 学生 班主任 系主任
}
```

## 使用父类构造函数初始属性

```js
// 声明User构造函数，接收name和age
function User(name, age) {
  this.name = name;
  this.age = age;
}
// 在原型上添加show方法
User.prototype.show = function() {
  console.log(`${this.name},${this.age}`);
};

function Admin(...args) {
  // 引用构造函数User,通过apply改变User的this指向
  // 实现初始化属性在User当中完成
  User.apply(this, args);
}
Admin.prototype = Object.create(User.prototype);
let a = new Admin("李四", 18);
a.show(); // 李四,18

// 引用父类构造函数，复用了初始化的代码
function Info(...args) {
  User.apply(this, args);
}
Info.prototype = Object.create(User.prototype);
let i = new Info("张三", 19);
i.show();
```

## 使用原型工厂实现封装继承

```js
// 初始化构造函数
function User(name, age) {
  this.name = name;
  this.age = age;
}
// 在原型上添加show方法
User.prototype.show = function() {
  console.log(`${this.name},${this.age}`);
};

// 搭建工厂函数
function extend(sub, sup) {
  sub.prototype = Object.create(sup.prototype);
  Object.defineProperty(sub.prototype, "construciton", {
    value: sub,
    enumerable: false,
  });
}

function Mumber(...args) {
  User.apply(this, args);
}
// 使Munber函数和User函数扯上关系
extend(Mumber, User);
let mumber = new Mumber("李四", 18);
mumber.show();
```

## 对象工厂派生对象并实现继承

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}
User.prototype.show = function() {
  console.log(`${this.name},${this.age}`);
};

// 创建方法的形式实现继承
function admin(...args) {
  const insta = Object.create(User.prototype);
  User.apply(insta, args);
  insta.siate = function() {
    console.log("si=te");
  };
  return insta;
}
let a = admin("李四", 18);
a.show();
a.siate();
console.dir(a);

let b = admin("王五", 30);
b.show();
b.siate;

console.log(a.__proto__ === b.__proto__); // true
```

## 使用 mixin 实现多继承

```js
// 建设工厂函数，方便继承
function exted(sub, sup) {
  sub.prototype = Object.create(sup.prototype);
  Object.defineProperty(sub.prototype, "construstion", {
    value: sub,
    enumerable: false,
  });
}
// 定义多个功能对象

// 获取地址
const Address = {
  getaddress() {
    console.log("获取地址");
  },
};
// 请求接口
const Request = {
  ajax() {
    return "接口返回";
  },
};
// 获取手机号
const Iphone = {
  // 单独方法也可以继承其他原型
  __proto__: Request,
  getiphone() {
    console.log(super.ajax() + "获取手机号");
  },
};
// 获取姓名
const GetName = {
  getname() {
    console.log(this.name);
  },
};

// User函数
function User(name, age) {
  this.name = name;
  this.age = age;
}
User.prototype.show = function() {
  console.log(this.name, this.age);
};

// 使用 Object.assign 往User当中添加多个方法类
/*
            Object.assign可以往对象中添加属性
            添加完之后可以不用层层继承实现调用其他对象里面的功能
        */
User.prototype = Object.assign(User.prototype, Address, GetName, Iphone);
console.dir(User);

// 定义admin构造函数
function Admin(...args) {
  User.apply(this, args);
}
// 使Admin继承User
exted(Admin, User);

let admin = new Admin("李四", 15);
admin.show();
admin.getaddress();
admin.getname();
admin.getiphone();
```
