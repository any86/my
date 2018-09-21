;
import isBase64 from './isBase64';
/**
 * 获取图片信息
 * @param {String} 图片地址
 * @param {Object} 配置是否跨域和各个阶段的钩子
 */
export default function (url, { isCrossOrigin = false, beforeLoad = () => { }, onSuccess = () => { }, onError = () => { }, onAbort = () => { } } = {}) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        let img = new Image();
        // 由于ios下dataURL使用跨入设置会报错, 所以做个判断(在ios9下发现的该问题, 其他版本未尝试)
        if (!isBase64(url)) {
            if (isCrossOrigin)
                img.crossOrigin = 'anonymous';
        }
        img.onload = event => {
            let data = {
                img: img,
                isComplete: false,
                width: img.width,
                height: img.height,
                costTime: Date.now() - startTime,
                nativeEvent: event,
            };
            onSuccess(data);
            resolve(data);
        };
        img.onerror = event => {
            let data = {
                url,
                img: img,
                costTime: Date.now() - startTime,
                nativeEvent: event,
                type: 'error'
            };
            onError(data);
            reject(data);
            img.src = null;
        };
        img.onabort = event => {
            let data = {
                img: img,
                costTime: Date.now() - startTime,
                nativeEvent: event,
            };
            onAbort(data);
            reject(data);
            // img.null;
        };
        img.src = url;
        beforeLoad(img);
    });
}
;
