class Game
  attr_accessor :cue, :players, :pits
  attr_accessor :players, :balls

  def self.width
    500
  end
  def self.height
    500
  end

  def initialize(player)
    self.balls = []
    self.pits = []
    self.players = []
    self.players << player
    
    pits << Pit.new(75,75)
    pits << Pit.new(Game::width-75, 75)
    pits << Pit.new(75, Game::height-75)
    pits << Pit.new(Game::width-75, Game::height-75)
    
    self.cue = Cue.new
    10.times {generate_ball}
  end
  def add_player(player)
    raise unless players.length > 1
  end

  def generate_ball
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

  def other_players(player)
    players.reject{|p| p==player}
  end
end