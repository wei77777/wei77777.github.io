---
title: 07Java面向对象-中
tags: Java
categories: Java基础
abbrlink: c29aaa
date: 2022-02-12 21:12:16
---

## Eclipse 快捷键

- 补全代码 Ctrl + / 

- 快速修复 Ctrl + 1

- 批量导包 Ctrl + shift + o

- 批量单行注释 Ctrl + / 

- 使用多行注释 Ctrl + shift  + \

- 取消多行注释 Ctrl + alt + down 或 Ctrl + alt + up

- 删除指定行代码 Ctrl + d

- 上下移动代码 alt + up 或者 alt + down

- 切换到下一行代码空位 shift + enter

- 切换到上一行代码空位 Ctrl + shift + enter

- 查看源码 Ctrl + 选中指定结构

- 光标选中指定类，查看继承结构 Ctrl + t

- 调出生成 getter/setter 构造器等结构：alt + shift + s

- Ctrl + t 查看类的继承关系

  

## 完成项目二

[项目源码地址](https://gitee.com/szxio/java/tree/master/project02-%E5%AE%A2%E6%88%B7%E4%BF%A1%E6%81%AF%E7%AE%A1%E7%90%86%E7%B3%BB%E7%BB%9F)

## 类的继承性

继承性的好处

- 减少了代码的冗余，提高代码复用性
- 便于扩展功能
- 为之后多态的使用提供了前提

继承性的体现

- 继承的格式为 `class A extends B{}` , 表示为 A 继承了 B，A 为子类，B 为父类
- 一旦 A　继承了B那么A类中就获取了B类中的所有属性和方法
- 子类继承父类以后还可以拥有自己的属性和方法实现功能上的扩展、延申

Java中关于继承的规定

- 一个类可以被多个子类继承
- Java中类为单继承性，一个类只能有一个父类
- 子父类是相对概念
- 子类直接继承的父类称为直接父类，间接继承的父类称为简介父类
- 子类继承父类后就获取了直接父类和间接父类的所有属性和方法

Object 类

- Java中所有的类都直接或者间接的继承 Object 类
- 当我们没有显示的给一个类设计继承关系时，则默认的直接继承 Object
- 所有的类都拥有 Object 类的所有属性和方法

```java
public class ExtendsTest01 {
	public static void main(String[] args) {
		Person p1 = new Person();
		PersonChilder p2 = new PersonChilder();
		p1.pring(); //=> 我是Person类打印的
		/**
		 * 由于PersonChilder类继承了Person,所以这类实例化出来的对象p2拥有p1对象的所有属性和方法
		 */
		p2.pring(); //=> 我是Person类打印的
	}
}

class Person{
	String name;
	int age;
	
	public void pring() {
		System.out.println("我是Person类打印的");
	}
}
// PersonChilder 继承了上面的 Person 类的属性和方法
class PersonChilder extends Person{
	
}
```

Java中多重继承的体现

```java
public class ExtendsTest02 {
	public static void main(String[] args) {
		Person2 p = new Person2();
		p.speak(); //=> 说话
		p.sleep(); //=> 睡觉
	}
}

class Speak{
	public void speak() {
		System.out.println("说话");
	}
}
class Sleep extends Speak{
	public void sleep() {
		System.out.println("睡觉");
	}
}
// Person2直接继承Sleep,间接继承于Speak
class Person2 extends Sleep{
	
}
```

## Eclipse 调试

1.新建和删除断点，在需要设置的断点的行号前双击即可添加一个断点，再次双击这个断点就会取消断点

![添加断点.png](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/%E6%B7%BB%E5%8A%A0%E6%96%AD%E7%82%B9.png)

2.开始调试

![开始调试.png](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/%E5%BC%80%E5%A7%8B%E8%B0%83%E8%AF%95.png)

![断点页面.png](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/%E6%96%AD%E7%82%B9%E9%A1%B5%E9%9D%A2.png)

3.在打开的调试页面一行行执行代码，查看变量值和程序运行逻辑

![调试页面.png](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/%E8%B0%83%E8%AF%95%E9%A1%B5%E9%9D%A2.png)

## 方法重写

1.定义：子类继承父类后，可以对父类中的同名方法进行重写覆盖操作

2.应用：重写以后，当创建了子类对象后，调用子类中重写父类的同名同参方法时，实际调用的是子类中重写的方法，不会再去调用父类中的同名方法

3.重写的规定

- 子类中叫做重写的方法，父类中叫做被重写的方法
- 子类中重写的方法名和参数名应该都和父类相同
- 子类重写的方法的权限修饰符不小于父类被重写方法的权限修饰符
  - 特殊情况：子类不能重写父类中权限是 private 的方法
- 返回值的类型
  - 父类中被重写的方法返回值时 void 时，子类中重写的方法返回值也只能是 void
  - 父类中被重写的方法的返回值是 A 类，则子类中重写的方法返回值可以是 A 类或者 A 的子类
  - 父类中被重写的方法返回值是基本数据类型时，子类中的重写方法的返回值也必须和父类被重写的方法的返回值相同
- 子类重写的方法抛出的异常类型不大于父类被重写的方法抛出的异常类型

4.子类和父类同名同参的方法要么都是 static 或者要么都不是 static 类型

```java
/**
 * 这个类为父类，声明一些被重写的方法
 * @author Administrator
 *
 */
public class Overrides03 {
	int age;
	
	public Overrides03() {
		age = 17;
	}
	
	// 父类的方法的重写叫做被重写的方法
	public void printInfo() {
		System.out.println("小明今年" + age + "岁");
	}
	/**
	 * 返回一个整形的被重写方法
	 */
	public int getAge() {
		return this.age;
	}
	/**
	 * 增加年龄，权限大小为 缺省
	 * @param addnumber
	 */
	void addAge(int addnumber) {
		age += addnumber;
		System.out.println(age);
	}
	/**
	 * 父类权限是 private 的方法不能被子类重写
	 */
	private void findAge() {
		System.out.println(age);
	}
}
```

```java
public class OverridesTest04 extends Overrides03{
	public static void main(String[] args) {
		Overrides o = new Overrides();
		o.printInfo(); //=> 李四今年18岁
		o.addAge(10); //=> 李四,28
	}
}

/**
 * 该类为子类，继承 Overrides03 父类
 * 重写父类中的一些方法
 * @author Administrator
 *
 */
class Overrides extends Overrides03{
	int age;
	String name;
	
	public Overrides() {
		name = "李四";
		age = 18;
	}
	
	// 子类中定义的方法如果和父类中定义的方法重名，我们称之为方法重写
	public void printInfo() {
		System.out.println(name + "今年" + age + "岁");
	}
	/**
	 * 重写父类的带有返回值的方法
	 * 重写父类方法时，方法名和参数名都必须相同
	 */
	public int getAge() {
		return this.age;
	}
	/**
	 * 重写的方法权限大小不小于被父类被重写的方法
	 */
	public void addAge(int number) {
		age += number;
		System.out.println(name + "," +  age);
	}
}
```

## 再看权限修饰符

- private 
- 缺省 define
- protected
- public

设置一个父类有四种权限级别的属性和方法

```java
public class QuanXian05 {
	private int order_Private;
	int order_Default;
	protected int order_Protected;
	public int order_Public;
	
	// 同类中四种权限都可以使用
	private void privateMethod() {
		order_Private = 1;
		order_Default = 1;
		order_Protected = 1;
		order_Public = 1;
	}
	void defaultMethod() {
		order_Private = 1;
		order_Default = 1;
		order_Protected = 1;
		order_Public = 1;
	}
	protected void protectedMethod() {
		order_Private = 1;
		order_Default = 1;
		order_Protected = 1;
		order_Public = 1;
	}
	public void publicMethod() {
		order_Private = 1;
		order_Default = 1;
		order_Protected = 1;
		order_Public = 1;
	}
}
```

在同包不同类中使用情况，可以使用 default（缺省）、protected、public

```java
public class QuanXianTest06 {
	public static void main(String[] args) {
		QuanXian05 q = new QuanXian05();
		
		// 同一个包下不同类中间 private 不能使用
		q.order_Default = 1;
		q.order_Protected = 1;
		q.order_Public = 1;
		q.defaultMethod();
		q.protectedMethod();
		q.publicMethod();
	}
}
```

在不同包的子类中，能使用 protected、public

```java
import main.songzx.java01.QuanXian05;
public class QX02 extends QuanXian05 {
	public static void main(String[] args) {
		QX02 q = new QX02();
		// 不同包下的子类，可以使用 protected、public 
		q.order_Protected = 1;
		q.order_Public = 1;
		q.protectedMethod();
		q.publicMethod();
	}
}
```

在不同包下不是子类中，只能使用 public

```java
import main.songzx.java01.QuanXian05;
public class QX01 {
	public static void main(String[] args) {
		QuanXian05 q = new QuanXian05();
		// 不同包不同类只能使用 public 权限
		q.order_Public = 1;
		q.publicMethod();
	}
}
```

## super 使用

- 我们可以在子类的方法或者构造器中使用 `super.属性 ` 或 `super.方法` 的方法来显示的调用父类的属性和方法，但是在通常情况下，我们会省略 super. 这样默认会使用 this. 的方法来调用，this 会先查找本类中的属性和方法，找不到是在去父类中查找，而 super. 会直接去父类查找
- 当子类和父类中定义了同名的属性时，我们想要在子类中使用父类的属性，则必须显示的使用 `super.属性`,表明调用的是父类中属性
- 当子类和父类中定义了同名的方法时，我们想要在子类中使用父类的方法，也必须使用 `super.方法` 来调用父类中的方法，表明调用的是父类中被重写的方法

例如：在父类中声明一个 int 类型的 id，和一个 show 方法

```java
public class Super07 {
	int id = 1001;
	public void show() {
		System.out.println("父类：吃饭睡觉");
	}
}
```

然后在子类中使用 super 来显示的调用父类中的属性和方法

```java
public class SuperTest08 {
	public static void main(String[] args) {
		SuperTest s = new SuperTest();
		s.print();
	}
}

// 子类继承父类 Super07
class SuperTest extends Super07 {
	int id = 1002;

	public void show() {
		System.out.println("子类：打豆豆");
	}

	public void print() {
		// 读取属性前面没有标识符时默认是 this.xxx ，this 会先在子类中查找，然后再去父类查找
		// 如果子类能查到，则获取子类的值，当子类没有这个属性时再去父类查找
		System.out.println(id); // => 1002
		// 加上一个 super 表示直接去父类查找 id
		System.out.println(super.id); // => 1001
		// 调用子类中的 show 方法
		show(); //=> 子类：打豆豆
		super.show(); //=> 父类：吃饭睡觉
	}
}
```

## super 调用构造器

- 我们可以在子类中显示的使用 `super(形参列表)` 来调用父类中指定的构造器
- `super(形参列表) ` 必须定义在子类构造器的首行
- 我们在类的构造器中使用 `super(形参列表)` 或者 `this(形参列表)`  只能二选一，不能同时存在
- 我们在构造器首行如果没有显示的声明 `super(形参列表)` 或者 `this(形参列表)` 默认使用的是 `super(形参列表)`
- 在类的 n 个构造器中至少有一个类的构造器使用了 `super(形参列表)`

在父类中声明一个带参数的构造器

```java
public class Super07 {
	int id = 1001;
	
	public Super07(int i) {
		id = i;
	}
	public void show() {
		System.out.println("父类：吃饭睡觉");
	}
}
```

在子类中使用 super 显示的调用父类中的构造器

```java

// 子类继承父类 Super07
class SuperTest extends Super07 {
	int id = 1002;
	
	public SuperTest() {
		// 在子类中的构造器中使用 super(形参列表) 调用父类中的构造器
		super(1003);
	}
}
```

## 子类对象实例化的过程

从结果上看（继承性）

- 子类继承父类后，就获取了父类中的所有属性和方法
- 创建子类对象，在堆空间中就会加载所有父类的属性和方法

从过程上看

​		当我们使用子类的构造器创建子类对象时，我们一定会直接或者间接的调用父类的构造器，然后父类会直接或者间接的调用父类的父类的构造器，一直调用到 java.long.Object 的空参构造器为止。正因为加载过所有父类的构造器，所以才可以看到内存中父类的结构，子类对象才可以进行调用

明确：虽然创建子类对象时调用了父类的构造器，但是自始至终就创建了一个对象，就是 new 出来的那个对象

## super 和继承性练习

[源码地址](https://gitee.com/szxio/java/tree/master/07Java%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1-%E4%B8%AD/main/src/main/songzx/exer02)

## 多态性的使用

1.理解多态性

- 可以理解为一种事物的多种形态

2.什么是多态

- 对象的多态，父类的引用指向子类的对象，或子类的对象赋给父类的引用

3.多态的使用，虚拟方法调用

- 有了对象的多态性以后，我们在编译器只能调用父类中声明的方法，但在运行期，我们执行的是子类重写父类的方法。
- 总结：编译看左边，运行看右边

4.多态性使用的前提

- 类的继承关系
- 子类重写父类的方法

```java
/**
 * 声明一个父类
 * @author Administrator
 *
 */
public class Person {
	int age;
	String name;
	
	public void eat() {
		System.out.println("人：吃饭");
	}
	public void walk() {
		System.out.println("人：走路");
	}
}
```

```java
/**
 * 声明一个男人类
 * 继承父类 Person
 * @author Administrator
 *
 */
public class Man extends Person{
	public void eat() {
		System.out.println("男人多吃");
	}
	public void walk() {
		System.out.println("男人霸气的走路");
	}
	public void earnMoney() {
		System.out.println("男人多挣钱");
	}
}
```

新建一个测试类，理解多态的使用

```java
/**
 * 多态性的体现
 * @author Administrator
 *
 */
public class PersonTest {
	public static void main(String[] args) {
		Person p = new Person();
		p.eat();
		p.walk();
		
		Man m = new Man();
		// 对父类方法的重写
		m.eat();
		m.earnMoney();
		m.walk();
	
		System.out.println("*****************************");
		// 多态的体现
		Person p1 = new Man();
		// 只能使用字符类中都存在的同名方法
		// 多态的使用，当调用子父类的同名方法时，实际上调用的是子类重写父类的方法---虚拟方法的使用
		p1.eat();
		p1.walk();
		// p1.earnMoney(); //=> Person 中没有声明的方法不能使用
	}
}
```

## 虚拟方法

正常情况下，调用类中的方法是这样的

```java
public class Person01 {
	public static void main(String[] args) {
		// 正常情况下调用的都是自己类中的方法
		PersonTest p = new PersonTest();
		p.eat();
		Student s = new Student();
		s.getinfo();
	}
}
class PersonTest{
	int age;	
	public void eat() {
		System.out.println("吃饭");
	}
}
class Student{
	int id;
	public void getinfo() {
		System.out.println(id);
	}
}
```

虚拟方法的调用（多态的情况下）

子类中定义了和父类同名同参的方法，在多态的情况下，此时父类的方法被称为虚拟方法。父类根据赋给他的不同子类对象，动态调用属于子类的方法，这样的方法在编译期是无法确定的，**只有在运行时期才能确定**。

```java
public class Person01 {
	public static void main(String[] args) {
		// 正常情况下调用的都是自己类中的方法
		PersonTest p = new Student();
		// 此时 p.eat 方法不是 PersonTest 类中的方法
		// 实际调用的是 Student 类中的 eat 方法
		p.eat(); //=> 学生要吃有营养的
	}
}
class PersonTest{
    // 多态情况下，调用子父类的同名同参方法时，父类的方法称为 虚拟方法
	public void eat() {
		System.out.println("随便吃点");
	}
}
class Student extends PersonTest{
    // 子类的方法时实际调用的方法
	public void eat() {
		System.out.println("学生要吃有营养的");
	}
}
```

编译时类型和运行时类型

上述代码在编译时 p 为 PersonTest 类型，而 eat 方法调用是在运行时确定的，调用的是 Student 类中的 eat 方法，这中称为 **动态绑定**

## 区分重载和重写

定义不同

- 重载：在同一个类中，我们可以定义同名不同参的方法，同名方法之间就构成了重载，构造器也可以进行重载
- 重写：在子类继承父类的前提下，子类可以定义和父类同名同参的方法，这样就构成了重写

定义的规则不同

- 重载：两同一不同：同一个类、同一个方法名、形参列表不同
- 重写：子父类之间有继承关系，同一个方法名，形参列表相同，返回值相同，子类的权限大于等于父类权限，抛出的异常小于等于父类

重载不认为是多态性的体现，重写认为是多态性。

## 向下转型的使用

```java
public class DownType {
	public static void main(String[] args) {
		// 多态，也可以成为 向上转型
		Person p = new Man();
		p.eat();
		// 强制将父类的对象转成子类对象
		// 这种行为成为 向下转型
		Man m = (Man)p;
		m.isHaveMoney();
        
        // 这种转换不会成功，因为p的实际引用地址是Man类，Man不能转成WoMen
		// WoMen w = (WoMen)p;
		// w.goToShopping();
	}
}
class Person{
	public void eat() {
		System.out.println("男人必须多吃");
	}
}
class Man extends Person{
	boolean isBig;
	public void isHaveMoney() {
		System.out.println("男人必须有钱");
	}
	public void eat() {
		System.out.println("男人必须多吃");
	}
}
```

## instanceof 关键字的使用

```java
/**
 * instanceof 关键字
 * a instanceof A
 * 判断对象 a 是否是 类 A 的实例，一般在做向下转型是先用 instanceof 判断一下
 * 如果是则返回true，否则返回false
 * @author Administrator
 *
 */
public class Instancesof {
	public static void main(String[] args) {
		Person p = new Man();
		p.eat();
		System.out.println(p instanceof Object); //=> true
		System.out.println(p instanceof Person); //=> true
		System.out.println(p instanceof Man); //=> true
		System.out.println(p instanceof WoMan); //=> false
        // 判断 p 是否是类 Man 的实例
		if(p instanceof Man) {
			Man m = (Man)p;
			m.isHaveMoney();
		}
		// p 不是类 WoMan 的实例，所以不会进入if里面
		if(p instanceof WoMan) {
			WoMan w = (WoMan)p;
			w.goToShopping();
		}
	}
}
```

## 多态调用与属性无关

```java
/**
 * 多态性练习
 * 调用属性和方法
 * @author Administrator
 *
 */
public class ExtendsExer03 {
	public static void main(String[] args) {
		Sub s = new Sub();
		System.out.println(s.count); //=> 10
		s.getCount(); //=> 10
		
		// 将 s 对象的引用地址赋值给 b
		Base b = s;
		// 引用数据类型变量赋值赋的是引用地址，b s 指向同一个引用地址，所以返回true
		System.out.println(b == s); //=> true
		// 多态调用不会调用属性，因此这里打印的是 Base 类中的 count 的值
		System.out.println(b.count); //=> 20
		// 由于 Sub 类中也有 getCount 方法，和 Base 类中的 getCount 方法构成重写
		// 所以实际执行的是 Sub 类中的 getCount 方法，this 指向当前类，所以打印 10
		b.getCount(); //=> 10
	}
}

class Base{
	int count = 20;
	public void getCount() {
		System.out.println(this.count);
	}
}
class Sub extends Base{
	int count = 10;
	public void getCount() {
		System.out.println(this.count);
	}
}
```

## 多态调用练习

```java
public class BaseTest {
	public static void main(String[] args) {
		Base b = new Sub();
		// 这个方法按照 Base 类中的参数列表去接，但是执行的是 Sub 类中的 add 方法
		// 只有当 Base 类中的 add 方法参数列表对应上之后才会去执行子类中的 add 方法
		// Sub 类中的第二个 add 没有构成对 Base 类中 add 方法重写，因为形参列表不同
		// 所以打印结果是 Sub1
		b.add(4, 5, 6); // => Sub1

		// 将 b 向下转型转成 Sub 后，执行的 add 由于形参个数是确定的
		// 将执行add的重载方法，也就是第二个方法
		Sub s = (Sub) b;
		s.add(4, 5, 6); // => Sub2
	}
}

class Base {
	public void add(int i, int... args) {
		System.out.println("Base");
	}
}

class Sub extends Base {
	// Sub类中的第一个add方法对Base类中的add方法构成了重写
	// 因为可变形参的书写方式 int ...args 和 int[] args 意思是一样的
	public void add(int i, int[] args) {
		System.out.println("Sub1");
	}

	// 虽然第二个add方法和Base中的add方法同名，但是形参列表不同
	// 无法构成重写
	public void add(int i, int k, int j) {
		System.out.println("Sub2");
	}
}
```

## equals 使用

1.回顾 == 的使用

- 基本数据类型使用 == 判断时比较的是具体的值，除了不能和布尔类型的比较外，其他的基本数据类型都可以使用 == 来判断两个数据是否相等
- 当两个引用数据类型的数据使用 == 判断时则比较的是引用地址

2.equals 的使用

- equals 是一个方法，首先就排除了基本数据类型使用 equals 

- Object 中的 equals 方法定义比较的还是两个引用数据类型的地址，源码如下

  ```java
  // boolean java.lang.Object.equals(Object obj)
  public boolean equals(Object obj) {
      return (this == obj);
  }
  ```

- 像 String、Date、File、包装类等都重写了 Object 中的 equals 方法，使之比较的是两个对象的 “实体内容” 是否相等

- 通常情况下，我们自定义类使用 equals 比较的话也是比较两个对象的 **实例内容** 是否相等，那么我们就需要对 Object 类中的 equals 方法进行重写

- 重写的原则：比较两个对象的实体内容是否相等

```java
// 引用数据类型的比较
// 引用数据类型比较的是引用地址，不是具体的值
String s1 = new String("hello");
String s2 = new String("hello");
System.out.println(s1 == s2); //=> false
// 这里的 equals 使用的是 String 类中重写之后的方法
// boolean java.lang.String.equals(Object anObject)
System.out.println(s1.equals(s2)); //=> true

// 自定义类比价
Customer cu1 = new Customer("Time",18);
Customer cu2 = new Customer("Time",18);
// boolean java.lang.Object.equals(Object obj)
System.out.println(cu1.equals(cu2)); //=> false
```

## 重写 equals 

一般情况下，我们使用 equals 并不是想判断两个对象实例的引用地址是否相同，而是想像 == 那样判断两个实例的具体值是否相等。那么针对这种情况我们就需要对 equals 对象进行重写

以 Customer 类为例，来重写 Object 类中的 equals 方法。

```java
// 声明一个Customer类，里面有age和name两个属性，和一个构造器，以及重写的equals方法
public class Customer {
	String name;
	int age;

	public Customer(String name, int age) {
		super();
		this.name = name;
		this.age = age;
	}
	/**
	 * 重写equals方法，来判断两个类的值是否相同
	 */
	@Override
	public boolean equals(Object obj) {
		// 首先判断两个对象的地址值是否相同
		if (this == obj) {
			return true;
		}
		// 判断传递过来对象 obj 是否是 Customer 的实例
		if (obj instanceof Customer) {
			/**
			 * 由于equals接收的参数时用Object来接收的，
			 * 所以传递过来的Customer类的实例被自动向上转型为Object类型
			 * 此时obj由于是Object类型，我们就无法使用obj在Customer中特有的数据
			 * 所以需要使用Customer来强转一下才能使用特有的东西
			 */
			Customer cus = (Customer) obj;
			// 如果当前的对象实例和参数都数据Customer实例
			// 则比较age和name是否相等，返回 true或者false
			return this.age == cus.age && this.name.equals(cus.name);
		}
		// 都不符合条件时返回false
		return false;
	}
}
```

重写完成之后 new 出来两个对象，使用 equals 判断两个对象是否相等

```java
// 自定义类比较
Customer cu1 = new Customer("Time",18);
Customer cu2 = new Customer("Time",18);
System.out.println(cu1.equals(cu2)); //=> true
```

## 自动生成 equals 方法

在 eclipse 开发工具中我们也可以自动生成 equals 方法，具体操作如下

1.首先点击顶部菜单栏中的 `Source`

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/javamaster/重写equals方法1.png)



2.在弹出的菜单中选择 `Generate hashCode() and equals() `，然后选择要进行比较的数据，点击 `Generate`

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/javamaster/重写equals方法2.png)

