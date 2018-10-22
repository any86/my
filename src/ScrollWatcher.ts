
import EventBus from './eventBus';
interface Reponse {
    winScrollTop: number;
    docHeight: number;
    winHeight: number;
    event: Event;
}
export default class ScrollWatcher {
    private _timeoutId: number;
    public interval: number;
    public threshold: number;
    public eventBus: any;

    constructor({ threshold = 15, interval = 25 } = {}) {
        this.threshold = threshold;
        this.interval = interval;
        // 事件管理器
        this.eventBus = new EventBus();
        const handler = this.scrollHandler.bind(this);
        window.addEventListener('scroll', handler);
    };

    /**
     * 监听事件
     * @param 事件名 
     * @param 接收函数
     */
    on(eventName: string, handler: () => void) {
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
                this.eventBus.emit('done', {
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
        window.removeEventListener('scroll', this.scrollHandler);
    }
};


