;(function(){

	"use strict";

	var cradle = require('cradle');

	// config
	var config = {
		database: 'runs',
		host: '127.0.0.1',
		port: 5984,
		view: 'runs'
	};

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