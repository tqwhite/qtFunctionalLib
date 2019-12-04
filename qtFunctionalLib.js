/*
	Array Remove - By John Resig (MIT Licensed)
	http://ejohn.org/blog/javascript-array-remove/
	Remove the second item from the array
		array.remove(1);
	Remove the second-to-last item from the array
		array.remove(-2);
	Remove the second and third items from the array
		array.remove(1,2);
	Remove the last and second-to-last items from the array
		array.remove(-2,-1);
*/

const docList = [
];

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
	if (true) {
		String.prototype.qtReplace = function(parmSet) {
			parmSet.template = this;
			if (parmSet.replaceArray) {
				return qtools.templateReplaceArray(parmSet);
			} else {
				return qtools.templateReplace(parmSet);
			}
		};
		docList.push('String.prototype.qtReplace(templateReplaceArgs)');

docList.push(require('./lib/qtools-number-iterator').addToPrototype());
docList.push(require('./lib/qtools-includes-regex').addToPrototype('qtIncludesRegex'));
docList.push(require('./lib/qtools-to-string').addToPrototype('qtToString'));
docList.push(require('./lib/qtools-number-keys-to-array').addToPrototype('qtNumberKeysToArray'));
	}
};

addMorePrototypes();

module.exports = {
	descriptions:docList.map(item=>item && item.description),
	names:docList.map(item=>item && item.name)
};
