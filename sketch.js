
var gameState = 0;
var gameflag = "s"

var r1 = 1; 
var r2 = 15;

var girl;
var size = 20;
var cols;
var rows;

var food1,food2,food3,food4;
var rand1, rand2, result;
var opt1, opt2, opt3, opt4;

var score = 0;
var scenes;
var quesSign;

var bb;
var lostImg, wonImg, bgImg;

var banner;

var form;

var quote;


function preload(){
  bb = loadImage("images/Blackboard1.png");
  banner = loadImage("images/banner.png");

  girl_Img = loadImage("images/Girl.png");
  lostImg = loadImage("images/lost.png");

  bgImg = loadImage("images/BGimg.png");
  wonImg = loadImage("images/Won.png");
  
}

function setup() {
  createCanvas(displayWidth,displayHeight); 

  cols = floor(displayWidth / size);
  rows = floor(displayHeight / size);

  frameRate(5);

  girl = new Girl();
  //form = new Form();

  callFuncts();
}

function draw() {
  scale(size);
  background(0);

  if(gameState == 0)
  {
    imageMode(CENTER);
    image(bgImg,displayWidth/40,displayHeight/45,displayWidth/20,displayHeight/15);
  }
  if(gameState == 0 && gameflag == "s"){
   
    form = new Form();
    form.display();
    //form.button.display();
    score = 0;
    gameflag = "f";
  }

  if (gameState==2){
    imageMode(CENTER);
    image(lostImg,displayWidth/39.2,displayHeight/38.5,displayWidth/18.6,displayHeight/18.6);
    noLoop(); 
  }

 if(gameState == 1){
    form.hide();
    image(bb,0,0,displayWidth/20,displayHeight/20);

    strokeWeight(0.1);
    line(-1,displayHeight/302.7,displayWidth/11.2,displayHeight/302.7);
    //line(26,-1,26,50);
    
    strokeWeight(3);
    line(-1,displayHeight/20.36,displayWidth/11.2,displayHeight/20.36); 

    fill("white");
    noStroke();
    textSize(1);
    text("Score: " + score,1,displayHeight/448); 
    textAlign(CENTER);
    text(rand1 + " " + quesSign + " " + rand2 + " = " + " ? ", displayWidth/56, displayHeight/448);
    
    text(quote,displayWidth/40,displayHeight/20.36)

    fill(255);
    rect(food1.x,food1.y,1,1);
    rect(food2.x,food2.y,1,1);
    rect(food3.x,food3.y,1,1);
    rect(food4.x,food4.y,1,1);

    fill(255);
    for(var i=0;i< 10;i++){
      rect((displayWidth/43)+(i*1.1),displayHeight/900,1,1);
    }
    
    fill(255);
    noStroke();

    for(var i = 0; i < score; i++){
        fill(150+i*10,0,0);
        rect((displayWidth/43)+(i*1.1),displayHeight/900,1,1);
    }

    fill(0);
    textSize(0.65);

    text(opt1,food1.x + 0.5,food1.y + 0.75);
    text(opt2,food2.x + 0.5,food2.y + 0.75);
    text(opt3,food3.x + 0.5,food3.y + 0.75);
    text(opt4,food4.x + 0.5,food4.y + 0.75);

    if(opt1 == result && girl.eat(food1)){
      callFuncts();
      score += 1;

    } else if (opt2 == result && girl.eat(food2)){
      callFuncts();
      score += 1;

    } else if (opt3 == result && girl.eat(food3)){
      callFuncts();
      score += 1;

    }  else if (opt4 == result && girl.eat(food4)){
      callFuncts();
      score += 1;
    } 

    girl.update();
    girl.display();

    textSize(3);

    if (girl.GameEnd()) {
      EndGame();
    }

    if (opt1 == result && (girl.eat(food2)||girl.eat(food3)||girl.eat(food4))){
      EndGame();
    } else if (opt2 == result && (girl.eat(food1)||girl.eat(food3)||girl.eat(food4))){
      EndGame();
    } else if (opt3 == result && (girl.eat(food1)||girl.eat(food2)||girl.eat(food4))){  
      EndGame();
    } else if (opt4 == result && (girl.eat(food1)||girl.eat(food2)||girl.eat(food3))){  
      EndGame();
    }

    if(score == 10){
      imageMode(CENTER);
      image(wonImg,displayWidth/39,displayHeight/38,displayWidth/18.5,displayHeight/18.5);
    }
  }
}

