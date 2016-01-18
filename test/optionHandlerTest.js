var lib = require('../optionHandler');
var assert = require('assert');
var sinon = require('sinon');

describe('optionHandler',function(){
	describe('parse',function(){
		it('parses the command line arguments into object',function(){
			var cli = {};
			cli.parse = sinon.stub().returns({file:'app.c'});
			var options = lib.parse(cli);
			assert.ok(options.file == 'app.c');
		});
		it('gives undefined if the file name is not given',function(){
			var cli = {};
			cli.parse = sinon.stub().returns({});
			var options = lib.parse(cli);
			assert.ok(options.error);
		});
	});
});