const firstHand = document.querySelector('.secondHand');
const secondHand = document.querySelector('.minuteHand');
const thirdHand = document.querySelector('.hourHand');
const lightAndDark = document.querySelector('.lightAndDark');
let isLight = true;
let numbers = 24;
numbers = "24";

function inspectLightDark() {
    if(isLight == true) {
        document.documentElement.style.setProperty('--numbers', '#747474');
        document.documentElement.style.setProperty('--clockBody', '#d7d7d7');
        document.documentElement.style.setProperty('--clockFrame', '#ededed');
        document.documentElement.style.setProperty('--bodyColor', '#fff');
        document.documentElement.style.setProperty('--secondsHand', 'red');
        document.documentElement.style.setProperty('--hoursMinutes', '#000');
        lightAndDark.childNodes[0].classList.remove('fa-sun');
        lightAndDark.childNodes[0].classList.add('fa-moon');
        console.log(isLight);
    } else {
        document.documentElement.style.setProperty('--numbers', '#e3e3e3');
        document.documentElement.style.setProperty('--clockBody', '#2c2c2c');
        document.documentElement.style.setProperty('--clockFrame', '#3a3a3a');
        document.documentElement.style.setProperty('--bodyColor', '#565656');
        document.documentElement.style.setProperty('--secondsHand', 'red');
        document.documentElement.style.setProperty('--hoursMinutes', '#fff');
        lightAndDark.childNodes[0].classList.remove('fa-moon');
        lightAndDark.childNodes[0].classList.add('fa-sun');
        console.log(isLight);
    }
}

lightAndDark.addEventListener('click', () => {
    switch(isLight) {
        case true:
            isLight = false;
            inspectLightDark();
            break;
        case false:
            isLight = true;
            inspectLightDark();
            break;
        default:
            isLight = true;
            inspectLightDark();
    }
})

function timeIsUpdating() {
    let time = new Date();
    let seconds = time.getSeconds();
    let minutes = time.getMinutes();
    let hours = time.getHours();
    firstHand.style.transform = `rotateZ(${((360/12)/5)*seconds}deg) translateY(-40px)`;
    secondHand.style.transform = `rotateZ(${(360/12/5)*minutes}deg) translateY(-50px)`;
    thirdHand.style.transform = `rotateZ(${(360/12)*hours}deg) translateY(-20px)`;
}

window.addEventListener('load', () => {
    timeIsUpdating();
})

setInterval(timeIsUpdating, 1000);