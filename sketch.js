var trex,ground,invisibleGround,score,highscore,bot,endbot,obstaclegroup,cloudgroup,flag,gameover,restart;
var trexrun,trexcollide,o1,o2,o3,o4,o5,o6,cloudimg,groundimg,gameoverimg,restartimg
function preload (){
  trexrun=loadAnimation("trex1.png","trex4.png","trex3.png")
  trexcollide=loadAnimation("trex_collided.png")
  o1=loadImage("obstacle1.png")
   o2=loadImage("obstacle2.png")
   o3=loadImage("obstacle3.png")
   o4=loadImage("obstacle4.png")
   o5=loadImage("obstacle5.png")
   o6=loadImage("obstacle6.png")
  restartimg=loadImage("restart.png")
  gameoverimg=loadImage("gameOver.png")
   cloudimg=loadImage("cloud.png")
   groundimg=loadImage("ground2.png")
}
function setup(){
createCanvas(600,300)
   flag=0
 score = 0
 bot = createSprite(570,20,20,20)
bot.shapeColor="green"
 highscore= 0
 trex = createSprite(50,280,20,20);
  trex.addAnimation("run",trexrun)
  trex.addAnimation("trex_collided",trexcollide)
endbot = createSprite(540,20,20,20)
endbot.shapeColor="red"
//trex.debug=true;
trex.setCollider("circle",0,0,45)
 obstaclegroup = new Group()
 cloudgroup = new Group()
//scale and p osition the trex
trex.scale = 0.5;
trex.x = 50;
 gamestate = "play"
//create a ground sprite
 ground = createSprite(300,280,600,20);
ground.addImage("ground2",groundimg); 
ground.x = ground.width /2;

 invisibleGround = createSprite(300,285,600,5);
invisibleGround.visible = false;



 gameover=createSprite(300,100,50,30)
gameover.addImage("gameOver",gameoverimg)
gameover.visible=false
  
 restart=createSprite(300,150,20,50)
restart.addImage("restart",restartimg)
restart.visible=false

}
function draw(){
  //set background to white
  background("white");
 
 
 
 
 if(score>500){
   background(20)
 }
 
 textSize(22)
 fill("red")
 text("scoreboard:" +score,20,20)
 text("highscore:"  +highscore,20,50)
 
 
 if(gamestate==='play'){
   ground.velocityX = -(6+score*3/100);
   if(score % 100===0 && score >0){
    // playSound("jump.mp3")
   }
     if (ground.x < 0){
    ground.x = ground.width/2;
  }              

  score=score+Math.round(getFrameRate()/60 )
  //jump when the space key is pressed
  if(keyDown("space") && trex.y >= 260){
    trex.velocityY = -10 ;
    //playSound("jump.mp3")
  }
   //spawn the clouds
  spawnClouds();
  
  trex.velocityY = trex.velocityY + 0.8;
  
  if(mousePressedOver(endbot)){
    flag=0
    trex.setCollider("circle",0,0,45)
  }
  spawnobstacle()
  if(mousePressedOver(bot)){
    flag=1
    trex.setCollider("circle",100,0,45)
  }
  //trex.debug=true
  if(flag===1){
  if(trex.isTouching(obstaclegroup)){
    
 // playSound("jump.mp3")
    trex.velocityY=-10}
  }
  if(trex.isTouching(obstaclegroup)&&flag===0){
    gamestate="end"
   // playSound("die.mp3");
  }
  
 }
 
 
 else if(gamestate==='end'){
 
  gameover.visible=true
  restart.visible=true
  ground.velocityX=0
  trex.changeAnimation("trex_collided",trexcollide)
  
  obstaclegroup.setVelocityXEach(0)
  cloudgroup.setVelocityXEach(0)
  obstaclegroup.setLifetimeEach(-1)
  cloudgroup.setLifetimeEach(-1)
 }
  
  if(mousePressedOver(restart)){
   resetgame();
  }
  
console.log(trex.y)
  
  
  
  //add gravity
  
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  drawSprites()

}
function spawnClouds() {

  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
   
    cloud.y = random(80,220);
  
  cloud.addImage("cloud",cloudimg) 
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    

    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
     cloudgroup.add(cloud)
  }
 
}

function spawnobstacle() {
  

 if(World.frameCount % 60===0){
   var obstacle= createSprite(600,262.5,10,40)
     obstacle.velocityX = -(6+score*3/100);
 
    var r= Math.round(random(1,6))
    //alternative sollution for multiple ifs 
    switch(r){
      case 1:obstacle.addImage("o1",o1);break;
      case 2:obstacle.addImage("o2",o2);break;
      case 3:obstacle.addImage("o3",o3);break;
      case 4:obstacle.addImage("o4",o4);break;
      case 5:obstacle.addImage("o5",o5);break;
      case 6:obstacle.addImage("o6",o6);break;
      default:break;     
    }
    // if(r===1){
    //   obstacle.addImage("o1",o1)
    // }
    //   if(r===2){
    //   obstacle.addImage("o2",o2)
    // }
    //   if(r===3){
    //   obstacle.addImage("o3",o3)
    // }
    //   if(r===4){
    //   obstacle.addImage("o4",o4)
    // }
    //   if(r===5){
    //   obstacle.addImage("o5",o5)
    // }
    //   if(r===6){
    //   obstacle.addImage("o6",o6)
    // }
    obstacle.scale=0.5
    obstaclegroup.add(obstacle)
 }
}   
function resetgame(){
gamestate="play"
restart.visible=false
gameover.visible=false
cloudgroup.destroyEach()
obstaclegroup.destroyEach()
trex.addAnimation("run",trexrun)
if(score>highscore){
  highscore=score
}
score=0
}
