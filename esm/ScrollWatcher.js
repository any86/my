import EventBus from './eventBus';
export default class ScrollWatcher {
    constructor({ threshold = 15, interval = 25 } = {}) {
        this.threshold = threshold;
        this.interval = interval;
        this.eventBus = new EventBus();
        const handler = this.scrollHandler.bind(this);
        window.addEventListener('scroll', handler);
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
        window.removeEventListener('scroll', this.scrollHandler);
    }
}
;
