---
title: 04Java流程控制
tags: Java
categories: Java基础
abbrlink: f39ff75c
date: 2022-02-12 21:09:30
---

## if else 基本使用

if else 有三种形式

- 单选一
- 二选一
- 多选一

```java
class IfElse {
	public static void main(String[] args) 
	{
		int age = 60;
		// 只有一种结果
		if(age > 18){
			System.out.println("已经成年了");
		}

		// 二选一
		if(age > 18){
			System.out.println("已经成年了");
		}else{
			System.out.println("未成年");
		}

		// 多选一
		if(age < 18){
			System.out.println("未成年");
		}else if(age < 35){
			System.out.println("青年");
		}else if(age < 60){
			System.out.println("中年");
		}else if(age < 120){
			System.out.println("老年");
		}else{
			System.out.println("墓年");
		}
	}
}
```

## Scanner基本使用

首先导入 Scanner 包

然后实例化

最后使用不同的类型接收不同类型的变量

```java
/*
	使用 Scanner 可以获取到从键盘输入的值
	next() 输入字符串类型
	nextInt() 输入int类型
	nextDouble() 输入浮点类型
	nextBoolean() 输入布尔类型
*/

import java.util.Scanner;

class ScannerTest {
	public static void main(String[] args) {
		// 实例化 Scanner
		Scanner sc = new Scanner(System.in);
		
		System.out.println("请输入您的姓名");
		// 输入字符串
		String name = sc.next(); 

		System.out.println("请输入您的年龄");
		// 输入整形
		int age = sc.nextInt();

		System.out.println("请输入您的体重");
		// 输入浮点类型
		double weight = sc.nextDouble();

		System.out.println("是否看上眼（false/true）");
		// 输入布尔类型
		boolean islove = sc.nextBoolean();

		// 打印最终结果
		System.out.println("姓名：" + name + "," + "年龄：" + age + "," + "体重：" 
			+ weight + "," + "是否满意：" + islove);

	}
}
```

## SwitchCase使用

基本语法结构

```java
switch(判断语句){
	case 条件1:
		break;
	case 条件2:
		break;
	default:
		break;
}
```

连续判断语法结构

```java
switch(判断语句){
	case 条件1:				
	case 条件2:
		
		break;
	default:
		break;
}
```

switch 判断只能值如下6中数据类型

- byte
- short
- char
- int
- 枚举类型（sdk5.0新增）
- String类型 （sdk7.0新增）

case 只能声明一个常量，不能声明范围

break 字段是可选的，case 判断遇到 break 时会退出判断，如果没有 brea 则一直往下判断

default 当所有的 case 都没有判断成功时会进入到 default 中，相当于 if else 中的 else

代码示例

```java
import java.util.Scanner;
class SwitchCase{
	public static void main(String[] args){
		Scanner sc = new Scanner(System.in);
        
		System.out.println("请输入1~10");
		int num = sc.nextInt();	
		/*
			// 判断单个值
			switch(num){
				case 1:
					System.out.println("one");
					break;
				case 2:
					System.out.println("two");
					break;
				default:
					System.out.println("出错了");
					break;	
			}		
		*/

		// 连续判断多个值
		switch(num){
			case 1:			
			case 2:
				System.out.println("你输入了1或者2");
				break;
			default:
				System.out.println("出错了");
				break;	
		}
				
	}
}
```

## 循环结构

循环结构：在某些条件满足的情况下，反复执行一段特定的代码

Java中有三种循环结构

- for循环
- while循环
- do while 循环

所有循环结构都有下面四要素

1. 初始化条件
2. 循环条件 **类型要求为布尔类型**
3. 循环体
4. 迭代条件

## For 循环

for 循环结构

```java
1.初始化条件
2.循环条件 必须是一个布尔值
3.循环体
4.迭代条件
    
for(1;2;4){
    3
}
```

执行方式： 1 -> 2 -> 3 -> 4 -> 2 -> 3 -> 4 -> ... -> 2(不满足) -> 退出循环

代码示例

```java
class For{
	public static void main(String[] args){
		/*
			小例子：输出100以内的偶数个数，并计算总和
		*/
		int sum = 0;
		for(int i=1; i <= 100; i++){
			if(i % 2 == 0){
				sum += i;
				System.out.println(i);
			}
		}
		System.out.println("100以内的偶数总和为" + sum);
	}
}
```

## While 循环

while 循环结构

写 while 循环时一定要注意防止死循环

```java
1.初始化条件
2.循环条件 必须是一个布尔值
3.循环体
4.迭代条件

1;
while(2){
	3;
	4;
}
```

