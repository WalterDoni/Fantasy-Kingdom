class WalkingDwarf extends MovableObjects {

    speed = 0.5;
    dead1 = 0;
    speedY1 = 0;
    hurt1 = 0;
    dead3 = 0;
    speedY3 = 0;
    hurt3 = 0;

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
        'img/3.Enemies/Dwarf/Attack/Attack2.png',
        'img/3.Enemies/Dwarf/Attack/Attack3.png',
        'img/3.Enemies/Dwarf/Attack/Attack4.png',
        'img/3.Enemies/Dwarf/Attack/Attack5.png',
    ]


    HURT_IMAGES = [
        'img/3.Enemies/Dwarf/Hurt/Hurt1.png',
        'img/3.Enemies/Dwarf/Hurt/Hurt2.png',
    ]

    DEAD_IMAGE = [
        'img/3.Enemies/Dwarf/Death/Death5.png',

    ]

   

    moreAccurateCollision = {
        top: 10,
        right: 85,
        bottom: 20,
        left: 60,
    }

    constructor(x, y,) {
        super().loadImage('img/3.Enemies/Dwarf/Walk/Walk1.png');
        this.x = x;
        this.y = y;
        this.loadImages(this.WALKING_IMAGES);
        this.loadImages(this.IMAGE_ATTACK);
        this.loadImages(this.HURT_IMAGES);
        this.loadImages(this.DEAD_IMAGE);
        this.animate();
    }

    animate() {
        
        //--Enemie1--//
        let walk1 = setInterval(() => {
            if (world && level1.walkingEnemies[1].x <= 2300|| this.walkRightInArea) {
                level1.walkingEnemies[1].moveRight();
                level1.walkingEnemies[1].walkRightInArea = true;
                level1.walkingEnemies[1].walkLeftInArea = false;

            } if (world && level1.walkingEnemies[1].x >= 2500 || this.walkLeftInArea) {
                level1.walkingEnemies[1].moveLeft();
                level1.walkingEnemies[1].walkRightInArea = false;
                level1.walkingEnemies[1].walkLeftInArea = true;
            }
        }, 1000 / 60);

        let walking1 = setInterval(() => {
            if (this.walkLeftInArea || this.walkRightInArea) {
                this.playAnimation(this.WALKING_IMAGES);
            }
        }, 180);

        setInterval(() => {
            if (level1.walkingEnemies[1].isDead() && this.dead1 <= 1) {
                clearInterval(walk1);
                clearInterval(walking1);
                level1.walkingEnemies[1].loadImage(this.DEAD_IMAGE);
                this.dead1 += 1;
                this.speedY1 = 7;

            } else if (level1.walkingEnemies[1].healthpoints == 50 && this.hurt1 <= 50) {
                level1.walkingEnemies[1].playAnimation(this.HURT_IMAGES);
                this.hurt1 += 15;
            }
        }, 140);


        setInterval(() => {
            if (level1.walkingEnemies[1].isDead() || this.speedY1 > 0) {
                level1.walkingEnemies[1].y -= this.speedY1;
                this.speedY1 -= this.acceleration;
            }
        }, 1000 / 25)

  

       //--Enemie3--//
 //--Enemie1--//
        let walk3 = setInterval(() => {
            if (world && level1.walkingEnemies[3].x <= 3400|| this.walkRightInArea1) {
                level1.walkingEnemies[3].moveRight();
                level1.walkingEnemies[3].walkRightInArea1 = true;
                level1.walkingEnemies[3].walkLeftInArea1 = false;

            } if (world && level1.walkingEnemies[3].x >= 3650 || this.walkLeftInArea1) {
                level1.walkingEnemies[3].moveLeft();
                level1.walkingEnemies[3].walkRightInArea1 = false;
                level1.walkingEnemies[3].walkLeftInArea1 = true;
            }
        }, 1000 / 60);

        let walking3 = setInterval(() => {
            if (this.walkLeftInArea1 || this.walkRightInArea1) {
                this.playAnimation(this.WALKING_IMAGES);
            }
        }, 180);

        setInterval(() => {
            if (level1.walkingEnemies[3].isDead() && this.dead3 <= 1) {
                clearInterval(walk3);
                clearInterval(walking3);
                level1.walkingEnemies[3].loadImage(this.DEAD_IMAGE);
                this.dead3 += 1;
                this.speedY3 = 7;

            } else if (level1.walkingEnemies[3].healthpoints == 50 && this.hurt3 <= 50) {
                level1.walkingEnemies[3].playAnimation(this.HURT_IMAGES);
                this.hurt3 += 15;
            }
        }, 140);


        setInterval(() => {
            if (level1.walkingEnemies[3].isDead() || this.speedY3 > 0) {
                level1.walkingEnemies[3].y -= this.speedY3;
                this.speedY3 -= this.acceleration;
            }
        }, 1000 / 25);
        
        setInterval (() => {
        
            if(world && world.character.healthpoints == 0 || world.endboss.isDead()){
                clearInterval(walk1);
                clearInterval(walking1);
                clearInterval(walk3);
                clearInterval(walking3);
             
            }
            });
    }

}