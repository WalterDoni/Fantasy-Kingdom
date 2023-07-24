class DrawableObjects {


    img;
    imageCache = {};
    currentImage = 0;


    // loadImage('img/...png')
    loadImage(path) {
        this.img = new Image(); // vorgegebene Funktion => selbe wie document.getEle...src= Quelle
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    }

   
    /**
     * 
     * @param {Array} array -   //['img/image1.png', 'img/image2.png',........]
     */
    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;              // sonst nur in jeweils geschweiten Klammern
            this.imageCache[path] = img; // this. greift auf Globale Variablen zu.
        });
    }

    drawFrame(ctx) { // Zeichne den Rahem um instanceof Klassen
        if (this instanceof Character || this instanceof Goblin || this instanceof Dwarf || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

}