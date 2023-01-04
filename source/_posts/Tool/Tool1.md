---
title: 常用的前端方法封装（一）
tags: JavaScript
categories: JS常用方法封装
abbrlink: bd03cdcc
date: 2021-03-15 00:00:00
---

## 鼠标在元素上移进移出事件
```js
// 获取到所有图片
let imags = document.querySelectorAll(".viewImg");
// 循环添加鼠标事件
imags.forEach((item) => {
  // 鼠标移动进来
  item.addEventListener("mouseover", function() {
    console.log("进来");
  });
  // 鼠标移动出去
  item.addEventListener("mouseout", function() {
    console.log("出来");
  });
});
```

## 如何确认父元素是否包含子元素
```js
function elementContains(parent, child) {
  return parent !== child && parent.contains(child);
}
// Examples
elementContains(
  document.querySelector("head"),
  document.querySelector("title")
); // true
elementContains(document.querySelector("body"), document.querySelector("body")); // false
```

## 获取当前 URL
```js
const currentURL = () => window.location.href;

// Example
currentURL(); // "https://google.com"
```

## 判断设备类型
```js
const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? "Mobile"
    : "Desktop";

// Desktop：桌面；Mobile：手机
console.log(detectDeviceType()); // "Mobile" or "Desktop"
```

## 获取两个日期之间的天数间隔
```js
const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

// Example
getDaysDiffBetweenDates(new Date("2017-12-13"), new Date("2017-12-22")); // 9
```

## 获取 URL 的参数
```js
const getURLParameters = (url) =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => (
      (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a
    ),
    {}
  );

// Examples
console.log(getURLParameters("https://baidu.com?n=张三&a=18"));
// {n: "张三", a: "18"}
```

## 判断某个元素上是否存在某个样式类

```html
<main>
  <div class="title block">标题</div>
</main>
<script>
  function hasClass(el, className) {
    let els = document.querySelector(el);
    return els.classList.contains(className);
  }
  // 判断某个元素上是否存在某个样式类
  console.log(hasClass("main>div", "title")); // true

  console.log(hasClass("main>div", "rightTitle")); // false
</script>
```
## 批量隐藏指定元素

```js
function hideAll(tagname) {
  let els = document.querySelectorAll(tagname);
  [...els].forEach((item) => {
    item.style.display = "none";
  });
}
// 隐藏所有 b 标签
hideAll("b");
```

## 切换元素的类

```js
// 切换元素的类
const toggleClass = (el, className) => el.classList.toggle(className);

// 如果该元素原本有success类，则删除这个类，如果没有则添加success
toggleClass(document.querySelector("div"), "success");
```

## 添加回到顶部按钮

```css
/* 元素固定在右下角样式 */
.top {
  position: fixed;
  right: 10px;
  bottom: 20px;
}
```

```html
<body>
  <div style="height: 999px;" id="center_box_lefts">
    <div style="height: 30px;">占位符</div>
    <div style="height: 30px;">占位符</div>
    <div style="height: 30px;">占位符</div>
    <div style="height: 30px;">占位符</div>
  </div>
  <button class="top" onclick="totop()">回到顶部</button>
  <script>
    // 监听滚动条位置
    window.addEventListener("scroll", () => {
      // pageYOffset:表示文档在窗口垂直方向滚动的像素
      console.log(window.pageYOffset);
      if (window.pageYOffset > 270) {
        document.querySelector(".top").style.display = "block";
      } else {
        document.querySelector(".top").style.display = "none";
      }
    });

    // 返回顶部方法
    const scrollToTop = () => {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
      }
    };
    function totop() {
      scrollToTop();
    }
    // Example
  </script>
</body>
```

## 确认指定元素是否在视口可见

```html
<style>
  #box {
    width: 200px;
    height: 200px;
    background-color: red;
    margin-top: 50px;
  }

  #box2 {
    width: 200px;
    height: 200px;
    background-color: green;
    margin-top: 300px;
  }
</style>

<body>
  <div id="box"></div>
  <div id="box2"></div>
  <script>
    const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
      const { top, left, bottom, right } = el.getBoundingClientRect();
      const { innerHeight, innerWidth } = window;
      return partiallyVisible
        ? ((top > 0 && top < innerHeight) ||
            (bottom > 0 && bottom < innerHeight)) &&
            ((left > 0 && left < innerWidth) ||
              (right > 0 && right < innerWidth))
        : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
    };
    let el = document.querySelector("#box");
    let el2 = document.querySelector("#box2");

    // true 完全可见
    console.log(elementIsVisibleInViewport(el));
    // false 部分可见或不可见
    console.log(elementIsVisibleInViewport(el2));
  </script>
</body>
```

## 监听页面宽高

```js
function watchSize() {
  let windowSize = {};
  window.addEventListener("resize", () => {
    windowSize = {
      innerHeight: this.innerHeight,
      innerWidth: this.innerWidth,
    };
    console.log(windowSize); // {innerHeight: 625, innerWidth: 232}
  });
  return windowSize;
}
watchSize();
```

## 获取格式化后的日期
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

// 可以根据指定的格式返回日期
console.log(dateFormat(date, "YYYY-MM-DD HH:mm:ss"));
```

