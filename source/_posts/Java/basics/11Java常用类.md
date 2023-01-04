---
title: 11Java常用类
tags: Java
categories: Java基础
abbrlink: 44315ca1
date: 2022-02-12 21:16:10
---


## String 字符串的不可变性

* String：字符串，使用一对 "" 引起使用

* String 声明成 final 的，不能被继承

* String 实现了 Serializable 接口，表示字符串可以实现序列化

* String 实现了 Comparable 接口，表示字符串可以实现比较

* String 内部定义了 private final char value[]; 用来存储字符串数据

* String 代表不可变的字符序列。简称：不可变性

  - 当对字符串重新赋值时，需要重写指定内存区域赋值，不能使用原有的value进行赋值

  - 当对现有字符串进行连接操作时，也需要重新指定内存区域赋值，不能使用原有的值进行赋值

  - 当调用 String 字符串的 replace 方法进行替换时，也需要重新指定内存区域进行赋值

* 通过字面量的方式（=赋值）（区别于new赋值）给定一个字符串赋值时，此时的字符串值声明在字面量常量池中

* 字符串常量池中是不会存储相同的字符串的

```java
// 使用等号给String类型的变量赋值属于字面量赋值，字面量赋值会保存到字面量常量池中。
// 字面量常量池中的常量一但定义后无法修改，重新复制相当于在字面量常量池中重新开辟了一个空间去存储
String s1 = "abc";
String s2 = "123";
// 对原有的字符串进行修改时相当于在常量池中新开辟了一个空间去存储 def,不会改变原有值
s1 = "def";
System.out.println(s1 == s2); //=> false

String s3 = s1;
s3 += "123";
System.out.println(s1); //=> def
System.out.println(s3); //=> def123

String s4 = "hello";
String s5 = s4.replace("he", "He");
System.out.println(s4); //=> hello
System.out.println(s5); //=> Hello
```

## String 不同实例化方式的对比

创建字符串的两种方式

- 字面量的方式创建字符串 `String s1 = "javaEE";`
- 通过`new + 构造器`的方式创建字符串 `String s2 = new String("javaEE");`

```java
class Person{
    String name;

    public Person(String name) {
        this.name = name;
    }
}
public class StringTest2 {
    @Test
    public void show(){
        // 通过字面量的方式定义字符串，此时s1和s2的数据说明在方法区中的字符串常量池中
        String s1 = "JavaEE";
        // 字符串常量池中不会保存相同的字符串，所以 s1 和 s2 指向的是相同的常量池地址
        String s2 = "JavaEE";

        // 使用 new 方式创建一个字符串，会现在堆空间中开辟出一个内存地址
        // 保存的是各自的内存地址，所以 s3 != s4
        String s3 = new String("JavaEE");
        String s4 = new String("JavaEE");

        // 通过 == 比较的是地址值
        System.out.println(s1 == s2); //=> true
        System.out.println(s1 == s3); //=> false
        System.out.println(s3 == s4); //=> false
        // 通过 equals 比价的是具体的值，所以返回 true
        System.out.println(s1.equals(s3)); //=> true

        Person p1 = new Person("Tome");
        Person p2 = new Person("Tome");
        p1.name = "Jory"; // 体现出字符串是的不可变性
        System.out.println(p1.name == p2.name); //=> false

    }
}
```

面试题：`String s = new String("abc");` 方式创建字符串在内存中创建了几个对象？

答：两个。一个是在堆空间中的 new 结构，另一个是 char[] 在常量池中的数据 abc

## String 不同拼接操作

* 常量和常量拼接，结果还在常量池中，常量池中不会存在相同的数据
* 只要其中一个变量，那么结果就会在堆空间中，每创建一个用变量拼接的字符串，就会在堆空间中重新开辟一个空间
* 字符串调用 intern 方法，返回值就在常量池中

```java
String s1 = "HelloWorld";
String s2 = "Hello" + "World";
String s3 = "Hello";
String s4 = "World";
String s5 = s3 + "World";
String s6 = "Hello" + s4;
String s7 = s3 + s4;
String s8 = s3 + s4;

System.out.println(s1 == s2); //=> true
System.out.println(s1 == s5); //=> false
System.out.println(s1 == s7); //=> false
System.out.println(s5 == s6); //=> false
System.out.println(s5 == s7); //=> false
System.out.println(s8 == s7); //=> false

// intern 方法返回的数据会进入到常量池中
String s9 = s8.intern();
System.out.println(s1 == s9); //=> true
```

## 解决一个拼接问题

```java
String s1 = "HelloWorld";
String s2 = "Hello";
String s3 = s2 + "World";
System.out.println(s1 == s3); //=> false

// 常量和常量比较还在常量池中，因为 s4 加上了 final 变成了一个常量，所以 s1 和 s6 对比是true
final String s4 = "Hello";
String s6 = s4 + "World";
System.out.println(s1 == s6); //=> true
```

## String 类型的值传递问题解析

先看代码

```java
/**
 * @author songzhengxiang
 * @create 2021-07-30 11:08
 */
public class StringTest3 {
    String str = new String("Good");
    char[] ch = new char[]{'t','e','s','t'};

    public void change(String str,char[] ch){
        // 字符串的值是不可变的，在方法内部改变了字符串值，不会导致外部的字符串值发生改变
        str = "hello";
        // 引用数据类型传递的是引用地址，这里的ch和在类外部定义的ch指向同一个堆空间中的地址
        // 在方法内部将同一地址上的第一个下标的值改成b，外部定义的ch也是指向同一地址，所以外部定义的ch也会跟着改变
        ch[0] = 'b';
    }
    @Test
    public void show(){
        StringTest3 s = new StringTest3();
        s.change(s.str, s.ch);
        System.out.println(s.str); //=> Good
        System.out.println(s.ch); //=> best
    }
}
```

