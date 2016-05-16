/*jslint node: true, evil: true*/
'use strict';
// Initialize the add function.
var add;
// Initialize the emit function.
var emit;
// Initialize each emitter.
var emitters = require('./emitter-compiler');
// Initialize the exists function.
var exists;
// Initialize the finalize function.
var finalize;
// Initialize the find function.
var find;
// Initialize the format function.
var format;
// Initialize the inline function.
var inline;
// Initialize the push function.
var push;
// Initialize the scan function.
var scan;

/**
 * Represents the function which builds the template function for the syntactic
 * relation tree. The tree is traversed and commands are emitted for the tokens,
 * resulting in a functional template.
 *
 * @param tree The token tree.
 * @param enableCompression Enables compression.
 * @returns The build function.
 */
module.exports = function (tree, enableCompression) {
	// Initialize the commands.
	var commands = [],
		// Initialize the iterator.
		i;
	// Iterate through each token in the tree.
	for (i = 0; i < tree.length; i += 1) {
		// Add commands for the token.
		add(commands, tree, tree[i]);
	}
	// Return the function ...
	return new Function(
		// ... with the runtime ...
		'__r',
		// ... with the root ...
		'root',
		// ... with each fragment ...
		'__f',
		// ... with the finalized function.
		finalize(commands, enableCompression).join('\n')
	);
};

/**
 * Add commands for the token.
 *
 * @param commands Each command.
 * @param tree The token tree.
 * @param token The token.
 */
add = function (commands, tree, token) {
	// Initialize the attributes.
	var attributes,
		// Initialize the iterator.
		i,
		// Initialize the index.
		index,
		// Initialize the emitted variable.
		emitted;
	// Switch on the type.
	switch (token.type) {
	// Check if the token indicates an element.
	case 'element':
		// Check if this is a beginning element.
		if (token.isBeginning) {
			// Initialize the token attributes.
			attributes = token.attributes;
			// Initialize emitted commands.
			index = commands.length;

			// Emit attribute commands for the token.
			token.attributes = emit(commands, tree, token);
			// Check if attribute commands have been emitted.
			if (index !== commands.length) {
				// Splice the added commands to preserve proper ordering.
				emitted = commands.splice(index, commands.length - index);
			}
			// Push the token as a command.
			push(commands, token);
			// Set the attributes back to the unmodified attributes.
			token.attributes = attributes;
			// Check if attribute commands have been emitted.
			if (emitted) {
				// Iterate through each emitted command.
				for (i = 0; i < emitted.length; i += 1) {
					// Push the emitted command.
					commands.push(emitted[i]);
				}
			}
		}
		// Check if the element has children.
		if (token.children) {
			// Iterate through each child.
			for (i = 0; i < token.children.length; i += 1) {
				// Add commands for token.
				add(commands, tree, token.children[i]);
			}
		}
		// Check if this is a closing element.
		if (!token.isBeginning) {
			// Emit attribute commands for the token.
			emit(commands, tree, token);
			// Push the token as a command.
			push(commands, token);
		}
		// Break from the switch.
		break;
	// Otherwise check if the token indicates text.
	case 'text':
		// Push the token as a command.
		push(commands, token);
		// Break from the switch.
		break;
	// Otherwise this is a comment or doctype.
	default:
		// Push the token without textification.
		commands.push({type: 'text', value: token.value});
		// Break from the switch.
		break;
	}
};

/**
 * Emit attribute commands for the token.
 *
 * @param commands Each command.
 * @param tree The token tree.
 * @param token The token.
 * @returns The cloned and modified attributes.
 */
