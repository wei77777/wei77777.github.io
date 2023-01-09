---
title: Spring
tags: Spring
categories: Spring
abbrlink: 6c92115f
date: 2023-01-07 14:39:00
---
# Spring 框架的 AOP

Aop:使用场景:日志，事务，权限等等

##### AOP：面向切面编程，器=期作用是对方法进行增强

Spring 在运行期会为目标对象生成一个动态代理对象，并在代理对象中实现对目标对象的增强。

Spring AOP 的底层是通过以下 2 种动态代理机制，为目标对象（Target Bean）执行横向织入的。

| 代理技术       | 描述                                                         |
| -------------- | ------------------------------------------------------------ |
| JDK 动态代理   | Spring AOP 默认的动态代理方式，若目标对象实现了若干接口，Spring 使用 JDK 的 java.lang.reflect.Proxy 类进行代理。 |
| CGLIB 动态代理 | 若目标对象没有实现任何接口，Spring 则使用 CGLIB 库生成目标对象的子类，以实现对目标对象的代理。 |

支持两种，分别是jdk和cglib动态代码

区别：jdk动态代理是基于接口代理，代理对象和目标对象实现了相同的接口。cglib动态代理是基于类代理，代理对象是目标对象的子类对象。

AOP默认采用cglib动态代理。

### AOP 基本架构

###### 代理目标对象：

需要增强功能的对象

###### 切面:切面是通知和切点的结合，增强逻辑到封装一个类

切面里面有分 通知 和切点

通知:AOP 框架中的增强处理。通知描述了切面何时执行以及如何执行增强处理。

切点:可以插入增强处理的连接点

###### 织入:

将增强处理添加到目标对象中，并创建一个被增强的对象，这个过程就是织入。

###### 连接点

（join point）: 连接点表示应用执行过程中能够插入切面的一个点，这个点可以是方法的调用、异常的抛出。在 Spring AOP 中，连接点总是方法的调用。

###### 总结

如果进行了AOP配置，那么容器中存放的是代理对象，注入的也是代理对象

##### 切入点表达式

切点表达式用来匹配【哪些】目标方法需要应用通知，常见的切点表达式如下

* `execution(返回值类型 包名.类名.方法名(参数类型))`

  * `*` 可以通配任意返回值类型、包名、类名、方法名、或任意类型的一个参数

  * `..` 可以通配任意层级的包、或任意类型、任意个数的参数

    ##### 自定义注解

* `@annotation()` 根据指定注解匹配要增强的方法

* 【第一步】自定义注解注意加上在自定义注解上面

  ```
  @Target({ElementType. METHOD})
  @Retention(RetentionPolicy.RUNTIME)
  @Documented
  ```

* 【第二步】在要增强的方法上使用注解

* 【第三步】在通知方法注解中使用@annotation注解指定要匹配的注解全类名
  @Around("@annotation(com.itheima.anno.MyAnno)")

##### 抽取公共切入点表达式

<img src="C:\Users\86182\AppData\Roaming\Typora\typora-user-images\image-20221008195419777.png" alt="image-20221008195419777" style="zoom:200%;" />

#### 通知类型

@Around：环绕通知，一种手动调用目标对象方法的通知方法

@Before：前置通知，在目标方法执行之前执行

例如:

@Aspect
@Component
public class Aspect31 {
    private static final Logger log = LoggerFactory.getLogger(Aspect31.class);

    @Before("execution(* com.itheima.demo1.service.Service3.*(..))")
    public void before() {
        log.info("before...");
    }
}

@AfterReturning：后置通知，在目标方法执行之后且没有异常时执行

@AfterThrowing ：异常通知，在目标方法执行之后且出现异常时执行

@After：最终通知，在目标方法执行之后无论是否出现异常都执行



### 连接点

简单理解就是 `目标方法`，在Spring 中用 JoinPoint 抽象了连接点，用它可以获得方法执行时的相关信息，如方法名、方法参数类型、方法实际参数等等

* 对于 @Around 通知，获取连接点信息只能使用 ProceedingJoinPoint
* 对于其他四种通知，获取连接点信息只能使用 JoinPoint，它是 ProceedingJoinPoint 的父类型

@Before("execution(* com.itheima.service.impl.PersonServiceImpl.*(..))")
    public void before(JoinPoint jp){...}

连接点获取方法 可以获取method 反射出类对象的各个属性

