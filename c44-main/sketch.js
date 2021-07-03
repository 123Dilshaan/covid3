var gameState = "start";
var houseImg, livingRoomImg, marketImg;
var place;
var click;
var button2, button3, button4, button5, button6, button7;
var flag = false;
var girlImg;
var girl;
var wash;
var score = 100;
var covidVGroup, covidHGroup;
var covidVGroupImg, covidHGroupImg;
var over;

function preload() {
  houseImg = loadImage("Images/home.png");
  livingRoomImg = loadImage("Images/livingRoom.png");
  marketImg = loadImage("Images/superMarket.png");
  click = loadSound("Sounds/click.mp3");
  girlImg = loadImage("Images/O4.png");
  wash = loadImage("Images/download.jpg");
  covidVGroupImg = loadImage("Images/unnamed.png");
  covidHGroupImg = loadImage("Images/abc.png");
}

function setup() {
  var canvas = createCanvas(1200, 400);
  covidVGroup = createGroup();
  covidHGroup = createGroup();
  over = createSprite(1180, 10, 40, 50);
  over.shapeColor = "red";
  over.visible = false;
  background(255, 159, 231);
  if (gameState === "start") {
    start();
  }

  girl = createSprite(150, 300, 10, 10);
  girl.addImage(girlImg);
  girl.scale = 0.35;
}

function draw() {
  edges=createEdgeSprites();
  if (gameState === "instruction") {
    instructions();
  }
  if (gameState === "play") {
    girl.visible = true;
    if (place === "outside") {
      if (!flag) {
        background(houseImg);
      }
      text("Score : " + score, 100, 50);

      //getTime();
      if (!button3) {
        button3 = createButton("Living Room");
        button3.position(1100, 50);
        button3.mousePressed(() => {
          place = "living room";
          gameState = "play";
          click.play();
        });
      }

      if (!button4) {
        button4 = createButton("Market");
        button4.position(1100, 150);
        button4.mousePressed(() => {
          background(marketImg);
          text("Score : " + score, 100, 50);
          gameState = "play";
          place = "market";
          click.play();
        });
      }
    }

    if (place === "living room") {
      visible1();
      if (!flag) {
        background(livingRoomImg);
      }
      text("Score : " + score, 100, 50);

      if (!button5) {
        button5 = createButton("Home Screen");
        button5.position(1100, 100);
        button5.mousePressed(() => {
          gameState = "play";
          place = "outside";
          click.play();
        });
      }
    }
    if (place === "market") {
      visible();

      if (!button6) {
        button6 = createButton("Home Screen");
        button6.position(1100, 100);
        button6.mousePressed(() => {
          gameState = "play";
          place = "outside";
          click.play();
        });
      }
      if (!button7) {
        button7 = createButton("Play a game");
        button7.position(1100, 200);
        button7.mousePressed(() => {
          gameState = "play";
          place = "game";
          click.play();
          
        });
      }
      
      }
      if (place === "game") {
        background(255);
          over.visible = true;
          text("Score : " + score, 100, 50);
          girl.x = 50;
          girl.y = 330;
          girl.scale = 0.25;
        console.log("123");
        if (keyDown(UP_ARROW)) {
          girl.y = y - 1;
        }
        if (keyDown(DOWN_ARROW)) {
          girl.y = y + 1;
        }
        if (keyDown(RIGHT_ARROW)) {
          girl.x = x + 1;
        }
        if (keyDown(LEFT_ARROW)) {
          girl.x = x - 1;
        }
        spawnCovidH();
        spawnCovidV();
  
        girl.collide(edges[1]);
        girl.collide(edges[2]);
        girl.collide(edges[3]);
        girl.collide(edges[4]);
        if (girl.isTouching(over)) {
          text("You Are Safe!!", 600, 200);
        }
        if (girl.isTouching(covidHGroup) || girl.isTouching(covidHGroup)) {
          text("You Lost!!", 600, 200);
        }
    }
   
  }
  drawSprites();
}

function start() {
  //girl.visible=false;

  gameState = "start";
  stroke(0);
  fill(186, 73, 255);
  textFont("jokerman");
  textSize(40);
  text("⚠ COVID Safety ⚠", 450, 50);

  noStroke();
  textFont("ink free");
  fill("black");
  textSize(20);
  text(
    "Corona virus has taken over the world, leaving all locked up in their homes. This pandemic has affected thousands of peoples,",
    25,
    150
  );
  text(
    " who are either sick or are being killed due to the spread of this disease. Let's learn how we can keep us safe. Click start to play.",
    25,
    170
  );
  button1 = createButton("Start");
  button1.position(600, 370);
  button1.mousePressed(() => {
    button1.hide();
    gameState = "instruction";
    click.play();
  });
}

function instructions() {
  background(255, 159, 231);
  stroke(0);
  fill(186, 73, 255);
  textFont("Times New Roman");
  textSize(40);
  text("Here's your schedule", 450, 50);
  girl.visible = false;
  if (!button2) {
    button2 = createButton("Play");
    button2.position(600, 370);
    button2.mousePressed(() => {
      console.log(5);
      button2.hide();
      gameState = "play";
      place = "outside";
      click.play();
    });
  }
}
async function getTime() {
  var time = await fetch("http://worldtimeapi.org/api/timezone/asia/kolkata");
  var timeType = await time.json();

  var dt = timeType.datetime;
  var hr = dt.slice(11, 13);
  console.log(hr);

  if (hr == 10 || hr == 12 || hr == 14 || hr == 16 || hr == 18) {
    text("Wash hands", 600, 200);
    console.log("print");
    if (keyWentDown("space")) {
      if (wash) background(wash);
      background(wash);
      score = score + 100;
    } else {
      score = score - 100;
    }
  }
}
function visible() {
  button3.visible = true;
}
function visible1() {
  button4.visible = true;
}

function spawnCovidH() {
  if (frameCount % 60 === 0) {
    var random1 = random(50, 1100);
    var virus = createSprite(random1, 0, 10, 10);
    virus.addImage(covidHGroupImg);
    virus.velocityY = 10;
    virus.lifetime = 200;

    covidHGroup.add(virus);
  }
}

function spawnCovidV() {
  if (frameCount % 60 === 0) {
    var random1 = random(10, 170);
    var virus1 = createSprite(0, random1, 10, 10);
    virus1.addImage(covidVGroupImg);
    virus1.velocityX = 10;
    virus1.lifetime = 1200;

    covidVGroup.add(virus1);
  }
}
