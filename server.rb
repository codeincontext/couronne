require 'rubygems'
require 'eventmachine'
require 'em-websocket'
require 'json'

class Ball
  attr_accessor :x, :y
 
  def initialize(x, y)
    self.x = x
    self.y = y
  end
  def to_json(*a){
      :x=>x,
      :y=>y
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