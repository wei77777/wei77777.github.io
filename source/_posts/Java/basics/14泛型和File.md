---
title: 14泛型和File
tags: Java
categories: Java基础
abbrlink: 42cb8cad
date: 2022-02-12 21:18:11
---

## 什么是泛型

所谓的泛型，就是允许在定义类，接口时通过一个标识表示类中某个属性的类型或者某个方法的返回值或者参数的类型。这个类型参数可以在使用时（例如：继承或者实现这个接口，用这个类型声明变量、创建对象时）确定（即传入实际的类型参数，也称为类型实参）。

泛型的概念是在 jdk5.0 之后提出来的概念。

## 使用泛型初体验

```java
package com.songzx.generic;

import org.junit.Test;

import java.util.*;

public class Exer1 {
    @Test
    /**
     * 不使用泛型
     * @author Songzx
     * @date 2022/1/6
     */

    public void test1(){
        ArrayList list = new ArrayList();
        list.add(86);
        list.add(99);
        list.add(82);
        list.add(83);
        // 在编译阶段不会校验数据类型的不同
        // list.add("Tome");
        for (Object o : list) {
            // 如果集合中的类型不一致，在强转是可能会报错 ClassCastException
            int per = (Integer) o;
            System.out.println(per);
        }
    }

    /**
     * 使用泛型类约束集合中的数据类型
     * @author Songzx
     * @date 2022/1/6
     */
    @Test
    public void test2(){
        // 在创建集合对象时使用泛型约束这个集合只能存放 int 类型的数据
        ArrayList<Integer> integers = new ArrayList<Integer>();
        integers.add(56);
        integers.add(99);
        integers.add(89);
        integers.add(96);
        // 在编译阶段如果添加的类型不一致，则会出现错误提示
        // integers.add("Tome");
        for (Integer integer : integers) {
            // 自动向下转型
            int i = integer;
            System.out.println(i);
        }
    }

    /**
     * 泛型在Map中的使用
     * @author Songzx
     * @date 2022/1/6
     */
    @Test
    public void test3(){
        HashMap<String, Integer> map = new HashMap<String, Integer>();
        map.put("Tome",96);
        map.put("Jack",69);
        map.put("Jary",89);
        // 泛型嵌套
        // map.entrySet() 得到的是一个 Entry 类型的 Set 集合
        // 每一个 Entry 都有一个 key 和 value，使用泛型约束 key 和 value 的类型
        Set<Map.Entry<String, Integer>> entries = map.entrySet();
        Iterator<Map.Entry<String, Integer>> iterator = entries.iterator();
        while (iterator.hasNext()){
            Map.Entry<String, Integer> next = iterator.next();
            // 自动得到key和value的数据类型
            String key = next.getKey();
            Integer value = next.getValue();
            System.out.println(key + "------" + value);
        }
    }
}
```

## 在 TreeSet 中使用泛型减少条件判断

首先定义 `Employee` 和 `Mydate` 类

Employee 类

```java
package com.songzx.generic;

public class Employee implements Comparable<Employee>{
    public String name;
    public int age;
    public MyDate brithday;

    public Employee(String name, int age, MyDate brithday) {
        this.name = name;
        this.age = age;
        this.brithday = brithday;
    }

    public MyDate getBrithday() {
        return brithday;
    }

    public void setBrithday(MyDate brithday) {
        this.brithday = brithday;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", brithday=" + brithday +
                '}';
    }

    @Override
    public int compareTo(Employee o) {
        // 有了泛型约束后，不需要进行类型强转，可以直接使用参数中的属性进行比较
        return this.name.compareTo(o.name);
    }
}
```

Mydate 类

