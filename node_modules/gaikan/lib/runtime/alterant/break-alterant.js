/*jslint node: true*/
'use strict';

/**
 * Replace each new line with a break element.
 *
 * @param value The value.
 * @returns The value.
 */
module.exports = function (value) {
	// Check if the value is not a string.
	if (typeof value !== 'string') {
		// Return the value.
		return value;
	}
	// Replace each new line with a break.
	return value.replace(/\n/g, '<br />');
};