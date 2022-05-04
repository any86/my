export default function (times: number, callbcak: (i: number) => void, start: number = 0) {
    const l = times + start
    for (let j = start; j < l; j++) {
        callbcak(j);
    }
} 