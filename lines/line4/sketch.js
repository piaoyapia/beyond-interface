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

  for (let i = 0; i <= 40; i++) {
    for (let j = 0; j <= 20; j++) {

      let jj = map(j, 0, 20, 0, windowWidth);

      let ii = map(i, 0, 40, 0, windowHeight);

      stroke(255);
      strokeWeight(1);


      line(0, ii, windowWidth, mouseY);

      line(0, mouseY, windowWidth, ii);
      line(jj, 0, mouseX, mouseY);
      line(jj, windowHeight, mouseX, mouseY);

      
      // user line
      push();
      stroke(230, 40, 80);
      strokeWeight(2);
      //line(mouseX, 0, mouseX, h);
      line(0, mouseY, w, mouseY);
      pop();

    }
  }

  noStroke();
  fill(230, 40, 80);
  ellipse(mouseX, mouseY, w / 30, w / 30);

}