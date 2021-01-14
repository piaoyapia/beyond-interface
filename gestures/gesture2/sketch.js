// Pia Scharf - 2020


let video;
let label = "waiting...";
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/KvPidaM4w/';

let randomSkinTone;
let skinTones = ["✋🏿", "✋🏾", "✋🏽", "✋🏼", "✋🏻"];
let emoji;

let snowflakes = [];
let num = 800;


let w;
let h;

let mobile;

let possibleOriginX =[];


function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
  //img

  
}


function setup() {
  
  w = windowWidth;
  h = windowHeight;
  createCanvas(w,h);
  noStroke();

  rectMode(CENTER);

  video = createCapture(VIDEO);
  video.hide();

  classifyVideo();
  
  for(let i =0; i<num; i++){
  let possibleX = floor(map(i, 0, num,0,width));
    possibleOriginX.push(possibleX);
    
  }
    //choose a random skin tone for the hand emoji
  randomSkinTone = skinTones[floor(random(skinTones.length))];
  
    if (width < height) {
    mobile = true;
  }
  
     background(0,20,30);

}

function addFlakes(){
  
  
  if(frameCount%1==0 && emoji == '⭕️'){
    let chosen = floor(random(possibleOriginX.length));
    let pickrandX = possibleOriginX[chosen];
    
    //console.log(pickrandX);
    let flake = new Snowflake(pickrandX, 0, 12);
    snowflakes.push(flake);
    
  }
  
  
}



function classifyVideo() {
  classifier.classify(video, gotResults);
}


function gotResults(error, results) {

  if (error) {
    console.error(error);
    return;
  }

  label = results[0].label;
  classifyVideo();
}


function draw() {
  image(video, -w/2, -h/2, width*2, height*2 * video.width / video.height);
  filter(GRAY);
  background(0,20,30,100);

  
  addFlakes();

  for(let i=snowflakes.length-1; i>=0; i--){
    let snowflake = snowflakes[i];
    snowflake.move();
    snowflake.display();
    
    if (snowflake.dead){
    snowflakes.splice(i,1);
      
      
    }
    
  }
  
  
  drawLabel();



}


function drawLabel() {

  if (mobile) {

    textSize(floor(width / 12));
    fill(255);
    textAlign(CENTER, CENTER);
    emoji = "〰️ loading ML model 〰️";


    if (label == "✋") {
      emoji = randomSkinTone;
      swirl = true;

      textSize(floor(width / 7));
      text(emoji, width / 10, height / 12);
    } else if (label == "❌") {
      emoji = "⭕️";
      swirl = false;
      textSize(floor(width / 7));
      text(emoji, width / 10, height / 12);
    } else {
      text(emoji, width / 2, height - w / 12)
    }

  } else { // if desktop

    textSize(floor(width / 25));
    fill(255);
    textAlign(CENTER, CENTER);
    emoji = "〰️ loading ML model 〰️";

    if (label == "✋") {
      emoji = randomSkinTone;
      swirl = true;

      textSize(floor(width / 20));
      text(emoji, width / 20, height / 10);

    } else if (label == "❌") {
      emoji = "⭕️";
      swirl = false;
      textSize(floor(width / 20));
      text(emoji, width / 20, height / 10);
    } else {
      text(emoji, width / 2, height - w / 25)
    }

  }
}


class Snowflake{
  
  constructor(x,y,r){
    
    this.originX = x;
    this.originY = y;
    this.x = 0;
    this.y = 0;
    this.r = r+floor(random(-r/4,+r/4));
    
    this.moving = false;
    
    this.dead = false;
    
  }
  
  
  
  
  move(){
    
  
    
    //if(this.moving){
    
    this.x = this.x+floor(random(-1,1));
    this.y = this.y + floor(random(1,5));
      
      if(this.y > height){
        this.dead = true;
      }
    //}else{
      //do nothing?
      
    //}
    
  }
  
  display(){
    push();
    translate(this.originX, this.originY);
    ellipse(this.x, this.y, this.r, this.r);
    pop();
    
    
  }
  
  
  
}




