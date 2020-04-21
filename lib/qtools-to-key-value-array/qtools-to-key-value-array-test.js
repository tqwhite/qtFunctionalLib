#!/usr/local/bin/node
'use strict';
const {qtHelp} = require('qtFunctionalLib'); //adds several methods to prototypes, execute console.dir(qtHelp()) for details

//START OF moduleFunction() ============================================================

const moduleFunction = function(args={}) {


const testObject={
	keyOne:'value one',
	keyTwo:'value two',
	keyThree:'value three',
}


const testMap=new Map();

testMap.set('keyOne', 'value one');
testMap.set('keyTwo', 'value two');
testMap.set('keyThree', 'value three');

const testSet=new Set();

testSet.add('value one');
testSet.add('value two');
testSet.add('value three');


const objectResult=testObject.qtToKeyValueArray();
console.dir({"objectResult [qtools-to-key-value-array-test.js.moduleFunction]":objectResult});

const mapResult=testMap.qtToKeyValueArray();
console.dir({"mapResult [qtools-to-key-value-array-test.js.moduleFunction]":mapResult});

const setResult=testSet.qtToKeyValueArray();
console.dir({"setResult [qtools-to-key-value-array-test.js.moduleFunction]":setResult});

const errorResdult='does not work for strings'.qtToKeyValueArray();





	return this;
};

//END OF moduleFunction() ============================================================

//module.exports = moduleFunction;
module.exports = new moduleFunction();

