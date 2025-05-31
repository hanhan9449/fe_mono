---
title: "javascript 中 new 是怎么工作的"
author: "hanhan.rich"
description: "javascript 中 new 是怎么工作的"
pubDate: "2021.03.31"
---

## 如何工作

> 根据 javascript 红宝书学习到的

1. 声明一个对象。
2. 把这个对象的`__proto__`设置为构造函数的`prototype`。
3. 构造函数的 this 设置为这个函数，然后调用。
4. 如果返回值是对象，则返回它，否则返回我们一开始声明的那个对象。

注：

- 如果第四步返回值是 null，则返回第一步声明的对象。 null 虽然 typeof 是 object，但是这里需要特判。
- 如果第四步返回值不是是返回的对象，则返回第一步声明的对象。

## 代码

```javascript
function People(name) {
  this.name = name;
}

function _new(fn, ...params) {
  let instance = Object.create(null);
  Object.setPrototypeOf(instance, fn.prototype);
  let ret = fn.call(instance, ...params);
  if (ret === null) {
    return instance;
  }
  if (typeof ret === "object") {
    return ret;
  } else {
    return instance;
  }
}

const p1 = new People("test");
console.log(p1);

const p2 = _new(People, "test2");
console.log(p2);
```
