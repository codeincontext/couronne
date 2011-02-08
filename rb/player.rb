class Player
  attr_accessor :socket
  def initialize(socket)
    self.socket = socket
  end
end