emit = function (commands, tree, token) {
	// Initialize the attribute.
	var attribute,
		// Initialize the attributes.
		attributes = [],
		// Initialize the association.
		association,
		// Initialize the iterator.
		i,
		// Initialize the key.
		key,
		// Initialize the name.
		name;
	// Check if this is a beginning element.
	if (token.isBeginning) {
		// Set the attributes.
		attributes = token.attributes.slice(0);
	} else if (typeof token.association !== 'undefined') {
		// Iterate through each token in the tree.
		for (i = 0; i < tree.length; i += 1) {
			// Find the association and check if it is valid.
			if ((association = find(tree[i], token.association)) !== null) {
				// Set the attributes.
				attributes = association.attributes.slice(0);
			}
		}
	}
	// Iterate through each attribute.
	for (i = 0; i < attributes.length; i += 1) {
		// Initialize the attribute.
		attribute = attributes[i];
		// Initialize the name.
		name = attribute.key.toLowerCase();
		// Iterate through each emitter.
		for (key in emitters) {
			// Check if the emitter is valid and ...
			if (emitters.hasOwnProperty(key) &&
					// ... if the attribute matches the emitter.
					new RegExp('^' + key + '$').test(name)) {
				// Invoke and check if the attribute should be removed.
				if (emitters[key](commands, token, attribute, format, inline)) {
					// Splice the attributes.
					attributes.splice(i, 1);
					// Decrement the iterator.
					i -= 1;
				}
				// Break iteration.
				break;
			}
		}
	}
	// Return the cloned and modified attributes.
	return attributes;
};

/**
 * Determines if the substring exists in a command.
 *
 * @param commands The comands.
 * @param substring The substring.
 * @returns Indicates if the substring exists in a command.
 */
exists = function (commands, substring) {
	// Initialize the iterator.
	var i;
	// Iterate through each command.
	for (i = 0; i < commands.length; i += 1) {
		// Check if the command value contains the substring.
		if (commands[i].value && commands[i].value.indexOf(substring) !== -1) {
			// Return true.
			return true;
		}
	}
	// Return false.
	return false;
};

/**
 * Finalize commands and the function lines.
 *
 * @param commands Each command.
 * @param enableCompression Enables compression.
 * @returns The function lines.
 */
finalize = function (commands, enableCompression) {
	// Initialize the command iterator.
	var c,
		// Initialize the identation.
		indent = 1,
		// Initialize the joinable boolean.
		isJoinable,
		// Initialize the indentation iterator.
		j,
		// Initialize the lines.
		lines = commands.slice(0),
		// Initialize the line iterator.
		n,
		// Initialize the type.
		type;
	// Add the output initialization.
	lines.unshift({value: 'var __o = \'\';'});
	// Add the output return.
	lines.push({value: 'return __o;'});
	// Check if the set substring exists in a command.
	if (exists(commands, 'set')) {
		// Add the set initialization.
		lines.unshift({value: 'var set = __r.set;'});
	}
	// Check if the alterant substring exists in a command.
	if (exists(commands, 'alterant')) {
		// Add the alterant initialization.
		lines.unshift({value: 'var alterant = __r.alterant;'});
	}
	// Iterate through each command to join text.
	for (c = 0, n = 1; c < lines.length; c += 1, n += 1) {
		// Check if a next command is available ...
		if (n < lines.length &&
				// ... and if the command is text ...
				lines[c].type === 'text' &&
				// ... and the next command is text.
				lines[n].type === 'text') {
			// Append the next command value to the command value.
			lines[c].value += lines[n].value;
			// Remove the next command.
			lines.splice(n, 1);
			// Decrement the current iterator.
			c -= 1;
			// Decrement the next iterator.
			n -= 1;
		} else if (lines[c].type === 'text') {
			// Check if compression is enabled.
			if (enableCompression) {
				// Compress the whitespaces in the combined text value.
				lines[c].value = lines[c].value.replace(/\s+/g, ' ');
			}
			// Change the command value to include the value.
			lines[c].value = '\'' + inline(lines[c].value) + '\'';
		}
	}
	// Iterate through each command to finalize text and variables.
	for (c = 0, n = 1; c < lines.length; c += 1, n += 1) {
		// Initialize the type.
		type = lines[c].type;
		// Initialize the joinable boolean.
		isJoinable = type === 'var' || type === 'text';
		// Check if a next command is available ...
		if (n < lines.length &&
				// ... and if the command is joinable ...
				isJoinable &&
				// ... and the next command is joinable.
				(lines[n].type === 'var' || lines[n].type === 'text')) {
			// Append the next command value.
			lines[c].value += ' + ' + lines[n].value;
			// Remove the next command.
			lines.splice(n, 1);
			// Decrement the current iterator.
			c -= 1;
			// Decrement the next iterator.
			n -= 1;
		} else if (isJoinable) {
			// Change the command to be appended to the data.
			lines[c].value = '__o += ' + lines[c].value + ';';
		}
	}
	// Iterate through each command to flatten the command.
	for (c = 0; c < lines.length; c += 1) {
		// Check if the indentation is decreasing.
		if (lines[c].indent < 0) {
			// Decrease the indentation.
			indent -= -lines[c].indent;
		}
		// Check if the line value is undefined.
		if (typeof lines[c].value === 'undefined') {
			// Splice the line.
			lines.splice(c, 1);
			// Decrement the iterator.
			c -= 1;
		} else {
			// Iterate for each level of indentation.
			for (j = 0; j < indent; j += 1) {
				// Prepend the command with the indentation.
				lines[c].value = '\t' + lines[c].value;
			}
			// Check if the indentation is increasing.
			if (lines[c].indent > 0) {
				// Increment the indentation.
				indent += lines[c].indent;
			}
			// Change the command to a flat line.
			lines[c] = lines[c].value;
		}
	}
	// Return the lines.
	return lines;
};

