var you, youImg;
var covidVGroup, covidHGroup;
var covidVGroupImg, covidHGroupImg;
var over;

function preload(){
   covidVGroupImg= loadImage("Images/unnamed.png");
   covidHGroupImg= loadImage("Images/abc.png");
   youImg= loadImage("Images/O4.png");
}

function setup(){
   covidVGroup= createGroup();
   covidHGroup= createGroup();
   you= createSprite(50,350,10,10);
   you.addImage(youImg);
   over=createSprite(1180,10,10,30);
}



 
