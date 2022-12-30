---
title: NodeJs
tags: NodeJs
categories: NodeJs快速入门
abbrlink: a630c4b5
date: 2021-03-25 00:00:00
---

# 第一章
## node是什么
* Node.js 是一个开源与跨平台的 JavaScript 运行时环境。 它是一个可用于几乎任何项目的流行工具！


* Node.js 在浏览器外运行 V8 JavaScript 引擎（Google Chrome 的内核）。 这使 Node.js 表现得非常出色。


* Node.js 应用程序运行于单个进程中，无需为每个请求创建新的线程。 Node.js 在其标准库中提供了一组异步的 I/O 原生功能（用以防止 JavaScript 代码被阻塞），并且 Node.js 中的库通常是使用非阻塞的范式编写的（从而使阻塞行为成为例外而不是规范）。


* 当 Node.js 执行 I/O 操作时（例如从网络读取、访问数据库或文件系统），Node.js 会在响应返回时恢复操作，而不是阻塞线程并浪费 CPU 循环等待。


* 这使 Node.js 可以在一台服务器上处理数千个并发连接，而无需引入管理线程并发的负担（这可能是重大 bug 的来源）。


* Node.js 具有独特的优势，因为为浏览器编写 JavaScript 的数百万前端开发者现在除了客户端代码之外还可以编写服务器端代码，而无需学习完全不同的语言。


* 在 Node.js 中，可以毫无问题地使用新的 ECMAScript 标准，因为不必等待所有用户更新其浏览器，你可以通过更改 Node.js 版本来决定要使用的 ECMAScript 版本，并且还可以通过运行带有标志的 Node.js 来启用特定的实验中的特性。

## 检查自己电脑是否安装了node
打开cmd输入如下命令，如果正常返回了版本号，则说明已经安装成功
```
node -v
```

## node学习网址
* node官方下载地址 http://nodejs.cn/ 
* node中文文档 http://nodejs.cn/api/
* node中文社区 https://cnodejs.org/
* node入门电子书 https://www.nodebeginner.org/index-zh-cn.html

## 使用 node.js 执行 js 文件
在要执行的 js 文件目录下执行 
```node
node xxx.js
```

## 使用 nodejs 读取文件
首先需要引入 fs ，fs 是 nodejs 中专门用来处理文件的一个库。读取到的文件默认是二进制文件流，所以要用 toString() 来转一下
```js
var fs = require("fs");

// readFile 函数接收两个参数
//   要读取的文件路径
//   回调函数,接收两个参数
//      第一个是读取错误是的参数，读取错误时err为错误对象
//      第二是成功读取是的文件流，默认是二进制

fs.readFile("./01.js",(err,data)=>{
    if(err){
        console.log("文件读取失败");
    }else{
        // 默认读取的文件时二进制文件流，需要经过toString()转义后才能正常读取
        console.log(data.toString());
    }
})
```

## 使用 nodejs 写入文件
```js
var fs = require("fs");

// writeFile 函数接收三个参数
//   要写入的文件路径，如果没有则自动创建，有的话自动覆盖旧的文件和内容
//   要写入的内容
//   回调函数，接收两个参数
//      err:写入失败时，err是一个错误对象
//      data:写入成功时，err是null
fs.writeFile("./writefile/errlog.txt","这是通过node写入的错误日志",(err,data)=>{
    if(err){
        console.log("写入文件失败");
    }else{        
        console.log("文件写入成功");
    }
})

```

## 使用 nodejs 创建一个简单的 http 服务器
```js
// 1.引入http服务
var http = require("http");

// 2.使用http创建一个httpserver，返回一个server实例
var server = http.createServer();

// 3.写入服务器要处理的事情，分为以下几个步骤
//    提供服务：对数据的服务
//    客户端发来请求
//    服务端接收请求
//    服务端处理请求
//    给个反馈（发送响应）
//    注册 require 事件，当客户端请求过来时，自动执行这个回调函数
//      回调函数接收两个参数：request，response
//          request：请求对象，可以获取请求过来的路径信息
//          response：响应对象，可以给客户发送响应数据
server.on("request", (request, response) => {
    // 获取请求的路径
    let url = request.url

    // // 根据不同的路径返回不同数据
    // switch (url) {
    //     case "/":
    //         // response.write 写入响应数据
    //         response.write("hello nodejs");
    //         break;
    //     case "/login":
    //         response.write("login");
    //         break;
    //     case "/user":
    //         response.write("user");
    //         break;
    // }
    // // 通知浏览器，结束会话
    // response.end()


    // 上面的写法也可以简写为如下格式
    if(url = "/userlist"){
        let userlist = [
            {
                name:"李四",
                age:15
            },
            {
                name:"张三",
                age:16
            }
        ]
        // 直接用end同时返回数据
        response.end(JSON.stringify(userlist))
    }
})


// 4.设置端口
server.listen(3030, () => {
    console.log("服务启动成功,http://localhost:3030/");
})
```

## http服务的简写形式
```js
let http = require('http')
http.createServer((req, res) => {
    let url = req.url;
    res.end(url)
}).listen(3000)
```

## nodejs 中的模块的导入和导出

使用 `require` 导入一个其他模块，用一个变量来接收。
```js
// 使用 require 导入其他模块
var demo = require("./06导出模块")
demo.getname("张三")
var aaa = "06导入模块"
console.log(aaa);
console.log(demo.aaa)
```

使用 `exports` 导出一个模块，可以导出方法，变量
```js
// nodejs中两个互相引用的js如果变量名称相同不会相互受影响
var aaa = "06导出"
// 使用 exports 导出方法和变量
exports.getname = function (name) {
    console.log(name);
}
exports.aaa = aaa;
```

除了单独导出外也可以批量导出
```js
function fun1() {
    console.log("方法1");
}
function fun2() {
    console.log("方法2");
}
// 模块导出
module.exports = {
    fun1,
    fun2
}
```
使用 ` { } ` 接收批量导出的内容，用到几个引入几个
```js
var { fun2 } = require("./06导出模块")

fun2() // 方法2
```

## exports 和 module.exports 的区别

- 每个模块都有一个 `module` 对象
- module 对象中有一个 `exports` 对象
- 我们可以吧需要导出的成员都挂载到 `module.exports` 接口对象中
- 也就是 `module.exports.XXX = XXX` 的方式
- 但每次都 `module.exports.XXX` 很麻烦，点太多了
- 所以 `Node` 为了方便，同时在每一个模块对象中都提供了一个成员叫做 `exports` 
- `exports === module.exports` 结果为 `true`
- 所以对于 `module.exports.XXX` 的方式可以写成 `exports.XXX`
- 当一个模块需要导出单个成员的时候，这个时候必须写成 `module.exports = XXX`
- 不要使用 `exports = XXX`，这种方式不管用
- 因为每个模块最终向外 `return` 的是 `module.exports`
- 而 `exports` 只是 `module.exports` 的引用
- 所以即便对 `exports = XXX` 重新赋值，也不影响 `module.exports `
- 但是有一种赋值方式为 `exports = module.exports` 这种赋值表示重新建立起两者的引用
  
```js
console.log(exports === module.exports); // true
```


## ip地址和端口号概念
* IP地址用来定位计算机的位置
* 端口号用来定位具体的应用程序
* 所有需要联网的通信和应用程序都会占用一个端口号
* 端口号的范围是 0~65536 之间
* 在计算机中有一些默认的端口号，例如
  * http 服务的80端口
* 在开发过程中只会用到一些常见的端口，例如：8080，3000，8088...

## 响应式数据的content-type
* 声明文本格式的数据 `res.Header("Content-Type","text/plain; charset=utf-8")`
* 声明 html 格式的数据 `res.setHeader("Content-Type", "text/html; charset=utf-8")`
  
```js
var http = require("http");
var server = http.createServer();

server.on("request", function (req, res) {
    // 在服务端默认发送的数据是 utf-8 格式的数据
    // 但是在浏览器中不知道发送过来的数据是utf8的数据，所以会按照当操作系统的默认编码区解析，最终造成乱码
    // 在中文操作系统中默认解析方式是 gbk
    // 解决方法就是告诉浏览器，我发送的是什么类型的数据，是 utf-8 的数据
    //  通过设置发送数据头来告诉浏览器，发送的数据格式是什么格式的数据
    //  res.Header("Content-Type","text/plain; charset=utf-8")

    if (req.url === "/") {
        // text/plain 文本格式的数据
        res.setHeader("Content-Type","text/plain; charset=utf-8")
        res.end("hello 世界")
    } else if (req.url === "/html") {
        // text/html html格式的数据
        res.setHeader("Content-Type", "text/html; charset=utf-8")
        res.end("<h2>这是html页面</h2>")
    }
})

server.listen(3000)
```

## http + fs 实现简单的页面渲染

