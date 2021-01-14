// Pia Scharf - 2020


function setup() {
  w = windowWidth;
  h = windowHeight;

  createCanvas(w, h);

  //init mouse in center
  mouseX = w / 2;
  mouseY = h / 2;
}

function draw() {
  background(0, 20, 30);
  stroke(255, 249, 250);

  lines();
  verticals();
  dot();
}

function verticals() {

  let res = 20;

  for (let k = 0; k <= res * 2; k++) {
    for (let l = 0; l <= res; l++) {

      let kk = map(k, 0, res * 2, 0, windowWidth);

      let ll = map(l, 0, res, 0, windowHeight);

      stroke(255, 249, 250);
      strokeWeight(1);

      line(0, mouseY, windowWidth - ll, windowHeight);
      line(ll, 0, windowWidth, mouseY);
      line(kk, windowHeight, windowWidth, mouseY);

      line(kk, 0, 0, mouseY);

    }
  }
}



function dot() {

    noStroke();
  fill(230, 40, 80);
  ellipse(mouseX, mouseY, w / 30, w / 30);
  

      // user line
      push();
      stroke(230, 40, 80);
      strokeWeight(2);
      //line(mouseX, 0, mouseX, h);
      line(0, mouseY, w, mouseY);
      pop();

}



function lines() {

  for (let i = 0; i <= 20; i++) {
    for (let j = 0; j <= 20; j++) {

      let jj = map(j, 0, 20, 0, windowWidth);

      let ii = map(i, 0, 20, 0, windowHeight);

      stroke(255, 249, 250);
      strokeWeight(1);
      line(jj, 0, mouseX, mouseY);
      line(jj, windowHeight, mouseX, mouseY);

      line(0, ii, mouseX, mouseY);
      line(mouseX, mouseY, windowWidth, ii);

    }
  }
}