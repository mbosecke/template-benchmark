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
- [Gaikan](https://github.com/Deathspike/gaikan) v1.2.1

## Test environment

- CPU: AMD Phenom(tm) II X4 955 3.20 GHz
- OS: Windows 7 64 bit
- Node.JS version: 0.8.20

## Results

	Rendering 100000 templates:
	 
	Gaikan
	  Escaped   : 3381ms
	  Unescaped : 38ms
	  Total     : 3419ms
	 
	ECT
	  Escaped   : 7797ms
	  Unescaped : 153ms
	  Total     : 7950ms
	 
	Dust
	  Escaped   : 9544ms
	  Unescaped : 355ms
	  Total     : 9899ms
	 
	Hogan.js
	  Escaped   : 10124ms
	  Unescaped : 774ms
	  Total     : 10898ms
	 
	Fest
	  Escaped   : 4558ms
	  Unescaped : 288ms
	  Total     : 4846ms
	 
	Handlebars.js
	  Escaped   : 4717ms
	  Unescaped : 287ms
	  Total     : 5004ms
	 
	EJS without `with`
	  Escaped   : 8740ms
	  Unescaped : 569ms
	  Total     : 9309ms
	 
	doT
	  Escaped   : 5375ms
	  Unescaped : 91ms
	  Total     : 5466ms
	 
	Swig
	  Escaped   : 10318ms
	  Unescaped : 381ms
	  Total     : 10699ms
	 
	Underscore
	  Escaped   : 5742ms
	  Unescaped : 2191ms
	  Total     : 7933ms
	 
	Eco
	  Escaped   : 13110ms
	  Unescaped : 1012ms
	  Total     : 14122ms
	 
	EJS
	  Escaped   : 11761ms
	  Unescaped : 2693ms
	  Total     : 14454ms
	 
	Jade without `with`
	  Escaped   : 11530ms
	  Unescaped : 3008ms
	  Total     : 14538ms
	 
	CoffeeKup
	  Escaped   : 4547ms
	  Unescaped : 14383ms
	  Total     : 18930ms
	 
	Jade
	  Escaped   : 19954ms
	  Unescaped : 10105ms
	  Total     : 30059ms

## Usage

	git clone git://github.com/Deathspike/template-benchmark.git
	cd template-benchmark
	npm install
	node ./benchmark.js
