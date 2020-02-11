const commonFunctions = {
	toType: function(obj) {
		if (obj === null) {
			return 'null';
		} else if (typeof obj == 'undefined') {
			return 'undefined';
		} else {
			return {}.toString
				.call(obj)
				.match(/\s([a-z|A-Z]+)/)[1]
				.toLowerCase();
		}
	},

	byObjectProperty: function(fieldName, transformer) {
		//called: resultArray=someArray.sort(qtools.byObjectProperty('somePropertyName'));
		//based on closure of fieldName
		var fullNameSort;
		return (fullNameSort = function(a, b) {
			var localFieldName = fieldName;
			var localTransformer = transformer;
			//for debug
			if (typeof fieldName == 'function') {
				var aa = a;
				var bb = b;
				transformer = fieldName;
			} else {
				var aa = a.qtGetSurePath(fieldName);
				var bb = b.qtGetSurePath(fieldName);
			}

			if (typeof transformer == 'function') {
				aa = transformer(aa);
				bb = transformer(bb);
			} else if (transformer) {
				switch (transformer) {
					case 'caseInsensitive':
						aa = aa.toLowerCase();
						bb = bb.toLowerCase();
						break;
					default:
						console.log(
							'qt.byObjectProperty says, No such transformer as: ' + transformer
						);
						break;
				}
			}

			if (!bb && !aa) {
				return 0;
			}
			if (!bb) {
				return -1;
			}
			if (!aa) {
				return 1;
			}

			if (aa > bb) {
				return 1;
			}
			if (aa < bb) {
				return -1;
			}
			return 0;
		});
	}
};

const docList = [];

// Array.prototype.remove = function(from, to) {
// 	var rest = this.slice((to || from) + 1 || this.length);
// 	this.length = from < 0 ? this.length + from : from;
// 	return this.push.apply(this, rest);
// };

String.prototype.toCamelCase = function(delimiter, pascalCase) {
	var firstCharFunction = pascalCase
		? function(v) {
				return v.toUpperCase();
			}
		: function(v) {
				return v.toLowerCase();
			};
	delimiter = delimiter ? delimiter : ' ';
	return this.split(delimiter)
		.map(function(word) {
			var first = word.substring(0, 1);
			word = word.replace(new RegExp(first), first.toUpperCase());
			return word;
		})
		.join('')
		.replace(/^(.)/, firstCharFunction);
};

const addMorePrototypes = (qtools, updatePrototypes) => {
	// 	if (true) {
	// 		String.prototype.qtReplace = function(parmSet) {
	// 			parmSet.template = this;
	// 			if (parmSet.replaceArray) {
	// 				return qtools.templateReplaceArray(parmSet);
	// 			} else {
	// 				return qtools.templateReplace(parmSet);
	// 			}
	// 		};

	docList.push('String.prototype.qtReplace(templateReplaceArgs)');
	docList.push(
		require('./lib/qtools-number-iterator').addToPrototype(
			'qtools-number-iterator'
		)
	);
	docList.push(
		require('./lib/qtools-includes-regex').addToPrototype('qtIncludesRegex')
	);
	docList.push(require('./lib/qtools-to-string').addToPrototype('qtToString'));
	docList.push(
		require('./lib/qtools-number-keys-to-array').addToPrototype(
			'qtNumberKeysToArray'
		)
	);
	docList.push(
		require('./lib/qtools-object-sure-path').addToPrototype(
			'qtObjectSurePath',
			commonFunctions
		)
	);
	docList.push(
		require('./lib/qtools-print-debug').addToPrototype(
			'qtPrintDebug',
			commonFunctions
		)
	);
};

addMorePrototypes();

module.exports = {
	descriptions: docList.map(item => item && item.description),
	methods: docList.map(
		item => (item.methods ? item.methods.join(', ').replace(/, $/, '') : 'n/a')
	)
};

