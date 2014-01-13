;(function(){

	"use strict";

	var sample = require('./sample')
	  , Benchmark = require('benchmark')
	  , suite = new Benchmark.Suite();

	suite
	.add('sample', sample);

	module.exports = suite;

})();