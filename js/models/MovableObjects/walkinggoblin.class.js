class WalkingGoblin extends MovableObjects {

    speed = 0.5;
  
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
            if (this.isDead()) {
                this.playAnimation(this.DEAD_IMAGES);
            } else if (this.healthpoints == 50) {
                this.playAnimation(this.HURT_IMAGES);
            }
        }, 120);


        setInterval(() => {
            if (world && level1.walkingEnemies[0].x <= 975 || this.walkRightInArea) {
                level1.walkingEnemies[0].moveRight();
                level1.walkingEnemies[0].walkRightInArea = true;
                level1.walkingEnemies[0].walkLeftInArea = false;

            }if (world && level1.walkingEnemies[0].x >= 1150 || this.walkLeftInArea){
                level1.walkingEnemies[0].moveLeft();
                level1.walkingEnemies[0].walkRightInArea = false;
                level1.walkingEnemies[0].walkLeftInArea = true;
            }
        }, 1000 / 60);


        setInterval(() => {
            if (world && level1.walkingEnemies[2].x <= 2800 || this.walkRightInArea1) {
                level1.walkingEnemies[2].moveRight();
                level1.walkingEnemies[2].walkRightInArea1 = true;
                level1.walkingEnemies[2].walkLeftInArea1 = false;

            }if (world && level1.walkingEnemies[2].x >= 3300 || this.walkLeftInArea1){
                level1.walkingEnemies[2].moveLeft();
                level1.walkingEnemies[2].walkRightInArea1 = false;
                level1.walkingEnemies[2].walkLeftInArea1 = true;
            }
        }, 1000 / 60);

        setInterval(() => {
            if (world && level1.walkingEnemies[4].x <= 3720 || this.walkRightInArea2) {
                level1.walkingEnemies[4].moveRight();
                level1.walkingEnemies[4].walkRightInArea2 = true;
                level1.walkingEnemies[4].walkLeftInArea2 = false;

            }if (world && level1.walkingEnemies[4].x >= 3850 || this.walkLeftInArea2){
                level1.walkingEnemies[4].moveLeft();
                level1.walkingEnemies[4].walkRightInArea2 = false;
                level1.walkingEnemies[4].walkLeftInArea2 = true;
            }
        }, 1000 / 60);



        setInterval(() => {
            if (this.walkLeftInArea || this.walkRightInArea || this.walkLeftInArea1 || this.walkRightInArea1 || this.walkLeftInArea2 || this.walkRightInArea2) {
                this.playAnimation(this.WALKING_IMAGES);
            }
        }, 180);



    }




}