class Coin extends MovableObjects{
     
    width = 35;
    height = 35;
    speed = 0;


    IMAGES = [

        'img/5.CollectableItems/coin1.png',
        'img/5.CollectableItems/coin2.png',
        'img/5.CollectableItems/coin3.png',
        'img/5.CollectableItems/coin4.png',
        'img/5.CollectableItems/coin5.png',
        'img/5.CollectableItems/coin6.png',
        'img/5.CollectableItems/coin7.png',
        'img/5.CollectableItems/coin8.png',
        'img/5.CollectableItems/coin9.png',
        'img/5.CollectableItems/coin10.png',
    ]

    constructor(x, y){
    super().loadImage('img/5.CollectableItems/coin1.png');
    this.x = x;
    this.y = y;
    this.loadImages(this.IMAGES);
    this.animate();
    }

 animate(){
    this.moveLeft();

    setInterval(() =>{

    let i = this.currentImage % this.IMAGES.length;
    let path = this.IMAGES[i];
    this.img = this.imageCache[path];
    this.currentImage++;
    }, 150 )

 }


}

