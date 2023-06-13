// console.log('page2 runing')

// check if round value exist or not
const round = parseInt(localStorage.getItem("numberValue"));
document.getElementById("pastNumber").innerHTML = round;
let playerName = localStorage.getItem("nameValue");
document.getElementById("pastName").innerHTML = playerName;

let startBtn = document.getElementById("start-btn");
//set attribute to disabled on start button
startBtn.setAttribute("disabled", true);


// if isn't exist push to index.html
if (round == NaN && carrentPage == '/gameplay.html') {
    back();
}



//back function
function back() {
    window.location.href = './index.html';
}
// Sound Winner

function soundWinner() {
    const soundUrl = 'assets/sound-effects/win.mp3';
    const audio = new Audio(soundUrl);
    audio.play();
}

// use consturter for player select and Cpu select
function NewPlayer(select) {
    this.select = select;
}

let player = new NewPlayer(''); // player = {select: undefield}
//check localstorage if null = 0;
let playerWin = localStorage.getItem("playerWin") == null ? 0 : parseInt(localStorage.getItem("playerWin"));
let cpu = new NewPlayer(''); // cpu = {select: undefield}
//check localstorage if null = 0 ;
let cpuWin = localStorage.getItem("cpuWin") == null ? 0 : parseInt(localStorage.getItem("cpuWin"));


function playerSelect(id) {
    let boxElements = document.getElementsByClassName('size');
    for (let index = 0; index < boxElements.length; index++) {
        const element = boxElements[index];
        if (element.id === id) {
            element.classList.add('border-color');
            player.select = id;
        } else {
            element.classList.remove('border-color');
        }
    }
    // if player already selected  remove attribute disable from start button
    if (player.select != "") {
        startBtn.removeAttribute("disabled");
    }

    clickSound();
    if (autoStart) {
        startRandom();
    }
}
// arr store data
let rockPaperScissors = [{
    imagePath: 'assets/images/paper.png',
    class: 'paper',
    id: 'paper'
}, {
    imagePath: 'assets/images/rock.png',
    class: 'rock',
    id: 'rock'
}, {
    imagePath: 'assets/images/scissors.png',
    class: 'scissors',
    id: 'scissors'
}];

const randomImage = document.getElementById('myImage');

async function startRandom() {
    //make button attribute disabled when the image is random
    startBtn.setAttribute("disabled", true);
    clickSound();
    const soundResult = 'assets/sound-effects/waiting-result.mp3';
    const audio = new Audio(soundResult);
    audio.play();
    let randomIndex = 0;
    const intervalId = setInterval(() => {
        randomIndex = Math.floor(Math.random() * rockPaperScissors.length);
        randomImage.src = rockPaperScissors[randomIndex].imagePath;

        //if class contains already have remove 
        if (randomImage.classList.contains(rockPaperScissors[randomIndex].class)) {
            randomImage.classList.remove(rockPaperScissors[randomIndex].class);
        } else { // if class don't have add class in 
            randomImage.classList.add(rockPaperScissors[randomIndex].class);
        }
        randomImage.id = rockPaperScissors[randomIndex].id;
    }, 100);
    //async function
    await waiting(3000);
    clearInterval(intervalId);
    cpu.select = rockPaperScissors[randomIndex].id;
    audio.pause();
    audio.currentTime = 0;
    startBtn.removeAttribute("disabled");
    compareWinner();
}

//use async wait to sett the random stop 
async function waiting(sec) {
    return new Promise((reslove, reject) => { setTimeout(reslove, sec) });
}

let autoStart = false;

let checkBoxAuto = document.getElementById("checkBoxAutoStart");

checkBoxAuto.addEventListener('click', function () {
    autoStart = !autoStart;
});


let playerWinElement = document.getElementById('playerWin');
playerWinElement.innerHTML = playerWin;



let cpuWinElement = document.getElementById('cpuWin');
cpuWinElement.innerHTML = cpuWin;

function win() {
    let caluclatePlayerWin = playerWin += 1;
    localStorage.setItem("playerWin", caluclatePlayerWin)
    playerWinElement.innerHTML = playerWin;
    showAlert(`${playerName} Win`, 'secondary');
}

function lose() {
    let caluclateCpuWin = cpuWin += 1;
    localStorage.setItem("cpuWin", caluclateCpuWin)
    cpuWinElement.innerHTML = cpuWin;
    showAlert('Computer Win', 'secondary');
}


let staticBackdropLabel = document.getElementById('staticBackdropLabel');

function compareWinner() {
    console.log(cpu.select)
    // check for draw
    if (player.select === cpu.select) {
        return showAlert('Draw', 'secondary');
    }
    // check for Rock
    if (player.select === 'rock') {
        if (cpu.select === 'scissors') {
            win();
        }
        else {
            lose();
        }
    }
    // check for paper
    if (player.select === 'paper') {
        if (cpu.select === 'scissors') {
            lose();
        } else {
            win();
        }

    }
    // check for scissors
    if (player.select === 'scissors') {
        if (cpu.select === 'rock') {
            lose();
        } else {
            win();
        }
    }

    // find winner
    let TotalWin = playerWin + cpuWin;
    if (TotalWin == round && playerWin == cpuWin) {
        showModalWinner();
        staticBackdropLabel.innerHTML = 'No Winner';
    }
    if (TotalWin == round && playerWin > cpuWin) {
        showModalWinner();
        soundWinner();
        staticBackdropLabel.innerHTML = ` ${playerName} is a Winner `;
    }
    if (TotalWin == round && playerWin < cpuWin) {
        showModalWinner();
        soundWinner();
        staticBackdropLabel.innerHTML = 'Computer is a Winner';
    }
}


//get the modal and show modal

function showModalWinner() {
    const myModal = new bootstrap.Modal('#showModalWinner');
    myModal.show();
}

//back function
function playAgain() {
    back();
}


//alert Winner


function showAlert(message, type) {
    // Create the alert element
    var alertEl = document.createElement('div');
    alertEl.classList.add('alert', 'alert-' + type, 'alert-dismissible', 'fade', 'show', 'alert-title');


    // Add the message to the alert
    alertEl.innerHTML = message;

    // Create the close button
    var closeButton = document.createElement('button');
    closeButton.setAttribute('type', 'button');
    closeButton.setAttribute('data-bs-dismiss', 'alert');

    // Add the close button to the alert
    // alertEl.appendChild(closeButton);

    // Add the alert to the DOM
    var containerEl = document.querySelector('#alertWhoWinner');
    containerEl.insertBefore(alertEl, containerEl.firstChild);

    // Show the alert
    var alert = new bootstrap.Alert(alertEl);
    //close alert in 1s
    setTimeout(function () {
        alert.close();
    }, 2000);
}

//bg background color
let audioSound = document.getElementById("audioGamePlay");
let onSoundPage = document.getElementById("onSoundPage");

window.onload = function () {
    audioSound.play();
    audioSound.volume = 0.50;
};

let countPage = 0;


function pageSound() {
    if (countPage == 0) {
        countPage = 1;
        onSoundPage.innerHTML = `<i class="bi bi-volume-up"></i>`;
        audioSound.play();
    } else {
        countPage = 0;
        onSoundPage.innerHTML = `<i class="bi bi-volume-mute"></i>`;
        audioSound.pause();
        audioSound.currentTime = 0;
    }
}
