---
title: 05Java数组
tags: Java
categories: Java基础
abbrlink: 367f22f7
date: 2022-02-12 21:10:26
---

## 数组的概念

### 概述

数组（Array）是多个相同类型的数据按照一定的顺序排列的集合，并使用一个名字命名，并通过编号的方式对这些数据进行统一管理。

### 概念

- 数组名
- 元素
- 下标、角标、索引
- 数组的长度，数组元素的个数

### 特点

- 数组是有序排列的
- 数组属于引用数据类型，而数组的元素既可以是引用数据类型，也可以是基本数据类型
- 创建数组对象会在内存中开辟出一块连续的空间
- 数组的长度一旦确定不能再修改
- 数组有一维数组、二维数组、三维数组、.........

## 一维数组的声明和初始化

### 静态声明

```java
int[] ids; // 声明一个ids数组
ids = new int[]{1001,1002,1003}; // 初始化这个数组的内容
System.out.println(ids.length); //=> 3 ids的数组长度为3
```

### 动态声明

```java
String[] names = new String[5];
names[0] = "张三";
names[1] = "李四";
names[2] = "王五";
names[3] = "赵柳";
names[4] = "王琦";
System.out.println(names.length); //=> 5 names 数组的长度为5
System.out.println(names[2]); //=> 王五
// 遍历一个数组
for(int i=0; i<names.length; i++){
    System.out.println(names[i]);
}
```

## 遍历数组结构

```java
// 动态声明和初始化
String[] names = new String[5];
names[0] = "张三";
names[1] = "李四";
names[2] = "王五";
names[3] = "赵柳";
names[4] = "王琦";
System.out.println(names.length); //=> 5 names 数组的长度为5
System.out.println(names[2]); //=> 王五
// 遍历一个数组
for(int i=0; i<names.length; i++){
    System.out.println(names[i]);
}
```

## 不同类型数组的默认值

| 数组类型 | 默认值               |
| -------- | -------------------- |
| int      | 0                    |
| double   | 0.0                  |
| boolean  | false                |
| String   | null                 |
| char     | (char类型是一个空值) |

```java
// 整数类型的数组默认值
int[] intarr = new int[2];
System.out.println(intarr[0]); //=> 0

// 浮点类型的数组默认值
double[] douarr = new double[2];
System.out.println(douarr[0]); //=> 0.0

// 布尔类型的数组默认值
boolean[] boolarr = new boolean[2];
System.out.println(boolarr[0]); //=> false

// 字符串类型数组默认值
String[] strarr = new String[2];
System.out.println(strarr[0]); //=> null
```

## 二维数组的声明方式

二维数组表示数组的元素也是一个一维数组

### 静态声明

```java
// 静态声明二维数组
int[][] ids = new int[][] { { 1, 2, 3 }, { 4, 5 }, { 6, 7, 8 } };
```

### 动态声明

```java
// 动态声明二维数组
String[][] names = new String[3][2];
```

### 类型推断

```java
// 静态声明也可以这样写
int[][] arr = { { 1, 2, 3 }, { 4, 5 } };
```

## 二维数组的遍历

```java
// 二维数组的遍历
for (int i = 0; i < arr.length; i++) {
    for (int j = 0; j < arr[i].length; j++) {
        System.out.println(arr[i][j]);
    }
}
```

## 二维数组的默认值

规定：二维数组分为外层数组元素和内层数组元素

外层元素表示为：`arr[0]，arr[1]`

内层元素表示为：`arr[0][1]，arr[0][2]`

当内层元素有长度时，则外层元素的默认值都是一个应用地址，否则是一个 null

```java
public static void main(String[] args) {
    // 整数类型的二维数组默认值
    int[][] arr = new int[2][4];
    // 外层数组的默认值是内层数组的引用地址。一个 [ 表示内层是一维数组，I 表示int类型的数组，@41a4555e 是内存地址
    System.out.println(arr[0]); //=> [I@41a4555e
    // 内层地址默认值为 0
    System.out.println(arr[0][0]); //=> 0

    // 引用类型的二维数组默认值
    String[][] arr1 = new String[3][2];
    System.out.println(arr1[0]); //=> [Ljava.lang.String;@3830f1c0
    System.out.println(arr1[0][0]); //=> null

    // 当不给内层数组设置长度时，由于数组是一个引用类型，引用类型的默认值是null
    // 所以，当不给内层数组设置长度时，内层数组的默认值是 null
    int[][] arr2 = new int[3][];
    System.out.println(arr2[0]); //=> null
    // 不能读取没有声明长度的数组
    // System.out.println(arr2[0][0]); //=> 系统出错 "arr2[0]" is null

}
```

