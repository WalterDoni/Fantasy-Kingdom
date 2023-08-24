class World {

    level = level1;
    throwableObjects = [];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    turnArround = false;
    hit = 10;
    removeFireballFromCanvas = 0;

    game_sound = new Audio('audio/titlemusic.mp3');
    defeat_sound = new Audio('audio/defeat.mp3');
    victory_sound = new Audio('audio/victory.mp3')

    playMusic;

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
      * @param {variable} playMusic -> If the variable is set on true, music will play, otherwise it will stop. This function can be activated by the button on top of the canvas.
     */
    playSound() {
        if (playMusic) {
            this.game_sound.volume = 0.1;
            this.game_sound.play();
            this.character.unmuteCharacterSounds();


        } if (!playMusic) {
            this.game_sound.pause();
            this.game_sound.currentTime = 0;
            this.character.muteCharacterSounds();
        }
    }



    /**
    * Show on off the two screens ( win- or losescreen), depends which conditions get reached at first.
    */
    showWinOrDefeatScreen() {
        if (this.character.healthpoints == 0 && this.endbossHP.healthpoints > 0) {
            this.defeatScreen();
            stopGame();

            setTimeout(() => {
                this.defeat_sound.pause();
            }, 5000);
        }

        if (this.character.healthpoints > 0 && this.endbossHP.healthpoints == 0) {
            this.winScreen();
            stopGame();
            setTimeout(() => {
                this.victory_sound.pause();
            }, 15000);
        }
    }

    defeatScreen() {
        document.getElementById('defeatScreen').classList.remove('d-none');
        this.game_sound.pause();
        this.defeat_sound.volume = 0.5;
        this.defeat_sound.play();
        this.game_sound.currentTime = 0;
    }

    winScreen() {
        document.getElementById('winScreen').classList.remove('d-none');
        this.game_sound.pause();
        this.victory_sound.volume = 0.1;
        this.victory_sound.play();
    }

    /**
    * @param {object} collectables -> If one of these collides with the character, add +1 to the coin-counter.
    * * @param {object} manapotions -> If one of these collides with the character, fill 50% of the manabar.
    */
    collectCoinsOrManapotion() {

        setInterval(() => {
            this.level.collectables.forEach((collectable, index) => {
                if (this.character.x - collectable.x >= 1 && this.character.x - collectable.x <= 15 && this.character.y + this.character.height - collectable.y >= 0 && this.character.y - collectable.y <= 10) {
                    this.level.collectables.splice(index, 1);
                    this.coinCounter.updateCoinCounter();
                    this.coinCounter.renderCoinCounter(this.ctx);
                }
            })

            this.level.manapotions.forEach((potion, index) => {
                if (this.manabar.manabarMax < 200) {
                    if (this.character.x - potion.x >= 1 && this.character.x - potion.x <= 15 && this.character.y + this.character.height - potion.y >= 0 && this.character.y - potion.y <= 10) {
                        this.level.manapotions.splice(index, 1);
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

    checkCollisionsWalkingEnemies() {
        this.level.walkingEnemies.forEach((enemy) => {

            if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
                this.character.hit();
                this.healthbar.updateHealthpoints();
            }

        });
    }


    checkIfThrowableObjectHitsEnemie() {
        this.throwOnEnemie();
        this.throwOnWalkingEnemie();

    }
    
    /**
     * For every enemy in the array enemies, when it gets hit by a throwable object, it will take damgage. After that the thrown element get removed from the canvas.
     */
    throwOnEnemie() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isDead()) { return }
            this.throwableObjects.forEach((fireball) => {
                if (fireball.isColliding(enemy)) {
                    this.damageTheHittedEnemy(enemy);
                    this.throwableObjects.splice(fireball, 1);
                }
            });
        });
    }
    
  
    throwOnWalkingEnemie() {
        this.level.walkingEnemies.forEach((enemy) => {
            if (enemy.isDead()) { return }
            this.throwableObjects.forEach((fireball) => {
                if (fireball.isColliding(enemy)) {
                    this.damageTheHittedEnemy(enemy);
                    this.throwableObjects.splice(fireball, 1);
                }
            });
        });
    }
    
    /**
     *  @param {array} enemies -> Checks if one of the both conditions get reached. If yes, the healthpoints get reduced by 50%. 
     */
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

    //-WalkingEnemies--//



    damageTheHittedEnemy(enemy) {
        enemy.healthpoints -= 50;
        if (enemy.healthpoints < 0) {
            enemy.healthpoints = 0;
        }
    }



    /**
     * The character can use two different attacks. One is a casting fireball and the other is "normal" attack with the sword.
     * If the button T is pressed, the variable is set on true. Also when the value of the manabar is more then one. A new element for the array (trhowableObjects)
     * get generated and pushed inside. 
     * After 1,2 seconds the setTimeout will remove the generated element from the canvas.
     * 
     * The other conditions is a simple animation which will played, when the variable is true.
     */
    useAttacksFromCharacter() {

        if (this.keyboard.T_KEYBOARD && this.manabar.mana > 0) {
            let fireball = new ThrowableObjects(this.character.x + 50, this.character.y + 20);
            this.throwableObjects.push(fireball);
            this.character.fireAttack();
            this.manabar.updateManapointsMinus();
            this.removeFireballFromCanvas = new Date().getTime()

            setTimeout(() => {
                if (this.removeFireballFromCanvas <= new Date().getTime()) {
                    // Führe den Code aus, nachdem 1,2 Sekunden vergangen sind
                    this.throwableObjects.splice(fireball, 1);
                }
            }, 1200);
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
                this.bossHit(boss);
                this.character.jump();

            } if (this.character.isCollidingWhileSwordAttack(boss) && this.keyboard.F_KEYBOARD) {
                this.bossHit(boss);
            }
            this.throwableObjects.forEach((fireball) => {
                if (fireball.isColliding(boss)) {
                    this.bossHit(boss);
                    this.throwableObjects.splice(fireball, 1);
                }
            });
        });
    }

    bossHit(boss) {
        this.damageTheEndboss(boss);
        this.endbossHP.updateHealthpoints();
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
        movabelThing.drawFrame(this.ctx);

        if (movabelThing.turnArround) { // Falls ein Bild verändert wurde, deshalb vorhin save
            movabelThing.x = movabelThing.x * -1;
            this.ctx.restore();   // Ursprung wieder herstellen, Bilder wieder normal anzeigen

        }
    }


}
