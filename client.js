;(function(){
	"use strict";

	var json2html = require('json-to-html'),
		request = require('browser-request'),
		io = require('socket.io/node_modules/socket.io-client'),
		when = require('when');

	load('config.json').then(init, function (err) {
		throw err;
	});

	function init (config) {

		// fetch data
		load(config.http.host + ':' + config.http.port).then(render, error);

		// open socket
		var socket = io.connect(config.socket.host + ':' + config.socket.port);

		socket.on('hello', function (data) {
			console.log('sock: ', data);
		});

	}

	// helpers

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