// Pia Scharf - 2020


let video;
let label = "waiting...";
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/KvPidaM4w/';

let randomSkinTone;
let skinTones = ["✋🏿", "✋🏾", "✋🏽", "✋🏼", "✋🏻"];
let emoji;


let flowerfield;


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

  rectMode(CENTER);

  video = createCapture(VIDEO);
  video.hide();

  classifyVideo();

  flowerfield = new Flowerfield(25); // how many flowers?

  //choose a random skin tone for the hand emoji
  randomSkinTone = skinTones[floor(random(skinTones.length))];
  
  if (width < height) {
    mobile = true;
  }


  background(0, 20, 30);

}

function touchStarted() {
  //renew flowerfield
  flowerfield = new Flowerfield(20);
  return false;
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



  flowerfield.checkAllBlooming();
  flowerfield.display();

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







class Flowerfield {

  constructor(howMany) {
    this.many = howMany;
    this.flowers = [];
    this.initFlowerfield();
  }

  initFlowerfield() {

    for (let i = 0; i <= this.many; i++) {
      let flower = new Flower();
      this.flowers.push(flower);
    }

  }

  checkAllBlooming() {
    for (let k = 0; k < this.flowers.length; k++) {
      let flower = this.flowers[k];
      flower.checkBlooming();
      flower.flourish();
      flower.move();
    }
  }

  display() {
    for (let j = 0; j < this.flowers.length; j++) {
      let flower = this.flowers[j];
      flower.display();

    }
  }

}




class Flower {

  constructor() {
    this.r = floor(random(15, 40));
    this.centerX = floor(randomGaussian(width / 2, width / 4));
    this.centerY = floor(randomGaussian(height / 2, height / 4));

    this.x = 0;
    this.y = 0;

    this.blooming = false;

    this.c = color(255);

    this.petals = [];

    this.a = floor(random(0, 1));
    this.go = true;

    this.nivRandom(); // if flowers are off screen by gaussian distribution, on the edge of the screen.

  }


  nivRandom() {

    if (this.centerX > width - this.r) {
      this.centerX = width - this.r;
    }

    if (this.centerY > height - this.r) {
      this.centerY = height - this.r;
    }

    if (this.centerX < this.r) {
      this.centerX = this.r;
    }

    if (this.centerY < this.r) {
      this.centerY = this.r;
    }
  }


  checkBlooming() {

    if (emoji == randomSkinTone) {

      this.blooming = true;
    } else if (emoji == "⭕️" || emoji == "〰️ loading ML model 〰️") {
      // means: label = "❌"
      this.blooming = false;
    }
  }


  move() {
    if (this.blooming) {

      for (let i = 0; i < this.petals.length; i++) {
        let petal = this.petals[i];
        petal.move();

      }
    }
  }


  flourish() {

    if (this.blooming) {
      this.c = color(255, 200);

      let step = 0.5;

      if (frameCount % 8 == 0) {

        if (this.a <= 12 * step && this.go) {
          this.a = this.a + step;
          if (this.a == 12 * step) {
            this.go = false;
          }

        } else {
          this.a = this.a - step;
          if (this.a == 0) {
            this.go = true;
          }


        }

        let offset = 0;
        let scalar = this.r / 2;

        var x = offset + cos(this.a) * scalar;
        var y = offset + sin(this.a) * scalar;

        let petal = new Petal(this.centerX + x, this.centerY + y, this.r);
        this.petals.push(petal);

      }
    } else {


      this.c = color(200, 200);
      //this.petals.splice(0, this.petals.length);

    }



  }


  display() {
    push();
    translate(this.centerX, this.centerY);
    fill(this.c);
    ellipse(this.x, this.y, this.r, this.r);
    pop();

    for (let i = 0; i < this.petals.length; i++) {
      let petal = this.petals[i];
      petal.display();
    }

  }

}


class Petal {

  constructor(centerX, centerY, centerR) {
    this.originX = centerX;
    this.originY = centerY;
    this.rX = centerR;
    this.rY = centerR * 1;
    this.colval = floor(random(230, 250));

  }

  move() {


    this.x = floor(random(-1, 1));
    this.y = floor(random(-1, 1));
  }

  display() {
    push();
    translate(this.originX, this.originY);

    fill(this.colval, 75);
    ellipse(this.x, this.y, this.rX, this.rY);
    pop();

  }

}