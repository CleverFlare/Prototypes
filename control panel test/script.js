const range = document.querySelectorAll('input')
const rangeSize = document.querySelector('#size');
const rangeRot = document.querySelector('#rotation');
const bgcolor = document.querySelector('#bgcolor');
const borders = document.querySelector('#borders');
const textCol = document.querySelector('#textcol');
const radius = document.querySelector('#radius');
const shadowBtn = document.querySelector('#chShadow');
const paddingBtn1 = document.querySelector('#padbtn1');
const paddingBtn2 = document.querySelector('#padbtn2');
const contentBtn = document.querySelector('#content');
const btn = document.querySelector('button');
let defVal = 1;

function inputManipulation () {
    btn.style.transform = `rotateZ(${rangeRot.value*360/(100*2)}deg) scale(${defVal + rangeSize.value/20})`;
    btn.style.backgroundColor = `${bgcolor.value}`;
    btn.style.borderWidth = `${borders.value/10}px`;
    btn.style.color = `${textCol.value}`;
    btn.style.borderRadius = `${radius.value/10}px`;
    btn.style.paddingInline = `${paddingBtn1.value}px`;
    btn.style.paddingBlock = `${paddingBtn2.value}px`;
    btn.innerText = `${contentBtn.value}`;
}
window.onload = () => {
    inputManipulation()
}
range.forEach(e => {
    e.parentElement.childNodes[e.parentElement.childNodes.length-1].innerText = e.value;
    e.oninput = () => {
        inputManipulation()
    }
})
shadowBtn.addEventListener('click', e => {
    if(!shadowBtn.checked) btn.classList.remove('shadow'); 
    else btn.classList.add('shadow');
})
btn.addEventListener('click', () => {
    alert(`you have just clicked "${btn.innerText}" button`)
})