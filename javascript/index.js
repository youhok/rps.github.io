
const carrentPage = window.location.href.toString().split(window.location.host)[1];

//if carrentpage = /index.html  not clear code locakstorage.clear()
if (carrentPage == '/index.html' || carrentPage == '/' || carrentPage == '/rps.github.io/' || carrentPage == '/rps.github.io/index.html') {
    localStorage.clear();
}

new TxtAnime('.title', {
    effect: 'txt-an-3',
});

//get number from page 1 to page 2
function getRoundValue() {
    var number = document.getElementById("getNumber").value;
    // console.log("🚀 ~ file: index.js:17 ~ getRoundValue ~ number:", number)
    var getName = document.getElementById("getName").value;
    // prevent user from moving to next page
    localStorage.setItem("numberValue", number);
    localStorage.setItem("nameValue", getName);
    clickSound();
}

// sound bg
let audio = document.getElementById("audioIndex");
let onSound = document.getElementById("on-sound");

window.onload = function () {
    audio.play();
    audio.volume = 0.50;
};

let count = 0;


function playSound() {
    if (count == 0) {
        count = 1;
        onSound.innerHTML = `<i class="bi bi-volume-up"></i>`;
        audio.play();
    } else {
        count = 0;
        onSound.innerHTML = `<i class="bi bi-volume-mute"></i>`;
        audio.pause();
        audio.currentTime = 0;
    }
}



//sound click
function clickSound() {
    const soundUrl = 'assets/sound-effects/click.mp3';
    const audio = new Audio(soundUrl);
    audio.play();

}
// console.log(window.location.host)
// console.log(window.location.href.toString().split(window.location.host)[1])
