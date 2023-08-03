class World {

    level = level1;
    character = new Character();
    endboss = new Endboss();
    healthbar = new Healthbar();
    statusbarFrameHP = new StatusbarFrameHP();
    statusbarFrameMana = new StatusbarFrameMana();
    manabar = new Manabar();
    avatarFrame = new AvatarFrame();
    avatarIcon = new AvatarIcon();
    throwableObjects = [];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    turnArround = false;
    hit = 10;
    lastHit = 0;




    constructor(canvas, keyboard) { // constructor wird immer zuerst aufgerufen!!

        this.canvas = canvas;
        this.keyboard = keyboard; // Wird über game.js initiert
        this.ctx = canvas.getContext('2d'); /*Context=Lässt zu auf den Koordinaten etwas einzugeben*/
        this.setWorld();
        this.draw();
        this.run();
    }
    /**
     * Bind the character to the world, it's necessary e.g. for the camera_x 
     */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
        this.throwableObjects.world = this;
    }


    run() {

        setInterval(() => {
            this.checkCollisions();
            this.useAttacksFromCharacter();
            this.hitEnemy();
        }, 150);

    }

    /**
   * Check if something (e.g. enemy) collides with the character. 
   * hit -> this function is described in movable.objects.class.js
   * updateHealthpoints -> this function is described in manabar- or heathbar.class.ja
   */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {

            if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
                this.character.hit();
                this.healthbar.updateHealthpoints();
            }

        });
    }

    hitEnemy() {
        this.level.enemies.forEach((enemy) => {

            if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY < 0) {
                this.damageTheHittedEnemy(enemy);
                this.character.jump();
            }
        });
    }


    damageTheHittedEnemy(enemy) {
        enemy.healthpoints -= 50;
        if (enemy.healthpoints < 0) {
            enemy.healthpoints = 0;
        }
    }




    useAttacksFromCharacter() {
        if (this.keyboard.T_KEYBOARD) {
            let fireball = new ThrowableObjects(this.character.x + 50, this.character.y + 20);
            this.throwableObjects.push(fireball);
            this.character.fireAttack();
        }
        if (this.keyboard.LEFTMOUSE) {
            this.character.swordattack();
        }
    }


    /**
     * clearRect -> cleares the canvas, so the elements did not stack on the map and get generated multiple time.
     * translate -> camera_x is bind at animate() in character.class.js. So everytime when the character moves right. everything generated moves for the 
     * same value into the other direction on the X-axis. Till line 76
     * The generated elements after that are on a fixed position in the canvas. e.g. the healthbar.
     * requestAnimationFrame -> function repeats after everything is generated above. Over and over again(depends on the computer power).
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.level.backgrounds);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.birds);
        this.addToWorld(this.character);
        this.addObjectsToMap(this.level.collectables);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        /*this.level.enemies.forEach(enemy => {  //fast writing method for the for-loop
            this.addToWorld(enemy) // 
        });*/
        this.addObjectsToMap(this.level.grounds);
        this.ctx.translate(-this.camera_x, 0)

        //-- Fixed elements on the canvas - Start -- //
        this.healthbar.renderStatusbars(this.ctx);
        this.manabar.renderStatusbars(this.ctx);
        this.addToWorld(this.statusbarFrameHP);
        this.addToWorld(this.statusbarFrameMana);
        this.addToWorld(this.avatarFrame);
        this.addToWorld(this.avatarIcon);
        //-- Fixed elements on the canvas - End -- //


        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    addObjectsToMap(Objects) {
        Objects.forEach(object =>
            this.addToWorld(object));
    };


    /**
     * This functions draws elements on the canvas.
     * 
     * @param {array} movabelThing - get the value of character,bird,enemy,statusbar...
     * 
     * draw -> is described in drawable.objects.class.js. 
     * drawFrame -> frame for developing
     *  if turnArround is set on true , the images get mirrored with translate
     *  after turnArround was set on true reset the mirrored image. So the next image
     * will showend right. If restore would be not used, the image would change between mirrored and not.
     * 
     */
    addToWorld(movabelThing) {

        if (movabelThing.turnArround) {
            this.ctx.save();  // save the current image
            this.ctx.translate(130, 0); // Mirrors the image
            this.ctx.scale(-1, 1);// Save the size from the image
            movabelThing.x = movabelThing.x * -1; // Save the place on the X-Axis
        }

        movabelThing.draw(this.ctx);
        movabelThing.drawFrame(this.ctx)

        if (movabelThing.turnArround) { // Falls ein Bild verändert wurde, deshalb vorhin save
            movabelThing.x = movabelThing.x * -1;
            this.ctx.restore();   // Ursprung wieder herstellen, Bilder wieder normal anzeigen

        }
    }


}
