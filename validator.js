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
    return {
        Type: {
            isNumber : function(value) {
                return typeof value === 'number';
            }
        },
        Number: {
            isInteger : function(n){ // note, it implies n IS a number
                return n===+n && n===(n|0);
            },
            isFloat: function(n) { // note, it implies n IS a number
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
            }
        }
    };
}));