- 在线工具地址 https://tool.oschina.net/
- 不同资源对应的 Content-Type 不一样，可以通过上面的网址查询
- url专业术语：统一资源定位符
- 一个 url 对应一个资源
```js
// 在线工具地址 https://tool.oschina.net/
// 不同资源对应的 Content-Type 不一样，可以通过上面的网址查询

var http = require("http");
var fs = require("fs");
var server = http.createServer();

server.on("request", (req, res) => {
    let url = req.url;
    if (url === "/") {
        // 利用 fs 读取文件，将文件内容发送个浏览器
        fs.readFile("./resources/index.html", (err, data) => {
            if (err) {
                res.setHeader("Content-Type", "text/plain; charset=utf-8")
                res.end("文件请求失败")
            } else {
                res.setHeader("Content-type", "text/html; charset=utf-8")
                res.end(data)
            }
        })
    } else if (url === "/jietu") {
        // url专业术语：统一资源定位符
        // 一个 url 最终指向一个资源
        fs.readFile("./resources/jietu.png", (err, data) => {
            // data默认是二进制数据，可以通过 toString 转为咱们能识别的字符串
            // res.end 支持两种格式的数据类型，一种是二进制，一种是字符串
            // 图片不需要指定编码格式，一般需要指定编码的都是字符串需要指定
            res.setHeader("Content-Type", "image/png");
            res.end(data)
        })
    }
})

server.listen(3000, () => {
    console.log("3000端口启动成功");
})
```

## path 路径操作模块
path 用于处理文件和路径的目录，可以使用一下方式使用它
```js
var path = require('path')
var pathUrl = 'D:/a-个人项目管理/nodejs学习/nodejs-learning/day01/09path模块.js'
```
### path.basename() 获取路径中的文件名
path.basename() 方法会返回 path 的最后一部分,第二部分表示要去掉的后缀，没有则不去掉文件后缀
```js
console.log(path.basename(pathUrl)); 
    //=> 09path模块.js   

console.log(path.basename(pathUrl,".js")); 
    //=> 09path模块
```
### path.dirname() 获取路径中的目录名
```js
console.log(path.dirname(pathUrl)); 
    //=> D:/a-个人项目管理/nodejs学习/nodejs-learning/day01
```
### path.extname() 返回 path 的扩展名
```js
console.log(path.extname(pathUrl)); 
    //=> .js
```
### path.parse() 解析地址
path.parse() 方法会返回一个对象，其属性表示 path 的有效元素
```js
console.log(path.parse(pathUrl));
    // {
    //   root: 'D:/',
    //   dir: 'D:/a-个人项目管理/nodejs学习/nodejs-learning/day01',
    //   base: '09path模块.js',
    //   ext: '.js',
    //   name: '09path模块'
    // }
```
### path.format() 根据对象还原地址
path.format() 方法从对象返回路径字符串
```js
console.log(path.format(path.parse(pathUrl))); 
    // => D:/a-个人项目管理/nodejs学习/nodejs-learning/day01\09path模块.js
```
### path.join() 拼接路径
path.join() 方法会将所有给定的 path 片段连接到一起（使用平台特定的分隔符作为定界符），然后规范化生成的路径
```js
console.log(path.join('c:','abc','def')); 
    // => c:\abc\def
```
### path.isAbsolute() 检测路径是否为绝对路径
```js
// path.isAbsolute() 方法检测 path 是否为绝对路径。
console.log(path.isAbsolute(pathUrl));
    // => true

console.log(path.isAbsolute('../day01/resources/index.html'));
    // => false
```
### 获取当前文件所处目录的绝对路径并拼接地址
```js
console.log(path.join(__dirname, 'public'));
    // => D:\a-个人项目管理\nodejs学习\nodejs-learning\day01\public
```
  
## node 中的其他成员
在每个模块中 ，除了 `require`、`exprots`等模块之外的相关 API 之外，还有两个特殊成员：
- `__dirname`，可以用来动态的获取当前文件所属目录的绝对路径
- `__dilename`，用来动态的获取当前文件的绝对路径
- `__dirname` 和` __dilename` 获取到的路径是不受 node 命令所属路径影响的
  
在操作文件中，使用相对路径是不可靠的，因为在 node 中操作文件的路径被设计为相对于执行 node 命令所处的路径（不是bug，人家这样设计有使用场景）

所以为了解决这个问题，只需要把相对路径变成绝对路径就可以了

所以使用 `__dirname` 和 `__dilename` 来解决这个问题

另外在拼接路径中，为了避免出现低级错误，常常采用 `path` 模块提供的 `join` 方法来帮助我们拼接路径

所以为了避免出现上面这种错误，以后在操作文件时最好都将相对路径写成绝对路径

# 第二章
## 代码中无分号问题
当代码中采用没有分号的风格时需要注意以下几点即可
- `[ ` 开头
- `( ` 开头
- `  开头

当一行代码是以上面三个字符开头时，需要在这行代码前加上分号，否则会报错

除了分号外，也可以加上 ! ~ 等

```js
function day(){
    console.log('你好')
}

day()

;['苹果','香蕉'].forEach(item => {
    console.log(item)
})

;(function(){
    console.log('自治性任务')
})()

;`hello`.toString()

```

## 根据路径获取文件内容
```js
var http = require("http");
var fs = require("fs");
var server = http.createServer();
var urladd = 'D:/000个人项目/node学习/nodejs-learning/day2/www'
server.on("request", (req, res) => {
    let url = req.url === '/' ? '/index.html' : req.url;
    fs.readFile(`${urladd}${url}`, (err, data) => {
        if (err) {
            return res.end('404 not found')
        } else {
            res.end(data)
        }
    })
})

server.listen(3000, () => {
    console.log("runing....");
})
```

## 读取某个文件夹下的所有文件

使用 `fs.readdir()` 函数读取某个文件夹下的所有文件，接受两个参数，分别如下
  + 要读取的文件夹地址
  + 读取后的回调函数，有两个参数
    + 第一个是失败时的参数
    + 第二个是读取成功后返回的数据，是数组格式的数据

```js
var fs = require("fs")
var http = require("http")
var server = http.createServer()
var wwwDir = "D:/000个人项目/node学习/nodejs-learning/day2/www"

server.on("request", (req, res) => {
    // 使用 readdir 读取某个文件夹下的所有文件
    fs.readdir(wwwDir, (err, data) => {
        if (err) {
            return res.end("404 not found")
        } else {
            var content = ""
            data.forEach(item => {
                content += item + '\n'
            })
            res.setHeader("Content-Type", "text/plain; charset=utf-8")
            res.end(content)
        }
    })
})

server.listen(3000,()=>{
    console.log('running...');
})
```
## 在 node 中使用模板引擎

- 首先引入模板引擎插件
  - 安装 `npm install art-template`
  - 官方文档：http://aui.github.io/art-template/zh-cn/
- 安装完成后，引入模板引擎
  - `const template = require('art-template')`
- 引入 `fs` ，用来读取文件和读取目录
- 引入 `http` ，用来搭建服务，给浏览器返回页面
- 读取页面数据后继续读取文件目录，获取目录列表
- 然后键页面数据转成字符串，交给模板引擎解析数据，并将目录列表数据传给页面，循环显示出来

**js**
```js
const artTemplate = require('art-template')
const fs = require('fs')
const http = require('http')
const server = http.createServer()
const wwwAddr = "./www"

server.on('request', (req, res) => {
    fs.readFile('./www/在node中使用模板引擎.html', (err, data) => {
        if (err) {
            return res.end('404 not found')
        }
        // 读取文件夹下的目录结构,返回是一个数组类型的数据
        fs.readdir(wwwAddr, (err, data) => {
            // 将读取的页面二进制数据转换成字符串格式
            // 使用模板引擎完成页面内容替换
            let htmlStr = artTemplate.render(data.toString(), {
                target: data,
                arr: [{
                    name: "李四",
                    age: 18
                }, {
                    name: "张三",
                    age: 16
                }]
            })
            res.end(htmlStr)
        })
    })
})

server.listen(3000, () => {
    console.log('running success....');
})
```

**html核心代码**
```html
<!-- 在node中使用模板引擎.html -->
<body>
    <!-- 模板引擎的循环语句，target 是循环的数组 -->
    {{each target}}
    <h3>
        <a href="#">{{$value}}</a>
    </h3>
    {{/each}}

    {{each arr}}
    <p>{{$value.name}}</p>
    {{/each}}
