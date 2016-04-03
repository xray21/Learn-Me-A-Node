var express = require("express");
var app = express();
var fs = require("fs");

var usersPath = __dirname + "/" + "users.json"
var user4 = {
   "name" : "mohit",
	"password" : "password4",
	"profession" : "teacher",
	"id": 4
}

app.get("*.htm*", function(req, res){
	var response = {message:"You can't do that."}
		
	res.end(JSON.stringify(response));
});

app.get("/", function(req, res){
	res.sendFile(__dirname + "/" + "index.htm");
});

app.get("/users", function(req, res){
	console.log("GET Request received at '/users' endpoint");
	
	fs.readFile(usersPath, "utf8", function(err, data){
		console.log(data);
		
		res.end(data);
	});
});

app.get("/users/:id", function(req, res){
	console.log("GET Request received at '/users/:id' endpoint");
	
	fs.readFile(usersPath, "utf8", function(err, data){
		users = JSON.parse(data);
		user = users["user" + req.params.id];
		
		console.log(user);
		
		res.end( JSON.stringify(user) );
	});
});

app.post("/users", function(req, res){
	console.log("POST Request received at '/users' endpoint");
	
	fs.readFile(usersPath, "utf8", function(err, data){
		users = JSON.parse(data);
		users["user4"] = user4;
		
		console.log(users);
		
		res.end( JSON.stringify(users) );
	});
});

app.delete("/users/:id", function(req, res){
	console.log("DELETE Request received at '/users/:id' endpoint");
	
	fs.readFile(usersPath, "utf8", function(err, data){
		users = JSON.parse(data);
		delete users["user" + req.params.id];
		
		console.log(user);
		
		res.end( JSON.stringify(user) );
	});
});

var server = app.listen(8081, function(){
	console.log(server.address());
});