var ECT = require('ect');
var renderer;
var tplData;
var tpl;

renderer = new ECT({ root: __dirname, cache: true });

module.exports.prepare = function (data, done) {
	tplData = data;
	tpl = 'tpl_escaped.ect';
	renderer.render(tpl, tplData, function(err, html) {
		done();
	});
};

module.exports.prepareUnescaped = function (data, done) {
	tplData = data;
	tpl = 'tpl_unescaped.ect';
	renderer.render(tpl, tplData, function(err, html) {
		done();
	});
};

module.exports.step = function (done) {
	renderer.render(tpl, tplData, function(err, html) {
		done(err, html);
	});
};