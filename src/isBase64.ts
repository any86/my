/**
 * 是否是base64字符串
 * @param {String} 任意字符串 
 * @returns {Boolean} 是否base64编码格式
 */
export default (string: string): boolean => {
    const regex = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i;
    return regex.test(string);
};