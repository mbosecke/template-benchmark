module.exports = function() {
	var result = [];

	process.argv.slice(2).forEach(function (arg) {
		if (0 === arg.indexOf('--')) {
			var kv = arg.slice(2).split(/\s*=\s*/);

			var key = kv[0];
			var value = typeof kv[1] === 'undefined' ? true : kv[1];

			if(value === 'true') {
				value = true;
			}

			if(value === 'false') {
				value = false;
			}

			// support for multilevel parameters
			if(key.indexOf('.')) {
				var arr = result;

				var parts = key.split('.');

				parts.forEach(function(part, i) {
					if(i < parts.length - 1) {
						if(arr[part] == undefined) {
							arr[part] = {};
						}

						arr = arr[part];

					} else {
						arr[part] = value;
					}
				})

			} else {
				result[key] = value;
			}

		} else {
			result.push(arg);
		}
	})

	return result;
}()
