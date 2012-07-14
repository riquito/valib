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
    });
    
});
