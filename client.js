;(function(){
	"use strict";

	var json2html = require('json-to-html'),
		request = require('browser-request'),
		io = require('socket.io/node_modules/socket.io-client'),
		when = require('when');

	var data = [];

	load('config.json').then(init, error);

	function init (config) {

		// fetch data
		//load(config.http.host + ':' + config.http.port).then(render, error);

		// open socket
		var socket = io.connect(config.socket.host + ':' + config.socket.port);

		socket.on('push', function (datum) {
			push(datum);
		});

	}

	// helpers

	function push (datum) {

		data.push(datum);
		render(data);
		
	}

	function render (data) {

		document
		.querySelector('#app')
		.innerHTML =
			'<p id="count">count: ' + data.length + '</p>' +
			'<div id="json">' + json2html(data) + '</div>';

	}

	function error (err) {
		throw err;
	}

	function load (url) {

		var deferred = when.defer();

		request(url, function (err, res) {

			if (err) deferred.reject(err);

			deferred.resolve(JSON.parse(res.body));

		});

		return deferred.promise;

	}

})();