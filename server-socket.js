;(function(){

	"use strict";

	var config = require('cat-settings').loadSync(__dirname + '/config.json'),
		io = require('socket.io')();

	module.exports = function () {

		io.on('connection', function (socket) {

			socket
			.on('event', function (data) {

			})
			.on('disconnect', function () {

			});

		});
		
		io.listen(config.socket.port);

	};


})();