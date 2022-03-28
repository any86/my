# @any86/click-outside
[![NPM Version][npm-image]][npm-url]

[npm-image]: https://badgen.net/npm/v/@any86/click-outside
[npm-url]: https://npmjs.org/package/@any86/click-outside

点击指点元素外部触发回调, 支持手机/桌面端.

[返回首页](../../README.md)
## 安装
```
npm i -S @any86/click-outside
```

## 使用
```javascript
import clickOutside from '@any86/click-outside';

// 开始监听
const cancel = clickOutside(el, e=>{
    // 点击el外部触发
});

// 取消监听
cancel();
```

[返回首页](../../README.md)