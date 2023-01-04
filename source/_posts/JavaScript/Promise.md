---
title: promise
tags: JavaScript
categories: JS系统学习
abbrlink: 9b0c2390
date: 2020-12-16 00:00:00
---

## promise 是什么

{% note info no-icon %}
- 主要用于异步计算
- 可以将异步操作队列化，按照期望的顺序执行，返回符合预期的结果
- 可以在对象之间传递和操作 promise，帮助我们处理队列
{% endnote %}

## 异步加载图片体验异步操作

{% note info no-icon %}

下面例子使用体验异步加载图片，图片加载成功后返回图片信息，否则返回失败<br>
没有使用 Promise 可以看到代码非常复杂
{% endnote %}

```js
function loadimg(src, resolve, reject) {
  let image = new Image();
  image.src = src;
  image.onload = resolve(image);
  image.onerror = reject;
}
loadimg(
  "./image/preview (1).jpg",
  (image) => {
    document.body.appendChild(image);
  },
  () => {
    console.log("失败");
  }
);
console.log("加载图片");
```

## promise 微任务队列

{% note info no-icon %}
代码执行优先级：同步任务 > 微任务 > 宏任务
{% endnote %}

```js
let age = "18";
// Promise会产生一个微任务
// 普通的setTimeout，setInterval等都属于宏任务
// 同步任务 > 微任务的优先级 > 宏任务优先级
function getname(name) {
  return new Promise((resolve, reject) => {
    if (name.indexOf("宋") !== -1) {
      age = "success";
      resolve("成功");
    } else {
      age = "error";
      reject("失败");
    }
  });
}
getname("宋十三")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
console.log(age);
```

```
运行结果
success
成功
```

上述例子中先声明了<code>age = "18"</code>，代码从上往下执行，又个 age 赋值了 success，由于同步任务优先执行，所以先打印<code>success</code>，Promise 会创建一个微任务，所以同步任务执行完毕后执行微任务，最后打印<code>成功</code>。

## 宏任务和微任务的执行顺序

{% note info no-icon %}
下面例子体验同步任务、微任务、同步任务的执行顺序
{% endnote %}

```js
// 宏任务的优先级最低
setTimeout(() => {
  console.log("宏任务"); // 4
}, 0);

new Promise((resolve, reject) => {
  // 发送成功状态,往微任务中添加then方法
  resolve();
  console.log("promise的同步任务"); // 1
}).then(() => {
  console.log("微任务"); // 3
});
console.log("普通的同步任务"); // 2
```

## 宏任务的提升和误解

{% note info no-icon %}
如果宏任务的触发时机在微任务之前则宏任务优先
{% endnote %}

```js
new Promise((resolve, reject) => {
  // new Promise中的代码属于同步任务
  // 在同步任务中添加了一个宏任务
  // 在执行宏任务的过程中添加了一个微任务
  // 此时的为微任务必须等待宏任务执行完毕后再执行
  setTimeout(() => {
    resolve();
    console.log("同步任务中的宏任务"); // 2
  }, 0);
}).then(() => {
  console.log("宏任务执行完毕后的微任务"); // 3
});
console.log("同步任务"); // 1
```

## promise 单一状态和任务中转

{% note info no-icon %}
promise 中只要状态发送出去之后就不能再改变
{% endnote %}

```js
let p = new Promise((resolve, reject) => {
  resolve("成功");
});
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(p);
  }, 1000);
  // promise中的状态只要发送出去后不会再被改变
  // 给出的失败状态,在倒计时一秒后状态是成功,但是失败的状态已经发送出去了,所以失败状态不会改变
  reject("失败");
})
  .then((res) => {
    console.log(res, "success");
  })
  .catch((err) => {
    console.log(err, "error");
  });
console.log("同步任务");
```

## promise.then 的基本语法

```js
new Promise((resolve, reject) => {
  reject("失败");
})
  // 如果有then不处理会一直往后面调用
  // 处理的话不会继续往后执行
  .then(null, (err) => {
    console.log("半路拦截处理结果,不在往后继续执行");
  })
  .then(null, (err) => {
    console.log(err);
  });
```

