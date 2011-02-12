class Cue
  attr_accessor :x, :y, :vx, :vy
  def initialize
    self.x = 300
    self.y = 300
    self.vx = 0
    self.vy = 0
  end
  def move
    friction = 0.99
    self.vx *= friction
    self.vy *= friction
    self.vx = self.vy = 0 if (vy < 0.1 && vy > -0.1 && vx < 0.1 && vx > -0.1)
    # displace the ball
    self.vx = -vx if( x<20 || x>Game::width-20)
    self.vy = -vy if( y<20 || y>Game::height-20)
    self.x += vx
    self.y += vy
  end
  def to_json(*a){
      :x=>x,
      :y=>y,
      :vx=>vx,
      :vy=>vy
    }.to_json(*a)
  end
end