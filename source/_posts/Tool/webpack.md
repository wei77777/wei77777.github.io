---
title: webpack实现前端工程化
tags: webpack
categories: webpack
abbrlink: cffd4497
date: 2021-04-12 08:59:21
---

## 初始化项目
* 1.创建空白目录，执行 `cnpm init` ,填写一些基本问题后生成初始化包管理文件 `packge.json`
* 2.新建 `src` 源码目录
* 3.新建 `src -> index.html` 文件
* 4.初始化首页基本结构
* 5.运行 `npm install jquery -S` 安装 `jquery`

## 安装和配置webpack
* 1.运行 `npm install webpack webpack-cli -S` 安装 `webpack` 相关包
* 2.在根节点新建 `webpack.config.js` 文件
* 3.在 `webpack.config.js` 文件中基本配置
    ```js
    module.exports = {    
        /**
        * mode：编译模式
        * development：开发模式，打包的出来的文件没有经过压缩，体积较大，但是打包速度快
        * production：生产模式，打包出来的文件经过压缩，体积小，但是打包速度慢
        */
        mode:"development"
    }
    ```
* 4.在 `package.json` 文件的 `scripts` 节点下面新增脚本
    `"dev":"webpack"`
* 5.运行 `npm run dev` 进行项目打包操作

## 配置打包的入口和出口
* 1.`webpack 4.x` 中默认约定
    打包的入口文件为 `src -> index.js`
    打包的出口文件为 `dist -> main.js`
* 2.在 `webpack.config.js` 文件中通过配置指定打包的入口文件和出口文件
    ```js
    const path = require("path");
    module.exports = {    
        // 编译模式
        mode:"development",    
        // 打包的入口文件，表示从此目录下进入
        entry:path.join(__dirname,"./src/index.js"),    
        // 打包的出口文件
        output:{
            path:path.join(__dirname,"./dist"),
            //将js文件放在js文件夹中，并使用时间戳命名打包生成的build.js文件，保证每次打包的文件都不一样
            filename: 'js/' + new Date().getTime() + 'build.js'
        }
    }
    ```
* 3.`webpack.config.js` 上方需要引入 `path`

## 配置 npm install webpack-dev-server 自动打包功能
* 1.运行 `npm install webpack-dev-server -D` 命令，安装支持自动打包的工具
* 2.修改 `pack.json -> scripts` 中的 `dev` 命令如下
    `"dev":"webpack-dev-server"`
* 3.将 `src -> index.html` 中 `script` 脚本的引用路径改为 `"/build.js"`
* 4.运行 `npm run dev 命令`，重新进行打包
* 5.在浏览器中访问 `http:localhost:8080` 地址，查看打包效果
  
*注意：`webpack-dev-server` 打包生成的文件是虚拟的，看不到的，不在物理内存中，而在运存中，所以我们也可以正常访问*

## 配置 npm install html-webpack-plugin 生成预览页面
* 1.运行 `npm install html-webpack-plugin -D` 命令安装支持生成预览页面的工具
* 2.修改 `webpack.config.js` 文件头部区域，并添加如下信息
    ```js
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    const htmlplugin = new HtmlWebpackPlugin({
        template: "./src/vue_index.html", // 指定要用到的模板文件
        filename: "index.html", // 指定生成的文件名
        minify: {
            minimize: true, // 打包为最小值
            removeComments: true, // 去除注释
            collapseWhitespace: true, // 去除空格
            minifyJS: true // 压缩html内的js代码       
        },
        hash: true // 加上哈希值避免缓存
    })
    ```
* 3.修改 `webpack.config.js` 文件增加以下节点
    `plugins:[ htmlplugin ]`

## 配置自动打包的相关参数
* 1.在 `package.json` 的 `scripts` 节点下修改 `dev` 的配置如下
    `"dev": "webpack-dev-server --open --host 127.0.0.1 --port 8888"`
* 2.`--open` 打包完成后自动打开浏览器
* 3.`--host 127.0.0.1` 在指定的域名下打开页面
* 4.`--port 8888` 在指定的端口打开页面

