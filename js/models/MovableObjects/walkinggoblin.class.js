class WalkingGoblin extends MovableObjects {

    speed = 0.5;
    dead0 = 0;
    speedY0 = 0;
    hurt0 = 0;
    dead2 = 0;
    speedY2 = 0;
    hurt2 = 0;
    dead4 = 0;
    speedY4 = 0;
    hurt4 = 0;


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

    DEAD_IMAGE = [
       
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
        this.loadImages(this.DEAD_IMAGE);
        this.animate();
    }

    animate() {

        //--Enemie0--//
        let walk0 = setInterval(() => {
            if (world && level1.walkingEnemies[0].x <= 975 || this.walkRightInArea ) {
                level1.walkingEnemies[0].moveRight();
                level1.walkingEnemies[0].walkRightInArea = true;
                level1.walkingEnemies[0].walkLeftInArea = false;

            } if (world && level1.walkingEnemies[0].x >= 1150 || this.walkLeftInArea) {
                level1.walkingEnemies[0].moveLeft();
                level1.walkingEnemies[0].walkRightInArea = false;
                level1.walkingEnemies[0].walkLeftInArea = true;
            }
        }, 1000 / 60);

        let walking0 = setInterval(() => {
            if (this.walkLeftInArea || this.walkRightInArea) {
                this.playAnimation(this.WALKING_IMAGES);
            }
        }, 180);

        setInterval(() => {
            if (level1.walkingEnemies[0].isDead() && this.dead0 <= 1) {
                clearInterval(walk0);
                clearInterval(walking0);
                level1.walkingEnemies[0].loadImage(this.DEAD_IMAGE);
                this.dead0 += 1;
                this.speedY0 = 7;

            } else if (level1.walkingEnemies[0].healthpoints == 50 && this.hurt0 <= 50) {
                level1.walkingEnemies[0].playAnimation(this.HURT_IMAGES);
                this.hurt0 += 15;
            }
        }, 140);


        setInterval(() => {
            if (level1.walkingEnemies[0].isDead() || this.speedY0 > 0) {
                level1.walkingEnemies[0].y -= this.speedY0;
                this.speedY0 -= this.acceleration;
            }
        }, 1000 / 25)


        //--Enemie2--//
        let walk2 = setInterval(() => {
            if (world && level1.walkingEnemies[2].x <= 2800 || this.walkRightInArea1) {
                level1.walkingEnemies[2].moveRight();
                level1.walkingEnemies[2].walkRightInArea1 = true;
                level1.walkingEnemies[2].walkLeftInArea1 = false;

            } if (world && level1.walkingEnemies[2].x >= 3300 || this.walkLeftInArea1) {
                level1.walkingEnemies[2].moveLeft();
                level1.walkingEnemies[2].walkRightInArea1 = false;
                level1.walkingEnemies[2].walkLeftInArea1 = true;
            }
        }, 1000 / 60);

        let walking2 = setInterval(() => {
            if (this.walkLeftInArea1 || this.walkRightInArea1) {
                this.playAnimation(this.WALKING_IMAGES);
            }
        }, 180);

        setInterval(() => {
            if (level1.walkingEnemies[2].isDead() && this.dead2 <= 1) {
                clearInterval(walk2);
                clearInterval(walking2);
                level1.walkingEnemies[2].loadImage(this.DEAD_IMAGE);
                this.dead2 += 1;
                this.speedY2 = 7;

            } else if (level1.walkingEnemies[2].healthpoints == 50 && this.hurt2 <= 50) {
                level1.walkingEnemies[2].playAnimation(this.HURT_IMAGES);
                this.hurt2 += 15;
            }
        }, 140);


        setInterval(() => {
            if (level1.walkingEnemies[2].isDead() || this.speedY2 > 0) {
                level1.walkingEnemies[2].y -= this.speedY2;
                this.speedY2 -= this.acceleration;
            }
        }, 1000 / 25)



        //--Enemie4--//
       
        let walk4 = setInterval(() => {
            if (world && level1.walkingEnemies[4].x <= 3720 || this.walkRightInArea2) {
                level1.walkingEnemies[4].moveRight();
                level1.walkingEnemies[4].walkRightInArea2 = true;
                level1.walkingEnemies[4].walkLeftInArea2 = false;

            } if (world && level1.walkingEnemies[4].x >= 3850 || this.walkLeftInArea2) {
                level1.walkingEnemies[4].moveLeft();
                level1.walkingEnemies[4].walkRightInArea2 = false;
                level1.walkingEnemies[4].walkLeftInArea2 = true;
            }
        }, 1000 / 60);

       let walking4 = setInterval(() => {
            if (this.walkLeftInArea2 || this.walkRightInArea2) {
                this.playAnimation(this.WALKING_IMAGES);
            }
        }, 180);
        setInterval(() => {
            if (level1.walkingEnemies[4].isDead() && this.dead4 <= 1) {
                clearInterval(walk4);
                clearInterval(walking4);
                level1.walkingEnemies[4].loadImage(this.DEAD_IMAGE);
                this.dead4 += 1;
                this.speedY4 = 7;

            } else if (level1.walkingEnemies[4].healthpoints == 50 && this.hurt4 <= 50) {
                level1.walkingEnemies[4].playAnimation(this.HURT_IMAGES);
                this.hurt4 += 15;
            }
        }, 140);


        setInterval(() => {
            if (level1.walkingEnemies[4].isDead() || this.speedY4 > 0) {
                level1.walkingEnemies[4].y -= this.speedY4;
                this.speedY4 -= this.acceleration;
            }
        }, 1000 / 25)


    }




}