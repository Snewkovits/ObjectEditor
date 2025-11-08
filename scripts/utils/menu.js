// Function to create a context menu
const createMenu = (position, items, isSubMenu = false) => {
    // Remove existing menu if it's not a submenu
    if (contextMenu && !isSubMenu) {
        removeAllMenu();
    }

    // Create a new menu element
    const menu = document.createElement('div');
    Object.assign(menu.style, {
        left: `${position.x}px`, // Set horizontal position
        top: `${position.y}px`,  // Set vertical position
        zIndex: '999',           // Set stacking order
    });

    // Iterate through menu items to create individual menu entries
    for (const item of items) {
        const menuItem = document.createElement('div');
        menuItem.innerText = item.text; // Set the text for the menu item

        // Check if the item has a submenu
        if (item.subMenu) {
            // Add event listener for mouse enter to show submenu
            menuItem.addEventListener('mouseenter', () => {
                createMenu({ x: position.x + 150, y: position.y }, item.subMenu, true);
            });
            // Create an arrow indicator for submenu
            const arrow = document.createElement('span');
            Object.assign(arrow.style, {
                float: 'right', // Align arrow to the right
            });
            arrow.innerText = ' ►'; // Set arrow text
            menuItem.appendChild(arrow); // Append arrow to menu item
        } else {
            // Add click event for menu item action
            menuItem.addEventListener('click', () => {
                item.action(); // Execute the action associated with the item
                removeAllMenu(); // Remove the menu after action
            });
        }
        menu.appendChild(menuItem); // Append the menu item to the menu
    }

    document.body.appendChild(menu); // Append the menu to the document body

    // Set menu properties based on whether it's a submenu or main menu
    if (isSubMenu) {
        menu.id = 'subMenu'; // Set ID for submenu
        subMenus.push(menu); // Track the submenu
        menu.addEventListener('mouseleave', () => {
            menu.remove(); // Remove submenu on mouse leave
            subMenus = subMenus.filter(sm => sm !== menu); // Clean up submenu tracking
        });
    } else {
        menu.id = 'menu'; // Set ID for main menu
        contextMenu = menu; // Store reference to the current context menu
    }
}

// Default menu items with actions and submenus
const defaultMenu = [
    {
        text: 'Create',
        subMenu: [
            {
                text: 'Rectangle',
                action: () => createRectangle(mousePosition.x, mousePosition.y), // Action to create a rectangle
                subMenu: null,
            },
            { 
                text: 'Circle',
                action: () => createCircle(mousePosition.x, mousePosition.y), // Action to create a circle
                subMenu: null,
            }
        ],
    },
    {
        text: 'Recolor viewport',
        action: () => null, // Placeholder action
        subMenu: [
            {
                text: 'Light',
                action: () => changeViewportColor('lightgray'), // Action to change color to light gray
                subMenu: null,
            },
            {
                text: 'Dark',
                action: () => changeViewportColor('darkgray'), // Action to change color to dark gray
                subMenu: null,
            },
            {
                text: 'Black',
                action: () => changeViewportColor('black'), // Action to change color to black
                subMenu: null,
            },
            {
                text: 'White',
                action: () => changeViewportColor('white'), // Action to change color to white
                subMenu: null,
            }
        ]
    }
];

// Selector menu items with actions and submenus
const selectorMenu = [
    {
        text: 'Delete',
        action: () => deleteSelectedObject(), // Action to delete selected object
        subMenu: null,
    },
    {
        text: 'Recolor',
        action: null, // Placeholder action
        subMenu: [
            {
                text: 'Red',
                action: () => changeColorActiveElement('red'), // Action to change color to red
                subMenu: null,
            },
            {
                text: 'Green',
                action: () => changeColorActiveElement('green'), // Action to change color to green
                subMenu: null,
            },
            {
                text: 'Blue',
                action: () => changeColorActiveElement('blue'), // Action to change color to blue
                subMenu: null,
            },
        ],
    },
    {
        text: 'Bring to Front',
        action: () => bringToFrontActiveElement(), // Action to bring the active element to the front
        subMenu: null,
    },
    {
        text: 'Send to Back',
        action: () => sendToBackActiveElement(), // Action to send the active element to the back
        subMenu: null,
    }
]