```java
package com.songzx.generic;

import java.util.Objects;

public class MyDate implements Comparable<MyDate>{
    public Integer year;
    public int month;
    public int day;

    public MyDate(int year, int month, int day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }

    @Override
    public String toString() {
        return "MyDate{" +
                "year=" + year +
                ", month=" + month +
                ", day=" + day +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MyDate myDate = (MyDate) o;
        return year == myDate.year && month == myDate.month && day == myDate.day;
    }

    @Override
    public int hashCode() {
        return Objects.hash(year, month, day);
    }

    @Override
    public int compareTo(MyDate o) {
        return this.year.compareTo(o.year);
    }
}
```

定义 TreeSet 类实行自然排序和定制排序

自然排序

```java
package com.songzx.generic;

import org.junit.Test;

import java.util.Comparator;
import java.util.TreeSet;

public class Exer2 {
    @Test
    public void test1(){
        // jdk7.0新语法：类型推导，定义泛型时，后面的尖括号内可以省略类型参数
        TreeSet<Employee> empls = new TreeSet<>();
        Employee tome = new Employee("tome", 21, new MyDate(2000, 01, 06));
        Employee anni = new Employee("anni", 19, new MyDate(1999, 05, 06));
        Employee mame = new Employee("mame", 20, new MyDate(2001, 10, 10));

        empls.add(tome);
        empls.add(anni);
        empls.add(mame);
        // 默认按照姓名自然排序
        for (Employee empl : empls) {
            System.out.println(empl); //=> anni,mame,tome
        }
    }
}
```

定制排序

```java
package com.songzx.generic;

import org.junit.Test;

import java.util.Comparator;
import java.util.TreeSet;

public class Exer2 {
    @Test
    public void test2(){
        TreeSet<Employee> employees = new TreeSet<>(new Comparator<Employee>() {
            @Override
            public int compare(Employee o1, Employee o2) {
                // 使用 Mydate 类中的排序方法进行定制排序
                // 按照出生年份从小到大排序
                return o1.getBrithday().compareTo(o2.getBrithday());
            }
        });
        Employee tome = new Employee("tome", 21, new MyDate(2000, 01, 06));
        Employee anni = new Employee("anni", 19, new MyDate(1999, 05, 06));
        Employee mame = new Employee("mame", 20, new MyDate(1998, 10, 10));

        employees.add(tome);
        employees.add(anni);
        employees.add(mame);

        for (Employee employee : employees) {
            System.out.println(employee); //=> 1998,1999,2000
        }

    }
}
```

## 在集合中使用泛型总结

- 集合接口或者集合类在jdk5.0之后都修改为了带泛型的结构
- 在实例化集合时，可以指明具体的泛型类型
- 指明完泛型后，在定义类或接口时内部的数据类型就被确定了，不能再有其他类型的数据
- 泛型的类型必须是类，不能是基本数据类型。需要用到基本数据类型的位置用包装类替代
- 如果实例化是没有指定泛型，则默认是 Object 类型
- 在 jdk7.0 之后，定义泛型时后面尖括号内的类型可以省略 `ArrayList<Integer> integers = new ArrayList<>()`

## 自定义泛型类

首先定义泛型时使用一对尖括号 `<>`，常用一个大写字母表示泛型类型参数。常见的有 `<E>,<T>,<K>,<V>`

```java
package com.songzx.generic;

/**
 * 自定义泛型类
 * @author Songzx
 * @date 2022/1/6
 */

public class Exer3 {
    public static void main(String[] args) {
        // 实例化自定义泛型类
        Order<String> orders = new Order<>();
        orders.setO("name");
        // 这里返回的数据类型就是我们实例化orders时传入的泛型类型
        String o = orders.getO();
        System.out.println(o);

        // 泛型类的继承，子类在继承父类时已经确定的泛型类型，所以在实例化子类时不需要声明泛型
        Order2 order2 = new Order2();
        order2.setO(123);
        Integer o1 = order2.getO();
        System.out.println(o1);

        // 当子类也定义成泛型类时，实力化就要传入泛型类型
        Order3<Boolean> order3 = new Order3<>();
        order3.setO(true);
        Boolean o2 = order3.getO();
        System.out.println(o2);
    }
}

// 在类名后添加一个尖括号，尖括号中添加一个大写的E表示这是一个泛型类型
class Order<E>{
    String name;
    E o;

    public Order() {
        this.name = name;
        this.o = o;
    }

    public E getO() {
        return o;
    }

    public void setO(E o) {
        this.o = o;
    }
}

// 继承泛型类时就已经确定好了这个泛型类型
class Order2 extends Order<Integer>{

}

// 子类也定义成泛型类
class Order3<E> extends Order<E>{

}
```

