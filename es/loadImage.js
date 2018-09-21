;
import isBase64 from './isBase64';
export default function (url, { isCrossOrigin = false, beforeLoad = () => { }, onSuccess = () => { }, onError = () => { }, onAbort = () => { } } = {}) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        let img = new Image();
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
        };
        img.src = url;
        beforeLoad(img);
    });
}
;
