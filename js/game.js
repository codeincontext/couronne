var cue = new Cue(-100,-100);

var animating = false;
var data

var context;
var mx;
var my;
var offset = $('canvas').offset();
var aiming = false;
var maxCuePull = 125;
var cueSpeedMultiplier = 0.08;

var width = 500;
var height = 500;

var pits = new Array();
pits[0] = new Pit(75,75);
pits[1] = new Pit(width-75, 75);
pits[2] = new Pit(75, height-75);
pits[3] = new Pit(width-75, height-75);

var balls = new Array();


// balls getting stuck on walls

function init(){
  context = myCanvas.getContext('2d');
}
function shoot(vx, vy){
  cue.vx = vx;
  cue.vy = vy;
  animating = true;
}
function tick(){
  if (animating || aiming || true){
    draw();
  }
  if (animating){
    cue.move();
    $.each(balls, function(){
      var ball = this;
      moveBall(ball);
      checkCollision(cue, ball);

      $.each(pits, function(){
        if (pitDeath(this, cue)) {
          cue = new Cue(-100,-100);
        };
      });

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
    if (!balls_moving()){
      animating = false;
      if (data){
        console.log('Apply sync');
        balls = data['balls'];
        cue.x = data['cue'].x;
        cue.y = data['cue'].y;
        cue.vx = data['cue'].vx;
        cue.vy = data['cue'].vy;
        data = null;
      }
    }
  }
}
function balls_moving(){
  var moving = false;
  $.each(balls, function(){
    if (this.vx != 0 || this.vy != 0) moving = true;
  });
  if (cue.vx != 0 || cue.vy != 0) moving = true;
  return moving;
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

  $.each(balls, function(){
    ball = this;
    context.beginPath();
    context.fillStyle="#00ff00";
    context.arc(ball.x,ball.y,20,0,Math.PI*2,true);
    context.closePath();
    context.fill();
  });

  if (aiming) {
    context.strokeStyle = '#f00';
    context.lineWidth   = 10;

    context.beginPath();
    context.moveTo(cue.x, cue.y);
    context.lineTo(mx, my);

    context.stroke();
    context.closePath();
  }

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

$('#gameArea').mousedown(function(e){
  mx = e.pageX - offset.left - 10
  my = e.pageY - offset.top - 10
  if (dist(mx,my, cue.x, cue.y) < 40){
    aiming = true;
  }
});
$('#gameArea').mouseup(function(e){
  if (aiming){
    mx = e.pageX - offset.left - 10
    my = e.pageY - offset.top - 10
    calculateCuePull();

    var distX = cue.x-mx;
    var distY = cue.y-my;
    var vx = (distX*cueSpeedMultiplier);
    var vy = (distY*cueSpeedMultiplier);
    send(vx + '/' +vy);
    shoot(vx, vy);
  }
  aiming=false;
});
$('#gameArea').mousemove(function(e){
  mx = e.pageX - offset.left - 10
  my = e.pageY - offset.top - 10
  calculateCuePull();
});


window.onload += init();