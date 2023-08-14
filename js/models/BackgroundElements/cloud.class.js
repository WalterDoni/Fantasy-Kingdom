class Cloud extends MovableObjects{
    height = 350;
    width = 500;
    speed = 0.15;
    

    constructor(x, y){
        super().loadImage('img/4.Maps/forest/Background/Bright/coluds_small.png')
        this.y = y;
        this.x = x;
        this.animate();
    };

    animate(){

        setStoppableInterval(() => {
        this.x -= this.speed;
    }, 1000 / 30); // 60 FPS
     
    }
}