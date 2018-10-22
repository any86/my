// 事件的回调
interface EventHandler {
    (payload: object): void;
};

// 事件堆栈
interface Stack {
    [propsName: string]: EventHandler[];
};

// 待绑定事件目标
type Target = Element | Document | Window;

export default class EventBus {
    private _stack: Stack;
    public target: Target;
    public hasDomEvent: boolean;

    constructor(target: Target = document, { hasDomEvent = false } = {}) {
        this._stack = <Stack>{};
        this.target = target;
        this.hasDomEvent = hasDomEvent;
    };

    /**
     * 触发回调
     * @param {String} 事件名
     * @param {Object} 参数
     */
    emit(eventName: string, payload: { [propName: string]: any }): void {
        if (undefined !== this._stack[eventName]) {
            this._stack[eventName].forEach(handler => {
                handler(payload);
            });
        }

        if (this.hasDomEvent) {
            // 创建浏览器事件
            const event: any = new CustomEvent(eventName, {
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
    on(eventName: string, handler: EventHandler) {
        if (undefined === this._stack[eventName]) {
            this._stack[eventName] = [] as EventHandler[];
        };
        this._stack[eventName].push(handler);
    };

    /**
     * 解绑事件
     * @param {String} 事件名 
     * @param {Function} 事件回调
     */
    off(eventName: string, handler: EventHandler) {
        let handlers = this._stack[eventName];
        if (undefined === handler) {
            handlers = [];
        } else {
            for (let i = 0, len = handlers.length; i < len; i++) {
                let existHandler = handlers[i];
                if (existHandler === handler) {
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
    has(eventName: string): boolean {
        return undefined !== this._stack[eventName];
    };

    /**
     * 销毁注册事件
     */
    destory() {
        this._stack = null;
        this.target = null;
    };
};