/**
 * Find the token for the index.
 *
 * @param token The token.
 * @param index The index.
 * @returns The token with the index, or null.
 */
find = function (token, index) {
	// Check if the index matches the token.
	if (token.index === index) {
		// Return the token.
		return token;
	}
	// Check if the element has children.
	if (token.children) {
		// Initialize the iterator.
		var i,
			// Initialize the result.
			result;
		// Iterate through each child.
		for (i = 0; i < token.children.length; i += 1) {
			// Find the token for the index in the child.
			result = find(token.children[i], index);
			// Check if the result is valid.
			if (result) {
				// Return the result.
				return result;
			}
		}
	}
	// Return null.
	return null;
};

/**
 * Format the this value.
 *
 * @returns The value.
 */
format = function () {
	// Initialize each argument.
	var args = arguments;
	// Replace each number surrounded by braces.
	return this.replace(/\{(\d+)\}/g, function (match, number) {
		// Check if the argument is valid or return the match.
		return typeof args[number] !== 'undefined' ? args[number] : match;
	});
};

/**
 * Escapes text to be used as inline code.
 *
 * @param text The text.
 * @returns The escaped text.
 */
inline = function (text) {
	// Initialize the iterator.
	var i,
		// Initialize the result.
		result = '';
	// Iterate through each character.
	for (i = 0; i < text.length; i += 1) {
		// Switch based on the character.
		switch (text.charAt(i)) {
		case '\'':
			// Escape the character.
			result += '\\\'';
			break;
		case '\\':
			// Escape the character.
			result += '\\\\';
			break;
		case '\b':
			// Escape the character.
			result += '\\b';
			break;
		case '\f':
			// Escape the character.
			result += '\\f';
			break;
		case '\n':
			// Escape the character.
			result += '\\n';
			break;
		case '\r':
			// Escape the character.
			result += '\\r';
			break;
		case '\t':
			// Escape the character.
			result += '\\t';
			break;
		default:
			// Add the character.
			result += text.charAt(i);
			break;
		}
	}
	// Return the result.
	return result;
};

/**
 * Push the token as a command.
 *
 * @param commands Each command.
 * @param token The token.
 * @returns The literalized token.
 */
push = function (commands, token) {
	// Initialize the attribute.
	var attribute,
		// Initialize the begin quote character.
		beginQuote,
		// Initialize emitted commands.
		emitted,
		// Initialize the end quote character.
		endQuote,
		// Initialize the argument iterator.
		i,
		// Initialize the emitted iterator.
		j,
		// Initialize the text.
		text = token.value;
	// Check if the token is an element.
	if (token.type === 'element') {
		// Check if the element has an invalid name.
		if (!token.name) {
			// Stop the function.
			return;
		}
		// Set the text with an opening tag.
		text = (token.isBeginning ? '<' : '</') + token.name;
		// Iterate through each argument.
		for (i = 0; i < token.attributes.length; i += 1) {
			// Initialize the attribute.
			attribute = token.attributes[i];
			// Initialize the begin quote character.
			beginQuote = attribute.quote || '';
			// Initialize the end quote character.
			endQuote = attribute.hasEndQuote ? beginQuote : '';
			// Append the attribute key.
			text += ' ' + attribute.key;
			// Check if the value is to be appended.
			if (typeof attribute.value !== 'undefined') {
				// Initialize emitted commands.
				emitted = [];
				// Scan the text and push commands for code, text and variables.
				attribute.value = scan(emitted, attribute.value, true);
				// Check if commands have been emitted by the scan.
				if (emitted.length) {
					// Append the equals sign and quote to the text.
					text += '=' + beginQuote;
					// Push the text.
					commands.push({type: 'text', value: text});
					// Iterate through each emitted command.
					for (j = 0; j < emitted.length; j += 1) {
						// Push the emitted command to the commands.
						commands.push(emitted[j]);
					}
					// Set the remaining value and quote.
					text = attribute.value + endQuote;
				} else {
					// Append the attribute.
					text += '=' + beginQuote + attribute.value + endQuote;
				}
			}
		}
		// Check if the closing tag is not disabled.
		if (!token.disableClosingTag) {
			// Append the closing tag.
			text += token.isStandalone ? ' />' : '>';
		}
	} else if (token.type === 'text') {
		// Scan the text and push commands for code, text and variables.
		text = scan(commands, text);
	}
	// Check if the text is valid.
	if (text) {
		// Push the text.
		commands.push({type: 'text', value: text});
	}
};

