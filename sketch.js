var backImage, backgr;
var player, player_running;
var ground, ground_img;

var END = 0;
var PLAY = 1;
var gameState = PLAY;
var FoodGroup, obstaclesGroup;
var score, bananaImage, obstacle_img, gameOverImg;

function preload() {
  backImage = loadImage("Images/jungle.jpg");
  player_running = loadAnimation("Images/Monkey_01.png", "Images/Monkey_02.png", "Images/Monkey_03.png", "Images/Monkey_04.png", "Images/Monkey_05.png", "Images/Monkey_06.png", "Images/Monkey_07.png", "Images/Monkey_08.png", "Images/Monkey_09.png", "Images/Monkey_10.png");
  bananaImage = loadImage("Images/banana.png");
  gameOverImg = loadImage("Images/gameOver.png");
  obstacle_img = loadImage("Images/stone.png")
}

function setup() {
  createCanvas(800, 400);

  backgr = createSprite(0, 0, 800, 400);
  backgr.addImage(backImage);
  backgr.scale = 1.5;
  backgr.x = backgr.width / 2;
  backgr.velocityX = -4;

  player = createSprite(100, 340, 20, 50);
  player.addAnimation("Running", player_running);
  player.scale = 0.1;

  FoodGroup = new Group();

  obstaclesGroup = new Group();

  score = 0;

  spawnObstacles();

  ground = createSprite(400, 350, 800, 10);
  ground.x = ground.width / 2;
  ground.visible = false;

}

function draw() {
  background(0);

  if (gameState === PLAY) {

    spawnFood();
    spawnObstacles();

    if (backgr.x < 100) {
      backgr.x = backgr.width / 2;
    }

    if (keyDown("space")) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;

    player.collide(ground);


    if (FoodGroup.isTouching(player)) {
      FoodGroup.destroyEach();
      score = score + 2;
      player.scale += +0.1;
    }
    if (obstaclesGroup.isTouching(player)) {
      gameState = END;
    }
  }
  else if (gameState === END) {
    background.velocityX = 0;
    player.visible = false;

    FoodGroup.destroyEach();
    obstaclesGroup.destroyEach();

    textSize(30);
    fill(255);
    text("Game Over !", 300, 220);
  }

  drawSprites();
}

function spawnFood() {
  //code for spawing food.
  if (frameCount % 80 === 0) {
    var banana = createSprite(600, 250, 40, 10);
    banana.y = random(120, 200);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;

    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  //code for spawning obstacles. 
  if (frameCount % 200 === 0) {

    obstacle = createSprite(620, 253, 50, 50);
    obstacle.addAnimation("stone", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 8);
    obstacle.scale = 0.13;
    obstacle.velocityX = -(4 + score * 1.6 / 100);
    obstacle.lifetime = 220;
    obstaclesGroup.add(obstacle);
  }
}
