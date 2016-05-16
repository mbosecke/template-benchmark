/*jslint node: true*/
'use strict';

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
	// Set the closing tag disabled state.
	token.disableClosingTag = token.isBeginning;
	// Check if the states array is invalid.
	if (!commands.attributeStates) {
		// Initialize the states.
		commands.attributeStates = [];
	}
	// Check if this is a beginning element.
	if (!token.isBeginning) {
		// Initialize the position.
		var position = commands.attributeStates.pop();
		// Push the closing command for the if.
		commands.splice(position + 1, 0, {indent: -1, type: 'if', value: '}'});
		// Push the if ...
		commands.splice(position + 2, 0, {
			// ... with the if type ...
			type: 'text',
			// ... with the appropriate value ...
			value: token.isStandalone ? ' />' : '>'
		});
		// Return true.
		return true;
	}
	// Check if the token is associated and not standalone.
	if (typeof token.association !== 'undefined' && !token.isStandalone) {
		// Initialize the key.
		var key = attribute.key.match(/^[\w\W]+-([\w\W]+?)$/)[1];
		// Push the if ...
		commands.push({
			// ... with an indentation modifier ...
			indent: 1,
			// ... with the if type ...
			type: 'attribute',
			// ... with the appropriate value.
			value: format.call('if ({0}) {', attribute.value || false)
		});
		// Push the if ...
		commands.push({
			// ... with the if type ...
			type: 'attribute',
			// ... with the appropriate value ...
			value: format.call('__o += \' {0}\';', inline(key))
		});
		// Push the position.
		commands.attributeStates.push(commands.length);
		// Return true.
		return true;
	}
	// Return false.
	return false;
};