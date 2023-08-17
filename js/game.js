
let canvas;
let world;
let keyboard = new Keyboard();
let allIntervals = [];
let game_sound = new Audio('audio/Titlemusic.mp3');
let titleMusic = true;

/**
 * 
 * @param {object} fn -> get the code of the function, from the created interval
 * @param {number} time -> get the time in milliseconds, how often the interval should repeat
 *  @param {value} id -> push the value in the array "allIntervals". 
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    allIntervals.push(id);
}

/**
 * Create a new World.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    loadMobileControlEvents();
};

/**
 * After pressing the button at the startscreen, the game will start. Or by pressing the restart button at the end of the Game.
 */
function startGame() {
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('startscreen').classList.add('d-none');
    document.getElementById('winScreen').classList.add('d-none');
    document.getElementById('defeatScreen').classList.add('d-none');
    initLevel();
    init();
}


/**
 * After a win or lose conditions is reached, the game will stop, by clearing every interval in array "allIntervals".
 */
function stopGame() {
    allIntervals.forEach(clearInterval);
}


/**
  * @param {object} titleMusic -> If the variable is set on true, music will play, otherwise it will stop. This function can be activated by the button on top of the canvas.
 */
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



//---Functions for fullscreen---//

/**
 * enter the fullscreen -> click on the button
 */
function fullscreen() {
    let contentFullscreen = document.getElementById('content');
    document.getElementById('fullscreenOn').classList.add('d-none');
    document.getElementById('fullscreenOff').classList.remove('d-none');
    enterFullscreen(contentFullscreen);
}

/**
 * leave the fullscreen -> click on the button
 */
function leaveFullscreen() {
    let contentFullscreen = document.getElementById('content');
    document.getElementById('fullscreenOn').classList.remove('d-none');
    document.getElementById('fullscreenOff').classList.add('d-none');
    exitFullscreen(contentFullscreen);
}


/**
 * @param {param} element -> check the version from the browser
 * @param {function} requestFullscreen -> is a HTML5-API which the mpost browser supports
 * if the browser support the function the fullscreen will be set.
 */

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

/**
 * Leave the fullscreen back to normal widt and height.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}


function rotatePhoneShow() {

    if (window.innerWidth > 650) {
        document.getElementById('rotatePhone').classList.add('d-none');
    } else {
        document.getElementById('rotatePhone').classList.remove('d-none');
    }
}

window.addEventListener('resize', rotatePhoneShow);

/**
 * Set the variable from keyboard.class.js to true, when button is clicked 
 * 
 * @param {click} event - Keydown MUST be used, to recognize the arrowbuttons 
 */

window.addEventListener("keydown", (event) => {
    const key = event.key;

    if (key === "ArrowRight" || key === "d" || key === "D") {
        keyboard.RIGHT = true;
    }

    if (key === "ArrowLeft" || key === "a" || key === "A") {
        keyboard.LEFT = true;
    }

    if (key === " ") {
        keyboard.SPACE = true;
    }

    if (key === "t" || key === "T") {
        keyboard.T_KEYBOARD = true;
    }

    if (key === "f" || key === "F") {
        keyboard.F_KEYBOARD = true;
    }

});


window.addEventListener("keyup", (event) => {
    const key = event.key;

    if (key === "ArrowRight" || key === "d" || key === "D") {
        keyboard.RIGHT = false;
    }

    if (key === "ArrowLeft" || key === "a" || key === "A") {
        keyboard.LEFT = false;
    }

    if (key === " ") {
        keyboard.SPACE = false;
    }
    if (key === "t" || key === "T") {
        keyboard.T_KEYBOARD = false;
    }

    if (key === "f" || key === "F") {
        keyboard.F_KEYBOARD = false;
    }

});

function loadMobileControlEvents() {
    document.getElementById('btn-right').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('btn-right').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('btn-left').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('btn-left').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('btn-up').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('btn-up').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById('btn-attack').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.F_KEYBOARD = true;
    });
    document.getElementById('btn-attack').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.F_KEYBOARD = false;
    });
    document.getElementById('btn-magic').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.T_KEYBOARD = true;
    });
    document.getElementById('btn-magic').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.T_KEYBOARD = false;
    });


}