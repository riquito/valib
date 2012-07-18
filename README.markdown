Valib
=====

A standalone library tailored for validation.

Works either as
- a nodeJS module
- an AMD module
- a generic library

You can read through the [annotated source code](http://riquito.github.com/valib/web/docs/valib.html)
and [run the tests](http://riquito.github.com/valib/web/tests.htm) from your browser

Note: for brevity, all the examples will suppose `valib` was assigned to `v`

## Type Functions ##


**isNumber** v.Type.isNumber(value)

Test if `value` is of type Number. Note that a string containing a number
is not of type Number: use `v.String.isNumeric()` for that kind of test

```javascript
v.Type.isNumber(2.8)
=> true

v.Type.isNumber('2.8')
=> false
```

**isString** v.Type.isString(value)

Test if `value` is of type String

```javascript
v.Type.isString('hello world')
=> true

v.Type.isString(null)
=> false
```

**isBoolean** v.Type.isBoolean(value)

Test if `value` is of type Boolean

```javascript
v.Type.isBoolean(true)
=> true

v.Type.isBoolean(1)
=> false
```

**isArray** v.Type.isArray(value)

Test if `value` is an instance of Array

```javascript
v.Type.isArray([1,2,3])
=> true
```

**isObject** v.Type.isObject(value)

Test if `value` is of type Object. Note that arrays
do not pass this test (while being of type `object`
in regular javascript).

```javascript
v.Type.isObject({x:1})
=> true

v.Type.isObject([1,2,3])
=> false
```

**isFunction** v.Type.isFunction(value)

Test if `value` is of type Function

```javascript
v.Type.isFunction(map)
=> true
```

**isDate** v.Type.isDate(value)

Test if `value` is of type Date

```javascript
v.Type.isDate(new Date())
=> true

v.Type.isDate(Date()) // Date() return a string
=> false
```

**isRegExp** v.Type.isRegExp(value)

Test if `value` is of type RegExp

```javascript
v.Type.isRegExp(new RegExp('[Vv]alib'))
=> true

v.Type.isRegExp(/[Vvalib]/)
=> true
```

**isUndefined** v.Type.isUndefined(value)

Test if `value` is undefined

```javascript
v.Type.isUndefined({}.foo)
=> true

v.Type.isUndefined(null)
=> false
```

**isNull** v.Type.isNull(value)

Test if `value` is null

```javascript
v.Type.isNull(null)
=> true

v.Type.isNull(undefined)
=> false
```

**isNaN** v.Type.isNaN(value)

Test if `value` is NaN. Note that this is different from
the standard isNaN(): that function checks if a value is not
coercible to a Number, but NaN itself is of type... Number)

```javascript
v.Type.isNaN(NaN)
=> true

v.Type.isNaN('foo')
=> false

isNaN(NaN)
=> true

isNaN('foo')
=> true
```

## Number Functions ##

**isInteger** v.Number.isInteger(n)

Test if `n` does not have a decimal part

```javascript
v.Number.isInteger(1)
=> true

v.Number.isInteger(1.0) // 1.0 === 1
=> true

v.Number.isInteger(1.2)
=> false
```

**isFloat** v.Number.isFloat(n)

Test if `n` has a decimal part

```javascript
v.Number.isFloat(1)
=> false

v.Number.isFloat(1.0) // 1.0 === 1
=> false

v.Number.isFloat(1.2)
=> true
```

**isInfinity** v.Number.isInfinity(n)

Test if `n` is +/- Infinity

```javascript
v.Number.isInfinity(1/0)
=> True
```

**isZero** v.Number.isZero(n)

Test if `n` is zero

```javascript
v.Number.isZero(0)
=> true

v.Number.isZero(null)
=> false
```

**inRange** v.Number.inRange(n,min,max[,opts])

Test if `n` is between min and max. By default both bounds are
included: you can exclude either bound via the `opts` object, {l_exc:true}
means "left bound excluded" while {r_exc:true} means "right bound excluded".

```javascript
v.Number.inRange(5,0,10)
=> true

v.Number.inRange(0,0,10)
=> true

v.Number.inRange(0,0,10,{l_exc:true})
=> false
```

**lt** v.Number.lt(n,max)

Test if `n` is lesser than `max`

```javascript
v.Number.lt(3,10)
=> true

v.Number.lt(10,10)
=> false
```

**lte** v.Number.lte(n,max)

Test if `n` is lesser than or equal to `max`

```javascript
v.Number.lte(3,10)
=> true

v.Number.lte(10,10)
=> true
```

**gt** v.Number.gt(n,min)

Test if `n` is greater than `min`

```javascript
v.Number.gt(15,10)
=> true

v.Number.gt(15,15)
=> false
```

**gte** v.Number.gte(n,min)

Test if `n` is greater than or equal to `min`

```javascript
v.Number.gte(15,10)
=> true

v.Number.gte(15,15)
=> true
```

## String Functions ##

**isNumeric** v.String.isNumeric(str[,opts])

Test if `str` represents a number.

```javascript
// decimals
v.String.isNumeric('120.3')
=> true

// hexadecimals
v.String.isNumeric('-0x10')
=> true

// octals
v.String.isNumeric('010')
=> true

// scientific notation
v.String.isNumeric('2e3')
=> true

// you may accept only integers and decimals
v.String.isNumeric('-0x10',{simple:true})
=> false

// or just unsigned numbers
v.String.isNumeric('-2',{canBeSigned:false})
=> false
```

**toNumber** v.String.toNumber(str)

Can convert to Number any string valid for `valib.String.isNumeric()`.
If the string is not a number, NaN is returned (remember that Nan !== NaN,
use `valib.String.isNaN()` to check the result).

```javascript
// decimals
v.String.toNumber('120.3')
=> 120.3

// hexadecimals
v.String.toNumber('-0x10')
=> -16

// octals
v.String.toNumber('010')
=> 8

// scientific notation
v.String.toNumber('2e3')
=> 2000

// not a number
v.String.toNumber('abcd')
=> NaN
```

**trim** v.String.trim(str)

A cross browser version of trim that takes in account any unicode whitespace character

```javascript
v.String.trim(' hello world \u0085 ') === 'hello world'
=> true
```

**startsWith** v.String.startsWith(str,prefix)

Test if `str` starts with `prefix`

```javascript
v.String.startsWith('hello world','hello')
=> true
```

**endsWith** v.String.endsWith(str,suffix)

Test if `str` ends with `suffix`

```javascript
v.String.endsWith('hello world','world')
=> true
```

**isEmpty** v.String.isEmpty(str)

Test if `str` is of length 0

```javascript
v.String.isEmpty(' ')
=> false
```

**match** v.String.match(str,regOrString[,opts])

If `regOrString` is a string tests if `str` is equal to `regOrString`,
else it expects `regOrString` to be a regular expression to be tested against.

`opts` is an object with options. The only supported option right now
is `trim`: when enabled `str` is trimmed before the matching occurs.

```javascript
v.String.match('hello',' hello  ',{trim:true})
=> true

v.String.match('hello',/hell./)
=> true
```

**isEmailLike** v.String.isEmailLike(str)

Test if `str` is a plausible e-mail. This isn't a strict check following
the most up-to-date RFC about e-mail addresses, but a lax control.
If it is something with a '@' and no spaces, it resembles an e-mail, and it passes.
Checking against the RFC is pointless when the World doesn't follow the
standard.

```javascript
v.String.isEmailLike('foo@bar.com')
=> true

v.String.isEmailLike('admin@localhost')
=> true

v.String.isEmailLike('john smith@smith@whatever')
=> false
```

**isMD5** v.String.isMD5(str)

Test if `str` is a plausible MD5 checksum.

```javascript
v.String.isMD5('5b717e31e77094e7bae24c2f0ca43ae0')
=> true
```

**isSHA1** v.String.isSHA1(str)

Test if `str` is a plausible SHA1 checksum.

```javascript
v.String.isSHA1('23dea0f9d56cfab1380f31edb14d77ccc1fa8d26')
=> true
```

**isURL** v.String.isUrl(str)

Test if `str` is a well formed http(s)/ftp URL.

```javascript
v.String.isURL('http://www.sideralis.org')
=> true

v.String.isURL('http://user:password@host.com/foo?bar=1')
=> true
```

## Array Functions ##


**indexOf** v.Array.indexOf(array,value[,fromIndex])

Returns the first index at which `value` can be found in `array`,
or -1 if it is not present.
If the optional `fromIndex` is passed, the search will start from
there (both positive and negative indexes are allowed).

```javascript
v.Array.indexOf(['a','b','c'],'c')
=> 2

v.Array.indexOf(['a','b','c'],'d')
=> -1

v.Array.indexOf(['a','b','c'],'b',2)
=> -1
```

**has** v.Array.has(array,value[,fromIndex])

Test if `array` contains `value`. Starts to search from index 0
unless the optional `fromIndex` is present (it can be either 
positive or negative).

```javascript
v.Array.has(['a','b','c'],'c')
=> true

v.Array.has(['a','b','c'],'d')
=> false

v.Array.has(['a','b','c'],'b',-1)
=> false
```

**isEmpty** v.Array.isEmpty(array)

Test if `array` does not contain any value

```javascript
v.Array.isEmpty([])
=> true

v.Array.isEmpty(['a','b','c'])
=> false
```

## Object Functions ##

**hasKey** v.Object.hasKey(object,key)

Test if `object` has a (not inherited) property named `key`

```javascript
v.Object.hasKey({'x':1},'x')
=> true
```

**hasValue** v.Object.hasValue(object,value)

Test if `object` has a (not inherited) property whose value is `value`.

```javascript
v.Object.hasValue({'x':1},1)
=> true
```

**isEmpty** v.Object.isEmpty(object)

Test if `object` has any property at all (skipping inherited properties)

```javascript
v.Object.isEmpty({})
=> true

v.Object.isEmpty({'x':1})
=> false
```

## Contribute ##

Fork & pull request. Don't forget about tests.  
If you plan to add a feature please create an issue before.

## License ###

Copyright 2012 Riccardo Attilio Galli <riccardo@sideralis.org>
[http://www.sideralis.org]

Licensed under the Apache License, Version 2.0 (the "License");  
you may not use this file except in compliance with the License.  
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software  
distributed under the License is distributed on an "AS IS" BASIS,  
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  
See the License for the specific language governing permissions and  
limitations under the License.

