---
title: vue裁剪图片插件
tags: Vue
categories: vue开发常用插件
abbrlink: f4ac9b3a
date: 2021-12-30 11:08:56
---

安装,[vue-cropper - npm (npmjs.com)](https://www.npmjs.com/package/vue-cropper)

```shell
npm install vue-cropper --save
```

组件内引入

```js
import { VueCropper }  from 'vue-cropper' 
components: {
  VueCropper
}
```

封装成组件

```html
<template>
  <div>
    <div class="user-info-head" @click="editCropper()">
      <img :src="options.img" title="点击上传头像" />
    </div>
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-row>
        <!-- 左侧编辑图片区域 -->
        <el-col :md="12" :style="{ height: '350px' }">
          <vue-cropper
            ref="cropper"
            :img="options.img"
            :info="true"
            :autoCrop="options.autoCrop"
            :autoCropWidth="options.autoCropWidth"
            :autoCropHeight="options.autoCropHeight"
            :fixedBox="options.fixedBox"
            @realTime="realTime"
          />
        </el-col>

        <!-- 右侧实时预览区域 -->
        <el-col :md="12" :style="{ height: '350px' }">
          <div class="avatar-upload-preview">
            <img :src="previews.url" :style="previews.img" />
          </div>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :lg="2" :md="2">
          <el-upload action="#" :auto-upload="false" :show-file-list="false">
            <el-button size="small">
              选择
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-upload>
        </el-col>
        <el-col :lg="{ span: 1, offset: 2 }" :md="2">
          <!-- 放大按钮 -->
          <el-button
            icon="el-icon-plus"
            size="small"
            @click="changeScale(1)"
          ></el-button>
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <!-- 缩小按钮 -->
          <el-button
            icon="el-icon-minus"
            size="small"
            @click="changeScale(-1)"
          ></el-button>
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <!-- 往左翻转 -->
          <el-button
            icon="el-icon-refresh-left"
            size="small"
            @click="rotateLeft()"
          ></el-button>
        </el-col>
        <el-col :lg="{ span: 1, offset: 1 }" :md="2">
          <!-- 往右翻转 -->
          <el-button
            icon="el-icon-refresh-right"
            size="small"
            @click="rotateRight()"
          ></el-button>
        </el-col>
        <el-col :lg="{ span: 2, offset: 6 }" :md="2">
          <!-- 提交 -->
          <el-button type="primary" size="small" @click="uploadImg()">
            提 交
          </el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: { VueCropper },
  data() {
    return {
      // 是否显示弹出层
      open: false,
      // 弹出层标题
      title: '修改头像',
      options: {
        img: require('../../assets/loginbg2.jpg'), //裁剪图片的地址
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
      },
      previews: {},
    }
  },
  methods: {
    // 编辑头像
    editCropper() {
      this.open = true
    },
    // 向左旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    // 向右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },
    // 图片缩放
    changeScale(num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    // 上传图片
    uploadImg() {
      this.$refs.cropper.getCropBlob((data) => {
        // 这里获取到的data是一个blob类型
        console.log(data)
        // let formData = new FormData()
        // formData.append('avatarfile', data)
        // console.log(formData)
        this.options.img = this.createMiniQrcode(data)
        this.open = false
      })
    },
    // 实时预览
    realTime(data) {
      console.log(data)
      this.previews = data
    },
    // blob转换成base64
    getBase64(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
    },
    // blob转换成图片地址
    createMiniQrcode(blob) {
      return window.URL.createObjectURL(blob)
    },
  },
}
</script>

<style scoped>
.user-info-head {
  position: relative;
  display: inline-block;
  height: 110px;
  width: 110px;
  border-radius: 55px;
  overflow: hidden;
  border: 1px solid #ddd;
}
.user-info-head img {
  width: 100%;
  height: 100%;
}

.user-info-head:hover:after {
  content: '+';
  position: absolute;
  height: 110px;
  width: 110px;
  text-align: center;
  font-size: 25px;
  line-height: 110px;
  border-radius: 50%;
  cursor: pointer;
  color: #eee;
  background: rgba(0, 0, 0, 0.5);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 24px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.avatar-upload-preview {
  position: absolute;
  top: 50%;
  transform: translate(50%, -50%);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;
}
</style>
```

使用
```html
<template>
  <div class="page-content">
      <UserAvatar/>
  </div>
</template>
<script>
import UserAvatar from '../../components/UserAvatar'
export default {
  components: {
    UserAvatar,
  },
}
</script>
```


示例

![](https://blogimages-1257342648.cos.ap-shanghai.myqcloud.com/vue2admin/21.png)
