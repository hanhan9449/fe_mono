---
title: "数组去重"
author: "hanhan.rich"
description: "数组去重"
pubDate: "2021.04.02"
---

```javascript
let arr = [1, 2, 2, 2, 3, 4, 4, 5, 5, 0];

// ...被称为扩展运算符，es6的新语法。会调用set的Iterator。
let ret1 = [...new Set(arr)];
console.log(ret1);

let ret2 = arr.filter((v, i, a) => i === a.indexOf(v));
console.log(ret2);
```
