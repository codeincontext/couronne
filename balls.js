var context;
var mx;
var my;
var offset = $('canvas').offset();
var shooting = false;
var maxCuePull = 125;
var cueSpeedMultiplier = 0.05;

function Cue (x, y) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.move = false;
  this.checkCollision = false;
}
var cue = new Cue(100,100);

function init(){
  context= myCanvas.getContext('2d');
  setInterval(tick,10);
}
function tick(){
  draw();
  if( cue.x<50 || cue.x>250) cue.vx=-cue.vx;
  if( cue.y<50 || cue.y>250) cue.vy=-cue.vy;
  cue.x+=cue.vx;
  cue.y+=cue.vy;
}
function draw(){
  context.clearRect(0,0, 500,500);

  if (shooting) {
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
  dist1 = Math.sqrt( x_diff + x_diff );
  if (dist1<0) {dist1 = -dist1;}
  return dist1;
}
function calculateCuePull(){
	// dx and dy are the x and y components of the cue vector
	var distX = mx - cue.x;
	var distY = my - cue.y;

	// h is the distance of the cue pull
	var h = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));

	// If the cue is being pulled further than the maxCuePull
	if (h>maxCuePull){
		// scaleMultiplier is the amount that the x and y coordinates must scale down by to make the pull equal the maxCuePull
		var scaleMultiplier = maxCuePull/h;
		// Scale the x and y components of the pull down
		distX = distX*scaleMultiplier;
		distY = distY*scaleMultiplier;
	}

	mx = (cue.x+distX);
	my = (cue.y+distY);
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