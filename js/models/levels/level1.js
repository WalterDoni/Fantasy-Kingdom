const level1 = new Levels([
    new BackgroundObjects('img/4.Maps/forest/Background/Bright/clouds_back_layer2.png', -1024, 10),
    new BackgroundObjects('img/4.Maps/forest/Background/Bright/clouds_back_layer1.png', -1024, 50),
    new BackgroundObjects('img/4.Maps/forest/Background/Bright/mountains.png', -1024, 110),
    new BackgroundObjects('img/4.Maps/forest/Background/Bright/trees.png', -1024, 140),

    new BackgroundObjects('img/4.Maps/forest/Background/Bright/clouds_back_layer2.png', 0, 10),
    new BackgroundObjects('img/4.Maps/forest/Background/Bright/clouds_back_layer1.png', 0, 50),
    new BackgroundObjects('img/4.Maps/forest/Background/Bright/mountains.png', 0, 110),
    new BackgroundObjects('img/4.Maps/forest/Background/Bright/trees.png', 0, 140),

    new BackgroundObjects('img/4.Maps/forest/Background/Bright/clouds_back_layer2.png', 1024, 10),
    new BackgroundObjects('img/4.Maps/forest/Background/Bright/clouds_back_layer1.png', 1024, 50),
    new BackgroundObjects('img/4.Maps/forest/Background/Bright/mountains.png', 1024, 110),
    new BackgroundObjects('img/4.Maps/forest/Background/Bright/trees.png', 1024, 140),

    new BackgroundObjects('img/4.Maps/forest/Background/Bright/clouds_back_layer2.png', 1024*2, 10),
    new BackgroundObjects('img/4.Maps/forest/Background/Bright/clouds_back_layer1.png', 1024*2, 50),
    new BackgroundObjects('img/4.Maps/forest/Background/Bright/mountains.png', 1024*2, 110),
    new BackgroundObjects('img/4.Maps/forest/Background/Bright/trees.png', 1024*2, 140),

    new BackgroundObjects('img/4.Maps/forest/Background/Bright/clouds_back_layer2.png', 1024*3, 10),
    new BackgroundObjects('img/4.Maps/forest/Background/Bright/clouds_back_layer1.png', 1024*3, 50),
    new BackgroundObjects('img/4.Maps/forest/Background/Bright/mountains.png', 1024*3, 110),
    new BackgroundObjects('img/4.Maps/forest/Background/Bright/trees.png', 1024*3, 140),

    new BackgroundObjects('img/4.Maps/forest/Background/Bright/clouds_back_layer2.png', 1024*4, 10),
    new BackgroundObjects('img/4.Maps/forest/Background/Bright/clouds_back_layer1.png', 1024*4, 50),
    new BackgroundObjects('img/4.Maps/forest/Background/Bright/mountains.png', 1024*4, 110),
    new BackgroundObjects('img/4.Maps/forest/Background/Bright/trees.png', 1024*4, 140),

    
    new BackgroundObjects('img/4.Maps/forest/Background/Bright/clouds_back_layer2.png', 1024*5, 10),
    new BackgroundObjects('img/4.Maps/forest/Background/Bright/clouds_back_layer1.png', 1024*5, 50),
    new BackgroundObjects('img/4.Maps/forest/Background/Bright/mountains.png', 1024*5, 110),
    new BackgroundObjects('img/4.Maps/forest/Background/Bright/trees.png', 1024*5, 140),
],
    [
        new RightSideTopBuildUp(-140, 80),
        new LeftSideGround(-100, 530),
        new RightSideGround(950, 530),
        new LeftSideBuildUpGround(990,530),
        new LeftSideBuildUpGround(990,480),
        new LeftSideTopBuildUp(990,430),
        new MiddleGround(1040,430),
        new MiddleGround(1090,430),
        new MiddleGround(1140,430),
        
        new RightSideTopBuildUp(1190, 430),
        new MiddleObjectBuildUp(1040, 530),
        new MiddleObjectBuildUp(1040, 480),
        new MiddleObjectBuildUp(1090, 530),
        new MiddleObjectBuildUp(1090, 480),
        new MiddleObjectBuildUp(1140, 530),
        new MiddleObjectBuildUp(1140, 480),
        new RightSideBuildUpGround(1190, 530),
        new RightSideBuildUpGround(1190, 480),
        new LeftSideGround(1230, 530),
        new RightSideGround(2780, 530),    
        new LeftSideBuildUpGround(2820,530),
        new LeftSideBuildUpGround(2820,480),
        new LeftSideBuildUpGround(2820,430),
        new LeftSideBuildUpGround(2820,380),
        new LeftSideBuildUpGround(2820,330),
        new LeftSideBuildUpGround(2820,280),
        new LeftSideTopBuildUp(2820,230),
        new MiddleObjectBuildUp(2870, 530),
        new SkyBlockGroundRight(2630, 400),
        new SkyLeftBuildUpWithoutEnd(2580,400),
        new SkyMiddleBuildUpWithoutEnd(2580,350),
        new RightSideTopBuildUp(2580,300),
        new SkyMiddleFloorGround(2530,300),
        new SkyMiddleFloorGround(2480,300),
        new SkyMiddleFloorGround(2430,300),
        new SkyMiddleFloorGround(2380,300),
        new SkyMiddleFloorGround(2330,300),
        new SkyLeftBuildUpWithoutEnd(2280,300),
        new SkyMiddleBuildUpWithoutEnd(2280,250),
        new SkyMiddleBuildUpWithoutEnd(2280,200),
        new SkyMiddleBuildUpWithoutEnd(2280,150),
        new SkyMiddleBuildUpWithoutEnd(2280,100),
        new SkyMiddleBuildUpWithoutEnd(2280,50),
        new SkyMiddleBuildUpWithoutEnd(2280,0),
        new FlyingGroundLeft( 2720, 300),
        new FlyingGroundRight(2770, 300),

        new RightSideBuildUpGround(3370,530),
        new RightSideBuildUpGround(3370,480),
        new RightSideBuildUpGround(3370,430),
        new RightSideBuildUpGround(3370,380),
        new RightSideBuildUpGround(3370,330),
        new RightSideBuildUpGround(3370,280),
        new RightSideTopBuildUp(3370, 230),

        new LeftSideBuildUpGround(3410,530),
        new LeftSideBuildUpGround(3410,480), 
        new LeftSideBuildUpGround(3410,430),
        new LeftSideBuildUpGround(3410,380),
        new LeftSideTopBuildUp(3410,330),
        new RightSideTopBuildUp(3710, 330),
        new RightSideBuildUpGround(3710,530),
        new RightSideBuildUpGround(3710,480), 
        new RightSideBuildUpGround(3710,430),
        new RightSideBuildUpGround(3710,380),

        new LeftSideBuildUpGround(3750,530),
        new LeftSideBuildUpGround(3750,480), 
        new LeftSideTopBuildUp(3750,430),
        new MiddleObjectBuildUp(3800, 530),
        new MiddleObjectBuildUp(3800,480),
        new MiddleObjectBuildUp(3850,530),
        new MiddleObjectBuildUp(3850,480),
        new MiddleGround(3800,430),
        new MiddleGround(3850, 430),
        new RightSideBuildUpGround(3900,530), 
        new RightSideBuildUpGround(3900,480), 
        new RightSideTopBuildUp(3900,430),
       
        new LeftSideGround(3940, 530),
        new RightSideGround(5140,530),


],
    [
        new Cloud(100, 50),
        new Cloud(700, 60),
        new Cloud(1400, 70),
        new Cloud(2100, 40),
        new Cloud(2600, 50),
        new Cloud(3500, 60),
        new Cloud(4200, 70),
        new Cloud(4800, 40),
        new Cloud(5600, 50),
      
],
    [//// X , Y - Achse /////
        new Bird(150, 80),
        new Bird(300, 10),
        new Bird(600, 25),
        new Bird(800, 45),
        new Bird(150*3, 80),
        new Bird(300*3, 10),
        new Bird(600*3, 25),
        new Bird(800*3, 45),
        new Bird(150*5, 80),
        new Bird(300*5, 10),
        new Bird(600*5, 25),
        new Bird(800*5, 45),
        new Bird(150*7, 80),
        new Bird(300*7, 10),
        new Bird(600*7, 25),
        new Bird(800*7, 45),
],
   [
    new Goblin(500, 400),
    new Goblin(600, 400),
    new Goblin(700, 400),
    new Dwarf (850, 395),
    new Dwarf (950, 395),
    new Endboss(1100, 220),
],

[
    new Coin(100,50),
    new ManaCrystal(150,50)


],

)

