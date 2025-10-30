document.addEventListener('mousemove', (event) => {
    mousePosition = { x: event.clientX, y: event.clientY };
});

document.addEventListener('click', () => {
    if (contextMenu) {
        contextMenu.remove();
        contextMenu = null;
    }
});

document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    createContextMenu();
});

document.addEventListener('DOMContentLoaded', () => {
    createSelector();
});