// Pia Scharf - 2020


let circle;
let circles=[];

let w;
let h;
let r;


function setup() {
  w = windowWidth;
  h = windowHeight;
  r= 140;
  createCanvas(w,h);
  background(0,20,30);
   
   gridInit();
}

function gridInit(){

  for (let i = 0; i <= h/r+1; i++) {
    for (let j = 0; j <= w / r+1; j++) {

      let x = map(j, 1, w / r, 0, w);
      let y = map(i, 1, h / r, 0, h);

         
         circle = new Circle(x,y,r);
         circles.push(circle);
      }
   }
   
}

function draw() {
   //background(0,20,30);
   
   c= color(0,20,30);
   c2 = color(255);
   
   for (let k=0; k<circles.length; k++){
      let cir = circles[k];
      cir.moveCircle();
      cir.drawCircle(c,c2);
   }
}

class Circle{
   
   constructor(x,y,r){
      this.r= r;
      this.smallr = r/4;
      this.x = x;
      this.y = y;
   }
   
   moveCircle(){
      this.x = this.x+floor(random(-1,2));
      this.y= this.y + floor(random(-1,2));
      
      
      if(this.r >=-this.smallr){
         this.r--;
      }else{
         this.r++;
      }
     
     print(this.r);
   }
   
   
   drawCircle(c,c2){
      
      if(this.r >0){
         fill(c2);
      }else{
         fill(c);
      }
      ellipse(this.x,this.y,this.r);
   }
   
}
