/*jslint node: true*/
'use strict';
// Initialize the associate function.
var associate;
// Initialize the textify function.
var textify;
// Initialize the tree function.
var tree;

/**
 * Represents the function performing parsing. The tokens are parsed and
 * associations are made between the syntactic relational pairs. A relational
 * tree is established for the associations and tokens.
 *
 * @param template The tokens.
 * @returns The tree.
 */
module.exports = function (tokens) {
	// Textify tokens between script element tokens.
	textify(tokens, 'script');
	// Textify tokens between style element tokens.
	textify(tokens, 'style');
	// Associate each beginning and ending token.
	associate(tokens);
	// Establish a tree for the tokens and associations.
	return tree(tokens);
};

/**
 * Associate each beginning and ending token.
 *
 * @param tokens The tokens.
 */
associate = function (tokens) {
	// Initialize the beginning token iterator.
	var b,
		// Initialize the beginning.
		beginning,
		// Initialize the ending token iterator.
		e,
		// Initialize the ending.
		ending,
		// Initialize the associated boolean.
		hasAssociated = false,
		// Initialize the validation token iterator.
		v,
		// Initialize the validation.
		validation;
	// Iterate through each token.
	for (b = 0; b < tokens.length; b += 1) {
		// Initialize the beginning.
		beginning = tokens[b];
		// Set the index.
		beginning.index = b;
		// Check if the beginning has not been associated ...
		if (typeof beginning.association === 'undefined' &&
				// ... and is an element ...
				beginning.type === 'element' &&
				// ... and is a beginning ...
				beginning.isBeginning &&
				// ... and is not standalone.
				!beginning.isStandalone) {
			// Iterate in reverse through each token to match an ending.
			for (e = b + 1; e < tokens.length; e += 1) {
				// Initialize the ending.
				ending = tokens[e];
				// Check if the ending has not been associated ...
				if (typeof ending.association === 'undefined' &&
						// ... and is an element ...
						ending.type === 'element' &&
						// ... and is not a beginning ...
						!ending.isBeginning &&
						// ... and the name of the beginning ...
						beginning.name.toLowerCase() ===
						// ... does match the name of the ending.
						ending.name.toLowerCase()) {
					// Iterate through each token to validate the beginning.
					for (v = e - 1; v >= b; v -= 1) {
						// Initialize the validation.
						validation = tokens[v];
						// Check if the validation has not been associated ...
						if (typeof validation.association === 'undefined' &&
								// ... and is an element ...
								validation.type === 'element' &&
								// ... and is a beginning ...
								validation.isBeginning &&
								// ... and is not standalone ...
								!validation.isStandalone &&
								// ... and the name of the validation ...
								validation.name.toLowerCase() ===
								// ... does match the name of the ending.
								ending.name.toLowerCase()) {
							// Check if the beginning matches the validation.
							if (b === v) {
								// Set the associated boolean.
								hasAssociated = true;
								// Set the beginning association.
								beginning.association = e;
								// Set the ending association.
								ending.association = b;
							}
							// Break the iteration.
							break;
						}
					}
				}
			}
		}
	}
	// Check if associations have been established.
	if (hasAssociated) {
		// Recursively associate each beginning and ending token.
		associate(tokens);
	}
};

/**
 * Textify tokens between the specified element tokens.
 *
 * @param tokens The tokens.
 * @param name The name.
 */
textify = function (tokens, name) {
	// Initialize the iterator.
	var i,
		// Initialize the textify boolean.
		isTextifying = false,
		// Initialize the token.
		token;
	// Iterate through each token.
	for (i = 0; i < tokens.length; i += 1) {
		// Initialize the token.
		token = tokens[i];
		// Check if the token is an element ...
		if (token.type === 'element' &&
				// ... and is not standalone ...
				!token.isStandalone &&
				// ... and matches the specified element name.
				token.name.toLowerCase() === name.toLowerCase()) {
			// Set the textifying boolean.
			isTextifying = token.isBeginning;
		} else if (isTextifying) {
			// Set the token type.
			token.type = 'text';
			// Delete the token attributes.
			delete token.attributes;
			// Delete the token name.
			delete token.name;
			// Delete the token beginning boolean.
			delete token.isBeginning;
			// Delete the token standalone boolean.
			delete token.isStandalone;
		}
	}
};

/**
 * Establish a tree for the tokens and associations.
 *
 * @param tokens The tokens.
 * @returns The tree.
 */
tree = function (tokens) {
	// Initialize the iterator.
	var i,
		// Initialize the indentation.
		indent = 0,
		// Initialize the associated boolean.
		isAssociated,
		// Initialize the tree.
		tree = [],
		// Initialize the token.
		token,
		// Initialize the references stack.
		stack = [tree];
	// Iterate through each token.
	for (i = 0; i < tokens.length; i += 1) {
		// Initialize the token.
		token = tokens[i];
		// Initialize the associated boolean.
		isAssociated = typeof token.association !== 'undefined';
		// Check if the an association decreases indentation.
		if (isAssociated && token.association < i) {
			// Decrease the indentation.
			indent -= 1;
			// Pop a reference.
			stack.pop();
		}
		// Set the indentation.
		token.indent = indent;
		// Push the reference.
		stack[stack.length - 1].push(token);
		// Check if the an association increases indentation.
		if (isAssociated && token.association > i) {
			// Increase the indentation.
			indent += 1;
			// Set the children for the token.
			token.children = [];
			// Push the reference.
			stack.push(token.children);
		}
	}
	// Return the tree.
	return tree;
};