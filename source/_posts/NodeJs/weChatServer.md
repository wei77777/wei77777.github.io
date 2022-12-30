---
title: 使用NodeJs作为微信公众号后台服务器
date: '2021-05-19 18:16'
tags: NodeJs
categories: 公众号开发
abbrlink: 8c7fad16
---

## 申请测试公众号

首先登录[微信公众平台](https://mp.weixin.qq.com/)，选择自己的公众号登录。登录成功后点击开发者工具，选择公众平台测试账号

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/wechar/1.png)

点击进去后我们可以申请一个测试用的公众号，可以体验所有高级接口，这里我们要配置一个线上的接口地址，在验证 Tonken，和收发消息时微信都会请求我们配置的地址，这里推荐一个好用的内网穿透工具，可以把我们本地的项目地址映射到外网上，方便我们调试

[小米球内网穿透工具](https://manager.xiaomiqiu.com/login)

这里我生成的线上地址是 http://songzx.ngrok2.xiaomiqiu.cn/，下面我们会用这个地址作为我们的公众号的接口配置地址

![image-20210518191538886](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/wechar/2.png)

## 实现Tonken验证

首先新建一个空白的 node 项目

```shell
npm init -y
```

接着安装一些常用的依赖

```she
npm install express
```

接在在项目根路径下新建` index.js`，初始代码如下

```js
const express = require("express")
const app = express()

app.get("/",(req,res)=>{
    res.send('Hello World')
})

app.listen(8088,()=>{
    console.log("running 127.0.0.1:8088");
})
```

然后启动项目并用浏览器访问 `127.0.0.1:8088`可以看到如下结果,表示服务启动成功

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/wechar/3.png)

现在我们实现验证 `tonken` 的逻辑

首先安装如下依赖，用作加密处理

```shell
npm install crypto
```

然后新建 `util` 和 `router` 两个文件夹，分别放置我们的统一的方法和普通请求方法

然后新建 `util -> validateToken.js` 文件,代码如下,这个方法专门用来验证微信传递过来的 `Tonken`

```js
var crypto = require("crypto");

// 加密方法
function sha1(str) {
  var md5sum = crypto.createHash("sha1");
  md5sum.update(str);
  str = md5sum.digest("hex");
  return str;
}

// 验证tonken
function validateToken(req) {
  return new Promise((resolve, reject) => {
    let query = req.query;
    let signature = query.signature;
    let echostr = query["echostr"];
    let timestamp = query["timestamp"];
    let nonce = query["nonce"];
    let oriArray = new Array();
    oriArray[0] = nonce;
    oriArray[1] = timestamp;
    oriArray[2] = "admin123"; // 这里是在公众号接口配置信息里面填写的Token
    oriArray.sort();
    let original = oriArray.join("");
    let scyptoString = sha1(original);
    if (signature == scyptoString) {
      // 验证通过，返回 echostr
      resolve(echostr);
    } else {
      reject(false);
    }
  });
}
// 导出验证 Tonken 的发放
module.exports = validateToken;
```

然后新建 `router -> weChat.js `文件，这个文件专门用来处理微信发送过来的请求,在这个文件中编写如下代码

```js
const express = require("express");
const router = express.Router(); // 配置路由模块
const validateToken = require("../util/validateToken");

// get请求验证tonken有效性
router.get("/", (req, res) => {
  validateToken(req).then((t) => {
    res.send(t);
  });
});
// 导出 router
module.exports = router;
```

最后修改一下` index.js `文件，引入我们新建的 ` router.js` 文件

```js
const express = require("express");
const app = express();
const path = require("path");
const weChat = require(path.resolve(__dirname, "./router/weChat"));

app.use(weChat);

app.listen(8088, () => {
  console.log("running 127.0.0.1:8088");
});
```

现在我们去微信公众号配置页面中测试一下

![image-20210519162630934](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/wechar/5.png)

页面中弹出 配置成功 就表示我们验证 `Tonken` 的业务已经完成了

## 获取Tonken并定时刷新

微信中获取 `Tonken` 要发送一个 get 请求来获取，并且这个 `Tonken` 有过期时间，我们需要自己保存这个 `Tonken` 并定时刷新，以保证 `Tonken` 有效性

[微信官方对于获取 Tonken 的描述](https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html)

接口调用说明

