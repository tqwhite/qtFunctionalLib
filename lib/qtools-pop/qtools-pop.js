'use strict';
//START OF moduleFunction() ============================================================
var moduleFunction = function(args) {

	const functionObject = new Map();
	
	functionObject.set('qtPop', {
		description: `operand.qtPop() pops with an optional default argument`,
		supportedTypeList: [Object],
		
		method: commonFunctions=>function(defaultValue) {
			const inData=this;
			if (typeof(inData.length)=='undefined'){
				throw "qtPop() works for Arrays only";
			}
			const arrayValue=inData.pop();
			const result=(typeof(arrayValue)!='undefined')?arrayValue:defaultValue;
			return result
		}
		
	});
	

	
	//this has commonFunctions twice because I don't want new thing() or to have an extra function to make it available.
	const addToPrototypeActual = functionObject => commonFunctions => commonFunctions.universalAddToPrototype(commonFunctions, functionObject);
	this.addToPrototype = addToPrototypeActual(functionObject);
	
};
//END OF moduleFunction() ============================================================
//module.exports = moduleFunction;
module.exports = new moduleFunction();