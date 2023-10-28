class BackgroundObjects extends MovableObjects{

    width = 1024;
    height = 400;

    constructor(imagePath, x, y){
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}