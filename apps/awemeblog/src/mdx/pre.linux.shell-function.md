---
title: "shell中的函数学习和实践"
author: "hanhan.rich"
description: "shell中的函数学习和实践"
pubDate: "2021.11.13"
---

## 目的

记录使用shell来一键设置proxy。

## 背景

> [https://www.shellhacks.com/linux-proxy-server-settings-set-proxy-command-line](https://www.shellhacks.com/linux-proxy-server-settings-set-proxy-command-line/#:~:text=To%20use%20a%20proxy%20on%20the%20Linux%20command-line%2C,ftp%2C%20wget%2C%20curl%2C%20ssh%2C%20apt-get%2C%20yum%20and%20others.)


```shell
# Set Proxy
function setproxy() {
    export {http,https,ftp}_proxy="http://PROXY_SERVER:PORT"
}

# Unset Proxy
function unsetproxy() {
    unset {http,https,ftp}_proxy
}
```

上面这篇文章里面给出了shell设置proxy的方案，因此自己想看一下能否对函数进行简单的扩展，就可以实现一键设置proxy。

## 正文

```shell
function set_proxy() {
  #  字符串为空
  if [ -z "$1" ]; then
      unset {http,https,ftp}_proxy
      echo "代理已被还原"
      return
  fi
  echo "当前代理设置为：$1"
  export {http,https,ftp}_proxy="$1"
}

# ======测试======
set_proxy # 代理已被还原
set_proxy "http://10.1.2.149:1082" # 当前代理设置为：http://10.1.2.149:1082
set_proxy # 代理已被还原
```

最后我们把脚本加在`.bashrc`中，就可以正常使用了。