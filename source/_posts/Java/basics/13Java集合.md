---
title: 13Java集合
tags: Java
categories: Java基础
abbrlink: a20b6a3e
date: 2022-02-12 21:17:18
---

## 集合框架概述

集合、数组都是对多个数据进行存储操作的结构，简称 java 容器。此时的存储只是在内存层面的存储，不涉及到持久化的存储

数组在存储多个数据时的特点：

- 一旦初始化长度后，长度就固定了
- 数组一旦定义好，其元素的类型也就确定了。我们只能操作指定的数据类型
- 比如：String[]，int[]，Object[]

数组存储数据的缺点：

- 一旦初始化后，长度固定不可变
- 数组中提供的方法有限，对于增删改查操作不方便，效率不高
- 获取数组中元素的个数需求，数组没有现成的方法
- 数组存储数据的特点：有序、可重复、对于无序，不可重复的需求不能满足。

## 集合框架

- Collection接口：单列集合，用来存储一个一个的对象

  - list 接口：存储有序的，可重复的数据
    - Arraylist，LinkedList，Vector
  - Set 接口：存储无序的，不可重复的数据
    - HashSet，LinkedHashSet，TreeSet
- Map 接口：双列接口，用来存储一对（kay-value）一对数据
  -   HashMap,linkedHashMap,TreeMap,Hashtable,Properties

## Collection中通用方法1

- add 往集合中添加一个数据
- addAll 往集合中添加另外一个集合中的全部数据
- size 返回集合中数据的个数
- isEmpty 判断集合是否为空
- clear 清空集合中的数据

```java
package com.songzx.java;
import java.util.ArrayList;
import java.util.Collection;

/**
 * add 添加一个数据
 * size 返回集合长度
 * addAll 添加多个 Collection
 * isEmpty 集合是否为空
 * clear 清空集合内容
 * @author Songzx
 * @date 2021/12/25
 */

public class MyArrayList {
    public static void main(String[] args) {
        Collection coll = new ArrayList();
        coll.add("aa");
        coll.add("bb");
        System.out.println(coll.size());

        Collection coll2 = new ArrayList();
        coll2.add("cc");
        coll.addAll(coll2);

        System.out.println(coll);

        System.out.println(coll.size());

        System.out.println(coll.isEmpty());

        coll.clear();
        System.out.println(coll.isEmpty());
    }
}
```

## Collection 中通用方法2

- contains 判断某个值是否包含在集合中，返回布尔值
- containsAll 判断某个集合中的所有元素是否全部包含在当前的集合中

```java
package com.songzx.java;

import java.util.ArrayList;
import java.util.Collection;

public class MyArrayList2 {
    public static void main(String[] args) {
        Collection c = new ArrayList();
        c.add(111);
        c.add(222);
        c.add(new Person("张三","12"));

        // contains 方法判断集合中是否包含 111
        boolean contains = c.contains(111); //=> true
        System.out.println(contains);

        // 重写 Person 中的 equals 方法
        System.out.println(c.contains(new Person("张三", "12"))); //=> true

        Collection c2 = new ArrayList();
        c2.add(111);
        c2.add(222);

        // 判断 c2 集合中的元素是否全部在 c 集合中包含
        System.out.println(c.containsAll(c2));  //=> true

        System.out.println(c);
    }
}
```

## Collection 中通用方法3

- remove 删除集合中的某个数据
- removeAll 删除和另外一个集合中的相同的元素，获取差集
- retainAll 只保留和另外一个集中相同的元素，获取交集
- equals 判断和另外一个集合是否完全相同，包括顺序也相同

```java
package com.songzx.java;

import org.junit.Test;

import java.util.ArrayList;
import java.util.Collection;

public class MyArrayList3 {
    @Test
    public void test1(){
        Collection c1 = new ArrayList();
        c1.add(111);
        c1.add(222);
        c1.add(true);
        c1.add(new Person("lisi","12"));

        // 删除集合中的某个元素
//        c1.remove(111);
        System.out.println(c1);

        Collection c2 = new ArrayList();
        c2.add(222);
        c2.add(111);
        c2.add(false);

        // 删除和另外一个集合中的交集数据
//        c1.removeAll(c2);
//        System.out.println(c1);

        System.out.println(c2);
        c1.retainAll(c2);
        System.out.println("c1和c2的差集" + c1);

        Collection c3 = new ArrayList();
        c3.add(222);
        c3.add(111);
        c3.add(false);
        // 判断两个集合中的元素是否完全相等，包括顺序也要相同
        System.out.println(c2.equals(c3));
    }
}
```

## 遍历集合元素

- iterator 迭代器，只能用于遍历 List 集合
  - hasNext 判断集合是否还有下一个元素
  - next 将指针移动到下一位，并返回所指元素

