var context;
var cx=100;
var cy=200;
var vx=0;
var vy=0;
var mx;
var my;
var offset = $('canvas').offset();
var shooting = false;

function init(){
  context= myCanvas.getContext('2d');
  setInterval(tick,10);
}
function tick(){
  draw();
  if( cx<50 || cx>250) vx=-vx;
  if( cy<50 || cy>250) vy=-vy;
  cx+=vx;
  cy+=vy;
}
function draw(){
  context.clearRect(0,0, 500,500);

  if (shooting) {
    context.strokeStyle = '#f00';
    context.lineWidth   = 10;

    context.beginPath();
    context.moveTo(cx, cy);
    context.lineTo(mx, my);

    context.stroke();
    context.closePath();
  }

  context.beginPath();
  context.fillStyle="#0000ff";
  context.arc(cx,cy,20,0,Math.PI*2,true);
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
$('canvas').mousedown(function(e){
  mx = e.pageX - offset.left
  my = e.pageY - offset.top
  if (dist(mx,my, cx, cy) < 20){
    shooting = true;
  }
});
$('canvas').mouseup(function(e){
  shooting = false;
});
$('canvas').mousemove(function(e){
  mx = e.pageX - offset.left
  my = e.pageY - offset.top
});


window.onload += init();