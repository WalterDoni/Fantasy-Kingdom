class AvatarFrame extends DrawableObjects {

    IMAGE = ['img/8.UI/square_border_big_full.png']


    x = 20;
    y = 20;
    height =100;
    width = 100;

    constructor() {
        super().loadImage(this.IMAGE);

    }
}