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
        if @games.empty?
          game = Game.new(player)
          @games << game
        else
          game = @games.first
          game.players << player
        end
        socket.send({:balls=>game.balls, :cue=>game.cue}.to_json)
      rescue Exception => e
          puts e.inspect
          puts e.backtrace
      end
    end
    socket.onmessage do |mess|
      puts "move received"
      puts "socket in #{socket.object_id}"
      array = mess.split '/'

      player = @players.find{|p| p.socket == socket }
      # game = @games.find{|g| g.players.include? player }
      game = @games.first

      game.cue.vx = array[0]
      game.cue.vy = array[1]
      # # game.move(player, array[0], array[1])
      game.other_players(player).each do |p|
        p.socket.send({:cue=>game.cue}.to_json)
        puts "socket out #{p.socket.object_id}"
      end
    end
    socket.onclose do
      player = @players.find{|p| p.socket = socket }
      game = @games.find{|g| g.players.include? player}
      game.players.delete player
      @players.delete player
      puts 'user left'
    end
  end
  
  # `open /Users/skattyadz/code/couronne/game.html`
end