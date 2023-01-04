---
title: 使用gulp搭建前端工程
date: '2021-05-26 10:13'
tags: gulp
categories: 项目搭建
abbrlink: e4fc8d1a
---

[项目源码地址](https://gitee.com/szxio/gulp-building)

## 前期准备工作

- 首先确保本机安装了 node

- [gulp中文文档](https://www.gulpjs.com.cn/)

### 安装 gulp 命令行工具

```shell
npm install --global gulp-cli
```

### 在项目目录下创建 package.json 文件

```shell
npm init -y
```

### 安装 gulp，作为开发时依赖项

```shell
npm install --save-dev gulp
```

### 检查 gulp 版本

```shell
gulp --version
```

```powershell
PS D:\a-个人项目管理\使用Gulp搭建项目\gulp-building> gulp --version
CLI version: 2.3.0
Local version: 4.0.2
```

## 创建配置文件

在根目录下新建 `src` 文件夹和 `gulpfile.js` 文件

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/gulpbuilding/1.png)

在 `src` 目录下新建如下文件，其中 `index.html` 作为我们的入口页面

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/gulpbuilding/2.png)

## gulp 中常用方法解释

### [src](https://www.gulpjs.com.cn/docs/api/src/)

创建一个流，用于从文件系统读取 [Vinyl](https://www.gulpjs.com.cn/docs/api/concepts#vinyl) 对象。

#### 函数原型

```js
src(globs, [options])
```

#### 返回值

返回一个可以在管道的开始或中间使用的流，用于根据给定的 globs 添加文件。

### [globs](https://www.gulpjs.com.cn/docs/getting-started/explaining-globs/)

glob 是由普通字符和/或通配字符组成的字符串，用于匹配文件路径。可以利用一个或多个 glob 在文件系统中定位文件。

`src()` 方法接受一个 glob 字符串或由多个 glob 字符串组成的数组作为参数，用于确定哪些文件需要被操作。glob 或 glob 数组必须至少匹配到一个匹配项，否则 `src()` 将报错。当使用 glob 数组时，将按照每个 glob 在数组中的位置依次执行匹配 - 这尤其对于取反（negative） glob 有用。

#### 特殊字符： * (一个星号)

在一个字符串片段中匹配任意数量的字符，包括零个匹配。对于匹配单级目录下的文件很有用。

下面这个 glob 能够匹配类似 `index.js` 的文件，但是不能匹配类似 `scripts/index.js` 或 `scripts/nested/index.js` 的文件。

```js
'*.js'
```

#### 特殊字符： ** (两个星号)

在多个字符串片段中匹配任意数量的字符，包括零个匹配。 对于匹配嵌套目录下的文件很有用。请确保适当地限制带有两个星号的 glob 的使用，以避免匹配大量不必要的目录。

下面这个 glob 被适当地限制在 `scripts/` 目录下。它将匹配类似 `scripts/index.js`、`scripts/nested/index.js` 和 `scripts/nested/twice/index.js` 的文件。

```js
'scripts/**/*.js'
```

### [desc](https://www.gulpjs.com.cn/docs/api/dest/)

`dest()` 接受一个输出目录作为参数，并且它还会产生一个 [Node 流（stream）](https://nodejs.org/api/stream.html)，通常作为终止流（terminator stream）。当它接收到通过管道（pipeline）传输的文件时，它会将文件内容及文件属性写入到指定的目录中。gulp 还提供了 `symlink()` 方法，其操作方式类似 `dest()`，但是创建的是链接而不是文件（ 详情请参阅 [`symlink()`](https://www.gulpjs.com.cn/docs/api/symlink) ）。

大多数情况下，利用 `.pipe()` 方法将插件放置在 `src()` 和 `dest()` 之间，并转换流（stream）中的文件。

### [series](https://www.gulpjs.com.cn/docs/api/series/)

将任务函数和/或组合操作组合成更大的操作，这些操作将按顺序依次执行。对于使用 `series()` 和 `parallel()` 组合操作的嵌套深度没有强制限制。

#### 用法

```js
const { series } = require('gulp');

function javascript(cb) {
  // body omitted
  cb();
}

function css(cb) {
  // body omitted
  cb();
}

exports.build = series(javascript, css);
```

### [parallel](https://www.gulpjs.com.cn/docs/api/parallel/)

将任务功能和/或组合操作组合成同时执行的较大操作。对于使用 `series()` 和 `parallel()` 进行嵌套组合的深度没有强制限制。

#### 用法

```js
const { parallel } = require('gulp');

function javascript(cb) {
  // body omitted
  cb();
}

function css(cb) {
  // body omitted
  cb();
}

exports.build = parallel(javascript, css);
```

### [watch](https://www.gulpjs.com.cn/docs/api/watch/)

监听 globs 并在发生更改时运行任务。任务与任务系统的其余部分被统一处理。

#### 用法

```js
const { watch } = require('gulp');

watch(['input/*.js', '!input/something.js'], function(cb) {
  // body omitted
  cb();
});
```



## 启动项目并热更新

### 安装

```shell
npm install --save-dev browser-sync
```

### 使用

在 `gulpfile.js` 文件中配置如下代码

```js
const { series, parallel, src, dest, watch } = require("gulp");
const browserSync = require("browser-sync"); // 启动项目
const reload = browserSync.reload; // 更新页面

// 启动项目
function server() {
  browserSync({
    notify: false, // 关闭通知，页面右上角不会出现弹框
    port: 3000, // 启动 3000 端口
    server: {
      baseDir: ["src"], // 配置根目录，在这个根目录下启动服务器
    },
    callbacks: {
      // 项目启动成功后执行的方法
      ready: () => {
        console.log("开始监控开发文件夹");
        // 设置要监控的页面，当被监控页面发生变化时执行重载方法
        const watcher = watch(["src/**/*.html", "src/**/*.js", "src/**/*.css"]);
        // 监听到变化后执行
        watcher.on("change", () => {
          // 页面变化后执行重载方法
          reload();
        });
      },
    },
  });
}

// 公开 server 任务，执行 gulp server 运行启动任务
exports.server = server;
```

### 运行

然后在控制台中运行 `gulp server` 

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/gulpbuilding/3.png)

运行成功如上图所示，同时自动浏览器

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/gulpbuilding/4.png)

