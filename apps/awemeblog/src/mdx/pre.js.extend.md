---
title: "javascript 中的继承"
author: "hanhan.rich"
description: "javascript 中的继承"
pubDate: "2021.03.31"
---

> es6 中的继承很简单，但是 es5 也要掌握
>
> https://runkit.com/hanhan9449/605bda451b7dcc001f12382d

## es6

```javascript
class People {
  name;

  constructor(name) {
    this.name = name;
  }
}

class Man extends People {
  constructor(name) {
    super(name);
  }
}

let man = new Man("test");
console.log(man);
console.log(man instanceof Man);
console.log(man instanceof People);
```

## 原型链继承

原型链继承可以把所有的东西继承过来，但是构造的时候不能向父类构造函数传递参数。

```javascript
function People(name) {
  this.name = name;
}

function Man(name) {}

(() => {
  Man.prototype = new People();
  Man.prototype.constructor = Man;
})();

let man = new Man();

console.log(man instanceof Man); // true
console.log(man instanceof People); // true
```

## 寄生组合继承

es5 的最好继承方式

```javascript
function People(name) {
  this.name = name;
}

function Man(name) {
  People.call(this, name);
}

(() => {
  let Super = function () {};
  // 这里Super就是我们寄生的构造函数
  Super.prototype = People.prototype;
  // 让Man的prototype指向new Super()，这样我们就只调用了一次People。
  Man.prototype = new Super();
  // 然后把构造器改回来
  Man.prototype.constructor = Man;
})();

let man = new Man("test");
console.log(man);

console.log(man instanceof Man);
console.log(man instanceof People);
```
