//The code that is responsible for dragging the Tab
const movePoint = document.querySelector('header');
const tabBody = document.querySelector('main');

movePoint.addEventListener('mousedown', () => {

    window.addEventListener('mousemove', update);

    window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', update)
    });
})

function update ({movementX, movementY}) {
    let getStyle = window.getComputedStyle(tabBody);
    let currLeft = parseInt(getStyle.left);
    let currTop = parseInt(getStyle.top);
    console.log(currLeft + 'px', currTop + 'px');
    console.log(movementX, movementY);
    console.log(currLeft + movementX, currTop + movementY);
    tabBody.style.left = `${currLeft + movementX}px`;
    tabBody.style.top = `${currTop + movementY}px`;
};

//The code that is responsible for managing the list
const section = document.querySelector('section');

section.addEventListener('contextmenu', e => {
    e.target.parentElement.nodeName == "ARTICLE"? e.target.parentElement.remove() : e.target.remove();
})