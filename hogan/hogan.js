var fs = require('fs');
var hogan = require('hogan.js');
var compiled;
var tplData;

module.exports.prepare = function (data, done) {
	var str = fs.readFileSync(__dirname + '/tpl_escaped.hogan', 'utf8');
	tplData = data;
	compiled = hogan.compile(str);
	done();
};

module.exports.prepareUnescaped = function (data, done) {
	var str = fs.readFileSync(__dirname + '/tpl_unescaped.hogan', 'utf8');
	tplData = data;
	compiled = hogan.compile(str);
	done();
};

module.exports.step = function (done) {
	var html = compiled.render(tplData);
	done(undefined, html);
};