;(function(){

	"use strict";

	var cradle = require('cradle');

	// config
	var config = require('cat-settings').loadSync(__dirname + '/config.json');

	// connect to db
	var connection = new cradle.Connection(config.host, config.port),
		db = connection.database(config.database);

	// lazy-create db
	createDb(db);

	// helpers
	function createDb (db) {

		db.exists(function (err, exists) {

			if (err) {
				throw new Error (err);
			}

			if (!exists) {
				db.create();
				console.log('db created!');
			} else {
				console.log('db already exists!');
			}

		});

	}

})();