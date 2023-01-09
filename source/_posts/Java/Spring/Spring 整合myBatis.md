---
title: Spring
tags: Spring
categories: Spring
abbrlink: 6c92115f
date: 2023-01-07 14:39:00
---
# Spring 整合myBatis

##### 实现步骤

【第一步】在pom.xml中导入SpringBoot整合mybatis的依赖和mysql驱动添加依赖：mybatis-spring-boot-starter

【第二步】添加配置：在application.yml中配置数据源连接参数(也即是数据库连接等)

【第三步】定义Mapper接口和方法，在Mapper接口上使用**@Mapper**注解表示该类mybatis的mapper接口；扫描接口：定义Mapper接口+@MapperScan扫描Mapper接口

如果在SpringBoot的引导类上使用@MapperScan注解指定了mapper接口的包，那么在mapper接口上就可以不使用@Mapper注解【推荐】

@SpringBootApplication
**@MapperScan("com.itheima.mapper")、**//扫描mybatis的mapper接口
public class Spring03MybatisApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserDemoSpringbootApplication.class, args);
    }
}

## 1.4 Mybatis相关配置

> **一下文件都是在yaml文件中去配置**

#mybatis相关配置
#开启mybatis**驼峰命名自动隐式**
mybatis.configuration.map-underscore-to-camel-case=true

***当mapper映射文件和mapper文件不对应时，以及其他***

#加载resources/com/itheima/mapper目录下所有Mapper结尾的xml文件
mybatis.mapper-locations=com/itheima/mapper/*Mapper.xml
#加载resources目录中mybatis核心配置文件【扩展】
mybatis.config-location=mybatis-config.xml
#给com.itheima.pojo包中的所有javabean取别名【扩展】
mybatis.type-aliases-package=com.itheima.pojo

##### 日志级别配置

ALL 　   最低等级，用于打开所有日志记录。

TRACE 　很低的日志级别，一般不会使用。

**DEBUG**　　主要用于开发与测试过程中打印一些运行信息，不可以用于生产环境。

**INFO** 　  记录一些信息型消息比如服务器启动成功，输入的数据，输出的数据等等。

**WARN** 　 记录警告信息比如客户端和服务器之间的连接中断，数据库连接丢失等信息。

**ERROR**  用于记录ERROR和Exception信息。

FATAL　　 指可能导致程序终止的非常严重的信息。在这种事件之后你的应用很可能会崩溃。

OFF 　  最高等级，用于关闭所有日志记录。

① 设置整个项目日志级别

```properties
logging.level.root=info
```

==说明：logging.level表示设置日志级别，后面跟生效的区域，比如root表示整个项目，也可以设置为某个包下，也可以具体到某个类名，设置是方法名（日志级别的值不区分大小写）==

② 查看运行过程中mapper包下的SQL信息

```properties
logging.level.com.itheima.mapper=debug
```

③ 如果只想看某个类或某个方法的SQL，就需要提供更为具体的类名或方法名

```properties
logging.level.com.itheima.mapper.UserMapper.selectAll=debug
```

##### 数据源的配置

Spring Boot 使用的连接池是 hikari，可以在 application.yml 中敲入 hikari 提示相关配置，例如配置一下信息：

- 最大连接数

- 最小连接数

#hikari连接池配置信息
#最大连接数
spring.datasource.hikari.maximum-pool-size=10
#最小连接数
spring.datasource.hikari.minimum-idle=3

#### 整合事务