3.系统会自动生成 `hashCode()` 和 `equals()`

```java
@Override
public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + age;
    result = prime * result + ((name == null) ? 0 : name.hashCode());
    return result;
}

@Override
public boolean equals(Object obj) {
    if (this == obj)
        return true;
    if (obj == null)
        return false;
    if (getClass() != obj.getClass())
        return false;
    Customer other = (Customer) obj;
    if (age != other.age)
        return false;
    if (name == null) {
        if (other.name != null)
            return false;
    } else if (!name.equals(other.name))
        return false;
    return true;
}
```

## == 和 equals 的区别

- == 即可以比较基本数据类型也可以比较引用数据类型，对于基本数据类型比较的是具体的值，对于引用数据类型比较的是内存地址
- equals 是 java.lang.Object 类里面的一个方法，如果该方法没有被重写，则默认也是 ==，String、Date等类的 equals 方法是被重写过的
- 通常情况下。重写 equals 方法都是比较类中的属性是否都相等

## toString 的使用

toString 的使用前提是值不能是 null，否则会报错

```java
public class ToStringTest {
	public static void main(String[] args) {
		Customer c = new Customer("Time",18);
		/**
		 * 没有对 toString 重构之前的源码，打印的是地址值
		 * public String toString() {
		      return getClass().getName() + "@" + Integer.toHexString(hashCode());
		   }
		 */
		// 当我们输出一个对象的引用时，默认执行的就是当前对象的 toString 方法
		System.out.println(c); //=> main.songzx.java07.Customer@27ccdc
		System.out.println(c.toString()); //=> main.songzx.java07.Customer@27ccdc
	
		String s = new String("hello");
		// String 类的toString 方法重写的Object 的toString 方法，使其打印具体值
		System.out.println(s.toString()); //=> hello
		
		
		/**
		 * 在自定义类中重写toString方法
		 * public String toString() {
				return "Customer [name=" + name + ", age=" + age + "]";
			}
		 */
        // 重写 toString 方法后打印的值
		System.out.println(c); //=> Customer [name=Time, age=18]
	}
}
```

