var net = require("net");
var port = 2000;
var fs = require("fs");


var server = net.createServer(function(connection){

	connection.write("ask me a question\n");
	
	connection.on("data", function(data){

		var newString = data.toString().trim().toLowerCase();
		var newArray = newString.split("");
		var markIndex = (newArray.length - 1);
		console.log(markIndex);
		if (newArray[markIndex] === "?"){
			console.log("yes there is a question mark\n");
			connection.write("good question!\n");

			var answers = fs.readFileSync("./data.json", "utf8");
			var parsed = JSON.parse(answers);

			var randomNumber = Math.floor((Math.random() * 10) + 1);
			console.log(randomNumber);

			connection.write(parsed[randomNumber] + "\n");

		} else {
			connection.write("ask a real question\n");
			console.log("no there is no question mark");
		}
	})

});




server.listen(port, function(){
	console.log("listening");
});