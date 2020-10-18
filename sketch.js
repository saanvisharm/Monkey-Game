var monkey , monkey_running, monkey_stop;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score, ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  monkey_stop=loadAnimation("sprite_0.png")
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
createCanvas(400,355);
monkey=createSprite(40,315,20,20);
monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("stop",monkey_stop);
monkey.scale=0.1;
  
ground = createSprite(400,350,900,10);
ground.velocityX=-4;
ground.x=ground.width/2;
ground.shapeColor="green";
  
   score = 0;
  
  obstacleGroup= createGroup();
  foodGroup=createGroup();
}


function draw() {
background("white");
  
  if(gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -10;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    
    spawnObstacles();
  spawnFruits();
    
    if(monkey.isTouching(obstacleGroup)){
  gameState = END;  
    }
  }
   else if (gameState === END) {
 
  monkey.changeAnimation("stop", monkey_stop);
        
  ground.velocityX = 0;
  monkey.velocityY = 0;
     
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0); 
     
     fill("black");
     stroke("black");
     text("Game Over!!",150,150);
   }
  
  fill("red");
   text("Survival Time: "+ score,100,30);
  
     
    if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    }
       
  monkey.collide(ground);
 
  drawSprites();
}
function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(350,328,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-6;
   
    obstacle.scale = 0.1;
   
    obstacle.lifetime = 300;
   
    obstacleGroup.add(obstacle);
 }
}
function spawnFruits() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(350,230,40,10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    
    banana.lifetime = 200;
    
    foodGroup.add(banana);
  }
}




