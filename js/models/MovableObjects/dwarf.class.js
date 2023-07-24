class Dwarf extends MovableObjects {

  
  

    WALKING_IMAGES = [

        'img/3.Enemies/Dwarf/Walk/Walk1.png',
        'img/3.Enemies/Dwarf/Walk/Walk2.png',
        'img/3.Enemies/Dwarf/Walk/Walk3.png',
        'img/3.Enemies/Dwarf/Walk/Walk4.png',
        'img/3.Enemies/Dwarf/Walk/Walk5.png',
        'img/3.Enemies/Dwarf/Walk/Walk6.png',
    ]


    constructor(x, y) {
        super().loadImage('img/3.Enemies/Dwarf/Walk/Walk1.png');
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