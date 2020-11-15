var PLAY = 1
var END = 0 
var gameState = PLAY;
var monkey, monkey_running, monkey_run;
var banana, bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup;
var ground
var score
var survivalTime

function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_run = loadAnimation("sprite_0.png");
}

function setup() {
  createCanvas(450, 350)
  monkey = createSprite(50, 300, 10, 10)
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("run", monkey_run)
  monkey.scale = 0.18  

  ground = createSprite(10, 330, 600, 10)
  ground.velocityX = -4
  ground.x = ground.width / 2

  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  monkey.setCollider("circle",0,0,300);
  //monkey.debug = true
  edges =  createEdgeSprites();
  
  score=0
  survivalTime=0
}

function draw() {
  background("lightblue");
  fill("white")
  stroke("white")
  textSize(20)
  text("SURVIVAL TIME:" + survivalTime, 10, 30)
  fill("white")
  stroke("white")
  textSize(20)
  text("SCORE:" + score, 340, 30)
  if (ground.x < 300) {
    ground.x = 300
  }

  if (gameState === PLAY) {
    survivalTime = survivalTime + Math.round(getFrameRate()/60);
    if (keyDown("space") && monkey.y >=110) {
      monkey.velocityY = -10
    }
     monkey.velocityY = monkey.velocityY + 0.8  

  if (frameCount % 125 === 0) {
      var rand = Math.round(random(40, 200));
      banana = createSprite(450, rand, 10, 10)
      banana.velocityX = -6
      banana.scale = 0.1
      banana.addImage(bananaImage)
      banana.lifetime = 300
      bananaGroup.add(banana)
    }
    if (monkey.isTouching(bananaGroup)) {
      score = score + 1
      bananaGroup.destroyEach();
    }
    if (frameCount % 150 === 0) {
      obstacle = createSprite(470, 280, 10, 10)
      obstacle.velocityX = -6
      obstacle.scale = 0.25
      obstacle.collide(ground);
      obstacle.addImage(obstacleImage)
      obstacle.lifetime = 400
      obstacleGroup.add(obstacle)
    }
    if (monkey.isTouching(obstacleGroup)) {
      monkey.changeAnimation("run", monkey_run);
      gameState = END
    }
  }
  if (gameState === END) {
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityEach(0, 0);
    bananaGroup.setVelocityEach(0, 0);
    ground.setVelocity(0, 0);
    fill(0)
  stroke("white")
    textSize(45)
    text("Game Over", 100, 100)
    fill(0)
  stroke("white")
  textSize(35)
    text("PRESS 'R' to restart", 60, 170)
    if (keyDown("r")) {
      Reset();
    }
  }
    monkey.collide(ground)
    monkey.collide(edges[3])
  drawSprites();
}
function Reset() {
  gameState =PLAY
  monkey.changeAnimation("running",monkey_running)
  ground.velocityX=-6
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  score=0
  survivalTime=0
}