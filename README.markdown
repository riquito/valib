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

**length.eq** v.String.length.eq(str,n)  
**length.gt** v.String.length.gt(str,n)  
**length.gte** v.String.length.gte(str,n)  
**length.lt** v.String.length.lt(str,n)  
**length.lte** v.String.length.lte(str,n)  

Test if `str` length is within some constraints (lesser/greater/equal to `n`)

```javascript
v.String.length.eq('abc',3)
=> true

v.String.length.gt('abc',1)
=> true

v.String.length.gte('abc',4)
=> false

v.String.length.lt('abc',3)
=> false

v.String.length.lte('abc',3)
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

**length.eq** v.Array.length.eq(array,n)  
**length.gt** v.Array.length.gt(array,n)  
**length.gte** v.Array.length.gte(array,n)  
**length.lt** v.Array.length.lt(array,n)  
**length.lte** v.Array.length.lte(array,n)  

Test if `array` length is within some constraints (lesser/greater/equal to `n`)

```javascript
v.Array.length.eq(['a','b','c'],3)
=> true

v.Array.length.gt(['a','b','c'],1)
=> true

v.Array.length.gte(['a','b','c'],4)
=> false

v.Array.length.lt(['a','b','c'],3)
=> false

v.Array.length.lte(['a','b','c'],3)
=> true
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

**countKeys** v.Object.countKeys(object)

Return the number of properties in `object` (skipping inherited properties)

```javascript
v.Object.countKeys({})
=> 0

v.Object.countKeys({'x':10,'y':5})
=> 2
```

## Date Functions ##

Date functions have to be used with care, because dates are complicated.
If a function accept more than a date, make sure that they are in the same
timezone.
If a function will had to use the current time to detect something, it will
use the current local time (e.g. isToday(date) will compare the current LOCAL
datetime to the date provided).

**isToday** v.Date.isToday(d)

Test if `d` match the current day (in localtime);

```javascript
v.Date.isToday(new Date())
=> true
```

**isTomorrow** v.Date.isTomorrow(d)

Test if `d` match tomorrow's day (in localtime);

```javascript
// assuming today is 2020/01/06
v.Date.isTomorrow(new Date('2020/01/07'))
=> true

v.Date.isTomorrow(new Date())
=> false
```

**isYesterday** v.Date.isYesterday(d)

Test if `d` match yesterday's day (in localtime);

```javascript
// assuming today is 2020/01/06
v.Date.isYesterday(new Date('2020/01/05'))
=> true

v.Date.isYesterday(new Date())
=> false
```

**today** v.Date.today()

Return today's date (in localtime) at 00:00:00

```javascript
// assuming today is 2020/01/06
v.Date.today()
=> Date {Mon Jan 06 2020 00:00:00 GMT+0100 (CET)} // timezone may vary
```

**tomorrow** v.Date.tomorrow()

Return tomorrow's date (in localtime) at 00:00:00

```javascript
// assuming today is 2020/01/06
v.Date.tomorrow()
=> Date {Tue Jan 07 2020 00:00:00 GMT+0100 (CET)} // timezone may vary
```

**yesterday** v.Date.yesterday()

Test if `d` match yesterday's day (in localtime);

```javascript
// assuming today is 2020/01/06
v.Date.yesterday()
=> Date {Sun Jan 05 2020 00:00:00 GMT+0100 (CET)} // timezone may vary
```

**isTheNextDay** v.Date.isTheNextDay(d,future)

Test if `future` is the day after `d`

```javascript
v.Date.isTheNextDay(new Date('2020/01/07'),new Date('2020/01/08'))
=> true
```

**isThePreviousDay** v.Date.isThePreviousDay(d,past)

Test if `past` is the day before `d`

```javascript
v.Date.isThePreviousDay(new Date('2020/01/07'),new Date('2020/01/06'))
=> true
```

**isSameDay** v.Date.isSameDay(d1,d2)

Test if `d1` has the same year/month/day as `d2`

```javascript
v.Date.isSameDay(new Date('2020/01/07 12:30:46'),new Date('2020/01/07 23:02:18'))
=> true
```

**isSameMonth** v.Date.isSameMonth(d1,d2)

Test if `d1` has the same year/month as `d2`

```javascript
v.Date.isSameMonth(new Date('2020/01/07 12:30:46'),new Date('2020/01/23 23:02:18'))
=> true
```

**isSameWeek** v.Date.isSameWeek(d1,d2[,weekStartsAtSunday=true])

Test if `d1` is in the same week of the year as `d2`.
If the optional weekStartsAtSunday is set to `false` weeks will start at Monday

```javascript
// 2020/01/05 is Sunday
v.Date.isSameWeek(new Date('2020/01/05'),new Date('2020/01/06'))
=> true

v.Date.isSameWeek(new Date('2020/01/05'),new Date('2020/01/06'),false)
=> false
```

**clone** v.Date.clone(d)

Return a copy of the date `d`

```javascript
v.Date.clone(new Date('2020/01/07 12:30:46'))
=> Date {Tue Jan 07 2020 12:30:46 GMT+0100 (CET)}
```

**isEqual** v.Date.isEqual(d1,d2)

Test if `d1` and `d2` represent the exact same datetime

```javascript
var dateStr = '2020/01/07 12:30:46',
    d1 = new Date(dateStr),
    d2 = new Date(dateStr);

v.Date.isEqual(d1,d2)
=> true
```

**elapsedDays** v.Date.elapsedDays(d1,d2)

Return the absolute difference in number of (calendar) days between two dates

```javascript
v.Date.elapsedDays(
    new Date('2020/01/07 00:00:00'),
    new Date('2020/01/08 18:00:00'),
)
=> 1
```

**nDaysFromDate** v.Date.nDaysFromDate(n[,d])

Return the nth day after/before `d`.  
`n` is the (positive or negative) number of days to move from `d`.  
If `d` is missing the current date is used.

```javascript
// assuming today is 2020/01/06
v.Date.nDaysFromDate(2)
=> Date {Wed Jan 08 2020 00:00:00 GMT+0100 (CET)}

// assuming today is 2020/01/06
v.Date.nDaysFromDate(-2)
=> Date {Sat Jan 04 2020 00:00:00 GMT+0100 (CET)}

v.Date.nDaysFromDate(2,new Date('2020/12/03'))
=> Date {Sat Dec 05 2020 00:00:00 GMT+0100 (CET)}
```

**isWithinDays** v.Date.isWithinDays(d,n_days[,startFrom])

Test if `d` is not farer than `n_days` days since `startFrom`.  
If `startFrom` is missing the current date is used.  
If `d` is an earlier date than `startFrom` the function will always return `false`

```javascript
// assuming today is 2020/01/06
v.Date.isWithinDays(new Date('2020/01/07'),1)
=> true

// assuming today is 2020/01/06
v.Date.isWithinDays(new Date('2020/01/07'),5)
=> true

v.Date.isWithinDays(new Date('2020/12/05 01:00:00'),4,new Date('2020/12/01 23:00:00'))
=> true
```

**toStartOfTheDay** v.Date.toStartOfTheDay(d)

Return a new date at the same year/month/day of `d` but with the time set at
00:00:00 (and 0 milliseconds)

```javascript
var d1 = new Date('2020/01/07 12:30:46'),
    d2 = null;

d2 = v.Date.toStartOfTheDay(d1)
=> Date {Tue Jan 07 2020 00:00:00 GMT+0100 (CET)}

d1
=> Date {Tue Jan 07 2020 12:30:46 GMT+0100 (CET)}
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

