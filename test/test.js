"strict";

var chai = require('chai');
chai.Assertion.includeStack = false; // show backtrace on test error

var assert = chai.assert;

var validator = v = require('../validator.js')

suite('validators',function(){
    
    suite('Numbers',function() {
        
        test('literal numbers and instances of Number are numbers',function(){
            assert.isTrue(v.Type.isNumber(0));
            assert.isTrue(v.Type.isNumber(1));
            assert.isTrue(v.Type.isNumber(1.0));
            
            assert.isTrue(v.Type.isNumber(new Number()));
            assert.isTrue(v.Type.isNumber(new Number(0)));
            assert.isTrue(v.Type.isNumber(new Number(1)));
            assert.isTrue(v.Type.isNumber(new Number(1.0)));
        });
        
        test('a string is not number',function(){
            assert.isFalse(v.Type.isNumber(""));
            assert.isFalse(v.Type.isNumber(" "));
            assert.isFalse(v.Type.isNumber("0"));
            assert.isFalse(v.Type.isNumber("1"));
            
            assert.isFalse(v.Type.isNumber(new String("")));
            assert.isFalse(v.Type.isNumber(new String(" ")));
            assert.isFalse(v.Type.isNumber(new String("0")));
            assert.isFalse(v.Type.isNumber(new String("1")));
        });
        
        test('an array is not a number',function(){
            assert.isFalse(v.Type.isNumber([]));
            assert.isFalse(v.Type.isNumber([1]));
        });
        
        test('an object is not a number',function(){
            assert.isFalse(v.Type.isNumber({}));
            assert.isFalse(v.Type.isNumber({'a':1}));
        });
        
        test('a function is not a number',function(){
            assert.isFalse(v.Type.isNumber(function(){}));
            assert.isFalse(v.Type.isNumber(function(){ return 2+2; }));
        });
        
        test('a regexp is not a number',function(){
            assert.isFalse(v.Type.isNumber(/reg/));
        });
        
        test('a boolean is not a number',function(){
            assert.isFalse(v.Type.isNumber(true));
            assert.isFalse(v.Type.isNumber(false));
        });
        
        test('a date is not a number',function(){
            assert.isFalse(v.Type.isNumber(new Date()));
        });
        
        test('undefined is not a number',function(){
            assert.isFalse(v.Type.isNumber(undefined));
        });
        
        test('null is not a number',function(){
            assert.isFalse(v.Type.isNumber(null));
        });
        
        test('is integer (like)',function(){
            assert.isTrue (v.Number.isInteger( 0   ));
            assert.isTrue (v.Number.isInteger(-0   ));
            assert.isTrue (v.Number.isInteger( 0.0 ));
            assert.isTrue (v.Number.isInteger( 1   ));
            assert.isTrue (v.Number.isInteger(-1   ));
            assert.isTrue (v.Number.isInteger( 1.0 ));
            assert.isFalse(v.Number.isInteger( 1.1 ));
            assert.isFalse(v.Number.isInteger( 0.1 ));
        });
        
        test('is float (like)',function(){
            assert.isFalse(v.Number.isFloat( 0   ));
            assert.isFalse(v.Number.isFloat(-0   ));
            assert.isFalse(v.Number.isFloat( 0.0 ));
            assert.isFalse(v.Number.isFloat( 1   ));
            assert.isFalse(v.Number.isFloat(-1   ));
            assert.isFalse(v.Number.isFloat( 1.0 ));
            
            assert.isTrue (v.Number.isFloat( 1.1 ));
            assert.isTrue (v.Number.isFloat( 0.1 ));
        });
        
        test('is infinity',function(){
            assert.isTrue(v.Number.isInfinity( Infinity));
            assert.isTrue(v.Number.isInfinity(-Infinity));
            
            assert.isFalse(v.Number.isInfinity(0));
            assert.isFalse(v.Number.isInfinity(1));
            assert.isFalse(v.Number.isInfinity(1.1));
        });
        
        test('in range',function(){
            assert.isTrue(v.Number.inRange(10,  3, 20));
            assert.isTrue(v.Number.inRange(10, 10, 20));
            assert.isTrue(v.Number.inRange(10,  3, 10));
            
            assert.isFalse(v.Number.inRange(10,  3, 10,{r_exc:true}));
            assert.isFalse(v.Number.inRange(10, 10, 20,{l_exc:true}));
            
            assert.isTrue(v.Number.inRange(0, -5, 3));
            assert.isTrue(v.Number.inRange(0,  0, 3));
            assert.isTrue(v.Number.inRange(0, -5, 0));
            
            assert.isFalse(v.Number.inRange(0, -5, 0,{r_exc:true}));
            assert.isFalse(v.Number.inRange(0,  0, 3,{l_exc:true}));
        });
        
        test('less than',function(){
            assert.isTrue(v.Number.lt( 2  ,  3));
            assert.isTrue(v.Number.lt(-2  ,  3));
            assert.isTrue(v.Number.lt(-2  , -1));
            assert.isTrue(v.Number.lt( 2  ,  Infinity));
            assert.isTrue(v.Number.lt( 0  ,  1));
            assert.isTrue(v.Number.lt( 1.1,  2));
            
            assert.isFalse(v.Number.lt( 3,  3));
            assert.isFalse(v.Number.lt( 0,  0));
            assert.isFalse(v.Number.lt(-3, -5));
            assert.isFalse(v.Number.lt(-3, -Infinity));
        });
        
        test('less than or equal',function(){
            assert.isTrue(v.Number.lte( 2  ,  3));
            assert.isTrue(v.Number.lte(-2  ,  3));
            assert.isTrue(v.Number.lte(-2  , -1));
            assert.isTrue(v.Number.lte( 2  ,  Infinity));
            assert.isTrue(v.Number.lte( 0  ,  1));
            assert.isTrue(v.Number.lte( 1.1,  2));
            
            assert.isTrue(v.Number.lte( 3,  3));
            assert.isTrue(v.Number.lte( 0,  0));
            
            assert.isFalse(v.Number.lte(-3, -5));
            assert.isFalse(v.Number.lte(-3, -Infinity));
        });
        
        test('greather than',function(){
            assert.isTrue(v.Number.gt( 3  ,  2));
            assert.isTrue(v.Number.gt( 3  , -2));
            assert.isTrue(v.Number.gt(-1  , -2));
            assert.isTrue(v.Number.gt( 3  ,  -Infinity));
            assert.isTrue(v.Number.gt( 0  , -1));
            assert.isTrue(v.Number.gt( 2.1,  1.1));
            
            assert.isFalse(v.Number.gt( 3,  3));
            assert.isFalse(v.Number.gt( 0,  0));
            assert.isFalse(v.Number.gt(-5, -3));
            assert.isFalse(v.Number.gt( 3, Infinity));
        });
        
        test('greather than or equal',function(){
            assert.isTrue(v.Number.gte( 3  ,  2));
            assert.isTrue(v.Number.gte( 3  , -2));
            assert.isTrue(v.Number.gte(-1  , -2));
            assert.isTrue(v.Number.gte( 3  ,  -Infinity));
            assert.isTrue(v.Number.gte( 0  , -1));
            assert.isTrue(v.Number.gte( 2.1,  1.1));
            
            assert.isTrue(v.Number.gte( 3,  3));
            assert.isTrue(v.Number.gte( 0,  0));
            
            assert.isFalse(v.Number.gte(-5, -3));
            assert.isFalse(v.Number.gte( 3, Infinity));
        });

    });
    
    suite('Strings',function() {
        
        test('literal strings and instances of String are strings',function(){
            assert.isTrue(v.Type.isString(""));
            assert.isTrue(v.Type.isString(" "));
            assert.isTrue(v.Type.isString("hello"));
            
            assert.isTrue(v.Type.isString(new String()));
            assert.isTrue(v.Type.isString(new String("")));
            assert.isTrue(v.Type.isString(new String(" ")));
            assert.isTrue(v.Type.isString(new String("hello")));
            assert.isTrue(v.Type.isString(new String(0)));
            assert.isTrue(v.Type.isString(new String(1)));
        });
        
        test('a number is not a string',function(){
            assert.isFalse(v.Type.isString(0));
            assert.isFalse(v.Type.isString(1));
            assert.isFalse(v.Type.isString(1.0));
        });
        
        test('an array is not a string',function(){
            assert.isFalse(v.Type.isString([]));
            assert.isFalse(v.Type.isString([1]));
        });
        
        test('an object is not a string',function(){
            assert.isFalse(v.Type.isString({}));
            assert.isFalse(v.Type.isString({'a':1}));
        });
        
        test('a function is not a string',function(){
            assert.isFalse(v.Type.isString(function(){}));
            assert.isFalse(v.Type.isString(function(){ return 2+2; }));
        });
        
        test('a regexp is not a string',function(){
            assert.isFalse(v.Type.isString(/reg/));
        });
        
        test('a boolean is not a string',function(){
            assert.isFalse(v.Type.isString(true));
            assert.isFalse(v.Type.isString(false));
        });
        
        test('a date is not a string',function(){
            assert.isFalse(v.Type.isString(new Date()));
        });
        
        test('undefined is not a string',function(){
            assert.isFalse(v.Type.isString(undefined));
        });
        
        test('null is not a string',function(){
            assert.isFalse(v.Type.isString(null));
        });
    });
    
    suite('Booleans',function() {
        
        test('literal booleans and instances of Boolean are booleans',function(){
            assert.isTrue(v.Type.isBoolean(true));
            assert.isTrue(v.Type.isBoolean(false));
            
            assert.isTrue(v.Type.isBoolean(new Boolean()));
            assert.isTrue(v.Type.isBoolean(new Boolean(true)));
            assert.isTrue(v.Type.isBoolean(new Boolean(false)));
        });
        
        test('a number is not a boolean',function(){
            assert.isFalse(v.Type.isBoolean(0));
            assert.isFalse(v.Type.isBoolean(1));
        });
        
        test('a string is not a boolean',function(){
            assert.isFalse(v.Type.isBoolean(""));
            assert.isFalse(v.Type.isBoolean("0"));
            assert.isFalse(v.Type.isBoolean("1"));
            assert.isFalse(v.Type.isBoolean("true"));
            assert.isFalse(v.Type.isBoolean("false"));
            assert.isFalse(v.Type.isBoolean(" "));
            assert.isFalse(v.Type.isBoolean("hello"));
        });
        
        test('an array is not a boolean',function(){
            assert.isFalse(v.Type.isBoolean([]));
            assert.isFalse(v.Type.isBoolean([0]));
            assert.isFalse(v.Type.isBoolean([1]));
        });
        
        test('a function is not a boolean',function(){
            assert.isFalse(v.Type.isBoolean(function(){}));
            assert.isFalse(v.Type.isBoolean(function(){ return 2+2; }));
        });
        
        test('an object is not a boolean',function(){
            assert.isFalse(v.Type.isBoolean({}));
            assert.isFalse(v.Type.isBoolean({'true':false}));
        });
        
        test('a regexp is not a boolean',function(){
            assert.isFalse(v.Type.isBoolean(/true/));
        });
        
        test('a date is not a boolean',function(){
            assert.isFalse(v.Type.isBoolean(new Date()));
        });
        
        test('undefined is not a boolean',function(){
            assert.isFalse(v.Type.isBoolean(undefined));
        });
        
        test('null is not a boolean',function(){
            assert.isFalse(v.Type.isBoolean(null));
        });
    });
    
    suite('Arrays',function() {
        
        test('literal arrays and instances of Array are arrays',function(){
            assert.isTrue(v.Type.isArray([]));
            assert.isTrue(v.Type.isArray([0]));
            assert.isTrue(v.Type.isArray([1,2,3]));
            
            assert.isTrue(v.Type.isArray(new Array()));
            assert.isTrue(v.Type.isArray(new Array(0)));
            assert.isTrue(v.Type.isArray(new Array(1,2,3)));
        });
        
        test('a number is not an array',function(){
            assert.isFalse(v.Type.isArray(0));
            assert.isFalse(v.Type.isArray(1));
        });
        
        test('a string is not an array',function(){
            assert.isFalse(v.Type.isArray(""));
            assert.isFalse(v.Type.isArray("0"));
            assert.isFalse(v.Type.isArray("1"));
            assert.isFalse(v.Type.isArray("true"));
            assert.isFalse(v.Type.isArray("false"));
            assert.isFalse(v.Type.isArray(" "));
            assert.isFalse(v.Type.isArray("hello"));
        });
        
        test('an object is not an array',function(){
            assert.isFalse(v.Type.isArray({}));
            assert.isFalse(v.Type.isArray({'true':false}));
        });
        
        test('a function is not an array',function(){
            assert.isFalse(v.Type.isArray(function(){}));
            assert.isFalse(v.Type.isArray(function(){ return 2+2; }));
        });
        
        test('a regexp is not an array',function(){
            assert.isFalse(v.Type.isArray(/true/));
        });
        
        test('a boolean is not an array',function(){
            assert.isFalse(v.Type.isArray(true));
            assert.isFalse(v.Type.isArray(false));
        });
        
        test('a date is not an array',function(){
            assert.isFalse(v.Type.isArray(new Date()));
        });
        
        test('undefined is not an array',function(){
            assert.isFalse(v.Type.isArray(undefined));
        });
        
        test('null is not an array',function(){
            assert.isFalse(v.Type.isArray(null));
        });
    });
    
    suite('Objects',function() {
        
        test('literal objects and instances of Object are objects',function(){
            assert.isTrue(v.Type.isObject({}));
            assert.isTrue(v.Type.isObject({0:'a',1:'b'}));
            assert.isTrue(v.Type.isObject({'a':0,'b':1}));
            
            assert.isTrue(v.Type.isObject(new Object()));
            assert.isTrue(v.Type.isObject(new Object({})));
            assert.isTrue(v.Type.isObject(new Object({'a':1})));
        });
        
        test('a number is not an object',function(){
            assert.isFalse(v.Type.isObject(0));
            assert.isFalse(v.Type.isObject(1));
        });
        
        test('a string is not an object',function(){
            assert.isFalse(v.Type.isObject(""));
            assert.isFalse(v.Type.isObject("0"));
            assert.isFalse(v.Type.isObject("1"));
            assert.isFalse(v.Type.isObject("true"));
            assert.isFalse(v.Type.isObject("false"));
            assert.isFalse(v.Type.isObject(" "));
            assert.isFalse(v.Type.isObject("hello"));
        });
        
        test('an array is not an object',function(){
            assert.isFalse(v.Type.isObject([]));
            assert.isFalse(v.Type.isObject([1,2,3]));
        });
        
        test('a function is not a object',function(){
            assert.isFalse(v.Type.isObject(function(){}));
            assert.isFalse(v.Type.isObject(function(){ return 2+2; }));
        });
        
        test('a regexp is not an object',function(){
            assert.isFalse(v.Type.isObject(/reg/));
        });
        
        test('a boolean is not an object',function(){
            assert.isFalse(v.Type.isObject(true));
            assert.isFalse(v.Type.isObject(false));
        });
        
        test('a date is not an object',function(){
            assert.isFalse(v.Type.isObject(new Date()));
        });
        
        test('undefined is not an object',function(){
            assert.isFalse(v.Type.isObject(undefined));
        });
        
        test('null is not an object',function(){
            assert.isFalse(v.Type.isObject(null));
        });
    });
    
    suite('Function',function() {
        
        test('function literals and instances of Function are functions',function(){
            assert.isTrue(v.Type.isFunction(function(){}));
            assert.isTrue(v.Type.isFunction(function(){ return 2+2; }));
        });
        
        test('a number is not a function',function(){
            assert.isFalse(v.Type.isFunction(0));
            assert.isFalse(v.Type.isFunction(1));
        });
        
        test('a string is not a function',function(){
            assert.isFalse(v.Type.isFunction(""));
            assert.isFalse(v.Type.isFunction("0"));
            assert.isFalse(v.Type.isFunction("1"));
            assert.isFalse(v.Type.isFunction("true"));
            assert.isFalse(v.Type.isFunction("false"));
            assert.isFalse(v.Type.isFunction(" "));
            assert.isFalse(v.Type.isFunction("hello"));
        });
        
        test('an object is not a function',function(){
            assert.isFalse(v.Type.isFunction({}));
            assert.isFalse(v.Type.isFunction({'a':1}));
        });
        
        test('an array is not a function',function(){
            assert.isFalse(v.Type.isFunction([]));
            assert.isFalse(v.Type.isFunction([1,2,3]));
        });
        
        test('a regexp is not a function',function(){
            assert.isFalse(v.Type.isFunction(/reg/));
        });
        
        test('a boolean is not a function',function(){
            assert.isFalse(v.Type.isFunction(true));
            assert.isFalse(v.Type.isFunction(false));
        });
        
        test('a date is not a function',function(){
            assert.isFalse(v.Type.isFunction(new Date()));
        });
        
        test('undefined is not a function',function(){
            assert.isFalse(v.Type.isFunction(undefined));
        });
        
        test('null is not a function',function(){
            assert.isFalse(v.Type.isFunction(null));
        });
    });
    
    suite('Undefined',function() {
        
        test('undefined is undefined',function(){
            assert.isTrue(v.Type.isUndefined(undefined));
        });
        
        test('a number is not undefined',function(){
            assert.isFalse(v.Type.isUndefined(0));
            assert.isFalse(v.Type.isUndefined(1));
        });
        
        test('a string is not undefined',function(){
            assert.isFalse(v.Type.isUndefined(""));
            assert.isFalse(v.Type.isUndefined("0"));
            assert.isFalse(v.Type.isUndefined("1"));
            assert.isFalse(v.Type.isUndefined("true"));
            assert.isFalse(v.Type.isUndefined("false"));
            assert.isFalse(v.Type.isUndefined(" "));
            assert.isFalse(v.Type.isUndefined("hello"));
        });
        
        test('an object is not undefined',function(){
            assert.isFalse(v.Type.isUndefined({}));
            assert.isFalse(v.Type.isUndefined({'a':1}));
        });
        
        test('a function is not undefined',function(){
            assert.isFalse(v.Type.isUndefined(function(){}));
            assert.isFalse(v.Type.isUndefined(function(){ return 2+2; }));
        });
        
        test('an array is not undefined',function(){
            assert.isFalse(v.Type.isUndefined([]));
            assert.isFalse(v.Type.isUndefined([1,2,3]));
        });
        
        test('a regexp is not undefined',function(){
            assert.isFalse(v.Type.isUndefined(/reg/));
        });
        
        test('a boolean is not undefined',function(){
            assert.isFalse(v.Type.isUndefined(true));
            assert.isFalse(v.Type.isUndefined(false));
        });
        
        test('a date is not undefined',function(){
            assert.isFalse(v.Type.isUndefined(new Date()));
        });
        
        test('null is not undefined',function(){
            assert.isFalse(v.Type.isUndefined(null));
        });
    });
    
    suite('Null',function() {
        
        test('null is null',function(){
            assert.isTrue(v.Type.isNull(null));
        });
        
        test('a number is not null',function(){
            assert.isFalse(v.Type.isNull(0));
            assert.isFalse(v.Type.isNull(1));
        });
        
        test('a string is not null',function(){
            assert.isFalse(v.Type.isNull(""));
            assert.isFalse(v.Type.isNull("0"));
            assert.isFalse(v.Type.isNull("1"));
            assert.isFalse(v.Type.isNull("true"));
            assert.isFalse(v.Type.isNull("false"));
            assert.isFalse(v.Type.isNull(" "));
            assert.isFalse(v.Type.isNull("hello"));
        });
        
        test('an object is not null',function(){
            assert.isFalse(v.Type.isNull({}));
            assert.isFalse(v.Type.isNull({'a':1}));
        });
        
        test('a function is not null',function(){
            assert.isFalse(v.Type.isNull(function(){}));
            assert.isFalse(v.Type.isNull(function(){ return 2+2; }));
        });
        
        test('an array is not null',function(){
            assert.isFalse(v.Type.isNull([]));
            assert.isFalse(v.Type.isNull([1,2,3]));
        });
        
        test('a regexp is not null',function(){
            assert.isFalse(v.Type.isNull(/reg/));
        });
        
        test('a boolean is not null',function(){
            assert.isFalse(v.Type.isNull(true));
            assert.isFalse(v.Type.isNull(false));
        });
        
        test('a date is not null',function(){
            assert.isFalse(v.Type.isNull(new Date()));
        });
        
        test('undefined is not null',function(){
            assert.isFalse(v.Type.isNull(undefined));
        });
    });
    
});