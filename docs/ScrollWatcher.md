# ScrollWatcher
:alien: 滚动到底部触发指定回调函数

## 构造函数参数 
| 参数名 | 说明 | 默认值 | 数据类型 |
| --- | --- | --- | --- |
| top | 距离定部多少像素触发回调| 60 |number|
| bottom | 距离底部多少像素触发回调 | window.innerHeight*0.3 |number|
| interval | 多久ms发生一次触发 | 200 | number |

## 实例方法 
| 方法名 | 说明 | 
| --- | --- |
| on | 监听滚动事件, 函数异步返回屏幕高度 / 文档高度 / 滚动条高度 |
| destory | 销毁实例, 停止监听 |

### 监听的事件
| 名称 | 说明 | 
| --- | --- |
| scroll | 滚动触发 |
| scroll-up | 向上滚动触发 |
| scroll-down | 向下滚动触发 |
| reach-top | 触碰页面顶部触发, 顶部高度默认60px |
| reach-bottom | 触碰页面底部触发, 底部高度默认屏幕高度的30% |

## 实例 
``` javascript
const bt = new ScrollWatcher({
    bottom : window.innerHeight/3, interval : 25
});

bt.on('reach-bottom', data => {
    console.log(data);
});

bt.destory();
```

## 源码
[查看](https://github.com/383514580/useful-utils/blob/master/src/ScrollWatcher.ts)

