class Pit
  attr_accessor :x, :y
  def initialize(x,y)
    self.x = x
    self.y = y
  end
  def munch(ball)
    dist(ball.x, ball.y, x, y) < Pit::radius-5
  end
  def self.radius
    30
  end
end