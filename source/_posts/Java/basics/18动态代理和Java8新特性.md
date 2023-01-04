---
title: 18动态代理和Java8新特性
tags: Java
categories: Java基础
abbrlink: 7e00ebe0
date: 2022-02-12 21:21:14
---

## 代理设计模式原理

使用一个代理将对象包装起来，然后用该代理对代替原始对象。任何对原始对象的调用都要通过代理对象。代理对象决定是否以及何时调用转到原始对象上。

动态代理是指客户通过代理类来调用其他对象上的方法，并且是在程序运行时根据需要来动态创建目标类的代理对象。

动态代理的使用场景：

- 调试
- 远程方法调用

动态代理相较于静态代理的优点：

抽象角色中（接口）声明的所有方法都被转移到调用处理器集中的方法中处理，这样我们可以更加灵活和统一的处理众多方法。

## 静态代理方法

```java
package com.songzx.proxy;

/**
 * @author songzhengxiang
 * @create 2022-01-18 21:44
 */
public class StaticProxyTest {
    // 静态代理举例
    public static void main(String[] args) {
        ProxyCloth proxyCloth = new ProxyCloth(new NickCloth());
        proxyCloth.productCloth();
    }
}

// 添加接口
interface ClothFactory{
    void productCloth();
}

// 添加代理类
class ProxyCloth implements ClothFactory{
    // 内部属性
    private ClothFactory factory;

    // 创建构造器，传入 ClothFactory 接口的实现类
    public ProxyCloth(ClothFactory factory) {
        this.factory = factory;
    }

    @Override
    public void productCloth() {
        System.out.println("代理类准备调用被代理类");
        // 调用被代理类的方法
        factory.productCloth();
        System.out.println("代理类调用完毕");
    }
}

// 创建被代理类
class NickCloth implements ClothFactory{
    // 被代理类的空参构造器
    public NickCloth() {
    }
    // 实现接口中的方法
    @Override
    public void productCloth() {
        System.out.println("nick工厂加工鞋子");
    }
}
```

## 动态代理实现

```java
package com.songzx.proxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

/**
 * 动态代理举例
 *
 * @author songzhengxiang
 * @create 2022-01-18 22:21
 */
public class ProxyClass {
    public static void main(String[] args) {
        // 创建被代理类的对象
        SuperMan superMan = new SuperMan();
        // 动态获取代理类
        Person proxyFactory = (Person) ProxyFactory.getProxyFactory(superMan);

        // 通过代理类调用被代理类的方法
        String desc = proxyFactory.eat("牛肉");
        System.out.println(desc);

        String s = proxyFactory.MyHeight();
        System.out.println(s);
    }
}

// 声明一个接口
interface Person {
    String MyHeight();

    String eat(String food);
}

// 创建一个被代理类
class SuperMan implements Person {

    @Override
    public String MyHeight() {
        return "我的身高是199cm";
    }

    @Override
    public String eat(String food) {
        System.out.println("我喜欢吃的食物是" + food);
        return food;
    }
}

// 创建一个动态返回代理类的对象
class ProxyFactory {
    // 创建一个静态方法的构造器，传入被代理类的对象
    public static Object getProxyFactory(Object obj) {
        // 获取被代理类的运行时类
        Class<?> aClass = obj.getClass();
        // 创建一个 InvocationHandler 接口的实现类
        MyInvocationHandler ih = new MyInvocationHandler();
        // 通过拿到静态方法传入的被代理类的对象给接口实现类赋值
        ih.bind(obj);
        // 返回动态获取的代理类
        return Proxy.newProxyInstance(aClass.getClassLoader(), aClass.getInterfaces(), ih);
    }
}

// 创建一个InvocationHandler实现类
class MyInvocationHandler implements InvocationHandler {
    private Object obj;

    // 这里获取被代理类的实例对象
    public void bind(Object obj) {
        this.obj = obj;
    }

    // 当通过代理类调用方法a时会调动这个接口实现中实现的invoke方法
    // 参数 method 就是我们调用的方法
    // args 是通过代理类调用方法时传入的参数
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        Object invoke = method.invoke(obj, args);
        return invoke;
    }
}
```

