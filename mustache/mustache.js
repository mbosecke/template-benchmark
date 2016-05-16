var fs = require('fs');
var mustache = require('mustache');
var compiled;
var tplData;
var tpl;

module.exports.prepare = function (data, done) {
	var str = fs.readFileSync(__dirname + '/tpl_escaped.mustache', 'utf8');
	tplData = data;
	tpl = str;
	compiled = mustache.parse(str);
	//console.log(compiled);
	done();
};

module.exports.prepareUnescaped = function (data, done) {
	var str = fs.readFileSync(__dirname + '/tpl_unescaped.mustache', 'utf8');
	tplData = data;
	tpl = str;
	compiled = mustache.parse(str);
	done();
};

module.exports.step = function (done) {
	var html = mustache.render(tpl, tplData);
	//console.log(html);
	done(undefined, html);
};