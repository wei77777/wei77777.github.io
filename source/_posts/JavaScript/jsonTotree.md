---
title: 将数据转成树形结构
tags: JavaScript
categories: JS常用功能
abbrlink: fb8105ee
date: 2022-07-13 14:55:29
---

如题：
<img src="https://img-blog.csdnimg.cn/d6303635304d41e882de3be3d6696abc.jpeg" alt="请添加图片描述" style="zoom: 50%;" />
实现代码

```javascript
let json1 = [
    {
        id: 1
    },
    {
        id: 2,
        parentId: 1
    },
    {
        id: 3
    },
    {
        id: 4,
        parentId: 3
    },
    {
        id: 5,
        parentId: 4
    }
]

function set(list) {
    // 获取父数据
    let parents = list.filter(item => !item.parentId)
    // 获取父数据
    let childs = list.filter(item => item.parentId)
    function setTreeList(parents, childs) {
        parents.forEach((par, i) => {
            childs.forEach((chil, j) => {
                // 如果父id和子数据的parentId相同则往父数据的childs属性上赋值
                if (par.id === chil.parentId) {
                    par.childs = par.childs ? par.childs.push(chil) : [chil]
                    // 拷贝一份子数据
                    let newChilds = JSON.parse(JSON.stringify(childs))
                    // 将当前已经找到的数据删除掉，递归继续遍历，提高运行效率
                    newChilds.splice(j, 1)
                    // 递归遍历，拿着当前的子数据去找是否还有三级数据
                    setTreeList([chil], newChilds)
                }
            })
        });
    }
    setTreeList(parents, childs)
    return parents;
}

console.log(JSON.stringify(set(json1), null, 2));
```
运行效果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/051b41f766724313a79df28e1a908219.png)
