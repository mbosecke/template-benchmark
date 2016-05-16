var swig = require('swig');
var compiled;
var tplData;

//swig.init({
//	root: __dirname
//});

module.exports.prepare = function (data, done) {
	tplData = data;
	//console.log(tplData);
	compiled = swig.compileFile(_dirname + './tpl_escaped.swig');
	//console.log(compiled);
	done();
};

module.exports.prepareUnescaped = function (data, done) {
	tplData = data;
	compiled = swig.compileFile(_dirname + './tpl_unescaped.swig');
	done();
};

module.exports.step = function (done) {
	var html = compiled.render(tplData);
	done(undefined, html);
};
