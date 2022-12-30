---
title: 在Linux系统中部署NodeJS项目
date: '2021-05-21 13:53'
tags: Linux
categories: Linux项目部署
abbrlink: 9a3c0d4
---

## 安装NodeJS

* 首先进入 [Node 官网](https://nodejs.org/zh-cn/download/)，下载对应的 Node包

  ![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/lunuximage/1.png)

- 下载下来后是一个后缀为 `xz` 的压缩包，我们把这个包上传到 Linux 系统中的 `/usr/local ` 中

- 接着 `cd` 到 `local` 文件夹下面解压这个压缩包

  ```shell
  tar -xvf node-v14.17.0-linux-x64.tar.xz
  ```

- 然后修改一下名字，修改为 `node`，方便我们下面创建软连接

  ```shell
  mv node-v14.17.0-linux-x64 node
  ```

- 然后进入到 `node` 文件夹里面的` bin` 目录下，查看是否有 `node` 和 `npm`

  ![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/lunuximage/2.png)

- 建立软链接，这一步是为了可以在任何目录下都能使用 `node`

  ```shell
  ln -s /usr/local/node/bin/npm /usr/local/bin/ 
  
  ln -s /usr/local/node/bin/node /usr/local/bin/
  ```

- 设置完成后切换任意目录执行 `npm -v，node -v`

  ![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/lunuximage/3.png)

看到两个版本号表示安装完成

## 安装pm2

pm2是一个 NODE.JS 的高级生产过程管理器，使用它可以帮助我们轻松的部署运行 Node 项目

[PM2官网](https://pm2.keymetrics.io/)

安装

```she
npm install pm2 -g
```

安装完成后会自动安装到我们的 node 目录下，同样的需要个给pm2 建立一个软链接

```shell
ln -s /usr/local/node/bin/pm2 /usr/local/bin
```

下面是 pm2 的一些常用命令

```shell
启动：pm2 start demo.js  //demo.js是你要启动的app_name|app_id文件
停止：pm2 stop app_name|app_id
删除：pm2 delete app_name|app_id
重启：pm2 restart app_name|app_id
停止所有：pm2 stop all
查看所有的进程：pm2 list
查看所有的进程状态：pm2 status
查看某一个进程的信息：pm2 describe app_name|app_id
参数说明
--watch：监听应用目录源码的变化，一旦发生变化，自动重启。如果要精确监听、不见听的目录，最好通过配置文件
-i --instances：启用多少个实例，可用于负载均衡。如果-i 0或者-i max，则根据当前机器核数确定实例数目，可以弥补node.js缺陷
--ignore-watch：排除监听的目录/文件，可以是特定的文件名，也可以是正则。比如--ignore-watch="test node_modules "some scripts"
-n --name：应用的名称，查看应用信息的时候可以用到
-o --output <path>：标准输出日志文件的路径，有默认路径
-e --error <path>：错误输出日志文件的路径，有默认路径
--interpreter <interpreter>：the interpreter pm2 should use for executing app (bash, python...)
如完整参数命令：
pm2 start demo.js --watch -i 2   //开启2个进程
pm2 start app.js -i max   //根据机器CPU核数，开启对应数目的进程 
```

更多命令可以去官网查看

这里我们写一个测试代码，代码如下

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(8080, () => { // 启动8080端口
  console.log("run success");
});

```

然后把测试项目上传到 `/usr/web` 目录下，在这个文件夹下运行 `pm2 start index.js`

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/lunuximage/4.png)

项目启动成功后可以使用 ip 地址来访问我们启动的项目

## linux查看IP地址

```sh
ifconfig -a
```

红框所标注的就是ip地址

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/lunuximage/5.png)

现在我们使用 `192.168.56.128:8080` 来尝试访问一下看能否正常访问

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/lunuximage/6.png)

可以看到已经可以正常访问了，这里有一个坑会导致我们无法访问，就是 linux 没有开放我们启动的8080端口，导致无法在外界访问到，下面是开放端口方法

## linux开放访问端口

- 第一步：开放端口 以8080端口为例

  ```shell
  firewall-cmd --zone=public --add-port=8080/tcp --permanent
  ```

  命令含义

  ```shell
  --zone #作用域
  --add-port=8080/tcp #添加端口，格式为 端口/通讯协议
  -- permanent #永久生效
  ```

  成功后返回 success

- 第二步：重启Centos防火墙

  ```shell
  firewall-cmd --reload 
  ```

  成功后返回 success

- 上述步骤操作完成后就可以正常访问 8080 端口了，开放其他端口和上述方法一致

  

  