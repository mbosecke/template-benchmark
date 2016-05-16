var fs   = require('fs'),
	path = require('path'),
	po   = require('./po'),
	cmd  = require('./cmd');

function help() {
	console.log([
		'Usage:',
		'  po2js [options] <po file> <js file>',
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

if (cmd.version) {
	version();
} else if (cmd.help || cmd.length != 2) {
	help();
}

var po_fn = cmd[0],
	js_fn = cmd[1],
	pof = po.load(po_fn),
	m = pof.headers['Plural-Forms'] ? pof.headers['Plural-Forms'].match(/nplurals=\d+;\s*plural=(.*)/) : false,
	plural = m ? m[1] : null,
	contents = [
		'var ' + (pof.headers['Language'] ? pof.headers['Language'] : path.basename(po_fn, '.po')) + ' = {',
			plural ? 'plural: function (n) {return ' + plural + '},' : '',
			'messages: ' + JSON.stringify(pof.toJSON()),
		'};'
	].join('');

fs.writeFileSync(js_fn, contents, 'utf8');