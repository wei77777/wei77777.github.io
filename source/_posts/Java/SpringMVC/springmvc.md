---
title: Spring MVC
tags: Java
categories: SpringMVC
abbrlink: 73f99711
date: 2022-06-17 14:48:19
---

## 什么是SpringMVC

- SpringMVC是Spring的一个后续产品。是Spring的一个子项目
- SpringMVC 是 Spring 为表述层开发提供的一整套完备的解决方案。在表述层框架历经 Strust、WebWork、Strust2 等诸多产品的历代更迭之后，目前业界普遍选择了 SpringMVC 作为 Java EE 项目表述层开发的**首选方案**。

## SpringMVC的特点

- **Spring 家族原生产品**，与 IOC 容器等基础设施无缝对接
- **基于原生的Servlet**，通过了功能强大的**前端控制器DispatcherServlet**，对请求和响应进行统一处理
- 表述层各细分领域需要解决的问题**全方位覆盖**，提供**全面解决方案**
- **代码清新简洁**，大幅度提升开发效率
- 内部组件化程度高，可插拔式组件**即插即用**，想要什么功能配置相应组件即可
- **性能卓著**，尤其适合现代大型、超大型互联网项目要求

## HelloWorld

### 开发环境

- 构建工具 maven
- 服务器 tomcat
- Spring版本 5+

### 创建maven工程

修改父项目的打包方式

![Snipaste_2022-05-29_12-55-39.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-05-29_12-55-39.png)

在父项目中创建子 maven 项目，然后把子项目的打包方式改 war

![Snipaste_2022-05-29_12-57-14.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-05-29_12-57-14.png)

然后导入依赖

```xml
<dependencies>
    <!-- SpringMVC -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>5.3.1</version>
    </dependency>

    <!-- 日志 -->
    <dependency>
        <groupId>ch.qos.logback</groupId>
        <artifactId>logback-classic</artifactId>
        <version>1.2.3</version>
    </dependency>

    <!-- ServletAPI -->
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>3.1.0</version>
        <scope>provided</scope>
    </dependency>

    <!-- Spring5和Thymeleaf整合包 -->
    <dependency>
        <groupId>org.thymeleaf</groupId>
        <artifactId>thymeleaf-spring5</artifactId>
        <version>3.0.12.RELEASE</version>
    </dependency>
</dependencies>
```

在 main 文件夹下创建 webapp 文件夹

![Snipaste_2022-05-29_12-58-09.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-05-29_12-58-09.png)

添加 web.xml文件，让这个成为 web 项目

![Snipaste_2022-05-29_13-00-00.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-05-29_13-00-00.png)

创建完成后文件结构如下

![Snipaste_2022-05-29_13-01-15.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-05-29_13-01-15.png)

### 配置web.xml

```xml
<servlet>
    <servlet-name>SpringMVC</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>

    <!--设置SpringMVC配置文件的地址和名称-->
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:SpringMvc.xml</param-value>
    </init-param>

    <!--修改SpringMVC配置文件的初始化时间提前到加载时-->
    <load-on-startup>1</load-on-startup>
</servlet>

<servlet-mapping>
    <servlet-name>SpringMVC</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>
```

SpringMvc.xml 文件要放在 resources 文件夹下面

![Snipaste_2022-05-29_13-24-32.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-05-29_13-24-32.png)

SpringMvc.xml 文件初始内容如下

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

</beans>
```

### 创建控制器

创建控制器，并添加 @Controller 注解

```java
@Controller
public class HelloConnection {
}
```

![Snipaste_2022-05-29_13-33-21.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-05-29_13-33-21.png)

### 配置 SpringMVC 配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">
    
    <!--开启自动扫描-->
    <context:component-scan base-package="com.szx.mvc.controller"></context:component-scan>
    <!-- 配置Thymeleaf视图解析器 -->
    <bean id="viewResolver" class="org.thymeleaf.spring5.view.ThymeleafViewResolver">
        <property name="order" value="1"/>
        <property name="characterEncoding" value="UTF-8"/>
        <property name="templateEngine">
            <bean class="org.thymeleaf.spring5.SpringTemplateEngine">
                <property name="templateResolver">
                    <bean class="org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver">
                        <!-- 视图前缀 -->
                        <property name="prefix" value="/WEB-INF/templates/"/>
                        <!-- 视图后缀 -->
                        <property name="suffix" value=".html"/>
                        <property name="templateMode" value="HTML5"/>
                        <property name="characterEncoding" value="UTF-8" />
                    </bean>
                </property>
            </bean>
        </property>
    </bean>
    
</beans>
```

### 测试HelloWorld

在请求控制器里面创建控制请求的方法

- RequestMapping 注解：用来处理请求和控制器之间的关系
- value：声明请求的路径

```java
@Controller
public class HelloConnection {
    // 通过访问 / 返回 index，然后通过配置中的前缀和后缀组成 /WEB-INF/templates/index.html 页面
    @RequestMapping(value = "/")
    public String index(){
        return "index";
    }
}
```

然后编写 index.html 文件

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <h1>Hello Spring MVC</h1>
</body>
</html>
```

设置tomcat启动参数

![Snipaste_2022-05-29_15-34-04.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-05-29_15-34-04.png)

通过debug方式运行，页面成功显示

![Snipaste_2022-05-29_15-34-49.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-05-29_15-34-49.png)

### 访问指定页面

在index.html加入超链接访问

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <h1>Hello Spring MVC</h1>
    <a th:href="@{/target}">访问target</a>
</body>
</html>
```

和index.html 页面平级新建 target.html

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
  <h2>我是target</h2>
</body>
</html>
```

然后再访问控制器中添加方法

```java
@RequestMapping(value = "/target")
public String target(){
    return "target";
}
```

启动查看效果：

![VeryCapture_20220529154125.gif](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/VeryCapture_20220529154125.gif)

### 小结

浏览器发送请求，若请求地址符合前端控制器的url-pattern，该请求就会被前端控制器DispatcherServlet处理。前端控制器会读取SpringMVC的核心配置文件，通过扫描组件找到控制器，将请求地址和控制器中@RequestMapping注解的value属性值进行匹配，若匹配成功，该注解所标识的控制器方法就是处理请求的方法。处理请求的方法需要返回一个字符串类型的视图名称，该视图名称会被视图解析器解析，加上前缀和后缀组成视图的路径，通过Thymeleaf对视图进行渲染，最终转发到视图所对应页面

## @RequestMapping注解

### 功能

从注解名称上可以看出，@requestmapping注解的作用是将请求和处理请求的控制器关联起来，建立映射关系。SpringMVC接收到指定的请求，就会找到在映射关系中对应的控制器方法来处理这个请求

**注意：@RequestMapping 中的 value 定义不能重复**

### 位置

@RequestMapping 注解可以放在类上，也可以放在方法上

- 放置在类上，表示设置映射请求的初始信息
- 放在在方法上，表示映射请求的具体信息

比如如下写法，类上面添加@RequestMapping 注解，则这个方法的请求路径为：order/list

```java
@Controller
@RequestMapping(value = "order")
public class OrderController {