## 自定义泛型方法

- 如果方法中使用了类中的泛型类型，则不能被定义成静态方法
- 如果方法中没有使用类中的泛型类型，则该类即使不是泛型类也可以定义成泛型方法
- 泛型方法可以是声明成静态的
- 定义泛型方法时要在 `public` 之后定义一个 <T> 表示这是一个泛型方法，如果不定义则认为这个 `T` 是一个自定义类

```java
package com.songzx.generic;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

public class Exer4 {
    @Test
    public void test1(){
        Utils utils = new Utils();
        Integer[] intarr = new Integer[]{15,65,32};
        // 该泛型方法会根据传入的数据类型自动返回该数据类型的集合
        List<Integer> integers = utils.copyArrToList(intarr);
        System.out.println(integers);
    }
}

class Utils{
    public Utils() {
    }
    // 定义一个泛型方法
    public <T> List<T> copyArrToList(T[] arr){
        ArrayList<T> ts = new ArrayList<>();
        for (T t : arr) {
            ts.add(t);
        }
        return ts;
    }
}
```

## 泛型类的使用场景

定义一个 `DAO` 类，将操作数据库的方法全部封装起来，这个类是泛型类，具体操作那个数据库由各个类去继承时确定

首先定义 `DAO`

```java
package com.songzx.dao;

import java.util.List;

/**
 * DAO 表示专门用于操作数据的增删改查方法
 *
 * @author Songzx
 * @date 2022/1/6
 */

public class DAO<E> {
    // 增加一条方法
    public void addData(E e) {
    }

    // 删除一条方法
    public Boolean removeData(int index, E e) {
        return null;
    }

    // 修改一条方法
    public Boolean UpdateData(int index, E e) {
        return null;
    }

    // 查询一条数据
    public E getIndex(int index) {
        return null;
    }

    // 查询多条数据
    public List<E> getAllData(int index) {
        return null;
    }
}
```

然后定义 `Customer` 类

```java
package com.songzx.dao;

public class Customer{

}
```

接着定义 `CustomerDAO` 类，这个类要去继承 DAO 类

```java
package com.songzx.dao;

// 继承DAO类，确定泛型为Customer
public class CustomerDAO extends DAO<Customer> {
}
```

然后编写 `DAOTEST` 测试类

```java
package com.songzx.dao;

import java.util.List;

public class DAOTEST {
    public static void main(String[] args) {
        // 实例化一个Customer类的对象
        Customer customer = new Customer();
        // 实例化一个DAO对象
        CustomerDAO customerDAO = new CustomerDAO();

        //新增数据时只能添加customer对象数据
        customerDAO.addData(customer);
        // 删除customer对象数据
        Boolean aBoolean = customerDAO.removeData(0, customer);
        // 更新customer对象数据
        Boolean aBoolean1 = customerDAO.UpdateData(0, customer);
        // 查询customer数据
        Customer cus = customerDAO.getIndex(0);
        // 查询多个customer数据
        List<Customer> allData = customerDAO.getAllData(0);
    }
}
```

## 泛型继承和相互赋值

```java
package com.songzx.generic;

import org.junit.Test;

import java.util.ArrayList;

/**
 * 泛型在继承时的体现
 * @author Songzx
 * @date 2022/1/7
 */

public class Exer5 {
    @Test
    public void test1(){
        ArrayList<Integer> list1 = new ArrayList<>();
        ArrayList<String> list2 = new ArrayList<>();
        // 泛型类型不同，不能相互赋值
        //list1 = list2; 编译错误

        ArrayList<Integer> integers = new ArrayList<>();
        ArrayList<Integer> integers1 = new ArrayList<>();
        // 泛型类型相同可以相互赋值
        integers = integers1;
        integers.add(123);
        System.out.println(integers1); //=> [123]
    }
}
```

