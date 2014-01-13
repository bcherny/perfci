;(function(){

	"use strict";

	var config = {
			db: {
				database: 'runs',
				host: '127.0.0.1',
				port: 5984
			}
		},
		cradle = require('cradle'),
		suite = require('./sample-bench');

	function save (data) {



		return data;

	}

	function toArray (arraylike) {
		return [].slice.call(arraylike);
	}

	function log () {
		toArray(arguments).forEach(function (arg) {
			console.info('perfci:', arg);
		});
	}

	function normalizeStats (raw) {
		return {
			mean: raw.mean,
			stddev: raw.deviation,
			count: raw.sample.length
		};
	}

	function complete () {

		var data = normalizeStats(this[0].stats);

		log(data);
		save(data);
	}

	function cycle (event) {
		log('cycle ' + event.target.stats.mean);
	}

	function init () {

		// configure db
		cradle.setup({
			host: '127.0.0.1',
			port: 5984
		});

		// connect to db
		var connection = new cradle.Connection(config.db.host, config.db.port),
			db = connection.database(config.db.database);

		// run benchmark
		suite
		.on('cycle', cycle)
		.on('complete', complete)
		.run();

	}

	init();

})();