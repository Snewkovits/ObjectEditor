/**
 * Creates a draggable and resizable selector element on the document.
 * The selector is represented as a div with handles for resizing and a move button.
 * 
 * The selector can be moved by clicking and dragging the move button,
 * and resized by dragging the bars on each side (top, bottom, left, right).
 * 
 * The selector is initially hidden and can be displayed by setting its
 * CSS display property to 'block'.
 * 
 * Events:
 * - Click on the selector will hide it if an active element is present.
 * - Mouse down on the move button allows the user to drag the selector.
 * - Mouse down on any of the bars allows the user to resize the selector.
 * - Mouse up anywhere on the document will stop the dragging or resizing action.
 * 
 * @function createSelector
 * @returns {void} This function does not return a value.
 */
const createSelector = () => {
    const selectorObject = document.createElement('div');
    selectorObject.id = 'selectorObject';
    Object.assign(selectorObject.style, {
        position: 'absolute',
        display: 'none',
        zIndex: '998',
        transition: 'left 0.1s, top 0.1s, width 0.1s, height 0.1s',
    });
    selectorObject.addEventListener('click', () => {
        if (activeElement) {
            activeElement = null;
            selector.style.display = 'none';
        }
    });

    const leftBar = document.createElement('div');
    leftBar.className = 'bar left';
    Object.assign(leftBar.style, {
        position: 'absolute',
        height: '100%',
        left: '0',
        top: '0',
        border: '2px dotted blue',
        cursor: 'ew-resize',
    });
    const rightBar = document.createElement('div');
    rightBar.className = 'bar right';
    Object.assign(rightBar.style, {
        position: 'absolute',
        height: '100%',
        right: '0',
        top: '0',
        border: '2px dotted blue',
        cursor: 'ew-resize',
    });
    const topBar = document.createElement('div');
    topBar.className = 'bar top';
    Object.assign(topBar.style, {
        position: 'absolute',
        width: '100%',
        left: '0',
        top: '0',
        border: '2px dotted blue',
        cursor: 'ns-resize',
    });
    const bottomBar = document.createElement('div');
    bottomBar.className = 'bar bottom';
    Object.assign(bottomBar.style, {
        position: 'absolute',
        width: '100%',
        left: '0',
        bottom: '0',
        border: '2px dotted blue',
        cursor: 'ns-resize',
    });
    const moveButton = document.createElement('div');
    Object.assign(moveButton.style, {
        position: 'absolute',
        width: '15px',
        height: '15px',
        left: '-6px',
        top: '-6px',
        cursor: 'move',
        border: '2px solid black',
        borderRadius: '3px',
        backgroundColor: 'white',
        lineHeight: '15px',
    });
    moveButton.innerText = '✥';

    moveButton.addEventListener('mousedown', () => {
        moveHandler = (e) => moveObject(e);
        document.addEventListener('mousemove', moveHandler);
    });
    moveButton.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', moveHandler);
        moveHandler = null;
    });

    rightBar.addEventListener('mousedown', () => {
        moveHandler = (e) => resizeRight(e);
        document.addEventListener('mousemove', moveHandler);
    });

    leftBar.addEventListener('mousedown', () => {
        moveHandler = (e) => resizeLeft(e);
        document.addEventListener('mousemove', moveHandler);
    });

    bottomBar.addEventListener('mousedown', () => {
        moveHandler = (e) => resizeBottom(e);
        document.addEventListener('mousemove', moveHandler);
    });

    topBar.addEventListener('mousedown', () => {
        moveHandler = (e) => resizeTop(e);
        document.addEventListener('mousemove', moveHandler);
    });
    
    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', moveHandler);
        moveHandler = null;
    });

    selectorObject.appendChild(leftBar);
    selectorObject.appendChild(rightBar);
    selectorObject.appendChild(topBar);
    selectorObject.appendChild(bottomBar);
    selectorObject.appendChild(moveButton);
    document.body.appendChild(selectorObject);

    selector = selectorObject;
};
/**
 * Selects an element and displays the selector around it.
 * 
 * @param {HTMLElement} element - The element to be selected.
 */