## Java8新特性示例

```java
package com.songzx.java8;

import org.junit.Test;

import java.util.Comparator;

/**
 * @author songzhengxiang
 * @create 2022-01-19 21:00
 */
public class Exer1 {
    @Test
    public void test1(){
        // 不使用Java8
        Runnable r1 = new Runnable() {
            @Override
            public void run() {
                System.out.println("我爱中国");
            }
        };
        r1.run();

        System.out.println("************");

        // 使用Java8新特性
        Runnable r2 = ()-> System.out.println("我爱中国");
        r2.run();
    }

    @Test
    public void test2(){
        Comparator<Integer> c1 = new Comparator<Integer>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                return Integer.compare(01,02);
            }
        };
        int compare = c1.compare(12, 13);
        System.out.println(compare);

        // 使用Java8
        Comparator<Integer> c2 = (o1,o2) -> Integer.compare(o1,o2);
        int compare1 = c2.compare(13, 12);
        System.out.println(compare1);

        // 使用Java8
        Comparator<Integer> c3 = Integer :: compare;
        int compare2 = c3.compare(5, 2);
        System.out.println(compare2);
    }
}
```

## Lambda 表达式语法

- 语法1 省略类的new过程
- 语法2 省略大括号和return
- 语法3 只有一个参数时省略小括号
- 语法4 多个参数和多个方法体
- 语法5 无参无返回

Lambda表达式的本质：作为函数式接口的实例

使用Lambda表达式的要求：实现类必须有且只有一个重写方法时

```java
package com.songzx.java8;
import org.junit.Test;
import java.util.Comparator;
import java.util.function.Consumer;

/**
 * @author songzhengxiang
 * @create 2022-01-19 21:41
 */
public class Lambda1 {
    @Test
    public void test1(){
        // 语法1 省略类的new过程
        Comparator<Integer> c = (o1, o2) -> {
            return Integer.compare(o1,o2);
        };
        System.out.println(c.compare(10, 11));

        // 语法2 省略大括号和return
        Comparator<Integer> c2 = (o1, o2) -> Integer.compare(o1,o2);
        System.out.println(c2.compare(10, 11));

        // 语法3 只有一个参数时省略小括号
        Consumer<String> c3 = s -> System.out.println(s);
        c3.accept("小不忍则乱大谋");

        // 语法4 多个参数和多个方法体
        Comparator<Integer> c4 = (o1, o2) -> {
            System.out.println(o1);
            System.out.println(o2);
            return Integer.compare(o1,o2);
        };
        System.out.println(c4.compare(21, 12));

        // 语法5 无参无返回
        Runnable r = ()-> System.out.println("无参无返回");
        r.run();
    }
}
```

## 函数式接口

- 只包含一个抽象方法的接口称为函数式接口
- 可以通过 Lambda 表达式来创建该接口的对象
- 可以在一个接口上使用 @FunctionalInterface 注解，这样做可以查看这个接口是否是一个函数式接口

## 自定义函数式接口

```java
package com.songzx.java8;

/**
 * @author songzhengxiang
 * @create 2022-01-20 18:01
 */
public class Lambda2 {
    public static void main(String[] args) {
        TestLambda t = () -> "自定义接口使用 Lambda";
        System.out.println(t.show());
    }
}
// 自定义函数式接口
@FunctionalInterface
interface TestLambda {
    String show();
}
```

## Java内置四大核心函数式接口

| 函数式接口               | 参数类型 | 返回类型 | 用途                                                         |
| ------------------------ | -------- | -------- | ------------------------------------------------------------ |
| Consumer<T> 消费型接口   | T        | void     | 为类型为T的对象应用操作，包含方法 void.accept(T t)           |
| Supplier<T> 供给型接口   | 无       | T        | 返回类型为 T 的对象，包含方法 T.get()                        |
| Function<T,R> 函数型接口 | T        | R        | 为类型为T的对象应用操作，并返回结果，结果是R类型的对象，包含方法 R.apply(T t) |
| Predicate<T>             | T        | Boolean  | 确定类型为T的对象是否满足某约束，并返回boolean值，包含方法 boolean test(T) |

