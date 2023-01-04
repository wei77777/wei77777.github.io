---
title: 'Base64,Blob,File 之间互转'
tags: JavaScript
categories: JS常用功能
abbrlink: 1d02c840
date: 2022-02-16 15:51:27
---

## Base64转Blob

```js
base64ToBlob(base64Data) {
    let arr = base64Data.split(','),
        fileType = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        l = bstr.length,
        u8Arr = new Uint8Array(l)

    while (l--) {
        u8Arr[l] = bstr.charCodeAt(l)
    }
    return new Blob([u8Arr], {
        type: fileType,
    })
}
```

## Blob转File

```js
blobToFile(blob, fileName) {
    return new File([blob], `${fileName}.png`)
},
```

## Blob转临时路径

```js
blobToUrl(blob) {
    return window.URL.createObjectURL(blob)
},
```

## Echarts图导出Base64

```js
// 基于准备好的dom，初始化echarts实例
let myChart = echarts.init(document.getElementById('tmb_app'))
// 绘制图表
myChart.setOption(option)
// 获取图片地址 - base64
let baseImage = myChart.getDataURL()
```