</body>
```

## 服务端渲染和客户端渲染的区别
- 客户端渲染不利于 SEO 搜索引擎优化
- 服务端渲染可以被爬虫抓取到，客户端异步渲染很难被爬虫爬取到
- 所以真正的网站既不是纯异步也不是纯服务端渲染的
- 而是两者结合来做
- 例如：京东的商品列表采用的就是服务端渲染，目的为了 SEO 搜索引擎优化
- 而它的商品评论列表采用的就是客户端渲染，因为评论不需要 SEO 优化
- 两者优缺点 --- 客户端渲染
  - 优点
    - 响应速度快，用户可以立马看到页面大致样式
    - 用户体验好，翻页时无需重新加载页面
  - 缺点
    - 请求数据速度稍慢，需要等待页面加载完成后再去请求数据（最少两次请求）
    - 不利于 SEO 优化，爬虫很难爬到，因为页面数据是异步的

- 两者优缺点 --- 服务端渲染
  - 优点
    - 页面和数据一次性返回给浏览器，用户看到页面是就是已经加载好的页面
    - 利于 SEO 搜索引擎优化，爬虫可以爬取到
  - 缺点
    - 加载速度慢，翻页时需要重新加载页面
    - 用户体检不好
- 如何查看一个网页是服务端渲染还是客户端渲染
  - 右键查看源代码，如果网页中的数据可以在源代码中找到，说明是服务端渲染，否则是客户端渲染

## 处理网站中的静态资源

- 服务端渲染页面时，静态文件资源和页面文件要放在两个单独的文件中，避免和程序运行文件放在一起
  - 页面文件放在 view 文件夹下
  - 静态资源文件放在 public 文件夹下
    - css
    - js
    - img
    - lib
- 页面中包含 src 和 href（不包含a标签）属性的标签在请求资源时页面加载过程中就会进行请求加载
- 服务端要根据这个资源的请求路径做处理
  
js文件中针对静态资源的请求单独处理
```js
// 此处判断如果是以 /public/ 开头的，如果是则认为这个请求是要获取静态资源
if (url.indexOf('/public/') === 0) {   
    // 在静态资源目录前添加一个 . ，返回读取到的静态资源
    fs.readFile('.' + url, (err, data) => {
        if (err) {
            return res.end('404 not found')
        }
        res.end(data)
    })
}
```
页面中请求静态资源时就不能以路径的方法去获取，而是以 `url` 的方法去获取,让服务端去给我们返数据
```html
<!-- 服务端渲染页面时，读取静态文件要以一个文件开头，有服务端去处理这个请求路径 -->
<link rel="stylesheet" href="/public/lib/bootstrap.min.css">
<link rel="stylesheet" href="/public/css/index-css.css">
```

## 渲染评论列表
使用模板渲染引擎，在服务端渲染完成后返回给浏览器。
```js
// 要循环渲染的数据
const components = [{
    name: "张三",
    msg: "今天天气不错",
    createTime: "2020-03-29"
},{
    name: "张三2",
    msg: "今天天气不错",
    createTime: "2020-03-29"
},{
    // ......
}]

// 判断接口路径渲染数据
if (url === '/') {
    fs.readFile('./view/index.html', (err, html) => {
        if (err) {
            return res.end('404 not found')
        }
        // 通过渲染引擎渲染数据
        let htmlStr = template.render(html.toString(), {
            components: components
        })
        res.end(htmlStr)
    })
}
```

```html
<ul class="list-group">
    {{each components}}
    <li class="list-group-item">
        {{$value.name}}说：{{$value.msg}}
        <span class="pull-right"> {{$value.createTime}} </span>
    </li>
    {{/each}}
</ul>
```

## 使用表单默认提交和 h5 自带校验
- 在 `form` 标签中设置 `action` 属性的值，表示表单数据提交的地址，浏览器会请求这个地址，并传递表单数据
- 在 `form` 标签设置 `method` 属性，表示提交的方法
  - `get`
  - `post`
- 在表单内部 `label` 标签上设置 `for` 属性
- 在 `input` 标签上设置 `id` 属性，和 `label` 标签上的 `for` 属性一致
- 在 `input` 标签上设置 `required` 表示必填
- 在 `form` 结构内部添加 `type` 值为 `submit` 的按钮，点击按钮完成表单提交
```html
 <form action="/submitMsg" method="get">
    <div class="form-group">
        <label for="input_name">您的昵称</label>
        <input type="text" class="form-control" placeholder="您的昵称" id="input_name" required min="2" maxlength="10"
            name="name">
    </div>
    <div class="form-group">
        <label for="testarea_msg">留言内容</label>
        <textarea class="form-control" placeholder="留言内容" required id="testarea_msg" maxlength="20" minlength="5"
            name="msg"></textarea>
    </div>

    <button type="submit" class="btn btn-success">提交</button>
</form>
```


## 使用 url 模块解析路径地址
```js
// 引入 url 模块
var url = require('url')
// 使用 url.parse 解析路径，第二个参数为 true 可以将后面的参数转为对象格式
var paserurl = url.parse('http://127.0.0.1:3000/submitMsg?name=张三message=你今天真帅',true)
// 使用 JSON.stringfiy 去掉参数中的 [Object: null prototype]
var query = JSON.stringify(paserurl.query);

// 打印路径中携带的查询参数 {"name":"张三","message":"你今天真帅"}
console.log(query);
```

## 使浏览器重定向
- 浏览器什么时候会重定向
  - 接口状态返回 `301` 或者 `302` 时会重定向
    - `301`：永久重定向，第一次跳转后再次跳转时不会发送两次请求，直接重定向到新的地址
    - `302`：临时重定向，表示后面会变，可以用来做页面跳转
  - 如果接口返回的状态码是 `301` 或者 `302` 时会去响应头中寻找 `Location` 指向的地址，然后自动请求这个地址，完成跳转操作
- node 如何让浏览器重定向
  - 设置接口返回的状态码为 `302`
    - `res.statusCode = 302`
  - 设置响应头中的 `Location` 
    - `res.setHeader('Location', '/')` 第二个参数是要重定向的地址
  - 最后结束响应
    - `res.end()`

**实现代码**
```js
// 判断请求路径，处理参数，然后进重定向操作
if (paseUrl.pathname === '/submitMsg') {
    // 获取到参数后添加到循环数组中
    let query = JSON.parse(JSON.stringify(paseUrl.query))
    query.createTime = '2020-03-20 15:56'
    components.unshift(query)
    // 然后对网站进行重定向处理，返回状态码为 302 时，浏览器会进行临时重定向
    // 然后在响应头中通过 Location 告诉客户端往哪里重定向
    res.statusCode = 302;
    res.setHeader('Location', '/')
    res.end()
}   
```
# 第三章

## require 加载规则
- 默认加载缓存，已经被加载过的模块不会重复加载，但是可以重复使用模块中导出的方法

**a.js**
```js
console.log('加载了a模块')
var fn = require('./b')
fn()
```
**b.js**
```js
console.log('加载了b模块');
module.exports = function () {
    console.log('b模块导出的方法');
}
```
**main.js**
```js
require('./public/a')
// 优先加载缓存，b 模块在 a 模块中已经被加载过了，此时不会再打印 b 模块中的文字
// 此处引入 b 模块只是用 b 模块中的方法
var fn = require('./public/b')
fn()
```
上面代码中 `main.js` 导入 `a` 模块，在 `a` 模块中又加载了 `b` 模块，因为 `b` 模块是被首次加载，所以会打印 `b` 模块中的代码，然后 `b` 模块导出了一个方法，最后又回到 `main.js` 的时候，`b` 模块已经被加载过了，所以不会再执行 `b` 模块的代码，但是 `b` 模块导出的方法可以使用，最终代码执行结果为
```
加载了a模块
加载了b模块
b模块导出的方法
b模块导出的方法
```

## require 加载机制
### 1.加载本地文件
- `require('./xxx')` 一个点开头表示引入当前目录下的文件
- `require('../xxx')` 两个点开头表示引入上一级目录的文件
- `require('/xx')` 以 `/` 开头表示当前文件所属磁盘的根目录（几乎不用）
- `require('./index.js')` 后缀名 `.js` 可以省略

### 2.加载系统模块
核心模块的本质也是加载本地文件，但是核心模块的代码已经被编译到了二进制文件中，我们只需要按照模块名字导入即可
- `require('fs')`
- `require('http')`

### 3.加载第三方模块
第三方模块需要通过 `npm install xxx(第三方包名)` 来下载，然后通过 `require('第三方包名')` 来引入，不可能有第三方包名与系统的包名一样。引入第三方包的寻找机制如下,以`art-template`包为例：

- 先找到当前文件所处目录的 `mode_modules` 文件
- 然后找 `node_modules/art-template/package.json` 文件
- 在 `node_modules/art-template/package.json` 文件中有一个 `mian` 属性
- `main` 属性中声明的是入口模块
- 之后加载使用这个第三方包
- 实际上最终还是加载的第三方文件

- 如果 `package.json` 文件不存在或者 `main` 指定的入口模块也没有
- 则 `node` 会自动找还目录下的 `index.js` 文件
- 也就是说 `index.js` 会作为一个默认的备选项

- 如果以上任何一个条件都不成立，则会进入上一级目录中的 `node_modules` 目录查找，如果上一级也没有，则继续往上一级查找，只到找到为止
- 如果没找到，则会报错

## 包文件说明
每个项目中最好都有一个 `package.json` 文件,可以简单理解为项目的说明书，这个文件中记载了项目名称，版本号，依赖包文件等。

首先在空白项目中执行 `npm init` 然后设置相关信息
```shell
PS D:\AA-demo练习\node-demo> npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (demo) my-node-demo  // 项目名称
version: (1.0.0) 0.0.1  // 版本号
description: 这是我的第一个node项目  // 项目描述信息
entry point: (index.js) main.js  // 项目入口文件
test command:  // 测试指令，暂无
git repository:  // git 地址
keywords:  // 项目关键字，用来发布 npm 包用，暂无
author: szx  // 作者
license: (ISC)  // 开源协议
About to write to D:\AA-demo练习\node-demo\package.json:

