export default class {
    constructor({ id }) {
        this.headNode = document.getElementsByTagName('head')[0];
        this.styleNode = document.createElement('style');
        this.styleNode.setAttribute('type', 'text/css');
        this.map = {};
        if (undefined !== id) {
            this.styleNode.setAttribute('id', id);
        }
    }
    ;
    add({ url, fontFamily }) {
        if (undefined !== this.map[fontFamily])
            return;
        this.map[fontFamily] = url;
        if (!this.headNode.contains(this.styleNode)) {
            this.headNode.appendChild(this.styleNode);
        }
        this.styleNode.textContent += `
                \r\n
                @font-face {
                    font-family: ${fontFamily};
                    src: url("${url}");
                }
            `;
    }
    ;
    remove(fontFamily) {
        let willMap = {};
        for (let [oldFontFamily, url] of Object.entries(this.map)) {
            if (fontFamily !== oldFontFamily) {
                willMap[oldFontFamily] = url;
            }
        }
        this.styleNode.textContent = '';
        this.map = {};
        for (let [fontFamily, url] of Object.entries(willMap)) {
            this.add({ url, fontFamily });
        }
    }
    destroyed() {
        this.map = null;
        this.headNode.removeChild(this.styleNode);
    }
    ;
}
;
