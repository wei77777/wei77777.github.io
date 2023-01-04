---
title: 06Java面向对象（上）
tags: Java
categories: Java基础
abbrlink: 1741f03f
date: 2022-02-12 21:11:21
---

## 对象的特点

- 封装
- 继承
- 多态

## 类和对象的关系

- 类：类是抽象的，概念上的东西
- 对象：是实实在在的个体
- 对象时由类派生出来的

## 类和对象的创建和操作分为那三步

- 创建类
- 类的实例化
- 调用对象的结构，使用 对象.属性、对象.方法

## 面向过程和面向对象

- 面向过程：强调的是功能行为，以函数为最小单位，考虑怎么做。
- 面向对象：强调具备了功能的对象，以类/对象为最小单位，考虑谁来做

## 实现一个类

```java
/*
 * 面向对象的三大特征
 * 封装、继承、多态
 */
public class javaobject01 {
	public static void main(String[] args) {
		// 实例化这个类，生成一个 per 对象
		Person per = new Person();
		// 给这个对象中的属性赋值
		per.name = "张三";
		per.age = 18;
		per.gender = '男';
		
		// 调用对象中的方法
		per.eat();
		per.skip("中文");
		per.sleep();
		per.info();
	}
}
// 创建一个 人 的类
class Person{
	// 设计这个类中有那些属性
	String name; // 名字	
	char gender; //性别
	int age; // 年龄
	
	// 设计这个类中有那些方法
	public void eat() { // 吃饭方法
		System.out.println("人可以吃饭");
	}
	public void sleep() { // 睡觉方法
		System.out.println("人可以睡觉");
	}
	public void skip(String language) { // 说话方法
		System.out.println("说的语言是：" + language);
	}
	public void info() { // 输出这个人的信息方法
		System.out.println(name+"今年" + age + "岁，性别为：" + gender);
	}
}
```

## 一个类可以实例化出多个对象

```java
public class javaobject01 {
	public static void main(String[] args) {
		// 实例化这个类，生成一个 per 对象
		Person p1 = new Person();
		// 给这个对象中的属性赋值
		p1.name = "张三";
		p1.age = 18;
		p1.gender = '男';
		
		// 调用对象中的方法
		p1.eat();
		p1.skip("中文");
		p1.sleep();
		p1.info();
		
		// 一个类可以实例化出多个对象，每个对象都是一个独立的个体，互不影响
		Person p2 = new Person();
		p2.name = "李四";
		System.out.println(p2.name);
	}
}
// 创建一个 人 的类
class Person{
	// 设计这个类中有那些属性
	String name; // 名字	
	char gender; //性别
	int age; // 年龄
	
	// 设计这个类中有那些方法
	public void eat() { // 吃饭方法
		System.out.println("人可以吃饭");
	}
	public void sleep() { // 睡觉方法
		System.out.println("人可以睡觉");
	}
	public void skip(String language) { // 说话方法
		System.out.println("说的语言是：" + language);
	}
	public void info() { // 输出这个人的信息方法
		System.out.println(name+"今年" + age + "岁，性别为：" + gender);
	}
}
```

## 两个对象指向堆空间中的同一地址

```java
// 这种情况相当于对象p1和对象p3指向了堆空间中的同一个引用地址
// 导致改变p1对象中的属性值，p3对象中的值也会跟着改变
// 同理：改变 p3 对象中的值，p1 也会跟着改变
Person p3 = p1;
// 打印出来是一个地址值
System.out.println(p3); //=> com.songzx.javaobject.Person@39ed3c8d
System.out.println(p3.name); //=> 张三

p3.name = "王五";
System.out.println(p1.name); //=> 王五
```

## 属性和局部变量的对比

- 相同点
  - 声明方式相同：变量类型 变量名 = 变量值;
  - 先声明，后使用
  - 变量都有其对应的作用域
- 不同点
  - 再类中声明的位置不同
    - 属性声明在类的一对 {} 中
    - 局部变量：声明在方法中、方法形参、代码块、构造器形参、构造器内部
  - 权限修饰符不同
    - 属性：在声明属性时可以指明其权限，使用权限修饰符
      - 常用的权限修饰符有：public、private、缺省(不使用修饰符默认为此)、protected
    - 局部变量：不能使用权限修饰符
  - 默认初始化值不同
    - 属性：有默认的初始值，在使用属性时可以不事先赋值即可直接使用它的默认值
    - 局部变量：没有初始值，使用局部变量时必须先赋值才能使用。形参在调用方法时必须对形参赋值
  - 在内存中定义的位置不同
    - 属性：定义在堆空间中
    - 局部变量：定义在栈结中

