import arrayToTree from './index';

test('无参数', () => {
  const tree = arrayToTree(createArray());
  const comparedTree = [
    {
      id: 1,
      name: "蔬菜",
      order: 21,
      children: [
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
      ],
    },
    {
      id: 4,
      name: "水果",
      order: 11,
    },
  ];
  expect(tree).toMatchObject(comparedTree);
})

test('节点键值不标准', () => {
  const array = [
    { xxid: 1 },
    { xxid: 2, xxpid: 1, },
  ];
  const array2 = arrayToTree(array, {
    KEY_ID: "xxid",
    KEY_PID: "xxpid",
  });
  console.log(array2);
  expect(array2).toMatchObject([{ xxid: 1, children: [{ xxid: 2, xxpid: 1 }] }])
})


test('使用transform', () => {
  const array = [
    { id: 1, order: 1 },
    { id: 2, pid: 1, order: 2 },
  ];
  function transform(node: any) {
    if (2 === node.id) {
      node.category = '植物';
    }
    return node;
  }

  const array2 = arrayToTree(array, {
    transform,
  });

  expect(array2).toMatchObject([{ id: 1, order: 1, children: [{ id: 2, pid: 1, order: 2, category: '植物' }] }])
})


test('自定义排序', () => {
  const array = arrayToTree(
    [
      { id: 2, x: 2 },
      { id: 1, x: 1 },
    ],
    {
      compareOrder(a, b) {
        return a.x - b.x;
      },
    }
  );
  expect(array).toMatchObject([{id:1,x:1},{id:2,x:2}]);
})

function createArray() {
  return [
    {
      id: 2,
      name: "土豆",
      pid: 1,
      order: 2,
    },
    {
      id: 1,
      name: "蔬菜",
      order: 21,
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
      order: 11,
    },
  ];
}



