class MovableObjects extends DrawableObjects {

   height = 190;
   width = 180;
   speed = 0;
   speedY = 0;
   acceleration = 2.5;
   lastHit = 0;
   healthpoints = 100;
   



   //Berechnet die Eckpukte 
   isColliding(obj) {
      return this.x + this.width -70 > obj.x && // Rechter Punkt der X-Achhse > x von Objekt
         this.y + this.height > obj.y &&  // Links unten Punkt der Y-Achse > y von Oblekt
         this.x < obj.x &&  // Linker Punkt der X-Achse < x von Objekt
         this.y  < obj.y + obj.height // Links oben Punkt der Y-Achse + Y und Höhe von Objekt
   }

   hit() {
      this.healthpoints -= 10;
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