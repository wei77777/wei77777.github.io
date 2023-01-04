---
title: 08Java面向对象-下
tags: Java
categories: Java基础
abbrlink: 9eda9079
date: 2022-02-12 21:13:50
---

## 静态变量与实例变量

- 含义：`static` 表示为静态的，静止的
- static 可以用来修饰类中的属性、方法、代码块、内部类
  - 注意：不能修饰构造器
- static 的作用，我们将用 static 修饰的属性称为 静态属性，或者静态变量
  - 按是否使用使用 static 修饰，分为 **静态属性** VS **非静态属性(实例变量)**
  - 实例变量：我们创建了类的多个对象，每个对象都有一套独立的非静态属性。当修改其中一个对象的非静态属性时，其他对象中的属性值不会受到影响。
  - 静态属性：我们创建了类的多个对象，多个对象会   **共享 ** 一个静态属性，当通过某个对象去修改这个静态属性时，其他对象都会受到影响，即其他对象再去调用这个属性时结果都是修改之后的值。
- static 修饰符的其他说明
  - 静态属性随着类加载而加载，可以通过 类.类变量 来调用静态属性
  - 静态变量加载要早于类
  - 由于类只会被加载一次，所以静态属性在内存中也只会保存一份，存在方法区的静态域中

```java
public class StaticTest {
	public static void main(String[] args) {
		// 创建这个学生类的两个对象 s1和s2
		Student s1 = new Student("李四",1001);
		Student s2 = new Student("张三",1002);
		
		// 通过s1对象设置静态属性 schoolName 的值为 县第一高级中学
		s1.schoolName = "县第一高级中学";
		// 打印 s2.schoolName 的值
		// 我们可以发现虽然这个值是由 s1 设置的，但是 s2 里面也可以使用
		System.out.println(s2.schoolName); //=> 县第一高级中学
		
		// 现在我们再通过 s2 去修改这个值
		s2.schoolName = "县一中";
		// 我们发现只要这个值被任何一个对象修改，其他对象调用这个值是都会受到影响
        // 这和普通的对象属性是不同的
		System.out.println(s1.schoolName); //=> 县一中
		
		s1.name = "张三丰";
		// 普通的对象属性是不会被其他对象影响的
		System.out.println(s2.name); //=> 张三
	}
}
// 声明一个学生类，有name age 两个实例属性
// 声明一个静态的 schoolName,表示学校名称
class Student{
	String name;
	int id;
	
	static String schoolName;
	
	public Student(String name, int id) {
		this.name = name;
		this.id = id;
	}
}
```

可以直接使用 类.静态属性

```java
public class StaticTest2 {
	public static void main(String[] args) {
		// 可以直接使用 类名.静态属性调用静态变量
		Stu.schoolName = "市立一中";
		Stu s = new Stu();
		System.out.println(s.schoolName); //=> 市立一中
	}
}

class Stu{
	static String schoolName;
}
```

## static修饰方法

static 也可以修饰方法

* 静态方法中可以调用静态属性，静态方法。不能调用非静态的属性和方法
* 非静态方法中既可以调用非静态属性和方法，也可以调用静态属性和方法，当使用静态属性和方法时，前面默认使用的是 `类名.属性` ， 而不是 `this.属性`

```java
public class StaticMethos03 {
	public static void main(String[] args) {
		Status.schoolName = "北京大学";
		Status s = new Status();
		s.name = "蔡元培";
		s.show();
	}
}

class Status{
	String name;
	static String schoolName;
	
	public void show() {
		// 非静态方法内可以调用静态的方法和属性
		showName();
		System.out.println(schoolName + "的第一任校长是" + name);
	}
	// 声明一个静态方法，在静态方法内只能使用静态属性和静态方法
	public static void showName() {
		// 静态方法内可以调用静态属性和静态方法，不能调用非静态的属性和方法
		System.out.println(schoolName);
		//调用非静态方法时，编译报错
		//show();
		// 可以调用静态方法
		show2();
	}
	public static void show2() {
		System.out.println(schoolName);
	}
}
```

## 如何确定使用static

- 属性可以被多个对象共享的，不会随着对象不同而改变的
- 操作静态属性的方法通常定义为静态的
- 工具类中的方法，通常定义为静态的，比如 Math，Arrays

## static 使用练习

编写一个类实现银行账户的概念，属性包含账号、余额、密码、利率、最小存款余额。

