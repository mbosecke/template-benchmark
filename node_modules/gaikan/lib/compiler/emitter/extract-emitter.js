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
	// Remove the token name to delete the element.
	delete token.name;
	// Return true.
	return true;
};