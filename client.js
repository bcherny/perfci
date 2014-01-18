;(function(){
	"use strict";

	var request = require('browser-request'),
		when = require('when');

	load('config.json').then(function (config) {

		load(config.http.host + ':' + config.http.port).then(function (data) {
			console.log(data);
		}, function (err) {
			throw err;
		});

	}, function (err) {
		throw err;
	});

	// helpers

	function load (url) {

		var deferred = when.defer();

		request(url, function (err, res) {

			if (err) deferred.reject(err);
			
			deferred.resolve(JSON.parse(res.body));

		});

		return deferred.promise;

	}

})();