```java
package com.songzx.java;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

public class MyArrayList5 {
    public static void main(String[] args) {
        Collection c = new ArrayList();
        c.add(111);
        c.add(222);
        c.add(333);

        Iterator iterator = c.iterator();

        // 使用迭代器遍历集合元素
        while(iterator.hasNext()){
            System.out.println(iterator.next());
        }
    }
}
```

## 增强for循环

使用结构： for(数据类型 局部变量 : 要循环的集合或者数组)

```java
package com.songzx.java;
import org.junit.Test;
import java.util.ArrayList;
import java.util.Collection;

public class ForTest {
    @Test
    public void fortest(){
        Collection c = new ArrayList();
        c.add(111);
        c.add(222);
        c.add(false);
        c.add(new Person("lisi","12"));

        // 增强 for 的使用
        for (Object obj : c){
            System.out.println(obj);
        }
    }

    // 循环遍历数组
    @Test
    public void forarr(){
        String[] strarr = new String[]{"lisi","zhangsan","songzx"};
        for (String s : strarr){
            System.out.println(s);
        }
    }

    // 练习题
    @Test
    public void fortest1(){
        String[] s1 = new String[]{"mm","mm","mm"};
//        for (int i = 0; i < s1.length; i++) {
//            s1[i] = "gg";
//        }

        for (String s:s1){
            s = "gg";
        }


        for (String s : s1){
            System.out.println(s);
        }
    }
}
```

## 集合和数组的互相转换

- list.toArray(); 集合转数组
- Arrays.asList 数组转集合

```java
package com.songzx.ArrayList;

import org.junit.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;

public class ToArrays {
    @Test
    public void test(){
        Collection list = new ArrayList();
        list.add(111);
        list.add(222);
        list.add(333);

        // 将集合转换为数组
        Object[] objects = list.toArray();
        for (Object object : objects) {
            System.out.println(object);
        }

        // 将数组转为集合
        Collection list2 = Arrays.asList("1","2",false,123);
        System.out.println(list2);
    }
}
```

## List 接口常用类的对比

List 接口，用来存储有序的，可重复的数据。动态数组，替换原来的数组

- ArrayList 作为 List 接口的主要实现类，线程不安全，效率高。底层使用 Object[] elementData 存储
- linkedList  对于频繁的插入和删除，可以用这个实现类，效率比较高，底层使用的是一个双向链表结构
- Vertor 作为 List 接口古老的实现类，线程时安全的，所以效率不高。一般不使用

三个实现类的相同点：

都是 list 接口的实现类，存储的数据特点相同：有序的，可重复的

## ArrayList 的底层原理

- jdk7.0

  `ArrayList list = new ArrayList()` 底层创建了一个长度为10的Object[] 数组 elementData, 调用 `list.add(111)`时底层执行 `ArrayList[0] = new Integer(123)`;当执行多个 add 操作后，如果数组长度不够，则默认扩容原来长度的 1.5 倍。同时需要原本数组中的内容复制到新数组中

  结论：开发中可以使用带参的构造器 `ArrayList list = new ArrayList(int capacity);`

- jdk8.0

  `ArrayList list = new ArrayList()` 底层并没有创建长度为10的数组，而是 

  `private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};`

  然后再第一次执行 add 时创建一个长度为10 的数组，后续的扩容操作和 7.0 一样

- 总结

  jdk7.0 中的 ArrayList 的对象创建类似于单例模式下的饿汉式，而jdk8.0相当于单例模式下的懒汉式，延长了创建数组的周期，更加节省内存

## LinkedList 的底层原理

- 底层使用的是一个双向链表结构去存储数据

- `linkedList list = new LinkedList();` 内部声明了 Node 类型的 last 属性和 first 属性，值为 null

- `list.add(111);` 底层封装了 111 到 Node 中，创建了 Node 对象

- ```java
  private static class Node<E> {
      E item;
      Node<E> next;
      Node<E> prev;
  
      Node(Node<E> prev, E element, Node<E> next) {
          this.item = element;
          this.next = next;
          this.prev = prev;
      }
  }
  ```

  

## ArrayList 实现类常用方法

* `add(int index,Object obj)` 在指定下标处添加一个数据
* `addAll(int index,Collection coll)` 在指定的下标处添加某个集合中的所有数据
* `get(int index)` 获取集合中指定下标的数据
* `indexOf(Object o)` 获取集合中某个元素首次出现时的下标
* `lastIndexOf(Object o)` 获取集合中某个数据最后一次出现的下标
* `Object reVal = list.remove(int index);` 删除指定位置的元素并返回被删除的元素
* `Object setVal = list.set(int index, Object o);` 将指定下标的数据修改为指定的数据，并返回修改前的数据
* `subList(int formIndex,int toIndex)` 左闭右开，获取集合中区间数据，返回一个新的集合

