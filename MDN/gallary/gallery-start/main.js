const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imgFileNames = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

/* Looping through images */
for(const img of imgFileNames) {
    const pic = document.createElement('img');
    pic.setAttribute('src', `images/${img}`);
    thumbBar.appendChild(pic);
}

function imageChoice(click) {
    if(displayedImage.src != click.target.src) {
        displayedImage.src = click.target.src
    }
}

thumbBar.addEventListener('click', imageChoice)

/* Wiring up the Darken/Lighten button */

function DarkenLighten() {
    const isDark = btn.className;
    switch(isDark) {
        case 'light':
            overlay.style.backgroundColor = 'rgba(0,0,0,0)';
            btn.textContent = 'Darken';
            btn.classList.add('dark');
            btn.classList.remove('light');
            break;
        case 'dark':
            overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
            btn.textContent = 'Lighten';
            btn.classList.add('light');
            btn.classList.remove('dark');
    }
}

btn.addEventListener('click', DarkenLighten);