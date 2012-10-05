var fs = require('fs');
var Handlebars = require('handlebars');
var compiled;
var tplData;

module.exports.prepare = function (data, done) {
	var str = fs.readFileSync(__dirname + '/tpl_escaped.handlebars', 'utf8');
	tplData = data;
	compiled = Handlebars.compile(str);
	done();
};

module.exports.prepareUnescaped = function (data, done) {
	var str = fs.readFileSync(__dirname + '/tpl_unescaped.handlebars', 'utf8');
	tplData = data;
	compiled = Handlebars.compile(str);
	done();
};

module.exports.step = function (done) {
	var html = compiled(tplData);
	done(undefined, html);
};