```java
package com.songzx.ArrayList;

import com.songzx.java.Person;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

/**
 * add(int index,Object obj) 在指定下标处添加一个数据
 * addAll(int index,Collection coll) 在指定的下标处添加某个集合中的所有数据
 * get(int index) 获取集合中指定下标的数据
 * indexOf(Object o) 获取集合中某个元素首次出现时的下标
 * lastIndexOf(Object o) 获取集合中某个数据最后一次出现的下标
 * Object reVal = list.remove(int index); 删除指定位置的元素并返回被删除的元素
 * Object setVal = list.set(int index, Object o); 将指定下标的数据修改为指定的数据，并返回修改前的数据
 * subList(int formIndex,int toIndex) 左闭右开，获取集合中区间数据，返回一个新的集合
 * @author Songzx
 * @date 2021/12/27
 */

public class Test1 {
    @Test
    public void test1(){
        ArrayList list = new ArrayList();
        list.add(111);
        list.add(222);
        list.add("hello");
        list.add(new Person("Tome","3"));
        list.add(222);

        System.out.println("原始数据" +  list);

        // 在下标为1的地方添加一个333
        list.add(1,333);
        System.out.println("add添加后的数据" + list);

        ArrayList list2 = new ArrayList();
        list2.add("word");
        list2.add("你好 世界");

        // 在指定的下标处添加某个集合中的所有数据
        list.addAll(2,list2);
        System.out.println(list);

        // get(int index) 获取集合中指定下标的数据
        System.out.println("获取集合中指定下标的数据"+list.get(0));

        // indexOf(Object o) 获取集合中某个元素首次出现时的下标
        System.out.println("获取集合中某个元素首次出现时的下标"+list.indexOf(222));

        // lastIndexOf(Object o) 获取集合中某个数据最后一次出现的下标
        System.out.println(list);
        System.out.println(list.lastIndexOf(222));

        // Object reVal = list.remove(int index); 删除指定位置的元素并返回被删除的元素
        Object reVal = list.remove(3);
        System.out.println(reVal);

        // Object setVal = list.set(int index, Object o); 将指定下标的数据修改为指定的数据，并返回修改前的数据
        Object setVal = list.set(0, "起始数据");
        System.out.println(setVal);
        System.out.println(list);

        // subList(int formIndex,int toIndex) 左闭右开，获取集合中区间数据，返回一个新的集合
        List subList = list.subList(3, 6);
        System.out.println(subList);


    }
}
```

## List 遍历及方法总结

| 功能 | 方法名称                                                     |
| ---- | ------------------------------------------------------------ |
| 增加 | `add(int index,Object o)` ; `add(Object 0)`                  |
| 删除 | `remove(int index)`；`remove(Object o)`；`removeAll(Collection c)` |
| 修改 | `set(int index,Object o)`；                                  |
| 查询 | `get(int index)`；`indexOf(Object o)`                        |
| 长度 | `size()`                                                     |
| 循环 | 基础循环，增强for循环，iterator 迭代器                       |

三种循环方法

```java
package com.songzx.ArrayList;

import org.junit.Test;

import java.util.ArrayList;
import java.util.Iterator;

public class Test2 {
    @Test
    public void test(){
        ArrayList list = new ArrayList();
        list.add(111);
        list.add(222);
        list.add("hello");

        // 基础的循环方法
        for (int i = 0; i < list.size(); i++) {
            System.out.println(list.get(i));
        }

        System.out.println("***********************");

        // 增强for循环
        for(Object o : list){
            System.out.println(o);
        }

        System.out.println("***********************");

        // iterator 循环
        Iterator iterator = list.iterator();
        while (iterator.hasNext()){
            System.out.println(iterator.next());
        }
    }
}
```

## list 存储数据时的注意点

存储自定义类的对象时要在自定义类中重写 equals 方法

## Set 接口框架

set 接口，用来存储无需的，不可重复的数据，实现类有下面三个：

- HashSet，主要实现类，线程不安全的，可以存储 null 值
  - linkedHashSet，是 HashSet 类的子类，遍历内部数据时可以按照添加的循序遍历
- TreeSet，只能添加同一个类 new 出来的数据，可以按照添加对象的指定属性进行排序

## Set 接口中的无序性和不可重复性

Set 接口中没有额外的方法，使用的都是 Collection 中定义的公共方法。

无序性：不等于随机性，存储的数据在底层并不是按照数组的索引位置排列，而是按照hashcode值进行排列。遍历输出时不会按照添加的顺序输出

