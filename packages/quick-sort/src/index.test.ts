import qsort from './index';

test('空数组', () => {
    expect(qsort([])).toMatchObject([]);
});

test('是否有返回值', () => {
    expect(qsort([1, 2, 3, 4, 5, 6])).toMatchObject([1, 2, 3, 4, 5, 6]);
    expect(qsort([6, 5, 4, 3, 2, 1])).toMatchObject([1, 2, 3, 4, 5, 6]);
});

test('简单排序数字', () => {
    const array = [11, 22, 1];
    qsort(array);
    expect(array).toMatchObject([1, 11, 22]);
});

test('倒序', () => {
    const array = [1999, 21, 11, 89, 0, 1];
    qsort(array, (a, b) => {
        return b - a;
    })
    expect(array).toEqual([1999, 89, 21, 11, 1, 0]);
})

test('根据对象指定键值排序', () => {
    const array = [{ x: 99 }, { x: 1999 }, { x: 89 }, { x: 0 }, { x: 1 }];
    qsort(array, (a, b) => {
        return b.x - a.x;
    })
    expect(array).toEqual([{ x: 1999 }, { x: 99 }, { x: 89 }, { x: 1 }, { x: 0 }]);
})