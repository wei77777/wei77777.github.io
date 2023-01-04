---
title: 17Java反射
tags: Java
categories: Java基础
abbrlink: bb43070d
date: 2022-02-12 21:20:23
---

## Java反射机制概述

- Reflection（反射）是被视为动态语言的关键，反射机智允许程序在执行期间通过 ReflectionAPI 取得任何类内部信息，并能直接操作任意对象的内部属性及方法
- 加载完类之后，在堆内部的方法区中就产生了一个Class类型的对象，一个类只有个一个Class对象，这个对象就包含了完整类的结构信息。我们通过这个对象看到类的内部结构。这个对象就像一个镜子，透过镜子看到类的内部结构，所以形象的称为“反射”

两种方式：

- 正常方式：引入需要的包类名称  ->  通过new实例化  ->  取得完整的实例
- 反射方式：实例化对象  ->  getClass 方法  ->  得到完整的包类名称

## Java反射机制提供的功能

- 在运行时判断任意一个对象的所属类
- 在运行时判断任意一个类的对象
- 在运行时判断任意一个类所具有的成员变量和方法
- 在运行时获取泛型信息
- 在运行时调用任意一个对象的成员变量和方法
- 在运行时处理注解
- 生成动态代理

## 反射类的使用

```java
package com.songzx.reflection;

import org.junit.Test;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class ReflectionTest {
    @Test
    /**
     * 普通方式实例化类对象
     * 不能访问私有属性和私有方法
     * @author Songzx
     * @date 2022/1/14
     */

    public void test1(){
        // 类的实例化时无法调用类中的私有属性和方法
        Person p = new Person("张三", 15);
        p.show();
        System.out.println(p.toString());
    }

    @Test
    /**
     * 通过反射的方式创建类的实例
     * @author Songzx
     * @date 2022/1/14
     */

    public void test2() throws Exception{
        // 通过反射获取Person类
        Class<Person> perCls = Person.class;
        // 获取构造方法
        Constructor<Person> constructor = perCls.getConstructor(String.class, int.class);
        // 构造一个对象
        Person p = constructor.newInstance("张三", 15);
        // 调用对象的toString方法
        System.out.println(p.toString()); //=> Person{name='张三', age=15}

        System.out.println("******通过反射调用对象指定的属性方法*********");
        // 通过反射调用对象指定的属性方法
        Field age = perCls.getDeclaredField("age");
        // 设置某个对象的属性值
        age.set(p,20);
        System.out.println(p.toString()); //=> Person{name='张三', age=20}

        System.out.println("******通过反射调用方法*********");
        // 通过反射调用方法
        Method show = perCls.getDeclaredMethod("show");
        show.invoke(p); //=> 我是一个人

        System.out.println("******通过反射调用类里面的私有方法*********");
        // 通过反射调用类里面的私有构造器
        Constructor<Person> cons1 = perCls.getDeclaredConstructor(String.class);
        cons1.setAccessible(true);
        // 获取实例化对象
        Person p1 = cons1.newInstance("Tome");
        System.out.println(p1.toString()); //=> Person{name='Tome', age=0}


        System.out.println("******通过反射调用类里面的私有方法*********");
        // 通过反射调用类里面的私有方法
        Method getState = perCls.getDeclaredMethod("getState");
        getState.setAccessible(true);
        getState.invoke(p1); //=> 中国人
    }
}
```

## 类的加载过程

- 程序经过 java.exe 编译过后会生成一个或者多个字节码文件（.class） 结尾的
- 接着我们通过 java.exe 解释运行字节码文件，相当于把一个字节码文件编译到内存中，此过程称为类的加载过程。
- 加载到内存中的类称为运行时类，就作为一个 class 实例
- Class 对应着一个运行时类
- 加载到内存中的类会缓存一段时间，在这期间我们可以通过不同的方式来获取到运行时类

## 获取运行时类的多种方式