分析哪些属性可以当做静态属性，哪些方法可以设置为静态方法

```java
public class AccountDemo02 {
	public static void main(String[] args) {
		// 创建a1账户
		Account a1 = new Account();
		// 创建a2账户
		Account a2 = new Account(2000,"qwerty");
		// 设置年利率
		Account.setInterest(0.0123);
        // 设置最小存款余额
		Account.setMinBalance(1000);
		// 打印a1账户信息
		System.out.println("a1的账户信息：" + a1.printInfo());
		// 打印a2账户信息
		System.out.println("a2的账户信息：" + a2.printInfo());
	}
}
class Account{
	private int id; //账号
	private double balance; // 账户余额
	private String pwd; // 账号密码
	
	private static int initID = 1001; // 自动生成账号
	private static double interest; // 利率
	private static double minBalance; // 最小存款余额
	
	/**
	 * 调用空参构造器自动生成账号
	 */
	public Account() {
		id = initID++; // 创建账户时自动生成id
	}
	/**
	 * 带参的构造器，初始化余额和密码，同时调用空参构造器自动生成账号
	 * @param balance
	 * @param pwd
	 */
	public Account(double balance,String pwd) {
		this();
		this.balance = balance;
		this.pwd = pwd;
	}
	/**
	 * 获取密码
	 * @return
	 */
	public String getPwd() {
		return pwd;
	}
	/**
	 * 设置密码
	 * @param pwd
	 */
	public void setPwd(String pwd) {
		this.pwd = pwd;
	}
	/**
	 * 静态方法：获取利率
	 * @return
	 */
	public static double getInterest() {
		return interest;
	}
	/**
	 * 静态方法：设置利率
	 * @param interest
	 */
	public static void setInterest(double interest) {
		Account.interest = interest;
	}
	/**
	 * 静态方法：获取最小余额
	 * @return
	 */
	public static double getMinBalance() {
		return minBalance;
	}
	/**
	 * 静态方法：设置最小余额
	 * @param minBalance
	 */
	public static void setMinBalance(double minBalance) {
		Account.minBalance = minBalance;
	}
	/**
	 * 获取账号
	 * @return
	 */
	public int getId() {
		return id;
	}
	/**
	 * 获取余额
	 * @return
	 */
	public double getBalance() {
		return balance;
	}
	/**
	 * 打印当前的用户信息
	 * @return
	 */
	public String printInfo() {
		return  "账号为：" + this.id +  ",余额为：" + this.balance 
				+ ",存款利率为" + getInterest() + ",最小存款余额是" + getMinBalance();
	}
	
}
```

## 单例模式

单例模式表示某个类只能存在一个对象实例

### 单例模式的饿汉式实现

```java
public class SingletonTest01 {
	@Test
	public void SingletonTest() {
		Bank b = Bank.getInstance();
		Bank b2 = Bank.getInstance();
		System.out.println(b == b2); //=> true
	}
}	
/**
 * 单例模式的饿汉式实现
 * @author Administrator
 *
 */
class Bank{
	// 1.私有化类的构造器,这样类外部就无法通过 new 的方法创建新的类的实例
	private Bank() {
		
	}
	// 2.内部创建类的对象
	private static Bank instance = new Bank();
	
	// 3.声明一个方法，返回这个类的对象
	public static Bank getInstance() {
		return instance;
	}
}
```

### 单例模式的懒汉式实现

```java
public class SingletonTest02 {
	@Test
	public void SingletonTest() {
		Order o = Order.getInstance();
		Order o1 = Order.getInstance();
		System.out.println(o == o1); //=> true
	}
}
/**
 * 单例模式的懒汉式实现
 * @author Administrator
 *
 */
class Order{
	// 1.私有化类的构造器
	private Order() {
		
	}
	// 2.声明一个私有的，静态的类型为当前类的变量
	private static Order instance = null;
	
	// 3.声明一个静态的返回当前类实例的方法
	public static Order getInstance() {
		// 3.1 先判断当前类是否已经被创建过实例,如果没有创建过则新建一个，否则不会新建，返回的还是已经创建好的实例
		if(instance == null) {
			// 3.2 如果当前类没有被创建过对象，则创建一个类对象并返回
			instance = new Order();
		}
		// 3.3 返回当前类的实例
		return instance;
	}
}
```

### 区分饿汉式和懒汉式

* 饿汉式
  * 坏处：对象加载时间过长
  * 好处：线程是安全的
