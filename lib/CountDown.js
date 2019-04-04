var CountDown = (function () {
    function CountDown(countDownNumber, precision) {
        if (precision === void 0) { precision = 4; }
        this._parseCountDownNumber = function (number, precision) {
            if (precision === void 0) { precision = 1; }
            switch (precision) {
                case 1:
                    {
                        return { second: number };
                    }
                    ;
                case 2:
                    {
                        var second = String(number % 60).padStart(2, '0');
                        var minute = String(Math.floor(number / 60)).padStart(2, '0');
                        return {
                            minute: minute,
                            second: second
                        };
                    }
                    ;
                case 3:
                    {
                        var second = String(number % 60).padStart(2, '0');
                        var minute = String(Math.floor(number / 60) % 60).padStart(2, '0');
                        var hour = String(Math.floor(number / 3600)).padStart(2, '0');
                        return {
                            hour: hour,
                            minute: minute,
                            second: second
                        };
                    }
                    ;
                case 4:
                    {
                        var second = String(number % 60).padStart(2, '0');
                        var minute = String(Math.floor(number / 60) % 60).padStart(2, '0');
                        var hour = String(Math.floor(number / 3600) % 24).padStart(2, '0');
                        var day = String(Math.floor(number / 86400)).padStart(2, '0');
                        return {
                            day: day,
                            hour: hour,
                            minute: minute,
                            second: second
                        };
                    }
                    ;
                default:
                    {
                        return {
                            second: number
                        };
                    }
                    ;
            }
        };
        if (0 < countDownNumber) {
            this.countDownNumber = countDownNumber;
            this.precision = precision;
            this.callbacks = {};
            this._isPause = false;
            this._isStop = false;
        }
        else {
            console.warn('CountDown: 请输入一个大于0的数字');
        }
    }
    CountDown.prototype.start = function (countDownNumber) {
        var _this = this;
        if (countDownNumber === void 0) { countDownNumber = 0; }
        if (0 < countDownNumber) {
            this.countDownNumber = countDownNumber;
        }
        if (this._isStop) {
            this.countDownNumber = 0;
        }
        if (this._isPause) {
            clearTimeout(this._timeoutId);
            return;
        }
        if (0 < this.countDownNumber) {
            this._timeoutId = window.setTimeout(function () {
                _this.countDownNumber--;
                var timeData = _this._parseCountDownNumber(_this.countDownNumber, _this.precision);
                if (undefined !== _this.callbacks.change) {
                    _this.callbacks.change.forEach(function (callback) {
                        callback(timeData);
                    });
                }
                _this.start();
            }, 1000);
        }
        else {
            clearTimeout(this._timeoutId);
            if (undefined !== this.callbacks.end) {
                this.callbacks.end.forEach(function (callback) {
                    callback();
                });
            }
        }
        return this;
    };
    ;
    CountDown.prototype.on = function (eventName, callback) {
        if (undefined === this.callbacks[eventName]) {
            this.callbacks[eventName] = [];
        }
        this.callbacks[eventName].push(callback);
        return this;
    };
    ;
    CountDown.prototype.pause = function () {
        this._isPause = true;
    };
    ;
    CountDown.prototype.resume = function () {
        this._isPause = false;
        this.start();
    };
    ;
    CountDown.prototype.stop = function () {
        this._isStop = true;
    };
    return CountDown;
}());
export default CountDown;
