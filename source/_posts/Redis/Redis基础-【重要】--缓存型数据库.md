---
title: Redis
tags: Redis
categories: Redis
abbrlink: bae4ff13
date: 2023-01-07 14:39:00
---

# Redis基础-【重要】--缓存型数据库
### 1.1 什么是Redis

Redis是一个基于**内存**的key-value结构数据库。Redis 是互联网技术领域使用最为广泛的存储中间件，它是「**Re**mote Dirctionary **S**ervice」的首字母缩写，也就是「远程字典服务」。

**特点：**

-  基于内存存储，读写性能高

![image-20210927090555559](https://gitee.com/wh-153/group0-wang-dachui/raw/master/1.%E6%AF%8F%E6%97%A5%E9%9A%8F%E5%A0%82%E8%AE%B2%E4%B9%89/%E7%91%9E%E5%90%89%E4%BC%98%E5%8C%96-day10-redis/assets/image-20210927090555559.png)

-  适合存储热点数据（热点商品、资讯、新闻）

![image-20210927090604994](https://gitee.com/wh-153/group0-wang-dachui/raw/master/1.%E6%AF%8F%E6%97%A5%E9%9A%8F%E5%A0%82%E8%AE%B2%E4%B9%89/%E7%91%9E%E5%90%89%E4%BC%98%E5%8C%96-day10-redis/assets/image-20210927090604994.png)

-  企业应用广泛

![image-20210927090612540](https://gitee.com/wh-153/group0-wang-dachui/raw/master/1.%E6%AF%8F%E6%97%A5%E9%9A%8F%E5%A0%82%E8%AE%B2%E4%B9%89/%E7%91%9E%E5%90%89%E4%BC%98%E5%8C%96-day10-redis/assets/image-20210927090612540.png)

### 1.2 使用Redis能做什么

- **数据缓存** ---【主要功能】
- 消息队列
- 注册中心
- 发布订阅

## 2. Redis入门

### 2.1 Redis简介

Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache, and message broker. 翻译为：Redis是一个开源的内存中的数据结构存储系统，它可以用作：数据库、缓存和消息中间件。

官网：[https://redis.io](https://gitee.com/link?target=https%3A%2F%2Fredis.io%2F)

Redis是用C语言开发的一个开源的高性能键值对(key-value)数据库，官方提供的数据是可以达到100000+的QPS（每秒内查询次数）。它存储的value类型比较丰富，也被称为结构化的NoSql数据库。

**NoSql**（Not Only SQL），不仅仅是SQL，泛指**非关系型数据库**。NoSql数据库并不是要取代关系型数据库，而是关系型数据库的补充。

> 记住： 最终我们使用redis，是为了减轻数据库压力， 提升用户的体验！

关系型数据库(RDBMS)：

- Mysql
- Oracle
- DB2
- SQLServer
- pgSQL

非关系型数据库(NoSql)：

- Redis
- Mongo db
- MemCached

### 2.2 Redis下载与安装

#### 2.2.1 Redis下载

Redis安装包分为windows版和Linux版：

- Windows版下载地址：[https://github.com/microsoftarchive/redis/releases](https://gitee.com/link?target=https%3A%2F%2Fgithub.com%2Fmicrosoftarchive%2Fredis%2Freleases)
- Linux版下载地址： [https://download.redis.io/releases/](https://gitee.com/link?target=https%3A%2F%2Fdownload.redis.io%2Freleases%2F)

下载后得到下面安装包：

![image-20210927092053283](https://gitee.com/wh-153/group0-wang-dachui/raw/master/1.%E6%AF%8F%E6%97%A5%E9%9A%8F%E5%A0%82%E8%AE%B2%E4%B9%89/%E7%91%9E%E5%90%89%E4%BC%98%E5%8C%96-day10-redis/assets/image-20210927092053283.png)

#### 2.2.2 Redis安装

##### **1）在Windows中安装Redis**

Redis的Windows版属于绿色软件，直接解压即可使用，解压后目录结构如下：

![image-20210927093112281](https://gitee.com/wh-153/group0-wang-dachui/raw/master/1.%E6%AF%8F%E6%97%A5%E9%9A%8F%E5%A0%82%E8%AE%B2%E4%B9%89/%E7%91%9E%E5%90%89%E4%BC%98%E5%8C%96-day10-redis/assets/image-20210927093112281.png)

### 2.3 Redis服务启动与停止

##### **1) Windows系统中启动和停止Redis**

Windows系统中启动Redis，直接双击redis-server.exe即可启动Redis服务，redis服务默认端口号为6379

![image-20210927100421213](https://gitee.com/wh-153/group0-wang-dachui/raw/master/1.%E6%AF%8F%E6%97%A5%E9%9A%8F%E5%A0%82%E8%AE%B2%E4%B9%89/%E7%91%9E%E5%90%89%E4%BC%98%E5%8C%96-day10-redis/assets/image-20210927100421213.png)

==Ctrl + C==停止Redis服务

双击==redis-cli.exe==即可启动Redis客户端，默认连接的是本地的Redis服务，而且不需要认证即可连接成功。

![image-20210927100319016](https://gitee.com/wh-153/group0-wang-dachui/raw/master/1.%E6%AF%8F%E6%97%A5%E9%9A%8F%E5%A0%82%E8%AE%B2%E4%B9%89/%E7%91%9E%E5%90%89%E4%BC%98%E5%8C%96-day10-redis/assets/image-20210927100319016.png)

退出客户端可以输入==exit==或者==quit==命令。

#### 小结：

![image-20220511101442519](https://gitee.com/wh-153/group0-wang-dachui/raw/master/1.%E6%AF%8F%E6%97%A5%E9%9A%8F%E5%A0%82%E8%AE%B2%E4%B9%89/%E7%91%9E%E5%90%89%E4%BC%98%E5%8C%96-day10-redis/assets/image-20220511101442519.png)

### 2.4 Redis配置文件

前面我们已经启动了Redis服务，默认情况下Redis启动后是在前台运行，而且客户端不需要密码就可以连接到Redis服务。如果我们希望Redis服务启动后是在后台运行，同时希望客户端认证通过后才能连接到Redis服务，应该如果做呢？

此时就需要修改Redis的配置文件：

- Linux系统中Redis配置文件：REDIS_HOME/redis.conf
- Windows系统中Redis配置文件：REDIS_HOME/redis.windows.conf

**注意**：修改配置文件后需要重启Redis服务配置才能生效，并且启动Redis服务时需要显示的指定配置文件：

> Windows中启动Redis服务

![image-20210927104929169](https://gitee.com/wh-153/group0-wang-dachui/raw/master/1.%E6%AF%8F%E6%97%A5%E9%9A%8F%E5%A0%82%E8%AE%B2%E4%B9%89/%E7%91%9E%E5%90%89%E4%BC%98%E5%8C%96-day10-redis/assets/image-20210927104929169.png)

由于Redis配置文件中开启了认证校验，即客户端连接时需要提供密码，此时客户端连接方式变为：

![image-20210927105909600](https://gitee.com/wh-153/group0-wang-dachui/raw/master/1.%E6%AF%8F%E6%97%A5%E9%9A%8F%E5%A0%82%E8%AE%B2%E4%B9%89/%E7%91%9E%E5%90%89%E4%BC%98%E5%8C%96-day10-redis/assets/image-20210927105909600.png)

**解释说明：**

> -h：指定连接的Redis服务的ip地址
>
> -p：指定连接的Redis服务的端口号
>
> -a：指定连接的Redis服务的密码

## 3. Redis数据类型

> **redis数据类型指的是 value的五种数据类型！**

### 3.1 介绍

Redis存储的是key-value结构的数据，其中key是字符串类型，value有5种常用的数据类型：

- 字符串 string
- 哈希 hash
- 列表 list
- 集合 set
- 有序集合 sorted set / zset

### 3.2 Redis 5种常用数据类型

![image-20220310110156332](https://gitee.com/wh-153/group0-wang-dachui/raw/master/1.%E6%AF%8F%E6%97%A5%E9%9A%8F%E5%A0%82%E8%AE%B2%E4%B9%89/%E7%91%9E%E5%90%89%E4%BC%98%E5%8C%96-day10-redis/assets/image-20220310110156332.png)

**解释说明：**

> 字符串(string)：普通字符串，常用
>
> 哈希(hash)：适合存储对象
>
> 列表(list)：按照插入顺序排序，可以有重复元素
>
> 集合(set)：无序集合，没有重复元素
>
> 有序集合(sorted set / zset)：集合中每个元素关联一个分数（score），根据分数升序排序，没有重复元素

## 4. Redis常用命令【重点】

### 4.1 字符串string操作命令

Redis 中字符串类型常用命令：

- **SET** key value 设置指定key的值
- **GET** key 获取指定key的值
- **SETEX** key seconds value 设置指定key的值，并将 key 的过期时间设为 seconds 秒
- **SETNX** key value 只有在 key 不存在时设置 key 的值

#### 小结：

> set name lisi : 当key不存在是新增，如果存在是修改； setex key 过期时间（单位是秒） value ; 常用于 验证码过期操作；（实现定期自动删除） setnx key value : 如果key存在就不做改变，如果不存在才新增；

更多命令可以参考Redis中文网：[https://www.redis.net.cn](https://gitee.com/link?target=https%3A%2F%2Fwww.redis.net.cn)

### 4.2 哈希hash操作命令

Redis hash 是一个string类型的 field 和 value 的映射表，hash特别适合用于存储对象，常用命令：

- **HSET** key field value 将哈希表 key 中的字段 field 的值设为 value
- **HGET** key field 获取存储在哈希表中指定字段的值
- **HDEL** key field 删除存储在哈希表中的指定字段
- **HKEYS** key 获取哈希表中所有字段
- **HVALS** key 获取哈希表中所有值
- **HGETALL** key 获取在哈希表中指定 key 的所有字段和值

![image-20210927113014567](https://gitee.com/wh-153/group0-wang-dachui/raw/master/1.%E6%AF%8F%E6%97%A5%E9%9A%8F%E5%A0%82%E8%AE%B2%E4%B9%89/%E7%91%9E%E5%90%89%E4%BC%98%E5%8C%96-day10-redis/assets/image-20210927113014567.png)

#### 小结：

![image-20220413161523768](https://gitee.com/wh-153/group0-wang-dachui/raw/master/1.%E6%AF%8F%E6%97%A5%E9%9A%8F%E5%A0%82%E8%AE%B2%E4%B9%89/%E7%91%9E%E5%90%89%E4%BC%98%E5%8C%96-day10-redis/assets/image-20220413161523768.png)

### 4.3 列表list操作命令

Redis 列表是简单的字符串列表，按照插入顺序排序，常用命令：

- **LPUSH** key value1 [value2] 将一个或多个值插入到列表头部 --(从左边存入)
- **rpush ** ---- 从右边存入
- **LRANGE** key start stop 获取列表指定范围内的元素 （lrange list01 0 4）
- **RPOP** key 移除并获取列表最后一个元素 ------- 从右边弹出一个元素
- Lpop ----从左边弹出一个元素（弹出： 移除一个并返回）
- **LLEN** key 获取列表长度
- **BRPOP** key1 [key2 ] timeout 移出并获取列表的最后一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止

![image-20210927113312384](https://gitee.com/wh-153/group0-wang-dachui/raw/master/1.%E6%AF%8F%E6%97%A5%E9%9A%8F%E5%A0%82%E8%AE%B2%E4%B9%89/%E7%91%9E%E5%90%89%E4%BC%98%E5%8C%96-day10-redis/assets/image-20210927113312384.png)

#### 小结list：

> **list的特点： 有序可重复；**

![image-20201122160357748](https://gitee.com/wh-153/group0-wang-dachui/raw/master/1.%E6%AF%8F%E6%97%A5%E9%9A%8F%E5%A0%82%E8%AE%B2%E4%B9%89/%E7%91%9E%E5%90%89%E4%BC%98%E5%8C%96-day10-redis/assets/image-20201122160357748.png)

### 4.4 集合set操作命令

Redis set 是string类型的无序集合。集合成员是唯一的，这就意味着集合中不能出现重复的数据，常用命令：

- **SADD** key member1 [member2] 向集合添加一个或多个成员
- **SMEMBERS** key 返回集合中的所有成员
- **SCARD** key 获取集合的成员数
- **SREM** key member1 [member2] 移除集合中一个或多个成员
- **SINTER** key1 [key2] 返回给定所有集合的交集
- **SUNION** key1 [key2] 返回所有给定集合的并集
- **SDIFF** key1 [key2] 返回给定所有集合的差集

![image-20210927113632472](https://gitee.com/wh-153/group0-wang-dachui/raw/master/1.%E6%AF%8F%E6%97%A5%E9%9A%8F%E5%A0%82%E8%AE%B2%E4%B9%89/%E7%91%9E%E5%90%89%E4%BC%98%E5%8C%96-day10-redis/assets/image-20210927113632472.png)

#### 小结：

> **set的特点： 自动去重， 无序；**
>
> 我们常常用set来帮我们完成对数据的去重处理！
>
> 也可以利用set的diff方法，完成对set的差值获取；

![image-20220310123012800](https://gitee.com/wh-153/group0-wang-dachui/raw/master/1.%E6%AF%8F%E6%97%A5%E9%9A%8F%E5%A0%82%E8%AE%B2%E4%B9%89/%E7%91%9E%E5%90%89%E4%BC%98%E5%8C%96-day10-redis/assets/image-20220310123012800.png)

![image-20220413161353063](https://gitee.com/wh-153/group0-wang-dachui/raw/master/1.%E6%AF%8F%E6%97%A5%E9%9A%8F%E5%A0%82%E8%AE%B2%E4%B9%89/%E7%91%9E%E5%90%89%E4%BC%98%E5%8C%96-day10-redis/assets/image-20220413161353063.png)

### 4.5 有序集合sorted set操作命令[zset]

Redis sorted set 有序集合是 string 类型元素的集合，且不允许重复的成员。每个元素都会关联一个double类型的分数(score) 。redis正是通过分数来为集合中的成员进行从小到大排序。有序集合的成员是唯一的，但分数却可以重复。

常用命令：

- **ZADD** key score1 member1 [score2 member2] 向有序集合添加一个或多个成员，或者更新已存在成员的 分数
- **ZRANGE** key start stop [WITHSCORES] 通过索引区间返回有序集合中指定区间内的成员
- **ZINCRBY** key 1 member 有序集合中对指定成员的分数加上增量 1
- **ZREM** key member [member ...] 移除有序集合中的一个或多个成员

![image-20210927114003383](https://gitee.com/wh-153/group0-wang-dachui/raw/master/1.%E6%AF%8F%E6%97%A5%E9%9A%8F%E5%A0%82%E8%AE%B2%E4%B9%89/%E7%91%9E%E5%90%89%E4%BC%98%E5%8C%96-day10-redis/assets/image-20210927114003383.png)

### 4.6 通用命令

Redis中的通用命令，主要是针对key进行操作的相关命令：

- **KEYS** pattern 查找所有符合给定模式( pattern)的 key
- **EXISTS** key 检查给定 key 是否存在
- **TYPE** key 返回 key 所储存的值的类型
- **TTL** key 返回给定 key 的剩余生存时间(TTL, time to live)，以秒为单位
- **DEL** key 该命令用于在 key 存在是删除 key

```
keys *   # 查看当前redis中所有的key 信息   -- 慎用
keys ab*  

exists name   # 判断key为name的数据是否存在

type  name   # 得到name这条数据 的value的类型

ttl name  # 查看key名为name的数据的剩余存活时间（查看还有多久过期）

del  key  # 可以删除任意类型数据（根据key 删除对应的所有数据）  --删除一条

flushdb   # 清空redis库   -- 慎用
```

## 5. 在Java中操作Redis 【重点】

### 5.1 介绍

前面我们讲解了Redis的常用命令，这些命令是我们操作Redis的基础，那么我们在java程序中应该如何操作Redis呢？这就需要使用Redis的Java客户端，就如同我们使用JDBC操作MySQL数据库一样。

Redis 的 Java 客户端很多，官方推荐的有三种：

- Jedis
- Lettuce
- Redisson

Spring 对 Redis 客户端进行了整合，提供了 Spring Data Redis，在Spring Boot项目中还提供了对应的Starter，即 spring-boot-starter-data-redis。

### 5.2 Jedis

Jedis 是 Redis 的 Java 版本的客户端实现。

maven坐标：

```
<dependency>
	<groupId>redis.clients</groupId>
	<artifactId>jedis</artifactId>
	<version>2.8.0</version>
</dependency>
```

使用 Jedis 操作 Redis 的步骤：

1. 获取连接
2. 执行操作
3. 关闭连接

示例代码：

```
package com.itheima.test;

import org.junit.Test;
import redis.clients.jedis.Jedis;
import java.util.Set;

/**
 * 使用Jedis操作Redis
 */
public class JedisTest {

    @Test
    public void testRedis(){
        //1 获取连接
        Jedis jedis = new Jedis("localhost",6379);
        
        //2 执行具体的操作
        jedis.set("username","xiaoming");

        String value = jedis.get("username");
        System.out.println(value);

        //jedis.del("username");

        jedis.hset("myhash","addr","bj");
        String hValue = jedis.hget("myhash", "addr");
        System.out.println(hValue);

        Set<String> keys = jedis.keys("*");
        for (String key : keys) {
            System.out.println(key);
        }

        //3 关闭连接
        jedis.close();
    }
}
```

### 5.3 Spring Data Redis

#### 5.3.1 介绍

Spring Data Redis 是 Spring 的一部分，提供了在 Spring 应用中通过简单的配置就可以访问 Redis 服务，对 Redis 底层开发包进行了高度封装。在 Spring 项目中，可以使用Spring Data Redis来简化 Redis 操作。

网址：[https://spring.io/projects/spring-data-redis](https://gitee.com/link?target=https%3A%2F%2Fspring.io%2Fprojects%2Fspring-data-redis)

![image-20210927143741458](https://gitee.com/wh-153/group0-wang-dachui/raw/master/1.%E6%AF%8F%E6%97%A5%E9%9A%8F%E5%A0%82%E8%AE%B2%E4%B9%89/%E7%91%9E%E5%90%89%E4%BC%98%E5%8C%96-day10-redis/assets/image-20210927143741458.png)

maven坐标：

```
<dependency>
	<groupId>org.springframework.data</groupId>
	<artifactId>spring-data-redis</artifactId>
	<version>2.4.8</version>
</dependency>
```

Spring Boot提供了对应的Starter，maven坐标：

```
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

Spring Data Redis中提供了一个高度封装的类：**RedisTemplate**，针对 Jedis 客户端中大量api进行了归类封装,将同一类型操作封装为operation接口，具体分类如下：

- ValueOperations：简单K-V操作
- SetOperations：set类型数据操作
- ZSetOperations：zset类型数据操作
- HashOperations：针对hash类型的数据操作
- ListOperations：针对list类型的数据操作

#### 5.3.2 使用方式

##### 5.3.2.1 环境搭建

第一步：创建maven项目springdataredis_demo，配置pom.xml文件

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
   
    <groupId>com.itheima</groupId>
    <artifactId>springdataredis_demo</artifactId>
    <version>1.0-SNAPSHOT</version>
    
     <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.4.5</version>
        <relativePath/>
    </parent>
    <properties>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>2.4.5</version>
            </plugin>
        </plugins>
    </build>
</project>
```

第二步：编写启动类

```
package com.itheima;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class App {

    public static void main(String[] args) {
        SpringApplication.run(App.class,args);
    }

}
```

第三步：配置application.yml

```
spring:
  application:
    name: springdataredis_demo
  #Redis相关配置
  redis:
    host: localhost
    port: 6379
    #password: 123456
    database: 0 #操作的是0号数据库
    jedis:
      #Redis连接池配置
      pool:
        max-active: 8 #最大连接数
        max-wait: 1ms #连接池最大阻塞等待时间
        max-idle: 4 #连接池中的最大空闲连接
        min-idle: 0 #连接池中的最小空闲连接
```

解释说明：

> spring.redis.database：指定使用Redis的哪个数据库，Redis服务启动后默认有16个数据库，编号分别是从0到15。
>
> 可以通过修改Redis配置文件来指定数据库的数量。

第四步：提供配置类

```
package com.itheima.config;

import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.StringRedisSerializer;

/**
 * Redis配置类
 */
@Configuration
public class RedisConfig extends CachingConfigurerSupport {

    @Bean
    public RedisTemplate<Object, Object> redisTemplate(RedisConnectionFactory connectionFactory) {

        RedisTemplate<Object, Object> redisTemplate = new RedisTemplate<>();

        //默认的Key序列化器为：JdkSerializationRedisSerializer
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashKeySerializer(new StringRedisSerializer());

        redisTemplate.setConnectionFactory(connectionFactory);

        return redisTemplate;
    }

}
```

解释说明：

> 当前配置类不是必须的，因为 Spring Boot 框架会自动装配 RedisTemplate 对象，但是默认的key序列化器为JdkSerializationRedisSerializer，导致我们存到Redis中后的数据和原始数据有差别

第五步：提供测试类

```
package com.itheima.test;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class SpringDataRedisTest {

    @Autowired
    private RedisTemplate redisTemplate;
    
}
```

##### 5.3.2.2 操作字符串类型数据

```
/**
 * 操作String类型数据
*/
@Test
public void testString(){
    //存值
    redisTemplate.opsForValue().set("city123","beijing");

    //取值
    String value = (String) redisTemplate.opsForValue().get("city123");
    System.out.println(value);

    //存值，同时设置过期时间
    redisTemplate.opsForValue().set("key1","value1",10l, TimeUnit.SECONDS);

    //存值，如果存在则不执行任何操作
    Boolean aBoolean = redisTemplate.opsForValue().setIfAbsent("city1234", "nanjing");
    System.out.println(aBoolean);
}
```

##### 5.3.2.3 操作哈希类型数据

```
/**
 * 操作Hash类型数据
*/
@Test
public void testHash(){
    HashOperations hashOperations = redisTemplate.opsForHash();

    //存值
    hashOperations.put("002","name","xiaoming");
    hashOperations.put("002","age","20");
    hashOperations.put("002","address","bj");

    //取值
    String age = (String) hashOperations.get("002", "age");
    System.out.println(age);

    //获得hash结构中的所有字段
    Set keys = hashOperations.keys("002");
    for (Object key : keys) {
        System.out.println(key);
    }

    //获得hash结构中的所有值
    List values = hashOperations.values("002");
    for (Object value : values) {
        System.out.println(value);
    }
}
```

##### 5.3.2.4 操作列表类型数据

```
/**
 * 操作List类型的数据
*/
@Test
public void testList(){
    ListOperations listOperations = redisTemplate.opsForList();

    //存值
    listOperations.leftPush("mylist","a");
    listOperations.leftPushAll("mylist","b","c","d");

    //取值
    List<String> mylist = listOperations.range("mylist", 0, -1);
    for (String value : mylist) {
        System.out.println(value);
    }

    //获得列表长度 llen
    Long size = listOperations.size("mylist");
    int lSize = size.intValue();
    for (int i = 0; i < lSize; i++) {
        //出队列
        String element = (String) listOperations.rightPop("mylist");
        System.out.println(element);
    }
}
```

##### 5.3.2.5 操作集合类型数据

```
/**
 * 操作Set类型的数据
*/
@Test
public void testSet(){
    SetOperations setOperations = redisTemplate.opsForSet();

    //存值
    setOperations.add("myset","a","b","c","a");

    //取值
    Set<String> myset = setOperations.members("myset");
    for (String o : myset) {
        System.out.println(o);
    }

    //删除成员
    setOperations.remove("myset","a","b");

    //取值
    myset = setOperations.members("myset");
    for (String o : myset) {
        System.out.println(o);
    }

}
```

##### 5.3.2.6 操作有序集合类型数据

```
/**
 * 操作ZSet类型的数据
*/
@Test
public void testZset(){
    ZSetOperations zSetOperations = redisTemplate.opsForZSet();

    //存值
    zSetOperations.add("myZset","a",10.0);
    zSetOperations.add("myZset","b",11.0);
    zSetOperations.add("myZset","c",12.0);
    zSetOperations.add("myZset","a",13.0);

    //取值
    Set<String> myZset = zSetOperations.range("myZset", 0, -1);
    for (String s : myZset) {
        System.out.println(s);
    }

    //修改分数
    zSetOperations.incrementScore("myZset","b",20.0);

    //取值
    myZset = zSetOperations.range("myZset", 0, -1);
    for (String s : myZset) {
        System.out.println(s);
    }

    //删除成员
    zSetOperations.remove("myZset","a","b");

    //取值
    myZset = zSetOperations.range("myZset", 0, -1);
    for (String s : myZset) {
        System.out.println(s);
    }
}
```

##### 5.3.2.7 通用操作

```
/**
 * 通用操作，针对不同的数据类型都可以操作
*/
@Test
public void testCommon(){
    //获取Redis中所有的key
    Set<String> keys = redisTemplate.keys("*");
    for (String key : keys) {
        System.out.println(key);
    }

    //判断某个key是否存在
    Boolean itcast = redisTemplate.hasKey("itcast");
    System.out.println(itcast);

    //删除指定key
    redisTemplate.delete("myZset");

    //获取指定key对应的value的数据类型
    DataType dataType = redisTemplate.type("myset");
    System.out.println(dataType.name());

}
```

------

# 总结：

## 目前需要记住的redis命令：

```
# 通用操作：
keys *   #查看当前redis服务器中所有的key    # 谨慎执行
keys *er
keys it*

del key   # 删除一个
type  key

flushdb   # 清空当前库   # 谨慎执行

# string
set name lisi
get name

# hash
hset hash k1 v1
hset hash k2 v2
hget hash k1
hgetall hash

# list
lpush list aaa
rpush list bbb

lpop list
rpop list

lrange list 0 -1

# set
sadd set1 aaa
sadd set1 bbb
sadd set2 bbb

sdiff set1 set2
sunion set1 set2
sinter set1 set2
```
# 补充说明：

#### 1.Redis server启动闪退，不成功，解决方案：

**方式一：**

> 换个版本即可！

**方式二：**

> 如果需要持久化，使用64位！ 参见配置文件式启动； 1、新建一个文本叫start.txt； 2、在文本中写入redis-server.exe redis.windows.conf 这是因为redis的启动需要同时启动这两个文件； 3、将文件名称改成start.bat 修改conf文件，最后加上： maxheap 1024000000 保存然后再启动 stat.bat ！

#### 2.指定配置文件方式启动！

1、新建一个文本叫start.txt； 2、在文本中写入redis-server.exe redis.windows.conf 这是因为redis的启动需要同时启动这两个文件； 3、将文件名称改成start.bat

然后 双击 即可启动!

#### 3.redis图形化界面工具的使用：

![image-20201122152928136](https://gitee.com/wh-153/group0-wang-dachui/raw/master/1.%E6%AF%8F%E6%97%A5%E9%9A%8F%E5%A0%82%E8%AE%B2%E4%B9%89/%E7%91%9E%E5%90%89%E4%BC%98%E5%8C%96-day10-redis/assets/image-20201122152928136.png)

![image-20201122153336001](https://gitee.com/wh-153/group0-wang-dachui/raw/master/1.%E6%AF%8F%E6%97%A5%E9%9A%8F%E5%A0%82%E8%AE%B2%E4%B9%89/%E7%91%9E%E5%90%89%E4%BC%98%E5%8C%96-day10-redis/assets/image-20201122153336001.png)

#### **4.在Linux中安装Redis**（知道即可）

##### a. 在Linux系统安装Redis步骤：

1. 将Redis安装包上传到Linux

   ```
   #在线下载也可以：
   wget https://download.redis.io/releases/redis-4.0.0.tar.gz
   ```

2. 解压安装包，命令：

   ```
   tar -zxvf redis-4.0.0.tar.gz -C /usr/local
   ```

3. 安装Redis的依赖环境gcc，命令：

   ```
   yum install gcc-c++
   ```

4. 进入/usr/local/redis-4.0.0，进行编译，命令：

   ```
   make
   ```

5. 进入redis的src目录进行安装，命令：

   ```
   make install
   ```

安装后重点文件说明：

> /usr/local/redis-4.0.0/src/redis-server：Redis服务启动脚本
>
> /usr/local/redis-4.0.0/src/redis-cli：Redis客户端脚本
>
> /usr/local/redis-4.0.0/redis.conf：Redis配置文件

##### **b. 远程访问配置：**

**通过修改Redis配置文件可以进行如下配置：**

**1）**设置Redis服务后台运行

 将配置文件中的==daemonize==配置项改为yes，默认值为no。

 注意：Windows版的Redis不支持后台运行。

**2）**设置Redis服务密码

 将配置文件中的 ==# requirepass foobared== 配置项取消注释，默认为注释状态。foobared为密码，可以根据情况自己指定。

**3）**设置允许客户端远程连接Redis服务

 Redis服务默认只能客户端本地连接，不允许客户端远程连接。将配置文件中的 ==bind 127.0.0.1== 配置项注释掉。

**解释说明：**

> Redis配置文件中 ==#== 表示注释
>
> Redis配置文件中的配置项前面不能有空格，需要顶格写
>
> daemonize：用来指定redis是否要用守护线程的方式启动，设置成yes时，代表开启守护进程模式。在该模式下，redis会在后台运行
>
> requirepass：设置Redis的连接密码
>
> bind：如果指定了bind，则说明只允许来自指定网卡的Redis请求。如果没有指定，就说明可以接受来自任意一个网卡的Redis请求。

**注意**：修改配置文件后需要重启Redis服务配置才能生效，并且启动Redis服务时需要显示的指定配置文件：

##### **c）Linux系统中启动和停止Redis**

1）Linux中启动Redis服务

```
# 进入Redis安装目录
cd /usr/local/redis-4.0.0
# 启动Redis服务，指定使用的配置文件
./src/redis-server ./redis.conf
```

1）Linux中停止Redis服务

> ==Ctrl + C==停止Redis服务

#### 5.redis数据持久化rdb与aof对比总结（面试常问）

**RDB存在哪些优势呢？** 1). 数据的备份和恢复非常方便，因为一个数据库只有一个持久化文件 2). ==性能最大化==。对于Redis的服务进程而言，在开始持久化时，它唯一需要做的只是fork出子进程，之后再由子进程完成这些持久化的工作，这样就可以极大的避免服务进程执行IO操作了。 3). 相比于AOF机制，如果数据集很大，RDB的启动效率会更高。

**RDB又存在哪些劣势呢？** 1).系统一旦在定时持久化之前出现宕机现象，此前没有来得及写入磁盘的数据都将丢失。==（可能会有小部分数据丢失现象存在）== 2). 由于RDB是通过fork子进程来协助完成数据持久化工作的，因此，如果当数据集较大时，可能会导致整个服务器停止服务几百毫秒，甚至是1秒钟。

**AOF的优势有哪些呢？** 1). 该机制可以带来更高的数据安全性，即数据持久性。Redis中提供了3种同步策略，即每秒同步、每修改同步和不同步。 2).对日志文件的写入操作采用的是append模式，因此在写入过程中即使出现宕机现象，也不会破坏日志文件中已经存在的内容。 3). 如果日志过大，Redis可以自动启用rewrite机制迅速“瘦身”(也可手动触发aof的rewrite操作，命令： bgrewriteaof) 4). AOF日志格式清晰、易于理解，很容易用AOF日志文件完成数据的重建。

**AOF的劣势有哪些呢？** 1). 对于相同数量的数据集而言，AOF文件通常要大于RDB文件。（重复保存） 2). 根据同步策略的不同，AOF在运行效率上往往会慢于RDB。总之，每秒同步策略的效率是比较高的，同步禁用策略的效率和RDB一样高效。

**综合比对**

- RDB与AOF的选择实际上是在做一种权衡，每种都有利有弊
- 如不能承受数分钟以内的数据丢失，对业务数据非常敏感，选用AOF
- 如能承受数分钟以内的数据丢失，且追求大数据集的恢复速度，选用RDB
- 灾难恢复选用RDB
- 双保险策略，同时开启 RDB和 AOF，重启后，Redis优先使用 AOF 来恢复数据，降低丢失数据的量

![image-20201123102703046](https://gitee.com/wh-153/group0-wang-dachui/raw/master/1.%E6%AF%8F%E6%97%A5%E9%9A%8F%E5%A0%82%E8%AE%B2%E4%B9%89/%E7%91%9E%E5%90%89%E4%BC%98%E5%8C%96-day10-redis/assets/image-20201123102703046.png)

##### redis默认持久化方式： RDB

![image-20210414093250108](https://gitee.com/wh-153/group0-wang-dachui/raw/master/1.%E6%AF%8F%E6%97%A5%E9%9A%8F%E5%A0%82%E8%AE%B2%E4%B9%89/%E7%91%9E%E5%90%89%E4%BC%98%E5%8C%96-day10-redis/assets/image-20210414093250108.png)

![image-20201123103131678](https://gitee.com/wh-153/group0-wang-dachui/raw/master/1.%E6%AF%8F%E6%97%A5%E9%9A%8F%E5%A0%82%E8%AE%B2%E4%B9%89/%E7%91%9E%E5%90%89%E4%BC%98%E5%8C%96-day10-redis/assets/image-20201123103131678.png)