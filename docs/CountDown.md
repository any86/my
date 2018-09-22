# CountDown
⏳倒计时 

### 构造函数参数 
| 参数名 | 说明 | 默认值 | 数据类型 |
| --- | --- | --- | --- |
| countDownNumber | 倒计时秒数 | - |number|
| precision | 显示到'秒分时日'的那一阶段 | 3 | number |

### 实例方法 
| 方法名 | 说明 | 参数| 
| --- | --- | --- |
| start | 开始倒计时 | - |
| pause | 暂停倒计时 | - |
| resume | 继续倒计时 | - |
| stop | 停止倒计时, 并置0 | - |
| on | 监听函数, 支持`end`和 `change`| - |

### 实例 
``` javascript
// 第一个参数代表倒计时的秒数
// 第二个参数是4那么change事件中会返回'{second, minute, hour, day}', 
// 如果是3那么返回'{second, minute, hour }', 以此类推
let cd = new CountDown(1000,4).start();

// 每1秒触发
cd.on('change', ({second, minute, hour, day})=>{
    console.log({second, minute, hour, day});
});

// 倒计时完成触发
cd.on('end', ()=>{
    console.log('end');
});

// 暂停
cd.pause();

// 继续
cd.resume();

// 停止并置0
cd.stop();
```

### 源码
[查看](https://github.com/383514580/useful-utils/blob/master/src/CountDown.ts)
