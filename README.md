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
- [Gaikan](https://github.com/Deathspike/gaikan) v1.2.1

## Test environment

- CPU: Intel Core i5 450M 2.4Ghz
- OS: Ubuntu Server 12.04
- Node.JS version: 0.8.20

## Results

	Rendering 100000 templates:

	ECT
	  Escaped   : 2296ms
	  Unescaped : 136ms
	  Total     : 2432ms

	Gaikan
	  Escaped   : 3012ms
	  Unescaped : 33ms
	  Total     : 3045ms

	Dust
	  Escaped   : 2687ms
	  Unescaped : 423ms
	  Total     : 3110ms

	Hogan.js
	  Escaped   : 3464ms
	  Unescaped : 793ms
	  Total     : 4257ms

	Fest
	  Escaped   : 4319ms
	  Unescaped : 278ms
	  Total     : 4597ms

	EJS without `with`
	  Escaped   : 4744ms
	  Unescaped : 494ms
	  Total     : 5238ms

	doT
	  Escaped   : 5305ms
	  Unescaped : 91ms
	  Total     : 5396ms

	Swig
	  Escaped   : 5202ms
	  Unescaped : 405ms
	  Total     : 5607ms

	Underscore
	  Escaped   : 6045ms
	  Unescaped : 2729ms
	  Total     : 8774ms

	Eco
	  Escaped   : 8238ms
	  Unescaped : 1003ms
	  Total     : 9241ms

	EJS
	  Escaped   : 6527ms
	  Unescaped : 2835ms
	  Total     : 9362ms

	Handlebars.js
	  Escaped   : 8238ms
	  Unescaped : 2756ms
	  Total     : 10994ms

	Jade without `with`
	  Escaped   : 9671ms
	  Unescaped : 3365ms
	  Total     : 13036ms

	CoffeeKup
	  Escaped   : 5082ms
	  Unescaped : 10555ms
	  Total     : 15637ms

	Jade
	  Escaped   : 17778ms
	  Unescaped : 12013ms
	  Total     : 29791ms

## Usage

	git clone git://github.com/baryshev/template-benchmark.git
	cd template-benchmark
	npm install
	node ./benchmark.js
