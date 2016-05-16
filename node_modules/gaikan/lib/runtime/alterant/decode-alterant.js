/*jslint node: true*/
'use strict';

/**
 * Decode the value.
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
	// Return the value.
	return value.replace(/&#([0-9]{2});/g, function (match, oct) {
		// Parse the base 10 number.
		return String.fromCharCode(parseInt(oct, 10));
	});
};