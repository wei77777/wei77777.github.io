---
title: 09Java异常处理
tags: Java
categories: Java基础
abbrlink: d5279c1a
date: 2022-02-12 21:14:30
---

## 异常概述

异常：在Java语言中，将程序执行中发生的不正常情况称为“异常”，开发过程中的语法错误和逻辑错误不是异常

Java程序在执行过程中所发生的异常事件可分为如下两类

- `Error`：Java虚拟机无法解决的严重问题，如：`JVM`系统内部错误、资源耗尽等严重情况。比如：`StaticOverflowError` 和 ` OOM`。一般不编写针对性的代码进行处理
- `Exception`：其他因编程错误或外部因素导致的一般性问题，可以使用针对性的代码进行处理：例如
  - 空指针访问
  - 试图读取不存在的文件
  - 网络连接中断
  - 数组角标越界

## 异常的分类

- 编译时异常
  - `java.lang.Error`
- 运行时异常
  - `java.lang.Exception`

## 常见的异常举例

### 空指针异常 `NullPointerException`

```java
/*
* NullPointerException
* 空指针异常
*/
@Test
public void test1() {
    int[] arr = null;
    System.out.println(arr[3]);
    // or		
    String str = null;
    System.out.println(str.charAt(0));
}
```

### 角标越界 `ArrayIndexOutOfBoundsException`

```java
/*
* XxxIndexOutOfBoundsException
* 数组角标越界	  
*/
@Test
public void test2() {
    // ArrayIndexOutOfBoundsException
    int[] arr = new int[5];
    System.out.println(arr[5]);

    // StringIndexOutOfBoundsException
    String str = "hello";
    System.out.println(str.charAt(6));
}
```

### 类型转换异常 `ClassCastException`

```java
/*
* ClassCastException
* 类型转换异常
*/
@Test
public void tset3() {
    Object obj = new Date();
    String date = (String)obj;
}
```

### 数值转换异常 `NumberFormatException`

```java
/*
* NumberFormatException
* 数值转换异常
*/
@Test
public void test4() {
    String str = "abc";
    int number = Integer.parseInt(str);
}
```

### 输入不匹配异常 `InputMismatchException`

```java
/*
* InputMismatchException
* 输入不匹配异常
*/
@Test
public void test5() {
    Scanner sca = new Scanner(System.in);
    // 这里要求输入的是一个整数类型，如果输入了字符串或者其他类型则会出现异常
    int number = sca.nextInt();
}
```

### 算数异常 `ArithmeticException`

```java
/*
* ArithmeticException
* 算数异常
*/
@Test
public void test6() { 
    int a = 10;
    int b = 0;
    System.out.println(a / b);
}	
```

## 异常处理的过程：抓抛模型

- 抛：程序在运行过程中，一旦出现异常，就会在出现异常处生成一个异常类对象，并将异常抛出，一旦抛出对象后，后面的代码就不会执行
- 抓：可以理解为异常的处理方式
  - `try-catch-finally`
  - `throws`

## 异常处理 try-catch-finally 的使用

`try-cathc-finally`的使用方式

```java
try {
    // 可能出现的异常代码
}catch(异常类型 变量名) {

}catch(异常类型 变量名) {

}finally {
	// 一定会执行的代码
}
```

1. `finally`是可选的
2. 使用 `try` 将可能出现异常的代码包起来，在执行过程中，一旦出现异常就会抛出一个异常类对象，根据这个对象的类型去 `catch` 中进行匹配。来处理出现的异常
3. 一旦 `try` 的异常对象匹配到某一个 `catch` 时，就进入 `catch` 中进行异常的处理，异常处理完成之后就会跳出 `try-catch` 结构（没有写 `finally` 的情况下），继续执行之后的代码
4. `catch` 中的异常类型如果没有子父类关系，则声明谁在上，谁在下没有关系。`catch` 中的异常类型如果满足子父类关系，则要将子类声明在上，父类声明在下。否则的话会报错
5. 常用的异常对象处理方式
   1. `getMessage()` 此方法返回的是一个字符串，会返回异常信息
   2. `printStackTrace()` 此方式是 `void` 类型可以直接输入代码的运行过程
6. 在`try` 结构中声明的变量出了 `try` 结构就无法再使用
7. `try-catch-finally` 结构可以嵌套

```java
public class TrycatchTest {
	public static void main(String[] args) {
		show();
	}
	public static void show() {
		try {
			int num = 10;
			Object obj = new Date();
			String date = (String)obj;
			// 代码出现异常后，后面的代码不再执行
			System.out.println("exception ------>ClassCastException");
		} catch (ClassCastException e) {
			// 捕获到异常，进入catch处理
			System.out.println("类型转换异常");
			// 使用 getMessage 方法获取异常信息然后打印出来
			System.out.println(e.getMessage());
			// 使用 printStackTrace 方法直接打印出执行过程
			e.printStackTrace();
		}
		// try 结构中声明的变量出了 try 结构就无法使用
		// System.out.println(num);
		
		System.out.println("try-catch 结构执行完我继续执行");
	}
}
```

## finally 的使用

开发中，由于运行时异常比较常见，所以通常情况下不针对运行时异常做 `try-catch-finally` 处理。针对于编译时异常，我们一定要考虑使用异常处理

