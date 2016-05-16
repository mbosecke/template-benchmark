var path = require('path'); 
exports.validate = function (xml) {
    'use strict';

    var sax = require('./sax'),
        parser = sax.parser(true, {xmlns: true}),
        errors = [];
    parser.onerror = function (err) {
        errors.push(err);
        this.error = null;
    };
    parser.write(xml);
    parser.close();

    return errors.length ? errors : true;
};

exports.abs_path = function(f) {
    /* Resolve absolute pathname. */
    if (f[0] === '~' && f[1] === path.sep) {
        // don't forget about HOME: '~'
        var homedir = process.env.HOME || process.env.USERPROFILE;
        f = homedir + f.slice(1);
    }
    return path.resolve(f);  // convert any path to absolute (relative to current work dir)
};
