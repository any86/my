// 参考:
// https://en.wikipedia.org/wiki/Even%E2%80%93odd_rule
// http://www.html-js.com/article/1528

// 点
interface Pointer {
    x: number;
    y: number;
};

/**
 * 判断点是否在多边形内部
 * @param {Pointer} 待检查点 
 * @param {Polygon} 多边形
 * @return {Boolean} 点是否在多边形内部
 */
export default function (pointer: Pointer, polygon: Pointer[]): boolean {
    const polygonLength = polygon.length;
    let isOutOfPolygon = false;
    for (let i = 0, j = polygonLength - 1; i < polygonLength; j = i,i++) {
        // 2个端点y坐标不能同时在待检查点的上方或下方
        if ((pointer.y > polygon[i].y) != (pointer.y > polygon[j].y)) {
            if (pointer.x < polygon[i].x + (pointer.y - polygon[i].y) * (polygon[j].x - polygon[i].x) / (polygon[j].y - polygon[i].y)) {
                isOutOfPolygon = !isOutOfPolygon;
            }

        }
    };
    return isOutOfPolygon;
};