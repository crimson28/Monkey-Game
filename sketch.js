
var monkey , monkey_running
var group;
var banana ,bananaImage
var obstacle, obstacleImage
var fruitGroup, obstacleGroup
var score=0


var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,300);
  
  
  
  //create French Fry Ave.
  ground= createSprite(300,270,900,10);
  
  //create Potato the Monkey (monkey)
  monkey= createSprite(50,240,30,30);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale= 0.09;

  
  //moving ground
  
  ground.velocityX= -4;
  
  
  fruitGroup= new Group();
obstacleGroup= new Group();

  
  
  

  
}


function draw() {
  
  //sky blue
  background(rgb(135,206,235));
  
  //text
  text("Bananas collected: " + score, 440,20);

  if (gameState=== PLAY){
  //make Potato jump!
    if(keyDown("space")&& monkey.y >= 230) {
    monkey.velocityY = -15;
  }
  
  //introduce gravity to french fry ave.
  monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(ground);
  
  
  //infinite ave
  if (ground.x <0){
    ground.x= ground.width/2;
}
  
  //create fruit & obstacles
  spawnFruit();
  
  spawnObstacle();
  
  if (monkey.isTouching(fruitGroup)){
      score= score + 1;
      fruitGroup[0].destroy();
}
  
  if (monkey.isTouching(obstacleGroup)){
    
     gameState = END;
}
    if (score > 10){
      text("You Won!", 200,200);
      ground.velocityX = 0;
     monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    fruitGroup.setVelocityXEach(0);
    
      
      
    }

  }  else if (gameState === END ) {
 text("GAME OVER!", 200,200);
 
    
    //set velocity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    fruitGroup.setVelocityXEach(0);
    
  
  
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    fruitGroup.setLifetimeEach(-1);
    
   
    
  }
  

  
  drawSprites();

  
}

function spawnObstacle(){
  if (frameCount % 100 ===0){
  obstacle= createSprite(200,250,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.scale= 0.1;
  obstacle.x = Math.round(random(200,600));
    obstacle.velocityX= -4;
     banana.lifetime = 200;
    
    obstacleGroup.add(obstacle);
    
    
  }
  

 
}

function spawnFruit(){
  
  if (frameCount % 100 === 0) {
    banana = createSprite(600,150,40,10);
    banana.addImage(bananaImage)
    banana.y = Math.round(random(150,200));
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    
    //assigning lifetime to the variable
    banana.lifetime = 200;
    
    //add fruits to group
    
    fruitGroup.add(banana);
    
  }
    
  
}