当传递的参数数据是String类型是，方法修改传递过来的形参值，实参的值不会跟着改变，因为String字符串是不可变性，和引用数类型不同，引用数据类型的数据指向的是地址值，只要修改了引用数据类型的数据，所有指向这个地址的数据都会跟着修改

```java
String name = new String("张三");
public void test(String name){
    name = "李四";
    System.out.println(name); //=> 李四
}
@Test
public void show2(){
    StringTest3 s = new StringTest3();
    s.test(s.name);
    // 虽然在方法内部修改了name的值，但是在方法外部name的值不会变
    System.out.println(name); //=> 张三
}
```

## String 类常用方法1

* 1.获取字符串的长度 int length()
* 2.返回某索引处的字符 char charAt()
* 3.判断字符串是否是空 boolean isEmpty()
* 4.将字符串转为小写 string toLowerCase()
* 5.将字符串转为大写 string toUpperCase()
* 6.忽略字符串中的前后空白 string trim()
* 7.比较字符串是否相同 Boolean equals()
* 8.忽略大小写的情况下比较两个字符串是否相同 boolean equalsIgnoreCase()
* 9.链接字符串，和 + 作用相同 string concat()
* 10.比较两个字符串大小 int compareTo()
* 11.从下标为2的地方开始截取字符串，包含2下标，并返回新的字符串 string substring(int beginIndex)
* 12.从下标2截取到下标7，包含2不包含7，左闭右开  substring(int beginIndex,int endIndex)
* 13.返回某个字符在字符串中的下标，没有时返回-1 int indexOf()

```java
// 获取字符串的长度 int length()
String s1 = "HelloWorld";
System.out.println(s1.length()); //=> 10

// 返回某索引处的字符 char charAt()
System.out.println(s1.charAt(5)); //=> W

// 判断字符串是否是空 boolean isEmpty()
String s2 = "";
System.out.println(s1.isEmpty()); //=> false
System.out.println(s2.isEmpty()); //=> true

// 将字符串转为小写 string toLowerCase()
System.out.println(s1); //=> HelloWorld
System.out.println(s1.toLowerCase()); //=> helloworld

// 将字符串转为大写 string toUpperCase()
System.out.println(s1.toUpperCase()); //=> HELLOWORLD

// 忽略字符串中的前后空白 string trim()
String s3 = "    Hel  lo World   ";
System.out.println(s3.trim()); //=> Hel  lo World

// 比较字符串是否相同 Boolean equals()
String s4 = "hello";
String s5 = "hello";
System.out.println(s4.equals(s5)); //=> true

// 忽略大小写的情况下比较两个字符串是否相同 boolean equalsIgnoreCase()
String s6 = "Hello";
System.out.println(s4.equalsIgnoreCase(s6)); //=> true

// 链接字符串，和 + 作用相同 string concat()
String s7 = s6.concat("World");
System.out.println(s7); //=> HelloWorld

// 比较两个字符串大小 int compareTo()
String s8 = "abc";
String s9 = "def";
System.out.println(s8.compareTo(s9)); //=> -3

// 从下标为2的地方开始截取字符串，包含2下标，并返回新的字符串 string substring(int beginIndex)
String s10 = "勇敢牛牛，不怕困难";
System.out.println(s10.substring(2)); //=> 牛牛，不怕困难

// 从下标2截取到下标7，包含2不包含7，左闭右开  substring(int beginIndex,int endIndex)
System.out.println(s10.substring(2, 7)); //=> 牛牛，不怕

// 返回某个字符在字符串中的下标，没有时返回-1 int indexOf()
System.out.println(s10.indexOf("牛")); //=> 2
```

## String 类常用方法2

* 1.判断字符串是否以某个字符串结尾 boolean endsWith()
* 2.判断字符串是否以某个字符开头 boolean startsWith()
* 3.从指定索引位置开始判断是否以某个字符串开头, boolean startsWith(String prefix,int toffset)
* 4.判断某个字符串中是否包含某个字符串 Boolean contains()
* 5.返回某个字符串在字符串中第一次出现的下标,不存在返回 -1； int indexOf()
* 6.返回某个字符串在字符串中最后一次出现的下标 int lastIndexOf()

```java
// 判断字符串是否以某个字符串结尾 boolean endsWith()
String s1 = "HelloWorld";
System.out.println(s1.endsWith("ld")); //=> true
System.out.println(s1.endsWith("lds")); //=> false

// 判断字符串是否以某个字符开头 boolean startsWith()
System.out.println(s1.startsWith("He")); //=> true
System.out.println(s1.startsWith("Hes")); //=> false

// 从指定索引位置开始判断是否以某个字符串开头, boolean startsWith(String prefix,int toffset)
System.out.println(s1.startsWith("Wo", 5)); //=> true

// 判断某个字符串中是否包含某个字符串 Boolean contains()
System.out.println(s1.contains("llo")); //=> true

// 返回某个字符串在字符串中第一次出现的下标,不存在返回 -1； int indexOf()
System.out.println(s1.indexOf("lo")); //=> 3

String s2 = "hello,hello";
// 返回某个字符串在字符串中最后一次出现的下标 int lastIndexOf()
System.out.println(s2.lastIndexOf("l")); //=> 9
```

## String 类常用方法3

