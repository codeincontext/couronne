class Ball
  attr_accessor :x, :y, :vx, :vy, :red
  def initialize(x, y, red)
    self.x = x
    self.y = y
    self.vx = 0
    self.vy = 0
    self.red = red
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
  def checkCollision(ball)
    r = 20
    dy = self.y - ball.y
    dx = self.x - ball.x
    r2 = 2*r

    if (((dy<r2)&&(dy>-r2))||((dx<r2)&&(dx>-r2)))

      # distance^2 between ball i and ball j
      d = (self.x-ball.x)*(self.x-ball.x)+(self.y-ball.y)*(self.y-ball.y)

      # too close!
      if (d<(r2*r2))
        # There is "real" collision only if they approach each other
        if (((self.vx*dx+self.vy*dy)-(ball.vx*dx+ball.vy*dy))<0)
          # Physics of collision
          txi = (ball.vx*dx*dx + ball.vy*dx*dy + self.vx*dy*dy - self.vy*dx*dy)/d
          tyi = (ball.vx*dx*dy + ball.vy*dy*dy - self.vx*dx*dy + self.vy*dx*dx)/d
          txj = (self.vx*dx*dx + self.vy*dx*dy + ball.vx*dy*dy - ball.vy*dx*dy)/d
          ball.vy = (self.vx*dx*dy + self.vy*dy*dy - ball.vx*dx*dy + ball.vy*dx*dx)/d
          self.vx = txi
          self.vy = tyi
          ball.vx = txj
        end
      end
    end
  end
  def to_json(*a){
      :x=>x,
      :y=>y,
      :vx=>vx,
      :vy=>vy,
      :red=>red
    }.to_json(*a)
  end
end