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
  background(255);
}

function gridInit() {

  for (let i = 1; i <= h / r+1; i++) {
    for (let j = 1; j <= w / r+1; j++) {

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
    this.r = r;
    this.x = x;
    this.y = y;
  }

  moveCircle() {
    this.x = this.x + floor(random(-1, 2));
    this.y = this.y + floor(random(-1, 2));
  }

  drawCircle() {
    ellipse(this.x, this.y, this.r);
  }

}