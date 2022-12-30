---
title: koa2+mock实现一个数据服务器
tags: NodeJs
abbrlink: 54a6d072
date: 2021-04-12 09:03:16
---
作为一名前端开发人员，在日常开发中，不可避免的会和后端联调接口，但是有时候前端页面做完了，后端接口没写完，这样就导致前端的工作无法进一步进行。因此，我们往往会自己造一些数据，来模拟后台请求，将前端的逻辑提前一步写完，等待后端接口写好之后，替换一下地址就行了。下面我们一起从0搭建mock数据服务器

- [本文演示源码](https://gitee.com/szxio/koa2-demo)
- [mock.js官方文档](http://mockjs.com/)

### 安装
首先新建文件夹，取名 koa2-demo，在该文件夹下执行，安装的依赖有
- koa
- koa-router
- koa-cors
- koa-bodyparser
- mockjs
```shell
cnpm install koa koa-router koa-cors koa-bodyparser mockjs --save
```
### 配置
```js
const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())
// 将koa和中间件连起来
app.use(router.routes()).use(router.allowedMethods());
// 设置启动端口
let port = 3000;
// http://localhost:3000
app.listen(port, (ctx) => {
    console.log('服务启动成功：http://localhost:' + port)
    router.get('/', async (ctx, next) => {
        ctx.body = `
        <h2 style="text-align: center;margin: 10%;">
            当你看到此页面时表示服务启动成功
        </h2>
        `
    })
})
```
初始化代码后在该文件夹下执行 node server.js

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/nodejs/01.png)

可以到如上信息，并在浏览器地址栏中输入 http://localhost:3000/
![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/nodejs/02.png)

### 封装 get 请求
此时我们的初步工作已经完成了，接下来新建 state -> userinfo.js ，并初始化如下代码

该代码中引入了 mockjs ，利用 mock 生成了10条数据，使用 get 请求的方法，请求路径为 http://localhost:3000/userInfo 
```js
const Router = require('koa-router')
const router = new Router()
const cors = require('koa-cors')
const Mock = require('mockjs')

//people
const mockPeople = Mock.mock({
    'peoples|10': [{
        'id|+1': 1,
        'guid': '@guid',
        'name': '@cname',
        'age': '@integer(20, 50)',
        'birthday': '@date("MM-dd")',
        'address': '@county(true)',
        'email': '@email',
    }]
});

//ctx.params 路由传值
//ctx.query  参数传值
//ctx.request.body Post参数

router.get('/userInfo', async (ctx, next) => {
    // 打印get请求携带的参数
    console.log(ctx.query);
    // 允许cors跨域请求
    await cors();
    ctx.body = JSON.stringify(mockPeople['peoples'], null, 2);
})

// 导出 router 实例
module.exports = router
```
然后在 server.js 中引入刚刚新建的 userinfo.js 
![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/nodejs/03.png)
添加如下代码
```js
// get请求用户信息
const userInfo = require('./state/userinfo')
app.use(userInfo.routes(), userInfo.allowedMethods())
```

然后重启服务，在浏览器中输入 http://localhost:3000/userInfo，可以看到生成的10条数据
![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/nodejs/04.png)
我们在项目代码中用 axios 请求该接口，测试一下能否获取数据成功，我是在 vue 项目中来测试
![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/nodejs/05.png)
当我们点击按钮时发现控制台报了接口跨域的错误
![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/nodejs/06.png)
这是因为我们启动的数据服务是在内网环境下，并且端口是 3000 ，和我们项目的启动端口不一致，导致请求跨域，所以我们要在项目中配置一下代理，来解决这种跨域问题，在 vue.config.js 中添加代理
```js
module.exports = {
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
 然后在修改一下请求的地址以 /api 开头来请求

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/nodejs/07.png)

重启项目后再点击按钮测试，
![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/nodejs/08.png)
![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/nodejs/09.png)
可以看到设置完代理后成功的获取到了数据，同时 node server 的黑窗口中看到我们请求时携带的参数

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/nodejs/10.png)

我们可以根据这个参数去处理一些具体逻辑，返回不同数据

### 封装 post 请求
在 state 文件夹下新建 postdata.js , 初始化如下代码

```js
const Router = require('koa-router')
const router = new Router()
const Mock = require('mockjs')

//people
const mockPeople = Mock.mock({
    'peoples|10': [{
        'id|+1': 1,
        'guid': '@guid',
        'name': '@cname',
        'age': '@integer(20, 50)',
        'birthday': '@date("MM-dd")',
        'address': '@county(true)',
        'email': '@email',
    }]
});

// post请求用户信息
router.post('/postUserList', async (ctx, next) => {
    // 打印post请求传递过来的参数
    console.log(JSON.stringify(ctx.request.body, null, 2));

    // 获取post请求参数中携带的id
    const index = ctx.request.body.id;
    ctx.body = mockPeople['peoples'][index]
})

// 导出 router 实例
module.exports = router
```
然后在 server.js 中引入该文件

```js
// post请求数据
const postdata = require('./state/postdata')
app.use(postdata.routes(), postdata.allowedMethods())
```
之后重启 node server.js，然后使用 post 请求该接口，并传递几个参数

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/nodejs/11.png)
点击按钮后查看控制台

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/nodejs/12.png)

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/nodejs/13.png)

发现接口调用成功，并且 server 黑窗口打印了请求过来的参数信息

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/nodejs/14.png)