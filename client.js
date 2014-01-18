;(function(){
	"use strict";

	var config = {
		url: 'localhost:1234'
	};

	var uxhr = require('uxhr');

	uxhr(config.url, {}, {
		complete: function (res) {
			console.log('complete', res);
		}
	});

})();