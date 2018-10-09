// 生成字体css
// 暂时只支持传入一个字体ttf
export default class {
    // 待加入字体的style载体
    public styleNode: HTMLElement;
    // <head>
    public headNode: HTMLElement;
    // 已加入字体的映射表
    public map: {[propName:string]: string};

    /**
     * @param {String} style元素的id
     */
    constructor({id}: {id: string}={}) {
        this.headNode = document.getElementsByTagName('head')[0];
        this.styleNode = document.createElement('style');
        this.styleNode.setAttribute('type', 'text/css');
        this.map = {};
        if (undefined !== id) {
            this.styleNode.setAttribute('id', id);
        }
    };

    /**
     * @param {String} 字体路径 
     * @param {String} css字体名 
     */
    add({url, fontFamily}: {url: string, fontFamily: string}) {
        // 已添加过
        if(undefined !== this.map[fontFamily]) return;
        
        // 同步到map
        this.map[fontFamily] = url;

        // 如果未加入到<head>中,
        // 插入到<head>中
        if(!this.headNode.contains(this.styleNode)) {
            this.headNode.appendChild(this.styleNode);
        }
        
        // 添加css内容
        this.styleNode.textContent+= `
                \r\n
                @font-face {
                    font-family: ${fontFamily};
                    src: url("${url}");
                }
            `;
    };

    /**
     * 删除字体样式
     * @param {String} 字体名 
     */
    remove(fontFamily: string) {
        let willMap: {[propName:string]:string} = {};
        for (let [oldFontFamily, url]  of Object.entries(this.map)) {
            if(fontFamily !== oldFontFamily) {
                willMap[oldFontFamily] = url;
            }
        }

        // 重新生成所有css
        // 清空现有css
        this.styleNode.textContent = '';
        this.map = {};
        for (let [fontFamily, url] of Object.entries(willMap)) {
            this.add({url, fontFamily});
        }
    }

    /**
     * 销毁当前<style>
     */
    destroyed() {
        this.map = null;
        this.headNode.removeChild(this.styleNode);
    };
};