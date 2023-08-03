class Endboss extends MovableObjects {
    height = 395;
    width = 350;
    firstContact = false;
    walkRightInArea = false;
    walkLeftInArea = false;
    speed = 4;






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
    DEAD_IMAGES = [
        'img/3.Enemies/Boss/Death/Death0.png',
        'img/3.Enemies/Boss/Death/Death1.png',
        'img/3.Enemies/Boss/Death/Death2.png',
        'img/3.Enemies/Boss/Death/Death3.png',
        'img/3.Enemies/Boss/Death/Death4.png',
        'img/3.Enemies/Boss/Death/Death5.png',

    ]

    MAGIC_ATTACK_IMAGE = [
        'img/3.Enemies/Boss/MagicAttack/Magic_lightning1.png',
        'img/3.Enemies/Boss/MagicAttack/Magic_lightning2.png',
        'img/3.Enemies/Boss/MagicAttack/Magic_lightning3.png',
        'img/3.Enemies/Boss/MagicAttack/Magic_lightning4.png',
        'img/3.Enemies/Boss/MagicAttack/Magic_lightning5.png',
    ]

    constructor(x, y) {
        super().loadImage('img/3.Enemies/Boss/Walk/Walk1.png');
        this.x = x;
        this.y = y;
        this.loadImages(this.WALKING_IMAGES);
        this.loadImages(this.IMAGE_ATTACK);
        this.loadImages(this.HURT_IMAGES);
        this.loadImages(this.DEAD_IMAGES);
        this.loadImages(this.IDLE_IMAGES);
        this.loadImages(this.MAGIC_ATTACK_IMAGE);
        this.animate();
    }


    animate() {

        let bossIdle = setInterval(() => {
            this.turnArround = true;
            this.playAnimation(this.IDLE_IMAGES)
        }, 230);


        
        let triggerMovement = setInterval(() => {
            if (world.character.x > 4200 || this.firstContact) {
                this.moveLeft();
                this.firstContact = true;

            }
        }, 1000 / 40);

        let triggerMovement1 = setInterval(() => {
            if (world.character.x > 4200 || this.firstContact) {
                this.playAnimation(this.WALKING_IMAGES)
                clearInterval(bossIdle);
                this.firstContact = true;
            }
        }, 180);



        let rightWalkInArea = setInterval(() => {
            if (this.x <= 3950 || this.walkRightInArea) {
                this.turnArround = false;
                this.walkRightInArea = true;
                this.walkLeftInArea = false;
                clearInterval(triggerMovement);
                clearInterval(triggerMovement1);
                clearInterval(lefttWalkInArea);
                this.playAnimation(this.WALKING_IMAGES);
                this.moveRight();
            }
        }, 1000/18);


        let lefttWalkInArea = setInterval(() => {
            if (this.x >= 5050 || this.walkLeftInArea ) {
                
                this.turnArround = true;
                this.walkRightInArea = false;
                this.walkLeftInArea = true;
                clearInterval(rightWalkInArea);
                this.playAnimation(this.WALKING_IMAGES);
                this.moveLeft();
            }
        }, 1000/18);




    }



}