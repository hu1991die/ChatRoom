
//import http module，use for creating http Server
var http = require('http');

//import scoket.io module
var socketio = require('socket.io');

//import fs module,use for reading file
var fs = require('fs');

/**
 * use http module for creating App
 */

//use http.createServer() for creating http server
//handle the request from browser

var app = http.createServer(function(req,res){
	//fs.readFile() use to read files
	//here is reading index.html file
	//after now we will create a index.html file
	fs.readFile(__dirname + '/index.html',function(err,data){
		if(err){
			res.writeHead(500);
			return res.end('Error loading index.html');
		}
		//return request state code
		res.writeHead(200);
		//return the content of reading to browser
		res.write(data);
//		console.log(data.toString());
		console.log(data);
		res.end();
	});
}).listen(8080);//the listen() function use for listening http server to appointed 
//IP address and port ,localhost is the default host..

console.log('Server running at http://127.0.0.1:8080/');

//create Socket.IO server on the same address and port of app
var io = socketio(app);

/**
 * send the message of user to all clients
 */
io.on('connection',function(socket){
	socket.on('chat',function(data){
//		console.log(data.toString());
		console.log(data);
		
		//create sendmsg event and send chat message to client
		io.emit('sendmsg',data);
	});
});