    // 这个方法的请求路径为：order/list
    @RequestMapping(value = "list")
    public String list(){
        return "order";
    }
}
```

编写访问代码

```html
<body>
    <a th:href="@{/order/list}">访问order</a>
</body>
```

新建一个 order.html 页面

```html
<body>
  <h2>order页面</h2>
</body>
```

测试效果

![VeryCapture_20220529162256.gif](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/VeryCapture_20220529162256.gif)

### 属性

#### value 

- 用来指明请求地址，必须要填写。可以简写为 `@RequestMapping(value = "/list") --> @RequestMapping("/list")` 

- 也可以在一个方法中声明多个访问地址，例如：

  这种写法访问order/list 或者 order/test 都可以调用这个方法

  ```java
  // 这个方法的请求路径为：order/list
  @RequestMapping(value = {
          "list",
          "test"
  })
  public String list(){
      return "order";
  }
  ```

#### method 

通过请求方法来匹配请求

- 如果不设置 method 属性则表示不限制请求方式，任何请求方式都可以被匹配到

- 如果设置了 method 则会按照 method 属性设置的请求方式匹配

- method 属性也是一个数组类型，可以设置多个

  例子：响应表单的post请求

  ```java
  @Controller
  public class FormController {
  
      // 设置请求方式为post
      @RequestMapping(
              value = "formsubmit",
              method = {RequestMethod.POST}
      )
      public String form(){
          return "success";
      }
  }
  ```

  编写提交表单

  ```html
  <form th:action="@{/formsubmit}" method="post">
      <input type="submit">
  </form>
  ```

  运行效果

  ![VeryCapture_20220529220131.gif](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/VeryCapture_20220529220131.gif)

method 属性也有派生注解，如下：

- get 请求可以写成 `@GetMapping`
- post 请求可以写成 `PostMapping`
- put 请求可以写成 `PutMapping`
- delete 请求可以写成 `DeleteMapping`

例如 `@PostMapping("/请求路径")`

```java
// 这种写法上面的写法效果一致
@PostMapping("/formsubmit")
public String form(){
    return "success";
}
```

#### params 

通过参数匹配请求，例如：

- `params = {"username"}` 要求请求中必须携带 username 这个参数
- `params = {"username=admin"}` 要求请求中必须有 username 参数并且参数值必须是 admin
- `params = {"!username"}` 要求请求中不能有username 参数
- `params = {"username!=admin"}` 要求请求中的 username 参数值不能是 admin

params 参数是一个字符串数组类型，可以声明多个条件，多个条件之间的关系时并且的关系，例如：`params = {"username=admin","pwd=123456"}`  要求请求地址中的参数 username=admin 并且 pwd=123456

#### headers

@RequestMapping注解的headers属性通过请求的请求头信息匹配请求映射

@RequestMapping注解的headers属性是一个字符串类型的数组，可以通过四种表达式设置请求头信息和请求映射的匹配关系

- "header"：要求请求映射所匹配的请求必须携带header请求头信息

- "!header"：要求请求映射所匹配的请求必须不能携带header请求头信息

- "header=value"：要求请求映射所匹配的请求必须携带header请求头信息且header=value

- "header!=value"：要求请求映射所匹配的请求必须携带header请求头信息且header!=value

若当前请求满足@RequestMapping注解的value和method属性，但是不满足headers属性，此时页面显示404错误，即资源未找到

### 路径支持ant语法

 * `? `表示匹配任意的单个字符
 * `*` 表示匹配零个或者多个字符
 * `/**` 表示一层或者多层目录，两个星号的写法必须以斜杠开头

```java
/**
 * ant 写法
 * ? 表示匹配任意的单个字符
 * * 表示匹配零个或者多个字符
 * /** 表示一层或者多层目录
 */
//@GetMapping(value = "/a?a/testAnt")
// @GetMapping(value = "a*a/testAnt")
@GetMapping(value = "/**/testAnt")
public String testAnt(){
    return "success";
}
```

### 路径占位符

通过 @PathVariable("参数名") 将形参和路径上的占位符进行绑定，示例代码

占位符是必填的，如果不填报404错误

```java
/**
 * 路径占位符
 * 通过 @PathVariable("name") 将形参和路径上的占位符进行绑定
 */
@GetMapping("/getUserInfo/{name}/{id}")
public String testRest(@PathVariable("name") String name,@PathVariable("id") Integer id){
    System.out.println("name = " + name);
    System.out.println("id = " + id);
    return "success";
}
```

请求方式

```html
<a th:href="@{/getUserInfo/jack/123}">测试路径占位符</a>
```

运行效果,在控制台打印获取到的参数

```shell
name = jack
id = 123
```

## Spring MVC获取请求参数

### 原生ServletApi方式获取

编写后台代码，通过 `request.getParameter` 获取参数

```java
/**
 * 通过原生servletApi方式获取请求参数
 * request.getParameter
 */
@GetMapping("/servletApi")
public String servletApi(HttpServletRequest request){
    String username = request.getParameter("username");
    String pwd = request.getParameter("pwd");
    System.out.println("username = " + username);
    System.out.println("pwd = " + pwd);
    return "success";
}
```

前端发送请求

```html
<a th:href="@{/servletApi(username='jack',pwd='123456')}">原生方式获取参数</a>
```

响应结果

![Snipaste_2022-06-02_10-07-35.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-06-02_10-07-35.png)

这种方式不推荐使用

### 通过控制器形参获取参数

```java
/**
 * 通过控制器形参获取参数
 */
@GetMapping("/testParam")
public String testParam(String name,String pwd,String[] checks){
    System.out.println("name = " + name);
    System.out.println("pwd = " + pwd);
    // 如果传递的参数是数组类型，形参要设置为数组接收
    System.out.println("checks = " + Arrays.toString(checks));
    return "success";
}
```

通过表单请求

```html
<form th:action="@{/testParam}" method="get">
    <input type="text" name="name"/><br>
    <input type="text" name="pwd"/><br>
    <input type="checkbox" name="checks" value="羽毛球"/>羽毛球<br>
    <input type="checkbox" name="checks" value="篮球"/>篮球<br>
    <input type="checkbox" name="checks" value="足球"/>足球<br>
    <input type="submit"/>
