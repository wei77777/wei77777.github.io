---
title: 探索 js 函数的秘密
tags: JavaScript
categories: JS系统学习
abbrlink: 24f84a82
date: 2020-12-23 00:00:00
---
 

{% note info no-icon %}
函数是由事件驱动的或者当它被调用时执行的可重复使用的代码块。
{% endnote %}

## 函数声明的多种方式

```js
// 字面量方式声明函数
function logtitle(title) {
  console.log(title);
}
logtitle("6666");

// 表达式声明函数,结尾要加分号，不加分号在打包是可能会出错
let logmsg = function(msg) {
  console.log(msg);
};
logmsg("888");

// 对象中使用函数
let obj = {
  name: null,
  setUserName(name) {
    this.name = name;
  },
  getUserName() {
    return this.name;
  },
};
obj.setUserName("lisi");
console.log(obj.getUserName());
```

## 全局函数声明特点

{% note info no-icon %}
声明全局函数时会把函数默认加载到 window 中，如果出现和已有的 window 方法重名，则原有方法会被新方法覆盖
{% endnote %}

```js
// 全局声明特点，如果单独声明了一个函数，会默认在window当中体现，也就是用window.方法名也同样会执行方法
function logname() {
  console.log("name");
}
logname();
window.logname();

// 声明一个和此方法同名的函数
function innerWidth() {
  console.log("同名函数");
}
// 此时在用window会导致原本的功能失效
window.innerWidth();

// 总结：定义的全局函数函数名如果和window本身自带的方法名相同
// 会把原来的功能覆盖，导致程序异常

// 可以利用let或者const定义函数,这时用window去调用的时候不会调用到
let getusername = function() {
  console.log("name");
};
getusername();
```

## 获取屏幕宽度

```js
// 采用window自带的方法，获取屏幕宽度
console.log(window.innerWidth);
```

## 监听屏幕大小改变事件

```js
// 给window添加窗口大小事件，窗口大小发生变化时触发
window.addEventListener("resize", function(e) {
  // 监听屏幕高度
  console.log(e.currentTarget.innerHeight);
  // 监听屏幕宽度
  console.log(e.currentTarget.innerWidth);
});
```

## 匿名函数和函数提升

{% note info no-icon %}

- 函数提升，如果使用变量定义了一个函数，则不能在定义该方法前使用该函数
- 没有用变量定义函数的话会存在函数提升，可以在页面任意地方使用
  {% endnote %}

```js
// 函数提升，如果使用变量定义了一个函数，则不能在定义该方法前使用该函数
// show(); // 此行代码报错
var show = function() {
  console.log("用变量定义函数");
};
show();

// 没有用变量定义函数的话会存在函数提升，可以在页面任意地方使用
log();
function log() {
  console.log("全局函数");
}
log();
```

## 立即执行函数和块机作用域

```js
(function() {
  function show() {
    console.log("1.js.show()");
  }
  window.js1 = { show };
})();

// 上下两种方法效果相同，都是为了让函数包含在一个块机作用域中，不是暴露在全局
{
  function show() {
    console.log("1.js.show()");
  }
  window.js1 = { show };
}
```

## 默认参数的使用技巧

```js
// 数组排序，默认为倒序排列
function sortArray(array, type = "sort") {
  return array.sort((a, b) => {
    return type === "sort" ? a - b : b - a;
  });
}
// 没有第二个参数，默认等于sort，默认是倒序
console.log(sortArray([1, 5, 7, 9, 3, 2, 4, 5, 6]));
// 有第二个参数，排序为正序
console.log(sortArray([1, 5, 7, 9, 3, 2, 4, 5, 6], "other"));
```

## 函数参数和 argument 参数

```js
function sum() {
  // arguments可以接收到方法传递过来的全部参数
  console.log(arguments);
  console.log([...arguments].reduce((a, b) => (a += b)));
}

sum(1, 2, 3, 5, 4, 8, 7, 8, 4, 8);

// 最新的语法中可以用 ...XXX 接收传递过来的参数
function args(...arg) {
  console.log(arg);
}
args(5, 4, 8, 5, 4, 8, 5, 4, 5, 8, 6);
```

## 箭头函数

```js
// 数组求和
function sum(array) {
  return array.reduce((a, b) => a + b);
}
console.log(sum([1, 2, 3, 4, 5, 6, 7, 8, 9]));

// 数组过滤函数
function filter(array) {
  return array.filter((item) => item <= 3).sort((a, b) => a - b);
}
console.log(filter([5, 2, 1, 4, 8, 6, 3, 5, 4, 8, 6]));
```

## 使用函数完成递归操作

{% note info no-icon %}

