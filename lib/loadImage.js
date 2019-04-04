;
import isBase64 from './isBase64';
export default function (url, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.isCrossOrigin, isCrossOrigin = _c === void 0 ? false : _c, _d = _b.beforeLoad, beforeLoad = _d === void 0 ? function () { } : _d, _e = _b.onSuccess, onSuccess = _e === void 0 ? function () { } : _e, _f = _b.onError, onError = _f === void 0 ? function () { } : _f, _g = _b.onAbort, onAbort = _g === void 0 ? function () { } : _g;
    return new Promise(function (resolve, reject) {
        var startTime = Date.now();
        var img = new Image();
        if (!isBase64(url)) {
            if (isCrossOrigin)
                img.crossOrigin = 'anonymous';
        }
        img.onload = function (event) {
            var data = {
                img: img,
                width: img.width,
                height: img.height,
                costTime: Date.now() - startTime,
                nativeEvent: event,
            };
            onSuccess(data);
            resolve(data);
        };
        img.onerror = function (event) {
            var data = {
                url: url,
                img: img,
                costTime: Date.now() - startTime,
                nativeEvent: event,
                type: 'error'
            };
            onError(data);
            reject(data);
            img.src = null;
        };
        img.onabort = function (event) {
            var data = {
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
