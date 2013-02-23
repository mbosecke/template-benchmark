var gaikan = require('gaikan');
var runtime = require('gaikan/lib/runtime');
var compiled;
var tplData;

module.exports.prepare = function (data, done) {
	tplData = data;
	compiled = gaikan.compileFile('tpl_escaped', 'gaikan', undefined, true);
	done();
};

module.exports.prepareUnescaped = function (data, done) {
	tplData = data;
	compiled = gaikan.compileFile('tpl_unescaped', 'gaikan', undefined, true);
	done();
};

module.exports.step = function (done) {
	var html = compiled(tplData);
	done(undefined, html);
};