* 懒汉式
  * 坏处：目前上面的写法线程是不安全的
  * 好处：延迟对象的加载

## 类中代码块结构的使用

- 代码块的作用：用来初始化类、对象
- 代码块如果有修饰的话，只能使用 `static`
- 用 `static` 修饰的代码块称为***静态代码块***，不用 `static` 修饰的称为***非静态代码块***
- 静态代码块
  - 内部可以有输出语句
  - 会随着的类的加载而执行，并且只会执行一次
  - 作用：初始化类的信息
  - 如果一个类中定义了多个静态代码块，则按照先后顺序依次执行
  - 静态代码块执行的顺序优先于非静态代码块
  - 静态代码块内部只能调用静态属性和静态方法
- 非静态代码块
  - 内部可以有输出语句
  - 随着对象的创建而执行
  - 每创建一个对象，就执行一次非静态代码块
  - 作用：可以在创建对象时，对对象的属性进行初始化
  - 如果一个类中定义了多个非静态代码块，则按照先后顺序依次执行
  - 非静态代码块中可以调用静态的属性和方法，也可以调用非静态属性和方法

```java
public class BlackCode01 {
	public static void main(String[] args) {
//		// 如果只用一个类获取某个静态方法或者静态属性，则先执行静态代码块
//		Wallet.print();
//		// 静态代码块只会执行一次
//		Wallet.from = "爱马仕";
		// 非静态代码块会随着这对象的创建而执行多次
		Wallet w1 = new Wallet();
		Wallet w2 = new Wallet();
		
		// 静态代码块和非静态代码块执行顺序
		// 静态代码块 -> 非静态代码块 -> 空参构造器
	} 
}
class Wallet {
	double balance;
	String name;
	static String from;
	public Wallet() {
		System.out.println("空参构造器");
	}
	// 静态的代码块
	static {
		System.out.println("静态代码块");
		from = "爱马仕";
		print();
		// show(); 静态代码块中不能调用非静态方法
 		// name = "李四"; 静态代码块中不能调用非静态属性
	}
	// 非静态代码块
	{
		System.out.println("非静态代码块");
		// 非静态代码块中可以使用静态属性，静态方法，非静态属性和方法
		name = "李冰冰";
		from = "香奈儿";
		show();
		print();
	}
	
	public void show() {
		System.out.println("show方法");
	}
	public static void print() {
		System.out.println("静态打印方法");
	}
}
```

## 代码块执行顺序练习

```java
class Son{
	static {
		System.out.println("111");
	}
	{
		System.out.println("222");
	}
	public Son() {
		System.out.println("333");
	}
}

public class BlackCodeTest03 extends Son{
	static {
		System.out.println("444");
	}
	{
		System.out.println("555");
	}
	public BlackCodeTest03() {
		System.out.println("666");
	}
	public static void main(String[] args) {
		// 先执行两个类的静态的代码块
		// 再执行父类的代码块和构造器
		// 最后执行自己类中的代码块和构造器
		new BlackCodeTest03(); //=> 111 444 222 333 555 666
	}
}
```

## 属性赋值的先后顺序

①属性的默认值 -->  ②显示的初始化赋值  -->  ③代码块中赋值  -->  ④构造器中赋值  -->  ⑤使用对象调用方法赋值

```java
public class SetValueTest02 {
	public static void main(String[] args) {
		Order o = new Order();
		System.out.println(o.id); //=> 3
		o.setid(4);
		System.out.println(o.id); //=> 4
	}
}
/**
 * 类中属性赋值的顺序如下
 * 1 -> 2 -> 3 -> 4 -> 5
 * @author Administrator
 *
 */
class Order{
	// 1.属性的默认值
	// 2.声明属性时显示的赋上一个值
	int id = 1;
	// 3.非静态代码块赋值
	{		
		id = 2;
	}
	// 4.构造器赋值
	public Order() {
		id = 3;
	}
	// 5.通过set方法赋值
	public void setid(int id) {
		this.id = id;
	}
}
```

## final 修饰方法和类

final 关键字可以修饰类、方法

```java
class Person{
	// 使用 final 修饰方法时，这个方法将不能被子类重写
	public final void show() {
		
	}
}
// 使用 final 修饰符修饰的类表示不能被其他类继承
final class Student extends Person{
	// 父类中的 show 方法时一个 final 修饰的方法，子类中无法重写
	// Cannot override the final method from Person
//	public void show() {
//		
//	}
}
// 不能继承使用 final 的类 
// The type School cannot subclass the final class Student
//class School extends Student{
//	
//}
```

