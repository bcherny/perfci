;(function(){
	"use strict";

	var config = require('cat-settings').loadSync(__dirname + '/config.json'),
		cradle = require('cradle');

	// database
	var db = new cradle
		.Connection(config.db.host, config.db.port)
		.database(config.db.database);

	// http server
	require('./server-http')(db);

	// socket server
	require('./server-socket')();

})();