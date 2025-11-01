const deleteObject = (element) => {
    element.remove();
    activeElement = null;
    if (selector) {
        selector.style.display = 'none';
    }
};

const editObjectBlue = (element) => {
    element.style.backgroundColor = 'blue';
};

const editObjectRed = (element) => {
    element.style.backgroundColor = 'red';
};

const objectMenuElements = {
    deleteObject: {
        text: 'Delete Object',
        action: deleteObject,
    },
    editObjectBlue: {
        text: 'Change Color to Blue',
        action: editObjectBlue,
    },
    editObjectRed: {
        text: 'Change Color to Red',
        action: editObjectRed,
    },
}

const createObjectMenu = () => {
    if (!activeElement) return;

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

    for (const key in objectMenuElements) {
        const item = document.createElement('div');
        item.innerText = objectMenuElements[key].text;
        item.addEventListener('click', () => {
            objectMenuElements[key].action(activeElement);
            menu.remove();
            contextMenu = null;
        });
        menu.appendChild(item);
    }

    document.body.appendChild(menu);
    contextMenu = menu;
};