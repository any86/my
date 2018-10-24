;
;
export default class EventEmitter {
    constructor(target = document, { hasDomEvent = false } = {}) {
        this._stack = {};
        this.target = target;
        this.hasDomEvent = hasDomEvent;
    }
    ;
    emit(eventName, payload) {
        if (undefined !== this._stack[eventName]) {
            this._stack[eventName].forEach(handler => {
                handler(payload);
            });
        }
        if (this.hasDomEvent) {
            const event = new CustomEvent(eventName, {
                detail: payload,
                bubbles: true,
                cancelable: true
            });
            for (let key in payload) {
                event[key] = payload[key];
            }
            ;
            this.target.dispatchEvent(event);
        }
    }
    ;
    on(eventName, handler) {
        if (undefined === this._stack[eventName]) {
            this._stack[eventName] = [];
        }
        ;
        this._stack[eventName].push(handler);
    }
    ;
    off(eventName, handler) {
        let handlers = this._stack[eventName];
        if (undefined === handler) {
            handlers = [];
        }
        else {
            for (let i = 0, len = handlers.length; i < len; i++) {
                let existHandler = handlers[i];
                if (existHandler === handler) {
                    handlers.splice(i, 1);
                    break;
                }
            }
        }
    }
    ;
    has(eventName) {
        return undefined !== this._stack[eventName];
    }
    ;
    destory() {
        this._stack = null;
        this.target = null;
    }
    ;
}
;
