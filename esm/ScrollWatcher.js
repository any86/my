import EventEmitter from './EventEmitter';
export default class ScrollWatcher {
    constructor({ bottom = window.innerHeight * 0.3, top = 60, interval = 200 } = {}) {
        this.top = top;
        this.bottom = bottom;
        this.interval = interval;
        this.EventEmitter = new EventEmitter();
        this._boundScrollHandler = this.scrollHandler.bind(this);
        window.addEventListener('scroll', this._boundScrollHandler);
    }
    ;
    on(eventName, handler) {
        this.EventEmitter.on(eventName, handler);
    }
    ;
    scrollHandler(event) {
        clearTimeout(this._timeoutId);
        this._timeoutId = window.setTimeout(() => {
            const scrollTop = window.scrollY;
            const contentHeight = document.documentElement.scrollHeight;
            const viewHeight = window.innerHeight;
            const payload = {
                scrollTop,
                contentHeight,
                viewHeight,
                event
            };
            this.EventEmitter.emit('scroll', payload);
            const direction = (scrollTop > ScrollWatcher.lastScrollTop) ? 'down' : 'up';
            this.EventEmitter.emit(`scroll-${direction}`, payload);
            ScrollWatcher.lastScrollTop = scrollTop;
            if (scrollTop + viewHeight + this.bottom > contentHeight) {
                this.EventEmitter.emit('reach-bottom', payload);
            }
            else if (scrollTop < this.top) {
                this.EventEmitter.emit('reach-top', payload);
            }
        }, this.interval);
    }
    ;
    destory() {
        this.EventEmitter.destory();
        window.removeEventListener('scroll', this._boundScrollHandler);
    }
}
;
