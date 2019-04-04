# rotateImage
旋转图片, canvas尺寸会自动适配.

## 函数参数 
| 参数名 | 说明 | 默认值 | 数据类型 |
| --- | --- | --- | --- |
| image对象 |  图片对象 | - | `Image` |
| angle |  旋转角度 | - | `Number` |


## 函数返回
| 说明 | 数据类型 |
| --- | --- |
| 旋转后图片的base64 |  `String` |

## 实例 
``` javascript
const img = new Image();
img.onload = ()=>{
    let base64 = rotateImage(img, 90);
};
img.src = './4.jpg';
```

## 源码
[查看](https://github.com/383514580/useful-utils/blob/master/src/rotateImage.ts)
