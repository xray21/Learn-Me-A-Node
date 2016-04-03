var r = require("rethinkdb");

var conn = null;
r.connect( {host: 'localhost', port: 28015}, function(err, connection) {
    handleErr(err);
	
    conn = connection ;
	
	r.db("test").tableCreate("authors").run(connection, function(err, result){
		handleErr(err);
		logJSON(result);
		
		r.table('authors').insert([
			{ 
				name: "William Adama", 
				tv_show: "Battlestar Galactica",
				posts: [
					{title: "Decommissioning speech", content: "The Cylon War is long over..."},
					{title: "We are at war", content: "Moments ago, this ship received word..."},
					{title: "The new Earth", content: "The discoveries of the past few days..."}
				]
			}, { 
				name: "Laura Roslin", 
				tv_show: "Battlestar Galactica",
				posts: [
					{title: "The oath of office", content: "I, Laura Roslin, ..."},
					{title: "They look like us", content: "The Cylons have the ability..."}
				]
			}, { 
				name: "Jean-Luc Picard", 
				tv_show: "Star Trek TNG",
				posts: [
					{title: "Civil rights", content: "There are some words I've known since..."}
				]
			}
		]).run(connection, function(err, result) {
			handleErr(err);
			logJSON(result);
		})
	});
})

var handleErr = function(err){
	if (err){
		throw err;
	}
};

var logJSON = function(obj){
	console.log(JSON.stringify(obj, null, 2));
}