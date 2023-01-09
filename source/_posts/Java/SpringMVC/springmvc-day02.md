---
title: springmvc
tags: springmvc
categories: springmvc
abbrlink: ba5955c9
date: 2023-01-07 14:39:00
---

#### 专业行话

入参：传递的参数

* 出参：返回的参数

# springmvc-day02

### RESTful风格

RESTful（REST 风格）是一种当前比较流行的互联网软件架构模式，它充分并正确地利用 HTTP 协议的特性，为我们规定了一套统一的资源获取方式，以实现不同终端之间（客户端与服务端）的数据访问与交互。

##### 传统url设计风格

保存品牌：/brand/save

修改品牌：/brand/update

删除1号品牌：/brand/delete?id=1

查询1号品牌：/brand/select?id=1

##### 常见HTTP请求方式

GET：查询

POST：保存

PUT：修改

DELETE：删除

##### restful设计风格【最终版】

**@GetMapping("/brand/{currentPage}/{pageSize**}")   //例如：访问路径:  /brand/1/5**
**public String selectByPage(@PathViriable Integer currentPage,**



**@GetMapping：发送GET请求访问**

**@PostMapping：发送POST请求访问**

**@PutMapping：发送PUT请求访问**

**@DeleteMapping：发送DELETE请求访问**

@PathVariable 注解，将占位符 {xxx} 所表示的参数赋值给指定的形参。

当需要在注解上面获取传入的id等根据条件进行操作的需要加上.@PathVariable

```
 * 1.@PathVariable不能省略的，否则就拿到的null
 * 2.{myid}变量和Integer mydi 变量名称相同@PathVariable("id") @PathVariable("id")Integer myId*/
@GetMapping("/{myId}")
```

@PostMapping 添加数据 不需要返回值 ，如果在方法上加入了这个注解@RestController则可以return  success(成功)或者unsuccessful(失败的)

@PutMapping 修改数据同上

@DeleteMapping("/{id}")例如:

```
 * 2.需求：根据主键删除品牌请求
 * 入参：传递的Integer id数据
 * 出参：返回的是"success"
 */
@DeleteMapping("/{id}")
public String deleteBrand(@PathVariable Integer id) {
    log.info("deleteBrand({})", id);
    return "success";
}
```

##### 参数校验

**第一步 添加依赖**

![image-20221013195017355](C:\Users\86182\AppData\Roaming\Typora\typora-user-images\image-20221013195017355.png)

【第二步】添加校验规则

![image-20221013195042271](C:\Users\86182\AppData\Roaming\Typora\typora-user-images\image-20221013195042271.png)

@NotEmpty 表示不为空 

@Min(18)；表示年龄最小值为18

@Length(min = 5,max = 20,message = "name属性长度不在5-20范围内")

以上校验注解都可以添加上message属性 将错误提示出来

【第三步】在Controller方法中使用@Valid开启校验，使用BindingResult获取校验结果

```
public String updateUser(@Valid @RequestBody User user, BindingResult result) {
   // fieldErrors=违反规则属性名+违反规则提示信息message
    List<FieldError> fieldErrors = result.getFieldErrors();
    if (fieldErrors!=null && fieldErrors.size()>0){
        fieldErrors.forEach(fieldError -> {
            // fieldErrors获取具体属性
            String field = fieldError.getField();
            // fieldErrors获取具体错误提示
            String defaultMessage = fieldError.getDefaultMessage();
            log.info("校验错误信息:{}---------->{}",field,defaultMessage);
        });
    }

    return "success";
}
```

##### 文件上传

在 Spring MVC 项目中，大多数的文件上传功能都是通过 form 表单提交到后台服务器的。

form 表单想要具有文件上传功能，其必须满足以下 3 个条件。

- form 表单的 method 属性必须设置为 post。
- form 表单的 enctype 属性设置为 multipart/form-data。
- 至少提供一个 type 属性为 file 的 input 输入框。
- 注意file要和前端传递的名字保持一致

**MultipartFile file**这个属性为文件上传的核心参数，放在方法形参中 如果有多个文件上传则需要MultipartFile[] files 定义成数组

##### 企业级别文件上传开发代码

```
public String uploadFile(MultipartFile file) {
    //判断上传文件是否为空文件以及不存在 返回error
    //如果上传的文件不存在 ，或者上传文件的字节大小是0
    if (file==null || file.getSize()==0){
        return "error";
    }
    //获取上传文件后缀：".png"
    //得到完整的文件名称:”itheima.png“
    String originalFilename = file.getOriginalFilename();
    //获取到后缀名".png“
    String suffix = originalFilename.substring(originalFilename.lastIndexOf("."));
    //2.产生文件随机字符名称，UUID对象可以产生一个随机字符串 b4bd8-7f819-de4e29-87b2-01f188-bc1371
    //uuid就是这里随机字符串:b4bd8-7f819-de4e29-87b2-01f188-bc1371
    String uuid = UUID.randomUUID().toString();
    //需要替换随机字符串里面的-
    String fileName = uuid.replace("-" , "");
    //构建上传文件目录 :D://06_teaching//upload
    File uploadRoot = new File("D:\\图库\\upload\\");

    if (!uploadRoot.exists()){
        uploadRoot.mkdir();
    }
    file.transferTo(new File(new File("D:\\图库\\upload\\") + fileName + suffix));
    return "success";
}
```

##### 统一响应结果

@ResponseStatus：描述状态码例如

```
 * @TODO 问题1：在企业开发中，往往后台接口需要给前端响应一个状态码，前端根据状态码跳转；那么springmvc中怎么给前端响应状态码？
 */
@GetMapping("/s2")
@ResponseStatus(HttpStatus.OK)
//  @ResponseStatus响应状态码
public void s2() {
}
```

问题2：在企业开发中，往往后台接口需要给前端响应一个状态码和数据，**springmvc中怎么给前端响应状态码的同时也可以响应数据呢**？(了解)
例如ResponseEntity 在方法上加上这个 可以返回响应头，状态码，以及数据

```
@GetMapping("/s3")
public ResponseEntity response() {
    //1.响应的数据：brand数据
    Brand brand = new Brand(1, "黑马", "传智播客");
    //2.响应头： myHeader="java153"
    LinkedMultiValueMap headers = new LinkedMultiValueMap();
    List<String> list = new ArrayList<>();
    list.add("java153");
    headers.add("myHeader","list");
    //3.响应状态: 200
    return new ResponseEntity(brand,headers,HttpStatus.OK);
}
```

#### ResultResponse

ResultResponse(code(状态响应码)+msg(响应状态描述)+data(响应数据))

在方法上加上这个 可以返回响应头，状态码，以及数据同时给前端带去数据

需要自定义一个javaBean 里面属性为 code data msg

## 全局异常处理

**定义全局异常处理器并使用**

所使用的的注解@ExceptionHandler

在程序中不用在去写try  catch 取而代之的是异常处理器

作用：将项目中的代码异常统一处理，将来dao层将异常抛到service层，service层将一个抛到controller层，controller层将异常抛到异常处理器。

```
@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

@ExceptionHandler
public String exceptionHandler(Exception e){
    log.error("捕获的异常是：{}",e.getMessage());
    return "/error.html";
}
}
```

### 自定义异常并使用

**作用：springmvc提供的一种拦截Controller方法的机制，底层采用的是AOP技术，可以对controller层方法进行增强。**

【第一步】定义一个类型实现HandlerInterceptor接口，重写需要的方法。



```
@ExceptionHandler//表示该方法是处理异常的方法
    @ResponseBody
    public ResultResponse exceptionHandler2(CustomerException customerException){
        //在处理器contrper前面执行，相当于前置执行
    String message = customerException.getMessage();
    return  new ResultResponse(200,message,"出现异常");
}
```

【第二步】在需要的地方抛出自定义异常

  throw  new CustomerException(error)常用做法只需要在业务逻辑中抛出异常，然后由全局异常处理捕获进行处即可;

- [ ] ```
    @RequestMapping("/validate")
      public ResultResponse updateUser(@Valid @RequestBody User user, BindingResult bindingResult) throws JsonProcessingException {
          List<FieldError> fieldErrors = bindingResult.getFieldErrors();
          if (fieldErrors.size() > 0) {
       
            ObjectMapper om = new ObjectMapper();
              String error = om.writeValueAsString(fieldErrors);
            throw  new CustomerException(error);//做法:只需要在业务逻辑中抛出异常，然后由全局异常处理捕获进行处即可;
              //抛出异常的时候，顺便还可以向异常中传递message值
          }
          return new ResultResponse(200, null, "操作成功");
      }
  }
  ```

#### 拦截器

作用：springmvc提供的一种拦截Controller方法的机制，底层采用的是AOP技术，可以对controller层方法进行增强。

**【第一步】定义一个类型实现HandlerInterceptor接口，重写需要的方法。**

```
@Slf4j
public class LoginInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request , HttpServletResponse response , Object handler) throws Exception {
    //在处理器contrper前面执行，相当于前置执行
        log.info("1-preHandle");
        return true;//这里是true才会执行下面的
    }


}
```

**【第二步】让引导类实现WebMvcConfigurer接口，重写addInterceptors方法，在方法内部定义拦截路径。**

```
@Configuration
public class MvcConfig implements WebMvcConfigurer {

    /**
     * 配置添加拦截器
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
                                                            //这里/**是拦截所有的请求
        registry.addInterceptor(new LoginInterceptor()).addPathPatterns("/**");
    }
}
```

###### 拦截器和过滤器的区别

归属不同： Filter属于Servlet技术，Interceptor属于SpringMVC技术

拦截内容不同： Filter是拦截请求和响应的，Interceptor拦截访问处理器中的方法，也就是拦截Controller中的方法调用。

执行顺序不同：先执行过滤器，后执行拦截器