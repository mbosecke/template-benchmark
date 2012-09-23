var data = {
	title : 'Projects',
	projects : [
		{ name : 'Facebook', url : 'http://facebook.com', description : 'Social network' },
		{ name : 'Google', url : 'http://google.com', description : 'Search engine' },
		{ name : 'Twitter', url : 'http://twitter.com', description : 'Microblogging service' },
		{ name : 'Amazon', url : 'http://amazon.com', description : 'Online retailer' },
		{ name : 'eBay', url : 'http://ebay.com', description : 'Online auction' },
		{ name : 'Wikipedia', url : 'http://wikipedia.org', description : 'A free encyclopedia' },
		{ name : 'LiveJournal', url : 'http://livejournal.com', description : 'Blogging platform' },
		{ name : 'Facebook', url : 'http://facebook.com', description : 'Social network' },
		{ name : 'Google', url : 'http://google.com', description : 'Search engine' },
		{ name : 'Twitter', url : 'http://twitter.com', description : 'Microblogging service' },
		{ name : 'Amazon', url : 'http://amazon.com', description : 'Online retailer' },
		{ name : 'eBay', url : 'http://ebay.com', description : 'Online auction' },
		{ name : 'Wikipedia', url : 'http://wikipedia.org', description : 'A free encyclopedia' },
		{ name : 'LiveJournal', url : 'http://livejournal.com', description : 'Blogging platform' }
	]
};

var count = 100000;
var ect = require('./ect/ect.js');
var ejs = require('./ejs/ejs.js');
var jade = require('./jade/jade.js');
var eco = require('./eco/eco.js');
var swig = require('./swig/swig.js');
var hogan = require('./hogan/hogan.js');
var dust = require('./dust/dust.js');
var fest = require('./fest/fest.js');
var dot = require('./dot/dot.js');

var test = function(name, sample, cb) {
	var i = 0;
	var start;
	var done = function(error, html) {
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

var testUnescaped = function(name, sample, cb) {
	var i = 0;
	var start;
	var done = function(error, html) {
		i++;
		if (i === count) {
			var now = Date.now();
			cb(null, name, now - start);
		}
	}
	sample.prepareUnescaped(data, function() {
		start = Date.now();
		for (var j = 0; j < count; j++) {
			sample.step(done);
		}
	});
};

var samples = [
	{ name : 'Jade', sample : jade },
	{ name : 'Fest', sample : fest },
	{ name : 'doT', sample : dot },
	{ name : 'Dust', sample : dust },
	{ name : 'Swig', sample : swig },
	{ name : 'Hogan.js', sample : hogan },
	{ name : 'EJS', sample : ejs },
	{ name : 'Eco', sample : eco },
	{ name : 'ECT', sample : ect }
];

var runTests = function () {
	if (samples.length) {
		var sample = samples.pop();
		test(sample.name, sample.sample, function (err, name, result) {
			testUnescaped(sample.name, sample.sample, function (err, name, resultUnescaped) {
				console.log(name + ' : ', result + 'ms/' + resultUnescaped + 'ms');
				runTests();
			});
		});
	}
};

console.log('Rendering ' + count + ' templates:');
console.log('escaped/unescaped');
runTests();