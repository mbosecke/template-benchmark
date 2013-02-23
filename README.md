# Node.JS template engines benchmark

## Engines

- [CoffeeKup](https://github.com/mauricemach/coffeekup) v0.3.1 ([website](http://coffeekup.org/))
- [doT](https://github.com/olado/doT) v1.0.1 ([website](http://olado.github.com/doT/))
- [Dust](https://github.com/linkedin/dustjs) v1.2.1 ([website](http://linkedin.github.com/dustjs/))
- [Eco](https://github.com/sstephenson/eco) v1.1.0-rc-3
- [ECT](https://github.com/baryshev/ect) v0.4.7 ([website](http://ectjs.com/))
- [EJS](https://github.com/visionmedia/ejs) v0.8.3
- [Fest](https://github.com/mailru/fest) v0.5.4
- [Handlebars.js](https://github.com/wycats/handlebars.js/) v1.0.9 ([website](http://handlebarsjs.com/))
- [Hogan.js](https://github.com/twitter/hogan.js) v2.0.0 ([website](http://twitter.github.com/hogan.js/))
- [Jade](https://github.com/visionmedia/jade) v0.28.1 ([website](http://jade-lang.com/))
- [Swig](https://github.com/paularmstrong/swig) v0.13.5
- [Underscore](https://github.com/documentcloud/underscore) v1.4.4 ([website](http://underscorejs.org/))
- [Gaikan](https://github.com/Deathspike/gaikan) v1.3.3

## Test environment

- CPU: Intel Core i5 450M 2.4Ghz
- OS: Ubuntu Server 12.04
- Node.JS version: 0.8.20

## Results

	Rendering 100000 templates:

	ECT
	  Escaped   : 2248ms
	  Unescaped : 138ms
	  Total     : 2386ms

	Dust
	  Escaped   : 2631ms
	  Unescaped : 404ms
	  Total     : 3035ms

	Hogan.js
	  Escaped   : 3184ms
	  Unescaped : 769ms
	  Total     : 3953ms

	Fest
	  Escaped   : 4309ms
	  Unescaped : 287ms
	  Total     : 4596ms

	EJS without `with`
	  Escaped   : 4807ms
	  Unescaped : 569ms
	  Total     : 5376ms

	doT
	  Escaped   : 5316ms
	  Unescaped : 87ms
	  Total     : 5403ms

	Swig
	  Escaped   : 5209ms
	  Unescaped : 412ms
	  Total     : 5621ms

	Gaikan
	  Escaped   : 5379ms
	  Unescaped : 342ms
	  Total     : 5721ms

	Underscore
	  Escaped   : 5828ms
	  Unescaped : 2341ms
	  Total     : 8169ms

	Eco
	  Escaped   : 8270ms
	  Unescaped : 1053ms
	  Total     : 9323ms

	EJS
	  Escaped   : 7252ms
	  Unescaped : 3110ms
	  Total     : 10362ms

	Handlebars.js
	  Escaped   : 8110ms
	  Unescaped : 2716ms
	  Total     : 10826ms

	Jade without `with`
	  Escaped   : 9043ms
	  Unescaped : 3305ms
	  Total     : 12348ms

	CoffeeKup
	  Escaped   : 5335ms
	  Unescaped : 10788ms
	  Total     : 16123ms

	Jade
	  Escaped   : 18158ms
	  Unescaped : 11901ms
	  Total     : 30059ms

## Usage

	git clone git://github.com/baryshev/template-benchmark.git
	cd template-benchmark
	npm install
	node ./benchmark.js
