import ScrollWatcher from './src/ScrollWatcher';
let $el = document.getElementById('box');
let sw = new ScrollWatcher();
let index = 1;
sw.on('reach-bottom', data => {
    const bgColor = index & 1 ? '#bbb' : '#eee';
    let node = document.createElement('div');
    node.style.cssText=`height:100vh;line-height:100vh;text-align:center;font-size:60px;background: ${bgColor};`;


    setTimeout(()=>{
        $el.appendChild(node);
    }, 30000)
    
    console.log(index, data);

    index++;
});