## 压缩 HTML

### 安装

```shell
npm install --save-dev gulp-htmlmin gulp-html-replace
```

### 配置

下面用到的 `gulp-html-replace` 替换文件引用地址,我们需要在 `html` 中需要替换的地方通过注释形式来告诉配置文件我要替换那个地址

标记格式，标记后我们就可以通过标记的名称来对引用地址进行替换

```html
<!-- build:css -->
<link rel="stylesheet" href="./public/css/index.css">
<!-- endbuild -->

<!-- build:js -->
<script src="./public/js/index.js"></script>
<!-- endbuild -->
```

配置代码

```js
const { series, parallel, src, dest, watch } = require("gulp");
const htmlmin = require("gulp-htmlmin"); // 压缩html
const htmlreplace = require("gulp-html-replace"); // 替换文件引用地址
// 配置压缩html的规则
const indexOptions = {
  removeComments: true, // 清除html注释
  collapseWhitespace: true, // 压缩html
  collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> -> <input checked />
  removeEmptyAttributes: true, // 删除所有空格作为属性值 <inpit id=""/> -> <inpit/>
  minifyCss: true, // 压缩页面中的css
  minifyJs: true, // 压缩页面中的js
};

// 压缩打包html
function html() {
  return src(["src/view/**/*.html"])
    .pipe(htmlmin(indexOptions)) // 使用上面定义的压缩配置进行压缩html
    .pipe(dest("dist/html/")); // 将文件写入到 dist/html/ 目录下
}
// 单独处理一下 index.html
function indexhtml() {
  return src("src/index.html")
    .pipe(
      htmlreplace({
        // 替换标记的路径
        css: "css/index.css",
        js: "js/index.min.js",
      })
    )
    .pipe(htmlmin(indexOptions)) // 使用上面定义的压缩配置进行压缩html
    .pipe(dest("dist/"));
}
```

## 压缩 CSS

### 安装

```shell
npm install --save-dev gulp-csso @babel/core
```

### 配置

```js
const { series, parallel, src, dest, watch } = require("gulp");
const csso = require("gulp-csso"); // 压缩css

// 压缩css
function css() {
  return src("src/public/css/**/*.css").pipe(csso()).pipe(dest("dist/css"));
}
```

## 压缩 JS

### 安装

```shell
npm install --save-dev gulp-uglify gulp-babel gulp-rename gulp-string-replace
```

### 配置

```js
const { series, parallel, src, dest, watch } = require("gulp");
const babel = require("gulp-babel"); // 支持es6以及模块化
const uglify = require("gulp-uglify"); // 压缩js代码
const rename = require("gulp-rename"); // 重命名文件
const replace = require("gulp-string-replace"); // 替换字符串

// 压缩js
function js() {
  // 即使这个任务不需要回调，但也要有一个默认的回调方法,也可以return
  // cb();
  return src("src/public/js/*.js")
    .pipe(babel())
    .pipe(uglify()) // 压缩js代码
    .pipe(replace(/assetApi/g, "https://www.gulpjs.com.cn")) // 替换代码中的 "assetApi"
    .pipe(rename({ extname: ".min.js" })) // 将匹配到的文件重名名为xxx.main.js
    .pipe(dest("dist/js/")); // 将文件写入到 dist/js/ 目录下
}
```

## 清空文件

### 安装

```shell
npm install --save-dev gulp-clean
```

### 配置

```js
const { series, parallel, src, dest, watch } = require("gulp");
const clean = require("gulp-clean"); // 清空文件夹

// 清空dist文件夹
function cleans() {
  // 获取到dist文件夹下面的所有文件，进行清空操作
  return src(["./dist/*"]).pipe(clean());
}
```

## 打包代码

新建打包任务

```js
/**
 * 打包任务
 * 私有任务也可以在 series 组合中使用
 * series 是顺序执行多个任务
 * parallel 是平行执行多个任务
 */
const build = series(cleans, js, html, indexhtml, css, function (cb) {
  // 必须要有一个回调方法
  cb();
});

// 公开 build 任务，执行 gulp build 运行打包任务
exports.build = build;
```

