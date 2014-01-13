;(function(){

	"use strict";

	var config = require('cat-settings').loadSync(__dirname + '/config.json'),
		cradle = require('cradle');

	new cradle
	.Connection(config.host, config.port)
	.database(config.database)
	.get('', function (err, doc) {

		if (err) {
			console.error(err);
		} else {
			console.log (doc);
		}

	});
		
})();