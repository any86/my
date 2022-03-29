import arr2tree from './index';
test('基础', () => {

  const array = [
    {
      id: 1,
      name: "蔬菜",
      order: 21,
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
      order: 11,
    },
  ];

  const tree = arr2tree(array, {
    isRoot(node) {
      return !node.pid;
    },
  });
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


