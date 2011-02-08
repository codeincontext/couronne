require 'rubygems'
require 'eventmachine'
require 'em-websocket'
require 'json'

require 'pit'
require 'cue'
require 'ball'
require 'game'
require 'player'

width = 500
height = 500

def dist(x1, y1, x2, y2)
  x_diff = (x1-x2) ** 2
  y_diff = (y1-y2) ** 2
  res = Math.sqrt( x_diff + y_diff )
  res<0 ? -res : res
end

@games = []
@players = []
EventMachine.run do
  EventMachine::WebSocket.start(:host => '0.0.0.0', :port => 8080) do |socket|
    socket.onopen do
      begin
        puts 'user joined'
        # player = Player.new
        player = Player.new(socket)
        @players << player
        game = Game.new(player)
        @games << game
        socket.send({:balls=>game.balls}.to_json)
      rescue Exception => e
          puts e.inspect
          puts e.backtrace
      end
    end
    socket.onmessage do |mess|
      puts "move received"
      array = mess.split '/'
      # puts array
      player = @players.find{|p| p.socket = socket }
      game = @games.find{|g| g.players.include? player }
      # game.move(socket, array[0], array[1])
      game.other_players(player).each do |s|
        s.send mess
      end
    end
    socket.onclose do
      # puts @games.inspect
      # player = @players.find{|p| p.socket = socket }
      # game = @games.find{|g| g.players.include player}
      # game.players.delete player
      # @players.delete player
      puts 'user left'
    end
  end
  
  `open /Users/skattyadz/code/couronne/game.html`
end