## 通配符的使用

通配符使用英文的问号 `?` 表示。不确定泛型类型是可以使用

```java
package com.songzx.generic;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

/**
 * 通配符使用
 * @author Songzx
 * @date 2022/1/7
 */

public class Exer6 {
    @Test
    public void test1(){
        ArrayList<String> strings = new ArrayList<>();
        ArrayList<Integer> integers = new ArrayList<>();
        strings.add("tome");
        strings.add("jack");

        integers.add(123);
        integers.add(456);

        each(strings);
        each(integers);
    }
    // 使用通配符来遍历不同类型的集合数据
    public void each(List<?> list){
        for (Object o : list) {
            System.out.println(o);
        }
    }
}
```

## 使用通配符后数据的写入和读取操作

- 使用通配符赋值后，只能添加 `null` 值
- 使用通配符赋值后，读取的数据类型为 `Object`

```java
package com.songzx.generic;

import org.junit.Test;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;

public class Exer7 {
    @Test
    public void test(){
        ArrayList<String> strings = new ArrayList<>();
        strings.add("AA");
        strings.add("BB");
        ArrayList<Integer> integers = new ArrayList<>();
        List<?> list = null;

        list = strings;
        // 使用通配符赋值后，只能添加null值
        list.add(null);
        // 使用通配符赋值后，读取的数据类型为Object
        Object o = list.get(0);
        System.out.println(o); //=> AA
    }
}
```

## 有限制条件的通配符使用

- `<? extends Supper>` 该泛型类型只能是 `Supper` 或者 `Supper` 的子类。相当于 `? <= Supper`
- `<? super Supper>` 该泛型类型只能是 `Supper` 或者 `Supper` 的父类。相当于 `? >= Supper`

```java
package com.songzx.generic; 

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

/**
 * 有限制条件的通配符
 * @author Songzx
 * @date 2022/1/7
 */
public class Exer8 {
    @Test
    public void test(){
        // ? extends Supper 泛型类型约束必须为 Supper 或者 Supper 的子类。可以理解为 ? <= Supper
        List<? extends Supper> list1 = new ArrayList<>();
        // ? super Supper 泛型类型约束必须为 Supper 或者 Supper 的父类。可以理解为 ? >= Supper
        List<? super Supper> list2 = new ArrayList<>();

        // Dog 类的集合
        List<Dog> dogs = new ArrayList<>();
        dogs.add(new Dog());
        // Supper 类的集合
        List<Supper> suppers = new ArrayList<>();
        suppers.add(new Supper());
        // Object 类的集合
        List<Object> objects = new ArrayList<>();
        objects.add("object");

        list1 = dogs;
        list1 = suppers;
        // list1 = objects; objects集合不是Supper的子类，所以不能赋值，编译报错

        // list2 = dogs; dogs类不是supper的父类。编译报错
        list2 = suppers;
        list2 = objects;


        // 在读取时默认返回的数据类型都是限制范围内最大的数据类型
        Supper supper = list1.get(0);
        System.out.println(supper);

        Object object = list2.get(0);
        System.out.println(object);
    }
}

class Supper{}
class Dog extends Supper{}
```

## 泛型练习题1

题目要求：

- 首先定义 `DAO` 类，在其内部声明内部变量  `Map<String,T> map = new HashMap<>();`
- 然后定义增删改查方法
  - `save(String id,T entity)`
  - `update(String id,T entity)`
  - `T get(String id)`
  - `List<T> list()`
  - `delete(String id)`
- 定义一个 `User` 类
  - private 成员变量 `（int）id、age；（String）name`
