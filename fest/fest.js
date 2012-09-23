var fest = require('fest');
var tplData;
var compiled;

module.exports.prepare = function (data, done) {
	var str = __dirname + '/tpl_escaped.fest';
	tplData = data;
	compiled = (new Function('return ' + fest.compile(str, {beautify: false}) ))();
	done();
};

module.exports.prepareUnescaped = function (data, done) {
	var str = __dirname + '/tpl_unescaped.fest';
	tplData = data;
	compiled = (new Function('return ' + fest.compile(str, {beautify: false}) ))();
	done();
};

module.exports.step = function (done) {
	var html = compiled(tplData);
	done(undefined, html);
};