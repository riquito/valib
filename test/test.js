"use strict";

if (typeof window === 'undefined') {
    var chai = require('chai');
    var valib = require('../valib.js');
} 

chai.Assertion.includeStack = false; // show backtrace on test error

var assert = chai.assert;
var v = valib;


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
            assert.isFalse(v.Type.isNumber(new RegExp()));
            assert.isFalse(v.Type.isNumber(new RegExp('reg')));
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
        
        test('NaN is not a number',function(){
            assert.isFalse(v.Type.isNumber(NaN));
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
        
        test('is zero',function(){
            assert.isTrue(v.Number.isZero(0));
            assert.isTrue(v.Number.isZero(-0));
            
            assert.isFalse(v.Number.isZero(1));
            assert.isFalse(v.Number.isZero(-1));
            assert.isFalse(v.Number.isZero(null));
            assert.isFalse(v.Number.isZero(undefined));
            assert.isFalse(v.Number.isZero(''));
            assert.isFalse(v.Number.isZero([]));
            assert.isFalse(v.Number.isZero({}));
        });

        test('is positive',function(){
            assert.isTrue(v.Number.isPositive(1));

            assert.isFalse(v.Number.isPositive(-1));
            assert.isFalse(v.Number.isPositive(0));
            assert.isFalse(v.Number.isPositive(null));
            assert.isFalse(v.Number.isPositive(undefined));

        });
        
        test('is negative',function(){
            assert.isTrue(v.Number.isNegative(-1));

            assert.isFalse(v.Number.isNegative(1));
            assert.isFalse(v.Number.isNegative(0));
            assert.isFalse(v.Number.isNegative(null));
            assert.isFalse(v.Number.isNegative(undefined));

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
            assert.isFalse(v.Type.isString(new RegExp()));
            assert.isFalse(v.Type.isString(new RegExp('reg')));
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
        
        test('NaN is not a string',function(){
            assert.isFalse(v.Type.isString(NaN));
        });
        
        test('is numeric',function(){
            
            assert.isTrue(v.String.isNumeric('0'));
            
            assert.isTrue(v.String.isNumeric(' 1'));
            assert.isTrue(v.String.isNumeric('+1'));
            assert.isTrue(v.String.isNumeric('-1'));
            
            assert.isTrue(v.String.isNumeric(' 1.2'));
            assert.isTrue(v.String.isNumeric('+1.2'));
            assert.isTrue(v.String.isNumeric('-1.2'));
            
            assert.isTrue(v.String.isNumeric(' 1.'));
            assert.isTrue(v.String.isNumeric('+1.'));
            assert.isTrue(v.String.isNumeric('-1.'));
            
            assert.isTrue(v.String.isNumeric(' .1'));
            assert.isTrue(v.String.isNumeric('+.1'));
            assert.isTrue(v.String.isNumeric('-.1'));
            
            assert.isTrue(v.String.isNumeric(' 2e3'));
            assert.isTrue(v.String.isNumeric('+2e3'));
            assert.isTrue(v.String.isNumeric('-2e3'));
            
            assert.isTrue(v.String.isNumeric(' 010'));
            assert.isTrue(v.String.isNumeric('+010'));
            assert.isTrue(v.String.isNumeric('-010'));
            
            assert.isTrue(v.String.isNumeric(' 0x15'));
            assert.isTrue(v.String.isNumeric('+0x15'));
            assert.isTrue(v.String.isNumeric('-0x15'));
            
            assert.isTrue(v.String.isNumeric(' 0X15'));
            assert.isTrue(v.String.isNumeric('+0X15'));
            assert.isTrue(v.String.isNumeric('-0X15'));
            
            assert.isTrue(v.String.isNumeric('0000'));
            assert.isTrue(v.String.isNumeric('0001'));
            assert.isTrue(v.String.isNumeric('0001.23'));
            
            assert.isFalse(v.String.isNumeric(null));
            assert.isFalse(v.String.isNumeric(undefined));
            assert.isFalse(v.String.isNumeric(''));
            assert.isFalse(v.String.isNumeric('a'));
            assert.isFalse(v.String.isNumeric('1a'));
            assert.isFalse(v.String.isNumeric('.'));
            assert.isFalse(v.String.isNumeric('Infinity'));
            assert.isFalse(v.String.isNumeric('-a'));
            assert.isFalse(v.String.isNumeric('-1a'));
            assert.isFalse(v.String.isNumeric('-.'));
            assert.isFalse(v.String.isNumeric('-Infinity'));
            assert.isFalse(v.String.isNumeric(' 0x1H'));
            assert.isFalse(v.String.isNumeric('+0x1H'));
            assert.isFalse(v.String.isNumeric('-0x1H'));
            
            assert.isTrue(v.String.isNumeric(' 1  ',{"simple":true}));
            assert.isTrue(v.String.isNumeric('+1  ',{"simple":true}));
            assert.isTrue(v.String.isNumeric('-1  ',{"simple":true}));
            assert.isTrue(v.String.isNumeric(' 1.2',{"simple":true}));
            assert.isTrue(v.String.isNumeric('+1.2',{"simple":true}));
            assert.isTrue(v.String.isNumeric('-1.2',{"simple":true}));
            
            assert.isFalse(v.String.isNumeric(' 2e3', {"simple":true}));
            assert.isFalse(v.String.isNumeric('+2e3', {"simple":true}));
            assert.isFalse(v.String.isNumeric('-2e3', {"simple":true}));
            assert.isFalse(v.String.isNumeric(' 010', {"simple":true}));
            assert.isFalse(v.String.isNumeric('+010', {"simple":true}));
            assert.isFalse(v.String.isNumeric('-010', {"simple":true}));
            assert.isFalse(v.String.isNumeric(' 0x15',{"simple":true}));
            assert.isFalse(v.String.isNumeric('+0x15',{"simple":true}));
            assert.isFalse(v.String.isNumeric('-0x15',{"simple":true}));
            assert.isFalse(v.String.isNumeric('0000', {"simple":true}));
            assert.isFalse(v.String.isNumeric('0001', {"simple":true}));
            assert.isFalse(v.String.isNumeric('0001.23',{"simple":true}));
            
            assert.isFalse(v.String.isNumeric('+0  ',{"canBeSigned":false}));
            assert.isFalse(v.String.isNumeric('-0  ',{"canBeSigned":false}));
            assert.isFalse(v.String.isNumeric('+1  ',{"canBeSigned":false}));
            assert.isFalse(v.String.isNumeric('-1  ',{"canBeSigned":false}));
            assert.isFalse(v.String.isNumeric('+1.2',{"canBeSigned":false}));
            assert.isFalse(v.String.isNumeric('-1.2',{"canBeSigned":false}));
            assert.isFalse(v.String.isNumeric('+2e3',{"canBeSigned":false}));
            assert.isFalse(v.String.isNumeric('-2e3',{"canBeSigned":false}));
            assert.isFalse(v.String.isNumeric('+0x15',{"canBeSigned":false}));
            assert.isFalse(v.String.isNumeric('-0x15',{"canBeSigned":false}));
            
            assert.isTrue(v.String.isNumeric(' 0  ',{"simple":true,"canBeSigned":false}));
            assert.isTrue(v.String.isNumeric(' 0.0',{"simple":true,"canBeSigned":false}));
            assert.isTrue(v.String.isNumeric(' 1  ',{"simple":true,"canBeSigned":false}));
            assert.isTrue(v.String.isNumeric(' 1.2',{"simple":true,"canBeSigned":false}));
            
            assert.isFalse(v.String.isNumeric('+0',{"simple":true,"canBeSigned":false}));
            assert.isFalse(v.String.isNumeric('-0',{"simple":true,"canBeSigned":false}));
            
            assert.isFalse(v.String.isNumeric('+1  ',{"simple":true,"canBeSigned":false}));
            assert.isFalse(v.String.isNumeric('-1  ',{"simple":true,"canBeSigned":false}));
            
            assert.isFalse(v.String.isNumeric('+1.2',{"simple":true,"canBeSigned":false}));
            assert.isFalse(v.String.isNumeric('-1.2',{"simple":true,"canBeSigned":false}));
            
            assert.isFalse(v.String.isNumeric(' 2e3', {"simple":true,"canBeSigned":false}));
            assert.isFalse(v.String.isNumeric('+2e3', {"simple":true,"canBeSigned":false}));
            assert.isFalse(v.String.isNumeric('-2e3', {"simple":true,"canBeSigned":false}));
            assert.isFalse(v.String.isNumeric(' 010', {"simple":true,"canBeSigned":false}));
            assert.isFalse(v.String.isNumeric('+010', {"simple":true,"canBeSigned":false}));
            assert.isFalse(v.String.isNumeric('-010', {"simple":true,"canBeSigned":false}));
            assert.isFalse(v.String.isNumeric(' 0x15',{"simple":true,"canBeSigned":false}));
            assert.isFalse(v.String.isNumeric('+0x15',{"simple":true,"canBeSigned":false}));
            assert.isFalse(v.String.isNumeric('-0x15',{"simple":true,"canBeSigned":false}));
            
            assert.isFalse(v.String.isNumeric(' 0000', {"simple":true,"canBeSigned":false}));
            assert.isFalse(v.String.isNumeric('+0000', {"simple":true,"canBeSigned":false}));
            assert.isFalse(v.String.isNumeric('-0000', {"simple":true,"canBeSigned":false}));
            assert.isFalse(v.String.isNumeric(' 0001', {"simple":true,"canBeSigned":false}));
            assert.isFalse(v.String.isNumeric('+0001', {"simple":true,"canBeSigned":false}));
            assert.isFalse(v.String.isNumeric('-0001', {"simple":true,"canBeSigned":false}));
            assert.isFalse(v.String.isNumeric(' 0001.23',{"simple":true,"canBeSigned":false}));
            assert.isFalse(v.String.isNumeric('+0001.23',{"simple":true,"canBeSigned":false}));
            assert.isFalse(v.String.isNumeric('-0001.23',{"simple":true,"canBeSigned":false}));
        });
        
        test('to number',function(){
            assert.equal(0,v.String.toNumber('0'));
            
            assert.equal( 1,v.String.toNumber(' 1'));
            assert.equal( 1,v.String.toNumber('+1'));
            assert.equal(-1,v.String.toNumber('-1'));
            
            assert.equal( 1.2,v.String.toNumber(' 1.2'));
            assert.equal( 1.2,v.String.toNumber('+1.2'));
            assert.equal(-1.2,v.String.toNumber('-1.2'));
            
            assert.equal( 1,v.String.toNumber(' 1.'));
            assert.equal( 1,v.String.toNumber('+1.'));
            assert.equal(-1,v.String.toNumber('-1.'));
            
            assert.equal( 0.1,v.String.toNumber(' .1'));
            assert.equal( 0.1,v.String.toNumber('+.1'));
            assert.equal(-0.1,v.String.toNumber('-.1'));
            
            assert.equal( 2000,v.String.toNumber(' 2e3'));
            assert.equal( 2000,v.String.toNumber('+2e3'));
            assert.equal(-2000,v.String.toNumber('-2e3'));
            
            assert.equal( 8,v.String.toNumber(' 010'));
            assert.equal( 8,v.String.toNumber('+010'));
            assert.equal(-8,v.String.toNumber('-010'));
            
            assert.equal( 21,v.String.toNumber(' 0x15'));
            assert.equal( 21,v.String.toNumber('+0x15'));
            assert.equal(-21,v.String.toNumber('-0x15'));
            
            assert.equal( 21,v.String.toNumber(' 0X15'));
            assert.equal( 21,v.String.toNumber('+0X15'));
            assert.equal(-21,v.String.toNumber('-0X15'));
            
            assert.equal( 0,v.String.toNumber('0000'));
            assert.equal( 0,v.String.toNumber('+0000'));
            assert.equal(-0,v.String.toNumber('-0000'));
            
            assert.equal( 1,v.String.toNumber(' 0001'));
            assert.equal( 1,v.String.toNumber('+0001'));
            assert.equal(-1,v.String.toNumber('-0001'));
            
            assert.equal( 1.23,v.String.toNumber(' 0001.23'));
            assert.equal( 1.23,v.String.toNumber('+0001.23'));
            assert.equal(-1.23,v.String.toNumber('-0001.23'));
            
            assert.isTrue(v.Type.isNaN(v.String.toNumber('')));
            assert.isTrue(v.Type.isNaN(v.String.toNumber('a')));
            assert.isTrue(v.Type.isNaN(v.String.toNumber('1a')));
            assert.isTrue(v.Type.isNaN(v.String.toNumber('.')));
            assert.isTrue(v.Type.isNaN(v.String.toNumber('Infinity')));
            assert.isTrue(v.Type.isNaN(v.String.toNumber('-a')));
            assert.isTrue(v.Type.isNaN(v.String.toNumber('-1a')));
            assert.isTrue(v.Type.isNaN(v.String.toNumber('-.')));
            assert.isTrue(v.Type.isNaN(v.String.toNumber('-Infinity')));
            assert.isTrue(v.Type.isNaN(v.String.toNumber(' 0x1H')));
            assert.isTrue(v.Type.isNaN(v.String.toNumber('+0x1H')));
            assert.isTrue(v.Type.isNaN(v.String.toNumber('-0x1H')));
        });
        
        test('url',function(){
            
            var protocols = ['http','https','ftp'],
                hosts = ['www.domain.com','domain.com','xyz.domain.com','1.2.3.4'],
                prtc = null,
                host = null;
            
            for (var i=0,il=protocols.length;i<il;i++) {
                
                prtc = protocols[i];
                
                for (var j=0,jl=hosts.length;j<jl;j++) {
                    
                    host = hosts[j];
                    
                    assert.isTrue(v.String.isUrl(prtc+'://'+host));
                    assert.isTrue(v.String.isUrl(prtc+'://'+host+'/page'));
                    assert.isTrue(v.String.isUrl(prtc+'://'+host+'/page/'));
                    assert.isTrue(v.String.isUrl(prtc+'://'+host+'/page/subpage'));
                    assert.isTrue(v.String.isUrl(prtc+'://'+host+'/page/subpage/'));
                    assert.isTrue(v.String.isUrl(prtc+'://'+host+'/page/subpage/index.htm'));
                    assert.isTrue(v.String.isUrl(prtc+'://'+host+'/page/subpage/index.htm?'));
                    assert.isTrue(v.String.isUrl(prtc+'://'+host+'/page/subpage/index.htm?x=1'));
                    assert.isTrue(v.String.isUrl(prtc+'://'+host+'/page/subpage/index.htm?x=1&y=2'));
                    
                    assert.isTrue(v.String.isUrl(prtc+'://'+host+':1234'));
                    assert.isTrue(v.String.isUrl(prtc+'://'+host+':1234/page'));
                    assert.isTrue(v.String.isUrl(prtc+'://'+host+':1234/page/'));
                    assert.isTrue(v.String.isUrl(prtc+'://'+host+':1234/page/subpage'));
                    assert.isTrue(v.String.isUrl(prtc+'://'+host+':1234/page/subpage/'));
                    assert.isTrue(v.String.isUrl(prtc+'://'+host+':1234/page/subpage/index.htm'));
                    assert.isTrue(v.String.isUrl(prtc+'://'+host+':1234/page/subpage/index.htm?'));
                    assert.isTrue(v.String.isUrl(prtc+'://'+host+':1234/page/subpage/index.htm?x=1'));
                    assert.isTrue(v.String.isUrl(prtc+'://'+host+':1234/page/subpage/index.htm?x=1&y=2'));
                    
                    assert.isTrue(v.String.isUrl(prtc+'://user:password@'+host+':1234'));
                    assert.isTrue(v.String.isUrl(prtc+'://user:password@'+host+':1234/'));
                    assert.isTrue(v.String.isUrl(prtc+'://user:password@'+host+':1234/page'));
                    assert.isTrue(v.String.isUrl(prtc+'://user:password@'+host+':1234/page/subpage'));
                    assert.isTrue(v.String.isUrl(prtc+'://user:password@'+host+':1234/page/subpage/'));
                    assert.isTrue(v.String.isUrl(prtc+'://user:password@'+host+':1234/page/subpage/index.htm'));
                    assert.isTrue(v.String.isUrl(prtc+'://user:password@'+host+':1234/page/subpage/index.htm?'));
                    assert.isTrue(v.String.isUrl(prtc+'://user:password@'+host+':1234/page/subpage/index.htm?x=1'));
                    assert.isTrue(v.String.isUrl(prtc+'://user:password@'+host+':1234/page/subpage/index.htm?x=1&y=2'));
                    
                }
                
                assert.isTrue(v.String.isUrl(prtc+'://localhost'));
                assert.isTrue(v.String.isUrl(prtc+'://sub.domain'));
                
                assert.isTrue(v.String.isUrl(prtc+'://1.2.3.4'));
                assert.isTrue(v.String.isUrl(prtc+'://255.255.255.255'));
            }
            
            assert.isFalse(v.String.isUrl(''));
            assert.isFalse(v.String.isUrl('abc://www.xyz.com'));
            assert.isFalse(v.String.isUrl('http:/www.xyz.com'));
            assert.isFalse(v.String.isUrl('http:// spaces are not allowed'));
            assert.isFalse(v.String.isUrl('http://1.2.3.4.5'));
            assert.isFalse(v.String.isUrl('http://256.255.255.255'));
            
        });
        
        test('is MD5',function(){
            assert.isTrue (v.String.isMD5('98c8479273b830b85d46c13187947483'));
            assert.isTrue (v.String.isMD5('0123456789abcdef5d46c13187947483'));
            
            assert.isFalse(v.String.isMD5(''));
            assert.isFalse(v.String.isMD5('98c8479273b830b85d'));
            assert.isFalse(v.String.isMD5('g8c8479273b830b85d46c13187947483'));
            assert.isFalse(v.String.isMD5('9 c8479273b830b85d46c13187947483'));
        });
        
        test('is SHA1',function(){
            assert.isTrue (v.String.isSHA1('c1390c3fc48bb7e2c5d07c438435fc769400a3aa'));
            assert.isTrue (v.String.isSHA1('0123456789abcdefc5d07c438435fc769400a3aa'));
            
            assert.isFalse(v.String.isSHA1(''));
            assert.isFalse(v.String.isSHA1('c1390c3fc48bb7e2c5d'));
            assert.isFalse(v.String.isSHA1('g1390c3fc48bb7e2c5d07c438435fc769400a3aa'));
            assert.isFalse(v.String.isSHA1('c 390c3fc48bb7e2c5d07c438435fc769400a3aa'));
        });
        
        test('is an e-mail',function(){
            assert.isTrue(v.String.isEmailLike('user@host.com'));
            assert.isTrue(v.String.isEmailLike('user@host'));
            assert.isTrue(v.String.isEmailLike("o'connel@host"));
            assert.isTrue(v.String.isEmailLike('an-addressl@an-host'));
            assert.isTrue(v.String.isEmailLike('user1970@host.com'));
            
            assert.isFalse(v.String.isEmailLike(''));
            assert.isFalse(v.String.isEmailLike('too@many@host'));
            assert.isFalse(v.String.isEmailLike('no spaces@host'));
        });
        
        test('match string',function(){
            assert.isTrue(v.String.match(''  ,''));
            assert.isTrue(v.String.match('test'  ,'test'));
            assert.isTrue(v.String.match(' test' ,'test',{trim:true}));
            assert.isTrue(v.String.match('test ' ,'test',{trim:true}));
            assert.isTrue(v.String.match(' test ','test',{trim:true}));
            
            assert.isFalse(v.String.match(' test','test'));
            assert.isFalse(v.String.match('test ','test'));
            assert.isFalse(v.String.match(' test ','test'));
            assert.isFalse(v.String.match('hello world','hello'));
            assert.isFalse(v.String.match('hello world','world'));
        });
        
        test('match regexp',function(){
            assert.isTrue(v.String.match('test'  ,/test/));
            assert.isTrue(v.String.match(' test' ,/test/,{trim:true}));
            assert.isTrue(v.String.match('test ' ,/test/,{trim:true}));
            assert.isTrue(v.String.match(' test ',/test/,{trim:true}));
            
            assert.isTrue(v.String.match(' test',/test/));
            assert.isTrue(v.String.match('test ',/test/));
            assert.isTrue(v.String.match(' test ',/test/));
            
            assert.isFalse(v.String.match(''  ,/test/));
            assert.isFalse(v.String.match(' test' ,/^test$/));
            assert.isFalse(v.String.match('test ' ,/^test$/));
            assert.isFalse(v.String.match(' test ',/^test$/));
            
            assert.isTrue(v.String.match(' test' ,/^test$/,{trim:true}));
            assert.isTrue(v.String.match('test ' ,/^test$/,{trim:true}));
            assert.isTrue(v.String.match(' test ',/^test$/,{trim:true}));
        });
        
        test('starts with prefix',function(){
            assert.isTrue(v.String.startsWith('',''));
            assert.isTrue(v.String.startsWith('test','test'));
            assert.isTrue(v.String.startsWith('test',''));
            assert.isTrue(v.String.startsWith('hello world','hello'));
            assert.isTrue(v.String.startsWith('hello world','hello world'));
            
            assert.isFalse(v.String.startsWith('hello world','world'));
            assert.isFalse(v.String.startsWith(' hello world','hello'));
            assert.isFalse(v.String.startsWith('',' '));
        });
        
        test('ends with suffix',function(){
            assert.isTrue(v.String.endsWith('',''));
            assert.isTrue(v.String.endsWith('test','test'));
            assert.isTrue(v.String.endsWith('test',''));
            assert.isTrue(v.String.endsWith('hello world','world'));
            assert.isTrue(v.String.endsWith('hello world','hello world'));
            
            assert.isFalse(v.String.endsWith('hello world','hello'));
            assert.isFalse(v.String.endsWith('hello world ','world'));
            assert.isFalse(v.String.endsWith('',' '));
        });
        
        test('is empty',function(){
            assert.isTrue(v.String.isEmpty(''));
            assert.isTrue(v.String.isEmpty(null));
            assert.isTrue(v.String.isEmpty(undefined));
            
            assert.isFalse(v.String.isEmpty(' '));
            assert.isFalse(v.String.isEmpty('a'));
            assert.isFalse(v.String.isEmpty('foo'));
        });
        
        test('trim',function(){
            assert.equal('',v.String.trim(''));
            assert.equal('',v.String.trim('   '));
            
            assert.equal('',v.String.trim('\u0009')); // HT, Horizontal Tab
            assert.equal('',v.String.trim('\u000A')); // LN, Line feed
            assert.equal('',v.String.trim('\u000B')); // VT, Vertical Tab
            assert.equal('',v.String.trim('\u000C')); // FF, Form feed
            assert.equal('',v.String.trim('\u000D')); // CR, Carriage return
            
            assert.equal('',v.String.trim('\u0020')); // SPACE
            
            assert.equal('',v.String.trim('\u0085')); // NEL, Next line
            
            assert.equal('',v.String.trim('\u00A0')); // NO-BREAK-SPACE
            assert.equal('',v.String.trim('\u1680')); // OGHAM SPACE MARK
            
            assert.equal('',v.String.trim('\u2000')); // EN QUAD
            assert.equal('',v.String.trim('\u2001')); // EM QUAD
            assert.equal('',v.String.trim('\u2002')); // EN SPACE
            assert.equal('',v.String.trim('\u2003')); // EM SPACE
            assert.equal('',v.String.trim('\u2004')); // THREE-PER-EM SPACE
            assert.equal('',v.String.trim('\u2005')); // FOUR-PER-EM SPACE
            assert.equal('',v.String.trim('\u2006')); // SIX-PER-EM SPACE
            assert.equal('',v.String.trim('\u2007')); // FIGURE SPACE
            assert.equal('',v.String.trim('\u2008')); // PUNCTUATION SPACE
            assert.equal('',v.String.trim('\u2009')); // THIN SPACE
            assert.equal('',v.String.trim('\u200A')); // HAIR SPACE
            
            assert.equal('',v.String.trim('\u2028')); // LINE SEPARATOR
            assert.equal('',v.String.trim('\u2029')); // PARAGRAPH SEPARATOR
            assert.equal('',v.String.trim('\u202F')); // NARROW NO-BREAK SPACE
            assert.equal('',v.String.trim('\u205F')); // MEDIUM MATHEMATICAL SPACE
            assert.equal('',v.String.trim('\u3000')); // IDEOGRAPHIC SPACE
            
            assert.equal('foo',v.String.trim(' foo '));
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
            assert.isFalse(v.Type.isBoolean(new RegExp()));
            assert.isFalse(v.Type.isBoolean(new RegExp('true')));
            assert.isFalse(v.Type.isBoolean(new RegExp('false')));
            assert.isFalse(v.Type.isBoolean(/true/));
            assert.isFalse(v.Type.isBoolean(/false/));
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
        
        test('NaN is not a boolean',function(){
            assert.isFalse(v.Type.isBoolean(NaN));
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
            assert.isFalse(v.Type.isArray(new RegExp()));
            assert.isFalse(v.Type.isArray(new RegExp('reg')));
            assert.isFalse(v.Type.isArray(/reg/));
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
        
        test('NaN is not an array',function(){
            assert.isFalse(v.Type.isArray(NaN));
        });
        
        test('index of element',function(){
           assert.equal(0,v.Array.indexOf(['a','b','c'],'a'));
           assert.equal(1,v.Array.indexOf(['a','b','c'],'b'));
           assert.equal(2,v.Array.indexOf(['a','b','c'],'c'));
           assert.equal(0,v.Array.indexOf(['','b','c'],''));
           
           assert.equal(-1,v.Array.indexOf(['a','b','c'],'d'));
           assert.equal(-1,v.Array.indexOf(null,'d'));
           assert.equal(-1,v.Array.indexOf(undefined,'d'));
           
           var x = ['a',undefined,'c'];
           assert.equal(1,v.Array.indexOf(x,undefined));
           delete(x[1]);
           assert.equal(-1,v.Array.indexOf(x,undefined));
           
           assert.equal( 1,v.Array.indexOf(['a','b','c'],'b',1));
           assert.equal(-1,v.Array.indexOf(['a','b','c'],'b',2));
           assert.equal(-1,v.Array.indexOf(['a','b','c'],'b',-1));
           
        });
        
        test('array has element',function(){
           assert.isTrue(v.Array.has(['a','b','c'],'a'));
           assert.isTrue(v.Array.has(['a','b','c'],'b'));
           assert.isTrue(v.Array.has(['a','b','c'],'c'));
           assert.isTrue(v.Array.has(['','b','c'],''));
           
           assert.isFalse(v.Array.has(['a','b','c'],'d'));
           assert.isFalse(v.Array.has(null,'d'));
           assert.isFalse(v.Array.has(undefined,'d'));
           
           var x = ['a',undefined,'c'];
           assert.isTrue(v.Array.has(x,undefined));
           delete(x[1]);
           assert.isFalse(v.Array.has(x,undefined));
           
           assert.isTrue (v.Array.has(['a','b','c'],'b',1));
           assert.isFalse(v.Array.has(['a','b','c'],'b',2));
           assert.isFalse(v.Array.has(['a','b','c'],'b',-1));
           
        });
        
        test('is empty',function(){
            assert.isTrue(v.Array.isEmpty([]));
            assert.isTrue(v.Array.isEmpty(null));
            assert.isTrue(v.Array.isEmpty(undefined));
            
            assert.isFalse(v.Array.isEmpty([0]));
            assert.isFalse(v.Array.isEmpty([1]));
            assert.isFalse(v.Array.isEmpty(['a']));
            assert.isFalse(v.Array.isEmpty([{}]));
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
            assert.isFalse(v.Type.isObject(new RegExp()));
            assert.isFalse(v.Type.isObject(new RegExp('reg')));
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
        
        test('NaN is not an object',function(){
            assert.isFalse(v.Type.isObject(NaN));
        });
        
        test('has key',function(){
            assert.isTrue(v.Object.hasKey({'x':1,'y':2},'x'));
            
            assert.isFalse(v.Object.hasKey(undefined,'x'));
            assert.isFalse(v.Object.hasKey(null,'x'));
            assert.isFalse(v.Object.hasKey({},'x'));
            assert.isFalse(v.Object.hasKey({'y':2},'x'));
            
            // hasKey must ignore prototype inheritance
            function Cat(){ this.name = 'MrPurr'; }
            function Mammal(){ this.genre = ''; }
            
            Cat.prototype = new Mammal();
            
            assert.isFalse(v.Object.hasKey(new Cat(),'genre'));
        });
        
        test('has value',function(){
            assert.isTrue(v.Object.hasValue({'x':1,'y':2},1));
            
            assert.isFalse(v.Object.hasValue(undefined,1));
            assert.isFalse(v.Object.hasValue(null,1));
            assert.isFalse(v.Object.hasValue({},1));
            assert.isFalse(v.Object.hasValue({'y':2},1));
            
            // hasValue must ignore prototype inheritance
            function Cat(){ this.name = 'MrPurr'; }
            function Mammal(){ this.weight = 10; }
            
            Cat.prototype = new Mammal();
            
            assert.isTrue(v.Object.hasValue(new Cat(),'MrPurr'));
            assert.isFalse(v.Object.hasValue(new Cat(),10));
        });
        
        test('is empty',function(){
            assert.isTrue(v.Object.isEmpty({}),',essa');
            assert.isTrue(v.Object.isEmpty(null));
            assert.isTrue(v.Object.isEmpty(undefined));
            
            assert.isFalse(v.Object.isEmpty({'x':1}));
            
            // isEmpty must ignore prototype inheritance
            function Cat(){ }
            function Mammal(){ this.weight = 10; }
            
            Cat.prototype = new Mammal();
            
            assert.isTrue(v.Object.isEmpty(new Cat()));
            assert.isFalse(v.Object.isEmpty(new Mammal()));
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
            assert.isFalse(v.Type.isFunction(new RegExp()));
            assert.isFalse(v.Type.isFunction(new RegExp('reg')));
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
        
        test('NaN is not a function',function(){
            assert.isFalse(v.Type.isFunction(NaN));
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
            assert.isFalse(v.Type.isUndefined(new RegExp()));
            assert.isFalse(v.Type.isUndefined(new RegExp('reg')));
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
        
        test('NaN is not undefined',function(){
            assert.isFalse(v.Type.isUndefined(NaN));
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
            assert.isFalse(v.Type.isNull(new RegExp()));
            assert.isFalse(v.Type.isNull(new RegExp('reg')));
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
        
        test('NaN is not null',function(){
            assert.isFalse(v.Type.isNull(NaN));
        });
    });
    
    suite('NaN',function() {
        
        test('NaN is NaN',function(){
            assert.isTrue(v.Type.isNaN(NaN));
        });
        
        test('a number is not NaN',function(){
            assert.isFalse(v.Type.isNaN(0));
            assert.isFalse(v.Type.isNaN(1));
        });
        
        test('a string is not NaN',function(){
            assert.isFalse(v.Type.isNaN(""));
            assert.isFalse(v.Type.isNaN("0"));
            assert.isFalse(v.Type.isNaN("1"));
            assert.isFalse(v.Type.isNaN("true"));
            assert.isFalse(v.Type.isNaN("false"));
            assert.isFalse(v.Type.isNaN(" "));
            assert.isFalse(v.Type.isNaN("hello"));
        });
        
        test('an object is not NaN',function(){
            assert.isFalse(v.Type.isNaN({}));
            assert.isFalse(v.Type.isNaN({'a':1}));
        });
        
        test('a function is not NaN',function(){
            assert.isFalse(v.Type.isNaN(function(){}));
            assert.isFalse(v.Type.isNaN(function(){ return 2+2; }));
        });
        
        test('an array is not NaN',function(){
            assert.isFalse(v.Type.isNaN([]));
            assert.isFalse(v.Type.isNaN([1,2,3]));
        });
        
        test('a regexp is not NaN',function(){
            assert.isFalse(v.Type.isNaN(new RegExp()));
            assert.isFalse(v.Type.isNaN(new RegExp('reg')));
            assert.isFalse(v.Type.isNaN(/reg/));
        });
        
        test('a boolean is not NaN',function(){
            assert.isFalse(v.Type.isNaN(true));
            assert.isFalse(v.Type.isNaN(false));
        });
        
        test('a date is not NaN',function(){
            assert.isFalse(v.Type.isNaN(new Date()));
        });
        
        test('undefined is not NaN',function(){
            assert.isFalse(v.Type.isNaN(undefined));
        });
        
        test('null is not NaN',function(){
            assert.isFalse(v.Type.isNaN(null));
        });
    });
    
    suite('Dates',function() {
        
        test('a date is a date',function(){
            assert.isTrue(v.Type.isDate(new Date()));
            assert.isFalse(v.Type.isDate(Date()));
        });
        
        test('a number is not a date',function(){
            assert.isFalse(v.Type.isDate(0));
            assert.isFalse(v.Type.isDate(1));
        });
        
        test('a string is not a date',function(){
            assert.isFalse(v.Type.isDate(""));
            assert.isFalse(v.Type.isDate("0"));
            assert.isFalse(v.Type.isDate("1"));
            assert.isFalse(v.Type.isDate("true"));
            assert.isFalse(v.Type.isDate("false"));
            assert.isFalse(v.Type.isDate(" "));
            assert.isFalse(v.Type.isDate("hello"));
        });
        
        test('an object is not a date',function(){
            assert.isFalse(v.Type.isDate({}));
            assert.isFalse(v.Type.isDate({'a':1}));
        });
        
        test('a function is not a date',function(){
            assert.isFalse(v.Type.isDate(function(){}));
            assert.isFalse(v.Type.isDate(function(){ return 2+2; }));
        });
        
        test('an array is not a date',function(){
            assert.isFalse(v.Type.isDate([]));
            assert.isFalse(v.Type.isDate([1,2,3]));
        });
        
        test('a regexp is not a date',function(){
            assert.isFalse(v.Type.isDate(new RegExp()));
            assert.isFalse(v.Type.isDate(new RegExp('reg')));
            assert.isFalse(v.Type.isDate(/reg/));
        });
        
        test('a boolean is not a date',function(){
            assert.isFalse(v.Type.isDate(true));
            assert.isFalse(v.Type.isDate(false));
        });
        
        test('undefined is not a date',function(){
            assert.isFalse(v.Type.isDate(undefined));
        });
        
        test('null is not a date',function(){
            assert.isFalse(v.Type.isDate(null));
        });
        
        test('NaN is not a date',function(){
            assert.isFalse(v.Type.isDate(NaN));
        });
        
        test('to start of the day',function(){
            
            var someDay = new Date(
                                  new Date('2020/01/02 10:14:30 GMT+0100').getTime()
                                  + 123 // add some millis not be on a split second
                                 );
            
            assert.equal(new Date('2020/01/02 00:00:00 GMT+0100').getTime(),
                        v.Date.toStartOfTheDay(someDay).getTime()
                        );
        });
        
        test('today',function(){
            
            var someDay = new Date();
            someDay.setMinutes(0);
            someDay.setHours(0);
            someDay.setSeconds(0);
            someDay.setMilliseconds(0);
            
            assert.equal(someDay.getTime(),v.Date.today().getTime());
            
            someDay.setMilliseconds(1);
            assert.notEqual(someDay.getTime(),v.Date.today().getTime());
        });
        
        test('tomorrow',function(){
            
            var someDay = new Date();
            someDay.setTime(someDay.getTime() + 24 * 60 * 60 * 1000);
            someDay.setMinutes(0);
            someDay.setHours(0);
            someDay.setSeconds(0);
            someDay.setMilliseconds(0);
            
            assert.equal(someDay.getTime(),v.Date.tomorrow().getTime());
            
            someDay.setMilliseconds(1);
            assert.notEqual(someDay.getTime(),v.Date.tomorrow().getTime());
        });
        
        test('yesterday',function(){
            
            var someDay = new Date();
            someDay.setTime(someDay.getTime() - 24 * 60 * 60 * 1000);
            someDay.setMinutes(0);
            someDay.setHours(0);
            someDay.setSeconds(0);
            someDay.setMilliseconds(0);
            
            assert.equal(someDay.getTime(),v.Date.yesterday().getTime());
            
            someDay.setMilliseconds(1);
            assert.notEqual(someDay.getTime(),v.Date.yesterday().getTime());
        });
        
        test('is today',function(){
            assert.isTrue(v.Date.isToday(new Date()));
            
            assert.isFalse(v.Date.isToday(v.Date.tomorrow()));
            assert.isFalse(v.Date.isToday(v.Date.yesterday()));
            
            var x = new Date();
            x.setFullYear(x.getFullYear()-1);
            assert.isFalse(v.Date.isToday(x));
        });
        
        test('is tomorrow',function(){
            assert.isTrue(v.Date.isTomorrow(new Date(new Date().getTime() + 24*60*60*1000)));
            
            assert.isFalse(v.Date.isTomorrow(v.Date.today()));
            assert.isFalse(v.Date.isTomorrow(v.Date.yesterday()));
        });
        
        test('is yesterday',function(){
            assert.isTrue(v.Date.isYesterday(new Date(new Date().getTime() - 24*60*60*1000)));
            
            assert.isFalse(v.Date.isYesterday(v.Date.tomorrow()));
            assert.isFalse(v.Date.isYesterday(v.Date.today()));
        });
        
        test('is the next day',function(){
            var a = new Date('2020/01/01 10:14:30 GMT+0100'),
                b = new Date('2020/01/02 10:14:30 GMT+0100'),
                c = new Date('2020/01/03 10:14:30 GMT+0100');
            
            assert.isTrue(v.Date.isTheNextDay(b,c));
            
            assert.isFalse(v.Date.isTheNextDay(b,a));
        });
        
        test('is the previous day',function(){
            var a = new Date('2020/01/01 10:14:30 GMT+0100'),
                b = new Date('2020/01/02 10:14:30 GMT+0100'),
                c = new Date('2020/01/03 10:14:30 GMT+0100');
            
            assert.isTrue(v.Date.isThePreviousDay(b,a));
            
            assert.isFalse(v.Date.isThePreviousDay(b,c));
        });
    });
    
    suite('Regular expressions',function() {
        
        test('a regexp is a regexp',function(){
            assert.isTrue(v.Type.isRegExp(new RegExp()));
            assert.isTrue(v.Type.isRegExp(new RegExp('reg')));
            assert.isTrue(v.Type.isRegExp(/reg/));
        });
        
        test('a number is not a regexp',function(){
            assert.isFalse(v.Type.isRegExp(0));
            assert.isFalse(v.Type.isRegExp(1));
        });
        
        test('a string is not a regexp',function(){
            assert.isFalse(v.Type.isRegExp(""));
            assert.isFalse(v.Type.isRegExp("0"));
            assert.isFalse(v.Type.isRegExp("1"));
            assert.isFalse(v.Type.isRegExp("true"));
            assert.isFalse(v.Type.isRegExp("false"));
            assert.isFalse(v.Type.isRegExp(" "));
            assert.isFalse(v.Type.isRegExp("hello"));
        });
        
        test('an object is not a regexp',function(){
            assert.isFalse(v.Type.isRegExp({}));
            assert.isFalse(v.Type.isRegExp({'a':1}));
        });
        
        test('a function is not a regexp',function(){
            assert.isFalse(v.Type.isRegExp(function(){}));
            assert.isFalse(v.Type.isRegExp(function(){ return 2+2; }));
        });
        
        test('an array is not a regexp',function(){
            assert.isFalse(v.Type.isRegExp([]));
            assert.isFalse(v.Type.isRegExp([1,2,3]));
        });
        
        test('a boolean is not a regexp',function(){
            assert.isFalse(v.Type.isRegExp(true));
            assert.isFalse(v.Type.isRegExp(false));
        });
        
        test('a date is not a regexp',function(){
            assert.isFalse(v.Type.isRegExp(new Date()));
        });
        
        test('undefined is not a regexp',function(){
            assert.isFalse(v.Type.isRegExp(undefined));
        });
        
        test('null is not a regexp',function(){
            assert.isFalse(v.Type.isRegExp(null));
        });
        
        test('NaN is not a regexp',function(){
            assert.isFalse(v.Type.isRegExp(NaN));
        });
    });
});
