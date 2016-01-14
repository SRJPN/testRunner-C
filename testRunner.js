var fs = require('fs');
var childProcess = require('child_process');
var cmd = require('./optionHandler');

var options =  cmd.parse();
if(!options) process.exit();
