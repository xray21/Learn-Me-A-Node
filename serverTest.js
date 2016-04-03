var express = require("express");
var fs = require("fs");
var r = require("rethinkdb");
var mustache = require("mustache")
var mustacheExpress = require("mustache-express");

var app = express();

app.use(express.static("assets"));

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

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
	
	connectToDB((conn) => {
		r.table("authors").run(conn, (err, cursor) => {
			cursor.toArray((err, result) => {
				handleErr(err);
				logJSON(result);
				
				var result = { authors: result };
				
				getTemplate("authors", (tmpl) => {
					var pageContent = mustache.render(tmpl, result);
					 
					var data = {
						pageTitle: "Authors",
						pageContent: pageContent
					}
					
					res.render("mainView", data);
				});
			});
		});
	});
});

app.get("/authors/:id", (req, res) => {
	console.log("GET Request received at '/authors/:id' endpoint");
	
	id = req.params.id
	
	connectToDB((conn) => {
		r.table("authors")
		  .get(id)
		  .run(conn, (err, result) => {
			handleErr(err);
			logJSON(result);
			
			res.end(JSON.stringify(result, null, 2));
		});
	});
});

app.delete("/authors/:id", (req, res) => {
	console.log("DELETE Request received at '/authors/:id' endpoint");
	
	id = req.params.id
	
	connectToDB((conn) => {
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

app.post("/authors", (req, res) => {
	console.log("POST Request received at '/authors' endpoint");
});


/**************************/
/**** HELPER FUNCTIONS ****/
/**************************/
function connectToDB(callback){
	r.connect( {host: 'localhost', port: 28015}, (err, conn) =>	{
		handleErr(err);
		
		callback(conn);
	});
}

function getTemplate(templateName, callback){
	fs.readFile(__dirname + "/views/" + templateName + ".mustache", (err, data) => {
		handleErr(err);
		
		callback(data.toString());
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