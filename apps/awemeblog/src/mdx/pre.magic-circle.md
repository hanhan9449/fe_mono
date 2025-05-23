---
title: "点击就可以改变颜色的圆"
author: "hanhan.rich"
description: "点击就可以改变颜色的圆"
pubDate: "2021.11.14"
---
# 点击就可以改变颜色的圆

效果可以直接在网页中体验。（应该可以

## 体验区

<div class="boxxx circle" data-colorful></div>
<style>
.boxxx {
  width: 100px;
  height: 100px;
  background: var(--color, rgb(0 0 0 /30%));
  transition: background 0.3s ease;
}
.circle {
  border-radius: 50%;
}
</style>
<script>
const boxxx = document.querySelector("[data-colorful]");
function randomColorFn() {
  return "#" + ('00000'+(Math.random()*0xffffff>>>0).toString(16)).slice(-6);
}
boxxx.addEventListener("click", function (e) {
  const color = randomColorFn();
  console.debug(color);
  e.target.style.setProperty("--color", color);
});
</script>

## 代码

```html
<div class="boxxx circle" data-colorful></div>
```

```css
.boxxx {
  width: 100px;
  height: 100px;
  background: var(--color, rgb(0 0 0 /30%));
  transition: background 0.3s ease;
}
.circle {
  border-radius: 50%;
}
```

```javascript
const boxxx = document.querySelector("[data-colorful]");
function randomColorFn() {
  return "#" + ('00000'+(Math.random()*0xffffff>>>0).toString(16)).slice(-6);
}
boxxx.addEventListener("click", function (e) {
  const color = randomColorFn();
  console.debug(color);

  e.target.style.setProperty("--color", color);
});
```