```java
class User{
	// 定义属性（也称为成员变量）
	String name;
	int age;
	boolean isMain;
	
	public void talk(int age) { // 方法中的形参也是局部变量
		// 定义在方法中的都叫做局部变量
        // 要想使用局部变量必须先赋值，再使用
		String name;
		name = "李四";
	}
}
```

## 类中的方法定义

定义方法时，如果方法没有返回值，则使用 void，如果有返回值，应该声明返回数据的类型

声明的方式

无返回值

```java
public void 方法名(){
    方法体
}
```

有返回值

```java
public 返回的数据类型 方法名(){
    return 返回值
}
```

代码演示

```java
public class javamethods03 {
	public static void main(String[] args) {
		User2 u = new User2();
		u.eat(); //=> 吃饭
		u.sleep(2); //=> 一共睡了2个小时
		System.out.println(u.getName()); //=> 爸爸的爸爸叫爷爷
		System.out.println(u.add(2, 5)); //=> 7
	}
}
class User2{
	// 1.无返回值，无形参
	public void eat() {
		System.out.println("吃饭");
	}
	
	// 2.无返回值，有形参
	public void sleep(int hour) {
		System.out.println("一共睡了" + hour + "个小时");
	}
	
	// 3.有返回值，无形参
	public String getName() {
		return "爸爸的爸爸叫爷爷";
	}
	
	// 4.有返回值，有形参
	public int add(int a,int b) {
		return a + b;
	}
}
```

## return 关键字的使用

- 使用范围：使用在方法体中
- 作用
  - 结束方法执行
  - 针对于有返回值的方法，使用 return 返回想要返回的数据
- 注意点：return 后面不能有执行语句

## 理解万事万物皆对象

- 在Java语言范畴中，我们都将功能、结构等封装到类中，通过类的实例化，来调用具体的功能结构
  - Scanner，String 等
  - 文件：File
  - 网络资源：URL
- 涉及到Java语言与前端HTML，数据库等交互时，前后端的结构在Java层面交互时，都体现为类、对象

## 匿名对象的使用

```java
/*
 * 匿名对象的声明和使用
 * 声明方式：不用显示的将对象赋值给一个变量名，而是直接 new 一个类并且调用类中的方法
 */
public class nimingobject {
	public static void main(String[] args) {
		// 对象的匿名使用
		new Phone().sendEmail();
		new Phone().playGame();
		
		// 可以直接传递一个匿名对象
		new PhoneMarket().showPhoneInfo(new Phone());;
	}
}

class PhoneMarket {
	// 这个类中方法接收一个参数类型是 Phone 类
	public void showPhoneInfo(Phone phone) {
		phone.sendEmail();
		phone.playGame();
	}
}

class Phone{
	double price;
	
	public void sendEmail() {
		System.out.println("发送邮件");
	}
	public void playGame() {
		System.out.println("打游戏");
	}
}
```

## 方法重载

- 定义：在同一个类中，允许存在多个同名的方法。只要它们的参数列表不同即可
  - 简单的理解为 *两同一不同*
    - 同一个类
    - 同一个方法名
    - 参数列表不同、参数类型不同、参数个数不同
- 举例：例如在 Scanner 类中存在多个 sort 方法，每个 sort 方法接收的参数类型都不相同
- 判断是否是重载
  - 和方法的权限修饰符、返回值类型、形参变量名称、方法体都没有关系
- 在调用重载方法时，如何确认使用的是那一个方法
  - 方法名 ---> 参数列表
  - 在编写代码是就已经确定了使用的是那一个重载方法