- 请求方式: GET
- 请求地址：`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET`

既然要用到请求，我们安装一个 `axios` 用来发送请求

```shell
npm install axios
```

然后在根目录新建 `public -> tonken.json` ，用来存放我们获取到的 `tonken`,也是对` tonken` 的一种持久化存储方式，`json`文件内容为空即可

接着新建 `util -> tonkenConfig.js` 文件,代码如下

```js
const fs = require("fs");
const path = require("path");
const http = require("axios");
const fileUrl = path.resolve(__dirname, "../public/tonken.json");
const APPID = "wx2188729b190d357d"; // 测试号的 APPID
const APPSECRET = "d976b0e6262b829ba003e9a24032447c"; // 测试号的 APPSECRET
let INTERTIME = (7200 - 60) * 1000; // 设置一个默认的定期获取tonken的时间

// 保存Tonken
function setTonken() {
  return new Promise((resolve, reject) => {
    http
      .get(
        `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`
      )
      .then((res) => {
        // 更新tonken的过期时间，每隔这个时间重新获取一次tonken
        INTERTIME = (res.data.expires_in - 60) * 1000;
        // 获取到Tonken后保存到json文件中
        fs.writeFile(
          fileUrl,
          JSON.stringify({
            tonken: res.data.access_token,
          }),
          () => {
            // 通知外界Tonken获取成功
            resolve();
          }
        );
      });
  });
}

// 定时获取Tonken
function timingSetTonken() {
  // 定时刷新tonken
  setInterval(() => {
    setTonken();
  }, INTERTIME);
}

// 获取Tonken
function getTonken() {
  return new Promise((resolve, reject) => {
    // 从json中读取保存的Tonken
    fs.readFile(fileUrl, (err, data) => {
      // 返回获取到的tonken
      resolve(JSON.parse(data).tonken);
    });
  });
}

// 导出封装好的方法
module.exports = {
  setTonken, // 更新tonken
  getTonken, // 返回获取到的tonken
  timingSetTonken, // 定时更新tonken
};
```

然后在 `router -> weChat.js` 中引入 `tonkenConfig.js` 

```js
const express = require("express");
const router = express.Router(); // 配置路由模块
const validateToken = require("../util/validateToken");
const { setTonken, timingSetTonken } = require("../util/tonkenConfig");
// 项目启动后自动执行获取tonken的方法
setTonken().then(() => {
  // tonken 获取成功后开始定时刷新tonken操作
  timingSetTonken();
});

// get请求验证tonken有效性
router.get("/", (req, res) => {
  validateToken(req).then((t) => {
    res.send(t);
  });
});
// 导出 router
module.exports = router;
```

此时我们在启动项目后会自动调用一下获取 `tonken` 的接口，然后从接口中获取到一个过期时间,微信返回的过期时间是以秒为单位，减去60秒是为了下一次`tonken`时与这次`tonken`之间的平滑过渡，之后每隔这个时间会重新获取一次`tonken`

我们将这个`tonken`写入到了一个`json`文件中，我们可以在任何文件中通过如下方法获取`tonken`

```js
const { getTonken } = require("./util/tonkenConfig");
// 调用封装好的获取token方法
getTonken().then((tonken) => {
  console.log(tonken); // 45_7k55HHRaYxM4MkD4aREraHZpgdjmT......
});
```

## 接收微信消息并回复

[官方对于接收消息的描述](https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Receiving_standard_messages.html)

简单说就是：我们在微信公众号中发送消息后，微信会发送一个 `post` 请求给我们上面配置的地址，参数时一段 `xml` 文本，我们需要解析这个 `xml`，并按照微信指定的格式回复一个 `xml` 格式的字符串，注意是回复 **xml 格式的字符串**

首先安装依赖，用来解析`post`请求中的`xml`参数

```shell
npm install express-xml-bodyparser
```

然后在 `index.js` 文件中引用并配置中间件

```js
const express = require("express");
const app = express();
const path = require("path");
const weChat = require(path.resolve(__dirname, "./router/weChat"));
const xmlparser = require('express-xml-bodyparser'); // 解析 xml
app.use(express.json());
app.use(express.urlencoded());
app.use(xmlparser());

app.use(weChat);

app.listen(8088, () => {
  console.log("running 127.0.0.1:8088");
});
```

