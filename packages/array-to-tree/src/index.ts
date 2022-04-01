import quickSort from '@any86/quick-sort';
type KV = Record<string | number, any>;
type NodeMap<Node> = Record<string, Node[]>;
type CompareOrder<Node> = (a: Node, b: Node) => number;
interface Options<Node> {
    KEY_ID?: string;
    KEY_PID?: string;
    KEY_CHILDREN?: string;
    compareOrder?: CompareOrder<Node>;
    transform?: (node: Node) => Node | void;
    isRoot?: (node: Node) => boolean;
}


/**
 * 数组转树
 * @param 输入数组
 * @param options.KEY_ID 表示唯一性键值(id)
 * @param options.KEY_PID 对应的父id
 * @param options.compareOrder 排序函数, 默认根据order的值倒序
 * @param options.isRoot 判断是否根节点, 接收一个参数(当前循环的节点)
 * @param options.transform 控制节点的返回格式
 * @returns 树结构
 */

export default function <Node extends KV>(array: Node[], options: Options<Node> = {}): Node[] {
    // 默认值
    const { KEY_ID, KEY_CHILDREN, KEY_PID, compareOrder, transform } = {
        KEY_ID: 'id',
        KEY_PID: 'pid',
        KEY_CHILDREN: 'children',
        compareOrder: ((a: Node, b: Node) => b.order - a.order) as CompareOrder<Node>,
        transform: (node: Node): Node & KV | void => node,
        ...options
    };

    const isRoot = options.isRoot || ((node: Node) => !node[KEY_PID]);
    
    let tree = [];
    let pidAndChildrenMap: NodeMap<Node> | null = {};

    for (const node of array) {
        const { [KEY_ID]: id, [KEY_PID]: pid } = node;
        const currentNode = transform(node);
        if (void 0 === currentNode) continue;

        if (isRoot(node)) {
            // 根节点
            tree.push(currentNode);
        } else {
            // 非根节点
            if (void 0 === pidAndChildrenMap[pid]) {
                pidAndChildrenMap[pid] = []
            }

            // if (void 0 !== currentNode) {
            pidAndChildrenMap[pid].push(currentNode);
            // }
        }

        // 用每个节点的id做map
        if (void 0 === pidAndChildrenMap[id]) {
            pidAndChildrenMap[id] = [];
        }

        // 让每个节点的children指向pidChildrenMap中的值
        currentNode[KEY_CHILDREN as any] = pidAndChildrenMap[id];
    }

    // 删除空的children字段
    for (const node of array) {
        // transform后可能是undefined
        if (0 === node[KEY_CHILDREN]?.length) {
            delete node[KEY_CHILDREN]
        }
    }

    // 排序
    for (const pid in pidAndChildrenMap) pidAndChildrenMap[pid] = quickSort(pidAndChildrenMap[pid], compareOrder)
    tree = quickSort(tree, compareOrder);

    // 有循环引用, 手动销毁
    pidAndChildrenMap = null;
    return tree;
};