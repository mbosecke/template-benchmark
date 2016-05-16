/*jslint node: true*/
/*global setImmediate: false*/
'use strict';
// Initialize the cache.
var cache = {};
// Initialize the compiler function.
var compiler = require('./../compiler');
// Initialize the fs module.
var fs = require('fs');
// Initialize the production mode status.
var isProduction = process.env.NODE_ENV === 'production';
// Initialize the path module.
var path = require('path');
// Initialize the runtime module.
var runtime = require('./../runtime');

/**
 * Render from a file.
 *
 * @param input The input.
 * @param root The root.
 * @param fragments (Optional) Each fragment.
 * @param callback (Optional) The callback.
 * @param skipLayout (Optional) Indicates if the layout is skipped.
 * @returns The rendered template.
 */
module.exports = function (input, root, fragments, callback, skipLayout) {
	// Initialize the options.
	var options = module.exports.options,
		// Initialize the template.
		template = module.exports.compileFromFile(input),
		// Initialize the output.
		output;
	// Check if the fragments is a function.
	if (typeof fragments === 'function') {
		// Set the callback.
		callback = fragments;
		// Set the fragments.
		fragments = {};
	}
	// Check if the callback is a boolean.
	if (typeof callback === 'boolean') {
		// Set the layout skip state.
		skipLayout = callback;
		// Set the callback.
		callback = null;
	}
	// Set the output ...
	output = !options.layout || skipLayout ?
			// ... use the template or ...
			template(module.exports, root, fragments || {}) :
			// ... use the layout with the template as fragment ...
			module.exports(options.layout, root, {
				// ... with the current template as fragment ...
				content: function (runtime, root) {
					// ... with the current fragments.
					return template(runtime, root, fragments || {});
				}
			}, true);
	// Return the scheduled callback, or the output.
	return callback ? setImmediate(callback, null, output) : output;
};

/**
 * Each alterant.
 */
module.exports.alterant = runtime.alterant;

/**
 * Compile a template from a file.
 *
 * @param input The input.
 * @returns The compiled template.
 */
module.exports.compileFromFile = function (input) {
	// Initialize the absolute path.
	var absolutePath,
		// Initialize the contents.
		contents,
		// Initialize the options.
		options = module.exports.options,
		// Initialize the template.
		template;
	// Check if the template has been cached.
	if (options.enableCache && typeof cache[input] !== 'undefined') {
		// Return the template.
		return cache[input];
	} else {
		// Resolve an input.
		absolutePath = (function () {
			// Initialize the current root.
			var currentRoot = module.exports.options.rootDir,
				// Initialize the directories.
				directories = module.exports.options.directories,
				// Initialize the directory path.
				directoryPath,
				// Initialize the extensions.
				extensions = module.exports.options.extensions,
				// Initialize the file with extension.
				fileWithExtension,
				// Initialize the file path.
				filePath,
				// Initialize the iterator.
				i,
				// Initialize the iterator.
				j;
			// Iterate through each directory.
			for (i = 0; i < directories.length; i += 1) {
				// Initialize the absolute path.
				directoryPath = path.join(currentRoot, directories[i]);
				// Iterate through each extension.
				for (j = 0; j < extensions.length; j += 1) {
					// Initialize the file name with extension.
					fileWithExtension = input + '.' + extensions[j];
					// Initialize the file path.
					filePath = path.join(directoryPath, fileWithExtension);
					// Check if the file exists.
					if (fs.existsSync(filePath)) {
						// Return the file path.
						return filePath;
					}
				}
			}
			// Return the input, or null.
			return fs.existsSync(input) ? input : null;
		}());
		// Check if the absolute path is valid.
		if (absolutePath) {
			// Read the file contents.
			contents = fs.readFileSync(absolutePath, 'utf8');
			// Compile the template.
			template = compiler(contents, options.enableCompression);
			// Check if the template should be cached.
			if (options.enableCache) {
				// Add the template to the cache.
				cache[input] = template;
			}
			// Return the template.
			return template;
		}
		// Return the placeholder.
		return function () {
			// Return a message.
			return '(UNRESOLVED-TEMPLATE(' + input + '))';
		};
	}
};

/**
 * Compile a template from a string.
 *
 * @param input The input.
 * @returns The compiled template.
 */
module.exports.compileFromString = function (input) {
	// Initialize the options.
	var options = module.exports.options;
	// Initialize the template.
	return compiler(input, options.enableCompression);
};

/**
 * Each option.
 */
module.exports.options = {
	// The template directories.
	directories: ['views', '.'],
	// Indicates if templates are cached.
	enableCache: isProduction,
	// Indicates if templates render compressed output.
	enableCompression: isProduction,
	// The template file extensions.
	extensions: ['gaikan', 'html'],
	// The root directory which is used to locate the template directories.
	rootDir: path.dirname(require.main.filename),
	// The layout file.
	layout: null
};

/**
 * Each set.
 */
module.exports.set = runtime.set;