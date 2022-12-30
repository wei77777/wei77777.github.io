---
title: env配置文件的使用
tags: Vue
categories: vue杂谈
abbrlink: '33469367'
date: 2022-03-27 16:25:38
---

## .env配置文件的使用

### 命名方式

首先关于文件名，必须是固定的文件名，不可修改，并且要在项目根目录创建。如下：

- `.env` 通用配置文件
- `.env.development` 开发环境下的配置文件
- `.env.production` 生产环境下的配置文件

![Snipaste_2022-03-21_15-14-45.png](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-03-21_15-14-45.png)

### 文件内容

属性名必须以 `VUE_APP_` 开头，例如：`VUE_APP_URL`

![Snipaste_2022-03-21_15-16-43.png](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-03-21_15-16-43.png)

### 文件加载

当我们按照固定的格式创建好文件后，**无需手动配置**，在我们每次启动或者打包项目时会自动加载我们配置好的配置文件

我们可以直接通过打印 `process.env` 来查看配置信息

例如我们通过 `npm run serve` 启动项目后，系统自动加载的是 `.env` 和 `.env.development` ,通过打印 `process.env` 得到如下结果

![开发环境.png](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83.png)

我们发现除了我们手动配置的属性外，还有两个额外的固定属性：`BASE_URL` ,`NODE_ENV` 。

其中 `NODE_ENV` 指明了当前的运行环境

然后我们输入 `npm run build` 打包项目，点击生成的 `index.html`。打开控制台查看打印的 `process.env`

![生产环境.png](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83.png)

我们可以利用此特性来针对不同运行环境作出不同的判断