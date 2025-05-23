---
title: "谈一谈我眼中的宏任务与微任务"
author: "hanhan.rich"
description: "谈一谈我眼中的宏任务与微任务"
pubDate: "2021.03.31"
---
## 前言

最近在准备面试，自然也是看了一下浏览器和 node.js 的宏任务与微任务。我已经把最简单的想通了，我认为这个理解非常容易帮助理解，分享给大家。

## 实验代码

1. [实验代码 1](https://runkit.com/hanhan9449/60598367fc0a04001a0ad3e6)

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9a99e8bc52594be793088dce4415efeb~tplv-k3u1fbpfcp-watermark.image)

2. [实验代码 2](https://runkit.com/hanhan9449/60598b098452e80019c76308)

   ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a5fcf718d677403b8257c539774c2889~tplv-k3u1fbpfcp-watermark.image)

## 简单介绍

我讲解最简单的情况，后面再补充 node.js 等等的复杂内容。

划重点：**宏任务和微任务分别是两个队列，每当一个宏任务执行完成后会将所有微任务出列并执行。**

### 什么是宏任务

1. 主线程
2. `setTimeout`里面的函数
3. `setInterval`里面的函数

### 什么是微任务

1. promise 的 then，catch 里面的函数

注意 ⚠️

1：`new Promise`不是微任务，后面的 then，catch 才是。 2. promise 的 then 和 catch 会返回一个新的 promise（方便链式调用），并把当前的 promise 状态从 pending 转变到 fulfilled 或者 rejected。

## 实验代码 1 解析

1. 首先我们先执行主线程的代码

   ```javascript
   currMacro = "主线程";
   macroList = [];
   microList = [];
   ```

2. 遇到第一个定时器，把定时器 1 放到宏任务队列中，继续执行主线程

   ```javascript
   currMacro = "主线程";
   macroList = ["定时器1"];
   microList = [];
   ```

3. 遇到`new Promise`，注意，这个不是微任务，是主线程中的普通语句，直接执行。然后把后面的 then 放进微任务。

   ```javascript
   currMacro = "主线程";
   macroList = ["定时器1"];
   microList = ["主线程中的promise的then"];
   ```

4. 运行下面的两个定时器，将他们放到 macroList 中。

   ```javascript
   currMacro = "主线程";
   macroList = ["定时器1", "定时器2", "定时器3"];
   microList = ["主线程中的promise的then"];
   ```

5. 执行到最后，主线程执行完了，我们需要执行所有的微任务了。

   ```javascript
   currMacro = null;
   macroList = ["定时器1", "定时器2", "定时器3"];
   microList = [];
   ```

6. 然后执行定时器 1，把定时器 1 里面那个 promise 的 then 放进 microList 中

   ```javascript
   currMacro = "定时器1";
   macroList = ["定时器2", "定时器3"];
   microList = ["定时器1中的promise的then"];
   ```

7. 然后定时器 1 也执行完了，执行所有的微任务。
8. ······，下面的内容都差不多，我就不说了。

下面是实验 1 的结果 👇：

![实验1结果](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf57d49358a24964ab0f91f4bd114a38~tplv-k3u1fbpfcp-watermark.image)

## 实验代码 2 解析

先给答案：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3967561d0aee4468b49854ef88fee1cd~tplv-k3u1fbpfcp-watermark.image)

大家按照宏任务队列和微任务队列自己想吧。注意很多个 then 那，执行了当前的微任务，又将后面的 then 或者 catch 加入了微任务的列表，所以要一直做完了所有的微任务才能去执行下面的微任务。
