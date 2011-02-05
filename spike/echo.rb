#!/usr/bin/env ruby

require 'rubygems'
require 'eventmachine'

module EchoServer
  def post_init
    puts "-- someone connected to the echo server!"
  end
  def receive_data(data)
    send_data(data)
  end
  def unbind
    puts "-- someone disconnected from the echo server!"
  end
end

EventMachine::run do
  host = '0.0.0.0'
  port = 8080
  EventMachine::start_server host, port, EchoServer
  puts "Started EchoServer on #{host}:#{port}…"
end