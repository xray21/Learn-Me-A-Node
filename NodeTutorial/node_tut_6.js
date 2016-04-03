// Node Tutorial 6-1
var fs, data, readerStream;

fs = require("fs");
/*data = "";

readerStream = fs.createReadStream("input.txt");
readerStream.setEncoding("UTF8");
readerStream.on("data", function(chunk){
	data += chunk;
});

readerStream.on("end", function(){
	console.log(data);
});

readerStream.on("error", function(){
	console.log(err.stack);
});

console.log("Program 6-1 Ended.");

// Node Tutorial 6-2
var data2, writerStream;
data2 = "Simple Easy Learning";

writerStream = fs.createWriteStream("output.txt");
writerStream.write(data2, "UTF8");
writerStream.end();

writerStream.on("finish", function(){
	console.log("Write Completed.");
});

writerStream.on("error", function(err){
	console.log(err.stack);
});

console.log("Program 6-2 Ended.");

// Node Tutorial 6-3
readerStream = fs.createReadStream("input.txt");
writerStream = fs.createWriteStream("output.txt");

readerStream.pipe(writerStream);

console.log("Program 6-3 ended");

// Node Tutorial 6-4
*/
var zlib;

zlib = require("zlib");
/*
fs.createReadStream("input.txt")
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream("input.txt.gz"));
  
console.log("Program 6-4 Ended");
*/
// Node Tutorial 6-5
fs.createReadStream("input.txt.gz")
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream("input2.txt"));
  
console.log("Program 6-5 Ended");

