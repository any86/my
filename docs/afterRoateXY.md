# afterRoateXY
求圆上的任意点p在圆旋转指定角度后的新坐标

## 函数参数 
| 参数名 | 说明 | 默认值 | 数据类型 |
| --- | --- | --- | --- |
| {x: number, y: number, angle: number, centerX: number, centerY: number} |  圆上x坐标, y坐标, 旋转角度,圆心坐标x, 圆心坐标y | - | `Object` |

## 函数返回
| 说明 | 数据类型 |
| --- | --- |
| 新坐标 |  {x: number, y: number} |

## 实例 
``` javascript
const pointer = {x:10, y:10,angle:90, centerX:100, centerY:100 };
let pointerAfterRotate = afterRoateXY(pointer);
console.log(pointerAfterRotate);  // {x:number, y:number}
```

## 源码
[查看](https://github.com/383514580/useful-utils/blob/master/src/afterRoateXY.ts)