</form>
```

请求路径

![Snipaste_2022-06-02_10-29-43.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-06-02_10-29-43.png)

获取到的参数

![Snipaste_2022-06-02_10-30-05.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-06-02_10-30-05.png)



### @RequestParam

@RequestParam注解作用是将形参上的参数和请求参数做映射

@RequestParam注解有三个参数：

- value：指定为形参赋值的请求参数的参数名

- required：设置是否必须传输此请求参数，默认值为true
  - 若设置为true时，则当前请求必须传输value所指定的请求参数，若没有传输该请求参数，且没有设置defaultValue属性，则页面报错400：Required String parameter 'xxx' is not present；
  - 若设置为false，则当前请求不是必须传输value所指定的请求参数，若没有传输，则注解所标识的形参的值为null

- defaultValue：不管required属性值为true或false，当value所指定的请求参数没有传输或传输的值为""时，则使用默认值为形参赋值

下面代码的意思是路径上会传递 uname 参数，但是后台使用 name 来接收

```java
/**
* @RequestParam("uname") 注解方式获取参数
* value 表示参数别名
* defaultValue 表示参数默认值，在没有传递这个参数或者参数值为空时默认一个值
*/
@GetMapping("/testRequestParam")
public String testRequestParam(@RequestParam(value = "uname",defaultValue = "admin") String name){
    System.out.println("name = " + name);
    return "success";
}
```

前端发送的路径

```html
<a th:href="@{/testRequestParam(uname=张三)}">测试RequestParam注解</a>
```

结果

![Snipaste_2022-06-02_10-48-53.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-06-02_10-48-53.png)

### @RequestHeader

可以通过形参获取请求头信息

@RequestHeader是将请求头信息和控制器方法的形参创建映射关系

@RequestHeader注解一共有三个属性：value、required、defaultValue，用法同@RequestParam

```java
/**
 * @RequestHeader 获取请求头信息
 * @author Songzx
 * @date 2022/6/2
 */
@GetMapping("/testRequestHeader")
public String testRequestHeader(String name, @RequestHeader("Host") String host){
    System.out.println("name = " + name);
    System.out.println("host = " + host);
    return "success";
}
```

请求方式

```html
<a th:href="@{/testRequestHeader(name=张三)}">测试RequestHeader注解</a>
```

响应结果

![Snipaste_2022-06-02_13-12-01.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-06-02_13-12-01.png)

### @CookieValue

从请求中获取指定的cookie

@CookieValue是将cookie数据和控制器方法的形参创建映射关系

@CookieValue注解一共有三个属性：value、required、defaultValue，用法同@RequestParam

```java
/**
 * 测试 @CookieValue("JSESSION")
 * 从客户端发送的请求中必须携带名字是JSESSION的cookie
 */
@GetMapping("/testRequestCookie")
public String testRequestCookie(@CookieValue("JSESSION") String session){
    System.out.println("session = " + session);
    return "success";
}
```

### 通过POJO获取参数

新建 pojo.User.java

```java
package com.szx.mvc.pojo;

import org.springframework.stereotype.Component;

/**
 * @author songzx
 * @create 2022-06-02 13:24
 */
