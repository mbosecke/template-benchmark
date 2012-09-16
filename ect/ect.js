var ECT = require('ect');
var renderer;
var tplData;

	renderer = new ECT({ root: __dirname, cache: true });

module.exports.prepare = function (data, done) {
	tplData = data;
	renderer.render('tpl.ect', tplData, function(err, html) {
		done();
	});
};

module.exports.step = function (done) {
	renderer.render('tpl.ect', tplData, function(err, html) {
		done();
	});
};