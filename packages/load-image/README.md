# @any86/load-image
[![NPM Version][npm-image]][npm-url]

[npm-image]: https://badgen.net/npm/v/@any86/load-image
[npm-url]: https://npmjs.org/package/@any86/load-image

加载图片

## 安装
```shell
npm i -S @any86/load-image
```

## 快速开始

```javascript
import loadImage from '@any86/load-image';

loadImage(url).then(image=>{
    // 加载成功
    // 图片对象,
    console.log(image.width) // 图片宽度 
}).catch(e=>{
    // 加载失败
})
```