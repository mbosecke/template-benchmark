/* http://www.gnu.org/software/gettext/manual/html_node/PO-Files.html */

var fs = require('fs');

function PO () {
	this.comments = [];
	this.headers = {};
	this.messages = [];
	this.plural = null;
	this.nplurals = null;
}

PO.prototype.toJSON = function () {
	var json = {};
	for (var i = 0, c = this.messages.length; i < c; i++) {
		var msg = this.messages[i];
		if (msg.msgstr.length === 1) {
			json[msg.msgid + msg.msgctxt] = msg.msgstr[0];
		}
	}
	return json;
}

PO.parse = function (contents) {

	function parseLine(s) {
		return s.replace(/^[^"]*"|"$/g, '')
				.replace(/\\([abtnvfr'"\\?]|([0-7]{3})|x([0-9a-fA-F]{2}))/g, function(match, esc, oct, hex) {
					if (oct) return String.fromCharCode(parseInt(oct, 8));
					if (hex) return String.fromCharCode(parseInt(hex, 16));
					switch (esc) {
						case 'a': return '\x07';
						case 'b': return '\b';
						case 't': return '\t';
						case 'n': return '\n';
						case 'v': return '\v';
						case 'f': return '\f';
						case 'r': return '\r';
						default : return esc;
					}
				});
	}

	function parseMessage(s) {
		var msg = new POMessage,
			lines = s.split('\n'),
			state,
			s,
			plural = 0;
		while (lines.length) {
			var line = lines.shift();
			if (/^#:/.test(line)) {
				s = line.replace(/^#:\s*/, '').replace(/\s*$/, '');
				if (s) msg.references.push(s);
			} else if (/^#/.test(line)) {
				s = line.replace(/^#\s*/, '').replace(/\s*$/, '');
				if (s) msg.comments.push(s);
			} else if (/^msgctxt/.test(line)) {
				state = 'msgctxt';
				msg.msgctxt = parseLine(line);
			} else if (/^msgid_plural/.test(line)) {
				state = 'msgid_plural';
				msg.msgid_plural = parseLine(line);
			} else if (/^msgid/.test(line)) {
				state = 'msgid';
				msg.msgid = parseLine(line);
			} else if (/^msgstr/.test(line)) {
				var m = line.match(/^msgstr\[(\d+)\]/);
				plural = m && m[1] ? parseInt(m[1], 10) : 0;
				state = 'msgstr';
				msg.msgstr[plural] = parseLine(line);
			} else {
				if (state === 'msgstr') {
					msg.msgstr[plural] += parseLine(line);
				} else if (state === 'msgctxt' || state === 'msgid' || state === 'msgid_plural') {
					msg[state] += parseLine(line);
				}
			}
		}
		return msg;
	}

	var po = new PO,
		messages = contents.split('\n\n'),
		headers = messages.shift();

	var header = parseMessage(headers);
	po.comments = header.comments;
	header.msgstr[0].split('\n').forEach(function (kv) {
		if (kv) {
			var parts = kv.split(':'),
				name = parts.shift().trim(),
				value = parts.join(':').trim();
			po.headers[name] = value;
		}
	});
	if (po.headers['Plural-Forms']) {
		var m = po.headers['Plural-Forms'].match(/nplurals=(\d+);\s*plural=(.*)/);
		if (m && m[1] && m[2]) {
			po.nplurals = parseInt(m[1], 10);
			po.plural = new Function('n', 'return ' + m[2]);
		}
	}

	for (var i = 0, c = messages.length; i < c; i++) {
		var msg = parseMessage(messages[i]);
		if (msg.msgid) po.messages.push(msg);
	}

	return po;
}

function POMessage () {
	this.msgctxt = '';
	this.msgid = '';
	this.references = [];
	this.msgid_plural = null;
	this.msgstr = [];
	this.comments = [];
}

exports.load = function (fn) {
	var contents = fs.readFileSync(fn, 'utf8');
	return PO.parse(contents);
}
