;(function(){

	"use strict";

	var config = require('cat-settings').loadSync(__dirname + '/config.json');

	function start (opts) {

		var http = require('http').Server(opts.server.callback()),
			io = require('socket.io')(http);

		//var me = this;

		io.on('connection', function (socket) {

			//me.socket = socket;

			socket.emit('hello', {
				foo: 'bar'
			});

			// socket
			// .on('message', function (data) {

			// })
			// .on('disconnect', function () {

			// });

		});

		io.listen(config.socket.port);

	}

	start.prototype.emit = function (thing) {

		this.socket.emit(thing);

	};

	module.exports = {
		start: start
	};


})();