@Component
public class User {
    String name;
    String pwd;
    String email;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", pwd='" + pwd + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
```

添加请求控制器

```java
@PostMapping("/testPojo")
public String testPojo(User user,HttpServletRequest request){
    System.out.println("user = " + user);
    return "success";
}
```

前端通过表单发送post请求

```html
<!--测试传递pojo类-->
<form th:action="@{/testPojo}" method="post">
    <input type="text" name="name"><br>
    <input type="password" name="pwd"><br>
    <input type="email" name="email"><br>
    <input type="submit"><br>
</form>
```

点击表单的提交按钮，可以看到控制台成功的获取到数据并转成一个类

![Snipaste_2022-06-02_13-33-37.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-06-02_13-33-37.png)

注意点：

- 类中的属性要和参数逐一对应

### 处理参数中文乱码问题

在 web.xml  配置文件中添加过滤器，处理中文乱码问题

```xml
<!--设置过滤器，处理请求中中文参数乱码问题-->
<filter>
    <filter-name>CharacterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <!--设置请求编码格式-->
    <init-param>
        <param-name>encoding</param-name>
        <param-value>UTF-8</param-value>
    </init-param>
    <!--设置响应编码格式-->
    <init-param>
        <param-name>forceResponseEncoding</param-name>
        <param-value>true</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>CharacterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

## 域对象保存数据

### 通过 servletApi 往域对象中保存数据

添加控制器

```java
/**
 * 1.通过 servletApi 往域对象中保存数据
 */
@GetMapping("/testServlet")
public String testServlet(HttpServletRequest request){
    request.setAttribute("helloServlet","hello servlet");
    return "success";
}
```

使用

```html
<ul>
    <li th:text="${helloServlet}"></li>
</ul>
```

### 通过 ModelAndView 往域对象添加信息

ModelAndView 对象有两个方法

- addObject（key，value）
  - key：要保存的数据key
  - value：要保存的value
- setViewName（value） 设置视图名称

添加控制器

```java
/**
 * 2.通过 ModelAndView 往域对象添加信息
 */
@GetMapping("/testModelAndView")
public ModelAndView testModelAndView(){
    ModelAndView mav = new ModelAndView();
    // 往域对象中添加数据
    mav.addObject("helloModelAndView","helloModelAndView");
    // 配置视图
    mav.setViewName("success");
    // 返回ModelAndView对象
    return mav;
}
```

使用

```html
<li th:text="${helloModelAndView}"></li>
```

### 通过Model往域对象中保存数据

添加控制器

```java
/**
 * 3.通过 Model 保存数据
 */
@GetMapping("/testModel")
public String testModel(Model model){
    model.addAttribute("helloModel","helloModel");
    return "success";
}
```

### 通过Map往域对象共享数据

```java
/**
 * 4.通过 Map 往域对象中共享数据
 */
@GetMapping("/testMap")
public String testMap(Map<String,Object> map){
    map.put("helloMap","helloMap");
    return "success";
}
```

### 使用ModelMap往域对象共享数据

添加控制器

```java
/**
 * 5.使用ModelMap往域对象共享数据
 */
@GetMapping("/testModelMap")
public String testModelMap(ModelMap modelMap){
    modelMap.addAttribute("helloModelMap","helloModelMap");
    return "success";
}
```

### Model、ModelMap和map之间的关系

```java
public interface Model{} // Model 是一个接口
public class ModelMap extends LinkedHashMap<String, Object> {} // ModelMap 继承了 LinkedHashMap
public class ExtendedModelMap extends ModelMap implements Model {} // ExtendedModelMap 继承 ModelMap 并实现 Model 接口
public class BindingAwareModelMap extends ExtendedModelMap {} // BindingAwareModelMap 继承 ExtendedModelMap
```

所以他们三个都是 BindingAwareModelMap 是实例化出来的对象

### 通过ServletApi往session中保存数据

添加控制器，使用 session.setAttribute 添加数据

```java
/**
 * 6.使用HttpSession往session中保存数据
 */
@GetMapping("/testSession")
public String testSession(HttpSession session){
    session.setAttribute("helloSession","helloSession");
    return "success";
}
```

使用

```html
<li th:text="${session.helloSession}"></li>
```

### 向application域共享数据

添加控制器

```java
/**
 * 7.往 context 中保存数据
 * @return
 */
@GetMapping("/testContext")
public String testContext(HttpSession session){
    ServletContext context = session.getServletContext();
    context.setAttribute("helloContext","helloContext");
    return "success";
}
```

使用

```html
<li th:text="${application.helloContext}"></li>
```

## SpringMVC视图

### thymeleaf视图

当控制器方法中返回的视图名称不带任何前缀时，此时视图名称会被spring配置文件所解析，实现页面跳转

```java
@GetMapping("/")
public String testIndex(){
    return "index";
}
```

### 转发视图 forward

控制器方法返回的视图名称以 “forward:” 为前缀，会在服务器内部进行转发，浏览器的地址不会发生变化

```java
/**
 * forward: 转发
 * 会在服务器内部转发到 /readSuccess 地址，然后通过 /readSuccess 打开 success 页面
 * 浏览器地址还是 /testForward
 */
@GetMapping("/testForward")
public String testForward(){
    return "forward:/readSuccess";
}
```

效果展示

![VeryCapture_20220603214223.gif](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/VeryCapture_20220603214223.gif)

### 重定向视图

```java
/**
 * redirect 使浏览器重定向到新地址
 * 浏览器会发送两次请求
 *  第一次：请求 testRedirect 地址，然后服务器会告诉浏览器重定向到 readSuccess
 *  第二次：浏览器会往 readSuccess 发送请求，获取响应，显示 success 页面
 * 页面地址会变成 readSuccess
 */
@GetMapping("/testRedirect")
public String testRedirect(){
    return "redirect:/readSuccess";
}
```

效果展示

![VeryCapture_20220603214849.gif](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/VeryCapture_20220603214849.gif)

### 视图控制器

当控制器方法中仅仅用来做页面跳转，我们可以通过配置的方式完成。在 SpringMVC.xml 中添加配置文件

```xml
<!--添加视图控制器-->
<mvc:view-controller path="/" view-name="index"></mvc:view-controller>
<!--添加注解驱动-->
<mvc:annotation-driven></mvc:annotation-driven>
```

注意：当配置文件中配置任何一个视图控制器时，所有的注解控制器会失效，这是我们要添加一个注解驱动来解决

## RESTful

### RESTful简介

REST：**Re**presentational **S**tate **T**ransfer，表现层资源状态转移。

##### 资源

资源是一种看待服务器的方式，即，将服务器看作是由很多离散的资源组成。每个资源是服务器上一个可命名的抽象概念。因为资源是一个抽象的概念，所以它不仅仅能代表服务器文件系统中的一个文件、数据库中的一张表等等具体的东西，可以将资源设计的要多抽象有多抽象，只要想象力允许而且客户端应用开发者能够理解。与面向对象设计类似，资源是以名词为核心来组织的，首先关注的是名词。一个资源可以由一个或多个URI来标识。URI既是资源的名称，也是资源在Web上的地址。对某个资源感兴趣的客户端应用，可以通过资源的URI与其进行交互。

##### 资源的表述

资源的表述是一段对于资源在某个特定时刻的状态的描述。可以在客户端-服务器端之间转移（交换）。资源的表述可以有多种格式，例如HTML/XML/JSON/纯文本/图片/视频/音频等等。资源的表述格式可以通过协商机制来确定。请求-响应方向的表述通常使用不同的格式。

##### 状态转移

状态转移说的是：在客户端和服务器端之间转移（transfer）代表资源状态的表述。通过转移和操作资源的表述，来间接实现操作资源的目的。

### RESTful的实现

具体说，就是 HTTP 协议里面，四个表示操作方式的动词：GET、POST、PUT、DELETE。

它们分别对应四种基本操作：

- GET 用来获取资源
- POST 用来新建资源
- PUT 用来更新资源
- DELETE 用来删除资源

REST 风格提倡 URL 地址使用统一的风格设计，从前到后各个单词使用斜杠分开，不使用问号键值对方式携带请求参数，而是将要发送给服务器的数据作为 URL 地址的一部分，以保证整体风格的一致性。

| 操作     | 传统方式         | REST风格                |
| -------- | ---------------- | ----------------------- |
| 查询操作 | getUserById?id=1 | user/1-->get请求方式    |
| 保存操作 | saveUser         | user-->post请求方式     |
| 删除操作 | deleteUser?id=1  | user/1-->delete请求方式 |
| 更新操作 | updateUser       | user-->put请求方式      |

### 发送GET和POST请求

新建控制器

```java
package com.szx.mvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * @author songzx
 * @create 2022-06-06 16:43
 */
@Controller
public class UserController {
    /**
     * /user get请求，查询所有用户
     */
    @GetMapping("/user")
    public String getUser(){
        System.out.println("查询所有用户");
        return "success";
    }

    /**
    * /user/1 get请求，查询指定id的用户
    */
    @GetMapping("/user/{id}")
    public String getUserById(@PathVariable("id") Integer id){
        System.out.println("根据" + id + "查询用户");
        return "success";
    }

    /**
     * /user post请求，增加user
     */
    @PostMapping("/user")
    public String addUser(String lastname,String password){
        System.out.println("lastname = " + lastname);
        System.out.println("password = " + password);
        System.out.println("增加用户");
        return "success";
    }
}
```

通过a标签和表单来发送请求

```html
<a th:href="@{/user}">查询所有用户</a>
<a th:href="@{/user/1}">查询id为1的用户</a>

<form th:action="@{/user}" method="post">
     <input type="text" name="lastname"/><br>
     <input type="password" name="password"/><br>
     <input type="submit"/><br>
</form>
```

### 发送PUT和DELETE请求

首先在 web.xml  中添加过滤器

```xml
<!--过滤请求方式-->
<filter>
    <filter-name>HiddenHttpMethodFilter</filter-name>
    <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
</filter>
<filter-mapping>
    <filter-name>HiddenHttpMethodFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

通过查看 HiddenHttpMethodFilter 源码发现，要想实现发送 put 和 delete 请求，必须实在发送 post 请求为前提，并且要传递一个 _method 参数，并且 _method 参数的值只能为 PUT、DELETE、PATCH，如果我们传递的方法值在这几个中，则会替换掉原来的 post 请求为我们传递进来的请求方式

编写控制器方法

```java
/**
* /user/1 delete请求，删除指定id的用户
*/
@DeleteMapping("/user/{id}")
public String deleteUserById(@PathVariable("id") Integer id){
    System.out.println("根据" + id + "删除用户");
    return "success";
}

/**
 * /user put请求，修改user
 */
@PutMapping("/user")
public String updateUser(String lastname,String password){
    System.out.println("lastname = " + lastname);
    System.out.println("password = " + password);
    System.out.println("修改用户");
    return "success";
}
```
页面发送请求方式
- 必须通过post发送请求
- 请求参数中必须有 _method 参数
```html
<!-- 发送put请求 -->
<form th:action="@{/user}" method="post">
    <!--传递_method参数，声明特殊请求方式-->
    <input type="hidden" name="_method" value="put"/>
    <input type="text" name="lastname"/><br>
    <input type="password" name="password"/><br>
    <input type="submit"/><br>
</form>
<!-- 发送delete请求 -->
<form th:action="@{/user/1}" method="post">
    <!--传递_method参数，声明特殊请求方式-->
    <input type="hidden" name="_method" value="delete"/>
    <input type="submit"/><br>
</form>
```

### CharacterEncodingFilter 和  HiddenHttpMethodFilter 的顺序

如果把 HiddenHttpMethodFilter 过滤器之前，则在传递中文参数会出现乱码问题，这是因为先获取到的数据，再去设置的编码集，导致中文乱码产生。正确的顺序应该先设置 CharacterEncodingFilter 过滤器，再设置 HiddenHttpMethodFilter 

## RESTful案例

### 前提准备

新建一个 pojo 类，

```java
package com.szx.mvc.bean;

/**
 * @author songzx
 * @create 2022-06-06 16:08
 */
public class Employee {
    Integer id;
    String lastName;
    String email;
    Integer gender;