## 单元测试的方法

步骤：

- 1.选中当前工程 - 右键选择：build path -add libraries - JUnit 4 下一步
- 2.创建一个Java类，进行单元测试
  - 此时的Java类要求
  - 此类时 public 类型的
  - 此类提供一个空参的构造器，默认的就可以
- 3.在类中声明单元测试方法
  - 方法的权限是 public
  - 方法没有返回值，没有参数
- 4.在单元测试上添加注解：@Test，并在单元测试类中导入 `import org.junit.Test`
- 5.声明好单元测试方法以后，就可以在方法体内测试相关代码
- 6.写完代码后，左键双击方法名，右键选择 `run as - JUnit Test`

```java
// 要在类中导入单元测试包
import org.junit.Test;

public class JUnitTest {
	String name = "Hello";
	@Test
	public void testEquals() {
		String s1 = new String("MM");
		String s2 = new String("MM");
		String s3 = "Hello";
		System.out.println(s1.equals(s2));
		// 单选测试类中可以像普通方法一样访问类中声明的属性和方法
		System.out.println(s3.equals(name));
		pring();
	}
	public void pring() {
		System.out.println("print...");
	}
}
```

## 包装类（Wrapper）

- 针对八种基本数据类型定义相应的引用类型 -- 包装类
- 有了类的特点，就可以调用类中的方法
- 除了 int、char 这两种基本数据类型的包装类名称有点不同，其他基本数据类型的包装类名称都是首字母大写的类

