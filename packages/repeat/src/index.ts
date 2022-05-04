export default function (times: number, callbcak: (i: number) => void, start: number = 0) {
    const array = [];
    const l = times + start
    for (let j = start; j < l; j++) {
        array.push(callbcak(j));
    }
    return array;
} 