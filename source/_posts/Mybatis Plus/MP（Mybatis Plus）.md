---
title: Mybatis Plus
tags: Mybatis Plus
categories: Mybatis Plus
abbrlink: a5bb0b49
date: 2023-01-07 14:39:00
---


# MP（Mybatis Plus）

#### 1.MyBatis-Plus是什么

MyBatis-Plus（简称 MP）是一个 MyBatis 的增强工具，在 MyBatis 的基础上只做增强不做改变，为简化开发、提高效率而生。

>官网：我们的愿景是成为 MyBatis 最好的搭档，就像 [魂斗罗](https://baomidou.com/img/contra.jpg) 中的 1P、2P，基友搭配，效率翻倍。

### 快速入门

##### 实现步骤

###### 步骤一：添加加入mybatis-plus-boot-starter起步依赖

<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.4.2</version>
</dependency>

###### 步骤二: 创建表对应实体类@TableName+@TableId+@TableField

##### **主键赋值策略**

```
* 主键
* @TableId(type = IdType.AUTO):按数据库自增来给主键赋值
* type=IdType.xx作用：主键赋值策略（使用什么方式给主键赋值）
* 1，IdType.AUTO：按数据库主键自增
* 2，type=IdType.ASSIGN_ID 按照雪花算法产生一个唯一的数字或者字符串
* 3，type=IdType.ASSIGN_UUID   使用UUID产生唯一的字符串，如果要使用String  要提前申明
* 注意：加上@TableId没有申明任何主键赋值策略，如果有全局策略，就按全局设置来赋值
```

@TableId（type=IdType.xx）如果在全局设置之后只需要加上@Tableld

**全局设置**在yaml文件中去配置

![image-20221018111411542](C:\Users\86182\AppData\Roaming\Typora\typora-user-images\image-20221018111411542.png)

@Data
@AllArgsConstructor
@NoArgsConstructor
//声明表对应的实体，名称一致也可以省略
@TableName("user")
public class User {
    //声明与表主键对应的成员
    @TableId
    private Long userId;
    private String userName;
    private Integer userSex;
    private LocalDate userBirthday;
    private Date createTime;
    private Date updateTime;
}

###### **步骤三：创建 mapper 接口、并扫描接口**

接口： UserMapper extends **BaseMapper** 这里接口要继承**BaseMapper**

扫描接口:

@SpringBootApplication
@MapperScan("com.itheima.mapper")
public class MybatisPlusCaseApplication {

```
@SpringBootApplication
@MapperScan("com.itheima.mapper")//扫描接口
public class MybatisPlusCaseApplication {

    public static void main(String[] args) {
        SpringApplication.run(MybatisPlusCaseApplication.class, args);
    }
}
```

##### 配置数据库连接

spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/2021_mp?serverTimezone=GMT%2B8&useSSL=false
    password: root
    username: root

### 基础使用

#### 增删改查

insert/delete/update/select

###### **新增insert**

```
@Test
void insertTest() {
    User user = new User(null,"CZ",1,LocalDate.of(2012,3,5),new Date(),new Date());
    userMapper.insert(user);
}
```

###### ***删除delete****

```
@Test
void deleteTest() {

    userMapper.deleteById(10);
}
```

###### **修改update**

```
//3.修改：id=9的用户姓名为"张无忌同学"  UPDATE user SET user_name=? WHERE user_id=?
@Test
void updateTest() {
    User user = new User();
    user.setUserId(9L);
    user.setUserName("张无忌同学");
    userMapper.updateById(user);
}
```

###### 查询select

例💡：查询id=11的用户的数据

```
@Test
void selectTest() {
    User user = userMapper.selectById(11L);
    System.out.println("user = " + user);
}
```

###### 分页查询

- 分页插件

  分页需要首先加入分页插件，新版方式如下，旧版用的 `PaginationInterceptor` 已不推荐使用

```
//5.分页查询：分页查询每页显示4条,查询第1页的数据（目前初始化的数据是11条数据） select * from user where user_sex=0  and user_name like  '%周%' limit 0,4;
@Test
void selectPageTest() {
    String userName = "周";
    Page<User> page = new Page<>(1,4);
    QueryWrapper<Object> qw = new QueryWrapper<>();
    qw.likeRight(StringUtils.isNotBlank("userName"),"user_name",userName);
    userMapper.selectPage(page,null);
    long total = page.getTotal();
    List<User> records = page.getRecords();
    System.out.println("records = " + records);
    System.out.println("total = " + total);
}
```

###### 带条件操作

- 带条件查询

  例💡：根据姓名、性别、出生年月组合条件进行查询 

```
//6.条件查询：根据姓名、性别、出生年月组合条件进行查询  select * from user where user_name like "%周%" and user_sex=0  and user_birthday  between ? and ?
//🍭思考：根据条件查询，那么查询的list对象是null还是元素为size=0
@Test
void selectByQueryWrapper() {
    //姓名
    String userName = "周";
    //性别
    Integer userSex = null;
    //出生年月最小值
    LocalDate userBirthDayMin = null;
    //出生年月最大值
    LocalDate userBirthDayMax = null;

    //根据以上4个变量来动态拼接SQL
    QueryWrapper<User> qw = new QueryWrapper<>();
        qw.likeRight(StringUtils.isNotBlank("userName"),"user_name",userName);
        qw.eq(StringUtils.isNotBlank("userSex"),"user_sex",userSex);
        qw.between(StringUtils.isNotBlank("userBirthDayMin")&&StringUtils.isNotBlank("userBirthDayMax"),"user_birthday",userBirthDayMax,userBirthDayMin);
    List<User> users = userMapper.selectList(qw);
    users.forEach(System.out::println);

}
```

###### 条件更新

```
 //7.条件更新1：将所有男性👨变为女性👩   update user set user_sex=1 where user_sex=0
 //🍭思考: 完成以上修改，你能够使用几种写法?
 @Test
 void updateByUpdateWrapper1() {
     UpdateWrapper<User> uw = new UpdateWrapper<>();
/*     uw.eq("user_sex",0);
     User user = new User();
     user.setUserSex(1);
     userMapper.update(user , uw);*/

     uw.set("user_sex",0);
     userMapper.update(null,uw);

 }


 //8.条件更新2：删除所有id小于3的记录     delete from user where id <3
 @Test
 void deleteByQueryWrapper() {
     QueryWrapper<User> qw = new QueryWrapper<>();
             qw.lt("user_id",3);
             userMapper.delete(qw);
 }
```

### MyBatis-Plus进阶使用

##### 1.当映射不一致时

场景💡：生产环境中，字段和实体属性名 不一样，数据库表中字段为`user_name`这个时候没法去修改表字段名。解决以上问题，可以通过`@TableField`来解决名称不同的映射

表字段名与实体属性名的映射：

- 方式一：同名,此时可以省略@TableField
- 方式二：满足 `驼峰 <-> 下划线` 映射规则,例如userId  和user_id，MP自己会处理映射
- 方式三：用 `@TableField("对应字段名")` 标注实体属性 

##### 2.需要映射枚举时

/**
 * 枚举在代码使用：  Sex.MALE---->0
 */
public enum Sex {
    MALE("男", 0), FEMALE("女", 1);
	
    //接收、输出为json数据
    @JsonValue
    private final String name;
    /**
     * 将枚举实例中的code的值插入到数据库表中
     */
    @EnumValue
    private final int code;

    Sex(String name, int code) {
        this.name = name;
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public int getCode() {
        return code;
    }
}

@EnumValue 将枚举实例中的code的值插入到数据库表中

@JsonValue 是 jackson 提供的注解

- 如果不加，则转换和接收 json 数据时，会以枚举变量名为准（MALE，FEMALE）
- 如果加上，则转换和接收 json 数据时，会以标注的属性值为准（男，女）

##### 3.需要统一填充时

场景💡：每个实体对象都有一些通用的属性需要填充值，例如：新增时，需要填充 create_time，update_time这两个字段的值。修改时，需要填充 update_time这个时间。毕竟，这些值也不是用户输入，都是系统产生的。

步骤一:@TableField(fill = )标注属性在什么操作填充值

@Data
@AllArgsConstructor
@NoArgsConstructor
@TableName("user")
public class User3 {
    
    @TableId
    private Long userId;
    private String userName;
    private Sex userSex;
    private LocalDate userBirthday;
    
    @TableField(fill = FieldFill.INSERT)
    private Date createTime;
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Date updateTime;

}

步骤二：设置MetaObjectHandler在什么操作进行MetaObject字段填充，中元对象处理器MetaObjectHandler

##### 4.需要复杂查询时

虽然 MyBatis-plus 提供了很方便的方法，但如果是需要连表、多表查询，仍然会用到 MyBatis 原始方式

步骤一：在User4实体中构建与Certificate之间多对多的关系

@Data
@TableName("user")
public class User4 {
    @TableId
    private Long userId;
    private String userName;
    private Sex userSex;
    private LocalDate userBirthday;
    private Date createTime;
    private Date updateTime;
    private Set<Certificate> certificates;
}
@Data
public class Certificate {
    private Long certId;
    private String certName;
}

步骤二：扩展User4Mapper 接口的方法

public interface User4Mapper extends BaseMapper<User4> {
    //自定义扩展的方法，接口全限定名称、接口方法名、参数类型、返回值类型都需要与映射文件中对应好
    User4 selectUserWithCert(Long userId);
}

步骤三：并增加 xml mapper 文件 

//这里的tyep只能用于单表查询 不能用于多表 所以需要自己定义

resultMap

首件为id

```
<resultMap id="userMP" type="user4">
    <id column="user_id" property="userId"></id>
    <result column="user_name" property="userName"></result>
    <result column="user_sex" property="userSex"></result>
    <result column="user_birthday" property="userBirthday"></result>
    <result column="create_time" property="createTime"></result>
    <result column="update_time" property="userBirthday"></result>
    <collection property="certificates" ofType="certificate">
        <id column="cert_id" property="certId"></id>
        <result column="cert_name" property="certName"></result>
    </collection>
</resultMap>
```