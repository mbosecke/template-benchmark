/*jslint node: true*/
'use strict';
// Initialize the remove block.
var remove;

/**
 * Emit statements into the commands array.
 *
 * @param commands Each command.
 * @param token The token.
 * @param attribute The attribute.
 * @param format The format function.
 * @param inline The inline function.
 * @returns Indicates if the attribute is to be removed.
 */
module.exports = function (commands, token, attribute, format, inline) {
	// Initialize the current state.
	var currentState,
		// Initialize the states.
		states = commands.states;
	// Check if the attribute is invalid.
	if (!attribute.value || typeof token.association === 'undefined') {
		// Return false.
		return false;
	}
	// Check if the state is available.
	if (states && states.length) {
		// Initialize the current state.
		currentState = commands.states[commands.states.length - 1];
		// Check if this is a beginning element.
		if (token.isBeginning) {
			// Push the fragment beginning ...
			commands.push({
				// ... with an indentation modifier ...
				indent: 1,
				// ... with the fragment type ...
				type: 'fragment',
				// ... with the appropriate value ...
				value: format.call('{0}[\'{1}\'] = function (__r, root) {',
					// ... formatted with the fragment ...
					currentState.fragment,
					// ... and the attribute value.
					inline(attribute.value))
			});
			// Push the fragment output ...
			commands.push({
				// ... with the fragment type ...
				type: 'fragment',
				// ... with the appropriate value.
				value: 'var __o = \'\';'
			});
		} else {
			// Push the fragment output ...
			commands.push({
				// ... with the fragment type ...
				type: 'fragment',
				// ... with the appropriate value.
				value: 'return __o;'
			});
			// Push the fragment ending ...
			commands.push({
				// ... with an indentation modifier ...
				indent: -1,
				// ... with the fragment type ...
				type: 'fragment',
				// ... with the appropriate value.
				value: '};'
			});
		}
	} else if (token.isBeginning) {
		// Push the fragment beginning ...
		commands.push({
			// ... with an indentation modifier ...
			indent: 1,
			// ... with the fragment type ...
			type: 'fragment',
			// ... with the appropriate value ...
			value: format.call('if (__f && __f[\'{0}\']) {',
				// ... and the attribute value.
				inline(attribute.value))
		});
		// Push the fragment output ...
		commands.push({
			// ... with the fragment type ...
			type: 'fragment',
			// ... with the appropriate value.
			value: format.call('__o += __f[\'{0}\'](__r, root);',
				// ... and the attribute value.
				inline(attribute.value))
		});
	} else {
		// Push the fragment ending ...
		commands.push({
			// ... with an indentation modifier ...
			indent: -1,
			// ... with the fragment type ...
			type: 'fragment',
			// ... with the appropriate value.
			value: '}'
		});
		// Remove non-fragment commands within each fragment block.
		remove(commands);
	}
	// Return true.
	return true;
};

/**
 * Remove non-fragment commands within each fragment block.
 *
 * @param commands Each command.
 */
remove = function (commands) {
	// Initialize the iterator.
	var i,
		// Initialize the command indentation.
		indent,
		// Initialize the fragment level.
		fragment = 0,
		// Initialize the type.
		type;
	// Iterate through each command in reverse.
	for (i = commands.length - 1; i >= 0; i -= 1) {
		// Initialize the command indentation.
		indent = commands[i].indent;
		// Initialize the type.
		type = commands[i].type;
		// Check if the command has an indentation.
		if (typeof indent !== 'undefined') {
			// Check if this command is a valid fragment.
			if (type === 'fragment') {
				// Decrement the fragment level with the indent.
				fragment -= indent;
				// Check if the fragment level has reached zero.
				if (fragment === 0) {
					// Break the iteration.
					break;
				}
			}
		}
		// Check if an invalid command is enclosed in an include ...
		if (type !== 'fragment') {
			// Remove the command.
			commands.splice(i, 1);
		}
	}
};