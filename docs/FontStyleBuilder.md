# FontStyleBuilder
:alien: 生成字体css, 暂时只支持传入一个字体(ttf格式)

## 构造函数参数 
| 参数名 | 说明 | 默认值 | 数据类型 |
| --- | --- | --- | --- |
| id | 生成的`<style>`元素的id | - |string|

## 实例方法 
| 方法名 | 说明 | 参数| 
| --- | --- | --- |
| add | 添加字体 | {url: '字体路径', fontFamily: '字体名'} |
| remove | 删除字体 | fontFamily='字体名' |
| destory | 删除对应的`<style>`元素 | - |

## 实例 
``` javascript
let fsb = new Fsb({id: 'fsb'});
// 添加字体到<style>
fsb.add({
    url: 'https://jer.imaiyuan.com/skin/frontend/smartwave/default/fonts/VineMonogramsSolid.ttf', 
    fontFamily: 'VineMonogramsSolid'
});

fsb.add({
    url: 'https://jer.imaiyuan.com/skin/frontend/smartwave/default/fonts/ArchitectsDaughter.ttf', 
    fontFamily: 'ArchitectsDaughter'
});

// 从<style>删除字体
fsb.remove('ArchitectsDaughter')

// 删除字体对应的整个<style>
setTimeout(()=>{
    fsb.destroyed();

}, 1000)
```

## 源码
[查看](https://github.com/383514580/useful-utils/blob/master/src/FontStyleBuilder.ts)
