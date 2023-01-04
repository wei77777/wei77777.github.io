---
title: 12Java枚举类和注解
tags: Java
categories: Java基础
abbrlink: ae985257
date: 2022-02-12 21:16:41
---

## 什么是枚举类

- 枚举类的理解：类的对象只有有限个，确定的。我们就称此类是枚举类
- 当需要定义一组常量时，强烈建议使用枚举类
- 如果枚举类中只有一个对象，则可以做为单例模式的实现方法

## 自定义枚举类的使用

```java
package com.songzx.java;

/**
 * 自定义枚举类的使用
 * @author songzhengxiang
 * @create 2021-08-08 10:55
 */
public class Enumer1 {
    public static void main(String[] args) {
        // 使用枚举类中的变量
        Season spring = Season.SPRING;
        Season summer = Season.SUMMER;
        Season autumn = Season.AUTUMN;
        Season winter = Season.WINTER;

        System.out.println(spring); //=> Season{name='春天', desc='万物复苏'}
        System.out.println(summer); //=> Season{name='夏天', desc='艳阳高照'}
        System.out.println(autumn); //=> Season{name='秋天', desc='秋高气爽'}
        System.out.println(winter); //=> Season{name='冬天', desc='白雪皑皑'}

        System.out.println(spring.getName()); //=> 春天
    }
}
class Season{
    // 1.定义枚举类的成员变量,使用 private fianl 修饰
    private final String name;
    private final String desc;

    // 2. 私有化类的构造器
    private Season(String name,String desc){
        this.name = name;
        this.desc = desc;
    }

    // 3.提供当前枚举类的对象
    public static final Season SPRING = new Season("春天","万物复苏");
    public static final Season SUMMER = new Season("夏天","艳阳高照");
    public static final Season AUTUMN = new Season("秋天","秋高气爽");
    public static final Season WINTER = new Season("冬天","白雪皑皑");

    // 4.可以扩展其他功能
    public String getName(){
        return this.name;
    }

    // 5.重写 toString 方法
    @Override
    public String toString() {
        return "Season{" +
                "name='" + name + '\'' +
                ", desc='" + desc + '\'' +
                '}';
    }
}
```

## 使用 enum 关键字定义枚举类

多个枚举属性之间要用逗号，最后结尾用分号。

```java
package com.songzx.java;

/**
 * 使用 enum 关键字类定义枚举类
 * @author songzhengxiang
 * @create 2021-08-08 11:32
 */
public class Enumer2 {
    public static void main(String[] args) {
        Season1 spring = Season1.SPRING;
        Season1 autumn = Season1.AUTUMN;

        // 使用 enum 定义的枚举类的父类会变成 Enum
        System.out.println(Season1.class.getSuperclass()); //=> class java.lang.Enum
        
        System.out.println(spring); //=> Season1{name='春天', desc='万物复苏'}
        System.out.println(autumn); //=> Season1{name='夏天', desc='艳阳高照'}
    }
}
enum Season1{
    // 1.使用enum关键字类定义枚举类需要先提供当前枚举类的对象
    // 多个对象之间要使用,隔开，结尾要使用;结尾
    AUTUMN("夏天","艳阳高照"),
    SPRING("春天","万物复苏");

    private final String name;
    private final String desc;

    private Season1(String name,String desc){
        this.name = name;
        this.desc = desc;
    }

    // 使用 enum 定义的枚举类如果不重写 toString 方法，则默认打印的是方法名
    @Override
    public String toString() {
        return "Season1{" +
                "name='" + name + '\'' +
                ", desc='" + desc + '\'' +
                '}';
    }
}
```

## Enum 类常用方法

 * `toString()` 获取对象信息，如果没有重写则返回变量名称
 * `values()` 获取枚举类中的所有对象，返回的是一个数组
 * `valueOf(String str)` 根据`str`找到枚举类中相同名字的对象

