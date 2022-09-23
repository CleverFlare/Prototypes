//some initial variables
const video = document.querySelector('video');
const videoFrame = document.querySelector('.vidFrame');

const timeline = document.querySelector('.timeLine');
const current = document.querySelector('.timeLine .currentTime');
const volLine = document.querySelector('.volumeLine');
const currVol = document.querySelector('.currentVol');
let mouseDetection;

const currTime = document.querySelector('.currentSec');
const dur = document.querySelector('.endTime');

const esBtnsGroup = document.querySelector('.essentialBtns');
const lhcBtns = document.querySelector('.lhcBtns');
const rhcBtns = document.querySelector('.rhcBtns');

const stateDisplay = document.querySelector('.stateDisplay');
let disDur;

function disFunc() {
    stateDisplay.style.display = 'flex';
    clearTimeout(disDur);
    disDur = setTimeout(() => {
        stateDisplay.style.display = 'none';
    }, 1000);
}

//for video states(play and pause) as well as all of its effect such as displaying it
function playpause() {
    let playpauseBtn;
    for(let x = 0; x < esBtnsGroup.children.length; x++) {
        if(esBtnsGroup.children[x].className === 'startBtn') {
            playpauseBtn = esBtnsGroup.children[x];
        }
    }
    if(video.paused) {
        video.play();
        playpauseBtn.firstElementChild.classList.add('fa-pause');
        playpauseBtn.firstElementChild.classList.remove('fa-play');
        stateDisplay.firstElementChild.className = 'fa-solid fa-pause';
        disFunc();
    } else {
        video.pause();
        playpauseBtn.firstElementChild.classList.remove('fa-pause');
        playpauseBtn.firstElementChild.classList.add('fa-play');
        stateDisplay.firstElementChild.className = 'fa-solid fa-play';
        disFunc();
    }
}
//play and pause when clicking anywhere on the video window
video.addEventListener('click', playpause);

videoFrame.addEventListener('mousemove', () => {
    clearTimeout(mouseDetection);
    videoFrame.classList.add('hovered');
    videoFrame.style.cursor = 'default';
    mouseDetection = setTimeout(() => {
        videoFrame.classList.remove('hovered');
        videoFrame.style.cursor = 'none';
    }, 1000);
})

//keyboard keys functionalities
function keysFunc(e) {
    switch(e.code) {
        case 'Space':
            playpause();
            break;
        case 'ArrowRight':
            video.currentTime += 5;
            stateDisplay.firstElementChild.className = 'fa-solid fa-forward';
            disFunc();
            break;
        case 'ArrowLeft':
            video.currentTime -= 5;
            stateDisplay.firstElementChild.className = 'fa-solid fa-backward';
            disFunc();
            break;
        case 'KeyF':
            if(!window.screenY && !window.screenX) {
                videoFrame.requestFullscreen();
                rhcBtns.firstElementChild.firstElementChild.classList.add('fa-compress');
                rhcBtns.firstElementChild.firstElementChild.classList.remove('fa-expand');
            } else {
                document.exitFullscreen();
                rhcBtns.firstElementChild.firstElementChild.classList.remove('fa-compress');
                rhcBtns.firstElementChild.firstElementChild.classList.add('fa-expand');
            }
            break;
        case 'KeyM':
            if(video.muted === true) {
                video.muted = false;
                lhcBtns.firstElementChild.firstElementChild.classList.remove('fa-volume-xmark');
                lhcBtns.firstElementChild.firstElementChild.classList.add('fa-volume-high');
                stateDisplay.firstElementChild.className = 'fa-solid fa-volume-high';
                disFunc();
            } else {
                video.muted = true;
                lhcBtns.firstElementChild.firstElementChild.classList.add('fa-volume-xmark');
                lhcBtns.firstElementChild.firstElementChild.classList.remove('fa-volume-high');
                stateDisplay.firstElementChild.className = 'fa-solid fa-volume-xmark';
                disFunc();
            }
    }
}
document.addEventListener('keydown', keysFunc)

