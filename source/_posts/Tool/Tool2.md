---
title: 常用的前端方法封装（二）
tags: JavaScript
categories: JS常用方法封装
abbrlink: 8d152114
date: 2021-03-15 00:00:00
---

## 输入一个值，返回其数据类型
```js
function type(para) {
    return Object.prototype.toString.call(para)
}
```

## 数组去重
```js
// 方法一
function unique1(arr) {
    return [...new Set(arr)]
}

// 方法二
function unique2(arr) {
    var obj = {};
    return arr.filter(ele => {
        if (!obj[ele]) {
            obj[ele] = true;
            return true;
        }
    })
}

// 方法三
function unique3(arr) {
    var result = [];
    arr.forEach(ele => {
        if (result.indexOf(ele) == -1) {
            result.push(ele)
        }
    })
    return result;
}
```

## 字符串去重
```js
// 所有的字符只会出现一次
String.prototype.unique = function () {
    var obj = {},
        str = '',
        len = this.length;
    for (var i = 0; i < len; i++) {
        if (!obj[this[i]]) {
            str += this[i];
            obj[this[i]] = true;
        }
    }
    return str;
}
//去除连续的字符串  
function uniq(str) {
    return str.replace(/(\w)\1+/g, '$1')
}
```
## 深拷贝 浅拷贝
``` js
//深克隆（深克隆不考虑函数）
function deepClone(obj, result) {
    var result = result || {};
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (typeof obj[prop] == 'object' && obj[prop] !== null) {
                // 引用值(obj/array)且不为null
                if (Object.prototype.toString.call(obj[prop]) == '[object Object]') {
                    // 对象
                    result[prop] = {};
                } else {
                    // 数组
                    result[prop] = [];
                }
                deepClone(obj[prop], result[prop])
    } else {
        // 原始值或func
        result[prop] = obj[prop]
    }
  }
}
return result;
}

// 深浅克隆是针对引用值
function deepClone(target) {
    if (typeof (target) !== 'object') {
        return target;
    }
    var result;
    if (Object.prototype.toString.call(target) == '[object Array]') {
        // 数组
        result = []
    } else {
        // 对象
        result = {};
    }
    for (var prop in target) {
        if (target.hasOwnProperty(prop)) {
            result[prop] = deepClone(target[prop])
        }
    }
    return result;
}
// 无法复制函数
var o1 = jsON.parse(jsON.stringify(obj1));
```
## 找出字符串中第一次只出现一次的字母
``` js
String.prototype.firstAppear = function () {
    var obj = {},
        len = this.length;
    for (var i = 0; i < len; i++) {
        if (obj[this[i]]) {
            obj[this[i]]++;
        } else {
            obj[this[i]] = 1;
        }
    }
    for (var prop in obj) {
       if (obj[prop] == 1) {
         return prop;
       }
    }
}
```

## 找元素的第n级父元素
``` js
function parents(ele, n) {
    while (ele && n) {
        ele = ele.parentElement ? ele.parentElement : ele.parentNode;
        n--;
    }
    return ele;
}
```

## 返回元素的第n个兄弟节点
``` js
function retSibling(e, n) {
    while (e && n) {
        if (n > 0) {
            if (e.nextElementSibling) {
                e = e.nextElementSibling;
            } else {
                for (e = e.nextSibling; e && e.nodeType !== 1; e = e.nextSibling);
            }
            n--;
        } else {
            if (e.previousElementSibling) {
                e = e.previousElementSibling;
            } else {
                for (e = e.previousElementSibling; e && e.nodeType !== 1; e = e.previousElementSibling);
            }
            n++;
        }
    }
    return e;
}
```

## 判断元素有没有子元素
```js
function hasChildren(e) {
    var children = e.childNodes,
        len = children.length;
    for (var i = 0; i < len; i++) {
        if (children[i].nodeType === 1) {
            return true;
        }
    }
    return false;
}
```
## 让一个元素插入到另一个元素的后面
```js
Element.prototype.insertAfter = function (target, elen) {
    var nextElen = elen.nextElenmentSibling;
    if (nextElen == null) {
        this.appendChild(target);
    } else {
        this.insertBefore(target, nextElen);
    }
}
```

## 获得滚动条的滚动距离
```js
function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    } else {
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}
```

## 获得视口的尺寸
```js
function getViewportOffset() {
    if (window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    } else {
        // ie8及其以下
        if (document.compatMode === "BackCompat") {
            // 怪异模式
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight
            }
        } else {
            // 标准模式
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight
            }
        }
    }
}
```
## 获取任一元素的任意属性
```js
function getStyle(elem, prop) {
    return window.getComputedStyle ? 
    window.getComputedStyle(elem, null)[prop] : 
    elem.currentStyle[prop]
}
```