## Consumer 接口的使用

```java
// Consumer 接口的使用
@Test
public void test1() {
    happyTome(200, money -> System.out.println("今日消费" + money));
}

public void happyTome(double money, Consumer<Double> con) {
    con.accept(money);
}
```

## Supplier 接口的使用

```java
// Supplier 接口使用
@Test
public void test2() {
    int[] ints = {45, 65, 84, 12, 1};
    int maxInt = getMax(() -> {
        int max = ints[0];
        for (int anInt : ints) {
            if (anInt > max) {
                max = anInt;
            }
        }
        return max;
    });
    System.out.println(maxInt);
}

// 定义一个返回字符串的方法
public int getMax(Supplier<Integer> sup) {
    return sup.get();
}
```

## Predicate 接口的使用

```java
// Predicate 接口使用
@Test
public void test3(){
    List<String> strings = Arrays.asList("北京", "南京", "东京", "天津", "普京");

    List<String> filterStr1 = filterStr(strings, new Predicate<String>() {
        @Override
        public boolean test(String s) {
            return s.contains("京");
        }
    });
    System.out.println(filterStr1);

    List<String> filterlist = filterStr(strings, s -> s.contains("京"));
    System.out.println(filterlist);
}
public List<String> filterStr(List<String> list, Predicate<String> pre){
    ArrayList<String> list1 = new ArrayList<>();
    for (String s : list) {
        if(pre.test(s)){
            list1.add(s);
        }
    }
    return list1;
}
```

## 方法引用的使用

- 使用情景：当要传递给 Lambda 体的操作已经有实现的方法，可以使用方法引用
- 方法引用：本质就是 Labmda 表达式，而 Lambda 表达式作为函数式接口的实例，所以方法引用也是函数式接口的实例
- 使用格式：类（或对象） :: 方法名
- 具体分为如下三种情况：
  - 对象 :: 非静态方法
  - 类 :: 静态方法
  - 类 :: 非静态方法
- 方法引用的使用要求：要求接口中的抽象方法的形参列表和返回值要与方法引用的方法形参列表和返回值类型相同

## 定义一个测试类

```java
package com.songzx.java8;

/**
 * @author songzx
 * @create 2022-01-24 9:34
 */
public class EmployeeTest {
    String name;
    int age;
    double money;

    public EmployeeTest() {

    }

    public EmployeeTest(String name, int age, double money) {
        this.name = name;
        this.age = age;
        this.money = money;
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

    public double getMoney() {
        return money;
    }

    public void setMoney(double money) {
        this.money = money;
    }

    @Override
    public String toString() {
        return "EmployeeTest{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", money=" + money +
                '}';
    }
}
```

## 情况一：对象引用非静态方法

```java
package com.songzx.java8;

import org.junit.Test;

import java.beans.Customizer;
import java.io.PrintStream;
import java.util.Comparator;
import java.util.function.Consumer;
import java.util.function.Supplier;

/**
 * @author songzhengxiang
 * @create 2022-01-23 16:21
 */
public class Lambda5 {
    // 对象 :: 非静态方法
    @Test
    public void test1() {
        PrintStream pr = System.out;
        Consumer<String> con = pr::println;
        con.accept("Hello world"); //=> Hello world

        // 实例化一个类对象
        EmployeeTest tome = new EmployeeTest("Tome", 18, 6000);
        // 使用方法引用
        Supplier<String> sup = tome :: getName;
        System.out.println(sup.get()); //=> Tome
    }
}
```

## 情况二：类引用静态方法

