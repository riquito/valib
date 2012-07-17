/**
 * Copyright 2012 Riccardo Attilio Galli <riccardo@sideralis.org>
 * [http://www.sideralis.org]
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

// Apply the returnExports.js UMD pattern  
// See [https://github.com/umdjs/umd](https://github.com/umdjs/umd)
(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals
        root.valib = factory();
    }
}(this, function (/*dependencies*/) {
    
    // Detect a variable's type  
    // (Refactoring of code found in jQuery 1.7.1)
    var getType = (function(){
        
        var classes = ["Boolean","Number","String","Function","Array",
                       "Date","RegExp","Object"],
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
    
    // Even if they have String.prototype.trim, browsers discord
    // on the whitespace characters, so we use a custom trim
    var trim = function(str) {
        if (str == null) return ''; // null and undefined
        /* modified version of trim12 from
           http://blog.stevenlevithan.com/archives/faster-trim-javascript */
        str = str.replace(/^[\s\u200B\u0085]+/, '');
        var ws = /[\s\u200B\u0085]/,
            i = str.length;
        while (ws.test(str.charAt(--i)));
        return str.slice(0, i + 1);
    };
    
    var valib = {
        // Type Functions
        // --------------
        Type: {
            isNumber : function(value) {
                return !this.isNaN(value) && getType(value) === 'number';
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
            },
            isUndefined: function(value) {
                return getType(value) === 'undefined';
            },
            isNull: function(value) {
                // not really a Javascript type, but certainly not an object
                // (typeof null === 'object')
                return getType(value) === 'null';
            },
            isNaN: function(value) {
                // Test if `value` is NaN, this is not the same as calling
                // the standard isNaN() (which checks if a value is coercible
                // to a number)
                
                // not really a Javascript type, but certainly not a number
                // (typeof NaN === 'number')
                return (typeof value === 'number') && ('NaN' == new String(value));
            },
            isDate: function(value) {
                return getType(value) === 'date';
            },
            isRegExp: function(value) {
                return getType(value) === 'regexp';
            }
        },
        // Number Functions
        // --------------
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
            isZero : function(n){
                return n === 0;
            },
            inRange : function(n,min,max,opts) {
                opts = opts || {l_exc : false, r_exc : false};
                return (opts.l_exc ? n > min : n >= min)
                        &&
                       (opts.r_exc ? n < max : n <= max);
            },
            lt : function(n,max) {
                return n < max;
            },
            lte : function(n,max) {
                return n <= max;
            },
            gt : function(n,min) {
                return n > min;
            },
            gte : function(n,min) {
                return n >= min;
            }
        },
        // String Functions
        // --------------
        String: {
            isNumeric : function(str,opts) {
                opts = opts || {};
                // This way the user can just pass {simple:true}
                if (opts.canBeSigned === undefined) opts.canBeSigned = true;
                if (opts.simple === undefined) opts.simple = false;
                
                str = trim(str);
                
                // Below isFinite() may choke with signed hexadecimals (Firefox
                // return NaN as the standard requires, others parse them, so
                // we remove the sign alltogether)
                
                var sign = null;
                if (str.length && str[0] === '-' || str[0] === '+') {
                    sign = str[0];
                    str = str.slice(1);
                }
                
                // see http://stackoverflow.com/questions/18082
                var isNumeric = !isNaN(parseFloat(str)) && isFinite(str);
                
                if (!isNumeric) return false;
                
                if (sign && !opts.canBeSigned) return false;
                
                if (opts.simple) return /^(0|[1-9][0-9]*)(\.[0-9]+)?$/.test(str);
                
                return true;
            },
            toNumber : function(str) {
                if (!this.isNumeric(str)) return NaN;
                
                if (str.toUpperCase().indexOf('X') !== -1) return parseInt(str); // hex number
                else if (/^\s*[+-]?0[1-9]/.test(str)) return parseInt(str); // oct number
                else return parseFloat(str);
                
            },
            isUrl : (function(){ // only http(s)/ftp urls, requires protocol
                // javascript version of the regexp found at  
                // http://stackoverflow.com/questions/161738
                var reg = new RegExp(
                  "^(https?|ftp)://" +                                             // protocol
                  "(([a-z0-9$_\\.\\+!\\*\\'\\(\\),;\\?&=-]|%[0-9a-f]{2})+" +       // username
                  "(:([a-z0-9$_\\.\\+!\\*\\'\\(\\),;\\?&=-]|%[0-9a-f]{2})+)?" +    // password
                  "@)?" +                                                          // auth requires @
                  "((([a-z0-9][a-z0-9-]*[a-z0-9]\\.)*" +                           // domain segments AND
                  "[a-z][a-z0-9-]*[a-z0-9]" +                                      // top level domain  OR
                  "|((\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])\\.){3}" +
                  "(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])" +                   // IP address
                  ")(:\\d+)?" +                                                    // port
                  ")(((/+([a-z0-9$_\\.\\+!\\*\\'\\(\\),;:@&=-]|%[0-9a-f]{2})*)*" + // path
                  "(\\?([a-z0-9$_\\.\\+!\\*\\'\\(\\),;:@&=-]|%[0-9a-f]{2})*)" +    // query string
                  "?)?)?" +                                                        // path and query string optional
                  "(#([a-z0-9$_\\.\\+!\\*\\'\\(\\),;:@&=-]|%[0-9a-f]{2})*)?" +     // fragment
                  "$"
                ,"i");
                
                return function(str){
                  return reg.test(str);
                };
                
            })(),
            isMD5 : function(str){
                return /^[0-9a-f]{32}$/i.test(str);
            },
            isSHA1 : function(str){
                return /^[0-9a-f]{40}$/i.test(str);
            },
            // check if it is similar to an e-mail (no hope to comply with the rfc and the mess that's the real world)
            isEmailLike : function(str){
                // something@something with no spaces, one and only one @
                return /^[^\s@]+@[^\s@]{3,}$/.test(str);
            },
            /**
            * If regOrString is a regular espression check if value match it
            * If regOrString is a string check if it's equal to value
            *
            * If the option {trim:true} is passed then trailing whitespaces will be ignored on 'value'
            */
            match: function(str,regOrString,opts){
                opts = opts || {trim:false};
                
                if (opts.trim) str = trim(str);
                
                if (valib.Type.isRegExp(regOrString)) {
                  return regOrString.test(str);
                }
                else return regOrString === str;
            },
            startsWith: function(str,prefix){
                return str.length >= prefix.length && str.substring(0, prefix.length) === prefix;
            },
            endsWith: function(str,suffix){
                return str.length >= suffix.length && str.substring(str.length - suffix.length) === suffix;
            },
            isEmpty : function(str){
                return !str;
            },
            trim : trim
        },
        // Array Functions
        // --------------
        Array : {
            'indexOf' : function(value,array) { // O(n)
                if (array == null) return -1; // null and undefined
                
                if (!Array.prototype.indexOf) {
                    
                    for (var i=0,il=array.length;i<il;i++) {
                        // check if `i` is inside `array` to differentiate
                        // between deleted items and keys set to undefined
                        if (i in array && array[i] === value) return i;
                    }
                    return -1;
                    
                } else return array.indexOf(value);
            },
            'in' : function(value,array) { // O(n)
                return -1 !== this.indexOf(value,array);
            },
            'isEmpty' : function(array){
                if (array == null) return true;
                return array.length === 0;
            }
        },
        // Object Functions
        // --------------
        Object : {
            'hasKey' : function(key,object){
                if (object == null) return false;
                return Object.prototype.hasOwnProperty.call(object,key);
            },
            'hasValue' : function(value,object){
                for (var key in object) {
                    if (object.hasOwnProperty(key) && object[key] === value) return true;
                }
                return false;
            },
            'isEmpty' : function(object){
                if (object == null) return true;
                for (var key in object) if (this.hasKey(key,object)) return false;
                return true;
            }
        }
    };
    
    return valib;

}));