```java
package com.songzx.java;

/**
 * Enum 类常用方法

 * @author songzhengxiang
 * @create 2021-08-08 14:58
 */

public class Enumer3 {
    public static void main(String[] args) {
        Season1 season1 = Season1.SPRING;

        // toString() 获取对象信息，如果没有重写则返回变量名称
        System.out.println(season1.toString());

        System.out.println("**************");

        // values() 获取枚举类中的所有对象，返回的是一个数组
        Season1[] values = Season1.values();
        for (int i = 0; i < values.length; i++) {
            System.out.println(values[i]);
        }

        System.out.println("**************");
        // valueOf(String str) 根据str找到枚举类中相同名字的对象
        // 如果没有找到则会报错
        System.out.println(Season1.valueOf("AUTUMN"));
    }
}
```

## 使用enum关键字声明的枚举类实现接口的两种方式

```java
package com.songzx.java;

/**
 * 使用enum关键字声明的枚举类实现接口的两种方式
 * 方式一：普通实现方式,这种方法每个对象调用都是执行的同一段代码
 * 方拾二：让枚举类中的对象分别实现，这种方式可以让每个对象执行不同的代码
 * @author songzhengxiang
 * @create 2021-08-08 15:09
 */
public class Enumer4 {
    public static void main(String[] args) {
        Books run = Books.RUN;
        System.out.println(run);
        run.speak(); //=> 正在路上
        run.show(); //=> 使用方式一实现接口方法

        System.out.println("********");

        Books start = Books.START;
        System.out.println(start);
        start.speak(); //=> 敌军还有五秒达到战场
        start.show(); //=> 使用方式一实现接口方法

        System.out.println("********");

        Books stop = Books.STOP;
        System.out.println(stop);
        stop.speak(); //=> 游戏结束
        stop.show(); //=> 使用方式一实现接口方法
    }
}
interface Desc{
    public void show();
    public void speak();
}

enum Books implements Desc{
    RUN("运行中",100){
        public void speak(){
            System.out.println("正在路上");
        }
    },
    START("开始",299){
        public void speak(){
            System.out.println("敌军还有五秒达到战场");
        }
    },
    STOP("停止",123){
        public void speak(){
            System.out.println("游戏结束");
        }
    };

    private String name;
    private int time;

    Books(String name, int time) {
        this.name = name;
        this.time = time;
    }

    @Override
    public String toString() {
        return "Books{" +
                "name='" + name + '\'' +
                ", time=" + time +
                '}';
    }

    @Override
    public void show() {
        System.out.println("使用方式一实现接口方法");
    }
}

```

## enum 枚举类简写

```java
package com.songzx.java;

/**
 * @author songzhengxiang
 * @create 2021-08-08 15:40
 */
public class Enumer5 {
    public static void main(String[] args) {
        Status end = Status.END;
        System.out.println(end); //=> END
        System.out.println(Status.FULL); //=> FULL
        System.out.println(Status.RUN); //=> RUN
    }
}
// 简写枚举类
enum Status{
    FULL,RUN,END;
}
```

## 什么是注解

注解（Annotation），可以理解为代码里的特殊标记，这些标记可以在编译，类加载，运行时被读取，并执行相应的处理。可以用于修饰包，类，方法，成员变量，参数，局部变量等，这些信息被保存在 Annotation 的 name = value 对中

框架 = 注解 + 反射 + 设计模式

## JDK 中内置的三个基本注解

* `@Override` 标记这个方法是重写方法
* `@Deprecated` 标记一个方式已经过时
* `@SuppressWarnings("unused")` 抑制编译器警告信息
* `@SuppressWarnings` 可以接受多个参数， `rawtypes `参数可以抑制泛型没定义的警告

