class WalkingDwarf extends MovableObjects {

    speed = 0.5;

    dead1 = 0;
    speedY1 = 0;
    hurt1 = 0;

    dead3 = 0;
    speedY3 = 0;
    hurt3 = 0;

    walk1 = null;
    walking1 = null;

    walk3 = null;
    walking3 = null;

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
        bottom: 120,
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
        this.gameEnds();
    }

    animate() {

     this.enemie1WalkingArea();
     this.enemie1IsHurtOrDead();
     this.enemie3WalkingArea();
     this.enemie3IsHurtOrDead();

    }
    
    //--Enemie1--//
     /**
      * Enemy is walking left and right in an area.If a coordinate on the x-axes is reached, the enemy will start
      * to walk into the other direction.
      */
    enemie1WalkingArea() {

        this.walk1 = setInterval(() => {
            if (world && level1.walkingEnemies[1].x <= 2300 || this.walkRightInArea) {
                level1.walkingEnemies[1].moveRight();
                level1.walkingEnemies[1].walkRightInArea = true;
                level1.walkingEnemies[1].walkLeftInArea = false;

            } if (world && level1.walkingEnemies[1].x >= 2500 || this.walkLeftInArea) {
                level1.walkingEnemies[1].moveLeft();
                level1.walkingEnemies[1].walkRightInArea = false;
                level1.walkingEnemies[1].walkLeftInArea = true;
            }
        }, 1000 / 60);

        this.walking1 = setInterval(() => {
            if (this.walkLeftInArea || this.walkRightInArea) {
                this.playAnimation(this.WALKING_IMAGES);
            }
        }, 180);
    }
    
    /**
     * Depends of if the enemy is hurt or dead. When it is hurt ( e.g. character jumps on the head of the enemy) it will 
     * play the "hurt" animation. Otherwise some interval will stop and the enemy die. At first it will get up in the air.
     * After that it will add some gravity, so the enemy fall into the ground and disappear. 
     */
    enemie1IsHurtOrDead() {

        setInterval(() => {
            if (level1.walkingEnemies[1].isDead() && this.dead1 <= 1) {
                clearInterval(this.walk1);
                clearInterval(this.walking1);
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
    }
    //--Enemie3--//
    enemie3WalkingArea() {

        this.walk3 = setInterval(() => {
            if (world && level1.walkingEnemies[3].x <= 3400 || this.walkRightInArea1) {
                level1.walkingEnemies[3].moveRight();
                level1.walkingEnemies[3].walkRightInArea1 = true;
                level1.walkingEnemies[3].walkLeftInArea1 = false;

            } if (world && level1.walkingEnemies[3].x >= 3650 || this.walkLeftInArea1) {
                level1.walkingEnemies[3].moveLeft();
                level1.walkingEnemies[3].walkRightInArea1 = false;
                level1.walkingEnemies[3].walkLeftInArea1 = true;
            }
        }, 1000 / 60);

        this.walking3 = setInterval(() => {
            if (this.walkLeftInArea1 || this.walkRightInArea1) {
                this.playAnimation(this.WALKING_IMAGES);
            }
        }, 180);
    }

    enemie3IsHurtOrDead() {

        setInterval(() => {
            if (level1.walkingEnemies[3].isDead() && this.dead3 <= 1) {
                clearInterval(this.walk3);
                clearInterval(this.walking3);
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
    }
    
    /**
     * Intervals will stop, when the game has end. No matter if the Player lost or won. 
     */
    gameEnds() {
        setInterval(() => {

            if (world && world.character.healthpoints == 0 || world.endboss.isDead()) {
                clearInterval(this.walk1);
                clearInterval(this.walking1);
                clearInterval(this.walk3);
                clearInterval(this.walking3);

            }
        }, 100);
    }

}