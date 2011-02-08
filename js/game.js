var cue = new Cue(100,100);

var context;
var mx;
var my;
var offset = $('canvas').offset();
var shooting = false;
var maxCuePull = 125;
var cueSpeedMultiplier = 0.08;

var width = 500;
var height = 500;

var pits = new Array();
pits[0] = new Pit(75,75)
pits[1] = new Pit(width-75, 75)
pits[2] = new Pit(75, height-75)
pits[3] = new Pit(width-75, height-75)

var balls = new Array();


// balls getting stuck on walls

function init(){
  context = myCanvas.getContext('2d');
}
function shoot(vx, vy){
  cue.vx = vx;
  cue.vy = vy;
}
function tick(){
  draw();
  cue.move();
  $.each(balls, function(){
    var ball = this;
    moveBall(ball);
    checkCollision(cue, ball);
    
    $.each(pits, function(){
      if (pitDeath(this, ball)) {
        var i = balls.indexOf(ball);
        if(i != -1) balls.splice(i, 1);
      };
    });
    $.each(balls, function(){
      if (this != ball) checkCollision(this, ball);
    });
  });
  $.each(pits, function(){
    if (pitDeath(this, cue)) {
      cue = null;
    };
  });
}
function draw(){
  context.clearRect(0,0, width,height);

  $.each(pits, function(){
    pit = this;
    context.beginPath();
    context.fillStyle="#000";
    context.arc(pit.x,pit.y,pit.radius,0,Math.PI*2,true);
    context.closePath();
    context.fill();
  });

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
    ball = this;
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

    var distX = cue.x-mx;
    var distY = cue.y-my;
    var vx = (distX*cueSpeedMultiplier);
    var vy = (distY*cueSpeedMultiplier);
    send(vx + '/' +vy);
    shoot(vx, vy);
  }
  shooting=false;
});
$('canvas').mousemove(function(e){
  mx = e.pageX - offset.left - 10
  my = e.pageY - offset.top - 10
  calculateCuePull();
});


window.onload += init();