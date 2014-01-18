;(function(){
	"use strict";

	// imports
	require('./node_modules/odometer/odometer');

	var json2html = require('json-to-html'),
		request = require('browser-request'),
		io = require('socket.io/node_modules/socket.io-client'),
		when = require('when');

	// vars
	var data = [];

	// load config file
	load('config.json').then(init, error);

	function init (config) {

		// fetch data
		//load(config.http.host + ':' + config.http.port).then(render, error);
		
		// init odometer
		window.odometerOptions = {
			auto: false,
			selector: '#count'
		};

		// open socket
		var socket = io.connect(config.socket.host + ':' + config.socket.port);

		socket.on('push', function (datum) {
			push(datum);
		});

	}

	// helpers

	function push (datum) {

		data.push(datum);
		
		setTimeout(render.bind(null, data), 0);

	}

	function render (data) {

		document.querySelector('#count .odometer').innerHTML = data.length;
		document.querySelector('#json').innerHTML = json2html(data);

	}

	function load (url) {

		var deferred = when.defer();

		request(url, function (err, res) {

			if (err) deferred.reject(err);

			deferred.resolve(JSON.parse(res.body));

		});

		return deferred.promise;

	}

	function error (err) {

		throw err;

	}

})();