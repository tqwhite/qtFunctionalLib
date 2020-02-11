'use strict';
const util = require('util');

//START OF moduleFunction() ============================================================
var moduleFunction = function(args) {
	
	const addToPrototype = () => (name, commonFunctions) => {
		function qtDump(args={}) {
			const {label='', returnString=false}=args
			const inData = this;
			const moduleName = new Error().stack
				.split(/at/)[2]
				.trim()
				.replace(/Object\.<anonymous>/, 'not_in_function');

			if (typeof this == 'string') {
				if (returnString) {
					return this;
				} else {
					console.log(
						`\n${label ? label + '=' : ''}${this} [${moduleName}]\n`
					);
				}
			} else {
				
				let tmpObject=inData;
				if (label){
					tmpObject={[label]:inData}
				}

				if (returnString) {
					return util.inspect(tmpObject, { depth: null, maxArrayLength: null })+` [${moduleName}]\n`;
				} else {
					console.log(
						`\n${label ? label + ':\n' : ''}${util.inspect(inData, {
							depth: null
						})} [${moduleName}]\n`
					);
					return this;
				}
			}
		} 
		 function qtListProperties(args={}) {
			const inObject = this;
			const {label='', returnString=false, maxShowStringLength=100}=args;


			var outString = label?`${label}:\n`:'';
			var list = [];
			var count = 0;
			var type = commonFunctions.toType(inObject);

			if (type == 'object' || type == 'arguments') {
				var outList = [];
				for (var i in inObject) {
					var element = inObject[i];
					var hadProperties = true;
					var showElement;
					if (
						['object', 'array', 'function', 'map'].indexOf(
							commonFunctions.toType(element)
						) == -1
					) {
						if (element == null) {
							showElement = 'null'.green;
						} else {
							if (element.length > maxShowStringLength) {
								element =
									element.substr(0, maxShowStringLength) +
									' ... (length=' +
									element.length +
									', use maxShowStringLength)'
							}
							if (returnString) {
								showElement = element.toString();
							} else {
								showElement = element.toString();
							}
						}
						if (returnString) {
							var tmp =
								'item #' +
								count +
								" named '" +
								i +
								"' is a " +
								commonFunctions.toType(element) +
								' value= ' +
								showElement;
						} else {
							var tmp =
								'item #' +
								count +
								" named '" +
								i +
								"' is a " +
								commonFunctions.toType(element) +
								' value= ' +
								showElement;
						}
						outList.push({ name: i, string: tmp });
					} else {
						if (returnString) {
							var tmp =
								'item #' +
								count +
								" named '" +
								i +
								"' is a " +
								commonFunctions.toType(element);
						} else {
							var tmp =
								'item #' +
								count +
								" named '" +
								i +
								"' is a " +
								commonFunctions.toType(element);
						}
						outList.push({ name: i, string: tmp });
					}
					count++;
				}

				outList = outList.sort(commonFunctions.byObjectProperty('name'));

				for (var i = 0, len = outList.length; i < len; i++) {
					var element = outList[i];

					
						outString += `\t${element.string}\n`;
				}
			} else if (type == 'array') {
				for (var i = 0, len = list.length; i < len; i++) {
					var element = inObject[i];
					var hadProperties = true;

					
						outString +=
							'item #' +
							count +
							" index '" +
							i +
							' is ' +
							qtools.toType(element) +
							'\n';
					
					count++;
				}
			} else if (type == 'map') {
				var hadProperties = false;
				var outList = [];
				inObject.forEach((element, i, all) => {
					hadProperties = true;

					var showElement;
					if (
						['object', 'array', 'function', 'map'].indexOf(
							qtools.toType(element)
						) == -1
					) {
						if (element == null) {
							showElement = 'null'.green;
						} else {
							if (element.length > maxShowStringLength) {
								element =
									element.substr(0, maxShowStringLength) +
									' ... (length=' +
									element.length +
									')';
							}
							if (returnString) {
								showElement = element.toString();
							} else {
								showElement = element.toString();
							}
						}
						if (returnString) {
							var tmp =
								'item #' +
								count +
								" named '" +
								i +
								"' is a " +
								qtools.toType(element) +
								' value= ' +
								showElement;
						} else {
							var tmp =
								('item #' + count + " named '").grey +
								i.red +
								"' is a ".grey +
								qtools.toType(element).red +
								' value= '.grey +
								showElement;
						}
						outList.push({ name: i, string: tmp });
					} else {
						if (returnString) {
							var tmp =
								'item #' +
								count +
								" named '" +
								i +
								"' is a " +
								qtools.toType(element);
						} else {
							var tmp =
								('item #' + count + " named '").grey +
								i.red +
								"' is a ".grey +
								qtools.toType(element).red;
						}
						outList.push({ name: i, string: tmp });
					}
					count++;
				});

				outList = outList.sort(qtools.byObjectProperty('name'));

				for (var i = 0, len = outList.length; i < len; i++) {
					var element = outList[i];

					
						outString += `\t${element.string}\n`;
				}
			} else {
				if (!returnString) {
					var message =
						"qtools.listProperties says, input was of not an object or array. It was type '" +
						qtools.toType(inObject) +
						"'";
					console.log(message);
					var hadProperties = true; //don't need no properties message
				}
			}
			if (!hadProperties) {
				if (!returnString) {
					console.log('input had no properties');
				}
			}
				if (!returnString) {
					console.log(outString);
					return this;
				}
				else{
				return outString;
				}
		}

		if (typeof Object.prototype.qtDump == 'undefined') {
			Object.defineProperty(Object.prototype, 'qtDump', {
				value: qtDump,
				writable: false,
				enumerable: false
			});
		}

		if (typeof Object.prototype.qtListProperties == 'undefined') {
			Object.defineProperty(Object.prototype, 'qtListProperties', {
				value: qtListProperties,
				writable: false,
				enumerable: false
			});
		}

		return {
			methods: ['[any].qtDump({label:\'\', returnString:false})', 'Object.qtListProperties({label:\'\', returnString:false})'],
			description: `various display functions mainly for debugging`
		};
	};
	this.addToPrototype = addToPrototype();
	
};
//END OF moduleFunction() ============================================================
//module.exports = moduleFunction;
module.exports = new moduleFunction();