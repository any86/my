export default (string) => {
    var camelizeRE = /-(\w)/g;
    return string.replace(camelizeRE, word => {
        return word.toLocaleUpperCase().slice(1);
    });
};
