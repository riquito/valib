/**
 * Copyright 2012 Riccardo Attilio Galli
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals
        root.validator = factory();
    }
}(this, function (/*dependencies*/) {
    
    var getType = (function(){
        
        var classes = ["Boolean","Number","String","Function","Array","Date","RegExp","Object"],
            class2type = {};
        
        for (var i=0,il=classes.length;i<il;i++) {
          class2type[ "[object " + classes[i] + "]" ] = classes[i].toLowerCase();
        };
        
        return function(value){
            return value == null ? // match null and undefined
                   String( value ) :
                   class2type[ Object.prototype.toString.call(value) ] || "object";
        };
        
    })();
    
    return {
        Type: {
            isNumber : function(value) {
                return getType(value) === 'number';
            },
            isString: function(value) {
                return getType(value) === 'string';
            },
            isBoolean: function(value) {
                return getType(value) === 'boolean';
            },
            isArray: Array.isArray || function(value) {
                return getType(value) === 'array';
            },
            isObject: function(value) { // note: doesn't treat arrays as objects
                return getType(value) === 'object';
            },
            isFunction: function(value) {
                return getType(value) === 'function';
            }
        },
        Number: {
            isInteger : function(n){
              return n===+n && n===(n|0);
            },
            isFloat: function(n) {
              return n===+n && n!==(n|0);
            },
            isInfinity: function(n) {
                return n === Infinity || n === -Infinity;
            },
            inRange : function(num,min,max,opts) {
                opts = opts || {l_exc : false, r_exc : false};
                return (opts.l_exc ? num > min : num >= min)
                        &&
                       (opts.r_exc ? num < max : num <= max);
            },
            lt : function(num,max) {
                return num < max;
            },
            lte : function(num,max) {
                return num <= max;
            },
            gt : function(num,min) {
                return num > min;
            },
            gte : function(num,min) {
                return num >= min;
            }
        }
    };
}));