/**
 * Scan the text and push commands for code, text and variables.
 *
 * @param commands Each command.
 * @param text The text.
 * @param enforceAsVar Indicates if an emit is enforced as var.
 * @returns The remainder of the text not affected by the scan.
 */
scan = function (commands, text, enforceAsVar) {
	// Initialize the iterator.
	var i,
		// Initialize the index.
		index,
		// Initialize the match.
		match,
		// Initialize the name.
		name,
		// Initalize the position.
		position = -1,
		// Initialize the regular expression.
		regex = /(@|\#|\!)\{([\w\W]+?)\}/g,
		// Initialize the pre-variable text.
		pre,
		// Initialize the quick formatter.
		qf,
		// Initialize the split position.
		splitPosition,
		// Initialize each subsequent alterant.
		splits,
		// Initialize the type.
		type,
		// Initialize the value.
		value;
	// Initialize the quick formatter.
	qf = function (string, split) {
		// Format the string.
		return format.call(string, name, value, split);
	};
	// Execute the regular expression and iterate through each match.
	while ((match = regex.exec(text)) !== null) {
		// Initialize the type.
		type = match[1];
		// Initialize the name.
		name = match[2];
		// Check if the match is not at the beginning of the text.
		if (match.index !== 0) {
			// Initialize the split position.
			splitPosition = position === -1 ? 0 : position;
			// Initialize the pre-variable text.
			pre = text.substr(splitPosition, match.index - splitPosition);
			// Check if the pre-variable text is valid.
			if (pre) {
				// Push the text ...
				commands.push({
					// ... with the text type ...
					type: 'text',
					// ... with the appropriate value.
					value: pre
				});
			}
		}
		// Check if this is a code injection.
		if (type === '@') {
			// Push the injection ...
			commands.push({
				// ... with the emit type ...
				type: enforceAsVar ? 'var' : 'emit',
				// ... with the appropriate value.
				value: enforceAsVar ? '(' + name + ')' : name
			});
		} else {
			// Initialize the value.
			value = name;
			// Check if the variable declaration contains alterants.
			if ((index = name.search(/[|,]/)) !== -1) {
				// Split the each subsequent alterant.
				splits = name.substr(index + 1).split(/[|,]/);
				// Split the value declaration.
				name = value = value.substr(0, index);
				// Check if the variable declaration is an encoded variable.
				if (type === '#') {
					// Set the value to include the encode alterant.
					value = qf('alterant.encode({1})');
				}
				// Iterate through each split alterant.
				for (i = 0; i < splits.length; i += 1) {
					// Trim the split alterant and check if it is valid.
					if ((splits[i] = splits[i].trim()).length) {
						// Set the value to include the alterant.
						value = qf('alterant.{2}({1})', splits[i]);
					}
				}
			} else if (type === '#') {
				// Set the value to include the encode alterant.
				value = qf('alterant.encode({1})');
			}
			// Push the variable ...
			commands.push({
				// ... with the var type ...
				type: 'var',
				// ... with the appropriate value.
				value: qf('(typeof {0} === \'undefined\' ? \'\' : {1})')
			});
		}
		// Set the position.
		position = match.index + match[0].length;
	}
	// Return the (modified) text.
	return position === -1 ? text : text.substr(position);
};