// Pia Scharf - 2020

let mover1;
let mover2;
let mover3;

let movers = [];

let w;
let h;


function setup() {
  w = windowWidth;
  h = windowHeight;
   
   createCanvas(w,h);
   
   ellipseMode(CENTER);
   
   mover1 = new Mover(200,200,2,1,w/30);
  movers.push(mover1);
   
   mover2 = new Mover(351,215,2,4,w/30);
  movers.push(mover2);
   
   mover3 = new Mover(150,320,1,1,w/30);
  movers.push(mover3);
  
      //init mouse in center
  mouseX = w/2;
  mouseY = h/2;
   
}


function draw() {
   
   background(0,20,30);
   stroke(255,249,250);
   
   let x = mouseX ;
   let y = mouseY ;
  
  for(let i =0; i < movers.length; i++){
    let mover = movers[i];
    mover.moveOrigin();
    mover.lines();
    mover.magnet(x,y);
    mover.display();
  }

   
}



class Mover {
   
   constructor(oX, oY, xSp, ySp, tempr){
      this.originX = oX;
      this.originY = oY;
      
      this.xspeed = xSp;
      this.yspeed = ySp;
      this.r=tempr;
      this.outerR= tempr *5;
      
      this.userX =0;
      this.userY =0;
      
      this.lineWeight = 1;
   }
   
   
   
   magnet(tempx,tempy){
      
      this.userX = tempx;
      this.userY = tempy;
      
      let d= int(dist(this.originX,this.originY,this.userX, this.userY));
      
      if(d<=this.outerR){
         this.originX = lerp(this.originX,this.userX,0.05);
         
         this.originY = lerp(this.originY, this.userY,0.05);
         
      }
   }
   
   
   
   moveOrigin(){
      
      this.originX+= this.xspeed;
      this.originY+= this.yspeed;
      if (this.originX > windowWidth - this.r || this.originX< this.r) {
         this.xspeed = -this.xspeed;
      }
      if (this.originY> windowHeight - this.r || this.originY< this.r) {
         this.yspeed = -this.yspeed;
      }
   }
   
   
   display(){
      
      noFill();
      stroke(230,40,80);
      strokeWeight(3);
      ellipse(this.originX,this.originY,this.r,this.r);
      
      push();
      
      fill(230,40,80,35);
      stroke(230,40,80);
      strokeWeight(4);
      ellipse(this.userX, this.userY, this.outerR, this.outerR);
      pop();
      
      
      
      fill(230,40,80);
      ellipse(this.userX,this.userY,this.r,this.r);
      
      
      
   }
   
   
   
   lines(){
      
      for(let i=0; i<=15; i++){
         for(let j=0; j<=15; j++){
            
            let jj =map(j,0,15,0,windowWidth);
            
            let ii=map(i,0,15,0,windowHeight);
            
            stroke(255,249,250);
            strokeWeight(this.lineWeight);
            line(jj,0,this.originX,this.originY);
            line(jj,windowHeight,this.originX,this.originY);
            line(0,ii,this.originX,this.originY);
            line(this.originX,this.originY,windowWidth,ii);
            
         }
      }
      
   }
   
}
