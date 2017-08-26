const log = require('./log');
const moment = require('moment');

// Helpers

const curry = (fn, ...args) =>
  (args.length >= fn.length)
    ? fn(...args)
    : (...partialArgs) =>
      curry(...[fn, ...args, ...partialArgs]);

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

const map = curry(function map(fn, list) {
  return list.map(fn)
});

// Misc
const prop = name => obj => obj[name];
const add = a => b => a + b;

const getNamesStartingWithE = pipe
  ( split(',')
  , filter(test(/^E/))
  , join(',')
  );

const data = 'Edward,Chris,Gabriel,Erika,David';

log('names starting with E', getNamesStartingWithE(data));

const makeBox = (type, x, methods) =>
  Object.create(Object.assign({
    inspect() {
      return `${type}(${JSON.stringify(x, null, '  ')})`;
    },
    matchWith(options) {
      return type in options
        ? options[type](x)
        : () => {};
    },
    get value () {
      return x;
    }
  }, methods));

// Maybe

const Maybe = x => makeBox('Maybe', x, {
  map(fn) {
    return (x === undefined || x === null)
      ? Maybe(null)
      : Maybe(fn(x));
  }
});

// Example

Maybe('Malkovich Malkovich')
  .map(match(/a/ig));
//=> Maybe(['a', 'a'])

Maybe(null)
  .map(match(/a/ig));
//=> Maybe(null)

Maybe({ name: 'Boris', })
  .map(prop('age'))
  .map(add(10));
//=> Maybe(null)

Maybe({ name: 'Dinah', age: 14 })
  .map(prop('age'))
  .map(add(10));
//=> Maybe(24)

// Either = [Left|Right]

const Left = x => makeBox('Left', x, {
  map() {
    return this;
  }
});

const Right = x => makeBox('Right', x, {
  map(fn) {
    return Right(fn(x));
  }
});

// Example

//  getAge :: Date -> User -> Rither(String, Number)
const getAge = curry(function getAge (now, user) {
  const birthdate = moment(user.birthdate, 'YYYY-MM-DD');
  if (!birthdate.isValid()) {
    return Left('Birth date could not be parsed');
  }
  return Right(now.diff(birthdate, 'years'));
});

const users = [
  {
    birthdate: '1984-12-29',
  },
  {
    birthdate: '2005-12-12',
  },
  {
    birthdate: 'A long time ago in a galaxy far far away',
  }
];

const ageFromNow = getAge(moment());

const allAgesFromNow = map(ageFromNow);

// log(
//   allAgesFromNow(users)
//     .map(age => age.matchWith({
//       Left: x => `<span className="error">${x}</span>`,
//       Right: x => `<span className="age">${x}</span>`
//     }))
// );