```java
package com.songzx.reflection;

public class GetRunClassTest {
    /**
     * 获取运行时类的多种方式
     * @author Songzx
     * @date 2022/1/15
     */

    public static void main(String[] args) throws Exception{
        // 方式一：调用运行时类的对象的getClass方法
        Person p1 = new Person("张三",2);
        Class<? extends Person> clzz1 = p1.getClass();
        System.out.println(clzz1);

        // 方式二：调用运行时类的静态属性 class
        Class<Person> clzz2 = Person.class;
        System.out.println(clzz2);

        // 方式三：调用 Class 的静态方法 froName （常用这种方法获取）
        Class<?> clzz3 = Class.forName("com.songzx.reflection.Person");
        System.out.println(clzz3);

        // 方式四：使用类加载器 ClassLoader
        ClassLoader classLoader = GetRunClassTest.class.getClassLoader();
        Class<?> clzz4 = classLoader.loadClass("com.songzx.reflection.Person");
        System.out.println(clzz4);

        // 经过对比，四种方式获取到运行时类指向的都是同一个运行时类
        System.out.println(clzz1 == clzz2); //=> true
        System.out.println(clzz1 == clzz3); //=> true
        System.out.println(clzz1 == clzz4); //=> true


    }
}
```

## 读取配置文件的两种方式

- `FileInputStream` 读取文件获取
- `getClassLoader`获取

```java
package com.songzx.reflection;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class ProprtoesTest {
    public static void main(String[] args) throws IOException {
        Properties pro = new Properties();

        // 读取配置文件方式一，默认读取的是根目录下的配置文件
//        FileInputStream fis = new FileInputStream("jdbc.properties");
//        pro.load(fis);

        // 读取配置文件方式二，默认读取的是src目录下的配置文件
        ClassLoader classLoader = ProprtoesTest.class.getClassLoader();
        InputStream resourceAsStream = classLoader.getResourceAsStream("jdbc.properties");
        pro.load(resourceAsStream);


        String user = pro.getProperty("user");
        String password = pro.getProperty("password");
        System.out.println(user);
        System.out.println(password);

    }
}
```

## 创建运行时类的对象

在 javabin 中要求提供一个空参的构造器：

- 便于通过反射，创建运行时类的对象
- 便于子类继承父类时，默认调用 super()，需要保证父类有此构造器
- 调用 newInstance 方法，这个方法内部会调用 Person 类的空参构造器

```java
package com.songzx.reflection;

public class NewInstanceTest {
    public static void main(String[] args) {
        // 获取Person类的class静态属性
        Class<Person> personClass = Person.class;
        // 创建对象
        try {
            // 调用 newInstance 方法，这个方法内部会调用 Person 类的空参构造器
            // 所以要求运行时类必须提供空参构造器
            // 空参构造器的权限通常为 public
            Person person = personClass.newInstance();
            System.out.println(person);
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
    }
}
```

## 体会反射带来的动态性

```java
package com.songzx.reflection;

import org.junit.Test;

import java.util.Random;

/**
 * 体会反射的动态性
 * @author Songzx
 * @date 2022/1/17
 */

public class NewInstanceTest2 {
    @Test
    public void randomClass(){
        // 使用随机类随机一个数字，根据数字动态生成不同运行时类的对象
        int num = new Random().nextInt(3);
        String classPath = "";
        switch (num){
            case 0:
                classPath = "java.util.Random";
                break;
            case 1:
                classPath = "java.util.Date";
                break;
            case 2:
                classPath = "com.songzx.reflection.Person";
                break;
        }
        try {
            // 调用返回运行时类对象的方法
            Object instances = getInstances(classPath);
            System.out.println(instances);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // 根据传递过来的class路径，返回运行时类的对象
    public Object getInstances(String classPath) throws Exception{
        Class<?> aClass = Class.forName(classPath);
        return aClass.newInstance();
    }

}
```

## 获取运行时类的属性

- `personClass.getFields()` 获取运行时类中和所有父类中声明为 public 权限的属性
- `personClass.getDeclaredFields()` 只获取运行时类中的所有声明过的属性
  - `field.getModifiers()` 获取权限名称，返回的是一个int类型
    - `Modifier.toString(modifiers)` 将上面返回的int转为string类型的权限名称
  - `field.getType()` 获取数据类型
  - `field.getName()` 获取属性名称

