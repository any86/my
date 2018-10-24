import EventBus from './eventBus';
export default class ScrollWatcher {
    constructor({ bottom = window.innerHeight * 0.3, top = 60, interval = 200 } = {}) {
        this.top = top;
        this.bottom = bottom;
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
            const payload = {
                winScrollTop,
                docHeight,
                winHeight,
                event
            };
            this.eventBus.emit('scroll', payload);
            const direction = (winScrollTop > ScrollWatcher.lastScrollTop) ? 'down' : 'up';
            this.eventBus.emit(`scroll-${direction}`, payload);
            ScrollWatcher.lastScrollTop = winScrollTop;
            if (winScrollTop + winHeight + this.bottom > docHeight) {
                this.eventBus.emit('reach-bottom', payload);
            }
            else if (winScrollTop < this.top) {
                this.eventBus.emit('reach-top', payload);
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
