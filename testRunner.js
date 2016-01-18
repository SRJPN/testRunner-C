var fs = require('fs');
var childProcess = require('child_process');
var cmd = require('command-line-args');
var lib = require('./lib');
var optionHandler = require('./optionHandler');
const TEMPLATE = '#ifndef "FILENAME"\n#include "FILENAME"\n#endif\nint main(){\nTEST();\nreturn 0;\n}';
const GCC_TEMPLATE = 'gcc FILENAME -o test.exe DEPENDENCIES';
const COMPILE_TEMPLATE = 'gcc -c FILENAME DEPENDENCIES';
const RUN_TEMPLATE = './test';

var cli = cmd([
	{ name: 'only', alias: 'o', type: String },
	{ name: 'file', alias: 'f', type: String, defaultOption:true},
	{ name: 'dependencies', alias: 'd', type: String, multiple: true}
]);

var options =  optionHandler.parse(cli);
if(options.error) {
	printUsage();
	process.exit(1);
};
if(!fs.statSync(options.file).isFile()){
	console.log('File not found');
	process.exit(1);
}

var printError = function(msg){
	console.log(msg);
}

var compile = lib.compileTestFile(options.file, COMPILE_TEMPLATE, options.dependencies, childProcess.execSync);

if(compile.error){
	printError(compile.error);
	process.exit(1);
};

var fileContent = fs.readFileSync(options.file,'utf-8');

var tests = lib.grepTestNames(fileContent);

if(!tests.length){
	printError('No Tests found');
	process.exit(1);
}

tests.forEach(function(test){
	var dependencies = [options.file].concat(options.dependencies)
	var path = lib.makeTestFile(options.file, test, TEMPLATE, fs.writeFileSync);
	lib.compileTestFile(path, GCC_TEMPLATE, dependencies, childProcess.execSync);
	
	// runTest(RUN_TEMPLATE) || printRunTimeError();
});

// 	printSummary();

var printUsage = function(){
	console.log("Usage:\n\tnode testRunner -f testFileName -d [dependencies]\n");
}
