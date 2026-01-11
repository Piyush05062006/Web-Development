console.log("Welcome to Spotify");

let audioElement=new Audio('icons/song1.mp3');
let songIndex=0;
let masterPlay=document.getElementsByClassName('masterPlay')[0];
let myProgressBar=document.getElementById('myProgressBar');
let gif = document.querySelector('.songName img');
let masterSongName = document.getElementById('masterSongName');
let songs=[
    {songName:"Dancing the flames",filePath:"icons/song1.mp3",coverPath:"icons/song1.jpg"},
    {songName:"slow life",filePath:"icons/slowlife.mp3",coverPath:"icons/slowlife.jpg"},
    {songName:"yesterday",filePath:"icons/yesterday.mp3",coverPath:"icons/yesterday.jpg"},
    {songName:"hearty",filePath:"icons/hearty.mp3",coverPath:"icons/hearty.jpg"},
]
//Handle Play/Pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        // reflect on song list
        resetIcons();
        songPlays[songIndex].src = "icons/circle-pause.svg";
        // change to pause icon
        masterPlay.src = "icons/circle-pause.svg";
        //show gif
        gif.style.opacity=1;
    } 
    else {
        audioElement.pause();
        songPlays[songIndex].src = "icons/circle-play.svg";
        // change to play icon
        masterPlay.src = "icons/circle-play.svg";
        //hide gif
        gif.style.opacity=0;
   }
});  

//update myProgressBar
audioElement.addEventListener('timeupdate',()=>{
    //update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})

//to play the diffent songs in loop
audioElement.addEventListener('ended', () => {
    songIndex++;

    if (songIndex >= songs.length) {
        songIndex = 0; // loop back to first
    }

    playSong();
});

function playSong() {
    audioElement.src = songs[songIndex].filePath;
    audioElement.play();

    // update UI
    masterSongName.innerText = songs[songIndex].songName;
}
let prevBtn = document.getElementsByClassName('leftButton')[0];
let nextBtn = document.getElementsByClassName('rightButton')[0];

nextBtn.addEventListener('click', () => {
    songIndex++;

    if (songIndex >= songs.length) {
        songIndex = 0; // loop to first song
    }

    playSong();
});
prevBtn.addEventListener('click', () => {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1; // go to last song
    }

    playSong();
});

let songPlays = document.querySelectorAll(".songPlay");

function resetIcons() {
    songPlays.forEach(btn => {
        btn.src = "icons/circle-play.svg";
    });
}

songPlays.forEach(btn => {
    btn.addEventListener("click", () => {

        let index = Number(btn.dataset.index);

        // if same song & playing → pause
        if (songIndex === index && !audioElement.paused) {
            audioElement.pause();
            btn.src = "icons/circle-play.svg";
            masterPlay.src = "icons/circle-play.svg";
            gif.style.opacity = 0;
        } 
        // play new song
        else {
            songIndex = index;
            audioElement.src = songs[index].filePath;
            audioElement.currentTime = 0;
            audioElement.play();

            resetIcons();
            btn.src = "icons/circle-pause.svg";

            masterPlay.src = "icons/circle-pause.svg";
            masterSongName.innerText = songs[index].songName;
            gif.style.opacity = 1;
        }
    });
});

let durationElements = document.querySelectorAll(".songDuration");

songs.forEach((song, index) => {
    let audio = new Audio(song.filePath);

    audio.addEventListener("loadedmetadata", () => {
        let minutes = Math.floor(audio.duration / 60);
        let seconds = Math.floor(audio.duration % 60);

        if (seconds < 10) seconds = "0" + seconds;

        durationElements[index].innerText = `${minutes}:${seconds}`;
    });
});





