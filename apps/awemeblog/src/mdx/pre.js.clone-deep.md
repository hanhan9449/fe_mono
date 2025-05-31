---
title: "手写深浅拷贝"
author: "hanhan.rich"
description: "手写深浅拷贝"
pubDate: "2021.04.02"
---

## 深拷贝 deepClone

> 如何实现一个深拷贝呢，深拷贝需要考虑到些什么问题呢？
>
> https://runkit.com/hanhan9449/6062b8e0db92b3001a648890

```javascript
let o2 = {
  name: "o2",
  arr: [4, 5, 6],
};
let o1 = {
  name: "o1",
  arr: [1, 2, 3],
  next: o2,
  fn: function () {
    console.log("fn");
  },
};

console.log(o1);
```

### 直接暴力序列化反序列化

我们直接调用`JSON.parse()`，`JSON.stringify()`来实现

出现的问题：无法拷贝函数、symbol、undefined。

```javascript
let o4 = JSON.parse(JSON.stringify(o1));
console.log(o4);
```

### 写一个函数来递归吧

```javascript
function deepCopy(o) {
  if (!o) {
    return o;
  }
  let isArray = Array.isArray(o);
  let ret;
  // 这里需要考虑是对象还是数组。
  if (isArray) {
    ret = [];
  } else {
    ret = {};
  }
  for (const key of Object.keys(o)) {
    // 如果是基本类型就直接复制，如果不是就继续递归
    if (typeof o[key] !== "object") {
      ret[key] = o[key];
    } else {
      ret[key] = deepCopy(o[key]);
    }
  }
  return ret;
}

let o3 = deepCopy(o1);
console.log(o3);
```

### Object#keys()

`Object#keys()`用来获取该对象上面的值。 而 in 会获取原型链上的值。因此如果我们要在上面深拷贝不用 `Object#keys()`而要用 in 的话，需要用 `hasOwnProperty` 方法来检测是不是在该对象上。

```javascript
function People(name) {
  this.name = name;
}

People.prototype.version = 1;
let people = new People("test");
console.log(people);
for (const key of Object.keys(people)) {
  console.log(key);
}
/*
name
 */

for (const key in people) {
  console.log(key);
}
/*
name
version
 */
```

## 浅拷贝 ShallowClone

`Object#assign()`可以用于浅拷贝。下面我们实现自己的浅拷贝。

```javascript
function shallowCopy(obj) {
  if (Array.isArray(obj)) {
    return [...obj];
  }
  let ret = {};
  for (const key of Object.keys(obj)) {
    ret[key] = obj[key];
  }
  return ret;
}
```
