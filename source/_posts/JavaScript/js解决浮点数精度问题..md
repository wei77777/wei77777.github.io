---
title: js解决浮点数精度问题.
date: '2022-05-08 10:13'
tags: JavaScript
categories: JS常用功能
abbrlink: d8c88ba6
---

在 JS 运算中，使用浮点数进行算数运算可能会出现精度丢失问题，下面通过封装方法来解决

```js
//获取小数位长度
function getDecimalLength(num) {
    let length = 0;
    try {
        length = String(num).split('.')[1].length
    } catch (e) {
        //TODO handle the exception
    }
    return length;
}

//获取放大倍数
function getBeishu(num1, num2) {
    let num1DecimalLength = getDecimalLength(num1);
    let num2DecimalLength = getDecimalLength(num2);
    let longer = Math.max(num1DecimalLength, num2DecimalLength);
    return Math.pow(10, longer);
}

//加法
function add(num1, num2) {
    let beishu = getBeishu(num1, num2);
    return (num1 * beishu + num2 * beishu) / beishu;
}

//减法
function sub(num1, num2) {
    let beishu = getBeishu(num1, num2);
    return (num1 * beishu - num2 * beishu) / beishu;
}

//乘法
function mul(num1, num2) {
    let num1DecLen = getDecimalLength(num1);
    let num2DecLen = getDecimalLength(num2);
    let num1toStr = String(num1);
    let num2toStr = String(num2);
    return Number(num1toStr.replace('.', '')) * Number(num2toStr.replace('.', '')) / Math.pow(10, num1DecLen +
                                                                                              num2DecLen)
}

// 除法
function dev(num1, num2) {
    let num1DecLen = getDecimalLength(num1);
    let num2DecLen = getDecimalLength(num2);
    let num1toStr = String(num1);
    let num2toStr = String(num2);
    return Number(num1toStr.replace('.', '')) / Number(num2toStr.replace('.', '')) / Math.pow(10, num1DecLen -
                                                                                              num2DecLen)
}
```

使用方法是调用不同的方法，传入要计算的两个数值，然后返回计算结果

