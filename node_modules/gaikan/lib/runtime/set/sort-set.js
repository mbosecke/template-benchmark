/*jslint node: true*/
'use strict';

/**
 * The sort set.
 *
 * @param value The value.
 * @param reverse Indicates if the sorting is to be reversed.
 * @param orderBy The key for an array of objects to sort on.
 * @returns Indicates if the value was empty.
 */
module.exports = function (value, reverse, orderBy) {
	// Check if reverse is not a boolean.
	if (typeof reverse !== 'boolean') {
		// Set the key for an array of objects to sort on.
		orderBy = reverse;
		// Set the status indicating if the sorting is to be reversed.
		reverse = false;
	}
	// Check if the value is valid.
	if (value) {
		// Check if the value is an array.
		if (value instanceof Array) {
			// Check if the value should be sorted.
			if (value.length > 1) {
				// Check if the key has been provided.
				if (orderBy) {
					// Sort the array.
					value.sort(function (a, b) {
						// Retrieve the orderBy for a.
						var x = a[orderBy],
							// Retrieve the orderBy for b.
							y = b[orderBy];
						// Return the sort order.
						return x < y ? -1 : (x > y ? 1 : 0);
					});
				} else {
					// Sort the array.
					value.sort();
				}
				// Check if the sorting should be reversed.
				if (reverse) {
					// Reverse the array.
					value.reverse();
				}
			}
		} else if (value instanceof Object) {
			// Initialize the key.
			var key,
				// Initialize the iterator.
				i,
				// Initialize the temporary array.
				temporary = [],
				// Initialize the result.
				result;
			// Iterate through each value.
			for (key in value) {
				// Check if the key is a property of the statements object.
				if (value.hasOwnProperty(key)) {
					// Push the value to the temporary array.
					temporary.push(key);
				}
			}
			// Check if there are properties to sort.
			if (temporary.length > 1) {
				// Initialize the result.
				result = {};
				// Sort the temporary array.
				temporary.sort();
				// Check if the sorting should be reversed.
				if (reverse) {
					// Reverse the temporary array.
					temporary.reverse();
				}
				// Iterate through each item in the array.
				for (i = 0; i < temporary.length; i += 1) {
					// Add the key and value to the result object.
					result[temporary[i]] = value[temporary[i]];
				}
				// Return the result.
				return result;
			}
		}
	}
	// Return the value.
	return value;
};