---
title: "数组扁平化"
author: "hanhan.rich"
description: "数组扁平化"
pubDate: "2021.04.02"
---

javascript 数组原生有一个扁平化的方法`Array#flat()`，传 1 就展开一层，传 Infinity 就展开成一位数组。

我们可以采用递归来实现数组展平。

```javascript
let arr = [1, [[[2]]], [[3, 4, [[[[5]]]]]]];

let ret1 = arr.flat(Infinity);
console.log(ret1);

function flat(arr) {
  if (!Array.isArray(arr)) {
    return [arr];
  }
  let ret = [];
  for (const a of arr) {
    ret = ret.concat(flat(a));
  }
  return ret;
}

let ret2 = flat(arr);
console.log(ret2);
```
