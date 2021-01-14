// Pia Scharf - 2020

let origx;
let origy;

let w;
let h;

function setup() {

  w = windowWidth;
  h = windowHeight;

  createCanvas(w, h);

  origx = w / 2;
  origy = h / 2;

  //init mouse in center
  mouseX = origx;
  mouseY = origy;
}

function draw() {

  background(0, 20, 30);

  stroke(244, 250, 255);

  for (let i = 0; i < 14; i++) {
    for (let j = 0; j < 14; j++) {

      let jj = map(0, j, 14, 0, h);


      let ii = map(0, i, 14, 0, w);

      line(mouseX, jj, origx, origy);

      line(ii, mouseY, origx, origy);


      line(mouseX, h - jj, origx, origy);

      line(w - ii, mouseY, origx, origy);


    }
  }


  //user

noStroke();
  fill(230, 40, 80);
  ellipse(mouseX, mouseY, w / 30, w / 30);

  stroke(230, 40, 80);

  push();
  strokeWeight(2);
  line(mouseX, 0, mouseX, h);
  line(0, mouseY, w, mouseY);
  pop();

}