## 二维数组练习

### 计算二维数组元素和

```java
/*
 * 求一个二维数组的和
* */
int[][] arr = new int[][] {{3,5,8},{12,9},{7,0,6,4}};
int count = 0;
for(int i = 0; i < arr.length; i++) {
    for(int j = 0; j < arr[i].length; j++) {
        count += arr[i][j];
    }
}
System.out.println(count);
```

### 打印出一个杨辉三角

```java
public static void main(String[] args) {
    /**
	 * 用一个二维数组实现一个杨辉三角
	 * 杨辉三角如下：
	 * 1
	 * 1 1
	 * 1 2 1 
	 * 1 3 3 1
	 * 1 4 6 4 1
	 * */

    // 1.声明并初始化一个二维数组
    // 1.1 首先确定一个10行的杨辉三角
    int[][] YangHui = new int[10][];
    // 2.给数组元素赋值
    for(int i = 0; i<YangHui.length; i++) {
        // 2.1 通过循环动态给每列赋值长度，每行中的列数等于当前的行数
        YangHui[i] = new int[i+1];
        // 2.2 让每一行的首位元素都等于1
        YangHui[i][0] = YangHui[i][YangHui[i].length - 1] = 1;
        // 2.3 从第二个元素开始循环，到倒数第二个元素截止
        for(int j = 1; j < YangHui[i].length - 1; j++) {
            // 2.4 列中的元素等于上一行的这个下标的左侧加上上一行的这个下标
            YangHui[i][j] = YangHui[i-1][j-1] + YangHui[i-1][j];
        }
    }
    // 3.循环二维数组展示一个杨辉三角
    for(int i = 0; i < YangHui.length; i++) {
        for(int j = 0; j < YangHui[i].length; j++) {
            System.out.print(YangHui[i][j] + "  ");
        }
        System.out.println();
    }
}
```

### 随机生成不等值的数组

```java
/*
 * 创建一个长度为6的整形数组
 * 要求数组的元素值都在 0~30之间，且是随机生成的
 * 同时要求数组内的元素值不能相同
 */
public class ArrayDemo04 {
	public static void main(String[] args) {
		// 1. 首先创建一个长度为6的数组
		int[] nums = new int[6];	
		
		// 2. 遍历这个数组给每个数组赋一个随机数
		for(int i = 0; i < nums.length; i++) {
			nums[i] = (int)(Math.random() * 30) + 1;
			// 3. 循环当前已经有值的数据，判断前面是否有和新赋的值相等的
			for(int j = 0; j < i; j++) {
				// 4. 如果有相等的则将徐循环的进度往前减减，从新赋值，并退出内层循环
				if(nums[i] == nums[j]) {
					i--;
					break;
				}
			}
		}
		// 5. 遍历输出数组元素
		for(int i = 0; i < nums.length; i++) {
			System.out.println(nums[i]);
		}		
	}
}
```

## 数组拓展练习题

### 数组复制

```java
// 声明一个原始数组
String[] arr = new String[] {"aa","bb","cc","dd","ee"};

// 数组的复制
String[] arr1 = new String[arr.length];
for(int i = 0; i < arr1.length; i++) {
    arr1[i] = arr[i];
    if(arr1[i] == "aa") {
        arr1[i] = "AA";
    }	
    System.out.println(arr1[i]);
}
```

### 数组反转

```java
// 声明一个原始数组
String[] arr = new String[] {"aa","bb","cc","dd","ee"};
		
// 数组的反转
// 方式一
//		for(int i = 0; i < arr.length / 2; i++) {
//			String temp = arr[i];
//			arr[i] = arr[arr.length - i - 1];
//			arr[arr.length - i - 1] = temp;
//		}

// 方式二
for(int i = 0,j = arr.length - 1; i < j; i++,j--) {
    String temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}	
// 遍历输出结果
for(int i = 0; i < arr.length; i++) {
    System.out.print(arr[i] + " "); //=> ee dd cc bb aa 
}
```

### 数组查找之 - 线性查找

