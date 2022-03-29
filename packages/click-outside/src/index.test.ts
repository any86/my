import clickOutside from './index';
test('点击元素外触发回调', done => {
    const onClick = jest.fn();
    const el = document.createElement('div');
    const el2 = document.createElement('div');
    const { body } = document;
    body.appendChild(el);
    body.appendChild(el2);
    const remove = clickOutside(el, onClick);
    el2.dispatchEvent(new Event('touchend',{bubbles:true}));
    el2.dispatchEvent(new Event('click',{bubbles:true}));

    setTimeout(() => {
        expect(onClick.mock.calls[0][0].type).toBe('touchend');
        remove();
        done();
    }, 100);
});


test('点击元素内部不触发回调', done => {
    const onClick = jest.fn();
    const el = document.createElement('div');
    const el2 = document.createElement('div');
    const { body } = document;
    body.appendChild(el);
    el.appendChild(el2);
    const remove = clickOutside(el, onClick);
    el2.dispatchEvent(new Event('touchend',{bubbles:true}));
    setTimeout(() => {
        expect(onClick).toBeCalledTimes(0);
        remove();
        done();
    }, 100);
});
