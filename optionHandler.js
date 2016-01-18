var parse = function(cli){
	var options;
	try{
		options = cli.parse();
		if(!options.file)
			throw new Error('no test file');
		return options;
	}
	catch(err){
		return {error:err.message};
	}
};

exports.parse = parse;
