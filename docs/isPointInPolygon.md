# isPointInPolygon
判断点是否在多边形内部

## 函数参数 
| 参数名 | 说明 | 默认值 | 数据类型 |
| --- | --- | --- | --- |
| pointer | 待判断点 | - | `Object` |
| polygon | 多边形端点集合| - | `Array` |

## 函数返回
| 说明 | 数据类型 |
| --- | --- |
| 点是否在多边形内部 | boolean |

## 实例 
``` javascript
const pointer = {x:10, y:10};
const polygon = [{x:0,y:0}, {x:100,y:0},{x:100,y:100},{x:0,y:100}];
let isIn = isPointInPolygon(pointer, polygon);
console.log(isIn);  // true
```

## 源码
[查看](https://github.com/383514580/useful-utils/blob/master/src/isPointInPolygon.ts)
