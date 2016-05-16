/*jslint node: true*/
'use strict';
// Initialize the attributes function.
var attributes;
// Initialize the tokenize function.
var tokenize;

/**
 * Represents the function performing lexical analysis. The template is
 * analysed and converted into a sequence of tokens. Each token contains
 * a group of characters and meta-data.
 *
 * @param template The template.
 * @returns The tokens.
 */
module.exports = function (template) {
	// Initialize the character.
	var character,
		// Initialize the iterator.
		i,
		// Initialize the comment boolean.
		isComment = false,
		// Initialize the element boolean.
		isElement = false,
		// Initialize the position from which to tokenize.
		from = 0,
		// Initialize the quote character.
		quotes = null,
		// Initialize the previous character.
		previousCharacter = 0,
		// Initialize the tokens.
		tokens = [],
		// Initialize the validation string.
		validate,
		// Initialize the validation comment boolean.
		validateIsComment;
	// Iterate through each character in the template.
	for (i = 0; i < template.length; i += 1) {
		// Initialize the character.
		character = template.charAt(i);
		// Check if the token is an element.
		if (isElement) {
			// Check if this token is not a comment ...
			if (!isComment &&
					// ... the character is quote character ...
					(character === '\'' || character === '"') &&
					// ... and the quote character matches.
					(quotes === null || quotes === character)) {
				// Set the quote character.
				quotes = quotes === null ? character : null;
			}
			// Check if the character may indicate the end of the element ...
			if (character === '>' &&
					// ... the quote character is null ...
					quotes === null &&
					// ... and this is either no comment or a closing comment.
					(!isComment || /^-->$/.test(template.substr(i - 2, 3)))) {
				// Tokenize the group of characters.
				tokenize(tokens, template, from, i + 1);
				// Set the comment and element boolean.
				isComment = isElement = false;
				// Set the position from which to tokenize.
				from = i + 1;
			}
		} else if (character === '<') {
			// Initialize the validation string.
			validate = template.substr(i, 9);
			// Initialize the validation comment boolean.
			validateIsComment = /^<!--/.test(validate);
			// Check if the validation string is allowed.
			if (validateIsComment || /^(<!DOCTYPE|<\/?[a-z])/i.test(validate)) {
				// Tokenize the group of characters.
				tokenize(tokens, template, from, i);
				// Set the comment boolean.
				isComment = validateIsComment;
				// Set the element boolean.
				isElement = true;
				// Set the position from which to tokenize.
				from = i;
			}
		}
		// Set the previous character.
		previousCharacter = character;
	}
	// Tokenize the remaining group of characters.
	tokenize(tokens, template, from, template.length);
	// Return each token.
	return tokens;
};

/**
 * Tokenize the attributes.
 *
 * @param value The value.
 * @returns The attributes.
 */
attributes = function (value) {
	// Initialize the attributes.
	var attributes = [],
		// Initialize the character.
		character,
		// Initialize the data.
		data,
		// Initialize the iterator.
		i,
		// Initialize the index.
		index,
		// Initialize the boolean indicating if this is the final character.
		isEnd,
		// Initialize the length.
		length,
		// Initialize the match.
		match = value.match(/^<[a-z0-9]+\s+?([\w\W]*?)\s?\/?>?$/i),
		// Initialize the meta-data.
		meta,
		// Initialize the position.
		position,
		// Initialize the quotes characters.
		quotes;
	// Check if the match is valid.
	if (match) {
		// Initialize the position.
		position = -1;
		// Initialize the quotes characters.
		quotes = null;
		// Initialize the value.
		value = match[1];
		// Iterate through each character, including the end, in the value.
		for (i = position + 1; i <= value.length; i += 1) {
			// Initialize the boolean indicating if this is the final character.
			isEnd = i === value.length;
			// Initialize the character.
			character = isEnd ? null : value.charAt(i);
			// Check if the character is quote character ...
			if ((character === '\'' || character === '"') &&
					// ... and the quote character matches.
					(quotes === null || quotes === character)) {
				// Set the quote character.
				quotes = quotes === null ? character : null;
			}
			// Check if the character is a white-space between attributes.
			if (isEnd || (quotes === null && /^\s$/.test(character))) {
				// Initialize the data.
				data = value.substr(position + 1, i - position - 1);
				// Initialize the index.
				index = data.indexOf('=');
				// Check if the pair is valid.
				if (index !== -1) {
					// Initialize the meta-data ...
					meta = {
						// ... with the key ...
						key: data.substr(0, index),
						// ... with the quote character ...
						quote: null,
						// ... with the value.
						value: data.substr(index + 1)
					};
					// Check if a quote character is available.
					if (meta.value.length && /"|'/.test(meta.value.charAt(0))) {
						// Set the quote character.
						meta.quote = meta.value.charAt(0);
					}
					// Check the quote character.
					if (meta.quote) {
						// Initialize the length.
						length = meta.value.length;
						// Check if the first character is a quote.
						if (meta.value.charAt(0) === meta.quote) {
							// Remove the first character.
							meta.value = meta.value.substr(1);
							// Decrement the length.
							length -= 1;
						}
						// Check if the last character is a quote.
						if (meta.value.charAt(length - 1) === meta.quote) {
							// Remove the last character.
							meta.value = meta.value.substr(0, length - 1);
							// Set the state indicating an end quote is present.
							meta.hasEndQuote = true;
						}
					}
					// Push the meta-data to the attributes.
					attributes.push(meta);
				} else if (data !== '/') {
					// Push the meta-data to the attributes.
					attributes.push({key: data});
				}
				// Set the position.
				position = i;
			}
		}
	}
	// Return the attributes.
	return attributes;
};

/**
 * Tokenize the group of characters.
 *
 * @param tokens Each token.
 * @param template The template.
 * @param from The position from which is tokenized.
 * @param to The position to which is tokenized.
 */
tokenize = function (tokens, template, from, to) {
	// Check if the length of the group of characters is valid.
	if (from !== to) {
		// Initialize the value.
		var value = template.substr(from, to - from),
			// Initialize the token.
			token = {value: value, position: from, type: 'element'};
		// Push the token.
		tokens.push(token);
		// Check if this is a text element.
		if (value[0] !== '<' || !/>$/.test(value)) {
			// Set the type.
			token.type = 'text';
		} else if (/^<!--/.test(value)) {
			// Set the type.
			token.type = 'comment';
		} else if (/^<!DOCTYPE/i.test(value)) {
			// Set the type.
			token.type = 'doctype';
		} else {
			// Set the name.
			token.name = value.match(/^<\/?([a-z0-9]*)/i)[1];
			// Check if the token is invalid.
			if (!token.name) {
				// Set the type.
				token.type = 'text';
			} else {
				// Determine if this is a beginning.
				token.isBeginning = /^<[a-z0-9]/i.test(value);
				// Check if this is a beginning.
				if (token.isBeginning) {
					// Set the attributes.
					token.attributes = attributes(value);
					// Set the standalone boolean.
					token.isStandalone = /\/>$/.test(value);
				} else {
					// Set the attributes.
					token.attributes = [];
					// Set the standalone boolean.
					token.isStandalone = false;
				}
			}
		}
	}
};