## 绑定事件的兼容代码
```js
function addEvent(elem, type, handle) {
    if (elem.addEventListener) { //非ie和非ie9
        elem.addEventListener(type, handle, false);
    } else if (elem.attachEvent) { //ie6到ie8
        elem.attachEvent('on' + type, function () {
            handle.call(elem);
        })
    } else {
        elem['on' + type] = handle;
    }
}
```

## 解绑事件
```js
function removeEvent(elem, type, handle) {
    if (elem.removeEventListener) { //非ie和非ie9
        elem.removeEventListener(type, handle, false);
    } else if (elem.detachEvent) { //ie6到ie8
        elem.detachEvent('on' + type, handle);
    } else {
        elem['on' + type] = null;
    }
}
```

## 取消冒泡的兼容代码
```js
function stopBubble(e) {
    if (e && e.stopPropagation) {
        e.stopPropagation();
    } else {
        window.event.cancelBubble = true;
    }
}
```

## 检验字符串是否是回文
```js
function isPalina(str) {
    if (Object.prototype.toString.call(str) !== '[object String]') {
        return false;
    }
    var len = str.length;
    for (var i = 0; i < len / 2; i++) {
        if (str[i] != str[len - 1 - i]) {
            return false;
        }
    }
    return true;
}
```

## 检验字符串是否是回文
```js
function isPalindrome(str) {
    str = str.replace(/\W/g, '').toLowerCase();
    console.log(str)
    return (str == str.split('').reverse().join(''))
}
```

## 兼容getElementsByClassName方法
```js
Element.prototype.getElementsByClassName = Document.prototype.getElementsByClassName = function (_className) {
    var allDomArray = document.getElementsByTagName('*');
    var lastDomArray = [];
    function trimSpace(strClass) {
        var reg = /\s+/g;
        return strClass.replace(reg, ' ').trim()
    }
    for (var i = 0; i < allDomArray.length; i++) {
        var classArray = trimSpace(allDomArray[i].className).split(' ');
        for (var j = 0; j < classArray.length; j++) {
            if (classArray[j] == _className) {
                lastDomArray.push(allDomArray[i]);
                break;
            }
        }
    }
    return lastDomArray;
}
```

## 运动函数
```js
function animate(element, styleJson, callback) {
    clearInterval(element.timer);
    var speed,
        current;
    element.timer = setInterval(function () {
        var lock = true;
        for (var prop in styleJson) {
            if (prop == 'opacity') {
                current = parseFloat(window.getComputedStyle(element, null)[prop]) * 100;
            } else {
                current = parseInt(window.getComputedStyle(element, null)[prop]);
            }
            speed = (styleJson[prop] - current) / 7;
            // 计算动画完成事件
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            // 设置透明度
            if (prop == 'opacity') {
                element.style[prop] = (current + speed) / 100;
            } else if (typeof styleJson[prop] === "number") {
                element.style[prop] = current + speed + 'px';
            } else {
                element.style[prop] = styleJson[prop];
            }
            if (current != styleJson[prop]) {
                lock = false;
            }
        }
        if (lock) {
            clearInterval(element.timer);
            typeof callback == 'function' ? callback() : '';
        }
    }, 30)
}
```
示例
```js
// 点击按钮查看结果
function start() {
    let el = document.querySelector(".box");
    let styleJson = {
        width: 600,
        height: 300,
        backgroundColor: "red",
        opacity: 70
    }
    function calba() {
        console.log("执行完毕");
    }
    animate(el, styleJson, calba())
}
```

## 原生js封装ajax
```js
function ajax(method, url, callback, data, flag) {
    var xhr;
    flag = flag || true;
    method = method.toUpperCase();
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHttp');
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(2)
            callback(xhr.responseText);
        }
    }

    if (method == 'GET') {
        var date = new Date(),
        timer = date.getTime();
        xhr.open('GET', url + '?' + data + '&timer' + timer, flag);
        xhr.send()
        } else if (method == 'POST') {
        xhr.open('POST', url, flag);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
}
```

## 防抖
```js
function debounce(handle, delay) {
    var timer = null;
    return function () {
        var _self = this,
            _args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            handle.apply(_self, _args)
        }, delay)
    }
}
```

## 节流
```js
function throttle(handler, wait) {
    var lastTime = 0;
    return function (e) {
        var nowTime = new Date().getTime();
        if (nowTime - lastTime > wait) {
            handler.apply(this, arguments);
            lastTime = nowTime;
        }
    }
}
```

## 验证邮箱的正则表达式
```js
function isAvailableEmail(sEmail) {
    var reg = /^([\w+\.])+@\w+([.]\w+)+$/
    return reg.test(sEmail)
}
```