```java
package com.songzx.java8;

import org.junit.Test;

import java.util.Comparator;
import java.util.function.Function;

/**
 * @author songzx
 * @create 2022-01-24 10:14
 */
public class Lambda6 {
    /**
     * 情况二：类 :: 静态方法
     */

    @Test
    public void test(){
        // 引用 Integer 包装类的静态方法 compareTo
        Comparator<Integer> com = Integer :: compare;
        System.out.println(com.compare(12, 32)); //=> -1

        // 传入一个 Double 类型的数据，返回一个 Long 类型
        // 引用 Math 类中的 round 方法
        Function<Double,Long> fun = Math :: round;
        System.out.println(fun.apply(12.6)); //=> 13

        // Lambda 表达式的写法
        Function<Double,Long> fun2 = d -> Math.round(d);
        System.out.println(fun2.apply(12.3));

        // 原始写法
        Function<Double,Long> fun3 = new Function<Double, Long>() {
            @Override
            public Long apply(Double aDouble) {
                return Math.round(aDouble);
            }
        };
        System.out.println(fun3.apply(12.3));
    }
}
```

## 情况三：类引用实例方法

```java
package com.songzx.java8;

import org.junit.Test;

import java.util.Comparator;
import java.util.function.BiPredicate;
import java.util.function.Function;

/**
 * @author songzx
 * @create 2022-01-24 11:27
 */
public class Lambda7 {
    // 类 :: 实例方法
    @Test
    public void test(){
        Comparator<String> com = (s1,s2) -> s1.compareTo(s2);
        System.out.println(com.compare("a", "b")); //=> -1

        Comparator<String> com1 = String :: compareTo;
        System.out.println(com1.compare("a", "b")); //=> -1
    }

    @Test
    public void test1(){
        BiPredicate<String,String> bip = (s1,s2) -> s1.equals(s2);
        System.out.println(bip.test("hello", "hello")); //=> true

        BiPredicate<String,String> bip2 = String :: equals;
        System.out.println(bip2.test("he", "he")); //=> true
    }

    @Test
    public void test2(){
        EmployeeTest emp = new EmployeeTest("Tome", 15, 6000);
        Function<EmployeeTest,String> fun = e -> e.getName();
        System.out.println(fun.apply(emp)); //=> Tome

        Function<EmployeeTest,String> fun2 = EmployeeTest :: getName;
        System.out.println(fun2.apply(emp)); //=> Tome
    }
}
```

## 构造器引用

和方法引用类似，函数式接口的抽象方法的形参列表和构造器的参数列表相同，抽象方法的返回值类型即为构造器所属类的类型

```java
package com.songzx.java8;

import javafx.scene.layout.VBox;
import org.junit.Test;

import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.function.Supplier;

/**
 * 构造器引用
 * @author songzx
 * @create 2022-01-24 13:35
 */
public class Lambda8 {
    @Test
    public void test1(){
        Supplier<EmployeeTest> sup = ()-> new EmployeeTest();
        System.out.println(sup.get());

        Supplier<EmployeeTest> sup1 = EmployeeTest::new;
        System.out.println(sup1.get());
    }

    @Test
    public void test2(){
        Function<Integer,EmployeeTest> fun = age -> new EmployeeTest(age);
        System.out.println(fun.apply(15));

        Function<Integer,EmployeeTest> fun1 = EmployeeTest::new;
        System.out.println(fun1.apply(16));
    }

    @Test
    public void test3(){
        BiFunction<String,Integer,EmployeeTest> bif = (name,age) -> new EmployeeTest(name,age);
        System.out.println(bif.apply("Tome", 15));

        BiFunction<String,Integer,EmployeeTest> bif2 = EmployeeTest::new;
        System.out.println(bif2.apply("Tome", 15));
    }
}
```

## 数组引用

```java
package com.songzx.java8;

import org.junit.Test;

import java.sql.Array;
import java.util.Arrays;
import java.util.function.Function;
import java.util.function.Supplier;

/**
 * 数组引用
 * @author songzx
 * @create 2022-01-24 13:47
 */
public class Lambda9 {
    @Test
    public void test(){
        Function<Integer,String[]> fun = len -> new String[len];
        String[] strings = fun.apply(5);
        System.out.println(Arrays.toString(strings));

        Function<Integer,Integer[]> fun2 = Integer[] :: new;
        Integer[] integers = fun2.apply(5);
        System.out.println(Arrays.toString(integers));
    }
}
```

## 什么是 Stream

