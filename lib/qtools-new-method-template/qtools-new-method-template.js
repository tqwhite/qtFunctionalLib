'use strict';
//START OF moduleFunction() ============================================================
var moduleFunction = function(args) {

	const functionObject = new Map();
	
	functionObject.set('qtTemplateMethod', {
		description: `operand.qtTemplateMethod('some string') converts 'source' to string and appends argument. This method serves only as a template for creating new qtLib methods.`,
		supportedTypeList: [String, Number],
		
		method: commonFunctions=>function(arg) {
			return this.toString() + `_${arg}`;
		}
		
	});
	

	
	//this has commonFunctions twice because I don't want new thing() or to have an extra function to make it available.
	const addToPrototypeActual = functionObject => commonFunctions => commonFunctions.universalAddToPrototype(commonFunctions, functionObject);
	this.addToPrototype = addToPrototypeActual(functionObject);
	
};
//END OF moduleFunction() ============================================================
//module.exports = moduleFunction;
module.exports = new moduleFunction();