| 基本数据类型 | 对应的包装类 |
| :----------: | :----------: |
|     byte     |     Byte     |
|    short     |    Short     |
|     int      |   Integer    |
|     long     |     Long     |
|    float     |    Float     |
|    double    |    Double    |
|   boolean    |   Boolean    |
|     char     |  Character   |

## 基本数据类型转换为包装类

```java
import org.junit.Test;

public class WrapperTest {
	@Test
	public void test1() {
		// 声明一个int型的基本数据类型
		int num = 123;
		// 将基本数据类型转换为包装类
		Integer num2 = new Integer(num);
		System.out.println(num2.toString()); //=> 123
		// 也可以将一个字符串类型的数字转换为 int 类型
		Integer num3 = new Integer("12346");
		System.out.println(num3); //=> 12346
        
        // char类型和int类型的包装类名字有所不同，其他的基本数据类型的包装类首字母都大写
		Character c = new Character('深');
		System.out.println(c.toString());
		
		// 布尔类型包装类
		Boolean b1 = new Boolean(true);
		// 当声明一个布尔类型的包装类时，传递的字符串参数只有是不区分大小写的true的情况下是true
		Boolean b2 = new Boolean("true");
		// 字符串不是 true 时返回的都是 false
		Boolean b3 = new Boolean("true123");
		System.out.println(b1); //=> true
		System.out.println(b2); //=> true
		System.out.println(b3); //=> false
		
		BooleanTest btest = new BooleanTest();
		System.out.println(btest.b1); //=> false
        // 包装类的默认值都是null
		System.out.println(btest.b2); //=> null
	}
}

class BooleanTest{
	boolean b1; //=> 基本数据类型 布尔值 的默认值为 false
	Boolean b2; //=> 布尔值的包装类又是是一个引用类型，默认值是 null
}
```