执行过程 1 -> 2 -> 3 -> 4 -> 2 -> 3 -> 4 -> ... -> 2(不满足) -> 退出循环

代码演示

```java
class While {
	public static void main(String[] args){		
		int i = 1;
		while(i <= 100){
			System.out.println(i);
			i++;
		}
		//=> 101,因为在最后一次循环后又对 i 进行加加，此时i已经变成了101，不满足条件退出循环
		System.out.println(i); 
	}
}
```

## Do While 循环

```java
do while 循环结构
1.初始化条件
2.循环条件 必须是一个布尔值
3.循环体
4.迭代条件


1;
do{
	3;
	4;
}while(2)
```

执行循序 1 - 3 - 4 - 2 - 3 - 4 - 2 - 3 - 4 - ... - 2(不满足) - 退出循环

do while 循环特定，不管条件是否成立，至少会执行一次循环体

```java
class DoWhile 
{
	public static void main(String[] args) 
	{
		int i = 1;
		do{
			System.out.println(i);
			i++;
		}while(i <= 100);
	}
}
```

## 无限次循写法

无限次循环方式

```java
// 方式一
for(;;){
    无限循环
    break; // 遇到 break 退出循环
}

// 方式二
while(true){
    无限循环
    break; // 遇到 break 退出循环
}
```

练习题：从键盘输入任意数量的数字，记录并输出正数个数和负数个数，遇到0则退出

```java
import java.util.Scanner;
class ForWhile {
	public static void main(String[] args) 
	{
		Scanner sc = new Scanner(System.in);
		int positiveNumber = 0; // 记录正数个数
		int negativeNumber = 0; // 记录负数个数
		for(;;){ // 无限循环方式二
		//while(true){ // 无限循环方式一
			int number = sc.nextInt();			
			if(number > 0){
				positiveNumber++;
			}else if(number < 0){
				negativeNumber++;
			}else{
				break; // 退出循环
			}
		}
		System.out.println("正数个数为" + positiveNumber);
		System.out.println("负数个数为" + negativeNumber);
	}
}
```

## 嵌套循环

嵌套循环表示循环里面套循环，例如 For 循环里面嵌套 While 循环，While 循环里面嵌套 For 循环。

我们把外面的循环称为外层循环，吧里面的循环称之为内层循环。

外层循环循环 n 遍，内层循环循环 m 遍，则内层循环一共循环 n * m 遍。

代码演示

```java
class ForFor{
	public static void main(String[] args) {
		/*
			下面代码输出结果
			*
			**
			***
			****
			*****
		*/
		for(int i = 1; i <= 5; i++){
			for(int j = 1; j <= i; j++){
				System.out.print("*");
			}
             // 外层循环循环一遍后换行
			System.out.println();
		}
        
        /*
			下面代码输出结果
			*****
			****
			***
			**
			*
		*/
		for (int i = 1;i <= 5; i++){
			for (int j = 1;j <= 6 - i; j++){
				System.out.print("*");
			}
			// 外层循环循环一遍后换行
			System.out.println();
		}
	}
}
```

### 使用嵌套循环输出菱形

```java
/*
	思考题：
	使用嵌套循环循环输出一个菱形
	     *
		* *
	   * * *
	  * * * *
	 * * * * *
	  * * * *
	   * * *
		* *
		 *
*/

class ForForTest {
	public static void main(String[] args) {
		// 处理上半部分
		for (int i = 1; i <= 5; i++){
			// 先循环出左侧的空格
			for (int j = 1; j <= 6-i; j++){
				System.out.print(" ");
			}
			// 在空格后面输出星号
			for (int k = 1; k <= i; k++){
				System.out.print("* ");
			}
			System.out.println();
		}
		// 处理下半部分
		for(int i = 1; i <= 4; i++){
			// 处理左侧空格
			for(int j = 1; j <= i; j++){
				System.out.print(" ");
			}
			// 在空格后面处理星号
			for(int k = 1; k <= 5 - i; k++){
				System.out.print(" *");
			}
			System.out.println();
		}
	}
}

```

### 输出九九乘法表

