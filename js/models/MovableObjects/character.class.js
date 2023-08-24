class Character extends MovableObjects {
    x = 4100;
    y = 370;
    speed = 5;

    walking_sound = new Audio('audio/walking.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    jump_sound = new Audio('audio/jump.mp3');
    normalAttack_sound = new Audio('audio/swordAttack.mp3');
    specialAttack_sound = new Audio('audio/fireball.mp3');

    timeWithoutDoingSomething = 0;

    animation = false;
    attackInterval = null;


    WALKING_IMAGES = [
        'img/1.PlayableChars/Knight/Walk/walk1.png',
        'img/1.PlayableChars/Knight/Walk/walk2.png',
        'img/1.PlayableChars/Knight/Walk/walk3.png',
        'img/1.PlayableChars/Knight/Walk/walk4.png',
        'img/1.PlayableChars/Knight/Walk/walk5.png',
        'img/1.PlayableChars/Knight/Walk/walk6.png',
    ]


    IMAGES_JUMPING = [
        'img/1.PlayableChars/Knight/Jump_high/jump1.png',
        'img/1.PlayableChars/Knight/Jump_high/jump2.png',
        'img/1.PlayableChars/Knight/Jump_high/jump3.png',
        'img/1.PlayableChars/Knight/Jump_high/jump4.png',
        'img/1.PlayableChars/Knight/Jump_high/jump5.png',
        'img/1.PlayableChars/Knight/Jump_high/jump6.png',
        'img/1.PlayableChars/Knight/Jump_high/jump7.png',
        'img/1.PlayableChars/Knight/Walk/walk1.png',


    ]

    HURT_IMAGES = [
        'img/1.PlayableChars/Knight/Hurt/hurt1.png',
        'img/1.PlayableChars/Knight/Hurt/hurt2.png',
        'img/1.PlayableChars/Knight/Hurt/hurt3.png',
        'img/1.PlayableChars/Knight/Hurt/hurt4.png',
    ]

    DEAD_IMAGES = [
        'img/1.PlayableChars/Knight/Death/death1.png',
        'img/1.PlayableChars/Knight/Death/death2.png',
        'img/1.PlayableChars/Knight/Death/death3.png',
        'img/1.PlayableChars/Knight/Death/death4.png',
        'img/1.PlayableChars/Knight/Death/death5.png',
        'img/1.PlayableChars/Knight/Death/death6.png',
        'img/1.PlayableChars/Knight/Death/death7.png',
        'img/1.PlayableChars/Knight/Death/death8.png',
        'img/1.PlayableChars/Knight/Death/death9.png',
        'img/1.PlayableChars/Knight/Death/death10.png'


    ]

    IMAGE_ATTACK = [
        'img/1.PlayableChars/Knight/Attack/attack1.png',
        'img/1.PlayableChars/Knight/Attack/attack2.png',
        'img/1.PlayableChars/Knight/Attack/attack3.png',
        'img/1.PlayableChars/Knight/Attack/attack4.png',
    ]



    IDLE_IMAGE = [
        'img/1.PlayableChars/Knight/Idle/idle1.png',
        'img/1.PlayableChars/Knight/Idle/idle2.png',
        'img/1.PlayableChars/Knight/Idle/idle3.png',
        'img/1.PlayableChars/Knight/Idle/idle4.png',
        'img/1.PlayableChars/Knight/Idle/idle5.png',
        'img/1.PlayableChars/Knight/Idle/idle6.png',
        'img/1.PlayableChars/Knight/Idle/idle7.png',
        'img/1.PlayableChars/Knight/Idle/idle8.png',
        'img/1.PlayableChars/Knight/Idle/idle9.png',
        'img/1.PlayableChars/Knight/Idle/idle10.png',
        'img/1.PlayableChars/Knight/Idle/idle11.png',
        'img/1.PlayableChars/Knight/Idle/idle12.png',
    ]

    moreAccurateCollision = {
        top: 30,
        right: 40,
        bottom: 30,
        left: 50,
    }

    constructor() {
        super().loadImage('img/1.PlayableChars/Knight/knight.png') // ruft die übergordnete Funktion aus MovableObjets aus
        this.loadImages(this.WALKING_IMAGES);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.DEAD_IMAGES);
        this.loadImages(this.HURT_IMAGES);
        this.loadImages(this.IMAGE_ATTACK);
        this.loadImages(this.IDLE_IMAGE);
        this.applyGravity();
        this.animate();


    }



    animate() {

        setStoppableInterval(() => {
            this.moveleftOrRight();
            this.characterJump();
            this.idle();
            this.world.camera_x = -this.x + 100; // +100 versetzt die Kamera, somit klebt der Charakter nicht so sehr am linken Rand
        }, 1000 / 60);

        setStoppableInterval(() => {
            this.startTheIdleAnimation()
        }, 150);

        setStoppableInterval(() => {
            this.hurtOrDead();
            this.ifCharacterJump();
            this.playTheWalkingAnimation();
        }, 120);

    }

    /**
     *  @param {conditions1 and variable} timerToStopAnimations -> If the value is lower or 100
     * @param {conditions2} attackInterval -> Checks if it is null or undefined
     *  @param {setInterval} attackInterval -> Set the interval and give the variable a value.
     * Start to play the animation include sound
     *  @param {variable} timerToStopAnimations -> add value to the variable
     *  
     * 
     * If the @param {variable} timerToStopAnimations reched the value of 100 or more
     * Clear the Interval and reset it to NULL
     * Reset the @param {variable} timerToStopAnimations to 0
     */
    fireAttack() {

        if (this.timerToStopAnimations <= 100 && !this.attackInterval) {
            this.attackInterval = setInterval(() => {
                this.playAnimation(this.IMAGE_ATTACK);
                this.specialAttack_sound.volume = 0.1;
                this.specialAttack_sound.play();
                this.timerToStopAnimations += 28;
                this.handleTheIdleTimer();

                if (this.timerToStopAnimations > 100) {
                    clearInterval(this.attackInterval);
                    this.attackInterval = null;
                    this.timerToStopAnimations = 0;
                    this.loadImage('img/1.PlayableChars/Knight/knight.png');
                }
            }, 140);
        }
    }

    /**
     * Same as the function above  
     */
    swordAttack() {
        if (this.timerToStopAnimations <= 100 && !this.attackInterval) {
            this.attackInterval = setInterval(() => {
                this.playAnimation(this.IMAGE_ATTACK);
                this.normalAttack_sound.play();
                this.timerToStopAnimations += 28;
                this.handleTheIdleTimer();

                if (this.timerToStopAnimations > 100) {
                    clearInterval(this.attackInterval);
                    this.attackInterval = null;
                    this.timerToStopAnimations = 0;
                    this.currentImage = 0;
                    this.loadImage('img/1.PlayableChars/Knight/knight.png')
                }
            }, 140);
        }
    }

    /** 
     * Function to mute the Character
    */
    muteCharacterSounds() {

        this.walking_sound.muted = true;
        this.hurt_sound.muted = true;
        this.jump_sound.muted = true;
        this.normalAttack_sound.muted = true;
        this.specialAttack_sound.muted = true;
    }

    /** 
     * Function to  unmute the Character
    */
    unmuteCharacterSounds() {

        this.walking_sound.muted = false;
        this.hurt_sound.muted = false;
        this.jump_sound.muted = false;
        this.normalAttack_sound.muted = false;
        this.specialAttack_sound.muted = false;

    }


    /** 
     * While standing still and do nothing, the counter will get up.
    */
    idle() {
        if (!this.world.keyboard.LEFT && !this.world.keyboard.RIGHT) {
            this.timeWithoutDoingSomething += 20;
        }
    }

    /** 
     * Reset the value of the timer to zero. 
    */
    handleTheIdleTimer() {
        return this.timeWithoutDoingSomething = 0;
    }

    /** 
     * Start the Animation, when a value is reached
    */
    startTheIdleAnimation() {
        if (this.timeWithoutDoingSomething >= 3500) {
            this.playAnimation(this.IDLE_IMAGE);
        }
    }
    /**
     * 
     * @returns some coordinates from the x-axes and y-axes. Depends on the positions, some movements are possible or not. For some the value from the y-axe must be changed(jumping on a higher floor), to continue to walk right or left
     */
    conditionsToWalkRight() {
        return this.world.keyboard.RIGHT && this.x < 5000 || this.x >= 910 && this.x <= 1200 && this.y > 360 || this.x >= 2740 && this.x <= 3370 && this.y > 100 || this.x >= 3380 && this.x <= 3720 && this.y > 200 || this.x >= 3730 && this.x <= 3900 && this.y > 300
    }

    conditionsToWalkLeft() {
        return this.world.keyboard.LEFT && this.x > -30 || this.x >= 910 && this.x <= 1200 && this.y > 360 || this.x >= 2740 && this.x <= 3370 && this.y > 100 || this.x >= 3380 && this.x <= 3720 && this.y > 200 || this.x >= 3730 && this.x <= 3900 && this.y > 300
    }


    /**
     * If the conditions are reached, the character will move in of the both directions. MoveRight adds a value to the x-coordinates, while moveLeft remove some. 
     * After handleTheIdleTimer, a audio file will play while walking. With the half of the volumegate.
     */
    moveleftOrRight() {
        if (this.conditionsToWalkRight()) {
            this.moveRight();
            this.handleTheIdleTimer();
            this.walking_sound.volume = 0.5;
            this.walking_sound.play();
         
        }

        if (this.conditionsToWalkLeft()) {
            this.moveLeft();
            this.handleTheIdleTimer();
            this.walking_sound.volume = 0.5;
            this.walking_sound.play();
        }
    }

    /**
     * When the Character isn't jumping and RIGHT or LEFT is true (which are the variables for walking) the Animation for walking will played.
     */
    playTheWalkingAnimation() {
        if (!this.isAboveGround() && this.world.keyboard.RIGHT || !this.isAboveGround() && this.world.keyboard.LEFT) {
            this.playAnimation(this.WALKING_IMAGES)
        }
    }

    /**
     * After the UP Button is klicked, the variable is set on true.
     * Conditions to jump -> UP is on true & the Character IS on the ground.
     * 
     */
    characterJump() {
        // Charakter springt, setzt speedY auf 20 um dann nach und nach abzufallen (acceleration)
        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.jump();
            this.handleTheIdleTimer();
        }
    }

    /**
     * Start to play a animation and sound, while jumping
     */
    ifCharacterJump() {
        if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
            this.jump_sound.volume = 0.1;
            this.jump_sound.play();
        }
    }
    
    /**
     * Depends of the Character is hurt or dead play an animation.
     */
    hurtOrDead() {
        if (this.isDead()) {
            this.playAnimation(this.DEAD_IMAGES);
        } else if (this.isHurt()) {
            this.playAnimation(this.HURT_IMAGES);
            this.hurt_sound.play();
        }
    }
}

