/*jslint node: true*/
'use strict';

/**
 * Alter the casing to title case.
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
	// Return the title case value.
	return value.replace(/\w\S*/g, function (text) {
		// Begin with an upper case letter and continue as lower case.
		return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
	});
};