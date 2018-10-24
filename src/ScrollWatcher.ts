
import EventBus from './eventBus';
export default class ScrollWatcher {
    private _timeoutId: number;
    private _boundScrollHandler: () => void;
    public interval: number;
    public top: number;
    public bottom: number;
    public eventBus: any;
    static lastScrollTop: number;
    constructor({
        bottom = window.innerHeight * 0.3,
        top = 60,
        interval = 200
    } = {}) {
        this.top = top;
        this.bottom = bottom;
        this.interval = interval;
        // 事件管理器
        this.eventBus = new EventBus();
        this._boundScrollHandler = this.scrollHandler.bind(this);
        window.addEventListener('scroll', this._boundScrollHandler);
    };

    /**
     * 监听事件
     * @param 事件名 
     * @param 接收函数
     */
    on(eventName: string, handler: (data: object) => void) {
        this.eventBus.on(eventName, handler);
    };

    /**
     * 验证是否满足条件
     */
    scrollHandler(event: Event) {
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
            // 滚动触发

            // 触底触发
            if (winScrollTop + winHeight + this.bottom > docHeight) {
                this.eventBus.emit('reach-bottom', payload);
            } else if (winScrollTop < this.top) {
                this.eventBus.emit('reach-top', payload);
            }
        }, this.interval);
    };

    destory() {
        this.eventBus.destory();
        window.removeEventListener('scroll', this._boundScrollHandler);
    }
};