const selectObject = (element) => {
    activeElement = element; // Set the active element to the selected one.
    const rect = element.getBoundingClientRect(); // Get the bounding rectangle of the element.
    
    // Set the selector's position and size to match the selected element.
    Object.assign(selector.style, {
        display: 'block',
        left: `${rect.left + window.scrollX}px`,
        top: `${rect.top + window.scrollY}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
    });
};

/**
 * Moves the active element and the selector based on mouse movement.
 * 
 * @param {MouseEvent} event - The mouse event containing the new position.
 */
const moveObject = (event) => {
    if (activeElement) {
        const newX = event.clientX; // Get the new X position from the mouse event.
        const newY = event.clientY; // Get the new Y position from the mouse event.
        
        // Update the position of the active element and the selector.
        Object.assign(activeElement.style, {
            left: `${newX}px`,
            top: `${newY}px`,
        });
        Object.assign(selector.style, {
            left: `${newX}px`,
            top: `${newY}px`,
        });
    }    
};

/**
 * Resizes the active element and the selector to the right.
 * 
 * @param {MouseEvent} event - The mouse event containing the new width.
 */
const resizeRight = (event) => {
    if (activeElement) {
        const newWidth = event.clientX - activeElement.getBoundingClientRect().left + 2; // Calculate new width.
        activeElement.style.width = `${newWidth}px`; // Update the width of the active element.
        selector.style.width = `${newWidth}px`; // Update the width of the selector.
    }
};

/**
 * Resizes the active element and the selector to the left.
 * 
 * @param {MouseEvent} event - The mouse event containing the new width and position.
 */
const resizeLeft = (event) => {
    if (activeElement) {
        const rect = activeElement.getBoundingClientRect(); // Get the bounding rectangle of the active element.
        const newWidth = rect.right - event.clientX; // Calculate new width.
        const newLeft = event.clientX; // Get the new left position.
        
        // Update the width and position of the active element and the selector.
        activeElement.style.width = `${newWidth}px`;
        activeElement.style.left = `${newLeft}px`;
        selector.style.width = `${newWidth}px`;
        selector.style.left = `${newLeft}px`;
    }
};

/**
 * Resizes the active element and the selector from the bottom.
 * 
 * @param {MouseEvent} event - The mouse event containing the new height.
 */
const resizeBottom = (event) => {
    if (activeElement) {
        const newHeight = event.clientY - activeElement.getBoundingClientRect().top + 2; // Calculate new height.
        activeElement.style.height = `${newHeight}px`; // Update the height of the active element.
        selector.style.height = `${newHeight}px`; // Update the height of the selector.
    }
};

/**
 * Resizes the active element and the selector from the top.
 * 
 * @param {MouseEvent} event - The mouse event containing the new height and position.
 */
const resizeTop = (event) => {
    if (activeElement) {
        const rect = activeElement.getBoundingClientRect(); // Get the bounding rectangle of the active element.
        const newHeight = rect.bottom - event.clientY; // Calculate new height.
        const newTop = event.clientY; // Get the new top position.
        
        // Update the height and position of the active element and the selector.
        activeElement.style.height = `${newHeight}px`;
        activeElement.style.top = `${newTop}px`;
        selector.style.height = `${newHeight}px`;
        selector.style.top = `${newTop}px`;
    }
};

/**
 * Deletes the currently selected active element and hides the selector.
 */
const deleteSelectedObject = () => {
    if (activeElement) {
        activeElement.remove(); // Remove the active element from the DOM.
        activeElement = null; // Clear the active element.
        selector.style.display = 'none'; // Hide the selector.
    }
};

/**
 * Changes the background color of the currently active element.
 * 
 * @param {string} color - The new color to apply to the active element.
 */
const changeColorActiveElement = (color) => {
    if (activeElement) {
        activeElement.style.backgroundColor = color; // Update the background color of the active element.
    }
};

/**
 * Brings the currently active element to the front by increasing its z-index.
 */
const bringToFrontActiveElement = () => {
    if (activeElement) {
        activeElement.style.zIndex = activeElement.style.zIndex++; // Increase the z-index of the active element.
    }
};

/**
 * Sends the currently active element to the back by decreasing its z-index.
 */
const sendToBackActiveElement = () => {
    if (activeElement) {
        activeElement.style.zIndex = activeElement.style.zIndex--; // Decrease the z-index of the active element.
    }
};