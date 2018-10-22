import ScrollWatcher from './src/ScrollWatcher';
let sw = new ScrollWatcher();
sw.on('done',data => {
    console.log(data);
});