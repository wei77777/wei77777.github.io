---
title: 01Java语言概述
tags: Java
categories: Java基础
abbrlink: 3d67816f
date: 2022-02-12 20:23:01
---

## 基础的 dos 命令

- dir  列出当前目录下的文件以及文件夹
- md 创建目录
- rd 删除空的目录
- cd 进入到指定目录
- cd.. 返回上一级
- cd / 返回到根目录
- del 删除文件夹
- del *.txt 删除所有以 txt 结尾的文件
- exit 推出 dos 命令行
- echo helloword>1.txt 将 helloword 写入到 1.txt 文件中

## jdk安装和配置

jdk各个版文的下载地址 https://www.jdkdownload.com/

- 打开网址后选择下图中标注的版本

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/java01/1.png)

- 1.首先在要安装的目录中新建两个文件夹 jdk1.8 和 jre1.8

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/java01/2.png)

- 2.双击下载好的 exe 文件，进行安装，首先安装的是 jdk ，我们选择安装到新建的 jdk1.8 文件中

- 3.在安装过程中会额外安装一个 jre，这里我们也改变安装地址到 jre1.8 文件中

- 4.安装好之后两个文件夹的内容分别如下

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/java01/3.png)



![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/java01/4.png)

- 5.然后配置系统环境变量，打开环境变量：此电脑右键 -->  属性 -->  高级系统设置 --> 环境变量 

- 6.首先新建变量名 **JAVA_HOME**（注意全大写）,变量值是jdk的文件夹地址，我的是 **D:\Program Files\java\jdk1.8**，新建完成后点击确定

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/java01/5.png)

- 7.接着点击新建添加 **CLASSPATH** 变量名，变量值为 **.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar;** 注意前面的一个 . 和末尾的 ;

  ![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/java01/6.png)

- 8.然后双击 path ，在弹出的框中一次添加下面两个地址

  - %JAVA_HOME%\bin

  - %JAVA_HOME%\jre\bin

    ![image-20210513093958721](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/java01/7.png)

- 9.全部配置完成后打开 cmd 依次输入 java -version ，javac -version

  ![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/java01/9.png)

- 10.看到上图中的版本号，表示 java 环境安装成功

## Hello Word

首先新建 `HelloWorld.java `文件，内容如下

```java
class HelloChina{
    public static void main(String[] args){
        System.out.println("Hello World!");
    }
}
```

然后需要将源文件编译成字节码，交给 java 执行

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/java01/8.png)

在源文件目录下执行 `javac HelloWorld.java`，执行成功后会自动生成一个名称是代码中定义的类名后缀是 `class` 的文件

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/java01/10.png)

然后是 `java` 执行 `class` 文件，注意不带路径斜杠和后缀名。执行后成功打印出 `Hello World!`

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/java01/11.png)

## 注释 Comment

java 语言中有三种注释

	- 单行注释
	- 多行注释
	- 文档注释（java语言特有）

### 单行注释

单行注释使用两个斜杠表示

```java
// 单行注释：main 方法作为入口方法，固定格式如下
```

### 多行注释

多行注释使用 /* xxxxx */

```java
 /*
      多行注释：
      prontln 打印一个内容
      结尾一定要加上英文的分号
*/
```

### 文档注释

格式如下

```java
/**
	@author 指定程序的作者
	@version 指定程序版本
	...
*/
```

文档注释的内容可以被 JDK 提供的工具 javadoc 所解析，生成一套以网页文件形式体现的该程序的说明文档

首先编写如下代码，**当我们使用文档注释时，类的前面要加一个 public** 

```java
/**
    文档注释
    @author szx
    @version v1.0
    这是我的第一个 java 程序
*/

public class class1{
    // 单行注释：main 方法作为入口方法，固定格式如下
    /**
        这个程序的入口方法
     */
    public static void main(String[] args){
        /*
            多行注释：
            prontln 打印一个内容
            结尾一定要加上英文的分号
         */
        System.out.println("hello world");
    }
}
```

然后使用 javadoc 解析，下面命令中的每个参数意义：

	-  -encoding utf-8 ：可以解决指定中出现的错误: 编码GBK的不可映射字符
	-  myJavaDoc：存放 html 文件的文件夹名称
	-  1.java：末尾的文件是我们要进行解析的文件

```shell
javadoc -encoding utf-8 -d myJavaDoc -author -version 1.java
```

执行完成后生成一个 myJavaDoc 的文件夹

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/java01/12.png)

打开选择 index.html 文件打开就可以看到我们这个程序的文档说明

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/java01/13.png)

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/java01/14.png)

## 阶段总结

### 将源文件编译成字节码文件

```shell
javac 1.java
```

编译成功后自动生成一个类文件

### 执行字节码文件

执行字节码文件时不需要携带后缀

```shell
java HelloWorld
```

### 使用javadoc生成文档

```shell
javadoc -d myJavaDoc -author -version 1.java
```

### 唯一的public

一个源文件中只能给一个类前面添加 public，并且这个类名要和源文件名相同，否则会编译失败

### 固定的 main() 方法

main() 方法的格式是固定的

```java
public class HelloWorld{
	// main 方法是入口方法
	public static void main(String[] args) 
	{
		/*
			打印一个 Hello World
		*/
		System.out.println("Hello World!");
	}
}
```

### 输出语句

- `System.out.println("换行输出");` println 表示先输入后换行
- `System.out.print("不换行输出");` 不换行输出

### 同时存在多个类

源文件中可以声明多个类，在编译时会生成多个类文件，每个类中都包含一个 main() 方法

### 不可缺少的分号

`java` 代码中每行代码结尾都必须添加分号，左括号的情况除外

## 阶段测试

### JDK，JRE，JVM三者之间的关系，以及 JDK，JRE包含的主要结构有哪些

答：

JDK = JRE + Java的开发工具（javac.exe、java.exe、javadoc.exe）

JRE = JVM + Java开发核心类库