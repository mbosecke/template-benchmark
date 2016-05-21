# Node.JS template engines benchmark

## Engines

- [CoffeeKup](https://github.com/mauricemach/coffeekup) v0.3.1 ([website](http://coffeekup.org/))
- [doT](https://github.com/olado/doT) v1.0.1 ([website](http://olado.github.com/doT/))
- [Dust](https://github.com/linkedin/dustjs) v2.7.2 ([website](http://linkedin.github.com/dustjs/))
- [Eco](https://github.com/sstephenson/eco) v1.1.0-rc-3
- [ECT](https://github.com/baryshev/ect) v0.5.7 ([website](http://ectjs.com/))
- [EJS](https://github.com/visionmedia/ejs) v1.0.0
- [Fest](https://github.com/mailru/fest) v0.8.2
- [Gaikan](https://github.com/Deathspike/gaikan) v2.0.2
- [Handlebars.js](https://github.com/wycats/handlebars.js/) v4.0.5 ([website](http://handlebarsjs.com/))
- [Mustache.js](https://github.com/janl/mustache.js) v2.2.1 ([website](http://mustache.github.com/))
- [Hogan.js](https://github.com/twitter/hogan.js) v3.0.2 ([website](http://twitter.github.com/hogan.js/))
- [Jade](https://github.com/visionmedia/jade) v1.11.0 ([website](http://jade-lang.com/))
- [Swig](https://github.com/paularmstrong/swig) v1.4.2
- [Underscore](https://github.com/documentcloud/underscore) v1.8.3 ([website](http://underscorejs.org/))

## Test environment

- CPU: Intel Core i5 4460 3.2Ghz
- OS: Windows 10
- Node.JS version: 6.1.0

## Results

	Rendering 100000 templates:

	ECT
	  Escaped   : 2586ms
	  Unescaped : 82ms
	  Total     : 2668ms

	Dust
	  Escaped   : 3719ms
	  Unescaped : 754ms
	  Total     : 4473ms

	Hogan.js
	  Escaped   : 3165ms
	  Unescaped : 253ms
	  Total     : 3418ms

	Gaikan
	  Escaped   : 1214ms
	  Unescaped : 43ms
	  Total     : 1257ms

	Fest
	  Escaped   : 1298ms
	  Unescaped : 218ms
	  Total     : 1516ms

	EJS without `with`
	  Escaped   : 4129ms
	  Unescaped : 501ms
	  Total     : 4630ms

	doT
	  Escaped   : 1752ms
	  Unescaped : 45ms
	  Total     : 1797ms

	Underscore
	  Escaped   : 2245ms
	  Unescaped : 1606ms
	  Total     : 3851ms

	EJS
	  Escaped   : 5730ms
	  Unescaped : 1559ms
	  Total     : 7289ms

	Eco
	  Escaped   : 5207ms
	  Unescaped : 1049ms
	  Total     : 6256ms

	Mustache.js
	  Escaped   : 3707ms
	  Unescaped : 1660ms
	  Total     : 5367ms

	Handlebars.js
	  Escaped   : 1555ms
	  Unescaped : 430ms
	  Total     : 1985ms

	Jade without `with`
	  Escaped   : 1748ms
	  Unescaped : 474ms
	  Total     : 2222ms

	CoffeeKup
	  Escaped   : 2232ms
	  Unescaped : 5761ms
	  Total     : 7993ms

	Jade
	  Escaped   : 3645ms
	  Unescaped : 2317ms
	  Total     : 5962ms


## Usage

	git clone git://github.com/eosite/template-benchmark.git
	cd template-benchmark
	npm install
	node ./benchmark.js
