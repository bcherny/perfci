;(function(){

	"use strict";

	// import
	var Server = require('yal-server');

	// export
	module.exports = {
		start: start
	};

	function start (opts) {

		var server = new Server();

		server.bind('tcp://' + opts.config.logger.host + ':' + opts.config.logger.port);
		server.use(stdout);

	}

	function stdout (server) {

		server.on('message', message);

	}

	function message (msg) {

		console.log (msg);

	}

})();