```java
public class FunctionResove04 {
	public static void main(String[] args) {
		Print p = new Print();
		p.getSum(2);
		// 在编写代码时就已经确定好了要调用哪个方法
		p.getSun(5, 7); // 这个方法使用的是 double 类型相加的方法，输出结果为  22.0
		p.getSum(5, 7); // => 12
	}
}

class Print {
	/*
	 * 下面的操作在用同一个类中定义多个相同名的方法 但是每个方法的参数列表都不同 这种操作表示方法重载
	 */
	
	/**
	 * 两个整形数据相加
	 * @param i
	 * @param j
	 */
	public void getSum(int i, int j) {
		System.out.println(i + j);
	}

	/**
	 * 两个浮点类型相加
	 * @param i
	 * @param j
	 */
	public void getSun(double i, double j) {
		System.out.println(i + j + 10);
	}

	/**
	 * 输出一个整形数据
	 * @param a
	 */
	public void getSum(int a) {
		System.out.println(a);
	}
}
```

##  可变个数形参

使用方式

数据类型 ... 变量名

```java
public void functionName(String ... args){
    for(int i = 0; i < args.length; i++){
        System.out.println(args[i]);
    }
}
```

知识点：

- 可变个数形参的个数没有数量限制，也可以是0个
- 可变个数形参的方法可同类中的同方法名不同参数列表之间的方法构成重载
- 可变个数形参的方法和本类中数据类型相同的数组为形参的方法之间不能同时存在，二者在本质上是相同的
- 可变个数形参和固定个数的形参可以同时存在，但是可变个数形参必须声明在最后，否则会报错 
- 可以像遍历数据一样遍历可变数量的形参

```java
import java.util.Arrays;
public class VariableForman {
	public static void main(String[] args) {
		VariableForman v = new VariableForman();
		v.show(5);
		v.show(5, 5, 6, 7);
		v.show("Hello", 1,2,3,4,5);
		v.show(); // 可变个数形参的个数可以为0个
		v.show("Hello");;
	}

	public void show(int i) {
		System.out.println("one int");
	}

	// 可变个数形参
	public void show(int... args) {
		System.out.println("可变个数形参方法");
		// 可以像数组一样遍历传递过来的多个参数
		for (int i = 0; i < args.length; i++) {
			System.out.println(args[i]);
		}
	}
	
	// 形参类型相同的数组和可变数量的形参方法不能同时存在，他们两个本质上是一样的
//	public void show(int [] args) {
//		
//	}

	// 一个方法中既可变个数形参，也可以存在固定的形参
	// 但是，可变个数形参必须放在最后，否则报错
	public void show(String i, int... args) {
		System.out.println("固定的参数为" + i);
		System.out.println(Arrays.toString(args));
	}
}
```

补充：

当我们用 `int ... args` 去接收多个参数时，可以传递过来 int 类型的数组，也可以传递过来多个 int 类型的数据。但是当方法明确的定义了接收的是一个数组类型的数据，则必须传递一个数组，不能传递多个数字

```java
public class ArgumentTest {
	public static void main(String[] args) {
		Sub s = new Sub();
		// 使用 ... 接收参数时可以传递多个数字
		s.add(1, 2, 3, 4); //=> Sub1
		
		// 使用 ... 接收参数时也可以传递一个数组类型的数据
		s.add(1, new int[] {2,3,4}); //=> Sub1
		
		// 当方法明确接收的是一个数组时，则不能像使用 ... 那样传递多个数字
//		s.show(1, 2, 3, 4);
		// 必须传递一个数组类型的数据给方法
		s.show(1, new int[] {2,3,4}); //=> Show
	}
}
class Sub{
	// ... 接收既可以接收多个数字，也可以接收数组
	public void add(int i, int ...arg) {
		System.out.println("Sub1");
	}
	// 明确的数组类型，只能接收数组
	public void show(int i, int[] arg) {
		System.out.println("Show");
	}
}
```

## 值传递机制

关于形参的变量赋值

- 如果变量是基本数据类型，此时赋的值是变量所保存的数据值
- 如果变量是引用数据类型，此时赋的值是变量所保存的地址值

```java
public class ValueTest05 {
	public static void main(String[] args) {
		Data data = new Data();
		ValueTest05 test = new ValueTest05();
		// 传递的是一个引用值，不会在内存中重新新建一个地址来存放新的值，所以可以改变类中的元素值
		test.exChange(data);
		System.out.println(data.m + "," + data.n);
	}

	// 接收一个引用类型来交换类中的两个属性值
	public void exChange(Data data) {
		int temp = data.m;
		data.m = data.n;
		data.n = temp;
	}
}

class Data {
	int m = 10;
	int n = 20;
}
```

## 将对象作为参数传递

