class Goblin extends MovableObjects {
    speed = 1;


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

    IDLE_IMAGES = [
        'img/3.Enemies/Goblin/Idle/idle1.png',
        'img/3.Enemies/Goblin/Idle/idle2.png',
        'img/3.Enemies/Goblin/Idle/idle3.png',
        'img/3.Enemies/Goblin/Idle/idle4.png',
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
        this.loadImages(this.IDLE_IMAGES);
        this.animate();
    }

    animate() {

        setInterval(() => {
            level1.enemies[0].playAnimation(this.WALKING_IMAGES);
            level1.enemies[0].moveLeft();

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

        

        setInterval(() => {
            if (level1.enemies[1].x <= 950 || this.walkRightInArea) {
                level1.enemies[1].moveRight();
                this.walkRightInArea = true;
                this.walkLeftInArea = false;
               
            }
        }, 1000 / 60);

    
        setInterval(() => {
            if (level1.enemies[1].x >= 1170 || this.walkLeftInArea) {
                level1.enemies[1].moveLeft();
                this.walkRightInArea = false;
                this.walkLeftInArea = true;

            }
        }, 1000 / 60);

        setInterval(() => {
            if (world.character.x > 80 || this.walkLeftInArea || this.walkRightInArea){
                level1.enemies[1].playAnimation(this.WALKING_IMAGES)}
        }, 180);

    }

    




}
