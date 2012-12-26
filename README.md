# Node.JS template engines benchmark

## Engines

- [CoffeeKup](https://github.com/mauricemach/coffeekup) v0.3.1 ([website](http://coffeekup.org/))
- [doT](https://github.com/olado/doT) v0.2.6 ([website](http://olado.github.com/doT/))
- [Dust](https://github.com/linkedin/dustjs) v1.1.1 ([website](http://linkedin.github.com/dustjs/))
- [Eco](https://github.com/sstephenson/eco) v1.1.0-rc-3
- [ECT](https://github.com/baryshev/ect) v0.4.1 ([website](http://ectjs.com/))
- [EJS](https://github.com/visionmedia/ejs) v0.8.3
- [Fest](https://github.com/mailru/fest) v0.4.4
- [Handlebars.js](https://github.com/wycats/handlebars.js/) v1.0.7 ([website](http://handlebarsjs.com/))
- [Hogan.js](https://github.com/twitter/hogan.js) v2.0.0 ([website](http://twitter.github.com/hogan.js/))
- [Jade](https://github.com/visionmedia/jade) v0.27.7 ([website](http://jade-lang.com/))
- [Swig](https://github.com/paularmstrong/swig) v0.13.4
- [Underscore](https://github.com/documentcloud/underscore) v1.4.3 ([website](http://underscorejs.org/))

## Test environment

- CPU: Intel Core i5 450M 2.4Ghz
- OS: Ubuntu Server 12.04
- Node.JS version: 0.8.16

## Results

	Rendering 100000 templates:

	ECT
	  Escaped   : 2195ms
	  Unescaped : 132ms
	  Total     : 2327ms

	Dust
	  Escaped   : 2675ms
	  Unescaped : 380ms
	  Total     : 3055ms

	Hogan.js
	  Escaped   : 3244ms
	  Unescaped : 774ms
	  Total     : 4018ms

	Fest
	  Escaped   : 4164ms
	  Unescaped : 268ms
	  Total     : 4432ms

	Handlebars.js
	  Escaped   : 4240ms
	  Unescaped : 278ms
	  Total     : 4518ms

	EJS without `with`
	  Escaped   : 4584ms
	  Unescaped : 466ms
	  Total     : 5050ms

	doT
	  Escaped   : 5084ms
	  Unescaped : 80ms
	  Total     : 5164ms

	Swig
	  Escaped   : 5048ms
	  Unescaped : 392ms
	  Total     : 5440ms

	Underscore
	  Escaped   : 5975ms
	  Unescaped : 2286ms
	  Total     : 8261ms

	Eco
	  Escaped   : 7859ms
	  Unescaped : 955ms
	  Total     : 8814ms

	EJS
	  Escaped   : 6551ms
	  Unescaped : 3326ms
	  Total     : 9877ms

	Jade without `with`
	  Escaped   : 8593ms
	  Unescaped : 3092ms
	  Total     : 11685ms

	CoffeeKup
	  Escaped   : 5303ms
	  Unescaped : 10530ms
	  Total     : 15833ms

	Jade
	  Escaped   : 17568ms
	  Unescaped : 12278ms
	  Total     : 29846ms

## Usage

	git clone git://github.com/baryshev/template-benchmark.git
	cd template-benchmark
	npm install
	node ./benchmark.js