* 1.将字符串中的某个字符全部替换为新的字符 string replace(oldChar,newChar)
* 2.replace() 方法也可以替换字符串中的某个字符串为新的字符串
* 3.将字符串中符合正则表达式的内容全部替换为新的内容 replaceAll(regex,replacement)
* 4.使用给定的正则表达式替换字符串中符合条件的第一个字符 replaceFirst(regex,replacement)
* 5.判断字符串是否符合某个正则表达式 boolean matches(regex)
* 6.将字符串按照某个正则分隔成字符串数组 String[] split(regex)
* 7.split 方法的第二个参数可以控制最多拆分几个，如果超过了，最后一个都放在最后一个元素中

```java
// 将字符串中的某个字符全部替换为新的字符 string replace(oldChar,newChar)
String s1 = "hello world";
String s2 = s1.replace('l', 'n');
System.out.println(s2); //=> henno wornd

// 将字符串中的某个字符串替换为新的字符串
String s3 = "我要去北京的北京故宫";
String s4 = s3.replace("北京", "南京");
System.out.println(s4); //=> 我要去南京的南京故宫

// 将字符串中符合正则表达式的内容全部替换为新的内容 replaceAll(regex,replacement)
String s5 = "+++123456---123456";
String s6 = s5.replaceAll("\\+", "-");
System.out.println(s6); //=> ---123456---123456

// 使用给定的正则表达式替换字符串中符合条件的第一个字符 replaceFirst(regex,replacement)
String s7 = s5.replaceFirst("\\+", "-");
System.out.println(s7); //=> -++123456---123456

// 判断字符串是否符合某个正则表达式 boolean matches(regex)
String s8 = "songzx@qq.com";
System.out.println(s8.matches("\\w+@\\w+.\\w+"));

// 将字符串按照某个正则分隔成字符串数组 String[] split(regex)
String s9 = "song,zheng,xinag";
String[] s10 = s9.split(",");
for (int i = 0; i < s10.length; i++) {
    System.out.println(s10[i]); //=> 依次打印 song \n zheng \n xinag
}

// split 方法的第二个参数可以控制最多拆分几个，如果超过了，最后一个都放在最后一个元素中
String[] s11 = s9.split(",", 2);
for (int i = 0; i < s11.length; i++) {
    System.out.println(s11[i]); //=> 依次打印 song \n zheng,xinag
}
```

## String 字符串和 char 数组转换

```java
/**
 * String 和 char 类型数组之间转换
 * toCharArray() 方法将字符串转成char型数组
 * new String(char[]) String构造器可以接收一个char类型数组，直接将char类型数组转为字符串
 *
 * @author songzhengxiang
 * @create 2021-07-31 11:02
 */
public class StringTest7 {
    @Test
    public void show() {
        String s1 = "hello";
        // toCharArray() 可以将一个字符串转换成char型数组
        char[] chars = s1.toCharArray();
        for (int i = 0; i < chars.length; i++) {
            System.out.println(chars[i]);
        }

        char[] newchars = new char[]{'a', 'b', 'c', 'd', 'e'};
        // String 的构造器可以 char 类型的数组，返回一个字符串
        String s2 = new String(newchars);
        System.out.println(s2); //=> abcde

        // 练习题目：将 ab123c 转换成 a321bc
        String s3 = "ab123c";
        char[] chars1 = s3.toCharArray();
        char[] chars2 = new char[4];
        for (int i = chars1.length - 2, j = 0; i >= 1 && j < 4; i--, j++) {
            System.out.println(chars1[i]);
            chars2[j] = chars1[i];
        }
        String s4 = new String(chars2);
        String s5 = "a" + s4 + "c";
        System.out.println(s5);
    }
}
```

## String 和 byte[] 字节数组转换

```java
/**
 * String 和 byte[] 字节数组转换
 * string.getBytes() 使用字符串调用 getBytes() 方法将字符串编码成字节数组
 * @author songzhengxiang
 * @create 2021-07-31 11:33
 */
public class StringTest8 {
    @Test
    public void show() throws UnsupportedEncodingException {
        String s1 = "hello 中国";
        // 将字符串转换成字节编码，按照默认的格式去编码
        byte[] bytes = s1.getBytes();
        //=> [104, 101, 108, 108, 111, 32, -28, -72, -83, -27, -101, -67]
        System.out.println(Arrays.toString(bytes));

        // 指定格式编码,指明了按照 gbk 格式去编码
        byte[] gbks = s1.getBytes("gbk");
        //=> [104, 101, 108, 108, 111, 32, -42, -48, -71, -6]
        System.out.println(Arrays.toString(gbks));

        // 将 byte[] 字节数组解码为字符串,此时是按照默认的格式去解码
        String s2 = new String(bytes);
        System.out.println(s2); //=> hello 中国

        // 当解码格式和编码格式不一致时会出现乱码
        String s3 = new String(gbks);
        System.out.println(s3); //=> hello �й�
        // 当默认解码格式和文件编码格式不一致时可以指定解码格式
        String s4 = new String(gbks, "gbk");
        System.out.println(s4); //=> hello 中国
    }
}
```

## StringBuffer 源码分析

String、StringBuffer、StringBuilder三者的异同

- String：不可变的字符序列，底层用 char[] 存储，添加了 final 修饰符
- StringBuffer：可变的字符序列，线程安全的，效率低，底层用 char[] 存储
- StringBuilder：可变的字符序列，线程不安全的，效率高，底层用 char[] 存储

声明 `String s1 = new String()` 时底层会声明一个 char 型数组，每次声明一个 String，就会创建一个新的 char 型数组

```java
char[] value = new char[0];
```

声明 `String s1 = new String("abc")`底层代码

```java
char[] value = new char[]{'a','b','c'};
```

