var
	fs = require('fs'),
	path = require('path'),
	fest = require('./fest'),
	cmd = require('./cmd'),

	lstatSync = fs.lstatSync || path.lstatSync,
	existsSync = fs.existsSync || path.existsSync
;


function help(){
	console.log([
		'Usage:',
		'  fest-render [--json=...] filename.xml',
		'',
		'Options:',
		'  --json        json filename',
		'  --out         out filename',
		'',
		'  --version     current version',
		'  --help        display these usage instructions',
		''
	].join('\n'));
	process.exit(0);
}

function version(){
	console.log(JSON.parse(fs.readFileSync(__dirname + '/../package.json')).version);
	process.exit(0);
}

if( cmd.help ){
	help();
} else if( cmd.version ){
	version();
}

(function (cmd){
	var templateFile = cmd[0];
	var jsonData = {};
	var jsonFile = cmd.json;
	var outFile	 = cmd.out;


	if( !existsSync(templateFile) ){
		// Check template exists
		console.error('"' + templateFile + '" -- template not found');
		process.exit(1);
	}

	if( jsonFile ){
		if( existsSync(jsonFile) ){
			try {
				jsonData = JSON.parse(fs.readFileSync(jsonFile) + '');
			}
			catch (err) {
				console.error('"' + jsonFile + '" -- parse error');
				console.error(err);
				process.exit(1);
			}
		}
		else {
			console.error('"' + jsonFile + '" -- json not found');
			process.exit(1);
		}
	}

	var result = fest.render(templateFile, jsonData, {}) + "\n";

	if( outFile ){
		if( existsSync(outFile) ){
			fs.writeFileSync(outFile, result);
		}
		else {
			console.error('"' + jsonFile + '" -- out file not found');
		}
	}
	else {
		console.log(result);
	}
})(cmd);