```java
// 首先声明一个类，用于计算圆的面积
public class Circle02 {
	// 设置圆的半径
	double redius;

	// 返回圆的半径
	public double findArea() {
		return Math.PI * redius * redius;
	}
}
```

```java
public class Circle02Test {
	public static void main(String[] args) {
		Circle02Test test = new Circle02Test();
        // 实例化上面的类得到一个对象
		Circle02 c = new Circle02();
        // 将对象作为一个参数传递给打印圆的面积的方法
		test.printAreas(c,5);
        // 方法调用结束后打印出圆的最新半径
		System.out.println("now redius is " + c.redius);
	}
    // 接收这个类的对象和一个整形数字
	public void printAreas(Circle02 c,int item) {
		System.out.println("Redius\t\tArea");
		for(int i = 1; i <= item; i++) {
            // 每循环一次改变一次对象中半径的值
			c.redius = i;
            // 打印出当前的半径的面积
			System.out.println(c.redius + "\t\t" + c.findArea());
		}
        // 循环结束后计算当前的半径
		c.redius = item + 1;
	}
}
```

## 递归方法

- 方法递归包含了一种隐式的循环，他会重复执行某一段代码，但这种重复执行无需循环控制
- 递归一定要向一直的放行递归，否则这种递归就变成了无穷递归，类似于死循环

```java
// 使用递归求1~100之间整数的和
public int getSum(int n) {
    if(n == 1) {
        return 1;
    }else {
        return n - getSum(n - 1);
    }
}
```

## 分析下面代码的内存解析

```java
public class NeiCun {
	public static void main(String[] args) {
		// 分析下面代码的内存解析
		NeiCun test = new NeiCun();
		test.first();
	}
	public void first() {
		int i = 5;
		Value v = new Value();
		v.i = 25;
		second(v,i);
		System.out.println(v.i);
	}
	public void second(Value v,int i) {
		i = 0;
		v.i = 20;
		Value val = new Value();
		v = val;
		System.out.println(v.i + " " + i);
	}
}
class Value{
	int i = 15;
}
```

![对象的内存解析.png](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%86%85%E5%AD%98%E8%A7%A3%E6%9E%90.png)

## 封装性的引入

我们在修改类中的某个属性时，想对这个属性作出一些限制条件。比如我们设置 age 时不能设置负数以及0，那么应该怎么做呢？

给属性添加权限修饰符

- private 私有属性，只能在类中使用，类外部不可见

```java
public class AniamTest01 {
	public static void main(String[] args) {
		Dog d = new Dog();
		d.name = "阿黄";	
		//=> 提示报错：The field Dog.age is not visible
		// 提示 age 属性是不可见的
		// d.age = 10; 
	
		d.setAge(5); // 通过对外暴露的方法来设置年龄，这个方法中有对年龄的限制方法
		d.show();
	}
}
class Dog{
	String name;
	// 给 age 变量添加一个权限修饰符，private 表示私有属性，在类的外部不可见
	private int age;
	
	// 对外暴露一个设置年龄的方法，并且显示年龄必须大于等于0，否则默认等于1
	public void setAge(int i) {
		if(i <= 0) {
			age = 1;
		}else {
			age = i;
		}
	}
    // 对外提供返回狗的年龄的方法
	public int getAge() {
		return age;
	}
	// 打印一下信息
	public void show() {
		System.out.println("狗狗的名字是 " + name + ",今年" + age + "岁了");
	}
}
```

## 封装性的体现

- 我们将属性设为私有属性（private）的同时，提供了公共的（public）设置方法和读取方法
- 我们将类中的方法设置为私有的，只在类中内部使用
- 单例模式

我们的程序设计追求 “高内聚，低耦合”

- 高内聚：类的内部数据细节操作自己完成，不允许外部干涉
- 低耦合：仅对外暴露少量的方法用于使用

我们封装就是想要隐藏对象的内部复杂性，只对外公开简单的接口，便于外界调用，从而提高系统的可扩展性、可维护性。通俗的说，***吧该隐藏的隐藏起来，该暴露的暴露出来，这就是封装的思想***

封装性的体现，需要权限修饰符来配合

## 四种权限修饰符

权限范围从小到大排序

