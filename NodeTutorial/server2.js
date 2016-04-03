var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded( {extended:false} );

app.get("*.htm*", function(req, res){
	var response = {message:"You can't do that"}
		
	res.end(JSON.stringify(response));
});

app.get("/", function(req, res){
	res.sendFile(__dirname + "/" + "index.htm");
});

app.post("/submitName", urlencodedParser, function(req, res){
	response = {
		firstName: req.body.first_name,
		lastName: req.body.last_name
	};
	
	console.log(response);

	res.end(JSON.stringify(response));
});

var server = app.listen(8081, function(){
	var host = server.address().address;
	var port = server.address().port;
	
	console.log("Example app listening at http://%s:%s", host, port);
});