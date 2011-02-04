var socket;
var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function animateCharacter(letter){
  var upper = letter.toUpperCase();
  $('#character_' + upper)
    .stop(true,true)
    .animate({ opacity: 1}, 100)
    .animate({ opacity: .2}, 100);
}

function setup(){
  var target = $('#alphabet');
  for(var i = 0; i <=alphabet.length; i++){
    var char = alphabet.charAt(i);
    target.append('<span id="character_' + char +'">' + char + '</span');
  }
  connect();

  $(document).keypress(function(e){
    var char = String.fromCharCode(e.keyCode);
    socket.send(char);
  });
};

function connect(){
  socket = new WebSocket('ws://h.jxs.me:8080');
  socket.onmessage = function(mess) {
    animateCharacter(mess.data);
  };

};

window.onload += setup();