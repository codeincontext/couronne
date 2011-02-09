class Cue
  attr_accessor :x, :y, :vx, :vy
  def initialize
    self.x = 300
    self.y = 300
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