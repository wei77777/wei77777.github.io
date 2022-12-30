---
title: 动态合并表格行
tags: Vue
categories: elementui
abbrlink: cc162cf1
date: 2022-06-16 10:21:27
---

实现需求：将客户一样拜访次数列合并成一行展示。如图

![Snipaste_2022-06-16_10-19-41.png](http://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/images/Snipaste_2022-06-16_10-19-41.png)

实现代码

```html
<template>
  <div>
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column prop="itme" label="拜访时间" width="180" />
      <el-table-column prop="name" label="销售人员" />
      <el-table-column prop="customer" label="客户" />
      <el-table-column prop="keshi" label="拜访科室" />
      <el-table-column prop="count" label="拜访次数" />
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // getSpanArr方法中需要用到的两个属性
      spanArr: [],
      pos: 0,
      tableData: [
        {
          itme: '2022-6-6 11:23:47',
          name: '张三',
          customer: '湖北博远达生物科技有限公司',
          keshi: '生殖中心',
          count: 2
        },
        {
          itme: '2022-6-6 11:23:47',
          name: '李四',
          customer: '湖北博远达生物科技有限公司',
          keshi: '生殖中心',
          count: 2
        },
        {
          itme: '2022-6-6 11:23:47',
          name: '王五',
          customer: '中南大学湘雅三医院',
          keshi: '生殖中心',
          count: 2
        },
        {
          itme: '2022-6-6 11:23:47',
          name: '赵六',
          customer: '中南大学湘雅三医院',
          keshi: '生殖中心',
          count: 2
        }
      ]
    }
  },
  mounted() {
    this.getSpanArr(this.tableData)
  },
  methods: {
    //处理数据为合并表格做准备
    getSpanArr(data) {
      // data就是我们从后台拿到的数据
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1)
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          //这里的customer是第一列的属性，我用来判断是否相同。
          if (data[i].customer === data[i - 1].customer) {
            this.spanArr[this.pos] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.pos = i
          }
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // 合并第五列
      if (columnIndex === 4) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          // _row = 0，_col = 0 表示这一次不合并，不显示，
          // _row = 2，_col = 1 表示这一次合并第一列的两行
          rowspan: _row,
          colspan: _col
        }
      }
    }
  }
}
</script>
```

