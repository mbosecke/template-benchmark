var fs = require('fs');
var _ = require('underscore');
var compiled;
var tplData;

module.exports.prepare = function (data, done) {
	var str = fs.readFileSync(__dirname + '/tpl_escaped.html', 'utf8');
	tplData = data;
	compiled = _.template(str);
	done();
};

module.exports.prepareUnescaped = function (data, done) {
	var str = fs.readFileSync(__dirname + '/tpl_unescaped.html', 'utf8');
	tplData = data;
	compiled = _.template(str);
	done();
};

module.exports.step = function (done) {
	var html = compiled(tplData);
	done(undefined, html);
};