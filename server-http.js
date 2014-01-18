;(function(){

	"use strict";

	var koa = require('koa'),
		config = require('cat-settings').loadSync(__dirname + '/config.json'),
		cors = require('koa-cors'),
		when = require('when');

	function start (opts) {

		// init server
		(module.exports.server = koa())

		// allow cross-origin
		.use(cors())

		// middleware
		.use(function *() {

			this.body = yield read(opts);

		})

		// start server!
		.listen(config.http.port);

		// log
		if (config.debug) {
			console.info('Started HTTP server on port ' + config.http.port);
		}

	}

	module.exports = {
		server: null,
		start: start
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

	function read (opts) {

		return query(opts.db).then(function (data) {

			return data;

		}, opts.error);

	}

})();