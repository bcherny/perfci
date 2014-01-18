;(function(){
	"use strict";

	var port = 1234;

	var koa = require('koa'),
		config = require('cat-settings').loadSync(__dirname + '/config.json'),
		cradle = require('cradle'),
		when = require('when');

	var db = new cradle
		.Connection(config.db.host, config.db.port)
		.database(config.db.database);

	koa()

	// middleware
	
	.use(function *() {

		this.body = yield read();

	})

	// start server!

	.listen(port);

	// helpers

	function query () {

		var deferred = when.defer();

		db.view('runs/list', function (err, doc) {

			if (err) {
				deferred.reject('Error!' + err);
			} else {
				deferred.resolve(JSON.stringify(doc));
			}

		});

		return deferred.promise;

	}

	function read () {

		return query().then(function (data) {

			return data;

		}, function (err) {

			return err;

		});

	}

})();