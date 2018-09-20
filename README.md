# useful-utils
utils翻译成中文 => 跑龙套的, 再大的项目也缺不了跑龙套的代码.

## 安装
npm i useful-utils --save

## 引入
import {xxx} from 'useful-utils/es/xxx'

## 说明 :whale:
### BottomTrigger
滚动到底部触发指定回调函数

#### 构造函数参数 
| 参数名 | 说明 | 默认值 | 数据类型 |
| --- | --- | --- | --- |
| threshold | 距离底部多少像素触发回调 | 15 |number|
| interval | 多久ms发生一次触发 | 25 | number |

#### 实例方法 
| 方法名 | 说明 | 
| --- | --- |
| success | 满足触发条件触发的回调函数, 函数异步返回屏幕高度 / 文档高度 / 滚动条高度 |
| destory | 销毁实例, 停止监听 |

#### 实例 
``` javascript
const lm = new BottomTrigger({
    threshold : 15, interval : 25
});

lm.success(data => {
    console.log(data);
});

lm.destory();
```

### loadImage
加载图片函数, 支持Promise方式调用, then对应onSuccess, catch对应onError

#### 函数参数 
| 参数名 | 说明 | 默认值 | 数据类型 |
| --- | --- | --- | --- |
| url | 图片地址 | - |string|
| options | 配置 | - | object |

#### options 
| 参数名 | 说明 | 默认值 | 数据类型 |
| --- | --- | --- | --- |
| isCrossOrigin | url是否跨域 | false |boolean|
| beforeLoad | 图片加载前钩子, data中返回图片尺寸信息等) | (data) => { } | function |
| onSuccess | 图片加载成功钩子 | (data) => { } | function |
| onError | 发生错误狗钩子 | (data) => { } | function |
| onAbort | 放弃加载钩子 | (data) => { } | function |

#### 实例 
``` javascript
loadImage('https://avatars1.githubusercontent.com/u/8264787?s=460&v=4').then(data=>{
    console(data);
}).catch(data=>{
    console(data);
});
```
