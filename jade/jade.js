var fs = require('fs');
var jade = require('jade');
var str = fs.readFileSync(__dirname + '/tpl.jade', 'utf8');
var compiled;
var tplData;

module.exports.prepare = function (data, done) {
	tplData = data;
	compiled = jade.compile(str, data);
	done();
};

module.exports.step = function (done) {
	var html = compiled(tplData);
	done();
};