// Pia Scharf - 2021

let w;
let h;

let grid;

let colors = [];


function setup() {
  w = windowWidth;
  h = windowHeight;
  createCanvas(w, h);

  colors = [color(253, 235, 238), color(250, 214, 221), color(247, 189, 201), color(241, 139, 161), color(236, 90, 121)];



  grid = new Grid(50);
 
  let offsetRandom = true;

  if (offsetRandom) {
    mouseX = w / 2 + int(random(-w / 10, w / 10));
    mouseY = h / 2 + int(random(-h / 4, h / 4));
  } else {
    mouseX = w / 2;
    mouseY = h / 2;
  }
}


function draw() {
  background(220);
  grid.estimateAngle();
  grid.displayGrid();

  grid.displayUser();

}

class Grid {

  constructor(l) {
    this.l = l;
    this.quads = [];
    this.initGrid();
    this.userR = w/30;


  }
  
    displayUser() {

  push();
  fill(230, 40, 80);
  ellipse(mouseX, mouseY, this.userR);
  pop();

}


  initGrid() {
    for (let i = 0; i < w / this.l; i++) {
      for (let j = 0; j < h / this.l; j++) {



        let q = new Quad(i * this.l, j * this.l, this.l, this.colors);
        this.quads.push(q);


      }
    }
  }

  estimateAngle() {

    for (let i = 0; i < this.quads.length; i++) {
      let quad = this.quads[i];
      quad.calculateAngle();


    }
  }

  displayGrid() {

    for (let i = 0; i < this.quads.length; i++) {
      let quad = this.quads[i];

      quad.displayQuad();
      quad.lineQuad();
    }
  }
}


class Quad {

  constructor(x, y, l, c) {
    this.x = x;
    this.y = y;
    this.l = l
    this.a = 0.01;
    this.outerR = l*5;

    this.colors = c;

    this.weight = 3;
    this.colorStroke = (255);

  }


  lineQuad() {


    push();
    translate(this.x, this.y);
    stroke(this.colorStroke);
    strokeWeight(this.weight);
    translate(this.l / 2, this.l / 2);
    rotate(this.a);
    

    // Asterisk
    
    for (let i = 0; i < 5; i++) {
      rotate(2 * PI / 5);
      line(this.l / 4, -this.l / 4, 0, 0);
    }
    
  
    pop();

  }

  calculateAngle() {

    let d = int(dist(this.x, this.y, mouseX, mouseY));
    if (d < this.outerR) {
      this.a = this.a + map(d, 0, this.outerR, -0.1, -0.01);
      //this.colorStroke = color(255,0,0);

      let colorCode = int(map(d, 0, this.outerR, colors.length - 1, 0));


      this.colorStroke = colors[colorCode];

      this.weight = 12;
    } else {

      this.a = this.a + 0.01;
      this.colorStroke = (255);
      this.weight = 3;

    }


  }

  displayQuad() {
    //fill(0);
    push();
    translate(this.x, this.y);
    fill(0, 20, 30);
    stroke(255);
    strokeWeight(0.1);
    rect(0, 0, this.l, this.l)

    pop();

  }


}