export default (function (string) {
    var camelizeRE = /-(\w)/g;
    return string.replace(camelizeRE, function (word) {
        return word.toLocaleUpperCase().slice(1);
    });
});