| 修饰符                | 类内部 | 同一个包 | 不同包的子类 | 同一个工程 |
| --------------------- | ------ | -------- | ------------ | ---------- |
| private（私有的）     | Yes    |          |              |            |
| 缺省                  | Yes    | Yes      |              |            |
| protected（受保护的） | Yes    | Yes      | Yes          |            |
| public（公共的）      | Yes    | Yes      | Yes          | Yes        |

对于 class 的权限修饰符只能使用 public 和 缺省

- public 修饰的类在任意地方都可以被访问到
- 缺省的 class 只能被同一个包下的内部类访问

## 封装性的练习

```java
// 新建一个Person类
public class Proson {
    // 私有属性
	private int age;
    // 设置年龄
	public void setAge(int i) {
		if (i > 0 && i <= 150) {
			age = i;
		} else {
			// 抛出一个异常
			throw new RuntimeException("设置的值有误");
		}
	}
    // 返回年龄
	public int getAge() {
		return age;
	}
}
```

使用封装好的方法

```java
public class ProsonTest {
	public static void main(String[] args) {
		Proson p = new Proson();
		// 使用封装好的设置年龄的方法来设置年龄
		p.setAge(18);
		System.out.println(p.getAge());
	}
}
```

## 构造器基本理解

作用：

- 创建对象
- 初始化类中的属性

说明

- 如果没有显示的定义类的构造器的话，则系统会默认定义一个空参的构造器
- 定义构造器的格式：`权限修饰符  类名(形参列表){  }`
- 一个类中定义多个构造器就构成了方法重载
- 如果类中显示的定义了类的构造器，则系统不再提供默认的空参构造器
- 一个类中至少会有一个构造器

```java
public class ConstructorTest02 {
	public static void main(String[] args) {
		// new 一个构造器用来创建一个 p 对象
		Proson p = new Proson(15);		
	}
}
class Proson{
	int age;
	// 显示的创建一个构造器
	public Proson() {
		System.out.println("new 一个构造器的同时调用此方法");
	}
	// 构造器在初始化时可以接受参数
	public Proson(int i) {
		// 在创建对象时就对类中的属性进行了赋值
		age = i;
		System.out.println("携带有参数的构造器" + age);
	}
}
```

## 构造器练习

- 在 Person 类中添加一个构造器，利用构造器设置所以人的 age 初始值都是 18
- 修改上题中类和构造器，增加 name 属性，使得在每次创建 Person 对象时同时设置 age 属性和 name 属性

```java
// 设计 Person 类
public class Person {
	private int age;
	private String name;

	/**
	 * 初始化年龄
	 */
	public Person() {
		age = 18;
	}

	/**
	 * 初始化年龄和姓名
	 * 
	 * @param n 姓名
	 * @param a 年龄
	 */
	public Person(String n, int a) {
		name = n;
		age = a;
	}

	/**
	 * 设置年龄
	 * 
	 * @param i
	 */
	public void setAge(int i) {
		if (i > 0 && i <= 150) {
			age = i;
		} else {
			// 抛出一个异常
			throw new RuntimeException("设置的值有误");
		}
	}

	/**
	 * 获取年龄
	 * 
	 * @return
	 */
	public int getAge() {
		return age;
	}
	
	/**
	 * 设置姓名
	 * @param name
	 */
	public void setName(String name) {
		name = name;
	}
	/**
	 * 返回姓名
	 * @return
	 */
	public String getName() {
		return name;
	}
}
```

```java
// 使用设计好的 Person 类
public class PersonTest {
	public static void main(String[] args) {
		// 创建对象时对年龄进行初始化为18
		Person p = new Person(); //=> 18
		System.out.println(p.getAge());
		// 使用封装好的设置年龄的方法来设置年龄
		p.setAge(24);
		System.out.println(p.getAge()); //=> 24
		// 传递参数同时设置 name 和 age
		Person p2 = new Person("张三",21);
		System.out.println(p2.getName()); //=> 张三
		System.out.println(p2.getAge()); //=> 21
	}
}
```

## 属性赋值的过程

按先后顺序排列

- 默认初始化
- 显示初始化
- 构造器赋值
- 使用 对象.属性 赋值