    public Employee() {
    }

    public Employee(Integer id, String lastName, String email, Integer gender) {
        this.id = id;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", gender=" + gender +
                '}';
    }
}
```

添加 EmployeeDao

```java
package com.szx.mvc.dap;

import com.szx.mvc.bean.Employee;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

/**
 * @author songzhengxiang
 * @create 2022-06-06 22:38
 */

@Repository
public class EmployeeDao {
    private static Map<Integer, Employee> employees = null;

    static{
        employees = new HashMap<Integer, Employee>();

        employees.put(1001, new Employee(1001, "E-AA", "aa@163.com", 1));
        employees.put(1002, new Employee(1002, "E-BB", "bb@163.com", 1));
        employees.put(1003, new Employee(1003, "E-CC", "cc@163.com", 0));
        employees.put(1004, new Employee(1004, "E-DD", "dd@163.com", 0));
        employees.put(1005, new Employee(1005, "E-EE", "ee@163.com", 1));
    }

    private static Integer initId = 1006;

    public void save(Employee employee){
        if(employee.getId() == null){
            employee.setId(initId++);
        }
        employees.put(employee.getId(), employee);
    }

    public Collection<Employee> getAll(){
        return employees.values();
    }

    public Employee get(Integer id){
        return employees.get(id);
    }

    public void delete(Integer id){
        employees.remove(id);
    }
}
```

### 功能清单

| 请求地址       | 请求方式 | 说明         |
| -------------- | -------- | ------------ |
| /employee      | get      | 获取全部信息 |
| /employee/{id} | delete   | 根据id删除   |
| /employee      | post     | 添加信息     |
| /employee/{id} | put      | 根据id修改   |

### 查询

添加查询控制器

```java
package com.szx.mvc.controller;

import com.szx.mvc.bean.Employee;
import com.szx.mvc.dap.EmployeeDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;

/**
 * @author songzhengxiang
 * @create 2022-06-06 22:38
 */
@Controller
public class EmployeeController {
    @Autowired
    // 自动注入EmployeeDao
    private EmployeeDao employeeDao;

