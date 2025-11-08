const createRectangle = (mouseX, mouseY) => {
    const element = document.createElement('div');
    Object.assign(element.style, {
        position: 'absolute',
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        width: '100px',
        height: '100px',
        backgroundColor: 'red',
        transition: 'all 0.1s',
        zIndex: '500',
    });

    element.addEventListener('click', () => {
        selectObject(element);
    });

    document.body.appendChild(element);
};

/**
 * Creates a circular div element at the specified mouse coordinates.
 *
 * @param {number} mouseX - The x-coordinate of the mouse position.
 * @param {number} mouseY - The y-coordinate of the mouse position.
 * 
 * @returns {void} This function does not return a value.
 * 
 * @description The created circle has a fixed size of 100x100 pixels, 
 * a blue background, and is positioned absolutely on the page. 
 * It also has a click event listener that triggers the selectObject function 
 * when the circle is clicked.
 */
const createCircle = (mouseX, mouseY) => {
    const element = document.createElement('div');
    Object.assign(element.style, {
        position: 'absolute',
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        width: '100px',
        height: '100px',
        backgroundColor: 'blue',
        borderRadius: '50%',
        transition: 'all 0.1s',
        zIndex: '500',
    });
    element.addEventListener('click', () => {
        selectObject(element);
    });

    document.body.appendChild(element);
};