是数据渠道，用于操作数据（集合，数组等）所生成的元素序列。更注重计算，不会破坏原来的数据，会返回一个计算好的数据。

Stream 特点：

- Stream 自己不会存储元素
- Stream 不会改变源对象，相反，他们会返回一个持有结果的新 Stream
- Stream 操作是延迟执行的。这表示他们会等到需要结果时再执行

## Stream 操作的三个步骤

- 1.创建Stream
  - 一个数据源（数组，集合等）获取一个流
- 2.中间操作
  - 一个中间操作链，对数据源进行处理
- 3.终止操作
  - 一旦执行终止操作，中间操作才会执行，并产生结果，之后不会再被使用

## Stream 的四种创建方式

### 方式一：通过集合创建Stream

```java
package com.songzx.Stream;

import org.junit.Test;

import java.util.ArrayList;
import java.util.stream.Stream;

/**
 * @author songzx
 * @create 2022-01-24 15:33
 */
public class ListStream {
    // 方式一：通过集合
    @Test
    public void test1(){
        ArrayList<String> list = new ArrayList<>();
        list.add("aa");
        list.add("bb");
        list.add("cc");
        // default Stream<E> stream() 返回一个顺序流
        Stream<String> stream = list.stream();

        // default Stream<E> parallelStream() 返回一个并行流
        Stream<String> stringStream = list.parallelStream();
    }
}
```

### 方式二：通过数据创建Stream

```java
package com.songzx.Stream;

import org.junit.Test;

import java.util.Arrays;
import java.util.stream.IntStream;

/**
 * @author songzx
 * @create 2022-01-24 15:35
 */
public class ArrayStream {
    // 通过数组创建stream，调用 Arrays 包装类的静态方法 stream
    @Test
    public void test(){
        int[] ints = {1, 2, 3, 4, 5, 6};
        IntStream stream = Arrays.stream(ints);
    }
}
```

### 方式三：通过 Stream.of 创建

```java
package com.songzx.Stream;

import org.junit.Test;

import java.util.stream.Stream;

/**
 * Stream 创建方式三，通过 Stream.of
 * @author songzx
 * @create 2022-01-25 8:17
 */
public class Streamof {
    @Test
    public void test(){
        Stream<Integer> integerStream = Stream.of(12, 3, 65, 84);

    }
}
```

### 方式四：创建Stream无限流

```java
package com.songzx.Stream;

import org.junit.Test;

import java.util.stream.Stream;

/**
 * 创建 stream 无限流
 * @author songzx
 * @create 2022-01-25 8:18
 */
public class Streams {
    @Test
    public void test(){
        // 迭代
        Stream.iterate(0, t -> t + 1).limit(10).forEach(System.out::println);

        // 生成
        Stream.generate(Math::random).limit(10).forEach(System.out::println);
    }
}
```

## Stream 中间流 

### 筛选和去重

- 使用 filter 方法过滤出符合条件的数据
- skip(long n) 跳过前 n 个元素，显之后的元素，如果总元素个数不足n个则返回一个空的流
- limit(long n) 显示前n个元素
- distinct() 去除数据中重复的元素

```java
package com.songzx.Stream;

import java.util.List;

/**
 * @author songzx
 * @create 2022-01-25 10:30
 */
public class Stream1 {
    public static void main(String[] args) {
        List<User> users = User.getUsers();
        
        // 使用 filter 方法过滤出年龄大于等于 20 的数据
        users.stream().filter(user->user.getAge() >= 20).forEach(System.out::println);

        System.out.println("**********");
        // skip(long n) 跳过前 n 个元素，显之后的元素，如果总元素个数不足n个则返回一个空的流
        users.stream().skip(2).forEach(System.out::println);

        System.out.println("**********");
        // limit(long n) 显示前n个元素
        users.stream().limit(3).forEach(System.out::println);

        System.out.println("**********");
        // distinct() 去除数据中重复的元素
        users.stream().distinct().forEach(System.out::println);
    }
}
```

### Map映射

- map 映射将集合中的元素转成大写
- 使用 flatMap 展开二级嵌套的 stream 集合

