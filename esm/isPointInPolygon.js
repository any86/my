;
export default function (pointer, polygon) {
    const polygonLength = polygon.length;
    let isOutOfPolygon = false;
    for (let i = 0, j = polygonLength - 1; i < polygonLength; j = i, i++) {
        if ((pointer.y > polygon[i].y) != (pointer.y > polygon[j].y)) {
            if (pointer.x < polygon[i].x + (pointer.y - polygon[i].y) * (polygon[j].x - polygon[i].x) / (polygon[j].y - polygon[i].y)) {
                isOutOfPolygon = !isOutOfPolygon;
            }
        }
    }
    ;
    return isOutOfPolygon;
}
;