```java
/*
	实现九九乘法表
	1*1=1
	2*1=2 2*2=4
	3*1=3 3*2=6 3*3=9
	4*1=4 4*2=8 4*3=12 4*4=16
	5*1=5 5*2=10 5*3=15 5*4=20 5*5=25
	6*1=6 6*2=12 6*3=18 6*4=24 6*5=30 6*6=36
	7*1=7 7*2=14 7*3=21 7*4=28 7*5=35 7*6=42 7*7=49
	8*1=8 8*2=16 8*3=24 8*4=32 8*5=40 8*6=48 8*7=56 8*8=64
	9*1=9 9*2=18 9*3=27 9*4=36 9*5=45 9*6=54 9*7=63 9*8=72 9*9=81
*/
class JiuJiu {
	public static void main(String[] args) {
		for(int i = 1; i <= 9; i++){
			for(int j = 1; j <= i; j++){
				System.out.print(i + "*" + j + "=" + i * j + " ");
			}
			System.out.println();
		}
	}
}
```

### 输出100以内所有的质数

质数：只能被自己和1整除的自然数

例如：7，7只能被自己和1整除，所以7就是一个质数。15:15可以被3和5整数，也可以被1和15整除，所以15不是一个质数

最小的质数是2

```java
/*
	输出100以内的所有质数
	质数：只能被自己和1整除的自然数
	例如：7 只能被 7 和 1 整数，15 可以被 1 和 15 整除，也可以被 3 和 5 整除
	最小的质数是 2 

	解题思路：从2开始，到这个数-1为止，这中间的所有数都不能整除这个数
*/
class ZhiShu {
	public static void main(String[] args){
		Boolean isFlag = true; // 声明一个初始状态用来判断这个数是不是一个质数
		for(int i = 2; i <= 100; i++){
			for(int j = 2; j <= i -1; j++){
				// 判断从2到这个数-1中间是否有被整除的
				if( i % j == 0){
					isFlag = false; // 如果有一个被整除了则这个数不是质数
				}
			}
			if(isFlag){
				System.out.println(i);
			}
			isFlag = true; // 重置质数状态
		}
	}
}
```

### 输出质数问题的代码优化

```java
/*
	优化超大范围内获取质数的逻辑
	优化前：19147 毫秒
	优化一：如果判断不是一个质数后就直接break退出循环。 运行结果：2618 毫秒
	优化二：不让 j < i,而是让 j 小于根号 i ,根号 i 表示为：Math.sqrt(i)。 运行结果 1489 毫秒

	我们不让程序实时输出获取到的质数，而是记录质数的个数，再来测试
	优化前：14904 毫秒
	优化一：1437 毫秒
	优化二：12 毫秒
*/

class ZhiShu2 {
	public static void main(String[] args){
		long startTime = System.currentTimeMillis(); // 获取1900-01-01 00:00:00 至今的毫秒数
		int count = 0; // 记录质数个数
		Boolean isFlag = true; // 标记一个数是否为质数
		for(int i = 2; i <= 100000; i++){
			for(int j = 2; j < Math.sqrt(i); j++){ // 优化二
				if(i % j == 0){
					isFlag = false;
					break;
				}
			}
			if(isFlag){
				// System.out.println(i); 不让系统输出，因为输出占用了大量时间
				count++;
			}
			isFlag = true;
		}
		long endTime = System.currentTimeMillis();
		System.out.println("质数个数为" + (count));
		System.out.println("程序运行所用时间" + (endTime - startTime));
	}
}
```

### 输出1000以内的所有完数

题目要求：一个数如果恰好等于这个数的因子之和，我们称这个数为一个完数。例如 6 = 1+2+3。因子：除去这个数本身的其他约数



## break和continue关键字的区别

| 关键字   | 使用范围              | 相同点                                       | 不同点       |
| -------- | --------------------- | -------------------------------------------- | ------------ |
| break    | switch case；循环结构 | 都可以在循环结构中使用，关键字后面不能跟代码 | 结束当前循环 |
| continue | 循环结构              | 都可以在循环结构中使用，关键字后面不能跟代码 | 结束当次循环 |

通过代码查看区别

break

```java
for(int i=1; i <= 10; i++){
    if(i % 4 == 0){
        break;
        //System.out.println(i); // break 后面不能再跟代码，否则编译出错
    }
    System.out.println(i); // 1 2 3
}
```

continue

```java
for(int i = 1; i <= 10; i++){
    if(i % 4 == 0){
        continue;
    }
    System.out.println(i); // 1 2 3 5 6 7 9 10
}
```

## 带标签的break和continue使用

```java
class LabelFor {
	public static void main(String[] args){
		// 在 for 循环前面有一个变量声明，表示给这个循环起一个名字
		label:for(int i=1;i<=4;i++){
			for(int j=1;j<=10;j++){
				if(j % 4 == 0){
					// 使用 break 退出指定的循环名称
					break label;
				}
				System.out.print(j);
			}
			System.out.println();
			System.out.print(i);
		}
	}
}
```