```java
public class SetValue03 {
	public static void main(String[] args) {
		// 1.默认初始化值
		User u = new User();
		System.out.println(u.getAge()); //=> 0
		// 2.构造器赋值
		User u2 = new User(25);
		System.out.println(u2.getAge()); //=> 25
		// 使用对象.变量的方式显示赋值
		u2.setAge(35);
		System.out.println(u2.getAge()); //=> 35
	}
}

class User{
	private int age;
	
	public User() {
		
	}
	public User(int i) {
		age = i;
	}	
	public void setAge(int i) {
		age = i;
	}
	public int getAge() {
		return age;
	}
}
```

## JavaBean 的使用

JavaBean是使用Java语言编写的可重用组件，所谓的JavaBean，是指符合下列标准的类

- 类是公共的
- 有一个无参的构造器
- 有属性，并且每个属性有对应的 get set 方法

```java
class Customer{
	int age;
	String name;
	
	public Customer() {
		
	}
	public void setAge(int i) {
		age = i;
	}
	public int getAge() {
		return age;
	}
	public void setName(String n) {
		name = n;
	}
	public String getName() {
		return name;
	}
}
```

## UML类图

![UML类图.png](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/UML%E7%B1%BB%E5%9B%BE.png)

上图转换为代码如下

```java
class Account{
    private double balance;
    
    public Account(double init,double balance){
        
    }
    public double getBalance(){
        return 0.0
    }
    public void deposit(double amt){
        
    }
    public void withdraw(double amt){
        
    }    
}
```

## this关键字调用属性和方法

this关键字的使用：

- this可以用来修饰：属性、方法、构造器

this修饰属性和方法

- this可以理解为当前或者当前正在创建的对象
- 在类的方法中，我们可以使用 this.属性 this.方法 的形式来调用当前类中的属性和方法，但是我们通常情况我们可以省略 this 的使用，但是在方法中，我们的形参和属性名相同时，我们要在属性签名添加一个 this来区分那个是我们类中的属性，那个是形参

```java
class User2{
	private String name;	
	
	public void setName(String name) {
		// 这里使用关键字 this 来区分属性和形参
		this.name = name;
	}
	public String getName() {
		return name; // or return this.name
	}
}
```

## this调用构造器

- 我们在类的构造器中可以显示的使用 `this(形参列表)`  来调用这个类中其他指定构造器
- 构造器中不能通过 `this(形参列表)` 来调自己，和调用的构造器之间也不能形成互相调用的结果
- 如果一个类中有 n 个构造器，则最多有 n-1 个构造器中使用 `this(形参列表)`
- 规定`this(形参列表)` 必须声明在当亲构造器的首行
- 一个构造器中最多只能声明一个 `this(形参列表)`

```java
public class ConstructorThis06 {
	public static void main(String[] args) {
		User3 u = new User3("张三",18);		
		System.out.println(u.age);
		System.out.println(u.name);
	}
}
class User3{
	int age;
	String name;
	
	public User3() {
		System.out.println("空参构造器执行的多行代码....");
	}
	public User3(int age) {
		// 调用空参构造器
		this();
		this.age = age;
	}
	public User3(String name,int age) {
		// 此构造器调用了上面的构造器
		this(age);
		this.name = name;
	}
}
```

## 阶段练习，this当做参数传递

this表示当前的整个类，作为参数传递时表示将当前的类传递给了另外一个方法

```java
// 创建一个Boy类
public class Boy {
	private String name;
	private int age;
	
	// 声明无参构造器
	public Boy() {
		
	}
	// 声明一个带参构造器
	public Boy(String name, int age) {
		this.name = name;
		this.age = age;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}
	
	public void marry(Gril gril) {
		System.out.println("我想娶" + gril.getName());
	}
	
	public void shout() {
		if(this.age > 22) {
			System.out.println("可以进行登记");
		}else {
			System.out.println("多谈恋爱");
		}
	}
}
```

```java
// 创建一个Gril类
public class Gril {
	private String name;
	private int age;
	
	public Gril() {
		
	}
	public Gril(String name,int age) {
		this.name = name;
		this.age = age;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public void marry(Boy boy) {
		System.out.println("我想嫁给" + boy.getName());
		// this表示当前的整个对象
		boy.marry(this);
	}
	// 对象之间进行排序
	public int compare(Gril gril) {
		return this.age - gril.getAge();
	}	
}
```

