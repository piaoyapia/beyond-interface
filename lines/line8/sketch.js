// Pia Scharf - 2020

let mover1;
let w;
let h;


function setup() {
   w = windowWidth ;
   h = windowHeight ;
   
   createCanvas(w, h);
   
   ellipseMode(CENTER);
   
   mover1 = new Mover(200,200,3,3,w/30);
  
      //init mouse in center
  mouseX = w/2;
  mouseY = h/2;
   
}

function draw() {
   
   background(0,20,30);
   stroke(255,249,250);
   
   mover1.moveOrigin();
   mover1.lines();
   let x = mouseX ;
   let y = mouseY ;
   
   mover1.magnet(x,y);
   mover1.display();
}



class Mover {
   
   constructor(oX, oY, xSp, ySp, tempr){
      this.originX = oX;
      this.originY = oY;
      
      this.xspeed = xSp;
      this.yspeed = ySp;
      this.r=tempr;
      
      this.userX =0;
      this.userY =0;
      
      this.outerR = tempr*6;
   }
   
   
   
   magnet(tempx,tempy){
      
      
      this.userX = tempx;
      this.userY = tempy;
      
      
      let d= int(dist(this.originX,this.originY,this.userX, this.userY));
      
      if(d<=this.outerR){
         this.originX = lerp(this.originX,this.userX,0.01);
         
         this.originY = lerp(this.originY, this.userY,0.05);
         
         this.xspeed= this.xspeed +0.1;
         this.yspeed= this.yspeed +0.05;
         
         if(d<this.r){
            
            this.xspeed = 0;
            this.yspeed = 0;
         }
      }
      
   }
   
   
   
   moveOrigin(){
      
      this.originX+= this.xspeed;
      this.originY+= this.yspeed;
      if (this.originX > w - this.r || this.originX< this.r) {
         this.xspeed = -this.xspeed;
      }
      if (this.originY> h - this.r || this.originY< this.r) {
         this.yspeed = -this.yspeed;
      }
   }
   
   
   display(){
      
      noFill();
      stroke(230,40,80);
      strokeWeight(3);
      ellipse(this.originX,this.originY,this.r,this.r);
      
      
      fill(230,40,80);
      ellipse(this.userX,this.userY,this.r,this.r);
      
      
      push();
      fill(230,40,80,80);
      stroke(230,40,80);
      strokeWeight(4);
      stroke(230,40,80);
      ellipse(this.userX, this.userY, this.outerR,this.outerR);
      pop();
      
   }
   
   
   lines(){
      
      for(let i=0; i<=20;i++){
         for(let j=0; j<=20;j++){
            
            let jj =map(j,0,20,0,w);
            
            let ii=map(i,0,20,0,h);
            
            stroke(255);
            strokeWeight(1);
            line(jj,0,this.originX,this.originY);
            line(jj,h,this.originX,this.originY);
            line(0,ii,this.originX,this.originY);
            line(this.originX,this.originY,w,ii);
            
         }
      }
      
   }
   
}
