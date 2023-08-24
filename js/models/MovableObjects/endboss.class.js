class Endboss extends MovableObjects {
    height = 395;
    width = 350;
    speed = 3;

 

    walkInArea = null;
    lefttWalkInArea = null;
    rightWalkInArea = null;


    WALKING_IMAGES = [

        'img/3.Enemies/Boss/Walk/Walk1.png',
        'img/3.Enemies/Boss/Walk/Walk2.png',
        'img/3.Enemies/Boss/Walk/Walk3.png',
        'img/3.Enemies/Boss/Walk/Walk4.png',
        'img/3.Enemies/Boss/Walk/Walk5.png',
        'img/3.Enemies/Boss/Walk/Walk6.png',

    ]

    IMAGE_ATTACK = [
        'img/3.Enemies/Boss/Attack/Attack1.png',
        'img/3.Enemies/Boss/Attack/Attack2.png',
        'img/3.Enemies/Boss/Attack/Attack3.png',
        'img/3.Enemies/Boss/Attack/Attack4.png',
        'img/3.Enemies/Boss/Attack/Attack5.png',
        'img/3.Enemies/Boss/Attack/Attack6.png',
        'img/3.Enemies/Boss/Attack/Attack7.png',

    ]

    HURT_IMAGES = [
        'img/3.Enemies/Boss/Hurt/Hurt1.png',
        'img/3.Enemies/Boss/Hurt/Hurt2.png',
    ]

    IDLE_IMAGES = [
        'img/3.Enemies/Boss/Idle/Idle1.png',
        'img/3.Enemies/Boss/Idle/Idle2.png',
        'img/3.Enemies/Boss/Idle/Idle3.png',
    ]
    DEAD_IMAGE = [

        'img/3.Enemies/Boss/Death/Death5.png',

    ]

    MAGIC_ATTACK_IMAGE = [
        'img/3.Enemies/Boss/MagicAttack/Magic_lightning1.png',
        'img/3.Enemies/Boss/MagicAttack/Magic_lightning2.png',
        'img/3.Enemies/Boss/MagicAttack/Magic_lightning3.png',
        'img/3.Enemies/Boss/MagicAttack/Magic_lightning4.png',
        'img/3.Enemies/Boss/MagicAttack/Magic_lightning5.png',
    ]

    moreAccurateCollision = {
        top: 80,
        right: 330,
        bottom: 0,
        left: 0,
    }

    constructor(x, y) {
        super().loadImage('img/3.Enemies/Boss/Walk/Walk1.png');
        this.x = x;
        this.y = y;
        this.loadImages(this.WALKING_IMAGES);
        this.loadImages(this.IMAGE_ATTACK);
        this.loadImages(this.HURT_IMAGES);
        this.loadImages(this.DEAD_IMAGE);
        this.loadImages(this.IDLE_IMAGES);
        this.loadImages(this.MAGIC_ATTACK_IMAGE);
        this.animate();
    }


    animate() {

        this.idleAnimation();
        this.hurtOrDead();
        this.conditionToMove();
        this.movements();
        this.walkInArena();

    }

    conditionToMove() {

        this.conditionsToMove = setInterval(() => {
            if (world && world.character.x > 4200 || this.firstContact) {
                clearInterval(this.Idle);
                this.firstContact = true;
            }
        }, 1000 / 40);

    }

    idleAnimation() {

        this.Idle = setInterval(() => {
            this.turnArround = true;
            this.playAnimation(this.IDLE_IMAGES)
        }, 230);

    }

    movements() {

        this.startMoving = setInterval(() => {
            if (world && world.character.x > 4200 || this.firstContact) {
                this.moveLeft();
            }
        }, 1000 / 40);

        this.startMovingAnimation = setInterval(() => {
            if (world && world.character.x > 4200 || this.firstContact) {
                this.playAnimation(this.WALKING_IMAGES)
            }
        }, 180);
    }

    walkInArena() {

        this.rightWalkInArea = setInterval(() => {
            if (this.x <= 4000 || this.walkRightInArea) {
                clearInterval(this.startMoving);
                clearInterval(this.startMovingAnimation);
                this.moveRight();
                this.walkRightInArea = true;
                this.walkLeftInArea = false;
            }
        }, 1000 / 60);

        this.walkInArea = setInterval(() => {
            if (this.walkLeftInArea || this.walkRightInArea)
                this.playAnimation(this.WALKING_IMAGES);
        }, 180);

        this.lefttWalkInArea = setInterval(() => {
            if (this.x >= 5050 || this.walkLeftInArea) {
                this.moveLeft();
                this.walkRightInArea = false;
                this.walkLeftInArea = true;

            }
        }, 1000 / 60);
    }

    hurtOrDead() {
        let hp = 80;

        setInterval(() => {
            if (world.endbossHP.healthpoints == 0) {
                clearInterval(this.Idle);
                clearInterval(this.conditionsToMove);
                clearInterval(this.startMoving);
                clearInterval(this.startMovingAnimation);
                clearInterval(this.walkInArea);
                clearInterval(this.lefttWalkInArea);
                clearInterval(this.rightWalkInArea);
                this.loadImage(this.DEAD_IMAGE);

            } else if (world.endbossHP.healthpoints == hp) {
                this.playAnimation(this.HURT_IMAGES);
                hp -= 20;

            }
        }, 100);
    }

}