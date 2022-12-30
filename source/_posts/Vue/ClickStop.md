---
title: click.stop 阻止事件冒泡
tags: Vue
categories: vue杂谈
abbrlink: 98d84b78
date: 2022-03-27 16:30:51
---

## @click.stop 阻止事件冒泡

首先来看一段代码

```html
<div>
    <div @click="tap1">
        box1
        <div @click="tap2">box2</div>
    </div>
</div>

```

```js
methods: {
    tap1() {
        console.log('tap1')
    },
    tap2() {
        console.log('tap2')
    }
}
```

当我们点击 box2 时会同时打印 tap1 和 tap2。这就是所谓的事件冒泡。

![Snipaste_2022-03-21_15-39-56.png](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-03-21_15-39-56.png)

然后我们如下修改，使用 `@click.stop`

```html
<div>
    <div @click="tap1">
        box1
        <div @click.stop="tap2">box2</div>
    </div>
</div>
```

这时再点击 box2 只会打印 tap2，不会往上冒泡

![Snipaste_2022-03-21_15-44-15.png](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-03-21_15-44-15.png)