class Levels {
    backgrounds;
    grounds;
    clouds;
    birds;
    enemies;
    walkingEnemies;
    collectables;
    manapotions;

 
    
    


    constructor(backgrounds, grounds, clouds, birds, enemies, walkingEnemies, endboss, collectables,manapotions) {
        this.backgrounds = backgrounds;
        this.grounds = grounds;
        this.clouds = clouds;
        this.birds = birds;
        this.enemies = enemies;
        this.walkingEnemies = walkingEnemies;
        this.endboss = endboss;
        this.collectables = collectables;
        this.manapotions = manapotions;
     


        this.createFloorLevel1Part1();
        this.createFloorLevel1Part2();
        this.createFloorTowerLevel1Part1();
        this.createFloorTowerLevel1Part2();
        this.createFloorLevel1Part3();
        this.createLeftWall();
        this.createRightWall();

    }


  //Functions to draw the elements on the canvas

    createFloorLevel1Part1() {
        let startX = -50;

        for (let i = 0; i < numberOfMiddleGrounds; i++) {
            let x = startX + i * 50; // Calculate the x-coordinate based on the index i
            let ground = new MiddleGround(x, 530);
            this.grounds.push(ground);
        }

    }

    createFloorLevel1Part2() {
        let startX = 1280; 
        let numberOfMiddleGrounds = 30;

        for (let i = 0; i < numberOfMiddleGrounds; i++) {
            let x = startX + i * 50;
            let ground = new MiddleGround(x, 530);
            this.grounds.push(ground);
        }

    }


    createFloorLevel1Part3() {
        let startX = 3990; 
        let numberOfMiddleGrounds = 23; 

        for (let i = 0; i < numberOfMiddleGrounds; i++) {
            let x = startX + i * 50; 
            let ground = new MiddleGround(x, 530);
            this.grounds.push(ground);
        }

    }

    createFloorTowerLevel1Part1() {
        let startX = 2870;
        let Blocks = 10;

        for (let i = 0; i < Blocks; i++) {
            let x = startX + i * 50;
            let block = new MiddleGround(x, 230)
            let block1 = new MiddleObjectBuildUp(x, 530);
            let block2 = new MiddleObjectBuildUp(x, 480);
            let block3 = new MiddleObjectBuildUp(x, 430);
            let block4 = new MiddleObjectBuildUp(x, 380);
            let block5 = new MiddleObjectBuildUp(x, 330);
            let block6 = new MiddleObjectBuildUp(x, 280);
            this.grounds.push(block, block1, block2, block3, block4, block5, block6);
        }
    }

    createFloorTowerLevel1Part2() {
        let startX = 3460;
        let Blocks = 5;

        for (let i = 0; i < Blocks; i++) {
            let x = startX + i * 50;
            let block = new MiddleGround(x, 330)
            let block1 = new MiddleObjectBuildUp(x, 530);
            let block2 = new MiddleObjectBuildUp(x, 480);
            let block3 = new MiddleObjectBuildUp(x, 430);
            let block4 = new MiddleObjectBuildUp(x, 380);

            this.grounds.push(block, block1, block2, block3, block4);
        }
    }

    createLeftWall() {
        let startY = 530
        let Blocks = 9;

        for (let i = 0; i < Blocks; i++) {
            let y = startY - i * 50;
            let block = new RightSideBuildUpGround(-140, y)

            this.grounds.push(block);
        }
    }

    createRightWall() {
        let startY = 530;
        let Blocks = 12;

        for (let i = 0; i < Blocks; i++) {
            let y = startY - i * 50;

            let block = new LeftSideBuildUpGround(5180, y);
            let block1 = new MiddleObjectBuildUp(5230, y);
            let block2 = new MiddleObjectBuildUp(5280, y);
            let block3 = new MiddleObjectBuildUp(5330, y);
            let block4 = new MiddleObjectBuildUp(5380, y);
            let block5 = new MiddleObjectBuildUp(5430, y);
            let block6 = new MiddleObjectBuildUp(5480, y);
            let block7 = new MiddleObjectBuildUp(5530, y);
            let block8 = new MiddleObjectBuildUp(5580, y);
            let block9 = new MiddleObjectBuildUp(5630, y);
            let block10 = new MiddleObjectBuildUp(5680, y);
            let block11 = new MiddleObjectBuildUp(5730, y);
            let block12 = new MiddleObjectBuildUp(5780, y);
            let block13 = new MiddleObjectBuildUp(5830, y);
            let block14 = new MiddleObjectBuildUp(5880, y);
            let block15 = new MiddleObjectBuildUp(5930, y);


            this.grounds.push(block, block1, block2, block3, block4, block5, block6, block7, block8, block9, block10, block11, block12, block13, block14, block15);
        }
    }
}