// ⏳倒计时
interface TimeData {
    day?: string;
    hour?: string;
    minute?: string;
    second: string;
}
export default class CountDown {
    private _timeoutId: number;
    private callbacks: { [propName: string]: ((data?: any) => void)[] };

    // 倒计时秒数
    public countDownNumber: number;
    public precision: number;

    constructor(countDownNumber: number, precision: number = 3) {
        if (0 < countDownNumber) {
            this.countDownNumber = countDownNumber;
            this.precision = precision;
            this.callbacks = {};
        }
    }

    public start(countDownNumber: number = 0) {
        // 如果指定数字按照指定数字倒计时
        // 否则按照实例上已有的数字倒计时
        if (0 < countDownNumber) {
            this.countDownNumber = countDownNumber;
        }
        // 倒计时
        if (0 < this.countDownNumber) {
            this._timeoutId = setTimeout(() => {
                this.countDownNumber--;
                let timeData: TimeData = this._parseCountDownNumber(this.countDownNumber, this.precision);
                if (undefined !== this.callbacks.change) {
                    this.callbacks.change.forEach(callback => {
                        callback(timeData);
                    });
                }
                this.start();
            }, 1000);
        } else {
            clearTimeout(this._timeoutId);
            if (undefined !== this.callbacks.end) {
                this.callbacks.end.forEach(callback => {
                    callback();
                });
            }
        }
        return this;
    };

    public on(eventName: string, callback: (data: TimeData) => void) {
        if(undefined === this.callbacks[eventName]) {
            this.callbacks[eventName] = [];
        }
        this.callbacks[eventName].push(callback);
        return this;
    };

    public pause() {
        clearTimeout(this._timeoutId);
    };

    public resume() {
        this.start();
    };

    public stop() {
        clearTimeout(this._timeoutId);
        this.callbacks.end.forEach(callback => {
            callback();
        });
        this.countDownNumber = 0;

    }

    /**
     * 解析数字成'秒分时日'格式
     * @param {Number} 秒数
     * @param {Number} 精度, 1:秒, 2:分, 3:时, 4:日.
     */
    private _parseCountDownNumber = (number: number, precision: number = 1): any => {
        switch (precision) {
            case 1: {
                return { second: number };
            };

            case 2: {
                let second: string = String(number % 60).padStart(2, '0');
                let minute = String(Math.floor(number / 60)).padStart(2, '0');
                return {
                    minute,
                    second
                };
            };

            case 3: {
                let second = String(number % 60).padStart(2, '0');
                let minute = String(Math.floor(number / 60) % 60).padStart(2, '0');
                let hour = String(Math.floor(number / 3600)).padStart(2, '0');
                return {
                    hour,
                    minute,
                    second
                };
            };

            case 4: {
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
            };

            default: {
                return {
                    second: number
                };
            };
        }
    }
}