---
title: 02Java基本语法
tags: Java
categories: Java基础
abbrlink: fe76d55d
date: 2022-02-12 21:06:47
---

## 关键字和保留字

### 关键字

关键字含义：被 Java语言赋予了特殊含义，用作专门用途的字符串

关键字的特点：关键字所有字母都是小写

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/java02/1.png)

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/java02/2.png)

### 保留字

在现在的 Java 版本中没有用到，但是在后续版本中可能会被用到的

- `goto`
- `const`

虽然在现在的 Java 版本中没有当做关键字来使用，但我们仍然要避免将他们作为一个变量来使用

## 标识符的命名规则

定义：凡是可以自己定义起名字的都叫做标识符

标识符的命名规则

- 由26个英文字母大小写，0-9，_ 或者 $ 组成
- 不能以数字开头
- 不可以使用关键字和保留字，但是可以包含关键字和保留字
- Java中严格区分大小写，长度无限制
- 标识符中不能包含空格

## 名称命名规范

- 包名：多单词组成时，所有字母都是小写 `xxxyyyzzz`
- 类名、接口名：多单词组成时，所有单词的首字母大写 `XxxYyyZzz`
- 变量名、方法名：多单词组成时，第一个单词的首字母小写，第二个单词开始首字母大写` xxxYyyZzz`
- 常量名：所有单子的字母都是大写，多单词组成时用下划线链接 `XXX_YYY_ZZZ`
- 命名要见名知意

## 变量定义

```java
class VariableTest
{
	public static void main(String[] args){
		// 定义个整形的变量，并且赋值一个默认 10 
		int myAge = 10;
		System.out.println(myAge);

		// 定义一个整形的变量
		int myNumber;
		// 给上面定义的变量赋值 1001
		myNumber = 1001;
		System.out.println(myNumber);

		// 编译错误：找不到符号
		// System.out.println(myName);
		// String myName = "张三";

		// 编译错误：已在方法 main(String[])中定义了变量 myAge
		// int myAge;
		
	}
}
```

使用变量的注意事项：

- Java 中的变量必须先声明，后使用
- 每个变量都有一个作用域，作用域范围限定在一堆大括号中 {}
- 变量只在自己的作用域内有效，不能访问其他作用域内的便令
- 在同一作用域内容不能声明同名的便令，也就是说同一作用域内变量只能被声明一次

## 数据类型

### 基本数据类型

- 整数类型
  - `byte `（长度限制在 -128 ~ 127 内）  byte = 1 字节 = 8 bit
  - `short`  short = 2 字节
  - `int`  int = 4 字节
  - `long` long = 8 字节。声明 long 类型的变量时结尾必须加上一个大写或者小写的 L
- 浮点类型
  - `float`,单精度，可以精确到小数点后 7 为，声明 float 变量时结尾必须加上一个小写或者大写的 F
  - `double`，双精度，精度是 float 的两倍，Java中声明的浮点数默认是 double
- 字符型
  - `char `，给 char 类型赋值时必须使用单引号，并且只能声明一个 字符，一个字符 = 2字节
- 布尔型
  - `boolean`

### 引用数据类型

- 类 `class` ,命名都是字符串
- 接口 `interface`
- 数组 `[]`

### 基本使用

```java
class  DataType
{
	public static void main(String[] args){
		byte b = -128;
		byte b1 = 127;
		// byte b2 = 128; 编译报错，超出了最大的长度
		System.out.println(b);
		System.out.println(b1);

        short s1 = 666;
		System.out.println(s1);

		int i1 = 888;
		System.out.println(i1);

		long l = 54654546554L; // 给 long 类型的变量赋值时末尾要加上一个大写的 L 
		System.out.println(l);

		// 给 float 类型的变量赋值时，结尾需要加上大写的 F 或者小写的 f
		float f = 12.12345678F; // float 最多可以精确到小数点后7位,超出部分四舍五入，

		System.out.println(f); // 12.123457 

		float f1 = 12.87654321F; // 最多可以精确到小数点后7位,超出部分四舍五入
		System.out.println(f1); // 12.876543

		double d = 5654.2515;
		System.out.println(d);
	}
}
```

## 自动类型提升

不同类型之间发生计算时，从大到小的排序为

byte、char、short  --> int --> long --> float --> double

特别的：当 byte、char、short 这三种类型发生计算时，结果都要用 int 来接收

