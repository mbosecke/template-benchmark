/*jslint node: true*/
'use strict';
// Initialize the check function.
var check;
// Initialize the remove function.
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
		// Initialize the pair.
		pair,
		// Initialize the states.
		states = commands.states;
	// Check if the states array is invalid.
	if (!states) {
		// Initialize the states.
		states = commands.states = [];
	}
	// Check if the attribute value is invalid.
	if (!attribute.value) {
		// Return false.
		return false;
	} else if (token.isBeginning) {
		// Initialize the pair.
		pair = attribute.value.split(/[|,]/, 2);
		// Initialize the state ...
		currentState = {
			// ... with if the token has a fragment in the children ...
			hasPartial: check(token),
			// ... with the fragment ...
			fragment: '__f' + token.index,
			// ... with the type ...
			type: 'include',
			// ... with the variable ...
			variable: pair.length === 2 ? pair[1] || 'root' : 'root',
			// ... with the value ...
			value: pair[0]
		};
		// Check if this is an unassociated element ...
		if (typeof token.association === 'undefined' ||
				// ... or the element has an immediate association ...
				token.association === token.index + 1) {
			// Check if this is not associated ...
			if (typeof token.association === 'undefined' ||
					// ... or is a standalone element.
					token.isStandalone) {
				// Remove the token name to delete the element.
				delete token.name;
			}
			// Push the rendering ...
			commands.push({
				// ... with the type ...
				type: 'include',
				// ... with the value ...
				value: format.call('__o += __r(\'{0}\', {1});',
					// ... formatted with the value ...
					inline(currentState.value),
					// ... formatted with the variable.
					currentState.variable)
			});
		} else if (!currentState.hasPartial) {
			// Push the state to the states.
			states.push(currentState);
			// Push the rendering ...
			commands.push({
				// ... with an indentation modifier ...
				indent: 1,
				// ... with the type ...
				type: 'include',
				// ... with the value ...
				value: format.call('__o += __r(\'{0}\', {1});',
					// ... formatted with the value ...
					inline(currentState.value),
					// ... formatted with the variable.
					currentState.variable)
			});
		} else {
			// Push the state to the states.
			states.push(currentState);
			// Push the include beginning ...
			commands.push({
				// ... with an include indentation marker ...
				includeIndent: 1,
				// ... with the include type ...
				type: 'include',
				// ... with the appropriate value.
				value: format.call('var {0} = {};', currentState.fragment)
			});
		}
	} else if (token.association !== token.index - 1) {
		// Retrieve the state from the states array.
		currentState = states.pop();
		// Check if the state indicates token has a fragment in the children.
		if (currentState.hasPartial) {
			// Push the rendering ...
			commands.push({
				// ... with the type ...
				type: 'include',
				// ... with the value ...
				value: format.call('__o += __r(\'{0}\', {1}, {2});',
					// ... formatted with the value ...
					inline(currentState.value),
					// ... formatted with the variable ...
					currentState.variable,
					// ... formatted with the fragment.
					currentState.fragment)
			});
			// Push the include ending ...
			commands.push({
				// ... with an indentation modifier ...
				includeIndent: -1,
				// ... with the include type ...
				type: 'include'
			});
		} else {
			// Push the include ending ...
			commands.push({
				// ... with an include indentation marker ...
				indent: -1,
				// ... with the include type ...
				type: 'include'
			});
		}
		// Remove non-include/fragment commands within each include block.
		remove(commands);
	}
	// Return true.
	return true;
};

/**
 * Check if the token has a fragment in the children.
 *
 * @param token The token.
 * @returns Indicates if the token contains a fragment.
 */
check = function (token) {
	// Initialize the iterator.
	var i;
	// Check if the token has attributes.
	if (token.attributes) {
		// Iterate through each attribute.
		for (i = 0; i < token.attributes.length; i += 1) {
			// Check if the attribute indicates a fragment.
			if (token.attributes[i].key.toLowerCase() === 'data-fragment') {
				// Return true.
				return true;
			}
		}
	}
	// Check if the token contains children.
	if (token.children) {
		// Iterate through each child.
		for (i = 0; i < token.children.length; i += 1) {
			// Check if the child has a fragment in the children.
			if (check(token.children[i])) {
				// Return true.
				return true;
			}
		}
	}
	// Return false.
	return false;
};

/**
 * Remove non-include/fragment commands within each include block.
 *
 * @param commands Each command.
 */
remove = function (commands) {
	// Initialize the include level.
	var include = 0,
		// Initialize the fragment level.
		fragment = 0,
		// Initialize if splicing is forced.
		forced,
		// Initialize the iterator.
		i,
		// Initialize the command indentation.
		indent,
		// Initialize the type.
		type;
	// Iterate through each command in reverse.
	for (i = commands.length - 1; i >= 0; i -= 1) {
		// Initialize the command indentation.
		indent = commands[i].indent || commands[i].includeIndent;
		// Initialize if splicing is forced.
		forced = false;
		// Initialize the type.
		type = commands[i].type;
		// Check if the command has an indentation.
		if (typeof indent !== 'undefined') {
			// Check if this command is a valid fragment.
			if (type === 'fragment') {
				// Decrement the fragment level with the indent.
				fragment -= indent;
			}
			// Check if this command is a valid include.
			if (type === 'include') {
				// Set if the splicing is forced.
				forced = include > fragment + 1 && type !== 'fragment';
				// Increment the include level with the indent.
				include -= indent;
				// Check if the include level has reached zero.
				if (include === 0) {
					// Break the iteration.
					break;
				}
			}
		}
		// Check if an invalid command is enclosed in an include ...
		if ((include > fragment && type !== 'include' && type !== 'fragment') ||
				// ... or if an invalid command is nesting an include ...
				(include > fragment + 1 && type !== 'fragment') ||
				// ... or if splicing is forced.
				forced) {
			// Remove the command.
			commands.splice(i, 1);
		}
	}
};