# ScrollWatcher
:alien: 滚动到底部触发指定回调函数

## 构造函数参数 
| 参数名 | 说明 | 默认值 | 数据类型 |
| --- | --- | --- | --- |
| threshold | 距离底部多少像素触发回调 | 15 |number|
| interval | 多久ms发生一次触发 | 25 | number |

## 实例方法 
| 方法名 | 说明 | 
| --- | --- |
| on | 满足触发条件触发的回调函数, 函数异步返回屏幕高度 / 文档高度 / 滚动条高度 |
| destory | 销毁实例, 停止监听 |

## 实例 
``` javascript
const bt = new ScrollWatcher({
    threshold : 15, interval : 25
});

bt.on('done', data => {
    console.log(data);
});

bt.destory();
```

## 源码
[查看](https://github.com/383514580/useful-utils/blob/master/src/ScrollWatcher.ts)

