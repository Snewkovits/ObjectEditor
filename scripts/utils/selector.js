const createSelector = () => {
    const selectorObject = document.createElement('div');
    selectorObject.id = 'selectorObject';
    Object.assign(selectorObject.style, {
        position: 'absolute',
        display: 'none',
        zIndex: '1000',
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

const selectObject = (element) => {
    activeElement = element;
    const rect = element.getBoundingClientRect();
    
    Object.assign(selector.style, {
        display: 'block',
        left: `${rect.left + window.scrollX}px`,
        top: `${rect.top + window.scrollY}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
    });
};

const moveObject = (event) => {
    if (activeElement) {
        const newX = event.clientX;
        const newY = event.clientY;
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

const resizeRight = (event) => {
    if (activeElement) {
        const newWidth = event.clientX - activeElement.getBoundingClientRect().left + 2;
        activeElement.style.width = `${newWidth}px`;
        selector.style.width = `${newWidth}px`;
    }
};

const resizeLeft = (event) => {
    if (activeElement) {
        const rect = activeElement.getBoundingClientRect();
        const newWidth = rect.right - event.clientX;
        const newLeft = event.clientX;
        activeElement.style.width = `${newWidth}px`;
        activeElement.style.left = `${newLeft}px`;
        selector.style.width = `${newWidth}px`;
        selector.style.left = `${newLeft}px`;
    }
};

const resizeBottom = (event) => {
    if (activeElement) {
        const newHeight = event.clientY - activeElement.getBoundingClientRect().top + 2;
        activeElement.style.height = `${newHeight}px`;
        selector.style.height = `${newHeight}px`;
    }
};

const resizeTop = (event) => {
    if (activeElement) {
        const rect = activeElement.getBoundingClientRect();
        const newHeight = rect.bottom - event.clientY;
        const newTop = event.clientY;
        activeElement.style.height = `${newHeight}px`;
        activeElement.style.top = `${newTop}px`;
        selector.style.height = `${newHeight}px`;
        selector.style.top = `${newTop}px`;
    }
};