```java
/*
* 数组查找
*/
String[] names = new String[] { "aa", "bb", "cc", "dd" };
// 线性查找
String tmp = "cc";
boolean isFlag = false;
for (int i = 0; i < names.length; i++) {
    if (names[i].equals(tmp)) {
        isFlag = true;
        System.out.println("要查找的元素下标是：" + i);
    }
}
if (!isFlag) {
    System.out.println("没有找到");
}


```

### 数组查找之 - 二分查找

- 二分查找
- 二分查找的前提是数据必须有有序的，并且是整形数据
- 二分查找每次先定位到中间值，判断中间这个值是否和我要查找的值相等
- 如果查找的值要小于中间值，则从起始点到中间值的前一位继续查找
- 如果查找的值大于中间值，则从中间值的后一位到结尾开始查找
- 知道中间值等于我们要查找的值为止

```java
int[] nums = new int[] { -32, -21, -10, -1, 12, 32, 45, 56, 67, 71, 82 };		
int num = 67; // 定义要查找的元素
int head = 0; // 起始位置
int end = nums.length - 1; // 结束位置		
boolean isflag = false; // 定义是否找到表示
while(true) {
    // 为了防止进入死循环，到只剩下三个时使用for循环进行查找
    if((end - head) + 1 <= 3) {
        for(int i = head; i <= end; i++) {
            if(nums[i] == num) {
                isflag = true;
                System.out.println("元素下标是ss：" + i);
            }
        }
        break;
    }
    // 每次循环获取中间值
    int	middle = (head + end) / 2;
    // 如果中间值刚好等于要查找的值则进行输出并退出循环
    if(nums[middle] == num) {
        isflag = true;
        System.out.println("元素下标是：" + middle);
        break;
    }else if(nums[middle] > num) {
        // 如果中间值大于要查找的元素说明查找范围在左半部分，因此end值变为中间值的前一位
        end = middle - 1;
    }else {
        // 如果中间值小于要查找的元素说明查找范围在有半部分，因此head的值变为中间值的后一位
        head = middle + 1;
    }
}
if(!isflag) {
    System.out.println("没有找到");
}
```

## 排序算法

通常来说：排序的目的是为了快速查找

衡量排序算法的优劣

- 时间复杂度。分析关键字的比较次数和记录的移动次数
- 空间复杂度。分析排序算法中需要多少辅助内存
- 稳定性。若两个记录A和B的关键字相等，单排序后A、B的先后次序保持不变，则称这种排序算法是稳定的

十大内部排序算法

- 选择排序

  - 直接选择排序

   ![简单-选择排序.gif](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/%E7%AE%80%E5%8D%95-%E9%80%89%E6%8B%A9%E6%8E%92%E5%BA%8F.gif)

  - 堆排序

    ![堆排序.gif](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/%E5%A0%86%E6%8E%92%E5%BA%8F.gif)

- 交换排序

  - 冒泡排序

    ![冒泡排序.gif](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/%E5%86%92%E6%B3%A1%E6%8E%92%E5%BA%8F.gif)

  - 快速排序

    ![快速排序.gif](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/%E5%BF%AB%E9%80%9F%E6%8E%92%E5%BA%8F.gif)

- 插入排序

  - 直接插入排序

    ![直接插入排序.gif](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/%E7%9B%B4%E6%8E%A5%E6%8F%92%E5%85%A5%E6%8E%92%E5%BA%8F.gif)

  - 折半插入排序

  - Shell排序，也叫希尔排序

    ![希尔排序.gif](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/%E5%B8%8C%E5%B0%94%E6%8E%92%E5%BA%8F.gif)

- 归并排序

  ![归并排序.gif](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/%E5%BD%92%E5%B9%B6%E6%8E%92%E5%BA%8F.gif)

- 桶式排序

  ![桶排序.png](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/%E6%A1%B6%E6%8E%92%E5%BA%8F.png)

- 基数排序

  ![基数排序.gif](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/%E5%9F%BA%E6%95%B0%E6%8E%92%E5%BA%8F.gif)

## 算法的5大特征

| 特征                            | 描述                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| 输入（input）                   | 有0个获取多个输入数据，这些输入必须有清楚的描述和定义        |
| 输出（Output）                  | 至少有1个或者多个输出结果，不能没有输出结果                  |
| 有穷性（有限性，Finiteness）    | 算法在有限的步骤之后会自动结束而不会无限循环，并且每一步骤可以在可接受的时间内完成 |
| 确定性（明确性，Definiteness）  | 算法中的每一步都有明确的含义，不会出现二义性                 |
| 可行性（有效性，Effectiveness） | 算法的每一步都是清楚且可行的，能让用户用纸笔计算而求出答案   |