//this function for the functionalities of the essential buttons such as the play button and forward etc..
function essentialBtns(e) {
    if(e.target.className === 'startBtn') {
        if(video.paused) {
            video.play();
            e.target.firstElementChild.classList.add('fa-pause');
            e.target.firstElementChild.classList.remove('fa-play');
        } else {
            video.pause();
            e.target.firstElementChild.classList.remove('fa-pause');
            e.target.firstElementChild.classList.add('fa-play');
        }
    } else if(e.target.className === 'forwardBtn') {
        video.currentTime += 5;
    } else if(e.target.className === 'backwardBtn') {
        video.currentTime -= 5;
    }
}
esBtnsGroup.addEventListener('click', essentialBtns);

function rhcBtnsFunc(e) {
    if(e.target.className === 'fsBtn') {
        if(e.target.firstChild.classList[1] === 'fa-expand') {
            videoFrame.requestFullscreen();
            e.target.firstChild.classList.add('fa-compress');
            e.target.firstChild.classList.remove('fa-expand');
        } else if(e.target.firstChild.classList[1] === 'fa-compress') {
            document.exitFullscreen();
            e.target.firstChild.classList.remove('fa-compress');
            e.target.firstChild.classList.add('fa-expand');
        }
    }
}
rhcBtns.addEventListener('click', rhcBtnsFunc);

function muteUnmute(e) {
    if(e.target.className === 'muteTog') {
        if(e.target.firstElementChild.classList[1] === 'fa-volume-high') {
            e.target.firstElementChild.classList.remove('fa-volume-high');
            e.target.firstElementChild.classList.add('fa-volume-xmark');
            video.muted = true;
        } else if(e.target.firstElementChild.classList[1] === 'fa-volume-xmark') {
            e.target.firstElementChild.classList.add('fa-volume-high');
            e.target.firstElementChild.classList.remove('fa-volume-xmark');
            video.muted = false;
        }
    }
}

lhcBtns.addEventListener('click', muteUnmute);

function clickUpdateVol(event) {
    event.preventDefault();
    let mousePos = event.screenX - currVol.getBoundingClientRect().x;
    if(mousePos < volLine.clientWidth && mousePos > 0) {
        currVol.style.width = `${mousePos / volLine.clientWidth * 100}%`;
        currVol.setAttribute('data-time', mousePos / volLine.clientWidth * 100);
        video.volume = currVol.getAttribute('data-time') / 100;
    }
}

volLine.addEventListener('mousedown', e => {
    clickUpdateVol(e);

    document.addEventListener('mousemove', clickUpdateVol)

    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', clickUpdateVol);
    })
})

//for updating the current time of the video in the UI
function currentTimeDis() {
    current.style.width = `${video.currentTime / video.duration * 100}%`;
    current.setAttribute('data-time', video.currentTime / video.duration * 100);

    let hours = Math.floor(video.currentTime / (60*2));
    let mins = Math.floor(video.currentTime / 60);
    let secs = Math.floor(video.currentTime % 60);
    
    currTime.textContent = TimeConvertor(hours) + ':' + TimeConvertor(mins) + ':' + TimeConvertor(secs);
}
video.addEventListener('timeupdate', currentTimeDis);

//giving the value of the video duration
function videoDuration() {
    let hourDuration = Math.floor(video.duration / (60*2));
    let minsDuration = Math.floor(video.duration / 60);
    let secsDuration = Math.floor(video.duration % 60);
    dur.textContent = TimeConvertor(hourDuration) + ':' + TimeConvertor(minsDuration) + ':' + TimeConvertor(secsDuration);
}
//once the window is loaded it implements the videoDuration() function
document.addEventListener('load', videoDuration);
//sometimes the document load handler doesn't work properly, so i added this video loadedmetadata handler for supporting purposes
video.addEventListener('loadedmetadata', videoDuration);


//this function returns 0 before the number if the number is less than 10
function TimeConvertor(num) {
    if(num < 10) {
        return '0' + num;
    } else {
        return num;
    }
}

//a function for the update of the video current time
function updateTimeLine(event) {
    event.preventDefault();
    let mousePos = event.screenX - current.getBoundingClientRect().x;
    if(mousePos < timeline.clientWidth && mousePos > 0) {
        current.style.width = `${mousePos / timeline.clientWidth * 100}%`;
        current.setAttribute('data-time', mousePos / timeline.clientWidth * 100);
        video.currentTime = current.getAttribute('data-time') / 100 * video.duration;
        console.log(mousePos);
    }
}
timeline.addEventListener('mousedown', e => {
    updateTimeLine(e);

    document.addEventListener('mousemove', updateTimeLine)

    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', updateTimeLine);
    })
});
//271