class World {

    level = level1;
    throwableObjects = [];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    turnArround = false;
    hit = 10;
    lastHit = 0;
   
    defeat_sound = new Audio('audio/defeat.mp3');
    victory_sound = new Audio('audio/victory.mp3')



    //--Character--//
    character = new Character();
    healthbar = new Healthbar();
    manabar = new Manabar();
    statusbarFrameHP = new StatusbarFrameHP();
    statusbarFrameMana = new StatusbarFrameMana();
    avatarFrame = new AvatarFrame();
    avatarIcon = new AvatarIcon();
    coinImage = new CoinImageUI();
    coinCounter = new CoinCounter();

    //--Endboss--//
    endboss = new Endboss();
    endbossHP = new EndbossHP();
    endbossHPFrame = new endbossStatusbarFrameHP();
    endbossAvatarFrame = new EndbossAvatarFrame();
    endbossAvatarIcon = new EndbossAvatarIcon();


    constructor(canvas, keyboard) {

        this.canvas = canvas;
        this.keyboard = keyboard;
        this.ctx = canvas.getContext('2d'); /*ctx = Allows to draw something on the canvas*/
        this.setWorld();
        this.draw();
        this.run();
        this.collectCoinsOrManapotion();

    }
    /**
     * Bind the character to the world, it's necessary e.g. for the camera_x 
     * Bind the throwableObject to the world, it's necessary e.g. for the collision 
     */
    setWorld() {
        this.character.world = this;
        this.throwableObjects.world = this;
    }


    /**
     * In order to avoid running unnecessarily many intervals, all functions are placed in a single interval.
     */
    run() {

        setStoppableInterval(() => {
            this.checkCollisions();
            this.useAttacksFromCharacter();
            this.hitEnemy();
            this.hitEnemyWalkingEnemies();
            this.hitEndboss();
            this.checkCollisionsWalkingEnemies();
            this.checkIfThrowableObjectHitsEnemie();
            this.checkCollisionsWithEndboss();
            this.hitEndboss();
            this.playSound();
            this.showWinOrDefeatScreen();

        }, 150);

    }


    /**
      * @param {object} titleMusic -> If the variable is set on true, music will play, otherwise it will stop. This function can be activated by the button on top of the canvas.
     */
    playSound() {
        if (titleMusic) {
            game_sound.volume = 0.1;
            game_sound.play();
        }  if (!titleMusic) {
            game_sound.pause();

        }
    }

    /**
    * Show on off the two screens ( win- or losescreen), depends which conditions get reached at first.
    */
    showWinOrDefeatScreen() {
        if (this.character.healthpoints == 0 && this.endbossHP.healthpoints > 0) {
            document.getElementById('defeatScreen').classList.remove('d-none');
            game_sound.pause();
            this.defeat_sound.volume = 0.5;
            this.defeat_sound.play();
            stopGame();

            setTimeout(() => {
                this.defeat_sound.pause();
            }, 5000);
        }

        if (this.character.healthpoints > 0 && this.endbossHP.healthpoints == 0) {
            document.getElementById('winScreen').classList.remove('d-none');
            game_sound.pause();
            this.victory_sound.volume = 0.1;
            this.victory_sound.play();
            stopGame();
            setTimeout(() => {
                this.defeat_sound.pause();
            }, 15000);
        }
    }

