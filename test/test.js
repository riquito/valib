"strict";

var chai = require('chai');
chai.Assertion.includeStack = false; // show backtrace on test error

var assert = chai.assert;

var validator = v = require('../validator.js')

suite('validators',function(){
    
    suite('Numbers',function() {
        
        test('a number is a number',function(){
            assert.isTrue(v.Type.isNumber(0));
            assert.isTrue(v.Type.isNumber(1));
            assert.isTrue(v.Type.isNumber(1.0));
        });
        
        test('a string is not number',function(){
            assert.isFalse(v.Type.isNumber("0"));
            assert.isFalse(v.Type.isNumber("1"));
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

    });
    
});
