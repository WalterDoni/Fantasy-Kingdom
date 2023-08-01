class Endboss extends MovableObjects{
    height = 400;
    width = 300;
   
  

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
        this.animate();
    }

 
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60); 
        setInterval(() => {
            this.playAnimation(this.WALKING_IMAGES)
        }, 180);
    }



}