---
title: form-create 使用
tags: Vue
categories: vue杂谈
abbrlink: 78aae61c
date: 2022-03-27 16:50:26
---

## form-create 使用

官网：http://www.form-create.com/v2/element-ui/

### 安装

```sh
npm i @form-create/element-ui
```

### 引入

在 main.js 中导入并注册

![Snipaste_2022-03-27_15-35-58.png](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-03-27_15-35-58.png)

### 功能演示

```html
<template>
  <div>
    <form-create
      v-model="fApi"
      :rule="rule"
      :option="option"
      :value.sync="value"
    ></form-create>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //实例对象
      fApi: {},
      //表单数据
      value: {},
      //表单生成规则
      rule: [
        {
          type: 'input',
          field: 'goods_name',
          title: '商品名称'
        },
        {
          type: 'datePicker',
          field: 'created_at',
          title: '创建时间'
        }
      ],
      //组件参数配置
      option: {
        //表单提交事件
        onSubmit: (formData) => {
          alert(JSON.stringify(formData))
        }
      }
    }
  }
}
</script>
```

![newcrm8.gif](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/newcrm8.gif)

### 通过配置项`on`监听事件

```html
<template>
  <div>
    <form-create
      v-model="fApi"
      :rule="rule"
      :option="option"
      :value.sync="value"
    ></form-create>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //实例对象
      fApi: {},
      //表单数据
      value: {},
      //表单生成规则
      rule: [
        {
          type: 'input',
          field: 'goods_name',
          title: '商品名称',
          on: {
            input: (e) => {
              console.log(e)
            }
          }
        },
        {
          type: 'datePicker',
          field: 'created_at',
          title: '创建时间'
        }
      ],
      //组件参数配置
      option: {
        //表单提交事件
        onSubmit: (formData) => {
          alert(JSON.stringify(formData))
        }
      }
    }
  }
}
</script>
```

![newcrm9.gif](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/newcrm9.gif)

除了 input 方法，也可以写 change，blur 等方法

### 加载异步数据

类型

```sh
type fetch = string | {
  //接口地址
  action: String;
  //异步数据插入的位置,例如:'options', 'props.options'
  to?: String;
  //解析接口返回的数据,返回最终数据. 默认取 `res.data`
  parse?: (body: any, rule:Rule, fapi:fApi) => any;
  //请求方式, 默认 GET
  method?: String;
  //调用接口附带数据
  data?: Object;
  //调用接口附带数据的提交方式,默认为 `formData`
  dataType?: 'json';
  //自定义 header 头信息
  headers?: Object;
  //接口请求失败回调
  onError?: (e: Error | ProgressEvent) => void;
 } | ((rule, api)=>Object)
```

加载 select 数据

```json
rule:[
    {
        type: 'select',
        field: 'select_city',
        title: '城市',
        value: '',
        options: [],
        effect: {
            fetch: {
                action:
                'http://datavmap-public.oss-cn-hangzhou.aliyuncs.com/areas/csv/100000_province.json',
                to: 'options',
                method: 'GET',
                parse(res) {
                    return res.rows.map((row) => {
                        return {
                            label: row.name,
                            value: row.adcode
                        }
                    })
                }
            }
        }
    }
]
```

![Snipaste_2022-03-27_15-56-11.png](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-03-27_15-56-11.png)

加载 cascader 数据

```json
rule:[
    {
        type: 'cascader',
        field: 'cascader_city',
        title: '省市',
        value: [],
        props: {
            options: []
        },
        effect: {
            fetch: {
                action:
                'https://cdn.jsdelivr.net/gh/modood/Administrative-divisions-of-China@2.4.0/dist/pc-code.json',
                to: 'props.options',
                method: 'GET',
                parse(res) {
                    function tidy(list) {
                        return list.map((val) => {
                            return {
                                value: val.code,
                                label: val.name,
                                children: val.children ? tidy(val.children) : undefined
                            }
                        })
                    }
                    return tidy(res)
                }
            }
        }
    }
]
```

![Snipaste_2022-03-27_15-57-14.png](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-03-27_15-57-14.png)

### 自定义布局

```json
rule:[
    {
        type: 'input',
        field: 'goodsName',
        title: '商品名称',
        on: ['input'],
        col: {
            span: 12
        }
    },
    {
        type: 'datePicker',
        field: 'createdAt',
        title: '创建时间',
        col: {
            span: 12
        }
    },
]
```

![Snipaste_2022-03-27_15-59-44.png](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-03-27_15-59-44.png)

### 自定义校验

设置表单必填

```json
rule:[
    {
        type: 'input',
        field: 'name',
        title: '名称',
        validate: [{ type: 'string', required: true, message: '请输入名称' }]
    }
]
```

![newcrm10.gif](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/newcrm10.gif)

设置数字最小值10

```json
rule:[
    {
        type:'inputNumber',
        field:'number',
        title:'数字',
        validate: [{type: 'number', min:10, required: true, message:'最小为10'}]
    }
]
```

### 自定义提交按钮

```json
//组件参数配置
option: {
    submitBtn: {
        innerText: '自定义按钮',
        round: true,
        type: 'success'
    },
    //表单提交事件
    onSubmit: (formData) => {
        alert(JSON.stringify(formData))
    }
}
```