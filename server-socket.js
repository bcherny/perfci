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
			
			// db change events
			
			var feed = opts.db.changes();

			feed
			.on('change', function (change) {

				opts.db.view('runs/list', { id: change.id }, function (err, doc) {

					if (err) {
						opts.error(err);
					} else {
						socket.emit('push', doc);
					}

				});
				
			})
			.on('error', opts.error);

		});

		io.listen(config.socket.port);

		// log
		if (config.debug) {
			console.info('Started socket server on port ' + config.socket.port);
		}

	}

	start.prototype.emit = function (thing) {

		this.socket.emit(thing);

	};

	module.exports = {
		start: start
	};

})();