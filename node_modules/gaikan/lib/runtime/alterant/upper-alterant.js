/*jslint node: true*/
'use strict';

/**
 * Alter the casing to lower case.
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
	// Return the upper case value.
	return value.toUpperCase();
};