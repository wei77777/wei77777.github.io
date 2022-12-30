---
title: Hexo提示框
tags: Hexo
abbrlink: f2785101
date: 2021-04-06 09:56:03
---
## 有图标的提示框
{% note default %}
default 提示块标签
{% endnote %}
```
{% note default %}
default 提示块标签
{% endnote %}
```

{% note primary %}
primary 提示块标签
{% endnote %}
```
{% note primary %}
primary 提示块标签
{% endnote %}
```

{% note success %}
success 提示块标签
{% endnote %}
```
{% note success %}
success 提示块标签
{% endnote %}
```

{% note info %}
info 提示块标签
{% endnote %}
```
{% note info %}
info 提示块标签
{% endnote %}
```

{% note warning %}
warning 提示块标签
{% endnote %}
```
{% note warning %}
warning 提示块标签
{% endnote %}
```

{% note danger %}
danger 提示块标签
{% endnote %}
```
{% note danger %}
danger 提示块标签
{% endnote %}
```

## 不带图标的提示框
- 不带图标的写法和上述写法一致只是再代码中加入 `no-icon` 即可
- 栗子 
```
{% note info no-icon %}
info 提示块标签
{% endnote %}
```
  
{% note default no-icon %}
default 提示块标签
{% endnote %}

{% note primary no-icon %}
primary 提示块标签
{% endnote %}

{% note success no-icon %}
success 提示块标签
{% endnote %}

{% note info no-icon %}
info 提示块标签
{% endnote %}

{% note warning no-icon %}
warning 提示块标签
{% endnote %}

{% note danger no-icon %}
danger 提示块标签
{% endnote %}