不可重复性：判断元素是否相等还是调用 equals 方法来进行判断，判断对象是否相等时会判断 hasCode 的返回值和 equals 方法

```java
package com.songzx.HashSetTest;

import com.songzx.java.Person;
import org.junit.Test;

import java.util.*;

public class Test1 {
    @Test
    public void test(){
        HashSet s = new HashSet();
        s.add(111);
        s.add("222");
        s.add(false);
        // 如果添加两个相同的对象则会调用equals判断并且也会根据hasCode去判断是否相同
        s.add(new Person("Tome","12"));
        s.add(new Person("Tome","12"));
        s.add(111); // 当添加重复的数据时只会保留一个
        System.out.println("是否为空："+s.isEmpty());


        s.remove(new Person("Tome","12"));

        Iterator iterator = s.iterator();
        while (iterator.hasNext()){
            // 循环出来的顺序不是按照我们添加的循序输出的，而是按照hash值输出
            System.out.println(iterator.next());
        }

        System.out.println("*******************");
        LinkedHashSet l = new LinkedHashSet();
        l.add(111);
        l.add("222");
        l.add(true);
        l.add(new Person("Tome","12"));
        l.add(111); // 当添加重复的数据时只会保留一个
        for (Object o : l) {
            // LinkedHashSet 类循环输出时会按照添加的顺序输出
            System.out.println(o);
        }

        // 删除集合中和另外一个集合相同的数据
        s.removeAll(l);
        System.out.println("****************");
        for (Object o : s) {
            System.out.println(o);
        }
    }
}
```

## HashSet中元素的添加过程

我们向 HashSet 集合中添加元素 a 时，首先调用元素 a 所在类的 HashCode 方法获取哈希值。此哈希值通过某种算法计算得出在 HashSet 底层数组中要保存的下标，然后判断这个位置上是否已经存在元素：

- 如果该位置没有元素，则保存成功 **-- 情况1**
- 如果该位置上已经有其他元素b或者已链表形式保存的多个其他多个元素，则比较元素a和元素b的哈希值
  - 如果哈希值不同，则元素a添加成功 **-- 情况2**
  - 如果哈希值相同，则调用a所在类的equals方法和元素b做比较，或则和该索引位置上的链表中的每一个元素做比较
    - 如果返回 true ，则表示已经存在相同的数据，则a添加失败
    - 如果返回 false，则a保存成功 **-- 情况3**

说明：就情况2和情况3的保存成功而言，元素a是和该索引位置上的元素以链表的形式来保存

- jdk7.0 中，元素a会放到数组中，指向原来的数据
- jdk8.0中，原来的元素还在数组中，指向元素a
- 总结：7上8下

## 关于 hashCode 和 equlas 方法的重写

向 Set 中添加数据，其所在类一定要重写 hashCode 和 equals 方法。

要求重写的hashCode 和 equals 方法尽可能保持一致，相等对象必须返回相同的散列码。

## linkedHashSet 的说明

linkedHashSet 在遍历时可以按照添加的顺序输出，这是因为每个数据在维护时同时还维护了两个引用，分别记录前一个数据和下一个数据。所以在遍历输出时可以按照添加的循序输出，但是在底层存储时还是按照哈希值来存储

```java
package com.songzx;

import org.junit.Test;

import java.util.HashSet;
import java.util.LinkedHashSet;

public class LinkedHashSetTest {
    @Test
    public void test(){
        LinkedHashSet l = new LinkedHashSet();
        l.add(111);
        l.add("222");
        l.add(4);
        l.add(3);

        HashSet s = new HashSet(l);

        // LinkedHashSet 遍历时会按照添加的顺序输出
        for (Object o : l) {
            System.out.println(o);
        }

        System.out.println("************");

        for (Object o : s) {
            System.out.println(o);
        }
    }
}
```

## TreeSet 类的自然排序

底层是一个红黑二叉树。

TreeSet 中判断数据是否相同不再调用 equals 方法，而是根据 compare 方法的返回值是否为0，如果是0则就认为相等。同时新增的数据只能是同一个类的数据。

首先定义 User 类，并实现 Comparable 接口，重写 compareTo 方法

```java
package com.songzx.TreeSet;

public class Users implements Comparable{
    String name;
    int age;

    public Users(String name, int age) {
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

    @Override
    // name按照自然排序，如果name相同则按照年龄从小到大排序
    public int compareTo(Object o) {
        if(o instanceof Users){
            Users u = (Users) o;
            // 首先按照默认的排序比较name
            int compar = this.name.compareTo(u.name);
            // 如果名字不同则默认返回比较的结果
            if(compar != 0){
                return compar;
            }else{
                // 如果名字相同则比较年龄,从小到大排序
                compar = Integer.compare(this.age, u.age);
                return compar;
            }
        }else{
            throw new RuntimeException("类型不正确");
        }
    }

    @Override
    public String toString() {
        return "Users{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```

