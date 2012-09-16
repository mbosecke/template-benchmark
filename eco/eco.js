var fs = require('fs');
var eco = require('eco');
var str = fs.readFileSync(__dirname + '/tpl.eco', 'utf8');
var tplData;

module.exports.prepare = function (data, done) {
	tplData = data;
	done();
};

module.exports.step = function (done) {
	var html = eco.render(str, tplData);
	done();
};