class WalkingDwarf extends MovableObjects {

    speed = 0.5;

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
        'img/3.Enemies/Dwarf/Attack/Attack2png',
        'img/3.Enemies/Dwarf/Attack/Attack3.png',
        'img/3.Enemies/Dwarf/Attack/Attack4.png',
        'img/3.Enemies/Dwarf/Attack/Attack5.png',
    ]


    HURT_IMAGES = [
        'img/3.Enemies/Dwarf/Hurt/Hurt1.png',
        'img/3.Enemies/Dwarf/Hurt/Hurt2.png',
    ]

    DEAD_IMAGES = [
        'img/3.Enemies/Dwarf/Death/Death1.png',
        'img/3.Enemies/Dwarf/Death/Death2.png',
        'img/3.Enemies/Dwarf/Death/Death3.png',
        'img/3.Enemies/Dwarf/Death/Death4.png',
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

        setInterval(() => {
            if (world && level1.walkingEnemies[3].x <= 3400 || this.walkRightInArea1) {
                level1.walkingEnemies[3].moveRight();
                level1.walkingEnemies[3].walkRightInArea1= true;
                level1.walkingEnemies[3].walkLeftInArea1 = false;

            } if (world && level1.walkingEnemies[3].x >= 3650 || this.walkLeftInArea1) {
                level1.walkingEnemies[3].moveLeft();
                level1.walkingEnemies[3].walkRightInArea1 = false;
                level1.walkingEnemies[3].walkLeftInArea1 = true;
            }
        }, 1000 / 60);


        setInterval(() => {
            if (this.walkLeftInArea || this.walkRightInArea || this.walkRightInArea1 || this.walkLeftInArea1) {
                this.playAnimation(this.WALKING_IMAGES);
            }
        }, 180);



    }




}