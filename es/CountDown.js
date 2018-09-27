export default class CountDown {
    constructor(countDownNumber, precision = 3) {
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
        }
    }
    start(countDownNumber = 0) {
        if (0 < countDownNumber) {
            this.countDownNumber = countDownNumber;
        }
        if (0 < this.countDownNumber) {
            this._timeoutId = setTimeout(() => {
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
        clearTimeout(this._timeoutId);
    }
    ;
    resume() {
        this.start();
    }
    ;
    stop() {
        clearTimeout(this._timeoutId);
        this.callbacks.end.forEach(callback => {
            callback();
        });
        this.countDownNumber = 0;
    }
}
