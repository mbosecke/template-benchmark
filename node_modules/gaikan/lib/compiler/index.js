/*jslint node: true*/
'use strict';
// Initialize the build function.
var build = require('./build-compiler');
// Initialize the lexer function.
var lexer = require('./analyzer/lexer-analyzer');
// Initialize the parser function.
var parser = require('./analyzer/parser-analyzer');

/**
 * Compile the template.
 *
 * @param template The template.
 * @param enableCompression Enables compression.
 * @returns The compiled template.
 */
module.exports = function (template, enableCompression) {
	// Perform lexical analysis and retrieve a sequence of tokens.
	var tokens = lexer(template),
		// Perform parsing and retrieve a syntactic relational tree.
		tree = parser(tokens);
	// Build the template function for the syntactic relational tree.
	return build(tree, enableCompression);
};