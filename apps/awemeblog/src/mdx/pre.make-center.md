---
title: "如何实现垂直居中布局"
author: "hanhan.rich"
description: "如何实现垂直居中布局"
pubDate: "2021.03.31"
---

## flex+外部盒子设置属性

<div style="height: 200px;width: 200px;background-color: #7f887f;display: flex;justify-content: center;align-items: center;">
  <div style="height: 50%;width: 50%;background-color: #eaecef;"></div>
</div>

```html
<div class="container">
  <div class="box"></div>
</div>
```

```css
.container {
  width: 300px;
  height: 300px;
}

.box {
  width: 50%;
  height: 50%;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

## flex+margin

除了使用 flex 的属性控制主轴和副轴，还可以使用`margin:auto;`，这个涉及到了 FFC(flex format context)。

<div style="height: 200px;width: 200px;background-color: #7f887f;display: flex;">
  <div style="height: 50%;width: 50%;background-color: #eaecef;margin: auto;"></div>
</div>

```html
<div class="container">
  <div class="box"></div>
</div>
```

```css
.container {
  width: 300px;
  height: 300px;
}

.box {
  width: 50%;
  height: 50%;
}

.container {
  display: flex;
}

.box {
  margin: auto;
}
```

## grid 属性布局

<div style="height: 200px;width: 200px;background-color: #7f887f;display: grid;">
  <div style="height: 50%;width: 50%;background-color: #eaecef;align-self: center;justify-self: center;"></div>
</div>

```html
<div class="container">
  <div class="box"></div>
</div>
```

```css
.container {
  width: 300px;
  height: 300px;
}

.box {
  width: 50%;
  height: 50%;
}

.container {
  display: grid;
}

.box {
  align-self: center;
  justify-self: center;
}
```

## grid+margin 布局

<div style="height: 200px;width: 200px;background-color: #7f887f;display: grid;">
  <div style="height: 50%;width: 50%;background-color: #eaecef;margin: auto;"></div>
</div>

```css
.container {
  width: 300px;
  height: 300px;
}

.box {
  width: 50%;
  height: 50%;
}

.container {
  display: grid;
}

.box {
  margin: auto;
}
```

## 内部盒子绝对定位+外部盒子相对定位

<div style="height: 200px;width: 200px;background-color: #7f887f;position: relative;">
  <div style="height: 50%;width: 50%;background-color: #eaecef;position: absolute;top:50%;left: 50%;transform: translate(-50%,-50%)"></div>
</div>

```html
<div class="container">
  <div class="box"></div>
</div>
```

```css
.container {
  height: 200px;
  width: 200px;
  background-color: #7f887f;
  position: relative;
}

.box {
  height: 50%;
  width: 50%;
  background-color: #eaecef;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

## 内部盒子绝对定位+外部盒子相对定位+margin:auto

<div style="height: 200px;width: 200px;background-color: #7f887f;position: relative;">
  <div style="height: 50%;width: 50%;background-color: #eaecef;position: absolute;top:0;left: 0;right: 0;bottom: 0;margin: auto;"></div>
</div>

```html
<div class="container">
  <div class="box"></div>
</div>
```

```css
.container {
  height: 200px;
  width: 200px;
  background-color: #7f887f;
  position: relative;
}

.box {
  height: 50%;
  width: 50%;
  background-color: #eaecef;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
```

## 表格布局居中

<div style="height: 200px;width: 200px;background-color: #7f887f;display: table">
  <div style="height: 100px;width: 100px;background-color: #eaecef;display:table-cell; vertical-align:center;transform: scale(.5)" ></div>
</div>

```html
<div class="container">
  <div class="box"></div>
</div>
```

```css
.container {
  height: 200px;
  width: 200px;
  background-color: #7f887f;
  display: table;
}

.box {
  height: 100px;
  width: 100px;
  background-color: #eaecef;
  display: table-cell;
  vertical-align: center;
  transform: scale(0.5);
}
```
