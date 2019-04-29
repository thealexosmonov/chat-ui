var express = require('express'); // Forces application to require Express framework
var socket = require('socket.io');


// App Constructor

var app = express();
var server = app.listen(3000, function(){
    console.log("App Started ... Live on Port 3000"); // Outputs that server is live
});

// Static Files
app.use(express.static('public'));

//

var io = socket(server);

var names = {};    // maps socket.id => name
var avatar = {};  // maps socket.id => avatar
var liveSockets = {}; // map socket.id => socket

io.on('connection', function(socket){
    console.log('Server is Online ... Connection has been made, Socket: ', socket.id);


    socket.on('newMessage', function(data){  // How the server handles a new incoming message
        io.sockets.emit('newMessage', data);
        liveSockets[socket.id] = socket;
        names[socket.id] = data.user;
        console.log('New Message Received at Server');

    });

    socket.on('userTyping', function(data){ // Monitors whether another user is typing
        socket.broadcast.emit('userTyping', data);
    });


    socket.on('avatarPick', function(data){
        console.log('Avatar 1 Picked and sent to server');
        io.sockets.emit('avatarPick', data);

    });
});

io.on('disconnect', function(socket){
    console.log("Server is Online ... Socket: " + socket.id +  "Disconnected" );

    });
