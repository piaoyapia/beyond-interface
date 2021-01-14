// Pia Scharf - 2020


let circle;
let circles = [];

let w;
let h;
let r;

function setup() {
  w = windowWidth;
  h = windowHeight;
  r = 140;
  createCanvas(w, h);
  background(0, 20, 30);

  gridInit();
}

function gridInit() {

  for (let i = 0; i <= h / r + 1; i++) {
    for (let j = 0; j <= w / r + 1; j++) {


      let x = map(j, 1, w / r, 0, w);
      let y = map(i, 1, h / r, 0, h);

      circle = new Circle(x, y, r);
      circles.push(circle);
    }
  }
}

function draw() {

  for (let k = 0; k < circles.length; k++) {
    let cir = circles[k];
    cir.moveCircle();
    cir.drawCircle();
  }
}

class Circle {

  constructor(x, y, r) {
    this.initR = r;
    this.r = r;
    this.x = x;
    this.y = y;
  }

  moveCircle() {

    //scaling up random values so that movement in y-direction (up/down) is more likely.
    this.x = this.x + floor(random(-1, 2))*0.5;
    this.y = lerp(this.y + floor(random(-1, 2))*32, this.y, 0.9);


    if (this.r > -this.initR) {
      this.r--;
    } else {
      this.r++;
    }
  }


  drawCircle() {
    ellipse(this.x, this.y, this.r);
  }

}