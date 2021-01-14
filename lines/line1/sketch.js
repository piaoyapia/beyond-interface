// Pia Scharf - 2020

let num;
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


  stroke(255, 249, 250);

  if (mouseX > origx) {
    num = 80;
  } else {
    num = 10;
  }

  for (let i = 0; i < 28; i++) {
    for (let j = 0; j < num; j++) {


      let jj = map(j, 0, num, 0, h);


      let ii = map(i, 0, 28, 0, w);

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