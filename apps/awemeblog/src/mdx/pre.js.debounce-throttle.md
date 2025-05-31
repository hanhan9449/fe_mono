---
title: "防抖 debounceTime、节流 throttleTime"
author: "hanhan.rich"
description: "防抖 debounceTime、节流 throttleTime"
pubDate: "2021.04.02"
---

## 防抖 debounceTime

防抖就是如果有一个按钮，你一直点就不发出请求，等你消停了再发出请求。

> https://runkit.com/hanhan9449/606692d10bf54200195d29f4

```javascript
function debounceTime(fn, time) {
  let task;
  return function (...args) {
    clearTimeout(task);
    task = setTimeout(() => fn.call(this, ...args), time);
  };
}

let debouncedFn = debounceTime(() => console.log(Date.now()), 300);

setInterval(debouncedFn, 200);
```

## 节流 throttleTime

节流就是你一直点，他不会一直发出请求，一个时间段里面只能发出一次请求。

> https://runkit.com/hanhan9449/60669316d6d2d60013362344

```javascript
function throttleTime(fn, time) {
  let canRun = true;
  return function (...args) {
    if (canRun) {
      fn.call(this, ...args);
      canRun = false;
      setTimeout(() => (canRun = true), time);
    }
  };
}

let throttledFn = throttleTime(() => console.log(Date.now()), 5000);
setInterval(throttledFn, 100);
```
