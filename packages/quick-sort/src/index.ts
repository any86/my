type Compare<T> = (pivotItem: T, currentItem: T) => number;
/**
 * 比较函数
 * @param pivotItem 待比较值 
 * @param currentItem 当前值
 * @returns 数组,大于0正序,反之倒序
 */
function compareNumber(pivotItem: number, currentItem: number): number {
    return pivotItem - currentItem;
}

/**
 * 分区, 
 * @param array 
 * @param startIndex 
 * @param endIndex 
 * @returns 
 */
function partition<Item = number>(array: Item[], startIndex: number, endIndex: number, compareFn: Compare<Item>) {
    // 参考值
    const pivot = array[startIndex];
    // 分割标准值的索引
    let divideIndex = startIndex;
    for (let i = startIndex + 1; i <= endIndex; i++) {
        if (0 > compareFn(array[i], pivot)) {
            divideIndex++;
            swap(array, divideIndex, i);
        }
    }
    swap(array, divideIndex, startIndex);
    return divideIndex;
}


function swap(array: unknown[], i: number, j: number) {
    const v = array[i];
    array[i] = array[j];
    array[j] = v;
}

/**
 * 快速排序(原地排序)
 * 通过参数可以选择被排序的索引范围
 * 参考: https://zhuanlan.zhihu.com/p/109971850
 * @param array 数组
 * @param startIndex 起始索引
 * @param endIndex 结束索引
 * @returns 
 */
export default function quickSort<Item = number>(array: Item[], compareFn: Compare<Item> = compareNumber as any): Item[] {
    const startIndex = 0;
    const endIndex = array.length - 1;

    const stack: [number, number][] = [];
    stack.push([startIndex, endIndex]);
    while (0 !== stack.length) {
        const [startIndex, endIndex] = stack.pop()!;
        const pivotIndex = partition(array, startIndex, endIndex, compareFn);
        if (startIndex < pivotIndex - 1) {
            stack.push([startIndex, pivotIndex - 1]);
        }
        if (pivotIndex + 1 < endIndex) {
            stack.push([pivotIndex + 1, endIndex]);
        }
    }
    return array;
}
