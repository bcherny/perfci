;(function(){

	"use strict";

	function foo () {

		var temp;

		for (var n = 100000; n--;) {
			temp = n;
		}

		return temp;

	}

	module.exports = foo;

})();