## 配置加载器处理 css 文件
* 1.运行 `npm install style-loader css-loader -S` 安装处理 `css` 的工具
* 2.在 `webpack.config.js` 文件中 `module -> rules` 数组中添加如下配置
    ```js
    module:{
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }    
    ```
* 3.在 `src -> css` 文件下新建 `1.css` 文件
* 4.在 `index.js` 文件中引入 `1.css`
* 5.重新启动项目，可以看到正确的加载了 `css` 文件

## 配置加载器处理 less 文件
* 1.运行 `npm istall less-loader less -S` 安装处理 `less` 的文件，其中 `less` 是 `less-loader` 的内置依赖
* 2.在 `webpack.config.js` 文件中 `module -> rules` 数组中添加如下配置
    ```js
    module:{
        rules: [
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader","less-loader"]
            }
        ]
    }
    ```
* 3.在 `src -> css` 文件下新建 `1.less` 文件
* 4.在 `index.js` 文件中引入 `1.less`
* 5.重新启动项目，可以看到正确的加载了 `less` 文件

## 配置加载器处理 scss 文件
* 1.运行 `npm install sass-loader node-sass -S`
* 2.在 `webpack.config.js` 文件中 `module -> rules` 数组中添加如下配置
    ```js
    module:{
        rules: [
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader","sass-loader"]
            }
        ]
    }
    ```
* 3.在 `src -> css` 文件下新建 `1.scss` 文件
* 4.在 `index.js` 文件中引入 `1.scss`
* 5.重新启动项目，可以看到正确的加载了 `scss` 文件

## 配置 postcss 自定添加 css 的兼容前缀
* 1.运行 `cnpm install postcss-loader autoprefixer -S`
* 2.在项目根目录下创建 `postcss.config.js` 并初始化以下配置
    ```js
    const autoprefixer = require("autoprefixer");
    module.exports = {
        plugins:[ autoprefixer ]
    }
    ```
* 3.在 `webpack.config.js` 的 `module -> rules` 数组中，修改 `css-loader` 的规则
    ```js
    module:{
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader","postcss-loader"]
            }
        ]
    }
    ```
* 4.重新运行项目，可以自动兼容不同的浏览器 

## 配置 babel-loader 使 webpack 兼容 js 高级语法
* 1.运行 `cnpm install babel-loader @babel/core @babel/runtime -S` 安装相关工具
* 2.运行 `cnpm install @babel/preset-env @babel/plugin-transform-runtime @babel/plugin-proposal-class-properties -S` 安装相关工具
* 3.在根节点新建 `babel.config.js` 并进行如下配置
    ```js
    module.exports = {
        presets:[ '@babel/preset-env' ],
        plugins:[ '@babel/plugin-transform-runtime','@babel/plugin-proposal-class-properties' ]
    }
    ```
* 4.在 `webpack.config.js -> rules` 数组中添加以下规则
    ```js
    module:{
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
    ```
* 5. `exclude` 的作用过滤某个文件夹，过滤 `node_modules` 文件夹

## 使用 url-loader file-loader 处理图片和字体文件
* 1.运行 `cnpm install url-loader file-loader -S`
* 2.在 `webpack.config.js -> rules` 数组中添加以下规则
    ```js
    module:{
        rules: [
            {
                test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,
                use: 'url-loader?limit=37109'
            }
        ]
    }
    ```
* 3.其中 `|` 表示或者的意思, `?` 表示 `limit` 后面的参数
* 4.`limit` 用来指定图片的大小，单位是字节，只有小于 `limit` 大小的图片，会被转为 `base64`
* 5.不添加 `limit` 参数时会自动将图片转换为 `base64`


## HotModuleReplacementPlugin 模块热更新

此功能为 webpack 自带功能，无需引入额外插件,直接在 `webpack.config.js` 中加入下面代码
```js
const webpack = require('webpack')
const HotModule = new webpack.HotModuleReplacementPlugin()
module.exports = {    
    plugins: [ HotModule ]  
}
```

## clean-webpack-plugin 清理上一次打包的文件夹并生成新的打包文件
* 1.运行 `cnpm install clean-webpack-plugin -S` 安装相关插件
* 2.`webpack.config.js` 中直接加入下面代码
    ```js
    const { CleanWebpackPlugin } = require('clean-webpack-plugin')
    const cleanbuild = new CleanWebpackPlugin()
    module.exports = {    
        plugins: [ cleanbuild ]  
    }
    ```


