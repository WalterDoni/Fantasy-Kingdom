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
            this.playWalkAnimation()
        }, 180);
    }



}