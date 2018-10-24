// 待绑定事件目标
type Target = Element | Document | Window;
// 事件的回调
interface EventListener {
    (payload: object): void;
};

// 事件堆栈
interface EventsStore {
    [propsName: string]: EventListener[];
};

export default class EventEmitter {
    private _eventStore: EventsStore;
    public target: Target;
    public hasDomEvent: boolean;

    constructor(target: Target = document, { hasDomEvent = false } = {}) {
        this._eventStore = <EventsStore>{};
        this.target = target;
        this.hasDomEvent = hasDomEvent;
    };

    /**
     * 触发回调
     * @param {String} 事件名
     * @param {Object} 参数
     */
    emit(type: string, payload: { [propName: string]: any }): void {
        if (undefined !== this._eventStore[type]) {
            this._eventStore[type].forEach(listener => {
                listener(payload);
            });
        }

        if (this.hasDomEvent) {
            // 创建浏览器事件
            const event: any = new CustomEvent(type, {
                detail: payload,
                bubbles: true,
                cancelable: true
            });

            // 如果payload是对象, 那么直接挂在到event上
            for (let key in payload) {
                event[key] = payload[key];
            };

            this.target.dispatchEvent(event);
        }

    };

    /**
     * 注册事件
     * @param {String} 事件名
     * @param {Function} 回调函数
     */
    on(type: string, listener: EventListener) {
        if (undefined === this._eventStore[type]) {
            this._eventStore[type] = [] as EventListener[];
        };
        this._eventStore[type].push(listener);
    };

    /**
     * 解绑事件
     * @param {String} 事件名 
     * @param {Function} 事件回调
     */
    off(type: string, listener: EventListener) {
        let handlers = this._eventStore[type];
        if (undefined === listener) {
            handlers = [];
        } else {
            for (let i = 0, len = handlers.length; i < len; i++) {
                let existHandler = handlers[i];
                if (existHandler === listener) {
                    handlers.splice(i, 1);
                    break;
                }
            }
        }
    };

    /**
     * 判断是否绑定指定事件
     * @param {String} 事件名
     * @return {Boolean} 是否存在
     */
    has(type: string): boolean {
        return undefined !== this._eventStore[type];
    };

    /**
     * 销毁注册事件
     */
    destory() {
        this._eventStore = null;
        this.target = null;
    };
};