## 包装类转换成基本数据类型

调用某个包装类的 xxxValue() 方法可以返回这个基本数据类型的数据，然后用这个基本数据类型来接收，就得到该基本数据类型的数据

```java
// 声明一个 int 包装类
Integer num = new Integer(15);
// 将这个 int 包装类转换成 int 基本数据类型
// 调用 xxxValue() 方法，返回的是这个数据类型的数据
// 然后用这个数据类型来接收返回的数据，就得到了由这个包装类转换出来的基本数据
int i = num.intValue();
System.out.println(i + 1); //=> 16

// 声明一个 double 包装类
Double d = new Double(12.5);
double d2 = d.doubleValue();
System.out.println(d2 + 5.6); //=> 18.1
```

## 包装类之自动装箱和自动拆箱

此功能为jdk5.0新特性，在此版本之前不能使用

### 自动装箱：

表示我们声明某个类型的包装类时不用再通过 new 的方式去创建，而是可以让某个包装类直接等于某个基本数据类型的数据

```java
// 自动装箱，可以让一个包装类直接等于基本数据类型的数据，不用在通过 new 类创建
Integer num = 15;
System.out.println(num.toString()); //=> 15
```

### 自动拆箱：

自动拆箱表示我们可以使用一个基本数据类型去等于该类型包装类的数据，不需要在通过 xxxValue() 的方式去获取该类型包装类的数据

