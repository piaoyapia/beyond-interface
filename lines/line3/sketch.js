// Pia Scharf - 2020

let w;
let h;


function setup() {

  w = windowWidth;
  h = windowHeight;

  createCanvas(w, h);
  strokeWeight(0.5);

  //init mouse in center
  mouseX = w / 2;
  mouseY = h / 2;

}


function draw() {

  clear();
  background(0, 20, 30);



  lines();
  dot();


}

function dot() {
noStroke();
  fill(230, 40, 80);
  ellipse(mouseX, mouseY, w / 30, w / 30);
}


function lines() {


  stroke(255, 249, 250);

  for (let i = 0; i < 21; i++) {
    for (let j = 0; j < 21; j++) {

      let jj = map(j, 0, 20, 0, w);

      let ii = map(i, 0, 20, 0, h);

      stroke(255, 249, 250);
      strokeWeight(1);

      for (let k = 0; k < 11; k++) {

        let v = map(k, 0, 10, 0, h);
        line(jj, v, mouseX, mouseY);

      }
    }
  }

}