## final 修饰属性

- final 修饰一个变量时，此时的变量称为一个常量
- final 修饰属性，可以考虑的赋值范围有
  - 显示的初始化
  - 代码块中初始化
  - 构造器中初始化

```java
class Orders{
	// 错误：final 修饰的变量不能设置默认的初始值
	// final int id;
	
	// final 修饰的变量可以显示的赋值
	final int number = 1001;
	final String name;
	final boolean isFlag;
	// final 修饰的变量可以在代码块中赋值
	{
		name = "李四";
	}
	// final 修饰的变量可以在构造器中赋值
	public Orders() {
		isFlag = true;
	}
	public Orders(boolean isFlag) {
		this.isFlag = isFlag;
	}
}
```

## final 修饰局部变量

当使用 final 修饰形参时，方法内将不能对这个形参做进一步修改

```java
public class FianlTest05 {
	public static void main(String[] args) {
		FinalValue f = new FinalValue();
		f.show("张三"); //=> 张三10
	}
}

class FinalValue{
	public void show(final String NAME) {
		// 使用 final 修饰一个形参时，方法内将不能对这个形参做修改
		// NAME = "李四";
		final int AGE = 10;
		// fianl 修饰局部变量时，代码作用域内不能对这个变量进行修改
		//AGE += 10;
		System.out.println(NAME + AGE);
	}
}
```

## 抽象类和抽象方法的使用

- 抽象使用关键字 abstract

- abstract  可以修饰类、方法

- abstract 修饰类：

  - 当使用 abstract 修饰一个类时，这个类就变成了了一个抽象类，这个抽象类将不能被实例化
  - 抽象类中也一定有构造器，便于子类实例化时调用
  - 当我们声明了一个抽象类之后，都会对应的声明一个抽象类的子类，让子类对象实例化，完成相关操作

- abstract 修饰方法：

  - 抽象方法中没有方法体

    ```java
    public abstract void show();
    ```

  - 抽象方法所在的类一定是一个抽象类，但是一个抽象类中不一定有抽象方法

  - 当子类继承抽象类之后，在子类中必须重写父类中所有的抽象方法，否则编译会出错

  - 如果子类不想重写父类中的抽象方法，则子类也要声明成为一个抽象类

```java
// 使用 abstract 关键字修饰一个抽象类，这个类将不能被实例化
abstract class Person {
	// 非抽象方法都有方法体
	public void eat() {
		System.out.println("吃饭");
	}
	// 抽象方法没有方法体，直接小括号分号结束
	public abstract void show();
}
//当我们继承了抽象类之后必须将抽象类中抽象方法进行重写
// 如果不进行重写，则子类也必须是一个抽象类
abstract class Main extends Person{
//	public void show() {
//		System.out.println("重写后的show方法");
//	}
	// 抽象方法所在类的必须是一个抽象类
	public abstract void task();
}
//当我们继承了抽象类之后必须将抽象类中抽象方法进行重写 
class Students extends Main{
	// 子类继承了抽象的父类后必须重写父类中的抽象方法
	@Override
	public void task() {
		System.out.println("重写后的task方法");
	}
	// 子类继承了抽象的父类后必须重写父类中的抽象方法，
	// 如果任何一个父类的抽象方法没有进行重写，则编译会出错
	@Override
	public void show() {
		System.out.println("重写后的show方法");
	}
}
```

## 创建抽象类的匿名子类对象

```java
/*
 * 创建抽象类的匿名类
 */
public class AnonymousTest02 {
	public static void main(String[] args) {
		
		// 创建抽象类的匿名对象的有名方法
		// 抽象类的匿名类并不是new的抽象类本身，而是new抽象类的一个匿名类
		Persons p = new Persons() {
			@Override
			public void show() {
				System.out.println("展示");
			}
			@Override
			public void eat() {
				System.out.println("吃好吃的");
			}
		};
		methods(p);
		
		
		// 创建抽象类的匿名类和匿名对象
		methods(new Persons() {
			@Override
			public void show() {
				System.out.println("展示");
			}
			@Override
			public void eat() {
				System.out.println("吃饭");
			}
		});
	}
	
	public static void methods(Persons p) {
		p.show();
		p.eat();
	}
}
// 创建一个抽象类，里面有两个抽象方法
abstract class Persons{
	public abstract void show();
	public abstract void eat();
}
```

