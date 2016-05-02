
var socket  = require( 'socket.io' );
var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
var io      = socket.listen( server );
var port    = process.env.PORT || 3000;




console.log("kj,");

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});


io.on('connection', function (socket) {
   

  socket.on( 'new_count_message', function( data ) {
    io.sockets.emit( 'new_count_message', { 
    	new_count_message: data.new_count_message

    });
  });

  socket.on( 'update_count_message', function( data ) {
    io.sockets.emit( 'update_count_message', {
    	update_count_message: data.update_count_message 
    });
  });

 

  socket.on( 'new_message', function( data ) {
    io.sockets.emit( 'new_message', {
    	mensaje: data.mensaje,
      id_chat: data.id_chat,
      tipo: data.tipo
   
    });
    console.log(data);
  }); 

    socket.on( 'new_contact', function( data ) {
    io.sockets.emit( 'new_contact', {
      name: data.mensaje,
      id: data.id_chat
    });
    console.log(data);
  }); 

  
});
