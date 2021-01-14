// Pia Scharf - 2020


let video;
let label = "waiting...";
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/KvPidaM4w/';

let randomSkinTone;
let skinTones = ["✋🏿", "✋🏾", "✋🏽", "✋🏼", "✋🏻"];
let emoji;

let stepSize;
let swirl;

let offsetX;
let offsetY;
let a;

let w;
let h;

let mobile;

function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {

  w = windowWidth;
  h = windowHeight;
  
  createCanvas(w,h);
  video = createCapture(VIDEO);
  noStroke();
  strokeWeight(0.5);
  stroke(0, 20, 30);
  video.hide();

  classifyVideo();

  stepSize = 12;
  swirl = false;
  
      if (width < height) {
    mobile = true;
  }

  offsetX = 0;
  offsetY = 0;
  a = 0;
  //choose a random skin tone for the hand emoji
  randomSkinTone = skinTones[floor(random(skinTones.length))];

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

function draw() {

  background(0);


  video.loadPixels();


  //var stepSize = floor(map(mouseX, 0, width,4, 20));
  for (var x = 0; x < video.width; x += stepSize) {
    for (var y = 0; y < video.height; y += stepSize) {
      var index = ((y * video.width) + x) * 4;
      var redVal = video.pixels[index];
      var greenVal = video.pixels[index + 1];
      var blueVal = video.pixels[index + 2];


      if (swirl) {
        fill(redVal, greenVal, blueVal);

        stepSize = 12;
        offsetX = lerp(offsetX, 2 * sin(a), 0.7);
        offsetY = lerp(offsetY, 1 * cos(a), 0.9);
        a = a + 0.055;

        push();
        noStroke();
        rect(3*x + 3*offsetX, 3*y - 3*offsetY, 3*stepSize, 3*stepSize);
        pop();

      } else {
        push();
        translate(3*x, 3*y);

        fill(redVal, greenVal, blueVal);
        stepSize = 6;
        stroke(0, 20, 30);
        strokeWeight(0.5);
        rect(0, 0, 3*stepSize, 3*stepSize);
        pop();

      }


    }
  }
  //filter(GRAY);

  drawLabel();

}