- 递归函数必须接受参数。 （比如我要递归谁？）
- 在递归函数的定义初始，应该有一个判断条件，当参数满足这个条件的时候，函数停止执行，并返回值。（指定退出条件，否则就会死循环）
- 每次递归函数执行自己的时候，都需要把当前参数做某种修改，然后传入下一次递归。（每次循环在调用自己一次并传参）
- 当参数被累积修改到符合初始判断条件了，递归就停止了。（最后满足条件就退出）
- 一句话概括：所谓的递归函数就是在函数体内调用 n 次本函数。
  {% endnote %}

```js
// 递归：函数自己调用自己
function digui(num) {
  console.log(num);
  return num == 1 ? 1 : num * digui(--num);
}
console.log(digui(5));
```

## 递归求和

```js
// args.pop() 获取到数组最后一个,并且删除最后一个
function sum(...args) {
  let pop = args.pop();
  console.log(pop);
  console.log(args);
  return args.length === 0 ? 0 : pop + sum(...args);
}
console.log(sum(1, 2, 5, 5, 5, 5, 5));
```

## 递归实现倒三角形

```js
function state(num) {
  num ? document.write("*".repeat(num) + "<br>") + state(--num) : "";
  // if(num === 0){
  //     return ''
  // }
  // document.write('*'.repeat(num)+'<br>')
  // state(--num)
}
state(10);
```

## 回调函数

{% note info no-icon %}
在某个时刻被其他函数调用的函数称为回调函数，比如处理键盘、鼠标事件的函数。
{% endnote %}

```js
document.querySelector("button").addEventListener("click", (item) => {
  // toElemetn ,得到元素本身
  item.toElement.style.fontSize = "200px";
  alert("回调函数");
});
```

## 展开语法（点语法）的使用

```js
// 展开语法的收和放
// 收（...在等号左边）
let arr1 = [1, 2, 3, 4, 5];
// 下面定义可以吧arr1数组里面的第一个值给a1,剩余的值都给a
let [a1, ...a] = arr1;
console.log(a1, a);

// 放
let arr2 = [1, 2, 3];
// 下面写法可以吧arr2数组中的值分别赋值给d，e，f
let [d, e, f] = [...arr2];
console.log(d, e, f);
// 或者直接打印展开的arr2
console.log(...arr2);

// 计算商品总价和折扣后的值
function sum(toElement, ...price) {
  let total = price.reduce((a, b) => a + b);
  return toElement > 0 ? toElement * total : total;
}
console.log(sum(0.9, 20, 30, 40, 50));

let data = [
  {
    name: "李四",
    id: "8",
  },
  {
    name: "张三",
    id: "9",
  },
  {
    name: "老王",
    id: "30",
  },
];
let newdata = [];
data.forEach((item) => {
  newdata.push(item.name);
});
console.log(newdata.join("爱上了"));
```

## 方法和函数中的 this 指向

```js
var age = 18;
let user = {
  weight: "179kg",
  height: "188cm",
  // 对象里面的元素定义为函数我们称为方法
  // getinfo也是user对象的一个元素，所以getinfo方法中的this指向user对象
  getinfo: function() {
    console.log(this);
    console.log(this.age);
    // 方法里面定义了函数,函数没有执行任何变量，所以默认this执行window
    function getwidth() {
      console.log(this);
      console.log(this.age);
    }
    getwidth();
    // 这里得this指向user
    return this.weight;
  },
};
console.log(user.getinfo());
```

## 通过常量改变 this 指向

```js
let user = {
  weight: "75kg",
  height: "188cm",
  lists: ["js", "css", "html"],
  show: function() {
    // map可以接收一个参数，传入this，则方法里面的this指向就是对象的this
    return this.lists.map(function() {
      console.log(this);
    }, this);
  },
};
console.log(user.show());
```

## 箭头函数带来的 this 指针变化

{% note info no-icon %}
箭头函数本身没有 this 执行，他会往上下文找 this，通常说指向它的调用者。
{% endnote %}

```html
<button>张三</button>
<a href="javaScript:;">标签一</a>
<a href="javaScript:;">标签二</a>
```

```js
let obj = {
  site: "你好",
  show() {
    // 方法里面的this指向它本身定义者的this
    // 因为show属于obj对象的一个属性，所以show方法里面的this指向obj
    console.log(this);
    const that = this;

    // 普通方法添加点击事件
    let fun_btn = document.querySelector("button");

    fun_btn.addEventListener("click", function(ele) {
      // 如果使用的普通函数，this指向调用者本身
      // 因为这个方法是属于按钮的，所以this就是按钮本身
      console.log(this, "普通函数的this执行");
      console.log(that.site + this.innerHTML); // 张三
    });

    let arrows_btn = document.querySelector("button");
    // 声明箭头函数
    arrows_btn.addEventListener("click", (ele) => {
      // 箭头函数本身没有this执行，他会网上下文找this
      // 此处的箭头函数往上寻找this，找到了show方法的this
      // show方法的this指向的是obj对象，所有此处箭头函数里面的this就是obj
      // 可以在括号里面声明参数，这个参数指向按钮
      // 可以用参数.target获取到按钮
      console.log(this, "箭头函数的this指向");
      console.log(this.site + ele.target.innerHTML);
    });
  },
};
obj.show();

let newobj = {
  site: "这是",
  show() {
    // 这里this指向newobj对象
    const that = this;
    let alist = document.querySelectorAll("a");
    alist.forEach(function(item) {
      // 这里this指向window
      console.log(this);
      item.innerHTML = that.site + item.innerHTML;
      item.addEventListener("click", function() {
        // 这里this指向a标签
        console.log(this);
        console.log(that);
      });
    });
  },
  arrows() {
    let alist = document.querySelectorAll("a");
    alist.forEach((item) => {
      item.addEventListener("click", (ele) => {
        // 这里this往上找this，找到了forEach的箭头指向
        // forEach的箭头指向又往上找，找到了arrows方法的this
        // arrows方法的this指向对象本身,所以这里的this指向newobj对象
        console.log(this);
        console.log(ele.target);
      });
    });
  },
};
newobj.arrows();
```

