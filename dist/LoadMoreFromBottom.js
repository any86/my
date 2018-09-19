export default class LoadMoreFromBottom {
    constructor({ offset = 15 }) {
        this.offset = offset;
        this._successCallack = (data) => { };
        window.addEventListener('scroll', this.testHandler);
    }
    ;
    testHandler(event) {
        clearTimeout(this._timeoutId);
        this._timeoutId = setTimeout(() => {
            const winScrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            if (winScrollTop + winHeight + this.offset > docHeight) {
                this._successCallack({
                    winScrollTop,
                    docHeight,
                    winHeight,
                    event
                });
            }
        }, 200);
    }
    ;
    success(callback) {
        this._successCallack = callback;
    }
    ;
    destory() {
        window.removeEventListener('scroll', this.testHandler);
    }
}
;