声明 `StringBuffer sb1 = new StringBuffer()`时底层的结构。底层创建了一个长度是16的char型数组

```java
char[] value = new char[16];
sb1.append("a"); // value[0] = 'a';
sb1.append("b"); // value[1] = 'b';
```

声明 `StringBuffer s1 = new StringBuffer("abc")`底层代码，当StringBuffer 构造器默认有值时，会创建一个在默认字符串长度的基础上加16的长度的 char 数组

```java
char[] value = new char["abc".length() + 16];
```

问题一：`StringBuffer s1 = new StringBuffer("abc")` 这段代码中打印 `s1.lenght` 是多少

- 打印的长度为 3 ，因为底层不会返回 char 数组的长度，而是每次 append 之后 count++，返回的是字符串的个数

问题二：扩容问题：

- 如果需要添加的数据底层数组盛不下，那就需要扩容底层数组的长度，默认情况下扩容为原来的二倍并且加上2，同时将原有数组复制到新数组中
- 指导意义：开发中建议使用 `StringBuffer s2 = new StringBuffer(20);`直接声明好字符串的长度，避免在使用中发生扩容情况

## StringBuffer 常用方法

* 1.append() 在字符串结尾追加方法.可以增加任意类型的数据，添加后原始数据发生改变
* 2.delete 删除指定位置的字符，左闭右开
* 3.replace(start,end,str) 把 [2,6) 位置上的字符串替换为 你好
* 4.insert(offset,str) 在指定的下标处添加字符串
* 5.reverse() 反转字符串
* 6.int indexOf() 返回指定字符串的下标
* 7.String substring(start,end) 返回指定区间的字符串
* 8.charAt(int) 查找指定下标的元素值，并返回
* 9.setCharAt(index,char) 修改指定下标的元素

```java
StringBuffer s1 = new StringBuffer("hello");
// 1.append 在字符串结尾追加方法.可以增加任意类型的数据，添加后原始数据发生改变
s1.append("world");
s1.append(123);
s1.append(false);

// 2.delete 删除指定位置的字符，左闭右开
s1.delete(2,3);

// 3.replace(start,end,str) 把 [2,6) 位置上的字符串替换为 你好
s1.replace(2,6,"你好");

// 4.insert(offset,str) 在指定的下标处添加字符串
s1.insert(5,"世界");

// 5.reverse() 反转字符串
s1.reverse();

// 6.int indexOf() 返回指定字符串的下标
int index = s1.indexOf("你");
System.out.println(index);

// 7.String substring(start,end) 返回指定区间的字符串
String s2 = s1.substring(2, 6);
System.out.println(s2);

// 8.charAt(int) 查找指定下标的元素值，并返回
char c = s1.charAt(5);
System.out.println(c);

// 9.setCharAt(index,char) 修改指定下标的元素
s1.setCharAt(5,'a');

System.out.println(s1);
```

## String 和 StringBuffer、StringBuilder 相互转换

```java
// 将 String 转换为 StringBuffer
String s1 = "hello";
// 直接调用 StringBuffer 的构造器，传入一个 String 类型的数据返回的是 StringBuffer 类型
StringBuffer sb1 = new StringBuffer(s1);

// 将StringBuffer 转换为 String
StringBuffer sb2 = new StringBuffer("hello");
// 方式一：调用 String 的构造器
String s2 = new String(sb2);
// 方式二：调用 StringBuffer.toString()
String s3 = sb2.toString();
```

上面的代码只演示了`String`和`StringBuffer`之间相互转换的方法，`String`和`StringBuilder`之间转换方式与之相同

## String、StringBuffer、StringBuilder三者效率对比

效率排行排序：

`StringBuilder > StringBUffer > String`

在不考虑线程安全的前提下，我们可以使用 `StringBuilder`

## Java中两个Date类的使用

- 第一个Date是：`java.util.Date`
- 第二个Date是：`java.sql.Date`

```java
public class DateTest1 {
    @Test
    public void show(){
        // 导入的是 java.util.Date
        Date date1 = new Date();
        // Mon Aug 02 14:38:28 CST 2021 打印当前的时间
        System.out.println(date1);
        // getTime() 获取当前时间的时间戳
        System.out.println(date1.getTime()); //=> 1627887099153

        // 导入 ava.sql.Date，构造器接受一个 long 类型的参数
        java.sql.Date date2 = new java.sql.Date(date1.getTime());
        // SQL 中的 Date 类自动将时间戳转换为 年月日
        System.out.println(date2); //=> 2021-08-02
        // 获取当前的时间戳
        System.out.println(date2.getTime()); //=> 1627887137692

        // util.Date 转换成 sql.Date
        Date d3 = new Date();
        java.sql.Date d4 = new java.sql.Date(d3.getTime());
        System.out.println(d4); //=> 2021-08-02

        //sql.Date 转换成  util.Date
        Date d5 = new java.sql.Date(1627887137692L);
        System.out.println(d5); //=> 2021-08-02
        System.out.println(d5.getTime()); //=> 1627887137692
    }
}
```

## 模拟 trim 方法，去除字符串两端空格

```java
@Test
public void show() {
    String s1 = "   hello world   sss    ";
    String s2 = myTrim(s1);
    System.out.println(s2); //=> hello world   sss
}

public String myTrim(String str) {
    char[] chars = str.toCharArray();
    int leftIndex = 0;
    int rightIndex = 0;
    // 先获取最左边不是空格的下标
    for (int i = 0; i < chars.length; i++) {
        if (chars[i] != ' ') {
            leftIndex = i;
            break;
        }
    }
    // 在获取最右边不是空格的下标
    for (int i = chars.length - 1; i >= 0; i--) {
        if (chars[i] != ' ') {
            rightIndex = i;
            break;
        }
    }
    return str.substring(leftIndex, rightIndex + 1);
}
```

