/**
 * 讲图片灰化
 * @param {String} 输入 
 * @return {String} 输出
 */
export default (image: HTMLImageElement): any => {
    const { width, height } = image;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image,0,0);
    const imageData = ctx.getImageData(0, 0, width, height);
    const { data } = imageData;
    for (let i = 0, { byteLength } = data; i < byteLength; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg; 
        data[i + 1] = avg; 
        data[i + 2] = avg; 
    }
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
};