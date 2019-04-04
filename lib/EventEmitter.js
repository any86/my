;
;
var EventEmitter = (function () {
    function EventEmitter(target, _a) {
        if (target === void 0) { target = document; }
        var _b = (_a === void 0 ? {} : _a).hasDomEvent, hasDomEvent = _b === void 0 ? false : _b;
        this._eventStore = {};
        this.target = target;
        this.hasDomEvent = hasDomEvent;
    }
    ;
    EventEmitter.prototype.emit = function (type, payload) {
        if (undefined !== this._eventStore[type]) {
            this._eventStore[type].forEach(function (listener) {
                listener(payload);
            });
        }
        if (this.hasDomEvent) {
            var event_1 = new CustomEvent(type, {
                detail: payload,
                bubbles: true,
                cancelable: true
            });
            for (var key in payload) {
                event_1[key] = payload[key];
            }
            ;
            this.target.dispatchEvent(event_1);
        }
    };
    ;
    EventEmitter.prototype.on = function (type, listener) {
        if (undefined === this._eventStore[type]) {
            this._eventStore[type] = [];
        }
        ;
        this._eventStore[type].push(listener);
    };
    ;
    EventEmitter.prototype.off = function (type, listener) {
        var handlers = this._eventStore[type];
        if (undefined === listener) {
            handlers = [];
        }
        else {
            for (var i = 0, len = handlers.length; i < len; i++) {
                var existHandler = handlers[i];
                if (existHandler === listener) {
                    handlers.splice(i, 1);
                    break;
                }
            }
        }
    };
    ;
    EventEmitter.prototype.has = function (type) {
        return undefined !== this._eventStore[type];
    };
    ;
    EventEmitter.prototype.destory = function () {
        this._eventStore = null;
        this.target = null;
    };
    ;
    return EventEmitter;
}());
export default EventEmitter;
;
