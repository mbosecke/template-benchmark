/*jslint node: true*/
'use strict';
// Initialize the encode regular expression.
var encode = /[&<>"]/g;
// Initialize the encode character map ...
var encodeMap = {
	// ... with the ampersand ...
	'&': '&#38;',
	// ... with the smaller than ...
	'<': '&#60;',
	// ... with the greater than ...
	'>': '&#62;',
	// ... with the quote.
	'"': '&#34;'
};

/**
 * Encodes the value.
 *
 * @param value The value.
 * @returns The value.
 */
module.exports = function (value) {
	// Check if the value is not a string.
	if (typeof value !== 'string' || !encode.test(value)) {
		// Return the value.
		return value;
	}
	// Encode the characters ...
	return value.replace(encode, function (chr) {
		// ... and replace with the value from the map.
		return encodeMap[chr];
	});
};