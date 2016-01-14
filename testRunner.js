var fs = require('fs');
var childProcess = require('child_process');
var cmd = require('command-line-args');

var cli = cmd([
	{ name: 'only', alias: 'o', type: String },
	{ name: 'file', alias: 'f', type: String, defaultOption:true},
	{ name: 'dependencies', alias: 'd', type: String, multiple: true}
]);

var parseCmd = function(){
	var options;
	try{
		options = cli.parse();
		if(!options.file)
			throw new Error;
		return options;
	}
	catch(err){
		printUsage();
		process.exit(0);
	}
};

var printUsage = function(){
	console.log("Usage:\n\tnode testRunner -f testFileName -d [dependencies]\n");
}

parseCmd();


