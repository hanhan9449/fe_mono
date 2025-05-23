---
title: "事件冒泡捕获与委托"
author: "hanhan.rich"
description: "事件冒泡捕获与委托"
pubDate: "2021.03.31"
---

## 冒泡与捕获

<style>
  #qqqqw1 {
    width: 300px;
    height: 300px;
    background-color: antiquewhite;
  }

  #qqqqw2 {
    width: 80%;
    height: 80%;
    background-color: #2ad096;
  }

  #qqqqw3 {
    width: 80%;
    height: 80%;
    background-color: cadetblue;
  }

  #qqqqbutton, #qqqqa {
    font-size: 1rem;
  }
</style>

<div id="qqqqw1">
  <div id="qqqqw2">
    <div id="qqqqw3">
      <button id="qqqqbutton">按钮</button>
      <a href="https://www.baidu.com" id="qqqqa">百度一下</a>
    </div>
  </div>
</div>

---

打开开发者工具并复制下面的代码到 console 运行，随后点击上面查看事件冒泡与捕获。

> - capture：捕获
> - bubble：冒泡

```javascript
const qqqqw1 = document.querySelector("#qqqqw1");
const qqqqw2 = document.querySelector("#qqqqw2");
const qqqqw3 = document.querySelector("#qqqqw3");
const a = document.querySelector("#qqqqa");
const button = document.querySelector("#qqqqbutton");

{
  qqqqw1.addEventListener("click", function (e) {
    console.log("最外层 bubble");
  });
  qqqqw2.addEventListener("click", function (e) {
    console.log("中间层 bubble");
  });
  qqqqw3.addEventListener("click", function (e) {
    console.log("最里层 bubble");
  });
  qqqqw1.addEventListener(
    "click",
    function (e) {
      console.log("最外层 capture");
    },
    true
  );
  qqqqw2.addEventListener(
    "click",
    function (e) {
      console.log("中间层 capture");
    },
    true
  );
  qqqqw3.addEventListener(
    "click",
    function (e) {
      console.log("最里层 capture");
    },
    true
  );
}
a.addEventListener("click", function (e) {
  // 阻止默认事件发生
  e.preventDefault();
  // 阻止冒泡
  e.stopPropagation();
});
```

## 事件委托（事件代理）

如果我们有一个列表，需要为每一个列表中的元素绑定差不多相同的事件，如果每一列都绑定，我们占据的内存无疑会大大增加。采用事件捕获，即在列表上绑定，然后判断点击的元素是哪一个子元素，就叫事件绑定。
