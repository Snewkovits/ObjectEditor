// Track the current mouse position as the user moves the pointer
document.addEventListener('mousemove', (event) => {
    // mousePosition is expected to be a global or outer-scope object
    mousePosition = { x: event.clientX, y: event.clientY };
});

// Close any open context menus when the user clicks anywhere
document.addEventListener('click', () => {
    removeAllMenu();
});

// Show a custom context menu on right-click instead of the browser default
document.addEventListener('contextmenu', (event) => {
    // Prevent the browser's default context menu
    event.preventDefault();

    // If an "activeElement" is set, show a selector-specific menu,
    // otherwise show the default context menu.
    // createMenu and selectorMenu/defaultMenu are expected to be defined elsewhere.
    if (activeElement) {
        createMenu({ x: event.clientX, y: event.clientY }, selectorMenu);
    } else {
        createMenu({ x: event.clientX, y: event.clientY }, defaultMenu);
    }
});

// Initialize selector-related UI once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // createSelector is expected to set up selection UI or handlers
    createSelector();
});

// Remove any existing context menu and its submenus
const removeAllMenu = () => {
    if (contextMenu) {
        // Remove the main context menu element from the DOM
        contextMenu.remove();
        contextMenu = null;

        // Remove any submenu elements (subMenus is expected to be an iterable of DOM nodes)
        for (const subMenu of subMenus) {
            subMenu.remove();
        }
    }
};

// Convenience helper to change the page (viewport) background color
const changeViewportColor = (color) => {
    document.body.style.backgroundColor = color;
};