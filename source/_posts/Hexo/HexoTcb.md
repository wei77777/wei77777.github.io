---
title: 使用腾讯云函数部署Hexo博客
tags: Hexo
categories: Hexo使用与部署
abbrlink: cc03b9d7
date: 2021-08-10 15:22:03
---

## 介绍
使用 hexo + butterfly 搭建的个人博客

## 安装教程
```shell
npm install
```

## 使用说明

全局安装 hexo
```shell
npm install hexo-cli -g
```
安装项目依赖
```shell
npm install
```
启动
```shell
hexo server
```
清除缓存
```shell
hexo clean
```

## 使用腾讯云部署该项目

[腾讯云官方文档](https://cloud.tencent.com/document/product/876/47006)

1.首先构建 Hexo 部署文件

```shell
Hexo g
```

2.Hexo 将会生成部署文件，默认将文件生成在 Public 文件夹下：

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/sourceimages/root1.png)

3.执行如下命令，将 Hexo 部署到云开发静态托管中（需要将 EnvID 替换为 [步骤2](https://cloud.tencent.com/document/product/876/47006#step2.3) 中您创建的环境 ID）

```shell
tcb hosting deploy public -e szx-blog-7g1gyviddb1b5c44
```

4.上面默认部署到了根目录，可以指定部署到云函数的那个目录下,下面的意思是将 public 目录下的所有文件部署到云托管的 myBlog 目录中

```shell
tcb hosting deploy public myBlog -e szx-blog-7g1gyviddb1b5c44
```



5.执行成功后可以看到一个线上地址

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/sourceimages/root2.png)

6.点击出现的线上地址可以查看我们部署的网站

7.本项目预览地址
https://szx-blog-7g1gyviddb1b5c44-1257342648.tcloudbaseapp.com/myBlog