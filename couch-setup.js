;(function(){

	"use strict";

	var cradle = require('cradle'),
		when = require('when');

	// config
	var config = require('cat-settings').loadSync(__dirname + '/config.json');

	// connect to db
	var connection = new cradle.Connection(config.host, config.port),
		db = connection.database(config.database);

	// lazy-create db
	createDb(db)
	.then(createView);

	// helpers
	function createDb (db) {

		var deferred = when.defer();

		db.exists(function (err, exists) {

			if (err) {
				throw new Error (err);
			}

			if (!exists) {
				db.create();
				console.log('db created!');
				deferred.resolve(db);
			} else {
				console.log('db already exists!');
				deferred.reject();
			}

		});

		return deferred.promise;

	}

	function createView (db) {

		db.save('_design/runs', {
			views: {
				list: {
					map: 'function (doc){ emit(doc.mean, doc.stddev) }'
				}
			}
		});

		console.log('view created!');

	}

})();