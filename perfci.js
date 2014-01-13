;(function(){

	"use strict";

	var config = require('cat-settings').loadSync(__dirname + '/config.json'),
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

		// connect to db
		var connection = new cradle.Connection(config.host, config.port),
			db = connection.database(config.database);

		// run benchmark
		suite
		.on('cycle', cycle)
		.on('complete', complete)
		.run();

	}

	init();

})();