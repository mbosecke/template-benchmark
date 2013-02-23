var gaikan = require('gaikan');
var runtime = require('gaikan/lib/runtime');
var compiled;
var tplData;

gaikan.options.directory = 'gaikan';

module.exports.prepare = function (data, done) {
	tplData = data;
	compiled = gaikan.compileFromPath('tpl_escaped.html');
	done();
};

module.exports.prepareUnescaped = function (data, done) {
	tplData = data;
	compiled = gaikan.compileFromPath('tpl_unescaped.html');
	done();
};

module.exports.step = function (done) {
	var html = compiled(runtime, tplData);
	done(undefined, html);
};