;(function(){
	"use strict";

	// imports
	require('./node_modules/odometer/odometer');

	//json2html = require('json-to-html'),
	var _ = require('lodash'),
		d3 = require('./lib/d3'),
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
	
	function graph (data) {

		/**
		 *     ^
		 *     |
		 *   t |
		 *   i |
		 *   m |
		 *   e |
		 *     |______________>
		 *           runs
		 * 
		 */

		var svg = d3.select('#chart'),
			// x = d3.scale.linear(),
			// y = d3.scale.linear(),
			// xAxis = d3.svg.axis().scale(x).orient('bottom'),
			// yAxis = d3.svg.axis().scale(y).orient('left'),
			height = svg.offsetHeight,
			width = svg.offsetWidth,
			means = _.pluck(_.pluck(data, 'value'), 'mean'),
			max = d3.max(means);

		console.log('graph', _.pluck(_.pluck(data, 'value'), 'mean'));

		svg
		.selectAll('.bar')
		.remove()
		.data(means)
		.enter()
		.append('div')
		.style('height', function (d) { return 100*d/max + '%'; })
		.style('width', 100/data.length + '%')
		.text(function (d) { return d; });
		// .attr('class', 'bar')
		// .attr('x', function (d) {
		// 	return x(d.letter);
		// })
		// .attr('width', 100/data.length + '%')
		// .attr('y', function (d) {
		// 	return y(d.frequency);
		// })
		// .attr('height', function (d) {
		// 	return height - y(d.frequency);
		// });

	}

	function push (datum) {

		data.push(datum);

		graph(data);
		
		setTimeout(render.bind(null, data), 0);

	}

	function render (data) {

		document.querySelector('#count .odometer').innerHTML = data.length;
		//document.querySelector('#json').innerHTML = json2html(data);

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