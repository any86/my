# @6h/click-outside
点击指点元素外部触发回调, 支持手机/桌面端.

## 安装
```
npm i -S @6h/click-outside
```

## 使用
```javascript
import clickOutside from '@6h/click-outside';

// 开始监听
const cancel = clickOutside(el, e=>{
    // 点击el外部触发
});

// 取消监听
cancel();
```