## 翻转指定的字符串,例如：将 abcdefg 转成 afedcbg

方式一

```java
@Test
public void show() {
    String s1 = "abcdefg";
    String s2 = "a";
    // 先将需要翻转的字符串给截取出来
    char[] chars = s1.substring(1, 6).toCharArray();
    // 循环截取出来的字符串数组.从后往前循环
    for (int i = chars.length - 1; i >= 0; i--) {
        // 拼接字符串
        s2 = s2 + chars[i];
    }
    s2 += "g";
    System.out.println(s2); //=> afedcbg
}
```

方式二

```java
@Test
public void show2() {
    String s1 = "abcdefg";
    String s2 = myResover(s1, 1, 6);
    System.out.println(s2); //=> afedcbg
}

// 采用append的方式要比使用 + 拼接效率高
private String myResover(String s1, int startIndex, int endIndex) {
    StringBuilder sb1 = new StringBuilder(s1.length());
    // 添加不反转的字符
    sb1.append(s1.substring(0, startIndex));
    // 获取到要反转的字符串数组
    char[] chars = s1.substring(startIndex, endIndex).toCharArray();
    // 从右往左循环，append到数组中
    for (int i = chars.length - 1; i >= 0; i--) {
        sb1.append(chars[i]);
    }
    // 再将右边不参与反转的字符串添加到数组中
    sb1.append(s1.substring(endIndex));
    return sb1.toString();
}
```

## 计算字符串中某个字符出现的次数

方式一：使用 replace 的方式计算字符串出现次数

```java
@Test
public void show() {
    String s1 = "absdifhabiosdfiabsoidfabsdf";
    String s2 = "ab";
    // 获取原始字符串的长度
    int oldCount = s1.length();
    // 将 ab 替换为空之后字符串的长度
    int newCount = s1.replace(s2, "").length();
    // 由于统计的字符串长度是2，所以出现的次数要除以要统计字符串的长度
    System.out.println((oldCount - newCount) / s2.length());  //=>4
}
```

方式二：使用 while 循环加 indexOf

```java
@Test
public void show2() {
    String s1 = "absdifhabiosdfiabsoidfabsdf";
    String s2 = "ab";
    int count = getStrCunt(s1, s2);
    System.out.println(count); //=> 4
}

private int getStrCunt(String mainStr, String subStr) {
    // 声明一个要返回的变量
    int count = 0;
    // 声明一个初始的下标，从初始位置开始查找
    int index = 0;
    // 获取主数据的长度
    int mainStrLength = mainStr.length();
    // 获取要查找的数据长度
    int subStrLength = subStr.length();
    // 如果要查找的数据长度大于主数据的长度则返回0
    if (subStrLength > mainStrLength) return 0;
    // 循环使用indexOf查找出现的下标，如果出现一次则count++
    while ((index = mainStr.indexOf(subStr, index)) != -1) {
        count++;
        // 从找到的位置下标加上要查找的字符串长度，让指针往后移动继续查找
        index += subStrLength;
    }
    return count;
}
```

## 获取两个字符串中最大相同子串

```java
@Test
public void testGetSomeStr() {
    String a = "sffioafihellosdfvasdf";
    String b = "sfhellodesdfs";
    String c = getSomeStr(a, b);
    System.out.println(c); //=> hello
}
public String getSomeStr(String str1, String str2) {
    // 获取两个字符串中的最大值
    String maxstr = str1;
    String minstr = str2;
    if (str2.length() > str1.length()) {
        maxstr = str2;
        minstr = str1;
    }
    // 先确定循环多少轮
    int lunCount = minstr.length();
    for (int i = 0; i < lunCount; i++) {
        // 确定每轮循环多少次
        for (int x = 0, y = lunCount - i; y <= lunCount; x++, y++) {
            if(maxstr.contains(minstr.substring(x,y))){
                return minstr.substring(x,y);
            }
        }
    }
    return null;
}
```

## 对字符串中字符进行按自然顺序排序

```java
@Test
public void show(){
    String s1 = "qwertyasdfghzxcvbn";
    String s2 = myStrSort(s1);
    System.out.println(s2); //=> abcdefghnqrstvwxyz
}
public String myStrSort(String s){
    // 先将字符传转为 char 型数组
    char[] chars = s.toCharArray();
    // 使用 Arrays.sort(chars) 方法进行排序
    Arrays.sort(chars);
    // 然后再将char型数组作为参数传递给String类构造器
    String sortStr = new String(chars);
    // 返回排序好的字符串
    return sortStr;
}
```

## 常用类 SimpleDateFormat 的使用

```java
package com.songzx.java;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 常用类 SimpleDateFormat 的使用
 * @author songzhengxiang
 * @create 2021-08-03 14:15
 */
public class SimpleDateFormat1 {
    public static void main(String[] args) {
        // 指定日期格式，按照指定的日期格式输出当前日期
        // HH 大写表示24小时制
        // hh 小写表示12小时制
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        // new Date() 获取当前的时间戳，然后使用 format 方法格式化为指定格式的日期
        String format = sdf.format(new Date());
        System.out.println(format); //=> 2021-08-03 14:19:48

        try {
            // 使用 parse 解析日期格式的字符串，该方法会抛出一个异常，防止字符串的格式错误
            Date date = sdf.parse("2021-08-03 14:19:48");
            System.out.println(date); //=> Tue Aug 03 14:19:48 CST 2021
            // getTime 获取时间戳
            System.out.println(date.getTime()); //=> 1627971588000
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }
}
```

