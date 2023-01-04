---
title: 03Java算数运算
tags: Java
categories: Java基础
abbrlink: b9ca155
date: 2022-02-12 21:08:38
---

## 运算符

运算符是一种特殊符号，用来表示数据运算、赋值和比较等操作

- 算术运算符
- 赋值运算符
- 比较运算符（关系运算符）
- 逻辑运算符
- *位运算符*
- 三元运算符

## 常见运算符

| 符号 | 名称                       | 用法                                 |
| ---- | -------------------------- | ------------------------------------ |
| +    | 正号                       | +6                                   |
| -    | 负号                       | -6                                   |
| +    | 加法                       | 3+2                                  |
| -    | 减法                       | 3-2                                  |
| *    | 乘法                       | 3*2                                  |
| /    | 除法                       | 10/2                                 |
| %    | 取模（取余数）             | 10%2=0; 9%2=1                        |
| ++   | 自增（前），先运算，后取值 | a=2; b=++a; b=3                      |
| ++   | 自增（后），选取值，后运算 | a=2; b=a++; b=2                      |
| --   | 自减（前），先运算，后取值 | a=2; b=--a; b=1                      |
| --   | 自减（后），先取值，后运算 | a=2; b=a--; b=2                      |
| +    | 链接操作                   | a="hello"; b="word"; a+b="helloword" |

## 除法和取模

```java
class  NumberTest
{
	public static void main(String[] args){
		// 除法 /
		int a = 12;
		int b = 5;
		int res1 = a / b;
		System.out.println(res1); // => 2; 两个int类型的变量相处得到的还是int类型，所以是一个2

		double res2 = a / (b + 0.0); // => 2.4 int 除以浮点类型得到的是浮点类型
		System.out.println(res2);

		double res3 = (double)a / b;
		System.out.println(res3); // 2.4 使用强转符号将int类型先转成浮点类型

		// 取模（取余数） %；得到的结果正负和被模数的符号相同
		int c = 12;
		int d = 5;
		int m1 = c % d;
		System.out.println(m1); // => 2

		int c2 = -12;
		int d2 = 5;
		int m2 = c2 % d2;
		System.out.println(m2); // => -2

		int c3 = 12;
		int d3 = -5;
		int m3 = c3 % d3;
		System.out.println(m3); // => 2

		int c4 = -12;
		int d4 = -5;
		int m4 = c4 % d4;
		System.out.println(m4); // => -2
	}
}
```

## 获取一个三位数的个位、十位、百位

```java
int i = 256;
int ge = i % 10; //=> 2
int shi = (i % 100) / 10; //=> 5
int bai = i / 100;	//=> 6
```

## 自增和自减

`++`  和 `-- `  分别是自增和自减操作，共同点是都不会改变原有的数据类型，当自增操作单独的在一行称为一行语句时，自增语句在前和在后都是一样的。

- 前 ++ 。先计算，后赋值
- 后 ++ 。先赋值，后计算
- 当 ++ 操作单独在一行时，功能上没有区别，都会自增 1 

```java
class AddRed 
{
	public static void main(String[] args) 
	{
		/*
			前++。先赋值，后计算
			后++。先计算，后赋值
			自增运算不会改变原有的数据类型
		*/
		int a = 10;	
		int b = ++a;
		System.out.println(b); //=> 11

		int a1 = 10;	
		int b1 = a1++;
		System.out.println(b1); //=> 10

		double d1 = 12.3;
		d1++; // or ++d1; // 自增操作在单独一行时，前++和后++效果相同
		System.out.println(d1); //=> 13.3

		byte by1 = 127;
		by1++; // 因为自增不会改变数据类型，所以不会出现编译错误
		System.out.println(by1); //=> -128		
		by1++;
		System.out.println(by1); //=> -127

		int k1 = 10;
		int r1 = --k1;
		System.out.println(r1); // => 9
	}
}
```

## 赋值运算符

```java
/*
	+= -= *= /= %=		
	不会改变原有的数据类型
*/
class SetValue 
{
	public static void main(String[] args) 
	{
		int i1 = 10;
		i1+=1;
		System.out.println(i1); //=> 11

		int i2 = 10;
		i2-=1;
		System.out.println(i2); //=> 9

		int i3 = 10;
		i2*=2;
		System.out.println(i3); //=> 20

		int i4 = 10;
		i4/=2;
		System.out.println(i4); //=> 5

		short i5 = 10;
		i5%=2;
		System.out.println(i5); //=> 0
	}
}
```

## 比较运算符

```java
/*
	比较运算符有：
	== > >= < <= 
	返回的结果只有 false 和 true
*/
class Compare 
{
	public static void main(String[] args) 
	{
		int a = 10;
		int b = 9; 
		System.out.println(a == b); //=> false
		System.out.println(a > b); //=> true
		System.out.println(a >= b); //=> true
		System.out.println(a < b); //=> false
		System.out.println(a <= b); //=> false
	}
}
```

