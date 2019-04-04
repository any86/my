import afterRotateXY from './afterRoateXY';
var calcRect = function (width, height, angle) {
    var xMax = 0;
    var yMax = 0;
    var points = [{ x: -width / 2, y: height / 2 }, { x: width / 2, y: height / 2 }, { x: -width / 2, y: -height / 2 }, { x: -width / 2, y: -height / 2 }];
    points.forEach(function (point) {
        var _a = afterRotateXY({ x: point.x, y: point.y, angle: angle, centerX: 0, centerY: 0 }), x = _a.x, y = _a.y;
        console.log({ x: x, y: y });
        xMax = Math.max(xMax, Math.abs(x));
        yMax = Math.max(yMax, Math.abs(y));
    });
    return { width: 2 * xMax, height: 2 * yMax };
};
export default (function (img, angle) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var rect = calcRect(img.width, img.height, angle);
    console.log(rect);
    canvas.width = rect.width;
    canvas.height = rect.height;
    ctx.save();
    ctx.translate(rect.width / 2, rect.height / 2);
    ctx.rotate(angle * Math.PI / 180);
    ctx.translate(-img.width / 2, -img.height / 2);
    ctx.drawImage(img, 0, 0);
    ctx.restore();
    return canvas.toDataURL('image/png');
});
