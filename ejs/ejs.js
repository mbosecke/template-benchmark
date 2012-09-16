var fs = require('fs');
var ejs = require('ejs');
var str = fs.readFileSync(__dirname + '/tpl.ejs', 'utf8');
var compiled;
var tplData;

module.exports.prepare = function (data, done) {
	tplData = data;
	compiled = ejs.compile(str);
	done();
};

module.exports.step = function (done) {
	var html = compiled(tplData);
	done();
};