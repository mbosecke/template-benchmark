/*jslint node: true*/
'use strict';
// Initialize the windows mode status.
var inWindows = typeof process !== 'undefined' && /win/.test(process.platform);
// Initialize the platform-specific suffix.
var platformSuffix = inWindows ? 'windows-alterant' : 'alterant';

/**
 * Placeholder.
 *
 * @param name The name.
 * @param root The root.
 * @param fragments (Optional) Each fragment.
 * @returns The rendered template.
 */
module.exports = function (name, root, fragments) {
	// Return a placeholder.
	return '(UNRESOLVED-TEMPLATE(' + name + '))';
};

/**
 * Each alterant.
 */
module.exports.alterant = {
	// Include the break alterant.
	'break': require('./alterant/break-alterant'),
	// Include the decode alterant.
	'decode': require('./alterant/decode-alterant'),
	// Include the encode alterant.
	'encode': require('./alterant/encode-' + platformSuffix),
	// Include the lower alterant.
	'lower': require('./alterant/lower-alterant'),
	// Include the title alterant.
	'title': require('./alterant/title-alterant'),
	// Include the upper alterant.
	'upper': require('./alterant/upper-alterant'),
	// Include the url alterant.
	'url': require('./alterant/url-alterant')
};

/**
 * Each set.
 */
module.exports.set = {
	// Include the empty set.
	'empty': require('./set/empty-set'),
	// Include the sort set.
	'sort': require('./set/sort-set')
};