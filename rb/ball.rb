class Ball
  attr_accessor :x, :y, :vx, :vy
  def initialize(x, y)
    self.x = x
    self.y = y
    self.vx = 0
    self.vy = 0
  end
  def to_json(*a){
      :x=>x,
      :y=>y,
      :vx=>vx,
      :vy=>vy
    }.to_json(*a)
  end
end