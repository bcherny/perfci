;(function(){

	"use strict";

	var config = require('cat-settings').loadSync(__dirname + '/config.json'),
		cradle = require('cradle');

	new cradle
	.Connection(config.db.host, config.db.port)
	.database(config.db.database)
	.view('runs/list', function (err, doc) {

		if (err) {
			console.error(err);
		} else {
			console.log (doc);
		}

	});
		
})();