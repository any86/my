const eventNames = ['click', 'touchend'];
export default function (el: Node, callback: (ev:Event) => void) {
    let isTouch = false;
    function handler(ev: Event): void {
        // touchend
        if (eventNames[1] === ev.type) isTouch = true;
        // 禁止移动端touchend触发后还触发click
        if (eventNames[0] === ev.type && isTouch) return;

        if (!el.contains(ev.target as Node)) {
            callback(ev);
        }
    }

    eventNames.forEach(name => {
        document.addEventListener(name, handler);
    });

    return () => {
        eventNames.forEach(name => {
            document.removeEventListener(name, handler);
        });
    }
}