## 逻辑运算符

- &：逻辑与
- &&：短路与
- |：逻辑或
- ||：短路或
- ！：逻辑非
- ^：逻辑异或，当两个不一样时结果是 true

逻辑与和短路与

- 相同点：运算的结果相同
- 不同点：当左边的条件是false时，逻辑与会继续执行右边的判断，短路与不会继续执行右边的判断

逻辑或和短路或

- 相同点：运算的结果相同
- 不同点：当第一个条件时true时，逻辑或会继续判断第二个条件，短路或不会继续判断第二个条件

```java
/*
	逻辑与：&
	短路与：&&
	相同点：运算的结果相同
	不同点：当左边的结果是false时，逻辑与会继续执行右边的判断，短路与不会继续执行右边的判断

	逻辑或：|
	短路或：||
	相同点：运算结果相同
	不同点：当左边的结果是true时，逻辑或会继续执行右边的判断，短路或不会继续执行右边的判断
	
*/
class Logic
{
	public static void main(String[] args) 
	{
		boolean b1 = false;
		int i1 = 1;
		if(b1 & (i1++ > 1)){
			System.out.println("结果为真");
		}else{
			System.out.println("结果为假"); //=> 被打印
		}
		// 因为使用的是逻辑与，即使第一个条件不满足也会继续往后执行
		System.out.println(i1); //=> 2

		boolean b2 = false;
		int i2 = 1;
		if(b2 && (i2++ > 1)){
			System.out.println("结果为真");
		}else{
			System.out.println("结果为假"); //=> 被打印
		}
		// 因为使用的是短路与，第一个条件已经是false了，所以后面的条件不会被执行
		System.out.println(i2); //=> 1

		//**********************

		boolean a1 = true;
		int c1 = 10;
		if(a1 | (c1-- > 11)){
			System.out.println("结果为真");
		}else{
			System.out.println("结果为假"); //=> 被打印
		}
		// 使用的是逻辑或，第一个条件为true的情况下第二个条件仍然被执行
		System.out.println(c1); //=> 9

		boolean a2 = true;
		int c2 = 10;
		if(a2 || (c2-- > 11)){
			System.out.println("结果为真");
		}else{
			System.out.println("结果为假"); //=> 被打印
		}
		// 使用的是短路或，第一个条件为true的情况下第二个条件不会被执行
		System.out.println(c2); //=> 10
	}
}
```

## 位运算

| 表示方法 | 方法描述                                                     |
| -------- | ------------------------------------------------------------ |
| <<       | 空位补0，被移除的高位丢弃，空缺位补0                         |
| \>\>     | 被移位的二进制最高位是0，右移后，空缺位补0,最高位是1，空缺位补1 |
| \>\>\>   | 被移位的最高位无论是0还是1，都用0补                          |

```java
/*
	往左位运算，每移动一位相当于乘以一个2，移动几位就乘以2的几次方
	往右位运算和往左相反，往右位移几位，就除以2的几次方
	位移的长度有限制，不能无限制位移,位移的长度不能超过27，否则正数变成负数，负数变成正数
*/
class Bit 
{
	public static void main(String[] args) 
	{
		int i1 = 10;
		System.out.println(i1 << 1); // => 20,相当于 10 * 2
		System.out.println(i1 << 3); // => 80,相当于 10 * 2^3
		// 位移的长度有限制，不能无限制位移,位移的长度不能超过27，否则正数变成负数，负数变成正数
		System.out.println(i1 << 27); // => 1342177280
		System.out.println(i1 << 28); // => -1610612736

		int i2 = 10;
		System.out.println(i1 >> 1); // => 5,相当于 10 / 2
		System.out.println(i1 >> 2); // => 2,相当于 10 / 2 ^ 2,变成整数就是2		
	}
}
```

## 三元运算符

- 表达方法：（条件表达式）? 表达式1 : 表达式2

- 条件表达式的结果是true或者false

- 当条件是true时执行表达式1

- 当条件时false时执行表达式2

- 三元运算符是可以嵌套的
- 注意：表达式1和表达式2必须可以统一成一种类型
- 凡是可以使用三元的都可以改写成 if else
- 但是 if else 不一定可以改写成 三元

```java
class SanYuan 
{
	public static void main(String[] args) 
	{
		// 求出两个数的最大值
		int a = 125;
		int b = 12;
		int max  = (a > b) ? a : b;
		System.out.println(max); //=> 12

		// 三元运算符可以嵌套
		String max2 = (a > b) ? "a大" : ((a == b) ? "相等" : "b大");
		System.out.println(max2); //=> 12

		// 改写成 if else
		if(a > b){
			System.out.println(a);
		}else{
			System.out.println(b);
		}
	}
}
```