## this 的构造原理实现

```js
function getuser(msg) {
  console.log(this);
  this.name = msg;
  console.log(this);
}
// 如果直接调动此函数，则他的this指向window
// getuser('lis')

// new 一个函数表示将此函数变为构造函数
// 构造函数中的this初始为空，传入参数后，this就指向参数
// let user = new getuser('张三')

function callfun(msg) {
  this.name = "这是" + msg;
  console.log(this);
}
let obj = {
  age: "18",
};
// 利用call改变函数中的this指向，第一个参数表示要指向哪里
callfun.call(obj, "王五");
```

## call 和 apply 改变 this 指向

{% note info no-icon %}

- call()传递参数必须为逗号分隔传递,第一个参数是要指向的目标
- apply()传递参数必须是数组方式传递,第一个参数是要指向的目标
  {% endnote %}

```js
// 改变this指向并且接收来自call的参数
function publicfun(age, height) {
  // 通过改变this指向指向了obj1
  console.log(this); // {name: "李四"}
  console.log(age + height + this.name); // 18188cm李四
}
let obj1 = {
  name: "李四",
};
let obj2 = {
  name: "张三",
};
// call传递参数必须为逗号分隔传递
publicfun.call(obj1, "18", "188cm");
// apply传递参数必须是数组方式传递
publicfun.apply(obj2, ["18", "175cm"]);

// 实例 example,求出数组内的最大值
let maxarray = [1, 2, 3, 4, 5, 6];
// 方法一：利用Math.max特性计算
console.log(Math.max(...maxarray));
// 方法二:利用apply传递数组参数的特性，改变this指向Math，然后直接把数组传递过去
console.log(Math.max.apply(Math, maxarray));
// 方式三:利用call采用逗号分隔方式传递参数，将this指向为Math，求出最小值
console.log(Math.min.call(Math, ...maxarray));
```

## 构造函数方法继承

```js
function pubilcfun() {
  this.url = "http://www.houdun/";
  this.get = (parmas) => {
    let url =
      this.url +
      this.dominname +
      "?" +
      Object.keys(parmas)
        .map((item) => `${item}=${parmas[item]}`)
        .join("&");
    document.write(url + "<hr>");
  };
}

function fun1() {
  this.dominname = "bilibili";
  // 构造方法继承，通过call改变this执行
  pubilcfun.call(this);
}
// new一个函数后可以用这个函数里面的方法
let user = new fun1();
user.get({ age: 18, name: "李四" });

function rolefn() {
  this.dominname = "baidu";
  pubilcfun.apply(this);
}
let role = new rolefn();
role.get({ name: "管理员", asname: "账管员" });
```

## bind 的使用

{% note info no-icon %}

- bind call apply
- 三者相同点：都是用来改变 this 指向
- 不同点:
- call:传递参数要用逗号分割开来，会立即执行
- apply：传递参数以数组的形式传递，会立即执行
- bind：传递参数以逗号分开，和 call 相同，不会立即执行
{% endnote %}

```js
function user() {
  console.log(this.name);
}
// call 立即执行
user.call({ name: "李四" });
// apply 立即执行
user.apply({ name: "李四" });
// bind 不会立即执行，如果想要立即执行可以在后面加上括号
user.bind({ name: "李四" });
user.bind({ name: "李四" })();

// 因为bind不会立即执行的特点，可以利用此特性传参
let button = document.querySelector("button");
button.addEventListener(
  "click",
  function(ele) {
    document.write(`${this.name}${ele.target.innerHTML}`);
  }.bind({ name: "zhangsan" })
);
```

## 形参和实参

{% note info no-icon %}

- 接收的参数为形参
- 传递过去的参数为实参
{% endnote %}

```js
// 接收的参数为形参
function sum(a, b) {
  return a + b;
}

// 传递过去的参数为实参
console.log(sum(5, 9));

// 默认参数
function show(name = "张三", age = 18) {
  console.log(name, age);
}
show("李四", 15);
```
