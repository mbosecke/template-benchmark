/**
 * @run: node proxy.js ./config.json
 */

var fest = require('./fest'),
	fs   = require('fs'),
	url  = require('url'),
	http = require('http'),
	path = require('path'),
	po   = require('./po'),
	cmd  = require('./cmd');

function help() {
	console.log([
		'Usage:',
		'  fest-proxy [options] <config>',
		'',
		'Options:',
		'  --version current version',
		'  --help    display these usage instructions',
		''
	].join('\n'));
	process.exit(0);
}

function version() {
	console.log(JSON.parse(fs.readFileSync(__dirname + '/../package.json')).version);
	process.exit(0);
}

if (cmd.help || cmd.length > 1) {
	help();
} else if (cmd.version) {
	version();
}

var configDefaults =  {
	host: '127.0.0.1',
	port: 8090,
	maxAge: 0,            // Cache-Control header
	compile: null,        // compile options
	cache: false,         // Cache compiled templates (useful in production)
	clientMask: 'fest/',   //
	templateDir: 'fest/', // path to templates sources
	compileDir: null,     // path to store compiled templates (optional)
	localeDir: null       // path to directory with *.po files (optional)
};

function getConfig(fn) {
	var root = path.dirname(fn),
		config = extend({}, configDefaults, JSON.parse(fs.readFileSync(fn)));
	if (config.templateDir) {
		config.templateDir = path.resolve(root, config.templateDir);
	}
	if (config.localeDir) {
		config.localeDir = path.resolve(root, config.localeDir);
	}
	return config;
}

var defaultConfig = cmd[0] ? getConfig(cmd[0]) : extend({}, configDefaults);
console.log(defaultConfig);

var reLocale = /\.([a-z]{2}_[A-Z]{2})$/,
	locales = {};

http.createServer(function (req, res) {
	if (req.method !== 'HEAD' && req.method !== 'GET') {
		res.statusCode = 204;
		res.end();
	}

	var config;
	if (req.headers['x-fest-cfg']) {
		try {
			config = getConfig(req.headers['x-fest-cfg']);
		} catch (e){
			console.error(e.stack);
			config = defaultConfig;
		}
	} else {
		config = defaultConfig;
	}

	var templateDir = req.headers['x-fest-dir'] ? req.headers['x-fest-dir'] : config.templateDir,
		compileDir = req.headers['x-fest-compile-dir'] ? req.headers['x-fest-compile-dir'] : config.compileDir;
	if (compileDir) {
		compileDir = path.resolve(templateDir, compileDir);
	}

	var file, locale, result, mtime;
	try {
		file = decodeURIComponent(url.parse(req.url).pathname).replace(/^\/+/, '').replace(/\.js$/, '');
	} catch (e) {
		console.error(e.stack);
	}
	if (file) {
		var pos = file.indexOf(config.clientMask);
		if (pos !== -1) {
			file = file.substr(pos + config.clientMask.length);
		}
		var m = file.match(reLocale);
		if (m) {
			file = file.replace(reLocale, '');
			locale = m[1];
		}
		var fn = compileDir + '/' + file + (locale ? '.' + locale + '.js' : '.js');
		if (compileDir && config.cache) {
			// try to read from cache
			try {
				mtime = fs.lstatSync(fn).mtime;
				result = fs.readFileSync(fn, 'utf8');
			} catch (e){
				if ('ENOENT' !== e.code) {
					console.error(e.stack);
				}
			}
		}
		if (!result) {
			// failed to read from cache
			result = compile(file, locale, templateDir, config.compile, config);
			mtime = new Date;
			if (compileDir) try {
				mkdir(path.dirname(fn));
				fs.writeFileSync(fn, result, 'utf8');
			} catch (e){
				console.error(e.stack);
			}
		}

		res.setHeader('Date', (new Date).toUTCString());
		res.setHeader('Cache-Control', 'public, max-age=' + config.maxAge);
		res.setHeader('Last-Modified', mtime.toUTCString());

		var ms = req.headers['if-modified-since'];
		if (ms) {
			ms = new Date(ms);
			if (!isNaN(ms.valueOf()) && ms >= mtime) {
		 		res.statusCode = 304;
		 		return res.end();
			}
		}

		res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
		res.setHeader('Content-Length', Buffer.byteLength(result, 'utf8'));

		if (req.method == 'HEAD') return res.end();

		res.end(result);
	} else {
		res.statusCode = 204;
		res.end();
	}
}).listen(defaultConfig.port, defaultConfig.host);


function compile(file, locale, dir, options, config){

	if (locale) {
		if (!config.localeDir) {
			return compile_error_tmpl(file, 'locale ' + locale  + ' not found', options)
		} else {
			if (!locales[locale]) {
				// load and convert PO file
				var pof = po.load(config.localeDir + '/' + locale + '.po');
				locales[locale] = {
					plural: pof.plural,
					messages: pof.toJSON()
				}
			}
			var lo = locales[locale];
			options = extend({}, options, {
				plural: lo.plural,
				messages: lo.messages
			});
		}
	}

	var source,
		fn = dir + '/' + file + '.xml';

	try {
		// file exists
		fs.lstatSync(fn);
	} catch (e){
		console.error(e.message);
		return compile_error_tmpl(file, fn + ' -- template not found', options);
	}

	try {
		// fest compile
		source = fest.compile(fn, options);
	} catch (e) {
		console.error(e.stack);
		return compile_error_tmpl(file, 'fest.compile failed', options);
	}

	return compile_tmpl(file, source, options);
}

function compile_tmpl(file, source, options){
	return fest.compile_tmpl(file, source, options ? options.wrapper : null);
}

function compile_error_tmpl(file, txt, options){
	return compile_tmpl(file, 'function(){return "[fest.proxy.compile.error] ' + txt + '"}', options);
}

function extend(dest){
	Array.prototype.slice.call(arguments, 1).forEach(function (src) {
		for (var i in src) {
			dest[i] = src[i];
		}
	});
	return dest;
}

function mkdir(filename, mode) {
     mode = mode || 0777;
     var parts = filename.split(path.sep);
     for (var i = 1; i < parts.length; i++) {
         var dir = parts.slice(0, i + 1).join(path.sep);
         if (!fs.existsSync(dir)) {
             fs.mkdirSync(dir, mode);
         }
     }
 }