## mini-css-extract-plugin 将 CSS 提取为独立的文件的插件，对每个包含 css 的 js 文件都会创建一个 CSS 文件
* 1.运行 `cnpm install mini-css-extract-plugin -S` 安装相关插件

* 2.在`webpack.config.js`中配置如下代码
    ```js
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    const ExtractTextPlugin = new MiniCssExtractPlugin({
        // 生成的css文件放置地址以及文件名
        filename: 'css/[name].css',
        chunkFilename: 'css/[id].css',
    })
    ```
* 3.修改 `module -> rules` 的 `css-loader`
    ```js
    module.exports = {    
        plugins: [ ExtractTextPlugin ],
        module: {
            rules: [{
                    test: /\.css$/,
                    use: ["style-loader", {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // 这里可以指定一个 publicPath
                            // 默认使用 webpackOptions.output中的publicPath
                            publicPath: '../'
                        },
                    }, "css-loader", "postcss-loader"]
                }
            ]
        }
    }
    ```

## optimize-css-assets-webpack-plugin 压缩打包生成的 css 代码
* 1.运行 `cnpm install optimize-css-assets-webpack-plugin -S` 安装相关插件
* 2.在 `webpack.config.js` 中配置如下代码
    ```js
    const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
    const optimizecssplugin = new OptimizeCSSAssetsPlugin();
    module.exports = {    
        plugins: [ optimizecssplugin ]  
    }
    ```


## copy-webpack-plugin 自动拷贝项目中引用的静态文件
无需引入，直接使用，在 `webpack.config.js` 中配置如下代码

* form：表示从哪个文件夹下拷贝内容
* to:将内容粘贴到哪个文件夹下
* 如果有多个静态文件需要拷贝，就在 patterns 数组中写多个 form to
```js
const CopyWebpackPlugin = require('copy-webpack-plugin')
const copyplugin = new CopyWebpackPlugin({
    patterns: [
        {            
            from: path.join(__dirname, './src/lib'), 
            to: path.join(__dirname, './dist/lib')
        },
        {
            from:path.join(__dirname,"./src/img"),
            to:path.join(__dirname,"./dist/img")
        }
    ]
})
module.exports = {    
    plugins: [ copyplugin ]  
}
```



## 使用 webpack 下载 vue 3.0 体验最新 vue 
* 1.运行 `cnpm install vue@next -S`
* 2.运行 `cnpm install vue-loader@next @vue/compiler-sfc -S` 安装 `vue.js` 单文件组件的加载器
* 3.在 `webpack.config.js` 头部引入 `vue-loader`
    ```js
    const {VueLoaderPlugin} = require("vue-loader");
    const vueplugin = new VueLoaderPlugin(); 
    ```
* 4.在 `plugins` 数组中添加 `vueplugin` 元素
    ```js
    plugins: [ vueplugin ]
    ```
* 5.在 `webpack.config.js -> rules` 数组中添加以下规则
    ```js
    module:{
        rules: [
            {
                test:/\.vue$/,
                use:"vue-loader"
            }
        ]
    }
    ```
* 6.新建 `src -> vue_index.js` 文件并初始化以下配置
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
        <body>
            <div id="app"></div>
        </body>
    </html>
    ```
* 7.新建 `src -> main.js` 文件并初始化以下配置
    ```js
    import {createApp} from "vue";
    import App from "./App.vue";

    const app = createApp(App);
    app.mount("#app")
    ```
* 8.新建 `src -> App.vue` 文件，在此文件中可以编写 `vue3.0` 的代码了
* 9.修改 `webpack.config.js` 的打包入口文件地址为 `main.js`
  ```js
  entry: path.join(__dirname, "./src/main.js")
  ```
* 10.修改 `webpack.config.js` 的预览页面指定模板文件地址为 `vue_index.html`
    ```js
    const htmlplugin = new HtmlWebpackPlugin({
        template: "./src/vue_index.html", // 指定要用到的模板文件
        filename: "index.html" // 指定生成的文件名
    })
    ```
* 11.重新启动即可