'use strict';
//START OF moduleFunction() ============================================================
var moduleFunction = function(args) {

	const functionObject = new Map();

	functionObject.set('qtGetByProperty', {
		description: `objectArray.getByProperty('path.into.objects[3].property', 'matchValue', 'optionalDefault') returns element path value==match value or default`,
		supportedTypeList: [Object],

		method: commonFunctions=>function(
		propertyName,
		propertyValue,
		defaultValue
	) {
	

		const inData=this;
		const isRegExp = propertyValue instanceof RegExp;

		if (inData.length) {
			var len = inData.length;
			var inx = 0;
			for (inx = 0; inx < len; inx++) {
				const item = inData[inx].qtGetSurePath(propertyName);
				if (
					item == propertyValue ||
					(isRegExp && typeof item != 'undefined' && item.match(propertyValue))
				) {
					return inData[inx];
				}
			}
		} else if (typeof inData == 'object') {
			for (var inx in inData) {
				const item = inData[inx].qtGetSurePath(propertyName);
				if (
					item == propertyValue ||
					(isRegExp && typeof item != 'undefined' && item.match(propertyValue))
				) {
					return inData[inx];
				}
			}
		}
		return defaultValue;
	}

	});

	//this has commonFunctions twice because I don't want new thing() or to have an extra function to make it available.
	const addToPrototypeActual = functionObject => commonFunctions => commonFunctions.universalAddToPrototype(commonFunctions, functionObject);
	this.addToPrototype = addToPrototypeActual(functionObject);

};
//END OF moduleFunction() ============================================================
//module.exports = moduleFunction;
module.exports = new moduleFunction();
