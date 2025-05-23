---
title: "关于 position"
author: "hanhan.rich"
description: "关于 position"
pubDate: "2021.04.04"
---

## 前言

不知道大家熟不熟悉 css 里面的`position`属性呢？position 就是定位的意思，那他的各种属性肯定也是和定位息息相关的。那下面我用大白话讲讲什么是 position。

种类：

1. static (默认)
2. relative
3. absolute
4. fixed
5. sticky

## static 定位

static 是我们 css 中默认的布局方式，意味这个元素将按照默认的方式在布局流中布局。对他作用 top，left，right，bottom 等属性无效。

## relative 定位

> https://codepen.io/hanhan9449/pen/poRpeMm
>
> 其中 x4 是相对布局，它原来在 x2 里面，和 x2 重合了，但是对他作用了相对布局，就把它向右下角移动了。

设置为 relative 意味着相对于在布局流中原来的位置进行布局。对他作用 top，left，right，bottom 属性有效。意味着原来在哪里，作用上面的属性后就相对于原来的位置进行偏移。

## absolute 定位

> https://codepen.io/hanhan9449/pen/poRpeMm

```pug
.absolute.x.x1 x1
  .absolute.x.x2 x2
    .x.x4.relative x4
      .absolute.x.x3 x3
```

设置 absolute 之后，该元素会相对最近的一个 position**不是 static**（只要不是 static 就会相对他定位！）的盒子进行绝对定位，也就是相对于父元素的左上角进行定位。

### 没有非 static 元素时相对于什么定位

![](https://i.loli.net/2021/04/10/8ZtVqlAcrQPUXzD.png)

根据我的实验，我认为时相对于 html 元素进行定位。

## fixed 定位

fixed 挺好理解的，就是相对于视口进行定位（viewport）。设置这个属性会触发 bfc。

## sticky 定位

> https://codepen.io/hanhan9449/pen/oNBWKpM

**相对于离他最近的一个 bfc 盒子**，如果设置了 sticky 的盒子到了自己应该 sticky 的地方，就会 stick 住。

包裹 sticky 盒子的盒子在布局流中移动到了 sticky 盒子定位的地方，这个 sticky 盒子就只能被包裹他的盒子带走了。看 codepen 的演示。

### sticky 元素放在分了段的盒子中

注：下面分段的一次是被包裹在一个块级盒子中(section)

```pug
.container
  h1 一大群绕口令，分段放
  section.overflow-h
    h2.sticky.h2.h2-1
    p
  section
    h2.sticky.h2.h2-2
    p
  section
    h2.sticky.h2.h2-3
    p
```

![每段都被包裹](https://i.loli.net/2021/04/04/8qa6yMlG2x4LvQS.gif)

注意到第一个 section 盒子由于设置了`overflow:hidden;`，因此 sticky 作用于当前 section 范围内，就被一起带走了。下面两个盒子可以看出顶替的感觉。

### sticky 元素被放在了没有分段的盒子中

```pug
.container
  h1 一大群绕口令，没有分段放
  h2.sticky.h2.h2-1
  p
  h2.sticky.h2.h2-2
  p
  h2.sticky.h2.h2-3
  p
```

![](https://i.loli.net/2021/04/04/vetR7imM2YUVkSW.gif)

没有分段，sticky 元素还是在以前的那个位置。

## 关于 bfc 的触发

> https://codepen.io/hanhan9449/pen/BapRExa

![](https://i.loli.net/2021/04/04/M5XPZWHoViOT2Jn.gif)

我们将 position 设置成 absolute 或者 fixed 都会触发 bfc。

todo