## SimpleDateFormat 练习

将 “2021-08-03 14:29:56” 转换成 java.sql.Date

```java
package com.songzx.java;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * SimpleDateFormat 练习
 * 将 “2021-08-03 14:29:56” 转换成 java.sql.Date
 * @author songzhengxiang
 * @create 2021-08-03 14:28
 */
public class SimpleDateFormat2 {
    public static void main(String[] args) {
        // 首先声明一个 SimpleDateFormat 的对象
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            // 使用对象调用 parse 方法解析日期字符串生成一个 java.util.Date 类型的对象
            Date date = sdf.parse("2021-08-03 14:29:56");
            // 调用 getTime 方法获取时间戳传递给 java.sql.Date 生成数据库需要的日期格式的数据
            java.sql.Date date1 = new java.sql.Date(date.getTime());

            System.out.println(date1); //=> 2021-08-03
        } catch (ParseException e) {
            e.printStackTrace();
        }

    }
}
```

## SimpleDateFormat 练习

三天打鱼两天晒网，从1990-01-01 开始到之后的某一天，某一天从键盘输入，判断这一天是在打鱼还是在晒网

```java
package com.songzx.java;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;

/**
 * SimpleDateFormat 练习2
 * 三天打鱼两天晒网，从1990-01-01 开始到之后的某一天，某一天从键盘输入，判断这一天是在打鱼还是在晒网
 * 思路解析：
 * 1.首先将两个日期转换成时间戳
 * 2.然后使用两个时间戳相减然后除以一天的毫秒数得到之间相差几天,整数相除会舍去小数点后的数，所以要在结尾 + 1
 *      ((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24)) + 1
 * 3.得到相差几天后取模5，根据余数判断是否打鱼还是晒网
 *      1,2,3 : 打鱼
 *      4,,0  : 晒网（第5天取模是0，所以0晒网，没有5）
 * @author songzhengxiang
 * @create 2021-08-03 14:44
 */
public class SimpleDateFormat3 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入年");
        String yyyy =  sc.next();
        System.out.println("请输入月");
        String MM = sc.next();
        System.out.println("请输入日");
        String dd = sc.next();
        // 对输入的日期进行格式化处理
        String startDate = "1990-01-01";
        String endDate = yyyy + "-" + MM + "-" + dd;
        // 使用 SimpleDateFormat 转换日期格式
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            // 将两个日期转换成时间戳
            Date date1 = sdf.parse(startDate);
            Date date2 = sdf.parse(endDate);
            // 计算之间相差多少天
            int diffday = (int) ((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24) + 1);
            // 对结果进行取模5
            String result = getResult(diffday);
            // 打印结果
            System.out.println(result);
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    private static String getResult(int diffday) {
        switch (diffday % 5){
            case 1:
            case 2:
            case 3:
                return "打鱼";
            case 4:
            case 0:
                return "晒网";
            default:
                return null;
        }
    }
}
```

## Calender 日历类的常用方法

注意：

- 日历类中获取一月是0,十二月是11
- 日历类中获取周日是1，周六是7

```java
package com.songzx.java;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * Calender 日历类的常用方法
 * @author songzhengxiang
 * @create 2021-08-03 16:23
 */
public class CalenderTest1 {
    public static void main(String[] args) throws ParseException {
        // Calendar 类是一个静态类，无法通过new来创建，可以调用其静态方法 getInstance 来创建子类对象
        Calendar instance = Calendar.getInstance();

        // 获取当前时间是当前年中的第几周
        System.out.println(instance.get(Calendar.WEEK_OF_YEAR)); //=> 32
        // 获取当前时间是当前月中的第几周
        System.out.println(instance.get(Calendar.WEEK_OF_MONTH)); //=> 1
        // 获取当前时间是当前月中的第几天
        System.out.println(instance.get(Calendar.DAY_OF_MONTH)); //=> 3
        // 获取当前时间是今年中的第几天
        System.out.println(instance.get(Calendar.DAY_OF_YEAR)); //=> 215

        // getTime() 日历类 ---> Date
        Date date = instance.getTime();
        System.out.println(date);

        // setTime() Date ---> 日历类
        // 将字符串转换为日历类
        String strdate = "2021-09-25";
        // 先将字符串转为 SimpleDateFormat()
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        // 在通过 SimpleDateFormat 将字符串解析成 Date
        Date parse = sdf.parse(strdate);
        // 然后再将Date转成Calender
        instance.setTime(parse);
        // 获取2021-09-25是2021年的第几天
        System.out.println(instance.get(Calendar.DAY_OF_YEAR)); //=> 268
    }
}
```

## LocalDate、LocalTime、LocalDateTime 常用类的使用

