// Pia Scharf - 2020

let grid;
let w;
let h;

let size;



function setup() {
  w = windowWidth;
  h = windowHeight;
  size = 30;

  createCanvas(w, h);
  
  grid = new Grid(40, 20); // anzahl, groesse
  grid.initGrid();

  rectMode(CENTER);
  strokeWeight(0.5);
  num = 0;
  
     //init mouse in center
  mouseX = w / 2;
  mouseY = h / 2;

}


function draw() {

  background(242, 138, 147); // Salmon Pink
  grid.displayGrid();
  grid.displayUser();

}



class Grid {

  constructor(num, temp_s) {

    this.numberX = num;
    this.numberY = num;
    this.s = temp_s;
    this.tiles = [];
    this.userR = w/30;

  }


  initGrid() {

    for (let i = 0; i < this.numberX; i++) {
      for (let j = 0; j < this.numberY; j++) {


        let ii = map(i, 0, this.numberX - 1, 0, width);
        let jj = map(j, 0, this.numberY - 1, 0, height);

        let tile = new Tile(ii, jj, this.s);
        this.tiles.push(tile);
      }
    }

  }


  displayGrid() {

    for (let i = 0; i < this.tiles.length; i++) {
      let til = this.tiles[i];
      til.move();
      til.display();
    }

  }


  displayUser() {

    push();
    fill(230, 40, 80); //Amaranth
    noStroke();
    ellipse(mouseX, mouseY, this.userR, this.userR);
    pop();

  }

}


class Tile {

  constructor(x, y, temp_s) {

    this.originX = x;
    this.originY = y;

    this.x = 0;
    this.y = 0;
    this.s = temp_s;
    this.c = color(253, 235, 218); //Antique White
    this.strokerize = true;

  }


  move() {
        let rad = size*2.5; 

    let d = dist(mouseX, mouseY, this.originX, this.originY);

    if (d < rad) {


      this.c = color(255, 250, 243, 100); //Floral White with 100 Alpha
      if (this.y > -17) {
        this.y = this.y - 1;
      }

      this.strokerize = false;

    }


  }


  display() {

    push();
    translate(this.originX, this.originY);

    if (this.strokerize) {

      stroke(252, 224, 205); //Unbleached Silk
      fill(255, 250, 243); // Floral White

    } else {
      noStroke();
      fill(this.c);
    }

    rect(this.x, this.y, this.s, this.s);
    pop();

  }


}