然后往 TreeSet 类中添加 User 对象时会按照 User 类中定义的排序规则进行排序

```java
package com.songzx.TreeSet;
import org.junit.Test;
import java.util.TreeSet;

public class TreeSetTest1 {
    @Test
    public void test(){

        TreeSet t = new TreeSet();
//        失败：ClassCastException 只能添加相同类的对象
//        t.add(43);
//        t.add(21);
//        t.add(new Users("time",12));

        // int 类型的数据遍历输出时会自动排好序
//        t.add(21);
//        t.add(2);
//        t.add(66);

        // TreeSet 比较类时要在自定义类中实现 Comparable 接口完成比较
        t.add(new Users("Tome",2));
        t.add(new Users("Jack",22));
        t.add(new Users("Ajk",15));
        t.add(new Users("Mark",15));
        t.add(new Users("Ajk",15));


        for (Object o : t) {
            System.out.println(o);
        }
    }
}
```

## TreeSet 类的定制排序

在 new TreeSet 时可以往构造器中添加 Comparator 对象实现定制排序

```java
package com.songzx.TreeSet;
import org.junit.Test;
import java.util.Comparator;
import java.util.TreeSet;

public class TreeSetTest2 {
    @Test
    public void test(){
        // new Comparator 对象，作为TreeSet构造函数的参数传递过去即可实现定制排序
        Comparator com = new Comparator() {
            // 定制排序，按照年龄从小到大排序
            @Override
            public int compare(Object o1, Object o2) {
                if(o1 instanceof Users && o2 instanceof Users){
                    Users u1 = (Users) o1;
                    Users u2 = (Users) o2;
                    return Integer.compare(u1.getAge(),u2.getAge());
                }else{
                    throw new RuntimeException("类型错误");
                }
            }
        };

        TreeSet t = new TreeSet(com);
        t.add(new Users("Tome",2));
        t.add(new Users("Jack",22));
        t.add(new Users("Ajk",15));
        t.add(new Users("Mark",15));
        t.add(new Users("Ajk",4));

        for (Object o : t) {
            System.out.println(o);
        }
    }
}
```

## 有趣的面试题

```java
package com.songzx.test;
import java.util.HashSet;
import java.util.Objects;

public class TreeSetTest2 {
    public static void main(String[] args) {
        HashSet t = new HashSet();
        User u1 = new User("AA",12);
        User u2 = new User("BB",23);

        t.add(u1);
        t.add(u2);
        System.out.println(t); //=> [User{name='BB', age=23}, User{name='AA', age=12}]

        u1.name = "CC";
        // 这里删除CC会用CC去计算哈希值，但是由于添加u1时用的是AA计算的哈希值，这就导致去删除CC时没有找到该位置上的哈希值
        // 所以不会删除成功
        t.remove(u1);
        System.out.println(t); //=> [User{name='BB', age=23}, User{name='CC', age=12}]

        // 这里会添加成功，set集合中会出现两个CC
        // 这是因为用CC去计算哈希值时计算的下标不会和上面的u1下标重复，因为当初添加u1时是用AA去计算的下标，所以添加成功
        t.add(new User("CC",12));
        System.out.println(t); //=> [User{name='BB', age=23}, User{name='CC', age=12}, User{name='CC', age=12}]

        // 这里也会添加成功，添加时会用AA去计算哈希值，虽然会找到已经添加的下标，但是通过equals去对比时会返回false
        // 所以也能添加成功
        t.add(new User("AA",12));
        System.out.println(t); //=> [User{name='BB', age=23}, User{name='CC', age=12}, User{name='CC', age=12}, User{name='AA', age=12}]
    }
}


class User{
    String name;
    int age;

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return age == user.age && Objects.equals(name, user.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}
```

## Map 接口及多个实现类对比

Map 是一个双列数据，存储一对键值对（key，value），主要的实现类有：

- HashMap：作为Map的主要实现类，线程是不安全的，效率高。可以存储null值的key和value
  - LinkedHashMap：是 HashMap 的一个子类，可以在遍历数据时按照添加的顺序输出，这是因为在添加数据时同时维护了一对指针，一个指向前一个数据，一个指向后一个数据。对于插入和遍历时可以使用该类
- TreeMap：可以实现添加数据的定制排序和自然排序
- Hashtable：是Map的一个古老实现类，开发中不使用，线程是安全的，效率低。不能存储 null 值得key 和 value
  - Properties：常用来处理配置文件，key和value都是string类型