{
  "name": "my-node-demo",
  "version": "0.0.1",
  "description": "这是我的第一个node项目",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "szx",
  "license": "ISC"
}


Is this OK? (yes) yes // 输入 yes 自动创建 package.json
```
除了采用上面手动创建 `pacjage.json` 文件外，也可以使用 `npm init -y` 跳过向导，快速生成 `package.json`。


然后在安装第三方包是加上 `--save` 会自动在 package.json 中添加本次安装了那些包和这些包的版本号，例如输入 `npm install jquery --save`，然后打开 `package.json`
```js
"dependencies": {
    "jquery": "^3.6.0"
}
```
可以在 `dependencies` 属性中看到本次安装了 `3.6` 版本的 `jquery`。如果我们后续包 `node_modules` 文件删除后，只需要执行 `npm install` 就可以吧项目依赖的所有包自动安装回来。

## npm 常用命令
- `npm init`
  - 初始化项目，创建 `package.json`
  - 还可以写：`npm init -y`跳过向导，直接生成 `package.json`
- `npm install`
  - 一次性吧 `dependencies` 选项中的依赖包全部安装
  - 简写：`npm i`
- `npm install XXX --save`
  - 下载并保存依赖项到` package.json `
  - 简写：`npm i -S`
- `npm uninstall XXX`
  - 只删除包，不删除依赖项
  - 简写：`npm un`
- `npm uninstall XXX --save`
  - 删除包的同时删除依赖项
  - 简写：`npm un -S`

## npm 配置淘宝镜像
首先安装 `cnpm`，`global` 表示在全局安装
```shell
npm install --global cnpm
```
之后使用 `cnpm install XXX` 的方式下载第三方包，如果想使用 `npm` 开头的同时，用淘宝镜像安装，可以给 `npm` 配置如下信息

```shell
npm config set registry https://registry.npm.taobao.org/
```
这句代码表示每次下载的时候通过这个网址下载安装依赖，可以使用 `npm config list` 来查看是否配置成功
```shell
PS D:\AA-demo练习\node-demo> npm config list
; cli configs
metrics-registry = "https://registry.npm.tao
scope = ""
user-agent = "npm/6.14.11 node/v10.15.3 win3

; userconfig C:\Users\Administrator\.npmrc
home = "https://npm.taobao.org"
registry = "https://registry.npm.taobao.org/

; node bin location = C:\Program Files\nodej
; cwd = D:\AA-demo练习\node-demo
; HOME = C:\Users\Administrator
; "npm config ls -l" to show all defaults.
```

## 安装和使用 express
安装
```shell
npm install express --save
```
express 初体验
```js
// 引入 express
var express = require('express')
// 初始化程序
var app = express()

// 开放资源文件给浏览器 
// 访问如下网址可以访问该问价下的页面 http://127.0.0.1:3000/view/02view.html
// 无需在下面判断
app.use("/view/", express.static("./view"))

// 直接使用 app.get 判断请求的路径
app.get("/", (req, res) => {
    // 使用 send 给浏览器返回数据
    res.send('hello world')
})

app.get("/about", (req, res) => {
    // 发送中文是无需经过编码了
    res.send("关于我")
})

// 使用 listen 返回端口信息
app.listen(3000, () => {
    console.log('running');
})
```

# 第四章

## express 使用
安装
```shell
npm install -save express
```
使用
```js
var express = require('express')

// 创建 app
var app = express()

app.get("/", (req, res) => {
    let query = req.query
    console.log(query); // { name: '李四' }

    // 使用 send 可以自动帮助我们设置 Content-Type
    res.send('你好')
})

app.listen(3000, () => {
    console.log('running');
})
```

## 使用 nodemon 完成更新代码后自动重启服务
安装，需要注意的是 `nodemon` 是需要全局安装的
```shell
npm install -g nodemon
```
使用 `nodemon` 运行 `node` 服务，之后保存时自动重启服务
```shell
nodemon index.js
```

## express 中的静态文件
使用 /public 前缀地址来访问 public 目录中的文件了。
```js
app.use('/public', express.static('public'))
```
栗子
- http://localhost:3000/public/images/kitten.jpg
- http://localhost:3000/public/css/style.css
- http://localhost:3000/public/js/app.js
- http://localhost:3000/public/images/bg.png
- http://localhost:3000/public/hello.html

不带前缀访问 public 目录中的文件
```js
app.use(express.static('public'))
```
栗子
- http://localhost:3000/images/kitten.jpg
- http://localhost:3000/css/style.css
- http://localhost:3000/js/app.js
- http://localhost:3000/images/bg.png
- http://localhost:3000/hello.html

通过带有 /static 前缀地址来访问 public 目录中的文件
```js
app.use('/static', express.static('public'))
```
栗子
- http://localhost:3000/static/images/kitten.jpg
- http://localhost:3000/static/css/style.css
- http://localhost:3000/static/js/app.js
- http://localhost:3000/static/images/bg.png
- http://localhost:3000/static/hello.html

## express 中使用 art-template 渲染引擎
[express 中文地址](https://www.expressjs.com.cn/)
[art-template 中文网址](https://aui.github.io/art-template/)

安装
```shell
npm install --save art-template
npm install --save express-art-template 

# or

npm install --save art-template express-art-template
```
配置
```js
// 配置 art-template 模板引擎
// 第一个参数表示，当渲染以 .art 结尾的文件时，使用 art-template 模板引擎
// express-art-template 是专门用来在 express 中吧 art-template 整合到 express 中
// 虽然外面这里不需要记载 art-template 但是也必须安装
// 原因就在于 express-art-template 依赖了 art-template
app.engine('html', require('express-art-template'));
```
使用
```js
// express 为 response 相应的对象提供了一个方法 render
// render 方法默认是不可以使用的，但是如果配置了就可以使用
// res.render('html模板名称',{ 模板数据 })
// 第一个参数默认默认会去 views 文件夹下查找文件，所以这里不用在添加 views 路径名称
app.get('/', function (req, res) {
    res.render('index.html', {
        // 循环数据
        components: components
    });
});
```

## express 解析表单的 post 提交数据
安装 `body-parser`
```shell
npm install --save body-parser
```
使用，使用 `res.body` 获取 `post` 数据，是一个对象类型的数据
```js
var express = require('express')
var bodyParser = require('body-parser')
var app = express()

// 配置 bodyParser 获取post请求提交的数据
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 读取 post 参数
app.post('/post', (req, res) => {
    // 使用 req.body 获取 post 请求携带的参数
    console.log(req.body)
})
```
## 将文件直接按照 utf8 格式读取
默认使用 `fs` 读取文件，读取到的数据是二进制的数据，需要利用 `toString()` 方法转为人可以读取内容，现在利用下列方法，可以在读取数据是返回的就是经过转换后的数据

```js
fs.readFile('./db.json', 'utf8', (err, data) => {
    if (err) {
        return res.status(500).send('server error 500')
    }
    // 读取到的就是转换后的数据
    consoloe.log(data)
})
```


## 结合 express 配置 router 模块
之前我们都把路径请求都写在 index.js 文件中，这样路径多的话，一个文件的体积就过于庞大，所以，我们要将路由模块单抽离出来，减少代码的复杂度，同时方便后期维护。

- 首先新建 router.js 文件

```js
var fs = require('fs')
var express = require('express')
// 配置路由模块
var router = express.Router()

router.get('/', function (req, res) {
    fs.readFile('./db.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('server error 500')
        }
        res.render('index.html', {
            students: JSON.parse(data).students
        })
    })
})

router.get('/post', function (req, res) {
    res.render('post.html')
})

// 导出 router
module.exports = router
```
- 在 index.js 文件中引入 router.js 并将 router 挂载到 app 中


```js
// 引入 router.js
var app = express()
var router = require('./router')