## 模板方法的设计模式和应用场景

抽象类体现的就是一种模板模式的设计，抽象类作为多个子类的通用模板，子类在抽象类的基础上进行扩展、改造，但子类总体上会保留抽象类的行为方式

解决的问题：

- 当功能内部一部分实现是确定的，一部分实现是不确定的。这时可以吧不确定的暴露出去，让子类去实现
- 换句话说，在软件开发中实现一个算法时，整体的步骤很固定、通用，这些步骤已经在父类中写好了，但是某些部分易变，易变的部分可以抽象出来，供不同的子类去实现。这就是一种模板模式

代码示例一：计算某个方法的执行总时长

```java
/**
 * 使用模板模式计算某个方法的运行时长
 * @author Administrator
 *
 */
public class TemplateTest01 {
	public static void main(String[] args) {
		/*
		 * 使用多态调用父类中的方法，会先执行父类中已有的代码结构
		 * 当遇到模板方法时执行子类中重写的方法
		 */
		Template1 t = new Tool1();
		t.spendTime();
		
		Template1 t1 = new Tool2();
		t1.spendTime();
	}
}
abstract class Template1{
	public void spendTime() {
		// 开始时间
		long time = System.currentTimeMillis();
		// 暴露出来的抽象方法，让子类去填充
		code();
		// 结束时间
		long endTime = System.currentTimeMillis();
		System.out.println("代码花费：" + (endTime - time));
	}
	// 暴露出来的抽象方法，让子类去填充
	public abstract void code();
}
class Tool1 extends Template1{
	@Override
	public void code() {
		// 获取1000以内所有的偶数
		for(int i = 1; i <= 1000; i++) {
			if(i % 2 == 0) {
				System.out.println(i);
			}
		}
	}
}
class Tool2 extends Template1{
	@Override
	public void code() {
		// 获取1000以内的奇数
		for(int i = 1; i <= 1000; i++) {
			if(i % 2 == 1) {
				System.out.println(i);
			}
		}
	}
}
```

## 接口的定义和使用

1. 接口使用 `intreface` 关键字来定义
2. Java中类和接口是两个并列结构
3. 如何定义接口：定义接口中的成员
   1. JDK7.0 之前只能定义常量和抽象方法
      1. 全局常量 `public static final`,在书写可以忽略这些关键字，默认就是常量
      2. 抽象方法 `public abstract` ，在书写时可以忽略不计，默认就是抽象方法
   2. JDK8.0，除了定义常量和抽象方法，也可以定义静态方法，默认方法
4. 接口中不能定义构造器，意味着接口不能被实例化
5. Java开发中，通过让类去实现（`implements`）某个接口的方式来使用接口
6. 在类中我们要覆盖接口中的抽象方法，否则类不能被实例化，或者将父类定义成抽象类让子类去实现接口中的方法



- 接口的具体使用，体现了多态性
- 接口实际上可以看做是一种规范



```java
public class InterfaceTest01 {
	public static void main(String[] args) {
		// 可以直接使用接口中的常量
		System.out.println(Flyable.MAXSPEED); //=> 7900
		System.out.println(Flyable.MINSPEED); //=> 1
		Plane p = new Plane();
		p.fly(); //=> 宇宙第一速度是：7900
		p.stop(); //=> 停止方法
	}
}

/*
 * 使用 interface 关键字声明一个接口
 */
interface Flyable{
	// 接口中只能定义常量
	public static final int MAXSPEED = 7900;
	// 接口中常量定义可以忽略前面的关键字设置，默认就是常量
	int MINSPEED = 1;
	
	// 接口中只能定义抽象方法
	public abstract void fly();
	// 接口中的方法也可以忽略前面的关键字，默认就是抽象方法
	void stop();
}

/*
 * 使用 implements 关键字让一个类去实现某个接口
 */
class Plane implements Flyable{

	// 在类中我们通常称之为实现接口中的某个方法
	@Override
	public void fly() {
		// 在类的方法中也可使用实现的接口中的常量
		System.out.println("宇宙第一速度是：" + Flyable.MAXSPEED);
	}

	// 实现接口中的 stop 方法
	@Override
	public void stop() {
		// TODO Auto-generated method stub
		System.out.println("停止方法");
	}	
}
```

## 接口的多实现和接口的多继承

