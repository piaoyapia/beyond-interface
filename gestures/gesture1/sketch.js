// Pia Scharf - 2020


let video;
let label = "waiting...";
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/KvPidaM4w/';

let randomSkinTone;
let skinTones = ["✋🏿", "✋🏾", "✋🏽", "✋🏼", "✋🏻"];
let emoji;


let movers = [];
let num = 18;

let w;
let h;

let mobile;


function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}


function setup() {

  w = windowWidth;
  h = windowHeight;
  createCanvas(w, h);
  noStroke();

  if (width < height) {
    mobile = true;
  }

  rectMode(CENTER);

  video = createCapture(VIDEO);

  video.hide();


  classifyVideo();


  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      let ii = map(i, 0, num, 0, w);
      let jj = map(j, 0, num, 0, h);
      mover = new Mover(ii, jj, 18);
      movers.push(mover);
    }
  }
  //choose a random skin tone for the hand emoji
  randomSkinTone = skinTones[floor(random(skinTones.length))];

  background(0, 20, 30);

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

  image(video, -w / 2, -h / 2, width * 2, height * 2 * video.width / video.height);
  filter(GRAY);
  background(0, 20, 30, 100);

  for (let i = 0; i < movers.length; i++) {
    let mover = movers[i];

    mover.move(emoji);
    mover.display();
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





class Mover {

  constructor(x, y, r) {
    // this.originX = x;
    // this.originY = y;
    this.x = x;
    this.y = y;
    this.r = r;

    this.c = color(0, 20, 30, 230);

    this.direction = {

      speedX: floor(random(15, 25)),
      speedY: floor(random(12, 19)),
    };

    this.moving = false;
  }


  move(emoji) {

    if (emoji == randomSkinTone) {
      this.moving = false;
    } else {
      this.moving = true;
    }

    if (this.moving) {

      this.c = color(0, 20, 30, 230);

      this.x += this.direction.speedX;
      this.y += this.direction.speedY;


      if (this.x > width - this.r / 2) {
        this.direction.speedX = lerp(random(-10, -5), this.direction.speedX, 0.8);
      } else if (this.x < 0 + this.r / 2) {
        this.direction.speedX = lerp(random(5, 10), this.direction.speedX, 0.2);
      }
      if (this.y > height - this.r / 2) {
        this.direction.speedY = lerp(random(-10, -5), this.direction.speedY, 0.8);
      } else if (this.y < 0 + this.r / 2) {
        this.direction.speedY = lerp(random(5, 10), this.direction.speedY, 0.2);
      }

    } else {

      this.c = color(255, 230);

    }

  }





  display() {

    push();
    //translate(this.originX, this.originY);
    fill(this.c);
    ellipse(this.x, this.y, this.r, this.r);
    pop();


  }




}