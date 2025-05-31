---
title: "关于 bfc gfc ffc 以及包裹性的探讨"
author: "hanhan.rich"
description: "关于 bfc gfc ffc 以及包裹性的探讨"
pubDate: "2021.03.31"
---

## 例子

<style>
.example {
  overflow: hidden;
}
.inner {
  background-color: #7392b3;
  min-height: 30px;
  min-width: 30px;
  margin: auto;
}
.flex {
  display: flex;
}
.grid {
  display: grid;
}
.block {
  display: block;
}
.inline-block {
  display: inline-block;
}
.inline {
  display: inline;
}
.float {
  float: left;
}
.container {
  margin: 20px 0;
}

</style>

<section class="example">

<div class="flex container">
  <div class="inner">你好flex世界👋</div>
</div>
<div class="grid container">
  <div class="inner">你好grid世界👋</div>
</div>
<div class="block container">
  <div class="inner">你好block世界👋</div>
</div>
<div class="inline-block container">
  <div class="inner">你好inline-block世界👋</div>
</div>
<div class="inline container">
  <div class="inner">你好inline世界👋</div>
</div>
<div class="float container">
  <div class="inner">你好float世界👋</div>
</div>

</section>

## 探讨

> 这些知识来自 zxx 老师的《CSS 世界》的启发。

正如我们所见，在 flex、grid、float、inline-block 盒子上都展现了包裹性，但这几个分为两种。

flex、grid 是内部产生了 ffc 和 gfc，从而使内部盒子产生了包裹性。

而 inline-block、float 是外部盒子具有包裹性。使内部盒子宽度不得不收到最小。

说起这个，其实我们可能不经意之间就使用了 bfc 了。例如，你照着网上的例子，把 body 高度设置成 100%。但是你写了一个和
标签，h1 标签默认是有上下 margin 的，所以你会很懊恼的发觉明明高度设置的 100%，为什么依然有滚动条。然后你又去找方法，有人告诉你写上`overflow:hidden;`就可以了。你一起你是使用 hidden 属性把溢出的隐藏了，其实是使用了 bfc，阻止了 margin 的溢出。
