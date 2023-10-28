class CoinImageUI extends MovableObjects {

    IMAGE = 'img/5.CollectableItems/coin1.png';  

    constructor() {
        super();
        this.x = 210;
        this.y = 110;
        this.width = 35
        this.height = 35; 
        this.image();
    }

    image() {
        this.loadImage(this.IMAGE)
    }
}

