---
title: "数组的常用方法以及实现他们"
author: "hanhan.rich"
description: "数组的常用方法以及实现他们"
pubDate: "2021.03.31"
---

## 常用方法

- Array#slice
- Array#join
- Array#sort
- Array#map
- Array#filter
- Array#splice
- Array#reduce
- Array#indexOf
- Array#lastIndexOf
- Array#find
- Array#findIndex
- Array#push
- Array#pop
- Array#shift
- Array#unshift

## 实现

### map

map 也，映射也。

```javascript
Array.prototype.myMap = function (callbackfn, thisArg) {
  if (!thisArg) {
    thisArg = {};
  }
  const ret = new Array(this.length);
  for (let i = 0; i < this.length; ++i) {
    ret[i] = callbackfn.call(thisArg, this[i], i, this);
  }
  return ret;
};
```

## forEach

forEach 也，遍历也。

```javascript
Array.prototype.myForEach = function (callbackfn, thisArg) {
  if (!thisArg) {
    thisArg = {};
  }
  for (let i = 0; i < this.length; ++i) {
    callbackfn.call(thisArg, this[i], i, this);
  }
};
```

## reduce

reduce 也，聚合也。

```javascript
Array.prototype.myReduce = function (callbackfn, initialValue) {
  let ret = initialValue ? initialValue : 0;
  for (let i = 0; i < this.length; ++i) {
    ret = callbackfn(ret, this[i], i, this);
  }
  return ret;
};
```

## indexOf

indexOf 也，查找也。

```javascript
Array.prototype.myIndexOf = function (searchElement, fromIndex) {
  for (let i = fromIndex || 0; i < this.length; ++i) {
    if (this[i] === searchElement) {
      return i;
    }
  }
  return -1;
};
```

## filter

filter 也，过滤也。

```javascript
Array.prototype.myFilter = function (predicate, thisArg) {
  let ret = [];
  if (!thisArg) {
    thisArg = {};
  }
  for (let i = 0; i < this.length; ++i) {
    if (predicate.call(thisArg, this[i], i, this)) {
      ret.push(this[i]);
    }
  }
  return ret;
};
```
