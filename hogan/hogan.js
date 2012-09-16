var fs = require('fs');
var hogan = require('hogan.js');
var str = fs.readFileSync(__dirname + '/tpl.hogan', 'utf8');
var compiled;
var tplData;

module.exports.prepare = function (data, done) {
	tplData = data;
	compiled = hogan.compile(str);
	done();
};

module.exports.step = function (done) {
	var html = compiled.render(tplData);
	done();
};