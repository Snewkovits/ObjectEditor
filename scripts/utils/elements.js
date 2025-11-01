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
    });

    element.addEventListener('click', () => {
        selectObject(element);
    });

    document.body.appendChild(element);
};

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
    });
    element.addEventListener('click', () => {
        selectObject(element);
    });

    document.body.appendChild(element);
};