class MovableObjects {

   img;
   height = 190;
   width = 180;
   speed = 0.15;
   imageCache = {};
   currentImage = 0;
   speedY = 0;
   acceleration = 2.5;
   healthpoints = 100;
   lastHit = 0;



   // loadImage('img/...png')
   loadImage(path) {
      this.img = new Image(); // vorgegebene Funktion => selbe wie document.getEle...src= Quelle
      this.img.src = path;
   }

   draw(ctx) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

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



   //Berechnet die Eckpukte 
   isColliding(obj) {
      return this.x + this.width > obj.x && // Rechter Punkt der X-Achhse > x von Objekt
         this.y + this.height > obj.y &&  // Links unten Punkt der Y-Achse > y von Oblekt
         this.x < obj.x &&  // Linker Punkt der X-Achse < x von Objekt
         this.y < obj.y + obj.height // Links oben Punkt der Y-Achse + Y und Höhe von Objekt
   }

   hit() {
      this.healthpoints -= 5;
      if (this.healthpoints < 0) {
         this.healthpoints = 0;
      } else {
         this.lastHit = new Date().getTime(); //Aktuelle Zeit in Millisekunden seit 01.01.1970
      }
   }

   isDead() {
      return this.healthpoints == 0;
   }
   isHurt() {
      let timepassed = new Date().getTime() - this.lastHit; // Differenz im Millisekunden
      timepassed = timepassed / 1000; // Differenz in Sekunden
      return timepassed < 1; // return gibt quasi true retour, wenn ein Hit nach 5 Sekunden passiert;
   }


   /**
    * 
    * @param {Array} array -   //['img/image1.png', 'img/image2.png',........]
    */
   loadImages(array) {
      array.forEach(path => {
         let img = new Image();
         img.src = path;               // sonst nur in jeweils geschweiten Klammern
         this.imageCache[path] = img; // this. greift auf Globale Variablen zu.
      });
   }

   //Gravitation//

   applyGravity() {
      setInterval(() => {
         if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
         }
      }, 1000 / 25)
   }

   isAboveGround() {
      return this.y < 365;
   }
   //Gravitation//


   playAnimation(image) {
      let i = this.currentImage % image.length;// Modulo -> % / errechnet den Restwert // 0 % 6 = 0 , 1 % 6 = 1, 6 % 6 = 0 
      let path = image[i];
      this.img = this.imageCache[path];
      this.currentImage++;
   }

   playWalkAnimation() {
      let i = this.currentImage % this.WALKING_IMAGES.length;// Modulo -> % / errechnet den Restwert // 0 % 6 = 0 , 1 % 6 = 1, 6 % 6 = 0 
      let path = this.WALKING_IMAGES[i];
      this.img = this.imageCache[path];
      this.currentImage++;
   }

   playJumpAnimation() {
      let i = this.currentImage % this.IMAGES_JUMPING.length;
      let path = this.IMAGES_JUMPING[i];
      this.img = this.imageCache[path];
      this.currentImage++;
   }

   playHurtAnimation() {
      let i = this.currentImage % this.HURT_IMAGES.length;
      let path = this.HURT_IMAGES[i];
      this.img = this.imageCache[path];
      this.currentImage++;
   }

   playDeadAnimation() {
      let i = this.currentImage % this.DEAD_IMAGES.length;
      let path = this.DEAD_IMAGES[i];
      this.img = this.imageCache[path];
      this.currentImage++;
   }

   moveRight() {
      this.x += this.speed;
      this.turnArround = false;
   }

   moveLeft() {

      this.x -= this.speed;
      this.turnArround = true;

   }

   jump() {
      this.speedY = 25;
   }


}