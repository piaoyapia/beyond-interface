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

  for (let i = 0; i <= h/r+1; i++) {
    for (let j = 0; j <= w / r+1; j++) {
      

      let x = map(j, 1, w / r, 0, w);
      let y = map(i, 1, h / r, 0, h);

      circle = new Circle(x, y,r);
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

  constructor(x, y,r ) {
    this.r = r;
    this.x = x;
    this.y = y;
  }

  moveCircle() {
    this.x = this.x + floor(random(-1, 2));
    this.y = this.y + floor(random(-1, 2));

    //version 2 differs in the addition of one line of code, concerning the radius:

    this.r--;

    // if the radius is under "0" the ellipse gets mirrored. (so the value of the radii gets larger again.) The bottom circles are getting drawn last in the grid, so they appear to be on top.
  }

  drawCircle() {
    ellipse(this.x, this.y, this.r);
  }

}