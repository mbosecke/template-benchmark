var
	fs	 = require('fs'),
	path = require('path'),
	dirname = path.dirname,
	fest  = require('./fest'),
	po    = require('./po'),
	utils = require('./utils'),
	cmd   = require('./cmd');

var existsSync = fs.existsSync || path.existsSync;

function help() {
	console.log([
		'Usage:',
		'  fest-build --dir=... [--out=...] [--wrapper=...] [--exclude=...]',
		'',
		'Options:',
		'  --dir       directory where .xml files are',
		'  --wrapper   type of postcompile wrappers, fest|loader|source|variable (default is fest)',
		'  --exclude   regexp, which files ignore',
		'  --out       output directory for compiled files if omited --out = --dir',
		'  --po        output PO file',
		'  --translate input PO file',
		'',
		'  --version   current version',
		'  --help      display these usage instructions',
		''
	].join('\n'));
	process.exit(0);
}

function version() {
	console.log(JSON.parse(fs.readFileSync(__dirname + '/../package.json')).version);
	process.exit(0);
}

if (cmd.help) {
	help();
} else if (cmd.version) {
	version();
}
var prefix = '';
var recursive = cmd.recursive !== 'no';
var dir = cmd.dir;

if (!dir){
	console.error('You need to print directory "fest-build dir=..."\n');
	help();
	process.exit(1);
}
dir = utils.abs_path(dir); 
dir = dir.replace(/\/$/, '') + '/';
if (!existsSync(dir)){
	console.error('directory "' + dir + '" does not exists');
	process.exit(1);
}
var out_dir = cmd.out || dir;
if (out_dir !== dir){
    out_dir = utils.abs_path(out_dir);
}
out_dir = out_dir.replace(/\/$/, '') + '/';
if (out_dir[0] !== '/'){
	out_dir = process.env.PWD + '/' + out_dir;
}

cmd.compile = cmd.compile || {};

if (cmd.po) {
	var po_file = cmd.po;
	if (po_file[0] !== '/') {
		po_file = process.env.PWD + '/' + po_file;
	}
	var found_messages = {};
	cmd.compile.events = {
		'message': function (event) {
			var id = event.id, context = event.context, reference = event.reference;

			reference = reference.slice(dir.length)
			var key = id + (context ? context : '');
			if (key in found_messages) {
				found_messages[key].reference.push(reference);
			} else {
				found_messages[key] = {
					id: id,
					context: context,
					reference: [reference]
				};
			}
		}
	}
}
var messages;
if (cmd.translate) {
	var pof = po.load(cmd.translate);
	cmd.compile.plural = pof.plural;
	// cmd.compile.nplurals = pof.nplurals;
	var language = pof.headers['Language'];
	messages = pof.toJSON();
	var errors = [], str, err;
	for (var k in messages) {
		str = messages[k];
		err = utils.validate('<template>' + str + '</template>');
		if (true !== err) {
			errors.push({
				id: k,
				str: str,
				errors: err
			});
		}
	}
	if (errors.length) {
		console.error('TRANSLATION FAILED');
		errors.forEach(function (msg) {
			console.error('>>>\nmsg_id: ' + msg.id);
			console.error('msg_str: ' + msg.str);
			console.error('errors: ' + msg.errors.join('; ') + '\n<<<');
		});
		process.exit(1);
	}
}
cmd.compile.messages = messages;

function regExpQuote(str) {
    return str.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]', 'g'), '\\$&');
}
var wrapper = cmd.wrapper || 'fest';
var watched_files = {};
var excludeRegexp = cmd.exclude ? new RegExp("^" + regExpQuote(dir) + "(" + cmd.exclude.split('|').map(function (v) {
	return v.split('*').map(regExpQuote).join('.*?')
}).join('|') + ")$") : null;

function do_compile(file, dir, out_dir, prefix){
	console.log('compile: ' + dir + file);
	var source = fest.compile(dir + file, extend({}, cmd.compile), '');
	var file_name = (out_dir + file).replace(/\.xml/, language ? '.' + language + '.js' : '.js');
	mkdir(dirname(file_name));
	fs.writeFileSync(file_name, fest.compile_tmpl(prefix + file.replace(/\.xml$/, language ? '.' + language : ''), source, wrapper), 'utf8');
}

function findfiles(dir, out_dir, prefix){
	if(excludeRegexp && excludeRegexp.test(dir)) {
		console.log('exclude dir: ' + dir);
		return;
	}

	files = fs.readdirSync(dir);
	files.filter(function(file){
		return file.indexOf('.xml') > 0;
	}).forEach(function(file){
		if(excludeRegexp && excludeRegexp.test(dir + '/' + file)) {
			console.log('exclude file: ' + file);
			return;
		}
		// console.log('build: ' + file);
		do_compile(file, dir, out_dir, prefix);
	});

	if (recursive){
		files.filter(function(file){
			return fs.statSync(dir + file).isDirectory()

		}).forEach(function(file){
			// console.log('watch directory: ' + dir + file);
			findfiles(dir + file + '/', out_dir + file + '/', prefix + file + '/');
		});
	}
}

findfiles(dir, out_dir, prefix);

function escape(s) {
	return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

if (po_file) {
	var po_contents = '#\nmsgid ""\nmsgstr ""\n"Content-Type: text/plain; charset=UTF-8\\n"\n\n', key, msg;
	for (key in found_messages) {
		var msg = found_messages[key];
		for (var i = 0, c = msg.reference.length; i < c; i++) {
			po_contents += '#: ' + msg.reference[i] + '\n';
		}
		if (msg.context) {
			po_contents += 'msgctxt "' + escape(msg.context) + '"\n';
		}
		po_contents += 'msgid "' + escape(msg.id) + '"\nmsgstr ""\n\n'
	}
	fs.writeFileSync(po_file, po_contents, 'utf8');
}

function mkdir(filename, mode) {
     mode = mode || 0777;
     var parts = filename.split(path.sep);
     for (var i = 1; i < parts.length; i++) {
         var dir = parts.slice(0, i + 1).join(path.sep);
         if (!existsSync(dir)) {
             fs.mkdirSync(dir, mode);
         }
     }
 }

 function extend(dest){
	Array.prototype.slice.call(arguments, 1).forEach(function (src) {
		for (var i in src) {
			dest[i] = src[i];
		}
	});
	return dest;
}
