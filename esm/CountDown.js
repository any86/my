export default class CountDown {
    constructor(countDownNumber, precision = 4) {
        this._parseCountDownNumber = (number, precision = 1) => {
            switch (precision) {
                case 1:
                    {
                        return { second: number };
                    }
                    ;
                case 2:
                    {
                        let second = String(number % 60).padStart(2, '0');
                        let minute = String(Math.floor(number / 60)).padStart(2, '0');
                        return {
                            minute,
                            second
                        };
                    }
                    ;
                case 3:
                    {
                        let second = String(number % 60).padStart(2, '0');
                        let minute = String(Math.floor(number / 60) % 60).padStart(2, '0');
                        let hour = String(Math.floor(number / 3600)).padStart(2, '0');
                        return {
                            hour,
                            minute,
                            second
                        };
                    }
                    ;
                case 4:
                    {
                        let second = String(number % 60).padStart(2, '0');
                        let minute = String(Math.floor(number / 60) % 60).padStart(2, '0');
                        let hour = String(Math.floor(number / 3600) % 24).padStart(2, '0');
                        let day = String(Math.floor(number / 86400)).padStart(2, '0');
                        return {
                            day,
                            hour,
                            minute,
                            second
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
    start(countDownNumber = 0) {
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
            this._timeoutId = window.setTimeout(() => {
                this.countDownNumber--;
                let timeData = this._parseCountDownNumber(this.countDownNumber, this.precision);
                if (undefined !== this.callbacks.change) {
                    this.callbacks.change.forEach(callback => {
                        callback(timeData);
                    });
                }
                this.start();
            }, 1000);
        }
        else {
            clearTimeout(this._timeoutId);
            if (undefined !== this.callbacks.end) {
                this.callbacks.end.forEach(callback => {
                    callback();
                });
            }
        }
        return this;
    }
    ;
    on(eventName, callback) {
        if (undefined === this.callbacks[eventName]) {
            this.callbacks[eventName] = [];
        }
        this.callbacks[eventName].push(callback);
        return this;
    }
    ;
    pause() {
        this._isPause = true;
    }
    ;
    resume() {
        this._isPause = false;
        this.start();
    }
    ;
    stop() {
        this._isStop = true;
    }
}
