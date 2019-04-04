import afterRotateXY from './afterRoateXY'
const calcRect = (width: number, height: number, angle: number) => {
    let xMax = 0;
    let yMax = 0;
    let points = [{x:-width/2,y:height/2}, {x:width/2,y:height/2}, {x:-width/2,y:-height/2}, {x:-width/2,y:-height/2}]
    points.forEach((point:{x:number,y:number})=>{
        const {x,y} =  afterRotateXY({ x:point.x, y:point.y, angle, centerX: 0, centerY: 0 });
        console.log({x,y});
        xMax = Math.max(xMax, Math.abs(x));
        yMax = Math.max(yMax, Math.abs(y));
    });
    return {width:2*xMax,height:2*yMax};
};

export default (img: HTMLImageElement, angle: number): string => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const rect = calcRect(img.width, img.height, angle);
    console.log(rect);
    canvas.width = rect.width;
    canvas.height = rect.height;
    ctx.save();
    // ctx.fillRect(0,0,rect.width,rect.height);
    ctx.translate(rect.width / 2, rect.height / 2);
    ctx.rotate(angle * Math.PI / 180);
    ctx.translate(- img.width / 2, -img.height / 2);
    ctx.drawImage(img, 0, 0);
    ctx.restore();
    return canvas.toDataURL('image/png');
};

