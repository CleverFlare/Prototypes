const plane = document.querySelector('.fa-helicopter');
const btn = document.querySelector('#btnStart');

btn.addEventListener('click', () => {
    plane.setAttribute('id', 'fly');
    plane.addEventListener('animationend', () => {
        plane.removeAttribute('id');
    })
})