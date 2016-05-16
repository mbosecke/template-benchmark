/*jslint node: true*/
'use strict';
// Initialize the emitify function.
var emitify;

/**
 * Emit statements into the commands array.
 *
 * @param commands Each command.
 * @param token The token.
 * @param attribute The attribute.
 * @param format The format function.
 * @param inline The inline function.
 * @returns Indicates if the attribute is to be removed.
 */
module.exports = function (commands, token, attribute, format, inline) {
	// Check if the token is associated and not standalone.
	if (typeof token.association !== 'undefined' && !token.isStandalone) {
		// Remove the token name to delete the element.
		delete token.name;
		// Emitify children of the token.
		emitify(commands, token);
		// Return true.
		return true;
	}
	// Return false.
	return false;
};

/**
 * Emitify children of the token.
 *
 * @param commands Each command.
 * @param token The token.
 */
emitify = function (commands, token) {
	// Check if the element has children.
	if (token.children) {
		// Initialize the child.
		var child,
			// Initialize the iterator.
			i;
		// Iterate through each child.
		for (i = 0; i < token.children.length; i += 1) {
			// Initialize the child.
			child = token.children[i];
			// Push the value as emitted eval code.
			commands.push({type: 'eval', value: child.value});
			// Delete the child token name.
			delete child.name;
			// Delete the child token value.
			delete child.value;
			// Emitify children of the token.
			emitify(commands, child);
		}
	}
};