```java
package com.songzx.java;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * LocalDate、LocalTime、LocalDateTime 常用类的使用
 * @author songzhengxiang
 * @create 2021-08-04
 */
public class LocalDateTime1 {
    public static void main(String[] args) {
        /* now() 方法，获取当前的时间 */
        LocalDate localDate = LocalDate.now();
        LocalTime localTime = LocalTime.now();
        LocalDateTime localDateTime = LocalDateTime.now();
        // 获取当前年月日
        System.out.println(localDate); //=> 2021-08-04
        // 获取当前时分秒毫秒
        System.out.println(localTime); //=> 08:58:44.761
        // 获取当前的年月日时分秒毫秒
        System.out.println(localDateTime); //=> 2021-08-04T09:01:46.444

        /* of() 方法，设置指定的年月日时分秒，没有偏移量 */
        LocalDate localDate1= LocalDate.of(2021, 5, 15);
        System.out.println(localDate1); //=> 2021-05-15

        /* getXxx 方法，获取特殊的日期 */
        // 获取今天是当月的第几天
        System.out.println(localDate.getDayOfMonth()); //=> 4
        // 获取今天是星期几
        System.out.println(localDate.getDayOfWeek()); //=> WEDNESDAY
        // 获取当前月份
        System.out.println(localDate.getMonthValue()); //=> 8
        // 获取今天是今年的第几天
        System.out.println(localDate.getDayOfYear()); //=> 216

        /* withXxx 方法，设置时间，不会改变原有时间  */

        // 设置日期为本月的第几天
        LocalDate localDate2 = localDate.withDayOfMonth(16);
        System.out.println(localDate2); //=> 2021-08-16
        System.out.println(localDate); //=> 2021-08-04

        // 设置月份
        LocalDate localDate3 = localDate.withMonth(5);
        System.out.println(localDate3); //=> 2021-05-04

        // 在当前日期的基础上增加5周，一周7天
        LocalDate localDate4 = localDate.plusWeeks(5);
        System.out.println(localDate); //=> 2021-08-04
        System.out.println(localDate4); //=> 2021-09-08

        // 获取3天后的日期
        LocalDate localDate5 = localDate.plusDays(3);
        System.out.println(localDate5); //=> 2021-08-07

        // 获取10天以前的日期
        LocalDate localDate6 = localDate.minusDays(10);
        System.out.println(localDate6); //=> 2021-07-25

        // 获取上周日期
        LocalDate localDate7 = localDate.minusWeeks(1);
        System.out.println(localDate7); //=> 2021-07-28

    }
}
```

## Instant 类使用

```java
package com.songzx.java;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.Date;

/**
 * Instant 类使用
 * @author songzhengxiang
 * @create 2021-08-04 15:06
 */
public class Instant1 {
    public static void main(String[] args) {
        Instant instant = Instant.now();
        // 获取当前的时间，获取的时间是本初子午线的时间，和本地时间少了8个小时
        System.out.println(instant); //=> 2021-08-04T07:08:21.354Z

        // 通过设置偏移量来获取本地时间,返回 OffsetDateTime 类
        OffsetDateTime offsetDateTime = instant.atOffset(ZoneOffset.ofHours(8));
        System.out.println(offsetDateTime); //=> 2021-08-04T15:10:38.957+08:00

        // 获取自 1970-01-01 00:00:00 开始的毫秒数
        long l = instant.toEpochMilli();
        System.out.println(l); //=> 1628061092441

        // 可以将 Date 转换为 Instant
        Instant instant1 = Instant.ofEpochMilli(new Date().getTime());
        // 通过给定的毫秒数获取 Instant 实例
        Instant instant2 = Instant.ofEpochMilli(l);
        System.out.println(instant1); //=> 2021-08-04T07:14:52.995Z
        System.out.println(instant2); //=> 2021-08-04T07:14:52.907Z

    }
}
```

## DateTimeFormatter 类使用

```java
package com.songzx.java;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;

/**
 * DateTimeFormatter 类的使用
 * @author songzhengxiang
 * @create 2021-08-04 15:30
 */
public class DateTimeFormatter1 {
    public static void main(String[] args) {
        /**
         * 实例化方式一：
         * 调用静态方法 DateTimeFormatter.ofLocalizedDateTime(FormatStyle.LONG);
         * 适用于 LocalDateTime.now()
         * 方法参数有：
         * FormatStyle.LONG => 2021年8月4日 下午03时34分56秒
         * FormatStyle.MEDIUM => 2021-8-4 15:48:37
         * FormatStyle.SHORT => 21-8-4 下午3:49
         *
         */
        DateTimeFormatter date1 = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.LONG);
        String format1 = date1.format(LocalDateTime.now());
        System.out.println(format1); //=> 2021年8月4日 下午03时45分36秒

        /**
         * 静态方法二；
         * 调用静态方法 DateTimeFormatter.ofLocalizedDate(FormatStyle.FULL);
         * 适用于 LocalDate.now()
         * 在上面的参数基础上增加一个
         * FormatStyle.FULL => 2021年8月4日 星期三
         */
        DateTimeFormatter date2 = DateTimeFormatter.ofLocalizedDate(FormatStyle.FULL);
        String format2 = date2.format(LocalDate.now());
        System.out.println(format2); //=> 2021年8月4日 星期三

        /**
         * 实例化方式二:自定义格式
         * DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
         * 返回固定格式的日期 2021-08-04 15:54:47
         * 使用 date3.format(LocalDateTime.now()) 获取指定日期格式的字符串
         * 使用 date3.parse("2021-08-04 15:54:47") 将字符串转为日期格式
         */
        DateTimeFormatter date3 = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String format3 = date3.format(LocalDateTime.now());
        System.out.println(format3); //=> 2021-08-04 15:54:47

        //=> {},ISO resolved to 2021-08-04T15:54:47
        System.out.println(date3.parse("2021-08-04 15:54:47"));
    }
}
```

## Comparable（自然排序） 接口的使用

对于String类和一些常用类都已经实现了Comparable接口，所以可以直接使用sort方法来实现排序的功能

```java
public static void main(String[] args) {
    // String 类实现了 Comparable 接口
    String[] strings = new String[]{"b","s","你好","dd","cnm","哈哈"};

    Arrays.sort(strings);
    System.out.println(Arrays.toString(strings)); //=> [b, cnm, dd, s, 你好, 哈哈]
}
```

