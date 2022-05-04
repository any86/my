# @any86/repeat

[![NPM Version][npm-image]][npm-url] [![Size][size-image]][size-url]

[npm-image]: https://badgen.net/npm/v/@any86/repeat
[npm-url]: https://npmjs.org/package/@any86/repeat
[size-image]: https://badgen.net/bundlephobia/minzip/@any86/repeat
[size-url]: https://bundlephobia.com/result?p=@any86/repeat

安次数循环

## 安装

```shell
npm i -S @any86/repeat
```

## 快速开始

```javascript
import repeat from "@any86/repeat";
// 运行3次
await repeat(3, (i) => {
  // 运行3次, 依次输出: 1,2,3
  console.log(i);
});

// 运行3次
await repeat(
  3,
  (i) => {
    // 运行3次, 从5开始,
    // 所以依次输出为:5,6,7
    console.log(i);
  },
  5
);
```
