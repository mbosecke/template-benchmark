var data = {
	title : 'Projects',
	projects : [
		{ name : 'Facebook', url : 'http://facebook.com', description : 'Social network' },
		{ name : 'Google', url : 'http://google.com', description : 'Search engine' },
		{ name : 'Twitter', url : 'http://twitter.com', description : 'Microblogging service' },
		{ name : 'Amazon', url : 'http://amazon.com', description : 'Online retailer' },
		{ name : 'eBay', url : 'http://ebay.com', description : 'Online auction' }
	]
};

var count = 100000;
var ect = require('./ect/ect.js');
var ejs = require('./ejs/ejs.js');
var jade = require('./jade/jade.js');
var eco = require('./eco/eco.js');
var swig = require('./swig/swig.js');
var hogan = require('./hogan/hogan.js');

var test = function(name, sample, cb) {
	var i = 0;
	var start;
	var done = function(error) {
		i++;
		if (i === count) {
			var now = Date.now();
			cb(null, name, now - start);
		}
	}
	sample.prepare(data, function() {
		start = Date.now();
		for (var j = 0; j < count; j++) {
			sample.step(done);
		}
	});
};

var samples = [
	{ name : 'Jade', sample : jade },
	{ name : 'EJS', sample : ejs },
	{ name : 'Eco', sample : eco },
	{ name : 'Swig', sample : swig },
	{ name : 'Hogan.js', sample : hogan },
	{ name : 'ECT', sample : ect }
];

var runTests = function () {
	if (samples.length) {
		var sample = samples.pop();
		test(sample.name, sample.sample, function (err, name, result) {
			console.log(name + ': ', result + 'ms');
			runTests();
		})
	}
};

console.log('Rendering ' + count + ' templates:');
runTests();