```java
package com.songzx.Stream;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

/**
 * @author songzx
 * @create 2022-01-25 11:30
 */
public class Stream2 {
    public static void main(String[] args) {
        // map 映射将集合中的元素转成大写
        List<String> strings = Arrays.asList("aa", "bb", "cc", "dd");
        strings.stream().map(str->str.toUpperCase()).forEach(System.out::println);
        System.out.println("**********");

        // 使用map只获取对象集合中的姓名
        List<User> users = User.getUsers();
        users.stream().map(user->user.getName()).forEach(System.out::println);
        System.out.println("**********");

        // 使用 map 来处理 stream 构成的 stream，需要两个循环
        Stream<Stream<Character>> streamStream = strings.stream().map(Stream2::getStringStream);
        streamStream.forEach(str->str.forEach(System.out::println));
        System.out.println("**********");

        // 使用 flatMap 展开二级嵌套的 stream 集合
        Stream<Character> characterStream = strings.stream().flatMap(Stream2::getStringStream);
        characterStream.forEach(System.out::println);

    }
    // 将字符串中的每个字符
    public static Stream<Character> getStringStream(String str){
        ArrayList<Character> charlist = new ArrayList<>();
        for (char c : str.toCharArray()) {
            charlist.add(c);
        }
        return charlist.stream();
    }
}
```

### 排序

```java
package com.songzx.Stream;

import java.util.Arrays;
import java.util.List;

/**
 * @author songzx
 * @create 2022-01-25 15:58
 */
public class Stream3 {
    public static void main(String[] args) {
        List<Integer> integers = Arrays.asList(12, 65, 0, 32, 1, 215, -25);
        // 按照默认顺序排序
        integers.stream().sorted().forEach(System.out::println);

        // 定制排序,按照年龄从大到小排序，如果年龄相同则按照身高从低到高
        List<User> users = User.getUsers();
        users.stream().sorted((s1,s2)->{
            int ageVal = Integer.compare(s1.getAge(),s2.getAge());
            if(ageVal != 0){
                return ageVal;
            }else{
                return Double.compare(s1.getHeight(),s2.getHeight());
            }
        }).forEach(System.out::println);
    }
}
```

## Stream 结束语句

### 匹配和查找

1. allMatch 判断所有的人员年龄是否都大于20岁，必须所有数据都要满足才会返回true
2. anyMatch 判断是否有大于20岁的人员，满足一个即可返回true
3. noneMatch 判断是不是没有大于20的，如果条件成立返回false，条件不成立返回true
4. findFirst 返回集合中的第一个元素
5. findAny 返回集合中的任意元素
6. count 返回集合中的元素个数
7. max 返回集合中最大的年龄
8. min 返回集合中身高最低的人员
9. forEach 内部迭代

```java
package com.songzx.Stream;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

/**
 * @author songzx
 * @create 2022-01-25 16:33
 */
public class Stream4 {
    public static void main(String[] args) {
        List<User> users = User.getUsers();
        // 1. allMatch 判断所有的人员年龄是否都大于20岁，必须所有数据都要满足才会返回true
        boolean b = users.stream().allMatch(user -> user.getAge() > 20);
        System.out.println(b); //=> false

        // 2. anyMatch 判断是否有大于20岁的人员，满足一个即可返回true
        boolean b1 = users.stream().anyMatch(user -> user.getAge() > 20);
        System.out.println(b1); //=> true

        // 3. noneMatch 判断是不是没有大于20的，如果条件成立返回false，条件不成立返回true
        boolean b2 = users.stream().noneMatch(user -> user.getAge() > 20);
        System.out.println(b2);

        // 4. findFirst 返回集合中的第一个元素
        Optional<User> first = users.stream().findFirst();
        System.out.println(first);

        // 5. findAny 返回集合中的任意元素
        Optional<User> any = users.stream().findAny();
        System.out.println(any);

        // 6. count 返回集合中的元素个数
        long count = users.stream().count();
        System.out.println(count); //=> 8

        // 7. max 返回集合中最大的年龄
        Optional<Integer> max = users.stream().map(user -> user.getAge()).max(Integer::compare);
        System.out.println(max);

        // 8. min 返回集合中身高最低的人员
        Optional<User> min = users.stream().min((u1, u2) -> Double.compare(u1.getHeight(), u2.getHeight()));
        System.out.println(min);

        // 9. forEach 内部迭代
        users.stream().forEach(item-> System.out.println(item));
    }
}
```

