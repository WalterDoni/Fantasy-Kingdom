class Character extends MovableObjects {
    x = 40;
    y = 370;
    speed = 5;

    walking_sound = new Audio('audio/Walking.mp3');
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
            

            // Charakter bewegt sich nach rechts oder links
            if (this.conditionsToWalkRight()) {
                this.moveRight();
                this.handleTheIdleTimer();
                this.walking_sound.volume = 0.2;
                this.walking_sound.play()
            }

            if (this.conditionsToWalkLeft()) {
                this.moveLeft();
                this.handleTheIdleTimer();
                this.walking_sound.volume = 0.2;
                this.walking_sound.play();
                
            }
            // Charakter springt, setzt speedY auf 20 um dann nach und nach abzufallen (acceleration)
            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
                this.handleTheIdleTimer();
               
            }

            if (!this.world.keyboard.LEFT && !this.world.keyboard.RIGHT) {
                this.timeWithoutDoingSomething += 20;

            }
            this.world.camera_x = -this.x + 100; // +100 versetzt die Kamera, somit klebt der Charakter nicht so sehr am linken Rand

        }, 1000 / 60);

        setStoppableInterval(() => {
            if (this.timeWithoutDoingSomething >= 3500) {
                this.playAnimation(this.IDLE_IMAGE);
            }
        }, 150);


        setStoppableInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.DEAD_IMAGES);
            } else if (this.isHurt()) {
                this.playAnimation(this.HURT_IMAGES);
            }
            else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.WALKING_IMAGES)
            }
        }, 120);

    }


    fireAttack() {
        this.handleTheIdleTimer();
        this.currentImage = 0;

        if (this.timerToStopAnimations <= 100 && !this.attackInterval) {
            this.attackInterval = setInterval(() => {
                this.playAnimation(this.IMAGE_ATTACK);
                this.timerToStopAnimations += 28;

                if (this.timerToStopAnimations > 100) {
                    clearInterval(this.attackInterval);
                    this.attackInterval = null;
                    this.timerToStopAnimations = 0;
                    this.currentImage = 0;
                    this.loadImage('img/1.PlayableChars/Knight/knight.png');
                    

                }
            }, 140);
        }
    }


    swordAttack() {
        this.handleTheIdleTimer();
        this.currentImage = 0;

        if (this.timerToStopAnimations <= 100 && !this.attackInterval) {
            this.attackInterval = setInterval(() => {
                this.playAnimation(this.IMAGE_ATTACK);
                this.timerToStopAnimations += 28;

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

    


    IdleWhileDoNothing() {
        this.timeWithoutDoingSomething += 1
        if (this.timeWithoutDoingSomething >= 200) {
            this.playAnimation(this.IDLE_IMAGE);
        }
    }

    handleTheIdleTimer() {
        return this.timeWithoutDoingSomething = 0;
    }


    conditionsToWalkRight() {
        return this.world.keyboard.RIGHT && this.x < 5000 || this.x >= 910 && this.x <= 1200 && this.y > 360 || this.x >= 2740 && this.x <= 3370 && this.y > 100 || this.x >= 3380 && this.x <= 3720 && this.y > 200 || this.x >= 3730 && this.x <= 3900 && this.y > 300
    }
    conditionsToWalkLeft() {
        return this.world.keyboard.LEFT && this.x > -30 || this.x >= 910 && this.x <= 1200 && this.y > 360 || this.x >= 2740 && this.x <= 3370 && this.y > 100 || this.x >= 3380 && this.x <= 3720 && this.y > 200 || this.x >= 3730 && this.x <= 3900 && this.y > 300
    }
}