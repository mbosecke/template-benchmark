var gaikan = require('gaikan');
var compiled;
var tplData;

module.exports.prepare = function (data, done) {
	tplData = data;
	compiled = gaikan.compileFile('tpl_escaped', 'gaikan', undefined, true);
	/*gaikan.explainFile('tpl_escaped', 'gaikan', function (js) {
		console.log(js.replace(/\t/g, '  '));
	});*/
	done();
};

module.exports.prepareUnescaped = function (data, done) {
	tplData = data;
	compiled = gaikan.compileFile('tpl_unescaped', 'gaikan', undefined, true);
	/*gaikan.explainFile('tpl_unescaped', 'gaikan', function (js) {
		console.log(js.replace(/\t/g, '  '));
	});*/
	done();
};

module.exports.step = function (done) {
	var html = compiled(tplData);
	done(undefined, html);
};