在控制台执行 `gulp build `

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/gulpbuilding/5.png)

运行成功后会在根目录下自动生成一个 `dist` 文件夹

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/gulpbuilding/6.png)

我们打开打包好的文件，可以看到配置的一些规则都是生效的

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/gulpbuilding/7.png)

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/gulpbuilding/8.png)

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/gulpbuilding/9.png)

我们在文件中直接双击打开 `dist/index.html`

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/gulpbuilding/10.png)页面可以正常的显示出来，表示路径的引用也是正确的

## 完整的开发依赖包

```js
"devDependencies": {
  "@babel/core": "^7.14.3",
  "browser-sync": "^2.26.14",
  "gulp": "^4.0.2",
  "gulp-babel": "^8.0.0",
  "gulp-clean": "^0.4.0",
  "gulp-csso": "^4.0.1",
  "gulp-html-replace": "^1.6.2",
  "gulp-htmlmin": "^5.0.1",
  "gulp-rename": "^2.0.0",
  "gulp-string-replace": "^1.1.2",
  "gulp-uglify": "^3.0.2",
  "gulp-webserver": "^0.9.1"
}
```

## 完整的配置代码

```js
const { series, parallel, src, dest, watch } = require("gulp");
const babel = require("gulp-babel"); // 支持es6以及模块化
const uglify = require("gulp-uglify"); // 压缩js代码
const rename = require("gulp-rename"); // 重命名文件
const clean = require("gulp-clean"); // 清空文件夹
const csso = require("gulp-csso"); // 压缩css
const htmlmin = require("gulp-htmlmin"); // 压缩html
const gulpServer = require("gulp-webserver"); // 启动项目
const htmlreplace = require("gulp-html-replace"); // 替换文件引用地址
const replace = require("gulp-string-replace"); // 替换字符串
const browserSync = require("browser-sync"); // 启动项目
const reload = browserSync.reload; // 更新页面

// 配置压缩html的规则
const indexOptions = {
  removeComments: true, // 清除html注释
  collapseWhitespace: true, // 压缩html
  collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> -> <input checked />
  removeEmptyAttributes: true, // 删除所有空格作为属性值 <inpit id=""/> -> <inpit/>
  minifyCss: true, // 压缩页面中的css
  minifyJs: true, // 压缩页面中的js
};

// 清空dist文件夹
function cleans() {
  // 获取到dist文件夹下面的所有文件，进行清空操作
  return src(["./dist/*"]).pipe(clean());
}

// 压缩js
function js() {
  // 即使这个任务不需要回调，但也要有一个默认的回调方法,也可以return
  // cb();
  return src("src/public/js/*.js")
    .pipe(babel())
    .pipe(uglify()) // 压缩js代码
    .pipe(replace(/assetApi/g, "https://www.gulpjs.com.cn")) // 替换代码中的 "assetApi"
    .pipe(rename({ extname: ".min.js" })) // 将匹配到的文件重名名为xxx.main.js
    .pipe(dest("dist/js/")); // 将文件写入到 dist/js/ 目录下
}

// 压缩打包html
function html() {
  return src(["src/view/**/*.html"])
    .pipe(htmlmin(indexOptions)) // 使用上面定义的压缩配置进行压缩html
    .pipe(dest("dist/html/")); // 将文件写入到 dist/html/ 目录下
}

// 单独处理一下 index.html
function indexhtml() {
  return src("src/index.html")
    .pipe(
      htmlreplace({
        // 从注释标记中获取要替换的路径
        css: "css/index.css",
        js: "js/index.min.js",
      })
    )
    .pipe(htmlmin(indexOptions)) // 使用上面定义的压缩配置进行压缩html
    .pipe(dest("dist/"));
}

// 压缩css
function css() {
  return src("src/public/css/**/*.css").pipe(csso()).pipe(dest("dist/css"));
}

// 启动项目
function server() {
  browserSync({
    notify: false, // 关闭通知，页面右上角不会出现弹框
    port: 3000, // 启动 3000 端口
    server: {
      baseDir: ["src"], // 配置根目录，在这个根目录下启动服务器
    },
    callbacks: {
      // 项目启动成功后执行的方法
      ready: () => {
        console.log("开始监控开发文件夹");
        // 设置要监控的页面，当被监控页面发生变化时执行重载方法
        const watcher = watch(["src/**/*.html", "src/**/*.js", "src/**/*.css"]);
        // 监听到变化后执行
        watcher.on("change", () => {
          // 页面变化后执行重载方法
          reload();
        });
      },
    },
  });
}

/**
 * 打包任务
 * 私有任务也可以在 series 组合中使用
 * series 是顺序执行多个任务
 * parallel 是平行执行多个任务
 */
const build = series(cleans, js, html, indexhtml, css, function (cb) {
  // 必须要有一个回调方法
  cb();
});

// 公开 server 任务，执行 gulp server 运行启动任务
exports.server = server;
// 公开 build 任务，执行 gulp build 运行打包任务
exports.build = build;
```

