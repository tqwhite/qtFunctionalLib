'use strict';
//START OF moduleFunction() ============================================================
var moduleFunction = function(args) {

// console.log("['ax', 'bb'].qtIncludesRegex(/x/)="+['ax', 'bb'].qtIncludesRegex(/x/)+" [config-command-line-manager.js.moduleFunction]");



	const workingFunction = function(needle) {
		if (needle instanceof RegExp) {
			let found = false;
			this.forEach(item => {
				found = (found || item.match(needle))?true:false;
			});
			return found;
		} else {
			return this.includes(needle);
		}
	};

	
	const addToPrototype = (target, workingFunction) => name => {
		if (typeof target.prototype[name] == 'undefined') {
			Object.defineProperty(target.prototype, name, {
				value: workingFunction,
				writable: false,
				enumerable: false
			});
		}
		
		return {
			methods:[name],
			description:`array.${name}(needle)`
		}
	};
	this.addToPrototype = addToPrototype(Object, workingFunction);
	
};
//END OF moduleFunction() ============================================================
//module.exports = moduleFunction;
module.exports = new moduleFunction();
