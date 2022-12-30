---
title: 使用CSS绘制各种图形
author: SZX
tags:
  - CSS
categories: 你不知道的CSS
abbrlink: 9e5192b0
date: 2021-10-20 11:17:17
---

## 椭圆

```css
.oval {
    width: 200px;
    height: 100px;
    background-color: skyblue;
    border-radius: 100px / 50px;
}
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/posts_css/1.png)

## 上三角

```css
.triangle-up {
    width: 0;
    height: 0;
    border-right: 50px solid transparent;
    border-bottom: 100px solid skyblue;
    border-left: 50px solid transparent;
}
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/posts_css/2.png)

## 下三角

```css
.triangle-down {
    width: 0;
    height: 0;
    border-top: 100px solid skyblue;
    border-right: 50px solid transparent;
    border-left: 50px solid transparent;
}
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/posts_css/3.png)

## 左三角

```css
.triangle-left {
    width: 0;
    height: 0;
    border-top: 50px solid transparent;
    border-right: 100px solid skyblue;
    border-bottom: 50px solid transparent;
}
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/posts_css/4.png)

## 右三角

```css
.triangle-right {
    width: 0;
    height: 0;
    border-top: 50px solid transparent;
    border-bottom: 50px solid transparent;
    border-left: 100px solid skyblue;
}
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/posts_css/5.png)

## 左上角

```css
.triangle-topleft {
    width: 0;
    height: 0;
    border-top: 100px solid skyblue;
    border-right: 100px solid transparent;
}
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/posts_css/6.png )

## 右上角

```css
.triangle-topright {
    width: 0;
    height: 0;
    border-top: 100px solid skyblue;
    border-left: 100px solid transparent;
}
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/posts_css/7.png)

## 左下角

```css
.triangle-bottomleft {
    width: 0;
    height: 0;
    border-right: 100px solid transparent;
    border-bottom: 100px solid skyblue;
}
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/posts_css/8.png)

## 右下角

```css
.triangle-bottomright {
    width: 0;
    height: 0;
    border-bottom: 100px solid skyblue;
    border-left: 100px solid transparent;
}
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/posts_css/9.png)

## 箭头

```css
.curvedarrow {
    position: relative;
    width: 0;
    height: 0;
    border-top: 9px solid transparent;
    border-right: 9px solid skyblue;
    transform: rotate(10deg);
}

.curvedarrow:after {
    position: absolute;
    top: -12px;
    left: -9px;
    width: 12px;
    height: 12px;
    content: '';
    border: 0 solid transparent;
    border-top: 3px solid skyblue;
    border-radius: 20px 0 0 0;
    transform: rotate(45deg);
}
```

<img src="https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/posts_css/10.png" style="zoom:200%;" />

## 平行四边形

```css
.parallelogram {
    width: 100px;
    height: 100px;
    background-color: skyblue;
    transform: skew(20deg);
}
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/posts_css/11.png)

## 梯形

```css
.trapezoid {
    width: 100px;
    height: 0;
    border-right: 25px solid transparent;
    border-bottom: 100px solid skyblue;
    border-left: 25px solid transparent;
}
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/posts_css/12.png)

## 五边形

```css
.pentagon {
    position: relative;
    width: 54px;
    border-width: 50px 18px 0;
    border-style: solid;
    border-color: skyblue transparent;
    box-sizing: content-box;
}

.pentagon:before {
    position: absolute;
    top: -85px;
    left: -18px;
    height: 0;
    width: 0;
    content: '';
    border-width: 0 45px 35px;
    border-style: solid;
    border-color: transparent transparent skyblue;
}
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/posts_css/13.png)

## 六边形

```css
.hexagon {
    position: relative;
    width: 100px;
    height: 55px;
    background-color: skyblue;
}

.hexagon:before {
    position: absolute;
    top: -25px;
    left: 0;
    width: 0;
    height: 0;
    content: '';
    border-right: 50px solid transparent;
    border-bottom: 25px solid skyblue;
    border-left: 50px solid transparent;
}

.hexagon:after {
    position: absolute;
    bottom: -25px;
    left: 0;
    width: 0;
    height: 0;
    content: '';
    border-top: 25px solid skyblue;
    border-right: 50px solid transparent;
    border-left: 50px solid transparent;
}
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/posts_css/14.png)

## 爱心

```css
.heart {
    position: relative;
    width: 100px;
    height: 90px;
}

.heart:before,
.heart:after {
    position: absolute;
    left: 50px;
    top: 0;
    width: 50px;
    height: 80px;
    content: '';
    background-color: skyblue;
    border-radius: 50px 50px 0 0;
    transform: rotate(-45deg);
    transform-origin: 0 100%;
}

.heart:after {
    left: 0;
    transform: rotate(45deg);
    transform-origin: 100% 100%;
}
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/posts_css/15.png)

## 无穷大

```css
.infinity {
    position: relative;
    width: 150px;
    height: 100px;
    box-sizing: content-box;
}

.infinity:before,
.infinity:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
    content: '';
    border: 20px solid skyblue;
    border-radius: 50px 50px 0 50px;
    box-sizing: content-box;
    transform: rotate(-45deg);
}

.infinity:after {
    left: auto;
    right: 0;
    border-radius: 50px 50px 50px 0;
    transform: rotate(45deg);
}
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/posts_css/16.png)

## 钻石

```css
.diamond {
    position: relative;
    width: 50px;
    height: 0;
    border-width: 0 25px 25px 25px;
    border-style: solid;
    border-color: transparent transparent skyblue transparent;
    box-sizing: content-box;
}

