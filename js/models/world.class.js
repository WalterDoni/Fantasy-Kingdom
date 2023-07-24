class World {

    level = level1;
    character = new Character();
    healthbar = new Healthbar();
    statusbarFrameHP = new StatusbarFrameHP();
    statusbarFrameMana = new StatusbarFrameMana();
    manabar = new Manabar();
    avatarFrame = new AvatarFrame();
    avatarIcon = new AvatarIcon();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    turnArround = false;
    hit = 10;





    constructor(canvas, keyboard) { // constructor wird immer zuerst aufgerufen!!

        this.canvas = canvas;
        this.keyboard = keyboard; // Wird über game.js initiert
        this.ctx = canvas.getContext('2d'); /*Context=Lässt zu auf den Koordinaten etwas einzugeben*/
        this.setWorld();
        this.draw();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
                 
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
             
                if (this.character.isColliding(enemy)) {
                  this.character.hit();
                  this.healthbar.updateHealthpoints();
                }
            });
        }, 150);
    }
         
    
  


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //canvas immer neu laden, damit die Charaktere sich nicht stapeln.
        this.ctx.translate(this.camera_x, 0) // translate verschiebt alles um den Wert camera_x
        this.addObjectsToMap(this.level.backgrounds);
        this.addToWorld(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.birds);
        this.addObjectsToMap(this.level.collectables);
        this.addObjectsToMap(this.level.enemies);
        /*this.level.enemies.forEach(enemy => { //Schnelle Schreibweise für die for-Schleife
            this.addToWorld(enemy) // addObjectsToMap macht den Code lesbarer, führt jedoch genau das aus
        });*/
        this.addObjectsToMap(this.level.grounds);
        this.ctx.translate(-this.camera_x, 0)// Nach dem Zeichnen ctx wieder zurücksetzen, sonst verschwindet die Map

        //-- Hier fixierte Elemente auf der Karte einfügen - Start -- //
        this.healthbar.renderStatusbars(this.ctx);
        this.manabar.renderStatusbars(this.ctx);
        this.addToWorld(this.statusbarFrameHP);
        this.addToWorld(this.statusbarFrameMana);
        this.addToWorld(this.avatarFrame);
        this.addToWorld(this.avatarIcon);
        

        //-- Hier fixierte Elemente auf der Karte einfügen - Ende -- //


        let self = this;
        requestAnimationFrame(function () { // Wird ausgeführt sobald alles darüber ausgeführt wurde. (quasi async.)
            self.draw();// Draw wird so oft wie möglich aufgerufen (je nach PC-Leistung)
        });
    }

    addObjectsToMap(Objects) {
        Objects.forEach(object =>
            this.addToWorld(object));
    };


    addToWorld(movabelThing) {  // Character Rotation, Spiegelung nach links 

        if (movabelThing.turnArround) { // Wenn turnArround auf true gesetzt wird
            this.ctx.save();  // aktuelles Bild wird gespeichert
            this.ctx.translate(130, 0); // Bild wird gespiegelt
            this.ctx.scale(-1, 1);// Größe des Bildes wird beigehalten
            movabelThing.x = movabelThing.x * -1; // Behalte Platz an der X-Achse bei
        }


        movabelThing.draw(this.ctx)

        movabelThing.drawFrame(this.ctx)


        if (movabelThing.turnArround) { // Falls ein Bild verändert wurde, deshalb vorhin save
            movabelThing.x = movabelThing.x * -1;
            this.ctx.restore();   // Ursprung wieder herstellen, Bilder wieder normal anzeigen

        }
    }

    
}
