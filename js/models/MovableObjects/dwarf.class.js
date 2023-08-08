class Dwarf extends MovableObjects {

speed = 1


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

    DEAD_IMAGES = [
        'img/3.Enemies/Dwarf/Death/Death1.png',
        'img/3.Enemies/Dwarf/Death/Death2.png',
        'img/3.Enemies/Dwarf/Death/Death3.png',
        'img/3.Enemies/Dwarf/Death/Death4.png',
        'img/3.Enemies/Dwarf/Death/Death5.png',

    ]

    IDLE_IMAGES = [
        'img/3.Enemies/Dwarf/Idle/Idle1.png',
        'img/3.Enemies/Dwarf/Idle/Idle2.png',
        'img/3.Enemies/Dwarf/Idle/Idle3.png',
    ]
    
    moreAccurateCollision = {
        top: 10,
        right: 85,
        bottom: 20,
        left: 60,
     }

    constructor(x, y) {
        super().loadImage('img/3.Enemies/Dwarf/Walk/Walk1.png');
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
            if (this.isDead() && this.dead <= 1) {
                clearInterval(conditionsToMove);
                clearInterval(startMoving);
                clearInterval(startMoving1);
                clearInterval(attacks);
                this.playAnimation(this.DEAD_IMAGES);
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
      


        //--Before contact--//
        let Idle = setInterval(() => {
            this.turnArround = true;
            this.playAnimation(this.IDLE_IMAGES);
        }, 230);

        //--After contact--//

        let conditionsToMove = setInterval(() => {
            if (world && level1.enemies[1].x - world.character.x <= 500 || this.firstContact) {
                clearInterval(Idle);
                this.firstContact = true;

            }

        }, 1000 / 60);

        let startMoving = setInterval(() => {
            if (this.firstContact && world && this.x - world.character.x >= 120 || this.firstContact && world && this.y - world.character.y >= 50) {
                this.moveLeft();
            }

        }, 1000 / 60);


        let startMoving1 = setInterval(() => {
            if (this.firstContact && world && this.x - world.character.x >= 120 || this.firstContact && world && this.y - world.character.y >= 50) {
                this.playAnimation(this.WALKING_IMAGES);
                this.moveLeft();
            }
        }, 180);


        let attacks = setInterval(() => {
            if (world && this.x - world.character.x <= 120 && this.y - world.character.y <= 30) {
                this.playAnimation(this.IMAGE_ATTACK);

            }

        }, 140)

    }




}

