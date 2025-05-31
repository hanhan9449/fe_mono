---
title: "实现 Object.create"
author: "hanhan.rich"
description: "实现 Object.create"
pubDate: "2021.04.02"
---

创建一个对象，然后把他的原型设置为我们传入的第二个参数。

```javascript
function create(o = null) {
  let ret = {};
  Object.setPrototypeOf(ret, o);
  return ret;
}

let ret = create(null);
console.log(ret, Object.getPrototypeOf(ret));
```
