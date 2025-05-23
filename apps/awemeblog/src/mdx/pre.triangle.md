---
title: "如何用 CSS 画三角形和半圆？"
author: "hanhan.rich"
description: "如何用 CSS 画三角形和半圆？"
pubDate: "2021.03.31"
---

> https://codepen.io/hanhan9449/pen/gOgMRBL

## 三角形

我们可以采用设置相邻边的 border 来画三角形，也可以采用设置三条相邻边的 border 来画三角形。

<style>
.triangle {
width: 0;
height: 0;
border-left: 100px solid transparent;
border-top: 100px solid rgb(24, 134, 238);
border-right: 100px solid transparent;
}
.hhhhflex {
display: flex;
}
.triangle2 {
width: 0;
height: 0;
border-left: 100px solid transparent;
border-bottom: 100px solid rgb(0, 172, 91);
}
.triangle3 {
width: 0;
height: 0;
border-right: 100px solid transparent;
border-bottom: 100px solid rgb(225 210 16);
}
</style>

<div class="hhhhflex">
  <div class="triangle2"></div>
  <div class="triangle3"></div>
</div>
<div class="triangle"></div>

```html
<div class="flex">
  <div class="triangle2"></div>
  <div class="triangle3"></div>
</div>
<div class="triangle"></div>
```

```css
.triangle {
  width: 0;
  height: 0;
  border-left: 100px solid transparent;
  border-top: 100px solid rgb(24, 134, 238);
  border-right: 100px solid transparent;
}

.flex {
  display: flex;
}

.triangle2 {
  width: 0;
  height: 0;
  border-left: 100px solid transparent;
  border-bottom: 100px solid rgb(0, 172, 91);
}

.triangle3 {
  width: 0;
  height: 0;
  border-right: 100px solid transparent;
  border-bottom: 100px solid rgb(225 210 16);
}
```

## 画圆

画半圆有两种方式，一种是宽高与`border-radius`配合直接画一个半圆，一种是先用`border-radius`画一个圆，再用`clip-path`裁剪掉半个圆

注，我这里用`margin-top: -50px;`是为了定位，大家可以打开开发者工具自行调试。

<style>

.circle {
  width: 100px;
  height: 50px;
  background-color: rgb(255, 187, 60);
  border-radius: 50px 50px 0 0;
}
.circle2 {
  width: 100px;
  height: 100px;
  background-color: rgb(236 110 110);
  border-radius: 50%;
  clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
  margin-top: -50px;
}

</style>

<div class="circle"></div>
<div class="circle2"></div>

```html
<div class="circle"></div>
<div class="circle2"></div>
```

```css
.circle {
  width: 100px;
  height: 50px;
  background-color: rgb(255, 187, 60);
  border-radius: 50px 50px 0 0;
}

.circle2 {
  width: 100px;
  height: 100px;
  background-color: rgb(236 110 110);
  border-radius: 50%;
  clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
  margin-top: -50px;
}
```