```java
package com.songzx.person;

import org.junit.Test;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;

public class PersonInstances {
    @Test
    public void test1(){
        // 通过反射获取运行时类
        Class<Person> personClass = Person.class;
        // getFields 获取当前类以及所有父类中声明 public 的属性
        Field[] fields = personClass.getFields();
        for (Field field : fields) {
            /**
             * public int com.songzx.person.Person.id 当前类的id属性
             * public double com.songzx.person.Biology.weight 父类的weight属性
             */
            System.out.println(field);
        }

        System.out.println("****************");

        // 获取当前类中所有定义过的属性，不限制权限修饰符
        Field[] declaredFields = personClass.getDeclaredFields();
        for (Field field : declaredFields) {
            /**
             * private java.lang.String com.songzx.person.Person.name
             * int com.songzx.person.Person.age
             * public int com.songzx.person.Person.id
             */
            System.out.println(field);
        }
    }

    /**
     * 获取类属性的权限名称，数据类型，属性名称
     * @author Songzx
     * @date 2022/1/17
     */
    @Test
    public void test2(){
        Class<Person> personClass = Person.class;
        Field[] declaredFields = personClass.getDeclaredFields();
        for (Field field : declaredFields) {
            // 获取属性的权限名称,返回的是一个int类型；
            int modifiers = field.getModifiers();
            // 0:默认权限，1:public，2:private
            System.out.print(modifiers + "\t");
            // 使用 Modifier.toString 方法将返回的int类型权限标识转为string类型
            String modifName = Modifier.toString(modifiers);
            System.out.print(modifName + "\t");

            // 获取数据类型
            Class<?> type = field.getType();
            System.out.print(type + "\t");

            // 获取数据名称
            String name = field.getName();
            System.out.println(name);
        }
    }
}
```

## 获取运行时类的方法

- `personClass.getMethods()` 获取当前运行时类以及所有父类的声明为 public 权限的方法
- `personClass.getDeclaredMethods() ` 获取当前运行时类声明的所有方法

```java
package com.songzx.person;

import java.lang.reflect.Method;

/**
 * @author songzhengxiang
 * @create 2022-01-17 21:16
 */
public class PersonMetheds {
    public static void main(String[] args) {
        Class<Person> personClass = Person.class;
        // 获取运行时类以及所有父类中的public权限的方法
        Method[] methods = personClass.getMethods();
        for (Method method : methods) {
            System.out.println(method);
        }

        System.out.println("************");

        // 获取当前运行时类声明的所有方法
        Method[] declaredMethods = personClass.getDeclaredMethods();
        for (Method declaredMethod : declaredMethods) {
            System.out.println(declaredMethod);
        }
    }
}
```

## 获取运行时类的方法内部结构

- `getAnnotations()` 获取注解信息
- `getModifiers()` 获取方法的权限修饰符
- `getReturnType()` 获取方法返回值类型
- `getName()` 获取方法名称
- `getParameterTypes()` 获取方法形参列表
  - `getTypeName()` 获取参数类型
- `getExceptionTypes()` 获取异常数组
  - `getName()` 获取异常名称

```java
package com.songzx.person;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

/**
 * public  int    compareTo(java.lang.Integer arge_0)
 * public volatile int    compareTo(java.lang.Object arge_0)
 * public  void   show()
 * public  class java.lang.String display_public(java.lang.String arge_0)
 * @com.songzx.person.MyAnnotation(value=hello)
 * private    class java.lang.String   info_private(java.lang.String arge_0,int arge_1)   throws java.lang.NullPointerException,java.io.IOException
 * @author songzhengxiang
 * @create 2022-01-17 21:45
 */
public class PersonTest1 {
    public static void main(String[] args) {
        Class<Person> personClass = Person.class;

        // 遍历获取当前类中所有定义的方法
        Method[] declaredMethods = personClass.getDeclaredMethods();
        for (Method m : declaredMethods) {
            // 1.获取方法的注解信息
            Annotation[] annotations = m.getAnnotations();
            for (Annotation annotation : annotations) {
                System.out.println(annotation);
            }

            // 2.获取方法的权限修饰符
            int modifiers = m.getModifiers();
            System.out.print(Modifier.toString(modifiers) + "\t");

            // 3.获取返回值类型
            Class<?> returnType = m.getReturnType();
            System.out.print(returnType + "\t");

            // 4.获取方法名称
            String name = m.getName();
            System.out.print(name + "(");

            // 5.获取参数列表
            Class<?>[] parameterTypes = m.getParameterTypes();
            if(parameterTypes!=null && parameterTypes.length > 0){
                for (int i = 0; i < parameterTypes.length; i++) {
                    // 5.1 参数类型
                    String typeName = parameterTypes[i].getTypeName();
                    // 5.2 参数名称
                    String parameName = "arge_" + i;
                    if(i == parameterTypes.length - 1){
                        System.out.print(typeName + " " + parameName);
                        break;
                    }
                    System.out.print(typeName + " " + parameName + ",");
                }
            }

            System.out.print(")" + "\t");

            // 6.获取异常
            Class<?>[] exceptionTypes = m.getExceptionTypes();
            if(exceptionTypes != null && exceptionTypes.length > 0){
                System.out.print("throws" + "\t");
                for (int i = 0; i < exceptionTypes.length; i++) {
                    // 6.1 获取异常名称
                    String exceptionName = exceptionTypes[i].getName();
                    if(i == exceptionTypes.length - 1){
                        System.out.print(exceptionName);
                        break;
                    }
                    System.out.print(exceptionName + ",");
                }
            }
            System.out.println();
        }
    }
}
```

