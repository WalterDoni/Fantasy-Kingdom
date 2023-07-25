
let canvas;
let world;
let keyboard = new Keyboard();


async function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

};


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
    
});

window.addEventListener("mousedown", (event) => {
    const key = event.button;

    if (key === 0) {
        keyboard.LEFTMOUSE = true;
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
});