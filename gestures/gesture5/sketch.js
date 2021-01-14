// Pia Scharf - 2020


let video;
let label = "waiting...";
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/KvPidaM4w/';

let randomSkinTone;
let skinTones = ["✋🏿", "✋🏾", "✋🏽", "✋🏼", "✋🏻"];
let emoji;

let ready;
let w;
let h;

let mobile;


let stepSize;

function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
  
  w = windowWidth; 
  h = windowHeight;

  createCanvas(w, h);

  video = createCapture(VIDEO);

  video.hide();

  classifyVideo();

  stepSize = 4;

  ready = false;
  
    if (width < height) {
    mobile = true;
  }


  strokeWeight(0.5);
  //stroke(0,20,30);
  stroke(255);

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
  ready = true;
}


function drawLabel() {

  if (mobile) {

    textSize(floor(width / 12));
    fill(255);
    textAlign(CENTER, CENTER);
    emoji = "〰️ loading ML model 〰️";


    if (label == "✋") {
      emoji = randomSkinTone;
      grayify = true;

      textSize(floor(width / 7));
      text(emoji, width / 10, height / 12);
    } else if (label == "❌") {
      emoji = "⭕️";
      grayify = false;
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
      grayify = true;

      textSize(floor(width / 20));
      text(emoji, width / 20, height / 10);

    } else if (label == "❌") {
      emoji = "⭕️";
      grayify = false;
      textSize(floor(width / 20));
      text(emoji, width / 20, height / 10);
    } else {
      text(emoji, width / 2, height - w / 25)
    }

  }
}

function draw() {
   //image(video, -w / 2,-h / 2 , width * 2, height * 2 * video.width / video.height);
  background(0);


  if (ready) {


    video.loadPixels();
    //var stepSize = 6;

    if (emoji == randomSkinTone) {
      if (stepSize < 30) {
        stepSize = stepSize + 1;
      }
    } else {
      if (stepSize > 4) {
        stepSize = stepSize - 1;
      }
    }

    //if hand gets in front of camera: pixel grids gets bigger
    //var stepSize = floor(map(mouseX, 0, width,4, 20));
    for (var x = 0; x < video.width; x += stepSize) {
      for (var y = 0; y < video.height; y += stepSize) {
        var index = ((y * video.width) + x) * 4;
        var redVal = video.pixels[index];
        var greenVal = video.pixels[index + 1];
        var blueVal = video.pixels[index + 2];
        fill(redVal, greenVal, blueVal);
    rect(x * 3, y * 3, stepSize * 3, stepSize * 3);
      }
    }
    //filter(GRAY);
  }
  drawLabel();


}