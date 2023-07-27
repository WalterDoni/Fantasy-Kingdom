class ThrowableObjects extends MovableObjects {
    world;

    IMAGES_FIRE = [
        'img/7.Effects/Fire/fire1.png',
        'img/7.Effects/Fire/fire2.png',
        'img/7.Effects/Fire/fire3.png',
        'img/7.Effects/Fire/fire4.png',
        'img/7.Effects/Fire/fire5.png',
        'img/7.Effects/Fire/fire6.png',
        'img/7.Effects/Fire/fire7.png',
        'img/7.Effects/Fire/fire8.png',
        'img/7.Effects/Fire/fire9.png',
        'img/7.Effects/Fire/fire10.png',
    ]

    constructor(x, y) {
        super().loadImage('img/7.Effects/Fire/fire1.png');
        this.x = x;
        this.y = y;
        this.height = 150;
        this.width = 150;
        this.loadImages(this.IMAGES_FIRE);
        this.throw();
    }

    
   
    throw() {

        this.currentImage = 0;
    
        if (this.timerToStopAnimations <= 100 && !this.attackInterval) {
            this.attackInterval = setInterval(() => {
                this.x += 30;
                this.playAnimation(this.IMAGES_FIRE);
                this.timerToStopAnimations +=10.18;
    
                if (this.timerToStopAnimations > 100) {
                    clearInterval(this.attackInterval);
                    this.attackInterval = null;
                    this.timerToStopAnimations = 0;
                    this.currentImage = 0;
                }
            }, 110);
        }
    }


}