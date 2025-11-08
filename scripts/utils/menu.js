const createMenu = (position, items, isSubMenu = false) => {
    if (contextMenu && !isSubMenu) {
        removeAllMenu();
    }

    const menu = document.createElement('div');
    Object.assign(menu.style, {
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: '999',
    });
    for (const item of items) {
        const menuItem = document.createElement('div');
        menuItem.innerText = item.text;
        if (item.subMenu) {
            menuItem.addEventListener('mouseenter', () => {
                createMenu({ x: position.x + 150, y: position.y }, item.subMenu, true);
            });
            const arrow = document.createElement('span');
            Object.assign(arrow.style, {
                float: 'right',
            });
            arrow.innerText = ' ►';
            menuItem.appendChild(arrow);
        }
        else {
            menuItem.addEventListener('click', () => {
                item.action();
                removeAllMenu();
            });
        }
        menu.appendChild(menuItem);
    }
    document.body.appendChild(menu);
    if (isSubMenu) {
        menu.id = 'subMenu';
        subMenus.push(menu);
        menu.addEventListener('mouseleave', () => {
            menu.remove();
            subMenus = subMenus.filter(sm => sm !== menu);
        });
    } else {
        menu.id = 'menu';
        contextMenu = menu;
    }
}

const defaultMenu = [
    {
        text: 'Create',
        subMenu: [
            {
                text: 'Rectangle',
                action: () => createRectangle(mousePosition.x, mousePosition.y),
                subMenu: null,
            },
            { 
                text: 'Circle',
                action: () => createCircle(mousePosition.x, mousePosition.y),
                subMenu: null,
            }
        ],
    }
];

const selectorMenu = [
    {
        text: 'Delete',
        action: () => deleteSelectedObject(),
        subMenu: null,
    },
    {
        text: 'Recolor',
        action: null,
        subMenu: [
            {
                text: 'Red',
                action: () => changeColorActiveElement('red'),
                subMenu: null,
            },
            {
                text: 'Green',
                action: () => changeColorActiveElement('green'),
                subMenu: null,
            },
            {
                text: 'Blue',
                action: () => changeColorActiveElement('blue'),
                subMenu: null,
            },
        ],
    }
]