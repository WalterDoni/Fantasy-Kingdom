
let canvas;
let world;
let keyboard = new Keyboard();


async function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

};


//Keydown MUSS verwendet werden, damit die Pfeiltasten erkannt werden.

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