class Character extends MovableObjects {
    x = 40;
    y = 370;
    speed = 5;
    world;
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

    EXTRA_ATTACK = [
        'img/1.PlayableChars/Knight/Attack/attack1.png',
        'img/1.PlayableChars/Knight/Attack/attack2.png',
        'img/1.PlayableChars/Knight/Attack/attack3.png',
        'img/1.PlayableChars/Knight/Attack/attack4.png',
    ]

    IMAGE_ATTACK = [
        'img/1.PlayableChars/Knight/Extra_Attack/attack_extra1.png',
        'img/1.PlayableChars/Knight/Extra_Attack/attack_extra2.png',
        'img/1.PlayableChars/Knight/Extra_Attack/attack_extra3.png',
        'img/1.PlayableChars/Knight/Extra_Attack/attack_extra4.png',
        'img/1.PlayableChars/Knight/Extra_Attack/attack_extra5.png',
        'img/1.PlayableChars/Knight/Extra_Attack/attack_extra6.png',
        'img/1.PlayableChars/Knight/Extra_Attack/attack_extra7.png',
        'img/1.PlayableChars/Knight/Extra_Attack/attack_extra8.png',
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


    constructor() {
        super().loadImage('img/1.PlayableChars/Knight/knight.png') // ruft die übergordnete Funktion aus MovableObjets aus
        this.loadImages(this.WALKING_IMAGES);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.DEAD_IMAGES);
        this.loadImages(this.HURT_IMAGES);
        this.loadImages(this.EXTRA_ATTACK);
        this.loadImages(this.IMAGE_ATTACK);
        this.loadImages(this.IDLE_IMAGE);
        this.applyGravity();
        this.animate();

    }



    animate() {

        setInterval(() => {
            //this.walking_sound.pause()

            // Charakter bewegt sich nach rechts oder links
            if (this.world.keyboard.RIGHT && this.x < 5000) {
                this.moveRight();
                this.timeWithoutDoingSomething = 0;
                //this.walking_sound.play()
            }

            if (this.world.keyboard.LEFT && this.x > -30) {
                this.moveLeft();
                this.timeWithoutDoingSomething = 0;
                //this.walking_sound.play()
            }
            // Charakter springt, setzt speedY auf 20 um dann nach und nach abzufallen (acceleration)
            if (this.world.keyboard.SPACE && !this.isAboveGround() || this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
            }

            if (!this.world.keyboard.LEFT && !this.world.keyboard.RIGHT) {
                this.timeWithoutDoingSomething += 20;

            }
            this.world.camera_x = -this.x + 100; // +100 versetzt die Kamera, somit klebt der Charakter nicht so sehr am linken Rand

        }, 1000 / 60);

        setInterval(() => {
            if (this.timeWithoutDoingSomething >= 3500) {
                this.playAnimation(this.IDLE_IMAGE);
            }
        }, 150);


        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.DEAD_IMAGES);
            } else if (this.isHurt()) {
                this.playAnimation(this.HURT_IMAGES);
            }
            else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else

                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.WALKING_IMAGES)
                }
        }, 120);

    }

    fireAttack() {
        if (this.animation) {
            return; // Die Animation läuft bereits, daher nichts tun
        }
        this.animation = true;

        this.attackInterval = setInterval(() => {
            this.playAnimation(this.EXTRA_ATTACK);
        }, 110);

        setTimeout(() => {
            this.animation = false;
            clearInterval(this.attackInterval); // Hier wird das Intervall gestoppt
        }, 1000);
    }


    swordattack() {

        if (this.animation) {
            return; // Die Animation läuft bereits, daher nichts tun
        }
        this.animation = true;

        this.attackInterval = setInterval(() => {
            this.playAnimation(this.IMAGE_ATTACK);
        }, 110);

        setTimeout(() => {
            this.animation = false;
            clearInterval(this.attackInterval); // Hier wird das Intervall gestoppt
        }, 950);
    }

    IdleWhileDoNothing() {
        this.timeWithoutDoingSomething += 1
        if (this.timeWithoutDoingSomething >= 200) {
            this.playAnimation(this.IDLE_IMAGE);

        }
    }
}