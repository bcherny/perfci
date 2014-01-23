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
	var options = {
		bar: {
			spacing: 1,
			width: 15
		}
	};

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

		var means = _.pluck(_.pluck(data, 'value'), 'mean'),
			max = d3.max(means);

		d3
		.select('#chart')
		.selectAll('.bar')
		.data(means)
		.enter()
		.append('div')
		.style('height', function (d) {
			return 100*d/max + '%';
		})
		.style('left', function (d, n) {
			return (options.bar.width + options.bar.spacing)*n + 'px';
		})
		.html(function (s) {
			return '<span class="time ms">' + ms(s) + '</span>';
		})
		.attr('class', 'bar')
		.attr('data-value', function (s) { return s; });

		color(document.querySelectorAll('#chart .bar'));

	}

	function color (elements) {

		var previous = null;

		_.each(elements, function (element) {

			var value = element.getAttribute('data-value'),
				color = 'red';

			if (previous === null || value < previous) {
				color = 'green';
			}

			element.classList.add(color);

			previous = value;

		});

	}

	function ms (s, precision) {

		if (precision === void 0) {
			precision = 3;
		}

		precision = Math.pow(10, precision);

		return Math.round(s*1000*precision)/precision;

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