不同实现类的底层存储结构：

- HashMap：数组 + 链表（jdk7.0）

  ​						数组 + 链表 + 红黑树（jdk8.0）

- TreeMap：红黑树

## Map 存储结构理解

- Map中的key：无序的，不可重复的。使用 Set 存储所有的 key ---> key 所在的类要重写 equals 和 hashCode 方法
- Map中的value：无序的，可重复的。使用 Collection 存储所有的value，value 所在的类要重写 equals 方法
- 一个键值对构成了一个 enter 对象。Map中的enter是无序的，不可重复的，使用 Set 存储所有的 enter

## HashMap 的底层原理（jdk7.0）

首先 `HashMap map = new HashMap()` 后：

在实例化之后，底层创建了一个长度是 16 的一维数组 `Entry[] table`

然后经过多次添加动作：

....

`map.pub(key1,value1);`

首先调用 key1 所在类的 hashCode 方法计算在数组中的所在下标：

如果此位置上的数据为空，则 key1-value1添加成功 ---- 情况1

如果此位置上存在数据（意味着这个位置上存在一个或者多个（以链表形式存在）），那么就比较 key1 和一个链表上的多个 key 的哈希值：

​	如果哈希值不一样，则 key1-value1 添加成功 ---- 情况2

​	如果哈希值一样，则继续比较equals：

​		如果equals返回false，则 key1-value1 添加成功 ---- 情况3

​		如果equals返回true，则会将之前的重名 key 的value 值替换为要添加的 value1

>补充：情况2和情况3都是以链表的形式存储数据。
>
>在不断添加的过程中会遇到扩容问题，默认扩容的长度是原来的2倍，并将旧数据复制到新数组中。

## HashMap 的底层原理在jdk7.0 和 jdk8.0中的区别

1.  `new HashMap` 的时候底层并没有创建一个长度为16的数组
2. jdk8 底层创建的是 `Node[]` 而非 `Entey[]`
3. 首次调用 put 方法时，底层会创建一个长度是 16 的数组
4. jdk7 中的底层的数据结构只有：数组，链表；jdk8 中底层的数据结构有：数组，链表，红黑树。
   1. 其中当数组某索引位置上的元素的个数大于8并且数组长度大于64时，此时索引位置上的所有数据改为红黑二叉树。

## Map 接口中的常用方法

### 添加、删除、修改

* put(key,value) 添加操作
* putAll(HashMap m) 将m中的所有key value都添加到当前的map中
* remove(key) 删除集合中的指定key元素,并返回被删除的元素value
* clear() 删除集合中的所有key value

```java
package com.songzx.HashMap;

import java.util.HashMap;

/**
 * put(key,value) 添加操作
 * putAll(HashMap m) 将m中的所有key value都添加到当前的map中
 * remove(key) 删除集合中的指定key元素,并返回被删除的元素value
 * clear() 删除集合中的所有key value
 *
 *
 * @author Songzx
 * @date 2022/1/2
 */

public class Map1 {
    public static void main(String[] args) {
        HashMap m = new HashMap();
        m.put("name","Lisi");
        m.put("age",12);
        m.put("height",186);
        // key 重复时是修改操作
        m.put("name","zhangsan");

        HashMap m2 = new HashMap();
        m2.put("weight",188);
        m2.put("classNumber",2);
        // 将另外一个map中的数据全部添加到当前map中
        m2.putAll(m);

        // 删除集合中的指定key元素,并返回被删除的元素value
        Object age = m.remove("age");
        System.out.println(age);

        // 删除集合中的所有key value
        m.clear();


        System.out.println(m2);

        System.out.println(m);
    }
}
```

### 元素查询操作

* get(key) 根据指定的key获取对应的value值
* containsKey 判断Map中是否包含指定的key，返回一个布尔值
* containsValue 判断Map中是否包含指定的value，返回一个布尔值
* size() 返回Map中键值对的个数
* isEmpty() 判断集合是否为空
* equals() 判断两个集合是否相同

```java
package com.songzx.HashMap;

import java.util.HashMap;

/**
 * Map 中的查询操作
 * get(key) 根据指定的key获取对应的value值
 * containsKey 判断Map中是否包含指定的key，返回一个布尔值
 * containsValue 判断Map中是否包含指定的value，返回一个布尔值
 * size() 返回Map中键值对的个数
 * isEmpty() 判断集合是否为空
 * equals() 判断两个集合是否相同
 *
 * @author Songzx
 * @date 2022/1/2
 */

public class Map2 {
    public static void main(String[] args) {
        HashMap m = new HashMap();
        m.put("name","Lisi");
        m.put("age",12);
        m.put("height",186);

        // 根据指定的key获取对应的value值
        Object age = m.get("age");
        System.out.println(age); //=> 12

        // 判断Map中是否包含指定的key
        boolean isAge = m.containsKey("age");
        System.out.println(isAge); //=> true

        // 判断Map中是否包含指定的value
        boolean b = m.containsValue(12);
        System.out.println(b); //=> true

        // 返回Map中键值对的个数
        System.out.println(m.size()); //=> 3

        // 判断集合是否为空
        System.out.println(m.isEmpty()); //=> false

        HashMap m2 = new HashMap();
        m2.putAll(m);
        // 判断两个集合是否相同
        System.out.println(m2.equals(m));
    }
}
```