## 获取运行时类的构造器

- `getConstructors()` 获取当前运行时类的public的构造器
- `getDeclaredConstructors()` 获取当前运行时类的所有声明的构造器

```java
package com.songzx.person;

import java.lang.reflect.Constructor;

/**
 * @author songzhengxiang
 * @create 2022-01-17 22:17
 */
public class PersonTest2 {
    public static void main(String[] args) {
        Class<Person> personClass = Person.class;

        // 获取当前运行时类的public的构造器
        Constructor<?>[] constructors = personClass.getConstructors();
        for (Constructor<?> constructor : constructors) {
            System.out.println(constructor);
        }

        // 获取当前运行时类的所有声明的构造器
        Constructor<?>[] declaredConstructors = personClass.getDeclaredConstructors();
        for (Constructor<?> declaredConstructor : declaredConstructors) {
            System.out.println(declaredConstructor);
        }
    }
}
```

## 获取运行时类的父类

- `getSuperclass` 获取当前运行时类的父类
- `getGenericSuperclass` 获取带泛型的父类
- `ParameterizedType paramType = (ParameterizedType) genericSuperclass;` 强转带泛型的父类
  - `paramType.getActualTypeArguments()` 获取泛型数组
    - `getTypeName()` 获取泛型类型

```java
package com.songzx.person;

import java.lang.reflect.Constructor;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

/**
 * 获取父类的构造器
 * @author songzhengxiang
 * @create 2022-01-18 9:15
 */
public class PersonTest3 {
    public static void main(String[] args) {
        Class<Person> personClass = Person.class;
        // 获取当前运行时类的父类
        Class<? super Person> superclass = personClass.getSuperclass();
        System.out.println(superclass); //=> class com.songzx.person.Biology

        // 获取运行时类带泛型的父类
        Type genericSuperclass = personClass.getGenericSuperclass();
        // 强转
        ParameterizedType paramType = (ParameterizedType) genericSuperclass; //=> com.songzx.person.Biology<java.lang.String>
        System.out.println(paramType);
        // 获取泛型父类的泛型类型
        Type[] actualTypeArguments = paramType.getActualTypeArguments();
        for (Type actualTypeArgument : actualTypeArguments) {
            //=> java.lang.String
            System.out.println(actualTypeArgument.getTypeName());
        }
    }
}
```

## 获取运行时类所实现的接口

- `getInterfaces` 获取运行时类实现的接口
- `personClass.getSuperclass().getInterfaces()` 获取父类所实现的接口
- `getPackage` 获取运行时类所在包
- `getAnnotations` 获取运行时类所声明的注解

```java
package com.songzx.person;

import java.lang.annotation.Annotation;

/**
 * 获取运行时类实现的接口
 * @author songzhengxiang
 * @create 2022-01-18 13:19
 */
public class PersonTest4 {
    public static void main(String[] args) {
        Class<Person> personClass = Person.class;
        // 获取运行时类实现的接口
        Class<?>[] interfaces = personClass.getInterfaces();
        for (Class<?> anInterface : interfaces) {
            System.out.println(anInterface);
        }

        // 获取运行时类父类实现的接口
        Class<?>[] interfaces1 = personClass.getSuperclass().getInterfaces();
        for (Class<?> aClass : interfaces1) {
            System.out.println(aClass);
        }

        // 获取运行时类所在包
        Package pack = personClass.getPackage();
        System.out.println(pack); //=> package com.songzx.person

        // 获取运行类的注解
        Annotation[] annotations = personClass.getAnnotations();
        for (Annotation annotation : annotations) {
            System.out.println(annotation);
        }
    }
}
```

