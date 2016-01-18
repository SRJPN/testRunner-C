exports.grepTestNames = function(fileContent) {
    var tests = fileContent.match(/(\btest_\w+)/g);
    if(tests == null) return [];
    return tests;
};

exports.makeTestFile = function(libFile, testName, template, writeFile){
	var file = './main.c';
	var main = template.replace('FILENAME',libFile).replace('TEST',testName);
	writeFile(file, main);
	return file;
};

exports.compileTestFile = function(path, template, dependencies, excute){
	var cmd = template.replace('FILENAME',path).replace('DEPENDENCIES',dependencies ? dependencies.join(' ') : '');
	try{
		var result = excute(cmd);
		return result.toString();
	}
	catch(e){
		return {error:e.message};
	}
}
