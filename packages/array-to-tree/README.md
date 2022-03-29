# @any86/array-to-tree [![NPM Version][npm-image]][npm-url] [![Node CI](https://github.com/any86/arr2tree/actions/workflows/nodejs.yml/badge.svg)](https://github.com/any86/arr2tree/actions/workflows/nodejs.yml)

[npm-image]: https://badgen.net/npm/v/@any86/array-to-tree
[npm-url]: https://npmjs.org/package/@any86/array-to-tree

🌲 数组转树

## 安装

```shell
npm i -S @any86/array-to-tree
```

## 快速开始

```javascript
const tree = arr2tree(array);
```

### 数组(array)

```javascript
//  ======= 输入数组 🍔:=======
const array = [
  {
    id: 1,
    name: "蔬菜",
    order: 1,
  },
  {
    id: 2,
    name: "土豆",
    pid: 1,
    order: 2,
  },
  {
    id: 3,
    name: "豆角",
    pid: 1,
    order: 1,
  },
  {
    id: 4,
    name: "水果",
    order: 2,
  },
];
```

### 树(tree)

```javascript
//  ======= 输出 🌲:=======
[
  {
    id: 1,
    name: "蔬菜",
    order: 1,
    children: [
      {
        id: 3,
        name: "豆角",
        pid: 1,
        order: 1,
      },
      {
        id: 2,
        name: "土豆",
        pid: 1,
        order: 2,
      },
    ],
  },
  {
    id: 4,
    name: "水果",
    order: 2,
  },
];
```

## 进阶

### 兼容不同的键值

我们可以通过参数来兼容不同业务下的键值:

```javascript
const arr = [
  { xxid: 1, xxorder: 1 },
  { xxid: 2, xxpid: 1, xxorder: 2 },
];

arr2tree(arr, {
  KEY_ID: "xxid",
  KEY_PID: "xxpid",
});
```

### 自定义返回节点结构
注意不要删除或者结构node, 这里只可以对他附加属性, 否则无法形成树. 这里相当于遍历节点, 所以一些需要虚幻的操作可以放在这里.
```javascript
const array = [
  { id: 1, order: 1 },
  { id: 2, pid: 1, order: 2 },
];
function transform(node: any) {
  if (2 === node.id) {
    node.category = "植物";
  }
  return node;
}

// 输出
// [{ id: 1, order: 1, children: [{ id: 2, pid: 1, order: 2, category: '植物' }] }]
```

### 自定义根节点的判断条件

默认情况下**arr2tree**通过判断"节点上的**KEY_PID**对应的属性是否 false"来区分根/子节点. 也就是值为空或者小于 1 的值都会当做父节点.

内部逻辑:

```javascript
const isRoot = (node) => !node[KEY_PID];
```

如果不满足也可通过自定义`isRoot`来设置判断函数:

```javascript
arr2tree(arr, {
  isRoot: (node) => node.iAmRoot,
});
```

### 自定义排序

默认根据节点的 order 字段倒序排列,比如:

```javascript
arr2tree([
  { id: 1, order: 1 },
  { id: 2, order: 2 },
]); // [{id:2,order:2},{id:1,order:1}]
```

现实中你可能需要正序, 更可能没有 order 字段, 所以通过`compareOrder`函数可以调整.

```javascript
// 根据"x"排序, 并且正序.
arr2tree(
  [
    { id: 2, x: 2 },
    { id: 1, x: 1 },
  ],
  {
    compareOrder(a, b) {
      return b.x - a.x;
    },
  }
); // [{id:1,x:1},{id:2,x:2}]
```
