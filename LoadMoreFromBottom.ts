export default class LoadMoreFromBottom {
    private _successCallack: (data: any) => void;
    public offset: number;

    constructor({offset}) {
        this.offset = offset;
        this._successCallack = (data: any) => {};
        window.addEventListener('scroll', this.testHandler);
    };

    testHandler(event) {
        const winScrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        if (winScrollTop + winHeight + this.offset > docHeight) {
            this._successCallack({
                winScrollTop,
                docHeight,
                winHeight,
                event
            });
        }
    };

    success(callback) {
        this._successCallack = callback;
    };

    destory() {
        window.removeEventListener('scroll', this.testHandler);
    }
};


// 用法:
// import LoadMoreFromBottom from './LoadMoreFromBottom';
// const lm = new LoadMoreFromBottom({
//   offset: 10
// });
// lm.success(data => {
//   console.log(data);
// })
// lm.destory();