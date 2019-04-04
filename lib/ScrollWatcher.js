import EventEmitter from './EventEmitter';
var ScrollWatcher = (function () {
    function ScrollWatcher(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.bottom, bottom = _c === void 0 ? window.innerHeight * 0.3 : _c, _d = _b.top, top = _d === void 0 ? 60 : _d, _e = _b.interval, interval = _e === void 0 ? 200 : _e;
        this.top = top;
        this.bottom = bottom;
        this.interval = interval;
        this.EventEmitter = new EventEmitter();
        this._boundScrollHandler = this.scrollHandler.bind(this);
        window.addEventListener('scroll', this._boundScrollHandler);
    }
    ;
    ScrollWatcher.prototype.on = function (type, listener) {
        this.EventEmitter.on(type, listener);
    };
    ;
    ScrollWatcher.prototype.off = function (type, listener) {
        this.EventEmitter.off(type, listener);
    };
    ;
    ScrollWatcher.prototype.scrollHandler = function (event) {
        var _this = this;
        clearTimeout(this._timeoutId);
        this._timeoutId = window.setTimeout(function () {
            var scrollTop = window.scrollY;
            var contentHeight = document.documentElement.scrollHeight;
            var viewHeight = window.innerHeight;
            var payload = {
                scrollTop: scrollTop,
                contentHeight: contentHeight,
                viewHeight: viewHeight,
                event: event
            };
            _this.EventEmitter.emit('scroll', payload);
            var direction = (scrollTop > ScrollWatcher.lastScrollTop) ? 'down' : 'up';
            _this.EventEmitter.emit("scroll-" + direction, payload);
            ScrollWatcher.lastScrollTop = scrollTop;
            if (scrollTop + viewHeight + _this.bottom > contentHeight) {
                _this.EventEmitter.emit('reach-bottom', payload);
            }
            else if (scrollTop < _this.top) {
                _this.EventEmitter.emit('reach-top', payload);
            }
        }, this.interval);
    };
    ;
    ScrollWatcher.prototype.destory = function () {
        this.EventEmitter.destory();
        window.removeEventListener('scroll', this._boundScrollHandler);
    };
    return ScrollWatcher;
}());
export default ScrollWatcher;
;