## promise.then 也是一个 promise

```js
let p1 = new Promise((resolve, reject) => {
  resolve("成功");
});
let p2 = p1.then(
  (suc) => {
    console.log("p2的成功");
  },
  (err) => {
    console.log("p2的失败");
  }
);
setTimeout(() => {
  console.log(p1); // Promise {<fulfilled>: "成功"}
  console.log(p2); // Promise {<fulfilled>: undefined}
});
```

## then 返回值的处理技巧

{% note info no-icon %}
then 里面的返回值会交给下一个 then 去处理，并且下一个 then 拿到的是上一个 then 返回出来的值
{% endnote %}

```js
let p1 = new Promise((resolve, reject) => {
  resolve("p1失败");
})
  .then(
    (suc) => {
      return new Promise((resolve, reject) => {
        resolve("p1解决交给p2");
      });
    },
    (err) => {
      console.log(err);
    }
  )
  .then(
    (res) => {
      return "p2交个p3";
    },
    (err) => {
      console.log(err);
    }
  )
  // 下面的then都是上面返回的处理
  .then((res) => {
    console.log(res);
  });
```

## 其他类型的 promise 封装

```js
new Promise((resolve, reject) => {
  resolve();
})
  .then((res) => {
    // 1.返回一个promise
    // return new Promise((resolve,reject)=>{
    //     resolve("成功")
    // })

    // 2.返回一个普通的对象
    // return {
    //     name:"张三"
    // }

    // 3.返回特殊函数，可以当成普通的promise来使用
    // return {
    //     then(resolve,reject){
    //         resolve("这是一个对象")
    //     }
    // }

    // 4.返回一个类
    class hd {
      then(resolve, reject) {
        setTimeout(() => {
          resolve("成功");
        }, 1000);
      }
    }
    return new hd();
  })
  .then((res) => {
    console.log(res);
  });
```

## promise 的多种错误处理机制

```js
function getname() {
  return new Promise((resolve, reject) => {
    reject("name失败");
  });
}
function getage() {
  return new Promise((resolve, reject) => {
    resolve("age成功");
  });
}
getname()
  .then((res) => {
    return getage();
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    // 推荐在结尾加上catch可以监测多个promise的错误
    // 不管哪个promise错误都会进入catch当中进行处理
    console.log(err);
  });
```

## 使用 finally 实现异步加载动画

{% note info no-icon %}
finally 方法不管成功和失败都会被触发
{% endnote %}

```css
#loading {
  display: none;
}
```

```html
<button onclick="getcode()">测试</button>
<span id="loading">
  加载中...
</span>
<ul id="ul"></ul>
```

```js
function getcode() {
  let loading = document.querySelector("#loading");
  let ul = document.querySelector("#ul");
  ul.innerHTML = "";
  // 显示加载动画
  loading.style.display = "block";
  ajax("http://localhost:3000/search/hot/detail")
    .then((res) => {
      console.log(res);
      let data = res.data;
      data.forEach((item) => {
        // 1.创建li元素
        let li_node = document.createElement("li");
        // 2.创建文字
        let text = document.createTextNode(item.content);
        // 3.把文字添加到li中
        li_node.appendChild(text);
        // 4.吧li添加到ul中
        ul.appendChild(li_node);
      });
    })
    .finally(() => {
      // finally不管接口成功还是失败都会执行,可以用来关闭加载动画
      loading.style.display = "none";
    });
}
```

## Promise 异步加载图片

```js
function onloadImg(src) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = src;
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      reject(img);
    };
  });
}
onloadImg("https://songzhengxiang.gitee.io/blog/assets/img/logo.png")
  .then((res) => {
    console.log(res);
    res.style.border = "2px solid red";
    document.body.appendChild(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

## 封装 setTimeout

```js
function timeout(time = 1000) {
  // 倒计时一定时间后返回正确状态,进入then里面
  return new Promise((resolve) => setTimeout(resolve, time));
}
timeout()
  .then(() => {
    console.log("第一次");
    // return的内容进入下一次then中处理
    return timeout(2000);
  })
  .then(() => {
    console.log("第二次");
  });