    /**
     * 查询所有信息
     * @author Songzx
     * @date 2022/6/7
     */
    @GetMapping("/employee")
    public String getAllEmployee(Model model){
        Collection<Employee> employees = employeeDao.getAll();
        model.addAttribute("employeeList",employees);
        return "employee_list";
    }
}
```

添加列表页面 employee_list.html

```html
<!--表格-->
<table id="app">
  <tr th:border="1" th:cellpadding="0">
    <th>ID</th>
    <th>姓名</th>
    <th>邮箱</th>
    <th>性别</th>
    <th>操作（<a th:href="@{/toAdd}">增加</a>）</th>
  </tr>
  <tr th:each="item : ${employeeList}">
    <td th:text="${item.id}"></td>
    <td th:text="${item.lastName}"></td>
    <td th:text="${item.email}"></td>
    <td th:text="${item.gender}"></td>
    <td>
      <a th:href="@{/employee}">修改</a>
      <a @click="deleteEmp" th:href="@{'/employee/'+${item.id}}">删除</a>
    </td>
  </tr>
</table>
```

### 删除

这里用到 vue.js 静态文件，需要在 SpringMVC.xml 添加配置代码

```xml
<!--添加静态资源访问-->
<mvc:default-servlet-handler/>
```

然后添加删除控制器

```java
/**
 * 删除用户
 * @author Songzx
 * @date 2022/6/8
 */
@DeleteMapping("/employee/{id}")
public String deleteEmp(@PathVariable("id") Integer id){
    employeeDao.delete(id);
    return "redirect:/employee";
}
```

引入 vue.js

```html
<script type="text/javascript" th:src="@{/static/vue.js}"></script>
```

添加点击方法

```html
<a @click="deleteEmp" th:href="@{'/employee/'+${item.id}}">删除</a>
```

点击删除时通过表单发送 post 请求，携带 _method=delete 参数

```html
<!--删除表单-->
<form id="delete_form" method="post">
  <input type="hidden" name="_method" value="delete"/>
</form>
```

js逻辑

```html
<script>
  new Vue({
    el:"#app",
    methods:{
      deleteEmp:function (event){
        //通过id获取表单标签
        let delete_form = document.getElementById("delete_form");
        //将触发事件的超链接的href属性为表单的action属性赋值
        delete_form.action = event.target.href;
        //提交表单
        delete_form.submit();
        //阻止超链接的默认跳转行为
        event.preventDefault();
      }
    }
  })
</script>
```

### 添加

首先添加跳转控制器

```java
/**
 * 跳转到增加页面
 * @author Songzx
 * @date 2022/6/7
 */
@GetMapping("/toAdd")
public String toAdd(){
    return "addEmployee";
}
```

添加 addEmployee.html

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
  <form th:action="@{/employee}" method="post">
    <input type="text" name="lastName"/> <br>
    <input type="text" name="email"/> <br>
    <input type="text" name="gender"/> <br>
    <input type="submit"/>
  </form>
</body>
</html>
```

添加跳转方法

```html
<th>操作（<a th:href="@{/toAdd}">增加</a>）</th>
```

实现保存方法，发送post请求，接收一个Employee对象

```java
/**
 * 增加用户
 * @author Songzx
 * @date 2022/6/7
 */
@PostMapping("/employee")
public String addEmployee(Employee employee){
    employeeDao.save(employee);
    // 重定向到首页
    return "redirect:/employee";
}
```

### 实现数据回显

添加跳转连接

```html
<a th:href="@{'/employee/' + ${item.id}}">修改</a>
```

编写控制器，跳转到编辑页面的同时保存一份根据id查询到的数据

```java
/**
 * 根据id查询用户
 * @author Songzx
 * @date 2022/6/8
 */
@GetMapping("/employee/{id}")
public String getEmpById(@PathVariable Integer id,Model model){
    Employee employee = employeeDao.get(id);
    model.addAttribute("employee",employee);
    return "updateEmployee";
}
```

添加 updateEmployee.html

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
  <form th:action="@{/employee}" method="post">
      <input type="hidden" name="_method" value="put">
      <input type="hidden" name="id" th:value="${employee.id}">
      <input type="text" name="lastName" th:value="${employee.lastName}"/> <br>
      <input type="text" name="email" th:value="${employee.email}"/> <br>
      <input type="text" name="gender" th:value="${employee.gender}"/> <br>
      <input type="submit"/>
  </form>
</body>
</html>
```

效果展示

![VeryCapture_20220608142837.gif](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/VeryCapture_20220608142837.gif)

### 实现修改功能

添加修改控制器

```java
/**
 * 修改信息
 * @author Songzx
 * @date 2022/6/8
 */
@PutMapping("/employee")
public String updateEmp(Employee employee){
    employeeDao.save(employee);
    return "redirect:/employee";
}
```

效果展示

![VeryCapture_20220608143112.gif](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/VeryCapture_20220608143112.gif)

## HttpMessageConverter

HttpMessageConverter 报文信息装换器。可以将java对象转换成响应对象，或者将请求报文转换成java对象

一共有四个注解

- RequestBody 获取请求信息
- RequestEntity  获取封装请求报文
- ResponseBody  向浏览器响应数据，将方法的返回值作为响应体发送给浏览器
- ResponseEntity

### RequestBody 

添加控制器

```java
@PostMapping ("/testRequestBody")
public String testRequestBody(@RequestBody String requestbody){
    System.out.println("requestbody = " + requestbody);
    return "success";
}
```

添加post请求表单

```html
<form th:action="@{/testRequestBody}" method="post">
    <input type="text" name="name"><br>
    <input type="text" name="password"><br>
    <input type="submit"><br>
</form>
```

打印结果

![Snipaste_2022-06-08_15-23-09.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-06-08_15-23-09.png)

### RequestEntity

```java
@PostMapping("/testRequestEntity")
public String testRequestEntity(RequestEntity<String> requestEntity){
    HttpHeaders headers = requestEntity.getHeaders();
    String body = requestEntity.getBody();
    System.out.println("请求头 = " + headers);
    System.out.println("请求体 = " + body);
    return "success";
}
```

- requestEntity.getBody() 获取请求体
- requestEntity.getHeaders() 获取请求头

打印结果

![Snipaste_2022-06-08_15-45-17.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-06-08_15-45-17.png)

### ResponseBody  

向浏览器响应数据，将方法的返回值作为响应体发送给浏览器

添加控制器

```java
@GetMapping("/testResponseBody")
@ResponseBody
public String testResponseBody(){
    return "success2";
}
```

在方法上添加 @ResponseBody 注解，那么这个方法的返回值会作为响应体发送给浏览器

## 发送JSON对象字符串

首先需要引入依赖

```xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.12.1</version>
</dependency>
```

然后再 SpringMVC.xml 中开启注解驱动

```xml
<!--开启mvc注解驱动-->
<mvc:annotation-driven />
```

新建一个pojo类

```java
package com.szx.mvc.bean;

/**
 * @author songzx
 * @create 2022-06-08 16:17
 */
public class User {
    String name;
    String password;