```java
package com.songzx.java;

import java.util.ArrayList;

/**
 * JDK中内置的三个注解的使用
 *
 * @Override 标记这个方法是重写方法
 * @Deprecated 标记一个方式已经过时
 * @SuppressWarnings("unused") 抑制编译器警告信息
 * @SuppressWarnings 可以接受多个参数， rawtypes 参数可以抑制泛型没定义的警告
 *
 * @author songzhengxiang
 * @create 2021-08-09 21:49
 */
public class Annotation1 {
    public static void main(String[] args) {
        Student student = new Student();
        // 使用过时的方法会显示一个删除横线
        student.wisdomTooth();
    }
}
class Person{
    public void show(){
        System.out.println("人走路");
    }
    // 使用 @Deprecated 注解表示这个方法已经过时了
    @Deprecated
    public void wisdomTooth(){
        System.out.println("智齿是无用的");
    }
}
class Student extends Person{
    // 使用 @SuppressWarnings("unused") 抑制编译器警告信息
    @SuppressWarnings("unused")
    int age = 12;

    // 注解 @SuppressWarnings 可以接受多个参数， rawtypes 参数可以抑制泛型没定义的警告
    @SuppressWarnings({"unused","rawtypes"})
    ArrayList arrayList = new ArrayList();
    // 标记重写父类的方法
    @Override
    public void show() {
        super.show();
    }
}
```

## 自定义注解

新建时选择 `@Annotation` 类型,声明一个 `value()` 属性

```java
public @interface MyAnnotation {
    String value() ;
}
```

然后再方法上面可以使用

```java
@MyAnnotation(value = "hello")
public void show(){
    System.out.println("Hello");
}
```

通过 `value = "hello"` 为注解定义一个属性名，也可以通过如下方式给注解声明一个默认名

```java
public @interface MyAnnotation {
    String value() default "word";
}
```

## 元注解

解释：对现有注解进行解释说明的注解

jdk提供四种元注解：

- @Retention

  - 指定所修饰类的声明周期，CLASS：默认行为，只有声明为 RUNTIME 注解才通过反射获取

- @Documented

- @Target

  - 用于修饰 `Annotation` 定义，用于指定被修饰的 Annotation 能用于修饰那些程序元素。

  - @Target 也包含一个名为 value 的成员变量

  - 完整的 @Target

    ```java
    @Target({TYPE,FIELD,METHOD,PARAMETER,CONSTRUCTOR,LOCAL_VARIABLE,TYPE_PARAMETER,TYPE_USE })
    ```
    
    | 名称            | 描述                      |
    | --------------- | ------------------------- |
    | TYPE            | 用于描述类，接口          |
    | FIELD           | 用于描述域                |
    | METHOD          | 用于描述方法              |
    | PARAMETER       | 用于描述参数              |
    | CONSTRUCTOR     | 用于描述构造器            |
    | LOCAL_VARIABLE  | 用于描述局部遍边变量      |
    | ANNOTATION_TYPE |                           |
    | PACKAGE         | 用于描述包                |
    | TYPE_PARAMETER  | 1.8新增，用于描述泛型类型 |
    | TYPE_USE        | 1.8新增，用于描述类型     |
    |                 |                           |
    

- @Inherited

## 可重复注解

新建 `MyAnnotations`

```java
package com.songzx.java;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import static java.lang.annotation.ElementType.*;

@Retention(RetentionPolicy.RUNTIME)
@Target({TYPE,FIELD,METHOD,PARAMETER,CONSTRUCTOR,LOCAL_VARIABLE})
public @interface MyAnnotations {
    MyAnnotation[] value();
}
```

然后修改 `MyAnnotation`

```java
package com.songzx.java;
import java.lang.annotation.*;
import static java.lang.annotation.ElementType.*;

/**
 * 自定义注解
 * @author Songzx
 * @date 2021/12/21
 */

@Repeatable(MyAnnotations.class)
@Retention(RetentionPolicy.RUNTIME)
@Target({TYPE,FIELD,METHOD,PARAMETER,CONSTRUCTOR,LOCAL_VARIABLE})
public @interface MyAnnotation {
    String value() default "word";
}
```

之后就可以重复使用 `MyAnnotation` 注解

```java
@MyAnnotation(value = "hello")
@MyAnnotation(value = "hello")
@Override
public void show(){
    System.out.println("Hello");
}
```