// 挂载并使用
app.use(router)
```

## 使用回调函数获取异步数据
1.封装读取数据的方法，接受一个函数参数
```js
// 封装学生列表的增删改查方法
var fs = require('fs')
var dbPath = './db.json'

/**
 * 获取所有学生数据
 * @param {function} callback 
 */
function find(callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        // 使用回调函数将异步读取到的文件数据返回出来
        callback(err, JSON.parse(data).students)
    })
}

// 导出所有方法
module.exports = {
    // 获取所有学生数据
    find,
}
```
2.使用封装的读取方法
```js
var express = require('express')
// 配置路由模块
var router = express.Router()
// 引入封装好的操作学生数据方法的文件
var student = require('./student')

// 首页，查询学生列表
router.get('/', function (req, res) {
    // 使用封装的读取方法
    student.find((err,data)=>{
        if (err) {
            return res.status(500).send('server error 500')
        }
        res.render('studentList.html', {
            students: data
        })
    })
})
```

# 第五章

## 封装原生的 get 请求
- 回调函数的使用
{% note info no-icon %}
js代码默认是同步执行的，当遇到异步函数时，异步函数返回的数据在同步函数中获取不到，所以，要用到回调函数的方法，获取异步函数返回的数据。下面是一个小案例，来感受回调函数的魅力
{% endnote %}

**获取倒计时1秒后的执行方法返回的数据**

错误版本
```js
var ret = 0;
function count(x, y) {
    setTimeout(() => {
        ret = x + y
    })
    return ret
}
// 由于 console.log 是同步代码，所以会优先执行，因此打印的结果是 0
console.log(count(10, 20)); // 0
```
正确版本
```js
function sucCount(x, y, callback) {
    setTimeout(() => {
        ret = x + y
        callback(ret)
    })
}
// 使用回调函数获取计算后的结果
sucCount(10, 20, res => {
    console.log(res); // 30
})
```

**封装get请求**
```js
// 封装ajax请求
function get(url, callback) {
    let xhr = new XMLHttpRequest()
    xhr.onload = function (res) {
        // 调用回调函数返回请求到的数据
        callback(res.currentTarget.responseText)
    }
    // 结尾的true表示异步请求，false表示为同步请求
    xhr.open('get', url, true)
    xhr.send()
}
// 接收回调函数传递过来的返回参数
// 这里的res就是上面回调函数传递的值
get('db.json',res=>{
    console.log(res);
})
```

## package-lock.json 文件的作用
如果我们的 `npm` 版本是 5 版本以上，则我们每次使用 `npm` 安装依赖时会自动生成或者更新 `package-lock.json` 文件。那么这个文件有什么用呢？
- `npm5` 以后的版本在安装依赖时不用加 `--save` 参数，也可以自动保存依赖信息
- 当安装依赖时，会自动创建或者更新 `package-lock.json` 这个文件
- `package-lock.json` 这个文件会保存 `node_modules` 中所有的依赖的信息(版本、下载地址)
  - 这样的话 `npm install` 时的速度会提升
- 从文件名称看 `lock` 称之为锁
  - 这个 `lock` 是用来锁定版本的
  - 例如在 `package.json` 文件中某个依赖包的版本为 `^3.1.5`，这个 `^` 的意思就是这个依赖可以在 `3.0` 这个大版本中往上升级，但是不会超出 `3.0` 版本中的最高版本，不会升级为 `4.0` 版本。如果没有 `package-lock.json` 这个文件的话，在下次 `npm install` 时，如果发现这个包存在更高版本，那么 `npm` 会下载最新版本的依赖，有时候不同版本之间可能会存在不兼容的情况，所以为了避免这种情况, `package-lock.json` 中就记录了每个依赖包的具体版本号，这样在下次 `npm install` 时就会按照 `package-lock.json` 中记载的版本号来下载。也就是锁定版本，不会升级

## find 和 findIndex 的原理
首先声明一个数组
```js
let user = [
    {id: 1,name: '张三'},
    {id: 2,name: '李四'},
    {id: 3,name: '王五'},
    {id: 4,name: '赵六'},
]
```

`find`常用来查找某个元素，找到第一个符合条件的元素后便会退出循环，并返回这个元素
```js
// find 原理,根据下标找元素
Array.prototype.myFind = function (callback) {
    // 这里的this指向user数组
    for (let i = 0; i < this.length; i++) {
        // 判断回调函数返回的两个参数是否相等
        if (callback(this[i], i)) {
            // 相等返回当前元素
            return this[i]
        }
    }
}
console.log(user.myFind(item => item.id === 2)); // { id: 2, name: '李四' }
```
`findIndex`常用来查找某个值在数组中的下标位置，找到第一个符合条件的元素后便会退出循环，并返回这个元素所属下标
```js
// findIndex 原理,根据元素找下标
Array.prototype.myFindIndex = function (callback) {
    // this 指向数组自己
    for (let i = 0; i < this.length; i++) {
        // 判断回调函数返回的两个参数是否相等
        if (callback(this[i], i)) {
            // 如果相等返回当前循环到的下标
            return i
        }
    }
}
console.log(user.myFindIndex(item => item.name === '李四')); // 1
```

## MongoDB 简介及安装

[MongoDB 教程](https://www.runoob.com/mongodb/mongodb-tutorial.html)

#### 关系型数据库和非关系型数据库

- 所有的关系型数据库都需要通过 `SQL` 语句来操作
- 所有的关系数据库在操作之前都要设计表结构
- 而且数据表支持约束
  - 唯一的
  - 主键
  - 默认值
  - 非空
  - ...
- 非关系型数据库非常灵活
- 有的非关系型数据库就是 `key-value` 键值对
- 但是 `MongoDB` 是长得最像关系型数据库的非关系型数据库
  - 数据库 -> 数据库
  - 数据表 -> 集合（数组）
  - 表记录 -> 文档对象
- `MongoDB` 不需要设计表结构
- 可以任意的往里面存数据，没有结构性这么一说

#### 安装

下载包之后一直next，然后配置环境变量，将 `MongoDB` 的安装目录中的 `bin` 文件地址配置到环境变量中，然后打开命令提示符输入 `mongod --version` 敲回车看到版本号说明安装成功

### 启动和关闭 MongoDB 服务

#### 启动
输入命令后会看到很多前面是日期的日志，这是不要关闭窗口，表示服务启动成功
```shell
mongod
```
`MongoDB` 默认使用执行 `mongod` 的磁盘根目录下的 `data\db` 文件夹作为自己的数据存储目录，如果要更改默认的存储目录，输入如下命令
```shell
mongod --dbpath=数据存储地址
```
#### 关闭
直接 ctrl + c，或者直接关闭窗口

### MongoDB 基本感知
- 链接数据库
```shell
mongo
```

- MongoDB 创建数据库

如果数据不存在会自动创建，存在则切换到该数据库下
```shell
use myusers
```
- 查看所有数据库
```shell
show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
```
这里看不到我们新建的数据库是因为我们还没有往数据库中插入任何输入

- 往数据库中插入数据
```shell
> db.myusers.insert({"name":"张三"})
WriteResult({ "nInserted" : 1 })
```
此时重新查看所有数据库就可以看到我们我们新建的 myusers 数据库
```shell
> show dbs
admin    0.000GB
config   0.000GB
local    0.000GB
myusers  0.000GB
```
- 查看某个数据库中的数据
```shell
> db.myusers.find()
{ "_id" : ObjectId("606ec04705d3413a7204af25"), "name" : "张三" }
```
- 查看 test 数据库中 kittens 表中的所有数据

```shell
# 先查看当前所在的数据库
> db
test
# 查看当前数据库中所有的表
> show tables
catlists
kittens
# 查看 kittens 表中的所有数据
> db.kittens.find()
{ "_id" : ObjectId("606f9ce6ab59ee533cd898bd"), "name" : "123", "__v" : 0 }
{ "_id" : ObjectId("606f9ce6ab59ee533cd898be"), "name" : "波斯猫", "__v" : 0 }
{ "_id" : ObjectId("606f9d0c01e3dc4e7c5342d2"), "name" : "娃娃毛", "__v" : 0 }
{ "_id" : ObjectId("606f9d0c01e3dc4e7c5342d3"), "name" : "波斯猫", "__v" : 0 }
{ "_id" : ObjectId("606f9d1b8310043c1ccb3c65"), "name" : "娃娃毛", "__v" : 0 }
{ "_id" : ObjectId("606f9d1b8310043c1ccb3c66"), "name" : "波斯猫", "__v" : 0 }
{ "_id" : ObjectId("606f9d3bd0401a412465a801"), "name" : "娃娃毛", "__v" : 0 }
{ "_id" : ObjectId("606f9d3bd0401a412465a802"), "name" : "波斯猫", "__v" : 0 }
```

- 删除某个数据库
```shell
# 查看当前所在数据库
> db
myusers

