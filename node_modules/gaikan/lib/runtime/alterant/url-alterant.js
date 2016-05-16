/*jslint node: true*/
'use strict';

/**
 * Encodes a Uniform Resource Identifier (URI) component.
 *
 * @param value The value.
 * @returns The value.
 */
module.exports = function (value) {
	// Encode a Uniform Resource Identifier (URI) component.
	return encodeURIComponent(value);
};