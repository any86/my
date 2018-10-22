
import EventBus from './eventBus';
export default class ScrollWatcher {
    private _timeoutId: number;
    private _boundScrollHandler: () => void;
    public interval: number;
    public threshold: number;
    public eventBus: any;

    constructor({ threshold = window.innerHeight * 0.3, interval = 200 } = {}) {
        this.threshold = threshold;
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
            if (winScrollTop + winHeight + this.threshold > docHeight) {
                this.eventBus.emit('reach-bottom', {
                    winScrollTop,
                    docHeight,
                    winHeight,
                    event
                });
            }
        }, this.interval);
    };

    destory() {
        this.eventBus.destory();
        window.removeEventListener('scroll', this._boundScrollHandler);
    }
};


