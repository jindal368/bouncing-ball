

var can=document.getElementById('can');
var ctx=can.getContext('2d');

//some variables........
var g=1;
var bx=can.width/4;
var by=can.height/2;
var radius=10;
var score = 0;
//sound..
 var press=new Audio();
 var scr = new Audio();
 var hit = new Audio();

 press.src="sounds/wall.mp3";
 scr.src="sounds/userScore.mp3";
 hit.src="sounds/hit.mp3";

//hurdles array....
var hur = [];
hur[0]={
	x:21*can.width/25,
	y:3*can.height/5	
    };



 function drawArc(x, y, r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}
    function drawRect(x, y, w, h, color){
    
     ctx.fillStyle = color;
     ctx.fillRect(x, y, w, h);
}  

   document.addEventListener("keydown",move);
   const button=document.querySelector('#button');
  
  
  function move(){
	
	by-=30;
	press.play();


}

const randomy=[
3*can.height/4,
2*can.height/3,
can.height/2,
4*can.height/5,
3*can.height/4,
3*can.height/5,
2*can.height/5,
can.height/3,
5*can.height/7,
8*can.height/10,
7*can.height/10
]

function render()
{
	drawRect(0,0,can.width,can.height,'black');
	
	drawArc(bx,by,10,'RED');
	
	by+=1;
	
	drawRect(0,9*(can.height/10),can.width,can.height/10,'blue');
	//random index of hurdles.......
	randind = Math.floor(Math.random() * randomy.length);
	//movement..
    for (var i =0; i<hur.length; i++) {
    
    drawRect(hur[i].x,randomy[randind],can.width/16,randomy[randind],'Yellow');
	
	hur[i].x--;
	
    if(hur[i].x==10){
       hur.push({x:2*can.width/4,
        y : randomy[randind]
       });
	}


	//detection..........game over
	if ((by+radius/2>=9*can.height/10)||((by>=hur[i].y)&&(bx==hur[i].x))||(by==1)){
		hit.play();
		alert("Game over...");
		location.reload();
	
	}
	//score update.........
	if(hur[i].x==bx&&by>0){
		score++;
		scr.play();
	   }
	   
	   //bonus score...........
	   

       if((bx==hur[i].x)&&(by>can.height/2)){
       	score+=3;
       	scr.play();
       	scr.play();
       	scr.play();
       }


    } //score display..........
      ctx.fillStyle = "#000";
      ctx.font="20px Verdana";
      ctx.fillText("Score : "+score,10,can.height-20);
       requestAnimationFrame(render);
 }
 

