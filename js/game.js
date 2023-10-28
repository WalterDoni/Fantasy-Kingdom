
let canvas;
let world;
let keyboard = new Keyboard();
let allIntervals = [];
let game_sound = new Audio('audio/Titlemusic.mp3');
let playMusic = true;

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
    document.getElementById('howToPlay').classList.add('d-none');
    initLevel();
    init();
}

function restartGame() {
    world.victory_sound.pause();
    world.defeat_sound.pause();
    startGame();
}

/**
 * After a win or lose conditions is reached, the game will stop, by clearing every interval in array "allIntervals".
 */
function stopGame() {
    allIntervals.forEach(clearInterval);
}

/**
  * @param {object} playMusic -> If the variable is set on true, music will play, otherwise it will stop. This function can be activated by the button on top of the canvas.
 */
function pauseMusic() {
    if (playMusic) {
        playMusic = false;
        document.getElementById('musicButton').innerHTML = `<img
    src="img/9.Interface/Startscreen/soundOff.png">`;
    } else {
        playMusic = true;
        document.getElementById('musicButton').innerHTML = `<img
    src="img/9.Interface/Startscreen/soundOn.png">`;
    }
}



function howToPlay() {
    let info = document.getElementById('howToPlayTheGame');
    let startscreen = document.getElementById('startscreen');
    startscreen.classList.add('d-none'),
        info.classList.remove('d-none');
    info.innerHTML =
        ` <img class="startImage" src="img/9.Interface/Startscreen/bg.png">
     <p class="textHowToPlay" > Welcome to my game!<br>
        There is'nt much to say about the rules. <br>
        You can kill an enemy on three different ways:<br>
        1.Jump on his head.<br>
        2.Attack him with your Sword<br>
        3.Use ure Fireball<br>
        To fill up you Mana collect the brown Manastones.</p>
        <button onclick="closeHowToPlay()" class="closeHowToPlay"> Close </button`;
}

function closeHowToPlay() {
    let info = document.getElementById('howToPlayTheGame');
    let startscreen = document.getElementById('startscreen');

    startscreen.classList.remove('d-none'),
        info.classList.add('d-none');
}

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

    if (key === "ArrowUp" || key === "w" || key === "W") {
        keyboard.UP = true;
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

    if (key === "ArrowUp" || key === "w" || key === "W") {
        keyboard.UP = false;
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
        keyboard.UP = true;
    });
    document.getElementById('btn-up').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
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

var elem = document.documentElement;

function fullscreen() {
    let fullscreenEnterButton = document.getElementById('enterFullscreen');
    let fullscreenExitButton = document.getElementById('exFullscreen');
    fullscreenEnterButton.classList.add('d-none');
    fullscreenExitButton.classList.remove('d-none');
    openFullscreen(elem);

}

function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

function closeFullscreen() {
    let fullscreenEnterButton = document.getElementById('enterFullscreen');
    let fullscreenExitButton = document.getElementById('exFullscreen');
    fullscreenEnterButton.classList.remove('d-none');
    fullscreenExitButton.classList.add('d-none');

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  }


