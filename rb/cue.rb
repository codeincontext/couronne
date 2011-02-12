require 'ball'
class Cue < Ball
  attr_accessor :x, :y, :vx, :vy
  def initialize
    reset
  end
  def reset
    self.x = 300
    self.y = 300
    self.vx = 0
    self.vy = 0
  end
end