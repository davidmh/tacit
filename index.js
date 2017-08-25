const log = require('./log');
const moment = require('moment');

// Helpers

const curry = (fn, ...args) => {
  if (args.length >= fn.length) {
    return fn(...args);
  }
  return (...partialArgs) =>
    curry(...[fn, ...args, ...partialArgs]);
};

const compose = (...fns) => input =>
  fns.reduceRight((data, fn) => fn(data), input);

const pipe = (...fns) => input =>
  fns.reduce((data, fn) => fn(data), input);

// String

const split = delimiter => text =>
  text.split(delimiter);

const test = exp => text =>
  exp.test(text);

const match = exp => text =>
  text.match(exp);

// Lists

const join = delimiter => list =>
  list.join(delimiter);

const filter = condition => list =>
  list.filter(condition);

// Misc
const prop = name => obj => obj[name];
const add = a => b => a + b;

const getNamesStartingWithE = pipe
  ( split(',')
  , filter(test(/^E/))
  , join(',')
  );

const data = 'Edward,Chris,Gabriel,Erika,David';

// log('names starting with E', getNamesStartingWithE(data));

// Maybe

const maybe = x => ({
  map(fn) {
    return (x === undefined || x === null)
      ? maybe(null)
      : maybe(fn(x));
  },
  inspect() {
    return `maybe(${JSON.stringify(x)})`;
  },
  value: x
});

// Example

maybe('Malkovich Malkovich')
  .map(match(/a/ig));
//=> maybe(['a', 'a'])

maybe(null)
  .map(match(/a/ig));
//=> maybe(null)

maybe({ name: 'Boris', })
  .map(prop('age'))
  .map(add(10));
//=> maybe(null)

maybe({ name: 'Dinah', age: 14 })
  .map(prop('age'))
  .map(add(10));
//=> maybe(24)

// Either = [left|right]

const left = x => ({
  map() {
    return this;
  },
  inspect() {
    return `left(${JSON.stringify(x)})`;
  },
  value: x
});

const right = x => ({
  map(fn) {
    return right(fn(x));
  },
  inspect() {
    return `right(${JSON.stringify(x)})`;
  },
  value: x
});

// Example

//  getAge :: Date -> User -> Rither(String, Number)
const getAge = curry((now, user) => {
  const birthdate = moment(user.birthdate, 'YYYY-MM-DD');
  if (!birthdate.isValid()) {
    return left('Birth date could not be parsed');
  }
  return right(now.diff(birthdate, 'years'));
});

const validData = {
  birthdate: '2005-12-12',
};
const valid = getAge(moment(), validData);
// console.log(valid);

const invalidData = {
  birthdate: 'A long time ago in a galaxy far far away',
};
const invalid = getAge(moment(), invalidData);
//console.log(invalid);


