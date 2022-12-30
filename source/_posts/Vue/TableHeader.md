---
title: ElementUI自定义表格多选表头
tags: Vue
categories: elementui
abbrlink: 1b944d85
date: 2022-06-16 09:48:36
---

首先开局一张图

![VeryCapture_20220616091522.gif](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/VeryCapture_20220616091522.gif)

需求说明，如图所示，表格中的每一行是一个复选框，点击表头的复选框，需要吧每一行中的复选框选中，当行中的复选框全部选中时自动勾选上表头的。

在UI框架中只提供了给第一列添加多选的功能，无法实现上面的功能。所以特此写下此篇博客以供有类似需求的小伙伴借鉴。

要想实现上面功能，这里用到了ElementUI中table组件的 render-header 函数，这个方法的作用可以自定义表头渲染，返回的是一个 render 方法。具体代码如下

```html
<template>
  <div class="curd-btn">
    <el-table
        :data="tableData"
        stripe
        style="width: 100%; margin-top: 15px"
        border
      >
        <el-table-column prop="date" label="相关业务对象名称" />
        
        <!-- 业务对象拥有人 -->
        <el-table-column :render-header="renderHeader">
          <template slot-scope="scope">
            <el-checkbox
              v-model="scope.row.ownerchecked"
              @change="changeOwen"
            />
          </template>
        </el-table-column>

        <!-- 业务对象团队成员 -->
        <el-table-column :render-header="renderHeader2">
          <template slot-scope="scope">
            <el-checkbox
              v-model="scope.row.memberchecked"
              @change="changeMember"
            />
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
export default {  
  data() {
    return {
      tableData: [
        { date: '联系人'},
        { date: '送检客户'}
      ]
    }
  },
  methods: {
    // 自定义渲染业务对象团队成员表头
    renderHeader(h) {
      return h('div', [
        h('input', {
          style: 'margin-right:5px',
          // 普通的 HTML 属性
          attrs: {
            id: 'check1',
            type: 'checkbox'
          },
          on: {
            change: ($event) => {
              // $event 表示当前点击的 checkbox 元素本身
              // 遍历整个表格数据设置每一行的ownerchecked状态和表头的复选框状态一致，实现批量选中和取消功能
              this.tableData.forEach((item) => {
                this.$set(item, 'ownerchecked', $event.target.checked)
              })
            }
          }
        }),
        h('span', '业务对象拥有人')
      ])
    },
    // 自定义渲染业务对象团队成员表头
    renderHeader2(h) {
      return h('div', [
        h('input', {
          style: 'margin-right:5px',
          // 普通的 HTML 属性
          attrs: {
            id: 'check2',
            type: 'checkbox'
          },
          on: {
            change: ($event) => {
              this.tableData.forEach((item) => {
                this.$set(item, 'memberchecked', $event.target.checked)
              })
            }
          }
        }),
        h('span', '业务对象团队成员')
      ])
    },
    // 点击每一行时判断是否勾选表头的全选
    remderOwnerCheck() {
      const check = document.getElementById('check1')
      check.checked = this.tableData.every((i) => i.ownerchecked)
    },
    // 点击每一行时判断是否勾选表头的全选
    remderMemberCheck() {
      const check = document.getElementById('check2')
      check.checked = this.tableData.every((i) => i.memberchecked)
    },
    // 改变每一行的拥有人触发
    changeOwen() {
      this.remderOwnerCheck()
    },
    changeMember() {
      this.remderMemberCheck()
    }
  }
}
</script>
```

上面的代码实现了点击表头改变行选中的功能。现在我们考虑下面的需求：进入页面时根据后台返回的数据自动勾选

实现这个需求之前你可能会疑惑为什么要把 remderOwnerCheck 和 remderMemberCheck 两个方法单独抽离出来，这就是为了实现这个需求而铺路的

先手动改变一下 tableData 数组的值，模拟后台返回的数据,然后当接口响应成功后调用这两个方法

```js
// 延迟一秒模拟后台请求返回
setTimeout(() => {
    this.tableData = [
        { date: '联系人', ownerchecked: true, memberchecked:false},
        { date: '送检客户', ownerchecked: true, memberchecked:true }
    ]
    // 接口返回后调用这两个方法判断是否应该勾选表头的复选框
    this.remderOwnerCheck()
    this.remderMemberCheck()
}, 1000)
```

效果展示

![VeryCapture_20220616093704.gif](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/VeryCapture_20220616093704.gif)





