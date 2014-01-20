;(function(){

	"use strict";

	var http = require('http'),
		socketio = require('socket.io'),
		Logger = require('yal');

	function start (opts) {

		// init logger
		var log = new Logger('tcp://' + opts.config.logger.host + ':' + opts.config.logger.port);

		// start socket server
		var io = socketio(http.Server(opts.server.callback()));

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
						log.info('push', doc[0]);
						socket.emit('push', doc[0]);
					}

				});
				
			})
			.on('error', opts.error);

		});

		io.listen(opts.config.socket.port);

		// log
		if (opts.config.debug) {
			log.info('Started socket server on port ' + opts.config.socket.port);
		}

	}

	start.prototype.emit = function (thing) {

		this.socket.emit(thing);

	};

	module.exports = {
		start: start
	};

})();