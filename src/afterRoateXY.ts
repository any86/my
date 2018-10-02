/**
 * 求圆上的任意点p在圆旋转指定角度后的新坐标
 * @param {x: number, y: number, angle: number, centerX: number, centerY: number} 圆上x坐标, y坐标, 旋转角度,圆心坐标x, 圆心坐标y
 * @return {x: number, y: number} 新坐标
 */
import angle2rad from './angle2rad';
export default ({ x, y, angle, centerX, centerY }: { x: number, y: number, angle: number, centerX: number, centerY: number }): { x: number, y: number } => {
    // 弧度
    const { round, PI, cos, sin } = Math;
    const rad = angle2rad(angle);
    return {
        x: round(centerX + (x - centerX) * cos(rad) - (y - centerY) * sin(rad)),
        y: round(centerY + (x - centerX) * sin(rad) + (y - centerY) * cos(rad))
    };
};