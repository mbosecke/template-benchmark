/*
Compile fest .xml template to output file.
*/
var
	fs	 = require('fs'),
	path = require('path'),
	fest  = require('./fest'),
	po    = require('./po'),
	utils = require('./utils'),
	cmd   = require('./cmd');
var existsSync = fs.existsSync || path.existsSync;


function help(exit_code) {
	/* Print help and exit. */
	if (exit_code === undefined) {
		exit_code = 0;
	}
	console.info([
		'Usage:',
		'  fest-compile [--out=...] [--wrapper=...] [--translate=...] template.xml',
		'',
		'Options:',
		'  --out         save compiled file to (use "-" for STDOUT, default)',
		'  --wrapper     type of postcompile wrappers, fest|loader|source|variable (default is fest)',
		'  --translate   input PO file',
		'  template.xml  path to .xml template file',
		'',
		'  --version     current version',
		'  --help        display these usage instructions',
		''
	].join('\n'));
	process.exit(exit_code);
}

function version(exit_code) {
	/* Print version and exit. */
	if (exit_code === undefined) {
		exit_code = 0;
	}
	console.info(JSON.parse(fs.readFileSync(__dirname + '/../package.json')).version);
	process.exit(exit_code);
}

function mkdir(filename, mode) {
	/* Make directory if not exists. */
	if (existsSync(filename)) {
		return;
	}
	mode = mode || 0755;  // Achtung! Do not use '777' permission! Never.
	var parts = filename.split(path.sep);
	for (var i = 1; i < parts.length; i++) {
		var dir = parts.slice(0, i + 1).join(path.sep);
		if (!existsSync(dir)) {
			fs.mkdirSync(dir, mode);
		}
	}
}


if (cmd.help) {
	help();  // show help screen and exit
}
if (cmd.version) {
	version();  // show fest version and exit
}

// check if we have one and only one template file defined
if (cmd.length !== 1) {
	if (cmd.length === 0) {
		console.error('ERROR: you need to define template file (filename)\n');
	} else {
		console.error('ERROR: You may define only one template file (filename)\n');
	}
	help(1);
}

var template_file = cmd[0];  // input template file
var output_file = cmd.out || '-'  // output js file
var wrapper = cmd.wrapper || 'fest';  // postcompile wrapper

template_file_abs = utils.abs_path(template_file);
if (!existsSync(template_file_abs)) {
	console.error('ERROR: file "' + template_file_abs + '" does not exists');
	process.exit(1);
}

cmd.compile = cmd.compile || {};
var messages;
var language;
if (cmd.translate) {
	translate_file = utils.abs_path(cmd.translate);
	if (!existsSync(translate_file)) {
		console.error('ERROR: translate file "' + translate_file + '" does not exists')
		process.exit(1);
	}
	var pof = po.load(translate_file);
	cmd.compile.plural = pof.plural;
	language = pof.headers['Language'];
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
		console.error('ERROR: translation failed:');
		errors.forEach(function (msg) {
			console.error('>>>\nmsg_id: ' + msg.id);
			console.error('msg_str: ' + msg.str);
			console.error('errors: ' + msg.errors.join('; ') + '\n<<<');
		});
		process.exit(1);
	}
}
cmd.compile.messages = messages;


// compile template
var source = fest.compile(template_file_abs, cmd.compile, '');
var template_file_lang = template_file.replace(/\.xml$/, language ? '.' + language : '');
if (template_file[0] === '/' || template_file[0] === '~') {
	var cwd = process.cwd();
	if (template_file_lang.indexOf(cwd) === 0) {
		template_file_lang = template_file_lang.slice(cwd.length + 1);
	}
}
var compiled = fest.compile_tmpl(template_file_lang, source, wrapper);

// output compiled template
if (output_file === '-') {
	console.log(compiled);  // to STDOUT
} else {
	output_file = utils.abs_path(output_file)
	mkdir(path.dirname(output_file));
	fs.writeFileSync(output_file, compiled, 'utf8');  // to output file
}
