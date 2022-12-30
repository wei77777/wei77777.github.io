---
title: Vue2中父子组件通信的几种常用方法
tags: Vue
abbrlink: aa5b1945
date: 2021-08-10 15:29:16
---

## Vue2父子传参：props

首先在父组件中引入子组件，然后以属性的方式将数据传递给子组件

父组件：

```html
<template>
	<div class="home">
        <!-- 在子组件中使用 :变量名=value  的方式向子组件传递数据，子组件通过 props 接收-->
        <HelloWorld :msg="fatchData" ref="childEl"/>       
    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'

    export default {
        name: 'Home',
        components: {
            HelloWorld
        },
        data () {
            return {
                fatchData: '我是父组件通过props传递给子组件的文字'
            }
        }        
    }
</script>
```

然后在子组件中使用props接收，props里定义的名字要和父组件定义的一致

子组件：

```html
<template>
	<div>
        <span>{{ msg }}</span>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        // 子组件通过使用 props 接收父组件传递过来的数据
        props: {
            msg: String
        }
  }
</script>
```

## Vue2父子传参之父传子：$refs

在父组件中给子组件的标签上添加 ref 等于一个变量，然后通过使用 $refs 可以获取子组件的实例，以及调用子组件的方法和传递参数

父组件：

```html
<template>
	<div class="home">
        <!-- 在子组件中使用 :变量名=value  的方式向子组件传递数据，子组件通过 props 接收-->
        <HelloWorld :msg="fatchData" ref="childEl"/>
        <div>
            父组件
        </div>
        <div>
            <button @click="changeChildMsg">父组件按钮</button>
        </div>
    </div>
</template>
<script>
    import HelloWorld from '@/components/HelloWorld.vue'
    export default {
        name: 'Home',
        components: {
            HelloWorld
        },
        data () {
            return {
                fatchData: '我是父组件通过props传递给子组件的文字'
            }
        },
        methods: {
            // 点击父组件的按钮修改子组件中显示的文字
            changeChildMsg () {
                this.fatchData = '通过按钮修改了子组件中显示的问题'
                // 父组件调用子组件的方法并传递参数
                this.$refs.childEl.showText('我来自父组件')
            }
        }
    }
</script>
```

然后在子组件中定义相同的方法名，在父组件使用 `$refs` 调用后触发在子组件中定义的同名方法

子组件：

```html
<template>
    <div class="hello">
        <b>子组件</b>
        <div>
        	<span>{{ msg }}</span>
        </div>
        <div>
       	 	<button>子组件按钮</button>
        </div>
    </div>
</template>

        <script>
        export default {
        name: 'HelloWorld',
        // 子组件通过使用 props 接收父组件传递过来的数据
        props: {
            msg: String
        },
        methods: {
            // 这个方法由父组件通过 this.$refs.childEl.showText('我来自父组件') 调用触发
            showText (text) {
                alert(text)
            }
        }
    }
</script>
```

## Vue2父子传参之子传父：$emit

在子组件中我们也可以调用父组件的方法向父组件传递参数，通过`$emit`来实现

子组件：

```html
<button @click="childClick">子组件按钮</button>

<script>
export default {
  name: 'HelloWorld',
  methods: {
    // 子组件通过 $emit 调用父组件中的方法
    childClick () {
      this.$emit('setValueName', '我是通过子组件传递过来的')
    }
  }
}
</script>
```

然后在父组件中定义并绑定子组件传递的 `setValueName` 事件，事件名称要和子组件定义的名称一样

父组件：

```html
<HelloWorld  @setValueName="setValueName" />

<script>
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
    // 该方法是由子组件触发的
    setValueName (data) {
      alert(data) //= > 我是通过子组件传递过来的
    }
  }
}
</script>
```

## Vue2父子传参：parent/children

- 父组件通过`$children`获取子组件的实例数组
- 子组件通过`$parent`获取的父组件实例

父组件中可以存在多个子组件，所以`this.$children`获取到的是子组件的数组

父组件：