# 删除当前数据库
> db.dropDatabase()
{ "dropped" : "myusers", "ok" : 1 }

# 查看所有数据库
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
```
- 删除集合，集合相当于数据库中的表
```shell
# 创建集合 runoob
> db.createCollection("runoob")
{ "ok" : 1 }

# 查看所有集合
> show tables
myusers
runoob

# 删除某个集合
> db.runoob.drop()
true

# 查看某个集合
> show tables
myusers
```
### NodeJs 中链接 MongoDB
1. 使用 MongoDB 官方的 npm 包
   1. `npm install mongodb`
   2. [nodejs中使用MongoDB菜鸟教程](https://www.runoob.com/nodejs/nodejs-mongodb.html)
2. 我们使用 mongoose
   1. `npm install mongoose`
   2. [mongoose中文文档](http://www.mongoosejs.net/docs/index.html)

```js
// 首先引入 mongoose 
var mongoose = require("mongoose")
// 链接本地的test数据库，connect 返回一个待定状态
mongoose.connect('mongodb://localhost/test');
// 添加链接成功和失败的提示
var db = mongoose.connection;
// 失败提示
db.on('error', console.error.bind(console, '数据库链接失败'));
// 成功
db.once('open', function () {
    // 链接成功后会自动执行这里面的回调方法
    console.log('数据库链接成功');
    // 设计一个模型 kittySchema，并约定里面有一个 String 类型的 name 属性
    var kittySchema = mongoose.Schema({
        name: String
    });
    // 给这个模型添加一个方法 speak
    kittySchema.methods.speak = function () {
        var greeting = this.name ? `my name is ${this.name}` : `i dont have name`
        console.log(greeting);
    }
    // 将 kittySchema 变成一个 Model
    var Kitten = mongoose.model('Kitten', kittySchema)
    // 添加一条数据
    var cat = new Kitten({
        name: "大花猫"
    })
    console.log(cat.name); // 大花猫    
    // 再添加一条数据
    var cat2 = new Kitten({
        name: "波斯猫"
    })
    cat2.speak(); // my name is 波斯猫

    // 持久化保存第数据
    cat.save((err, res) => {
        if (err) return console.log('插入数据失败');
        res.speak() // my name is 大花猫
    })

    // 持久化保存数到数据库
    cat2.save((err, res) => {
        if (err) return console.log('插入输入失败');
        res.speak() // my name is 波斯猫
    })

    // 查看所有保存的数据
    Kitten.find((err, data) => {
        if (err) return console.log('查看数据失败');
        console.log(data, '查看所有');
    })

    // 获取指定的数据
    Kitten.find({
        name: '波斯猫'
    }, (err, data) => {
        if (err) return console.log('查看数据失败');
        console.log(data);
    })
})
```
### MongoDB 数据库的基本概念
- 可以有多个数据库
- 一个数据库中可以有多个集合（表）
- 一个集合中可以有多个文档 （表记录）
- 文档结构很灵活，没有任何限制
- MongoDB 非常灵活，不需要想 MySQL 一样先创建数据库、表、设计表结构
  - 这里只需要：当你插入数据的时候指定往哪个数据库中的那个集合操作就可以了
  - 一切都由 MongoDB 来自动完成建库建表操作

可以用一个对象来模拟这种结构
```js
// 整个对象相当于MongoDB数据库
{
    // 客户集合
    customer:{
        // 客户集合中的位置表
        positions:[
            // 一个集合中可以有多个文档（表记录）
            {
                name:'张三',
                address:'上海市南京步行街'
            },
            {
                name:'李四',
                address:'北京市天安门广场'
            },{
                // ......
            }
        ]
        // 电话表
        phones:[
            // 一个集合中可以有多个文档（表记录）
            {
                name:'张三',
                phone:'15039188888'
            },
            {
                name:'李四',
                phone:'17666688888'
            },{
                // ....
            }
        ]
    }
    // 工单集合
    workOrders:{
        wrCode:[
            {
                // ......
            }
        ]
    }
}
```

### 设计 schema 和发布 model
允许使用的 SchemaTypes 有:

- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- ObjectId
- Array
```js
// 引入 mongoose
let mongoose = require('mongoose')
// 1.引入 schema(架构)
let Schema = mongoose.Schema
// 链接数据库,即使 itusers 数据库不存在也没关系，也可以直接链接，在第一个插入数据时会自动创建这个数据库
mongoose.connect('mongoose://localhost/itusers')

// 2.设计集合结构（表结构）
// 字段名称就是表结构中的属性名称
let UserSchema = new Schema({
    // 用户名称
    name: {
        // 类型为 string
        type: String,
        // 这个字段必填
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String
    }
})

/**
 * 3.将文档结构发布为模型
 * mongoose.model 方法接收两个参数
 *  第一个参数为数据库的集合名称，传入大写的名词会自动转换为小写的复数集合名称
 *      这个例子中的 User 会被转成 users ,也就是说生成的集合名称叫做 users
 *  第二个参数传入一个Schema实例 ，约定了这个集合中字段名称和文档结构
 */
let User = mongoose.model('User',UserSchema)

```

### mongoose 增删改查

### 添加数据
先插入一条数据,此时的数据还没有真正的保存到数据库中
```js
/**
 * 4.有了模型后就可以对数据进行增删改查操作
 */

let useUser = new User({
    name:'admin',
    password:'admin123456',
    email:'admin@admin.com'
})
```
将数据保存到数据库中,持久化数据
```js
useUser.save((err,res)=>{
    if(err) return console.log('保存失败');
    console.log(res);
})
```

### 查询数据
查询集合中的所有数据。语法：`集合名称.find(callback)`
```js
User.find((err,data)=>{
    console.log(data);
})
```
查询集合中符合条件的所有数据。语法：`集合名称.find(查询条件,callback)`，查询到的数将会被放进一个数组中，查不到时返回 `[]`
```js
User.find({name:"张三"}, (err, data) => {
    console.log(data);
})
```
查询集合中符合条件的第一条数据。语法：`集合名称.findOne(查询条件,callback)`，查询到的数据直接是一个对象，查不到时返回 `null`
```js
User.findOne({name: "张三"}, (err, data) => {
    console.log(data);
})
```
模糊查询一个字段
```js
// 查询 name 中包含 李 的数据
User.where('name').regex('李').exec((err, data) => {
    console.log(data);
    /**
        [
        {
            _id: 607013d3485b5042c482ff52,
            name: '李三多',
            password: '123456',
            email: 'admin@admin.com',
            __v: 0
        },
        {
            _id: 607142fca68aef2a34a8b2fe,
            name: '李四',
            password: 'admin1234',
            email: 'admin@admin.com',
            __v: 0
        }
        ]
        {
        _id: 60714fa9ea0fd14328ab64c1,
        name: '小李子',
        password: '123456',
        email: 'admin@admin.com',
        __v: 0
        }
     */
})
```
多条件模糊查询
```js
// 查询 name 中包含 李 的，或者 password 中有 123 的
var _filter = {
    $or: [ // 多字段同时匹配
        {
            name: {
                $regex: '李'
            }
        },{
            password: {
                $regex: '123'
            }
        }
    ]
}
// limit(10) 表示查询前10条数据
User.where(_filter).limit(10).exec(function (err, doc) { // 回调
    if (err) {
        console.log(err)
    } else {
        console.log(doc);
    }
})
```

### 删除数据
删除某个集合中符合条件的所有数据
```js
// 下面代码会将 User 集合中的 name 是 张三的数据全部删除
User.remove({name: '张三'}, (err, data) => {
    if (err) return console.log('删除失败');
    console.log('删除成功');
})
```

删除集合中符合条件的第一条数据
```js
// 删除 User 集合中 name 是 张三的第一条数据
User.deleteOne({name:"张三"},(err,data)=>{
    if(err) return console.log('删除失败');
    console.log('删除成功');
})
```
根据id删除数据
```js
// 根据id删除元素
User.findByIdAndRemove('607013d3485b5042c482ff53',(err,data)=>{
    if(err) return console.log('删除失败');
    console.log('删除成功');
})
```
### 修改数据
根据 id 修改数据
```js
let newdata = {
    password:'admin1234'
}
// 根据id修改数据
User.findByIdAndUpdate('607142fca68aef2a34a8b2fe',newdata,(err,data)=>{
    if(err) return console.log('修改失败');
    console.log('修改成功');
})
```

修改符合条件的第一条数据
```js
User.updateOne({ name: '张三'}, newdata, (err, data) => {
    if (err) return console.log('修改失败');
    console.log('修改成功');
    getAllUserdata()
})
```
模糊查询数据后修改符合条件的所有数据
```js
// 将数据中 name 里面包含有 李 的数据全部修改为 河南彭于晏
User.where("name").regex('李').updateMany({
    name: "河南彭于晏"
}).exec((err, data) => {
    console.log(data);
})
```

### Nodejs 连接 MySql
[Node.js 连接 MySQL 菜鸟教程](https://www.runoob.com/nodejs/nodejs-mysql.html)

[MySQL 菜鸟教程](https://www.runoob.com/mysql/mysql-tutorial.html)

### 安装依赖
```shell 
npm install mysql --save
```

### 连接数据库
```js
// 引入操作 mysql 的包
var mysql = require('mysql');
// 创建链接
var connection = mysql.createConnection({
    host: 'localhost', // 链接名称
    user: 'root', // 用户名
    password: 'root', // 密码
    database: 'students' // 数据库名称
});
// 建立连接
connection.connect();

