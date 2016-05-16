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
	// Check if this is a closing element.
	if (!token.isBeginning) {
		// Push the closing command for the if.
		commands.push({indent: -1, type: 'if', value: '}'});
		// Return true.
		return true;
	}
	// Check if the token is associated and not standalone.
	if (typeof token.association !== 'undefined' && !token.isStandalone) {
		// Push the if ...
		commands.push({
			// ... with an indentation modifier ...
			indent: 1,
			// ... with the if type ...
			type: 'if',
			// ... with the appropriate value.
			value: format.call('if ({0}) {', attribute.value || false)
		});
		// Return true.
		return true;
	}
	// Return false.
	return false;
};