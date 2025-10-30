const createRectangle = (mouseX, mouseY) => {
    const rect = document.createElement('div');
    Object.assign(rect.style, {
        position: 'absolute',
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        width: '100px',
        height: '100px',
        backgroundColor: 'red',
        transition: 'all 0.1s',
    });

    rect.addEventListener('click', () => {
        selectObject(rect);
    });

    rect.addEventListener('contextmenu', (ecent) => {
        event.preventDefault();
        createObjectMenu(rect);
    });

    document.body.appendChild(rect);
};

const createCircle = (mouseX, mouseY) => {
    const circle = document.createElement('div');
    Object.assign(circle.style, {
        position: 'absolute',
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        width: '100px',
        height: '100px',
        backgroundColor: 'blue',
        borderRadius: '50%',
        transition: 'all 0.1s',
    });
    circle.addEventListener('click', () => {
        selectObject(circle);
    });

    document.body.appendChild(circle);
};