```java
public class FinallyTest {
	public static void main(String[] args) {
		int number = getNumber();
		System.out.println(number); //=> 2
	} 
	public static int getNumber() {
		try {
			int[] arr = new int[5];
			System.out.println(arr[5]);
			return 0;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return 1;
		} finally {
			// 无论失败和成功都会进入到 finally 中
			return 2;
		}
	}
}
```

## throws 方式处理异常

`throws + 异常类型` 写在方法的声明处，指明此方法声明是可能抛出的异常类型，一旦此方法体执行时出现异常，仍会在出现异常处生成一个异常类对象，此对象满足 throws 后的异常类型时，就会被抛出。异常代码后续的代码不会再被执行

`throws` 只是将异常抛出，并不是真正的处理了这个异常，而是由它的方法调用者去处理，使用 `try-catch-finally` 才能将异常真正处理掉

```java
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

public class ThrowsTest {
	public static void main(String[] args){
        // 调用有 throws 的方法时要使用 try-catch 将异常处理掉
		try {
			methods1(); //=> hello world
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}
	/*
	 * 读取文件的方法
	 * 使用 throws 向上抛送一个异常，由这个方法的调用者来处理可能发生的异常
	 */
	public static void methods1() throws IOException{
		File file = new File("hello.txt");
		FileInputStream fis = new FileInputStream(file);
		int data = fis.read();
		while(data != -1) {
			System.out.print((char)data);
			data = fis.read();
		}
		fis.close();
	}
}
```

## 方法重写的原则

子类重写方法抛出的异常类型不能大于父类被重写方法抛出的异常类型

```java
class Person{
	public void method() throws FileNotFoundException {
		
	}
}
class Student extends Person{
	// 子类重写父类的方法抛出的异常类型不能大于父类抛出的异常
	// public void method() throws IOException{}
	public void method() throws FileNotFoundException {
	}
}
```

## 开发中如何选择使用哪种异常

- 如果父类中被重写的方法没有 throws 方式处理异常，则子类重写的方法也不能使用 throws 方式处理异常。那么就意味着子类中想要处理异常的话只能使用 `try-catch-finally` 的方式
- 在执行方法A中，先后又调用了另外几个方法，这几个方式是递进关系的，那么这几个方法可以使用 throws 处理。而执行的方法 A 可以使用 `try-catch-finally` 处理

```java
class Order{
	/*
	 * show 方法中依次调用了 test1、test2、test3
	 * 三个 test 方法都使用 throws 的方式处理异常
	 * 然后在 show 方法中使用 try-catch 方法处理可能存在的异常
	 * 如果有其中一个方法出现异常，则后面的方法不会再继续执行
	 */
	public void show() {
		try {
			int a = test1();
			int b = test2(a);
			int num = test3(b);
			System.out.println(num);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}
	public int test1() throws Exception{
		int a = 10;
		int b = 5;
		return a / b;
	}
	public int test2(int a) throws Exception {
		int b = 0;
		return a / b;
	}
	public int test3(int a) throws Exception {
		int b = 1;
		return a / b;
	}	
}
```

## 手动抛出异常

抛出一个运行时异常

```java
throw new RuntimeException("数据不合法");
```

抛出一个编译时的异常，这种异常要使用 throws 向上抛送

```java
// 使用 throws 向上抛送这个异常
public void show(int a) throws Exception {
    if(a > 0) {
        System.out.println("数据正常");
    }else {
        // 手动抛出一个编译时异常
        throw new Exception("数据不合法");
    }
}
```

使用 try-catch 处理异常

```java
public class ThrowsTest02 {
	public static void main(String[] args) {
		// 使用 try-catch 接住手动抛出的异常
		try {
			Clean c = new Clean();
			c.show(-20);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}
}
class Clean{
	// 手动抛出一个运行时异常
	public void show(int a) {
		if(a > 0) {
			System.out.println("数据正常");
		}else {
			// 如果数据不合符我们可以手动抛出一个异常
			throw new RuntimeException("数据不合法");
		}
	}
}
```

## 自定义异常类

操作方法：

1. 定义一个类要继承与现有的异常类
   1. 可以继承的有： `RuntimeException` 、 `Exception`
2. 提供一个全局的 `serialVersionUID`
3. 提供重载的构造器

定义一个异常类

```java
/*
 * 自定义异常类
 * 1.定义一个类要继承与现有的异常类
 */
public class MyException extends RuntimeException{ 
	// 2. 提供一个全局的 serialVersionUID
	static final long serialVersionUID = -7034897190745766939L;
	public MyException() {
		
	}
	public MyException(String msg) {
		// 3.重写父类构造器方法
		super(msg);
	}
}
```

使用异常类

```java
public class MyExceptionExce {
	public static void main(String[] args) {
		Phone p = new Phone();
		try {
			System.out.println("手机的价格为：" + p.getPrice(2));;
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}
}
class Phone{
	public double getPrice(int leve) {
		if(leve > 0) {
			return 1200;
		}else {
			throw new MyException("等级不够");
		}
	}
}
```

## 异常处理总结

- 捕获异常
  - try 执行可能产生的异常的代码
  - catch 捕获异常
  - finally 无论是否发生异常，代码总会执行
- 抛出异常
  - throw 异常的生成阶段，手动抛出异常对象
- 声明异常
  - throws 异常的处理方式，声明方法可能要抛出的各种异常类

![异常处理.png](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%86.png)

