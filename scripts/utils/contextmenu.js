const menuElements = {
    rectangle: {
        text: 'Rectangle',
        action: createRectangle,
    },
    circle: {
        text: 'Circle',
        action: createCircle,
    },
}

const createContextMenu = () => {
    if (activeElement) return;

    const mouseX = mousePosition.x;
    const mouseY = mousePosition.y;

    if (contextMenu) {
        contextMenu.remove();
    }

    const menu = document.createElement('div');
    Object.assign(menu.style, {
        left: `${mouseX}px`,
        top: `${mouseY}px`,
        zIndex: '999',
    })
    menu.id = 'menu';

    for (const key in menuElements) {
        const item = document.createElement('div');
        item.innerText = menuElements[key].text;
        item.addEventListener('click', () => {
            menuElements[key].action(mouseX, mouseY);
            menu.remove();
            contextMenu = null;
        });
        menu.appendChild(item);
    }

    document.body.appendChild(menu);
    contextMenu = menu;
}