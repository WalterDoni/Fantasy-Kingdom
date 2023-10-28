class DrawableObjects {

    img;
    imageCache = {};
    currentImage = 0;

    // loadImage('img/...png')
    loadImage(path) {
        this.img = new Image(); // predetermined function => same as document.getEle...src= Quelle
        this.img.src = path;
    }

    /**
        * draw the object in the canvas
        * @param {object} ctx context of the canvas
        */
    draw(ctx) {
        try{
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch(e){
            console.warn('Error loading image', e);
            console.log('Could not load imag', this.img.src);
        }
    }

    /**
     * 
     * @param {Array} array -   //['img/image1.png', 'img/image2.png',........]
     */
    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;           
            this.imageCache[path] = img; 
        });
    }

    // Draw the frame arround Objects, for developing
   /*drawFrame(ctx) { 
        if (this instanceof Character || this instanceof Goblin || this instanceof Dwarf || this instanceof Endboss || this instanceof Coin || this instanceof WalkingDwarf || this instanceof WalkingDwarf) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x + 20, this.y + 50, this.width - 80, this.height -70 );
            ctx.stroke();
        }
    }*/

}