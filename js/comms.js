var socket;
var gotBalls = false;

function setup(){
  connect();
  setInterval(tick,10);
};

function send(string){
  socket.send(string);
}

function connect(){
  socket = new WebSocket('ws://89.105.122.152:80');
  socket.onmessage = function(mess) {
    $('#loading').hide();
    data = $.parseJSON(mess.data);
    console.log(data['type']);
    switch(data['type']){
    case 'init':
      balls = data['balls'];
      cue.x = data['cue'].x;
      cue.y = data['cue'].y;
      cue.vx = data['cue'].vx;
      cue.vy = data['cue'].vy;
      data = null;
      break;
    case 'move':
      cue.vx = data['cue'].vx;
      cue.vy = data['cue'].vy;
      data = null;
      animating = true;
      break;
    case 'sync':
      break;
    default:
      alert('bugger');
      console.log(data);
      break;
    }
  };
};

window.onload += setup();