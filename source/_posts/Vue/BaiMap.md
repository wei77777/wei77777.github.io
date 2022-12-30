---
title: 使用百度地图查询地址
tags: Vue
categories: vue开发常用插件
abbrlink: 43dbb258
date: 2021-12-30 13:22:49
---

首先申请一个 ak，详情[点击这里](https://lbsyun.baidu.com/apiconsole/key#/home) 

之后根据[官方文档](https://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-placeapi)我们调用如下接口

```js
https://api.map.baidu.com/place/v2/search?query=中南大学湘雅医院&region=全国&output=json&ak=您的ak //GET请求
```

调用成功后返回的数据如下

```json
{
    "status":0,
    "message":"ok",
    "result_type":"poi_type",
    "results":[
        {
            "name":"中南大学湘雅医院",
            "location":{
                "lat":28.217917,
                "lng":112.991041
            },
            "address":"长沙市开福区湘雅路87号",
            "province":"湖南省",
            "city":"长沙市",
            "area":"开福区",
            "street_id":"a5ef680f314baaceb8df8fb0",
            "telephone":"(0731)89753999",
            "detail":1,
            "uid":"a5ef680f314baaceb8df8fb0"
        },
    ]
}
```

我们还可以根据经纬度来获取在地图上显示出来，这里引入第三方插件 [vue-baidu-map](https://dafrok.github.io/vue-baidu-map/#/)

```shell
$ npm install vue-baidu-map --save
```

然后在 `main.js` 中全局注册

```js
import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'YOUR_APP_KEY'
})
```

然后封装一个展示地图组件

- center 设置中心经纬度
- zoom 设置缩放等级
- scroll-wheel-zoom 设置鼠标可缩放地图

```html
<template>
  <baidu-map
    class="map"
    :center="{ lng: lng, lat: lat }"
    :zoom="15"
    :scroll-wheel-zoom="true"
  >
    <bm-marker
      :position="{ lng: lng, lat: lat }"
      :dragging="true"
      animation="BMAP_ANIMATION_BOUNCE"
    >
    </bm-marker>
  </baidu-map>
</template>

<script>
export default {
  data() {
    return {
      lng: 116.404,
      lat: 39.915,
    }
  },
  methods: {
    setLoacl(lng, lat) {
      this.lng = lng
      this.lat = lat
    },
  },
}
</script>

<style>
.map {
  margin-top: 20px;
  width: 100%;
  height: 300px;
}
</style>
```

在页面中使用封装好的组件，只需要调用组件中的 `setLoacl` 方法，传入经纬度即可展示该位置信息

```ht
<div>
	<Map ref="map"></Map>
</div>

<script>
import Map from './component/Map.vue'
export default {
  components: {
    Map,
  },
  methods: {
    lookMap(row) {
      this.$refs.map.setLoacl(row.location.lng, row.location.lat)
    },
  },
}
</script>
```

示例

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vue2admin/22.png)