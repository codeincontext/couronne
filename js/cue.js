function Cue (x, y) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.move=move;
  function move(){
    var friction = 0.99
    this.vx *= friction;
    this.vy *= friction;
    if (this.vy < 0.1 && this.vy > -0.1 && this.vx < 0.1 && this.vx > -0.1) {this.vx = 0; this.vy = 0;}
    // displace the ball
    if( this.x<20 || this.x>width-20) this.vx=-this.vx;
    if( this.y<20 || this.y>height-20) this.vy=-this.vy;
    this.x+=this.vx;
    this.y+=this.vy;
  };
  this.checkCollision = false;
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