function generateOpt(){  
  opt1 = Math.round(random(1,result*4 + 50));
  opt2 = Math.round(random(1,result*4 + 50));
  opt3 = Math.round(random(1,result*4 + 50));
  opt4 = Math.round(random(1,result*4 + 50));
  
  if((opt1==opt2)||(opt1==opt3)||(opt1==opt4)||(opt2==opt3)||(opt2==opt4)||(opt3==opt4)||(opt1==result)||(opt2==result)||(opt3==result)||(opt4==result)){
    generateOpt();
  }
}


function storeResult(){

  var rand = Math.round(random(1,4));
  
  switch(rand) {
    case 1: 
            opt1 = result;    
            break;
    case 2: 
            opt2 = result;
            break;
    case 3: 
            opt3 = result;
            break;
    case 4: 
            opt4 = result;
            break;
   default: break;
  }

}

function switchQuote(){

  var rand = Math.round(random(1,5))
  
  switch(rand) {
    case 1: 
            quote = "Maths is fun!";
            break;
    case 2: 
            quote = "You have to do Maths to learn maths";
            break;
    case 3:
            quote = "Math teaches us that every problem has a solution";
            break;
    case 4:
            quote = "Maths is the poetry of logical ideas";
            break;
    case 5:
            quote = "Math makes your life add up!";
            break;
   default: break;              
  }
}

function Question(){
  rand1 = Math.round(random(r1,r2));
  rand2 = Math.round(random(r1,r2));
  var temp;

  var questOpt = Math.round(random(1,4));
  
  switch(questOpt) {
    case 1: 
            quesSign = "+";
            result = rand1 + rand2;
            break;
    case 2: 
            quesSign = "-";
            if(rand1>=rand2){
              result = rand1 - rand2;  
            } else{
              temp=rand2;
              rand2=rand1;
              rand1=rand2;
              result = rand1 - rand2;
            }
            break;
    case 3: 
            quesSign = "*";  
            result = rand1 * rand2;
            break;
    case 4: 
            quesSign = "/";
            result = rand1 * rand2;
            temp = result;
            result = rand1;
            rand1 = temp;
            break;
   default: break;
  }
}

function pickLocation() {

  var  x1 = floor(Math.round(random(0+1,(cols/2)-1)));
  var  y1 = floor(Math.round(random(0+5,(rows/2)-1)));

  var  x2 = floor(Math.round(random(((cols/2)+1),cols-1)));
  var  y2 = floor(Math.round(random(0+5,((rows/2)-1))));

  var  x3 = floor(Math.round(random(0+1,(cols/2)-1)));
  var  y3 = floor(Math.round(random(((rows/2)+1),rows-3)));

  var  x4 = floor(Math.round(random((cols/2)+1,cols-1)));
  var  y4 = floor(Math.round(random((rows/2)+1,rows-3)));

  food1 = createVector(x1, y1);
  food2 = createVector(x2, y2);
  food3 = createVector(x3, y3);
  food4 = createVector(x4, y4);

}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    girl.setDir(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    girl.setDir(1, 0);
  } else if (keyCode === DOWN_ARROW) {
    girl.setDir(0, 1);
  } else if (keyCode === UP_ARROW) {
    girl.setDir(0, -1);
  }

}

function callFuncts(){
  Question();
  pickLocation();
  generateOpt();
  storeResult();
  switchQuote();
}

function update(){

}

function EndGame(){
  imageMode(CENTER);
  girl.setDir(0,0);
  image(lostImg,displayWidth/40,displayHeight/38,displayWidth/20,displayHeight/18);
  noLoop();
  gameState = 2;
  gameflag = "s"
}