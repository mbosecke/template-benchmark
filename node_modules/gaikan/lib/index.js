/*jslint node: true*/
module.exports = typeof window === 'undefined' ?
		require('./server') :
		require('./browser');