```java
// 测试这两个类
public class BoyGrilTest {
	public static void main(String[] args) {
		// 先创建第一个男孩
		Boy boy1 = new Boy("罗密欧",21);
		// 创建第一个女孩
		Gril gril1 = new Gril("朱丽叶",19);
		boy1.marry(gril1); //=> 我想娶朱丽叶
        // 将创建的第一个男孩对象传递给这个女孩对象
		gril1.marry(boy1); //=> 我想嫁给罗密欧 \n 我想娶朱丽叶
		
		// 创建第二个女孩
		Gril gril2 = new Gril("祝英台",19);
		int comper = gril1.compare(gril2);
		if(comper > 0) {
			System.out.println(gril1.getName() + "大");
		}else if(comper < 0) {
			System.out.println(gril2.getName() + "大");
		}else {
			System.out.println("一样大"); //=> 此行打印
		}
	}
}
```

## 数组动态扩容

[练习二代码地址](https://gitee.com/szxio/java/tree/master/06Java%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1-%E4%B8%8A/man/src/com/songzx/exer02)

```java
/**
* 对数组进行动态扩容
* @param size
*/
public void resize(int size) {
    // 先定义一个临时数组执行原数组
    Customer[] tempCus = this.customers;
    // 创建一个新长度的数组
    this.customers = new Customer[size];
    // 将原数组的数据复制到新数组中
    for(int i = 0; i < tempCus.length; i++) {
        this.customers[i] = tempCus[i];
    }
}
```

```java
public void addCustomer(String name) {
    // 创建新客户前先判断当前的客户数组是否还有空间
    if(this.customerLength == this.customers.length) {
        // 如果客户数组的空间满了，继续往上扩容10个
        resize(this.customerLength + 10);
    }		
    // 创建一个客户对象
    Customer cust = new Customer(name);
    // 往客户对象中添加创建好的客户实例
    // 后++表示先赋值后自增
    this.customers[this.customerLength++] = cust;
}
```

## package 关键字的使用

- 为了更好的管理我们项目中的多个类，提供了包的概念
- 应该在源文件的首行使用 package 声明类或者方法所属的包
- 包属于标识符，应该遵循标识符命名规范（xxxyyyzz），应该做到见名知意
- 每 “ . ” 一次，就代表一层文件目录
- 同一个包下，不能命名同名的类，在不同的包下可以命名同名类

```java
// 使用 package 声明了这个类在 day02Java 包下
package com.songzx.day02Java; 

public class PackageTest07 {
	public static void main(String[] args) {
		// package 包的使用
	}
}
```

## MVC 设计模式（初识）

MVC是常用的设计模式之一，将整个程序分为三个层次：

- 视图模型层（view）
- 控制器层（controller）
- 数据模型层（modal）

这种将程序的输入，数据处理，以及数据展示分离开来的设计模式，是程序结构变得灵活而清晰，同时也描述了各个对象之间的通信方式，降低了程序的耦合性

## import 关键字使用

- 在源文件中可以显示的使用 import 关键字导入指定包下面的类、接口
- 声明的位置在包声明和类声明之间
- 如果需要导入多个结构，可以并列的导入
- 可以使用 “XXX*” 的方式导入 XXX 包下面的所有结构
- 如果使用的是 java.lang 包下面定义的类或者接口，则可以不用导入 java.lang
- 如果使用的接口或者类是在本包下定义的，则不用导入
- 在源文件中，如果使用了不同包下面的同名类，则至少有一个类需要使用全类名的方式来使用
- 使用 “ XXX* ” 的方式调用了 XXX 下面的子包下面的结构，仍然需要使用 import 来导入
- import static : 导入指定类或接口中的静态结构：属性、方法

```java
// 可以使用 import 显示的导入其他包下面的类
import com.songzx.javaobject.ArrayUtil;
// 使用 import.XXX.YYY.* 可以导入 XXX.YYY包下的所有类
import com.songzx.javaobject.*;
// 如果使用不同包下面的同名类，至少有一个全类名使用
import com.songzx.exer01.Account;

public class ImportTest08 {
	public static void main(String[] args) {
		ArrayUtil au = new ArrayUtil();
		javaobject01 obj01 = new javaobject01();
		// 使用自己包下面的类不用导入
		SetValue03 setval = new SetValue03();
		Account a01 = new Account();
		// // 如果使用不同包下面的同名类，至少有一个全类名使用
		com.songzx.exer02.Account a02 = new com.songzx.exer02.Account(0);
	}
}
```