    /**
    * @param {object} collectables -> If one of these collides with the character, add +1 to the coin-counter.
    * * @param {object} manapotions -> If one of these collides with the character, fill 50% of the manabar.
    */
    collectCoinsOrManapotion() {

        setStoppableInterval(() => {
            this.level.collectables.forEach((collectable) => {
                if (this.character.x - collectable.x >= 1 && this.character.x - collectable.x <= 15 && this.character.y + this.character.height - collectable.y >= 0 && this.character.y - collectable.y <= 10) {
                    this.level.collectables.splice(collectable, 1);
                    this.coinCounter.updateCoinCounter();
                    this.coinCounter.renderCoinCounter();
                }
            })

            this.level.manapotions.forEach((potion) => {

                if (this.manabar.manabarMax < 200) {
                    if (this.character.x - potion.x >= 1 && this.character.x - potion.x <= 15 && this.character.y + this.character.height - potion.y >= 0 && this.character.y - potion.y <= 10) {
                        this.level.manapotions.splice(potion, 1);
                        this.manabar.updateManapointsPlus();
                    }
                }
            })
        }, 1000 / 60);

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


    checkIfThrowableObjectHitsEnemie() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isDead()) { return }
            this.throwableObjects.forEach((fireball) => {
                if (fireball.isColliding(enemy)) {
                    this.damageTheHittedEnemy(enemy);
                    this.throwableObjects.splice(fireball, 1);


                }
            });
        });

        this.level.walkingEnemies.forEach((enemy) => {
            if (enemy.isDead()) { return }
            this.throwableObjects.forEach((fireball) => {
                if (fireball.isColliding(enemy)) {
                    this.damageTheHittedEnemy(enemy);
                    this.throwableObjects.splice(fireball, 1);


                }
            });
        });

        this.level.endboss.forEach((boss) => {
            if (boss.isDead()) { return }
            this.throwableObjects.forEach((fireball) => {
                if (fireball.isColliding(boss)) {
                    this.damageTheHittedEnemy(boss);
                    this.throwableObjects.splice(fireball, 1);


                }
            });
        });
    }


    hitEnemy() {
        this.level.enemies.forEach((enemy) => {

            if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY < 0) {
                this.damageTheHittedEnemy(enemy);
                this.character.jump();
            }

            if (this.character.isCollidingWhileSwordAttack(enemy) && this.keyboard.F_KEYBOARD) {
                this.damageTheHittedEnemy(enemy);
            }

        });


    }




    //-WalkingEnemies--//
    hitEnemyWalkingEnemies() {
        this.level.walkingEnemies.forEach((enemy) => {

            if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY < 0) {
                this.damageTheHittedEnemy(enemy);
                this.character.jump();

            } if (this.character.isCollidingWhileSwordAttack(enemy) && this.keyboard.F_KEYBOARD) {
                this.damageTheHittedEnemy(enemy);
            }
        });
    }



    checkCollisionsWalkingEnemies() {
        this.level.walkingEnemies.forEach((enemy) => {

            if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
                this.character.hit();
                this.healthbar.updateHealthpoints();
            }

        });
    }


    //-WalkingEnemies--//



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
            this.manabar.updateManapointsMinus();
        }
        if (this.keyboard.F_KEYBOARD) {
            this.character.swordAttack();

        }
    }

    // Endboss-------------------


    checkCollisionsWithEndboss() {

        this.level.endboss.forEach((boss) => {

            if (this.character.isColliding(boss) && !this.character.isAboveGround()) {
                this.character.hit();
                this.healthbar.updateHealthpoints();
            }

        });
    };

    hitEndboss() {
        this.level.endboss.forEach((boss) => {

            if (this.character.isColliding(boss) && this.character.isAboveGround() && this.character.speedY < 0) {
                this.damageTheEndboss(boss);
                this.endbossHP.updateHealthpoints();
                this.character.jump();

            } if (this.character.isCollidingWhileSwordAttack(boss) && this.keyboard.F_KEYBOARD) {
                this.damageTheEndboss(boss);
                this.endbossHP.updateHealthpoints();
            }
        });
    }

    damageTheEndboss(boss) {
        boss.healthpoints -= 20;
        if (boss.healthpoints < 0) {
            boss.healthpoints = 0;
        }
    }
    // Endboss-------------------

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
        this.addObjectsToMap(this.level.manapotions);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.walkingEnemies);
        this.addObjectsToMap(this.level.endboss);
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
        this.addToWorld(this.coinImage);
        this.coinCounter.renderCoinCounter(this.ctx);
        this.coinCounter.renderXFromCounter(this.ctx);

        if (this.endboss.firstContact) {
            this.endbossHP.renderStatusbars(this.ctx);
            this.addToWorld(this.endbossAvatarFrame);
            this.addToWorld(this.endbossAvatarIcon);
            this.addToWorld(this.endbossHPFrame);
        }

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
        /*movabelThing.drawFrame(this.ctx);*/

        if (movabelThing.turnArround) { // Falls ein Bild verändert wurde, deshalb vorhin save
            movabelThing.x = movabelThing.x * -1;
            this.ctx.restore();   // Ursprung wieder herstellen, Bilder wieder normal anzeigen

        }
    }


}