Java类中可以实现多个接口，弥补了Java单继承的局限性

格式`class AA extends BB implements CC,DD{ }`

```java
// 定义两个方法
interface eat{
	void eatShow();
}
interface speak{
	void speakShow();
}
class Person{
	String name;
}
// 一个类中可以实现多个方法
class Student extends Person implements eat,speak{
	@Override
	public void speakShow() {
		
	}

	@Override
	public void eatShow() {
		
	}
}
```

接口与接口之间可以实现多继承

```java
public class InterfaceTest03 {
	public static void main(String[] args) {
		Dd d = new Dd();
		d.method1(); //=> Aa方法中的method1
		d.method2(); //=> Bb方法中的method2
		d.method3(); //=> Cc方法中的method3
	}
}

interface Aa{
	void method1();
}
interface Bb{
	void method2();
}
// Cc接口同时继承了Aa,Bb接口
interface Cc extends Aa,Bb{
	void method3();
}
// 类中要实现所有接口中的方法
class Dd implements Cc{
	@Override
	public void method1() {
		System.out.println("Aa方法中的method1");
	}

	@Override
	public void method2() {
		System.out.println("Bb方法中的method2");
	}

	@Override
	public void method3() {
		System.out.println("Cc方法中的method3");
	}
}
```

## 接口满足多态的体现

```java
public class InterfaceTest04 {
	public static void main(String[] args) {
		UsbTest u = new UsbTest();
		// 接口多态的体现
		Phone p = new Phone();
		// 将接口的实现类作为实参传进去
		/*
		 * 开始传输数据
		 * 具体传输细节
		 * 结束传输数据
		 */
		u.transferData(p); 
	}
}
/*
 * 定义一个Usb接口，里面有开始和关闭两个方法
 */
interface Usb{
	void start();	
	void stop();
}
class Phone implements Usb{
	// 在手机类中实现接口中的开始方法
	@Override
	public void start() {
		System.out.println("开始传输数据");
	}
	// 实现接口中的结束方法
	@Override
	public void stop() {
		System.out.println("结束传输数据");
	}
}
// 定义一个测试类，类中有一个方法接收方法作为形参
class UsbTest{
	 // 相当于 Usb usb = new Phone();
	public void transferData(Usb usb) {
		usb.start();
		System.out.println("具体传输细节");
		usb.stop();
	}
}
```

## 创建接口的匿名实现类的匿名对象

```java
UsbTest u = new UsbTest();
// 1.创建了接口的非匿名实现类和非匿名对象
Phone p = new Phone();
u.transferData(p); 

// 2.创建了接口的非匿名实现类和匿名对象
u.transferData(new Phone()); 

// 3.创建了接口的匿名实现类和非匿名对象
Usb p1 = new Usb() {
    @Override
    public void start() {
        System.out.println("开始传输数据");
    }
    @Override
    public void stop() {
        System.out.println("结束传输数据");
    }
};
u.transferData(p1);

// 4.创建了接口的匿名实现类和匿名对象
u.transferData(new Usb() {
    @Override
    public void start() {
        System.out.println("开始传输数据");
    }
    @Override
    public void stop() {
        System.out.println("结束传输数据");
    }
});
```

## 接口应用：代理模式

代理设计就是为其他对象提供一种代理以控制这个对象的访问。

代理模式的应用场景：

- 安全代理：屏蔽对真实对象的直接访问
- 远程代理：通过代理类处理远程方法的调用（RMI）
- 延迟加载：先加载轻量级的代理对象，真正需要时再加载真实对象

代理模式分类

- 静态代理：静态定义代理类
- 动态代理：动态生成代理类，JDK自带动态代理，需要反射等知识

通过明星和经纪人之间的关系来感受代理模式

