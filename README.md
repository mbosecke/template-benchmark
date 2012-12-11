# Node.JS template engines benchmark

## Engines

- [CoffeeKup](https://github.com/mauricemach/coffeekup) v0.3.1 ([website](http://coffeekup.org/))
- [doT](https://github.com/olado/doT) v0.2.6 ([website](http://olado.github.com/doT/))
- [Dust](https://github.com/linkedin/dustjs) v1.1.1 ([website](http://linkedin.github.com/dustjs/))
- [Eco](https://github.com/sstephenson/eco) v1.1.0-rc-3
- [ECT](https://github.com/baryshev/ect) v0.3.5 ([website](http://ectjs.com/))
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
	  Escaped   : 2349ms
	  Unescaped : 136ms
	  Total     : 2485ms
	
	Dust
	  Escaped   : 2842ms
	  Unescaped : 376ms
	  Total     : 3218ms
	
	Hogan.js
	  Escaped   : 3441ms
	  Unescaped : 809ms
	  Total     : 4250ms
	
	Fest
	  Escaped   : 4541ms
	  Unescaped : 352ms
	  Total     : 4893ms
	
	Handlebars.js
	  Escaped   : 4339ms
	  Unescaped : 279ms
	  Total     : 4618ms
	
	EJS without `with`
	  Escaped   : 4689ms
	  Unescaped : 499ms
	  Total     : 5188ms
	
	doT
	  Escaped   : 5145ms
	  Unescaped : 84ms
	  Total     : 5229ms
	
	Swig
	  Escaped   : 5299ms
	  Unescaped : 401ms
	  Total     : 5700ms
	
	Eco
	  Escaped   : 8356ms
	  Unescaped : 972ms
	  Total     : 9328ms
	
	EJS
	  Escaped   : 6570ms
	  Unescaped : 2919ms
	  Total     : 9489ms
	
	Jade without `with`
	  Escaped   : 9589ms
	  Unescaped : 4674ms
	  Total     : 14263ms
	
	CoffeeKup
	  Escaped   : 5882ms
	  Unescaped : 11011ms
	  Total     : 16893ms
	
	Jade
	  Escaped   : 17987ms
	  Unescaped : 13378ms
	  Total     : 31365ms

## Usage

	git clone git://github.com/baryshev/template-benchmark.git
	cd template-benchmark
	npm install
	node ./benchmark.js
