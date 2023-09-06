// 'use strict';
console.log("Welcome to My Music Web")

//Initialize the Variables
let songIndex = 0;
// create new element for playing audio
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songItemPlay = Array.from(document.getElementsByClassName("songItemPlay"));


//create a array of objects
let songs = [
    { songName: "Let me Love You", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Let me Down Slowly", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Greatful", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Waka Waka", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Enemy", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Baby Baby oh", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
]
songItems.forEach((element, i) => {
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})

//Handle play\pause click events
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
 	if(songIndex >=1)
        songItemPlays(songItemPlay[songIndex-1]);
    }
    else {
        audioElement.pause();
        masterPlay.classList.add('fa-circle-play')
        masterPlay.classList.remove('fa-circle-pause')
        gif.style.opacity = 0;
        // console.log(songItemPlay[songIndex-1])
        makeAllPlays(songItemPlay[songIndex-1]);
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // console.log('timeupdate');
    //update Seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)//gives percentage
    // console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * (audioElement.duration / 100);
})

const songItemPlays = (element)=>{
    element.classList.add('fa-circle-pause')
    element.classList.remove('fa-circle-play')
}

const makeAllPlays = () => {
    songItemPlay.forEach((element) => {
        element.classList.add('fa-circle-play')
        element.classList.remove('fa-circle-pause')
    })
}
 songItemPlay.forEach((element) => {
    element.addEventListener('click', (e) => {
        // console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        audioElement.src = `songs/${songIndex}.mp3`;//back ticks
        audioElement.currentTime = 0;
        e.target.classList.remove('fa-circle-play')
        e.target.classList.add('fa-circle-pause')
        masterSongName.innerText = songs[songIndex - 1].songName;
        // audioElement.src = `songs/${songIndex}.mp3`;//back ticks
        // audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;


        // songItems[songIndex - 1].style.backgroundColor = "red";

    })
})


document.getElementById('next').addEventListener('click', (e) => {
    if (songIndex >= 6) {
        songIndex = 1;
    } else {
        songIndex += 1;
    }
    // console.log(songItemPlay[songIndex-1]);
    makeAllPlays();
    songItemPlay[songIndex - 1].classList.remove('fa-circle-play');
    songItemPlay[songIndex - 1].classList.add('fa-circle-pause');

    masterSongName.innerText = songs[songIndex - 1].songName;
    audioElement.src = `songs/${songIndex}.mp3`;//back ticks
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})

document.getElementById('previous').addEventListener('click', (e) => {
    if (songIndex <= 1) {
        songIndex = 1;
    } else {
        songIndex -= 1;
    }
    makeAllPlays();
    songItemPlay[songIndex - 1].classList.remove('fa-circle-play');
    songItemPlay[songIndex - 1].classList.add('fa-circle-pause');

    masterSongName.innerText = songs[songIndex - 1].songName;
    audioElement.src = `songs/${songIndex}.mp3`;//back ticks
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})