```java
public class InterfaceTest05 {
	public static void main(String[] args) {
		Proxy p = new Proxy(new RealStar());
		p.confer(); //=> 经理人面谈
		p.signContract(); //=> 经理人签合同
		p.bookTicket(); //=> 经纪人订票
		// 这里虽然调用的是代理类的方法，但是代理类中调用了被代理类的方法
		p.sing(); //=> 明星自己亲自唱歌~~
		p.collectMoney(); //=> 经纪人收钱
	}
}
interface Star{
	void confer(); // 面谈
	void signContract(); // 签合同
	void bookTicket(); // 订票
	void sing(); // 唱歌
	void collectMoney(); // 收钱
}
// 被代理类
class RealStar implements Star{
	@Override
	public void confer() {
		// 面谈
	}

	@Override
	public void signContract() {
		// 签合同
	}

	@Override
	public void bookTicket() {
		// 订票
	}

	@Override
	public void sing() {
		System.out.println("明星自己亲自唱歌~~");
	}

	@Override
	public void collectMoney() {
		// 收钱
	}
}
// 代理类
class Proxy implements Star{
	private Star real;
	// 声明一个代理类的构造器，传递过来被代理类对象
	public Proxy(Star real) {
		this.real = real;
	}
	@Override
	public void confer() {
		System.out.println("经理人面谈");
	}

	@Override
	public void signContract() {
		System.out.println("经理人签合同");
	}

	@Override
	public void bookTicket() {
		System.out.println("经纪人订票");
	}

	@Override
	public void sing() {
		// 代理类中调用被代理类的唱歌方法
		real.sing();
	}

	@Override
	public void collectMoney() {
		System.out.println("经纪人收钱");
	}
}
```

## 接口和类中出现同名变量时

```java
public class InterfaceExer01 {
	public static void main(String[] args) {
		A a = new A();
		a.show();
	}
}

interface C {
	int x = 0;
}
class B {
	int x = 1;
}
class A extends B implements C {
	public void show() {
		// 当父类和实现的接口中出现变量重名时，不能直接使用变量名
		// 下面代码编译出错 The field x is ambiguous
		// System.out.println(x);
		
		// 应该指明使用的是哪一个属性
		System.out.println(super.x);
		System.out.println(C.x);
	}
}
```

## Double包装类比较大小

因为Double实现了Comparable接口，接口中有compareTo方法，可以用来比较大小

```java
Double d1 = 1.2;
Double d2 = 2.1;
/*
 * 返回正数表示当前对象大
 * 返回负数表示当前对象小
 * 返回0表示一样大
 */
System.out.println(d1.compareTo(d2)); //=> -1
```

## Java8中接口的新特性

- Java8中接口内不仅能定义抽象方法，也可以定义静态方法
- 定义抽象方法、静态方法、默认方法格式如下

```java
public interface InterfaceTest {
	// 抽象方法
	void method1();
		
	// 静态方法
	static void method2() {
		System.out.println("静态方法");
	}
	
	// 默认方法
	default void method3() {
		System.out.println("默认方法");
	}
}
```

静态方法和默认方法使用的规定

- 接口中定义的静态方法只能通过 `接口.方法名();` 的方式来调用
- 通过接口实现类的对象来调用接口中的方法，可以调用接口中的默认方法，如果实现类重写了接口中的默认方法，则调用的还是重写之后的方法
- 如果子类继承了父类并且实现了某个方法，则如果父类和接口中有同名同参的方法，那么在使用实现类去调用这个方法时，如果子类没有重写，那么调用的时父类中的方法 --- 类优先原则
- 如果实现类实现了多个接口，多个接口之间存在同名同参的方法，那么将编译出错，方法之间会出现冲突，实现类必须要去重写多个接口之间的同名同参方法
- 可以使用 `接口.supter.方法名();` 的方式去直接调用接口中的方法

代码示例：

1.定义接口1 `Compar`

```java
public interface Compar {
	// JDK8之后可以在接口中定义静态方法，静态方法中可以存在方法体
	public static void method1() {
		System.out.println("Compar:静态方法");
	}
	
	// 定义默认方法
	public default void method2() {
		System.out.println("Compar:默认方法");
	}
	
	// 接口中的 public 可以忽略
	default void method3() {
		System.out.println("接口中的public可以忽略");
	}
	
	default void method4() {
		System.out.println("接口1中的method4");
	}
}
```

2.定义接口2 `Compar2`

```java
public interface Compar2 {
	default void method4() {
		System.out.println("接口2中的method4");
	}
}
```

3.定义父类 `SuperClass`

```java
public class SuperClass {
	public void method2() {
		System.out.println("父类中和接口内重名的接口");
	}
}
```

4.定义实现类和`main`方法

