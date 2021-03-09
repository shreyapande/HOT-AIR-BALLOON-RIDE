var database;
var balloon;
var bg,loonMovement;
var position;

function preload(){
  bg=loadImage("Hot Air Ballon-01.png");
  loonMovement=loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png");
}

function setup() {
  createCanvas(500,500);
  database=firebase.database();
  balloon=createSprite(250, 250, 50, 50);
  balloon.addAnimation("moving",loonMovement);
  balloon.scale=0.4;

  var balloonPosition=database.ref('balloon/position');
  balloonPosition.on("value",readHeight,showError);
}

function draw() {
  background(bg);
  
  if(keyDown(UP_ARROW)){
   // balloon.y=balloon.y-10;
   writeHeight(0,-10);
   balloon.scale=balloon.scale-0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    //balloon.y=balloon.y+10;
    writeHeight(0,10);
    balloon.scale=balloon.scale+0.01;
  }
  else if(keyDown(RIGHT_ARROW)){
    //balloon.x=balloon.x+10;
    writeHeight(10,0);
  }
  else if(keyDown(LEFT_ARROW)){
   // balloon.x=balloon.x-10;
   writeHeight(-10,0);
  }
  
  drawSprites();

  textSize(20);
  stroke("black");
  text("Use arrow keys to move the balloon",10,30);
}

function readHeight(data){
  position=data.val();
  balloon.x=position.x;
  balloon.y=position.y;
}

function showError(){
  console.log("there is an error in reading position from database");
}

function writeHeight(x,y){
  database.ref('balloon/position').set({
    'x':balloon.x+x,
    'y':balloon.y+y
  })
}