    public User(String name, String password) {
        this.name = name;
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
```

新建控制器，返回User对象

```java
@GetMapping("/getUserInfo")
@ResponseBody
public User getUserInfo(){
    // 返回成json格式的字符串
    return new User("张三","123456");
}
```

效果

![Snipaste_2022-06-08_16-58-38.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-06-08_16-58-38.png)

## 处理Ajax请求

添加点击事件，发送Ajax请求

```html
<div id="testajax">
    <a @click="testAjax" th:href="@{/testAjax}">测试发送ajax请求</a>
</div>
```

引入 vue 和 axios

```html
<script type="text/javascript" th:src="@{/static/vue.js}"></script>
<script type="text/javascript" th:src="@{/static/axios.min.js}"></script>
```

编写 testAjax 方法

```html
<script>
    new Vue({
        el:"#testajax",
        methods:{
            testAjax:function (event){
                axios({
                    method:"post",
                    url:event.target.href,
                    params:{
                        name:"张三",
                        pwd:123456
                    }
                }).then(res=>{
                    console.log(res)
                })
                event.preventDefault()
            }
        }
    })
</script>
```

添加 testAjax 控制器，接收 axios 发送过来的请求

```java
@PostMapping("/testAjax")
@ResponseBody
public String testAjax(String name,String pwd){
    System.out.println("name = " + name);
    System.out.println("pwd = " + pwd);
    return "hello ajax";
}
```

运行结果

![Snipaste_2022-06-11_11-48-25.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-06-11_11-48-25.png)

浏览器控制台打印

![Snipaste_2022-06-11_11-49-12.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-06-11_11-49-12.png)

其中的 data 就是后端返回的内容

## @RestController注解

@RestController 注解是 @Controller 的派生注解。声明在类上，相当于为类添加了一个 @Controller 注解，并且为类中的每个方法添加了一个 @ResponseBody 注解

演示代码

```java
@RestController
public class ResControllerTest {

    /**
     * @RestController 注解相当于为类中添加了 @Controller 注解，并且为类中的每个方法添加一个 @ResponseBody 注解
     * @author Songzx
     * @date 2022/6/11
     */
    @GetMapping("/testRestController")
    public User testRestController(){
        return new User("李四","123456");
    }
}
```

我们请求 testRestController 地址，页面返回

![Snipaste_2022-06-11_11-59-28.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-06-11_11-59-28.png)

## 文件上传和下载

### 使用 ResponseEntity 实现文件下载

```java
package com.szx.mvc.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

/**
 * @author songzx
 * @create 2022-06-11 12:19
 */
@Controller
public class TestFileDown {

    @GetMapping("/testDown")
    public ResponseEntity<byte[]> testFileDown(HttpSession session) throws IOException {
        // 获取ServletContext上下文对象
        ServletContext context = session.getServletContext();
        // 获取文件在服务器文件中的真实地址
        String realPath = context.getRealPath("/static/img/1.jpg");
        // 创建一个输入流
        FileInputStream is = new FileInputStream(realPath);
        // 创建一个字节数组 available 方法获取到这个文件的字节长度
        byte[] bytes = new byte[is.available()];
        // 将流读取到字节数组中
        is.read(bytes);
        // 创建HttpHeader对象设置响应头
        MultiValueMap<String,String> headers = new HttpHeaders();
        //设置要下载方式以及下载文件的名字
        headers.add("Content-Disposition", "attachment;filename=1.jpg");
        // 设置响应状态码
        HttpStatus statusCode = HttpStatus.OK;
        // 创建ResponseEntity对象
        ResponseEntity<byte[]> responseEntity = new ResponseEntity<>(bytes,headers,statusCode);
        // 关闭输入流
        is.close();
        // 返回
        return responseEntity;
    }
}
```

### 文件上传

首先添加依赖

```xml
<!-- https://mvnrepository.com/artifact/commons-fileupload/commons-fileupload -->
<dependency>
    <groupId>commons-fileupload</groupId>
    <artifactId>commons-fileupload</artifactId>
    <version>1.3.1</version>
</dependency>
```

然后在 SpringMVC 配置文件中添加文件解析器，这个bean必须通过id来获取

```xml
<!--必须通过文件解析器的解析才能将文件转换为MultipartFile对象-->
<bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver"></bean>
```

前端添加表单，选择文件实现上传，其中 form 表单中需要添加 enctype="multipart/form-data"，表示以二进制方式发送数据

```html
<form th:action="@{/testUp}" method="post" enctype="multipart/form-data">
    头像：<input type="file" name="photo"/><br>
    <input type="submit">
</form>
```

后台添加 testUp 控制器

```java
@PostMapping("/testUp")
public String testUp(MultipartFile photo, HttpSession session) throws IOException {
    // 获取文件名称
    String filename = photo.getOriginalFilename();
    // 获取服务器中的文件路径
    ServletContext context = session.getServletContext();
    String filePath = context.getRealPath("photo");
    File file = new File(filePath);
    // 判断这个地址是否存在
    if(!file.exists()){
        // 如果不存在，则创建这个文件文件
        file.mkdir();
    }
    // 拼装文件最终地址：文件夹名称 + 分隔符号 + 文件名称
    String finalPath = filePath + File.separator + filename;
    // 实现文件上传
    photo.transferTo(new File(finalPath));
    return "success";
}
```

### 使用UUID作为文件名保存

使用UUID可以放置因为文件名重复带来的问题

![Snipaste_2022-06-12_11-17-07.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-06-12_11-17-07.png)

## 拦截器

### 创建拦截器

创建一个类实现 HandlerInterceptor 接口，并重写三个方法

```java
public class TestHandlerInterceptor implements HandlerInterceptor {
    // 控制器方法执行之前
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("请求之前");
        // 返回 true 表示放行，false 表示拦截
        return true;
    }

    // 控制器方法执行之后
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("请求之后");
    }

    // 视图渲染完毕后
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("视图渲染完毕后");
    }
}
```

- preHandle 控制器方法执行之前执行，这个方法返回一个布尔类型，true表示放行，false表示拦截当前请求
- postHandle 控制器方法执行之后执行
- afterCompletion 视图渲染完毕后

### 配置拦截器

在 SpringMVC 配置文件中进行配置 

方式一：使用 bean 指定一个类，默认对所有请求进行拦截

```xml
<!--配置拦截器-->
<mvc:interceptors>
    <!--方式一：通过 bean 指定类为拦截器，默认对所有请求进行拦截-->
    <bean class="com.szx.mvc.Interceptor.TestHandlerInterceptor"></bean>
</mvc:interceptors>
```

方式二：使用 ref，效果和方法一相同，都是对所有请求进行拦截

提前在过滤器上添加 @Component 注解，自动扫描创建类对象

```xml
<!--配置拦截器-->
<mvc:interceptors>
    <!--方式二：ref-->
    <ref bean="testHandlerInterceptor"></ref>
</mvc:interceptors>
```

方式三：可以设置过滤条件

```xml
<!--配置拦截器-->
<mvc:interceptors>
    <!--方式三：设置过滤条件-->
    <mvc:interceptor>
        <!--
            /** 表示拦截所有请求
            /* 表示只拦截以 / 开头的一层请求。例如 /a,/b。无法拦截 /a/b 这种多层请求
        -->
        <mvc:mapping path="/**"/>
        <!--设置那些请求不会被拦截-->
        <mvc:exclude-mapping path="/"/>
        <ref bean="testHandlerInterceptor"/>
    </mvc:interceptor>
</mvc:interceptors>
```

### 拦截器的执行顺序

分别创建两个拦截器

```java
@Component
public class TestHandlerInterceptor implements HandlerInterceptor {
    // 控制器方法执行之前
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("one-->preHandle");
        // 返回 true 表示放行，false 表示拦截
        return true;
    }

    // 控制器方法执行之后
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("one-->postHandle");
    }

    // 视图渲染完毕后
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("one-->afterCompletion");
    }
}
```

```java
@Component
public class TwoHandlerInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("tow-->preHandle");
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("tow-->postHandle");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("tow-->afterCompletion");
    }
}
```

将上面两个拦截器使用bena的方式配置到SpringMVC配置文件中

```xml
<mvc:interceptors>
    <!--通过 bean 指定类为拦截器，默认对所有请求进行拦截-->
    <bean class="com.szx.mvc.Interceptor.TestHandlerInterceptor"></bean>
    <bean class="com.szx.mvc.Interceptor.TwoHandlerInterceptor"></bean>
</mvc:interceptors>
```

然后发送请求，观察执行结果

```sh
one-->preHandle
tow-->preHandle
tow-->postHandle
one-->postHandle
tow-->afterCompletion
one-->afterCompletion
```

可以看到 preHandle 是按照配置顺序执行，postHandle 和 afterCompletion 按照配置的倒序执行

如果配置了 a、b、c 三个拦截器

其中b的preHandle返回false，则执行的结果为：

a、b拦截器的preHandle会执行，a的afterCompletion执行，所有拦截器的postHandle不执行

## 异常处理

### 基于配置的异常处理

SpringMVC提供了一个自定义的异常处理器，当发生异常时可以跳转到指定的页面

在SpringMVC配置文件中添加

```xml
<!--异常处理配置-->
<bean class="org.springframework.web.servlet.handler.SimpleMappingExceptionResolver">
    <property name="exceptionMappings">
        <props>
            <!--key指定一个异常类-->
            <!--error指定一个页面名称-->
            <prop key="java.lang.NullPointerException">error</prop>
        </props>
    </property>
    <!--将错误信息添加到请求域中-->
    <property name="exceptionAttribute" value="errmsg"></property>
</bean>
```

添加 error 页面

```html
<body>
    <div>空指针异常</div>
    <div th:text="${errmsg}"></div>
</body>
```

### 基于注解的异常处理

```java
@ControllerAdvice
public class ErrException {

    // 指定发生这些错误时返回error
    @ExceptionHandler(value = {NullPointerException.class,ArithmeticException.class})
    public String testException(Exception ex, Model model){
        // 保存错误信息到请求域中
        model.addAttribute("errmsg",ex);
        return "error";
    }
}
```

## 注解配置SpringMVC

### 创建一个类继承AbstractAnnotationConfigDispatcherServletInitializer

```java
public class WebInit extends AbstractAnnotationConfigDispatcherServletInitializer {
    /**
     * 指定spring配置类
     * @return
     */
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[]{WebConfig.class};
    }

    /**
     * 指定springMVC配置类
     * @return
     */
    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{SpringConfig.class};
    }

    /**
     * 指定DispatcherServlet的映射规则，即url-pattern
     * @return
     */
    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

    /**
     * 添加过滤器
     */
    @Override
    protected Filter[] getServletFilters() {
        // 处理请求格式为utf-8
        CharacterEncodingFilter encodingFilter = new CharacterEncodingFilter();
        encodingFilter.setEncoding("utf-8");
        encodingFilter.setForceRequestEncoding(true);
        // 处理delete请求和put请求
        HiddenHttpMethodFilter httpMethodFilter = new HiddenHttpMethodFilter();
        return new Filter[]{encodingFilter,httpMethodFilter};
    }
}
```

### 编写SpringConfig文件

```java
package com.szx.mvc.config;