- 定义一个测试类，分别调用 `DAO` 类中的方法

定义 `DAO` 类

```java
package com.songzx.Exer;

import java.util.*;

public class DAO <T>{
    Map<String,T> map = new HashMap<>();

    // 保存t类型的对象到map中
    public void save(String id,T entity){
        map.put(id,entity);
    }

    // 获取id对应的对象
    public T get(String id){
        return map.get(id);
    }

    // 更新map中的数据
    public void update(String id,T entity){
        map.put(id,entity);
    }

    // 返回map中存放的所有list
    public List<T> list(){
        // 声明一个空的集合
        ArrayList<T> ts = new ArrayList<>();
        // 获取map中所有value构成的集合
        Collection<T> values = map.values();
        // 然后遍历添加到空的集合中
        for (T value : values) {
            ts.add(value);
        }
        // 返回
        return ts;
    }

    // 删除map中指定的key
    public void delete(String id){
        map.remove(id);
    }
}
```

定义 `User` 类

```java
package com.songzx.Exer;

import java.util.Objects;

public class User {
    private int id;
    private int age;
    String name;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User(int id, int age, String name) {
        this.id = id;
        this.age = age;
        this.name = name;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", age=" + age +
                ", name='" + name + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id == user.id && age == user.age && Objects.equals(name, user.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, age, name);
    }
}
```

实现测试类

```java
package com.songzx.Exer;

import java.util.List;

public class UserDao {
    public static void main(String[] args) {
        // 声明泛型类型为 User 类，下面的方法只会操作 User 类
        DAO<User> userDAO = new DAO<>();

        User jack = new User(1, 25, "Jack");
        User Tome = new User(2, 18, "Tome");
        User Moma = new User(3, 26, "Moma");

        // 添加方法
        userDAO.save("a001",jack);
        userDAO.save("a002",Tome);
        userDAO.save("a003",Moma);

        // 读取方法
        User a002 = userDAO.get("a002");
        System.out.println(a002);

        // 修改方法
        userDAO.update("a002",new User(2,19,"Koam"));
        User a0021 = userDAO.get("a002");
        System.out.println(a0021);

        // 获取map集合list
        List<User> list = userDAO.list();
        System.out.println(list);

        // 删除再遍历
        userDAO.delete("a002");
        List<User> list2 = userDAO.list();
        System.out.println(list2);

    }
}
```

## 创建 File 类的实例

File 类的一个对象，代表一个文件或者方法。

三种构造方法：

- 构造方法1。 `new File(String pathname)`
- 构造方法2。 `new File(String parent,String child)`
- 构造方法3。 `new File(File file,String child)`

```java
package com.songzx.File;

import java.io.File;

public class Exer1 {
    public static void main(String[] args) {
        // 构造方法1。 new File(String pathname)
        File file = new File("hello.txt");
        // 构造方法2。 new File(String parent,String child)
        File file1 = new File("D:\\students\\javascript", "Promise.js");
        // 构造方法3。 new File(File file,String child)
        File file2 = new File(file1, "Ajax.js");

        System.out.println(file); //=> hello.txt
        System.out.println(file1); //=> D:\javascript\Promise.js
        System.out.println(file2); //=> D:\javascript\Promise.js\Ajax.js
    }
}
```

## File 类常用方法1

- `String absolutePath = file.getAbsolutePath();` 获取绝对路径
- `String path = file.getPath();` 获取相对路径
- `String name = file.getName();` 获取文件名称
- `String parent = file.getParent(); `返回上层文件目录路径，若无返回null
- `long length = file.length();` 获取文件的长度（即字节数），不能获取目录的长度
- `long l = file.lastModified(); `获取最后一次修改时间
- `String[] list = d.list();` 获取指定目录下的所有文件或者文件夹的**名称数组**
- `File[] files = d.listFiles();` 获取指定目录下的所有文件或者文件夹的**File数组**
- `boolean b = file.renameTo(file1);` 将一个文件重命名并移动到一个新的目录中

