
let canvas;
let world;
let keyboard = new Keyboard();
game_sound = new Audio('audio/Titlemusic.mp3');
let titleMusic = true;



function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
};

function startGame() {
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('startscreen').classList.add('d-none');
    playSound();
    initLevel();
    init();

}


function fullscreen() {
    let contentFullscreen = document.getElementById('content');
    document.getElementById('fullscreenOn').classList.add('d-none');
    document.getElementById('fullscreenOff').classList.remove('d-none');
    enterFullscreen(contentFullscreen);
}

function leaveFullscreen() {
    let contentFullscreen = document.getElementById('content');
    document.getElementById('fullscreenOn').classList.remove('d-none');
    document.getElementById('fullscreenOff').classList.add('d-none');
    exitFullscreen(contentFullscreen);
}


function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}


function playSound() {
    if (titleMusic) {
        game_sound.volume = 0.1;
        game_sound.play();
    }
}

function pauseMusic() {
    if (titleMusic) {
        titleMusic = false;
        document.getElementById('musicButton').innerHTML = `<img
    src="img/9.Interface/Startscreen/soundOff.png">`;
    } else {
        titleMusic = true;
        document.getElementById('musicButton').innerHTML = `<img
    src="img/9.Interface/Startscreen/soundOn.png">`;

    }
}


/**
 * Set the variable from keyboard.class.js to true, when button is clicked 
 * 
 * @param {click} event - Keydown MUST be used, to recognize the arrowbuttons 
 */

window.addEventListener("keydown", (event) => {
    const key = event.key;

    if (key === "ArrowRight" || key === "d") {
        keyboard.RIGHT = true;
    }

    if (key === "ArrowUp" || key === "w") {
        keyboard.UP = true;
    }

    if (key === "ArrowLeft" || key === "a") {
        keyboard.LEFT = true;
    }

    if (key === "ArrowDown" || key === "s") {
        keyboard.DOWN = true;
    }

    if (key === " ") {
        keyboard.SPACE = true;
    }

    if (key === "t") {
        keyboard.T_KEYBOARD = true;
    }


});

window.addEventListener("mousedown", (event) => {
    const key = event.button;

    if (key === 0) {
        keyboard.LEFTMOUSE = true;
    }
});

window.addEventListener("mouseup", (event) => {
    const key = event.button;

    if (key === 0) {
        keyboard.LEFTMOUSE = false;
    }
});

window.addEventListener("keyup", (event) => {
    const key = event.key;

    if (key === "ArrowRight" || key === "d") {
        keyboard.RIGHT = false;
    }

    if (key === "ArrowUp" || key === "w") {
        keyboard.UP = false;
    }

    if (key === "ArrowLeft" || key === "a") {
        keyboard.LEFT = false;
    }

    if (key === "ArrowDown" || key === "s") {
        keyboard.DOWN = false;
    }

    if (key === " ") {
        keyboard.SPACE = false;
    }
    if (key === "t") {
        keyboard.T_KEYBOARD = false;
    }

});