### 遍历操作

* keySet() 返回所有key构成的Set
* values() 返回所有value构成的Collection
* entrySet 返回所有key-value构成的set

```java
package com.songzx.HashMap;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * keySet() 返回所有key构成的Set
 * values() 返回所有value构成的Collection
 * entrySet 返回所有key-value构成的set
 *
 * @author Songzx
 * @date 2022/1/2
 */

public class Map3 {
    public static void main(String[] args) {
        HashMap m = new HashMap();
        m.put("name","Lisi");
        m.put("age",12);
        m.put("height",186);

        // keySet() 返回所有key构成的Set
        Set keys = m.keySet();
        for (Object key : keys) {
            System.out.println(key);
        }

        System.out.println("=================");

        // values() 返回所有value构成的Collection
        Collection values = m.values();
        for (Object value : values) {
            System.out.println(value);
        }
        System.out.println("=================");

        // entrySet 返回所有key-value构成的set
        Set entrySet = m.entrySet();
        // 遍历方式一
        for (Object o : entrySet) {
            Map.Entry entry = (Map.Entry) o;
            Object key = entry.getKey();
            Object value = entry.getValue();
            System.out.println(key + "-->" + value);
        }
        System.out.println("=================");
        // 遍历方式二
        Set set = m.keySet();
        for (Object o : set) {
            Object key = o;
            Object value = m.get(o);
            System.out.println(key + "-->" + value);
        }
    }
}
```

## TreeMap 的两种排序

```java
package com.songzx.HashMap;

import org.junit.Test;

import java.util.Comparator;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

public class TreeMap1 {
    /**
     * 自然排序，按照字母排序
     * 要求自定义类要实现 Comparable 接口
     * @author Songzx
     * @date 2022/1/4
     */

    @Test
    public void test1(){
        TreeMap t = new TreeMap();
        User u1 = new User("tome",12);
        User u2 = new User("jary",3);
        User u3 = new User("array",19);
        User u4 = new User("dog",21);

        t.put(u1,166);
        t.put(u2,100);
        t.put(u3,60);
        t.put(u4,99);

        Set entrySet = t.entrySet();
        for (Object o : entrySet) {
            Map.Entry m = (Map.Entry) o;
            Object key = m.getKey();
            Object value = m.getValue();
            System.out.println(key + "-->" + value);
        }
    }

    /**
     * 定制排序，按照年龄从小到大
     * @author Songzx
     * @date 2022/1/4
     */

    @Test
    public void test2(){
        TreeMap t = new TreeMap(new Comparator() {
            @Override
            public int compare(Object o1, Object o2) {
                if(o1 instanceof User && o2 instanceof User){
                    return Integer.compare(((User) o1).getAge(),((User) o2).getAge());
                }
                throw new RuntimeException("类型错误");
            }
        });
        User u1 = new User("tome",12);
        User u2 = new User("jary",3);
        User u3 = new User("array",19);
        User u4 = new User("dog",21);

        t.put(u1,166);
        t.put(u2,100);
        t.put(u3,60);
        t.put(u4,99);

        for (Object o : t.keySet()) {
            Object key = o;
            Object value = t.get(o);
            System.out.println(key + "-->" + value);
        }
    }
}
```

## Properties 读取配置文件

首先在工程项目下右键，新建 `Resource Bundle`

![image-20220104085528702](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/javamaster/1.png)

输入一个文件名称点击OK，配置文件会自动加载到项目根目录下

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/javamaster/2.png)

然后在 `jdbc.properties` 文件中编写配置代码

```java
name=Tome
password=abc123
```

然后使用 Properties 读取配置文件

```java
package com.songzx.HashMap;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class Properties1{
    public static void main(String[] args){
        try {
            // 读取配置文件信息，要求key和value都是字符串
            Properties p = new Properties();
            FileInputStream file = new FileInputStream("jdbc.properties");
            p.load(file);
            String name = p.getProperty("name");
            String password = p.getProperty("password");
            //=> name=Tome, password=abc123
            System.out.println("name=" + name + ", password=" + password);
        }catch (IOException e){
            e.printStackTrace();
        }
    }
}
```

