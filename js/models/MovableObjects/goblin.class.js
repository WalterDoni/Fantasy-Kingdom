class Goblin extends MovableObjects {

    WALKING_IMAGES = [

        'img/3.Enemies/Goblin/Walk/walk0.png',
        'img/3.Enemies/Goblin/Walk/walk1.png',
        'img/3.Enemies/Goblin/Walk/walk2.png',
        'img/3.Enemies/Goblin/Walk/walk3.png',
        'img/3.Enemies/Goblin/Walk/walk4.png',
        'img/3.Enemies/Goblin/Walk/walk5.png',
        'img/3.Enemies/Goblin/Walk/walk6.png',

    ]

    constructor(x, y) {
        super().loadImage('img/3.Enemies/Goblin/Walk/0lwalk.png')
        this.x = x;
        this.y = y;
   

        this.loadImages(this.WALKING_IMAGES);

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60); // 60 FPS
        setInterval(() => {
            this.playAnimation(this.WALKING_IMAGES)
        }, 180);
    }


}