```java
// 自动拆箱。我们可以使用基本数据类型等于该基本数据类型的包装类
int i = new Integer(15);
System.out.println(i + 5); //=> 20
```

## String 类型和 基本数据类型、包装类之间相互转换

### 基本数据类型转换成 String

调用 String 类型的 valueOf 方法

```java
// 基本数据类型转换成 String 类型
int int_i = 15;
System.out.println(int_i + 5); //=> 20
// 使用 String.valueOf(基本数据类型的数据) 可以将基本数据类型转换成 String
String str_i = String.valueOf(int_i);
System.out.println(str_i + 5); //=> 155
```

### 包装类转换成 String

```java
// 包装类转换成 String 
Integer ger_i = 15;
System.out.println(ger_i.toString()); //=> 15
String str_i2 = String.valueOf(ger_i);
System.out.println(str_i + 5); //=> 155
```

### String 类型转换成基本数据类型

调用该基本数据类型包装类的 parseXXX 方法,例如： `Integer.parseInt()`

```java
// String 类型转换成基本数据类型
String s1 = "123";
System.out.println(s1 + 4); //=> 1234
// 调用对应包装类的 parseInt 方法，将String转换成基本数据类型
int int_s1 = Integer.parseInt(s1);
System.out.println(int_s1 + 4); //=> 127
```

