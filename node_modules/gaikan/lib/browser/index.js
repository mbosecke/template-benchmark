/*jslint node: true*/
'use strict';
// Initialize the compiler function.
var compiler = require('./../compiler');
// Initialize the runtime module.
var runtime = require('./../runtime');

/**
 * Render a template.
 *
 * @param input The input.
 * @param root The root.
 * @param fragments (Optional) Each fragment.
 * @returns The rendered template.
 */
module.exports = function (input, root, fragments) {
	// Return a message.
	return '(CLIENT-NOT-IMPLEMENTED(' + input + '))';
};

/**
 * Each alterant.
 */
module.exports.alterant = runtime.alterant;

/**
 * Compile a template from a string.
 *
 * @param input The input.
 * @returns The compiled template.
 */
module.exports.compileFromString = function (input, root, fragments) {
	// Initialize the options.
	var options = module.exports.options;
	// Initialize the template.
	return compiler(input, options.enableCompression);
};

/**
 * Each option.
 */
module.exports.options = {
	// Indicates if templates render compressed output.
	enableCompression: false
};

/**
 * Each set.
 */
module.exports.set = runtime.set;