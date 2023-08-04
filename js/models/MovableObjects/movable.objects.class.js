class MovableObjects extends DrawableObjects {

   height = 190;
   width = 180;
   speed = 0;
   speedY = 0;
   acceleration = 2.5;
   lastHit = 0;
   walkRightInArea = false;
   walkLeftInArea = false;
   firstContact = false;
   
   healthpoints = 100;
   timerToStopAnimations = 0;
   world;
   moreAccurateCollision = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
   }


   //Berechnet die Eckpukte 
   isColliding(obj) {
      return this.x + this.width - this.moreAccurateCollision.right > obj.x + obj.moreAccurateCollision.left && // Rechter Punkt der X-Achhse > linker Punkt x von Objekt
         this.y + this.height - this.moreAccurateCollision.bottom > obj.y + obj.moreAccurateCollision.top &&  // Unterer Punkt der Y-Achse > Oberer Punkt y von Objekt
         this.x + this.moreAccurateCollision.left < obj.x + obj.width - obj.moreAccurateCollision.right &&  // Linker Punkt der X-Achse < rechter Punkt x von Objekt
         this.y + this.moreAccurateCollision.top < obj.y + obj.height - obj.moreAccurateCollision.bottom   // Oberer Punkt der Y-Achse < unterer Punkt Y von Objekt
   }    // moreAccurateCollision --> Zieht Werte ab oder addiert Werte um die Collision genauer zu machen

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
      let timepassed = new Date().getTime() - this.lastHit; // Differenz in Millisekunden
      timepassed = timepassed / 1000; // Differenz in Sekunden
      return timepassed < 1;  // wenn man innerhalb der letzten Sekunden getroffen wurde, gibt die Funktion true zurück
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
      if (this.world.character.x >= 910 && this.world.character.x <= 1200) {
         return this.y < 270;
      } if (this.world.character.x >= 2560 && this.world.character.x <= 2605) {
         return this.y < 238;
      } if (this.world.character.x >= 2250 && this.world.character.x <= 2555) {
         return this.y < 135;
      } if (this.world.character.x >= 2750 && this.world.character.x <= 3350) {
         return this.y < 60;
      } if (this.world.character.x >= 3360 && this.world.character.x <= 3705) {
         return this.y < 165;
      } if (this.world.character.x >= 3710 && this.world.character.x <= 3900) {
         return this.y < 265;
      }  else {
         return this.y < 365;
      }
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