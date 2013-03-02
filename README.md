# Node.JS template engines benchmark

## Engines

- [CoffeeKup](https://github.com/mauricemach/coffeekup) v0.3.1 ([website](http://coffeekup.org/))
- [doT](https://github.com/olado/doT) v1.0.1 ([website](http://olado.github.com/doT/))
- [Dust](https://github.com/linkedin/dustjs) v1.2.1 ([website](http://linkedin.github.com/dustjs/))
- [Eco](https://github.com/sstephenson/eco) v1.1.0-rc-3
- [ECT](https://github.com/baryshev/ect) v0.4.8 ([website](http://ectjs.com/))
- [EJS](https://github.com/visionmedia/ejs) v0.8.3
- [Fest](https://github.com/mailru/fest) v0.5.4
- [Gaikan](https://github.com/Deathspike/gaikan) v1.3.4
- [Handlebars.js](https://github.com/wycats/handlebars.js/) v1.0.9 ([website](http://handlebarsjs.com/))
- [Hogan.js](https://github.com/twitter/hogan.js) v2.0.0 ([website](http://twitter.github.com/hogan.js/))
- [Jade](https://github.com/visionmedia/jade) v0.28.1 ([website](http://jade-lang.com/))
- [Swig](https://github.com/paularmstrong/swig) v0.13.5
- [Underscore](https://github.com/documentcloud/underscore) v1.4.4 ([website](http://underscorejs.org/))

## Test environment

- CPU: Intel Core i5 450M 2.4Ghz
- OS: Ubuntu Server 12.04
- Node.JS version: 0.8.21

## Results

	Rendering 100000 templates:

	ECT
	  Escaped   : 2180ms
	  Unescaped : 133ms
	  Total     : 2313ms

	Dust
	  Escaped   : 2547ms
	  Unescaped : 363ms
	  Total     : 2910ms

	Hogan.js
	  Escaped   : 3252ms
	  Unescaped : 758ms
	  Total     : 4010ms

	Gaikan
	  Escaped   : 4288ms
	  Unescaped : 85ms
	  Total     : 4373ms

	Fest
	  Escaped   : 4179ms
	  Unescaped : 265ms
	  Total     : 4444ms

	EJS without `with`
	  Escaped   : 4526ms
	  Unescaped : 485ms
	  Total     : 5011ms

	doT
	  Escaped   : 5329ms
	  Unescaped : 82ms
	  Total     : 5411ms

	Swig
	  Escaped   : 5020ms
	  Unescaped : 407ms
	  Total     : 5427ms

	Underscore
	  Escaped   : 5775ms
	  Unescaped : 2486ms
	  Total     : 8261ms

	Eco
	  Escaped   : 8512ms
	  Unescaped : 991ms
	  Total     : 9503ms

	EJS
	  Escaped   : 6316ms
	  Unescaped : 2734ms
	  Total     : 9050ms

	Handlebars.js
	  Escaped   : 7815ms
	  Unescaped : 2573ms
	  Total     : 10388ms

	Jade without `with`
	  Escaped   : 8566ms
	  Unescaped : 2982ms
	  Total     : 11548ms

	CoffeeKup
	  Escaped   : 4968ms
	  Unescaped : 9983ms
	  Total     : 14951ms

	Jade
	  Escaped   : 18330ms
	  Unescaped : 12095ms
	  Total     : 30425ms

## Usage

	git clone git://github.com/baryshev/template-benchmark.git
	cd template-benchmark
	npm install
	node ./benchmark.js
