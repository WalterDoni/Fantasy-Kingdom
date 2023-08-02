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

    IMAGE_ATTACK = [
        'img/3.Enemies/Goblin/Attack/attack1.png',
        'img/3.Enemies/Goblin/Attack/attack2.png',
        'img/3.Enemies/Goblin/Attack/attack3.png',
        'img/3.Enemies/Goblin/Attack/attack4.png',
        'img/3.Enemies/Goblin/Attack/attack5.png',

    ]


    HURT_IMAGES = [
        'img/3.Enemies/Goblin/Hurt/hurt1.png',
        'img/3.Enemies/Goblin/Hurt/hurt2.png',
        'img/3.Enemies/Goblin/Hurt/hurt3.png',

    ]

    DEAD_IMAGES = [
        'img/3.Enemies/Goblin/Death/death1.png',
        'img/3.Enemies/Goblin/Death/death2.png',
        'img/3.Enemies/Goblin/Death/death3.png',
        'img/3.Enemies/Goblin/Death/death4.png',
    ]

    moreAccurateCollision = {
        top: 20,
        right: 70,
        bottom: 20,
        left: 40,
    }

    constructor(x, y,) {
        super().loadImage('img/3.Enemies/Goblin/Walk/0lwalk.png')
        this.x = x;
        this.y = y;
        this.loadImages(this.WALKING_IMAGES);
        this.loadImages(this.IMAGE_ATTACK);
        this.loadImages(this.HURT_IMAGES);
        this.loadImages(this.DEAD_IMAGES);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60); // 60 FPS
        setInterval(() => {
            this.playAnimation(this.WALKING_IMAGES)
        }, 180);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.DEAD_IMAGES);
                console.log('DEAD');
            } else if (this.healthpoints == 50) {
                this.playAnimation(this.HURT_IMAGES);
                console.log('HURT');
            }

        }, 120);
    }

}
