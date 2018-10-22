import EventBus from './eventBus';
export default class ScrollWatcher {
    constructor({ threshold = window.innerHeight * 0.3, interval = 200 } = {}) {
        this.threshold = threshold;
        this.interval = interval;
        this.eventBus = new EventBus();
        this._boundScrollHandler = this.scrollHandler.bind(this);
        window.addEventListener('scroll', this._boundScrollHandler);
    }
    ;
    on(eventName, handler) {
        this.eventBus.on(eventName, handler);
    }
    ;
    scrollHandler(event) {
        clearTimeout(this._timeoutId);
        this._timeoutId = window.setTimeout(() => {
            const winScrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            if (winScrollTop + winHeight + this.threshold > docHeight) {
                this.eventBus.emit('done', {
                    winScrollTop,
                    docHeight,
                    winHeight,
                    event
                });
            }
        }, this.interval);
    }
    ;
    destory() {
        this.eventBus.destory();
        window.removeEventListener('scroll', this._boundScrollHandler);
    }
}
;
