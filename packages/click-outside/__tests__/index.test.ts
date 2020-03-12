import clickOutside from '@6h/click-outside';
test('xyz', () => {
    console.log(clickOutside)
    const onClick = jest.fn();
    const el = document.createElement('div');
    const el2 = document.createElement('div');
    const {body} = document;
    body.appendChild(el);
    body.appendChild(el2);

    const event = new Event('click');
    el2.dispatchEvent(event);
    clickOutside(el, onClick);
    expect(onClick).toHaveBeenCalledTimes(1);
});
