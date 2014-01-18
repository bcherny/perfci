;(function(){

	"use strict";

	var config = require('cat-settings').loadSync(__dirname + '/config.json');

	function start (opts) {

		var http = require('http').Server(opts.server.callback()),
			io = require('socket.io')(http);

		//var me = this;

		io.on('connection', function (socket) {

			// socket
			// .on('message', function (data) {

			// })
			// .on('disconnect', function () {

			// });
			
			// db change events
			opts.db
			.changes()
			.on('change', function (change) {

				opts.db.view('runs/list', { key: change.id }, function (err, doc) {

					if (err || !doc || !doc.length) {
						opts.error(err);
					} else {
						console.info('push', doc[0]);
						socket.emit('push', doc[0]);
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