```

## 扁平化构建 setinterval

{% note info no-icon %}
使用 promise 封装 setinterval 实现方块移动动画
{% endnote %}

```css
#div {
  width: 100px;
  height: 100px;
  background-color: #09c;
  position: absolute;
}
```

```html
<div id="div"></div>
```

```js
// 封装定时器的方法接收一个时间和一个回调函数
function interval(time = 1000, calback) {
  // 返回promise
  return new Promise((resolve) => {
    // 给定时器设置id
    let id = setInterval(() => {
      // 给回调函数传递连个参数
      // 一个时定时器的id
      // 一个时promise的成功状态
      calback(id, resolve);
    }, time);
  });
}
// 调用参数传入时间，回调函数接收到定时器的id，和promise的回调状态
interval(7, (id, resolve) => {
  // 获取到元素本身
  let div = document.querySelector("#div");
  // 获取到元素距离左边距
  let left = parseInt(window.getComputedStyle(div).left);
  // 改变元素的左边距
  div.style.left = left + 1 + "px";
  if (left > 500) {
    clearInterval(id);
    resolve(div);
  }
}).then((div) => {
  interval(10, (id, resolve) => {
    let width = parseInt(window.getComputedStyle(div).width);
    div.style.width = width - 1 + "px";
    if (width <= 10) {
      div.style.background = "red";
      clearInterval(id);
    }
  });
});
```

## promise.resolve 语法

{% note info no-icon %}
此方法会使 promise 的返回值一直在 then 中
{% endnote %}

```js
function getname() {
  let name = "宋十三";
  return Promise.resolve(name);
}
// 从接口只会返回then
getname().then((res) => {
  console.log(res);
});
```

## promise.reject 语法

{% note info no-icon %}
此方法会使 promise 的返回值一直在 catch 中
{% endnote %}

```js
function errfun() {
  return Promise.reject("失败");
}
errfun().catch((err) => {
  console.log(err);
});
```

## promise.all 语法

{% note info no-icon %}
此方法接收一个方法数组，会同时执行这个数组中的方法，等待数组中的所有方法都执行完毕后返回结果，如果有任何一个方法返回失败则进入 catch 中
{% endnote %}

- 示例一

```js
let promise1 = new Promise((resolve, reject) => {
  reject("失败1");
});
let promise2 = new Promise((resolve, reject) => {
  resolve("成功2");
});
// 如果有一个返回的失败则进入catch
Promise.all([promise1, promise2])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

- 示例二

