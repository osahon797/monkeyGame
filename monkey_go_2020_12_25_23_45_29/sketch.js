var PLAY = 1
var END = 0
var gameState = 1

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score
var ground
var survivalTime=0

var invisiblesky
function preload(){
  
  
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(600,600)
  
  ground=createSprite(300,550,1200,20)
  ground.velocityX=-3
  ground.x=ground.width/2;
  
  
  monkey=createSprite(80,500,30,30) 
  monkey.addAnimation("jumping",monkey_running)
  monkey.scale=0.15

  invisiblesky=createSprite(300,50,600,20)
  invisiblesky.visible = false;
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();

}


function draw() {
background("white")
  
 console.log(ground.x)
  
  if (gameState === PLAY) {

  if(keyDown("space")&& monkey.y >= 50){
    monkey.velocityY=-23
  }
    
  monkey.velocityY = monkey.velocityY + 0.8
    
    obstacles();
  food();

  }
  
  
   if (gameState === END) {
     
     survivaltime =0
     
     stroke("white");
     textSize(20);
     fill("black");
     text("game over",300,300);  
  
   
   }
  
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("survival Time:"+survivalTime,100,50 );
  
 if (ground.x < 0){
      ground.x = ground.width/2;
    }
  

      
  
  
  monkey.collide(ground);
   monkey.collide(invisiblesky);
   
  if (bananaGroup.isTouching(monkey)) {

    bananaGroup.destroyEach()
   
    survivalTime = survivalTime + 100

  } else {
    if (obstacleGroup.isTouching(monkey)) {
      
      gameState=END    
      
      bananaGroup.destroyEach()
      obstacleGroup.destroyEach()
      bananaGroup.setVelocityXEach(0)
      obstacleGroup.setVelocityXEach(0)
    }
  }
  
drawSprites();  
}

function food(){
  if (frameCount % 80 === 0) {
  banana=createSprite(600,300,30,30)
  banana.y = Math.round(random(120,200));
  banana.addImage(bananaImage)
  banana.scale=0.15
  banana.velocityX=-4
    
  banana.lifetime = 300;
    
  bananaGroup.add(banana);
  }
}

function obstacles(){
  if (frameCount % 300 === 0) {
  obstacle=createSprite(600,500,30,30)
  obstacle.addImage(obstacleImage)
  obstacle.scale=0.2
  obstacle.velocityX=-7
    
  obstacle.lifetime = 200;
    
  obstacleGroup.add(obstacle);
  }
  
  
}



