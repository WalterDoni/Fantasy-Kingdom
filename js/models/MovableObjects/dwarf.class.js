class Dwarf extends MovableObjects {




    WALKING_IMAGES = [

        'img/3.Enemies/Dwarf/Walk/Walk1.png',
        'img/3.Enemies/Dwarf/Walk/Walk2.png',
        'img/3.Enemies/Dwarf/Walk/Walk3.png',
        'img/3.Enemies/Dwarf/Walk/Walk4.png',
        'img/3.Enemies/Dwarf/Walk/Walk5.png',
        'img/3.Enemies/Dwarf/Walk/Walk6.png',
    ]

    IMAGE_ATTACK = [
        'img/3.Enemies/Dwarf/Attack/Attack1.png',
        'img/3.Enemies/Dwarf/Attack/Attack2png',
        'img/3.Enemies/Dwarf/Attack/Attack3.png',
        'img/3.Enemies/Dwarf/Attack/Attack4.png',
        'img/3.Enemies/Dwarf/Attack/Attack5.png',
    ]


    HURT_IMAGES = [
        'img/3.Enemies/Dwarf/Hurt/Hurt1.png',
        'img/3.Enemies/Dwarf/Hurt/Hurt2.png',
    ]

    DEAD_IMAGES = [
        'img/3.Enemies/Dwarf/Death/Death1.png',
        'img/3.Enemies/Dwarf/Death/Death2.png',
        'img/3.Enemies/Dwarf/Death/Death3.png',
        'img/3.Enemies/Dwarf/Death/Death4.png',
        'img/3.Enemies/Dwarf/Death/Death5.png',

    ]

    constructor(x, y) {
        super().loadImage('img/3.Enemies/Dwarf/Walk/Walk1.png');
        this.x = x;
        this.y = y;


        this.loadImages(this.WALKING_IMAGES);
        this.animate();
    }



    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
            this.playAnimation(this.WALKING_IMAGES)
        }, 180);
    }

}