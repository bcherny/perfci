;(function(){

	"use strict";

	var koa = require('koa'),
		cors = require('koa-cors'),
		when = require('when'),
		Logger = require('yal');

	function start (opts) {

		// init logger
		var log = new Logger('tcp://' + opts.config.logger.host + ':' + opts.config.logger.port);

		// init server
		(module.exports.server = koa())

		// allow cross-origin
		.use(cors())

		// middleware
		.use(function *() {

			this.body = yield read(opts);

		})

		// start server!
		.listen(opts.config.http.port);

		// log
		if (opts.config.debug) {
			log.info('Started HTTP server on port ' + opts.config.http.port);
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