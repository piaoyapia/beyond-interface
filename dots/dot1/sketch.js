// Pia Scharf - 2020

let circle;
let circles = [];

let w;
let h;

let r;

let canvas;

function setup() {

  ellipseMode(CENTER);

    w = windowWidth;
    h = windowHeight;

  canvas = createCanvas(w, h);


  createCanvas(w, h);
  //noStroke();
  background(0, 20, 30);

  r = 140;

  gridInit();
}

function gridInit() {

  for (let i = 0; i <= h/r+1; i++) {
    for (let j = 0; j <= w / r+1; j++) {

      let x = map(j, 1, w / r, 0, w);
      let y = map(i, 1, h / r, 0, h);



      circle = new Circle(x, y, r);
      circles.push(circle);
    }
  }

}

function draw() {

background(0, 20, 30);



  for (let k = 0; k < circles.length; k++) {
    let cir = circles[k];
    cir.moveCircle();
    cir.drawCircle();
  }

}




class Circle {

  constructor(x, y, r) {
    this.r = r;
    this.x = x;
    this.y = y;
  }

  moveCircle() {
    // no movement

  }


  drawCircle() {
    ellipse(this.x, this.y, this.r);
  }

}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}