然后在 `weChat.js` 中添加一个 `post` 请求，打印一下看看微信给我们发过来的是什么东西

```js
// post请求处理微信发送过来的消息
router.post("/", (req, res) => {
  console.log(req.body);
  res.send("");
});
```

重启项目，我们往微信公众号中随便发送一个消息

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/wechar/4.png)

解析后的参数如下

```js
{
  xml: {
    tousername: [ 'gh_a0f004c20d2b' ],
    fromusername: [ 'olttN6WJOYe-lTysV8_tsnZ7-HMQ' ],
    createtime: [ '1621416487' ],
    msgtype: [ 'text' ],
    content: [ 'hello' ],
    msgid: [ '23213103466653274' ]
  }
}
```

拿到参数后我们可以根据参数中的 `msgtype` 判断传递过来的消息类型，以及 `content` 是消息内容,获取到了参数，接下要做的就是根据消息回复内容了

[官方被动回复用户消息文档](https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Passive_user_reply_message.html)

下面是一个回复消息的模板代码，可以很方便的帮助我们生成指定的 `xml` 格式的字符串

```js
// 回复文本消息
exports.textMessage = function (message) {
  var createTime = new Date().getTime();
  return `<xml>
    <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
    <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
    <CreateTime>${createTime}</CreateTime>
    <MsgType><![CDATA[text]]></MsgType>
    <Content><![CDATA[${message.reply}]]></Content>
    </xml>`;
};
// 回复图片消息
exports.imageMessage = function (message) {
  var createTime = new Date().getTime();
  return `<xml>
    <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
    <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
    <CreateTime>${createTime}</CreateTime>
    <MsgType><![CDATA[image]]></MsgType>
    <Image>
        <MediaId><![CDATA[${message.mediaId}]]></MediaId>
    </Image>
    </xml>`;
};
// 回复语音消息
exports.voiceMessage = function (message) {
  var createTime = new Date().getTime();
  return `<xml>
    <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
    <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
    <CreateTime>${createTime}</CreateTime>
    <MsgType><![CDATA[voice]]></MsgType>
    <Voice>
        <MediaId><![CDATA[${message.mediaId}]]></MediaId>
    </Voice>
    </xml>`;
};
// 回复视频消息
exports.videoMessage = function (message) {
  var createTime = new Date().getTime();
  return `<xml>
    <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
    <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
    <CreateTime>${createTime}</CreateTime>
    <MsgType><![CDATA[video]]></MsgType>
    <Video>
        <MediaId><![CDATA[${message.mediaId}]]></MediaId>
        <Title><![CDATA[${message.title}]]></Title>
        <Description><![CDATA[${message.description}]]></Description>
    </Video>
    </xml>`;
};
// 回复图文消息
exports.articleMessage = function (message) {
  var createTime = new Date().getTime();
  return `<xml>
    <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
    <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
    <CreateTime>${createTime}</CreateTime>
    <MsgType><![CDATA[news]]></MsgType>
    <ArticleCount>${message.articles.length}</ArticleCount>
    <Articles>
        ${message.articles
          .map(
            (article) =>
              `<item><Title><![CDATA[${article.title}]]></Title>
                <Description><![CDATA[${article.description}]]></Description>
                <PicUrl><![CDATA[${article.img}]]></PicUrl>
                <Url><![CDATA[${article.url}]]></Url></item>`
          )
          .join("")}
    </Articles>
    </xml>`;
};
```

在 `weChat.js` 中引入上面的模板，这里我把模板代码放到了 `util -> template.js` 中，然后修改刚刚新建的 post 方法

```js
// 引入消息模板
const template = require("../util/template");

// post请求处理微信发送过来的消息
router.post("/", (req, res) => {
  let xml = req.body.xml;
  let msgtype = xml.msgtype[0];
  switch (msgtype) {
    case "text":
      // 封装要回复的消息参数
      let message = {
        FromUserName: xml.fromusername[0],
        ToUserName: xml.tousername[0],
        reply: "你好呀，我是通过代码回复你的",
      };
      res.send(template.textMessage(message));
      break;

    default:
      res.send(""); // 不是文本消息是默认响应一个空
      break;
  }
});
```

我们现在在发送消息试一试

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/wechar/6.png)

我们看到公众号已经可以回答我们了。