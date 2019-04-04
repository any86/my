/**
 * 角度转弧度
 * @param {Number} 角度
 * @param {Boolean} 是否对结果进行四舍五入取整
 * @return {Number} 弧度
 */
export default (angle: number, isRound: boolean = false): number => angle * Math.PI / 180;