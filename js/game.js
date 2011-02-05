var cue = new Cue(100,100);

var context;
var mx;
var my;
var offset = $('canvas').offset();
var shooting = false;
var maxCuePull = 125;
var cueSpeedMultiplier = 0.05;

var width = 500;
var height = 500;

var balls = new Array();
for (i = 0; i < 10; i++){
  balls[i] = new Ball(50+Math.ceil(Math.random()*400),50+Math.ceil(Math.random()*400));
}

// balls getting stuck on walls

function init(){
  context = myCanvas.getContext('2d');
  setInterval(tick,10);
}
function tick(){
  draw();
  cue.move();
  $.each(balls, function(){
    // console.log(this)
    var ball = this;
    ball.move();
    checkCollision(cue, ball);
    
    $.each(balls, function(){
      if (this != ball) checkCollision(this, ball);
    });
  });
}
function draw(){
  context.clearRect(0,0, width,height);

  if (shooting) {
    context.strokeStyle = '#f00';
    context.lineWidth   = 10;

    context.beginPath();
    context.moveTo(cue.x, cue.y);
    context.lineTo(mx, my);

    context.stroke();
    context.closePath();
  }

  $.each(balls, function(){
    ball = this
    context.beginPath();
    context.fillStyle="#00ff00";
    context.arc(ball.x,ball.y,20,0,Math.PI*2,true);
    context.closePath();
    context.fill();
  });

  context.beginPath();
  context.fillStyle="#0000ff";
  context.arc(cue.x,cue.y,20,0,Math.PI*2,true);
  context.closePath();
  context.fill();
}
function dist(x, y, X, Y){
  x_diff = Math.pow( (x-X), 2 );
  y_diff = Math.pow( (y-Y), 2 );
  dist1 = Math.sqrt( x_diff + y_diff );
  if (dist1<0) {dist1 = -dist1;}
  return dist1;
}

$('canvas').mousedown(function(e){
  mx = e.pageX - offset.left
  my = e.pageY - offset.top
  if (dist(mx,my, cue.x, cue.y) < 20){
    shooting = true;
  }
});
$('canvas').mouseup(function(e){
  if (shooting){
    mx = e.pageX - offset.left
    my = e.pageY - offset.top
    calculateCuePull();

    var dx = cue.x-mx;
    var dy = cue.y-my;
    cue.vx = (dx*cueSpeedMultiplier);
    cue.vy = (dy*cueSpeedMultiplier);
  }
  shooting=false;
});
$('canvas').mousemove(function(e){
  mx = e.pageX - offset.left
  my = e.pageY - offset.top
  calculateCuePull();
});


window.onload += init();