---
title: "在react中使用threejs"
author: "hanhan.rich"
description: "在react中使用threejs"
pubDate: "2021.04.14"
---

[threejs](https://www.npmjs.com/package/three)是一个3D的库，而[react](https://reactjs.org/)是一个流行的前端视图库。

这篇文章主要说一说怎么在react中使用threejs。

## react是什么

react是一个前端视图层的库，相对于vue来说，上手难度会更加的大。在react中，视图层被拆为了一个一个组件(component)，通过一种叫做jsx的语法，我们可以在js文件里面使用html，因此，我们可以使用js来描述我们应该怎么渲染视图层。react组件有class和函数两种形式，使用class需要了解class组件的生命周期，使用函数需要了解对应的一些hook。

## threejs是什么

大家都接触过3D游戏吧，而threejs可以让我们在网页中通过webgl，canvas等引擎渲染出3D的效果。

> [cube](https://threejs-with-react.vercel.app/cube)

![](https://i.loli.net/2021/04/14/mJn3AoXRWzxUIOa.png)

例如上图的正方体，就是threejs的README中的例子。

## 如何在react中使用threejs

在react中怎么使用threejs呢？threejs需要与原生dom打交道，其实就`appendChild`了一下。那怎么获取到react 🀄️的原生dom呢？在这里我使用的函数形式，所以我使用了`useRef`这个hook获取到了元素的原生dom，然后把threejs渲染好的canvas元素插入了进去。

```typescript
const containerEl = useRef(null);
((containerEl.current as unknown) as HTMLElement).appendChild(renderer.domElement);
return <div ref={containerEl} />;

```

