export default class LoadMoreFromBottom {
    constructor({ threshold = 15, interval = 25 }) {
        this.threshold = threshold;
        this.interval = interval;
        this._successCallack = (response) => { };
        window.addEventListener('scroll', this.testHandler);
    }
    ;
    testHandler(event) {
        clearTimeout(this._timeoutId);
        this._timeoutId = setTimeout(() => {
            const winScrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            if (winScrollTop + winHeight + this.threshold > docHeight) {
                this._successCallack({
                    winScrollTop,
                    docHeight,
                    winHeight,
                    event
                });
            }
        }, this.interval);
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
