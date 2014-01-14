;(function(){

	"use strict";

	var fs = require('fs'),
		when = require('when'),
		perfci = require('./perfci'),
		args = process.argv;

	// check for arguments
	if (args.length < 3) {
		throw new Error('perfci cli expects files to be passed, eg. "node cli foo.js bar.js"');
	}

	// do it
	args.slice(2).forEach(exists);

	// helpers

	function exists (file) {

		var deferred = when.defer();

		fs.exists(file, function (exists) {

			if (exists) {
				run(file).then(deferred.resolve, deferred.reject);
			} else {
				deferred.reject();
			}

		});

		return deferred.promise;

	}

	function run (file) {

		var deferred = when.defer();

		perfci(require('./' + file))
		.then(
			deferred.resolve,
			deferred.reject
		);

		return deferred.promise;

	}

})();