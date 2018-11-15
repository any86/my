
import EventEmitter from './EventEmitter';
export default class ScrollWatcher {
    private _timeoutId: number;
    private _boundScrollHandler: () => void;
    public interval: number;
    public top: number;
    public bottom: number;
    public EventEmitter: any;
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
        this.EventEmitter = new EventEmitter();
        this._boundScrollHandler = this.scrollHandler.bind(this);
        window.addEventListener('scroll', this._boundScrollHandler);
    };

    /**
     * 监听事件
     * @param 事件名 
     * @param 接收函数
     */
    on(type: string, listener: (data: object) => void) {
        this.EventEmitter.on(type, listener);
    };

    /**
     * 解绑监听事件
     * @param 事件名 
     * @param 接收函数
     */
    off(type: string, listener: (data: object) => void){
        this.EventEmitter.off(type, listener);
    };

    /**
     * 验证是否满足条件
     */
    scrollHandler(event: Event) {
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
            // 滚动触发

            // 触底触发
            if (scrollTop + viewHeight + this.bottom > contentHeight) {
                this.EventEmitter.emit('reach-bottom', payload);
            } else if (scrollTop < this.top) {
                this.EventEmitter.emit('reach-top', payload);
            }
        }, this.interval);
    };

    destory() {
        this.EventEmitter.destory();
        window.removeEventListener('scroll', this._boundScrollHandler);
    }
};