```java
/*
	byte、char、short ---> int ---> long ---> float ---> double
	特别的：当 byte char shor 三种类型做运算时，结果都是 int 类型
			这三中类型中同类型的数据做运算也是 int 类型
*/


class AutoType
{
	public static void main(String[] args) 
	{
		byte b1 = 12;
		int i1 = 16;
		int i = b1 + i1;
		// 当容量小的数据类型的变量与容量大的数据类型做运算时
		// 结果自动提升为容量大的数据类型
		System.out.println(i);

	    int i2 = 123;
		float f1 = i2;
		double d1 = i2;
		// 当吧一个整型的数据赋值给浮点类型数据时
		// 结果会自动添加一个 .0
		System.out.println(f1); // 123.0
		System.out.println(d1); // 123.0
 

		// char 类型和 short 类型相加时要用 int 类型来接收
		char c1 = 2;
		short s1 = 30;
		int i3 = c1 + s1;
		System.out.println(i3);
	}
}
```

## 强制类型转换

类型转换表示将一个类型的数据转换成另外一个类型的数据

```java
/*
	需要使用强转符 ()
	里面是我们要转换的类型
	注意点：强制类型转换可能会造成精度损失
*/

class ChangeType 
{
	public static void main(String[] args) 
	{
		double d1 = 12.8;
		// 在变量前添加一个括号，里面是要强制转换的类型
		// 强制类型转换可能会造成精度损失
		// 小数点后面不会进行四舍五入，而是直接截取小数点后面的内容
		int i1 = (int)d1;
		// 造成了精度损失
		System.out.println(i1); // 12

		long l1 = 123;
		// 如果强制转换的内容没有超出最大限制，则不会造成精度损失
		short s1 = (short)l1;
		// 没有造成精度损失
		System.out.println(s1); // 123
	}
}
```

## 变量声明特殊情况

声明 long 类型的变量时如果结尾没加 L ，则系统默认认为这是一个 int 类型的数据，当数据大小超出 int 最大长度时则会导致编译失败，此时我们应该在结尾处加上 L

声明 float 类型的变量时结尾不加 F，会默认当做 double 数据去解析，但是 double 类型转 float 类型同样会导致编译失败

```java
class variable 
{
	public static void main(String[] args) 
	{
		// 当long类型不加l时会默认认为这是一个int类型
		long l = 2132321;
		System.out.println(l);

		// long l2 = 54654564545456456465; 编译出错，当long类型不加l时，长度超过了int类型的长度
		// 就会导致编译失败
		// System.out.println(l2);

		double l3 = 5465456454465L; // 在后面加上 L 
		System.out.println(l3);

		// double 类型转成 float 类型会编译失败
		// float f1 = 12.2; // 不加 F 默认是 double 类型
		// System.out.println(f1);

		float f2 = 12.2F;
		System.out.println(f2);
	}
}
```

## String类型变量的使用

- String 是引用数据类型，翻译为 字符串
- 声明 String 类型时使用一对 ""
- String 类型可以和其他8中数据类型做链接运算，也就是+运算，得到的结果类型都是 string 类型

```java
/*
1.string 数据类型是一种引用数据类型，简称字符串
2.声明string变量时，使用一对 ""
3.string类型可以和其他8种数据类型最连接运算操作， + 表示连接运算

*/
class StringType
{
	public static void main(String[] args) 
	{
		String name = "班级：";
		int number = 1001;
		String info = name + number; 
		System.out.println(info); //=> 班级：1001

		String no = "";//可以声明一个空的
		//char a = '';//char不能声明一个空值
	}
}
```

## 多进制的表示方式(了解)

- 二进制：0 或者 1 ，满 2 进 1 ，用 `0b` 或者 `0B` 表示
- 十进制：0~9 满10进1
- 八进制：0~7 满8进1，用数字 0 开头表示
- 十六进制：0~9及A~F，满16进1，以 `0x` 或者 `0X`开头表示，此处的 A~F 不区分大小写如：`0x21AF `，`0x21B0`
- 十进制转换成二进制：让一个数除以2，的出来的商继续除以2，最终取余的逆序

```java
/*
不同进制的表示方式：
二进制：0 或者 1 ，满 2 进 1 ，用 0b 或者 0B 表示
十进制：0~9 满10进1
八进制：0~7 满8进1，用数字0开头表示
十六进制：0~9及A~F，满16进1，以0x或者0X开头表示，此处的 A~F 不区分大小写
	如：0x21AF 0x21B0

十进制转换成二进制：让一个数除以2，的出来的商继续除以2，最终取余的逆序

*/

class  BinaryTest
{
	public static void main(String[] args) 
	{
		int i1 = 0b0101;
		int i2 = 12345;
		int i3 = 0542;
		int i4 = 0x21A5F2B1;

		System.out.println(i1); //=> 5
		System.out.println(i2); //=> 12345
		System.out.println(i3); //=> 354
		System.out.println(i4); //=> 564523697
	}
}
```

