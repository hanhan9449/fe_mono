---
title: "做一个评价时的星星特效"
author: "hanhan.rich"
description: "做一个评价时的星星特效"
pubDate: "2021.04.02"
---
# 做一个评价时的星星特效

> https://codepen.io/hanhan9449/pen/JjEWwgV
>
> 星星素材：https://www.iconfont.cn/search/index?searchType=icon&q=star&page=1&fromCollection=1&fills=&tag=
>
> codepen 不能上传素材我就把 svg 内联了，有点影响美观。

这个是我们最终做出来的效果。👇

![](https://i.loli.net/2021/04/12/kQW2I9vmxTaUcHq.gif)

做这个效果需要了解一下 css，所以我先介绍一下 css 吧。

## 选择符介绍

> https://codepen.io/hanhan9449/pen/LYxQeBV
>
> 这是下面选择器的演示哦。

css 里面有很多的选择符，有大家常用的(` `)（这是一个空格）,（`>`），还有大家不常用的(`+`),(`~`),(`||`)。

### 后代选择符(` `)

![](https://i.loli.net/2021/04/12/Ou3BNDe8C2TVUiF.png)

后代选择符就是选择当前元素的所有后代（被当前盒子包裹住的盒子），如果符合选择符条件，就被选择了。

```pug
.wrap
  h2 后代选择符（空格）
  .x.x1
    .x
      .x
        .x
          .x
```

```css
/* 后代选择符，选择所有的后代 */
.x1 .x {
  background-color: rgba(60, 0, 0, 0.3);
}
```

### 子选择符(`>`)

![](https://i.loli.net/2021/04/12/uhMGKXcqRtYilEa.png)

子选择符就是选择当前元素的下一层级后代，例如与`.x2`的**所有儿子 👦`.x`**，不会选择它的孙子。可以与后代选择符配合理解。

```pug
.wrap
  h2 子选择符（>）
  .x.x2
    .x
      .x
        .x
          .x
```

```css
/* 子选择符，只选择相邻的那个盒子 */
.x2 > .x {
  background-color: rgba(60, 0, 0, 0.3);
}
```

### 相邻兄弟选择符(`+`)

![](https://i.loli.net/2021/04/12/CTO1LMxdAUf26lk.png)

相邻兄弟选择符选择相邻的那个一个兄弟 👬。

```pug
.wrap
  h2 相邻兄弟选择符（+）
  .x.x3-outer
    .x.x3-inner
    .x
    .x
    .x
```

```css
.x3-inner + .x {
  background-color: rgba(60, 0, 0, 0.3);
}
```

### 随后兄弟选择符(`~`)

![](https://i.loli.net/2021/04/12/gJRekGZD5prC7Xo.png)

随后兄弟选择符选择随后的所有符合条件的兄弟 👬。

```pug
.wrap
  h2 随后兄弟选择符（~）
  .x.x3-outer
    .x.x4-inner
    .x
    .x
    .x
```

```css
.x4-inner ~ .x {
  background-color: rgba(60, 0, 0, 0.3);
}
```

## 实现我们的星星特效

![演示图片](https://i.loli.net/2021/04/12/kQW2I9vmxTaUcHq.gif)

### 思路分析

这些效果当然可以用 js 做到，那能不能用 css 做出来呢？上面我们介绍了很多选择符，根据这里的例子，我们发现最适合这里的选择符是**随后兄弟选择符**(~)。

但是吧，随后兄弟选择符是选择的 html 中在后面的元素，而不是选择的前面的。所以在这里我们需要用一些方法，使我们 html 和页面呈现的顺序是相反的。我们可以使用`direction: ltr`
；也可以使用 flex 布局，然后配合上`flex-direction: row-reverse`来实现。在这里我采用了第二种办法。

### 代码实现

> https://codepen.io/hanhan9449/pen/JjEWwgV

```html
<!--这里我把codepen里面的html简化了一下-->
<section class="container">
  <span id="a">xxxx</span>
  <span id="b">xxxx</span>
  <span id="c">xxxx</span>
  <span id="d">xxxx</span>
  <span id="e">xxxx</span>
</section>
<div id="information" class="information"></div>
```

```css
.icon {
  width: 2rem;
  height: 2rem;
}

span {
  filter: grayscale(1);
  transition: all 0.1s ease-in-out;
  cursor: pointer;
}

span:hover ~ span {
  filter: grayscale(0);
}

span:hover {
  filter: grayscale(0);
}

.container {
  /*   direction: rtl; */
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
}

.information {
  font-size: 0.8em;
  font-weight: 400;
  color: gray;
}
```

## END

参考资料：

1. 张鑫旭老师的《CSS 选择器世界》。
