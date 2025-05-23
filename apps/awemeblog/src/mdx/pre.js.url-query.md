---
title: "解析 URL 参数为对象"
author: "hanhan.rich"
description: "解析 URL 参数为对象"
pubDate: "2021.04.02"
---

如果是多个，则输出数组，单个则输出数。

输入:

```javascript
let input = "https://www.baidu.com?id=1&pwd=2&name=test&name=test2#123";
```

输出为：

```javascript
let ret = { id: "1", pwd: "2", name: ["test", "test2"] };
```

```javascript
function parseParam(url) {
  let paramsString = url.split("?")[1].split("#")[0];
  let paramList = paramsString.split("&");
  let ret = {};
  for (const param of paramList) {
    let [key, value] = param.split("=");
    if (ret[key]) {
      ret[key].push(value);
    } else {
      ret[key] = [value];
    }
  }
  for (const [k, v] of Object.entries(ret)) {
    if (v.length === 1) {
      ret[k] = v[0];
    }
  }
  return ret;
}

let url = "https://www.baidu.com?id=1&pwd=2&name=test&name=test2#123";

let ret = parseParam(url);
console.log(ret);
```
