var fs = require('fs');
var dust = require('dustjs-linkedin');
var str = fs.readFileSync(__dirname + '/tpl.dust', 'utf8');
var compiled;
var tplData;

module.exports.prepare = function (data, done) {
	tplData = data;

	compiled = dust.compile(str, 'test');
	dust.loadSource(compiled);	
	
	done();
};

module.exports.step = function (done) {
	dust.render('test', tplData, function(err, html) {
		if (!err) {
			done();
		} else {
			throw "err";
		}
	});
};
