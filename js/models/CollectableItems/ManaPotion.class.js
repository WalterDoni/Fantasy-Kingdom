class ManaCrystal extends MovableObjects {

    width = 35;
    height = 35;
    speed = 0;


    IMAGES = [

        'img/5.CollectableItems/crystal.png',
        'img/5.CollectableItems/crystal2.png',
        'img/5.CollectableItems/crystal3.png',
        'img/5.CollectableItems/crystal4.png',
        'img/5.CollectableItems/crystal5.png',
        'img/5.CollectableItems/crystal6.png',
        'img/5.CollectableItems/crystal7.png',
        'img/5.CollectableItems/crystal8.png',
        'img/5.CollectableItems/crystal9.png',
        'img/5.CollectableItems/crystal10.png',


    ]
   
  
    constructor(x, y) {
        super().loadImage('img/5.CollectableItems/crystal.png');
        this.x = x;
        this.y = y;
        this.loadImages(this.IMAGES);
        this.animate();
    }

    animate() {
        this.moveLeft();

        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES)
        }, 150)

    }


}