var fs = require('fs');
var dust = require('dustjs-linkedin');
var str = fs.readFileSync(__dirname + '/tpl.dust', 'utf8');
var compiled;
var tplData;

module.exports.prepare = function (data, done) {
	tplData = data;
	compiled = dust.compileFn(str);
	done();
};

module.exports.step = function (done) {
	var html = compiled(tplData, function(err, html) {
		done();
	});
};