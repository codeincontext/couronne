var socket;

function setup(){
  connect();
  setInterval(tick,10);

  $(document).keypress(function(e){
    var char = String.fromCharCode(e.keyCode);
    socket.send(char);
  });
};

function connect(){
  socket = new WebSocket('ws://127.0.0.1:8080');
  socket.onmessage = function(mess) {
    var data = $.parseJSON(mess.data);
    // var data = JSON.parse(mess.data);
    console.log(data);
    
    balls = data['balls'];
    // console.log(data['balls']);
    // console.log(data['balls'][0]);
    // balls = data['balls'];
  };

};

window.onload += setup();