```java
public class SupClass {
	public static void main(String[] args) {
		Sup s = new Sup();
		// The method method1() is undefined for the type Sup
		// 接口中定义的静态方法不能通过实现类对象来调用
		// s.method1();
		
		// 如果实现类中重写了接口中的方法，调用时执行的是重写后的方法
		s.method3(); //=> 实现类中重写接口的方法
		
		// 静态方法只能通过接口本身来调用
		Compar.method1(); //=> Compar:静态方法
		
		// 当父类和接口中存在同名方法时，默认会调用父类中的方法：类优先原则
		s.method2(); //=> 父类中和接口内重名的接口
		
		// 调用重写完接口中重名的默认方法
		s.method4(); //=> 接口1中的method4 接口2中的method4

	}
}
class Sup extends SuperClass implements Compar,Compar2{
	public void method3() {
		System.out.println("实现类中重写接口的方法");
	}

	/*
	 * 如果一个类中同时实现两个接口，
	 * 恰好这两个接口中存在同名的默认方法
	 * 则实现类中必须重写这个方法
	 */
	@Override
	public void method4() {
		// 可以使用 接口.super.方法名 的方式来调用接口中的方法
		Compar.super.method4();
		Compar2.super.method4();
	}	
}
```

## 内部类的分类

内部类：Java中允许在类A中声明类B，则B就是内部类，类A就是外部类

内部类的分类：

- 成员内部类（静态内部类，非静态内部类）
- 局部内部类（方法内、代码块内、构造器内）

```java
class ManTest{
	// 静态成员内部类
	static class Dog{
		
	}
	// 非静态成员内部类
	class Cat{
		
	}
	{
		// 声明在代码块中的局部内部类
		class Fish{
			
		}
	}
	public ManTest() {
		// 声明在构造器中的局部内部类
		class Chicken{
			
		}
	}
	public void show() {
		// 声明在方法中的局部内部类
		class Duck{
			
		}
	}	
}
```

## 成员内部类的特点

### 作为成员来说

- 可以外部类的结构
- 可以被static修饰
- 可以被4中权限修饰符修饰

### 作为一个类来说

- 类内部可以声明属性、方法、构造器、代码块等
- 可以被final修饰，表示这个类不能被继承
- 可以被abstract修饰，表示一个抽象内部类

```java
class ManTest{
	String name = "李四";
	int number = 10;
	static int id;
	public void eat() {
		System.out.println("吃东西");
	}
	
	// 静态成员内部类
	static class Dog{
		public void show() {
			// 调用外部类的静态属性
			System.out.println(id);
		}
	}
	// 非静态成员内部类
	class Cat{
		public void show() {
			// 在成员内部类中调用外部类接口的完整写法
			System.out.println(ManTest.this.number);
			// 也可以简写
			System.out.println(number);
			// 调用外部类的方法
			eat();
		}
	}
}
```

## 实例化成员内部类的方法

```java
public class Man {
	public static void main(String[] args) {
		/**
		 * 实例化成员内部类的方法
		 */
		
		// 实例化静态的成员内部类
		ManTest.Dog dog = new ManTest.Dog();
		dog.show(); //=> 1001
		
		// 实例化非静态的成员内部类
		// 首先要实例化外部类，在通过外部类的对象去实例化非静态成员内部类
		ManTest m = new ManTest();
		// 通过外部对象.new 成员内部类 的方法实例化内部类
		ManTest.Cat cat = m.new Cat();
		cat.show();
	}
}
```

## 局部内部类的使用

```java
public class Man2 {
	public static void main(String[] args) {
		// 返回的是接口的实现类
		Catparable c = new Person().getCatparable();
		c.speak(); // => 喵喵喵~
	}
}

//声明一个接口
interface Catparable {
	void speak();
}

class Person {
	// 返回接口的实现类
	public Catparable getCatparable() {
		// 方法内定义局部内部类，实现外部类中定义的接口并返回这个实现类
		class Cat implements Catparable {
			public void speak() {
				System.out.println("喵喵喵~");
			}
		}
		// 返回一个接口实现类
		return new Cat();
	}
}
```

## 局部内部类使用的一个注意点

```java
class Persons{
	public void show() {
		// jdk8后类中的方法内有内部类，则定义的变量默认是final的		
		int number = 10;
		// jdk7以及之前需要显示声明变量为 final
		final String name = "李四";
		
		class neibu{
			public void show() {
				// 内部类中使用外部类中定义的方法里面的变量时不能对变量值进行修改
				// 因为当有内部类是，方法的变量会变成final类型的
				System.out.println(number);
				// 在封闭作用域中定义的局部变量号必须是final或实际上是final
				// number = 20;  
			}
		}
	}
}
```

