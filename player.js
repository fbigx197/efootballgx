let music = document.getElementById("music");
let progress = document.getElementById("progress");

let songs = [

{
title:"Bad Bunny - EoO",
file:"eoo.mp3",
cover:"badbunny.png"
},

{
title:"Bad Bunny - Baile Inolvidable",
file:"baile.mp3",
cover:"badbunny.png"
},

{
title:"Fuerza Regida - Coqueta",
file:"COQUETA.mp3",
cover:"coqueta.jfif"
},

{
title:"Bad Bunny - NUEVAYoL",
file:"NUEVAYoL.mp3",
cover:"badbunny.png"
},

{
title:"Michel Telo - Ai se eu te peg",
file:"mosa.mp3",
cover:"mosa.jfif"
}

];

/* RECUPERAR DATOS */

let currentSong = parseInt(localStorage.getItem("songIndex")) || 0;
let savedTime = parseFloat(localStorage.getItem("songTime")) || 0;

let playing = false;

/* CARGAR CANCION */

function loadSong(){

music.src = songs[currentSong].file;

document.getElementById("songTitle").innerText = songs[currentSong].title;
document.getElementById("cover").src = songs[currentSong].cover;

music.currentTime = savedTime;

music.play();
playing=true;

}

/* SIGUIENTE */

function nextSong(){

currentSong++;

if(currentSong>=songs.length){
currentSong=0;
}

savedTime=0;

loadSong();

}

/* ANTERIOR */

function prevSong(){

currentSong--;

if(currentSong<0){
currentSong=songs.length-1;
}

savedTime=0;

loadSong();

}

/* PLAY / PAUSE */

function togglePlay(){

if(playing){
music.pause();
playing=false;
}else{
music.play();
playing=true;
}

}

/* VOLUMEN */

function setVolume(value){
music.volume=value;
}

/* ACTUALIZAR PROGRESO */

music.addEventListener("timeupdate",function(){

progress.value=music.currentTime;

let current=formatTime(music.currentTime);
let total=formatTime(music.duration);

document.getElementById("currentTime").innerText=current;
document.getElementById("duration").innerText=total;

/* GUARDAR ESTADO */

localStorage.setItem("songIndex", currentSong);
localStorage.setItem("songTime", music.currentTime);

});

/* METADATA */

music.addEventListener("loadedmetadata",function(){

progress.max=music.duration;

});

/* MOVER PROGRESO */

progress.addEventListener("input",function(){

music.currentTime=progress.value;

});

/* AUTO SIGUIENTE */

music.addEventListener("ended",function(){

nextSong();

});

/* FORMATO TIEMPO */

function formatTime(time){

if(isNaN(time)) return "0:00";

let minutes=Math.floor(time/60);
let seconds=Math.floor(time%60);

if(seconds<10) seconds="0"+seconds;

return minutes+":"+seconds;

}

/* INICIO */

loadSong();
music.volume=0.6;
