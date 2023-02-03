---
title: Git 操作
tags: git
categories: git常用操作
abbrlink: c73a59f9
date: 2021-01-14 00:00:00
swiper_index: 4 #置顶轮播图顺序，非负整数，数字越大越靠前
---

{% note info no-icon %}

- Git 是什么？
- Git 是目前世界上最先进的分布式版本控制系统（没有之一）。
- Git 有什么特点？简单来说就是：高端大气上档次！
  {% endnote %}

## git 安装

首先进入 Git 官网直接下载[安装程序](https://git-scm.com/downloads)，然后按默认选项安装即可。安装完成后，在开始菜单里找到“Git”->“Git Bash”，蹦出一个类似命令行窗口的东西，就说明 Git 安装成功！
![/hexoblog/images/0.jpg](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/sourceimages/git0.jpg)

安装完成后，还需要最后一步设置，在命令行输入：

```js
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```

因为 Git 是分布式版本控制系统，所以，每个机器都必须自报家门：你的名字和 Email 地址。你也许会担心，如果有人故意冒充别人怎么办？这个不必担心，首先我们相信大家都是善良无知的群众，其次，真的有冒充的也是有办法可查的。

注意 git config 命令的--global 参数，用了这个参数，表示你这台机器上所有的 Git 仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和 Email 地址。

## 生成/添加 SSH 公钥

Gitee 提供了基于 SSH 协议的 Git 服务，在使用 SSH 协议访问仓库仓库之前，需要先配置好账户/仓库的 SSH 公钥。

你可以按如下命令来生成 sshkey:

```js
ssh-keygen -t rsa -C "xxxxx@xxxxx.com"
```

注意：这里的 xxxxx@xxxxx.com 只是生成的 sshkey 的名称，并不约束或要求具体命名为某个邮箱。
现网的大部分教程均讲解的使用邮箱生成，其一开始的初衷仅仅是为了便于辨识所以使用了邮箱。

按照提示完成三次回车，即可生成 ssh key。通过查看 ~/.ssh/id_rsa.pub 文件内容，获取到你的 public key

```js
// 查看获取的public key
cat ~/.ssh/id_rsa.pub
```
![3-2](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/sourceimages/git1.png)

## git 克隆仓库代码并完成推送

```js
// 克隆仓库代码
git clone git@gitee.com:xxxxxxxxxxgit

// 推送先从仓库拉去最新代码
git pull

// 拉取成功后提交自己的代码
git add .

// 输入本次修改的内容
git commit -m "本次提交的内容"

// 推送代码到具体分支
git push origin master(推送分支名称)

// 推送代码到当前分支
git push
```

## git 新建分支与合并

```js
// 查看所有分支，当前分支*号标记
git branch

// 创建并切换到 bugFix 分支
git checkout -b bugFix

// 删除 bugFix 分支
git branch -d bugFix

// 将 bugFix 分支的内容合并到当前分支
git merge bugFix
```

## git 查看提交日志与回滚

```js
// 查看提交记录
git log
```
![3-3](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/sourceimages/git2.png)

```js
// 找到你需要回滚的commitId,输入git reset --hard{commitId},将本地文件回滚:
git reset --hard 70438034dc4c4551910fe9c39ab65752e3dd7bd9

// 此时本地文件就已回到了commit 70438034dc4c4551910fe9c39ab65752e3dd7bd9 之后的状态，
// 但是远程的仓库里并没改变，执行下面代码表示将远程仓库的代码回滚到了历史版本
git push -f

// 再次查看提交记录，第一个记录就是回滚的操作记录
git log
```

## 创建标签

### 查看所有标签

```shell
git show tag
```

### 创建一个轻量标签

轻量标签只会记录当前标签的创建时间

```shell
git tag <tagname>
```



![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/sourceimages/git3.png)

### 在历史提交的记录上打标签

```shell
git tag <tagname> f52c633
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/sourceimages/git4.png)

### 创建一个附注标签

通常我们推荐打这种标签

```shell
git tag -a <tagname> -m "version 0.1 released"
```

### 查看标签信息

```shell
git show <tagname>
```

如果查看的是带说明的标签，则会吧这个标签对应的提交信息也会展示出来

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/sourceimages/git5.png)

### 删除本地标签

默认我们打的标签保存在本地，没有推送到远端，所以我们可以安全的删除本地标签

```shell
git tag -d <tagname>
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/sourceimages/git6.png)

此时再查询所有标签就没有 v0.2 这个标签了

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/sourceimages/git7.png)

### 将本地标签推送到远端

```shell
git push origin <tagname>
```

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/sourceimages/git8.png)

我们将 v1.0 推送到了远端，此时我们在网页中可以查看到这个标签

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/sourceimages/git9.png)

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/sourceimages/git10.png)

### 批量推送本地标签

```shell
git push origin --tags
```

上述命令表示将本地所以没有推送的标签批量推送到远端

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/sourceimages/git11.png)

我们可以前往查看

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/sourceimages/git12.png)

### 删除远端标签

删除远端标签需要先删除对应的本地标签

```shell
git tag -d <tagname>
```

然后执行对应的删除命令

```shell
git push origin :refs/tags/<tagname>
```

操作如下图

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/sourceimages/git13.png)

此时再去远端查看是否删除

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/sourceimages/git14.png)

可以看到远端已经没有 v1.0 标签了