## 设置运行时类中的属性值

- `personClass.getField("id")` 获取类中声明为 public 的属性
- `personClass.getDeclaredField("name")` 获取类中所有声明过的属性
  - `name.setAccessible(true);` 该方法保证这个属性是可以访问的，通过上面的方法获取到属性后需要设置这个方法

```java
package com.songzx.person;
import org.junit.Test;
import java.lang.reflect.Field;

/**
 * 设置运行时类中的属性
 * @author songzhengxiang
 * @create 2022-01-18 13:43
 */
public class PersonTest5 {
    @Test
    public void test1() throws Exception{
        // 获取运行时类
        Class<Person> personClass = Person.class;
        // 实例化运行时类对象
        Person p = personClass.newInstance();
        // 获取类中的指定属性，不存在则抛出异常。这个方法只能获取类中声明为 public 的属性
        Field id = personClass.getField("id");
        // 设置id值；参数1：指明要设置那个对象。参数2：设置参数的值
        id.set(p,1001);
        // 获取id值；参数1：指明获取那个对象的值
        System.out.println(id.get(p)); //=> 1001
    }

    // 这种方法时开发中常用的
    @Test
    public void test2() throws Exception{
        // 1.获取运行时类
        Class<Person> personClass = Person.class;
        // 2.实例化类获取类对象
        Person p = personClass.newInstance();
        // 3.获取要设置的属性，可以获取到所有声明过的属性
        Field name = personClass.getDeclaredField("name");
        // 4.声明该属性是可以访问的
        name.setAccessible(true);
        // 5.设置指定对象的属性值
        name.set(p,"Tome");
        // 6.获取指定对象的值
        System.out.println(name.get(p));
    }
}
```

## 调用运行时类的静态方法

- `personClass.getDeclaredMethod("showDesc", String.class);` 获取指定类的方法，并声明参数类型。参数类型要是一个对象
- `invoke` 调用返回的方法值身上的 invoke 方法触发该方法
  - 参数1（必填）：指明要调用那个对象身上的方法
  - 参数2：传入可变形参

```java
package com.songzx.person;
import java.lang.reflect.Method;

/**
 * 调用运行时类的方法
 * @author songzhengxiang
 * @create 2022-01-18 14:26
 */
public class PersonTest6 {
    public static void main(String[] args) throws Exception{
        // 1.获取类
        Class<Person> personClass = Person.class;
        // 2.实例化类
        Person p = personClass.newInstance();
        // 3.调用类方法
        Method showDesc = personClass.getDeclaredMethod("showDesc", String.class);
        // 4.保证方法可以正常访问
        showDesc.setAccessible(true);
        // 5.调用方法并获取返回值
        Object desc = showDesc.invoke(p, "工单描述");
        // 打印返回值
        System.out.println(desc);

        // 获取多个参数的方法,参数必须是一个对象类
        Method info_private = personClass.getDeclaredMethod("info_private", String.class, int.class);
        info_private.setAccessible(true);
        Object tome = info_private.invoke(p, "China", 15);
        System.out.println(tome);

        // 获取静态方法
        Method showAge = personClass.getDeclaredMethod("showAge");
        showAge.setAccessible(true);
        // 调用静态方法时要指明调用当前运行时类的静态方法,也可以填写null
        // Object invoke = showAge.invoke(personClass);
        Object invoke = showAge.invoke(null);
        System.out.println(invoke);
    }
}
```

## 调用运行时类构造器

`getDeclaredConstructor` 调用指定参数的构造器

```java
package com.songzx.person;

import java.lang.reflect.Constructor;

/**
 * 调用运行时类的构造器
 * @author songzhengxiang
 * @create 2022-01-18 15:22
 */
public class PersonTest7 {
    public static void main(String[] args) throws Exception{
        // 获取运行时类
        Class<Person> personClass = Person.class;
        // 获取指定参数的构造器
        Constructor<Person> constructor = personClass.getDeclaredConstructor(String.class);
        // 设置该构造器可以被访问
        constructor.setAccessible(true);
        // 实例化对象
        Person p = constructor.newInstance("Tome");
        // 打印toString方法
        System.out.println(p);
    }
}
```