```java
package com.songzx.File;

import org.junit.Test;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Exer2 {
    @Test
    public void test1(){
        File file = new File("hello.txt");

        // 获取绝对路径
        String absolutePath = file.getAbsolutePath();
        System.out.println(absolutePath);

        // 获取相对路径
        String path = file.getPath();
        System.out.println(path);

        // 获取文件名称
        String name = file.getName();
        System.out.println(name);

        // 返回上层文件目录路径，若无返回null
        String parent = file.getParent();
        System.out.println(parent);

        // 获取文件的长度（即字节数），不能获取目录的长度
        long length = file.length();
        System.out.println(length);

        // 获取最后一次修改时间
        long l = file.lastModified();
        Date date = new Date(l);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-DD HH:mm:ss");
        System.out.println(simpleDateFormat.format(date));
    }

    @Test
    public void test2(){
        File d = new File("D:\\mygitee\\学习Java\\java");

        // 获取指定目录下的所有文件或者文件夹的名称数组
        String[] list = d.list();
        for (String s : list) {
            System.out.println(s);
        }

        // 获取指定目录下的所有文件或者文件夹的File数组
        File[] files = d.listFiles();
        for (File file : files) {
            System.out.println(file);
        }
    }

    @Test
    public void test3(){
        // 将一个文件重命名并移动到一个新的目录中
        File file = new File("D:\\mygitee\\学习Java\\java\\14泛型和File\\copyhello.txt");
        File file1 = new File("D:\\mygitee\\学习Java\\java\\14泛型和File\\src\\hello.txt");
        // 注意点：file 指定的文件地址必须是真实存在的地址
        // file1 所指的文件不能在硬盘中存在
        boolean b = file.renameTo(file1);
        System.out.println(b);
    }
}
```

## File 类常用方法2

- `boolean directory = file.isDirectory();` 判断是否是文件目录
- `boolean isfile = file.isFile();` 判断是否是文件
- `boolean exists = file.exists();` 判断是否存在
- `boolean isread = file.canRead();` 判断是否可读取
- `boolean b = file.canWrite(); `判断是否可写
- `boolean hidden = file.isHidden();` 判断是否隐藏

```java
package com.songzx.File;

import org.junit.Test;

import java.io.File;

public class Exer3 {
    @Test
    public void test1(){
        File file = new File("hello.txt");

        // 判断是否是文件目录
        boolean directory = file.isDirectory();
        System.out.println(directory);

        // 判断是否是文件
        boolean isfile = file.isFile();
        System.out.println(isfile);

        // 判断是否存在
        boolean exists = file.exists();
        System.out.println(exists);

        // 判断是否可读取
        boolean isread = file.canRead();
        System.out.println(isread);

        // 判断是否可写
        boolean b = file.canWrite();
        System.out.println(b);

        // 判断是否隐藏
        boolean hidden = file.isHidden();
        System.out.println(hidden);
    }
}
```

## 文件的创建和删除

- `boolean newFile = file.createNewFile();` 创建文件，如果文件没有声明盘符或者路径，则默认在当前项目路径下新建文件
- `boolean delete = file.delete();` 删除文件
- `boolean mkdir = file.mkdir();` 创建文件夹，如果上一层目录不存在，则创建失败
- `boolean mkdirs = file1.mkdirs();` 创建文件夹，如果上一级目录不存在，也会创建成功，自动创建上一层目录

