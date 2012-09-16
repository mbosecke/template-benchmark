var swig = require('swig');
var compiled;
var tplData;

swig.init({
	root: __dirname
});

module.exports.prepare = function (data, done) {
	tplData = data;
	compiled = swig.compileFile('/tpl.swig');
	done();
};

module.exports.step = function (done) {
	var html = compiled.render(tplData);
	done();
};
