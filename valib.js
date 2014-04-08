/**
 * Copyright 2014 Riccardo Attilio Galli <riccardo@sideralis.org>
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
    "use strict";

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
    "use strict";

    // Reset undefined, it may have been overwritten.
    var undefined = (function(){})();
    
    // Detect a variable's type.
    // (Refactoring of code found in jQuery 1.7.1)
    var getType = (function() {
        
        var classes = ["Boolean","Number","String","Function","Array",
                       "Date","RegExp","Object"],
            class2type = {};
        
        for (var i=0,il=classes.length; i<il; i++) {
            class2type[ "[object " + classes[i] + "]" ] = classes[i].toLowerCase();
        }
        
        return function(value) {
            return value == null ? // match null and undefined
                   String( value ) :
                   class2type[ Object.prototype.toString.call(value) ] || "object";
        };
        
    })();
    
    // Even if they have String.prototype.trim, browsers may discord
    // on the whitespace characters, so we use a custom trim.
    var trim = (function(str) {
        // For Ecma-262 5th edition and Ecma-262 6th draft rev23 trim will
        // remove white spaces and line terminators.
        // White spaces are defined as:
        // - <TAB>   <VT>    <FF>    <SP>    <NBSP>  <BOM>
        //   \u0009  \u000B  \u000C  \u0020  \u00A0  \uFEFF
        // - symbols in the General category Zs in Unicode >= 5.1 (here 6.3)
        //   \u0020  \u00A0  \u1680  \u2000-\u200A  \u202F  \u205F  \u3000
        // Line terminars are defined as:
        // - <LF>    <CR>    <LS>    <PS>
        //   \u000A  \u000D  \u2028  \u2029
        
        var ws = '[\u0009\u000A-\u000D\u0020\u00A0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]',
            regAnyWS = new RegExp(ws),
            regInitialWS = new RegExp('^' + ws + '+');

        return function(str) {
            if (str == null) return ''; // null and undefined
            /* modified version of trim12 from
               http://blog.stevenlevithan.com/archives/faster-trim-javascript */
            str = str.replace(regInitialWS, '');
            var i = str.length;
            while (regAnyWS.test(str.charAt(--i)));
            return str.slice(0, i + 1);
        };
    })();
    
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
                
                // Not really a Javascript type, but certainly not a number
                // (typeof NaN === 'number').
                return (typeof value === 'number') && value != value;
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
            isInteger : function(n) {
                return n === +n && n === (n|0);
            },
            isFloat: function(n) {
                return n === +n && n !== (n|0);
            },
            isInfinity: function(n) {
                return n === Infinity || n === -Infinity;
            },
            isZero : function(n) {
                return n === 0;
            },
            inRange : function(n, min, max, options) {
                options = options || {l_exc : false, r_exc : false};
                return (options.l_exc ? n > min : n >= min)
                        &&
                       (options.r_exc ? n < max : n <= max);
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
            },
            isPositive: function(n) {
                return n > 0;
            },
            isNegative: function(n) {
                return n < 0;
            }
        },
        // String Functions
        // --------------
        String: {
            isNumeric : function(str, options) {
                options = options || {};
                // This way the user can just pass {simple:true}
                if (options.canBeSigned === undefined) options.canBeSigned = true;
                if (options.simple === undefined) options.simple = false;
                
                str = trim(str);
                
                // Below isFinite() may choke with signed hexadecimals (Firefox
                // return NaN as the standard requires, others parse them, so
                // we remove the sign alltogether).
                
                var sign = null;
                if (str.length && str.charAt(0) === '-' || str.charAt(0) === '+') {
                    sign = str.charAt(0);
                    str = str.slice(1);
                }
                
                // see http://stackoverflow.com/questions/18082
                var isNumeric = !isNaN(parseFloat(str)) && isFinite(str);
                
                if (!isNumeric) return false;
                
                if (sign && !options.canBeSigned) return false;
                
                if (options.simple) return /^(0|[1-9][0-9]*)(\.[0-9]+)?$/.test(str);
                
                return true;
            },
            toNumber : function(str, options) {
                // NOTE: this function returns null instead of NaN in case of errors
                // because practicality beats purity. Most people would wrongly
                // use === NaN on the returned element.
                if (!this.isNumeric(str, options)) return null;
                
                var res = NaN;
                if (str.toUpperCase().indexOf('X') !== -1) { res = parseInt(str,16); } // hex number
                else if (/^\s*[+-]?0[1-9]/.test(str)) { res = parseInt(str,8); } // oct number
                else { res = parseFloat(str); }

                return valib.Type.isNaN(res) ? null : res;
                
            },
            isUrl : (function() { // only http(s)/ftp urls, requires protocol
                // Javascript version of the regexp found at
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
                
                return function(str) {
                    return reg.test(str);
                };
                
            })(),
            isMD5 : function(str) {
                return /^[0-9a-f]{32}$/i.test(str);
            },
            isSHA1 : function(str) {
                return /^[0-9a-f]{40}$/i.test(str);
            },
            // Check if it is similar to an e-mail (no hope to comply with the rfc and the mess that's the real world).
            isEmailLike : function(str) {
                // something@something with no spaces, one and only one @
                return /^[^\s@]+@[^\s@]{3,}$/.test(str);
            },
            /**
            * If regOrString is a regular espression check if `str` matches it.
            * If regOrString is a string check if it's equal to `str`.
            *
            * If the option {trim:true} is passed then trailing whitespaces will be ignored on `str`.
            */
            match: function(str, regOrString, options) {
                options = options || {trim:false};
                
                if (options.trim) str = trim(str);
                
                if (valib.Type.isRegExp(regOrString)) {
                    return regOrString.test(str);
                }
                else return regOrString === str;
            },
            startsWith: function(str, prefix) {
                return str.length >= prefix.length && str.substring(0, prefix.length) === prefix;
            },
            endsWith: function(str, suffix) {
                return str.length >= suffix.length && str.substring(str.length - suffix.length) === suffix;
            },
            isEmpty : function(str) {
                return !str;
            },
            trim : trim,
            length: {
                eq  : function(str, n) { return str.length === n; },
                gt  : function(str, n) { return str.length >   n; },
                gte : function(str, n) { return str.length >=  n; },
                lt  : function(str, n) { return str.length <   n; },
                lte : function(str, n) { return str.length <=  n; }
            }
        },
        // Array Functions
        // --------------
        Array : {
            indexOf : function(array, value, fromIndex) { // O(n)
                if (array == null) return -1; // null and undefined
                
                if (array.length === 0) return -1;
                
                if (!Array.prototype.indexOf) {
                    if (!fromIndex) fromIndex = 0;
                    if (fromIndex < 0) fromIndex = array.length - 1;
                    
                    for (var i=fromIndex,il=array.length; i<il; i++) {
                        // Check if `i` is inside `array` to differentiate
                        // between deleted items and keys set to undefined.
                        if (i in array && array[i] === value) return i;
                    }
                    return -1;
                    
                } else return array.indexOf(value, fromIndex);
            },
            has : function(array, value, fromIndex) { // O(n)
                return -1 !== this.indexOf(array, value, fromIndex);
            },
            isEmpty : function(array) {
                if (array == null) return true;
                return array.length === 0;
            },
            length: {
                eq  : function(array, n) { return array.length === n; },
                gt  : function(array, n) { return array.length >   n; },
                gte : function(array, n) { return array.length >=  n; },
                lt  : function(array, n) { return array.length <   n; },
                lte : function(array, n) { return array.length <=  n; }
            }
        },
        // Object Functions
        // --------------
        Object : {
            hasKey : function(object, key) {
                if (object == null) return false;
                return Object.prototype.hasOwnProperty.call(object, key);
            },
            hasValue : function(object, value) {
                for (var key in object) {
                    if (object.hasOwnProperty(key) && object[key] === value) return true;
                }
                return false;
            },
            isEmpty : function(object) {
                if (object == null) return true;
                for (var key in object) if (this.hasKey(object, key)) return false;
                return true;
            },
            countKeys: function(object) {
                var k = 0;
                for (var key in object) {
                    if (object.hasOwnProperty(key)) k++;
                }
                return k;
            }
        },
        // Date Functions
        // --------------
        Date : {
            isToday : function(d) {
                return d > this.yesterday() && d < this.tomorrow();
            },
            isTomorrow :function(d) {
                var tomorrow = this.tomorrow();
                return    d.getFullYear() === tomorrow.getFullYear()
                       && d.getMonth() === tomorrow.getMonth()
                       && d.getDate() === tomorrow.getDate();
            },
            isYesterday : function(d) {
                var yesterday = this.yesterday();
                return    d.getFullYear() === yesterday.getFullYear()
                       && d.getMonth() === yesterday.getMonth()
                       && d.getDate() === yesterday.getDate();
            },
            isTheNextDay : function(d, future) {
                return    this.nDaysFromDate(1, this.toStartOfTheDay(d)).getTime()
                       == this.toStartOfTheDay(future).getTime();
            },
            isThePreviousDay : function(d, past) {
                return    this.nDaysFromDate(-1, this.toStartOfTheDay(d)).getTime()
                       == this.toStartOfTheDay(past).getTime();
            },
            // Get the number of calendar days passed (so if more than 24 hours passed
            // it may be still a difference of 1 day. e.g. from 01:00 to 03:00 of the
            // next day).
            elapsedDays : function(d1, d2) {
                
                return Math.abs(Math.round(( // round because of daylight saving
                                this.toStartOfTheDay(d1).getTime()
                                - 
                                this.toStartOfTheDay(d2).getTime())
                       / (24 * 60 * 60 * 1000)));
            },
            toStartOfTheDay : function(d) {
                return new Date(d.getFullYear(), d.getMonth(), d.getDate());
            },
            today : function() {
                return this.toStartOfTheDay(new Date());
            },
            tomorrow : function() {
                return this.nDaysFromDate(1);
            },
            yesterday : function() {
                return this.nDaysFromDate(-1);
            },
            nDaysFromDate : function(n, d) {
                if (!d) d = this.today();
                else d = this.clone(d);
                d.setDate(d.getDate() + n);
                return d;
            },
            isWithinDays : function(d, n_days, startFrom) {
                if (!startFrom) startFrom = this.today();
                else startFrom = this.toStartOfTheDay(startFrom);
                
                return this.toStartOfTheDay(d) >= this.toStartOfTheDay(startFrom)
                       && this.elapsedDays(startFrom, d) <= n_days;
            },
            clone : function(d) {
                return new Date(d.getTime());
            },
            isEqual : function(d1, d2) {
                return d1.getTime() === d2.getTime();
            },
            // Check if two dates are the same day of the same year
            // (the dates must be in the same timezone).
            isSameDay : function(d1, d2) {
                return this.isEqual(this.toStartOfTheDay(d1), this.toStartOfTheDay(d2));
            },
            // Check if two dates are in the same year/month
            // (the dates must be in the same timezone).
            isSameMonth : function(d1, d2) {
                return d1.getFullYear() === d2.getFullYear()
                       && d1.getMonth() === d2.getMonth();
            },
            // Check if two dates are in the same week and the same year
            // (the dates must be in the same timezone).
            isSameWeek : function(d1, d2, weekStartsAtSunday/*=true*/) {
                if (d2 < d1) { var tmp = d1; d1 = d2; d2 = tmp; } // swap
                if (weekStartsAtSunday !== false) weekStartsAtSunday = true;
                
                return this.isSameMonth(d1, d2)
                       && Math.abs(d1.getDate() - d2.getDate()) < 7
                       && (
                            (!weekStartsAtSunday && d1.getDay() === 0 ? 7 : d1.getDay())
                            <=
                            (!weekStartsAtSunday && d2.getDay() === 0 ? 7 : d2.getDay())
                          )
                        ; 
            }
        }
    };
    
    return valib;

}));
