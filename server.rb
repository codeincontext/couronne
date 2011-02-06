require 'rubygems'
require 'eventmachine'
require 'em-websocket'
require 'json'

width = 500
height = 500
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
class Cue
  attr_accessor :x, :y
 
  def initialize
    self.x = 200
    self.y = 200
  end
end

class Pit
  attr_accessor :x, :y
  def initialize(x,y)
    self.x = x
    self.y = y
  end
end

pits = []
pits[0] = Pit.new(75,75)
pits[1] = Pit.new(width-75, 75)
pits[2] = Pit.new(75, height-75)
pits[3] = Pit.new(width-75, height-75)

def dist(x1, y1, x2, y2)
  x_diff = (x1-x2) ** 2
  y_diff = (y1-y2) ** 2
  res = Math.sqrt( x_diff + y_diff )
  res<0 ? -res : res
end
cue = Cue.new
balls = []
10.times do
  ballX = 0
  ballY = 0
  overlap = false
  begin
    overlap = false
    ballX = 50+rand(400)
    ballY = 50+rand(400)

    balls.each do |ball|
      if (dist(ball.x, ball.y, ballX, ballY) < 40)
        overlap = true
      end
    end
    if (dist(cue.x, cue.y, ballX, ballY) < 40)
      overlap = true
    end
    pits.each do |pit|
      if (dist(pit.x, pit.y, ballX, ballY) < 40)
        overlap = true
      end
    end
  end while overlap==true

  balls << Ball.new(ballX, ballY)
end

@sockets = []
EventMachine.run do
  EventMachine::WebSocket.start(:host => '0.0.0.0', :port => 8080) do |socket|
    socket.onopen do
      @sockets << socket
      socket.send({:balls=>balls}.to_json)
    end
    socket.onmessage do |mess|
      @sockets.each {|s| s.send mess}
    end
    socket.onclose do
      @sockets.delete socket
    end
  end
end