---
title: "发布订阅模式"
author: "hanhan.rich"
description: "发布订阅模式"
pubDate: "2021.04.01"
---


## 一段发布订阅模式的代码

> 参考：https://zhuanlan.zhihu.com/p/143951991

```javascript
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(type, listener) {
    const listenerList = this.events.get(type) || [];
    this.events.set(type, [...listenerList, listener]);
  }

  off(type, listener) {
    if (!this.events.has(type)) {
      return;
    }
    const listenerList = this.events.get(type) || [];
    this.events.set(
      type,
      listenerList.filter((it) => it !== listener)
    );
  }

  once(type, listener) {
    const wrapListener = () => {
      listener();
      this.off(type, wrapListener);
    };
    this.on(type, wrapListener);
  }

  emit(type, ...args) {
    if (this.events.has(type)) {
      for (const listener of this.events.get(type)) {
        listener(...args);
      }
    }
  }
}

const event = new EventEmitter();
const handle = (...args) => {
  console.log(args);
};
event.on("test", handle);
event.emit("test", 1, 2, 3, 4);
event.off("test", handle);
event.emit("test", 1, 2, 3, 4);
event.once("once", () => {
  console.log("test once");
});
event.emit("once");
event.emit("once");
event.emit("once");
```
