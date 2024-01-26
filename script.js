// define Elements
const audioElem = document.getElementById("audio");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("previous");
const stopBtn = document.getElementById("stop");
const playbackSpeed = document.getElementById("speed");
const resetBtn = document.getElementById("reset");
const forwardBtn = document.getElementById("forward");
const backwardBtn = document.getElementById("backward");
const repeatBtn = document.getElementById("repeat");
const randomBtn = document.getElementById("random");
const trackNameElem = document.getElementById("trackname");
const fileInput = document.getElementById("file-input");
const durationElem = document.getElementById("duration");
const progressBar = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const currentDuration = document.querySelector(".current-duration");
const totalDuration = document.querySelector(".total-duration");
const volumeBar = document.getElementById("volume");

// define variables
const audioList = [
    { url: "media/music 01.mp3", name: "music 01" },
    { url: "media/music 02.mp3", name: "music 02" },
    { url: "media/music 03.mp3", name: "music 03" },
    { url: "media/music 04.mp3", name: "music 04" },
];

let isRepeat = false;
let isRandom = false;
let isPlaying = false;

audioElem.setAttribute("src", audioList[0].url);

let currentTrack = audioList.find(function (track) {
    return audioElem.getAttribute("src") == track.url;
});
let currentTrackIndex = audioList.indexOf(currentTrack);
fileInput.accept = "audio/*";
// define functions

function playMusic() {
    audioElem.play();
    isPlaying = true;

    showTrackName();
}

function pauseMusic() {
    audioElem.pause();
}

function nextMusic() {
    currentTrackIndex < audioList.length - 1 ? currentTrackIndex++ : (currentTrackIndex = 0);
    if (isRandom) {
        currentTrackIndex = Math.floor(Math.random() * audioList.length);
    }
    audioElem.src = audioList[currentTrackIndex].url;
    showTrackName();
    playMusic();
}

function prevMusic() {
    currentTrackIndex == 0 ? (currentTrackIndex = audioList.length - 1) : currentTrackIndex--;
    audioElem.src = audioList[currentTrackIndex].url;
    playMusic();
    showTrackName();
}

function showTrackName() {
    trackNameElem.innerHTML = audioList[currentTrackIndex].name.split(".mp3")[0];
}

function timeUpdate() {
    let min, sec;
    let totalMin;
    let totalSec;
    let progressPercent = (audioElem.currentTime / audioElem.duration) * 100;

    min = String(Math.floor(audioElem.currentTime / 60)).padStart(2, "0");
    sec = String(Math.floor(audioElem.currentTime % 60)).padStart(2, "0");
    currentDuration.innerHTML = min + " : " + sec;
    currentDuration.innerHTML = min + " : " + sec;

    totalMin = String(Math.floor(audioElem.duration / 60)).padStart(2, "0");
    totalSec = String(Math.floor(audioElem.duration % 60)).padStart(2, "0");
    let totalDurationTime = totalMin + " : " + totalSec;
    !audioElem.duration ? (totalDuration.innerHTML = "00 : 00") : (totalDuration.innerHTML = totalDurationTime);

    progressBar.style.width = progressPercent + "%";
}

function speedMusic(rate) {
    return (audioElem.playbackRate = rate);
}

function forwardMusic() {
    audioElem.currentTime += 10;
    playMusic();
}
function backwardMusic() {
    audioElem.currentTime -= 10;
    playMusic();
}

function stopMusic() {
    pauseMusic();
    audioElem.currentTime = 0;
}

function repeatMusic() {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle("repeat");
}

function randomMusic() {
    isRandom = !isRandom;
    randomBtn.classList.toggle("random");
}

function progressBarClick(e) {
    let clickX = e.offsetX;
    let width = this.clientWidth;
    let percentProgressClick = (clickX / width) * 100;
    audioElem.currentTime = (percentProgressClick * audioElem.duration) / 100;

    playMusic();
}



function setVolume(vol) {
    audioElem.volume = vol
}

// define Events

playBtn.addEventListener("click", playMusic);
pauseBtn.addEventListener("click", pauseMusic);
nextBtn.addEventListener("click", nextMusic);
prevBtn.addEventListener("click", prevMusic);
audioElem.addEventListener("timeupdate", timeUpdate);
audioElem.addEventListener("ended", function () {
    if (!isRepeat) {
        nextMusic();
    } else {
        (audioElem.currentTime = 0), playMusic();
    }
});
playbackSpeed.addEventListener("click", function () {
    speedMusic(1.5);
});
resetBtn.addEventListener("click", function () {
    speedMusic(1);
});
forwardBtn.addEventListener("click", forwardMusic);
backwardBtn.addEventListener("click", backwardMusic);
stopBtn.addEventListener("click", stopMusic);
repeatBtn.addEventListener("click", repeatMusic);
randomBtn.addEventListener("click", randomMusic);
progressContainer.addEventListener("click", progressBarClick);
let vol = audioElem.volume
document.body.addEventListener("keydown", function (e) {
    if (e.key == "ArrowUp") {
        vol += 0.1
        vol > 0 ? setVolume(vol) : vol = 0 && setVolume(0);
        volumeBar.value = vol
    }
    if (e.key == 'ArrowDown') {
        vol -= 0.1
        vol > 0 ? setVolume(vol) : vol = 0 && setVolume(0);
        volumeBar.value = vol
    }



})

durationElem.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        audioElem.currentTime = event.target.value;
    }
});

fileInput.addEventListener("change", function (event) {
    const files = fileInput.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = file.name;
        const fileUrl = URL.createObjectURL(file);
        const fileObject = { url: fileUrl, name: fileName };
        audioList.push(fileObject);
    }
});