## collections 工具类的常用方法

* `Collections.reverse(List list)` 反转list集合中的元素顺序
* `Collections.shuffle(List list)` 对list集合中的元素进行随机排序
* `Collections.sort(List list)` 对list集合中的元素进行自然排序
* `Collections.swap(list,i,j)` 让list集合中i下标处的元素和j下标处的两个元素交换位置
* `Comparable max = Collections.max(list)` 返回集合中的最大值
* `Comparable min = Collections.min(list)` 返回集合中的最小值
* `int frequency = Collections.frequency(list, 123);` 获取集合中指定元素出现的次数
* `Collections.copy(list2,a);` 复制一个集合到新的集合中
* `boolean b = Collections.replaceAll(list, oldVal, newVal);` 替换集合中的指定元素为新的元素

```java
package com.songzx.Collections;

import org.junit.Test;

import java.util.*;

/**
 * Collections.reverse(List list) 反转list集合中的元素顺序
 * Collections.shuffle(List list) 对list集合中的元素进行随机排序
 * Collections.sort(List list) 对list集合中的元素进行自然排序
 * Collections.swap(list,i,j) 让list集合中i下标处的元素和j下标处的两个元素交换位置
 * Comparable max = Collections.max(list) 返回集合中的最大值
 * Comparable min = Collections.min(list) 返回集合中的最小值
 * int frequency = Collections.frequency(list, 123); 获取集合中指定元素出现的次数
 * Collections.copy(list2,a); 复制一个集合到新的集合中
 * boolean b = Collections.replaceAll(list, oldVal, newVal); 替换集合中的指定元素为新的元素
 *
 * @author Songzx
 * @date 2022/1/4
 */

public class test1 {
    @Test
    public void test(){
        ArrayList a = new ArrayList();
        a.add(123);
        a.add(21);
        a.add(100);
        a.add(6);

        System.out.println(a); //=> [123, 21, 100, 6]

        // 翻转集合
        Collections.reverse(a);
        System.out.println(a); //=> [6, 100, 21, 123]

        // 对 list 集合中的元素进行随机排序
        Collections.shuffle(a);
        System.out.println(a);

        // 对list集合中的元素进行自然排序
        Collections.sort(a);
        System.out.println(a); //=> [6, 21, 100, 123]

        // 让集合中的两个下标位置的元素位置交换位置
        Collections.swap(a,1,2);
        System.out.println(a); //=> [6, 100, 21, 123]

        // 返回集合中的最大值
        Comparable max = Collections.max(a);
        System.out.println(max); //=> 123

        // 返回集合中的最小值
        Comparable min = Collections.min(a);
        System.out.println(min); //=> 6

        // 获取集合中指定元素出现的次数
        int frequency = Collections.frequency(a, 123);
        System.out.println(frequency); //=> 1

        // 复制一个集合的内容到新的集合中
        // 使用复制方法前必须先创建一长度大于等于要复制的集合的集合
        // 然后使用 Collections.copy 方法复制旧集合到新的集合中
        List list2 = Arrays.asList(new Object[a.size()]);
        System.out.println(list2.size());
        Collections.copy(list2,a);
        System.out.println(list2);

        // 将集合中指定的元素替换为新的元素
        boolean b = Collections.replaceAll(list2, 21, 221);
        System.out.println(b);
        System.out.println(list2);

    }
}
```

## 用list存放map数据

```java
package com.songzx.test;

import jdk.nashorn.internal.parser.JSONParser;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class ListMap {
    public static void main(String[] args) {

        Map m1 = new HashMap();
        m1.put("name","张三");
        m1.put("age",15);

        Map m2 = new HashMap();
        m2.put("name","李四");
        m2.put("age",21);

        // 用list存放map数据
        ArrayList list = new ArrayList();
        list.add(m1);
        list.add(m2);

        System.out.println(list); // [{name=张三, age=15}, {name=李四, age=21}]

        Iterator iterator = list.iterator();
        while (iterator.hasNext()){
            System.out.println(iterator.next());
        }
    }
}
```

## 负载因子对HashMap有什么影响

- 负载因子越大，数组空间密度越大，越容易发生元素碰撞。数组中的链表长度也就越长。造成查询或插入时查询的次数就会比较多，效率低
- 负载因子越小，数组空间密度越小，不容易发生元素碰撞，数组中的链表长度越小，查询和插入时的查询次数越小。但是会浪费一定的内存空间，而且经常扩容也会影响效率，建议初始化预设比较大的初始空间
- 按照其他语言的参考及研究经验，将负载因子设置为0.7~0.75之间，此时平均检索次数接近与常数

