class Bird extends MovableObjects {


    height = 100;
    width = 100;
    speed = 0.18;

    IMAGES = [
        'img/4.Maps/forest/Background/Bright/Bird/frame1.png',
        'img/4.Maps/forest/Background/Bright/Bird/frame2.png',
        'img/4.Maps/forest/Background/Bright/Bird/frame3.png',
        'img/4.Maps/forest/Background/Bright/Bird/frame4.png',
        'img/4.Maps/forest/Background/Bright/Bird/frame5.png',
        'img/4.Maps/forest/Background/Bright/Bird/frame6.png',
        'img/4.Maps/forest/Background/Bright/Bird/frame7.png',
        'img/4.Maps/forest/Background/Bright/Bird/frame8.png',

    ]


    constructor(x, y) {
        super().loadImage('img/4.Maps/forest/Background/Bright/Bird/frame1.png')
        this.x = x;
        this.y = y;

        this.loadImages(this.IMAGES);

        this.animate();
    };

    animate() {
        setInterval(() => {

            this.x -= this.speed;
        }, 1000 / 60); // 60 FPS
        setInterval(() => {
            this.playAnimation(this.IMAGES)
        }, 180);
    }
}
