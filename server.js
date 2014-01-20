;(function(){
	"use strict";

	var _ = require('lodash'),
		config = require('cat-settings').loadSync(__dirname + '/config.json'),
		cradle = require('cradle'),
		http = require('./server-http'),
		socket = require('./server-socket'),
		logger = require('./server-logger');

	// database
	var db = new cradle
		.Connection(config.db.host, config.db.port)
		.database(config.db.database);

	// common config
	var opts = {
		config: config,
		db: db,
		error: error
	};

	// http server
	http.start(opts);

	// socket server
	socket.start(_.extend({}, opts, {
		server: http.server
	}));

	// logging server
	logger.start(opts);

	// error handler
	function error (err) {
		console.error(err);
	}

})();