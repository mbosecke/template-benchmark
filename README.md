# Node.JS template engines benchmark

## Engines

- [CoffeeKup](https://github.com/mauricemach/coffeekup) v0.3.1 ([website](http://coffeekup.org/))
- [doT](https://github.com/olado/doT) v0.2.6 ([website](http://olado.github.com/doT/))
- [Dust](https://github.com/linkedin/dustjs) v1.1.1 ([website](http://linkedin.github.com/dustjs/))
- [Eco](https://github.com/sstephenson/eco) v1.1.0-rc-3
- [ECT](https://github.com/baryshev/ect) v0.3.6 ([website](http://ectjs.com/))
- [EJS](https://github.com/visionmedia/ejs) v0.8.3
- [Fest](https://github.com/mailru/fest) v0.4.4
- [Handlebars.js](https://github.com/wycats/handlebars.js/) v1.0.7 ([website](http://handlebarsjs.com/))
- [Hogan.js](https://github.com/twitter/hogan.js) v2.0.0 ([website](http://twitter.github.com/hogan.js/))
- [Jade](https://github.com/visionmedia/jade) v0.27.7 ([website](http://jade-lang.com/))
- [Swig](https://github.com/paularmstrong/swig) v0.13.2

## Test environment

- CPU: Intel Core i5 450M 2.4Ghz
- OS: Ubuntu Server 12.04
- Node.JS version: 0.8.15

## Results

	Rendering 100000 templates:
	
	ECT
	  Escaped   : 2207ms
	  Unescaped : 121ms
	  Total     : 2328ms
	
	Dust
	  Escaped   : 2609ms
	  Unescaped : 377ms
	  Total     : 2986ms
	
	Hogan.js
	  Escaped   : 3586ms
	  Unescaped : 777ms
	  Total     : 4363ms
	
	Fest
	  Escaped   : 4329ms
	  Unescaped : 286ms
	  Total     : 4615ms
	
	Handlebars.js
	  Escaped   : 4554ms
	  Unescaped : 278ms
	  Total     : 4832ms
	
	EJS without `with`
	  Escaped   : 4646ms
	  Unescaped : 471ms
	  Total     : 5117ms
	
	doT
	  Escaped   : 5070ms
	  Unescaped : 80ms
	  Total     : 5150ms
	
	Swig
	  Escaped   : 5117ms
	  Unescaped : 379ms
	  Total     : 5496ms
	
	Eco
	  Escaped   : 7753ms
	  Unescaped : 975ms
	  Total     : 8728ms
	
	EJS
	  Escaped   : 6666ms
	  Unescaped : 2964ms
	  Total     : 9630ms
	
	Jade without `with`
	  Escaped   : 8771ms
	  Unescaped : 3136ms
	  Total     : 11907ms
	
	CoffeeKup
	  Escaped   : 5411ms
	  Unescaped : 10808ms
	  Total     : 16219ms
	
	Jade
	  Escaped   : 16752ms
	  Unescaped : 11003ms
	  Total     : 27755ms

## Usage

	git clone git://github.com/baryshev/template-benchmark.git
	cd template-benchmark
	npm install
	node ./benchmark.js
