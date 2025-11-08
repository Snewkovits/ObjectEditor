document.addEventListener('mousemove', (event) => {
    mousePosition = { x: event.clientX, y: event.clientY };
});

document.addEventListener('click', () => {
    removeAllMenu();
});

document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    if (activeElement) {
        createMenu({ x: event.clientX, y: event.clientY }, selectorMenu);
    } else {
        createMenu({ x: event.clientX, y: event.clientY }, defaultMenu);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    createSelector();
});

const removeAllMenu = () => {
    if (contextMenu) {
        contextMenu.remove();
        contextMenu = null;
        for (const subMenu of subMenus) {
            subMenu.remove();
        }
    }
};