var fs = require('fs');
var jade = require('jade');
var compiled;
var tplData;

module.exports.prepare = function (data, done) {
	var str = fs.readFileSync(__dirname + '/tpl_escaped.jade', 'utf8');
	tplData = data;
	compiled = jade.compile(str);
	done();
};

module.exports.prepareUnescaped = function (data, done) {
	var str = fs.readFileSync(__dirname + '/tpl_unescaped.jade', 'utf8');
	tplData = data;
	compiled = jade.compile(str);
	done();
};

module.exports.step = function (done) {
	var html = compiled(tplData);
	done(undefined, html);
};