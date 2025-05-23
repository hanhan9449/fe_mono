---
title: "制作一个瀑布流"
author: "hanhan.rich"
description: "制作一个瀑布流"
pubDate: "2021.04.09"
---

> 效果预览
>
> https://stackblitz.com/edit/angular-ivy-lfkjdp
>
> 下面的lorem图片采用的 https://picsum.photos 的。

## 前言

我们在淘宝，京东等应用常常看到这种瀑布流效果。就是这种左右两边的内容流上下不对齐的感觉，像是一个瀑布一样。最早采用此布局的网站是Pinterest，因此瀑布流也被有些人称为pinterest布局。瀑布流的主要特性便是错落有致，缓解了用户的用户疲劳。

![](https://i.loli.net/2021/04/09/u8npVEXlBhAz6Mb.png)

那么我们也来动手实现一个吧。



## 实现思路

### 使用一个flex容器来实现

由于图片的长和宽都是没有统一的，所以卡片的大小也是没有统一的。但是我们可以用flex，grid布局等强制设置他的宽度为50%。具体实现上是：

```angular2html
<div class="container1">
  <app-card class="card1" *ngFor="let item of itemList$|async" [item]="item"></app-card>
</div>
```

注：我采用angular框架渲染的网页。```app-card```是angular中的一个组件。大家主要了解下面的css。

```css
.container1 {
  display: flex;
  flex-wrap: wrap;
}
.card1 {
  width: 0;
  flex: 0 1 50%;
}
```

如果我们这样实现，他们的宽度倒是可以很好的固定成50%，但是他们的高度就出现了问题了。如下图：

![image-20210409123611410](https://i.loli.net/2021/04/09/MWX6O8H2KFSJkU5.png)

由于flex的特性，每一行的高度都是由最高的那个card撑开的。显然不能实现我们想要的瀑布流效果。

### 采用两个盒子来实现

标题写的是采用两个盒子，但是我使用了一个flex盒子容纳两个子盒子。

既然由于flex的特性，我们使用一个flex盒子无法实现这个效果，我们不禁思考可不可以通过两个盒子，然后每个盒子自己设置固定宽度50%，不就实现了瀑布流效果吗？

说干就干，我们通过`Array#filter`将数组按照index分块，按照效果分成了两部分。

```javascript
ngOnInit() {
    this.itemList$ = this.itemService.findAll();
    this.leftItemList$ = this.itemList$.pipe(
      map(it => it.filter((v, i) => ~i & 1))
    );
    this.rightItemList$ = this.itemList$.pipe(
      map(it => it.filter((v, i) => i & 1))
    );
  }
```

```angular2html
<!-- 使用三个flex容器 -->
<div class="container2">
  <div class="left-container">
    <app-card
      class="card"
      *ngFor="let item of leftItemList$|async"
      [item]="item"
    ></app-card>
  </div>
  <div class="right-container">
    <app-card
      class="card"
      *ngFor="let item of rightItemList$|async"
      [item]="item"
    ></app-card>
  </div>
</div>
```

```css
.container2 {
  display: flex;
}
.container2 > div {
  flex: 0 1 50%;
}
```

然后就实现了下图中的效果。

![](https://i.loli.net/2021/04/09/FzMxd7nOK9Uv62o.png)

### 基于grid布局实现



todo

## 存在的问题

在h5中，如果图片一开始没有给定高度和宽度，那么图片的高度和宽度都是由浏览器给定的默认值。加载图片之后视图被撑开了，会带来反复的回流等问题，导致用户的体验并不好。因此我们可以用骨架图等方式预先占据没有加载出的图片位置，图片加载完成之后，再用加载好的图片替换骨架图。给用户带来良好的体验。
