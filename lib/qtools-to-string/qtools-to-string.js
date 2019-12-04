'use strict';
//START OF moduleFunction() ============================================================
var moduleFunction = function(args) {

// console.log("['a', 'b'].qtToString()="+['a', 'b'].qtToString()+" [config-command-line-manager.js.moduleFunction]");


const toType = function(obj) {
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
	};
	
	
	const workingFunction = function(args) {
	
	switch(toType(this)){
	
	case 'array':
		let separator=', '
		let suffix='';
		let prefix='';
		if (typeof(args)=='string'){
			separator=args;
		}
		else if (typeof(args)=='object'){
			separator=args.separator?args.separator:separator;
			suffix=args.suffix?args.suffix:suffix;
			prefix=args.prefix?args.prefix:prefix;
		}
		else if (typeof(args)!='undefined') {
			throw `qtToString() says, string or {separator:'xxx'} are only valid arguments`
		}
		const tmp=this.join(separator).replace(new RegExp(`${separator}$`), '');
		return `${prefix}${tmp}${suffix}`;
	break;
	default:
		return this.toString();
	}
	
	
	}
	
		
	const addToPrototype = (target, workingFunction) => name => {
		if (typeof target.prototype[name] == 'undefined') {
			Object.defineProperty(target.prototype, name, {
				value: workingFunction,
				writable: false,
				enumerable: false
			});
		}
		
		return {
			name,
			description:`array.${name}({prefix='', suffix='', separator=', '})`
		}
	};
	this.addToPrototype = addToPrototype(Array, workingFunction);
	

};
//END OF moduleFunction() ============================================================
//module.exports = moduleFunction;
module.exports = new moduleFunction();