对于自定义类来说如果要实现排序功能，需要重写CompareTo方法，重写规则如下

*  如果当前对象this大于形参对象obj，则返回正整数
*  如果当前对象this小于形参对象obj，则返回负整数
*  如果相等则返回0
*  需要在 compareTo 方法中定义好排序规则

```java
import java.util.Arrays;
/**
 * @author songzhengxiang
 * @create 2021-08-06 14:36
 */
class Goos implements Comparable {
    String name;
    double price;

    public Goos() {
    }

    public Goos(String name, double price) {
        this.name = name;
        this.price = price;
    }

    @Override
    public String toString() {
        return "Goos{" +
                "name='" + name + '\'' +
                ", price=" + price +
                '}';
    }

    // 重写 Comparable 接口中的 compareTo 方法
    @Override
    public int compareTo(Object o) {
        if (o instanceof Goos) {
            Goos goos = (Goos) o;
            if(this.price > goos.price){
                return 1;
            }else if(this.price < goos.price){
                return -1;
            }else{
                return 0;
            }
        }
        // 如果传入的对象不属于当前类则抛出一个异常
        throw new RuntimeException();
    }
}

public class Comparable2 {
    public static void main(String[] args) {
        Goos[] goos = new Goos[4];
        goos[0] = new Goos("leven", 12);
        goos[1] = new Goos("dell", 32);
        goos[2] = new Goos("xiaomi", 16);
        goos[3] = new Goos("huawei", 25);
        goos[4] = new Goos("phone", 19.9);

        // 没有实现Comparable 接口前调用 sort 方法进行排序会报错
        Arrays.sort(goos);
        // 打印结果为按照价格从高到低排序
        System.out.println(Arrays.toString(goos));
        //=> [Goos{name='leven', price=12.0},
        // Goos{name='xiaomi', price=16.0},
        // Goos{name='phone', price=19.9},
        // Goos{name='huawei', price=25.0},
        // Goos{name='dell', price=32.0}]
    }
}
```

## Comparator（定制排序）接口的使用

Comparable 和 Comparator 两者区别

相同点:

- 都是用来进行比较排序的

不同点：

- Comparable 接口需要重写 compareTo 方法
- Comparator 接口需要重写 compare 方法
- Comparable 接口定实现好重写完 compareTo 方法之后，接口的实现类在任何地方都可以进行比较
- Comparator 接口属于临时比较

```java
package com.songzx.java;

import javax.management.RuntimeErrorException;
import java.util.Arrays;
import java.util.Comparator;

/**
 * Comparator 定制排序的使用
 * @author songzhengxiang
 * @create 2021-08-06 15:26
 */
class Goods{
    String name;
    double price;

    public Goods() {
    }
    public Goods(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    @Override
    public String toString() {
        return "Goods{" +
                "name='" + name + '\'' +
                ", price=" + price +
                '}';
    }
}
public class Comparator1 {
    public static void main(String[] args) {
        Goods[] goods = new Goods[5];
        goods[0] = new Goods("xiaomi",15);
        goods[1] = new Goods("huawei",12.6);
        goods[2] = new Goods("dell",23);
        goods[3] = new Goods("asus",29);
        goods[4] = new Goods("iphone",49);
        // 如果类没有实现 Comparable 接口，可以使用 Comparator 接口来达到临时排序的目的
        Arrays.sort(goods, new Comparator() {
            @Override
            public int compare(Object o1, Object o2) {
                if(o1 instanceof Goods && o2 instanceof Goods){
                    Goods s1 = (Goods) o1;
                    Goods s2 = (Goods) o2;
                    // 加一个-号可以设置价格从高到低排序
                    return -Double.compare(s1.getPrice(),s2.getPrice());
                }
                throw new RuntimeException();
            }
        });
        // 打印结果从高到低
        System.out.println(Arrays.toString(goods));
        //=> [
        //      Goods{name='iphone', price=49.0},
        //      Goods{name='asus', price=29.0},
        //      Goods{name='dell', price=23.0},
        //      Goods{name='xiaomi', price=15.0},
        //      Goods{name='huawei', price=12.6}
        //   ]
    }
}
```

## System 类的常用方法

`System.getProperty(string)`方法接受不同的参数获取不同的值

- `java.version`获取Java运行时环境版本
- `java.home`获取Java安装目录
- `os.name`操作系统的名称
- `os.version`操作系统版本
- `user.name`用户账户名称
- `user.home`用户主目录
- `user.dir`用户的当前工作目录

```java
// 获取Java运行时环境版本
System.out.println(System.getProperty("java.version"));
// Java安装目录
System.out.println(System.getProperty("java.home"));
// 操作系统的名称
System.out.println(System.getProperty("os.name"));
// 操作系统的版本
System.out.println(System.getProperty("os.version"));
// 用户的账户名称
System.out.println(System.getProperty("user.name"));
// 用户的主目录
System.out.println(System.getProperty("user.home"));
// 用户的当前工作目录
System.out.println(System.getProperty("user.dir"));
```

## Math 类的常用方法

```java
// 求绝对值
System.out.println(Math.abs(-34)); //=> 34
// 求平方根
System.out.println(Math.sqrt(120.2)); //=> 10.963576058932597
// 求10的3次幂
System.out.println(Math.pow(10, 3)); //=> 1000.0
// 自然对数
System.out.println(Math.log(12)); //=> 2.4849066497880004
// 求最大值
System.out.println(Math.max(12, 33)); //=> 33
// 求最小值
System.out.println(Math.min(12, 33)); //=> 12
// 返回0.0到1.0的随机数
System.out.println(Math.random());
```