// 执行 SQL 语句的方法
function query(sql, callback) {
    connection.query(sql, (error, results, fields) => {
        if (error) return console.log('服务器错误', error);
        callback(results, fields)
    });
}
// 执行结束语句，此行代码要放在最底部
connection.end();
```
### 添加数据
```js
let addSQL1 = 'INSERT INTO users VALUES(NULL,"张三","18","0","15038888888","admin@admin.com")'
let addSQL2 = 'INSERT INTO users VALUES(NULL,"李四","21","1","17667666666","17667666666@163.com")'
query(addSQL2, (data, fields) => {
    console.log(data);
})
```

### 修改数据
```js
// 修改 sql 语句，将 id 是 2 的 name 和 age 修改
var updateSql = 'UPDATE users SET name = "李筱思",age = 19 WHERE id = 2';
query(updateSql, data => {
    console.log(data);
})
```

### 删除数据
```js
// 删除 sql 语句,删除 id 等于 3 的数据
var removeSQL = 'DELETE FROM users WHERE id = 3'
query(removeSQL, data => {
    console.log(data);
})
```

### 查询数据
```js
// 查询 sql 语句
let searchSQL = 'SELECT * FROM users'
query(searchSQL, (data, fields) => {
    console.log(data);
})
```
### 前后模糊查询
模糊查询 users 表中的 name 字段，只要包含 张 的就数据就会被查询出来
```js
let sql = 'SELECT * FROM users WHERE name LIKE '%张%''
query(sql, (data, fields) => {
    console.log(data);
})
```
### 修改表中的列名
语法：`ALTER TABLE 表名 CHANGE 旧列名 新列名 字段类型和长度`
```js
let sql = 'ALTER TABLE users CHANGE gerder gender VARCHAR(322)'
query(sql, (data, fields) => {
    console.log(data);
})
```
### 修改表中的列的长度
语法：`ALTER TABLE 表名 MODIFY COLUMN 列名 字段类型和要修改的长度`
```js
let sql = 'ALTER TABLE users MODIFY COLUMN gender VARCHAR(255)'
query(sql, (data, fields) => {
    console.log(data);
})
```

### 使用 Promise 解决地狱回调问题
什么是回调地狱，回调地狱产生的原因是由于多个异步方法深入嵌套导致，致使代码结构不好理解，下面代码就是地狱回调
```js
// 回调地狱产生原因是由于多个异步方法相互嵌套，导致代码越嵌套越深
// 下面这种写法就是回调地狱
let fs = require('fs')
// readFile 方法是异步方法，
fs.readFile('./public/a.txt', 'utf8', (err, data) => {
    console.log(data);
    // 读取 a 文件完毕后再读取 b 文件 
    fs.readFile('./public/b.txt', 'utf8', (err, data) => {
        console.log(data);
        // 读取 b 文件完毕后再读取 c 文件 
        fs.readFile('./public/c.txt', 'utf8', (err, data) => {
            console.log(data);
        })
    })
})
```
使用 ES6 语法中的 Promise 来解决上面的这种问题
```js
let fs = require('fs')
// 封装一个读取文件的方法，返回一个 promise
function preadFile(filePath) {
    // Promise 是一个构造函数，有三中状态：padding、resolve、reject
    //  padding：等待状态，在返回结果前都是 padding 状态
    //  resolve：成功状态
    //  reject：失败状态
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

// 链式调用
preadFile('./public/a.txt')
    .then(data => {
        console.log(data);
        // then 中返回的内容会在下一次 then 中获取到
        return preadFile('./public/b.txt')
    })
    .then(data => {
        console.log(data);
        return preadFile('./public/c.txt')
    })
    .then(data => {
        console.log(data);
    })
    .catch(err=>{
        // 上面的所有 then 中，不管是哪个 then 方法，只要有错误就会进到 catch 中，并且错误信息就是发生的错误信息
        console.log(err);
    })
```

### json-server 服务器
### 前言
安装这个插件可以仅仅写一个 json 文件就可以启动一个数据服务，非常方便，支持输入参数查询
### 安装
```shell
npm install -g json-server
```
查看版本
```shell
json-server -v
```
### 使用
首先新建 db.json 文件，并写入如下内容
```js
{
    "posts": [{
        "id": 1,
        "title": "张三",
        "author": "typicode"
    },
    {
        "id": 2,
        "title": "json-server",
        "author": "typicode"
    },
    {
        "id": 3,
        "title": "json-server",
        "author": "typicode"
    }],
    "comments": [{
        "id": 1,
        "body": "some comment",
        "postId": 1
    }],
    "profile": {
        "name": "typicode"
    }
}
```
启动服务, 加上 --watch 可以实时监控 json 文件的变化，无需重复启动服务
```shell
json-server --watch .\db.json
```
启动成功后默认端口是 3000，浏览器输入  http://localhost:3000/ 可以看到一个页面，页面中显示了所有可以请求的路径。

输入 http://localhost:3000/posts 可以看到 posts 数组中的所有数据

输入 http://localhost:3000/posts/1 表示只返回 id 是 1 的数据

输入 http://localhost:3000/posts?title=李四 表示只返回 title 是李四的数据

# 第六章

## art-template 中的 include-extend-block
### 子模板
利用子模板可以重组利用相同的页面内容

封装模板
```html
<!-- hader.html -->
<div>
    头部公共部分
</div>
```
引入模板，使用 include 加上空格，跟上要引入的模板路径
```html
<!-- layout.html -->
{{include './header.html'}}
```
### 模板继承
模板继承可以将一整个页面引用过来，值需要填入对应的“坑”即可

创建模板，其中使用 block 给孩子页面留下对应的坑，孩子只需要往坑里填内容就可以在模板上展示出来
```html
<!-- layout.html -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.css">
    {{block 'head'}}
    <!-- 让孩子页面添加孩子自己的样式 -->
    {{/block}}
</head>

<body>
    <!-- 复用子模板，使用 include 引入公共模板页面 -->
    {{include './header.html'}}

    {{block 'content'}}
    <!-- 这里面的内容让继承该页面的页面去填入 -->
    {{/block}}

    <!-- 使用 include 引入公共模板页面 -->
    {{include './bottom.html'}}
</body>

<script src="/node_modules/jquery/dist/jquery.js"></script>

</html>
```
使用模板,extend 跟上空格，后面再加上模板路径，填坑的方式和留坑的方式相同，但是名称和位置要一一对应
```html
<!-- index.html -->
<!-- 继承页面 -->
{{extend './layout.html'}}

{{block 'head'}}
<style>
    h2 {
        color: pink;
    }
</style>
{{/block}}

<!-- 填写继承页面留下的坑 -->
{{block 'content'}}
<h2>
    我是主页数据
</h2>
{{/block}}
```

## 项目搭建
```js
|-- 目录结构
    |-- main.js // 入口文件
    |-- package-lock.json // 项目依赖包说明文件
    |-- package.json // 项目依赖包说明文件
    |-- controllers
    |-- modules // 存放数据库表信息
    |-- public // 存放静态资源文件
    |   |-- css        
    |   |-- img      
    |   |-- js
    |-- routers // 设置路由文件
    |-- views // 视图页面
        |-- 404.html
        |-- index.html
        |-- layout.html
        |-- login.html
        |-- register.html
        |-- settings
        |   |-- admin.html
        |   |-- profile.html
        |-- topic
        |   |-- edit.html
        |   |-- new.html
        |   |-- show.html
        |-- _layouts // 页面结构目录
        |   |-- home.html
        |-- _partials // 页面组件目录
            |-- footer.html
            |-- header.html
            |-- settings-nav.html
```

## 路由设计

| 接口地址  | 请求方式 | 请求参数                  | 是否需要登录 | 接口描述         |
| --------- | -------- | ------------------------- | ------------ | ---------------- |
| /         | get      |                           |              | 渲染首页页面     |
| /homelist | post     |                           |              | 获取首页列表数据 |
| /register | get      |                           |              | 渲染注册页面     |
| /register | post     | email、password、nickname |              | 处理注册请求     |
| /login    | get      |                           |              | 渲染登录页面     |
| /login    | post     | email、password           |              | 处理登录数据     |

## 设计表结构-用户表

| 字段名称           | 字段类型 | 是否必填 | 默认值             | 可选值     | 字段描述     |
| ------------------ | -------- | -------- | ------------------ | ---------- | ------------ |
| email              | *String* | true     |                    |            | 用户名       |
| nickname           | *String* | true     |                    |            | 昵称         |
| password           | *String* | true     |                    |            | 密码         |
| created_time       | *Date*   | false    | *Date*.now         |            | 创建时间     |
| last_modified_time | *Date*   | false    | *Date*.now         |            | 最后修改时间 |
| avatar             | *String* | false    | avatar-max-img.png |            | 用户头像     |
| bio                | *String* | false    |                    |            | 个人简介     |
| gender             | *Number* | false    | -1                 | [-1, 0, 1] | 性别         |
| birthday           | *Date*   | false    |                    |            | 生日         |
| status             | *Number* | false    | 0                  | [0, 1, 2]  | 用户状态     |

## 处理注册逻辑

- 首先判断用户输入的邮箱或者昵称是否在数据中已经存在
  - 如果存在则提示该昵称或者邮箱已经存在，请修改后重试
  - 如果不存在进行注册处理
- 使用 md5 加密对用户输入的密码进行加密处理，为了尽可能保证数据安装，使用双层加密
- 定义后台返回的错误状态码
  - 如果是服务器出错，返回 500 状态
  - 如果接口调用成功则接口状态为200，但是要返回不同的错误码来判断逻辑业务
    - 业务处理失败 code = 1111
    - 业务处理成功 code = 0000

### mongodb 或者查询语句

```javascript
>db.col.find(
   {
      $or: [
         {key1: value1}, {key2:value2}
      ]
   }
).pretty()
```

### express 直接返回 json 格式的数据

```javascript
return res.status(500).json(err)
```

### md5 加密数据

安装

```shell
npm install md5-node
```

使用

```javascript
let md5 = require('md5-node')
md5('123456') // => e10adc3949ba59abbe56e057f20f883e

// 双层加密
md5(md5('123456')) // => 14e1b600b1fd579f47433b88e8d85291
```
### 封装一个记录错误日志的方法

此方法接受一个错误信息，可以将这个错误信息和发生错误的时间记录到一个 txt 文件中，方便查看程序的错误信息

```js
let fs = require('fs')
let path = require('path')
let logPath = path.join(__dirname, '../controllers/errlog.txt')

function dateFormat(date, format = "YYYY-MM-DD HH:mm:ss") {
    const config = {
        YYYY: date.getFullYear(),
        MM: date.getMonth() + 1 < 10 ?
            `0${date.getMonth() + 1}` : date.getMonth() + 1,
        DD: date.getDate(),
        HH: date.getHours(),
        mm: date.getMinutes(),
        ss: date.getSeconds(),
    };
    for (let key in config) {
        format = format.replace(key, config[key]);
    }
    return format;
}

function readlog() {
    return new Promise((resolve, reject) => {
        fs.readFile(logPath, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

function writelog(log) {
    readlog().then(res => {
        let content = res + dateFormat(new Date()) + '\n' + log + '\n\n'
        fs.writeFile(logPath, content, (err, res) => {
            if (err) return console.log('日志写入失败');
            console.log('发生错误，已将错误日志记录');
        })
    })
}

module.exports = writelog
```

### 注册完整示例

```javascript
// 处理注册逻辑
router.post('/register', (req, res) => {
    // 1.处理post请求发送过来的数据
    // 2.操作数据库
    // 3.发送响应
    //      判断当前注册信息是否存在，判断邮箱和昵称是否重复
    let body = req.body    
    // 查询昵称或者邮箱是否重复
    User.findOne({
        $or: [{
            nickname: body.nickname
        }, {
            email: body.email
        }]
    }, (err, data) => {
        // 如果服务器发生错误返回500
        if (err) {
            writelog(err) // 记录错误日志
            return res.status(500).json(err)
        }
        // 如果能查询到数据表示用户已经存在
        if (data) {
            return res.status(200).json({
                code: 1111,
                message: '该昵称或者邮箱已经存在，请修改后重试'
            })
        }
        // 如果不报错也没有查询到用户表示已经可以注册
        // 首先要对用户密码进行加密处理,使用双层加密
        body.password = md5(md5(body.password))
        // 保存用户数据
        new User(body).save((err, data) => {
            if (err) {
                writelog(err) // 记录错误日志
                return res.status(500).json(err)
            }
            res.status(200).json({
                code: 0000,
                message: '注册成功'
            })
        })
    })
})
```

## 利用 async 和 await 优化代码结构
async 和 await 是 promise 的语法糖，处理异步请求非常简单，下面是优化后的代码
```js
// 处理注册逻辑
router.post('/register', async (req, res) => {
    // 1.处理post请求发送过来的数据
    // 2.操作数据库
    // 3.发送响应
    //      判断当前注册信息是否存在，判断邮箱和昵称是否重复
    let body = req.body
    // 升级版的写法
    try {
        // 先查询邮箱是否已经存在
        let email = await User.findOne({
            email: body.email
        })
        if (email) {
            return res.status(200).json({
                code: 1111,
                message: '该邮箱已被注册'
            })
        }

        // 查询昵称是否存在
        let nickname = await User.findOne({
            nickname: body.nickname
        })
        if (nickname) {
            return res.status(200).json({
                code: 1111,
                message: '该昵称已被注册'
            })
        }

        // 加密密码并保存数据
        body.password = md5(md5(body.password))
        await new User(body).save()
        res.status(200).json({
            code: 0000,
            message: '注册成功'
        })

    } catch (err) {
        writelog(err) // 记录错误日志
        return res.status(500).json(err)
    }

})
```
## 表单同步提交和异步提交
- 同步提交页面会锁死，并且服务器返回的数据会渲染在页面上，返回上一页时上次填写的表单数据会被清空
- 异步提交时表单返回的数据不会渲染在页面上，并且提交时不会锁死页面，还可以做其他事情

## 客户端的重定向针对于异步请求无效
当客户端是异步请求时，服务端进行重定向操作后，浏览器也会进行异步重定向，从而不会让页面发生跳转

## 通过 session 保存登录状态
安装
```shell
npm install express-session
```
配置
```js
let session = require('express-session') // 使用 express 的 session

// 配置 session,要放在 app.use(router) 之前
app.use(session({  
    // 自定义的加密字符串，会在原有的加密基础上加上这个字符串加密
    // 可以防止客户端伪造 session ，增加安装性
    secret: 'keyboard cat',
    resave: false,
    // 无论是否使用了session 都会实现默认保存一个密钥
    saveUninitialized: true
}))
```
使用
```js
// 写入session
req.session.foo = 'boo'

// 读取session
req.session.foo
```
## 中间件概念
客户端请求服务端的数据，服务端返回数据之前会对数据进行一系列的处理，每个处理过程我们称之为中间件

express 中添加中间件的方法，app.use
```js
let express = require('express')
let fs = require('fs')
let app = express()
// 设置中间件
app.use((req, res, next) => {
    console.log('无论哪个请求进来都会进入这个中间件');
    // 如果不添加 next 则不会继续往下执行
    next()
})

app.get('/', (req, res, next) => {
    fs.readFile('.a/.b', (err, data) => {
        if (err) {
            // 当 next 加上了参数是会进到接受四个参数的中间件，其他的中间件不会进来
            return next(err)
        }
        res.send(data)
    })
})

app.use((req, res, next) => {
    console.log('aa');
})

// 处理错误的中间件,必须接受四个参数
app.use((err, req, res, next) => {
    res.send(err)
})

app.listen(3000, () => {
    console.log('running 127.0.0.1:3000');
})
```

## 在项目中添加处理404的中间件

```js
// 配置路由文件
app.use(router)
app.use(router2)

// 配置 404 中间件,当访问的页面不再上面的路由中，则会继续往下匹配，此时会就会匹配到 app.use 这个中间件
// 此时可以做 404 处理
app.use((req, res, next) => {
    res.render('404.html')
})
```
## 在项目中添加错误统一处理中间件
- 注意：只有 next(err) 方法携带了错误参数并且中间件接受四个参数才会进入到错误处理的中间件中

```js
// 发生错误时，执行next方法，进入到下一个中间件中，并且携带错误参数，会进入到接受四个参数的中间件中
return next(err)
```

```js
// 配置处理错误的中间件,只有后台发生错误就会进来这里面
app.use((err, req, res, next) => {
    writelog(err) // 记录错误日志
    return res.status(500).json(err)
})
```

