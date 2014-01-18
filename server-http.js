;(function(){

	"use strict";

	var koa = require('koa'),
		config = require('cat-settings').loadSync(__dirname + '/config.json'),
		cors = require('koa-cors'),
		when = require('when');

	module.exports = function (db) {

		// init server

		koa()

		// allow cross-origin
		
		.use(cors())

		// middleware
		
		.use(function *() {

			this.body = yield read(db);

		})

		// start server!

		.listen(config.http.port);

	};


	//
	// helpers
	//


	function query (db) {

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

	function read (db) {

		return query(db).then(function (data) {

			return data;

		}, function (err) {

			return err;

		});

	}

})();