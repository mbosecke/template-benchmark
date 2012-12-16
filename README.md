# Node.JS template engines benchmark

## Engines

- [CoffeeKup](https://github.com/mauricemach/coffeekup) v0.3.1 ([website](http://coffeekup.org/))
- [doT](https://github.com/olado/doT) v0.2.6 ([website](http://olado.github.com/doT/))
- [Dust](https://github.com/linkedin/dustjs) v1.1.1 ([website](http://linkedin.github.com/dustjs/))
- [Eco](https://github.com/sstephenson/eco) v1.1.0-rc-3
- [ECT](https://github.com/baryshev/ect) v0.4.0 ([website](http://ectjs.com/))
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
	  Escaped   : 2106ms
	  Unescaped : 124ms
	  Total     : 2230ms
	
	Dust
	  Escaped   : 2663ms
	  Unescaped : 352ms
	  Total     : 3015ms
	
	Hogan.js
	  Escaped   : 3240ms
	  Unescaped : 741ms
	  Total     : 3981ms
	
	Fest
	  Escaped   : 4131ms
	  Unescaped : 240ms
	  Total     : 4371ms
	
	Handlebars.js
	  Escaped   : 4095ms
	  Unescaped : 280ms
	  Total     : 4375ms
	
	EJS without `with`
	  Escaped   : 4533ms
	  Unescaped : 448ms
	  Total     : 4981ms
	
	doT
	  Escaped   : 4997ms
	  Unescaped : 83ms
	  Total     : 5080ms
	
	Swig
	  Escaped   : 5023ms
	  Unescaped : 359ms
	  Total     : 5382ms
	
	Eco
	  Escaped   : 7291ms
	  Unescaped : 987ms
	  Total     : 8278ms
	
	EJS
	  Escaped   : 5969ms
	  Unescaped : 2717ms
	  Total     : 8686ms
	
	Jade without `with`
	  Escaped   : 8424ms
	  Unescaped : 3033ms
	  Total     : 11457ms
	
	CoffeeKup
	  Escaped   : 5044ms
	  Unescaped : 10139ms
	  Total     : 15183ms
	
	Jade
	  Escaped   : 16155ms
	  Unescaped : 10761ms
	  Total     : 26916ms

## Usage

	git clone git://github.com/baryshev/template-benchmark.git
	cd template-benchmark
	npm install
	node ./benchmark.js
