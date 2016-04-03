var express = require("express");
var app = express();
var fs = require("fs");
var r = require("rethinkdb");
var conn = null;
var mustache = require("mustache-express");

/****************/
/**** ROUTES ****/
/****************/
app.get("*.htm*", (req, res) => {
	res.end(JSON.stringify({message:"You can't do that."}));
});

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/" + "index.htm");
});

app.get("/authors", (req, res) => {
	console.log("GET Request received at '/authors' endpoint");
	
	connectToDB(() => {
		r.table("authors").run(conn, (err, cursor) => {
			cursor.toArray((err, result) => {
				handleErr(err);
				logJSON(result);
				
				res.end(JSON.stringify(result, null, 2));
			});
		});
	});
});

app.get("/authors/:id", (req, res) => {
	console.log("GET Request received at '/authors/:id' endpoint");
	
	id = req.params.id
	
	connectToDB(() => {
		r.table("authors")
		  .get(id)
		  .run(conn, (err, result) => {
			handleErr(err);
			logJSON(result);
			
			res.end(JSON.stringify(result, null, 2));
		});
	});
});

app.delete("/authors/:id", function(req, res){
	console.log("DELETE Request received at '/authors/:id' endpoint");
	
	id = req.params.id
	
	connectToDB(() => {
		r.table("authors")
		  .get(id)
		  .delete()
		  .run(conn, (err, result) => {
			handleErr(err);
			logJSON(result);
			
			res.end(JSON.stringify(result, null, 2));
		});
	});
});

/*app.post("/users", function(req, res){
	console.log("POST Request received at '/users' endpoint");
	
	fs.readFile(usersPath, "utf8", function(err, data){
		users = JSON.parse(data);
		users["user4"] = user4;
		
		console.log(users);
		
		res.end( JSON.stringify(users) );
	});
});

*/

/**************************/
/**** HELPER FUNCTIONS ****/
/**************************/
function connectToDB(callback){
	r.connect( {host: 'localhost', port: 28015}, function(err, connection) {
		if (err) throw err;
		conn = connection;
		
		callback();
	});
}

function handleErr(err){
	if (err){
		throw err;
	}
};

function logJSON(obj){
	console.log(JSON.stringify(obj, null, 2));
}

var server = app.listen(8081, function(){
	console.log(server.address());
});