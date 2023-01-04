---
title: 封装日期方法，获取本周，本月的起始日期
tags: JavaScript
categories: JS常用功能
abbrlink: 8577b1ab
date: 2022-06-16 09:50:33
---

```js
// 获取n天前日期
// 0 今天，1 明天，-1 昨天
function getDateStr(AddDayCount = 0) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0
    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
    return y + "-" + m + "-" + d;

}

// 获取星期
function getWeek(datestr) {
    var weekArray = new Array(7, 1, 2, 3, 4, 5, 6);
    var week = weekArray[new Date(datestr).getDay()];
    return week;
}

// 获取本月的天数
function getMonthNum() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let d = new Date(year, month, 0);
    let a = d.getDate();
    return a
}

// 获取今天
function getNowDate() {
    let date = getDateStr()
    return [date, date]
}

// 获取本周的起始日期
function getNowWeek() {
    // 获取今天是周几
    let weekNum = getWeek(getDateStr())
    // 获取本周第一天的日期
    let weekFirst = getDateStr((weekNum - 1) * -1)
    // 获取本周最后一天
    let weekLast = getDateStr(7 - weekNum)
    // 返回
    return [weekFirst, weekLast]
}

// 获取本月起始日期
function getNowMonth() {
    // 获取今天几号
    let day = new Date().getDate()
    // 获取本月天数
    let monthnum = getMonthNum()
    // 获取本月的第一天
    let monthfarst = getDateStr((day - 1) * -1)
    // 获取本月最后一天
    let monthlast = getDateStr(monthnum - day)
    return [monthfarst, monthlast]
}

export {
    getNowDate,
    getNowWeek,
    getNowMonth,
    getDateStr
}
```