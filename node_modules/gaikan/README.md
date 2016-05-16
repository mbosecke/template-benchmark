# Gaikan (2.0.0)

Gaikan is the fastest JavaScript template engine and has been designed to use `data-*` attributes to implement most template features. Due to this design, the templates are completely designer- and tooling friendly. The template engine is compatible with **nodejs**, **expressjs** (a popular web application framework for *nodejs*) and **modern browsers** (IE7+). Test the template engine in the browser with the [interactive Gaikan](http://deathspike.github.io/) (work in progress, IE9+) tool.

## Table of Contents

- [1. Quickstart](#1-quickstart)
- [1.1. NodeJS](#11-nodejs)
- [1.2. ExpressJS](#12-expressjs)
- [1.3. Browser](#13-browser)
- [2. Benchmarks](#2-benchmarks)
- [2.1. Linux Ubuntu 12.04, NodeJS 0.10.26 (100.000x)](#21-linux-ubuntu-1204-nodejs-01026-100000x)
- [2.2. Windows 7 x64 SP1, NodeJS 0.10.26 (100.000x)](#22-windows-7-x64-sp1-nodejs-01026-100000x)
- [3. Introduction](#3-introduction)
- [4. Variables](#4-variables)
- [4.1. Escaping](#41-escaping)
- [4.2. Alterant](#42-alterant)
- [4.2.1. Break](#421-break)
- [4.2.2. Decode](#422-decode)
- [4.2.3. Encode](#423-encode)
- [4.2.4. Lower](#424-lower)
- [4.2.5. Title](#425-title)
- [4.2.6. Upper](#426-upper)
- [4.2.7. Url](#427-url)
- [4.3. Set](#43-set)
- [4.3.1. Empty](#431-empty)
- [4.3.2. Sort](#432-sort)
- [5. Attributes](#5-attributes)
- [5.1. If](#51-if)
- [5.2. For](#52-for)
- [5.3. Attribute](#53-attribute)
- [5.4. Extract](#54-extract)
- [5.5. Include/Fragment](#55-includefragment)
- [5.6. Evaluate](#56-evaluate)
- [6. Tips/Tricks](#6-tipstricks)
- [6.1. Inline CSS](#61-inline-css)
- [6.2. If/Else](#62-ifelse)
- [7. Server API](#7-server-api)
- [7.1. Options](#71-options)
- [7.1.1. Caching](#711-caching)
- [7.1.2. Compression](#712-compression)
- [7.1.3. Directories](#713-directories)
- [7.1.4. Extensions](#714-extensions)
- [7.1.5. Layout](#715-layout)
- [8. Browser API](#8-browser-api)
- [8.1. Configuration](#81-configuration)
- [8.1.1. Compression](#811-compression)
- [9. Runtime](#9-runtime)
- [9.1 Alterant](#91-alterant)
- [9.2 Set](#92-set)
- [10. Security](#10-security)
- [11. Planned Future Additions](#11-planned-future-additions)

## 1. Quickstart
### 1.1. NodeJS

	npm install gaikan

### 1.2. ExpressJS

	var gaikan = require('gaikan');
	app.engine('html', gaikan);
	app.set('view engine', '.html');

### 1.3. Browser

	<script src="gaikan-2.x.x-min.js"  type="text/javascript"></script>

## 2. Benchmarks

The template engine is, at the moment, the fastest JavaScript template engine. The benchmark suite has been made available at [template-benchmark](https://github.com/Deathspike/template-benchmark) (forked from an unmaintained template benchmark suite). The benchmark suite was run on an *AMD Phenom(tm) II X4 955 3.2GHZ* processor.

### 2.1. Linux Ubuntu 12.04, NodeJS 0.10.26 (100.000x)

	Gaikan               ( 2090ms) - fastest
	ECT                  ( 2334ms) - 12% slower
	Fest                 ( 2791ms) - 34% slower
	Dust                 ( 3030ms) - 45% slower
	doT                  ( 3940ms) - 89% slower
	Hogan.js             ( 3977ms) - 90% slower
	EJS without `with`   ( 5190ms) - 148% slower
	Swig                 ( 5258ms) - 152% slower
	Underscore           ( 6154ms) - 194% slower
	Handlebars.js        ( 7255ms) - 247% slower
	Eco                  ( 8315ms) - 298% slower
	EJS                  ( 9059ms) - 333% slower
	Jade without `with`  (10973ms) - 425% slower
	CoffeeKup            (11062ms) - 429% slower
	Jade                 (27295ms) - 1206% slower

### 2.2. Windows 7 x64 SP1, NodeJS 0.10.26 (100.000x)

	Gaikan               ( 2147ms) - fastest
	Fest                 ( 2535ms) - 18% slower
	doT                  ( 3524ms) - 64% slower
	Underscore           ( 5108ms) - 138% slower
	Handlebars.js        ( 5734ms) - 167% slower
	ECT                  ( 7223ms) - 236% slower
	EJS without `with`   ( 8732ms) - 307% slower
	Dust                 ( 9136ms) - 326% slower
	Hogan.js             ( 9960ms) - 364% slower
	Swig                 (10240ms) - 377% slower
	Eco                  (12292ms) - 473% slower
	Jade without `with`  (13510ms) - 529% slower
	EJS                  (14917ms) - 595% slower
	CoffeeKup            (15319ms) - 614% slower
	Jade                 (34000ms) - 1484% slower

## 3. Introduction

It is important to understand a template engine, and this template engine is essentially quite simple. The template engine consumes a template and produces a JavaScript function. That function, representing the template, is then invoked with a **runtime** (`__r`, the helper functions), a **root** object (the user input) and a **fragments** object (`__f`, more on this later). The result of the function is the output. For each example in this documentation, the following object is used as *root*:

	{
		message: '<b>Hello world!</b>',
		messageMultipleLines: 'Hello\nworld!',
        	messagePlain: 'Hello world!',
		people: [{
			age: 25,
			name: 'John'
		}, {
			age: 18,
			name: 'Jane'
		}]
	}

Due to this nature of compiling the template to a *JavaScript* function, the template features (such as variables and attributes) produce *JavaScript* code and emit each line of code into the function. To demonstrate the behaviour of each feature, the examples in this documentation will show the **template**, the **function** and the **output**. For example:

	Hello world!
>

	function anonymous(__r, root, __f) {
		var __o = '';
		__o += 'Hello world!';
		return __o;
	}
>

	Hello world!

It is recommended to use the [interactive Gaikan](http://deathspike.github.io/) (work in progress, IE9+) tool to play with each example.

## 4. Variables

A variable is the only feature that does not use a `data-*` attribute.

	!{root.message}
>

	function anonymous(__r, root, __f) {
		var __o = '';
		__o += (typeof root.message === 'undefined' ? '' : root.message);
		return __o;
	}
>

	<b>Hello world!</b>

### 4.1. Escaping

Escaping a variable prevents XSS and is the recommend variable usage.

	#{root.message}
>

	function anonymous(__r, root, __f) {
		var alterant = __r.alterant;
		var __o = '';
		__o += (typeof root.message === 'undefined' ? '' : alterant.encode(root.message));
		return __o;
	}
>

	&#60;b&#62;Hello world!&#60;/b&#62;

### 4.2. Alterant

An alterant modifies a variable. Multiple alterants can be chained.

	#{root.messagePlain|upper,url}
>

	function anonymous(__r, root, __f) {
		var alterant = __r.alterant;
		var __o = '';
		__o += (typeof root.message === 'undefined' ? '' : alterant.url(alterant.upper(alterant.encode(root.messagePlain))));
		return __o;
	}
>

	HELLO%20WORLD!

#### 4.2.1. Break

The break alterant replaces new lines with `<br />`.

	#{root.messageMultipleLines|break}
>

	function anonymous(__r, root, __f) {
		var alterant = __r.alterant;
		var __o = '';
		__o += (typeof root.messageMultipleLines === 'undefined' ? '' : alterant.break(alterant.encode(root.messageMultipleLines)));
		return __o;
	}
>

	Hello<br />world!

#### 4.2.2. Decode

The decode alterant decodes special HTML characters.

	#{root.message|decode}
>

	function anonymous(__r, root, __f) {
		var alterant = __r.alterant;
		var __o = '';
		__o += (typeof root.message === 'undefined' ? '' : alterant.decode(alterant.encode(root.message)));
		return __o;
	}
>

	<b>Hello world!</b>

#### 4.2.3. Encode

The encode alterant encodes spcial HTML characters. The equivalent of a `#` variable statement.

	!{root.message|encode}
>

	function anonymous(__r, root, __f) {
		var alterant = __r.alterant;
		var __o = '';
		__o += (typeof root.message === 'undefined' ? '' : alterant.encode(root.message));
		return __o;
	}
>

	&#60;b&#62;Hello world!&#60;/b&#62;
	
#### 4.2.4. Lower

The lower alterant changes the variable to lower case.

	#{root.messagePlain|lower}
>
	
	function anonymous(__r, root, __f) {
		var alterant = __r.alterant;
		var __o = '';
		__o += (typeof root.messagePlain === 'undefined' ? '' : alterant.lower(alterant.encode(root.messagePlain)));
		return __o;
	}
>

	hello world!

#### 4.2.5. Title

The title alterant changes the variable to title case.

	#{root.messagePlain|title}
>

	function anonymous(__r, root, __f) {
		var alterant = __r.alterant;
		var __o = '';
		__o += (typeof root.messagePlain === 'undefined' ? '' : alterant.title(alterant.encode(root.messagePlain)));
		return __o;
	}
>

	Hello World!
	
#### 4.2.6. Upper

The upper alterant changes the variable to upper case.

	#{root.messagePlain|upper}
>

	function anonymous(__r, root, __f) {
		var alterant = __r.alterant;
		var __o = '';
		__o += (typeof root.messagePlain === 'undefined' ? '' : alterant.upper(alterant.encode(root.messagePlain)));
		return __o;
	}
>

	HELLO WORLD!

#### 4.2.7. Url

The url alterant encodes the variable as an url component.

	#{root.messagePlain|url}
>

	function anonymous(__r, root, __f) {
		var alterant = __r.alterant;
		var __o = '';
		__o += (typeof root.messagePlain === 'undefined' ? '' : alterant.url(alterant.encode(root.messagePlain)));
		return __o;
	}
>

	Hello%20world!
	
### 4.3. Set

A set operates on an array or object (with properties).

#### 4.3.1. Empty

The empty set checks if a variable is an empty set.

	#{set.empty(root.people)}
>

	function anonymous(__r, root, __f) {
		var alterant = __r.alterant;
		var set = __r.set;
		var __o = '';
		__o += (typeof set.empty(root.people) === 'undefined' ? '' : alterant.encode(set.empty(root.people)));
		return __o;
	}
>

	false

#### 4.3.2. Sort

The sort set can sort a variable, optionally by key and reverse.

	<div data-for="person in set.sort(root.people, 'age')">
	    #{person.name} is #{person.age}
	</div>
>

	function anonymous(__r, root, __f) {
		var alterant = __r.alterant;
		var set = __r.set;
		var __o = '';
		__o += '<div>';
		var __v0 = set.sort(root.people, 'age');
		if (__v0) {
			for (var __k0 = 0; __k0 < __v0.length; __k0 += 1) {
				var person = __v0[__k0];
				__o += '\n    ' + (typeof person.name === 'undefined' ? '' : alterant.encode(person.name)) + ' is ' + (typeof person.age === 'undefined' ? '' : alterant.encode(person.age)) + '\n';
			}
		}
		__o += '</div>';
		return __o;
	}
>

	<div>
	    Jane is 18
	
	    John is 25
	</div>


## 5. Attributes

The `data-*` attributes emits (or omits) lines of code in the function.

### 5.1. If

The `data-if` attribute emits an if.

	<div data-if="root.message.length > 2">
	    #{root.message}
	</div>
>
	
	function anonymous(__r, root, __f) {
		var alterant = __r.alterant;
		var __o = '';
		__o += '<div>';
		if (root.message.length > 2) {
			__o += '\n    ' + (typeof root.message === 'undefined' ? '' : alterant.encode(root.message)) + '\n';
		}
		__o += '</div>\n';
		return __o;
	}
>

	<div>
	    &#60;b&#62;Hello world!&#60;/b&#62;
	</div>

### 5.2. For

The `data-for` attribute emits a for. Use `in` for arrays, `of` for objects. Key can be omitted.

	<div data-for="value, key in root.people">
	    #{value.name} at index #{key} is #{value.age}
	</div>
>

	function anonymous(__r, root, __f) {
		var alterant = __r.alterant;
		var __o = '';
		__o += '    <div>';
		var __v1 = root.people;
		if (__v1) {
			for (var key = 0; key < __v1.length; key += 1) {
				var value = __v1[key];
				__o += '\r\n\t    ' + (typeof value.name === 'undefined' ? '' : alterant.encode(value.name)) + ' at index ' + (typeof key === 'undefined' ? '' : alterant.encode(key)) + ' is ' + (typeof value.age === 'undefined' ? '' : alterant.encode(value.age)) + '\r\n\t';
			}
		}
		__o += '</div>';
		return __o;
	}
>

	<div>
	    John at index 0 is 25
	
	    Jane at index 1 is 18
	</div>

### 5.3. Attribute

The `data-attribute-*` attribute conditionally adds attributes to an element.

	<option data-attribute-selected="root.message.length > 10"></option>
>

	function anonymous(__r, root, __f) {
		var __o = '';
		__o += '<option';
		if (root.message.length > 10) {
			__o += ' selected';
		}
		__o += '></option>';
		return __o;
	}
>

	<option selected></option>

### 5.4. Extract

The `data-extract` attribute removes the containing element.

	<div data-extract>
	    #{root.message}
	</div>
>

	function anonymous(__r, root, __f) {
		var alterant = __r.alterant;
		var __o = '';
		__o += '\n    ' + (typeof root.message === 'undefined' ? '' : alterant.encode(root.message)) + '\n';
		return __o;
	}
>

	&#60;b&#62;Hello world!&#60;/b&#62;

### 5.5. Include/Fragment

The `data-include` attribute includes another template. The *root* passed to the included template is by default `root`, but can be changed using `templateName|root`. The `data-fragment` attribute is used to add a placeholder, or fill a placeholder in the included template.

	<div data-include="templateName">
	    <div data-fragment="content">
	        Replaces the content fragment placeholder in test.
	    </div>
	</div>
>

	function anonymous(__r, root, __f) {
		var __o = '';
		__o += '<div>';
		var __f0 = {};
		__f0['content'] = function (__r, root) {
			var __o = '';
			__o += '\n        Replaces the content fragment placeholder in test.\n    ';
			return __o;
		};
		__o += __r('templateName', root, __f0);
		__o += '</div>';
		return __o;
	}
>

	<div>Test template with placeholder in b: <b>
	        Replaces the content fragment placeholder in test.
	</b></div>

### 5.6. Evaluate

The `data-evaluate` emits the block as *JavaScript* code.  The equivalent of a `@` variable statement.

	<div data-evaluate>
	    console.log('Executed when rendering!');
	</div>
	@{console.log('Executed when rendering!')}
>

	function anonymous(__r,root,__f) {
		var __o = '';
	 	console.log('Executed when rendering!');
		__o += '\n';
		console.log('Executed when rendering!')
		return __o;
	}
	
## 6. Tips/Tricks

These include some common scenarios with simple solutions.

### 6.1. Inline CSS

The `@` variable statement, which evaluates, can act as inline if when in an attribute.

	<div class="@{root ? 'green' : 'red'}"></div>
>

	function anonymous(__r, root, __f) {
		var __o = '';
		__o += '<div class="' + (root ? 'green' : 'red') + '"></div>';
		return __o;
	}
>

	<div class="green"></div>

### 6.2. If/Else

As there is no `data-else` attribute, a test can be stored and used in multiple `data-if` attributes.

	@{var messageValid = root.message.length > 10;}
	<div data-if="messageValid">Valid!</div>
	<div data-if="!messageValid">Not valid...</div>
>

	function anonymous(__r, root, __f) {
		var __o = '';
		var messageValid = root.message.length > 10;
		__o += '\n<div>';
		if (messageValid) {
			__o += 'Valid!';
		}
		__o += '</div>\n<div>';
		if (!messageValid) {
			__o += 'Not valid...';
		}
		__o += '</div>';
		return __o;
	}
>

	<div>Valid!</div>
	<div></div>

## 7. Server API

The server API is available in a **nodejs**/**expressjs** environment.

	gaikan(input, root, fragments = {}, callback = undefined, skipLayout = false)
>
	Compiles a function for the input file, invokes it, and returns the output.
>

	gaikan.compileFromFile(input)
>
	Compiles a function for the input file.
>

	gaikan.compileFromString(input)
>
	Compiles a function for the input string.
	
### 7.1. Options

Available as `gaikan.options`.

#### 7.1.1. Caching

Enables or disables template caching. When enabled, a compiled template is not compiled again.

	gaikan.options.enableCache = isProduction;

#### 7.1.2. Compression

Enables or disables template compression. When enabled, compiled functions compress output.

	gaikan.options.enableCompression = isProduction;
	
#### 7.1.3. Directories

An array with relative directories in which to search templates. Usused for **expressjs**.

	gaikan.options.directories = ['views', '.'];

Templates resolve from the root directory, which defaults to the main script directory.

	gaikan.options.rootDir = path.dirname(require.main.filename);
	
#### 7.1.4. Extensions

An array with allowed template file extensions. Usused for **expressjs**.

	gaikan.options.extensions = ['gaikan', 'html'];
	
#### 7.1.5. Layout

Changes output to be the `content` fragment for the layout. Used when `skipLayout` is false.

	gaikan.options.layout = null;

## 8. Browser API

The browser API is available in a **modern browser** environment.

	gaikan(input, root, fragments = {})
>
	Not yet implemented.
>

	gaikan.compileFromString(input)
>
	Compiles a function for the input string.
	
### 8.1. Configuration

Available as `gaikan.options`.

#### 8.1.1. Compression

Enables or disables template compression. When enabled, compiled functions compress output.

	gaikan.options.enableCompression = false;

## 9. Runtime

In both the **nodejs**/**expressjs** and **modern browser** environment, the template engine serves as runtime.

### 9.1 Alterant

Alterants are available as `gaikan.alterant`. Adding functions makes them available in each template.

### 9.2 Set

Alterants are available as `gaikan.set`. Adding functions makes them available in each template.

## 10. Security

Escape variables to prevent XSS, and do not allow user content as template.

## 11. Planned Future Additions

	* Improve interactive testing environment (examples/interactive).
	* Implement client-side template cache.
	* Implement expressjs hook to run rendering on client.
	* Implement designer prototyping tooling with auto-refresh and data stubbing.