### 归约 reduce

计算出来的结果会参与下一次的计算。reduce 方法的第一个参数表示初始值

```java
package com.songzx.Stream;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

/**
 * @author songzx
 * @create 2022-01-26 11:10
 */
public class Stream5 {
    public static void main(String[] args) {
        // 计算集合中的数据和
        List<Integer> integers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9);
        Integer reduce = integers.stream().reduce(0, Integer::sum);
        System.out.println(reduce);

        // 获取对象集合中的人员年龄总和
        List<User> users = User.getUsers();
        // 先通过map获取所有的年龄，在通过reduce累加年龄
        Integer reduce1 = users.stream().map(User::getAge).reduce(0, Integer::sum);
        System.out.println(reduce1);

        // 使用 Lambda 表达式计算年龄总和
        Integer reduce2 = users.stream().map(user -> user.getAge()).reduce(0, (a1, a2) -> a1 + a2);
        System.out.println(reduce2);
    }
}
```

### 收集 collect

```java
package com.songzx.Stream;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * collect 收集，将流转换成其他格式
 * @author songzx
 * @create 2022-02-10 13:43
 */
public class Stream6 {
    public static void main(String[] args) {
        List<User> users = User.getUsers();
        // 获取年龄大于等于15的人员，并返回到一个list中
        List<User> userList = users.stream().filter(user -> user.getAge() >= 15).collect(Collectors.toList());
        userList.forEach(System.out::println);

        System.out.println("*********");

        // 获取年龄大于等于15的人员，并返回到一个set中
        Set<User> userSet = users.stream().filter(user -> user.getAge() >= 15).collect(Collectors.toSet());
        for (User user : userSet) {
            System.out.println(user);
        }
    }
}
```

## Optional 类的创建

- `Optional.of(T)` 不能存放为 null 的值
- `Optional.ofNullable(T)` 可以存放 null 值

```java
package com.songzx.Optional;
import org.junit.Test;
import java.util.Optional;

/**
 * @author songzx
 * @create 2022-02-10 14:11
 */
public class java1 {
    @Test
    public void test1(){
        Boy boy = new Boy();
        // 不能存放null值
        Optional<Boy> boy1 = Optional.of(boy);
        System.out.println(boy1);
    }

    @Test
    public void test2(){
        Boy boy = new Boy();
        boy = null;
        // Optional.ofNullable 可以传入null
        Optional<Boy> boy1 = Optional.ofNullable(boy);
        System.out.println(boy1); //=> Optional.empty
    }
}
```

## Optional 类的使用

- `orElse(T other)` 该方法会判断原本的数据是否为空，如果数据为空则将 other 作为新值赋值给原来的数据

```java
package com.songzx.Optional;

import java.util.Optional;

/**
 * @author songzx
 * @create 2022-02-10 16:26
 */
public class java2 {
    // 使用 Optional 类之前处理空指针方法
    static String getBoyName(Boy boy){
        if(boy != null){
            return boy.getName();
        }else{
            return null;
        }
    }
    static String getBoyName2(Boy boy){
        Optional<Boy> boyOptional = Optional.ofNullable(boy);
        // orElse 方法表示如果原本的数据为空时则返回参数内容作为数据
        Boy boy1 = boyOptional.orElse(new Boy("李四"));
        // 此时的 boy1 绝对非空
        return boy1.getName();
    }
    public static void main(String[] args) {
        Boy boy = new Boy("张三");
        boy = null;
        String boyName = getBoyName(boy);
        System.out.println(boyName); //=> null


        // 使用 Optional 处理后即使传入了一个null值，也不会报错
        String boyName2 = getBoyName2(boy);
        System.out.println(boyName2); //=> 李四

    }
}
```

