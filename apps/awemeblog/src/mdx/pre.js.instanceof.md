---
title: "实现 instanceof 关键字"
author: "hanhan.rich"
description: "实现 instanceof 关键字"
pubDate: "2021.03.31"
---

`instanceof`关键字判断构造函数的`prototype`是否出现在obj的原型链上。

```javascript
class People {}

let people = new People();

function instanceOf(obj, constructorFn) {
  let prototype = Object.getPrototypeOf(obj);
  while (prototype) {
    if (prototype === constructorFn.prototype) {
      return true;
    }
    prototype = Object.getPrototypeOf(prototype);
  }
  return false;
}

console.log(people instanceof People);
console.log(instanceOf(people, People));
```
