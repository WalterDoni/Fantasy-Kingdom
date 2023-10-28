class MovableObjects extends DrawableObjects {

   height = 190;
   width = 180;
   speed = 0;
   speedY = 0;
   acceleration = 2.5;
   lastHit = 0;

   walkRightInArea = false;
   walkLeftInArea = false;
   walkRightInArea1 = false;
   walkLeftInArea1 = false;
   firstContact = false;

   Idle = null;
   conditionsToMove = null;
   startMoving = null;
   startMovingAnimation = null;

   hurt = 0;
   dead = 0;

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
      return this.x + this.width - this.moreAccurateCollision.right > obj.x + obj.moreAccurateCollision.left  && // Rechter Punkt der X-Achhse > linker Punkt x von Objekt
         this.y + this.height - this.moreAccurateCollision.bottom > obj.y + obj.moreAccurateCollision.top &&  // Unterer Punkt der Y-Achse > Oberer Punkt y von Objekt
         this.x + this.moreAccurateCollision.left < obj.x + obj.width - obj.moreAccurateCollision.right &&  // Linker Punkt der X-Achse < rechter Punkt x von Objekt
         this.y - this.moreAccurateCollision.top < obj.y + obj.height - obj.moreAccurateCollision.bottom   // Oberer Punkt der Y-Achse < unterer Punkt Y von Objekt
   }    // moreAccurateCollision --> Zieht Werte ab oder addiert Werte um die Collision genauer zu machen

   isCollidingWhileSwordAttack(obj) {
      return this.x + this.width + 25 > obj.x + obj.moreAccurateCollision.left && 
         this.y + this.height - this.moreAccurateCollision.bottom > obj.y + obj.moreAccurateCollision.top && 
         this.x - 10 < obj.x + obj.width - obj.moreAccurateCollision.right &&  
         this.y + this.moreAccurateCollision.top < obj.y + obj.height - obj.moreAccurateCollision.bottom  
   }   

   hit() {
      this.healthpoints -= 10;
      if (this.healthpoints < 0) {
         this.healthpoints = 0;
      } else {
         this.lastHit = new Date().getTime(); 
      }
   }

   isDead() {
      return this.healthpoints == 0;
   }

   isHurt() {
      let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
      timepassed = timepassed / 1000; // Difference in s
      return timepassed < 1;  // wenn man innerhalb der letzten Sekunden getroffen wurde, gibt die Funktion true zurück
   }

   //Gravitation//

   applyGravity() {
      setInterval(() => {
         if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
         }
         else if (this.x >= 910 && this.x <= 1200) {
            this.y = 270;
         }
         else if (this.x >= 2550 && this.x <= 2680 && this.y <= 250) {
            this.y = 240;
         }
         else if (this.x >= 2200 && this.x <= 2555 && this.y <= 150) {
            this.y = 140;
         }
         else if (this.x >= 2740 && this.x <= 3350) {
            this.y = 70;
         }
         else if (this.x >= 3345 && this.x <= 3705) {
            this.y = 170;
         }
         else if (this.x >= 3710 && this.x <= 3900) {
            this.y = 270;
         }
         else {
            this.y = 370 ;
         }
      }, 1000 / 25)
   }

   isAboveGround() {
      if (this.x >= 910 && this.x <= 1200) {
         return this.y < 270;
      } if (this.x >= 2560 && this.x <= 2680) {
         return this.y < 240;
      } if (this.x >= 2200 && this.x <= 2555 && this.y <= 140) {
         return this.y < 140;
      } if (this.x >= 2740 && this.x <= 3365 && this.y <= 140) {
         return this.y < 70;
      } if (this.x >= 3360 && this.x <= 3705) {
         return this.y < 170;
      } if (this.x >= 3710 && this.x <= 3900 ) {
         return this.y < 270;
      } else {
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