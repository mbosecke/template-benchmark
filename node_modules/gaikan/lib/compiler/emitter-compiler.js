/*jslint node: true*/
'use strict';

/**
 * Each emitter.
 */
module.exports = {
	'data-attribute-[\\w\\W]+': require('./emitter/attribute-emitter'),
	// Include the evaluate emitter function.
	'data-evaluate': require('./emitter/evaluate-emitter'),
	// Include the extract emitter function.
	'data-extract': require('./emitter/extract-emitter'),
	// Include the for emitter function.
	'data-for': require('./emitter/for-emitter'),
	// Include the fragment emitter function.
	'data-fragment': require('./emitter/fragment-emitter'),
	// Include the if emitter function.
	'data-if': require('./emitter/if-emitter'),
	// Include the include emitter function.
	'data-include': require('./emitter/include-emitter')
};