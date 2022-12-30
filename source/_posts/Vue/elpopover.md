---
title: el-popover 组件使用
tags: Vue
categories: vue杂谈
abbrlink: e9d1dcbe
date: 2022-03-27 16:27:54
---
## el-popover 组件使用

引入 elementUI 后可以使用 el-popover

el-popover 可以让我们在一个页面中使用弹框的方式显示另外一个页面，使用方法如下：

```vue
<el-popover placement="bottom" trigger="click" width="500px">
    <span slot="reference">点击在底部显示内容</span>
    <ul>
        <li>12121</li>
        <li>12121</li>
        <li>12121</li>
        <li>12121</li>
    </ul>
</el-popover>
```

属性介绍

| 属性名    | 含义           | 可选值                                                       |
| --------- | -------------- | ------------------------------------------------------------ |
| placement | 弹框显示的位置 | bottom（底部显示）<br>top（顶部显示）<br>right（右侧显示）<br>left（左侧显示） |
| trigger   | 显示的方式     | click（点击显示）<br/>hover（悬浮显示）                      |
| width     | 显示的弹框宽度 |                                                              |

另外要使用 `slot="reference"` 指明要显示的内容，当我们点击这个内容时才会显示弹框

示例：

![newcrm1.gif](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/newcrm1.gif)