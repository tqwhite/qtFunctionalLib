const commonFunctions = {
	universalAddToPrototype: (commonFunctions, functionObject) => {
			let methods = [];
			let documentation = [];
			let methodName;
		functionObject.forEach((functionItem, inx) => {

			methodName = inx;

			const supportedTypeList = functionItem.supportedTypeList
				.map(item => item.toString().replace(/^function (.*?)\(.*$/, '$1'))
				.join(', ')
				.replace(/, $/, '');

			methods.push(methodName);
			documentation.push({
				name: methodName,
				description: `${methodName}: ${functionItem.description}`,
				supportedTypeList
			});

			functionItem.supportedTypeList.forEach(target => {
				if (typeof target.prototype[methodName] == 'undefined') {
					Object.defineProperty(target.prototype, methodName, {
						value: functionItem.method(commonFunctions),
						writable: false,
						enumerable: false
					});
				}
			});
		});

			return {
				methods,
				documentation
			};
	},

	callerName: (calledFromQtLib = false) => {
		const index = calledFromQtLib ? 3 : 1; //the 1 might need adjusting once this is made available to applications
		return new Error().stack
			.split(/at/)[3]
			.trim()
			.replace(/Object\.<anonymous>/, 'not_in_function');
	},

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

const docList = [];
const addMorePrototypes = () => {
	const fs = require('fs');
	const path = require('path');
	const libDir = path.join(path.dirname(module.filename), 'lib');
	const dirList = fs.readdirSync(libDir);

	dirList.forEach(item => {
		if (item.match(/^qtools/)) {
		
			docList.push(
				require(path.join(libDir, item)).addToPrototype(commonFunctions)
			);
		}
	});
};

addMorePrototypes();

const helpActual = commonFunctions => (queryString = '') => {
	let outList;
	if (!queryString) {
		outList = docList;
	} else {
		outList = docList.filter(item => {
			const regex = new RegExp(queryString, 'i');
			const result=JSON.stringify(item).match(regex);
			return result;
		});
	}
// 	const util=require('util');
// 	util.inspect(docList, { depth: null, maxArrayLength: null }).qtDump('qtFuncionalLib Documentation');
return outList;

};

commonFunctions.help = helpActual(docList);
module.exports = commonFunctions;

