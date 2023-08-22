class Goblin extends MovableObjects {
    speed = 0.2;



    attacksInterval = null;

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

    IDLE_IMAGES = [
        'img/3.Enemies/Goblin/Idle/idle1.png',
        'img/3.Enemies/Goblin/Idle/idle2.png',
        'img/3.Enemies/Goblin/Idle/idle3.png',
        'img/3.Enemies/Goblin/Idle/idle4.png',
    ]

    moreAccurateCollision = {
        top: 25,
        right: 70,
        bottom: 120,
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
        this.loadImages(this.IDLE_IMAGES);
        this.animate();
        this.gameEnds();

    }

    animate() {

        this.idleAnimation();
        this.hurtOrDead();
        this.conditionToMove();
        this.movements();
        this.attackAnimation();
    }

    idleAnimation() {

        this.Idle = setInterval(() => {
            this.turnArround = true;
            this.playAnimation(this.IDLE_IMAGES);
        }, 230);
    }

    conditionToMove() {

        this.conditionsToMove = setInterval(() => {
            if (world && level1.enemies[1].x - world.character.x <= 500 || this.firstContact) {
                clearInterval(this.Idle);
                this.firstContact = true;
            }
        }, 1000 / 60);

    }

    movements() {

        this.startMoving = setInterval(() => {
            if (this.firstContact && world && this.x - world.character.x >= 120 || this.firstContact && world && this.y - world.character.y >= 30) {
                this.moveLeft();
            }
        }, 1000 / 60);


        this.startMovingAnimation = setInterval(() => {
            if (this.firstContact && world && this.x - world.character.x >= 120 || this.firstContact && world && this.y - world.character.y >= 30) {
                this.playAnimation(this.WALKING_IMAGES);
                this.moveLeft();
            }
        }, 180);
    }

    attackAnimation() {

        this.attacks = setInterval(() => {
            if (world && this.x - world.character.x <= 120 && this.y - world.character.y <= 80 && this.x > world.character.x) {
                this.playAnimation(this.IMAGE_ATTACK);
            }
        }, 140)
    }


    
    /**
     * Depends of if the enemy is hurt or dead. When it is hurt ( e.g. character jumps on the head of the enemy) it will 
     * play the "hurt" animation. Otherwise some interval will stop and the enemy die. At first it will get up in the air.
     * After that it will add some gravity, so the enemy fall into the ground and disappear. 
     */
    hurtOrDead() {

        setInterval(() => {
            if (this.isDead() && this.dead <= 1) {
                clearInterval(this.conditionsToMove);
                clearInterval(this.startMoving);
                clearInterval(this.startMovingAnimation);
                clearInterval(this.attacks);
                this.loadImage(this.DEAD_IMAGE);
                this.dead += 1;
                this.speedY = 10;

            } else if (this.healthpoints == 50 && this.hurt <= 50) {
                this.playAnimation(this.HURT_IMAGES);
                this.hurt += 15;
            }

        }, 140);


        setInterval(() => {
            if (this.isDead() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)

    }
    
    /**
     * Intervals will stop, when the game has end. No matter if the Player lost or won. 
     */
    gameEnds() {

        setInterval(() => {

            if (world && world.character.healthpoints == 0 || world.endbossHP == 0) {
                clearInterval(this.conditionsToMove);
                clearInterval(this.startMoving);
                clearInterval(this.startMovingAnimation);
                clearInterval(this.attacks);
            }
        }, 100)
    }

}
