function Pit (x, y) {
  this.x = x;
  this.y = y;
  this.radius = 30
}
function pitDeath(pit, ball){
  return (dist(ball.x, ball.y, pit.x, pit.y) < pit.radius-5)
};