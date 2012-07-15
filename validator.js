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
    
    var trim = null;
    if (String.prototype.trim) {
        trim = function(str) {
            return str == null ? // null and undefined
                   ""
                   :
                   String.prototype.trim.call(str);
        };
    } else {
        trim = function(str) {
            return str == null ? // null and undefined
                ""
                :
                str = str.replace(/^\s+/, '');
                for (var i = str.length - 1; i >= 0; i--) {
                    if (/\S/.test(str.charAt(i))) {
                        str = str.substring(0, i + 1);
                        break;
                    }
                }
                return str;
        };
    }
    
    var Validator = {
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
                /* check if value is NaN, this is not the same as calling
                   the standard isNaN (which checks if a value is coercible to a number) */
                
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
        },
        String: {
            isNumeric : function(str,opts) {
                opts = opts || {};
                if (opts.canBeSigned === undefined) opts.canBeSigned = true; // this let the user pass just {simple:true}
                if (opts.simple === undefined) opts.simple = false;
                
                str = trim(str);
                
                // see http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric
                var isNumeric = !isNaN(parseFloat(str)) && isFinite(str);
                
                if (!isNumeric) return false;
                
                if (!opts.canBeSigned && str.length && (str[0]==='+' || str[0]==='-')) {
                    return false;
                }
                
                if (opts.simple) return /^[+-]?(0|[1-9][0-9]*)(\.[0-9]+)?$/.test(str);
                
                return true;
            },
            toNumber : function(str) {
                if (!this.isNumeric(str)) return null;
                
                if (str.indexOf('x') !== -1) return parseInt(str); // hex number
                else if (/^\s*[+-]?0[1-9]/.test(str)) return parseInt(str); // oct number
                else return parseFloat(str);
                
            },
            isUrl : (function(){ // only http(s)/ftp urls, requires protocol
                // javascript version of the regexp found at
                // http://stackoverflow.com/questions/161738/what-is-the-best-regular-expression-to-check-if-a-string-is-a-valid-url
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
                
                return function(value){
                  return reg.test(value);
                };
                
            })(),
            isMD5 : function(value){
                return /^[0-9a-f]{32}$/i.test(value);
            },
            isSHA1 : function(value){
                return /^[0-9a-f]{40}$/i.test(value);
            },
            // check if it is similar to an e-mail (no hope to comply with the rfc and the mess that's the real world)
            isEmailLike : function(value){
                // something@something with no spaces, one and only one @
                return /^[^\s@]+@[^\s@]{3,}$/.test(value);
            },
            /**
            * If regOrString is a regular espression check if value match it
            * If regOrString is a string check if it's equal to value
            *
            * If the option {trim:true} is passed then trailing whitespaces will be ignored on 'value'
            */
            match: function(value,regOrString,opts){
                opts = opts || {trim:false};
                
                if (opts.trim) value = trim(value);
                
                if (Validator.Type.isRegExp(regOrString)) {
                  return regOrString.test(value);
                }
                else return regOrString === value;
            },
            startsWith: function(str,starts){
                return str.length >= starts.length && str.substring(0, starts.length) === starts;
            },
            endsWith: function(str,ends){
                return str.length >= ends.length && str.substring(str.length - ends.length) === ends;
            }
        },
        Array : {
            // O(n)
            'indexOf' : function(value,array) {
                if (array == null) return -1; // null and undefined
                
                if (!Array.prototype.indexOf) {
                    
                    for (var i=0,il=array.length;i<il;i++) {
                        // check if i in array to differentiate between deleted items and keys set to undefined
                        if (i in array && array[i] === value) return i;
                    }
                    return -1;
                    
                } else return array.indexOf(value);
            },
            // O(n)
            'in' : function(value,array) {
                return -1 !== this.indexOf(value,array);
            }
        }
    };
    
    return Validator;

}));
