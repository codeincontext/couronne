function Ball (x, y) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.move=move;
}
function moveBall(ball){
  friction = 0.99
  ball.vx *= friction;
  ball.vy *= friction;
  if (ball.vy < 0.1 && ball.vy > -0.1 && ball.vx < 0.1 && ball.vx > -0.1) {ball.vx = 0; ball.vy = 0;}
  // displace the ball
  if( ball.x<20 || ball.x>width-20) ball.vx=-ball.vx;
  if( ball.y<20 || ball.y>height-20) ball.vy=-ball.vy;
  ball.x+=ball.vx;
  ball.y+=ball.vy;
};
function checkCollision(ball1, ball2){
  var r = 20;
  var dy = ball1.y - ball2.y;
  var dx = ball1.x - ball2.x;
  var r2 = 2*r;

  if (((dy<r2)&&(dy>-r2))||((dx<r2)&&(dx>-r2))){

    // distance^2 between ball i and ball j
    var d = (ball1.x-ball2.x)*(ball1.x-ball2.x)+(ball1.y-ball2.y)*(ball1.y-ball2.y);

    // too close!
    if (d<(r2*r2)){
      // There is "real" collision only if they approach each other
      if (((ball1.vx*dx+ball1.vy*dy)-(ball2.vx*dx+ball2.vy*dy))<0){
        // Physics of collision
        var txi = (ball2.vx*dx*dx + ball2.vy*dx*dy + ball1.vx*dy*dy - ball1.vy*dx*dy)/d;
        var tyi = (ball2.vx*dx*dy + ball2.vy*dy*dy - ball1.vx*dx*dy + ball1.vy*dx*dx)/d;
        var txj = (ball1.vx*dx*dx + ball1.vy*dx*dy + ball2.vx*dy*dy - ball2.vy*dx*dy)/d;
        ball2.vy     = (ball1.vx*dx*dy + ball1.vy*dy*dy - ball2.vx*dx*dy + ball2.vy*dx*dx)/d;
        ball1.vx = txi; ball1.vy = tyi;
        ball2.vx = txj;
      } 
    }
  }
};