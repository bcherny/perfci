;(function(){

	"use strict";

	var fs = require('fs'),
		perfci = require('./perfci'),
		args = process.argv;

	if (args.length < 3) {
		throw new Error('perfci cli expects files to be passed, eg. "node cli foo.js bar.js"');
	}

	args
	.slice(2)
	.forEach(function(file) {

		fs.exists(file, function (exists) {

			if (!exists) {
				throw new Error('File "' + file + '" does not exist!');
			}

		});

	})
	.forEach(function(file) {

		perfci(require(file));

	});



})();