```html
<HelloWorld />
<button @click="getSon">children/parent</button>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data () {
    return {
      parentTitle: '我是父组件'
    }
  },
  methods: {
    // 子组件调用这个方法
    parentHandle () {
      console.log('我是父组件的方法')
    },
    // 通过 this.$children 获取子组件实例
    getSon () {
      console.log(this.$children)
      console.log(this.$children[0].sonTitle) //= > 我是子组件
      this.$children[0].sonHandle() //= > 我是子组件的方法
    }
  }
}
</script>
```

子组件：

```html
<button @click="getParent">获取父组件的方法和值</button>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      sonTitle: '我是子组件'
    }
  },
  methods: {
    // 父组件通过 this.$children 来调用
    sonHandle () {
      console.log('我是子组件的方法')
    },
    // 调用父组件的方法和获取父组件的值
    getParent () {
      console.log(this.$parent)
      console.log(this.$parent.parentTitle) //= > 我是父组件
      this.$parent.parentHandle() //= > 我是父组件的方法
    }
  }
}
</script>
```



## Vue2兄弟传参：bus.js

首先新建 `bus.js` 文件，初始化如下代码：

```html
import Vue from 'vue'
export default new Vue()
```

然后在需要通信的组件中都引入该 `bus` 文件，其中一个文件用来发送，一个文件监听接收。派发事件使用 `bus.$emit`。

下面组件派发了一个叫`setYoungerBrotherData`的事件

```html
<template>
  <div>
    哥哥组件：<button @click="setYoungerBrotherData">给弟弟传参</button>
  </div>
</template>
<script>
import bus from '../assets/bus'
export default {
  methods: {
    setYoungerBrotherData () {
      // 通过 bus.$emit 派发一个事件
      bus.$emit('setYoungerBrotherData', '给弟弟传参')
    }
  }
}
</script>
```

在另一个页面中使用 `bus.$on('setYoungerBrotherData',()=>{})` 监听

```html
<template>
  <div>弟弟组件：{{ msg }}</div>
</template>
<script>
import bus from '../assets/bus'
export default {
  data () {
    return {
      msg: ''
    }
  },
  mounted () {
    // 通过 bus.$on 监听兄弟组件派发的方法
    bus.$on('setYoungerBrotherData', (res) => {
      this.msg = res
    })
  }
}
</script>
```

## Vue2跨级传参：provide/inject

`provide`和`inject`是`vue`生命周期上的两个函数，这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在其上下游关系成立的时间里始终生效。

提示：`provide` 和 `inject` 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的。

祖先组件：

```html
<script>
    export default {
        name: 'Home',
        // 通过 provide 提供的数据可以在该组件层次之下的任何组件使用
        provide () {
            return {
                // 可以传递普通字符串
                provideName: '祖先',
                // 也可以传递一个异步方法
                getOrderInfo: () => {
                    return this.getOrderList()
                }
            }
        },
        methods: {
            // 传递一个异步方法获取数据，用来模拟接口请求
            getOrderList () {
                return new Promise((resolve, reject) => {
                    // 倒计时两秒模拟请求延迟
                    setTimeout(() => {
                        resolve({
                            code: 'WX15485613548',
                            name: '农夫安装工单'
                        })
                    }, 2000)
                })
            }
        }
    }
</script>
```

孙子组件:

```html
<template>
<div>
    {{ bar }}
    <button @click="getOrder">异步获取数据</button>
    </div>
</template>
<script>
    export default {
        // 使用 inject 接收祖先生成的数据
        inject: ['provideName', 'getOrderInfo'],
        data () {
            return {
                // inject 接收的数据可以作为数据的入口
                bar: this.provideName
            }
        },
        mounted () {
            console.log(this.provideName) //= >祖先
        },
        methods: {
            getOrder () {
                // 调用的是父组件的方法,延迟两秒获取数据
                this.getOrderInfo().then(res => {
                 	 console.log(res) //= > {code: "WX15485613548", name: "农夫安装工单"}
                })
            }
        }
    }
</script>

```

使用 `provide/inject`的好处是父组件不需要知道是哪个自组件使用了我的数据，子组件也不需要关心数据从何而来

## 总结

- 父子通信：父向子传递数据通过`props`,子向父传递数据通过`$emit`事件，父链子链使用`$parent/$children`,直接访问子组件实例使用`$refs`
- 兄弟通信：`bus,Vuex`
- 跨级通信：`bus,Vuex,provide/inject`



