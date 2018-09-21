# BottomTrigger
滚动到底部触发指定回调函数

## 构造函数参数 
| 参数名 | 说明 | 默认值 | 数据类型 |
| --- | --- | --- | --- |
| threshold | 距离底部多少像素触发回调 | 15 |number|
| interval | 多久ms发生一次触发 | 25 | number |

## 实例方法 
| 方法名 | 说明 | 
| --- | --- |
| success | 满足触发条件触发的回调函数, 函数异步返回屏幕高度 / 文档高度 / 滚动条高度 |
| destory | 销毁实例, 停止监听 |

## 实例 
``` javascript
const lm = new BottomTrigger({
    threshold : 15, interval : 25
});

lm.success(data => {
    console.log(data);
});

lm.destory();
```
