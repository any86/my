# @any86/quick-sort
[![NPM Version][npm-image]][npm-url]

[npm-image]: https://badgen.net/npm/v/@any86/quick-sort
[npm-url]: https://npmjs.org/package/@any86/quick-sort

快速排序, 原地排序, 非递归版本.

## 安装
```shell
npm i -S @any86/quick-sort
```

## 快速开始

```javascript
import qSort from '@any86/quick-sort';

// 正序排列
const array1 = [100,1,99];
const arraySorted = qSort(array);

// 倒序排列, 指定排序的字段
const array1 = [{a:100},{a:1},{a:99}];
const array1Sorted = qSort(array1, (a,b)=>b.a-a.a);
```