```java
package com.songzx.File;

import org.junit.Test;

import java.io.File;
import java.io.IOException;

public class Exer4 {
    @Test
    public void test(){
        // 创建一个文件类
        File file = new File("newhello.txt");
        // 判断这个文件是否存在，如果存在就删除这个文件
        if(file.exists()){
            boolean delete = file.delete();
            if(delete){
                System.out.println("删除成功");
            }else{
                System.out.println("删除失败");
            }
        }else{
            try {
                boolean newFile = file.createNewFile();
                if(newFile){
                    System.out.println("创建成功");
                }else{
                    System.out.println("删除失败");
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Test
    public void test2(){
        File file = new File("D:\\mygitee\\学习Java\\java\\IO");
		// 创建文件夹，如果上一层目录不存在，则创建失败
        boolean mkdir = file.mkdir();
        // 获取已经存在，也创建失败
        System.out.println(mkdir);

        File file1 = new File("D:\\mygitee\\学习Java\\java\\IO2\\Test");
        // 创建文件夹，如果上一级目录不存在，也会创建成功，自动创建上一层目录
        boolean mkdirs = file1.mkdirs();
        System.out.println(mkdirs);
    }
}
```

## 递归删除文件夹下的文件和当前文件夹

```java
package com.songzx.File;

import java.io.File;

/**
 * 递归删除指定文件夹下的文件和文件夹
 * @author Songzx
 * @date 2022/1/7
 */

public class Exer6 {
    public static void main(String[] args) {
        // 输入要删除的文件夹地址
        File file = new File("D:\\mygitee\\学习Java\\java\\IO");
        Exer6.deleteFile(file);
    }
    static void deleteFile(File file){
        // 进来后直接判断文件是否是目录，如果是则递归去里面删除里面的文件
        if(file.isDirectory()){
            File[] files = file.listFiles();
            for (File file1 : files) {
                deleteFile(file1);
            }
        }
        // 删除子文件后再吧自己删除
        file.delete();
    }
}
```

## 练习题：

- 遍历Map的key集和value集合key-value集合，要求使用泛型

```java
package com.songzx.Topic;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class Exer1 {
    /**
     * 遍历Map集合的key，value，key-value
     * @author Songzx
     * @date 2022/1/7
     */

    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();
        map.put("tome",56);
        map.put("tac",56);
        map.put("jack",23);

        // 遍历key
        Set<String> keys = map.keySet();
        for (String key : keys) {
            System.out.println(key);
        }

        // 遍历value
        Collection<Integer> values = map.values();
        for (Integer value : values) {
            System.out.println(value);
        }

        // 遍历key-value
        Set<Map.Entry<String, Integer>> entries = map.entrySet();
        for (Map.Entry<String, Integer> entry : entries) {
            String key = entry.getKey();
            Integer value = entry.getValue();
            System.out.println(key + "-->" + value);
        }
    }
}
```

- 使用 `Iterator` 和增强 `for` 遍历 `List<String>`

```java
package com.songzx.Topic;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * 使用 Iterator 和增强 for 遍历 List<String>
 * @author Songzx
 * @date 2022/1/7
 */

public class Exer2 {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        list.add("aa");
        list.add("bb");
        list.add("cc");

        // 遍历方法一
        Iterator<String> iterator = list.iterator();
        while (iterator.hasNext()){
            String next = iterator.next();
            System.out.println(next);
        }

        // 遍历方法二
        for (String s : list) {
            System.out.println(s);
        }
    }
}
```

- 创建一个返回 `Map` 中所有 `value `组成的 `list`

```java
package com.songzx.Topic;

import java.util.*;

public class Exer3 {
    public static void main(String[] args) {
        HashMap<String, String> map = new HashMap<>();
        map.put("age","13");
        map.put("name","23");
        List mapAllValus = Exer3.getMapAllValus(map);
        System.out.println(mapAllValus);
    }
    static List<String> getMapAllValus(HashMap<String,String> map){
        Collection<String> values = map.values();
        ArrayList<String> strlist = new ArrayList<>();
        for (String value : values) {
            strlist.add(value);
        }
        return strlist;
    }
}
```

- 创建一个 `b.txt` 文件

```java
package com.songzx.Topic;

import java.io.File;
import java.io.IOException;

/**
 * @author songzhengxiang
 * @create 2022-01-08 15:14
 */
public class Exer4 {
    public static void main(String[] args) throws IOException {
        File file = new File("b.txt");
        file.createNewFile();
    }
}
```