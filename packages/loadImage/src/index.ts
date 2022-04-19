interface Options {
    isCrossOrigin?: boolean,
    beforeLoad?: (data: any) => void,
    onSuccess?: (data: any) => void,
    onError?: (data: any) => void,
    onAbort?: (data: any) => void
};


/**
 * 是否是base64字符串
 * @param {String} 任意字符串 
 * @returns {Boolean} 是否base64编码格式
 */
const isBase64 = (string: string): boolean => {
    const regex = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i;
    return regex.test(string);
};

/**
 * 获取图片信息
 * @param {String} 图片地址 
 * @param {Object} 配置是否跨域和各个阶段的钩子
 */
export default function (url: string, {
    isCrossOrigin = false,
    beforeLoad = () => { },
    onSuccess = () => { },
    onError = () => { },
    onAbort = () => { }
}: Options = {}) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        const img = new Image();
        // 由于ios下dataURL使用跨入设置会报错, 所以做个判断(在ios9下发现的该问题, 其他版本未尝试)
        if (!isBase64(url)) {
            if (isCrossOrigin) img.crossOrigin = 'anonymous';
        }
        img.onload = event => {
            let data = {
                img: img,
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
};