.diamond:after {
    position: absolute;
    top: 25px;
    left: -25px;
    width: 0;
    height: 0;
    content: '';
    border-width: 70px 50px 0 50px;
    border-style: solid;
    border-color: skyblue transparent transparent transparent;
}
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/posts_css/17.png)

## 锁

```css
.lock {
    position: relative;
    width: 90px;
    height: 65px;
    border: 18px solid skyblue;
    border-right-width: 37px;
    border-left-width: 37px;
    border-radius: 10px;
    box-sizing: border-box;
}

.lock:before {
    position: absolute;
    top: -60px;
    left: 50%;
    width: 70px;
    height: 60px;
    content: '';
    border: 12px solid skyblue;
    border-top-left-radius: 35px;
    border-top-right-radius: 35px;
    box-sizing: border-box;
    transform: translateX(-50%);
}

.lock:after {
    position: absolute;
    top: -5px;
    left: 50%;
    width: 25px;
    height: 40px;
    content: '';
    border: 5px solid skyblue;
    border-radius: 12px;
    box-sizing: border-box;
    transform: translateX(-50%);
}
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/posts_css/18.png)

## 吃豆人

```css
.pacman {
    width: 0px;
    height: 0px;
    border: 60px solid skyblue;
    border-right: 60px solid transparent;
    border-radius: 60px;
}
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/posts_css/19.png)

## 对话泡泡

```css
.talkbubble {
    position: relative;
    width: 120px;
    height: 80px;
    background-color: skyblue;
    border-radius: 10px;
}

.talkbubble:before {
    position: absolute;
    top: 26px;
    right: 100%;
    width: 0;
    height: 0;
    content: '';
    border-top: 13px solid transparent;
    border-right: 26px solid skyblue;
    border-bottom: 13px solid transparent;
}
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/posts_css/20.png)

## 太极

```css
.supremepole {
    position: relative;
    width: 96px;
    height: 48px;
    background-color: #fff;
    border-width: 2px 2px 50px 2px;
    border-style: solid;
    border-color: #000;
    border-radius: 50%;
    box-sizing: content-box;
}

.supremepole:before {
    position: absolute;
    top: 50%;
    left: 0;
    width: 12px;
    height: 12px;
    content: '';
    background-color: #fff;
    border: 18px solid #000;
    border-radius: 50%;
    box-sizing: content-box;
}

.supremepole:after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 12px;
    content: '';
    background-color: #000;
    border: 18px solid #fff;
    border-radius: 50%;
    box-sizing: content-box;
}
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/posts_css/21.png)

## 丝带徽章

```css
.badge-ribbon {
    position: relative;
    height: 100px;
    width: 100px;
    background-color: skyblue;
    border-radius: 50%;
}

.badge-ribbon:before,
.badge-ribbon:after {
    position: absolute;
    top: 70px;
    left: -10px;
    content: '';
    border-right: 40px solid transparent;
    border-bottom: 70px solid skyblue;
    border-left: 40px solid transparent;
    transform: rotate(-140deg);
}

.badge-ribbon:after {
    right: -10px;
    left: auto;
    transform: rotate(140deg);
}
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/posts_css/22.png)

## 放大镜

```css
.magnifying-glass {
    position: relative;
    width: 0.4em;
    height: 0.4em;
    font-size: 10em;
    border: 0.1em solid skyblue;
    border-radius: 0.35em;
    box-sizing: content-box;
}

.magnifying-glass:before {
    position: absolute;
    right: -0.25em;
    bottom: -0.1em;
    width: 0.35em;
    height: 0.08em;
    content: '';
    background-color: skyblue;
    transform: rotate(45deg);
}
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/posts_css/23.png)

## 月亮

```css
.moon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    box-shadow: 15px 15px 0 0 skyblue;
}
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/posts_css/24.png)

## 扇形

```css
.cone {
    width: 0;
    height: 0;
    border-top: 100px solid skyblue;
    border-right: 70px solid transparent;
    border-left: 70px solid transparent;
    border-radius: 50%;
}
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/posts_css/25.png)

## 十字架

```css
.cross {
    position: relative;
    width: 20px;
    height: 100px;
    background-color: skyblue;
}

.cross:before {
    position: absolute;
    top: 40px;
    left: -40px;
    width: 100px;
    height: 20px;
    content: "";
    background-color: skyblue;
}
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/posts_css/26.png)

## 谷堆

```css
.base {
    position: relative;
    width: 100px;
    height: 55px;
    background-color: skyblue;
}

.base:before {
    position: absolute;
    top: -35px;
    left: 0;
    width: 0;
    height: 0;
    content: '';
    border-right: 50px solid transparent;
    border-bottom: 35px solid skyblue;
    border-left: 50px solid transparent;
}
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/posts_css/27.png)

## 指示器

```css
.pointer {
    position: relative;
    width: 120px;
    height: 40px;
    background-color: skyblue;
}

.pointer:before {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 0;
    content: '';
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 20px solid #fff;
}

.pointer:after {
    position: absolute;
    right: -20px;
    bottom: 0;
    width: 0;
    height: 0;
    content: '';
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 20px solid skyblue;
}
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/posts_css/28.png)



