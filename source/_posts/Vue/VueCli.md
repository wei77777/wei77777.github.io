---
title: vue 脚手架
tags: Vue
categories: 项目搭建
abbrlink: fc69ad4d
date: 2021-03-15 00:00:00
---
## vue 脚手架

Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统，提供：

- 通过 @vue/cli 实现的交互式的项目脚手架。
- 通过 @vue/cli + @vue/cli-service-global 实现的零配置原型开发。
- 一个运行时依赖 (@vue/cli-service)，该依赖：
  *可升级；
  *基于 webpack 构建，并带有合理的默认配置；
  *可以通过项目内的配置文件进行配置；
  *可以通过插件进行扩展。
- 一个丰富的官方插件集合，集成了前端生态中最好的工具。
- 一套完全图形化的创建和管理 Vue.js 项目的用户界面。

Vue CLI 致力于将 Vue 生态中的工具基础标准化。它确保了各种构建工具能够基于智能的默认配置即可平稳衔接，这样你可以专注在撰写应用上，而不必花好几天去纠结配置的问题。与此同时，它也为每个工具提供了调整配置的灵活性，无需 eject。

## 安装

```sh
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

## 创建一个项目

```sh
vue create my-project
# OR
vue ui
```

## 升级

如需升级全局的 Vue CLI 包，请运行：

```sh
npm update -g @vue/cli
# 或者
yarn global upgrade --latest @vue/cli
```

## 启动

``` sh
# 通过 package.json 查看启动命令
npm run serve

Options:

  -o, --open  打开浏览器
  -c, --copy  将本地 URL 复制到剪切板
  -h, --help  输出用法信息
```

## 打包
``` sh
# 通过 package.json 查看打包命令
npm run build
```
打包时可以对静态文件的路径作出配置,在 `vue.config.js` 文件中配置如下内容
```js
module.exports = {    
    publicPath:"./",
}
```
## 配置数据代理
本地访问本地启动的mock接口时会报跨域错误，在 `vue.config.js` 中设置 `devServer`，用来解决请求跨域问题
```js
module.exports = {
    configureWebpack: () => {
    // writeFileSync 是写向文件写入内容的方法
    // process.env 是vue的环境变量，是一个vue自带的固定的参数
    // apiconfig 是在 package.json 中定义的一个变量名，可自定义
    // trim() 是为了去掉自动加到变量值上的空格
    fs.writeFileSync("./src/util/env.json", JSON.stringify({env: process.env.apiconfig.trim()}))
  },
  publicPath:"./",
  devServer: {
    proxy: {
        '/api': {     //这里最好有一个 " / "
            target: 'http://localhost:3000',  // 后台接口域名           
            secure: false,  // 如果是https接口，需要配置这个参数
            changeOrigin: true,  //是否跨域
            pathRewrite:{ // 接口路径中去掉 api
                '^/api':''
            }
        }
    }
  }
}
```
配置完成后页面请求数据就要以 `/api` 开头
```js
 http
  .post("/api/postUserList", {
    pageNum:2,
    pageSize:10
  })
  .then((res) => {
    console.log(res);
  });
```