```js
// 封装方法批量请求数据
function getMusics(music) {
  let promises = music.map((item) => {
    return ajax(`http://localhost:3000/search?keywords=${item}`);
  });
  // 同时请求两个，返回的值都必须是已经解决的值
  return Promise.all(promises);
}
getMusics(["少年", "桥边姑娘"]).then((res) => {
  console.log(res);
});
```

## promise.allSettled 语法

{% note info no-icon %}
promise.allSettled 不在乎方法数组中的方法是否都是成功，如果有失败的 promise 则会返回
<code>status = "rejected"</code>
{% endnote %}

```js
let pro1 = new Promise((resolve, reject) => {
  let data = [
    {
      name: "xxx",
      code: "111xxx",
    },
  ];
  // 返回失败
  reject(data);
});
let pro2 = new Promise((resolve, reject) => {
  resolve("成功1");
});
// 使用allSettled不会显示所有的promise都必须是成功的
// 如果有失败的promise则会返回status = "rejected"
Promise.allSettled([pro1, pro2]).then((res) => {
  // 过滤出成功的结果
  res = res.filter((item) => {
    return item.status === "fulfilled";
  });
  console.log(res);
});
```

## promise.race 语法

{% note info no-icon %}
Promise.race 同样接受一个方法数组，但是 Promise.race()只会返回请求结果最快的那个函数
{% endnote %}

```js
let promises = [
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("成功1");
    }, 1000);
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("成功2");
    }, 500);
  }),
];
// Promise.race()只会返回请求结果最快的那个函数
Promise.race(promises).then((res) => {
  console.log(res);
});
```

## promise 队列原理

{% note info no-icon %}
当存在连续的.then 时，前面的 then 必须有返回值才会进入到后面的.then 中
{% endnote %}

```js
let prms = Promise.resolve(1);
prms = prms.then((res) => {
  console.log(res);
  // 返回promise必须有结果时才继续往下执行
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
    }, 1000);
  });
});
prms = prms.then((res) => {
  console.log(res);
  // 返回promise必须有结果时才继续往下执行
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(3);
    }, 1000);
  });
});
prms = prms.then((res) => {
  console.log(res);
  // 返回promise必须有结果时才继续往下执行
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(4);
    }, 1000);
  });
});
prms = prms.then((res) => {
  console.log(res);
});
```

## 使用 map 实现 promise 队列

```js
let nums = [1, 2, 3, 4, 5];
function prms(nums) {
  let promises = Promise.resolve();
  nums.map((v) => {
    // 每次执行完上次的promise后重新返回一个新的promise
    promises = promises.then((_) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(v);
          resolve();
        }, 1000);
      });
    });
  });
}
prms(nums);
```

## reduce 封装 promise

```js
let nums = [1, 2, 3, 4];
nums.reduce((prms, n) => {
  return prms.then((_) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(n);
        resolve();
      }, 1000);
    });
  });
}, Promise.resolve());
```

## 使用队列渲染数据

```js
let nums = ["张三", "李四", "王五"];
class getUser {
  // 请求数据
  ajax(user) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`这是${user}`);
      }, 1000);
    });
  }
  // 加工数据
  render(users) {
    users.reduce((prms, u) => {
      return prms
        .then(() => {
          return this.ajax(u);
        })
        .then((res) => {
          // 这个then获得结果时上个then返回的数据结果来自上面的ajax返回的结果
          this.view(res);
        });
    }, Promise.resolve());
  }
  view(data) {
    console.log(data);
    let h3 = document.createElement("h3");
    h3.innerHTML = data;
    document.body.appendChild(h3);
  }
}
new getUser().render(nums);
```

## async 和 await 语法糖

{% note info no-icon %}

- async 和 await 是 promise 的语法糖，其内部原理是一样的
- 但是 async 和 await 的写法要比 promise 简单
- async 相当于 new Promise
- await 相当于 then，也就是内部回调
  {% endnote %}

```js
function user1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("1");
      resolve("张三");
    }, 1000);
  });
}
function user2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("2");
      resolve("李四");
    }, 1000);
  });
}