### String 类型转换成包装类

```java
// String 类型的数据转换成包装类
String s2 = "123";
Integer ger_s2 = Integer.parseInt(s2);
System.out.println(ger_s2.toString()); //=>123
```

## 包装类的常见面试题

- 三元运算符中表达式1和表达式2必须可以统一成一种类型

  下面的第一个题目中 int 类型自动提升成了 double 类型，所以结果打印 1.0

  ```java
  // 在三元运算符中，先不管最终那个代码会被执行
  // 会先要求两个运算返回结果的类型必须统一
  // 然后再去进行三元判断
  // 下面的题目中 int 类型会自动向上类型提升为 double，所以结果打印 1.0
  Object i1 = true ? new Integer(1) : new Double(1.0);
  System.out.println(i1.toString()); //=> 1.0
  
  // 两个执行代码中类型提升和三元判断有关，if 判断不会自动类型提升
  Object i2;
  if(true) {
      i2 = new Integer(1);
  }else {
      i2 = new Double(1.0);
  }
  System.out.println(i2.toString()); //=> 1
  ```

- Integer 包装类中缓存好的包装类数组

  查看下面题目中的打印结果

  ```java
  /*
  * 显示的使用 new 类中声明了一个 int 类型的包装类
  * 此时 i1 和 i2 的数据类型是引用类型
  * 虽然默认读取i1和i2会走toString方法返回具体的数字
  * 但是在使用 == 比较两个引用数据类型时比较的是地址值，所以返回 false
  * 使用 equals 去判断时返回的是 true
  */
  Integer i1 = new Integer(1);
  Integer i2 = new Integer(1);
  System.out.println(i1 == i2); //=> false
  System.out.println(i1.equals(i2)); //=> true
  
  /*
  * 在 Integer 内部定义了一个 IntegerCache 结构
  * IntegerCache 中定义了一个 Integer 的数组
  * 这个数组中保存了从 -128 ~ 127 范围内的整数的包装类
  * 如果我们使用自动装箱的方式，给 Integer 赋值的范围在 -128~127之间
  * 则使用的是数组中的元素，因此当使用自动装箱声明了两个相同的在这个范围内的值给 Integer 时
  * 他们两个指向的地址值的相同的，所以用 == 去判断这个两个地址值一定会返回 true
  * 当赋的值超过了这个范围时，就相当于重新 new 了一个 Integer，所以地址值是不相同的，固结果返回 false
  */
  Integer j1 = 1;
  Integer j2 = 1;
  System.out.println(j1 ==j2); //=> true
  
  // 因为声明的值超出了 -128~127 这个范围，相当于重新new了两个Integer，所以地址值是不一样的
  Integer k1 = 128;
  Integer k2 = 128;
  System.out.println(k1 == k2); //=> false
  ```

  ## 包装类和自动拆箱自动装箱练习

  ```java
  import java.util.Scanner;
  import java.util.Vector;
  
  /*
   * 自动装箱和自动拆箱练习
   */
  public class ScoreTest {
  	public static void main(String[] args) {
  		Vector v = new Vector();
  		Scanner s = new Scanner(System.in);
  		int Max = 0;
  		for(;;) {
  			System.out.println("请输入学生成绩（负数结束）");
  			int score = s.nextInt();
  			if(score < 0) {
  				break;
  			}
  			if(score > 100) {
  				continue;
  			}
  			// 将score转换成Integer
  			// jdk5.0之前
  //			Integer scoreGer = new Integer(score);
  			// 获取一个最大值
  			Max = Max > score ? Max : score;
  			// jdk5.0之后可以直接传递
  			v.addElement(score);
  		}
  		System.out.println("最高分是：" + Max);
  		char level;
  		for(int i = 0; i < v.size(); i++) {
  			// 下面的操作分为两步
  			// 1.先将 Object 类型强转成了 Integer
  			// 2.然后利用自动拆箱，将 Integer 转换成 int 类型
  			int score = (Integer)v.elementAt(i);
  			if(Max - score <= 10) {
  				level = 'A';
  			}else if(Max - score <= 20) {
  				level = 'B';
  			}else if(Max - score <= 30) {
  				level = 'C';
  			}else {
  				level = 'D';
  			}
  			System.out.println("第" + (i+1) + 
  					"位的学生成绩为：" + score + "。成绩等级是：" + level);
  		}
  	}
  }
  ```

  