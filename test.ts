import ScrollWatcher from './src/ScrollWatcher';
let sw = new ScrollWatcher();
sw.on('done', () => {
    console.log(123);
})