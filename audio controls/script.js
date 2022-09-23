//play, pause, forward, and backward buttons functionalities
const functionalbtns = document.querySelector('#ContBtns');
const audio = document.querySelector('audio');
const context = new AudioContext(audio);
const cdIcon = document.querySelector('section div');
const jsmediatags = window.jsmediatags;

window.addEventListener('load', () => {
    audioDuration.innerText = numberFix(Math.round(audio.duration / 60)) + ':' + numberFix(Math.round(audio.duration % 60));
})

functionalbtns.addEventListener('click', event => {
    if(!audio.getAttribute('src')) {
        alert('no audio has been included');
    } else {
        //the extent of increasing and decreasing when clicking on forward and backward buttons
        let moveAmount = 5;

        //we access here the target of the event(which is the click event) and then we select the classname to differentiate between the child elements of the div, that allows us to access whatever the element we desire by simply clicking on it
        if(event.target.className == 'playpause') {

            //we here are checking to see whether the audio is paused or not by the paused property which returns true if the audio is paused and vice versa
            if(!audio.paused) {
                //here we access the childnode api to select the i element so that we can alter the icon of the play when the audio is currently paused and set it to the pause icon
                event.target.childNodes[0].classList.remove('fa-pause');
                event.target.childNodes[0].classList.remove('fa-redo');
                event.target.childNodes[0].classList.add('fa-play');
                audio.pause();
                cdIcon.style.animationPlayState = 'paused';
            } else {
                //the opposite of the one above in the if statement, here we say that if the audio is paused already we want to alter the icon to the play icon
                event.target.childNodes[0].classList.remove('fa-play');
                event.target.childNodes[0].classList.remove('fa-redo');
                event.target.childNodes[0].classList.add('fa-pause');
                audio.play();
                cdIcon.style.animationPlayState = 'running';
            }

        }
        else if (event.target.className == 'forward') {
            //we here state that when you click on the forward button the currentTime of the audio (which is a property that returns the position of the audio track by seconds) to move by positive number of the value of the moveAmount variable (that's why it's "1" not "-1")
            audio.currentTime += moveAmount * 1;
        } 
        else if (event.target.className == 'backward') {
            audio.currentTime += moveAmount * -1;
        }
    }
})

//--------------------track function and the time counter----------------------------
const audioTrack = document.querySelector('#timeLine input[type="range"]');
const currentSec = document.querySelector('.start');
const audioDuration = document.querySelector('.end');
//this function is meant to make the change in the input values easier as you can call the function once you need it anytime
function trackSlider () {
    //by linear gradient and since there is no progress bar for range elements on chrome, we use it to give the same effect as the progress bar by merely changing the value of the linear gradient
    audioTrack.style.backgroundImage = 'linear-gradient(to right, orange 0%, orange '+ audioTrack.value +'%, rgba(255,255,255,.5) ' + audioTrack.value  +'%, rgba(255,255,255,.5)';
}

//a function to add 0 on the left to the number if it's less than 10
function numberFix(num) {
    if(num < 10) {
        return '0' + num;
    }
    else if (isNaN(num)) {
        return '00';
    }
    else {
        return num;
    }
}

//as long as the audio is played, the track will move along with it
audio.addEventListener('timeupdate', () => {
    //a simple equation to return the currentTime value and make it in the form of a percentage, and then we round the number, round is crucial for us in this case
    audioTrack.value = Math.round(audio.currentTime / audio.duration * 100);
    //here we call the function of the linear gradient idea that we've mentioned above so that it updates along with the track itself
    trackSlider();
    
    //now let's display the current time via our element with the class .start
    currentSec.innerText = numberFix(Math.round(audio.currentTime / 60)) + ':' + numberFix(Math.round(audio.currentTime % 60));
    
    //in case the audio ends we want the pause button to turn into play button
    if(audio.ended) {
        document.querySelector('.playpause .fa-solid').classList.add('fa-redo');
        document.querySelector('.playpause .fa-solid').classList.remove('fa-pause');
    }
})

//an event linstener to mainpulate the currentTime property by the track
audioTrack.addEventListener('input', () => {
    //another simple equation to return the value of the audioTrack after converting it to fit with the duration and the currentTime property
    audio.currentTime = Math.round(audioTrack.value / 100 * audio.duration);
})

//----------------------------volume controlling---------------------------------
const volSlider = document.querySelector('#volControl');

volSlider.addEventListener('input', () => {
    volSlider.style.backgroundImage = 'linear-gradient(to right, #fff 0%, #fff '+ volSlider.value +'%, rgba(255,255,255,0) ' + volSlider.value  +'%, rgba(255,255,255,0)';
    audio.volume = volSlider.value / 100;
})

//---------------------------music choice-----------------------------------------
const fileSelector = document.querySelector('section div input[type="file"]');
const musicTitle = document.querySelector('header h1'); 
const musicArtist = document.querySelector('header h2');

fileSelector.addEventListener('change', e => {
    audio.src = URL.createObjectURL(fileSelector.files[0]);
    jsmediatags.read(fileSelector.files[0], {
        onSuccess: function(tag) {
            musicTitle.innerText = tag.tags.title;
            musicArtist.innerText = tag.tags.artist;
            audio.currentTime = 0;
            audioDuration.innerText = numberFix(Math.round(audio.duration / 60)) + ':' + numberFix(Math.round(audio.duration % 60));
            document.querySelector('.playpause .fa-solid').classList.add('fa-play');
            document.querySelector('.playpause .fa-solid').classList.remove('fa-pause');
            audio.volume = volSlider.value;
        }
        ,onError: function(error) {
            console.log(error);
        }        
    })
})
console.log(context);