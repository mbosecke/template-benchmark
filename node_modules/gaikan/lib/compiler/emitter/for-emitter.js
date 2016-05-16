/*jslint node: true*/
'use strict';

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
	// Initialize the expression.
	var expression = /^([\w\W]+?)(,\s*([\w\W]*))?\s(in|of)\s([\w\W]+)$/i,
		// Initialize the match.
		match = (attribute.value || '').match(expression),
		// Initialize the quick formatter.
		qf;
	// Check if the match is valid.
	if (typeof token.association !== 'undefined' && match !== null) {
		// Check if this is a closing element.
		if (!token.isBeginning) {
			// Check if the match is an of statement.
			if (match[4].toLowerCase() === 'of') {
				// Push the closing command for the owner.
				commands.push({indent: -1, type: 'for', value: '}'});
			}
			// Push the closing command for the for.
			commands.push({indent: -1, type: 'for', value: '}'});
			// Push the closing command for the validation.
			commands.push({indent: -1, type: 'for', value: '}'});
			// Return true.
			return true;
		}
		// Check if the token is not standalone.
		if (!token.isStandalone) {
			// Initialize the quick formatter.
			qf = function (string) {
				// Format the string with the value source ...
				return format.call(string, '__v' + token.index,
					// ... with the value identifier ...
					match[1],
					// ... with the key identifier ...
					match[3] || '__k' + token.index,
					// ... with the assignable set.
					match[5]);
			};
			// Push the assignment ...
			commands.push({
				// ... with the for type ...
				type: 'for',
				// ... with the appropriate value.
				value: qf('var {0} = {3};')
			});
			// Push the validation ...
			commands.push({
				// ... with an indentation modifier ...
				indent: 1,
				// ... with the for type ...
				type: 'for',
				// ... with the appropriate value.
				value: qf('if ({0}) {')
			});
			// Check if the match is an of statement.
			if (match[4].toLowerCase() === 'of') {
				// Push the for ...
				commands.push({
					// ... with an indentation modifier ...
					indent: 1,
					// ... with the for type ...
					type: 'for',
					// ... with the appropriate value.
					value: qf('for (var {2} in {0}) {')
				});
				// Push the owner ...
				commands.push({
					// ... with an indentation modifier ...
					indent: 1,
					// ... with the for type ...
					type: 'for',
					// ... with the appropriate value.
					value: qf('if ({0}.hasOwnProperty({2})) {')
				});
			} else {
				// Push the for ...
				commands.push({
					// ... with an indentation modifier ...
					indent: 1,
					// ... with the for type ...
					type: 'for',
					// ... with the appropriate value.
					value: qf('for (var {2} = 0; {2} < {0}.length; {2} += 1) {')
				});
			}
			// Push the assignment ...
			commands.push({
				// ... with the for type ...
				type: 'for',
				// ... with the appropriate value.
				value: qf('var {1} = {0}[{2}];')
			});
			// Return true.
			return true;
		}
	}
	// Return false.
	return false;
};