private void printMethodInfo(JoinPoint pjp) {
	MethodSignature signature = (MethodSignature) pjp.getSignature();
    Method method = signature.getMethod();
    log.info("连接点方法:{}", method);
    log.info("参数类型:{}", Arrays.toString(signature.getParameterTypes()));
    log.info("参数名:{}",
             Arrays.stream(method.getParameters())
             .map(Parameter::getName)
             .collect(Collectors.toList())
            );
    log.info("参数值:{}", Arrays.toString(pjp.getArgs()));
}

###### 通知顺序

当有多个切面的切点都匹配目标时，多个通知方法都会被执行。之前介绍的 pjp.proceed() 在有多个通知方法匹配时，更准确的描述应该是这样的：

* 如果还有下一个通知，则调用下一个通知
* 如果没有下一个通知，则调用目标

那么它们的执行顺序是怎样的呢？

* 默认按照 bean 的名称字母排序
* 用 `@Order(数字)` 加在切面类上来控制顺序
  * 目标前的通知方法：数字小先执行
  * 目标后的通知方法：数字小后执行

下面是三个切面类，都使用了环绕通知
切面类1

#####  代理方式

Spring 支持两种代理方式

* jdk 动态代理
  * 仅支持接口方式的代理
* cglib 代理
  * 支持接口方式的代理，以及子类方式的代理
  * cglib动态代理（默认）

使用哪一种？

* springboot 默认配置 `spring.aop.proxy-target-class=true`
  * 此时无论目标是否实现接口，都是采用【cglib 技术】，生成的都是子类代理
* 如果设置了 `spring.aop.proxy-target-class=false`，那么又分两种情况
  * 如果【目标】实现了接口，Spring 会【jdk 动态代理技术】生成代理
  * 如果【目标】没有实现接口，Spring 会采用【cglib 技术】生成代理

## 2. yaml

### 2.1 Yaml基本语法

读音 [ˈjæməl]

Spring 除了支持 properties 的配置文件格式以外，还支持 yaml 格式的配置文件，文件名不变仍然固定为 application，后缀变成 yaml 或 yml

yaml 应用还是非常广泛的：

* 第一种用途就像 properties，xml 可以作为程序的配置文件
* 第二种用途跟 json 更像，可以作为数据的序列化方式

下面就来学习 yaml 的语法格式

#### 2.1.1 yaml语法

1. 大小写敏感
2. 冒号之后如果有值，那么冒号与值之间必须加空格（好在 idea 能语法高亮提示）
3. 以空格的缩进表示层次关系，左对齐的数据属于同一层级的
4. 不能以 tab 的缩进表示层次关系（好在 idea 能将 tab 自动转空格）
5. 注释与 properties 一样，使用 #
6. 一些特殊字符如 `&`，`*` 等有特殊含义，要用单引号或双引号引起来 
7. 可以使用EL表达式${}引用文件中的属性

#### 2.1.2 普通键值

```yml
name: zhangsan
age: 18
```

#### 2.1.3 对象

```yml
user:
  name: zhangsan
  age: 18
```

等价方式

```yml
user: { name: zhangsan, age: 18 }
```

#### 2.1.4 数组

```yml
user:
  name: zhangsan
  age: 18
  address:
    - 西安未央区
    - 西安雁塔区
    - 西安碑林区
```

等价方式

```yml
user:
  name: zhangsan
  age: 18
  address: [ 西安未央区,西安雁塔区,西安碑林区 ]
```

#### 2.1.5 properties与yaml的对应关系

properties 中的 `.` 视为 yaml 中的对象的层级关系即可，例如：

```properties
spring.aop.proxy-target-class=false
```

对应下面的 yaml 文档

```yml
spring:
  aop:
    proxy-target-class: false
```

它们都支持文档内的变量引用，例如有如下配置

```properties
server.port=8080
app.host=localhost
app.url=http://${app.host}:${server.port}
```

或

## 今日注解

本章注解总结

| 注解名称        | 位置     | 注解作用         | 备注                                       |
| --------------- | -------- | ---------------- | ------------------------------------------ |
| @Lazy           | 方法参数 | 解决构造循环依赖 |                                            |
| @Aspect         | 类上     | 标识切面类       | 该类必须同时也是 bean                      |
| @Around         | 方法上   | 环绕通知         | 必须提供  ProceedingJoinPoint 参数         |
| @Before         | 方法上   | 前置通知         |                                            |
| @After          | 方法上   | 标识后置通知     |                                            |
| @AfterReturning | 方法上   | 返回后通知       | 出现异常不会进入通知                       |
| @AfterThrowing  | 方法上   | 异常后通知       |                                            |
| @Pointcut       | 方法上   | 标识切点         | 标识的方法无参，无返回值，无实现           |
| @Order          | 类上     | 标识顺序         | 数字小的优先级高，不同切面类优先级才有意义 |