// 方法前面加上async将普通方法变成一个promise
async function getname() {
  // await异步方法变成同步方法，前一个的await没有返回结果时不会往下执行
  let name1 = await user1();
  let name2 = await user2();
  // 等待方法中的所有await都执行完毕才执行返回
  return [name1, name2];
}
getname().then((res) => {
  console.log(res);
});
```

## async 和 await 执行异步操作

{% note info no-icon %}
加上 await 后必须等待前一个 await 返回状态后再继续执行后面的 await
{% endnote %}

```js
async function getuser() {
  let list1 = await ajax("http://localhost:3000/search/hot/detail");
  let list2 = await ajax("http://localhost:3000/search/hot/detail");
  console.log([list1, list2]);
}
getuser();
```

## await 延迟函数

{% note info no-icon %}
运行结果：每隔两秒打印一下
{% endnote %}

```js
function sleep(time = 2000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
async function getuser() {
  for (const user of ["张三", "李四"]) {
    await sleep();
    console.log(user);
  }
}
getuser();
```

## await 制作加载进度条

```css
.loading {
  height: 20px;
  line-height: 20px;
  text-align: center;
  background-color: rebeccapurple;
  color: white;
  transition: 0.5s;
  width: 0%;
}
```

```html
<div class="loading">50%</div>
<button onclick="getuser()">加载</button>
```

```js
function shell(time = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
async function getuser() {
  let loading = document.querySelector(".loading");
  loading.style.width = "0%";
  for (let i = 0; i < 10; i++) {
    await shell();
    let progress = ((i + 1) / 10) * 100;
    loading.style.width = progress + "%";
    loading.innerHTML = Math.round(progress) + "%";
    console.log(i);
  }
}
```

## class 和 await 的结合

```js
class getuser {
  constructor(name) {
    this.name = name;
  }
  then(resolve, reject) {
    resolve(this.name);
  }
}
async function getname() {
  let user = await new getuser("李四");
  console.log(user);
}
getname();
```

## 异步封装在类的内部

```js
function ajax(name) {
  return new Promise((resolve) => {
    resolve(name);
  });
}
class getuser {
  async get(name) {
    let user = await ajax(name);
    return user + ",你好";
  }
  // 错误写法
  // get(name) {
  //     // 不加async await 是会优先执行同步任务，然后再来执行微任务，就会导致先返回user
  //     // 在去执行ajax函数赋值user，这时候结果已经返回了出去，导致获取不到正确的值
  //     // 加上await后异步任务变成了同步任务，可以正确获取到user的值并等待函数执行完毕后再返回
  //     let user = ajax(name)
  //     return user + ',你好'
  // }
}
new getuser().get("张三").then((res) => {
  console.log(res);
});
```

## async 和 await 的多种声明方式

```js
function ajax() {
  return new Promise((resolve) => {
    resolve("hello,world");
  });
}
// 1.普通方法声明
async function getname() {
  return await ajax();
}
getname().then((res) => {
  console.log(res);
});

// 2.变量方法声明
let user = async function getname() {
  return await ajax();
};
user().then((res) => {
  console.log(res);
});

// 3.对象声明
let name = {
  async getname() {
    return await ajax();
  },
};
name.getname().then((res) => {
  console.log(res);
});

// 4.类声明
class userinfo {
  async getname() {
    return await ajax();
  }
}
new userinfo().getname().then((res) => {
  console.log(res);
});
```

## async 的错误处理

```js
async function getname() {
  // 发生错误不会继续往下执行
  console.log(a);
  console.log("6666");
}
getname()
  .then((res) => {})
  .catch((err) => {
    // catch到了错误,就没有错误
    // console.log(err);
  });
```

## 标准的 await 函数处理技巧

```js
function ajax(name) {
  return new Promise((resolve, reject) => {
    resolve(name + "你好");
  });
}
async function getname() {
  // 使用try catch 在方法内部处理可能出现的错误,如果方法体出现错误进入到catch当中
  // 下面的then只会返回出undefined
  // 如果方法执行正确正常返回
  try {
    let name = await errfun("张三");
    let age = `今年${name}芳龄18`;
    return age;
  } catch (error) {
    // 如果上面的代码出现错误则进入到catch中来进行处理
    console.log(error);
  }
}
getname()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    // 如果方法经过了try catch处理,则这里的catch不会生效
    console.log("sdfsdf");
    console.log(err);
  });
```

## await 并行执行方法

{% note info no-icon %}
并行执行用来处理多个方法之间不互相关联时，但是又想等待所有方法后获取到正确的结果
这时可以使用 promis.all 来处理，前面加上 await，最后返回的结果一定是方法执行后获取到的结果
{% endnote %}

```js
function f1() {
  return Promise.resolve("p1");
}
function f2() {
  return Promise.resolve("p2");
}
async function getname() {
  // 使用Promise.all同时请求多个方法
  // 前面加上await可以等待多个方法全部请求完毕后返回最终的结果
  let users = await Promise.all([f1(), f2()]);
  // 等待上面的方法执行完毕后获取到最终结果
  return users;
}
getname().then((res) => {
  console.log(res);
});
```
