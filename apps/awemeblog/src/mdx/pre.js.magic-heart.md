---
title: "制作一个点击心心的特效"
author: "hanhan.rich"
description: "制作一个点击心心的特效"
pubDate: "2021.04.15"
---
# 制作一个点击心心的特效

![](https://i.loli.net/2021/04/15/YUdwc3rWvgHs9y4.gif)

> [codepen 上面的在线 demo](https://codepen.io/hanhan9449/pen/LYxmjpJ)

## 前言

在[别人的 hexo 博客](https://sunnyllxx.github.io)中看见了这种效果，所以想制作试试。它可以存在多颗心心，我目前写的是单颗心心。

## 如何实现

### 获取素材

首先我们需要有素材，在这里我使用的 iconfont 上的心心素材。采用的 svg 格式（注意，svg 和 png 更换颜色的方式不一样）。svg 是矢量图，然后在这里使用 fill 属性更换颜色也很方便，也可以兼容到 IE9。

有了素材之后，我们暂时先把它添加到 html 中。然后用 css 更改它的大小。

### 监听点击事件

理论上我们是网页上点击了就会出现一颗心心，所以我们可以在 html 元素上绑定事件。

```javascript
let html = document.documentElement;
// 桌面端
html.addEventListener("click", animation);
// 移动端
html.addEventListener("touchend", animation);
```

### 添加动画

我们观察效果，心心从点击的位置，然后向上飘，最后消失了。可以看出它同时在位置上和透明度上发生了改变。在这里我们可以借助 css3 的`animation`来实现这个动画。

```css
.animation {
  animation: 600ms up;
}

@keyframes up {
  from {
    /* 之所以使用transform这样偏移，是为了心心的最下面的点在我们鼠标点击的位置*/
    transform: translate(-50%, -100%);
  }
  to {
    transform: translate(-50%, -350%);
    opacity: 0;
  }
}
```

### 在 js 中触发动画

那么问题来了，怎么触发动画呢？我在网上查阅资料后发现可以通过添加有动画的那个 class，然后移除这个 class 来实现触发动画。

但是这里面有**一个坑点**！大家把浏览器的宏任务微任务渲染流程背熟了！如果你在这次事件的回调函数中移除了然后添加上这个类，实际上是没有动画触发的。这些都发生在同一个帧里面，所以对于浏览器来说就好像是 class 没有发生变化。

那我们就明白了。要想让浏览器触发动画，让浏览器重绘，就需要在这次渲染中移除动画类，然后在下一次渲染添加动画类，让浏览器重绘我们的动画。因此我发现使用`setTimeout`，设置时间 16，可以很好的达到触发效果。

```javascript
let animation = (e) => {
  heart.style.left = e.clientX;
  heart.style.top = e.clientY;

  heart.classList.remove("animation");
  setTimeout(() => {
    // heart.fill = randomColor()
    heart.setAttribute("fill", randomColor());
    heart.classList.add("animation");
  }, 16);
};
```

但如果我们设置时间为 0 或者不设置时间，仍然会出现问题。这是为什么呢？

TODO：未完待续。

### 实现随机颜色

前面我说了我使用的是 svg 格式的矢量图，改变颜色我们可以改变 svg 元素上的 fill 属性。但这里需要注意的是，我们没有办法通过`heart.fill = 'aabbcc'`更换颜色，而是需要调用`setAttribute`方法来设置属性。

```javascript
heart.setAttribute("fill", randomColor());
```

#### 实现 randomColor 函数

fill 属性接受的是一个类似`#rrggbb`的字符串，当然 rgb 以及 hsl 格式的理论上也是支持的。这里说说怎么生成一个`#rrggbb`的随机字符串。

`#rrggbb`实际上是`rgb(nnn,nnn,nnn)`
的简写，因此 aa、bb、cc 的范围都是 0-255，所以我们只需要生成三个随机数，然后将他们转为 16 进制的字符串，最后将他们拼接在一起就可以了。这里我们发现 r、g、b 生成都是一样的方法，因此我们将生成过程抽象成一个函数。注意这里需要判断一个事情，如果将 10 进制转为了 16 进制，如果字符串长度只有 1，我们需要补充为两位，才符合颜色的表示方法。

```javascript
function randomColor() {
  function randomColorNumber() {
    // 注：~是取反，~~在这里的作用是取整
    let n = ~~(Math.random() * 256);
    let ret = n.toString(16);
    if (ret.length === 1) {
      ret = "0" + ret;
    }
    return ret;
  }

  let r = randomColorNumber();
  let g = randomColorNumber();
  let b = randomColorNumber();
  let ret = `#${r}${g}${b}`;
  // console.log(ret);
  return ret;
}
```

最后就实现好了我们的效果了。

> [codepen 上面的在线 demo](https://codepen.io/hanhan9449/pen/LYxmjpJ)

## 存在的问题

1. 可移植性待增强。目前 html，css，js 都是写在三个分开的文件中的，如果写在一个文件里面，作为一个添加特效的代码就更加方便。当然我们也可以使用 webpack 打包。

2. 可扩展性待增强。目前实现的效果只能同时存在一颗心心，因为我都是用的一个 Element 实现的。将 Element 抽象到 js 中之后，可以提供选择让用户选择采用单例模式还是多例模式。

## 展望

1. 作为练习，可以尝试把它作为库进行打包，然后添加到基于 angular 写的博客中。

## END

### 引用

1. [鑫空间-纯 CSS 实现任意格式图标变色的研究](https://www.zhangxinxu.com/wordpress/2018/11/css-change-icon-color/)