说明：满足确定性的算法也称为：确定性算法。

## 冒泡排序

```java
/*
* 冒泡排序的实现
*/
public static void main(String[] args) {
    int[] nums = new int[] {45,68,5,98,10,-42,35,-55,-65,3};
    // 第一次循环确定要进行多少轮交换，交换的次数为长度 -1 
    for(int i = 0; i < nums.length -1; i++) {
        // 每轮循环后循环的长度减一
        for(int j = 0; j <nums.length - 1 - i ; j++) {
            if(nums[j] > nums[j+1]) {
                int temp = nums[j];
                nums[j] = nums[j+1];
                nums[j+1] = temp;
            }
        }
    }

    for(int i = 0; i < nums.length; i++) {
        // -65 -55 -42 3 5 10 35 45 68 98 
        System.out.print(nums[i]+ " ");
    }
}
```

## 数组工具类 Arrays 的使用

使用前要先导入数组工具类

```java
import java.util.Arrays; // 导入数组的工具类

public class Arrays05 {
	public static void main(String[] args) {
        // 初始化两个数组
		int[] arr = new int[] {12,65,45,8,35};
		int[] arr1 = new int[] {8,12,23,36,45,56};		
	}
}
```

### 判断两个数组是否相等`Arrays.equals(arr,arr1)` 

```java
// 1.判断两个数组是否相等
// 结果返回一个不二类型
boolean isEquals = Arrays.equals(arr,arr1);
System.out.println(isEquals); //=> false
```

### 打印数组信息`Arrays.toString(arr)` 

```java
// 2.打印输入的信息
System.out.println(Arrays.toString(arr)); //=> [12, 65, 45, 8, 35]
```

### 将指定元素插入到数组中`Arrays.fill(arr,formIndex,toIndex,value)` 

```java
// 3.将指定元素插入数组中
// 将指定的 int 值分配给指定 int 型数组指定范围中的每个元素。
// 填充的范围从索引 fromIndex（包括）一直到索引 toIndex（不包括）。
//（如果 fromIndex==toIndex，则填充范围为空。） 
// 如果前 fromIndex 和 toIndex 为空，只有 value 时则填充整个数组
Arrays.fill(arr, 2,3,20);
System.out.println(Arrays.toString(arr)); //=> [12, 65, 20, 8, 35]
```

### 对数组进行排序`Arrays.sort(arr)`

```java
// 4.对数组进行排序
Arrays.sort(arr);
System.out.println(Arrays.toString(arr)); //=> [8, 12, 20, 35, 65]
```

### 使用二分查找获取指定元素下标 `Arrays.binarySearch(arr,key)`

```java
// 5.使用二分查找法查找数组中的元素下标
// 在使用二分查找之前必须先对数组进行 sort 排序
// 这里的arr已经经过了上面的sort排序
// 找到时返回元素下标，找不到时返回一个负数
int index = Arrays.binarySearch(arr, 12);		
if(index >= 0) {
    System.out.println(index); //=> 1
}else {
    System.out.println("未找到");
}
```

## 数组中常见的异常

### 下标越界异常

指获取数组不存在的下标值而出现的异常

```java
int[] nums = new int[] { 1, 2, 3, 4, 5, 6 };
// 下面的循环中i小于等于数组的长度，表示会循环到数据的下标6的位置
// 声明的数组的最大小标是5，所以会出现异常
// ArrayIndexOutOfBoundsException
for (int i = 0; i <= nums.length; i++) {
    System.out.println(nums[i]);
}
```

### 空指针异常

```java
// 情况一：
String[] arr = new String[] { "aa", "bb" };
arr[0] = null;
// 我们修改了数组的第一个元素等于null，但是我们又对下标为0的元素进行toString()
// 导致程序出现空指针异常 *
system.out.println(arr[0].toString()); // => NullPointerException

// 情况二：
int[] arr1 = new int[] {1,2,3};
arr1 = null;
System.out.println(arr1[0]); //=> NullPointerException

// 情况三：
int[][] arr2 = new int[2][];
System.out.println(arr2[0][0]); //=> NullPointerException
```

