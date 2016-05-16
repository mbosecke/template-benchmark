/*jslint node: true*/
'use strict';
// Initialize the encode regular expression.
var encode = /[&<>"]/;
// Initialize the encode ampersand regular expression.
var encodeAmpExp = /&/g;
// Initialize the encode lower than regular expression.
var encodeLtExp = /</g;
// Initialize the encode greater than regular expression.
var encodeGtExp = />/g;
// Initialize the encode quote regular expression.
var encodeQuotExp = /"/g;

/**
 * Encodes the value.
 *
 * @param value The value.
 * @returns The value.
 */
module.exports = function (value) {
	// Check if the value is not a string or is not a candidate.
	if (typeof value !== 'string' || !encode.test(value)) {
		// Return the value.
		return value;
	}
	// Encode the ampersand characters ...
	return value.replace(encodeAmpExp, '&#38;')
		// ... and encode the lower than characters ...
		.replace(encodeLtExp, '&#60;')
		// ... and encode the greater than characters ...
		.replace(encodeGtExp, '&#62;')
		// ... and encode the quote characters.
		.replace(encodeQuotExp, '&#34;');
};