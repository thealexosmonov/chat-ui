// Connect with Socket.io

var socket = io.connect("http://localhost:3000");


// Query Information

var message = document.getElementById('message');
var user = document.getElementById('user');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');
var avatar = document.getElementById('avatar');
var a1 = document.getElementById('a1');
var colors = ['#ff0000', '#00ff00', '#0000ff'];
var random_color = colors[Math.floor(Math.random() * colors.length)];


// Emit Events/Messages back to Server

btn.addEventListener("click", function(){ // Sends information to server if send button hit
    if (message.value != ''){
        socket.emit('newMessage', {
            message: message.value,
            user: user.value,

        });
    }
    document.getElementById("message").value= "";
    // document.getElementById("user").value= "";

});

a1.addEventListener('click', function(){ // Sends information to server if avatar1 button hit
    socket.emit('avatarPick', {
        a1: a1.src,
    });

});


message.addEventListener("keypress", function(){ // Sends information to server if any typing occurs
    socket.emit('userTyping', user.value);
});


// Listen for Events from Server

socket.on('newMessage', function(data) { // Outputs information obtained from server about new message
    feedback.innerHTML = '';
    console.log('New message from server');
    output.innerHTML += '<p><strong>' + data.user + ': </strong>' + data.message + '</p>';
    message.innerHTML = '';
    user.innerHTML = '';
});


socket.on('userTyping', function(data){ // Outputs that another user is typing
    feedback.innerHTML = '<p><em>' + data + ' is typing... </em></p>';
});