import com.szx.mvc.interceptor.IndexInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.spring5.view.ThymeleafViewResolver;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ITemplateResolver;
import org.thymeleaf.templateresolver.ServletContextTemplateResolver;

import java.util.List;
import java.util.Properties;

/**
 * @author songzhengxiang
 * @create 2022-06-16 21:19
 */
// 将当前类标识为一个配置类
@Configuration
// 1.开启扫描组件
@ComponentScan("com.szx.mvc")
// 2.开启注解驱动
@EnableWebMvc
public class SpringConfig implements WebMvcConfigurer {
    // 处理静态资解析器
    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }

    // 配置拦截器
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        IndexInterceptor interceptor = new IndexInterceptor();
        registry.addInterceptor(interceptor).addPathPatterns("/**");
    }

    // 配置视图控制器
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/hello").setViewName("hello");
    }

    // 配置文件上传
    @Bean
    public CommonsMultipartResolver multipartResolver(){
        return new CommonsMultipartResolver();
    }

    // 配置异常处理
    @Override
    public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> resolvers) {
        SimpleMappingExceptionResolver simpleMappingExceptionResolver = new SimpleMappingExceptionResolver();
        Properties prop = new Properties();
        // 设置异常映射
        prop.setProperty("java.lang.NullPointerException","error");
        simpleMappingExceptionResolver.setExceptionMappings(prop);
        // 将异常信息保存在请求域中，键值为 errmsg
        simpleMappingExceptionResolver.setExceptionAttribute("errmsg");
        resolvers.add(simpleMappingExceptionResolver);
    }

    // 配置生成模板解析器
    @Bean
    public ITemplateResolver templateResolver() {
        WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();
        // ServletContextTemplateResolver需要一个ServletContext作为构造参数，可通过WebApplicationContext 的方法获得
        ServletContextTemplateResolver templateResolver = new ServletContextTemplateResolver(
                webApplicationContext.getServletContext());
        templateResolver.setPrefix("/WEB-INF/templates/");
        templateResolver.setSuffix(".html");
        templateResolver.setCharacterEncoding("UTF-8");
        templateResolver.setTemplateMode(TemplateMode.HTML);
        return templateResolver;
    }

    //生成模板引擎并为模板引擎注入模板解析器
    @Bean
    public SpringTemplateEngine templateEngine(ITemplateResolver templateResolver) {
        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
        templateEngine.setTemplateResolver(templateResolver);
        return templateEngine;
    }

    //生成视图解析器并未解析器注入模板引擎
    @Bean
    public ViewResolver viewResolver(SpringTemplateEngine templateEngine) {
        ThymeleafViewResolver viewResolver = new ThymeleafViewResolver();
        viewResolver.setCharacterEncoding("UTF-8");
        viewResolver.setTemplateEngine(templateEngine);
        return viewResolver;
    }
}
```

## SpringMVC执行流程

1) 用户向服务器发送请求，请求被SpringMVC 前端控制器 DispatcherServlet捕获。

2) DispatcherServlet对请求URL进行解析，得到请求资源标识符（URI），判断请求URI对应的映射：

a) 不存在

i. 再判断是否配置了mvc:default-servlet-handler

ii. 如果没配置，则控制台报映射查找不到，客户端展示404错误

![Snipaste_2022-06-17_14-42-39.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-06-17_14-42-39.png)



iii. 如果有配置，则访问目标资源（一般为静态资源，如：JS,CSS,HTML），找不到客户端也会展示404错误

![Snipaste_2022-06-17_14-42-15.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-06-17_14-42-15.png)

b) 存在则执行下面的流程

3) 根据该URI，调用HandlerMapping获得该Handler配置的所有相关的对象（包括Handler对象以及Handler对象对应的拦截器），最后以HandlerExecutionChain执行链对象的形式返回。

4) DispatcherServlet 根据获得的Handler，选择一个合适的HandlerAdapter。

5) 如果成功获得HandlerAdapter，此时将开始执行拦截器的preHandler(…)方法【正向】

6) 提取Request中的模型数据，填充Handler入参，开始执行Handler（Controller)方法，处理请求。在填充Handler的入参过程中，根据你的配置，Spring将帮你做一些额外的工作：

a) HttpMessageConveter： 将请求消息（如Json、xml等数据）转换成一个对象，将对象转换为指定的响应信息

b) 数据转换：对请求消息进行数据转换。如String转换成Integer、Double等

c) 数据格式化：对请求消息进行数据格式化。 如将字符串转换成格式化数字或格式化日期等

d) 数据验证： 验证数据的有效性（长度、格式等），验证结果存储到BindingResult或Error中

7) Handler执行完成后，向DispatcherServlet 返回一个ModelAndView对象。

8) 此时将开始执行拦截器的postHandle(...)方法【逆向】。

9) 根据返回的ModelAndView（此时会判断是否存在异常：如果存在异常，则执行HandlerExceptionResolver进行异常处理）选择一个适合的ViewResolver进行视图解析，根据Model和View，来渲染视图。

10) 渲染视图完毕执行拦截器的afterCompletion(…)方法【逆向】。

11) 将渲染结果返回给客户端。
