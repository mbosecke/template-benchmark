var fs = require('fs');
var ejs = require('ejs');
var compiled;
var tplData;

module.exports.prepare = function (data, done) {
	var str = fs.readFileSync(__dirname + '/tpl_escaped.ejs', 'utf8');
	tplData = data;
	compiled = ejs.compile(str, { _with: false });
	done();
};

module.exports.prepareUnescaped = function (data, done) {
	var str = fs.readFileSync(__dirname + '/tpl_unescaped.ejs', 'utf8');
	tplData = data;
	compiled = ejs.compile(str, { _with: false });
	done();
};

module.exports.step = function (done) {
	var html = compiled(tplData);
	done(undefined, html);
};