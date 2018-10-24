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
            const scrollTop = window.scrollY;
            const contentHeight = document.documentElement.scrollHeight;
            const viewHeight = window.innerHeight;
            const payload = {
                scrollTop,
                contentHeight,
                viewHeight,
                event
            };
            this.eventBus.emit('scroll', payload);
            const direction = (scrollTop > ScrollWatcher.lastScrollTop) ? 'down' : 'up';
            this.eventBus.emit(`scroll-${direction}`, payload);
            ScrollWatcher.lastScrollTop = scrollTop;
            if (scrollTop + viewHeight + this.bottom > contentHeight) {
                this.eventBus.emit('reach-bottom', payload);
            }
            else if (scrollTop < this.top) {
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
