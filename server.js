;(function(){
	"use strict";

	var config = require('cat-settings').loadSync(__dirname + '/config.json'),
		cradle = require('cradle'),
		http = require('./server-http'),
		socket = require('./server-socket');

	// database
	var db = new cradle
		.Connection(config.db.host, config.db.port)
		.database(config.db.database);

	// http server
	http.start({
		db: db
	});

	// socket server
	socket.start({
		server: http.server
	});

})();