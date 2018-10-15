import angle2rad from './angle2rad';
export default ({ x, y, angle, centerX, centerY }) => {
    const { round, PI, cos, sin } = Math;
    const rad = angle2rad(angle);
    return {
        x: round(centerX + (x - centerX) * cos(rad) - (y - centerY) * sin(rad)),
        y: round(centerY + (x - centerX) * sin(rad) + (y - centerY) * cos(rad))
    };
};
