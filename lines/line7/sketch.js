// Pia Scharf - 2020

let userDot;
let mover;

let w;
let h;

function setup(){
  w = windowWidth;
  h = windowHeight;
  
  createCanvas(w,h);
  
  userDot = new UserDot();
  mover = new Mover(200,200,2,3,w/30);
  
    //init mouse in center
  mouseX = w/2;
  mouseY = h/2;
  
}

function draw(){
  background(0,20,30);
  stroke(255,249,250);
  
  mover.moveOrigin();
  mover.lines();
  
  userDot.moveLines(mouseX, mouseY);
  userDot.dot();
  
  mover.display();
  
}

// code for moving object

class Mover{
  
  constructor(oX, oY, xSp, ySp, tempr){
    this.originX = oX;
    this.originY = oY;

  this.xspeed = xSp;
    this.yspeed = ySp;
    this.r = tempr;
    this.userX =0;
    this.userY =0;
    
    this.outerR = tempr*5.5;
    
    
  }
  
  moveOrigin(){
    
    this.originX += this.xspeed;
    this.originY += this.yspeed;
    if(this.originX > w-this.r || this.originX < this.r){
      this.xspeed = -this.xspeed;
       
    }
        if(this.originY > h-this.r || this.originY < this.r){
      this.yspeed = -this.yspeed;
      
      
    }
    
  }
  
  display(){
    
    noFill();
    stroke(230,40,80);
    strokeWeight(3);
    
    ellipse(this.originX, this.originY, this.r);
    
  }
  
  lines(){
    for(let i = 0; i<=6; i++){
      for(let j=0; j<=15; j++){
        
        let jj = map(j,0,15,0,w);
        let ii = map(i,0,6,0,h);
        
        stroke(255,249,250);
        strokeWeight(1);
        
        for(let k =0; k<=6; k++){
          
          let v = map(k,0,6,0,h);
          
          line(jj,v,this.originX, this.originY);
          
        }
        
      }
    }
    
  }
  
  
  
}


class UserDot{
  
  constructor(){
    this.x;
    this.y;
  }
  
  dot(){
    
    noStroke();
  fill(230, 40, 80);
  ellipse(mouseX, mouseY, w / 30, w / 30);
    
    
  }
  
  moveLines(x,y){
    
    this.x = x;
    this.y=y;
  
    for(let i =0; i<= 6; i++){
      for(let j =0; j<=15; j++){
        
        let jj = map(j,0,15,0,w);
        let ii = map(i,0,6,0,h);
        
        stroke(255,249,250);
        strokeWeight(1);
        
        for(let k=0; k<= 6; k++){
          
          let v = map(k,0,6,0,h);
          
          line(jj,v,this.x,this.y);
        }
      }
    }
    
  }
  
}